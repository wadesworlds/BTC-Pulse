import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Send,
  ExternalLink,
  Trophy,
  Medal,
  Award,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { WeeklyTheme } from '@/lib/types';

interface ThemeCardProps {
  theme: WeeklyTheme;
  isPublished: boolean;
  isPublishing: boolean;
  isOtherPublished: boolean;
  isLoggedIn: boolean;
  onApprove: (rank: 1 | 2 | 3) => void;
}

const rankConfig = {
  1: {
    icon: Trophy,
    label: '#1',
    gradient: 'from-amber-500/20 via-amber-400/5 to-transparent',
    borderColor: 'border-amber-500/40',
    badgeClass: 'bg-amber-500 text-white',
    iconColor: 'text-amber-500',
    ring: 'ring-amber-500/30',
  },
  2: {
    icon: Medal,
    label: '#2',
    gradient: 'from-slate-400/15 via-slate-300/5 to-transparent',
    borderColor: 'border-slate-400/30',
    badgeClass: 'bg-slate-500 text-white',
    iconColor: 'text-slate-400',
    ring: 'ring-slate-400/20',
  },
  3: {
    icon: Award,
    label: '#3',
    gradient: 'from-orange-600/15 via-orange-500/5 to-transparent',
    borderColor: 'border-orange-600/30',
    badgeClass: 'bg-orange-600 text-white',
    iconColor: 'text-orange-600',
    ring: 'ring-orange-600/20',
  },
} as const;

export function ThemeCard({
  theme,
  isPublished,
  isPublishing,
  isOtherPublished,
  isLoggedIn,
  onApprove,
}: ThemeCardProps) {
  const [expanded, setExpanded] = useState(false);
  const config = rankConfig[theme.rank];
  const RankIcon = config.icon;

  const imageUrl = theme.rank === 1
    ? '/images/theme-1-hawkish-fed.jpeg'
    : theme.rank === 2
      ? '/images/theme-2-bitcoin-yield.jpeg'
      : '/images/theme-3-strategy-stress.jpeg';

  const canApprove = isLoggedIn && !isPublished && !isOtherPublished && !isPublishing;

  return (
    <Card
      className={cn(
        'relative overflow-hidden transition-all duration-300',
        isPublished && `ring-2 ${config.ring} ${config.borderColor}`,
        !isPublished && !isOtherPublished && 'hover:shadow-lg',
        isOtherPublished && !isPublished && 'opacity-60',
      )}
    >
      {/* Gradient accent */}
      <div className={cn('absolute inset-0 bg-gradient-to-br pointer-events-none', config.gradient)} />

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={`Theme ${theme.rank}: ${theme.title}`}
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Rank badge overlay */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className={cn('inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold shadow-lg', config.badgeClass)}>
            <RankIcon className="size-4" />
            {config.label}
          </span>
          {isPublished && (
            <span className="inline-flex items-center gap-1 rounded-full bg-green-600 px-2.5 py-1 text-xs font-semibold text-white shadow-lg">
              <CheckCircle className="size-3" />
              Published
            </span>
          )}
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight drop-shadow-md">
            {theme.title}
          </h3>
        </div>
      </div>

      <CardHeader className="relative pt-4 pb-0">
        <CardTitle className="sr-only">{theme.title}</CardTitle>
      </CardHeader>

      <CardContent className="relative space-y-4">
        {/* Summary */}
        <p className="text-sm leading-relaxed text-card-foreground/90">
          {theme.summary}
        </p>

        <Separator />

        {/* Ranking Reason */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Why {config.label}
          </h4>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {theme.rankingReason}
          </p>
        </div>

        {/* References */}
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Sources ({theme.references.length})
            {expanded ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
          </button>

          {expanded && (
            <ul className="mt-3 space-y-2">
              {theme.references.map((ref, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-muted-foreground shrink-0 mt-0.5 w-5 text-center text-xs font-mono">
                    {i + 1}.
                  </span>
                  <div className="min-w-0">
                    <span className="font-medium text-card-foreground">{ref.creator}</span>
                    <span className="text-muted-foreground"> &mdash; </span>
                    {ref.url ? (
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline inline-flex items-center gap-1"
                      >
                        {ref.title}
                        <ExternalLink className="size-3 shrink-0" />
                      </a>
                    ) : (
                      <span className="text-muted-foreground italic">{ref.title}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Separator />

        {/* Actions */}
        <div className="flex items-center gap-3">
          {isPublished ? (
            <Badge className="bg-green-600 text-white text-xs gap-1.5 py-1">
              <CheckCircle className="size-3.5" />
              Published to Nostr
            </Badge>
          ) : isPublishing ? (
            <Button variant="default" size="sm" className="gap-2" disabled>
              <Loader2 className="size-4 animate-spin" />
              Publishing...
            </Button>
          ) : (
            <Button
              onClick={() => onApprove(theme.rank)}
              variant={canApprove ? 'default' : 'outline'}
              size="sm"
              className="gap-2"
              disabled={!canApprove}
              title={!isLoggedIn ? 'Sign in to publish' : isOtherPublished ? 'Another theme was already published this week' : undefined}
            >
              <Send className="size-4" />
              Approve &amp; Publish
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
