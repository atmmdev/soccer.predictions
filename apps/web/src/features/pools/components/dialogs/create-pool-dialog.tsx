'use client';

import { Download, Loader2Icon, Plus } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserAvatar } from '@/components/ui/user-avatar';
import { getStoredUser } from '@/features/auth/lib/auth-storage';
import { ImportChampionshipFields } from '@/features/championships/components/dialogs/import-championship-fields';
import { useActiveChampionships } from '@/features/championships/hooks/use-active-championships';
import { useCreateChampionship } from '@/features/championships/hooks/use-create-championship';
import { importChampionshipRequest } from '@/features/championships/services/championship-api.service';
import { usePoolDelegates } from '@/features/users/hooks/use-pool-delegates';
import { getFetchErrorMessage } from '@/lib/api-client';

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
  const [showImport, setShowImport] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const isSuperAdmin = getStoredUser()?.role === 'SUPER_ADMIN';
  const form = useCreatePool();
  const importForm = useCreateChampionship();
  const {
    championships: activeChampionships,
    isLoading: isLoadingChampionships,
    reloadChampionships,
  } = useActiveChampionships();
  const { delegates, isLoading: isLoadingDelegates } = usePoolDelegates(
    open && isSuperAdmin,
  );
  const hasDelegateCandidates = delegates.length > 0;
  const { championshipType, applyTemplateForChampionship } =
    usePoolScoringTemplate(form, activeChampionships);

  function handleOpenChange(nextOpen: boolean) {
    if (isImporting) {
      return;
    }

    setOpen(nextOpen);

    if (!nextOpen) {
      form.reset();
      importForm.reset();
      setShowImport(false);
      return;
    }

    // Sem campeonatos ativos: já abre o import (bootstrap do 1º bolão).
    if (activeChampionships.length === 0 && !isLoadingChampionships) {
      setShowImport(true);
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
    importForm.reset();
    setShowImport(false);
    setOpen(false);
  }

  async function handleImportChampionship() {
    const valid = await importForm.trigger();

    if (!valid) {
      return;
    }

    setIsImporting(true);

    try {
      const created = await importChampionshipRequest(importForm.getValues());
      await reloadChampionships();
      form.setValue('championshipId', created.id);
      applyTemplateForChampionship(created.id, created.type);
      importForm.reset();
      setShowImport(false);
      toast.success(
        `${created.name} importado. Continue preenchendo o bolão.`,
      );
    } catch (error) {
      toast.error(
        getFetchErrorMessage(
          error,
          'Não foi possível importar o campeonato.',
        ),
      );
    } finally {
      setIsImporting(false);
    }
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
                  <div className='flex items-center justify-between gap-2'>
                    <FormLabel>Campeonato</FormLabel>
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      className='h-8 gap-1.5 text-xs'
                      disabled={isImporting}
                      onClick={() => {
                        setShowImport(current => !current);
                        if (showImport) {
                          importForm.reset();
                        }
                      }}
                    >
                      <Download className='size-3.5' />
                      {showImport ? 'Usar lista existente' : 'Importar campeonato'}
                    </Button>
                  </div>

                  {showImport ? (
                    <div className='bg-muted/40 space-y-4 rounded-lg border p-3'>
                      <p className='text-muted-foreground text-sm'>
                        Importe um campeonato da temporada e ele já entra
                        selecionado para o bolão.
                      </p>
                      <Form {...importForm}>
                        <ImportChampionshipFields
                          form={importForm}
                          enabled={open && showImport}
                          disabled={isImporting}
                          showActiveSwitch={false}
                        />
                      </Form>
                      <div className='flex justify-end'>
                        <Button
                          type='button'
                          disabled={isImporting}
                          onClick={() => void handleImportChampionship()}
                        >
                          {isImporting ? (
                            <>
                              <Loader2Icon
                                className='size-4 animate-spin'
                                aria-hidden
                              />
                              Importando...
                            </>
                          ) : (
                            'Importar e selecionar'
                          )}
                        </Button>
                      </div>
                      {isImporting ? (
                        <p
                          role='status'
                          aria-live='polite'
                          className='rounded-lg border border-amber-500 bg-amber-200 px-3 py-2 text-center text-sm text-black'
                        >
                          Aguarde a importação. Isso pode levar alguns
                          segundos...
                        </p>
                      ) : null}
                    </div>
                  ) : (
                    <FormControl>
                      <NativeSelect
                        value={field.value > 0 ? field.value.toString() : ''}
                        onChange={event => {
                          const nextId = Number(event.target.value);
                          field.onChange(nextId);
                          applyTemplateForChampionship(nextId);
                        }}
                        disabled={isImporting}
                      >
                        <option value='' disabled>
                          {activeChampionships.length === 0
                            ? 'Nenhum campeonato — importe acima'
                            : 'Selecione o campeonato'}
                        </option>
                        {activeChampionships.map(championship => (
                          <option key={championship.id} value={championship.id}>
                            {championship.name} ({championship.season}) —{' '}
                            {championship.type === 'CUP' ? 'Mata-mata' : 'Liga'}
                          </option>
                        ))}
                      </NativeSelect>
                    </FormControl>
                  )}
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
                        <Select
                          value={field.value ? field.value.toString() : ''}
                          onValueChange={value => {
                            const nextId = Number(value);
                            field.onChange(nextId > 0 ? nextId : undefined);
                          }}
                          disabled={isLoadingDelegates || isImporting}
                        >
                          <SelectTrigger size='lg' className='w-full'>
                            <SelectValue
                              placeholder={
                                isLoadingDelegates
                                  ? 'Carregando participantes...'
                                  : 'Selecione o responsável'
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {delegates.map(delegate => (
                              <SelectItem
                                key={delegate.id}
                                value={delegate.id.toString()}
                              >
                                <UserAvatar
                                  name={delegate.name}
                                  avatarDataUrl={delegate.avatarDataUrl}
                                  className='size-7'
                                />
                                <span className='flex min-w-0 flex-col'>
                                  <span className='truncate font-medium'>
                                    {delegate.name}
                                  </span>
                                  <span className='text-muted-foreground truncate text-xs'>
                                    {delegate.email}
                                  </span>
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    ) : (
                      <p className='text-muted-foreground rounded-md border border-dashed px-3 py-2 text-sm'>
                        {isLoadingDelegates
                          ? 'Carregando participantes...'
                          : 'Nenhum participante cadastrado ainda. O bolão será criado sob gestão da plataforma — delegue um administrador quando alguém se cadastrar e solicitar acesso.'}
                      </p>
                    )}
                    <FormDescription>
                      {hasDelegateCandidates
                        ? 'Este participante será o dono e administrador do bolão. Depois, outros pedem acesso na aba Disponíveis.'
                        : 'Sem participantes disponíveis, você pode criar o bolão agora e definir o administrador depois.'}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}

            <PoolScoringRules
              form={form}
              disabled={!championshipType || isImporting}
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
                disabled={isImporting}
              >
                Cancelar
              </Button>
              <Button type='submit' disabled={isImporting || showImport}>
                Criar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
