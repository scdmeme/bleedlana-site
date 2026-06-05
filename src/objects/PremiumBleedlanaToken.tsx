"use client";

import { Edges, Float, Text } from "@react-three/drei";
import { Shape } from "three";
import { LiquidRedTrail } from "@/objects/LiquidRedTrail";

type Tuple3 = [number, number, number];

type PremiumBleedlanaTokenProps = {
  position?: Tuple3;
  scale?: number;
  floating?: boolean;
};

function Stripe({ y, width = 1.45 }: { y: number; width?: number }) {
  const shape = new Shape();
  const h = 0.18;
  const skew = 0.18;

  shape.moveTo(-width / 2 + skew, -h);
  shape.lineTo(width / 2 + skew, -h);
  shape.lineTo(width / 2 - skew, h);
  shape.lineTo(-width / 2 - skew, h);
  shape.closePath();

  return (
    <mesh position={[0.08, y, 0.37]} rotation={[0, 0, -0.04]}>
      <extrudeGeometry
        args={[
          shape,
          {
            bevelEnabled: true,
            bevelSegments: 5,
            bevelSize: 0.035,
            bevelThickness: 0.035,
            depth: 0.12,
            steps: 1
          }
        ]}
      />
      <meshPhysicalMaterial
        color="#c5001b"
        emissive="#ff183f"
        emissiveIntensity={0.85}
        metalness={0.65}
        roughness={0.18}
        clearcoat={0.7}
        clearcoatRoughness={0.2}
      />
      <Edges color="#ffcad2" threshold={32} />
    </mesh>
  );
}

function TokenBody() {
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1, 1, 0.34, 128]} />
        <meshPhysicalMaterial
          color="#120004"
          emissive="#4a0009"
          emissiveIntensity={0.6}
          metalness={0.78}
          roughness={0.24}
          clearcoat={0.55}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.22]}>
        <torusGeometry args={[0.82, 0.055, 18, 128]} />
        <meshPhysicalMaterial
          color="#ff183f"
          emissive="#ff183f"
          emissiveIntensity={1.7}
          metalness={0.55}
          roughness={0.16}
          clearcoat={0.8}
        />
      </mesh>
      <Stripe y={0.34} width={1.38} />
      <Stripe y={0} width={1.5} />
      <Stripe y={-0.34} width={1.38} />
      <Text
        color="#ffcad2"
        fontSize={0.13}
        fontWeight={900}
        letterSpacing={0}
        position={[0, -0.72, 0.48]}
      >
        BLEEDLANA
      </Text>
      <LiquidRedTrail
        points={[
          [-0.36, 0.26, 0.55],
          [-0.42, -0.34, 0.5],
          [-0.34, -0.86, 0.28]
        ]}
        radius={0.035}
      />
      <LiquidRedTrail
        color="#8a0012"
        points={[
          [0.5, 0.16, 0.54],
          [0.58, -0.28, 0.42],
          [0.48, -0.74, 0.22]
        ]}
        radius={0.028}
      />
    </group>
  );
}

export function PremiumBleedlanaToken({
  floating = true,
  position = [0, 0, 0],
  scale = 1
}: PremiumBleedlanaTokenProps) {
  const token = (
    <group position={position} scale={scale}>
      <TokenBody />
    </group>
  );

  if (!floating) {
    return token;
  }

  return (
    <Float floatIntensity={0.35} rotationIntensity={0.18} speed={1.1}>
      {token}
    </Float>
  );
}
