const STORAGE_PREFIX = 'soccer_predictions_activity_read';

function storageKey(userId: number): string {
  return `${STORAGE_PREFIX}:${userId}`;
}

export function getReadActivityIds(userId: number): Set<string> {
  if (typeof window === 'undefined') {
    return new Set();
  }

  try {
    const raw = window.localStorage.getItem(storageKey(userId));

    if (!raw) {
      return new Set();
    }

    const parsed = JSON.parse(raw) as unknown;

    if (!Array.isArray(parsed)) {
      return new Set();
    }

    return new Set(parsed.filter((id): id is string => typeof id === 'string'));
  } catch {
    return new Set();
  }
}

export function markActivitiesAsRead(
  userId: number,
  activityIds: string[],
): Set<string> {
  const next = getReadActivityIds(userId);

  for (const id of activityIds) {
    next.add(id);
  }

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(
      storageKey(userId),
      JSON.stringify([...next]),
    );
  }

  return next;
}
