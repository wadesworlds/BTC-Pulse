import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Users } from 'lucide-react';
import { CURATED_SOURCES } from '@/lib/weeklyData';

export function SourceList() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="border-dashed border-muted-foreground/20">
      <CardContent className="py-4 px-6">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors cursor-pointer w-full"
        >
          <Users className="size-4" />
          Curated Source List ({CURATED_SOURCES.length} channels)
          {expanded ? <ChevronUp className="size-3 ml-auto" /> : <ChevronDown className="size-3 ml-auto" />}
        </button>

        {expanded && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {CURATED_SOURCES.map((source) => (
              <Badge key={source} variant="outline" className="text-xs font-normal">
                {source}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
