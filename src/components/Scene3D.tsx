import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

function useIsRealMobile() {
  if (typeof navigator === 'undefined') return false;
  return /Android|iPhone|iPod/i.test(navigator.userAgent) && 'ontouchstart' in window;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return progress;
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
  return { mouse, target };
}

// Shared noise GLSL
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

// Main solid blob with dramatic distortion
function CoreBlob({ scrollProgress, mouseRef }: { scrollProgress: number; mouseRef: React.MutableRefObject<THREE.Vector2> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const scrollSmooth = useRef(0);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uHover: { value: 0 },
  }), []);

  const vertexShader = `
    ${noiseGLSL}
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    varying float vDisp;
    varying float vNoise2;
    uniform float uTime;
    uniform float uScroll;
    uniform vec2 uMouse;
    void main(){
      vNormal=normalize(normalMatrix*normal);
      // Multi-octave displacement
      float n1=snoise(position*0.8+uTime*0.12)*0.35;
      float n2=snoise(position*1.6+uTime*0.2)*0.15;
      float n3=snoise(position*3.2+uTime*0.35)*0.08;
      float mouseInfluence=snoise(position*1.0+vec3(uMouse*2.0,uTime*0.1))*0.1;
      float disp=n1+n2+n3+mouseInfluence;
      disp*=(1.0+uScroll*0.8);
      vDisp=disp;
      vNoise2=n2;
      vec3 newPos=position+normal*disp;
      vWorldPos=(modelMatrix*vec4(newPos,1.0)).xyz;
      gl_Position=projectionMatrix*modelViewMatrix*vec4(newPos,1.0);
    }
  `;

  const fragmentShader = `
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    varying float vDisp;
    varying float vNoise2;
    uniform float uTime;
    uniform float uScroll;
    void main(){
      vec3 viewDir=normalize(cameraPosition-vWorldPos);
      float fresnel=pow(1.0-abs(dot(vNormal,viewDir)),3.0);
      
      // Rich color palette
      vec3 green=vec3(0.24,1.0,0.77);
      vec3 purple=vec3(0.6,0.4,1.0);
      vec3 cyan=vec3(0.2,0.9,1.0);
      
      vec3 col=mix(green,purple,smoothstep(-0.2,0.3,vDisp));
      col=mix(col,cyan,fresnel*0.6);
      
      // Hot edge glow
      float edgeGlow=fresnel*0.9;
      col+=green*edgeGlow*1.5;
      
      // Subsurface-like depth
      float inner=smoothstep(0.0,0.4,1.0-fresnel)*0.15;
      
      float alpha=edgeGlow+inner+0.05;
      alpha=clamp(alpha,0.0,1.0);
      
      gl_FragColor=vec4(col,alpha);
    }
  `;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    scrollSmooth.current += (scrollProgress - scrollSmooth.current) * 0.03;
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = t;
      matRef.current.uniforms.uScroll.value = scrollSmooth.current;
      matRef.current.uniforms.uMouse.value.lerp(mouseRef.current, 0.04);
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.04;
      meshRef.current.rotation.x = Math.sin(t * 0.025) * 0.2;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouseRef.current.x * 0.3, 0.01);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouseRef.current.y * 0.2, 0.01);
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 80]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.FrontSide}
      />
    </mesh>
  );
}

