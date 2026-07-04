'use client';

import { Download } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { ActionButton } from '@/components/ui/action-button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { NativeSelect } from '@/components/ui/native-select';

import { useCreateChampionship } from '../../hooks/use-create-championship';
import { useImportChampionshipCascade } from '../../hooks/use-import-championship-cascade';
import type { CreateChampionshipFormData } from '../../schemas/create-championship.schema';
import { ChampionshipActiveSwitch } from './championship-active-switch';

interface CreateChampionshipDialogProps {
  onCreate: (data: CreateChampionshipFormData) => boolean | Promise<boolean>;
}

export function CreateChampionshipDialog({
  onCreate,
}: CreateChampionshipDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useCreateChampionship();
  const {
    countries,
    selectedCountry,
    filteredLeagues,
    availableSeasons,
    isLoadingCountries,
    isLoadingLeagues,
    catalogError,
    resetLeagueCascade,
  } = useImportChampionshipCascade(form, open);

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (!nextOpen) {
      form.reset();
    }
  }

  async function onSubmit(data: CreateChampionshipFormData) {
    setIsSubmitting(true);

    try {
      const success = await onCreate(data);

      if (success) {
        toast.success('Campeonato importado com sucesso!');
        form.reset();
        setOpen(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <ActionButton icon={Download}>Importar Campeonato</ActionButton>
      </DialogTrigger>

      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Importar Campeonato</DialogTitle>
        </DialogHeader>

        {catalogError ? (
          <Alert variant='destructive'>
            <AlertDescription>{catalogError}</AlertDescription>
          </Alert>
        ) : null}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='country'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>País</FormLabel>
                  <FormControl>
                    <NativeSelect
                      value={field.value}
                      onChange={event => {
                        field.onChange(event.target.value);
                        resetLeagueCascade();
                      }}
                      disabled={isLoadingCountries}
                    >
                      <option value='' disabled>
                        {isLoadingCountries
                          ? 'Carregando países...'
                          : 'Selecione o país'}
                      </option>
                      {countries.map(country => (
                        <option key={country.name} value={country.name}>
                          {country.flag} {country.name}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormControl>
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
                  <FormControl>
                    <NativeSelect
                      value={field.value > 0 ? field.value.toString() : ''}
                      onChange={event =>
                        field.onChange(Number(event.target.value))
                      }
                      disabled={!selectedCountry || isLoadingLeagues}
                    >
                      <option value='' disabled>
                        {!selectedCountry
                          ? 'Selecione um país primeiro'
                          : isLoadingLeagues
                            ? 'Carregando campeonatos...'
                            : 'Selecione o campeonato'}
                      </option>
                      {filteredLeagues.map(league => (
                        <option key={league.leagueId} value={league.leagueId}>
                          {league.name}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormControl>
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
                  <FormControl>
                    <NativeSelect
                      value={field.value.toString()}
                      onChange={event =>
                        field.onChange(Number(event.target.value))
                      }
                      disabled={!selectedCountry || isLoadingLeagues}
                    >
                      {availableSeasons.map(season => (
                        <option key={season} value={season}>
                          {season}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <div className='flex justify-end gap-2'>
              <Button
                variant='outline'
                type='button'
                onClick={() => handleOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type='submit' disabled={isSubmitting}>
                {isSubmitting ? 'Importando...' : 'Importar'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
