import type { Vector3 } from "@minecraft/server";
export declare function splitArea(area: {
    from: Vector3;
    to: Vector3;
}, sizes?: Vector3): Generator<[from: Vector3, to: Vector3, indices: Vector3, offset: Vector3], void, unknown>;
