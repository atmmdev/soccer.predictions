import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatFixtureDate(date: string): string {
  return format(parseISO(date), 'dd/MM/yyyy', { locale: ptBR });
}

export function formatFixtureTime(date: string): string {
  return format(parseISO(date), 'HH:mm', { locale: ptBR });
}
