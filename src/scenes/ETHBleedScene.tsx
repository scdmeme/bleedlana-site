"use client";

import { Float, MeshDistortMaterial, Text } from "@react-three/drei";
import { LiquidRedTrail } from "@/objects/LiquidRedTrail";
import { FloatingTerminalCards } from "@/objects/FloatingTerminalCards";
import { siteConfig } from "@/config/site";

type Tuple3 = [number, number, number];

type ETHBleedSceneProps = {
  position: Tuple3;
};

export function ETHBleedScene({ position }: ETHBleedSceneProps) {
  return (
    <group position={position}>
      <Float floatIntensity={0.4} rotationIntensity={0.2} speed={1.1}>
        <group rotation={[0.08, 0.45, -0.08]}>
          <mesh position={[0, 0.8, 0]} scale={[1.25, 1.65, 1.25]}>
            <octahedronGeometry args={[1, 0]} />
            <MeshDistortMaterial
              color="#7e8cff"
              distort={0.12}
              emissive="#4c1d95"
              emissiveIntensity={0.8}
              metalness={0.2}
              roughness={0.18}
              speed={1.2}
            />
          </mesh>
          <mesh position={[0, -0.55, 0]} scale={[1.4, 0.9, 1.4]}>
            <octahedronGeometry args={[1, 0]} />
            <MeshDistortMaterial
              color="#4c1d95"
              distort={0.24}
              emissive="#ff183f"
              emissiveIntensity={0.55}
              metalness={0.12}
              roughness={0.32}
              speed={1.8}
            />
          </mesh>
          <LiquidRedTrail
            points={[
              [0.55, 0.6, 0.18],
              [0.78, -0.35, 0.12],
              [0.4, -1.4, -0.12]
            ]}
            radius={0.06}
          />
          <LiquidRedTrail
            color="#b40018"
            points={[
              [-0.42, 0.25, 0.16],
              [-0.65, -0.6, 0.08],
              [-0.28, -1.25, -0.18]
            ]}
            radius={0.046}
          />
          <Text
            color="#ffcad2"
            fontSize={0.2}
            letterSpacing={0}
            position={[0, -1.75, 0.1]}
          >
            GAS = PAIN
          </Text>
        </group>
      </Float>
      <FloatingTerminalCards
        logs={siteConfig.terminalLogs.eth}
        position={[-2.2, 0.8, -0.6]}
        sceneIndex={2}
        title="ETH terminal"
      />
    </group>
  );
}
