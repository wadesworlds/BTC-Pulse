import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full shadow-sm bg-card/80 backdrop-blur-sm"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}