// Wireframe overlay — same shape but wireframe for that tech look
function WireframeShell({ scrollProgress, mouseRef }: { scrollProgress: number; mouseRef: React.MutableRefObject<THREE.Vector2> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const scrollSmooth = useRef(0);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }), []);

  const vertexShader = `
    ${noiseGLSL}
    varying float vDisp;
    uniform float uTime;
    uniform float uScroll;
    uniform vec2 uMouse;
    void main(){
      float n1=snoise(position*0.8+uTime*0.12)*0.35;
      float n2=snoise(position*1.6+uTime*0.2)*0.15;
      float n3=snoise(position*3.2+uTime*0.35)*0.08;
      float mouseInfluence=snoise(position*1.0+vec3(uMouse*2.0,uTime*0.1))*0.1;
      float disp=(n1+n2+n3+mouseInfluence)*(1.0+uScroll*0.8);
      vDisp=disp;
      // Slightly larger than core
      vec3 newPos=position*1.02+normal*disp;
      gl_Position=projectionMatrix*modelViewMatrix*vec4(newPos,1.0);
    }
  `;

  const fragmentShader = `
    varying float vDisp;
    void main(){
      vec3 col=mix(vec3(0.24,1.0,0.77),vec3(0.6,0.4,1.0),smoothstep(-0.1,0.3,vDisp));
      gl_FragColor=vec4(col,0.08);
    }
  `;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    scrollSmooth.current += (scrollProgress - scrollSmooth.current) * 0.03;
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = t;
      matRef.current.uniforms.uScroll.value = scrollSmooth.current;
      matRef.current.uniforms.uMouse.value.lerp(mouseRef.current, 0.04);
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.04;
      meshRef.current.rotation.x = Math.sin(t * 0.025) * 0.2;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouseRef.current.x * 0.3, 0.01);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouseRef.current.y * 0.2, 0.01);
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 20]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        wireframe
        depthWrite={false}
      />
    </mesh>
  );
}

// Orbiting rings
function OrbitalRings() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });
  return (
    <group ref={group}>
      {[
        { radius: 3.0, tilt: 0.6, speed: 0.04, opacity: 0.1 },
        { radius: 3.5, tilt: -0.3, speed: -0.025, opacity: 0.06 },
        { radius: 4.0, tilt: 1.2, speed: 0.015, opacity: 0.04 },
      ].map((ring, i) => (
        <RingLine key={i} {...ring} />
      ))}
    </group>
  );
}

function RingLine({ radius, tilt, speed, opacity }: { radius: number; tilt: number; speed: number; opacity: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = tilt + state.clock.elapsedTime * speed;
      ref.current.rotation.z = state.clock.elapsedTime * speed * 0.5;
    }
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.005, 16, 128]} />
      <meshBasicMaterial color="#3dffc4" transparent opacity={opacity} />
    </mesh>
  );
}

// Floating dots — scattered particles
function FloatingDots({ count = 250 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute in a sphere shell
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 4 + Math.random() * 12;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.006;
      ref.current.rotation.x = state.clock.elapsedTime * 0.003;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#3dffc4"
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Connecting lines between nearby particles for network effect
function NetworkLines({ count = 80 }: { count?: number }) {
  const ref = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const points: number[] = [];
    const nodes: THREE.Vector3[] = [];
    
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 4 + Math.random() * 6;
      nodes.push(new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ));
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 3) {
          points.push(nodes[i].x, nodes[i].y, nodes[i].z);
          points.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    return geo;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.005;
      ref.current.rotation.x = state.clock.elapsedTime * 0.002;
    }
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#3dffc4" transparent opacity={0.04} blending={THREE.AdditiveBlending} />
    </lineSegments>
  );
}

function ScrollCamera({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();
  const scrollSmooth = useRef(0);
  useFrame(() => {
    scrollSmooth.current += (scrollProgress - scrollSmooth.current) * 0.02;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 5 + scrollSmooth.current * 3, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, scrollSmooth.current * -1.5, 0.02);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene3D() {
  const isMobile = useIsRealMobile();
  const scrollProgress = useScrollProgress();
  const { mouse, target } = useMouseSmooth();

  // Smooth mouse in animation frame
  useEffect(() => {
    let raf: number;
    const update = () => {
      mouse.current.lerp(target.current, 0.06);
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [mouse, target]);

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={isMobile ? [1, 1] : [1, 2]}
        performance={{ min: 0.5 }}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#060a12']} />
        <fog attach="fog" args={['#060a12', 8, 25]} />

        <ScrollCamera scrollProgress={scrollProgress} />
        <CoreBlob scrollProgress={scrollProgress} mouseRef={mouse} />
        <WireframeShell scrollProgress={scrollProgress} mouseRef={mouse} />
        <OrbitalRings />
        <FloatingDots count={isMobile ? 80 : 250} />
        {!isMobile && <NetworkLines count={80} />}
      </Canvas>
    </div>
  );
}
