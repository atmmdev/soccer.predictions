interface StatsIconProps {
  icon: React.ElementType;
  iconColor?: string;
  iconBackground?: string;
}

export function StatsIcon({ icon: Icon, iconColor, iconBackground }: StatsIconProps) {
  return (
    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${iconBackground}`}>
      <Icon className={`h-8 w-8 ${iconColor}`} />
    </div>
  )
}