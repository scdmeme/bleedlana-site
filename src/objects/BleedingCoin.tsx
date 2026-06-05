"use client";

import { Float, Line, Text } from "@react-three/drei";
import { Vector3 } from "three";
import { LiquidRedTrail } from "@/objects/LiquidRedTrail";

type Tuple3 = [number, number, number];

type BleedingCoinProps = {
  label?: string;
  position?: Tuple3;
  scale?: number;
};

const crackLines = [
  [
    new Vector3(-0.35, 0.35, 0.32),
    new Vector3(-0.05, 0.08, 0.34),
    new Vector3(0.15, -0.1, 0.32)
  ],
  [
    new Vector3(0.12, 0.25, 0.33),
    new Vector3(0.36, 0.03, 0.34),
    new Vector3(0.42, -0.34, 0.32)
  ],
  [
    new Vector3(-0.05, 0.08, 0.35),
    new Vector3(-0.28, -0.18, 0.34),
    new Vector3(-0.42, -0.5, 0.32)
  ]
];

export function BleedingCoin({ label = "BTC", position = [0, 0, 0], scale = 1 }: BleedingCoinProps) {
  return (
    <Float floatIntensity={0.35} rotationIntensity={0.22} speed={1.4}>
      <group position={position} scale={scale}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.12, 1.12, 0.28, 72]} />
          <meshStandardMaterial
            color="#d69b28"
            emissive="#8a2200"
            emissiveIntensity={0.8}
            metalness={0.8}
            roughness={0.24}
          />
        </mesh>
        <mesh position={[0, 0, 0.18]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.88, 0.035, 12, 96]} />
          <meshBasicMaterial color="#ffdd80" />
        </mesh>
        <Text
          color="#1a0800"
          fontSize={0.42}
          fontWeight={900}
          letterSpacing={0}
          position={[0, -0.04, 0.35]}
        >
          {label}
        </Text>
        {crackLines.map((points, index) => (
          <Line key={index} points={points} color="#240000" lineWidth={3} />
        ))}
        <LiquidRedTrail
          color="#ff183f"
          points={[
            [0.1, -0.62, 0.32],
            [0.05, -1.15, 0.2],
            [0.18, -1.8, 0.05]
          ]}
          radius={0.045}
        />
        <LiquidRedTrail
          color="#b40018"
          points={[
            [-0.32, -0.46, 0.32],
            [-0.52, -1.05, 0.15],
            [-0.46, -1.55, -0.08]
          ]}
          radius={0.035}
        />
      </group>
    </Float>
  );
}
