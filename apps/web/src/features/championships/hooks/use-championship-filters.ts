'use client';

import { useState } from 'react';

export function useChampionshipFilters() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('ALL');

  return {
    search,
    setSearch,
    status,
    setStatus,
  };
}
