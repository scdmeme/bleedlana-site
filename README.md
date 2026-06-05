# BLEEDLANA Site

Cinematic interactive 3D website for the BLEEDLANA meme-token narrative: the market is bleeding, red candles are everywhere, and BLEEDLANA turns the panic into a cult-grade meme.

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Three.js via React Three Fiber
- `@react-three/drei`
- Framer Motion scroll state
- GSAP installed for future timeline/ScrollTrigger expansion
- Zustand UI state
- Lucide React icons

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Useful Scripts

```bash
npm run typecheck
npm run lint
npm run build
```

## Editable Content

- `src/config/site.ts` controls brand copy, CTA links, socials, disclaimer, and memes.
- `src/config/token.ts` controls ticker data, tokenomics placeholders, contract, and market symbols.
- `src/config/scenes.ts` controls scene titles, scroll ranges, camera positions, and overlay copy.

## API Ready

`src/lib/marketData.ts` currently returns mock BTC/ETH/SOL/BLEEDLANA data. Replace the mock provider with CoinGecko, Birdeye, Dexscreener, or your own route handler when live token data is ready.

## Updating Contract Address And Redeploying

When the real Pump.fun coin/token address is ready:

1. Open `src/config/token.ts`.
2. Replace only this line:

```ts
const activeContractAddress: string = "YOUR_REAL_CONTRACT_ADDRESS";
```

Everything else derives from that CA automatically:

- Copy Contract
- Pump.fun Buy buttons
- Dexscreener token page
- Dexscreener embed, once the pair exists
- Birdeye link
- Share-to-X meme text
- BLEEDLANA live ticker, once Dexscreener sees the pair

3. Check locally:

```bash
npm run build
```

4. Redeploy:

If the project is connected to Vercel through GitHub, commit and push the change. Vercel will rebuild automatically and users will see the new CA after the deployment finishes.

Manual Vercel deploy:

```bash
npx vercel deploy --prod
```

If users still see the old contract after deploy, wait a minute and hard-refresh. For CDN/cache issues, trigger a fresh Vercel production deployment.

## Next Improvements

- Live prices from CoinGecko/Birdeye/Dexscreener
- Dexscreener chart embed
- Real token contract and verified copy flow
- Animated BLEEDLANA mascot
- Sound effects toggle for red wipes and market panic pulses
- Share-to-X meme generator
