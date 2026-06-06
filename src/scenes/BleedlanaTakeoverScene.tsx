"use client";

import { Sparkles, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { DoubleSide } from "three";
import { FallingCandles } from "@/objects/FallingCandles";
import { BloodSurface } from "@/objects/BloodSurface";
import { MarketCrashParticles } from "@/objects/MarketCrashParticles";
import { PremiumBleedlanaToken } from "@/objects/PremiumBleedlanaToken";
import { RedChart } from "@/objects/RedChart";
import { siteConfig } from "@/config/site";
import { CinematicRig } from "@/objects/CinematicRig";

type Tuple3 = [number, number, number];

type BleedlanaTakeoverSceneProps = {
  position: Tuple3;
};

export function BleedlanaTakeoverScene({ position }: BleedlanaTakeoverSceneProps) {
  const compact = useThree((state) => state.size.width < 720);

  return (
    <group position={position}>
      <MarketCrashParticles count={compact ? 14 : 42} position={[0, 0.6, -1.5]} spread={compact ? 4 : 6.2} />
      <group scale={compact ? 0.22 : 0.55}>
        <FallingCandles count={compact ? 8 : 14} position={[0, 1.2, -2]} radius={5.2} />
      </group>
      <BloodSurface position={[0, -2.5, -1.2]} scale={compact ? 0.34 : 0.58} />
      {!compact ? <group position={[0, -1.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
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
      </group> : null}
      <CinematicRig
        compactPosition={[0, 2.05, 0]}
        compactScale={0.18}
        position={[-2.25, 0.35, 0]}
        scale={0.88}
        sceneIndex={4}
      >
        <PremiumBleedlanaToken floating={false} scale={1.65} />
      </CinematicRig>
      <Sparkles
        color="#ff6d82"
        count={compact ? 24 : 80}
        opacity={0.9}
        scale={compact ? [3, 3, 3] : [7, 4, 7]}
        size={5}
        speed={0.6}
      />
      {!compact ? <RedChart
        color="#7e0012"
        lineWidth={2}
        opacity={0.62}
        position={[-2.2, -0.4, -1.1]}
        rotation={[0, 0, 0]}
        scale={0.42}
        variant="crash"
      /> : null}
      {!compact ? <Text
        color="#fff"
        fontSize={0.22}
        fontWeight={800}
        letterSpacing={0}
        position={[0, -2.2, 0.4]}
      >
        {siteConfig.memes[2]}
      </Text> : null}
    </group>
  );
}
