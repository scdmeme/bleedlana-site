"use client";

import { useEffect } from "react";
import { scenes } from "@/config/scenes";
import { useBleedlanaStore } from "@/store/useBleedlanaStore";

export function useScrollProgress() {
  const setProgress = useBleedlanaStore((state) => state.setProgress);

  useEffect(() => {
    let frame = 0;

    function updateProgress() {
      frame = 0;
      const marker = window.scrollY + Math.min(180, window.innerHeight * 0.25);
      const sections = scenes
        .map((scene) => document.getElementById(scene.id))
        .filter((section): section is HTMLElement => Boolean(section));

      if (sections.length !== scenes.length) return;

      let index = sections.findIndex((section, sectionIndex) => {
        const nextTop =
          sections[sectionIndex + 1]?.offsetTop ?? document.documentElement.scrollHeight;
        return marker >= section.offsetTop && marker < nextTop;
      });

      if (index < 0) {
        index = marker < sections[0].offsetTop ? 0 : scenes.length - 1;
      }

      const currentTop = sections[index].offsetTop;
      const nextTop =
        sections[index + 1]?.offsetTop ?? document.documentElement.scrollHeight;
      const local = Math.min(1, Math.max(0, (marker - currentTop) / (nextTop - currentTop)));
      const scene = scenes[index];
      setProgress(scene.range[0] + (scene.range[1] - scene.range[0]) * local);
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    }

    updateProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [setProgress]);
}
