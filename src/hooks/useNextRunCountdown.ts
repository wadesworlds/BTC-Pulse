import { useState, useEffect } from 'react';

/**
 * Returns a human-readable countdown to the next Friday at 4:00 PM Los Angeles time.
 */
export function useNextRunCountdown(): string {
  const [countdown, setCountdown] = useState(() => computeCountdown());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(computeCountdown());
    }, 60_000); // update every minute
    return () => clearInterval(interval);
  }, []);

  return countdown;
}

function computeCountdown(): string {
  const now = new Date();

  // Get current time in LA
  const laFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = laFormatter.formatToParts(now);
  const getPart = (type: string) => parts.find((p) => p.type === type)?.value ?? '0';

  const laYear = parseInt(getPart('year'));
  const laMonth = parseInt(getPart('month')) - 1;
  const laDay = parseInt(getPart('day'));
  const laHour = parseInt(getPart('hour'));
  const laMinute = parseInt(getPart('minute'));
  const laDow = new Date(laYear, laMonth, laDay).getDay(); // 0=Sun, 5=Fri

  // Calculate days until next Friday
  let daysUntilFriday = (5 - laDow + 7) % 7;

  // If it's Friday but past 4:00 PM, go to next Friday
  if (daysUntilFriday === 0 && (laHour > 16 || (laHour === 16 && laMinute > 0))) {
    daysUntilFriday = 7;
  }

  // Calculate rough hours and minutes
  let hoursLeft: number;
  let minutesLeft: number;

  if (daysUntilFriday === 0) {
    // It's Friday, before 4 PM
    hoursLeft = 16 - laHour - (laMinute > 0 ? 1 : 0);
    minutesLeft = laMinute > 0 ? 60 - laMinute : 0;
  } else {
    hoursLeft = daysUntilFriday * 24 + (16 - laHour) - (laMinute > 0 ? 1 : 0);
    minutesLeft = laMinute > 0 ? 60 - laMinute : 0;
  }

  if (hoursLeft < 0) hoursLeft = 0;

  const days = Math.floor(hoursLeft / 24);
  const hours = hoursLeft % 24;

  const parts2: string[] = [];
  if (days > 0) parts2.push(`${days}d`);
  if (hours > 0) parts2.push(`${hours}h`);
  if (minutesLeft > 0) parts2.push(`${minutesLeft}m`);

  return parts2.length > 0 ? `${parts2.join(' ')} (Fri 4 PM PT)` : 'Now (Fri 4 PM PT)';
}
