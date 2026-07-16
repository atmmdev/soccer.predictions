'use client';

import { Download, Loader2Icon } from 'lucide-react';
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
import { Form } from '@/components/ui/form';

import { useCreateChampionship } from '../../hooks/use-create-championship';
import type { CreateChampionshipFormData } from '../../schemas/create-championship.schema';
import { ImportChampionshipFields } from './import-championship-fields';

interface CreateChampionshipDialogProps {
  onCreate: (data: CreateChampionshipFormData) => boolean | Promise<boolean>;
}

export function CreateChampionshipDialog({
  onCreate,
}: CreateChampionshipDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useCreateChampionship();

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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <ImportChampionshipFields
              form={form}
              enabled={open}
              disabled={isSubmitting}
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
