'use client';

import { Download } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { ActionButton } from '@/components/ui/action-button';
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
import { countries } from '../../mocks/countries';
import { CURRENT_SEASON } from '../../mocks/seasons';
import type { CreateChampionshipFormData } from '../../schemas/create-championship.schema';
import { ChampionshipActiveSwitch } from './championship-active-switch';

interface CreateChampionshipDialogProps {
  onCreate: (data: CreateChampionshipFormData) => void;
}

export function CreateChampionshipDialog({
  onCreate,
}: CreateChampionshipDialogProps) {
  const [open, setOpen] = useState(false);
  const form = useCreateChampionship();
  const { selectedCountry, filteredLeagues, resetLeagueCascade } =
    useImportChampionshipCascade(form);

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
        <ActionButton icon={Download}>Importar Campeonato</ActionButton>
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
                  <FormControl>
                    <NativeSelect
                      value={field.value}
                      onChange={event => {
                        const value = event.target.value;
                        field.onChange(value);
                        resetLeagueCascade();
                      }}
                    >
                      <option value='' disabled>
                        Selecione o país
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
                      disabled={!selectedCountry}
                    >
                      <option value='' disabled>
                        {selectedCountry
                          ? 'Selecione o campeonato'
                          : 'Selecione um país primeiro'}
                      </option>
                      {filteredLeagues.map(league => (
                        <option key={league.id} value={league.id}>
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
                      disabled={!selectedCountry}
                    >
                      <option value={CURRENT_SEASON}>{CURRENT_SEASON}</option>
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
              <Button type='submit'>Importar</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
