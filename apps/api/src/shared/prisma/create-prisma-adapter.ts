import { PrismaMariaDb } from '@prisma/adapter-mariadb';

/**
 * MySQL 8 usa caching_sha2_password; o driver mariadb precisa desta flag em dev.
 * @see https://github.com/mariadb-corporation/mariadb-connector-nodejs
 */
export function withMariaDbConnectionDefaults(databaseUrl: string): string {
  if (databaseUrl.includes('allowPublicKeyRetrieval')) {
    return databaseUrl;
  }

  const separator = databaseUrl.includes('?') ? '&' : '?';

  return `${databaseUrl}${separator}allowPublicKeyRetrieval=true`;
}

export function createPrismaAdapter(databaseUrl: string): PrismaMariaDb {
  return new PrismaMariaDb(withMariaDbConnectionDefaults(databaseUrl));
}
