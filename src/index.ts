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

const app = new Hono();

app.route("/api", api);
app.get("/", (c) => c.redirect("/api"));

serve({ fetch: app.fetch, port: env.PORT });
