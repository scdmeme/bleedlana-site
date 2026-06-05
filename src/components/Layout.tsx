import { BleedlanaMascot } from "@/components/BleedlanaMascot";
import { Disclaimer } from "@/components/Disclaimer";
import { Header } from "@/components/Header";
import { HeroOverlay } from "@/components/HeroOverlay";
import { MarketTicker } from "@/components/MarketTicker";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import SceneCanvas from "@/components/SceneCanvas";

export function Layout() {
  return (
    <>
      <SceneCanvas />
      <div className="red-wipe" />
      <Header />
      <ProgressIndicator />
      <HeroOverlay />
      <BleedlanaMascot />
      <MarketTicker />
      <Disclaimer />
    </>
  );
}
