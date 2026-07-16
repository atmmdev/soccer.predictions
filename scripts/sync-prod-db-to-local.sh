#!/usr/bin/env bash
# Copia o MySQL da Hostinger para o Docker local.
# Uso (na raiz do repo):
#   bash scripts/sync-prod-db-to-local.sh
#
# Requisitos:
# - Docker com soccer_predictions_mysql rodando
# - Variáveis PROD_DB_* OU DATABASE_URL_PROD no ambiente (nunca commitadas)
# - NÃO rode start:dev apontando para srv*.hstgr.io

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DUMP_FILE="${ROOT}/tmp/prod-dump.sql"
CONTAINER="${MYSQL_CONTAINER:-soccer_predictions_mysql}"

if [[ -z "${DATABASE_URL_PROD:-}" && -z "${PROD_DB_HOST:-}" ]]; then
  echo "Defina DATABASE_URL_PROD ou PROD_DB_HOST/USER/PASSWORD/NAME."
  echo "Exemplo:"
  echo "  export DATABASE_URL_PROD='mysql://USER:PASS@srv752.hstgr.io:3306/DB'"
  exit 1
fi

if [[ -n "${DATABASE_URL_PROD:-}" ]]; then
  # mysql://user:pass@host:port/db
  PROD_DB_USER="$(printf '%s' "$DATABASE_URL_PROD" | sed -E 's#mysql://([^:]+):.*#\1#')"
  PROD_DB_PASSWORD="$(printf '%s' "$DATABASE_URL_PROD" | sed -E 's#mysql://[^:]+:([^@]+)@.*#\1#')"
  PROD_DB_HOST="$(printf '%s' "$DATABASE_URL_PROD" | sed -E 's#mysql://[^@]+@([^:/]+).*#\1#')"
  PROD_DB_PORT="$(printf '%s' "$DATABASE_URL_PROD" | sed -E 's#.*:([0-9]+)/.*#\1#')"
  PROD_DB_NAME="$(printf '%s' "$DATABASE_URL_PROD" | sed -E 's#.*/([^?]+).*#\1#')"
fi

PROD_DB_PORT="${PROD_DB_PORT:-3306}"

mkdir -p "${ROOT}/tmp"

echo "[1/3] Dumping production (${PROD_DB_HOST}/${PROD_DB_NAME})..."
docker run --rm mysql:8 mysqldump \
  --host="${PROD_DB_HOST}" \
  --port="${PROD_DB_PORT}" \
  --user="${PROD_DB_USER}" \
  --password="${PROD_DB_PASSWORD}" \
  --single-transaction \
  --routines \
  --triggers \
  --set-gtid-purged=OFF \
  "${PROD_DB_NAME}" \
  > "${DUMP_FILE}"

echo "[2/3] Recreating local schema and importing..."
docker exec -i "${CONTAINER}" mysql -uroot -proot -e \
  "DROP DATABASE IF EXISTS soccer_predictions; CREATE DATABASE soccer_predictions CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; GRANT ALL ON soccer_predictions.* TO 'soccer'@'%'; FLUSH PRIVILEGES;"

docker exec -i "${CONTAINER}" mysql -usoccer -psoccer soccer_predictions < "${DUMP_FILE}"

echo "[3/3] Done. Keep apps/api/.env on Docker:"
echo "  DATABASE_URL=\"mysql://soccer:soccer@127.0.0.1:3306/soccer_predictions?allowPublicKeyRetrieval=true\""
echo "Restart API: cd apps/api && npm run start:dev"
echo "Dump saved at: ${DUMP_FILE}"
