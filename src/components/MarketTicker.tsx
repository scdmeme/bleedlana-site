"use client";

import { useEffect, useState } from "react";
import { mockMarketTicker, type MarketTickerItem } from "@/lib/marketData";

export function MarketTicker() {
  const [items, setItems] = useState<MarketTickerItem[]>(mockMarketTicker);

  useEffect(() => {
    let cancelled = false;

    async function loadMarket() {
      try {
        const response = await fetch("/api/market");
        const data = (await response.json()) as { tickers?: MarketTickerItem[] };

        if (!cancelled && data.tickers?.length) {
          setItems(data.tickers);
        }
      } catch {
        setItems(mockMarketTicker);
      }
    }

    loadMarket();
    const intervalId = window.setInterval(loadMarket, 45000);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, []);

  const tickerItems = [...items, ...items];

  return (
    <div className="market-ticker fixed bottom-0 left-0 right-0 z-30 overflow-hidden border-t border-red-200/15 bg-black/70 py-2 font-mono text-xs uppercase tracking-[0.14em] text-white/82 backdrop-blur-xl">
      <div className="ticker-track flex w-max gap-4 px-4">
        {tickerItems.map((item, index) => (
          <div
            className="flex min-w-max items-center gap-3 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2"
            key={`${item.symbol}-${index}`}
          >
            <span className={item.mood === "takeover" ? "text-red-100" : "text-white"}>
              {item.symbol}
            </span>
            <span className="text-white/55">{item.price}</span>
            <span
              className={
                item.mood === "takeover"
                  ? "text-orange-200"
                  : item.change.startsWith("+")
                    ? "text-emerald-300"
                    : "text-red-300"
              }
            >
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
