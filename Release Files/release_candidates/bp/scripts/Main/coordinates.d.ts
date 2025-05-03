import { type Vector3 } from "@minecraft/server";
export interface ILocalTeleport {
    sway_1: number;
    heave_2: number;
    surge_3: number;
}
export declare const LocalTeleportFunctions: {
    norm: ({ x, y, z }: Vector3, s: number) => {
        x: number;
        y: number;
        z: number;
    };
    xa: ({ x, y, z }: Vector3, s: number) => {
        x: number;
        y: number;
        z: number;
    };
    ya: ({ x, y, z }: Vector3, s: number) => {
        x: number;
        y: number;
        z: number;
    };
    za: (a: Vector3, s: number) => {
        x: number;
        y: number;
        z: number;
    };
};
