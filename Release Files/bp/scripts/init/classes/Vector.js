import { Vector3Builder, Vector3Utils, VECTOR3_ZERO, VECTOR3_ONE, VECTOR3_UP, VECTOR3_DOWN, VECTOR3_NORTH, VECTOR3_SOUTH, VECTOR3_EAST, VECTOR3_WEST, VECTOR3_RIGHT, VECTOR3_LEFT, VECTOR3_BACK, VECTOR3_FORWARD, } from "@minecraft/math.js";
var exports;
(function (exports) {
    /**
     * Utilities operating on Vector3 objects.
     *
     * This is a mixture of the {@link Vector3Builder} and {@link Vector3Utils} classes.
     */
    class Vector extends Vector3Builder {
        /**
         * zero
         *
         * A unit vector representing the value of 0 in all directions (0,0,0)
         *
         * @public
         */
        zero = VECTOR3_ZERO;
        /**
         * one
         *
         * A unit vector representing the value of 1 in all directions (1,1,1)
         *
         * @public
         */
        one = VECTOR3_ONE;
        /**
         * up
         *
         * A unit vector representing the world UP direction (0,1,0)
         *
         * @public
         */
        up = VECTOR3_UP;
        /**
         * down
         *
         * A unit vector representing the world DOWN direction (0,-1,0)
         *
         * @public
         */
        down = VECTOR3_DOWN;
        /**
         * north
         *
         * A unit vector representing the world NORTH direction (0,0,1)
         *   (same as FORWARD)
         *
         * @public
         */
        north = VECTOR3_NORTH;
        /**
         * south
         *
         * A unit vector representing the world SOUTH direction (0,0,-1)
         *   (same as BACK)
         *
         * @public
         */
        south = VECTOR3_SOUTH;
        /**
         * east
         *
         * A unit vector representing the world EAST direction (1,0,0)
         *   (same as RIGHT)
         *
         * @public
         */
        east = VECTOR3_EAST;
        /**
         * west
         *
         * A unit vector representing the world WEST direction (-1,0,0)
         *   (same as LEFT)
         *
         * @public
         */
        west = VECTOR3_WEST;
        /**
         * right
         *
         * A unit vector representing the world RIGHT direction (1,0,0)
         *
         * @public
         */
        right = VECTOR3_RIGHT;
        /**
         * left
         *
         * A unit vector representing the world LEFT direction (-1,0,0)
         *
         * @public
         */
        left = VECTOR3_LEFT;
        /**
         * back
         *
         * A unit vector representing the world BACK direction (0,0,-1)
         *
         * @public
         */
        back = VECTOR3_BACK;
        /**
         * forward
         *
         * A unit vector representing the world FORWARD direction (0,0,1)
         *
         * @public
         */
        forward = VECTOR3_FORWARD;
        /**
         * zero
         *
         * A unit vector representing the value of 0 in all directions (0,0,0)
         *
         * @public
         */
        static zero = VECTOR3_ZERO;
        /**
         * one
         *
         * A unit vector representing the value of 1 in all directions (1,1,1)
         *
         * @public
         */
        static one = VECTOR3_ONE;
        /**
         * up
         *
         * A unit vector representing the world UP direction (0,1,0)
         *
         * @public
         */
        static up = VECTOR3_UP;
        /**
         * down
         *
         * A unit vector representing the world DOWN direction (0,-1,0)
         *
         * @public
         */
        static down = VECTOR3_DOWN;
        /**
         * north
         *
         * A unit vector representing the world NORTH direction (0,0,1)
         *   (same as FORWARD)
         *
         * @public
         */
        static north = VECTOR3_NORTH;
        /**
         * south
         *
         * A unit vector representing the world SOUTH direction (0,0,-1)
         *   (same as BACK)
         *
         * @public
         */
        static south = VECTOR3_SOUTH;
        /**
         * east
         *
         * A unit vector representing the world EAST direction (1,0,0)
         *   (same as RIGHT)
         *
         * @public
         */
        static east = VECTOR3_EAST;
        /**
         * west
         *
         * A unit vector representing the world WEST direction (-1,0,0)
         *   (same as LEFT)
         *
         * @public
         */
        static west = VECTOR3_WEST;
        /**
         * right
         *
         * A unit vector representing the world RIGHT direction (1,0,0)
         *
         * @public
         */
        static right = VECTOR3_RIGHT;
        /**
         * left
         *
         * A unit vector representing the world LEFT direction (-1,0,0)
         *
         * @public
         */
        static left = VECTOR3_LEFT;
        /**
         * back
         *
         * A unit vector representing the world BACK direction (0,0,-1)
         *
         * @public
         */
        static back = VECTOR3_BACK;
        /**
         * forward
         *
         * A unit vector representing the world FORWARD direction (0,0,1)
         *
         * @public
         */
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
        /**
         * toString
         *
         * Create a string representation of a vector3
         */
        static toString = Vector3Utils.toString;
    }
    exports.Vector = Vector;
})(exports || (exports = {}));
Object.defineProperty(globalThis, "Vector", {
    value: exports.Vector,
    enumerable: true,
    configurable: true,
    writable: false,
});
//# sourceMappingURL=Vector.js.map