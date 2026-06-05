"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

type Tuple3 = [number, number, number];

type FallingCandlesProps = {
  count?: number;
  position?: Tuple3;
  radius?: number;
};

function mulberry32(seed: number) {
  return function random() {
    let next = (seed += 0x6d2b79f5);
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

export function FallingCandles({
  count = 32,
  position = [0, 0, 0],
  radius = 8
}: FallingCandlesProps) {
  const groupRef = useRef<Group>(null);
  const candles = useMemo(() => {
    const random = mulberry32(8138);

    return Array.from({ length: count }, (_, index) => ({
      x: (random() - 0.5) * radius,
      y: random() * 7 + 0.8,
      z: (random() - 0.5) * radius - 1.5,
      speed: 0.32 + random() * 0.8,
      scale: 0.7 + random() * 1.4,
      rotation: [random() * Math.PI, random() * Math.PI, random() * Math.PI] as Tuple3,
      delay: index * 0.19
    }));
  }, [count, radius]);

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return;
    }

    const elapsed = clock.getElapsedTime();
    groupRef.current.children.forEach((child, index) => {
      const candle = candles[index];
      const loop = (elapsed * candle.speed + candle.delay) % 8;
      child.position.y = candle.y - loop;
      child.rotation.x += 0.004 * candle.speed;
      child.rotation.z -= 0.006 * candle.speed;
    });
  });

  return (
    <group ref={groupRef} position={position}>
      {candles.map((candle, index) => (
        <group
          key={index}
          position={[candle.x, candle.y, candle.z]}
          rotation={candle.rotation}
          scale={candle.scale}
        >
          <mesh>
            <boxGeometry args={[0.18, 0.72, 0.16]} />
            <meshStandardMaterial
              color={index % 4 === 0 ? "#ff8a00" : "#ff183f"}
              emissive="#ff183f"
              emissiveIntensity={1.1}
              roughness={0.38}
            />
          </mesh>
          <mesh>
            <boxGeometry args={[0.035, 1.08, 0.035]} />
            <meshBasicMaterial color="#ffd7dd" />
          </mesh>
        </group>
      ))}
    </group>
  );
}
