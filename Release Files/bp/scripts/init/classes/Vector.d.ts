import { Vector3Utils } from "@minecraft/math.js";
declare const VectorClass: {
    new (vec: import("@minecraft/server").Vector3, arg?: never, arg2?: never): {
        zero: import("@minecraft/server").Vector3;
        one: import("@minecraft/server").Vector3;
        up: import("@minecraft/server").Vector3;
        down: import("@minecraft/server").Vector3;
        north: import("@minecraft/server").Vector3;
        south: import("@minecraft/server").Vector3;
        east: import("@minecraft/server").Vector3;
        west: import("@minecraft/server").Vector3;
        right: import("@minecraft/server").Vector3;
        left: import("@minecraft/server").Vector3;
        back: import("@minecraft/server").Vector3;
        forward: import("@minecraft/server").Vector3;
        x: number;
        y: number;
        z: number;
        assign(vec: import("@minecraft/server").Vector3): /*elided*/ any;
        equals(v: import("@minecraft/server").Vector3): boolean;
        add(v: Partial<import("@minecraft/server").Vector3>): /*elided*/ any;
        subtract(v: Partial<import("@minecraft/server").Vector3>): /*elided*/ any;
        scale(val: number): /*elided*/ any;
        dot(vec: import("@minecraft/server").Vector3): number;
        cross(vec: import("@minecraft/server").Vector3): /*elided*/ any;
        magnitude(): number;
        distance(vec: import("@minecraft/server").Vector3): number;
        normalize(): /*elided*/ any;
        floor(): /*elided*/ any;
        toString(options?: {
            decimals?: number;
            delimiter?: string;
        }): string;
        clamp(limits: {
            min?: Partial<import("@minecraft/server").Vector3>;
            max?: Partial<import("@minecraft/server").Vector3>;
        }): /*elided*/ any;
        lerp(vec: import("@minecraft/server").Vector3, t: number): /*elided*/ any;
        slerp(vec: import("@minecraft/server").Vector3, t: number): /*elided*/ any;
        multiply(vec: import("@minecraft/server").Vector3): /*elided*/ any;
        rotateX(a: number): /*elided*/ any;
        rotateY(a: number): /*elided*/ any;
        rotateZ(a: number): /*elided*/ any;
    };
    new (x: number, y: number, z: number): {
        zero: import("@minecraft/server").Vector3;
        one: import("@minecraft/server").Vector3;
        up: import("@minecraft/server").Vector3;
        down: import("@minecraft/server").Vector3;
        north: import("@minecraft/server").Vector3;
        south: import("@minecraft/server").Vector3;
        east: import("@minecraft/server").Vector3;
        west: import("@minecraft/server").Vector3;
        right: import("@minecraft/server").Vector3;
        left: import("@minecraft/server").Vector3;
        back: import("@minecraft/server").Vector3;
        forward: import("@minecraft/server").Vector3;
        x: number;
        y: number;
        z: number;
        assign(vec: import("@minecraft/server").Vector3): /*elided*/ any;
        equals(v: import("@minecraft/server").Vector3): boolean;
        add(v: Partial<import("@minecraft/server").Vector3>): /*elided*/ any;
        subtract(v: Partial<import("@minecraft/server").Vector3>): /*elided*/ any;
        scale(val: number): /*elided*/ any;
        dot(vec: import("@minecraft/server").Vector3): number;
        cross(vec: import("@minecraft/server").Vector3): /*elided*/ any;
        magnitude(): number;
        distance(vec: import("@minecraft/server").Vector3): number;
        normalize(): /*elided*/ any;
        floor(): /*elided*/ any;
        toString(options?: {
            decimals?: number;
            delimiter?: string;
        }): string;
        clamp(limits: {
            min?: Partial<import("@minecraft/server").Vector3>;
            max?: Partial<import("@minecraft/server").Vector3>;
        }): /*elided*/ any;
        lerp(vec: import("@minecraft/server").Vector3, t: number): /*elided*/ any;
        slerp(vec: import("@minecraft/server").Vector3, t: number): /*elided*/ any;
        multiply(vec: import("@minecraft/server").Vector3): /*elided*/ any;
        rotateX(a: number): /*elided*/ any;
        rotateY(a: number): /*elided*/ any;
        rotateZ(a: number): /*elided*/ any;
    };
    zero: import("@minecraft/server").Vector3;
    one: import("@minecraft/server").Vector3;
    up: import("@minecraft/server").Vector3;
    down: import("@minecraft/server").Vector3;
    north: import("@minecraft/server").Vector3;
    south: import("@minecraft/server").Vector3;
    east: import("@minecraft/server").Vector3;
    west: import("@minecraft/server").Vector3;
    right: import("@minecraft/server").Vector3;
    left: import("@minecraft/server").Vector3;
    back: import("@minecraft/server").Vector3;
    forward: import("@minecraft/server").Vector3;
    add: typeof Vector3Utils.add;
    clamp: typeof Vector3Utils.clamp;
    cross: typeof Vector3Utils.cross;
    distance: typeof Vector3Utils.distance;
    dot: typeof Vector3Utils.dot;
    equals: typeof Vector3Utils.equals;
    floor: typeof Vector3Utils.floor;
    lerp: typeof Vector3Utils.lerp;
    magnitude: typeof Vector3Utils.magnitude;
    normalize: typeof Vector3Utils.normalize;
    scale: typeof Vector3Utils.scale;
    slerp: typeof Vector3Utils.slerp;
    subtract: typeof Vector3Utils.subtract;
};
declare global {
    namespace globalThis {
        const Vector: typeof VectorClass;
    }
}
export {};
