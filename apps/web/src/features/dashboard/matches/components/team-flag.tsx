import { Team } from '@/features/dashboard/matches/types/team';

interface TeamFlagProps {
  team: Team;
}

export function TeamFlag({ team }: TeamFlagProps) {
  return (
    <div className='flex min-w-0 items-center gap-1.5'>
      <span aria-hidden className='text-base leading-none'>
        {team.flag}
      </span>
      <span className='truncate text-sm font-medium'>{team.name}</span>
    </div>
  );
}
