#!/bin/bash
chmod +x init-db.sh
set -e
psql -v ON_ERROR_STOP=1 --username "postgres" --dbname "postgres" <<-EOSQL
    CREATE DATABASE task_mgmt;
EOSQL