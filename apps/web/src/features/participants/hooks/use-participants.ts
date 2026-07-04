'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { getFetchErrorMessage } from '@/lib/api-client';

import { fetchParticipantsRequest } from '../services/participant-api.service';
import type { PoolParticipant } from '../types/participant';

export function useParticipants() {
  const [participants, setParticipants] = useState<PoolParticipant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadParticipants = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchParticipantsRequest();
      setParticipants(response);
    } catch (loadError) {
      setError(
        getFetchErrorMessage(
          loadError,
          'Não foi possível carregar os participantes.',
        ),
      );
      setParticipants([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadParticipants();
  }, [loadParticipants]);

  return {
    participants,
    isLoading,
    error,
    reloadParticipants: loadParticipants,
  };
}

export function useParticipantFilters(participants: PoolParticipant[]) {
  const [search, setSearch] = useState('');
  const [poolName, setPoolName] = useState('ALL');
  const [status, setStatus] = useState('ALL');

  const poolOptions = useMemo(
    () => [...new Set(participants.map(item => item.poolName))].sort(),
    [participants],
  );

  const filteredParticipants = useMemo(() => {
    const query = search.trim().toLowerCase();

    return participants.filter(participant => {
      if (poolName !== 'ALL' && participant.poolName !== poolName) {
        return false;
      }

      if (status !== 'ALL' && participant.status !== status) {
        return false;
      }

      if (!query) {
        return true;
      }

      return (
        participant.name.toLowerCase().includes(query) ||
        participant.email.toLowerCase().includes(query) ||
        participant.poolName.toLowerCase().includes(query)
      );
    });
  }, [participants, poolName, search, status]);

  const hasActiveFilters =
    search.trim().length > 0 || poolName !== 'ALL' || status !== 'ALL';

  const clearFilters = useCallback(() => {
    setSearch('');
    setPoolName('ALL');
    setStatus('ALL');
  }, []);

  return {
    search,
    setSearch,
    poolName,
    setPoolName,
    status,
    setStatus,
    poolOptions,
    filteredParticipants,
    hasActiveFilters,
    clearFilters,
  };
}
