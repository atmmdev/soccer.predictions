interface PositionBadgeProps {
  position: number;
}

export function PositionBadge({ position }: PositionBadgeProps) {
  if (position === 1) return <span className='text-2xl leading-none'>🥇</span>;
  if (position === 2) return <span className='text-2xl leading-none'>🥈</span>;
  if (position === 3) return <span className='text-2xl leading-none'>🥉</span>;

  return (
    <span className='text-muted-foreground w-6 text-center text-sm font-medium flex items-center justify-center'>
      <span className='text-xs leading-none'>{position}º</span>
    </span>
  );
}
