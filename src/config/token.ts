export type TickerSymbol = {
  symbol: string;
  name: string;
  mockPrice: string;
  mockChange: string;
  mood: "bleeding" | "takeover";
};

const activeContractAddress: string = "Fb3tfWrq9Npi6ddHtBR5oEhZXQXW7MDzbxwu7hexpump";

export const tokenConfig = {
  chain: "Solana",
  chainSlug: "solana",
  symbol: "BLEEDLANA",
  supply: "TBA",
  tax: "TBA",
  liquidity: "TBA",
  lp: "TBA",
  launchPlatform: "Pump.fun",
  // Change only this CA when the real token is live. Widgets and links derive from it.
  contractAddress: activeContractAddress,
  quoteSymbol: "SOL",
  tickerSymbols: [
    {
      symbol: "BTC",
      name: "Bitcoin",
      mockPrice: "$--",
      mockChange: "live",
      mood: "bleeding"
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      mockPrice: "$--",
      mockChange: "live",
      mood: "bleeding"
    },
    {
      symbol: "SOL",
      name: "Solana",
      mockPrice: "$--",
      mockChange: "live",
      mood: "bleeding"
    },
    {
      symbol: "BLEEDLANA",
      name: "BLEEDLANA",
      mockPrice: "DEX",
      mockChange: "CA linked",
      mood: "takeover"
    }
  ] satisfies TickerSymbol[]
} as const;

export function hasContractAddress(address = tokenConfig.contractAddress) {
  return Boolean(address && address !== "Coming soon" && address.length > 20);
}

export function getContractAddress() {
  return hasContractAddress() ? tokenConfig.contractAddress : "Coming soon";
}

export function shortenAddress(address = tokenConfig.contractAddress, head = 6, tail = 6) {
  if (!hasContractAddress(address)) {
    return "Coming soon";
  }

  if (address.length <= head + tail + 3) {
    return address;
  }

  return `${address.slice(0, head)}...${address.slice(-tail)}`;
}

export const tokenLinks = {
  primaryBuy: hasContractAddress()
    ? `https://pump.fun/coin/${tokenConfig.contractAddress}`
    : "#buy",
  dexscreenerToken: hasContractAddress()
    ? `https://dexscreener.com/solana/${tokenConfig.contractAddress}`
    : "#chart",
  pumpFun: hasContractAddress()
    ? `https://pump.fun/coin/${tokenConfig.contractAddress}`
    : "#buy",
  birdeye: hasContractAddress()
    ? `https://birdeye.so/token/${tokenConfig.contractAddress}?chain=solana`
    : "#chart",
  shareToX: hasContractAddress()
    ? `https://x.com/intent/tweet?text=${encodeURIComponent(
        `The market is bleeding. BLEEDLANA was born from red candles. CA: ${tokenConfig.contractAddress}`
      )}`
    : "https://x.com/intent/tweet?text=The%20market%20is%20bleeding.%20BLEEDLANA%20was%20born%20from%20red%20candles."
} as const;

export const tokenomics = [
  {
    label: "Supply",
    value: tokenConfig.supply
  },
  {
    label: "Tax",
    value: tokenConfig.tax
  },
  {
    label: "LP",
    value: tokenConfig.liquidity
  },
  {
    label: "Chain",
    value: tokenConfig.chain
  },
  {
    label: "Contract",
    value: getContractAddress()
  }
] as const;
