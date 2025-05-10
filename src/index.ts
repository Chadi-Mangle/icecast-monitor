import { serve } from "@hono/node-server";
import { Hono } from "hono";
import * as env from "#env";
import { db } from "#database";
import { getIceCastMountpoints, getIceCastStatus } from "#utils/icecast";

export const api = new Hono();

api.get("/", (c) => c.text("IceCast server monitoring API"));

api.get("/mountpoints", async (c) => {
  const mountpoints = await getIceCastMountpoints();

  return c.json(mountpoints);
});

api.post("/prioritize", async (c) => {
  const body = await c.req.json();
  const name = body["name"];

  const stream = db.selectFrom("streams").selectAll().where("name", "=", name);
  const result = await stream.execute();

  if (result.length > 0) {
    console.log(result);
    return c.json({ status: "ok", result });
  }
  return c.json({ status: "error" });
});

export const audio = new Hono();

audio.get("/main", async (c) => {
  const mountpoints = await getIceCastMountpoints();
  const mountpoint = mountpoints[0];
  const response = await fetch(mountpoint.url);

  const headers = new Headers();
  headers.set("Content-Type", mountpoint.contentType);

  return new Response(response.body, { headers: headers });
});

const app = new Hono();

app.route("/api", api);
app.route("/audio", audio);
app.get("/", (c) => c.redirect("/api"));

serve({ fetch: app.fetch, port: env.PORT });
