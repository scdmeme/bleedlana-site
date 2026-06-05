"use client";

import { Activity, Copy } from "lucide-react";
import Image from "next/image";
import { SoundToggle } from "@/components/SoundToggle";
import { siteConfig } from "@/config/site";
import { getContractAddress, tokenLinks } from "@/config/token";
import { useBleedlanaStore } from "@/store/useBleedlanaStore";

export function Header() {
  const copiedContract = useBleedlanaStore((state) => state.copiedContract);
  const setCopiedContract = useBleedlanaStore((state) => state.setCopiedContract);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(getContractAddress());
      setCopiedContract(true);
      window.setTimeout(() => setCopiedContract(false), 1800);
    } catch {
      setCopiedContract(false);
    }
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-30 border-b border-white/10 bg-black/45 px-4 py-3 backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <a href="#hero" className="group flex items-center gap-3" aria-label="BLEEDLANA home">
          <span className="grid size-10 place-items-center rounded-lg border border-red-400/30 bg-red-500/15 text-red-200 shadow-[0_0_34px_rgba(255,24,63,0.22)]">
            <Image
              className="size-8 rounded-md object-cover"
              src={siteConfig.assets.avatarSmall}
              width={32}
              height={32}
              alt=""
            />
          </span>
          <span className="leading-none">
            <span className="block text-sm font-black tracking-[0.12em] text-white">
              {siteConfig.name}
            </span>
            <span className="mt-1 block font-mono text-[0.65rem] uppercase tracking-[0.24em] text-red-200/80">
              {siteConfig.slogan}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/70 md:flex">
          <a className="px-3 py-2 transition hover:text-white" href="#btc">
            BTC
          </a>
          <a className="px-3 py-2 transition hover:text-white" href="#eth">
            ETH
          </a>
          <a className="px-3 py-2 transition hover:text-white" href="#sol">
            SOL
          </a>
          <a className="px-3 py-2 transition hover:text-white" href="#tokenomics">
            Info
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            className="cta-button cta-button-buy hidden bg-white/[0.04] text-white md:inline-flex"
            href={tokenLinks.primaryBuy}
            target="_blank"
            rel="noreferrer"
          >
            <Activity size={16} aria-hidden="true" />
            {siteConfig.ctas.buy.label}
          </a>
          <button
            className="cta-button hidden bg-red-500/10 text-red-100 sm:inline-flex"
            type="button"
            onClick={handleCopy}
          >
            <Copy size={16} aria-hidden="true" />
            {copiedContract
              ? siteConfig.ctas.copy.copiedLabel
              : siteConfig.ctas.copy.label}
          </button>
          <SoundToggle />
        </div>
      </div>
    </header>
  );
}
