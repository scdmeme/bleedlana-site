"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Object3D, type InstancedMesh } from "three";

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
  const bodyRef = useRef<InstancedMesh>(null);
  const wickRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
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
    if (!bodyRef.current || !wickRef.current) {
      return;
    }

    const elapsed = clock.getElapsedTime();
    candles.forEach((candle, index) => {
      const loop = (elapsed * candle.speed + candle.delay) % 8;
      dummy.position.set(candle.x, candle.y - loop, candle.z);
      dummy.rotation.set(
        candle.rotation[0] + elapsed * 0.08 * candle.speed,
        candle.rotation[1],
        candle.rotation[2] - elapsed * 0.12 * candle.speed
      );
      dummy.scale.setScalar(candle.scale);
      dummy.updateMatrix();
      bodyRef.current?.setMatrixAt(index, dummy.matrix);
      wickRef.current?.setMatrixAt(index, dummy.matrix);
    });
    bodyRef.current.instanceMatrix.needsUpdate = true;
    wickRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group position={position}>
      <instancedMesh ref={bodyRef} args={[undefined, undefined, count]} frustumCulled={false}>
        <boxGeometry args={[0.18, 0.72, 0.16, 2, 4, 2]} />
        <meshPhysicalMaterial
          color="#a90017"
          emissive="#ff183f"
          emissiveIntensity={1.35}
          metalness={0.5}
          roughness={0.26}
        />
      </instancedMesh>
      <instancedMesh ref={wickRef} args={[undefined, undefined, count]} frustumCulled={false}>
        <boxGeometry args={[0.028, 1.08, 0.028]} />
        <meshBasicMaterial color="#ffb4c0" />
      </instancedMesh>
    </group>
  );
}
