interface StatsIconProps {
  icon: React.ElementType;
  iconColor?: string;
  iconBackground?: string;
}

export function StatsIcon({
  icon: Icon,
  iconColor,
  iconBackground,
}: StatsIconProps) {
  return (
    <div
      className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${iconBackground}`}
    >
      <Icon className={`size-5 ${iconColor}`} />
    </div>
  );
}
