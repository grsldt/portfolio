import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useEffect, useState } from 'react';
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

function useMousePosition() {
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return mouse;
}

function MorphBlob({ scrollProgress, mouse }: { scrollProgress: number; mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uColor1: { value: new THREE.Color('#3dffc4').multiplyScalar(0.4) },
    uColor2: { value: new THREE.Color('#9966ff').multiplyScalar(0.4) },
  }), []);

  const vertexShader = `
    varying vec3 vNormal;
    varying float vDisplacement;
    uniform float uTime;
    uniform float uScroll;

    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    
    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    void main() {
      vNormal = normalize(normalMatrix * normal);
      float noise = snoise(position * 1.2 + uTime * 0.15) * (0.12 + uScroll * 0.15);
      float noise2 = snoise(position * 2.5 + uTime * 0.25) * 0.04;
      float displacement = noise + noise2;
      vDisplacement = displacement;
      vec3 newPosition = position + normal * displacement;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec3 vNormal;
    varying float vDisplacement;
    uniform float uTime;
    uniform float uScroll;
    uniform vec3 uColor1;
    uniform vec3 uColor2;

    void main() {
      float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
      vec3 color = mix(uColor1, uColor2, vDisplacement * 4.0 + 0.5 + uScroll * 0.5);
      
      // Only show edges (wireframe-like glow)
      float alpha = fresnel * 0.35;
      // Inner fill very faint
      alpha += 0.02;
      
      gl_FragColor = vec4(color, alpha);
    }
  `;

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uScroll.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uScroll.value, scrollProgress, 0.03
      );
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.15;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouse.current.x * 0.4, 0.015);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouse.current.y * 0.3, 0.015);
    }
  });

  return (
    <mesh ref={meshRef} position={[1.5, 0, 0]}>
      <icosahedronGeometry args={[1.4, 48]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Wireframe ring orbiting
function OrbitRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.06 + 0.5;
      ref.current.rotation.z = state.clock.elapsedTime * 0.04;
    }
  });
  return (
    <mesh ref={ref} position={[1.5, 0, 0]}>
      <torusGeometry args={[2.2, 0.008, 16, 100]} />
      <meshBasicMaterial color="#3dffc4" transparent opacity={0.12} />
    </mesh>
  );
}

function Particles({ count = 150 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 4;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.008;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#3dffc4"
        transparent
        opacity={0.25}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function ScrollCamera({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 5 + scrollProgress * 1.5, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, scrollProgress * -0.5, 0.02);
  });
  return null;
}

export default function Scene3D() {
  const isMobile = useIsRealMobile();
  const scrollProgress = useScrollProgress();
  const mouse = useMousePosition();

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['hsl(220, 20%, 4%)']} />
        <fog attach="fog" args={['hsl(220, 20%, 4%)', 6, 22]} />

        <ScrollCamera scrollProgress={scrollProgress} />
        <MorphBlob scrollProgress={scrollProgress} mouse={mouse} />
        <OrbitRing />
        <Particles count={isMobile ? 60 : 150} />
      </Canvas>
    </div>
  );
}
