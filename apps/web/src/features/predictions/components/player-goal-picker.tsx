'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { MatchPlayer } from '../types/player';

interface PlayerGoalPickerProps {
  players: MatchPlayer[];
  value: number | null;
  onChange: (playerId: number | null) => void;
  disabled?: boolean;
}

export function PlayerGoalPicker({
  players,
  value,
  onChange,
  disabled,
}: PlayerGoalPickerProps) {
  const [isEditing, setIsEditing] = useState(false);

  const selectedPlayer = players.find(player => player.id === value);
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

      {hasSelection && selectedPlayer ? (
        <div className='flex items-center justify-between gap-2 rounded-lg border border-primary/40 bg-primary/5 px-3 py-2'>
          <div className='min-w-0'>
            <p className='truncate text-sm font-medium'>{selectedPlayer.name}</p>
            <p className='text-muted-foreground truncate text-xs'>
              {selectedPlayer.teamName}
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
        <div className='grid gap-2 sm:grid-cols-2'>
          {players.map(player => {
            const isSelected = value === player.id;

            return (
              <button
                key={player.id}
                type='button'
                disabled={disabled}
                onClick={() => handleSelect(player.id)}
                className={cn(
                  'rounded-lg border px-3 py-2 text-left transition-colors',
                  'hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40',
                  isSelected && 'border-primary bg-primary/5 ring-1 ring-primary/30',
                )}
              >
                <p className='truncate text-sm font-medium'>{player.name}</p>
                <p className='text-muted-foreground truncate text-xs'>
                  {player.teamName}
                </p>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
