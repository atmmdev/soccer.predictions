import { Team } from '@/features/dashboard/matches/types/team';

interface TeamFlagProps {
  team: Team;
}

export function TeamFlag({ team }: TeamFlagProps) {
  return (
    <div className="flex items-center gap-2">
      <span>{team.flag}</span>
      <span>{team.name}</span>
    </div>
  )
}
