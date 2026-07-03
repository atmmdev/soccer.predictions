import { PrismaMariaDb } from '@prisma/adapter-mariadb';
export declare function withMariaDbConnectionDefaults(databaseUrl: string): string;
export declare function createPrismaAdapter(databaseUrl: string): PrismaMariaDb;
