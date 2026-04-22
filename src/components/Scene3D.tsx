import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Icosahedron } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
// Detect actual mobile devices, not just small viewports (preview is ~766px but not mobile)
function useIsRealMobile() {
  if (typeof navigator === 'undefined') return false;
  return /Android|iPhone|iPod/i.test(navigator.userAgent) && 'ontouchstart' in window;
}

function FloatingOrb({ position, color, speed = 1, distort = 0.4, size = 1 }: {
  position: [number, number, number];
  color: string;
  speed?: number;
  distort?: number;
  size?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3;
    }
  });

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <Sphere ref={meshRef} args={[size, 32, 32]} position={position}>
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={2}
          roughness={0.15}
          metalness={0.9}
          transparent
          opacity={0.6}
        />
      </Sphere>
    </Float>
  );
}

function FloatingRing({ position, color, speed = 1, scale = 1 }: {
  position: [number, number, number];
  color: string;
  speed?: number;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1 * speed;
    }
  });

  return (
    <Float speed={speed * 1.2} rotationIntensity={0.8} floatIntensity={1}>
      <Torus ref={meshRef} args={[1 * scale, 0.04, 16, 48]} position={position}>
        <meshStandardMaterial color={color} metalness={0.95} roughness={0.05} transparent opacity={0.4} />
      </Torus>
    </Float>
  );
}

function FloatingGeo({ position, color }: {
  position: [number, number, number];
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={1} floatIntensity={1.5}>
      <Icosahedron args={[0.6, 1]} position={position}>
        <meshStandardMaterial color={color} wireframe metalness={0.8} roughness={0.2} transparent opacity={0.35} />
      </Icosahedron>
    </Float>
  );
}

function Particles({ count = 350 }: { count?: number }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return pos;
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.015;
      ref.current.rotation.x = state.clock.elapsedTime * 0.008;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#3dffc4" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function GlowSphere() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1);
    }
  });

  return (
    <Sphere ref={ref} args={[2.5, 16, 16]} position={[0, 0, -8]}>
      <meshBasicMaterial color="#3dffc4" transparent opacity={0.02} />
    </Sphere>
  );
}

export default function Scene3D() {
  const isMobile = useIsRealMobile();

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        frameloop={isMobile ? 'demand' : 'always'}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} color="#3dffc4" />
        <pointLight position={[-5, -5, 5]} intensity={0.3} color="#9966ff" />
        {!isMobile && <pointLight position={[0, 5, -5]} intensity={0.2} color="#3dffc4" />}

        {/* Fewer orbs on mobile */}
        <FloatingOrb position={[-3, 2, -2]} color="#3dffc4" speed={0.8} distort={isMobile ? 0.2 : 0.5} size={1.2} />
        <FloatingOrb position={[3.5, -1.5, -3]} color="#9966ff" speed={0.6} distort={isMobile ? 0.15 : 0.3} size={0.8} />
        {!isMobile && (
          <>
            <FloatingOrb position={[0, -3, -4]} color="#3dffc4" speed={1} distort={0.4} size={0.5} />
            <FloatingOrb position={[-1.5, 0, -5]} color="#9966ff" speed={0.4} distort={0.2} size={1.5} />
          </>
        )}

        {/* Fewer rings on mobile */}
        <FloatingRing position={[2, 2.5, -1]} color="#3dffc4" speed={0.7} />
        {!isMobile && (
          <>
            <FloatingRing position={[-2.5, -2, -2]} color="#9966ff" speed={0.9} />
            <FloatingRing position={[0, 0, -3]} color="#3dffc4" speed={0.3} scale={1.8} />
          </>
        )}

        {/* Fewer geos on mobile */}
        <FloatingGeo position={[4, 0, -2]} color="#3dffc4" />
        {!isMobile && (
          <>
            <FloatingGeo position={[-4, 1, -3]} color="#9966ff" />
            <FloatingGeo position={[1, 3, -4]} color="#3dffc4" />
          </>
        )}

        <GlowSphere />
        <Particles count={isMobile ? 100 : 350} />
      </Canvas>
    </div>
  );
}
