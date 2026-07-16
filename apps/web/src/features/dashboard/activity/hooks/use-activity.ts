'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { getStoredUser } from '@/features/auth/lib/auth-storage';
import { getFetchErrorMessage } from '@/lib/api-client';

import {
  getReadActivityIds,
  markActivitiesAsRead,
} from '../lib/activity-read-storage';
import { fetchActivityRequest } from '../services/activity-api.service';
import type { ActivityItem } from '../types/activity';

export type ActivityFeedItemData = ActivityItem & { isRead: boolean };

interface UseActivityOptions {
  /** Quando true, omite itens já lidos da lista. */
  hideRead?: boolean;
  /** Marca os itens carregados como lidos ao exibir a lista. */
  markVisibleAsRead?: boolean;
}

export function useActivity(limit = 10, options: UseActivityOptions = {}) {
  const { hideRead = false, markVisibleAsRead = false } = options;
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [readIds, setReadIds] = useState<Set<string>>(() => new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadActivity = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const user = getStoredUser();
      const response = await fetchActivityRequest(limit);
      setItems(response);
      setReadIds(user ? getReadActivityIds(user.id) : new Set());
    } catch (loadError) {
      setError(
        getFetchErrorMessage(
          loadError,
          'Não foi possível carregar a atividade recente.',
        ),
      );
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    void loadActivity();
  }, [loadActivity]);

  const feedItems = useMemo((): ActivityFeedItemData[] => {
    const withReadState = items.map(item => ({
      ...item,
      isRead: readIds.has(item.id),
    }));

    if (!hideRead) {
      return withReadState;
    }

    return withReadState.filter(item => !item.isRead);
  }, [hideRead, items, readIds]);

  const markAsRead = useCallback(
    (activityIds: string[], options?: { updateUi?: boolean }) => {
      const user = getStoredUser();

      if (!user || activityIds.length === 0) {
        return;
      }

      const next = markActivitiesAsRead(user.id, activityIds);

      if (options?.updateUi !== false) {
        setReadIds(next);
      }
    },
    [],
  );

  useEffect(() => {
    if (!markVisibleAsRead || isLoading || items.length === 0) {
      return;
    }

    const unreadIds = items
      .filter(item => !readIds.has(item.id))
      .map(item => item.id);

    if (unreadIds.length === 0) {
      return;
    }

    // Persiste como lidas sem esvaziar a lista nesta sessão (hideRead).
    const timer = window.setTimeout(() => {
      markAsRead(unreadIds, { updateUi: !hideRead });
    }, 1_500);

    return () => window.clearTimeout(timer);
  }, [
    hideRead,
    isLoading,
    items,
    markAsRead,
    markVisibleAsRead,
    readIds,
  ]);

  return {
    items: feedItems,
    isLoading,
    error,
    reloadActivity: loadActivity,
    markAsRead,
  };
}
