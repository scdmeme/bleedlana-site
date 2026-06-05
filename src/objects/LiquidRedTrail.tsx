"use client";

import { useMemo } from "react";
import { MeshDistortMaterial } from "@react-three/drei";
import { CatmullRomCurve3, TubeGeometry, Vector3 } from "three";

type Tuple3 = [number, number, number];

type LiquidRedTrailProps = {
  color?: string;
  emissiveIntensity?: number;
  points: Tuple3[];
  radius?: number;
};

export function LiquidRedTrail({
  color = "#ff183f",
  emissiveIntensity = 1.4,
  points,
  radius = 0.06
}: LiquidRedTrailProps) {
  const geometry = useMemo(() => {
    const curve = new CatmullRomCurve3(
      points.map((point) => new Vector3(point[0], point[1], point[2]))
    );

    return new TubeGeometry(curve, 48, radius, 10, false);
  }, [points, radius]);

  return (
    <mesh geometry={geometry}>
      <MeshDistortMaterial
        color={color}
        distort={0.38}
        emissive={color}
        emissiveIntensity={emissiveIntensity}
        metalness={0.05}
        roughness={0.28}
        speed={1.7}
      />
    </mesh>
  );
}
