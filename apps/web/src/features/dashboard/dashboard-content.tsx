'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
import { cn } from '@/lib/utils';

import { ActivityFeed } from './activity';
import { useDashboardData } from './hooks/use-dashboard-data';
import { MatchTableRow } from './matches/components/match-table-row';
import { MatchTabs } from './matches/components/match-tabs';
import { RankingRow } from './rankings/components/ranking-row';
import { StatsCard } from './stats/components/stats-card';

type MatchTab = 'all' | 'live' | 'today' | 'tomorrow';

export function DashboardContent() {
  const {
    isLoading,
    error,
    stats,
    topRanking,
    rankingPools,
    selectedPoolId,
    setSelectedPoolId,
    activePools,
    matchCounts,
    filterMatches,
    reload,
  } = useDashboardData();
  const [matchTab, setMatchTab] = useState<MatchTab>('all');
  const matches = filterMatches(matchTab);

  if (isLoading) {
    return <PageLoading label='Carregando dashboard...' />;
  }

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center gap-3 py-16'>
        <p className='text-destructive text-center text-sm'>{error}</p>
        <button
          type='button'
          className='text-primary text-sm underline'
          onClick={() => void reload()}
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-6'>
      <p className='text-muted-foreground text-sm'>
        <span className='text-foreground font-bold'>
          Bem-vindo ao Soccer Predictions!
        </span>{' '}
        Aqui você pode gerenciar seus bolões e campeonatos.
      </p>

      <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-5'>
        {stats.map(item => (
          <StatsCard key={item.title} item={item} />
        ))}
      </section>

      <div className='grid gap-6 lg:grid-cols-3'>
        <div className='flex flex-col gap-6 lg:col-span-2'>
          <section>
            <Card className='shadow-sm'>
              <CardHeader className='flex flex-row items-center justify-between border-b'>
                <h2 className='section-title mb-0'>
                  Próximos Jogos
                </h2>
                <Link
                  href='/predictions'
                  className='text-primary text-sm font-medium hover:underline'
                >
                  Ver todos
                </Link>
              </CardHeader>
              <CardContent className='space-y-2'>
                <MatchTabs
                  activeTab={matchTab}
                  onTabChange={setMatchTab}
                  counts={matchCounts}
                />
                <div className='overflow-x-auto'>
                  {matches.length === 0 ? (
                    <p className='text-muted-foreground py-8 text-center text-sm'>
                      Nenhum jogo encontrado para este filtro.
                    </p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow className='text-xs'>
                          <TableHead>Data / Hora</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className='text-center'>Jogo</TableHead>
                          <TableHead className='text-center'>
                            Resultado Oficial
                          </TableHead>
                          <TableHead className='text-center'>
                            Meu Palpite
                          </TableHead>
                          <TableHead>Pontos</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {matches.map((match, index) => (
                          <MatchTableRow
                            key={`${matchTab}-${match.id}-${index}`}
                            match={match}
                          />
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>

          <ActivityFeed />
        </div>

        <div className='flex flex-col gap-6'>
          <section>
            <Card className='shadow-sm'>
              <CardHeader className='flex flex-row flex-wrap items-center justify-between gap-2 border-b pb-4'>
                <h2 className='section-title mb-0'>Classificação Geral</h2>
                <div className='flex flex-wrap items-center justify-end gap-2'>
                  {rankingPools.length > 1 && selectedPoolId !== null ? (
                    <NativeSelect
                      aria-label='Selecionar bolão'
                      value={String(selectedPoolId)}
                      onChange={event =>
                        setSelectedPoolId(Number(event.target.value))
                      }
                      className={cn('w-44 shrink-0 [&_select]:h-8 [&_select]:text-xs')}
                    >
                      {rankingPools.map(pool => (
                        <option key={pool.id} value={pool.id}>
                          {pool.name}
                        </option>
                      ))}
                    </NativeSelect>
                  ) : rankingPools.length === 1 ? (
                    <span className='text-muted-foreground max-w-44 truncate text-sm'>
                      {rankingPools[0].name}
                    </span>
                  ) : null}
                </div>
              </CardHeader>
              <CardContent>
                {topRanking.length === 0 ? (
                  <p className='text-muted-foreground py-6 text-center text-sm'>
                    Participe de um bolão para ver a classificação.
                  </p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className='text-xs'>
                        <TableHead className='w-14'>Posição</TableHead>
                        <TableHead>Participante</TableHead>
                        <TableHead className='text-right'>Pontos</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topRanking.map((user, index) => (
                        <RankingRow
                          key={user.id}
                          user={user}
                          position={index + 1}
                        />
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </section>

          <section>
            <Card className='shadow-sm'>
              <CardHeader className='flex flex-row items-center justify-between border-b pb-4'>
                <h2 className='section-title mb-0'>Bolões Mais Ativos</h2>
                <Link
                  href='/pools'
                  className='text-primary text-sm font-medium hover:underline'
                >
                  Ver todos
                </Link>
              </CardHeader>
              <CardContent className='overflow-x-auto'>
                {activePools.length === 0 ? (
                  <p className='text-muted-foreground py-6 text-center text-sm'>
                    Nenhum bolão encontrado.
                  </p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className='text-xs'>
                        <TableHead>Bolão</TableHead>
                        <TableHead>Campeonato</TableHead>
                        <TableHead className='text-right'>
                          Participantes
                        </TableHead>
                        <TableHead className='text-right'>Palpites</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activePools.map(pool => (
                        <TableRow key={pool.id}>
                          <TableCell className='font-medium'>
                            {pool.name}
                          </TableCell>
                          <TableCell>{pool.championshipName}</TableCell>
                          <TableCell className='text-right font-bold'>
                            {pool.participantsCount}
                          </TableCell>
                          <TableCell className='text-right font-bold'>
                            {pool.predictionsCount}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
