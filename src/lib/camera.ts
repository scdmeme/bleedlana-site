import { MathUtils, Vector3 } from "three";
import { getSceneIndexByProgress, scenes, type Vec3 } from "@/config/scenes";

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
  const index = getSceneIndexByProgress(clamped);
  const nextIndex = Math.min(scenes.length - 1, index + 1);
  const current = scenes[index];
  const next = scenes[nextIndex];
  const local = MathUtils.clamp(
    (clamped - current.range[0]) / (current.range[1] - current.range[0]),
    0,
    1
  );
  const localProgress = easeInOutCubic(MathUtils.smoothstep(local, 0.62, 1));

  const currentPosition = setVec(reusablePosition, current.camera.position).clone();
  const currentTarget = setVec(reusableTarget, current.camera.target).clone();
  const nextPosition = setVec(reusablePosition, next.camera.position).clone();
  const nextTarget = setVec(reusableTarget, next.camera.target).clone();

  return {
    position: currentPosition.lerp(nextPosition, localProgress),
    target: currentTarget.lerp(nextTarget, localProgress)
  };
}
