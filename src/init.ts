import { db } from "#database";

export async function main(): Promise<void> {
  const tableExists = await db
    .selectFrom("sqlite_master")
    .select("name")
    .where("type", "=", "table")
    .where("name", "=", "streams")
    .execute();

  if (tableExists.length > 0) {
    console.log("Table 'streams' already exists. Skipping creation.");
    return;
  }

  await db.schema
    .createTable("streams")
    .addColumn("id", "integer", (col) => col.primaryKey())
    .addColumn("name", "text", (col) => col.notNull().unique())
    .addColumn("url", "text", (col) => col.notNull().unique())
    .addColumn("content_type", "text")
    .execute();

  console.log("Streams table created successfully");
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => await db.destroy());
