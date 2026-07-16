'use client';

import { Loader2Icon } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useImportChampionshipCascade } from '../../hooks/use-import-championship-cascade';
import type { CreateChampionshipFormData } from '../../schemas/create-championship.schema';
import { CountryFlag } from '../country-flag';
import { ChampionshipActiveSwitch } from './championship-active-switch';

function SelectLoadingValue({ label }: { label: string }) {
  return (
    <span className='text-muted-foreground inline-flex items-center gap-2'>
      <Loader2Icon className='size-4 shrink-0 animate-spin' aria-hidden />
      {label}
    </span>
  );
}

interface ImportChampionshipFieldsProps {
  form: UseFormReturn<CreateChampionshipFormData>;
  enabled: boolean;
  disabled?: boolean;
  showActiveSwitch?: boolean;
}

export function ImportChampionshipFields({
  form,
  enabled,
  disabled = false,
  showActiveSwitch = true,
}: ImportChampionshipFieldsProps) {
  const {
    countries,
    selectedCountry,
    filteredLeagues,
    availableSeasons,
    isLoadingCountries,
    isLoadingLeagues,
    catalogError,
    resetLeagueCascade,
  } = useImportChampionshipCascade(form, enabled);

  return (
    <div className='space-y-4'>
      {catalogError ? (
        <p className='text-destructive text-sm'>{catalogError}</p>
      ) : null}

      <FormField
        control={form.control}
        name='country'
        render={({ field }) => (
          <FormItem>
            <FormLabel>País</FormLabel>
            <Select
              value={field.value || undefined}
              onValueChange={value => {
                field.onChange(value);
                resetLeagueCascade();
              }}
              disabled={disabled || isLoadingCountries}
            >
              <FormControl>
                <SelectTrigger size='lg' className='w-full'>
                  {isLoadingCountries ? (
                    <SelectLoadingValue label='Carregando países...' />
                  ) : (
                    <SelectValue placeholder='Selecione o país' />
                  )}
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {countries.map(country => (
                  <SelectItem key={country.name} value={country.name}>
                    <CountryFlag
                      code={country.code}
                      flag={country.flag}
                      name={country.name}
                    />
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='leagueId'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Campeonato</FormLabel>
            <Select
              value={field.value > 0 ? field.value.toString() : undefined}
              onValueChange={value => field.onChange(Number(value))}
              disabled={
                disabled ||
                !selectedCountry ||
                isLoadingCountries ||
                isLoadingLeagues
              }
            >
              <FormControl>
                <SelectTrigger size='lg' className='w-full'>
                  {isLoadingCountries ||
                  (selectedCountry && isLoadingLeagues) ? (
                    <SelectLoadingValue label='Carregando campeonatos...' />
                  ) : (
                    <SelectValue
                      placeholder={
                        !selectedCountry
                          ? 'Selecione um país primeiro'
                          : 'Selecione o campeonato'
                      }
                    />
                  )}
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {filteredLeagues.map(league => (
                  <SelectItem
                    key={league.leagueId}
                    value={league.leagueId.toString()}
                  >
                    {league.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='season'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Temporada</FormLabel>
            <Select
              value={field.value.toString()}
              onValueChange={value => field.onChange(Number(value))}
              disabled={
                disabled ||
                !selectedCountry ||
                isLoadingCountries ||
                isLoadingLeagues ||
                availableSeasons.length === 0
              }
            >
              <FormControl>
                <SelectTrigger size='lg' className='w-full'>
                  {isLoadingCountries ||
                  (selectedCountry && isLoadingLeagues) ? (
                    <SelectLoadingValue label='Carregando temporadas...' />
                  ) : (
                    <SelectValue placeholder='Selecione a temporada' />
                  )}
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {availableSeasons.map(season => (
                  <SelectItem key={season} value={season.toString()}>
                    {season}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {showActiveSwitch ? (
        <FormField
          control={form.control}
          name='active'
          render={({ field }) => (
            <ChampionshipActiveSwitch
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
      ) : null}
    </div>
  );
}
