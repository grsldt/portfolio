import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';

// Detect real mobile devices
function useIsRealMobile() {
  if (typeof navigator === 'undefined') return false;
  return /Android|iPhone|iPod/i.test(navigator.userAgent) && 'ontouchstart' in window;
}

// Scroll progress hook
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

// Mouse position hook
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

// Single morphing blob that reacts to scroll + mouse
function MorphBlob({ scrollProgress, mouse }: { scrollProgress: number; mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColor1: { value: new THREE.Color('#3dffc4') },
    uColor2: { value: new THREE.Color('#9966ff') },
  }), []);

  const vertexShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying float vDisplacement;
    uniform float uTime;
    uniform float uScroll;

    // Simplex-like noise
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
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
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
      vNormal = normal;
      vPosition = position;
      
      float noise = snoise(position * 1.5 + uTime * 0.3) * (0.15 + uScroll * 0.25);
      float noise2 = snoise(position * 3.0 + uTime * 0.5) * 0.05;
      float displacement = noise + noise2;
      vDisplacement = displacement;
      
      vec3 newPosition = position + normal * displacement;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying float vDisplacement;
    uniform float uTime;
    uniform float uScroll;
    uniform vec3 uColor1;
    uniform vec3 uColor2;

    void main() {
      float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);
      vec3 color = mix(uColor1, uColor2, vDisplacement * 3.0 + uScroll);
      float alpha = fresnel * 0.6 + 0.1;
      
      // Add edge glow
      color += fresnel * uColor1 * 0.5;
      
      gl_FragColor = vec4(color, alpha);
    }
  `;

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uScroll.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uScroll.value,
        scrollProgress,
        0.05
      );
      materialRef.current.uniforms.uMouse.value.lerp(
        new THREE.Vector2(mouse.current.x, mouse.current.y),
        0.05
      );
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
      // Subtle mouse follow
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouse.current.x * 0.3, 0.02);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouse.current.y * 0.2, 0.02);
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.8, 64]} />
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

// Floating particles that drift slowly
function Particles({ count = 200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  
  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 3;
      sz[i] = Math.random() * 2 + 0.5;
    }
    return { positions: pos, sizes: sz };
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.01;
      ref.current.rotation.x = state.clock.elapsedTime * 0.005;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#3dffc4"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Camera that subtly moves with scroll
function ScrollCamera({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();
  
  useFrame(() => {
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 4 + scrollProgress * 2, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, scrollProgress * -1, 0.03);
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
        camera={{ position: [0, 0, 4], fov: 50 }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#080b14']} />
        <fog attach="fog" args={['#080b14', 5, 20]} />
        
        <ambientLight intensity={0.15} />
        <pointLight position={[5, 5, 5]} intensity={0.3} color="#3dffc4" />
        <pointLight position={[-5, -3, 3]} intensity={0.2} color="#9966ff" />

        <ScrollCamera scrollProgress={scrollProgress} />
        <MorphBlob scrollProgress={scrollProgress} mouse={mouse} />
        <Particles count={isMobile ? 80 : 200} />
      </Canvas>
    </div>
  );
}
