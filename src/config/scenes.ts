export type Vec3 = readonly [number, number, number];

export type SceneKey =
  | "hero"
  | "btc"
  | "eth"
  | "sol"
  | "takeover"
  | "tokenomics"
  | "final";

export type SceneConfig = {
  key: SceneKey;
  id: string;
  bleedLevel: string;
  title: string;
  eyebrow: string;
  body: string;
  kicker?: string;
  align: "left" | "right" | "center";
  range: readonly [number, number];
  camera: {
    position: Vec3;
    target: Vec3;
  };
  worldPosition: Vec3;
};

export const scenes = [
  {
    key: "hero",
    id: "hero",
    bleedLevel: "01/07",
    eyebrow: "RED ROUTE INITIATED",
    title: "THE MARKET IS BLEEDING",
    body: "SOL is bleeding. BTC is bleeding. ETH is bleeding. Meet BLEEDLANA.",
    kicker: "Scroll into the bloodbath.",
    align: "center",
    range: [0, 0.14],
    camera: {
      position: [0, 2.5, 9],
      target: [0, 0.2, 0]
    },
    worldPosition: [0, 0, 0]
  },
  {
    key: "btc",
    id: "btc",
    bleedLevel: "02/07",
    eyebrow: "BTC BLEEDING SCENE",
    title: "BTC tried to hold support. It didn't.",
    body: "A cracked coin, a failed support line, and a terminal full of bad news.",
    align: "left",
    range: [0.14, 0.28],
    camera: {
      position: [8.2, 2.3, 1.7],
      target: [10, 0.3, -5]
    },
    worldPosition: [10, 0, -5]
  },
  {
    key: "eth",
    id: "eth",
    bleedLevel: "03/07",
    eyebrow: "ETH BLEEDING SCENE",
    title: "ETH is bleeding gas and hope.",
    body: "The crystal melts into a red wave while the gas meter stops pretending.",
    align: "right",
    range: [0.28, 0.42],
    camera: {
      position: [-6.4, 3.2, -8.5],
      target: [-9, 0.9, -13]
    },
    worldPosition: [-9, 0, -13]
  },
  {
    key: "sol",
    id: "sol",
    bleedLevel: "04/07",
    eyebrow: "SOL BLEEDING SCENE",
    title: "Solana is bleeding. So we made BLEEDLANA.",
    body: "The SOL monolith leaks crimson light while the chart spirals down into the reveal.",
    align: "left",
    range: [0.42, 0.58],
    camera: {
      position: [2.2, 3.4, -19],
      target: [0, 0.8, -22]
    },
    worldPosition: [0, 0, -22]
  },
  {
    key: "takeover",
    id: "takeover",
    bleedLevel: "05/07",
    eyebrow: "BLEEDLANA TAKEOVER",
    title: "When everything bleeds, memes survive.",
    body: "BLEEDLANA - born from red candles.",
    align: "right",
    range: [0.58, 0.73],
    camera: {
      position: [8.4, 3.1, -28.2],
      target: [7, 0.2, -31]
    },
    worldPosition: [7, 0, -31]
  },
  {
    key: "tokenomics",
    id: "tokenomics",
    bleedLevel: "06/07",
    eyebrow: "TOKENOMICS / INFO",
    title: "A dashboard for the red era.",
    body: "Supply, tax, LP, chain, and contract stay clean, clear, and ready for launch.",
    align: "left",
    range: [0.73, 0.88],
    camera: {
      position: [-5.8, 2.4, -37.5],
      target: [-7, 0.2, -40]
    },
    worldPosition: [-7, 0, -40]
  },
  {
    key: "final",
    id: "final",
    bleedLevel: "07/07",
    eyebrow: "FINAL CTA",
    title: "Stop pretending the market is fine.",
    body: "Bleed with us.",
    align: "center",
    range: [0.88, 1],
    camera: {
      position: [0, 3.4, -48],
      target: [0, 0, -52]
    },
    worldPosition: [0, 0, -52]
  }
] as const satisfies readonly SceneConfig[];

export const totalScenes = scenes.length;

export function getSceneIndexByProgress(progress: number) {
  const clamped = Math.min(1, Math.max(0, progress));
  const foundIndex = scenes.findIndex(
    (scene) => clamped >= scene.range[0] && clamped <= scene.range[1]
  );

  return foundIndex === -1 ? scenes.length - 1 : foundIndex;
}
