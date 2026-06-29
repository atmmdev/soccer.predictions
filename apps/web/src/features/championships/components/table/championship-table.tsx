'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Championship } from '../../types/championship';
import { ChampionshipRow } from './championship-row';
import { ChampionshipSortableHead } from './championship-sortable-head';
import { useChampionshipTable } from './hooks/use-championship-table';

interface ChampionshipTableProps {
  championships: Championship[];
}

export function ChampionshipTable({ championships }: ChampionshipTableProps) {
  const {
    rows,
    countries,
    seasons,
    country,
    setCountry,
    season,
    setSeason,
    sortKey,
    sortDir,
    toggleSort,
  } = useChampionshipTable(championships);

  return (
    <Card className='shadow-sm'>
      <CardContent className='space-y-4 pt-4'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger className='h-10 w-full sm:w-48'>
              <SelectValue placeholder='Filtrar por país' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Todos os países</SelectItem>
              {countries.map(item => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={season} onValueChange={setSeason}>
            <SelectTrigger className='h-10 w-full sm:w-40'>
              <SelectValue placeholder='Filtrar por temporada' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Todas as temporadas</SelectItem>
              {seasons.map(item => (
                <SelectItem key={item} value={item.toString()}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <p className='text-muted-foreground sm:ml-auto text-xs'>
            <span className='font-bold text-primary'>{rows.length}</span> Campeonato{rows.length !== 1 ? 's' : ''}
          </p>
        </div>

        {rows.length > 0 ? (
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow className='hover:bg-transparent'>
                  <ChampionshipSortableHead
                    label='Nome'
                    column='name'
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSort={toggleSort}
                  />
                  <ChampionshipSortableHead
                    label='País'
                    column='country'
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSort={toggleSort}
                  />
                  <ChampionshipSortableHead
                    label='Temporada'
                    column='season'
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSort={toggleSort}
                  />
                  <ChampionshipSortableHead
                    label='Status'
                    column='status'
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSort={toggleSort}
                  />
                  <TableHead className='text-muted-foreground text-xs  text-center'>
                    Tabela de Classificação
                  </TableHead>
                  <TableHead className='text-muted-foreground text-right text-xs'>
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map(championship => (
                  <ChampionshipRow
                    key={championship.id}
                    championship={championship}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className='flex items-center justify-center py-12'>
            <p className='text-muted-foreground text-sm'>
              Nenhum campeonato encontrado com os filtros selecionados.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
