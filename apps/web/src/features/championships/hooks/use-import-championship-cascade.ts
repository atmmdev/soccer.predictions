'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { useWatch } from 'react-hook-form';

import { getFetchErrorMessage } from '@/lib/api-client';

import type { CreateChampionshipFormData } from '../schemas/create-championship.schema';
import {
  fetchCatalogCountriesRequest,
  fetchCatalogLeaguesRequest,
  type CatalogCountry,
  type CatalogLeague,
} from '../services/championship-api.service';

export function useImportChampionshipCascade(
  form: UseFormReturn<CreateChampionshipFormData>,
  enabled: boolean,
) {
  const [countries, setCountries] = useState<CatalogCountry[]>([]);
  const [leagues, setLeagues] = useState<CatalogLeague[]>([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  const [isLoadingLeagues, setIsLoadingLeagues] = useState(false);
  const [catalogError, setCatalogError] = useState<string | null>(null);

  const selectedCountry =
    useWatch({
      control: form.control,
      name: 'country',
      defaultValue: '',
    }) ?? '';

  const selectedLeagueId =
    useWatch({
      control: form.control,
      name: 'leagueId',
      defaultValue: 0,
    }) ?? 0;

  const selectedSeason =
    useWatch({
      control: form.control,
      name: 'season',
      defaultValue: new Date().getFullYear(),
    }) ?? new Date().getFullYear();

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let cancelled = false;

    async function loadCountries() {
      setIsLoadingCountries(true);
      setCatalogError(null);

      try {
        const response = await fetchCatalogCountriesRequest();

        if (!cancelled) {
          setCountries(response);
        }
      } catch (error) {
        if (!cancelled) {
          setCountries([]);
          setCatalogError(
            getFetchErrorMessage(
              error,
              'Não foi possível carregar os países.',
            ),
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoadingCountries(false);
        }
      }
    }

    void loadCountries();

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !selectedCountry) {
      setLeagues([]);
      return;
    }

    let cancelled = false;

    async function loadLeagues() {
      setIsLoadingLeagues(true);
      setCatalogError(null);

      try {
        const response = await fetchCatalogLeaguesRequest(
          selectedCountry,
          selectedSeason,
        );

        if (!cancelled) {
          setLeagues(response);
        }
      } catch (error) {
        if (!cancelled) {
          setLeagues([]);
          setCatalogError(
            getFetchErrorMessage(
              error,
              'Não foi possível carregar os campeonatos.',
            ),
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoadingLeagues(false);
        }
      }
    }

    void loadLeagues();

    return () => {
      cancelled = true;
    };
  }, [enabled, selectedCountry, selectedSeason]);

  const filteredLeagues = useMemo(
    () => leagues.filter(league => league.country === selectedCountry),
    [leagues, selectedCountry],
  );

  const selectedLeague = useMemo(
    () => filteredLeagues.find(league => league.leagueId === selectedLeagueId),
    [filteredLeagues, selectedLeagueId],
  );

  const availableSeasons = useMemo(() => {
    if (selectedLeague?.seasons.length) {
      return selectedLeague.seasons;
    }

    return [selectedSeason];
  }, [selectedLeague, selectedSeason]);

  const resetLeagueCascade = useCallback(() => {
    form.setValue('leagueId', 0);
    form.setValue('season', new Date().getFullYear());
    form.clearErrors(['country', 'leagueId']);
  }, [form]);

  return {
    countries,
    selectedCountry,
    filteredLeagues,
    selectedLeague,
    availableSeasons,
    isLoadingCountries,
    isLoadingLeagues,
    catalogError,
    resetLeagueCascade,
  };
}
