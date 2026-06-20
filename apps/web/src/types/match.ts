export interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  predictedHomeScore: number;
  predictedAwayScore: number;
  points: number;
  date: string;
  status: "SCHEDULED" | "LIVE" | "FINISHED";
}