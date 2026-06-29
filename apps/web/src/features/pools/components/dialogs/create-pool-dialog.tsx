'use client';

import { useState } from 'react';
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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { NativeSelect } from '@/components/ui/native-select';

import { useCreatePool } from '../../hooks/use-create-pool';
import { usePoolScoringTemplate } from '../../hooks/use-pool-scoring-template';
import { getActiveChampionships } from '../../services/championship-catalog.service';
import type { CreatePoolFormData } from '../../schemas/create-pool.schema';
import { PoolActiveSwitch } from './pool-active-switch';
import { PoolScoringRules } from './pool-scoring-rules';

interface CreatePoolDialogProps {
  onCreate: (data: CreatePoolFormData) => void;
}

export function CreatePoolDialog({ onCreate }: CreatePoolDialogProps) {
  const [open, setOpen] = useState(false);
  const form = useCreatePool();
  const activeChampionships = getActiveChampionships();
  const { championshipType, applyTemplateForChampionship } =
    usePoolScoringTemplate(form);

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (!nextOpen) {
      form.reset();
    }
  }

  function onSubmit(data: CreatePoolFormData) {
    onCreate(data);
    toast.success('Bolão criado com sucesso!');
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className='h-11 shrink-0 px-4 py-0'>Criar Bolão</Button>
      </DialogTrigger>

      <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Criar Bolão</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do bolão</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Ex.: Bolão da Firma'
                      className='h-11'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='championshipId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campeonato</FormLabel>
                  <FormControl>
                    <NativeSelect
                      value={field.value > 0 ? field.value.toString() : ''}
                      onChange={event => {
                        const nextId = Number(event.target.value);
                        field.onChange(nextId);
                        applyTemplateForChampionship(nextId);
                      }}
                    >
                      <option value='' disabled>
                        Selecione o campeonato
                      </option>
                      {activeChampionships.map(championship => (
                        <option key={championship.id} value={championship.id}>
                          {championship.name} ({championship.season}) —{' '}
                          {championship.type === 'CUP' ? 'Mata-mata' : 'Liga'}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <PoolScoringRules
              form={form}
              disabled={!championshipType}
              championshipType={championshipType}
            />

            <FormField
              control={form.control}
              name='active'
              render={({ field }) => (
                <PoolActiveSwitch
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
              <Button type='submit'>Criar</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
