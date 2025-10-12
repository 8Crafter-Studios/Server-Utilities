import { type Vector3 } from "@minecraft/server";
export interface ILocalTeleport {
    sway_1: number;
    heave_2: number;
    surge_3: number;
}
export declare const LocalTeleportFunctions: {
    norm: ({ x, y, z }: Vector3, s: number) => Vector3;
    xa: ({ x, y, z }: Vector3, s: number) => Vector3;
    ya: ({ x, y, z }: Vector3, s: number) => Vector3;
    za: (a: Vector3, s: number) => Vector3;
};
