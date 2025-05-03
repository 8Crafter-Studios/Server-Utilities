import type { Vector3 } from "@minecraft/server";
export declare function splitAreaB(area: {
    from: Vector3;
    to: Vector3;
}, sizes?: Vector3): Generator<{
    from: {
        x: number;
        y: number;
        z: number;
    };
    to: {
        x: number;
        y: number;
        z: number;
    };
    indices: {
        x: number;
        y: number;
        z: number;
    };
    offset: {
        x: number;
        y: number;
        z: number;
    };
}, void, unknown>;
