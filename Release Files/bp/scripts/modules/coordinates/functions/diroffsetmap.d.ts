import type { Direction } from "@minecraft/server";
export declare function diroffsetmap(direction: Direction): ({
    x: 0;
    y: 1;
    z: 0;
} & import("@minecraft/server").Vector3) | ({
    x: 0;
    y: -1;
    z: 0;
} & import("@minecraft/server").Vector3) | ({
    x: 1;
    y: 0;
    z: 0;
} & import("@minecraft/server").Vector3) | ({
    x: -1;
    y: 0;
    z: 0;
} & import("@minecraft/server").Vector3) | ({
    x: 0;
    y: 0;
    z: 1;
} & import("@minecraft/server").Vector3) | ({
    x: 0;
    y: 0;
    z: -1;
} & import("@minecraft/server").Vector3);
