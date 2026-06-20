import { useState, useCallback } from 'react';
import { useSeoMeta } from '@unhead/react';
import { PulseHeader } from '@/components/PulseHeader';
import { ThemeCard } from '@/components/ThemeCard';
import { LimitationsNote } from '@/components/LimitationsNote';
import { SourceList } from '@/components/SourceList';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LoginArea } from '@/components/auth/LoginArea';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { usePublishPulse } from '@/hooks/usePublishPulse';
import { useToast } from '@/hooks/useToast';
import { currentPulse } from '@/lib/weeklyData';

const Index = () => {
  useSeoMeta({
    title: 'BTC Weekly Pulse \u2014 Top 3 Bitcoin Narratives This Week',
    description:
      'Weekly Bitcoin narrative analysis from curated YouTube creators. Discover the top 3 themes driving Bitcoin discourse. Approve your pick and publish it to Nostr.',
  });

  const { user } = useCurrentUser();
  const { toast } = useToast();
  const publishMutation = usePublishPulse();

  const [publishedRank, setPublishedRank] = useState<1 | 2 | 3 | null>(null);
  const [publishingRank, setPublishingRank] = useState<1 | 2 | 3 | null>(null);

  const handleApprove = useCallback(async (rank: 1 | 2 | 3) => {
    const theme = currentPulse.themes.find((t) => t.rank === rank);
    if (!theme) return;

    setPublishingRank(rank);

    try {
      await publishMutation.mutateAsync({ theme, pulse: currentPulse });
      setPublishedRank(rank);
      toast({
        title: 'Published to Nostr',
        description: `Theme #${rank} "${theme.title}" has been published to your Nostr account with the theme image.`,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      toast({
        title: 'Publish failed',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setPublishingRank(null);
    }
  }, [publishMutation, toast]);

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <LoginArea className="max-w-60" />
        <ThemeToggle />
      </div>

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
        {/* Header */}
        <PulseHeader
          pulse={currentPulse}
          isPublished={publishedRank !== null}
        />

        {/* Login prompt when not signed in */}
        {!user && (
          <div className="rounded-xl border border-dashed border-primary/30 bg-primary/5 px-6 py-4 text-center">
            <p className="text-sm text-muted-foreground">
              Sign in with your Nostr account to approve and publish a theme to your feed.
            </p>
          </div>
        )}

        {/* Theme Cards Grid */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {currentPulse.themes.map((theme) => (
              <ThemeCard
                key={theme.rank}
                theme={theme}
                isPublished={publishedRank === theme.rank}
                isPublishing={publishingRank === theme.rank}
                isOtherPublished={publishedRank !== null && publishedRank !== theme.rank}
                isLoggedIn={!!user}
                onApprove={handleApprove}
              />
            ))}
          </div>
        </section>

        {/* Bottom section */}
        <div className="space-y-4">
          {currentPulse.limitations && currentPulse.limitations.length > 0 && (
            <LimitationsNote limitations={currentPulse.limitations} />
          )}
          <SourceList />

          {/* Footer */}
          <footer className="text-center py-6 space-y-2">
            <p className="text-xs text-muted-foreground">
              Analysis window: {currentPulse.dateRange} &middot; Generated{' '}
              {new Date(currentPulse.generatedAt).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
            <p className="text-xs text-muted-foreground">
              Vibed with{' '}
              <a
                href="https://shakespeare.diy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Shakespeare
              </a>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Index;
