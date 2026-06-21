import { useSeoMeta } from '@unhead/react';
import { PulseHeader } from '@/components/PulseHeader';
import { ThemeCard } from '@/components/ThemeCard';
import { LimitationsNote } from '@/components/LimitationsNote';
import { SourceList } from '@/components/SourceList';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useCopyTheme } from '@/hooks/useCopyTheme';
import { currentPulse } from '@/lib/weeklyData';

const Index = () => {
  useSeoMeta({
    title: 'BTC Weekly Pulse — Top 3 Bitcoin Narratives This Week',
    description:
      'Weekly Bitcoin narrative analysis from curated YouTube creators. Discover the top 3 themes driving Bitcoin discourse.',
  });

  const { copy, status, copiedRank } = useCopyTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <ThemeToggle />
      </div>

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
        {/* Header */}
        <PulseHeader pulse={currentPulse} />

        {/* Theme Cards Grid */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {currentPulse.themes.map((theme) => (
              <ThemeCard
                key={theme.rank}
                theme={theme}
                pulse={currentPulse}
                copyStatus={copiedRank === theme.rank ? status : 'idle'}
                onCopy={copy}
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
