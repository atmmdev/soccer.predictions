export function buildJoinPoolUrl(inviteCode: string): string {
  const origin =
    typeof window !== 'undefined'
      ? window.location.origin
      : (process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000');

  return `${origin}/join/${inviteCode.trim().toUpperCase()}`;
}
