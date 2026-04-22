import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';

function useIsRealMobile() {
  if (typeof navigator === 'undefined') return false;
  return /Android|iPhone|iPod/i.test(navigator.userAgent) && 'ontouchstart' in window;
}

// Smooth scroll progress 0-1
function useScrollSmooth() {
  const value = useRef(0);
  const target = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target.current = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return { value, target };
}

function useMouseSmooth() {
  const mouse = useRef(new THREE.Vector2(0, 0));
  const target = useRef(new THREE.Vector2(0, 0));
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  useEffect(() => {
    let raf: number;
    const loop = () => {
      mouse.current.lerp(target.current, 0.05);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [mouse, target]);
  return mouse;
}

const noiseGLSL = `
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;
    vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;
    vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
    m=m*m;return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }
`;

/*
  ScrollMorphGeometry: A point cloud that morphs between shapes based on scroll.
  scroll 0.0 = tight sphere
  scroll 0.25 = torus knot
  scroll 0.5 = exploded particles (chaos)
  scroll 0.75 = flat grid/plane
  scroll 1.0 = tight sphere again (loop)
*/
function ScrollMorphPoints({ scrollRef, mouseRef, isMobile }: {
  scrollRef: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<THREE.Vector2>;
  isMobile: boolean;
}) {
  const count = isMobile ? 3000 : 8000;
  const pointsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  // Pre-compute target positions for each shape
  const { spherePos, torusPos, explodePos, gridPos } = useMemo(() => {
    const sphere = new Float32Array(count * 3);
    const torus = new Float32Array(count * 3);
    const explode = new Float32Array(count * 3);
    const grid = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Sphere
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 1.8;
      sphere[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      sphere[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      sphere[i * 3 + 2] = r * Math.cos(phi);

      // Torus knot
      const t = (i / count) * Math.PI * 4;
      const p2 = 2, q = 3, tr = 1.5, tube = 0.6;
      const ct = Math.cos(t), st = Math.sin(t);
      const qt = q * t / p2;
      const rx = (tr + tube * Math.cos(qt)) * ct;
      const ry = (tr + tube * Math.cos(qt)) * st;
      const rz = tube * Math.sin(qt);
      torus[i * 3] = rx;
      torus[i * 3 + 1] = ry;
      torus[i * 3 + 2] = rz;

      // Exploded
      const er = 2 + Math.random() * 5;
      const ephi = Math.acos(2 * Math.random() - 1);
      const etheta = Math.random() * Math.PI * 2;
      explode[i * 3] = er * Math.sin(ephi) * Math.cos(etheta);
      explode[i * 3 + 1] = er * Math.sin(ephi) * Math.sin(etheta);
      explode[i * 3 + 2] = er * Math.cos(ephi);

      // Grid/DNA helix
      const gt = (i / count) * Math.PI * 8;
      const gy = ((i / count) - 0.5) * 5;
      const gr = 1.2;
      const strand = i % 2 === 0 ? 1 : -1;
      grid[i * 3] = Math.cos(gt) * gr * strand;
      grid[i * 3 + 1] = gy;
      grid[i * 3 + 2] = Math.sin(gt) * gr * strand;
    }

    return { spherePos: sphere, torusPos: torus, explodePos: explode, gridPos: grid };
  }, [count]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uSpherePos: { value: null as THREE.DataTexture | null },
    uTorusPos: { value: null as THREE.DataTexture | null },
    uExplodePos: { value: null as THREE.DataTexture | null },
    uGridPos: { value: null as THREE.DataTexture | null },
    uCount: { value: count },
  }), [count]);

  // Use buffer attributes and morph in vertex shader via uniforms
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    // Index attribute for lookup
    const indices = new Float32Array(count);
    for (let i = 0; i < count; i++) indices[i] = i;
    geo.setAttribute('position', new THREE.BufferAttribute(spherePos.slice(), 3));
    geo.setAttribute('aSpherePos', new THREE.BufferAttribute(spherePos, 3));
    geo.setAttribute('aTorusPos', new THREE.BufferAttribute(torusPos, 3));
    geo.setAttribute('aExplodePos', new THREE.BufferAttribute(explodePos, 3));
    geo.setAttribute('aGridPos', new THREE.BufferAttribute(gridPos, 3));
    geo.setAttribute('aIndex', new THREE.BufferAttribute(indices, 1));
    return geo;
  }, [count, spherePos, torusPos, explodePos, gridPos]);

  const vertexShader = `
    ${noiseGLSL}
    attribute vec3 aSpherePos;
    attribute vec3 aTorusPos;
    attribute vec3 aExplodePos;
    attribute vec3 aGridPos;
    attribute float aIndex;
    
    uniform float uTime;
    uniform float uScroll;
    uniform vec2 uMouse;
    
    varying float vAlpha;
    varying float vColorMix;

    void main() {
      // Scroll sections: 0-0.25 sphere->torus, 0.25-0.5 torus->explode, 0.5-0.75 explode->helix, 0.75-1.0 helix->sphere
      float s = uScroll;
      vec3 pos;
      
      if (s < 0.25) {
        float t = smoothstep(0.0, 0.25, s);
        pos = mix(aSpherePos, aTorusPos, t);
      } else if (s < 0.5) {
        float t = smoothstep(0.25, 0.5, s);
        pos = mix(aTorusPos, aExplodePos, t);
      } else if (s < 0.75) {
        float t = smoothstep(0.5, 0.75, s);
        pos = mix(aExplodePos, aGridPos, t);
      } else {
        float t = smoothstep(0.75, 1.0, s);
        pos = mix(aGridPos, aSpherePos, t);
      }

      // Add noise displacement
      float noiseVal = snoise(pos * 0.8 + uTime * 0.15 + vec3(uMouse * 0.5, 0.0)) * 0.2;
      pos += normalize(pos + 0.001) * noiseVal;

      // Mouse influence
      pos.x += uMouse.x * 0.15;
      pos.y += uMouse.y * 0.1;

      vAlpha = 0.6 + noiseVal * 2.0;
      vColorMix = snoise(pos * 0.5 + uTime * 0.1) * 0.5 + 0.5;

      vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPos;
      
      // Size attenuation
      float size = 2.5 * (1.0 + noiseVal);
      gl_PointSize = size * (300.0 / -mvPos.z);
    }
  `;

  const fragmentShader = `
    varying float vAlpha;
    varying float vColorMix;

    void main() {
      // Soft circle
      float d = length(gl_PointCoord - 0.5) * 2.0;
      if (d > 1.0) discard;
      float alpha = (1.0 - d * d) * vAlpha * 0.7;

      vec3 green = vec3(0.24, 1.0, 0.77);
      vec3 purple = vec3(0.6, 0.4, 1.0);
      vec3 col = mix(green, purple, vColorMix);

      gl_FragColor = vec4(col, alpha);
    }
  `;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    scrollRef.current += (scrollRef.current < 0 ? 0 : (scrollRef.current - scrollRef.current)) * 0; // just access
    
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = t;
      // Smooth scroll
      const currentScroll = matRef.current.uniforms.uScroll.value;
      matRef.current.uniforms.uScroll.value += (scrollRef.current - currentScroll) * 0.04;
      matRef.current.uniforms.uMouse.value.lerp(mouseRef.current, 0.03);
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.03;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Thin orbital rings
function Rings() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) group.current.rotation.y = state.clock.elapsedTime * 0.02;
  });
  return (
    <group ref={group}>
      {[
        { r: 2.8, tilt: 0.5, speed: 0.03, op: 0.06 },
        { r: 3.4, tilt: -0.8, speed: -0.02, op: 0.04 },
      ].map((ring, i) => {
        const ref = useRef<THREE.Mesh>(null);
        return (
          <mesh key={i} ref={ref} rotation={[ring.tilt, 0, 0]}>
            <torusGeometry args={[ring.r, 0.004, 16, 128]} />
            <meshBasicMaterial color="#3dffc4" transparent opacity={ring.op} />
          </mesh>
        );
      })}
    </group>
  );
}

function ScrollCamera({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  const smoothScroll = useRef(0);

  useFrame(() => {
    smoothScroll.current += (scrollRef.current - smoothScroll.current) * 0.03;
    const s = smoothScroll.current;
    
    // Camera orbits slightly based on scroll
    const angle = s * Math.PI * 0.5;
    const dist = 5 + Math.sin(s * Math.PI) * 1.5;
    camera.position.x = Math.sin(angle) * 1.5;
    camera.position.z = dist;
    camera.position.y = Math.cos(s * Math.PI * 2) * 0.5;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function Scene3D() {
  const isMobile = useIsRealMobile();
  const scroll = useScrollSmooth();
  const mouse = useMouseSmooth();

  // Update smooth scroll
  useEffect(() => {
    let raf: number;
    const loop = () => {
      scroll.value.current += (scroll.target.current - scroll.value.current) * 0.04;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [scroll]);

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={isMobile ? [1, 1] : [1, 2]}
        performance={{ min: 0.5 }}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#060a12']} />

        <ScrollCamera scrollRef={scroll.value} />
        <ScrollMorphPoints
          scrollRef={scroll.value}
          mouseRef={mouse}
          isMobile={isMobile}
        />
        <Rings />
      </Canvas>
    </div>
  );
}
