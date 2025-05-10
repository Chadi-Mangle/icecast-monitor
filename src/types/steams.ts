import type { IceCastMountpoint } from "#types";
import { extname } from "path";

// export type Stream = IceCastMountpoint;

export interface Stream extends IceCastMountpoint {
  priority: number;
}
