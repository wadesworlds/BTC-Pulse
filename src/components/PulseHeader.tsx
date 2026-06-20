import { Badge } from '@/components/ui/badge';
import { Zap, Clock, CalendarDays } from 'lucide-react';
import type { WeeklyPulse } from '@/lib/types';
import { useNextRunCountdown } from '@/hooks/useNextRunCountdown';

interface PulseHeaderProps {
  pulse: WeeklyPulse;
}

export function PulseHeader({ pulse }: PulseHeaderProps) {
  const countdown = useNextRunCountdown();

  const statusBadge = {
    pending: { label: 'Pending', variant: 'outline' as const },
    generated: { label: 'Ready for Review', variant: 'default' as const },
    selected: { label: 'Complete', variant: 'secondary' as const },
  }[pulse.status];

  return (
    <header className="relative isolate overflow-hidden rounded-2xl bg-card border shadow-sm">
      {/* Background decorative element */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-bitcoin/5 via-transparent to-bitcoin/3" />

      <div className="px-6 py-8 sm:px-8 sm:py-10">
        {/* Top line */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Zap className="size-5 text-bitcoin" />
            <span className="font-display text-sm font-bold uppercase tracking-wider text-bitcoin">
              BTC Weekly Pulse
            </span>
          </div>
          <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
        </div>

        {/* Main title */}
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-3">
          {pulse.weekLabel}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-4" />
            {pulse.dateRange}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-4" />
            Next run: {countdown}
          </span>
        </div>

        {/* Description */}
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Top 3 Bitcoin narratives identified from YouTube analysis of curated Bitcoin creators.
          Download an image to mark this week as complete.
        </p>
      </div>
    </header>
  );
}
