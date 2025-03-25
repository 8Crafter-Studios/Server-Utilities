import { type Vector3 } from "@minecraft/server";
export declare function getAreas(prefix: string): {
    positive: {
        dimension: number;
        from: Vector3;
        to: Vector3;
        mode: 0 | 1;
        icon_path?: string;
    }[];
    negative: {
        dimension: number;
        from: Vector3;
        to: Vector3;
        mode: 0 | 1;
        icon_path?: string;
    }[];
};
