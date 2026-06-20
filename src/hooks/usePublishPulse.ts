import { useMutation } from '@tanstack/react-query';
import { useUploadFile } from './useUploadFile';
import { useNostrPublish } from './useNostrPublish';
import type { WeeklyTheme, WeeklyPulse } from '@/lib/types';

interface PublishParams {
  theme: WeeklyTheme;
  pulse: WeeklyPulse;
}

/**
 * Formats a Nostr kind 1 note from a weekly theme.
 * Includes the theme image, summary, ranking rationale,
 * and source references.
 */
function formatNoteContent(theme: WeeklyTheme, pulse: WeeklyPulse, imageUrl: string): string {
  const lines: string[] = [];

  lines.push(`\u26A1 BTC Weekly Pulse \u2014 ${pulse.weekLabel}`);
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
      lines.push(`\u2022 ${ref.creator} \u2014 ${ref.title} ${ref.url}`);
    } else {
      lines.push(`\u2022 ${ref.creator} \u2014 ${ref.title}`);
    }
  }
  lines.push('');
  lines.push(imageUrl);
  lines.push('');
  lines.push(`Analysis window: ${pulse.dateRange}`);
  lines.push('');
  lines.push('#bitcoin #btcweeklypulse #nostr');

  return lines.join('\n');
}

/**
 * Hook that handles the full approve-and-publish flow:
 * 1. Fetch the theme image as a File
 * 2. Upload to Blossom
 * 3. Publish a kind 1 note with image + imeta tag
 */
export function usePublishPulse() {
  const { mutateAsync: uploadFile } = useUploadFile();
  const { mutateAsync: publishEvent } = useNostrPublish();

  return useMutation({
    mutationFn: async ({ theme, pulse }: PublishParams) => {
      // Step 1: Fetch the local theme image as a File
      const imageLocalPath = theme.rank === 1
        ? '/images/theme-1-hawkish-fed.jpeg'
        : theme.rank === 2
          ? '/images/theme-2-bitcoin-yield.jpeg'
          : '/images/theme-3-strategy-stress.jpeg';

      const response = await fetch(imageLocalPath);
      if (!response.ok) {
        throw new Error(`Failed to fetch theme image: ${response.statusText}`);
      }
      const blob = await response.blob();
      const file = new File(
        [blob],
        `btc-pulse-theme-${theme.rank}.jpeg`,
        { type: 'image/jpeg' },
      );

      // Step 2: Upload to Blossom
      const uploadTags = await uploadFile(file);
      const imageUrl = uploadTags[0][1];

      // Step 3: Build imeta tag from the upload response
      const imeta = uploadTags.map(([name, value]) => `${name} ${value}`);

      // Step 4: Build and publish the kind 1 note
      const content = formatNoteContent(theme, pulse, imageUrl);

      const tags: string[][] = [
        ['imeta', ...imeta],
        ['t', 'bitcoin'],
        ['t', 'btcweeklypulse'],
      ];

      const event = await publishEvent({
        kind: 1,
        content,
        tags,
      });

      return { event, imageUrl };
    },
  });
}
