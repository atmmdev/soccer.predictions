export interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
  status: "SCHEDULED" | "LIVE" | "FINISHED";
}