"use client";

import { scenes } from "@/config/scenes";
import { useBleedlanaStore } from "@/store/useBleedlanaStore";

export function ProgressIndicator() {
  const activeSceneIndex = useBleedlanaStore((state) => state.activeSceneIndex);
  const progress = useBleedlanaStore((state) => state.progress);
  const activeScene = scenes[activeSceneIndex];

  return (
    <aside className="fixed right-4 top-24 z-30 hidden w-44 rounded-lg border border-red-200/15 bg-black/45 p-3 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-white/72 backdrop-blur-xl lg:block">
      <div className="flex items-center justify-between text-red-100">
        <span>Bleed Level</span>
        <span>{activeScene.bleedLevel}</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-red-800 via-red-500 to-orange-300"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>
      <div className="mt-3 text-white/50">{activeScene.eyebrow}</div>
    </aside>
  );
}
