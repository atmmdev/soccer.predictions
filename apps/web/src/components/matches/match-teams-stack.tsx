interface TeamCrestProps {
  name: string;
  logo?: string | null;
  className?: string;
  nameClassName?: string;
  size?: number;
  showName?: boolean;
}

function isImageLogo(logo?: string | null): boolean {
  if (!logo) {
    return false;
  }

  return (
    logo.startsWith('http://') ||
    logo.startsWith('https://') ||
    logo.startsWith('/')
  );
}

export function TeamCrest({
  name,
  logo,
  className,
  nameClassName,
  size = 18,
  showName = true,
}: TeamCrestProps) {
  const hasImage = isImageLogo(logo);
  const hasEmoji = Boolean(logo && !hasImage);

  return (
    <span
      className={
        className ?? 'inline-flex min-w-0 items-center gap-1.5'
      }
    >
      {hasImage ? (
        <img
          src={logo!}
          alt=''
          width={size}
          height={size}
          className='shrink-0 object-contain'
          style={{ width: size, height: size }}
          loading='lazy'
        />
      ) : hasEmoji ? (
        <span aria-hidden className='leading-none'>
          {logo}
        </span>
      ) : null}
      {showName ? (
        <span className={nameClassName ?? 'truncate font-medium'}>{name}</span>
      ) : null}
    </span>
  );
}

interface MatchTeamsStackProps {
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo?: string | null;
  awayTeamLogo?: string | null;
  className?: string;
  size?: number;
}

export function MatchTeamsStack({
  homeTeam,
  awayTeam,
  homeTeamLogo,
  awayTeamLogo,
  className,
  size = 18,
}: MatchTeamsStackProps) {
  return (
    <div className={className ?? 'flex flex-col gap-1'}>
      <TeamCrest name={homeTeam} logo={homeTeamLogo} size={size} />
      <TeamCrest name={awayTeam} logo={awayTeamLogo} size={size} />
    </div>
  );
}

interface MatchTeamsInlineProps {
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo?: string | null;
  awayTeamLogo?: string | null;
  className?: string;
  size?: number;
}

export function MatchTeamsInline({
  homeTeam,
  awayTeam,
  homeTeamLogo,
  awayTeamLogo,
  className,
  size = 20,
}: MatchTeamsInlineProps) {
  return (
    <div
      className={
        className ??
        'flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-sm'
      }
    >
      <TeamCrest name={homeTeam} logo={homeTeamLogo} size={size} />
      <span className='text-muted-foreground font-normal'>x</span>
      <TeamCrest name={awayTeam} logo={awayTeamLogo} size={size} />
    </div>
  );
}
