export const siteConfig = {
  name: "BLEEDLANA",
  ticker: "$BLEEDLANA",
  url: "https://bleedlana.example",
  slogan: "Born from red candles.",
  assets: {
    avatar: "/assets/bleedlana-avatar-512.png",
    avatarSmall: "/assets/bleedlana-favicon-64.png"
  },
  meta: {
    title: "BLEEDLANA - The Market Is Bleeding",
    description:
      "BTC is bleeding. ETH is bleeding. SOL is bleeding. BLEEDLANA was born from red candles.",
    ogImage: "/assets/bleedlana-avatar.png"
  },
  hero: {
    title: "THE MARKET IS BLEEDING",
    subtitles: [
      "SOL IS BLEEDING. BTC IS BLEEDING. ETH IS BLEEDING.",
      "MEET BLEEDLANA."
    ]
  },
  ctas: {
    enter: {
      label: "Enter the Bloodbath",
      href: "#btc"
    },
    buy: {
      label: "Buy BLEEDLANA",
      href: "#buy"
    },
    chart: {
      label: "View Chart",
      href: "#chart"
    },
    telegram: {
      label: "Join Telegram",
      href: "https://t.me/bleedlana"
    },
    x: {
      label: "Follow X",
      href: "https://x.com/bleedlana"
    },
    dex: {
      label: "Buy on DEX",
      href: "#dex"
    },
    community: {
      label: "Join Community",
      href: "https://t.me/bleedlana"
    },
    copy: {
      label: "Copy Contract",
      copiedLabel: "Copied"
    }
  },
  socials: [
    {
      label: "Telegram",
      href: "https://t.me/bleedlana"
    },
    {
      label: "X",
      href: "https://x.com/bleedlana"
    },
    {
      label: "Dexscreener",
      href: "#chart"
    }
  ],
  terminalLogs: {
    btc: ["support lost", "liquidity drained", "fear increasing"],
    eth: ["gas meter: PAIN", "hope reserve leaking", "diamond cooling failed"],
    sol: ["monolith breach detected", "red flow rising", "bleedlana signal found"]
  },
  memes: [
    "No green candles. Only character development.",
    "Buy high? Bleed harder.",
    "Red market. Red token. Red destiny."
  ],
  final: {
    title: "Stop pretending the market is fine.",
    subtitle: "Bleed with us."
  },
  disclaimer:
    "BLEEDLANA is a meme token. Nothing on this site is financial advice."
} as const;
