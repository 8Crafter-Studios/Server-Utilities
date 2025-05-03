import { Vector3Builder, Vector3Utils, VECTOR3_ZERO, VECTOR3_ONE, VECTOR3_UP, VECTOR3_DOWN, VECTOR3_NORTH, VECTOR3_SOUTH, VECTOR3_EAST, VECTOR3_WEST, VECTOR3_RIGHT, VECTOR3_LEFT, VECTOR3_BACK, VECTOR3_FORWARD } from "@minecraft/math.js";
const VectorClass = class Vector extends Vector3Builder {
    zero = VECTOR3_ZERO;
    one = VECTOR3_ONE;
    up = VECTOR3_UP;
    down = VECTOR3_DOWN;
    north = VECTOR3_NORTH;
    south = VECTOR3_SOUTH;
    east = VECTOR3_EAST;
    west = VECTOR3_WEST;
    right = VECTOR3_RIGHT;
    left = VECTOR3_LEFT;
    back = VECTOR3_BACK;
    forward = VECTOR3_FORWARD;
    static zero = VECTOR3_ZERO;
    static one = VECTOR3_ONE;
    static up = VECTOR3_UP;
    static down = VECTOR3_DOWN;
    static north = VECTOR3_NORTH;
    static south = VECTOR3_SOUTH;
    static east = VECTOR3_EAST;
    static west = VECTOR3_WEST;
    static right = VECTOR3_RIGHT;
    static left = VECTOR3_LEFT;
    static back = VECTOR3_BACK;
    static forward = VECTOR3_FORWARD;
    static add = Vector3Utils.add;
    static clamp = Vector3Utils.clamp;
    static cross = Vector3Utils.cross;
    static distance = Vector3Utils.distance;
    static dot = Vector3Utils.dot;
    static equals = Vector3Utils.equals;
    static floor = Vector3Utils.floor;
    static lerp = Vector3Utils.lerp;
    static magnitude = Vector3Utils.magnitude;
    static multiply = Vector3Utils.multiply;
    static normalize = Vector3Utils.normalize;
    static rotateX = Vector3Utils.rotateX;
    static rotateY = Vector3Utils.rotateY;
    static rotateZ = Vector3Utils.rotateZ;
    static scale = Vector3Utils.scale;
    static slerp = Vector3Utils.slerp;
    static subtract = Vector3Utils.subtract;
};
Object.defineProperty(globalThis, 'Vector', {
    value: VectorClass,
    enumerable: true,
    configurable: true,
    writable: false,
});
//# sourceMappingURL=Vector.js.map