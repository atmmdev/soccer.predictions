import { TeamCrest } from '@/components/matches';
import { Team } from '@/features/dashboard/matches/types/team';

interface TeamFlagProps {
  team: Team;
}

export function TeamFlag({ team }: TeamFlagProps) {
  return <TeamCrest name={team.name} logo={team.flag} className='inline-flex min-w-0 items-center gap-1.5 text-sm' />;
}
