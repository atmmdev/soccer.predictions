interface CountryFlagProps {
  flag?: string;
  code?: string;
  name: string;
  className?: string;
}

function resolveFlagSrc(flag?: string, code?: string): string | null {
  const normalizedCode = code?.trim().toLowerCase().replace(/_/g, '-');

  if (normalizedCode) {
    return `https://flagcdn.com/w40/${normalizedCode}.png`;
  }

  if (!flag) {
    return null;
  }

  if (flag.startsWith('http://') || flag.startsWith('https://')) {
    const match = flag.match(/\/flags\/([a-z0-9-]+)\.svg$/i);

    if (match?.[1]) {
      return `https://flagcdn.com/w40/${match[1].toLowerCase()}.png`;
    }

    return flag;
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
