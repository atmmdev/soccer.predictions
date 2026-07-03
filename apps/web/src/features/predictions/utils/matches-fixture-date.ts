import { endOfDay, parseISO, startOfDay } from 'date-fns';

export function matchesFixtureDate(fixtureDate: string, selectedDate: string): boolean {
  if (!selectedDate) {
    return true;
  }

  const kickoff = parseISO(fixtureDate);
  const dayStart = startOfDay(parseISO(selectedDate));
  const dayEnd = endOfDay(parseISO(selectedDate));

  return kickoff >= dayStart && kickoff <= dayEnd;
}
