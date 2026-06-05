"use client";

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, PerformanceMonitor, Preload, Stars } from "@react-three/drei";
import { BleedlanaWorld } from "@/scenes/BleedlanaWorld";
import { WebGLFallback } from "@/components/WebGLFallback";
import { detectWebGL } from "@/lib/webgl";
import { useBleedlanaStore } from "@/store/useBleedlanaStore";

export default function SceneCanvas() {
  const webglAvailable = useBleedlanaStore((state) => state.webglAvailable);
  const setLowPerformance = useBleedlanaStore((state) => state.setLowPerformance);
  const setWebglAvailable = useBleedlanaStore((state) => state.setWebglAvailable);

  useEffect(() => {
    setWebglAvailable(detectWebGL());
  }, [setWebglAvailable]);

  if (webglAvailable === null) {
    return <div className="fixed-canvas" />;
  }

  if (!webglAvailable) {
    return <WebGLFallback />;
  }

  return (
    <div className="fixed-canvas">
      <Canvas
        camera={{ fov: 42, position: [0, 2.5, 9] }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <color attach="background" args={["#050000"]} />
        <fog attach="fog" args={["#090003", 14, 62]} />
        <ambientLight intensity={0.55} />
        <directionalLight color="#ffb0b9" intensity={1.7} position={[5, 8, 5]} />
        <pointLight color="#ff183f" intensity={55} position={[0, 2, 3]} />
        <pointLight color="#ff8a00" intensity={18} position={[-6, -2, -8]} />
        <Suspense fallback={null}>
          <Stars count={900} depth={54} factor={3.5} fade speed={0.35} />
          <BleedlanaWorld />
          <ContactShadows
            blur={2.8}
            color="#ff183f"
            far={18}
            opacity={0.18}
            position={[0, -3.2, -18]}
            scale={38}
          />
          <Environment preset="night" />
          <Preload all />
        </Suspense>
        <PerformanceMonitor
          onDecline={() => setLowPerformance(true)}
          onIncline={() => setLowPerformance(false)}
        />
      </Canvas>
    </div>
  );
}
