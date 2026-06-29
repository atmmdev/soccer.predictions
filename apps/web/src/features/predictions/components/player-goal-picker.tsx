'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { FixtureLineup } from '../types/fixture-lineup';
import { findPlayerInLineup } from '../types/fixture-lineup';

interface PlayerGoalPickerProps {
  lineup: FixtureLineup;
  value: number | null;
  onChange: (playerId: number | null) => void;
  disabled?: boolean;
}

interface PlayerButtonProps {
  name: string;
  isSelected: boolean;
  disabled: boolean;
  onClick: () => void;
}

function PlayerButton({
  name,
  isSelected,
  disabled,
  onClick,
}: PlayerButtonProps) {
  return (
    <button
      type='button'
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'w-full cursor-pointer rounded-lg border px-3 py-2 text-left transition-colors',
        'hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40',
        isSelected && 'border-primary bg-primary/5 ring-1 ring-primary/30',
      )}
    >
      <p className='truncate text-sm font-medium'>{name}</p>
    </button>
  );
}

function TeamColumn({
  teamName,
  players,
  selectedPlayerId,
  disabled,
  onSelect,
}: {
  teamName: string;
  players: FixtureLineup['home']['players'];
  selectedPlayerId: number | null;
  disabled: boolean;
  onSelect: (playerId: number) => void;
}) {
  return (
    <div className='flex min-w-0 flex-1 flex-col gap-2'>
      <p className='truncate text-center text-sm font-semibold'>{teamName}</p>
      <div className='flex flex-col gap-2'>
        {players.map(player => (
          <PlayerButton
            key={player.id}
            name={player.name}
            isSelected={selectedPlayerId === player.id}
            disabled={disabled}
            onClick={() => onSelect(player.id)}
          />
        ))}
      </div>
    </div>
  );
}

export function PlayerGoalPicker({
  lineup,
  value,
  onChange,
  disabled,
}: PlayerGoalPickerProps) {
  const [isEditing, setIsEditing] = useState(false);

  const selected = findPlayerInLineup(lineup, value);
  const hasSelection = value !== null && !isEditing;

  function handleSelect(playerId: number) {
    onChange(playerId);
    setIsEditing(false);
  }

  function handleStartEdit() {
    setIsEditing(true);
  }

  function handleClearSelection() {
    onChange(null);
    setIsEditing(false);
  }

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between gap-2'>
        <div>
          <p className='text-sm font-medium'>Jogador para marcar gol</p>
          <p className='text-muted-foreground text-xs'>
            Escolha apenas 1 jogador por partida.
          </p>
        </div>

        {hasSelection ? (
          <Button
            type='button'
            variant='outline'
            size='sm'
            disabled={disabled}
            onClick={handleStartEdit}
          >
            Trocar
          </Button>
        ) : null}
      </div>

      {hasSelection && selected ? (
        <div className='flex items-center justify-between gap-2 rounded-lg border border-primary/40 bg-primary/5 px-3 py-2'>
          <div className='flex min-w-0 items-center gap-2'>
            <span aria-hidden className='text-lg leading-none'>
              {selected.team.flag}
            </span>
            <p className='truncate text-sm font-medium'>
              {selected.player.name}
            </p>
          </div>
          <Button
            type='button'
            variant='ghost'
            size='sm'
            disabled={disabled}
            onClick={handleClearSelection}
          >
            Remover
          </Button>
        </div>
      ) : (
        <div className='grid grid-cols-[1fr_auto_1fr] items-start gap-3'>
          <TeamColumn
            teamName={lineup.home.team.name}
            players={lineup.home.players}
            selectedPlayerId={value}
            disabled={Boolean(disabled)}
            onSelect={handleSelect}
          />

          <div className='flex flex-col items-center justify-center gap-3 self-center px-1 pt-8'>
            <span aria-hidden className='text-2xl leading-none'>
              {lineup.home.team.flag}
            </span>
            <span className='text-muted-foreground text-xs font-medium'>
              x
            </span>
            <span aria-hidden className='text-2xl leading-none'>
              {lineup.away.team.flag}
            </span>
          </div>

          <TeamColumn
            teamName={lineup.away.team.name}
            players={lineup.away.players}
            selectedPlayerId={value}
            disabled={Boolean(disabled)}
            onSelect={handleSelect}
          />
        </div>
      )}
    </div>
  );
}
