"use client";

import { type ReactNode, useMemo, useRef } from "react";
import { Float, MeshDistortMaterial, Sparkles, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MathUtils, Material, Vector3, type Group, type Object3D } from "three";
import { BTCBleedScene } from "@/scenes/BTCBleedScene";
import { BleedlanaTakeoverScene } from "@/scenes/BleedlanaTakeoverScene";
import { ETHBleedScene } from "@/scenes/ETHBleedScene";
import { SOLBleedScene } from "@/scenes/SOLBleedScene";
import { FallingCandles } from "@/objects/FallingCandles";
import { MarketCrashParticles } from "@/objects/MarketCrashParticles";
import { RedChart } from "@/objects/RedChart";
import { PremiumBleedlanaToken } from "@/objects/PremiumBleedlanaToken";
import { getCameraFrame } from "@/lib/camera";
import { siteConfig } from "@/config/site";
import { scenes } from "@/config/scenes";
import { shortenAddress, tokenomics } from "@/config/token";
import { useBleedlanaStore } from "@/store/useBleedlanaStore";

function scenePosition(index: number) {
  const value = scenes[index].worldPosition;
  return [value[0], value[1], value[2]] as [number, number, number];
}

function setObjectOpacity(object: Object3D, opacity: number) {
  const maybeMaterial = (object as Object3D & { material?: Material | Material[] }).material;

  if (!maybeMaterial) {
    return;
  }

  const materials = Array.isArray(maybeMaterial) ? maybeMaterial : [maybeMaterial];

  materials.forEach((material) => {
    material.transparent = opacity < 0.98;
    material.opacity = opacity;
    material.depthWrite = opacity > 0.25;
  });
}

function SceneStage({ children, index }: { children: ReactNode; index: number }) {
  const progress = useBleedlanaStore((state) => state.progress);
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    if (!groupRef.current) {
      return;
    }

    const scene = scenes[index];
    const center = (scene.range[0] + scene.range[1]) / 2;
    const halfRange = (scene.range[1] - scene.range[0]) / 2;
    const fadeWindow = halfRange + 0.08;
    const raw = 1 - Math.abs(progress - center) / fadeWindow;
    const opacity = MathUtils.smoothstep(MathUtils.clamp(raw, 0, 1), 0, 1);

    groupRef.current.visible = opacity > 0.018;
    groupRef.current.scale.setScalar(0.88 + opacity * 0.12);
    groupRef.current.traverse((object) => setObjectOpacity(object, opacity));
  });

  return <group ref={groupRef}>{children}</group>;
}

function HeroScene() {
  const lowPerformance = useBleedlanaStore((state) => state.lowPerformance);

  return (
    <group position={scenePosition(0)}>
      <RedChart color="#ff183f" lineWidth={5} position={[0, 0.15, -0.2]} scale={1.05} variant="hero" />
      <FallingCandles count={lowPerformance ? 18 : 42} position={[0, 1.6, 0]} radius={9} />
      <MarketCrashParticles count={lowPerformance ? 28 : 58} position={[0, -0.2, -0.8]} spread={8.4} />
      <Float floatIntensity={0.32} rotationIntensity={0.16} speed={0.9}>
        <mesh position={[0, -1.9, -0.65]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.34, 1.34, 0.24, 96]} />
          <meshStandardMaterial
            color="#130004"
            emissive="#ff183f"
            emissiveIntensity={1.4}
            metalness={0.22}
            roughness={0.2}
          />
        </mesh>
        <Text
          color="#ffcad2"
          fontSize={0.27}
          fontWeight={900}
          letterSpacing={0}
          position={[0, -1.9, -0.38]}
        >
          {siteConfig.ticker}
        </Text>
      </Float>
    </group>
  );
}

