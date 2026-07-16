import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatActivityRelativeTime(occurredAt: string): string {
  return formatDistanceToNow(new Date(occurredAt), {
    addSuffix: true,
    locale: ptBR,
  });
}
