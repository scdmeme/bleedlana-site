"use client";

import { Edges, Float, Sparkles, Text } from "@react-three/drei";
import { useMemo } from "react";
import { BufferAttribute, BufferGeometry } from "three";
import { LiquidRedTrail } from "@/objects/LiquidRedTrail";
import { FloatingTerminalCards } from "@/objects/FloatingTerminalCards";
import { siteConfig } from "@/config/site";
import { CinematicRig } from "@/objects/CinematicRig";

type Tuple3 = [number, number, number];

type ETHBleedSceneProps = {
  position: Tuple3;
};

export function ETHBleedScene({ position }: ETHBleedSceneProps) {
  const crystalGeometry = useMemo(() => {
    const vertices = new Float32Array([
      0, 1.7, 0, -1.05, 0, 0.15, 0, 0.28, 0.95,
      0, 1.7, 0, 0, 0.28, 0.95, 1.05, 0, 0.15,
      0, 1.7, 0, 1.05, 0, 0.15, 0, 0.28, -0.95,
      0, 1.7, 0, 0, 0.28, -0.95, -1.05, 0, 0.15,
      0, -1.65, 0, 0, -0.28, 0.95, -1.05, 0, 0.15,
      0, -1.65, 0, 1.05, 0, 0.15, 0, -0.28, 0.95,
      0, -1.65, 0, 0, -0.28, -0.95, 1.05, 0, 0.15,
      0, -1.65, 0, -1.05, 0, 0.15, 0, -0.28, -0.95
    ]);
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  return (
    <group position={position}>
      <CinematicRig
        compactPosition={[0, 2.05, 0]}
        compactScale={0.36}
        position={[-2.35, 0.2, 0]}
        rotation={[0.03, 0.28, 0]}
        scale={0.9}
        sceneIndex={2}
      >
        <Float floatIntensity={0.16} rotationIntensity={0.07} speed={1.1}>
          <group rotation={[0.08, 0.45, -0.08]}>
          <mesh geometry={crystalGeometry} position={[0, 0.4, 0]} scale={[1.25, 1.2, 1.25]}>
            <meshPhysicalMaterial
              color="#371436"
              emissive="#ff183f"
              emissiveIntensity={0.9}
              metalness={0.15}
              roughness={0.08}
              transmission={0.38}
              thickness={1.15}
              transparent
              opacity={0.92}
            />
            <Edges color="#ff97a8" threshold={18} />
          </mesh>
          {[-0.42, 0, 0.42].map((x, index) => (
            <mesh key={x} position={[x, 0.1 - index * 0.26, 0.18]} rotation={[0, 0, -0.2 + index * 0.2]}>
              <boxGeometry args={[0.065, 2.35 - index * 0.25, 0.075]} />
              <meshBasicMaterial color="#ff183f" />
            </mesh>
          ))}
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
          <Sparkles color="#ff5b73" count={48} opacity={0.8} scale={[4, 5, 4]} size={3.5} speed={0.5} />
          </group>
        </Float>
      </CinematicRig>
      <FloatingTerminalCards
        logs={siteConfig.terminalLogs.eth}
        position={[-2.2, 0.8, -0.6]}
        sceneIndex={2}
        title="ETH terminal"
      />
    </group>
  );
}
