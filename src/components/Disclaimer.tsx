import { siteConfig } from "@/config/site";

export function Disclaimer() {
  return (
    <footer className="relative z-20 border-t border-white/10 bg-black px-4 pb-20 pt-6 text-center font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/45">
      {siteConfig.disclaimer}
    </footer>
  );
}
