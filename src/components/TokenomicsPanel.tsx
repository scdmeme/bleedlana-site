"use client";

import { Copy, ExternalLink } from "lucide-react";
import { DexscreenerEmbed } from "@/components/DexscreenerEmbed";
import { tokenLinks, tokenomics } from "@/config/token";
import { useBleedlanaStore } from "@/store/useBleedlanaStore";

export function TokenomicsPanel() {
  const copiedContract = useBleedlanaStore((state) => state.copiedContract);
  const setCopiedContract = useBleedlanaStore((state) => state.setCopiedContract);
  const contract = tokenomics.find((item) => item.label === "Contract")?.value ?? "Coming soon";

  async function copyContract() {
    await navigator.clipboard.writeText(contract);
    setCopiedContract(true);
    window.setTimeout(() => setCopiedContract(false), 1600);
  }

  return (
    <>
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        {tokenomics.map((item) => {
          const isContract = item.label === "Contract";

          return (
            <div
              className={`rounded-lg border border-red-200/14 bg-black/35 p-4 ${
                isContract ? "sm:col-span-2" : ""
              }`}
              key={item.label}
            >
              <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-red-200/70">
                {item.label}
              </div>
              <div
                className={`mt-2 flex items-center justify-between gap-3 font-black text-white ${
                  isContract ? "text-sm sm:text-base" : "text-lg"
                }`}
              >
                <span
                  className={
                    isContract
                      ? "min-w-0 break-all font-mono leading-6 text-red-50"
                      : ""
                  }
                >
                  {item.value}
                </span>
                {isContract ? (
                  <button
                    className="grid size-9 shrink-0 place-items-center rounded-lg border border-red-200/15 bg-red-500/10 text-red-100 transition hover:border-red-200/45"
                    type="button"
                    onClick={copyContract}
                    aria-label="Copy contract"
                  >
                    <Copy size={16} aria-hidden="true" />
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      <div id="buy" className="mt-3 flex flex-wrap gap-3">
        <a className="cta-button cta-button-primary cta-button-buy" href={tokenLinks.primaryBuy} target="_blank" rel="noreferrer">
          <ExternalLink size={16} aria-hidden="true" />
          Pump.fun
        </a>
        <a className="cta-button bg-white/[0.05] text-white" href={tokenLinks.dexscreenerToken} target="_blank" rel="noreferrer">
          <ExternalLink size={16} aria-hidden="true" />
          Dexscreener
        </a>
        <a className="cta-button bg-white/[0.05] text-white" href={tokenLinks.birdeye} target="_blank" rel="noreferrer">
          <ExternalLink size={16} aria-hidden="true" />
          Birdeye
        </a>
        <span className="inline-flex items-center font-mono text-xs uppercase tracking-[0.14em] text-white/45">
          {copiedContract ? "CA copied" : "CA linked"}
        </span>
      </div>

      <DexscreenerEmbed />
    </>
  );
}
