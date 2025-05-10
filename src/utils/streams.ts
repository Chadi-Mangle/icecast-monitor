import { db } from "#database";

async function addStreams(streams: Streams) {
  await db.insertInto("streams").values(streams).execute();
  await db.destroy();
}
