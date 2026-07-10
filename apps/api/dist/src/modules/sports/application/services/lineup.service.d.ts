export interface FixtureLineupResponse {
    home: {
        team: {
            id: number;
            name: string;
            flag: string;
        };
        players: Array<{
            id: number;
            name: string;
            teamId: number;
        }>;
    };
    away: {
        team: {
            id: number;
            name: string;
            flag: string;
        };
        players: Array<{
            id: number;
            name: string;
            teamId: number;
        }>;
    };
}
export declare class LineupService {
    getFixtureLineup(_fixtureId: number): Promise<FixtureLineupResponse>;
}
