import type { Vector3 } from "@minecraft/server";
export declare function testIsWithinRanges(blockvolumes: {
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
}[], location: Vector3): boolean;
