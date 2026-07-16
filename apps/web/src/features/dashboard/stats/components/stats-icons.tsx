interface StatsIconProps {
  icon: React.ElementType;
  iconColor?: string;
  iconBackground?: string;
  /** Tamanho do ícone em pixels. Padrão: 20 */
  iconSize?: number;
}

export function StatsIcon({
  icon: Icon,
  iconColor,
  iconBackground,
  iconSize = 20,
}: StatsIconProps) {
  const boxSize = Math.max(iconSize + 16, 40);

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-xl ${iconBackground}`}
      style={{ width: boxSize, height: boxSize }}
    >
      <Icon
        className={iconColor}
        size={iconSize}
        style={{ width: iconSize, height: iconSize }}
      />
    </div>
  );
}
