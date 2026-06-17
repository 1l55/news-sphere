'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Globe({ color, state }: { color: string; state: string; scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ringRef.current) ringRef.current.rotation.z += 0.008;
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.8, 2]} />
        <meshPhysicalMaterial color={color} roughness={0.2} metalness={0.1} transparent opacity={0.75} clearcoat={0.1} wireframe={state === 'expanded'} />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[1.05, 0.03, 16, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

export function Scale({ color }: { color: string; state: string; scale: number }) {
  return (
    <group>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 8]} />
        <meshStandardMaterial color="#B8860B" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.08, 16]} />
        <meshStandardMaterial color="#C9A84C" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[-0.5, -0.4, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.6, 0.6, 0.07, 16]} />
        <meshStandardMaterial color="#C9A84C" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[0.5, -0.4, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.6, 0.6, 0.07, 16]} />
        <meshStandardMaterial color="#C9A84C" roughness={0.2} metalness={0.9} />
      </mesh>
    </group>
  );
}

export function Prism({ color, state }: { color: string; state: string; scale: number }) {
  return (
    <group>
      <mesh rotation={[0, Math.PI / 4, 0]}>
        <octahedronGeometry args={[0.7, 1]} />
        <meshPhysicalMaterial color={color} roughness={0.1} metalness={0.05} transparent opacity={0.7} clearcoat={state === 'expanded' ? 1 : 0.3} envMapIntensity={0.5} />
      </mesh>
    </group>
  );
}

export function Torch({ color, state }: { color: string; state: string; scale: number }) {
  const intensity = state === 'new-message' ? 1.5 : 0.8;
  return (
    <group>
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 0.7, 8]} />
        <meshStandardMaterial color="#8B7355" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <coneGeometry args={[0.35, 0.7, 8]} />
        <meshStandardMaterial color={color} roughness={0.3} emissive={color} emissiveIntensity={intensity} />
      </mesh>
      <pointLight position={[0, 0.2, 0]} intensity={intensity * 0.5} color={color} distance={2} />
    </group>
  );
}

export function Mask({ color, state }: { color: string; state: string; scale: number }) {
  const flipAngle = state === 'expanded' ? Math.PI / 6 : 0;
  return (
    <group rotation={[0, flipAngle, 0]}>
      <mesh>
        <sphereGeometry args={[0.55, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.3} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.25, 0.1]}>
        <boxGeometry args={[0.25, 0.08, 0.04]} />
        <meshStandardMaterial color="#F0EDE6" roughness={0.5} />
      </mesh>
    </group>
  );
}

export function TreeOfLife({ color, state }: { color: string; state: string; scale: number }) {
  return (
    <group>
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.12, 0.18, 0.7, 8]} />
        <meshStandardMaterial color="#8B6914" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <coneGeometry args={[0.6, 0.9, 8]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <coneGeometry args={[0.4, 0.7, 8]} />
        <meshStandardMaterial color={color} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color={color} roughness={0.1} emissive={color} emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

export function InkBottle({ color }: { color: string; state: string; scale: number }) {
  return (
    <group>
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.35, 0.45, 0.6, 12]} />
        <meshPhysicalMaterial color={color} roughness={0.1} metalness={0.2} transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 0.25, 12]} />
        <meshStandardMaterial color="#8B8BA3" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[0.3, 0.4, -0.1]} rotation={[0, 0, Math.PI / 4]}>
        <capsuleGeometry args={[0.04, 0.5, 4, 8]} />
        <meshStandardMaterial color="#F0EDE6" roughness={0.5} />
      </mesh>
    </group>
  );
}

export function CoffeeCup({ color }: { color: string; state: string; scale: number }) {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.35, 0.7, 16]} />
        <meshStandardMaterial color={color} roughness={0.2} />
      </mesh>
      <mesh position={[0.45, 0.1, 0]}>
        <torusGeometry args={[0.2, 0.06, 8, 12]} />
        <meshStandardMaterial color={color} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.36, 0.36, 0.06, 16]} />
        <meshStandardMaterial color="#3E2723" roughness={0.3} />
      </mesh>
      {/* steam particles */}
      <mesh position={[0, 0.55, 0]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color="#F0EDE6" roughness={0.1} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export function Amber({ color }: { color: string; state: string; scale: number }) {
  return (
    <group>
      <mesh>
        <dodecahedronGeometry args={[0.6, 1]} />
        <meshPhysicalMaterial color={color} roughness={0.1} metalness={0.05} transparent opacity={0.65} clearcoat={0.5} envMapIntensity={0.3} />
      </mesh>
      <mesh position={[0.15, -0.1, 0.25]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#2E7D32" roughness={0.4} />
      </mesh>
    </group>
  );
}
