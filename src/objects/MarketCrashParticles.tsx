"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

type Tuple3 = [number, number, number];

type MarketCrashParticlesProps = {
  count?: number;
  position?: Tuple3;
  spread?: number;
};

function randomFrom(seed: number) {
  const value = Math.sin(seed * 999) * 10000;
  return value - Math.floor(value);
}

export function MarketCrashParticles({
  count = 64,
  position = [0, 0, 0],
  spread = 7
}: MarketCrashParticlesProps) {
  const groupRef = useRef<Group>(null);
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        x: (randomFrom(index + 1) - 0.5) * spread,
        y: (randomFrom(index + 11) - 0.5) * spread * 0.55,
        z: (randomFrom(index + 21) - 0.5) * spread,
        scale: 0.05 + randomFrom(index + 31) * 0.16,
        speed: 0.12 + randomFrom(index + 41) * 0.42
      })),
    [count, spread]
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return;
    }

    const elapsed = clock.getElapsedTime();
    groupRef.current.children.forEach((child, index) => {
      const particle = particles[index];
      child.position.y = particle.y + Math.sin(elapsed * particle.speed + index) * 0.25;
      child.rotation.x += 0.004 + particle.speed * 0.002;
      child.rotation.y -= 0.003;
    });
  });

  return (
    <group ref={groupRef} position={position}>
      {particles.map((particle, index) => (
        <mesh
          key={index}
          position={[particle.x, particle.y, particle.z]}
          scale={particle.scale}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={index % 5 === 0 ? "#ff8a00" : "#ff183f"}
            emissive="#ff183f"
            emissiveIntensity={0.85}
            roughness={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}
