'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { getFetchErrorMessage } from '@/lib/api-client';

import {
  approveParticipantRequest,
  fetchParticipantsRequest,
  rejectParticipantRequest,
} from '../services/participant-api.service';
import type { PoolParticipant } from '../types/participant';

export function useParticipants() {
  const [participants, setParticipants] = useState<PoolParticipant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actingKey, setActingKey] = useState<string | null>(null);

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

  const approveParticipant = useCallback(
    async (poolId: number, userId: number): Promise<boolean> => {
      const key = `${poolId}:${userId}`;
      setActingKey(key);

      try {
        await approveParticipantRequest(poolId, userId);
        setParticipants(current =>
          current.map(participant =>
            participant.poolId === poolId && participant.userId === userId
              ? { ...participant, status: 'ACTIVE' }
              : participant,
          ),
        );
        toast.success('Pedido aprovado. O participante já pode palpitar.');
        return true;
      } catch (approveError) {
        toast.error(
          getFetchErrorMessage(
            approveError,
            'Não foi possível aprovar o pedido.',
          ),
        );
        return false;
      } finally {
        setActingKey(null);
      }
    },
    [],
  );

  const rejectParticipant = useCallback(
    async (poolId: number, userId: number): Promise<boolean> => {
      const key = `${poolId}:${userId}`;
      setActingKey(key);

      try {
        await rejectParticipantRequest(poolId, userId);
        setParticipants(current =>
          current.map(participant =>
            participant.poolId === poolId && participant.userId === userId
              ? { ...participant, status: 'INACTIVE' }
              : participant,
          ),
        );
        toast.success('Pedido recusado.');
        return true;
      } catch (rejectError) {
        toast.error(
          getFetchErrorMessage(
            rejectError,
            'Não foi possível recusar o pedido.',
          ),
        );
        return false;
      } finally {
        setActingKey(null);
      }
    },
    [],
  );

  return {
    participants,
    isLoading,
    error,
    actingKey,
    reloadParticipants: loadParticipants,
    approveParticipant,
    rejectParticipant,
  };
}

export function useParticipantFilters(participants: PoolParticipant[]) {
  const pendingCount = useMemo(
    () => participants.filter(item => item.status === 'PENDING').length,
    [participants],
  );

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

  const summary = useMemo(() => {
    const uniquePeople = new Set(
      filteredParticipants.map(item => item.userId),
    ).size;
    const uniquePools = new Set(
      filteredParticipants.map(item => item.poolId),
    ).size;

    return {
      memberships: filteredParticipants.length,
      people: uniquePeople,
      pools: uniquePools,
    };
  }, [filteredParticipants]);

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
    summary,
    hasActiveFilters,
    clearFilters,
    pendingCount,
  };
}
