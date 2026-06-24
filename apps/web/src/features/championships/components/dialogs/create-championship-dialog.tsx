'use client';

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

import { Switch } from '@/components/ui/switch';

import { Button } from '@/components/ui/button';

import { useCreateChampionship } from '../../hooks/use-create-championship';
import { ChampionshipService } from '../../services/championship.service';
import { leagues } from '../../mocks/leagues';

export function CreateChampionshipDialog() {
  const form = useCreateChampionship();

  function onSubmit(value: any) {
    ChampionshipService.create(value);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Importar Campeonato</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Importar Campeonato</DialogTitle>
        </DialogHeader>

        {/* Form aqui */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='leagueId'
              render={({ field }) => (
                <FormItem className='mb-3'>
                  <FormLabel>Campeonato</FormLabel>

                  <Select
                    value={field.value.toString()}
                    onValueChange={value => field.onChange(Number(value))}
                  >
                    <FormControl className='w-full'>
                      <SelectTrigger>
                        <SelectValue placeholder='Selecione' />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {leagues.map(league => (
                        <SelectItem
                          key={league.id}
                          value={league.id.toString()}
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
            {/* <FormField
              control={form.control}
              name='country'
              render={({ field }) => (
                <FormItem className='mb-3'>
                  <FormLabel>País</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl className='w-full'>
                      <SelectTrigger>
                        <SelectValue placeholder='Selecione' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='Brasil'>Brasil</SelectItem>
                      <SelectItem value='Argentina'>Argentina</SelectItem>
                      <SelectItem value='Inglaterra'>Inglaterra</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='season'
              render={({ field }) => (
                <FormItem className='mb-3'>
                  <FormLabel>Temporada</FormLabel>
                  <Select
                    value={field.value.toString()}
                    onValueChange={value => field.onChange(Number(value))}
                  >
                    <FormControl className='w-full'>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value='2025'>2025</SelectItem>
                      <SelectItem value='2026'>2026</SelectItem>
                      <SelectItem value='2027'>2027</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name='active'
              render={({ field }) => (
                <FormItem className='flex items-center p-3'>
                  <FormLabel>Deseja ativar o Campeonato?</FormLabel>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className='flex justify-end gap-2'>
              <Button variant='outline' type='button'>
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
