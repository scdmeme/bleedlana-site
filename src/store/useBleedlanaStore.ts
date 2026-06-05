"use client";

import { create } from "zustand";
import { getSceneIndexByProgress, scenes } from "@/config/scenes";

type BleedlanaState = {
  activeSceneIndex: number;
  copiedContract: boolean;
  lowPerformance: boolean;
  progress: number;
  soundEnabled: boolean;
  webglAvailable: boolean | null;
  setCopiedContract: (value: boolean) => void;
  setLowPerformance: (value: boolean) => void;
  setProgress: (value: number) => void;
  setSoundEnabled: (value: boolean) => void;
  setWebglAvailable: (value: boolean) => void;
};

export const useBleedlanaStore = create<BleedlanaState>((set) => ({
  activeSceneIndex: 0,
  copiedContract: false,
  lowPerformance: false,
  progress: 0,
  soundEnabled: false,
  webglAvailable: null,
  setCopiedContract: (value) => set({ copiedContract: value }),
  setLowPerformance: (value) => set({ lowPerformance: value }),
  setProgress: (value) => {
    const clamped = Math.min(1, Math.max(0, value));
    const activeSceneIndex = getSceneIndexByProgress(clamped);

    set({
      activeSceneIndex,
      progress: clamped
    });
  },
  setSoundEnabled: (value) => set({ soundEnabled: value }),
  setWebglAvailable: (value) => set({ webglAvailable: value })
}));

export function useActiveScene() {
  return useBleedlanaStore((state) => scenes[state.activeSceneIndex]);
}
