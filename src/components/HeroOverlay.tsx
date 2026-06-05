"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Terminal } from "lucide-react";
import { CTAButtons } from "@/components/CTAButtons";
import { MemeShareGenerator } from "@/components/MemeShareGenerator";
import { SocialLinks } from "@/components/SocialLinks";
import { TokenomicsPanel } from "@/components/TokenomicsPanel";
import { siteConfig } from "@/config/site";
import { scenes } from "@/config/scenes";
import { useScrollProgress } from "@/hooks/useScrollProgress";

function GlitchText({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <>
      {words.map((word, index) => {
        const normalized = word.replace(/[^A-Z]/gi, "").toUpperCase();
        const shouldGlitch =
          normalized.includes("BLEED") ||
          normalized.includes("RED") ||
          normalized.includes("BLEEDLANA");

        return (
          <span key={`${word}-${index}`}>
            {shouldGlitch ? (
              <span className="glitch-word" data-text={word}>
                {word}
              </span>
            ) : (
              word
            )}
            {index < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </>
  );
}

export function HeroOverlay() {
  useScrollProgress();

  return (
    <main className="story-shell">
      {scenes.map((scene) => {
        const isHero = scene.key === "hero";
        const isTakeover = scene.key === "takeover";
        const isTokenomics = scene.key === "tokenomics";
        const isFinal = scene.key === "final";
        const kicker = "kicker" in scene ? scene.kicker : undefined;

        return (
          <section
            className="story-section"
            data-align={scene.align}
            id={scene.id}
            key={scene.key}
          >
            <motion.div
              className={`story-panel panel-grid scanline p-5 sm:p-7 ${
                isHero || isFinal ? "mx-auto" : ""
              }`}
              initial={{ opacity: 0, y: 36, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ amount: 0.45, once: false }}
              transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between gap-4 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-red-200/80">
                <span>{scene.eyebrow}</span>
                <span>{scene.bleedLevel}</span>
              </div>

              <h1
                className={`mt-5 font-black leading-[0.92] text-white ${
                  isHero || isFinal
                    ? "text-[clamp(3rem,10vw,7.6rem)]"
                    : "text-[clamp(2.3rem,5.6vw,5rem)]"
                }`}
              >
                <GlitchText text={isHero ? siteConfig.hero.title : scene.title} />
              </h1>

              {isHero ? (
                <div className="mx-auto mt-5 max-w-3xl space-y-2 text-base font-semibold uppercase tracking-[0.12em] text-white/80 sm:text-lg">
                  {siteConfig.hero.subtitles.map((subtitle) => (
                    <p key={subtitle}>
                      <GlitchText text={subtitle} />
                    </p>
                  ))}
                </div>
              ) : (
                <p className="mt-5 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">
                  <GlitchText text={scene.body} />
                </p>
              )}

              {kicker ? (
                <p className="mt-5 font-mono text-xs uppercase tracking-[0.28em] text-red-200/70">
                  {kicker}
                </p>
              ) : null}

              {scene.key === "btc" ? (
                <div className="mt-6 grid gap-2 font-mono text-xs uppercase tracking-[0.16em] text-red-100/80">
                  {siteConfig.terminalLogs.btc.map((log) => (
                    <div
                      className="flex items-center gap-2 border border-red-300/15 bg-black/30 px-3 py-2"
                      key={log}
                    >
                      <Terminal size={14} aria-hidden="true" />
                      {log}
                    </div>
                  ))}
                </div>
              ) : null}

              {scene.key === "eth" ? (
                <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-orange-300/25 bg-orange-500/10 px-3 py-2 font-mono text-xs uppercase tracking-[0.18em] text-orange-100">
                  <AlertTriangle size={15} aria-hidden="true" />
                  Gas meter: PAIN
                </div>
              ) : null}

              {isTakeover ? (
                <>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {siteConfig.memes.map((meme) => (
                      <div
                        className="rounded-lg border border-red-300/18 bg-black/35 p-3 font-mono text-xs uppercase tracking-[0.12em] text-red-50/86"
                        key={meme}
                      >
                        {meme}
                      </div>
                    ))}
                  </div>
                  <CTAButtons mode="takeover" />
                </>
              ) : null}

              {isTokenomics ? <TokenomicsPanel /> : null}
              {isFinal ? (
                <>
                  <p className="mt-5 text-xl font-bold uppercase tracking-[0.1em] text-red-100">
                    {siteConfig.final.subtitle}
                  </p>
                  <CTAButtons mode="final" />
                  <MemeShareGenerator />
                  <SocialLinks />
                </>
              ) : null}
              {isHero ? <CTAButtons mode="hero" /> : null}
            </motion.div>
          </section>
        );
      })}
    </main>
  );
}
