import { AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface LimitationsNoteProps {
  limitations: string[];
}

export function LimitationsNote({ limitations }: LimitationsNoteProps) {
  if (limitations.length === 0) return null;

  return (
    <Card className="border-dashed border-muted-foreground/20">
      <CardContent className="py-4 px-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="size-4 text-muted-foreground shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Data Notes
            </h4>
            <ul className="space-y-1.5">
              {limitations.map((note, i) => (
                <li key={i} className="text-xs leading-relaxed text-muted-foreground">
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
