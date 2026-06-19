import { Card, CardContent } from '@/components/ui/card';
import { Match } from '@/types/match';
import { MatchStatusBadge } from './match-status-badge';

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  return (
    // TODO: Adicionar tabela com jogos. Resultado vs Palpites e se pontuou. Bandeiras dos clubes e times.
    <Card className="mb-2">
      <CardContent className="flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div>
            {match.homeTeam} {match.homeScore}
          </div>
          <div>X</div>
          <div>
            {match.awayTeam} {match.awayScore}
          </div>
        </div>
        <div>{new Date(match.date).toLocaleString()}</div>
        <MatchStatusBadge status={match.status} />
      </CardContent>
    </Card>
  );
}
