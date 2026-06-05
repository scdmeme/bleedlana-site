import { MathUtils, Vector3 } from "three";
import { scenes, type Vec3 } from "@/config/scenes";

const reusablePosition = new Vector3();
const reusableTarget = new Vector3();

function setVec(vector: Vector3, value: Vec3) {
  return vector.set(value[0], value[1], value[2]);
}

function easeInOutCubic(value: number) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

export function getCameraFrame(progress: number) {
  const clamped = Math.min(1, Math.max(0, progress));
  const scaled = clamped * (scenes.length - 1);
  const index = Math.min(scenes.length - 2, Math.floor(scaled));
  const nextIndex = Math.min(scenes.length - 1, index + 1);
  const localProgress = easeInOutCubic(MathUtils.clamp(scaled - index, 0, 1));

  const current = scenes[index];
  const next = scenes[nextIndex];

  const currentPosition = setVec(reusablePosition, current.camera.position).clone();
  const currentTarget = setVec(reusableTarget, current.camera.target).clone();
  const nextPosition = setVec(reusablePosition, next.camera.position).clone();
  const nextTarget = setVec(reusableTarget, next.camera.target).clone();

  return {
    position: currentPosition.lerp(nextPosition, localProgress),
    target: currentTarget.lerp(nextTarget, localProgress)
  };
}
