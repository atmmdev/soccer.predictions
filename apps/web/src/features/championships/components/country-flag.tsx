interface CountryFlagProps {
  flag?: string;
  code?: string;
  name: string;
  className?: string;
}

/** football-data.org area codes (mostly alpha-3) → flagcdn alpha-2 */
const AREA_CODE_TO_FLAGCDN: Record<string, string> = {
  BRA: 'br',
  ENG: 'gb-eng',
  FRA: 'fr',
  DEU: 'de',
  ITA: 'it',
  NLD: 'nl',
  POR: 'pt',
  ESP: 'es',
  EUR: 'eu',
  SAM: 'un',
  INT: 'un',
  ARG: 'ar',
  USA: 'us',
  MEX: 'mx',
  BEL: 'be',
  TUR: 'tr',
};

function resolveFlagSrc(flag?: string, code?: string): string | null {
  if (flag?.startsWith('http://') || flag?.startsWith('https://')) {
    return flag;
  }

  const normalizedCode = code?.trim().toUpperCase().replace(/_/g, '-');

  if (!normalizedCode) {
    return null;
  }

  const mapped = AREA_CODE_TO_FLAGCDN[normalizedCode];

  if (mapped) {
    return `https://flagcdn.com/w40/${mapped}.png`;
  }

  if (/^[A-Z]{2}(-[A-Z0-9]+)?$/i.test(normalizedCode)) {
    return `https://flagcdn.com/w40/${normalizedCode.toLowerCase()}.png`;
  }

  return null;
}

export function CountryFlag({ flag, code, name, className }: CountryFlagProps) {
  const src = resolveFlagSrc(flag, code);
  const isEmoji = Boolean(flag && !src && !flag.startsWith('http'));

  return (
    <span className={className ?? 'inline-flex min-w-0 items-center gap-2'}>
      {src ? (
        <img
          src={src}
          alt=''
          width={20}
          height={14}
          className='h-3.5 w-5 shrink-0 rounded-[2px] object-cover'
          loading='lazy'
        />
      ) : isEmoji ? (
        <span aria-hidden className='leading-none'>
          {flag}
        </span>
      ) : null}
      <span className='truncate'>{name}</span>
    </span>
  );
}
