import { Kysely, SqliteDialect } from "kysely";
import Database from "better-sqlite3";

export const db = new Kysely<any>({
  dialect: new SqliteDialect({
    database: new Database("streams.db"),
  }),
});
