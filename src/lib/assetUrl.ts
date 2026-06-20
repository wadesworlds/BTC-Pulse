/**
 * Resolves a public asset path using Vite's base URL.
 * Handles GitHub Pages subdirectory deployment (e.g. /BTC-Pulse/).
 *
 * Usage: assetUrl('/images/theme-1.jpeg') → '/BTC-Pulse/images/theme-1.jpeg'
 */
export function assetUrl(path: string): string {
  let base = '/';
  try {
    base = import.meta.env?.BASE_URL ?? '/';
  } catch {
    // Shakespeare preview may not define import.meta.env
  }
  // BASE_URL always ends with '/', path starts with '/' — avoid double slash
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
}
