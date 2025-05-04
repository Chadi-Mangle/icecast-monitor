import { serve } from "@hono/node-server";
import { Hono } from "hono";
import * as env from "#env";
import {
  getIceCastMountpointsList,
  getIceCastSources,
  getIceCastStatus,
} from "#utils/icecast";

export const api = new Hono();

api.get("/", (c) => c.text("IceCast server monitoring API"));

api.get("/mountpoints", async (c) => {
  const status = await getIceCastStatus();
  const sources = getIceCastSources(status);
  const mountpoints = getIceCastMountpointsList(sources);

  return c.json(mountpoints);
});

export const audio = new Hono();

audio.get("/main", async (c) => {
  const status = await getIceCastStatus();
  const sources = getIceCastSources(status);
  const mountpoints = getIceCastMountpointsList(sources);
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
