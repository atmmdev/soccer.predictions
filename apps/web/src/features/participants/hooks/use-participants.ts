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

export type ParticipantRoleTab = 'ALL' | 'OWNER' | 'MEMBER';
export type ParticipantSort = 'recent' | 'name-asc' | 'name-desc';

export type ParticipantGroup = {
  userId: number;
  name: string;
  email: string;
  memberships: PoolParticipant[];
  pendingCount: number;
  isOwnerAnywhere: boolean;
  latestJoinedAt: string;
};

function groupParticipants(
  items: PoolParticipant[],
): ParticipantGroup[] {
  const byUser = new Map<number, ParticipantGroup>();

  for (const participant of items) {
    const existing = byUser.get(participant.userId);
    if (existing) {
      existing.memberships.push(participant);
      if (participant.status === 'PENDING') {
        existing.pendingCount += 1;
      }
      if (participant.isOwner) {
        existing.isOwnerAnywhere = true;
      }
      if (participant.joinedAt > existing.latestJoinedAt) {
        existing.latestJoinedAt = participant.joinedAt;
      }
      continue;
    }

    byUser.set(participant.userId, {
      userId: participant.userId,
      name: participant.name,
      email: participant.email,
      memberships: [participant],
      pendingCount: participant.status === 'PENDING' ? 1 : 0,
      isOwnerAnywhere: participant.isOwner,
      latestJoinedAt: participant.joinedAt,
    });
  }

  return [...byUser.values()].map(group => ({
    ...group,
    memberships: [...group.memberships].sort((a, b) => {
      if (a.status === 'PENDING' && b.status !== 'PENDING') return -1;
      if (a.status !== 'PENDING' && b.status === 'PENDING') return 1;
      return a.poolName.localeCompare(b.poolName, 'pt-BR');
    }),
  }));
}

function sortGroups(
  groups: ParticipantGroup[],
  sort: ParticipantSort,
): ParticipantGroup[] {
  return [...groups].sort((a, b) => {
    if (sort === 'recent') {
      if (a.pendingCount > 0 && b.pendingCount === 0) return -1;
      if (a.pendingCount === 0 && b.pendingCount > 0) return 1;
      return b.latestJoinedAt.localeCompare(a.latestJoinedAt);
    }

    if (sort === 'name-desc') {
      return b.name.localeCompare(a.name, 'pt-BR');
    }

    return a.name.localeCompare(b.name, 'pt-BR');
  });
}

export function useParticipantFilters(participants: PoolParticipant[]) {
  const pendingCount = useMemo(
    () => participants.filter(item => item.status === 'PENDING').length,
    [participants],
  );

  const [search, setSearch] = useState('');
  const [roleTab, setRoleTab] = useState<ParticipantRoleTab>('ALL');
  const [sort, setSort] = useState<ParticipantSort>('recent');
  const [status, setStatus] = useState('ALL');

  const searchedParticipants = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return participants;
    }

    return participants.filter(
      participant =>
        participant.name.toLowerCase().includes(query) ||
        participant.email.toLowerCase().includes(query) ||
        participant.poolName.toLowerCase().includes(query),
    );
  }, [participants, search]);

  const allGroups = useMemo(
    () => groupParticipants(searchedParticipants),
    [searchedParticipants],
  );

  const tabCounts = useMemo(
    () => ({
      all: allGroups.length,
      owner: allGroups.filter(group => group.isOwnerAnywhere).length,
      member: allGroups.filter(group => !group.isOwnerAnywhere).length,
    }),
    [allGroups],
  );

  const groupedParticipants = useMemo(() => {
    const roleFiltered = allGroups.filter(group => {
      if (roleTab === 'OWNER') {
        return group.isOwnerAnywhere;
      }
      if (roleTab === 'MEMBER') {
        return !group.isOwnerAnywhere;
      }
      return true;
    });

    const statusFiltered =
      status === 'ALL'
        ? roleFiltered
        : roleFiltered
            .map(group => {
              const memberships = group.memberships.filter(
                membership => membership.status === status,
              );

              return {
                ...group,
                memberships,
                pendingCount: memberships.filter(
                  membership => membership.status === 'PENDING',
                ).length,
              };
            })
            .filter(group => group.memberships.length > 0);

    return sortGroups(statusFiltered, sort);
  }, [allGroups, roleTab, sort, status]);

  const summary = useMemo(() => {
    const memberships = groupedParticipants.reduce(
      (total, group) => total + group.memberships.length,
      0,
    );
    const uniquePools = new Set(
      groupedParticipants.flatMap(group =>
        group.memberships.map(item => item.poolId),
      ),
    ).size;

    return {
      memberships,
      people: groupedParticipants.length,
      pools: uniquePools,
    };
  }, [groupedParticipants]);

  const hasActiveFilters =
    search.trim().length > 0 || roleTab !== 'ALL' || status !== 'ALL';

  const clearFilters = useCallback(() => {
    setSearch('');
    setRoleTab('ALL');
    setStatus('ALL');
    setSort('recent');
  }, []);

  return {
    search,
    setSearch,
    roleTab,
    setRoleTab,
    sort,
    setSort,
    status,
    setStatus,
    tabCounts,
    groupedParticipants,
    summary,
    hasActiveFilters,
    clearFilters,
    pendingCount,
  };
}