function TokenomicsDashboardScene() {
  return (
    <group position={scenePosition(5)}>
      <Float floatIntensity={0.2} rotationIntensity={0.08} speed={0.9}>
        <group rotation={[0.05, -0.32, 0]}>
          <mesh position={[0, 0.2, -0.15]}>
            <boxGeometry args={[4.6, 3.05, 0.16]} />
            <meshStandardMaterial
              color="#100004"
              emissive="#7e0012"
              emissiveIntensity={0.55}
              roughness={0.42}
            />
          </mesh>
          <mesh position={[0, 1.77, -0.04]}>
            <boxGeometry args={[4.6, 0.18, 0.18]} />
            <meshStandardMaterial color="#ff183f" emissive="#ff183f" emissiveIntensity={1.2} />
          </mesh>
          {tokenomics.map((item, index) => {
            const col = index % 2;
            const row = Math.floor(index / 2);
            const x = col === 0 ? -1.15 : 1.15;
            const y = 1.05 - row * 0.82;

            return (
              <group key={item.label} position={[x, y, 0.04]}>
                <mesh>
                  <boxGeometry args={[1.9, 0.62, 0.12]} />
                  <meshStandardMaterial
                    color="#180006"
                    emissive="#ff183f"
                    emissiveIntensity={index === 4 ? 0.52 : 0.28}
                    roughness={0.38}
                  />
                </mesh>
                <Text
                  color="#ff9aaa"
                  fontSize={0.105}
                  letterSpacing={0}
                  position={[0, 0.12, 0.12]}
                >
                  {item.label.toUpperCase()}
                </Text>
                <Text
                  color="#ffffff"
                  fontSize={0.15}
                  fontWeight={900}
                  letterSpacing={0}
                  position={[0, -0.11, 0.13]}
                >
                  {item.label === "Contract" ? shortenAddress(item.value) : item.value}
                </Text>
              </group>
            );
          })}
        </group>
      </Float>
    </group>
  );
}

function FinalPlanetScene() {
  return (
    <group position={scenePosition(6)}>
      <mesh position={[0, -0.25, -0.8]}>
        <sphereGeometry args={[2.35, 64, 64]} />
        <MeshDistortMaterial
          color="#7e0012"
          distort={0.24}
          emissive="#ff183f"
          emissiveIntensity={1.25}
          metalness={0.1}
          roughness={0.36}
          speed={1.05}
        />
      </mesh>
      <mesh position={[0, -0.25, -0.8]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.9, 0.035, 8, 120]} />
        <meshBasicMaterial color="#ff8a00" transparent opacity={0.62} />
      </mesh>
      <RedChart
        color="#ffcad2"
        lineWidth={2.6}
        opacity={0.72}
        position={[0, -2.65, 0.2]}
        scale={0.72}
        variant="crash"
      />
      <Float floatIntensity={0.32} rotationIntensity={0.14} speed={1.1}>
        <group position={[0, 2.3, 0.15]}>
          <PremiumBleedlanaToken floating={false} scale={0.82} />
        </group>
      </Float>
      <Sparkles color="#ff9aaa" count={70} opacity={0.9} scale={[7, 5, 7]} size={4.5} speed={0.45} />
    </group>
  );
}

export function BleedlanaWorld() {
  const progress = useBleedlanaStore((state) => state.progress);
  const lookTarget = useMemo(() => new Vector3(), []);

  useFrame((state, delta) => {
    const frame = getCameraFrame(progress);
    const solScene = scenes[3];

    if (progress >= solScene.range[0] && progress <= solScene.range[1]) {
      const local = MathUtils.clamp(
        (progress - solScene.range[0]) / (solScene.range[1] - solScene.range[0]),
        0,
        1
      );
      frame.position.x += Math.sin(local * Math.PI * 2.15) * 1.65;
      frame.position.y += Math.sin(local * Math.PI) * 0.42;
      frame.position.z += Math.cos(local * Math.PI * 2.15) * 0.85;
    }

    const smooth = 1 - Math.exp(-delta * 2.9);
    state.camera.position.lerp(frame.position, smooth);
    lookTarget.lerp(frame.target, smooth);
    state.camera.lookAt(lookTarget);
  });

  return (
    <>
      <SceneStage index={0}>
        <HeroScene />
      </SceneStage>
      <SceneStage index={1}>
        <BTCBleedScene position={scenePosition(1)} />
      </SceneStage>
      <SceneStage index={2}>
        <ETHBleedScene position={scenePosition(2)} />
      </SceneStage>
      <SceneStage index={3}>
        <SOLBleedScene position={scenePosition(3)} />
      </SceneStage>
      <SceneStage index={4}>
        <BleedlanaTakeoverScene position={scenePosition(4)} />
      </SceneStage>
      <SceneStage index={5}>
        <TokenomicsDashboardScene />
      </SceneStage>
      <SceneStage index={6}>
        <FinalPlanetScene />
      </SceneStage>
    </>
  );
}
