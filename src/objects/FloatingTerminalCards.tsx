"use client";

import { Html } from "@react-three/drei";
import { scenes } from "@/config/scenes";
import { useBleedlanaStore } from "@/store/useBleedlanaStore";

type Tuple3 = [number, number, number];

type FloatingTerminalCardsProps = {
  logs: readonly string[];
  position?: Tuple3;
  sceneIndex: number;
  title: string;
};

export function FloatingTerminalCards({
  logs,
  position = [0, 0, 0],
  sceneIndex,
  title
}: FloatingTerminalCardsProps) {
  const progress = useBleedlanaStore((state) => state.progress);
  const scene = scenes[sceneIndex];
  const center = (scene.range[0] + scene.range[1]) / 2;
  const halfRange = (scene.range[1] - scene.range[0]) / 2;
  const fadeWindow = halfRange + 0.08;
  const opacity = Math.max(0, Math.min(1, 1 - Math.abs(progress - center) / fadeWindow));

  if (opacity < 0.04) {
    return null;
  }

  return (
    <Html
      center
      distanceFactor={7.5}
      occlude={false}
      position={position}
      transform
    >
      <div
        className="hidden w-56 rounded-lg border border-red-200/20 bg-black/80 p-3 font-mono text-[10px] uppercase tracking-[0.16em] text-red-100 shadow-[0_0_42px_rgba(255,24,63,0.22)] backdrop-blur-xl md:block"
        style={{
          opacity,
          transform: `scale(${0.92 + opacity * 0.08})`
        }}
      >
        <div className="mb-2 border-b border-red-200/15 pb-2 text-white/72">
          {title}
        </div>
        <div className="grid gap-1.5">
          {logs.map((log) => (
            <div key={log} className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-red-400" />
              {log}
            </div>
          ))}
        </div>
      </div>
    </Html>
  );
}
