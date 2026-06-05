import { NextResponse } from "next/server";
import { hasContractAddress, tokenConfig, tokenLinks } from "@/config/token";

export const revalidate = 30;

type CoinGeckoMarket = Record<
  "bitcoin" | "ethereum" | "solana",
  {
    usd: number;
    usd_24h_change?: number;
  }
>;

type DexPair = {
  chainId?: string;
  dexId?: string;
  pairAddress?: string;
  baseToken?: {
    address?: string;
    name?: string;
    symbol?: string;
  };
  quoteToken?: {
    symbol?: string;
  };
  priceUsd?: string;
  priceNative?: string;
  liquidity?: {
    usd?: number;
  };
  fdv?: number;
  marketCap?: number;
  priceChange?: {
    h24?: number;
  };
  url?: string;
};

type DexResponse = {
  pairs?: DexPair[] | null;
};

function formatUsd(value?: number | string) {
  const numeric = typeof value === "string" ? Number(value) : value;

  if (!Number.isFinite(numeric)) {
    return "TBA";
  }

  if (numeric! < 0.01) {
    return `$${numeric!.toPrecision(3)}`;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: numeric! > 100 ? 0 : 4
  }).format(numeric!);
}

function formatChange(value?: number) {
  if (!Number.isFinite(value)) {
    return "live";
  }

  return `${value! >= 0 ? "+" : ""}${value!.toFixed(2)}%`;
}

function getBestPair(pairs?: DexPair[] | null) {
  if (!pairs?.length) {
    return null;
  }

  const solPairs = pairs.filter((pair) => pair.chainId === "solana");
  const candidates = solPairs.length ? solPairs : pairs;

  return candidates.sort(
    (a, b) => (b.liquidity?.usd ?? 0) - (a.liquidity?.usd ?? 0)
  )[0];
}

function getDexEmbedUrl(pair: DexPair | null) {
  if (!pair?.pairAddress) {
    return null;
  }

  return `https://dexscreener.com/solana/${pair.pairAddress}?embed=1&theme=dark&trades=0&info=0`;
}

async function fetchCoinGecko() {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true",
    {
      next: {
        revalidate: 30
      }
    }
  );

  if (!response.ok) {
    throw new Error("CoinGecko request failed");
  }

  return (await response.json()) as CoinGeckoMarket;
}

async function fetchDexPair() {
  if (!hasContractAddress()) {
    return null;
  }

  const response = await fetch(
    `https://api.dexscreener.com/latest/dex/tokens/${tokenConfig.contractAddress}`,
    {
      next: {
        revalidate: 30
      }
    }
  );

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as DexResponse;
  return getBestPair(data.pairs);
}

export async function GET() {
  const [geckoResult, pairResult] = await Promise.allSettled([
    fetchCoinGecko(),
    fetchDexPair()
  ]);

  const gecko = geckoResult.status === "fulfilled" ? geckoResult.value : null;
  const pair = pairResult.status === "fulfilled" ? pairResult.value : null;

  return NextResponse.json({
    updatedAt: new Date().toISOString(),
    tickers: [
      {
        symbol: "BTC",
        name: "Bitcoin",
        price: formatUsd(gecko?.bitcoin.usd),
        change: formatChange(gecko?.bitcoin.usd_24h_change),
        mood: "bleeding"
      },
      {
        symbol: "ETH",
        name: "Ethereum",
        price: formatUsd(gecko?.ethereum.usd),
        change: formatChange(gecko?.ethereum.usd_24h_change),
        mood: "bleeding"
      },
      {
        symbol: "SOL",
        name: "Solana",
        price: formatUsd(gecko?.solana.usd),
        change: formatChange(gecko?.solana.usd_24h_change),
        mood: "bleeding"
      },
      {
        symbol: tokenConfig.symbol,
        name: tokenConfig.symbol,
        price: formatUsd(pair?.priceUsd),
        change: formatChange(pair?.priceChange?.h24),
        mood: "takeover"
      }
    ],
    token: {
      contractAddress: tokenConfig.contractAddress,
      priceUsd: pair?.priceUsd ?? null,
      priceNative: pair?.priceNative ?? null,
      liquidityUsd: pair?.liquidity?.usd ?? null,
      fdv: pair?.fdv ?? null,
      marketCap: pair?.marketCap ?? null,
      dexId: pair?.dexId ?? null,
      pairAddress: pair?.pairAddress ?? null,
      pairUrl: pair?.url ?? tokenLinks.dexscreenerToken,
      embedUrl: getDexEmbedUrl(pair),
      buyUrl: tokenLinks.primaryBuy,
      chartUrl: pair?.url ?? tokenLinks.dexscreenerToken,
      pumpFunUrl: tokenLinks.pumpFun,
      birdeyeUrl: tokenLinks.birdeye
    }
  });
}
