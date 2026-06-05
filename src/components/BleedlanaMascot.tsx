import Image from "next/image";

export function BleedlanaMascot() {
  return (
    <div className="pointer-events-none fixed bottom-16 right-4 z-20 hidden h-28 w-28 animate-mascot-float lg:block">
      <Image
        className="size-28 rounded-full object-cover shadow-[0_0_48px_rgba(255,24,63,0.28)]"
        src="/assets/bleedlana-avatar-180.png"
        width={112}
        height={112}
        alt=""
      />
    </div>
  );
}
