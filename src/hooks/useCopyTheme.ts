import { useState, useCallback } from 'react';
import { getThemeImageUrl } from '@/lib/themeImages';
import type { WeeklyTheme, WeeklyPulse } from '@/lib/types';

/**
 * Formats a plain-text version of a weekly theme for clipboard.
 */
function formatThemeText(theme: WeeklyTheme, pulse: WeeklyPulse): string {
  const lines: string[] = [];

  lines.push(`⚡ BTC Weekly Pulse — ${pulse.weekLabel}`);
  lines.push('');
  lines.push(`#${theme.rank} Theme: ${theme.title}`);
  lines.push('');
  lines.push(theme.summary);
  lines.push('');
  lines.push(`Why #${theme.rank}: ${theme.rankingReason}`);
  lines.push('');
  lines.push('Sources:');
  for (const ref of theme.references) {
    if (ref.url) {
      lines.push(`• ${ref.creator} — ${ref.title} ${ref.url}`);
    } else {
      lines.push(`• ${ref.creator} — ${ref.title}`);
    }
  }
  lines.push('');
  lines.push(`Analysis window: ${pulse.dateRange}`);
  lines.push('');
  lines.push('#bitcoin #btcweeklypulse');

  return lines.join('\n');
}

type CopyStatus = 'idle' | 'copying' | 'copied' | 'error';

interface UseCopyThemeReturn {
  copy: (theme: WeeklyTheme, pulse: WeeklyPulse) => Promise<void>;
  status: CopyStatus;
  copiedRank: 1 | 2 | 3 | null;
}

/**
 * Hook that copies a theme's text + image to the clipboard.
 *
 * Uses the Clipboard API to write both an image/png blob and
 * plain text so the user can paste into apps that support
 * rich clipboard content (Nostr clients, social media, notes apps).
 *
 * Falls back to text-only copy if image copy is not supported.
 */
export function useCopyTheme(): UseCopyThemeReturn {
  const [status, setStatus] = useState<CopyStatus>('idle');
  const [copiedRank, setCopiedRank] = useState<1 | 2 | 3 | null>(null);

  const copy = useCallback(async (theme: WeeklyTheme, pulse: WeeklyPulse) => {
    setStatus('copying');
    setCopiedRank(theme.rank);

    const text = formatThemeText(theme, pulse);

    try {
      // Try to copy image + text together using ClipboardItem
      if (typeof ClipboardItem !== 'undefined') {
        const imageUrl = getThemeImageUrl(theme.rank);
        const response = await fetch(imageUrl);

        if (response.ok) {
          const blob = await response.blob();

          // Convert to PNG for clipboard compatibility (most apps expect PNG)
          const pngBlob = await convertToPng(blob);

          const clipboardItem = new ClipboardItem({
            'text/plain': new Blob([text], { type: 'text/plain' }),
            'image/png': pngBlob,
          });

          await navigator.clipboard.write([clipboardItem]);
          setStatus('copied');
          resetAfterDelay();
          return;
        }
      }

      // Fallback: text-only copy
      await navigator.clipboard.writeText(text);
      setStatus('copied');
      resetAfterDelay();
    } catch {
      // Last resort fallback for older browsers
      try {
        await navigator.clipboard.writeText(text);
        setStatus('copied');
        resetAfterDelay();
      } catch {
        setStatus('error');
        resetAfterDelay();
      }
    }
  }, []);

  function resetAfterDelay() {
    setTimeout(() => {
      setStatus('idle');
      setCopiedRank(null);
    }, 2500);
  }

  return { copy, status, copiedRank };
}

/**
 * Convert any image blob to PNG using a canvas.
 * The Clipboard API requires image/png on most platforms.
 */
function convertToPng(blob: Blob): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error('Could not get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      canvas.toBlob((pngBlob) => {
        if (pngBlob) {
          resolve(pngBlob);
        } else {
          reject(new Error('Failed to convert image to PNG'));
        }
      }, 'image/png');
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
}
