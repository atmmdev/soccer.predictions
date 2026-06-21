interface PositionBadgeProps {
  position: number;
}

export function PositionBadge({ position }: PositionBadgeProps) {
  if (position === 1) {
    return <span className='text-2xl'>🥇</span>;
  }
  if (position === 2) {
    return <span className='text-2xl'>🥈</span>;
  }
  if (position === 3) {
    return <span className='text-2xl'>🥉</span>;
  }

  return <span className='text-2xl'>{position}º</span>;
}
