const APP_TIME_ZONE = 'America/Sao_Paulo';

function calendarDayKey(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: APP_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

function addCalendarDays(dayKey: string, days: number): string {
  const [year, month, day] = dayKey.split('-').map(Number);
  // Keep YYYY-MM-DD in UTC date arithmetic; reformatting via Sao_Paulo would
  // shift midnight UTC back to the previous local day.
  const utc = new Date(Date.UTC(year!, month! - 1, day! + days));
  const y = utc.getUTCFullYear();
  const m = String(utc.getUTCMonth() + 1).padStart(2, '0');
  const d = String(utc.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getFixtureCalendarDay(isoDate: string): string {
  return calendarDayKey(new Date(isoDate));
}

export function isFixtureToday(isoDate: string, now = new Date()): boolean {
  return getFixtureCalendarDay(isoDate) === calendarDayKey(now);
}

export function isFixtureTomorrow(isoDate: string, now = new Date()): boolean {
  return getFixtureCalendarDay(isoDate) === addCalendarDays(calendarDayKey(now), 1);
}

export function isFixtureUpcomingOrLive(
  fixture: { date: string; matchStatus: 'SCHEDULED' | 'LIVE' | 'FINISHED' },
  now = new Date(),
): boolean {
  if (fixture.matchStatus === 'LIVE') {
    return true;
  }

  if (fixture.matchStatus === 'SCHEDULED') {
    return new Date(fixture.date).getTime() >= now.getTime();
  }

  // Finished games still matter on the dashboard when they are from today.
  return isFixtureToday(fixture.date, now);
}

export function compareFixturesForDashboard(
  left: { date: string; matchStatus: 'SCHEDULED' | 'LIVE' | 'FINISHED' },
  right: { date: string; matchStatus: 'SCHEDULED' | 'LIVE' | 'FINISHED' },
): number {
  const rank = (status: 'SCHEDULED' | 'LIVE' | 'FINISHED') => {
    if (status === 'LIVE') {
      return 0;
    }

    if (status === 'SCHEDULED') {
      return 1;
    }

    return 2;
  };

  const statusDiff = rank(left.matchStatus) - rank(right.matchStatus);

  if (statusDiff !== 0) {
    return statusDiff;
  }

  return new Date(left.date).getTime() - new Date(right.date).getTime();
}
