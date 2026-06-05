"use client";

import { useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useBleedlanaStore } from "@/store/useBleedlanaStore";

export function SoundToggle() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const soundEnabled = useBleedlanaStore((state) => state.soundEnabled);
  const setSoundEnabled = useBleedlanaStore((state) => state.setSoundEnabled);

  useEffect(() => {
    if (!soundEnabled) {
      gainRef.current?.gain.setTargetAtTime(0, audioContextRef.current?.currentTime ?? 0, 0.08);
      return;
    }

    const browserWindow = window as Window &
      typeof globalThis & {
        webkitAudioContext?: typeof AudioContext;
      };
    const AudioContextClass = browserWindow.AudioContext || browserWindow.webkitAudioContext;

    if (!AudioContextClass) {
      setSoundEnabled(false);
      return;
    }

    const context = audioContextRef.current ?? new AudioContextClass();
    audioContextRef.current = context;

    if (!oscillatorRef.current) {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sawtooth";
      oscillator.frequency.value = 54;
      gain.gain.value = 0;
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();
      oscillatorRef.current = oscillator;
      gainRef.current = gain;
    }

    context.resume();
    gainRef.current?.gain.setTargetAtTime(0.018, context.currentTime, 0.12);
  }, [setSoundEnabled, soundEnabled]);

  return (
    <button
      className="hidden size-11 place-items-center rounded-lg border border-red-400/25 bg-red-500/10 text-red-100 transition hover:border-red-300/70 hover:bg-red-500/20 sm:grid"
      type="button"
      onClick={() => setSoundEnabled(!soundEnabled)}
      aria-label={soundEnabled ? "Mute bloodbath sound" : "Enable bloodbath sound"}
    >
      {soundEnabled ? (
        <Volume2 size={17} aria-hidden="true" />
      ) : (
        <VolumeX size={17} aria-hidden="true" />
      )}
    </button>
  );
}
