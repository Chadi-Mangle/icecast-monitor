import * as env from "#env";

import { getSubstringAfterLast } from "#utils/strings";

import type {
  IceCastSource,
  IceCastStatus,
  IceCastStatusResponse,
  IceCastMountpoint,
} from "#types";

export async function getIceCastStatus(): Promise<IceCastStatus> {
  const statusUrl = env.ICECAST + "/status-json.xsl";
  const response = await fetch(statusUrl);
  const statusIceCast = (await response.json()) as IceCastStatusResponse;
  return statusIceCast.icestats;
}

export function getIceCastSources(
  statusIceCast: IceCastStatus
): IceCastSource[] {
  const sourceIceCast = statusIceCast.source;
  if (Array.isArray(sourceIceCast)) {
    return sourceIceCast;
  } else if (sourceIceCast) {
    return [sourceIceCast];
  }
  return [];
}

export function getIceCastMountpointsList(
  sourcesIceCast: IceCastSource[]
): IceCastMountpoint[] {
  const mountpointList = sourcesIceCast.map((source) => {
    const sourceName = getSubstringAfterLast(source.listenurl, "/");
    return {
      name: sourceName,
      url: env.ICECAST + "/" + sourceName,
    };
  });

  return mountpointList;
}
