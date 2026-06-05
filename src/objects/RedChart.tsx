"use client";

import { useMemo } from "react";
import { Line } from "@react-three/drei";
import { Vector3 } from "three";

type Tuple3 = [number, number, number];

type RedChartProps = {
  color?: string;
  lineWidth?: number;
  opacity?: number;
  position?: Tuple3;
  rotation?: Tuple3;
  scale?: number | Tuple3;
  variant?: "hero" | "crash" | "spiral";
};

function makeCrashPoints() {
  return [
    new Vector3(-3.2, 1.2, 0),
    new Vector3(-2.2, 1.55, 0),
    new Vector3(-1.2, 1.15, 0),
    new Vector3(-0.2, 1.4, 0),
    new Vector3(0.8, 0.25, 0),
    new Vector3(1.55, 0.5, 0),
    new Vector3(2.15, -0.75, 0),
    new Vector3(3.05, -1.2, 0)
  ];
}

function makeHeroPoints() {
  return [
    new Vector3(-4.2, 1.45, 0),
    new Vector3(-3.2, 1.7, 0),
    new Vector3(-2.2, 1.35, 0),
    new Vector3(-1.1, 0.95, 0),
    new Vector3(-0.1, 1.1, 0),
    new Vector3(0.9, 0.25, 0),
    new Vector3(1.85, -0.45, 0),
    new Vector3(2.6, -0.2, 0),
    new Vector3(3.8, -1.8, 0)
  ];
}

function makeSpiralPoints() {
  return Array.from({ length: 74 }, (_, index) => {
    const t = index / 73;
    const angle = t * Math.PI * 5.4;
    const radius = 2.8 - t * 2.15;

    return new Vector3(
      Math.cos(angle) * radius,
      1.6 - t * 3.2,
      Math.sin(angle) * radius
    );
  });
}

export function RedChart({
  color = "#ff183f",
  lineWidth = 3,
  opacity = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  variant = "crash"
}: RedChartProps) {
  const points = useMemo(() => {
    if (variant === "hero") {
      return makeHeroPoints();
    }

    if (variant === "spiral") {
      return makeSpiralPoints();
    }

    return makeCrashPoints();
  }, [variant]);

  const candlePoints = useMemo(
    () =>
      points
        .filter((_, index) => index % 2 === 0)
        .map((point, index) => ({
          point,
          height: 0.5 + index * 0.08
        })),
    [points]
  );

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Line
        points={points}
        color={color}
        lineWidth={lineWidth}
        transparent
        opacity={opacity}
      />
      {candlePoints.map(({ point, height }, index) => (
        <group key={`${point.x}-${index}`} position={[point.x, point.y, point.z]}>
          <mesh>
            <boxGeometry args={[0.16, height, 0.16]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? "#ff183f" : "#7e0012"}
              emissive="#ff183f"
              emissiveIntensity={1.2}
              roughness={0.45}
            />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.035, height + 0.38, 0.035]} />
            <meshBasicMaterial color="#ff98a8" />
          </mesh>
        </group>
      ))}
    </group>
  );
}
