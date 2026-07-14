'use client';

import {
  Check,
  CheckCircle2,
  Clock3,
  Copy,
  Link2,
  Loader2Icon,
  MoreVertical,
  Search,
  Users,
  X,
} from 'lucide-react';
import { toast } from 'sonner';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DateTimeDisplay,
  dateTimeTableCellClassName,
} from '@/components/ui/datetime-display';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { NativeSelect } from '@/components/ui/native-select';
import { PageLoading } from '@/components/ui/page-loading';
import { StatusBadge } from '@/components/ui/status-badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  lineTabTriggerClassName,
  lineTabsListClassName,
} from '@/lib/line-tabs';
import { buildJoinPoolUrl } from '@/lib/join-pool-url';
import { cn } from '@/lib/utils';

import {
  useParticipantFilters,
  useParticipants,
  type ParticipantRoleTab,
} from '../hooks/use-participants';
import type { PoolParticipant } from '../types/participant';

function ParticipantStatusBadge({
  status,
}: {
  status: PoolParticipant['status'];
}) {
  if (status === 'ACTIVE') {
    return (
      <StatusBadge tone='success' className='gap-1'>
        <CheckCircle2 className='size-3' aria-hidden />
        Ativo
      </StatusBadge>
    );
  }

  if (status === 'PENDING') {
    return (
      <StatusBadge tone='warning' className='gap-1'>
        <Clock3 className='size-3' aria-hidden />
        Pendente
      </StatusBadge>
    );
  }

  return <StatusBadge tone='neutral'>Inativo</StatusBadge>;
}

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return '?';
  }
  if (parts.length === 1) {
    return parts[0]!.slice(0, 1).toUpperCase();
  }
  return `${parts[0]!.slice(0, 1)}${parts[parts.length - 1]!.slice(0, 1)}`.toUpperCase();
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

