import { Team } from "./team";

export interface Match {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  predictedHomeScore: number;
  predictedAwayScore: number;
  points: number;
  date: string;
  status: "SCHEDULED" | "LIVE" | "FINISHED";
}