'use client';

import { NativeSelect } from '@/components/ui/native-select';
import { filterSelectMdClassName } from '@/lib/filter-styles';
import { cn } from '@/lib/utils';

interface RoundFilterSelectProps {
  availableRounds: number[];
  value: number | null;
  onChange: (round: number | null) => void;
  /** Label for the empty/`null` option. Omit to require a concrete round. */
  emptyOptionLabel?: string;
  /** How each round option is labeled. Default: `Rodada {n}`. */
  formatOptionLabel?: (round: number) => string;
  ariaLabel?: string;
  disabled?: boolean;
  className?: string;
}

export function RoundFilterSelect({
  availableRounds,
  value,
  onChange,
  emptyOptionLabel,
  formatOptionLabel = round => `Rodada ${round}`,
  ariaLabel = 'Rodada',
  disabled = false,
  className,
}: RoundFilterSelectProps) {
  const allowEmpty = emptyOptionLabel !== undefined;

  return (
    <NativeSelect
      value={value === null ? '' : String(value)}
      onChange={event => {
        const next = event.target.value;
        onChange(next.length > 0 ? Number(next) : null);
      }}
      className={cn(filterSelectMdClassName, 'bg-white', className)}
      aria-label={ariaLabel}
      disabled={disabled || availableRounds.length === 0}
    >
      {allowEmpty ? <option value=''>{emptyOptionLabel}</option> : null}
      {availableRounds.map(round => (
        <option key={round} value={round}>
          {formatOptionLabel(round)}
        </option>
      ))}
    </NativeSelect>
  );
}
