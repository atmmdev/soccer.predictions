'use client';

import { Loader2Icon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PageLoading } from '@/components/ui/page-loading';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { DiscoverablePool } from '../../types/pool';

interface DiscoverablePoolsTableProps {
  pools: DiscoverablePool[];
  isLoading: boolean;
  error: string | null;
  requestingPoolId: number | null;
  onRetry: () => void;
  onRequestAccess: (poolId: number) => Promise<boolean>;
}

function MembershipAction({
  pool,
  requestingPoolId,
  onRequestAccess,
}: {
  pool: DiscoverablePool;
  requestingPoolId: number | null;
  onRequestAccess: (poolId: number) => Promise<boolean>;
}) {
  const isRequesting = requestingPoolId === pool.id;

  if (pool.membershipStatus === 'PENDING') {
    return <Badge variant='secondary'>Aguardando aprovação</Badge>;
  }

  return (
    <Button
      type='button'
      size='sm'
      disabled={isRequesting || requestingPoolId !== null}
      onClick={() => void onRequestAccess(pool.id)}
    >
      {isRequesting ? (
        <>
          <Loader2Icon className='size-4 animate-spin' aria-hidden />
          Enviando...
        </>
      ) : pool.membershipStatus === 'INACTIVE' ? (
        'Solicitar novamente'
      ) : (
        'Solicitar acesso'
      )}
    </Button>
  );
}

export function DiscoverablePoolsTable({
  pools,
  isLoading,
  error,
  requestingPoolId,
  onRetry,
  onRequestAccess,
}: DiscoverablePoolsTableProps) {
  if (isLoading) {
    return <PageLoading compact label='Carregando bolões disponíveis...' />;
  }

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center gap-3 py-12'>
        <p className='text-destructive text-center text-sm'>{error}</p>
        <button
          type='button'
          className='text-primary text-sm underline'
          onClick={onRetry}
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (pools.length === 0) {
    return (
      <div className='flex items-center justify-center py-12'>
        <p className='text-muted-foreground text-sm'>
          Nenhum bolão disponível para solicitar acesso no momento.
        </p>
      </div>
    );
  }

  return (
    <div className='overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow className='hover:bg-transparent'>
            <TableHead className='text-muted-foreground text-xs'>Nome</TableHead>
            <TableHead className='text-muted-foreground text-xs'>
              Campeonato
            </TableHead>
            <TableHead className='text-muted-foreground text-xs'>
              Temporada
            </TableHead>
            <TableHead className='text-muted-foreground text-xs'>
              Participantes
            </TableHead>
            <TableHead className='text-muted-foreground text-xs'>Dono</TableHead>
            <TableHead className='text-muted-foreground text-right text-xs'>
              Ação
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pools.map(pool => (
            <TableRow key={pool.id}>
              <TableCell className='font-medium'>{pool.name}</TableCell>
              <TableCell>{pool.championshipName}</TableCell>
              <TableCell>{pool.season}</TableCell>
              <TableCell>{pool.participantsCount}</TableCell>
              <TableCell>{pool.ownerName}</TableCell>
              <TableCell className='text-right'>
                <MembershipAction
                  pool={pool}
                  requestingPoolId={requestingPoolId}
                  onRequestAccess={onRequestAccess}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
