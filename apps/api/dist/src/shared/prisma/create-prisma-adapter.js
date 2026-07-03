"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withMariaDbConnectionDefaults = withMariaDbConnectionDefaults;
exports.createPrismaAdapter = createPrismaAdapter;
const adapter_mariadb_1 = require("@prisma/adapter-mariadb");
function withMariaDbConnectionDefaults(databaseUrl) {
    if (databaseUrl.includes('allowPublicKeyRetrieval')) {
        return databaseUrl;
    }
    const separator = databaseUrl.includes('?') ? '&' : '?';
    return `${databaseUrl}${separator}allowPublicKeyRetrieval=true`;
}
function createPrismaAdapter(databaseUrl) {
    return new adapter_mariadb_1.PrismaMariaDb(withMariaDbConnectionDefaults(databaseUrl));
}
//# sourceMappingURL=create-prisma-adapter.js.map