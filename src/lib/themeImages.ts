import { assetUrl } from './assetUrl';

const IMAGE_PATHS: Record<1 | 2 | 3, string> = {
  1: '/images/theme-1-hawkish-fed.jpeg',
  2: '/images/theme-2-bitcoin-yield.jpeg',
  3: '/images/theme-3-strategy-stress.jpeg',
};

/** Returns the full URL to a theme image, respecting Vite's base path. */
export function getThemeImageUrl(rank: 1 | 2 | 3): string {
  return assetUrl(IMAGE_PATHS[rank]);
}
