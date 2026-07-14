import { cn } from '@/lib/utils';

export const predictionTableColumns = {
  championship: 'hidden 2xl:table-cell',
  participant: 'hidden 2xl:table-cell',
  round: 'hidden xl:table-cell',
  result: 'hidden xl:table-cell',
  points: 'hidden xl:table-cell',
  deadline: 'hidden xl:table-cell',
} as const;

export function predictionTableHeadClass(extra?: string) {
  return cn('text-muted-foreground text-xs', extra);
}
