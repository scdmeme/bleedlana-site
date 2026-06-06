"use client";

import { Edges, Float, Line, Text } from "@react-three/drei";
import { Vector3 } from "three";
import { FractureSparks } from "@/objects/FractureSparks";
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
          <cylinderGeometry args={[1.12, 1.12, 0.34, 96, 2]} />
          <meshPhysicalMaterial
            color="#7c4307"
            emissive="#b32600"
            emissiveIntensity={0.62}
            metalness={0.92}
            roughness={0.19}
            clearcoat={0.6}
          />
          <Edges color="#ffbf55" threshold={34} />
        </mesh>
        <mesh position={[0, 0, 0.18]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.88, 0.035, 12, 96]} />
          <meshPhysicalMaterial
            color="#ff9b25"
            emissive="#ff5a00"
            emissiveIntensity={1.25}
            metalness={0.8}
            roughness={0.16}
          />
        </mesh>
        <Text
          color="#fff0c5"
          fontSize={0.42}
          fontWeight={900}
          letterSpacing={0}
          position={[0, -0.04, 0.41]}
        >
          {label}
        </Text>
        {crackLines.map((points, index) => (
          <Line key={index} points={points} color="#240000" lineWidth={3} />
        ))}
        <FractureSparks count={58} position={[0, 0, 0.3]} radius={2.8} />
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
