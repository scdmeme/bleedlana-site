"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, Color, ShaderMaterial } from "three";

type Tuple3 = [number, number, number];

type BloodSurfaceProps = {
  position?: Tuple3;
  scale?: number;
};

const vertexShader = `
  uniform float uTime;
  varying float vWave;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 p = position;
    float waveA = sin(p.x * 1.8 + uTime * 0.7) * 0.11;
    float waveB = cos(p.y * 2.3 - uTime * 0.52) * 0.08;
    float waveC = sin((p.x + p.y) * 4.1 + uTime) * 0.025;
    vWave = waveA + waveB + waveC;
    p.z += vWave;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uDeep;
  uniform vec3 uHot;
  uniform float uTime;
  varying float vWave;
  varying vec2 vUv;

  void main() {
    float ring = sin(length(vUv - 0.5) * 42.0 - uTime * 1.3) * 0.5 + 0.5;
    float vein = smoothstep(0.72, 1.0, ring + vWave * 2.2);
    float edge = smoothstep(0.75, 0.15, length(vUv - 0.5));
    vec3 color = mix(uDeep, uHot, vein * 0.34 + max(vWave, 0.0) * 1.7);
    gl_FragColor = vec4(color, (0.28 + vein * 0.22) * edge);
  }
`;

export function BloodSurface({ position = [0, -2.75, -0.8], scale = 1 }: BloodSurfaceProps) {
  const materialRef = useRef<ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uDeep: { value: new Color("#100003") },
      uHot: { value: new Color("#ff183f") },
      uTime: { value: 0 }
    }),
    []
  );

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} scale={scale}>
      <planeGeometry args={[14, 14, 72, 72]} />
      <shaderMaterial
        ref={materialRef}
        blending={AdditiveBlending}
        depthWrite={false}
        fragmentShader={fragmentShader}
        transparent
        uniforms={uniforms}
        vertexShader={vertexShader}
      />
    </mesh>
  );
}
