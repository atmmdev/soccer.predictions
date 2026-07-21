import { formatDisplayDate, formatDisplayTime } from '@/lib/format-datetime';
import { cn } from '@/lib/utils';

interface DateTimeDisplayProps {
  value: string | Date;
  className?: string;
}

/** Data e hora empilhadas (DD/MM/YYYY + HH:mm), padrão das tabelas. */
export function DateTimeDisplay({ value, className }: DateTimeDisplayProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-1 text-muted-foreground text-xs whitespace-nowrap',
        className,
      )}
    >
      <span>{formatDisplayDate(value)}  · {formatDisplayTime(value)}</span>
    </div>
  );
}

export const dateTimeTableCellClassName = 'w-[6.5rem]';
