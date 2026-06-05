"use client";

import { Edges, Float } from "@react-three/drei";
import { Shape } from "three";
import { LiquidRedTrail } from "@/objects/LiquidRedTrail";

type Tuple3 = [number, number, number];

type BeveledBleedMarkProps = {
  position?: Tuple3;
  scale?: number;
  floating?: boolean;
};

function Plate({ y, width = 3 }: { y: number; width?: number }) {
  const shape = new Shape();
  const h = 0.24;
  const skew = 0.36;

  shape.moveTo(-width / 2 + skew, -h);
  shape.lineTo(width / 2 + skew, -h);
  shape.lineTo(width / 2 - skew, h);
  shape.lineTo(-width / 2 - skew, h);
  shape.closePath();

  return (
    <mesh position={[0, y, 0]}>
      <extrudeGeometry
        args={[
          shape,
          {
            bevelEnabled: true,
            bevelSegments: 8,
            bevelSize: 0.055,
            bevelThickness: 0.06,
            depth: 0.34,
            steps: 1
          }
        ]}
      />
      <meshPhysicalMaterial
        color="#b90018"
        emissive="#ff183f"
        emissiveIntensity={0.9}
        metalness={0.62}
        roughness={0.2}
        clearcoat={0.85}
        clearcoatRoughness={0.16}
      />
      <Edges color="#ffd2d8" threshold={28} />
    </mesh>
  );
}

function Body() {
  return (
    <group rotation={[0.04, -0.16, -0.05]}>
      <Plate y={0.78} width={3.2} />
      <Plate y={0} width={3.05} />
      <Plate y={-0.78} width={3.2} />
      <LiquidRedTrail
        points={[
          [-1.16, 0.56, 0.34],
          [-1.05, -0.25, 0.22],
          [-1.22, -1.48, 0.02]
        ]}
        radius={0.052}
      />
      <LiquidRedTrail
        points={[
          [0.08, 0.7, 0.35],
          [0.02, -0.18, 0.22],
          [0.16, -1.36, 0.02]
        ]}
        radius={0.058}
      />
      <LiquidRedTrail
        color="#7e0012"
        points={[
          [1.22, 0.64, 0.34],
          [1.1, -0.14, 0.2],
          [1.28, -1.42, 0.02]
        ]}
        radius={0.046}
      />
    </group>
  );
}

export function BeveledBleedMark({
  floating = true,
  position = [0, 0, 0],
  scale = 1
}: BeveledBleedMarkProps) {
  const mark = (
    <group position={position} scale={scale}>
      <Body />
    </group>
  );

  if (!floating) {
    return mark;
  }

  return (
    <Float floatIntensity={0.28} rotationIntensity={0.12} speed={0.95}>
      {mark}
    </Float>
  );
}
