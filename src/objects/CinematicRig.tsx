"use client";

import { type ReactNode, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils, type Group } from "three";
import { scenes } from "@/config/scenes";
import { useBleedlanaStore } from "@/store/useBleedlanaStore";

type Tuple3 = [number, number, number];

type CinematicRigProps = {
  children: ReactNode;
  compactPosition?: Tuple3;
  compactScale?: number;
  position?: Tuple3;
  rotation?: Tuple3;
  scale?: number;
  sceneIndex: number;
};

export function CinematicRig({
  children,
  compactPosition = [0, 2.1, 0],
  compactScale = 0.62,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  sceneIndex
}: CinematicRigProps) {
  const ref = useRef<Group>(null);
  const progress = useBleedlanaStore((state) => state.progress);
  const compact = useThree((state) => state.size.width < 720);

  useFrame(() => {
    if (!ref.current) return;

    const scene = scenes[sceneIndex];
    const local = MathUtils.clamp(
      (progress - scene.range[0]) / (scene.range[1] - scene.range[0]),
      0,
      1
    );
    const reveal = MathUtils.smoothstep(local, 0.02, 0.48);
    const exit = MathUtils.smoothstep(local, 0.76, 1);
    const base = compact ? compactPosition : position;
    const baseScale = compact ? compactScale : scale;

    ref.current.position.set(
      base[0] + (1 - reveal) * -0.18 + exit * 0.18,
      base[1] + (1 - reveal) * -0.2 + exit * 0.14,
      base[2] + (1 - reveal) * -0.55 + exit * 0.72
    );
    ref.current.rotation.set(
      rotation[0],
      rotation[1] + (1 - reveal) * 0.24 - exit * 0.12,
      rotation[2]
    );
    ref.current.scale.setScalar(baseScale * (0.92 + reveal * 0.08 - exit * 0.04));
  });

  return <group ref={ref}>{children}</group>;
}
