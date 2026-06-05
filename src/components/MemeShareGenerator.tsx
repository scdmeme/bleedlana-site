"use client";

import { useMemo, useState } from "react";
import { Copy, Shuffle, Twitter } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getContractAddress, tokenLinks } from "@/config/token";

const extraLines = [
  "BTC coughed. ETH sighed. SOL bled. BLEEDLANA posted.",
  "Green candles are temporary. Red lore is forever.",
  "If the chart bleeds, the meme feeds."
];

export function MemeShareGenerator() {
  const lines = useMemo(() => [...siteConfig.memes, ...extraLines], []);
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const text = `${lines[index]}\n\nBLEEDLANA CA: ${getContractAddress()}`;
  const shareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;

  async function copyMeme() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="mx-auto mt-6 max-w-2xl rounded-lg border border-red-200/14 bg-black/35 p-4 text-left">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-red-200/70">
          Meme transmission
        </div>
        <button
          className="grid size-9 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-red-100 transition hover:border-red-200/45"
          type="button"
          onClick={() => setIndex((current) => (current + 1) % lines.length)}
          aria-label="Shuffle meme"
        >
          <Shuffle size={15} aria-hidden="true" />
        </button>
      </div>
      <p className="mt-3 whitespace-pre-line text-lg font-black leading-7 text-white">
        {text}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a className="cta-button cta-button-primary" href={shareUrl || tokenLinks.shareToX} target="_blank" rel="noreferrer">
          <Twitter size={16} aria-hidden="true" />
          Share to X
        </a>
        <button className="cta-button bg-red-500/10 text-red-100" type="button" onClick={copyMeme}>
          <Copy size={16} aria-hidden="true" />
          {copied ? "Copied" : "Copy Meme"}
        </button>
      </div>
    </div>
  );
}
