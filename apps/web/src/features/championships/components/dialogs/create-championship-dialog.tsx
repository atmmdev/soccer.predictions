'use client';

import { Download, Loader2Icon } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useCreateChampionship } from '../../hooks/use-create-championship';
import { useImportChampionshipCascade } from '../../hooks/use-import-championship-cascade';
import type { CreateChampionshipFormData } from '../../schemas/create-championship.schema';
import { CountryFlag } from '../country-flag';
import { ChampionshipActiveSwitch } from './championship-active-switch';

interface CreateChampionshipDialogProps {
  onCreate: (data: CreateChampionshipFormData) => boolean | Promise<boolean>;
}

function SelectLoadingValue({ label }: { label: string }) {
  return (
    <span className='text-muted-foreground inline-flex items-center gap-2'>
      <Loader2Icon className='size-4 shrink-0 animate-spin' aria-hidden />
      {label}
    </span>
  );
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
    if (isSubmitting) {
      return;
    }

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
                  <Select
                    value={field.value || undefined}
                    onValueChange={value => {
                      field.onChange(value);
                      resetLeagueCascade();
                    }}
                    disabled={isLoadingCountries || isSubmitting}
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
                      !selectedCountry ||
                      isLoadingCountries ||
                      isLoadingLeagues ||
                      isSubmitting
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
                      !selectedCountry ||
                      isLoadingCountries ||
                      isLoadingLeagues ||
                      availableSeasons.length === 0 ||
                      isSubmitting
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
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type='submit' disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2Icon className='size-4 animate-spin' aria-hidden />
                    Importando...
                  </>
                ) : (
                  'Importar'
                )}
              </Button>
            </div>

            {isSubmitting ? (
              <p
                role='status'
                aria-live='polite'
                className='rounded-lg border border-amber-500 bg-amber-200 px-3 py-2 text-center text-sm text-black'
              >
                Aguarde a criação do campeonato. Isso pode levar alguns
                segundos...
              </p>
            ) : null}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
