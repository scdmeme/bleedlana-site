"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, BufferAttribute, BufferGeometry, Points } from "three";

type Tuple3 = [number, number, number];

type FractureSparksProps = {
  count?: number;
  position?: Tuple3;
  radius?: number;
};

function noise(seed: number) {
  const value = Math.sin(seed * 149.13) * 43758.5453;
  return value - Math.floor(value);
}

export function FractureSparks({
  count = 52,
  position = [0, 0, 0],
  radius = 2.4
}: FractureSparksProps) {
  const pointsRef = useRef<Points>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      positions[index * 3] = (noise(index + 1) - 0.5) * radius;
      positions[index * 3 + 1] = (noise(index + 11) - 0.5) * radius;
      positions[index * 3 + 2] = (noise(index + 21) - 0.5) * radius;
    }

    const next = new BufferGeometry();
    next.setAttribute("position", new BufferAttribute(positions, 3));
    return next;
  }, [count, radius]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    pointsRef.current.rotation.z = t * 0.11;
    pointsRef.current.scale.setScalar(0.92 + Math.sin(t * 2.4) * 0.08);
  });

  return (
    <points ref={pointsRef} geometry={geometry} position={position}>
      <pointsMaterial
        blending={AdditiveBlending}
        color="#ff6b7f"
        depthWrite={false}
        opacity={0.9}
        size={0.055}
        sizeAttenuation
        transparent
      />
    </points>
  );
}
