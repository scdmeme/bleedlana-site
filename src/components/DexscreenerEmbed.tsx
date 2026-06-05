"use client";

import { useEffect, useState } from "react";
import { BarChart3, ExternalLink, RefreshCw, ShoppingCart } from "lucide-react";
import { tokenLinks, shortenAddress } from "@/config/token";
import type { MarketResponse, TokenMarketData } from "@/lib/marketData";

const fallbackToken: TokenMarketData = {
  contractAddress: "",
  priceUsd: null,
  priceNative: null,
  liquidityUsd: null,
  fdv: null,
  marketCap: null,
  dexId: null,
  pairAddress: null,
  pairUrl: tokenLinks.dexscreenerToken,
  embedUrl: null,
  buyUrl: tokenLinks.primaryBuy,
  chartUrl: tokenLinks.dexscreenerToken,
  pumpFunUrl: tokenLinks.pumpFun,
  birdeyeUrl: tokenLinks.birdeye
};

function formatUsd(value: number | null) {
  if (!Number.isFinite(value)) {
    return "TBA";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value!);
}

export function DexscreenerEmbed() {
  const [token, setToken] = useState<TokenMarketData>(fallbackToken);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadTokenMarket() {
      setLoading(true);

      try {
        const response = await fetch("/api/market");
        const data = (await response.json()) as MarketResponse;

        if (!cancelled) {
          setToken(data.token ?? fallbackToken);
        }
      } catch {
        if (!cancelled) {
          setToken(fallbackToken);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadTokenMarket();
    const intervalId = window.setInterval(loadTokenMarket, 60000);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div id="chart" className="mt-5 rounded-lg border border-red-200/14 bg-black/35 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-red-200/70">
            Live chart
          </div>
          <div className="mt-1 font-mono text-xs text-white/50">
            Pair {token.pairAddress ? shortenAddress(token.pairAddress) : "auto by CA"}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <a className="cta-button bg-white/[0.05] text-white" href={token.chartUrl} target="_blank" rel="noreferrer">
            <BarChart3 size={16} aria-hidden="true" />
            Dexscreener
          </a>
          <a className="cta-button cta-button-primary cta-button-buy" href={token.buyUrl} target="_blank" rel="noreferrer">
            <ShoppingCart size={16} aria-hidden="true" />
            Pump.fun
          </a>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-black/30 p-3">
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/45">
            Price
          </div>
          <div className="mt-1 text-lg font-black text-white">
            {token.priceUsd ? `$${Number(token.priceUsd).toPrecision(4)}` : "TBA"}
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-black/30 p-3">
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/45">
            Liquidity
          </div>
          <div className="mt-1 text-lg font-black text-white">
            {formatUsd(token.liquidityUsd)}
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-black/30 p-3">
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/45">
            FDV
          </div>
          <div className="mt-1 text-lg font-black text-white">
            {formatUsd(token.fdv)}
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-lg border border-red-200/14 bg-black/50">
        {token.embedUrl ? (
          <iframe
            className="h-[430px] w-full"
            src={token.embedUrl}
            title="BLEEDLANA Dexscreener chart"
          />
        ) : (
          <div className="grid h-64 place-items-center p-6 text-center">
            <div>
              <RefreshCw
                className={`mx-auto text-red-200 ${loading ? "animate-spin" : ""}`}
                size={28}
                aria-hidden="true"
              />
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-white/55">
                Dexscreener pair will appear here automatically after this CA has a live pair.
              </p>
              <a
                className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-red-100"
                href={tokenLinks.dexscreenerToken}
                target="_blank"
                rel="noreferrer"
              >
                Open token page <ExternalLink size={13} aria-hidden="true" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
