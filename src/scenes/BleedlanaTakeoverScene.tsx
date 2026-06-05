"use client";

import { Float, Sparkles, Text } from "@react-three/drei";
import { DoubleSide } from "three";
import { FallingCandles } from "@/objects/FallingCandles";
import { MarketCrashParticles } from "@/objects/MarketCrashParticles";
import { PremiumBleedlanaToken } from "@/objects/PremiumBleedlanaToken";
import { RedChart } from "@/objects/RedChart";
import { siteConfig } from "@/config/site";

type Tuple3 = [number, number, number];

type BleedlanaTakeoverSceneProps = {
  position: Tuple3;
};

export function BleedlanaTakeoverScene({ position }: BleedlanaTakeoverSceneProps) {
  return (
    <group position={position}>
      <MarketCrashParticles count={76} position={[0, 0.6, 0]} spread={7.5} />
      <FallingCandles count={18} position={[0, 1.2, -0.5]} radius={5.8} />
      <group position={[0, -1.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.75, 0.28, 24, 96]} />
          <meshStandardMaterial
            color="#2a0007"
            emissive="#ff183f"
            emissiveIntensity={1.2}
            roughness={0.32}
          />
        </mesh>
        <mesh position={[0, 0, -0.1]}>
          <coneGeometry args={[1.72, 1.25, 64, 1, true]} />
          <meshStandardMaterial
            color="#090003"
            emissive="#7e0012"
            emissiveIntensity={0.8}
            side={DoubleSide}
            transparent
            opacity={0.86}
          />
        </mesh>
      </group>
      <Float floatIntensity={0.42} rotationIntensity={0.18} speed={1.2}>
        <group position={[0, 0.9, 0]}>
          <PremiumBleedlanaToken floating={false} scale={1.25} />
        </group>
      </Float>
      <Sparkles
        color="#ff6d82"
        count={80}
        opacity={0.9}
        scale={[7, 4, 7]}
        size={5}
        speed={0.6}
      />
      <RedChart
        color="#7e0012"
        lineWidth={2}
        opacity={0.62}
        position={[-2.2, -0.4, -1.1]}
        rotation={[0, 0, 0]}
        scale={0.42}
        variant="crash"
      />
      <Text
        color="#fff"
        fontSize={0.22}
        fontWeight={800}
        letterSpacing={0}
        position={[0, -2.2, 0.4]}
      >
        {siteConfig.memes[2]}
      </Text>
    </group>
  );
}
