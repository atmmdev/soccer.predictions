import type { FixtureLineup } from '../types/fixture-lineup';

export const fixtureLineups: Record<number, FixtureLineup> = {
  101: {
    home: {
      team: { id: 1, name: 'Flamengo', flag: '🔴⚫' },
      players: [
        { id: 1001, name: 'Gabigol', teamId: 1 },
        { id: 1002, name: 'Pedro', teamId: 1 },
        { id: 1003, name: 'Arrascaeta', teamId: 1 },
      ],
    },
    away: {
      team: { id: 2, name: 'Palmeiras', flag: '🟢' },
      players: [
        { id: 1004, name: 'Endrick', teamId: 2 },
        { id: 1005, name: 'Rony', teamId: 2 },
        { id: 1006, name: 'Raphael Veiga', teamId: 2 },
      ],
    },
  },
  102: {
    home: {
      team: { id: 3, name: 'São Paulo', flag: '⚫🔴⚪' },
      players: [
        { id: 2001, name: 'Calleri', teamId: 3 },
        { id: 2002, name: 'Luciano', teamId: 3 },
      ],
    },
    away: {
      team: { id: 4, name: 'Corinthians', flag: '⚪⚫' },
      players: [
        { id: 2003, name: 'Memphis', teamId: 4 },
        { id: 2004, name: 'Yuri Alberto', teamId: 4 },
        { id: 2005, name: 'Garro', teamId: 4 },
      ],
    },
  },
  103: {
    home: {
      team: { id: 5, name: 'Real Madrid', flag: '⚪' },
      players: [
        { id: 3001, name: 'Vinícius Jr.', teamId: 5 },
        { id: 3002, name: 'Bellingham', teamId: 5 },
        { id: 3003, name: 'Mbappé', teamId: 5 },
      ],
    },
    away: {
      team: { id: 6, name: 'Barcelona', flag: '🔵🔴' },
      players: [
        { id: 3004, name: 'Lewandowski', teamId: 6 },
        { id: 3005, name: 'Raphinha', teamId: 6 },
        { id: 3006, name: 'Yamal', teamId: 6 },
      ],
    },
  },
  104: {
    home: {
      team: { id: 7, name: 'Man City', flag: '🔵' },
      players: [
        { id: 4001, name: 'Haaland', teamId: 7 },
        { id: 4002, name: 'Foden', teamId: 7 },
      ],
    },
    away: {
      team: { id: 8, name: 'Liverpool', flag: '🔴' },
      players: [
        { id: 4003, name: 'Salah', teamId: 8 },
        { id: 4004, name: 'Núñez', teamId: 8 },
      ],
    },
  },
  105: {
    home: {
      team: { id: 9, name: 'Grêmio', flag: '🔵⚫⚪' },
      players: [
        { id: 5001, name: 'Luis Suárez', teamId: 9 },
        { id: 5002, name: 'Geromel', teamId: 9 },
      ],
    },
    away: {
      team: { id: 10, name: 'Internacional', flag: '🔴⚪' },
      players: [
        { id: 5003, name: 'Wanderson', teamId: 10 },
        { id: 5004, name: 'Borré', teamId: 10 },
      ],
    },
  },
};

export function getFixtureLineup(fixtureId: number): FixtureLineup | null {
  return fixtureLineups[fixtureId] ?? null;
}
