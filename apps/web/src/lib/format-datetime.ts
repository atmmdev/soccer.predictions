import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function toDate(value: string | Date): Date {
  return typeof value === 'string' ? parseISO(value) : value;
}

/** Data no padrão do sistema: DD/MM/YYYY */
export function formatDisplayDate(value: string | Date): string {
  return format(toDate(value), 'dd/MM/yyyy', { locale: ptBR });
}

/** Hora no padrão do sistema: HH:mm */
export function formatDisplayTime(value: string | Date): string {
  return format(toDate(value), 'HH:mm', { locale: ptBR });
}
