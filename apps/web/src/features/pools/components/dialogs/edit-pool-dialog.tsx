'use client';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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

import { useEditPool } from '../../hooks/use-edit-pool';
import type { CreatePoolFormData } from '../../schemas/create-pool.schema';
import type { Pool } from '../../types/pool';
import { PoolScoringRules } from './pool-scoring-rules';

interface EditPoolDialogProps {
  pool: Pool | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (
    poolId: number,
    data: CreatePoolFormData,
  ) => boolean | Promise<boolean>;
}

export function EditPoolDialog({
  pool,
  open,
  onOpenChange,
  onUpdate,
}: EditPoolDialogProps) {
  const form = useEditPool(pool);

  function handleOpenChange(nextOpen: boolean) {
    onOpenChange(nextOpen);
  }

  async function onSubmit(data: CreatePoolFormData) {
    if (!pool) {
      return;
    }

    const updated = await onUpdate(pool.id, data);

    if (!updated) {
      return;
    }

    toast.success('Bolão atualizado com sucesso!');
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Editar Bolão</DialogTitle>
        </DialogHeader>

        {pool ? (
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

              <div className='space-y-1.5'>
                <p className='text-sm font-medium'>Campeonato</p>
                <p className='rounded-md border bg-muted/40 px-3 py-2.5 text-sm'>
                  {pool.championshipName} ({pool.season}) —{' '}
                  {pool.championshipType === 'CUP' ? 'Mata-mata' : 'Liga'}
                </p>
                <p className='text-muted-foreground text-xs'>
                  O campeonato não pode ser alterado após a criação do bolão.
                </p>
              </div>

              {pool.predictionsCount > 0 ? (
                <p className='rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900'>
                  Este bolão já tem {pool.predictionsCount} palpite
                  {pool.predictionsCount === 1 ? '' : 's'}. Alterar a pontuação
                  afeta apenas jogos futuros / ressincronizações.
                </p>
              ) : null}

              <PoolScoringRules
                form={form}
                championshipType={pool.championshipType}
              />

              <div className='flex justify-end gap-2'>
                <Button
                  variant='outline'
                  type='button'
                  onClick={() => handleOpenChange(false)}
                >
                  Cancelar
                </Button>
                <Button type='submit'>Salvar</Button>
              </div>
            </form>
          </Form>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
