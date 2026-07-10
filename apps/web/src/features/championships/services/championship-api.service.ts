import { API_URL, authFetch, parseApiError } from '@/lib/api-client';

import type { CreateChampionshipFormData } from '../schemas/create-championship.schema';
import type { Championship } from '../types/championship';

export interface CatalogCountry {
  name: string;
  code: string;
  flag: string;
}

export interface CatalogLeague {
  leagueId: number;
  name: string;
  type: 'LEAGUE' | 'CUP';
  country: string;
  code: string;
  flag: string;
  seasons: number[];
}

export async function fetchChampionshipsRequest(): Promise<Championship[]> {
  const response = await authFetch(`${API_URL}/championships`);

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<Championship[]>;
}

export async function fetchActiveChampionshipsRequest(): Promise<Championship[]> {
  const response = await authFetch(`${API_URL}/championships/active`);

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<Championship[]>;
}

export async function fetchCatalogCountriesRequest(): Promise<CatalogCountry[]> {
  const response = await authFetch(`${API_URL}/championships/catalog/countries`);

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<CatalogCountry[]>;
}

export async function fetchCatalogLeaguesRequest(
  country: string,
  season?: number,
): Promise<CatalogLeague[]> {
  const params = new URLSearchParams({ country });

  if (season) {
    params.set('season', season.toString());
  }

  const response = await authFetch(
    `${API_URL}/championships/catalog/leagues?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<CatalogLeague[]>;
}

export async function importChampionshipRequest(
  data: CreateChampionshipFormData,
): Promise<Championship> {
  const response = await authFetch(`${API_URL}/championships/import`, {
    method: 'POST',
    body: JSON.stringify({
      leagueId: data.leagueId,
      season: data.season,
      active: data.active,
    }),
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<Championship>;
}

export async function syncChampionshipRequest(
  championshipId: number,
): Promise<number> {
  const response = await authFetch(
    `${API_URL}/championships/${championshipId}/sync`,
    { method: 'POST' },
  );

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<number>;
}

export async function updateChampionshipStatusRequest(
  championshipId: number,
  active: boolean,
): Promise<Championship> {
  const response = await authFetch(
    `${API_URL}/championships/${championshipId}/status`,
    {
      method: 'PATCH',
      body: JSON.stringify({ active }),
    },
  );

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<Championship>;
}
