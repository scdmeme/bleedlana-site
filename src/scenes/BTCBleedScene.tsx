"use client";

import { Float, Text } from "@react-three/drei";
import { BleedingCoin } from "@/objects/BleedingCoin";
import { FloatingTerminalCards } from "@/objects/FloatingTerminalCards";
import { RedChart } from "@/objects/RedChart";
import { siteConfig } from "@/config/site";
import { CinematicRig } from "@/objects/CinematicRig";

type Tuple3 = [number, number, number];

type BTCBleedSceneProps = {
  position: Tuple3;
};

export function BTCBleedScene({ position }: BTCBleedSceneProps) {
  return (
    <group position={position}>
      <CinematicRig
        compactPosition={[0, 2.05, 0]}
        compactScale={0.34}
        position={[2.35, 0.25, 0]}
        rotation={[-0.08, -0.28, 0]}
        scale={0.92}
        sceneIndex={1}
      >
        <Float floatIntensity={0.12} rotationIntensity={0.05} speed={0.9}>
          <group rotation={[-0.15, -0.45, 0]}>
          <BleedingCoin label="BTC" position={[0, 0.45, 0]} scale={1.25} />
          <RedChart
            color="#ff183f"
            lineWidth={4}
            position={[0.15, -1.35, -0.35]}
            scale={0.68}
            variant="crash"
          />
          <mesh position={[0.9, -0.55, -0.45]} rotation={[0, 0, -0.04]}>
            <boxGeometry args={[4.7, 0.055, 0.12]} />
            <meshStandardMaterial
              color="#310007"
              emissive="#ff183f"
              emissiveIntensity={0.9}
            />
          </mesh>
          <Text
            color="#ffb5bf"
            fontSize={0.16}
            letterSpacing={0}
            position={[-1.8, -0.35, -0.38]}
          >
            SUPPORT
          </Text>
          </group>
        </Float>
      </CinematicRig>
      <FloatingTerminalCards
        logs={siteConfig.terminalLogs.btc}
        position={[2.45, 1.1, -0.65]}
        sceneIndex={1}
        title="BTC terminal"
      />
    </group>
  );
}
