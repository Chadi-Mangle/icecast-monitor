import type { Generated } from "kysely";
import type { Stream } from "#types";

export interface Database {
  streams: StreamTable;
}

export interface StreamTable extends Stream {
  id: Generated<number>;
}
