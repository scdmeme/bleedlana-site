"use client";

import { Float } from "@react-three/drei";
import { LiquidRedTrail } from "@/objects/LiquidRedTrail";

type Tuple3 = [number, number, number];

type BleedlanaMark3DProps = {
  position?: Tuple3;
  scale?: number;
  floating?: boolean;
};

function Stripe({ y, width = 2.8 }: { y: number; width?: number }) {
  return (
    <group position={[0, y, 0]} rotation={[0, 0, -0.13]}>
      <mesh>
        <boxGeometry args={[width, 0.46, 0.36]} />
        <meshStandardMaterial
          color="#b90019"
          emissive="#ff183f"
          emissiveIntensity={1.15}
          metalness={0.34}
          roughness={0.18}
        />
      </mesh>
      <mesh position={[0, 0.235, 0.03]}>
        <boxGeometry args={[width * 0.96, 0.035, 0.38]} />
        <meshBasicMaterial color="#ffd1d7" transparent opacity={0.72} />
      </mesh>
    </group>
  );
}

function MarkBody() {
  return (
    <group>
      <Stripe y={0.78} width={2.95} />
      <Stripe y={0} width={2.75} />
      <Stripe y={-0.78} width={2.95} />
      <LiquidRedTrail
        points={[
          [-0.95, 0.55, 0.2],
          [-0.9, -0.25, 0.12],
          [-1.05, -1.25, 0.02]
        ]}
        radius={0.04}
      />
      <LiquidRedTrail
        points={[
          [0.15, 0.78, 0.22],
          [0.1, 0.1, 0.12],
          [0.2, -1.15, 0.04]
        ]}
        radius={0.048}
      />
      <LiquidRedTrail
        color="#8a0012"
        points={[
          [1.08, 0.72, 0.2],
          [1.0, -0.18, 0.12],
          [1.18, -1.35, 0.02]
        ]}
        radius={0.038}
      />
    </group>
  );
}

export function BleedlanaMark3D({
  floating = true,
  position = [0, 0, 0],
  scale = 1
}: BleedlanaMark3DProps) {
  const body = (
    <group position={position} scale={scale}>
      <MarkBody />
    </group>
  );

  if (!floating) {
    return body;
  }

  return (
    <Float floatIntensity={0.26} rotationIntensity={0.12} speed={1}>
      {body}
    </Float>
  );
}
