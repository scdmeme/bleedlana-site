import { CTAButtons } from "@/components/CTAButtons";
import { siteConfig } from "@/config/site";

export function WebGLFallback() {
  return (
    <div className="fixed-canvas overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,24,63,0.28),transparent_34rem)]" />
      <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-300/20 bg-red-500/10 blur-2xl" />
      <div className="absolute inset-x-0 top-1/3 mx-auto h-40 max-w-4xl">
        <div className="h-full w-full rotate-[-8deg] border-b-8 border-red-500 shadow-[0_0_80px_rgba(255,24,63,0.28)]" />
        <div className="ml-auto mt-[-2rem] h-32 w-3/4 rotate-[9deg] border-b-8 border-red-700 shadow-[0_0_60px_rgba(255,24,63,0.2)]" />
      </div>
      <div className="absolute left-1/2 top-1/2 w-[min(92vw,44rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-red-200/20 bg-black/65 p-6 text-center backdrop-blur-xl">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-red-200/80">
          2D fallback
        </div>
        <h2 className="mt-4 text-[clamp(2.4rem,9vw,5.8rem)] font-black leading-none text-white">
          {siteConfig.hero.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          {siteConfig.hero.subtitles.join(" ")}
        </p>
        <CTAButtons mode="hero" />
      </div>
    </div>
  );
}
