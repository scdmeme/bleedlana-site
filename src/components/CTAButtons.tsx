"use client";

import {
  ArrowDown,
  BarChart3,
  Copy,
  ExternalLink,
  Radio,
  Send,
  ShoppingCart
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { getContractAddress, tokenLinks } from "@/config/token";
import { useBleedlanaStore } from "@/store/useBleedlanaStore";

type CTAButtonsProps = {
  mode: "hero" | "takeover" | "final";
};

export function CTAButtons({ mode }: CTAButtonsProps) {
  const copiedContract = useBleedlanaStore((state) => state.copiedContract);
  const setCopiedContract = useBleedlanaStore((state) => state.setCopiedContract);

  async function copyContract() {
    try {
      await navigator.clipboard.writeText(getContractAddress());
      setCopiedContract(true);
      window.setTimeout(() => setCopiedContract(false), 1800);
    } catch {
      setCopiedContract(false);
    }
  }

  if (mode === "takeover") {
    return (
      <div className="mt-7 flex flex-wrap gap-3">
        <a className="cta-button cta-button-primary" href={siteConfig.ctas.telegram.href}>
          <Send size={16} aria-hidden="true" />
          {siteConfig.ctas.telegram.label}
        </a>
        <a className="cta-button bg-white/[0.05] text-white" href={tokenLinks.shareToX} target="_blank" rel="noreferrer">
          <Radio size={16} aria-hidden="true" />
          {siteConfig.ctas.x.label}
        </a>
        <a className="cta-button bg-white/[0.05] text-white" href={tokenLinks.primaryBuy} target="_blank" rel="noreferrer">
          <ExternalLink size={16} aria-hidden="true" />
          {siteConfig.ctas.dex.label}
        </a>
      </div>
    );
  }

  if (mode === "final") {
    return (
      <div className="mt-7 flex flex-wrap justify-center gap-3 max-sm:justify-start">
        <a
          className="cta-button cta-button-primary cta-button-buy"
          href={tokenLinks.primaryBuy}
          target="_blank"
          rel="noreferrer"
        >
          <ShoppingCart size={16} aria-hidden="true" />
          {siteConfig.ctas.buy.label}
        </a>
        <a
          className="cta-button bg-white/[0.05] text-white"
          href={siteConfig.ctas.community.href}
        >
          <Send size={16} aria-hidden="true" />
          {siteConfig.ctas.community.label}
        </a>
        <button className="cta-button bg-red-500/10 text-red-100" type="button" onClick={copyContract}>
          <Copy size={16} aria-hidden="true" />
          {copiedContract
            ? siteConfig.ctas.copy.copiedLabel
            : siteConfig.ctas.copy.label}
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-wrap justify-center gap-3">
      <a className="cta-button cta-button-primary" href={siteConfig.ctas.enter.href}>
        <ArrowDown size={16} aria-hidden="true" />
        {siteConfig.ctas.enter.label}
      </a>
      <a
        className="cta-button cta-button-buy bg-white/[0.05] text-white"
        href={tokenLinks.primaryBuy}
        target="_blank"
        rel="noreferrer"
      >
        <ShoppingCart size={16} aria-hidden="true" />
        {siteConfig.ctas.buy.label}
      </a>
      <a className="cta-button bg-white/[0.05] text-white" href={siteConfig.ctas.chart.href}>
        <BarChart3 size={16} aria-hidden="true" />
        {siteConfig.ctas.chart.label}
      </a>
    </div>
  );
}
