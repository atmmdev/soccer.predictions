import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { TeamCrest } from './match-teams-stack';

export interface ScorePair {
  home: number | null;
  away: number | null;
}

export function hasCompleteScore(
  scores: ScorePair,
): scores is { home: number; away: number } {
  return typeof scores.home === 'number' && typeof scores.away === 'number';
}

interface ScoreStackProps {
  scores: ScorePair;
  compareWith?: ScorePair;
  highlight?: boolean;
  className?: string;
  homeTeam?: string;
  awayTeam?: string;
  homeTeamLogo?: string | null;
  awayTeamLogo?: string | null;
}

function ScoreDigit({
  value,
  isMatch,
  highlight,
}: {
  value: number;
  isMatch: boolean;
  highlight: boolean;
}) {
  return (
    <span
      className={cn(
        'leading-none font-bold tabular-nums text-xs',
        !highlight && 'text-foreground',
        highlight && isMatch && 'text-emerald-600',
        highlight && !isMatch && 'text-red-500',
      )}
    >
      {value}
    </span>
  );
}

function ScoreRow({
  teamName,
  teamLogo,
  showCrest,
  children,
}: {
  teamName?: string;
  teamLogo?: string | null;
  showCrest: boolean;
  children: ReactNode;
}) {
  return (
    <div className='flex items-center justify-center gap-1.5'>
      {showCrest && teamName ? (
        <TeamCrest
          name={teamName}
          logo={teamLogo}
          size={16}
          showName={false}
        />
      ) : null}
      {children}
    </div>
  );
}

export function ScoreStack({
  scores,
  compareWith,
  highlight = false,
  className,
  homeTeam,
  awayTeam,
  homeTeamLogo,
  awayTeamLogo,
}: ScoreStackProps) {
  const showCrest = Boolean(homeTeam && awayTeam);
  const canHighlight =
    highlight && compareWith !== undefined && hasCompleteScore(compareWith);

  if (!hasCompleteScore(scores)) {
    if (!showCrest) {
      return (
        <span
          className={cn(
            'text-base font-bold text-muted-foreground',
            className,
          )}
        >
          —
        </span>
      );
    }

    return (
      <div className={cn('flex flex-col items-center gap-2', className)}>
        <ScoreRow
          teamName={homeTeam}
          teamLogo={homeTeamLogo}
          showCrest={showCrest}
        >
          <span className='text-muted-foreground text-xs font-bold'>—</span>
        </ScoreRow>
        <ScoreRow
          teamName={awayTeam}
          teamLogo={awayTeamLogo}
          showCrest={showCrest}
        >
          <span className='text-muted-foreground text-xs font-bold'>—</span>
        </ScoreRow>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <ScoreRow
        teamName={homeTeam}
        teamLogo={homeTeamLogo}
        showCrest={showCrest}
      >
        <ScoreDigit
          value={scores.home}
          isMatch={canHighlight ? scores.home === compareWith!.home : false}
          highlight={canHighlight}
        />
      </ScoreRow>
      <ScoreRow
        teamName={awayTeam}
        teamLogo={awayTeamLogo}
        showCrest={showCrest}
      >
        <ScoreDigit
          value={scores.away}
          isMatch={canHighlight ? scores.away === compareWith!.away : false}
          highlight={canHighlight}
        />
      </ScoreRow>
    </div>
  );
}
