import type { CreateChampionshipFormData } from '../schemas/create-championship.schema';

export interface ChampionshipSearchFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
}

export interface ChampionshipTableFiltersProps {
  country: string;
  onCountryChange: (value: string) => void;
  countries: string[];
  season: string;
  onSeasonChange: (value: string) => void;
  seasons: number[];
}

export interface ChampionshipFiltersProps
  extends ChampionshipSearchFiltersProps,
    ChampionshipTableFiltersProps {
  resultCount: number;
  onCreateChampionship: (data: CreateChampionshipFormData) => void;
}
