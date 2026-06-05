import { tokenConfig } from "@/config/token";

export type MarketTickerItem = {
  symbol: string;
  name: string;
  price: string;
  change: string;
  mood: "bleeding" | "takeover";
};

export type TokenMarketData = {
  contractAddress: string;
  priceUsd: string | null;
  priceNative: string | null;
  liquidityUsd: number | null;
  fdv: number | null;
  marketCap: number | null;
  dexId: string | null;
  pairAddress: string | null;
  pairUrl: string;
  embedUrl: string | null;
  buyUrl: string;
  chartUrl: string;
  pumpFunUrl: string;
  birdeyeUrl: string;
};

export type MarketResponse = {
  updatedAt: string;
  tickers: MarketTickerItem[];
  token: TokenMarketData;
};

export const mockMarketTicker: MarketTickerItem[] =
  tokenConfig.tickerSymbols.map((ticker) => ({
    symbol: ticker.symbol,
    name: ticker.name,
    price: ticker.mockPrice,
    change: ticker.mockChange,
    mood: ticker.mood
  }));

export async function getMarketTickerData(): Promise<MarketTickerItem[]> {
  return mockMarketTicker;
}
