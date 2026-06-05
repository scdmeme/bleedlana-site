import { ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";

export function SocialLinks() {
  return (
    <div className="mt-5 flex flex-wrap justify-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-white/64 max-sm:justify-start">
      {siteConfig.socials.map((social) => (
        <a
          className="inline-flex items-center gap-2 transition hover:text-red-100"
          href={social.href}
          key={social.label}
        >
          {social.label}
          <ExternalLink size={13} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
