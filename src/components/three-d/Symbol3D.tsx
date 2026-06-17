'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import type { NewsDomain } from '@/lib/types';
import { getDomainColor } from '@/lib/utils';
import { Globe, Scale, Prism, Torch, Mask, TreeOfLife, InkBottle, CoffeeCup, Amber } from './symbols';

export type Symbol3DState = 'idle' | 'new-message' | 'selected' | 'expanded';

interface Symbol3DProps {
  domain: NewsDomain;
  state?: Symbol3DState;
  size?: number;
}

const symbolMap: Record<NewsDomain, React.FC<{ color: string; state: Symbol3DState; scale: number }>> = {
  international: Globe,
  finance: Scale,
  technology: Prism,
  sports: Torch,
  entertainment: Mask,
  health: TreeOfLife,
  education: InkBottle,
  lifestyle: CoffeeCup,
  environment: Amber,
};

function SymbolModel({ domain, state = 'idle', size = 1 }: Symbol3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const color = getDomainColor(domain);
  const scale = size ?? 1;
  const Component = symbolMap[domain];

  useFrame((state3d) => {
    if (!groupRef.current) return;
    const t = state3d.clock.elapsedTime;
    // idle: gentle float + slow rotation
    if (state === 'idle') {
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.15;
      groupRef.current.rotation.y += 0.003;
    }
    // new-message: pulse glow
    if (state === 'new-message') {
      const pulse = 1 + Math.sin(t * 3) * 0.08;
      groupRef.current.scale.setScalar(pulse);
      groupRef.current.rotation.y += 0.006;
    }
    // selected: faster rotation + elevated
    if (state === 'selected') {
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.25;
      groupRef.current.rotation.y += 0.015;
      groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.1;
    }
    // expanded: slow majestic rotation
    if (state === 'expanded') {
      groupRef.current.rotation.y += 0.004;
      groupRef.current.rotation.z += 0.001;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
        <Component color={color} state={state} scale={scale} />
      </Float>
    </group>
  );
}

function InnerParticles({ color }: { color: string }) {
  const particles = useMemo(() => {
    const arr = new Float32Array(60 * 3);
    for (let i = 0; i < 60; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 3;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 3;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    return arr;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color={color} transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

export default function Symbol3D({ domain, state = 'idle', size = 1 }: Symbol3DProps) {
  const color = getDomainColor(domain);

  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 3.5], fov: 35 }}
      style={{ width: size * 160, height: size * 160, background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[2, 2, 2]} intensity={1.5} color={color} />
      <pointLight position={[-1, -0.5, -1]} intensity={0.5} color="#F0EDE6" />
      <Environment preset="city" />
      <SymbolModel domain={domain} state={state} size={size} />
      <InnerParticles color={color} />
    </Canvas>
  );
}
