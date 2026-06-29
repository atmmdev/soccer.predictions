'use client';

import { useState } from 'react';

import { matchFixtures } from '../mocks/match-fixtures';
import type { MatchFixtureItem } from '../types/match-fixture';

export function useMatches() {
  const [fixtures] = useState<MatchFixtureItem[]>(matchFixtures);

  return { fixtures };
}
