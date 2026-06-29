'use client';

import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { useCreateChampionship } from '../../hooks/use-create-championship';
import { CURRENT_SEASON } from '../../mocks/seasons';
import { leagues } from '../../mocks/leagues';
import type { CreateChampionshipFormData } from '../../schemas/create-championship.schema';
import { ChampionshipActiveSwitch } from './championship-active-switch';
import { ChampionshipCountrySelect } from './championship-country-select';
import { ChampionshipLeagueSelect } from './championship-league-select';
import { ChampionshipSeasonSelect } from './championship-season-select';

interface CreateChampionshipDialogProps {
  onCreate: (data: CreateChampionshipFormData) => void;
}

export function CreateChampionshipDialog({
  onCreate,
}: CreateChampionshipDialogProps) {
  const [open, setOpen] = useState(false);
  const form = useCreateChampionship();
  const country = form.watch('country');

  const filteredLeagues = useMemo(
    () => leagues.filter(league => league.country === country),
    [country],
  );

  useEffect(() => {
    form.setValue('leagueId', 0);
    form.setValue('season', CURRENT_SEASON);
  }, [country, form.setValue]);

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (!nextOpen) {
      form.reset();
    }
  }

  function onSubmit(data: CreateChampionshipFormData) {
    onCreate(data);
    toast.success('Campeonato importado com sucesso!');
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className='h-11 shrink-0 px-4 py-0'>
          Importar Campeonato
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Importar Campeonato</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='country'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>País</FormLabel>
                  <ChampionshipCountrySelect
                    value={field.value}
                    onChange={field.onChange}
                  />
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
                  <ChampionshipLeagueSelect
                    resetKey={country}
                    value={field.value > 0 ? field.value.toString() : undefined}
                    onChange={value => field.onChange(Number(value))}
                    leagues={filteredLeagues}
                    disabled={!country}
                  />
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
                  <ChampionshipSeasonSelect
                    value={field.value.toString()}
                    onChange={value => field.onChange(Number(value))}
                    disabled={!country}
                  />
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
              <Button type='submit'>Importar</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
