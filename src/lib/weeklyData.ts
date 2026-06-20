import type { WeeklyPulse } from './types';

/**
 * Curated YouTube sources for Bitcoin narrative tracking.
 */
export const CURATED_SOURCES = [
  'Natalie Brunell',
  'Jordi Visser',
  'Pomp (Anthony Pompliano)',
  'Joe Carlasare',
  'Swan',
  'Simply Bitcoin',
  'Mark Moss',
  'BTC Sessions',
  'Verified Investing',
  'Bitcoin Magazine',
  'Joe Nakamoto',
  'TFTC',
  'Rabbit Hole Recap',
  'Derek Ross',
  'Caitlin Long',
  'Adam Livingston',
  'James Lavish',
  'Lyn Alden',
  'Peter McCormack',
  'What Bitcoin Did',
  'Coin Bureau',
  'Benjamin Cowen',
  'Altcoin Daily',
  'CryptosRUs',
  'Crypto Jebb',
] as const;

/**
 * Weekly pulse data for June 13-20, 2026.
 * Generated from YouTube content analysis across curated Bitcoin channels.
 */
export const currentPulse: WeeklyPulse = {
  id: 'week-2026-06-20',
  weekLabel: 'Week of June 20, 2026',
  dateRange: 'June 13 \u2013 June 20, 2026',
  generatedAt: '2026-06-20T23:00:00.000Z',
  status: 'generated',
  themes: [
    {
      rank: 1,
      title: 'Warsh\u2019s Hawkish Fed Debut Rattles Bitcoin',
      summary:
        'New Fed Chair Kevin Warsh held rates steady at his first FOMC meeting but gutted forward guidance, shocking markets with the most hawkish dot plot in years. Nine of eighteen committee members projected a rate hike before December, and the half-page statement\u2014a stark contrast to Powell\u2019s lengthy communiqu\u00e9s\u2014sent Bitcoin from $66,300 to $63,900 overnight. Benjamin Cowen warned that the mere pricing-in of a hike is the headwind, regardless of whether the Fed follows through.',
      rankingReason:
        'This was the dominant narrative across virtually every curated Bitcoin channel this week. Swan\u2019s two flagship shows, Simply Bitcoin\u2019s daily coverage, BTC Sessions, and Benjamin Cowen all centered their analysis on Warsh\u2019s debut. The hawkish shift impacts everything\u2014ETF flows, risk appetite, and the macro backdrop for the rest of 2026\u2014making it the clear #1 theme.',
      references: [
        {
          creator: 'Swan Bitcoin',
          title: 'The Fed Held, BITA Launched, and STRC is Stressed',
          url: 'https://www.youtube.com/watch?v=ScSpbhqXhts',
        },
        {
          creator: 'Swan Bitcoin',
          title: 'Warsh\u2019s Fed, BlackRock\u2019s Yield ETF, SpaceX\u2019s Bitcoin | Get Real',
          url: 'https://www.youtube.com/watch?v=tZTEmRaxd4w',
        },
        {
          creator: 'Benjamin Cowen',
          title: 'Bitcoin: The Warsh Fed Headwind',
        },
        {
          creator: 'BTC Sessions',
          title: '$61k BTC Has Everyone TERRIFIED\u2026 this is extremely bullish',
          url: 'https://www.youtube.com/watch?v=XNGfnzxCyeU',
        },
        {
          creator: 'Simply Bitcoin',
          title: 'WARNING: THE INFLATION SH*T HAS HIT THE FAN!',
        },
      ],
    },
    {
      rank: 2,
      title: 'BlackRock\u2019s BITA Launches the Bitcoin Yield Era',
      summary:
        'BlackRock listed BITA on Nasdaq\u2014the iShares Bitcoin Premium Income ETF\u2014becoming the first major issuer to offer a covered-call yield product on Bitcoin. By selling call options against 25-35% of its IBIT holdings, the fund targets a 15-25% annual yield, effectively monetizing Bitcoin\u2019s volatility as income. Goldman Sachs filed a competing product days earlier, signaling that Bitcoin yield products are becoming a new institutional battleground.',
      rankingReason:
        'BITA dominated mid-week coverage from Swan, Bitcoin Magazine, and multiple curated sources. It represents a structural evolution in how traditional finance packages Bitcoin\u2014turning volatility from a barrier into a feature. The launch also suppresses implied volatility at scale, which has long-term market microstructure implications that creators like Swan\u2019s Brady and Lyn Alden explored in depth.',
      references: [
        {
          creator: 'Swan Bitcoin',
          title: 'Warsh\u2019s Fed, BlackRock\u2019s Yield ETF, SpaceX\u2019s Bitcoin | Get Real',
          url: 'https://www.youtube.com/watch?v=tZTEmRaxd4w',
        },
        {
          creator: 'Bitcoin Magazine',
          title: 'BlackRock Executive Calls Bitcoin "Too Big To Ignore"',
        },
        {
          creator: 'Swan Bitcoin',
          title: 'The Fed Held, BITA Launched, and STRC is Stressed',
          url: 'https://www.youtube.com/watch?v=ScSpbhqXhts',
        },
        {
          creator: 'Simply Bitcoin',
          title: 'The BIGGEST NEWS Since The Bitcoin ETF Launch JUST HAPPENED!!',
        },
        {
          creator: 'Lyn Alden (via Swan)',
          title: 'Analysis: What BITA gives holders versus what it doesn\u2019t',
        },
      ],
    },
    {
      rank: 3,
      title: 'Strategy Under Stress: The STRC Crackdown & Saylor\u2019s Conviction Buy',
      summary:
        'Strategy\u2019s STRC preferred stock cracked below $90 this week as CryptoQuant\u2019s CEO warned that Bitcoin sideways action\u2014not a crash\u2014is the real danger to Saylor\u2019s capital-raising machine. Yet Strategy responded by buying 1,587 BTC for $100M at $63K, lifting total holdings to 846,842 BTC. The market barely moved, confirming that macro forces now outweigh any single corporate buyer. The narrative tension between Strategy\u2019s conviction and its structural vulnerability was the week\u2019s most debated thread.',
      rankingReason:
        'This theme pulled together multiple sub-narratives: Strategy\u2019s first-ever BTC sale two weeks prior, the STRC dislocation, competing bottom calls ($59K vs $48K), and 125,000 BTC of long-term holder accumulation in June. Swan, Simply Bitcoin, BTC Sessions, and Natalie Brunell all covered different angles, making it a rich and multi-layered #3 that captures the cycle\u2019s conviction-versus-fragility tension.',
      references: [
        {
          creator: 'Swan Bitcoin',
          title: 'The Fed Held, BITA Launched, and STRC is Stressed',
          url: 'https://www.youtube.com/watch?v=ScSpbhqXhts',
        },
        {
          creator: 'Swan Bitcoin',
          title: 'Bitcoin Bottom Signals?',
          url: 'https://www.youtube.com/watch?v=Wpy2HeNgafc',
        },
        {
          creator: 'Simply Bitcoin',
          title: 'Did Bitcoin\u2019s 53% Fall Front Run the A.I. Market Collapse?',
        },
        {
          creator: 'Natalie Brunell',
          title: 'Bitcoin Is Just Getting Started | The Pomp Podcast Panel',
        },
        {
          creator: 'BTC Sessions',
          title: '$61k BTC Has Everyone TERRIFIED\u2026 this is extremely bullish',
          url: 'https://www.youtube.com/watch?v=XNGfnzxCyeU',
        },
      ],
    },
  ],
  limitations: [
    'Jordi Visser, Verified Investing, Joe Nakamoto, and Crypto Jebb had limited discoverable YouTube content for this specific 7-day window; closest associated content was used where available.',
    'Some video references are from podcasts cross-posted to YouTube (e.g., Natalie Brunell on The Pomp Podcast). These were included because the content was available on YouTube.',
    'Benjamin Cowen\u2019s specific June 17-18 Warsh analysis was confirmed via secondary coverage (Benzinga, CryptoFeedNews) though the direct YouTube page metadata was sparse.',
  ],
};
