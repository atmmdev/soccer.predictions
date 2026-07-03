'use client';

import { Plus } from 'lucide-react';
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { NativeSelect } from '@/components/ui/native-select';
import { getStoredUser } from '@/features/auth/lib/auth-storage';
import { useActiveChampionships } from '@/features/championships/hooks/use-active-championships';
import { usePoolDelegates } from '@/features/users/hooks/use-pool-delegates';

import { useCreatePool } from '../../hooks/use-create-pool';
import { usePoolScoringTemplate } from '../../hooks/use-pool-scoring-template';
import type { CreatePoolFormData } from '../../schemas/create-pool.schema';
import { PoolActiveSwitch } from './pool-active-switch';
import { PoolScoringRules } from './pool-scoring-rules';

interface CreatePoolDialogProps {
  onCreate: (data: CreatePoolFormData) => boolean | Promise<boolean>;
}

export function CreatePoolDialog({ onCreate }: CreatePoolDialogProps) {
  const [open, setOpen] = useState(false);
  const isSuperAdmin = getStoredUser()?.role === 'SUPER_ADMIN';
  const form = useCreatePool();
  const { championships: activeChampionships } = useActiveChampionships();
  const { delegates, isLoading: isLoadingDelegates } = usePoolDelegates(
    open && isSuperAdmin,
  );
  const hasDelegateCandidates = delegates.length > 0;
  const { championshipType, applyTemplateForChampionship } =
    usePoolScoringTemplate(form);

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (!nextOpen) {
      form.reset();
    }
  }

  async function onSubmit(data: CreatePoolFormData) {
    if (isSuperAdmin && hasDelegateCandidates && !data.delegateUserId) {
      form.setError('delegateUserId', {
        message: 'Selecione o administrador do bolão',
      });
      return;
    }

    const created = await onCreate(data);

    if (!created) {
      return;
    }

    toast.success('Bolão criado com sucesso!');
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <ActionButton icon={Plus}>Criar Bolão</ActionButton>
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

            {isSuperAdmin ? (
              <FormField
                control={form.control}
                name='delegateUserId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Administrador do bolão
                      {hasDelegateCandidates ? null : (
                        <span className='text-muted-foreground font-normal'>
                          {' '}
                          (opcional)
                        </span>
                      )}
                    </FormLabel>
                    {hasDelegateCandidates ? (
                      <FormControl>
                        <NativeSelect
                          value={field.value ? field.value.toString() : ''}
                          onChange={event => {
                            const nextId = Number(event.target.value);
                            field.onChange(nextId > 0 ? nextId : undefined);
                          }}
                          disabled={isLoadingDelegates}
                        >
                          <option value='' disabled>
                            {isLoadingDelegates
                              ? 'Carregando participantes...'
                              : 'Selecione o responsável'}
                          </option>
                          {delegates.map(delegate => (
                            <option key={delegate.id} value={delegate.id}>
                              {delegate.name} ({delegate.email})
                            </option>
                          ))}
                        </NativeSelect>
                      </FormControl>
                    ) : (
                      <p className='text-muted-foreground rounded-md border border-dashed px-3 py-2 text-sm'>
                        {isLoadingDelegates
                          ? 'Carregando participantes...'
                          : 'Nenhum participante cadastrado ainda. O bolão será criado sob gestão da plataforma — compartilhe o código de convite e delegue um administrador quando alguém se cadastrar.'}
                      </p>
                    )}
                    <FormDescription>
                      {hasDelegateCandidates
                        ? 'Este participante será o dono e administrador do bolão. Depois, outros entram pelo código de convite.'
                        : 'Sem participantes disponíveis, você pode criar o bolão agora e definir o administrador depois.'}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}

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
