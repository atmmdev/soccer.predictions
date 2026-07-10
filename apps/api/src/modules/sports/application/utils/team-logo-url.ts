export function getTeamLogoPublicUrl(externalId: number): string {
  return `/api/media/teams/${externalId}`;
}
