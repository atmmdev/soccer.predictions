'use client';

import { Copy, Link2, Loader2Icon, Search } from 'lucide-react';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ClearFiltersButton } from '@/components/ui/clear-filters-button';
import {
  DateTimeDisplay,
  dateTimeTableCellClassName,
} from '@/components/ui/datetime-display';
import { Input } from '@/components/ui/input';
import { NativeSelect } from '@/components/ui/native-select';
import { PageLoading } from '@/components/ui/page-loading';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  filterSearchFieldClassName,
  filterSelectMdClassName,
  filterSelectSmClassName,
  filterToolbarClassName,
} from '@/lib/filter-styles';
import { buildJoinPoolUrl } from '@/lib/join-pool-url';

import {
  useParticipantFilters,
  useParticipants,
} from '../hooks/use-participants';
import type { PoolParticipant } from '../types/participant';

function ParticipantStatusBadge({
  status,
}: {
  status: PoolParticipant['status'];
}) {
  const label =
    status === 'ACTIVE'
      ? 'Ativo'
      : status === 'PENDING'
        ? 'Pendente'
        : 'Inativo';

  const variant =
    status === 'ACTIVE'
      ? 'default'
      : status === 'PENDING'
        ? 'secondary'
        : 'outline';

  return <Badge variant={variant}>{label}</Badge>;
}

async function copyInviteLink(inviteCode: string) {
  try {
    await navigator.clipboard.writeText(buildJoinPoolUrl(inviteCode));
    toast.success('Link de convite copiado!');
  } catch {
    toast.error('Não foi possível copiar o link.');
  }
}

async function copyInviteCode(inviteCode: string) {
  try {
    await navigator.clipboard.writeText(inviteCode);
    toast.success('Código copiado!');
  } catch {
    toast.error('Não foi possível copiar o código.');
  }
}

export function ParticipantList() {
  const {
    participants,
    isLoading,
    error,
    actingKey,
    reloadParticipants,
    approveParticipant,
    rejectParticipant,
  } = useParticipants();
  const filters = useParticipantFilters(participants);

  return (
    <Card className='overflow-visible shadow-sm'>
      <CardContent className='space-y-4 pt-4'>
        {filters.pendingCount > 0 ? (
          <div className='flex flex-col gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-zinc-700 sm:flex-row sm:items-center sm:justify-between'>
            <p>
              Você tem {filters.pendingCount} pedido(s) de acesso aguardando
              aprovação.
            </p>
            <Button
              type='button'
              size='xs'
              variant='soft'
              onClick={() => filters.setStatus('PENDING')}
            >
              Ver pendentes
            </Button>
          </div>
        ) : null}

        <div className={filterToolbarClassName}>
          <div className={filterSearchFieldClassName}>
            <Search className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
            <Input
              placeholder='Buscar por nome, e-mail ou bolão...'
              className='pl-9'
              value={filters.search}
              onChange={event => filters.setSearch(event.target.value)}
            />
          </div>
          <NativeSelect
            value={filters.poolName}
            onChange={event => filters.setPoolName(event.target.value)}
            className={filterSelectMdClassName}
          >
            <option value='ALL'>Todos os bolões</option>
            {filters.poolOptions.map(pool => (
              <option key={pool} value={pool}>
                {pool}
              </option>
            ))}
          </NativeSelect>
          <NativeSelect
            value={filters.status}
            onChange={event => filters.setStatus(event.target.value)}
            className={filterSelectSmClassName}
          >
            <option value='ALL'>Todos os status</option>
            <option value='ACTIVE'>Ativos</option>
            <option value='PENDING'>Pendentes</option>
            <option value='INACTIVE'>Inativos</option>
          </NativeSelect>
          <ClearFiltersButton
            onClick={filters.clearFilters}
            disabled={!filters.hasActiveFilters}
            className='w-full sm:w-auto'
          />
        </div>

        <p className='text-muted-foreground px-1 text-xs'>
          {filters.summary.people}{' '}
          {filters.summary.people === 1 ? 'participante' : 'participantes'} ·{' '}
          {filters.summary.pools}{' '}
          {filters.summary.pools === 1 ? 'bolão' : 'bolões'}
          {/* ·{' '} {filters.summary.memberships}{' '}
          {filters.summary.memberships === 1
            ? 'participação'
            : 'participações'}
          {filters.summary.memberships !== filters.summary.people
            ? ' (a mesma pessoa pode aparecer em mais de um bolão)'
            : ''} */}
        </p>

        {isLoading ? (
          <PageLoading compact label='Carregando participantes...' />
        ) : error ? (
          <div className='flex flex-col items-center justify-center gap-3 py-12'>
            <p className='text-destructive text-center text-sm'>{error}</p>
            <button
              type='button'
              className='text-primary text-sm underline'
              onClick={() => void reloadParticipants()}
            >
              Tentar novamente
            </button>
          </div>
        ) : filters.filteredParticipants.length === 0 ? (
          <div className='flex items-center justify-center py-12'>
            <p className='text-muted-foreground text-sm'>
              Nenhum participante encontrado.
            </p>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow className='hover:bg-transparent'>
                  <TableHead>Nome</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Bolão</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className='text-center'>Palpites</TableHead>
                  <TableHead>Entrada</TableHead>
                  <TableHead className='text-right'>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filters.filteredParticipants.map(participant => {
                  const actionKey = `${participant.poolId}:${participant.userId}`;
                  const isActing = actingKey === actionKey;

                  return (
                    <TableRow key={participant.id}>
                      <TableCell className='font-medium'>
                        {participant.name}
                        {participant.isOwner ? (
                          <Badge variant='outline' className='ml-2 text-xs'>
                            Dono
                          </Badge>
                        ) : null}
                      </TableCell>
                      <TableCell>{participant.email}</TableCell>
                      <TableCell>{participant.poolName}</TableCell>
                      <TableCell>
                        <ParticipantStatusBadge status={participant.status} />
                      </TableCell>
                      <TableCell className='text-center'>
                        {participant.predictionsCount}
                      </TableCell>
                      <TableCell className={dateTimeTableCellClassName}>
                        <DateTimeDisplay value={participant.joinedAt} />
                      </TableCell>
                      <TableCell className='text-right'>
                        {participant.status === 'PENDING' &&
                        !participant.isOwner ? (
                          <div className='flex justify-end gap-1'>
                            <Button
                              type='button'
                              size='sm'
                              disabled={isActing || actingKey !== null}
                              onClick={() =>
                                void approveParticipant(
                                  participant.poolId,
                                  participant.userId,
                                )
                              }
                            >
                              {isActing ? (
                                <Loader2Icon
                                  className='size-4 animate-spin'
                                  aria-hidden
                                />
                              ) : null}
                              Aprovar
                            </Button>
                            <Button
                              type='button'
                              size='sm'
                              variant='outline'
                              disabled={isActing || actingKey !== null}
                              onClick={() =>
                                void rejectParticipant(
                                  participant.poolId,
                                  participant.userId,
                                )
                              }
                            >
                              Recusar
                            </Button>
                          </div>
                        ) : (
                          <div className='flex justify-end gap-1'>
                            <Button
                              type='button'
                              size='icon'
                              variant='ghost'
                              title='Copiar link'
                              onClick={() =>
                                void copyInviteLink(participant.inviteCode)
                              }
                            >
                              <Link2 className='size-4' />
                            </Button>
                            <Button
                              type='button'
                              size='icon'
                              variant='ghost'
                              title='Copiar código'
                              onClick={() =>
                                void copyInviteCode(participant.inviteCode)
                              }
                            >
                              <Copy className='size-4' />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
