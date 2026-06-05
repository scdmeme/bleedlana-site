"use client";

import { useEffect } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useBleedlanaStore } from "@/store/useBleedlanaStore";

export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  const setProgress = useBleedlanaStore((state) => state.setProgress);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(latest);
  });

  useEffect(() => {
    setProgress(scrollYProgress.get());
  }, [scrollYProgress, setProgress]);
}
