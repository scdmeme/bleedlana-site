"use client";

import { useRef } from "react";
import { Float, MeshDistortMaterial, Sparkles, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { FloatingTerminalCards } from "@/objects/FloatingTerminalCards";
import { BeveledBleedMark } from "@/objects/BeveledBleedMark";
import { LiquidRedTrail } from "@/objects/LiquidRedTrail";
import { FractureSparks } from "@/objects/FractureSparks";
import { RedChart } from "@/objects/RedChart";
import { siteConfig } from "@/config/site";
import { CinematicRig } from "@/objects/CinematicRig";

type Tuple3 = [number, number, number];

type SOLBleedSceneProps = {
  position: Tuple3;
};

export function SOLBleedScene({ position }: SOLBleedSceneProps) {
  const monolithRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!monolithRef.current) {
      return;
    }

    monolithRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.35) * 0.22;
  });

  return (
    <group position={position}>
      <CinematicRig
        compactPosition={[0, 2.05, 0]}
        compactScale={0.2}
        position={[2.35, 0.15, 0]}
        rotation={[0, -0.08, 0]}
        scale={0.88}
        sceneIndex={3}
      >
        <group ref={monolithRef}>
          <Float floatIntensity={0.12} rotationIntensity={0.05} speed={0.85}>
            <group scale={[1.18, 1.18, 1.18]}>
            <BeveledBleedMark floating={false} position={[0, 0.45, 0.22]} scale={0.82} />
            <mesh position={[0, 0.42, -0.46]} scale={[1.1, 2.45, 0.18]}>
              <boxGeometry args={[3.1, 1, 1]} />
              <MeshDistortMaterial
                color="#190007"
                distort={0.18}
                emissive="#ff183f"
                emissiveIntensity={0.9}
                speed={1.4}
              />
            </mesh>
            <LiquidRedTrail
              points={[
                [1.05, 0.95, 0.18],
                [1.42, 0.2, 0.08],
                [1.0, -1.2, -0.05],
                [0.45, -2.05, -0.15]
              ]}
              radius={0.07}
            />
            <LiquidRedTrail
              color="#b40018"
              points={[
                [-0.35, 1.08, 0.2],
                [-0.5, 0.1, 0.08],
                [-0.15, -0.85, -0.05],
                [-0.58, -1.86, -0.1]
              ]}
              radius={0.052}
            />
            <Sparkles
              color="#ff183f"
              count={42}
              opacity={0.85}
              scale={[4.2, 4.2, 4.2]}
              size={4}
              speed={0.45}
            />
            <FractureSparks count={64} position={[0, 0.35, 0.25]} radius={4.6} />
            </group>
          </Float>
        </group>
        <RedChart
          color="#ff183f"
          lineWidth={3.2}
          position={[0, -0.1, 0]}
          scale={0.82}
          variant="spiral"
        />
      </CinematicRig>
      <Text
        color="#fff"
        fontSize={0.28}
        fontWeight={900}
        letterSpacing={0}
        position={[0, -2.5, 0.2]}
      >
        BLEEDLANA SIGNAL
      </Text>
      <FloatingTerminalCards
        logs={siteConfig.terminalLogs.sol}
        position={[2.55, 1.05, -0.45]}
        sceneIndex={3}
        title="SOL monolith"
      />
    </group>
  );
}
