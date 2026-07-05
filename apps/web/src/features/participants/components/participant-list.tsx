'use client';

import { Copy, Link2, Search } from 'lucide-react';
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
  const { participants, isLoading, error, reloadParticipants } =
    useParticipants();
  const filters = useParticipantFilters(participants);

  return (
    <Card className='overflow-visible shadow-sm'>
      <CardContent className='space-y-4 pt-4'>
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
          {filters.filteredParticipants.length} participante(s) encontrado(s)
        </p>

        {isLoading ? (
          <div className='flex items-center justify-center py-12'>
            <p className='text-muted-foreground text-sm'>
              Carregando participantes...
            </p>
          </div>
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
                  <TableHead className='text-right'>Convite</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filters.filteredParticipants.map(participant => (
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
