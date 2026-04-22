import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';

function useIsRealMobile() {
  if (typeof navigator === 'undefined') return false;
  return /Android|iPhone|iPod/i.test(navigator.userAgent) && 'ontouchstart' in window;
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
    const loop = () => { mouse.current.lerp(target.current, 0.04); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [mouse, target]);
  return mouse;
}

// Floating grid plane
function GridPlane() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.z = -2 + Math.sin(state.clock.elapsedTime * 0.1) * 0.3;
    }
  });
  
  const gridMat = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#00f0ff') },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        varying vec2 vUv;
        void main() {
          vec2 grid = abs(fract(vUv * 20.0 - 0.5) - 0.5) / fwidth(vUv * 20.0);
          float line = min(grid.x, grid.y);
          float alpha = 1.0 - min(line, 1.0);
          alpha *= 0.08;
          // Fade edges
          float edgeFade = smoothstep(0.0, 0.3, vUv.x) * smoothstep(1.0, 0.7, vUv.x) 
                         * smoothstep(0.0, 0.3, vUv.y) * smoothstep(1.0, 0.7, vUv.y);
          alpha *= edgeFade;
          // Pulse
          alpha *= 0.7 + sin(uTime * 0.3 + vUv.y * 10.0) * 0.3;
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
    });
  }, []);

  useFrame((state) => {
    gridMat.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 3, 0, 0]} position={[0, -2, -2]} material={gridMat}>
      <planeGeometry args={[20, 20, 1, 1]} />
    </mesh>
  );
}

// Floating particles
function Particles({ count = 200, mouseRef }: { count?: number; mouseRef: React.MutableRefObject<THREE.Vector2> }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.008 + mouseRef.current.x * 0.1;
      ref.current.rotation.x = state.clock.elapsedTime * 0.004 + mouseRef.current.y * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00f0ff"
        transparent
        opacity={0.35}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Accent particles (magenta)
function AccentParticles({ count = 40 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 4;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = -state.clock.elapsedTime * 0.006;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#ff0055"
        transparent
        opacity={0.25}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Subtle scan line effect
function ScanLine() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const y = ((state.clock.elapsedTime * 0.3) % 2 - 1) * 6;
      ref.current.position.y = y;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0, 1]}>
      <planeGeometry args={[20, 0.02]} />
      <meshBasicMaterial color="#00f0ff" transparent opacity={0.06} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

export default function Scene3D() {
  const isMobile = useIsRealMobile();
  const mouse = useMouseSmooth();

  return (
    <div className="fixed inset-0 -z-10">
      {/* CSS grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-[0.08] pointer-events-none" />
      <div className="absolute inset-0 scanlines pointer-events-none" />
      
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#030304']} />
        <fog attach="fog" args={['#030304', 8, 20]} />

        <GridPlane />
        <Particles count={isMobile ? 80 : 200} mouseRef={mouse} />
        {!isMobile && <AccentParticles count={40} />}
        <ScanLine />
      </Canvas>
    </div>
  );
}
