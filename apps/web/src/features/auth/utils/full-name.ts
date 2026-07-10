const NAME_PART_PATTERN = /^[\p{L}]+(?:['-][\p{L}]+)*$/u;

export function normalizeFullName(value: string): string {
  return value.trim().replace(/\s+/g, ' ');
}

export function isFullName(value: string): boolean {
  const normalized = normalizeFullName(value);
  const parts = normalized.split(' ');

  return (
    parts.length >= 2 &&
    parts.every(part => part.length >= 2 && NAME_PART_PATTERN.test(part))
  );
}