function TabCount({ value, active }: { value: number; active: boolean }) {
  return (
    <span
      className={cn(
        'ml-1 inline-flex size-5 items-center justify-center rounded-full text-[10px] font-semibold',
        active
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted text-muted-foreground',
      )}
    >
      {value}
    </span>
  );
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

  const accordionKey = [
    filters.search,
    filters.roleTab,
    filters.sort,
    filters.status,
    filters.groupedParticipants.map(group => group.userId).join(','),
  ].join('|');

  const defaultOpenUserIds = filters.groupedParticipants
    .filter(group => group.pendingCount > 0)
    .map(group => String(group.userId));

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

        <div className='flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'>
          <Tabs
            value={filters.roleTab}
            onValueChange={value =>
              filters.setRoleTab(value as ParticipantRoleTab)
            }
          >
            <TabsList variant='line' className={lineTabsListClassName}>
              <TabsTrigger
                value='ALL'
                className={cn(lineTabTriggerClassName, 'items-center gap-1.5')}
              >
                Todos
                <TabCount
                  value={filters.tabCounts.all}
                  active={filters.roleTab === 'ALL'}
                />
              </TabsTrigger>
              <TabsTrigger
                value='OWNER'
                className={cn(lineTabTriggerClassName, 'items-center gap-1.5')}
              >
                Sou dono
                <TabCount
                  value={filters.tabCounts.owner}
                  active={filters.roleTab === 'OWNER'}
                />
              </TabsTrigger>
              <TabsTrigger
                value='MEMBER'
                className={cn(lineTabTriggerClassName, 'items-center gap-1.5')}
              >
                Participo
                <TabCount
                  value={filters.tabCounts.member}
                  active={filters.roleTab === 'MEMBER'}
                />
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
            <div className='relative min-w-0 flex-1 sm:w-56'>
              <Search className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
              <Input
                placeholder='Buscar participantes...'
                className='pl-9'
                value={filters.search}
                onChange={event => filters.setSearch(event.target.value)}
              />
            </div>
            <NativeSelect
              value={filters.sort}
              onChange={event =>
                filters.setSort(
                  event.target.value as 'recent' | 'name-asc' | 'name-desc',
                )
              }
              className='w-full sm:w-40'
            >
              <option value='recent'>Mais recentes</option>
              <option value='name-asc'>Nome A–Z</option>
              <option value='name-desc'>Nome Z–A</option>
            </NativeSelect>
          </div>
        </div>

        {filters.status !== 'ALL' ? (
          <div className='flex items-center gap-2 px-1'>
            <Badge variant='secondary'>
              Filtro: {filters.status === 'PENDING' ? 'Pendentes' : filters.status === 'ACTIVE' ? 'Ativos' : 'Inativos'}
            </Badge>
            <Button
              type='button'
              size='xs'
              variant='ghost'
              onClick={() => filters.setStatus('ALL')}
            >
              Limpar
            </Button>
          </div>
        ) : null}

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
        ) : filters.groupedParticipants.length === 0 ? (
          <div className='flex items-center justify-center py-12'>
            <p className='text-muted-foreground text-sm'>
              Nenhum participante encontrado.
            </p>
          </div>
        ) : (
          <Accordion
            key={accordionKey}
            type='multiple'
            defaultValue={defaultOpenUserIds}
            className='gap-3'
          >
            {filters.groupedParticipants.map(group => {
              const value = String(group.userId);
              const poolsLabel =
                group.memberships.length === 1
                  ? '1 bolão'
                  : `${group.memberships.length} bolões`;

              return (
                <AccordionItem
                  key={value}
                  value={value}
                  className={cn(
                    'rounded-xl border bg-card px-3 shadow-sm transition-colors not-last:border-b-0',
                    'data-open:border-primary data-open:ring-1 data-open:ring-primary/25',
                  )}
                >
                  <AccordionTrigger className='items-center gap-2 py-3.5 hover:no-underline'>
                    <div className='flex min-w-0 flex-1 items-center gap-3 pr-2'>
                      <Avatar size='default' className='bg-primary/10'>
                        <AvatarFallback className='bg-primary/10 text-xs font-semibold text-primary'>
                          {initialsFromName(group.name)}
                        </AvatarFallback>
                      </Avatar>

                      <div className='min-w-0 flex-1 text-left'>
                        <div className='flex flex-wrap items-center gap-2'>
                          <span className='truncate font-semibold text-zinc-900'>
                            {group.name}
                          </span>
                          {group.isOwnerAnywhere ? (
                            <Badge
                              variant='secondary'
                              className='bg-primary/10 text-primary'
                            >
                              Dono
                            </Badge>
                          ) : null}
                          <Badge variant='outline' className='font-normal'>
                            {poolsLabel}
                          </Badge>
                        </div>
                        <p className='text-muted-foreground truncate text-xs font-normal'>
                          {group.email}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className='pb-3'>
                    <div className='overflow-x-auto rounded-lg border bg-zinc-50/70'>
                      <Table>
                        <TableHeader>
                          <TableRow className='hover:bg-transparent'>
                            <TableHead className='text-[11px] tracking-wide uppercase'>
                              Bolão
                            </TableHead>
                            <TableHead className='text-[11px] tracking-wide uppercase'>
                              Status
                            </TableHead>
                            <TableHead className='text-center text-[11px] tracking-wide uppercase'>
                              Palpites
                            </TableHead>
                            <TableHead className='text-[11px] tracking-wide uppercase'>
                              Entrada
                            </TableHead>
                            <TableHead className='text-right text-[11px] tracking-wide uppercase'>
                              Ações
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {group.memberships.map(participant => {
                            const actionKey = `${participant.poolId}:${participant.userId}`;
                            const isActing = actingKey === actionKey;
                            const canModerate =
                              participant.status === 'PENDING' &&
                              !participant.isOwner;

                            return (
                              <TableRow
                                key={participant.id}
                                className='bg-transparent'
                              >
                                <TableCell>
                                  <div className='flex items-center gap-2 font-medium'>
                                    <Users
                                      className='text-muted-foreground size-4 shrink-0'
                                      aria-hidden
                                    />
                                    <span>{participant.poolName}</span>
                                    {participant.isOwner ? (
                                      <Badge
                                        variant='secondary'
                                        className='bg-primary/10 text-xs text-primary'
                                      >
                                        Dono
                                      </Badge>
                                    ) : null}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <ParticipantStatusBadge
                                    status={participant.status}
                                  />
                                </TableCell>
                                <TableCell className='text-center tabular-nums'>
                                  {participant.predictionsCount}
                                </TableCell>
                                <TableCell
                                  className={dateTimeTableCellClassName}
                                >
                                  <DateTimeDisplay
                                    value={participant.joinedAt}
                                  />
                                </TableCell>
                                <TableCell className='text-right'>
                                  <div className='flex items-center justify-end gap-1'>
                                    {canModerate ? (
                                      <>
                                        <Button
                                          type='button'
                                          size='sm'
                                          disabled={
                                            isActing || actingKey !== null
                                          }
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
                                          ) : (
                                            <Check
                                              className='size-4'
                                              aria-hidden
                                            />
                                          )}
                                          Aprovar
                                        </Button>
                                        <Button
                                          type='button'
                                          size='sm'
                                          variant='outline'
                                          className='text-destructive hover:text-destructive'
                                          disabled={
                                            isActing || actingKey !== null
                                          }
                                          onClick={() =>
                                            void rejectParticipant(
                                              participant.poolId,
                                              participant.userId,
                                            )
                                          }
                                        >
                                          <X className='size-4' aria-hidden />
                                          Recusar
                                        </Button>
                                      </>
                                    ) : (
                                      <>
                                        <Button
                                          type='button'
                                          size='icon-sm'
                                          variant='ghost'
                                          title='Copiar link'
                                          onClick={() =>
                                            void copyInviteLink(
                                              participant.inviteCode,
                                            )
                                          }
                                        >
                                          <Link2 className='size-4' />
                                        </Button>
                                        <Button
                                          type='button'
                                          size='icon-sm'
                                          variant='ghost'
                                          title='Copiar código'
                                          onClick={() =>
                                            void copyInviteCode(
                                              participant.inviteCode,
                                            )
                                          }
                                        >
                                          <Copy className='size-4' />
                                        </Button>
                                      </>
                                    )}

                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          type='button'
                                          size='icon-sm'
                                          variant='ghost'
                                          aria-label='Mais ações'
                                        >
                                          <MoreVertical className='size-4' />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align='end'>
                                        <DropdownMenuItem
                                          onClick={() =>
                                            void copyInviteLink(
                                              participant.inviteCode,
                                            )
                                          }
                                        >
                                          <Link2 />
                                          Copiar link do bolão
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={() =>
                                            void copyInviteCode(
                                              participant.inviteCode,
                                            )
                                          }
                                        >
                                          <Copy />
                                          Copiar código
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}
