import { Block, Dimension, DimensionType, Player, world, Entity, system, BlockVolume, CompoundBlockVolume, BoundingBoxUtils, Direction, StructureSaveMode, Structure, BlockPermutation } from "@minecraft/server";
import { format_version, config, dimensionsb, dimensionsc } from "../Main";
import { listoftransformrecipes } from "Assets/constants/transformrecipes";
import * as GameTest from "@minecraft/server-gametest";
import * as mcServer from "@minecraft/server";
import * as mcServerUi from "@minecraft/server-ui"; /*
import * as mcServerAdmin from "@minecraft/server-admin";*/ /*
import * as mcDebugUtilities from "@minecraft/debug-utilities";*/ /*
import * as mcCommon from "@minecraft/common";*/ /*
import * as mcVanillaData from "@minecraft/vanilla-data";*/
import * as main from "../Main";
import * as transformrecipes from "Assets/constants/transformrecipes";
import * as coords from "Main/coordinates";
import * as cmds from "Main/commands";
import * as bans from "Main/ban";
import * as uis from "Main/ui";
import * as playersave from "Main/player_save";
import * as spawnprot from "Main/spawn_protection";
import * as chat from "./chat";
import * as cmdutils from "./command_utilities";
import * as utils from "./utilities";
import * as errors from "./errors";
import mcMath from "@minecraft/math.js";
import { vTStr } from "Main/commands";
import { targetSelectorAllListC, targetSelectorAllListE } from "./command_utilities";
import { shuffle } from "./utilities";
import { NoSelectorMatchesError } from "./errors";
mcServer;
mcServerUi; /*
mcServerAdmin*/ /*
mcDebugUtilities*/ /*
mcCommon*/
GameTest; /*
mcVanillaData*/
main;
coords;
cmds;
bans;
uis;
playersave;
spawnprot;
mcMath;
export const coordinates_format_version = "7.0.0";
export class Vector extends mcMath.Vector3Builder {
    zero = mcMath.VECTOR3_ZERO;
    one = mcMath.VECTOR3_ONE;
    up = mcMath.VECTOR3_UP;
    down = mcMath.VECTOR3_DOWN;
    north = mcMath.VECTOR3_NORTH;
    south = mcMath.VECTOR3_SOUTH;
    east = mcMath.VECTOR3_EAST;
    west = mcMath.VECTOR3_WEST;
    right = mcMath.VECTOR3_RIGHT;
    left = mcMath.VECTOR3_LEFT;
    back = mcMath.VECTOR3_BACK;
    forward = mcMath.VECTOR3_FORWARD;
    static zero = mcMath.VECTOR3_ZERO;
    static one = mcMath.VECTOR3_ONE;
    static up = mcMath.VECTOR3_UP;
    static down = mcMath.VECTOR3_DOWN;
    static north = mcMath.VECTOR3_NORTH;
    static south = mcMath.VECTOR3_SOUTH;
    static east = mcMath.VECTOR3_EAST;
    static west = mcMath.VECTOR3_WEST;
    static right = mcMath.VECTOR3_RIGHT;
    static left = mcMath.VECTOR3_LEFT;
    static back = mcMath.VECTOR3_BACK;
    static forward = mcMath.VECTOR3_FORWARD;
    static add = mcMath.Vector3Utils.add;
    static clamp = mcMath.Vector3Utils.clamp;
    static cross = mcMath.Vector3Utils.cross;
    static distance = mcMath.Vector3Utils.distance;
    static dot = mcMath.Vector3Utils.dot;
    static equals = mcMath.Vector3Utils.equals;
    static floor = mcMath.Vector3Utils.floor;
    static lerp = mcMath.Vector3Utils.lerp;
    static magnitude = mcMath.Vector3Utils.magnitude;
    static normalize = mcMath.Vector3Utils.normalize;
    static scale = mcMath.Vector3Utils.scale;
    static slerp = mcMath.Vector3Utils.slerp;
    static subtract = mcMath.Vector3Utils.subtract;
}
export class WorldPosition {
    x;
    y;
    z;
    rotx;
    roty;
    dimension;
    entity;
    block;
    sendErrorsTo;
    constructor(location, rotation, dimension, entity, block, sendErrorsTo) {
        this.location = location;
        this.rotation = rotation;
        if (dimension == undefined) { }
        else {
            this.dimension = world.getDimension(dimension?.typeId ?? dimension?.id ?? dimension);
        }
        ;
        this.entity = entity;
        this.block = block;
        this.sendErrorsTo = sendErrorsTo; /*
        if(dimension.constructor.name == DimensionType.constructor.name){this.dimension = world.getDimension((dimension as DimensionType)?.typeId)}else{this.dimension = world.getDimension((dimension as Dimension)?.id)}; */
    }
    get location() {
        return { x: this.x, y: this.y, z: this.z };
    }
    get locationstring() {
        return this.x + " " + this.y + " " + this.z;
    }
    get rotation() {
        return { x: this.rotx, y: this.roty };
    }
    get rotationstring() {
        return this.rotx + " " + this.roty;
    }
    get locationrotation() {
        return { x: this.x, y: this.y, z: this.z, rotX: this.rotx, rotY: this.roty };
    }
    get directionvector() {
        return anglesToDirectionVectorDeg(this.rotx, this.roty);
    }
    set location(location) {
        this.x = location.x;
        this.y = location.y;
        this.z = location.z;
    }
    set rotation(rotation) {
        this.rotx = rotation.x;
        this.roty = rotation.y;
    }
    positioned(coordinateText) {
        this.location = coordinates(coordinateText, this.location, this.rotation);
        return this;
    }
    in(dimension) {
        if (dimension == undefined) {
            this.dimension = undefined;
        }
        else {
            this.dimension = world.getDimension(dimension?.typeId ?? dimension?.id ?? dimension);
        }
        ;
        return this;
    }
    rotated(x, y) {
        if (x.toString().startsWith("~")) {
            this.rotx = (((this.rotx + Number(x.toString().slice(1) ?? "0") + 180) % 360) - 180);
        }
        else {
            this.rotx = Number(x.toString() ?? "0");
        }
        ;
        if (y.toString().startsWith("~")) {
            this.roty = (((this.roty + Number(y.toString().slice(1) ?? "0") + 90) % 180) - 90);
        }
        else {
            this.roty = Number(y.toString() ?? "0");
        }
        ;
        return this;
    }
    at(target) {
        let worldpositionlist = [];
        if (target.constructor.name == "Array") {
            let entities = target;
            if (entities.length == 0) {
                throw (new NoSelectorMatchesError("No targets matched selector"));
            }
            ;
            worldpositionlist = entities.map(entity => new WorldPosition(entity?.location ?? this.location, tryget(() => entity?.getRotation()) ?? this.rotation, entity.dimension ?? this.dimension, this.entity, this.block, this.sendErrorsTo));
        }
        else {
            if (this.entity == undefined) {
                let entities = targetSelectorAllListE(target, this.x + " " + this.y + " " + this.z);
                if (entities.length == 0) {
                    throw (new NoSelectorMatchesError("No targets matched selector"));
                }
                ;
                worldpositionlist = entities.map(entity => new WorldPosition(entity?.location ?? this.location, tryget(() => entity?.getRotation()) ?? this.rotation, entity.dimension ?? this.dimension, this.entity, this.block, this.sendErrorsTo));
            }
            else {
                let entities = targetSelectorAllListC(target, "", this.x + " " + this.y + " " + this.z, this.entity);
                if (entities.length == 0) {
                    throw (new NoSelectorMatchesError("No targets matched selector"));
                }
                ;
                worldpositionlist = entities.map(entity => new WorldPosition(entity?.location ?? this.location, tryget(() => entity?.getRotation()) ?? this.rotation, entity.dimension ?? this.dimension, this.entity, this.block, this.sendErrorsTo));
            }
        }
        return worldpositionlist;
    }
    setSendErrorsTo(target) {
        if (target.constructor.name == "Array") {
            let entities = target;
            if (entities.length == 0) {
                throw (new NoSelectorMatchesError("No targets matched selector"));
            }
            ;
            this.sendErrorsTo = entities.length == 1 ? entities[0] : entities;
        }
        else {
            if (this.entity == undefined) {
                let entities = targetSelectorAllListE(target, this.x + " " + this.y + " " + this.z);
                if (entities.length == 0) {
                    throw (new NoSelectorMatchesError("No targets matched selector"));
                }
                ;
                this.sendErrorsTo = entities.length == 1 ? entities[0] : entities;
            }
            else {
                let entities = targetSelectorAllListC(target, "", this.x + " " + this.y + " " + this.z, this.entity);
                if (entities.length == 0) {
                    throw (new NoSelectorMatchesError("No targets matched selector"));
                }
                ;
                this.sendErrorsTo = entities.length == 1 ? entities[0] : entities;
            }
        }
        return this;
    }
    clearSendErrorsTo() {
        this.sendErrorsTo = null;
        return this;
    }
    resetSendErrorsTo() {
        this.sendErrorsTo = undefined;
        return this;
    }
    as(target) {
        let entitylist = [];
        if (target.constructor.name == "Array") {
            entitylist = target;
        }
        else {
            if (this.entity == undefined) {
                this.entity = targetSelectorAllListE(target, this.x + " " + this.y + " " + this.z)[0];
            }
            else {
                entitylist = targetSelectorAllListC(target, "", this.x + " " + this.y + " " + this.z, this.entity);
            }
        }
        return entitylist.map(v => new WorldPosition(this.location, this.rotation, this.dimension, v, this.block, this.sendErrorsTo));
    }
    asblock(block) {
        if (block.constructor.name == "Block") {
            this.block = block;
        }
        else {
            this.block = block.dimension.getBlock(block);
        }
        ;
        return this;
    }
    matchrotation(target) {
        let worldpositionlist = [];
        if (target.constructor.name == "Array") {
            let entities = target;
            if (entities.length == 0) {
                throw (new NoSelectorMatchesError("No targets matched selector"));
            }
            ;
            worldpositionlist = entities.map(entity => new WorldPosition(this.location, tryget(() => entity?.getRotation()) ?? this.rotation, this.dimension, this.entity, this.block, this.sendErrorsTo));
        }
        else {
            if (this.entity == undefined) {
                let entities = targetSelectorAllListE(target, this.x + " " + this.y + " " + this.z);
                if (entities.length == 0) {
                    throw (new NoSelectorMatchesError("No targets matched selector"));
                }
                ;
                worldpositionlist = entities.map(entity => new WorldPosition(this.location, tryget(() => entity?.getRotation()) ?? this.rotation, this.dimension, this.entity, this.block, this.sendErrorsTo));
            }
            else {
                let entities = targetSelectorAllListC(target, "", this.x + " " + this.y + " " + this.z, this.entity);
                if (entities.length == 0) {
                    throw (new NoSelectorMatchesError("No targets matched selector"));
                }
                ;
                worldpositionlist = entities.map(entity => new WorldPosition(this.location, tryget(() => entity?.getRotation()) ?? this.rotation, this.dimension, this.entity, this.block, this.sendErrorsTo));
            }
        }
        return worldpositionlist;
    }
    matchlocation(target) {
        let worldpositionlist = [];
        if (target.constructor.name == "Array") {
            let entities = target;
            if (entities.length == 0) {
                throw (new NoSelectorMatchesError("No targets matched selector"));
            }
            ;
            worldpositionlist = entities.map(entity => new WorldPosition(entity?.location ?? this.location, this.rotation, this.dimension, this.entity, this.block, this.sendErrorsTo));
        }
        else {
            if (this.entity == undefined) {
                let entities = targetSelectorAllListE(target, this.x + " " + this.y + " " + this.z);
                if (entities.length == 0) {
                    throw (new NoSelectorMatchesError("No targets matched selector"));
                }
                ;
                worldpositionlist = entities.map(entity => new WorldPosition(entity?.location ?? this.location, this.rotation, this.dimension, this.entity, this.block, this.sendErrorsTo));
            }
            else {
                let entities = targetSelectorAllListC(target, "", this.x + " " + this.y + " " + this.z, this.entity);
                if (entities.length == 0) {
                    throw (new NoSelectorMatchesError("No targets matched selector"));
                }
                ;
                worldpositionlist = entities.map(entity => new WorldPosition(entity?.location ?? this.location, this.rotation, this.dimension, this.entity, this.block, this.sendErrorsTo));
            }
        }
        return worldpositionlist;
    }
    matchdimension(target) {
        let worldpositionlist = [];
        if (target.constructor.name == "Array") {
            let entities = target;
            if (entities.length == 0) {
                throw (new NoSelectorMatchesError("No targets matched selector"));
            }
            ;
            worldpositionlist = entities.map(entity => new WorldPosition(this.location, this.rotation, entity?.dimension ?? this.dimension, this.entity, this.block, this.sendErrorsTo));
        }
        else {
            if (this.entity == undefined) {
                let entities = targetSelectorAllListE(target, this.x + " " + this.y + " " + this.z);
                if (entities.length == 0) {
                    throw (new NoSelectorMatchesError("No targets matched selector"));
                }
                ;
                worldpositionlist = entities.map(entity => new WorldPosition(this.location, this.rotation, entity?.dimension ?? this.dimension, this.entity, this.block, this.sendErrorsTo));
            }
            else {
                let entities = targetSelectorAllListC(target, "", this.x + " " + this.y + " " + this.z, this.entity);
                if (entities.length == 0) {
                    throw (new NoSelectorMatchesError("No targets matched selector"));
                }
                ;
                worldpositionlist = entities.map(entity => new WorldPosition(this.location, this.rotation, entity?.dimension ?? this.dimension, this.entity, this.block, this.sendErrorsTo));
            }
        }
        return worldpositionlist;
    }
    anchored(anchor) {
        if (this.entity != undefined) {
            if (anchor.toLowerCase().includes("feet")) {
                this.location = this.entity.location;
            }
            ;
            if (anchor.toLowerCase().includes("eyes")) {
                this.location = this.entity.getHeadLocation();
            }
            ;
        }
        ;
        return this;
    }
    resetRotation() {
        if (this.entity != undefined) {
            this.rotation = this.entity.getRotation();
        }
        ;
        return this;
    }
    facing(location) {
        this.rotation = facingPoint(this.location, location).rot;
        return this;
    }
    facingEntity(target) {
        let worldpositionlist = [];
        if (target.constructor.name == "Array") {
            let entities = target;
            if (entities.length == 0) {
                throw (new NoSelectorMatchesError("No targets matched selector"));
            }
            ;
            worldpositionlist = entities.map(entity => new WorldPosition(this.location, facingPoint(this.location, entity.location).rot, this.dimension, this.entity, this.block, this.sendErrorsTo));
        }
        else {
            if (this.entity == undefined) {
                let entities = targetSelectorAllListE(target, this.x + " " + this.y + " " + this.z);
                if (entities.length == 0) {
                    throw (new NoSelectorMatchesError("No targets matched selector"));
                }
                ;
                worldpositionlist = entities.map(entity => new WorldPosition(this.location, facingPoint(this.location, entity.location).rot, this.dimension, this.entity, this.block, this.sendErrorsTo));
            }
            else {
                let entities = targetSelectorAllListC(target, "", this.x + " " + this.y + " " + this.z, this.entity);
                if (entities.length == 0) {
                    throw (new NoSelectorMatchesError("No targets matched selector"));
                }
                ;
                worldpositionlist = entities.map(entity => new WorldPosition(this.location, facingPoint(this.location, entity.location).rot, this.dimension, this.entity, this.block, this.sendErrorsTo));
            }
        }
        return worldpositionlist;
    }
    align(axis) {
        if (axis.toLowerCase().includes("x")) {
            this.x = Math.round(this.x);
        }
        ;
        if (axis.toLowerCase().includes("y")) {
            this.y = Math.round(this.y);
        }
        ;
        if (axis.toLowerCase().includes("z")) {
            this.z = Math.round(this.z);
        }
        ;
        return this;
    }
    offset(offset) {
        this.location = mcMath.Vector3Utils.add(this.location, offset);
        return this;
    }
    static fromentity(entity) {
        return new WorldPosition(entity?.location, entity?.getRotation(), entity?.dimension, entity, undefined, entity);
    }
    static fromblock(block) {
        const fdcb = [{ x: 90, y: 0 }, { x: -90, y: 0 }, { x: 0, y: 180 }, { x: 0, y: 0 }, { x: 0, y: 90 }, { x: 0, y: -90 }];
        return new WorldPosition(block?.location, fdcb[Number(block?.permutation?.getState("facing_direction") ?? block?.permutation?.getState("minecraft:facing_direction") ?? 3) ?? 3] ?? { x: 0, y: 0 }, block?.dimension, undefined, block);
    }
}
;
export const LocalTeleportFunctions = {
    norm: ({ x, y, z }, s) => {
        const l = Math.hypot(x, y, z);
        return {
            x: s * (x / l),
            y: s * (y / l),
            z: s * (z / l)
        };
    },
    xa: ({ x, y, z }, s) => {
        const m = Math.hypot(x, z);
        const a = {
            x: z,
            y: 0,
            z: -x
        };
        return LocalTeleportFunctions.norm(a, s);
    },
    ya: ({ x, y, z }, s) => {
        const m = Math.hypot(x, z);
        const a = {
            x: (x / m) * -y,
            y: m,
            z: (z / m) * -y
        };
        return LocalTeleportFunctions.norm(a, s);
    },
    za: (a, s) => {
        return LocalTeleportFunctions.norm(a, s);
    }
};
Object.defineProperty(String.prototype, 'localTeleport', { value: function (localTeleport) {
        const { sway_1, heave_2, surge_3 } = localTeleport;
        const { location } = this;
        const viewDirection = this.getViewDirection();
        const xx = LocalTeleportFunctions.xa(viewDirection, sway_1);
        const yy = LocalTeleportFunctions.ya(viewDirection, heave_2);
        const zz = LocalTeleportFunctions.za(viewDirection, surge_3);
        const newPosition = {
            x: location.x + xx.x + yy.x + zz.x,
            y: location.y + xx.y + yy.y + zz.y,
            z: location.z + xx.z + yy.z + zz.z
        };
        this.teleport(newPosition);
    } });
export function getDistance(point1, point2) {
    const deltaX = point2.x - point1.x;
    const deltaY = point2.y - point1.y;
    const deltaZ = point2.z - point1.z;
    return Math.sqrt(deltaX ** 2 + deltaY ** 2 + deltaZ ** 2);
}
/**
 * @deprecated Use {@link getChunkIndexC} instead.
 * @param location
 * @returns
 */
export function getChunkIndex(location) { return { x: Math.floor(location.x / 16), y: Math.floor(location.z / 16) }; }
/**
 * @deprecated Use {@link getChunkIndexC} instead.
 * @param x
 * @param z
 * @returns
 */
export function getChunkIndexB(x, z) { return { x: Math.floor(x / 16), y: Math.floor(z / 16) }; }
/**
 * @deprecated
 * @param location
 * @returns
 */
export function getChunkIndexC(location) { return { x: Math.floor(location.x / 16), y: Math.floor(location.y / 16) }; }
/**
 * The newest and recommended version of this function to use.
 * @param location
 * @returns A VectorXZ object containg the chunk index.
 */
export function getChunkIndexD(location) { return { x: Math.floor(location.x / 16), z: Math.floor(location.z / 16) }; }
/**
 * @deprecated Use {@link chunkIndexToBoundingBoxXZ} instead.
 * @param chunkIndex
 * @param heightRange
 * @returns
 */
export function chunkIndexToBoundingBox(chunkIndex, heightRange = [-64, 320]) { return { from: { x: Math.floor(chunkIndex.x * 16), y: heightRange[0], z: Math.floor(chunkIndex.y * 16) }, to: { x: Math.round((chunkIndex.x * 16) + 15), y: heightRange[1], z: Math.round((chunkIndex.y * 16) + 15) } }; }
/**
 * @deprecated Use {@link chunkIndexToBoundingBoxXZB} instead.
 * @param chunkIndex
 * @param heightRange
 * @returns
 */
export function chunkIndexToBoundingBoxB(chunkIndex, heightRange = { min: -64, max: 320 }) { return { from: { x: Math.floor(chunkIndex.x * 16), y: heightRange.min, z: Math.floor(chunkIndex.y * 16) }, to: { x: Math.round((chunkIndex.x * 16) + 15), y: heightRange.max, z: Math.round((chunkIndex.y * 16) + 15) } }; }
export function chunkIndexToBoundingBoxXZ(chunkIndex, heightRange = [-64, 320]) { return { from: { x: Math.floor(chunkIndex.x * 16), y: heightRange[0], z: Math.floor(chunkIndex.y * 16) }, to: { x: Math.round((chunkIndex.x * 16) + 15), y: heightRange[1], z: Math.round((chunkIndex.y * 16) + 15) } }; }
export function chunkIndexToBoundingBoxXZB(chunkIndex, heightRange = { min: -64, max: 320 }) { return { from: { x: Math.floor(chunkIndex.x * 16), y: heightRange.min, z: Math.floor(chunkIndex.y * 16) }, to: { x: Math.round((chunkIndex.x * 16) + 15), y: heightRange.max, z: Math.round((chunkIndex.y * 16) + 15) } }; }
export function doBoundingBoxesIntersect(box1, box2) {
    // Check for intersection along each axis
    const intersectX = (box1.min.x <= box2.max.x && box1.max.x >= box2.min.x);
    const intersectY = (box1.min.y <= box2.max.y && box1.max.y >= box2.min.y);
    const intersectZ = (box1.min.z <= box2.max.z && box1.max.z >= box2.min.z);
    // If all axes intersect, the bounding boxes intersect
    return intersectX && intersectY && intersectZ;
}
Object.defineProperties(Entity.prototype, {
    directionvector: {
        get: function directionvector() {
            return anglesToDirectionVectorDeg(this.rotx, this.roty);
        },
        configurable: true,
        enumerable: true
    },
    chunkIndex: {
        get: function chunkIndex() {
            return getChunkIndexD(this.xz);
        },
        configurable: true,
        enumerable: true
    }
});
export function VSTR(vector1, vector2) { return { from: { x: Math.min(vector1.x, vector2.x), y: Math.min(vector1.y, vector2.y), z: Math.min(vector1.z, vector2.z) }, to: { x: Math.max(vector1.x, vector2.x), y: Math.max(vector1.y, vector2.y), z: Math.max(vector1.z, vector2.z) } }; }
export const approximatelyEqual = (v1, v2, epsilon = 0.001) => Math.abs(v1 - v2) < epsilon;
export const approxEqual = (v1, v2, epsilon = 0.001) => Math.abs(v1 - v2) < epsilon;
export const approximatelyEquals = (v1, v2, epsilon = 0.001) => Math.abs(v1 - v2) < epsilon;
export const approxEquals = (v1, v2, epsilon = 0.001) => Math.abs(v1 - v2) < epsilon;
export function parseExpression(str) { return Function("wx, wy, wz, x, y, z, ax, ay, az, bx, by, bz, nx, ny, nz, px, py, pz", "const approxEquals = (v1, v2, epsilon = 0.001) => Math.abs(v1 - v2) < epsilon; return(" + str.replaceAll(/(?<!\^)\^(?!\^)/g, "**").replaceAll(/(?<![\=\<\>\+\-\*\/\\\[\]\{\}\(\&])\=(?![\=\<\>\+\-\*\/\\\[\]\{\}\(\&])/g, "==").replaceAll("^^", "^").replaceAll(/\|([^\|]+)\|/g, "Math.abs($1)").replaceAll(/([0-9en])(?=[xyzXYZ\(])/g, "$1*").replaceAll(/(?<=[xyXYzZ\)])([xyXYzZ\(])/g, "*$1").replaceAll(/(?<=[xyXYzZ\)])((rz|ry|rz|ax|ay|az|bx|by|bz}nx|ny|nz|px|py|pz))/g, "*$1").replaceAll(/(?<!Math\.)(sqrt|cbrt|tan|cotan|abs|acos|acosh|asin|asinh|atan|atan2|atanh|ceil|clz32|cos|cosh|exp|expm1|floor|fround|hypot|imul|log|log1p|log2|log10|max|min|pow|random|round|sign|sin|sinh|tanh|trunc)/g, "Math.$1").replaceAll(/(?<=[0-9enlENLxyXY\)])(Math\.)/g, "*$1") + ")"); }
export function parseExpressionKE(str) { return Function("wx, wy, wz, x, y, z, ax, ay, az, bx, by, bz, nx, ny, nz, px, py, pz", "const approxEquals = (v1, v2, epsilon = 0.001) => Math.abs(v1 - v2) < epsilon; return(" + str.replaceAll(/(?<!\^)\^(?!\^)/g, "**").replaceAll("^^", "^").replaceAll(/\|([^\|]+)\|/g, "Math.abs($1)").replaceAll(/([0-9en])(?=[xyzXYZ\(])/g, "$1*").replaceAll(/(?<=[xyXYzZ\)])([xyXYzZ\(])/g, "*$1").replaceAll(/(?<=[xyXYzZ\)])((rz|ry|rz|ax|ay|az|bx|by|bz}nx|ny|nz|px|py|pz))/g, "*$1").replaceAll(/(?<!Math\.)(sqrt|cbrt|tan|cotan|abs|acos|acosh|asin|asinh|atan|atan2|atanh|ceil|clz32|cos|cosh|exp|expm1|floor|fround|hypot|imul|log|log1p|log2|log10|max|min|pow|random|round|sign|sin|sinh|tanh|trunc)/g, "Math.$1").replaceAll(/(?<=[0-9enlENLxyXY\)])(Math\.)/g, "*$1") + ")"); }
export function parseExpressionR(str) { return Function("wx, wy, wz, x, y, z, ax, ay, az, bx, by, bz, nx, ny, nz, px, py, pz", "const approxEquals = (v1, v2, epsilon = 0.001) => Math.abs(v1 - v2) < epsilon; return(" + str + ")"); }
export function parseExpressionB(str) { return (wx, wy, wz, x, y, z, ax, ay, az, bx, by, bz, nx, ny, nz, px, py, pz) => { return (eval(str.replaceAll(/(?<!\^)\^(?!\^)/g, "**").replaceAll(/(?<![\=\<\>\+\-\*\/\\\[\]\{\}\(\&])\=(?![\=\<\>\+\-\*\/\\\[\]\{\}\(\&])/g, "==").replaceAll("^^", "^").replaceAll(/\|([^\|]+)\|/g, "Math.abs($1)").replaceAll(/([0-9en])(?=[xyzXYZ\(])/g, "$1*").replaceAll(/(?<=[xyXYzZ\)])([xyXYzZ\(])/g, "*$1").replaceAll(/(?<=[xyXYzZ\)])((rz|ry|rz|ax|ay|az|bx|by|bz}nx|ny|nz|px|py|pz))/g, "*$1").replaceAll(/(?<!Math\.)(sqrt|cbrt|tan|cotan|abs|acos|acosh|asin|asinh|atan|atan2|atanh|ceil|clz32|cos|cosh|exp|expm1|floor|fround|hypot|imul|log|log1p|log2|log10|max|min|pow|random|round|sign|sin|sinh|tanh|trunc)/g, "Math.$1").replaceAll(/(?<=[0-9enlENLxyXY\)])(Math\.)/g, "*$1"))); }; }
export function parseExpressionBKE(str) { return (wx, wy, wz, x, y, z, ax, ay, az, bx, by, bz, nx, ny, nz, px, py, pz) => { return (eval(str.replaceAll(/(?<!\^)\^(?!\^)/g, "**").replaceAll("^^", "^").replaceAll(/\|([^\|]+)\|/g, "Math.abs($1)").replaceAll(/([0-9en])(?=[xyzXYZ\(])/g, "$1*").replaceAll(/(?<=[xyXYzZ\)])([xyXYzZ\(])/g, "*$1").replaceAll(/(?<=[xyXYzZ\)])((rz|ry|rz|ax|ay|az|bx|by|bz}nx|ny|nz|px|py|pz))/g, "*$1").replaceAll(/(?<!Math\.)(sqrt|cbrt|tan|cotan|abs|acos|acosh|asin|asinh|atan|atan2|atanh|ceil|clz32|cos|cosh|exp|expm1|floor|fround|hypot|imul|log|log1p|log2|log10|max|min|pow|random|round|sign|sin|sinh|tanh|trunc)/g, "Math.$1").replaceAll(/(?<=[0-9enlENLxyXY\)])(Math\.)/g, "*$1"))); }; }
export function parseExpressionBR(str) { return (wx, wy, wz, x, y, z, ax, ay, az, bx, by, bz, nx, ny, nz, px, py, pz) => { return (eval(str)); }; }
export function* generateMathExpression(expression, generateCallback, from, to, pos1, pos2, step = 1) {
    var count = 0n;
    var index = 0n;
    for (let x = Math.min(from.x, to.x); x <= Math.max(from.x, to.x); x += step) {
        for (let y = Math.min(from.y, to.y); y <= Math.max(from.y, to.y); y += step) {
            for (let z = Math.min(from.z, to.z); z <= Math.max(from.z, to.z); z += step) {
                if (expression(x, y, z, x - ((from.x + to.x) / 2), y - ((from.y + to.y) / 2), z - ((from.z + to.z) / 2), pos1.x, pos1.y, pos1.z, pos2.x, pos2.y, pos2.z, Math.min(from.x, to.x), Math.min(from.y, to.y), Math.min(from.z, to.z), Math.max(from.x, to.x), Math.max(from.y, to.y), Math.max(from.z, to.z))) {
                    generateCallback({ x: x, y: y, z: z, rx: x - ((from.x + to.x) / 2), ry: y - ((from.y + to.y) / 2), rz: z - ((from.z + to.z) / 2), ax: pos1.x, ay: pos1.y, az: pos1.z, bx: pos2.x, by: pos2.y, bz: pos2.z, nx: Math.min(from.x, to.x), ny: Math.min(from.y, to.y), nz: Math.min(from.z, to.z), px: Math.max(from.x, to.x), py: Math.max(from.y, to.y), pz: Math.max(from.z, to.z), count, index });
                    count++;
                }
                index++;
                yield void null;
            }
        }
    }
    return count;
}
export function dirmap(direction) { return { Up: "above", Down: "below", East: "east", West: "west", North: "north", South: "south" }[direction]; }
export function diroffsetmap(direction) { return { Up: Vector.up, Down: Vector.down, East: Vector.east, West: Vector.west, North: Vector.north, South: Vector.south }[direction]; }
export function diroffsetmapb(direction) { return { up: Vector.up, down: Vector.down, east: Vector.east, west: Vector.west, north: Vector.north, south: Vector.south }[direction]; }
export function diroffsetothersmap(direction) { return { Up: { x: 1, y: 0, z: 1 }, Down: { x: 1, y: 0, z: 1 }, East: { x: 0, y: 1, z: 1 }, West: { x: 0, y: 1, z: 1 }, North: { x: 1, y: 1, z: 0 }, South: { x: 1, y: 1, z: 0 } }[direction]; }
export function splitRange([min, max], size) {
    const result = [];
    let start = min;
    while (start <= max) {
        const end = Math.min(start + size - 1, max);
        result.push([start, end]);
        start = end + 1;
    }
    return result;
}
export function* splitArea(area, sizes = { x: 64, y: 128, z: 64 }) {
    const indices = { x: 0, y: 0, z: 0 };
    const xRanges = splitRange([area.from.x, area.to.x], sizes.x);
    for (const xRange of xRanges) {
        const zRanges = splitRange([area.from.z, area.to.z], sizes.z);
        for (const zRange of zRanges) {
            const partialRanges = [{ x: xRange[0], z: zRange[0] }, { x: xRange[1], z: zRange[1] }];
            const yRanges = splitRange([area.from.y, area.to.y], sizes.y);
            for (const yRange of yRanges) {
                const finalRange = [
                    { x: partialRanges[0].x, y: yRange[0], z: partialRanges[0].z },
                    { x: partialRanges[1].x, y: yRange[1], z: partialRanges[1].z },
                    Object.assign({}, indices),
                    { x: partialRanges[0].x - area.from.x, y: yRange[0] - area.from.y, z: partialRanges[0].z - area.from.z }
                ];
                indices.y++;
                yield finalRange;
            }
            indices.y = 0;
            indices.z++;
        }
        indices.z = 0;
        indices.x++;
    }
}
export function* splitAreaB(area, sizes = { x: 64, y: 128, z: 64 }) {
    const indices = { x: 0, y: 0, z: 0 };
    const xRanges = splitRange([area.from.x, area.to.x], sizes.x);
    for (const xRange of xRanges) {
        const zRanges = splitRange([area.from.z, area.to.z], sizes.z);
        for (const zRange of zRanges) {
            const partialRanges = [{ x: xRange[0], z: zRange[0] }, { x: xRange[1], z: zRange[1] }];
            const yRanges = splitRange([area.from.y, area.to.y], sizes.y);
            for (const yRange of yRanges) {
                const finalRange = {
                    from: { x: partialRanges[0].x, y: yRange[0], z: partialRanges[0].z },
                    to: { x: partialRanges[1].x, y: yRange[1], z: partialRanges[1].z },
                    indices: Object.assign({}, indices),
                    offset: { x: partialRanges[0].x - area.from.x, y: yRange[0] - area.from.y, z: partialRanges[0].z - area.from.z }
                };
                indices.y++;
                yield finalRange;
            }
            indices.y = 0;
            indices.z++;
        }
        indices.z = 0;
        indices.x++;
    }
}
export class blockClipboard {
    static get ids() {
        return world.structureManager.getWorldStructureIds().filter(v => v.startsWith("andexdb:clipboard"));
    }
    static get saveSize() {
        return (world.getDynamicProperty(`andexdb:clipboards`) ?? Vector.zero);
    }
    static clear() { this.ids.forEach(v => world.structureManager.delete(v)); }
    static saveRange(dimension, range, options) {
        try {
            world.structureManager.createFromWorld(`andexdb:clipboard,${range[2].x ?? 0},${range[2].y ?? 0},${range[2].z ?? 0}`, dimension, range[0], range[1], options);
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    static save(dimension, area, options, sizeLimits = { x: 64, y: 128, z: 64 }) {
        world.setDynamicProperty(`andexdb:clipboards`, ((v) => ({ x: Math.abs(v.x), y: Math.abs(v.y), z: Math.abs(v.z) }))(Vector.subtract(area.to, area.from)));
        for (const range of splitArea(area, sizeLimits)) {
            this.saveRange(dimension, range, options);
        }
    }
    static place(location, options, sizes = { x: 64, y: 128, z: 64 }) {
        this.ids.map(v => ({ id: v, x: Number(v.split(",")[1] ?? 0) * sizes.x, y: Number(v.split(",")[2] ?? 0) * sizes.y, z: Number(v.split(",")[3] ?? 0) * sizes.z })).forEach(v => world.structureManager.place(v.id, location.dimension, Vector.add(v, location), options));
    }
}
export class undoClipboard {
    static get ids() {
        return world.structureManager.getWorldStructureIds().filter(v => v.startsWith("andexdb:undoclipboard;"));
    }
    static saveIds(timestamp) {
        return world.structureManager.getWorldStructureIds().filter(v => v.startsWith(`andexdb:undoclipboard;${timestamp}`));
    }
    static saveSize(timestamp) {
        return (world.getDynamicProperty(`andexdb:undoclipboards;${timestamp}`) ?? Vector.zero);
    }
    static get saves() {
        return world.getDynamicPropertyIds().filter(v => v.startsWith("andexdb:undoclipboard;"));
    }
    static get saveTimes() {
        return [...new Set(world.getDynamicPropertyIds().filter(v => v.startsWith("andexdb:undoclipboard;")).map(v => Number(v.slice(22))))].sort().reverse();
    }
    static get newestSaveTime() {
        return this.saveTimes[0];
    }
    static cullItemsMissingStructure() { this.saveTimes.filter(v => !!!world.structureManager.get(`andexdb:undoclipboard;${v},0,0,0`)).forEach(v => this.clearTime(v)); }
    static clear() { this.ids.forEach(v => world.structureManager.delete(v)); }
    static clearTime(timestamp) {
        this.saveIds(timestamp).forEach(v => world.structureManager.delete(v));
        world.setDynamicProperty(`andexdb:undoclipboard;${timestamp}`);
        world.setDynamicProperty(`andexdb:undoclipboardd;${timestamp}`);
        world.setDynamicProperty(`andexdb:undoclipboards;${timestamp}`);
    }
    static saveRange(dimension, range, saveTime, options) {
        try {
            world.structureManager.createFromWorld(`andexdb:undoclipboard;${saveTime},${range[2].x ?? 0},${range[2].y ?? 0},${range[2].z ?? 0}`, dimension, range[0], range[1], options);
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    static save(dimension, area, saveTime = Date.now(), options, sizeLimits = { x: 64, y: 128, z: 64 }) {
        world.setDynamicProperty(`andexdb:undoclipboard;${saveTime}`, area.from);
        world.setDynamicProperty(`andexdb:undoclipboardd;${saveTime}`, dimension.id);
        world.setDynamicProperty(`andexdb:undoclipboards;${saveTime}`, ((v) => ({ x: Math.abs(v.x), y: Math.abs(v.y), z: Math.abs(v.z) }))(Vector.subtract(area.to, area.from)));
        for (const range of splitArea(area, sizeLimits)) {
            this.saveRange(dimension, range, saveTime, { saveMode: options?.saveMode ?? config.undoClipboardMode, includeBlocks: options?.includeBlocks, includeEntities: options?.includeEntities });
        }
    }
    static undo(saveTime = this.newestSaveTime, options, clearSave = true, sizes = { x: 64, y: 128, z: 64 }) {
        if (this.ids.length == 0) {
            return 0;
        }
        ;
        this.saveIds(saveTime).map(v => ({ id: v, x: Number(v.split(",")[1] ?? 0) * sizes.x, y: Number(v.split(",")[2] ?? 0) * sizes.y, z: Number(v.split(",")[3] ?? 0) * sizes.z })).forEach(v => {
            world.structureManager.place(v.id, dimensionsb[String(world.getDynamicProperty(`andexdb:undoclipboardd;${saveTime}`))] ?? dimensionsb["minecraft:overworld"], Vector.add(v, world.getDynamicProperty(`andexdb:undoclipboard;${saveTime}`)), options);
        });
        if (clearSave) {
            this.saveIds(saveTime).forEach(v => { this.clearTime(saveTime); });
        }
        return 1;
    }
}
system.runTimeout(() => undoClipboard.cullItemsMissingStructure(), 50);
export class AreaBackups {
    static get ids() {
        return world.getDynamicPropertyIds().filter(v => v.startsWith("areabackup:"));
    }
    static get structureIds() {
        return world.structureManager.getWorldStructureIds().filter(v => v.startsWith("areabackup:"));
    }
    static get areas() {
        return this.ids.map(v => this.get(v));
    }
    static get(id) { return new AreaBackup(id); }
    static delete(id) { new AreaBackup(id).delete(); }
    static clear() { this.ids.forEach(v => new AreaBackup(v).delete()); }
    static createAreaBackup(id, dimension, area) { world.setDynamicProperty("areabackup:" + id.replaceAll(";", "").replaceAll(",", ""), JSON.stringify({ from: area.from, to: area.to, dimension: dimension.id })); return new AreaBackup(id); }
}
export class AreaBackup {
    id;
    constructor(id) {
        this.id = id;
    }
    get from() { return JSON.parse(String(world.getDynamicProperty(this.id))).from; }
    get to() { return JSON.parse(String(world.getDynamicProperty(this.id))).to; }
    get dimension() { return tryget(() => world.getDimension(JSON.parse(String(world.getDynamicProperty(this.id))).dimension)) ?? dimensionsc.overworld; }
    get backups() {
        return [...new Set(world.structureManager.getWorldStructureIds().filter(v => v.startsWith(`${this.id};`)).map(v => Number(v.split(";")[1].split(",")[0])))].sort().reverse();
    }
    get backupStructureIds() {
        return world.structureManager.getWorldStructureIds().filter(v => v.startsWith(`${this.id};`));
    }
    saveIds(timestamp) {
        return world.structureManager.getWorldStructureIds().filter(v => v.startsWith(`${this.id};${timestamp}`));
    }
    get size() {
        return ((v) => ({ x: Math.abs(v.x), y: Math.abs(v.y), z: Math.abs(v.z) }))(Vector.subtract(this.from, this.to));
    }
    toJSON() { return { id: this.id, from: this.from, to: this.to, dimension: this.dimension }; }
    toJSONNoId() { return { from: this.from, to: this.to, dimension: this.dimension }; }
    delete() {
        this.clear();
        world.setDynamicProperty(this.id);
    }
    clear() { this.backupStructureIds.forEach(v => world.structureManager.delete(v)); }
    clearBackup(timestamp) {
        this.saveIds(timestamp).forEach(v => world.structureManager.delete(v));
    }
    clearBackups() {
        this.backups.forEach(v => this.saveIds(v).forEach(v => world.structureManager.delete(v)));
    }
    backupRange(range, saveTime, options) {
        try {
            world.structureManager.createFromWorld(`${this.id};${saveTime},${range[2].x ?? 0},${range[2].y ?? 0},${range[2].z ?? 0}`, this.dimension, range[0], range[1], options);
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    backup(saveTime = Date.now(), options = { saveMode: StructureSaveMode.World, includeBlocks: true, includeEntities: false }, sizeLimits = { x: 64, y: 128, z: 64 }) {
        for (const range of splitArea({ from: this.from, to: this.to }, sizeLimits)) {
            this.backupRange(range, saveTime, options);
        }
    }
    rollback(saveTime = this.backups[0], clearSave = false, options, sizes = { x: 64, y: 128, z: 64 }) {
        if (this.backupStructureIds.length == 0) {
            return 0;
        }
        ;
        this.saveIds(saveTime).map(v => ({ id: v, x: Number(v.split(",")[1] ?? 0) * sizes.x, y: Number(v.split(",")[2] ?? 0) * sizes.y, z: Number(v.split(",")[3] ?? 0) * sizes.z })).forEach(v => world.structureManager.place(v.id, this.dimension, Vector.add(this.from, v), options));
        if (clearSave) {
            this.clearBackup(saveTime);
        }
        return 1;
    }
}
export function* removeAirFromStructure(structure) {
    for (let x = 0; x < structure.size.x; x++) {
        for (let y = 0; y < structure.size.y; y++) {
            for (let z = 0; z < structure.size.z; z++) {
                if (structure.getBlockPermutation({ x, y, z }).type.id == "minecraft:air") {
                    structure.setBlockPermutation({ x, y, z }, BlockPermutation.resolve("minecraft:structure_void"));
                }
                ;
                yield void undefined;
            }
        }
    }
    structure.saveToWorld();
}
export function facingPoint(location, otherLocation) {
    const sl = location;
    const ol = otherLocation;
    const x = (-ol.x) + sl.x;
    const y = ol.y - sl.y;
    const z = ol.z - sl.z; /*
    let rotx = Math.atan2( y, z );
    let roty = 0
    if (z >= 0) {
       roty = -Math.atan2( x * Math.cos(rotx), z );
    }else{
       roty = Math.atan2( x * Math.cos(rotx), -z );
    }
    let rotz = Math.atan2( Math.cos(rotx), Math.sin(rotx) * Math.sin(roty) )*/
    let yaw = Math.atan2(x, z) * 180.0 / Math.PI;
    let padj = Math.sqrt(Math.pow(x, 2) + Math.pow(z, 2));
    let pitch = Math.atan2(padj, y) * 180.0 / Math.PI;
    const newPosition = {
        x: pitch - 90,
        y: yaw
    };
    return { rot: newPosition, difference: { x, y, z } };
} /*

Entity.prototype.localTeleport = function (localTeleport: ILocalTeleport) {
    const { sway_1, heave_2, surge_3 } = localTeleport
    const { location } = this
    const viewDirection = this.getViewDirection()

    const xx = LocalTeleportFunctions.xa(viewDirection, sway_1)
    const yy = LocalTeleportFunctions.ya(viewDirection, heave_2)
    const zz = LocalTeleportFunctions.za(viewDirection, surge_3)

    const newPosition = {
            x: location.x + xx.x + yy.x + zz.x,
            y: location.y + xx.y + yy.y + zz.y,
            z: location.z + xx.z + yy.z + zz.z
    }

    this.teleport(newPosition)
}*/
export function caretNotation(location, offset, rot) {
    const { x, y, z } = offset; /*
    const { location } = this */
    const viewDirection = rot;
    const xx = LocalTeleportFunctions.xa(viewDirection, x);
    const yy = LocalTeleportFunctions.ya(viewDirection, y);
    const zz = LocalTeleportFunctions.za(viewDirection, z);
    const newPosition = {
        x: Number((location.x + xx.x + yy.x + zz.x).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 5))),
        y: Number((location.y + xx.y + yy.y + zz.y).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 5))),
        z: Number((location.z + xx.z + yy.z + zz.z).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 5)))
    };
    return newPosition;
}
export function caretNotationB(location, r, { x, y }) {
    const Z = r * (-Math.cos(x) * Math.sin(y), -Math.sin(x), Math.cos(x) * Math.cos(y));
    const Y = r * (-Math.sin(x) * Math.sin(y), Math.cos(x), Math.sin(x) * Math.cos(y));
    const X = r * (Math.cos(y), 0, Math.sin(y));
    const newPosition = {
        x: location.x + X,
        y: location.y + Y,
        z: location.z + Z
    };
    return newPosition;
}
export function caretNotationC(location, offset, rot) {
    return caretNotation(location, offset, anglesToDirectionVectorDeg(rot.x, rot.y));
}
export function caretNotationD(location, offset, rot) {
    const { x, y, z } = offset; /*
    const { location } = this */
    const viewDirection = rot;
    const xx = LocalTeleportFunctions.xa(viewDirection, x);
    const yy = LocalTeleportFunctions.ya(viewDirection, y);
    const newPosition = {
        x: location.x + xx.x + yy.x,
        y: location.y + xx.y + yy.y,
        z: location.z + xx.z + yy.z
    };
    return newPosition;
} /*
Math.asin*/
export function anglesToDirectionVector(yaw, pitch /*, roll: number*/) {
    const cosYaw = Math.cos(yaw);
    const sinYaw = Math.sin(yaw);
    const cosPitch = Math.cos(pitch);
    const sinPitch = Math.sin(pitch); /*
    const cosRoll = Math.cos(roll);
    const sinRoll = Math.sin(roll);*/
    // Calculate components of the normalized direction vector
    const x = Number((cosYaw * cosPitch).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 5)));
    const y = Number((-sinYaw).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 5)));
    const z = Number((cosYaw * sinPitch).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 5)));
    return { x, y, z };
}
export function anglesToDirectionVectorDeg(yaw, pitch /*, roll: number*/) {
    const cosYaw = Math.cos((Math.PI / 180) * yaw);
    const sinYaw = Math.sin((Math.PI / 180) * yaw);
    const cosPitch = Math.cos((Math.PI / 180) * (90 + pitch));
    const sinPitch = Math.sin((Math.PI / 180) * (90 + pitch)); /*
    const cosRoll = Math.cos((Math.PI/180)*roll);
    const sinRoll = Math.sin((Math.PI/180)*roll);*/
    // Calculate components of the normalized direction vector
    const x = Number((cosYaw * cosPitch).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 5)));
    const y = Number((-sinYaw).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 5)));
    const z = Number((cosYaw * sinPitch).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 5)));
    return { x, y, z };
}
export function rotate(pitchb, rollb, yawb, points) {
    let pitch = (pitchb * (Math.PI / 180));
    let roll = (rollb * (Math.PI / 180));
    let yaw = (yawb * (Math.PI / 180));
    var cosa = Math.cos(yaw);
    var sina = Math.sin(yaw);
    var cosb = Math.cos(pitch);
    var sinb = Math.sin(pitch);
    var cosc = Math.cos(roll);
    var sinc = Math.sin(roll);
    var Axx = cosa * cosb;
    var Axy = cosa * sinb * sinc - sina * cosc;
    var Axz = cosa * sinb * cosc + sina * sinc;
    var Ayx = sina * cosb;
    var Ayy = sina * sinb * sinc + cosa * cosc;
    var Ayz = sina * sinb * cosc - cosa * sinc;
    var Azx = -sinb;
    var Azy = cosb * sinc;
    var Azz = cosb * cosc;
    for (var i = 0; i < points.length; i++) {
        var px = points[i].x;
        var py = points[i].y;
        var pz = points[i].z;
        points[i].x = Number((Axx * px + Axy * py + Axz * pz).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 10)));
        points[i].y = Number((Ayx * px + Ayy * py + Ayz * pz).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 10)));
        points[i].z = Number((Azx * px + Azy * py + Azz * pz).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 10)));
    }
    ;
    return points;
}
export function rotate3d(points, pitchb, rollb, yawb) {
    let pitch = (pitchb * (Math.PI / 180));
    let roll = (rollb * (Math.PI / 180));
    let yaw = (yawb * (Math.PI / 180));
    let cosa = Math.cos(yaw), sina = Math.sin(yaw);
    let cosb = Math.cos(pitch), sinb = Math.sin(pitch);
    let cosc = Math.cos(roll), sinc = Math.sin(roll);
    let Axx = cosa * cosb, Axy = cosa * sinb * sinc - sina * cosc, Axz = cosa * sinb * cosc + sina * sinc;
    let Ayx = sina * cosb, Ayy = sina * sinb * sinc + cosa * cosc, Ayz = sina * sinb * cosc - cosa * sinc;
    let Azx = -sinb, Azy = cosb * sinc, Azz = cosb * cosc;
    let px = points[0];
    let py = points[1];
    let pz = points[2];
    points[0] = Number((Axx * px + Axy * py + Axz * pz).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 10)));
    points[1] = Number((Ayx * px + Ayy * py + Ayz * pz).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 10)));
    points[2] = Number((Azx * px + Azy * py + Azz * pz).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 10)));
    return points;
}
export function movePointInDirection(point, direction, distance) {
    let add = rotate(direction.x, 0, direction.y, [{ x: distance.x, y: distance.y, z: distance.z }])[0];
    return { x: add.x + point.x, y: add.y + point.y, z: add.z + point.z };
}
export function evaluateCoordinates(x, y, z, startingPosition, rotation) {
    let coordinates = startingPosition;
    [x, y, z].forEach((v, i) => { if (v.startsWith("^")) {
        if (v.length == 1) { }
        else {
            let crds = [0, 0, 0];
            crds[i] = Number(v.slice(1));
            coordinates = caretNotationC(coordinates, { x: crds[0], y: crds[1], z: crds[2] }, rotation);
        }
    } });
    [x, y, z].forEach((v, i) => { if (v.startsWith("~")) {
        if (v.length == 1) { }
        else {
            let crds = [coordinates.x, coordinates.y, coordinates.z];
            crds[i] = crds[i] + Number(v.slice(1));
            coordinates = { x: crds[0], y: crds[1], z: crds[2] };
        }
    } });
    [x, y, z].forEach((v, i) => { if (v.startsWith("*")) {
        if (v.length == 1) {
            let crds = [coordinates.x, coordinates.y, coordinates.z];
            let crdsb = [startingPosition.x, startingPosition.y, startingPosition.z];
            crds[i] = crdsb[i];
            coordinates = { x: crds[0], y: crds[1], z: crds[2] };
        }
        else {
            let crds = [coordinates.x, coordinates.y, coordinates.z];
            let crdsb = [startingPosition.x, startingPosition.y, startingPosition.z];
            crds[i] = crdsb[i] + Number(v.slice(1));
            coordinates = { x: crds[0], y: crds[1], z: crds[2] };
        }
    } });
    [x, y, z].forEach((v, i) => { if (v.startsWith("~")) { }
    else {
        if (v.startsWith("^")) { }
        else {
            if (v.startsWith("*")) { }
            else {
                let crds = [coordinates.x, coordinates.y, coordinates.z];
                crds[i] = Number(v.slice(0));
                coordinates = { x: crds[0], y: crds[1], z: crds[2] };
            }
        }
    } });
    return coordinates;
}
export function evaluateRotationCoordinates(x, y, rotation) {
    let coordinates = rotation;
    [x, y].forEach((v, i) => { if (v.startsWith("~")) {
        if (v.length == 1) { }
        else {
            let crds = [coordinates.x, coordinates.y];
            crds[i] = crds[i] + Number(v.slice(1));
            coordinates = { x: crds[0], y: crds[1] };
        }
    } });
    [x, y].forEach((v, i) => { if (v.startsWith("*")) {
        if (v.length == 1) {
            let crds = [coordinates.x, coordinates.y];
            let crdsb = [rotation.x, rotation.y];
            crds[i] = crdsb[i];
            coordinates = { x: crds[0], y: crds[1] };
        }
        else {
            let crds = [coordinates.x, coordinates.y];
            let crdsb = [rotation.x, rotation.y];
            crds[i] = crdsb[i] + Number(v.slice(1));
            coordinates = { x: crds[0], y: crds[1] };
        }
    } });
    [x, y].forEach((v, i) => { if (v.startsWith("~")) { }
    else {
        if (v.startsWith("^")) { }
        else {
            if (v.startsWith("*")) { }
            else {
                let crds = [coordinates.x, coordinates.y];
                crds[i] = Number(v.slice(0));
                coordinates = { x: crds[0], y: crds[1] };
            }
        }
    } });
    return coordinates;
}
export function evaluateCoordinatesB(x, y, z, startingPosition, rotation) {
    let coordinates = startingPosition;
    [x, y, z].forEach((v, i) => { if (v.startsWith("^")) {
        if (v.length == 1) { }
        else {
            let crds = [0, 0, 0];
            crds[i] = Number(v.slice(1));
            coordinates = caretNotation(coordinates, { x: crds[0], y: crds[1], z: crds[2] }, rotation);
        }
    } });
    [x, y, z].forEach((v, i) => { if (v.startsWith("~")) {
        if (v.length == 1) { }
        else {
            let crds = [coordinates.x, coordinates.y, coordinates.z];
            crds[i] = crds[i] + Number(v.slice(1));
            coordinates = { x: crds[0], y: crds[1], z: crds[2] };
        }
    } });
    [x, y, z].forEach((v, i) => { if (v.startsWith("*")) {
        if (v.length == 1) {
            let crds = [coordinates.x, coordinates.y, coordinates.z];
            let crdsb = [startingPosition.x, startingPosition.y, startingPosition.z];
            crds[i] = crdsb[i];
            coordinates = { x: crds[0], y: crds[1], z: crds[2] };
        }
        else {
            let crds = [coordinates.x, coordinates.y, coordinates.z];
            let crdsb = [startingPosition.x, startingPosition.y, startingPosition.z];
            crds[i] = crdsb[i] + Number(v.slice(1));
            coordinates = { x: crds[0], y: crds[1], z: crds[2] };
        }
    } });
    [x, y, z].forEach((v, i) => { if (v.startsWith("~")) { }
    else {
        if (v.startsWith("^")) { }
        else {
            if (v.startsWith("*")) { }
            else {
                let crds = [coordinates.x, coordinates.y, coordinates.z];
                crds[i] = Number(v.slice(0));
                coordinates = { x: crds[0], y: crds[1], z: crds[2] };
            }
        }
    } });
    return coordinates;
}
export function coordinatesB(coordinateText, startingPosition, rotation) {
    let location = { x: NaN, y: NaN, z: NaN };
    try {
        location = evaluateCoordinatesB(coordinateText.split(/(?=[\^\!\~\*\&\s])/g)[0], coordinateText.split(/(?=[\^\!\~\*\&\s])/g)[1], coordinateText.split(/(?=[\^\!\~\*\&\s])/g)[2], startingPosition, rotation);
    }
    catch (e) {
        console.error(e, e.stack);
    }
    return location;
}
export function coordinates(coordinateText, startingPosition, rotation) {
    let location = { x: NaN, y: NaN, z: NaN };
    try {
        location = evaluateCoordinates(coordinateText.split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[0].replaceAll(" ", ""), coordinateText.split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[1].replaceAll(" ", ""), coordinateText.split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[2].replaceAll(" ", ""), startingPosition, rotation);
    }
    catch (e) {
        console.error(e, e.stack);
    }
    return location;
}
export function coordinatesC(coordinateText, source) {
    let location = { x: NaN, y: NaN, z: NaN };
    let startingPosition = source?.location ?? { x: 0, y: 0, z: 0 };
    let rotation = source?.getRotation() ?? { x: 0, y: 0 };
    try {
        location = evaluateCoordinates(coordinateText.split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[0].replaceAll(" ", ""), coordinateText.split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[1].replaceAll(" ", ""), coordinateText.split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[2].replaceAll(" ", ""), startingPosition, rotation);
    }
    catch (e) {
        console.error(e, e.stack);
    }
    return location;
}
export function coordinatesD(coordinateText, source, rotation) {
    let location = { x: NaN, y: NaN, z: NaN };
    let startingPosition = source?.location ?? { x: 0, y: 0, z: 0 };
    try {
        location = evaluateCoordinates(coordinateText.split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[0].replaceAll(" ", ""), coordinateText.split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[1].replaceAll(" ", ""), coordinateText.split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[2].replaceAll(" ", ""), startingPosition, rotation);
    }
    catch (e) {
        console.error(e, e.stack);
    }
    return location;
}
export function coordinatesE(coordinateText, source, rotation) {
    let location = { x: NaN, y: NaN, z: NaN };
    let startingPosition = source?.location ?? { x: 0, y: 0, z: 0 };
    try {
        location = evaluateCoordinatesB(coordinateText.split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[0].replaceAll(" ", ""), coordinateText.split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[1].replaceAll(" ", ""), coordinateText.split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[2].replaceAll(" ", ""), startingPosition, rotation);
    }
    catch (e) {
        console.error(e, e.stack);
    }
    return location;
}
export function degradeArray(array /*, mode: "removeElements"|"changeTextOfStrings"|"corruptElements"|"removeElementsAndSubElements"*/, integrity, seed) {
    return shuffle([...array]).slice(0, array.length * (Math.min(array.length, integrity / 100)));
}
export function generateCircleCoordinates(centerX, centerY, centerZ, radius, axis) {
    const coordinates = [];
    const diameter = radius * 2;
    if (axis.toLowerCase() == "y" || axis.toLowerCase() == "ud" || axis.toLowerCase() == "du") {
        for (let x = -radius; x <= radius; x++) {
            for (let z = -radius; z <= radius; z++) {
                if (x * x + z * z <= radius * radius) {
                    const blockX = centerX + x;
                    const blockZ = centerZ + z;
                    coordinates.push({ x: blockX, y: centerY, z: blockZ });
                }
            }
        }
    }
    else if (axis.toLowerCase() == "x" || axis.toLowerCase() == "ew" || axis.toLowerCase() == "we") {
        for (let y = -radius; y <= radius; y++) {
            for (let z = -radius; z <= radius; z++) {
                if (y * y + z * z <= radius * radius) {
                    const blockY = centerY + y;
                    const blockZ = centerZ + z;
                    coordinates.push({ x: centerX, y: blockY, z: blockZ });
                }
            }
        }
    }
    else if (axis.toLowerCase() == "z" || axis.toLowerCase() == "ns" || axis.toLowerCase() == "sn") {
        for (let x = -radius; x <= radius; x++) {
            for (let y = -radius; y <= radius; y++) {
                if (x * x + y * y <= radius * radius) {
                    const blockX = centerX + x;
                    const blockY = centerY + y;
                    coordinates.push({ x: blockX, y: blockY, z: centerZ });
                }
            }
        }
    }
    return coordinates;
}
export function generateCircleCoordinatesB(center, radius, axis) {
    const coordinates = [];
    const diameter = radius * 2;
    if (axis.toLowerCase() == "y" || axis.toLowerCase() == "ud" || axis.toLowerCase() == "du") {
        for (let x = -radius; x <= radius; x++) {
            for (let z = -radius; z <= radius; z++) {
                if (x * x + z * z <= radius * radius) {
                    const blockX = center.x + x;
                    const blockZ = center.z + z;
                    coordinates.push({ x: blockX, y: center.y, z: blockZ });
                }
            }
        }
    }
    else if (axis.toLowerCase() == "x" || axis.toLowerCase() == "ew" || axis.toLowerCase() == "we") {
        for (let y = -radius; y <= radius; y++) {
            for (let z = -radius; z <= radius; z++) {
                if (y * y + z * z <= radius * radius) {
                    const blockY = center.y + y;
                    const blockZ = center.z + z;
                    coordinates.push({ x: center.x, y: blockY, z: blockZ });
                }
            }
        }
    }
    else if (axis.toLowerCase() == "z" || axis.toLowerCase() == "ns" || axis.toLowerCase() == "sn") {
        for (let x = -radius; x <= radius; x++) {
            for (let y = -radius; y <= radius; y++) {
                if (x * x + y * y <= radius * radius) {
                    const blockX = center.x + x;
                    const blockY = center.y + y;
                    coordinates.push({ x: blockX, y: blockY, z: center.z });
                }
            }
        }
    }
    return coordinates;
}
export function generateCircleCoordinatesC(centerX, centerY, centerZ, radius) {
    const coordinates = [];
    const diameter = radius * 2;
    for (let x = centerX - radius; x <= centerX + radius; x++) {
        for (let z = centerZ - radius; z <= centerZ + radius; z++) {
            const distanceSquared = (x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ);
            if (distanceSquared <= radius * radius) {
                coordinates.push({ x: x, y: centerY, z: z });
            }
        }
    }
    return coordinates;
} /*
export function drawCircleOutline(ctx, centerX, centerY, radius, thickness, color) {
    const numSegments = 100; // Number of segments for drawing the circle
    const step = (2 * Math.PI) / numSegments;

    for (let i = 0; i < numSegments; i++) {
        const angle = i * step;
        const x1 = centerX + radius * Math.cos(angle);
        const y1 = centerY + radius * Math.sin(angle);

        // Calculate the new radius for the outline
        const newRadius = radius + thickness;

        const x2 = centerX + newRadius * Math.cos(angle);
        const y2 = centerY + newRadius * Math.sin(angle);

        // Draw a line segment between (x1, y1) and (x2, y2)
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = color;
        ctx.stroke();
    }
}*/
export function generateMinecraftCircleOutline(center, radius, thickness, dimension, placeBlockCallback, integrity = 100) {
    const innerRadius = radius - thickness;
    const outerRadius = radius;
    for (let x = Math.floor(center.x - outerRadius); x <= Math.ceil(center.x + outerRadius); x++) {
        for (let z = Math.floor(center.z - outerRadius); z <= Math.ceil(center.z + outerRadius); z++) {
            const distanceSquared = (x - center.x) ** 2 + (z - center.z) ** 2;
            if (distanceSquared <= outerRadius ** 2 && distanceSquared >= innerRadius ** 2) {
                placeBlockCallback({ x: x, y: center.y, z: z, dimension: dimension });
            }
        }
    }
}
export function* generateMinecraftCircleOutlineBG(center, radius, thickness, generatorProgressId, dimension, placeBlockCallback = () => { }, options) {
    try {
        const innerRadius = radius - thickness;
        const outerRadius = radius;
        generatorProgress[generatorProgressId] = { done: false, startTick: system.currentTick, startTime: Date.now(), containsUnloadedChunks: false };
        var msSinceLastYieldStart = Date.now();
        if ((options?.integrity ?? 100) != 100) {
            for (let x = Math.floor(center.x - outerRadius); x <= Math.ceil(center.x + outerRadius); x++) {
                for (let z = Math.floor(center.z - outerRadius); z <= Math.ceil(center.z + outerRadius); z++) {
                    const distanceSquared = (x - center.x) ** 2 + (z - center.z) ** 2;
                    if (distanceSquared <= outerRadius ** 2 && distanceSquared >= innerRadius ** 2) {
                        if (Math.random() <= ((options?.integrity ?? 100) / 100)) {
                            placeBlockCallback({ x: x, y: center.y, z: z, dimension: dimension });
                        }
                    }
                    if ((Date.now() - msSinceLastYieldStart) >= (options?.minMSBetweenYields ?? 2000)) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined;
                    }
                }
                if ((Date.now() - msSinceLastYieldStart) >= (options?.minMSBetweenYields ?? 2000)) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        else {
            for (let x = Math.floor(center.x - outerRadius); x <= Math.ceil(center.x + outerRadius); x++) {
                for (let z = Math.floor(center.z - outerRadius); z <= Math.ceil(center.z + outerRadius); z++) {
                    const distanceSquared = (x - center.x) ** 2 + (z - center.z) ** 2;
                    if (distanceSquared <= outerRadius ** 2 && distanceSquared >= innerRadius ** 2) {
                        placeBlockCallback({ x: x, y: center.y, z: z, dimension: dimension });
                    }
                    if ((Date.now() - msSinceLastYieldStart) >= (options?.minMSBetweenYields ?? 2000)) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined;
                    }
                }
                if ((Date.now() - msSinceLastYieldStart) >= (options?.minMSBetweenYields ?? 2000)) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        generatorProgress[generatorProgressId].endTick = system.currentTick;
        generatorProgress[generatorProgressId].endTime = Date.now();
        generatorProgress[generatorProgressId].done = true;
        return;
    }
    catch (e) {
        generatorProgress[generatorProgressId].endTick = system.currentTick;
        generatorProgress[generatorProgressId].endTime = Date.now();
        generatorProgress[generatorProgressId].done = true;
        throw (e);
    }
}
export function generateMinecraftOvoid(center, radius, offset, thickness, dimension, placeBlockCallback = () => { }, integrity = 100) {
    const innerRadiusX = radius.x - thickness;
    const innerRadiusY = radius.y - thickness;
    const innerRadiusZ = radius.z - thickness;
    const outerRadiusX = radius.x + offset.x;
    const outerRadiusY = radius.y + offset.y;
    const outerRadiusZ = radius.z + offset.z;
    for (let x = Math.floor(center.x - outerRadiusX); x <= Math.ceil(center.x + outerRadiusX); x++) {
        for (let y = Math.floor(center.y - outerRadiusY); y <= Math.ceil(center.y + outerRadiusY); y++) {
            for (let z = Math.floor(center.z - outerRadiusZ); z <= Math.ceil(center.z + outerRadiusZ); z++) {
                const distanceSquared = ((x - center.x) / outerRadiusX) ** 2 + ((y - center.y) / outerRadiusY) ** 2 + ((z - center.z) / outerRadiusZ) ** 2;
                if (distanceSquared <= 1 && distanceSquared >= (innerRadiusX / outerRadiusX) ** 2 && distanceSquared >= (innerRadiusY / outerRadiusY) ** 2 && distanceSquared >= (innerRadiusZ / outerRadiusZ) ** 2) {
                    placeBlockCallback({ x: x, y: y, z: z, dimension: dimension });
                }
            }
        }
    }
}
export function* generateMinecraftOvoidBG(center, radius, offset, thickness, generatorProgressId, dimension, placeBlockCallback = () => { }, options) {
    try {
        const innerRadiusX = radius.x - thickness;
        const innerRadiusY = radius.y - thickness;
        const innerRadiusZ = radius.z - thickness;
        const outerRadiusX = radius.x + offset.x;
        const outerRadiusY = radius.y + offset.y;
        const outerRadiusZ = radius.z + offset.z;
        generatorProgress[generatorProgressId] = { done: false, startTick: system.currentTick, startTime: Date.now(), containsUnloadedChunks: false };
        var msSinceLastYieldStart = Date.now();
        if ((options?.integrity ?? 100) != 100) {
            for (let x = Math.floor(center.x - outerRadiusX); x <= Math.ceil(center.x + outerRadiusX); x++) {
                for (let y = Math.floor(center.y - outerRadiusY); y <= Math.ceil(center.y + outerRadiusY); y++) {
                    for (let z = Math.floor(center.z - outerRadiusZ); z <= Math.ceil(center.z + outerRadiusZ); z++) {
                        const distanceSquared = ((x - center.x) / outerRadiusX) ** 2 + ((y - center.y) / outerRadiusY) ** 2 + ((z - center.z) / outerRadiusZ) ** 2;
                        if (distanceSquared <= 1 && distanceSquared >= (innerRadiusX / outerRadiusX) ** 2 && distanceSquared >= (innerRadiusY / outerRadiusY) ** 2 && distanceSquared >= (innerRadiusZ / outerRadiusZ) ** 2) {
                            if (Math.random() <= ((options?.integrity ?? 100) / 100)) {
                                placeBlockCallback({ x: x, y: y, z: z, dimension: dimension });
                            }
                        }
                    }
                    if ((Date.now() - msSinceLastYieldStart) >= (options?.minMSBetweenYields ?? 2000)) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined;
                    }
                }
                if ((Date.now() - msSinceLastYieldStart) >= (options?.minMSBetweenYields ?? 2000)) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        else {
            for (let x = Math.floor(center.x - outerRadiusX); x <= Math.ceil(center.x + outerRadiusX); x++) {
                for (let y = Math.floor(center.y - outerRadiusY); y <= Math.ceil(center.y + outerRadiusY); y++) {
                    for (let z = Math.floor(center.z - outerRadiusZ); z <= Math.ceil(center.z + outerRadiusZ); z++) {
                        const distanceSquared = ((x - center.x) / outerRadiusX) ** 2 + ((y - center.y) / outerRadiusY) ** 2 + ((z - center.z) / outerRadiusZ) ** 2;
                        if (distanceSquared <= 1 && distanceSquared >= (innerRadiusX / outerRadiusX) ** 2 && distanceSquared >= (innerRadiusY / outerRadiusY) ** 2 && distanceSquared >= (innerRadiusZ / outerRadiusZ) ** 2) {
                            placeBlockCallback({ x: x, y: y, z: z, dimension: dimension });
                        }
                    }
                    if ((Date.now() - msSinceLastYieldStart) >= (options?.minMSBetweenYields ?? 2000)) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined;
                    }
                }
                if ((Date.now() - msSinceLastYieldStart) >= (options?.minMSBetweenYields ?? 2000)) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        generatorProgress[generatorProgressId].endTick = system.currentTick;
        generatorProgress[generatorProgressId].endTime = Date.now();
        generatorProgress[generatorProgressId].done = true;
        return;
    }
    catch (e) {
        generatorProgress[generatorProgressId].endTick = system.currentTick;
        generatorProgress[generatorProgressId].endTime = Date.now();
        generatorProgress[generatorProgressId].done = true;
        throw (e);
    }
}
export function generateMinecraftOvoidC(center, radius, offset, thickness, dimension, placeBlockCallback = () => { }, integrity = 100) {
    const innerRadiusX = radius.x - thickness;
    const innerRadiusY = radius.y - thickness;
    const innerRadiusZ = radius.z - thickness;
    if ((integrity) != 100) {
        for (let x = Math.floor(center.x - radius.x - offset.x); x <= Math.ceil(center.x + radius.x + offset.x); x++) {
            for (let y = Math.floor(center.y - radius.y - offset.y); y <= Math.ceil(center.y + radius.y + offset.y); y++) {
                for (let z = Math.floor(center.z - radius.z - offset.z); z <= Math.ceil(center.z + radius.z + offset.z); z++) {
                    const distanceSquared = ((x - center.x) / (radius.x + offset.x)) ** 2 + ((y - center.y) / (radius.y + offset.y)) ** 2 + ((z - center.z) / (radius.z + offset.z)) ** 2;
                    if (distanceSquared <= 1 && distanceSquared >= (innerRadiusX / (radius.x + offset.x)) ** 2 && distanceSquared >= (innerRadiusY / (radius.y + offset.y)) ** 2 && distanceSquared >= (innerRadiusZ / (radius.z + offset.z)) ** 2) {
                        if (Math.random() <= ((integrity ?? 100) / 100)) {
                            placeBlockCallback({ x: x, y: y, z: z, dimension: dimension });
                        }
                    }
                }
            }
        }
    }
    else {
        for (let x = Math.floor(center.x - radius.x - offset.x); x <= Math.ceil(center.x + radius.x + offset.x); x++) {
            for (let y = Math.floor(center.y - radius.y - offset.y); y <= Math.ceil(center.y + radius.y + offset.y); y++) {
                for (let z = Math.floor(center.z - radius.z - offset.z); z <= Math.ceil(center.z + radius.z + offset.z); z++) {
                    const distanceSquared = ((x - center.x) / (radius.x + offset.x)) ** 2 + ((y - center.y) / (radius.y + offset.y)) ** 2 + ((z - center.z) / (radius.z + offset.z)) ** 2;
                    if (distanceSquared <= 1 && distanceSquared >= (innerRadiusX / (radius.x + offset.x)) ** 2 && distanceSquared >= (innerRadiusY / (radius.y + offset.y)) ** 2 && distanceSquared >= (innerRadiusZ / (radius.z + offset.z)) ** 2) {
                        placeBlockCallback({ x: x, y: y, z: z, dimension: dimension });
                    }
                }
            }
        }
    }
}
export function* generateMinecraftOvoidCG(center, radius, offset, thickness, generatorProgressId, dimension, placeBlockCallback = () => { }, options) {
    try {
        const innerRadiusX = radius.x - thickness;
        const innerRadiusY = radius.y - thickness;
        const innerRadiusZ = radius.z - thickness;
        generatorProgress[generatorProgressId] = { done: false, startTick: system.currentTick, startTime: Date.now(), containsUnloadedChunks: false };
        var msSinceLastYieldStart = Date.now();
        if ((options?.integrity ?? 100) != 100) {
            for (let x = Math.floor(center.x - radius.x); x <= Math.ceil(center.x + radius.x); x++) {
                for (let y = Math.floor(center.y - radius.y); y <= Math.ceil(center.y + radius.y); y++) {
                    for (let z = Math.floor(center.z - radius.z); z <= Math.ceil(center.z + radius.z); z++) {
                        const distanceSquared = ((x - center.x - offset.x) / radius.x) ** 2 + ((y - center.y - offset.y) / radius.y) ** 2 + ((z - center.z - offset.z) / radius.z) ** 2;
                        if (distanceSquared <= 1 && distanceSquared >= (innerRadiusX / radius.x) ** 2 && distanceSquared >= (innerRadiusY / radius.y) ** 2 && distanceSquared >= (innerRadiusZ / radius.z) ** 2) {
                            if (Math.random() <= ((options?.integrity ?? 100) / 100)) {
                                placeBlockCallback({ x: x, y: y, z: z, dimension: dimension });
                            }
                        }
                    }
                    if ((Date.now() - msSinceLastYieldStart) >= (options?.minMSBetweenYields ?? 2000)) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined;
                    }
                }
                if ((Date.now() - msSinceLastYieldStart) >= (options?.minMSBetweenYields ?? 2000)) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        else {
            for (let x = Math.floor(center.x - radius.x); x <= Math.ceil(center.x + radius.x); x++) {
                for (let y = Math.floor(center.y - radius.y); y <= Math.ceil(center.y + radius.y); y++) {
                    for (let z = Math.floor(center.z - radius.z); z <= Math.ceil(center.z + radius.z); z++) {
                        const distanceSquared = ((x - center.x - offset.x) / radius.x) ** 2 + ((y - center.y - offset.y) / radius.y) ** 2 + ((z - center.z - offset.z) / radius.z) ** 2;
                        if (distanceSquared <= 1 && distanceSquared >= ((innerRadiusX + offset.x) / radius.x) ** 2 && distanceSquared >= ((innerRadiusY + offset.y) / radius.y) ** 2 && distanceSquared >= ((innerRadiusZ + offset.z) / radius.z) ** 2) {
                            placeBlockCallback({ x: x, y: y, z: z, dimension: dimension });
                        }
                    }
                    if ((Date.now() - msSinceLastYieldStart) >= (options?.minMSBetweenYields ?? 2000)) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined;
                    }
                }
                if ((Date.now() - msSinceLastYieldStart) >= (options?.minMSBetweenYields ?? 2000)) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        generatorProgress[generatorProgressId].endTick = system.currentTick;
        generatorProgress[generatorProgressId].endTime = Date.now();
        generatorProgress[generatorProgressId].done = true;
        return;
    }
    catch (e) {
        generatorProgress[generatorProgressId].endTick = system.currentTick;
        generatorProgress[generatorProgressId].endTime = Date.now();
        generatorProgress[generatorProgressId].done = true;
        throw (e);
    }
}
export function generateSolidOvoid(center, radius, offset, dimension, placeBlockCallback = () => { }, integrity = 100) {
    if ((integrity) != 100) {
        for (let x = Math.floor(center.x - radius.x); x <= Math.ceil(center.x + radius.x); x++) {
            for (let y = Math.floor(center.y - radius.y); y <= Math.ceil(center.y + radius.y); y++) {
                for (let z = Math.floor(center.z - radius.z); z <= Math.ceil(center.z + radius.z); z++) {
                    const distanceSquared = ((x - center.x - offset.x) / radius.x) ** 2 + ((y - center.y - offset.y) / radius.y) ** 2 + ((z - center.z - offset.z) / radius.z) ** 2;
                    if (distanceSquared <= 1) {
                        if (Math.random() <= ((integrity ?? 100) / 100)) {
                            placeBlockCallback({ x: x, y: y, z: z, dimension: dimension });
                        }
                    }
                }
            }
        }
    }
    else {
        for (let x = Math.floor(center.x - radius.x); x <= Math.ceil(center.x + radius.x); x++) {
            for (let y = Math.floor(center.y - radius.y); y <= Math.ceil(center.y + radius.y); y++) {
                for (let z = Math.floor(center.z - radius.z); z <= Math.ceil(center.z + radius.z); z++) {
                    const distanceSquared = ((x - center.x - offset.x) / radius.x) ** 2 + ((y - center.y - offset.y) / radius.y) ** 2 + ((z - center.z - offset.z) / radius.z) ** 2;
                    if (distanceSquared <= 1) {
                        placeBlockCallback({ x: x, y: y, z: z, dimension: dimension });
                    }
                }
            }
        }
    }
}
export function* generateSolidOvoidBG(center, radius, offset, generatorProgressId, dimension, placeBlockCallback = () => { }, options) {
    try {
        generatorProgress[generatorProgressId] = { done: false, startTick: system.currentTick, startTime: Date.now(), containsUnloadedChunks: false };
        var msSinceLastYieldStart = Date.now();
        if ((options?.integrity) != 100) {
            for (let x = Math.floor(center.x - radius.x); x <= Math.ceil(center.x + radius.x); x++) {
                for (let y = Math.floor(center.y - radius.y); y <= Math.ceil(center.y + radius.y); y++) {
                    for (let z = Math.floor(center.z - radius.z); z <= Math.ceil(center.z + radius.z); z++) {
                        const distanceSquared = ((x - center.x) / radius.x) ** 2 + ((y - center.y) / radius.y) ** 2 + ((z - center.z) / radius.z) ** 2;
                        if (distanceSquared <= 1) {
                            if (Math.random() <= ((options?.integrity ?? 100) / 100)) {
                                placeBlockCallback({ x: x, y: y, z: z, dimension: dimension });
                            }
                        }
                    }
                    if ((Date.now() - msSinceLastYieldStart) >= (options?.minMSBetweenYields ?? 2000)) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined;
                    }
                }
                if ((Date.now() - msSinceLastYieldStart) >= (options?.minMSBetweenYields ?? 2000)) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        else {
            for (let x = Math.floor(center.x - radius.x); x <= Math.ceil(center.x + radius.x); x++) {
                for (let y = Math.floor(center.y - radius.y); y <= Math.ceil(center.y + radius.y); y++) {
                    for (let z = Math.floor(center.z - radius.z); z <= Math.ceil(center.z + radius.z); z++) {
                        const distanceSquared = ((x - center.x) / radius.x) ** 2 + ((y - center.y) / radius.y) ** 2 + ((z - center.z) / radius.z) ** 2;
                        if (distanceSquared <= 1) {
                            placeBlockCallback({ x: x, y: y, z: z, dimension: dimension });
                        }
                    }
                    if ((Date.now() - msSinceLastYieldStart) >= (options?.minMSBetweenYields ?? 2000)) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined;
                    }
                }
                if ((Date.now() - msSinceLastYieldStart) >= (options?.minMSBetweenYields ?? 2000)) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        generatorProgress[generatorProgressId].endTick = system.currentTick;
        generatorProgress[generatorProgressId].endTime = Date.now();
        generatorProgress[generatorProgressId].done = true;
        return;
    }
    catch (e) {
        generatorProgress[generatorProgressId].endTick = system.currentTick;
        generatorProgress[generatorProgressId].endTime = Date.now();
        generatorProgress[generatorProgressId].done = true;
        throw (e);
    }
}
export function generateSkygrid(from, to, gridSize, dimension, placeBlockCallback = () => { }, integrity = 100) {
    const startX = Math.floor(from.x);
    const startY = Math.floor(from.y);
    const startZ = Math.floor(from.z);
    const endX = Math.floor(to.x);
    const endY = Math.floor(to.y);
    const endZ = Math.floor(to.z);
    if ((integrity ?? 100) != 100) {
        for (let x = startX; x <= endX; x += gridSize) {
            for (let y = startY; y <= endY; y += gridSize) {
                for (let z = startZ; z <= endZ; z += gridSize) {
                    if (Math.random() <= ((integrity ?? 100) / 100)) {
                        placeBlockCallback({ x: Math.floor(x), y: Math.floor(y), z: Math.floor(z), dimension: dimension });
                    }
                }
            }
        }
    }
    else {
        for (let x = startX; x <= endX; x += gridSize) {
            for (let y = startY; y <= endY; y += gridSize) {
                for (let z = startZ; z <= endZ; z += gridSize) {
                    placeBlockCallback({ x: Math.floor(x), y: Math.floor(y), z: Math.floor(z), dimension: dimension });
                }
            }
        }
    }
}
export function generateInverseSkygrid(from, to, gridSize, dimension, placeBlockCallback = () => { }, integrity = 100) {
    const startX = Math.floor(from.x);
    const startY = Math.floor(from.y);
    const startZ = Math.floor(from.z);
    const endX = Math.floor(to.x);
    const endY = Math.floor(to.y);
    const endZ = Math.floor(to.z);
    if ((integrity ?? 100) != 100) {
        for (let x = startX; x <= endX; x++) {
            for (let y = startY; y <= endY; y++) {
                for (let z = startZ; z <= endZ; z++) {
                    if (Math.floor(x) % gridSize !== 0 && Math.floor(y) % gridSize !== 0 && Math.floor(z) % gridSize !== 0) {
                        if (Math.random() <= ((integrity ?? 100) / 100)) {
                            placeBlockCallback({ x: Math.floor(x), y: Math.floor(y), z: Math.floor(z), dimension: dimension });
                        }
                    }
                }
            }
        }
    }
    else {
        for (let x = startX; x <= endX; x++) {
            for (let y = startY; y <= endY; y++) {
                for (let z = startZ; z <= endZ; z++) {
                    if (Math.floor(x) % gridSize !== 0 && Math.floor(y) % gridSize !== 0 && Math.floor(z) % gridSize !== 0) {
                        placeBlockCallback({ x: Math.floor(x), y: Math.floor(y), z: Math.floor(z), dimension: dimension });
                    }
                }
            }
        }
    }
}
export function* generateSkygridBG(from, to, gridSize, generatorProgressId, dimension, placeBlockCallback = () => { }, options) {
    try {
        const startX = Math.floor(from.x);
        const startY = Math.floor(from.y);
        const startZ = Math.floor(from.z);
        const endX = Math.floor(to.x);
        const endY = Math.floor(to.y);
        const endZ = Math.floor(to.z);
        generatorProgress[generatorProgressId] = { done: false, startTick: system.currentTick, startTime: Date.now(), containsUnloadedChunks: false };
        var index = 0n;
        var msSinceLastYieldStart = Date.now();
        if ((options?.integrity ?? 100) != 100) {
            for (let x = startX; x <= endX; x += gridSize) {
                for (let y = startY; y <= endY; y += gridSize) {
                    for (let z = startZ; z <= endZ; z += gridSize) {
                        if (Math.random() <= ((options?.integrity ?? 100) / 100)) {
                            placeBlockCallback({ x: Math.floor(x), y: Math.floor(y), z: Math.floor(z), dimension: dimension }, index);
                        }
                        index++;
                    }
                    if ((Date.now() - msSinceLastYieldStart) >= (options?.minMSBetweenYields ?? 2000)) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined;
                    }
                }
                if ((Date.now() - msSinceLastYieldStart) >= (options?.minMSBetweenYields ?? 2000)) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        else {
            for (let x = startX; x <= endX; x += gridSize) {
                for (let y = startY; y <= endY; y += gridSize) {
                    for (let z = startZ; z <= endZ; z += gridSize) {
                        placeBlockCallback({ x: Math.floor(x), y: Math.floor(y), z: Math.floor(z), dimension: dimension }, index);
                        index++;
                    }
                    if ((Date.now() - msSinceLastYieldStart) >= (options?.minMSBetweenYields ?? 2000)) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined;
                    }
                }
                if ((Date.now() - msSinceLastYieldStart) >= (options?.minMSBetweenYields ?? 2000)) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        generatorProgress[generatorProgressId].endTick = system.currentTick;
        generatorProgress[generatorProgressId].endTime = Date.now();
        generatorProgress[generatorProgressId].done = true;
        return;
    }
    catch (e) {
        generatorProgress[generatorProgressId].endTick = system.currentTick;
        generatorProgress[generatorProgressId].endTime = Date.now();
        generatorProgress[generatorProgressId].done = true;
        throw (e);
    }
}
export function* generateInverseSkygridBG(from, to, gridSize, generatorProgressId, dimension, placeBlockCallback = () => { }, options) {
    try {
        const startX = Math.floor(from.x);
        const startY = Math.floor(from.y);
        const startZ = Math.floor(from.z);
        const endX = Math.floor(to.x);
        const endY = Math.floor(to.y);
        const endZ = Math.floor(to.z);
        generatorProgress[generatorProgressId] = { done: false, startTick: system.currentTick, startTime: Date.now(), containsUnloadedChunks: false };
        var index = 0n;
        var msSinceLastYieldStart = Date.now();
        if ((options?.integrity ?? 100) != 100) {
            for (let x = startX; x <= endX; x++) {
                for (let y = startY; y <= endY; y++) {
                    for (let z = startZ; z <= endZ; z++) {
                        if (Math.floor(startX - x) % gridSize === 0 && Math.floor(startY - y) % gridSize === 0 && Math.floor(startZ - z) % gridSize === 0) {
                            index++;
                            continue; // Skip positions where the skygrid would generate blocks
                        }
                        if (Math.random() <= ((options?.integrity ?? 100) / 100)) {
                            placeBlockCallback({ x: Math.floor(x), y: Math.floor(y), z: Math.floor(z), dimension: dimension }, index);
                        }
                        index++;
                    }
                    if ((Date.now() - msSinceLastYieldStart) >= (options?.minMSBetweenYields ?? 2000)) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined;
                    }
                }
                if ((Date.now() - msSinceLastYieldStart) >= (options?.minMSBetweenYields ?? 2000)) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        else {
            for (let x = startX; x <= endX; x++) {
                for (let y = startY; y <= endY; y++) {
                    for (let z = startZ; z <= endZ; z++) {
                        //console.warn(x % gridSize, y % gridSize, z % gridSize)
                        if (Math.floor(startX - x) % gridSize === 0 && Math.floor(startY - y) % gridSize === 0 && Math.floor(startZ - z) % gridSize === 0) {
                            index++;
                            continue; // Skip positions where the skygrid would generate blocks
                        }
                        else {
                            placeBlockCallback({ x: Math.floor(x), y: Math.floor(y), z: Math.floor(z), dimension: dimension }, index);
                        }
                        index++;
                    }
                    if ((Date.now() - msSinceLastYieldStart) >= (options?.minMSBetweenYields ?? 2000)) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined;
                    }
                }
                if ((Date.now() - msSinceLastYieldStart) >= (options?.minMSBetweenYields ?? 2000)) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        generatorProgress[generatorProgressId].endTick = system.currentTick;
        generatorProgress[generatorProgressId].endTime = Date.now();
        generatorProgress[generatorProgressId].done = true;
        return;
    }
    catch (e) {
        generatorProgress[generatorProgressId].endTick = system.currentTick;
        generatorProgress[generatorProgressId].endTime = Date.now();
        generatorProgress[generatorProgressId].done = true;
        throw (e);
    }
}
export function generateTickingAreaFillCoordinates(area, dimension) {
    const locations = [];
    //${se}let b = new CompoundBlockVolume(); b.pushVolume({volume: new BlockVolume(Vector.one, Vector.multiply(Vector.one, 20)), action: 0}); bsend(b.getBlockLocationIterator()?.next()?.value); 
    for (let x = 0; !!(() => { for (const c of area.getBlockLocationIterator()) {
        return c;
    } })(); x++) {
        let a = (() => { for (const c of area.getBlockLocationIterator()) {
            return c;
        } })();
        area.pushVolume({ volume: new BlockVolume({ x: a.x - 64, y: area.getMin().y, z: a.z - 64 }, { x: a.x + 64, y: area.getMax().y, z: a.z + 64 }), action: 1 });
        locations.push(Object.assign(a, { dimension: dimension, y: 320 }));
    }
    return locations;
}
export function generateTickingAreaFillCoordinatesB(area, dimension, spawnEntityCallback = (l, e, i) => { try {
    let name = `generateTickingAreaFillCoordinates${Date.now()}EntityTickingArea${i}`;
    l.dimension.runCommand(`summon andexdb:tickingarea_6 ${name} ${vTStr(l)}`);
    e.push(l);
}
catch (e) {
    console.warn(e, e.stack);
} }) {
    const locations = [];
    //${se}let b = new CompoundBlockVolume(); b.pushVolume({volume: new BlockVolume(Vector.one, Vector.multiply(Vector.one, 20)), action: 0}); bsend(b.getBlockLocationIterator()?.next()?.value); 
    for (let x = 0; !!(() => { for (const c of area.getBlockLocationIterator()) {
        return c;
    } })(); x++) {
        let a = (() => { for (const c of area.getBlockLocationIterator()) {
            return c;
        } })();
        area.pushVolume({ volume: new BlockVolume({ x: a.x - 64, y: area.getMin().y, z: a.z - 64 }, { x: a.x + 64, y: area.getMax().y, z: a.z + 64 }), action: 1 });
        spawnEntityCallback(Object.assign(a, { dimension: dimension, y: 320 }), locations, x);
    }
    return locations;
}
export async function generateTickingAreaFillCoordinatesC(center, area, dimension, spawnEntityCallback = (l, e, i) => { try {
    let name = `generateTickingAreaFillCoordinates${Date.now()}EntityTickingArea${i}`;
    l.dimension.runCommand(`summon andexdb:tickingarea_6 ${name} ${vTStr(l)}`);
    e.push(l.dimension.getEntitiesAtBlockLocation(l).find(v => v.typeId == "andexdb:tickingarea_6" && v.nameTag == name));
}
catch (e) {
    console.warn(e, e.stack);
} }) {
    const locations = generateTickingAreaFillCoordinates(area, dimension).sort((a, b) => getDistance(a, center) - getDistance(b, center));
    const entities = [];
    //${se}let b = new CompoundBlockVolume(); b.pushVolume({volume: new BlockVolume(Vector.one, Vector.multiply(Vector.one, 20)), action: 0}); bsend(b.getBlockLocationIterator()?.next()?.value); 
    for (const l of locations) {
        system.runTimeout(() => spawnEntityCallback(l, entities, locations.indexOf(l)), 2 * locations.indexOf(l));
    }
    return new Promise((resolve, reject) => {
        system.runTimeout(() => resolve(entities), locations.length * 2);
    });
}
export function drawMinecraftCircle(center, radius, axis, precision = 360) {
    const coordinates = [];
    if (axis.toLowerCase().includes("y") || axis.toLowerCase().includes("ud") || axis.toLowerCase().includes("du")) {
        for (let i = 0; i < precision; i++) {
            const angle = i * Math.PI / 180;
            const xPos = center.x + (radius) * Math.cos(angle);
            const zPos = center.z + (radius) * Math.sin(angle);
            coordinates.push({ x: Math.floor(xPos), y: center.y, z: Math.floor(zPos) });
        }
    }
    else if (axis.toLowerCase().includes("x") || axis.toLowerCase().includes("ew") || axis.toLowerCase().includes("we")) {
        for (let i = 0; i < precision; i++) {
            const angle = i * Math.PI / 180;
            const zPos = center.z + (radius) * Math.cos(angle);
            const yPos = center.y + (radius) * Math.sin(angle);
            coordinates.push({ x: center.x, y: Math.floor(yPos), z: Math.floor(zPos) });
        }
    }
    else if (axis.toLowerCase().includes("z") || axis.toLowerCase().includes("ns") || axis.toLowerCase().includes("sn")) {
        for (let i = 0; i < precision; i++) {
            const angle = i * Math.PI / 180;
            const xPos = center.x + radius * Math.cos(angle);
            const yPos = center.y + radius * Math.sin(angle);
            coordinates.push({ x: Math.floor(xPos), y: Math.floor(yPos), z: center.z });
        }
    }
    return coordinates;
}
export function generateMinecraftTunnel(center, radius, length, axis, precision = 360) {
    const coordinates = new Set([]);
    if (axis.toLowerCase().includes("y") || axis.toLowerCase().includes("ud") || axis.toLowerCase().includes("du")) {
        for (let i = 0; i < precision; i++) {
            const angle = i * Math.PI / 180;
            const xPos = center.x + (radius) * Math.cos(angle);
            const zPos = center.z + (radius) * Math.sin(angle);
            Array.from(new BlockVolume({ x: Math.floor(xPos), y: center.y - (length / 2), z: Math.floor(zPos) }, { x: Math.floor(xPos), y: center.y + (length / 2), z: Math.floor(zPos) }).getBlockLocationIterator()).forEach(v => coordinates.add(v));
        }
    }
    else if (axis.toLowerCase().includes("x") || axis.toLowerCase().includes("ew") || axis.toLowerCase().includes("we")) {
        for (let i = 0; i < precision; i++) {
            const angle = i * Math.PI / 180;
            const zPos = center.z + (radius) * Math.cos(angle);
            const yPos = center.y + (radius) * Math.sin(angle);
            Array.from(new BlockVolume({ x: center.x - (length / 2), y: Math.floor(yPos), z: Math.floor(zPos) }, { x: center.x + (length / 2), y: Math.floor(yPos), z: Math.floor(zPos) }).getBlockLocationIterator()).forEach(v => coordinates.add(v));
        }
    }
    else if (axis.toLowerCase().includes("z") || axis.toLowerCase().includes("ns") || axis.toLowerCase().includes("sn")) {
        for (let i = 0; i < precision; i++) {
            const angle = i * Math.PI / 180;
            const xPos = center.x + radius * Math.cos(angle);
            const yPos = center.y + radius * Math.sin(angle);
            Array.from(new BlockVolume({ x: Math.floor(xPos), y: Math.floor(yPos), z: center.z - (length / 2) }, { x: Math.floor(xPos), y: Math.floor(yPos), z: center.z + (length / 2) }).getBlockLocationIterator()).forEach(v => coordinates.add(v));
        }
    }
    return Array.from(coordinates);
}
export function generateMinecraftTunnelSet(center, radius, length, axis, precision = 360) {
    const coordinates = new Set([]);
    if (axis.toLowerCase().includes("y") || axis.toLowerCase().includes("ud") || axis.toLowerCase().includes("du")) {
        for (let i = 0; i < precision; i++) {
            const angle = i * Math.PI / 180;
            const xPos = center.x + (radius) * Math.cos(angle);
            const zPos = center.z + (radius) * Math.sin(angle);
            Array.from(new BlockVolume({ x: Math.floor(xPos), y: center.y - (length / 2), z: Math.floor(zPos) }, { x: Math.floor(xPos), y: center.y + (length / 2), z: Math.floor(zPos) }).getBlockLocationIterator()).forEach(v => coordinates.add(v));
        }
    }
    else if (axis.toLowerCase().includes("x") || axis.toLowerCase().includes("ew") || axis.toLowerCase().includes("we")) {
        for (let i = 0; i < precision; i++) {
            const angle = i * Math.PI / 180;
            const zPos = center.z + (radius) * Math.cos(angle);
            const yPos = center.y + (radius) * Math.sin(angle);
            Array.from(new BlockVolume({ x: center.x - (length / 2), y: Math.floor(yPos), z: Math.floor(zPos) }, { x: center.y + (length / 2), y: Math.floor(yPos), z: Math.floor(zPos) }).getBlockLocationIterator()).forEach(v => coordinates.add(v));
        }
    }
    else if (axis.toLowerCase().includes("z") || axis.toLowerCase().includes("ns") || axis.toLowerCase().includes("sn")) {
        for (let i = 0; i < precision; i++) {
            const angle = i * Math.PI / 180;
            const xPos = center.x + radius * Math.cos(angle);
            const yPos = center.y + radius * Math.sin(angle);
            Array.from(new BlockVolume({ x: Math.floor(xPos), y: Math.floor(yPos), z: center.z - (length / 2) }, { x: Math.floor(xPos), y: Math.floor(yPos), z: center.z + (length / 2) }).getBlockLocationIterator()).forEach(v => coordinates.add(v));
        }
    }
    return coordinates;
}
export function drawMinecraftCircleB(center, radius, rotation, precision = 360) {
    const coordinates = new Set([]);
    for (let i = 0; i < precision; i++) {
        const angle = i * Math.PI / 180;
        const xPos = (radius) * Math.cos(angle);
        const zPos = (radius) * Math.sin(angle);
        const newPos = rotate(rotation.x, 0, rotation.y, [{ x: Math.floor(xPos), y: 0, z: Math.floor(zPos) }])[0];
        const value = { x: center.x + newPos.x, y: center.y + newPos.y, z: center.z + newPos.z };
        coordinates.add(value);
    }
    return Array.from(coordinates);
}
export function generateHollowSphere(center, radius, thickness) {
    const centerX = center.x;
    const centerY = center.y;
    const centerZ = center.z;
    const coordinates = [];
    for (let x = centerX - radius; x <= centerX + radius; x++) {
        for (let y = centerY - radius; y <= centerY + radius; y++) {
            for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2 + (z - centerZ) ** 2);
                if (distance >= radius - thickness && distance <= radius) {
                    coordinates.push({ x: x, y: y, z: z });
                }
            }
        }
    }
    return coordinates;
}
export function generateHollowSphereB(center, radius, thickness, dimension, placeBlockCallback) {
    const centerX = center.x;
    const centerY = center.y;
    const centerZ = center.z;
    for (let x = centerX - radius; x <= centerX + radius; x++) {
        for (let y = centerY - radius; y <= centerY + radius; y++) {
            for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2 + (z - centerZ) ** 2);
                if (distance >= radius - thickness && distance <= radius) {
                    placeBlockCallback({ x: x, y: y, z: z, dimension: dimension });
                }
            }
        }
    }
    return coordinates;
}
export function* generateHollowSphereBG(center, radius, thickness, dimension, generatorProgressId, minMSBetweenYields = 2000, placeBlockCallback = () => { }, onComplete = () => { }, integrity = 100) {
    try {
        const centerX = center.x;
        const centerY = center.y;
        const centerZ = center.z;
        generatorProgress[generatorProgressId] = { done: false, startTick: system.currentTick, startTime: Date.now(), containsUnloadedChunks: false };
        var index = 0n;
        var msSinceLastYieldStart = Date.now();
        if (integrity != 100) {
            for (let x = centerX - radius; x <= centerX + radius; x++) {
                for (let y = centerY - radius; y <= centerY + radius; y++) {
                    for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                        const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2 + (z - centerZ) ** 2);
                        if (distance >= radius - thickness && distance <= radius) {
                            if (Math.random() <= (integrity / 100)) {
                                placeBlockCallback({ x: x, y: y, z: z, dimension: dimension }, index);
                            }
                            index++;
                        }
                    }
                    if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined;
                    }
                }
                if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        else {
            for (let x = centerX - radius; x <= centerX + radius; x++) {
                for (let y = centerY - radius; y <= centerY + radius; y++) {
                    for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                        const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2 + (z - centerZ) ** 2);
                        if (distance >= radius - thickness && distance <= radius) {
                            placeBlockCallback({ x: x, y: y, z: z, dimension: dimension }, index);
                            index++;
                        }
                    }
                    if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined;
                    }
                }
                if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        onComplete();
        generatorProgress[generatorProgressId].endTick = system.currentTick;
        generatorProgress[generatorProgressId].endTime = Date.now();
        generatorProgress[generatorProgressId].done = true;
        return;
    }
    catch (e) {
        generatorProgress[generatorProgressId].endTick = system.currentTick;
        generatorProgress[generatorProgressId].endTime = Date.now();
        generatorProgress[generatorProgressId].done = true;
        throw (e);
    }
}
export function* generateDomeBG(center, radius, thickness, dimension, generatorProgressId, minMSBetweenYields = 2000, placeBlockCallback = () => { }, onComplete = () => { }, integrity = 100) {
    try {
        const centerX = center.x;
        const centerY = center.y;
        const centerZ = center.z;
        generatorProgress[generatorProgressId] = { done: false, startTick: system.currentTick, startTime: Date.now(), containsUnloadedChunks: false };
        var msSinceLastYieldStart = Date.now();
        if (integrity != 100) {
            for (let x = centerX - radius; x <= centerX + radius; x++) {
                for (let y = centerY - radius; y <= centerY + radius; y++) {
                    if (y >= centerY) {
                        for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                            const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2 + (z - centerZ) ** 2);
                            if (distance >= radius - thickness && distance <= radius) {
                                if (Math.random() <= (integrity / 100)) {
                                    placeBlockCallback({ x: x, y: y, z: z, dimension: dimension });
                                }
                            }
                        }
                        if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                            msSinceLastYieldStart = Date.now();
                            yield undefined;
                        }
                    }
                }
                if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        else {
            for (let x = centerX - radius; x <= centerX + radius; x++) {
                for (let y = centerY - radius; y <= centerY + radius; y++) {
                    if (y >= centerY) {
                        for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                            const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2 + (z - centerZ) ** 2);
                            if (distance >= radius - thickness && distance <= radius) {
                                placeBlockCallback({ x: x, y: y, z: z, dimension: dimension });
                            }
                        }
                        if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                            msSinceLastYieldStart = Date.now();
                            yield undefined;
                        }
                    }
                }
                if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        onComplete();
        generatorProgress[generatorProgressId].endTick = system.currentTick;
        generatorProgress[generatorProgressId].endTime = Date.now();
        generatorProgress[generatorProgressId].done = true;
        return;
    }
    catch (e) {
        generatorProgress[generatorProgressId].endTick = system.currentTick;
        generatorProgress[generatorProgressId].endTime = Date.now();
        generatorProgress[generatorProgressId].done = true;
        throw (e);
    }
}
export function* generateFillBG(begin, end, dimension, generatorProgressId, minMSBetweenYields = 2000, placeBlockCallback = () => { }, onComplete = () => { }, integrity = 100) {
    try {
        generatorProgress[generatorProgressId] = { done: false, startTick: system.currentTick, startTime: Date.now(), containsUnloadedChunks: false };
        var msSinceLastYieldStart = Date.now();
        var index = 0n;
        if (integrity != 100) {
            for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x++) {
                for (let y = Math.min(begin.y, end.y); y <= Math.max(begin.y, end.y); y++) {
                    for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z++) {
                        if (Math.random() <= (integrity / 100)) {
                            placeBlockCallback({ x: x, y: y, z: z, dimension: dimension }, index);
                        }
                        index++;
                    }
                    if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined;
                    }
                }
                if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        else {
            for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x++) {
                for (let y = Math.min(begin.y, end.y); y <= Math.max(begin.y, end.y); y++) {
                    for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z++) {
                        placeBlockCallback({ x: x, y: y, z: z, dimension: dimension }, index);
                        index++;
                    }
                    if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined;
                    }
                }
                if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        onComplete();
        generatorProgress[generatorProgressId].endTick = system.currentTick;
        generatorProgress[generatorProgressId].endTime = Date.now();
        generatorProgress[generatorProgressId].done = true;
        return;
    }
    catch (e) {
        generatorProgress[generatorProgressId].endTick = system.currentTick;
        generatorProgress[generatorProgressId].endTime = Date.now();
        generatorProgress[generatorProgressId].done = true;
        throw (e);
    }
}
export function* generateWallsFillBG(begin, end, dimension, generatorProgressId, minMSBetweenYields = 2000, placeBlockCallback = () => { }, onComplete = () => { }, integrity = 100) {
    try {
        generatorProgress[generatorProgressId] = { done: false, startTick: system.currentTick, startTime: Date.now(), containsUnloadedChunks: false };
        var index = 0n;
        var msSinceLastYieldStart = Date.now();
        if (integrity != 100) {
            for (let x = begin.x; x <= end.x; x++) {
                for (let y = begin.y; y <= end.y; y++) {
                    for (let z = begin.z; z <= end.z; (x == begin.x || x == end.x || z == end.z) ? z++ : z = end.z) {
                        if (Math.random() <= (integrity / 100)) {
                            placeBlockCallback({ x: x, y: y, z: z, dimension: dimension }, index);
                        }
                        index++;
                    }
                    if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined;
                    }
                }
                if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        else {
            for (let x = begin.x; x <= end.x; x++) {
                for (let y = begin.y; y <= end.y; y++) {
                    for (let z = begin.z; z <= end.z; (x == begin.x || x == end.x || z == end.z) ? z++ : z = end.z) {
                        placeBlockCallback({ x: x, y: y, z: z, dimension: dimension }, index);
                        index++;
                    }
                    if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined;
                    }
                }
                if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        onComplete();
        generatorProgress[generatorProgressId].endTick = system.currentTick;
        generatorProgress[generatorProgressId].endTime = Date.now();
        generatorProgress[generatorProgressId].done = true;
        return;
    }
    catch (e) {
        generatorProgress[generatorProgressId].endTick = system.currentTick;
        generatorProgress[generatorProgressId].endTime = Date.now();
        generatorProgress[generatorProgressId].done = true;
        throw (e);
    }
}
export function* generateHollowFillBG(begin, end, dimension, generatorProgressId, minMSBetweenYields = 2000, placeBlockCallback = () => { }, onComplete = () => { }, integrity = 100) {
    try {
        generatorProgress[generatorProgressId] = { done: false, startTick: system.currentTick, startTime: Date.now(), containsUnloadedChunks: false };
        var msSinceLastYieldStart = Date.now();
        var index = 0n;
        if (integrity != 100) {
            for (let x = begin.x; x <= end.x; x++) {
                for (let y = begin.y; y <= end.y; y++) {
                    for (let z = begin.z; z <= end.z; (x == begin.x || x == end.x || y == begin.y || y == end.y || z == end.z) ? z++ : z = end.z) {
                        if (Math.random() <= (integrity / 100)) {
                            placeBlockCallback({ x: x, y: y, z: z, dimension: dimension }, index);
                        }
                        index++;
                    }
                    if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined;
                    }
                }
                if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        else {
            for (let x = begin.x; x <= end.x; x++) {
                for (let y = begin.y; y <= end.y; y++) {
                    for (let z = begin.z; z <= end.z; (x == begin.x || x == end.x || y == begin.y || y == end.y || z == end.z) ? z++ : z = end.z) {
                        placeBlockCallback({ x: x, y: y, z: z, dimension: dimension }, index);
                        index++;
                    }
                    if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined;
                    }
                }
                if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        onComplete();
        generatorProgress[generatorProgressId].endTick = system.currentTick;
        generatorProgress[generatorProgressId].endTime = Date.now();
        generatorProgress[generatorProgressId].done = true;
        return;
    }
    catch (e) {
        generatorProgress[generatorProgressId].endTick = system.currentTick;
        generatorProgress[generatorProgressId].endTime = Date.now();
        generatorProgress[generatorProgressId].done = true;
        throw (e);
    }
}
export function* generateOutlineFillBG(begin, end, dimension, generatorProgressId, minMSBetweenYields = 2000, placeBlockCallback = () => { }, onComplete = () => { }, integrity = 100) {
    try {
        generatorProgress[generatorProgressId] = { done: false, startTick: system.currentTick, startTime: Date.now(), containsUnloadedChunks: false };
        var index = 0n;
        var msSinceLastYieldStart = Date.now();
        if (integrity != 100) {
            for (let x = begin.x; x <= end.x; x++) {
                for (let y = begin.y; y <= end.y; y++) {
                    for (let z = begin.z; z <= end.z; (((x == begin.x || x == end.x) && (y == begin.y || y == end.y)) || z == end.z) ? z++ : z = end.z) {
                        if (Math.random() <= (integrity / 100)) {
                            placeBlockCallback({ x: x, y: y, z: z, dimension: dimension }, index);
                        }
                    }
                    if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined;
                    }
                }
                if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        else {
            for (let x = begin.x; x <= end.x; x++) {
                for (let y = begin.y; y <= end.y; (x == begin.x || x == end.x || y == end.y) ? y++ : y = end.y) {
                    for (let z = begin.z; z <= end.z; (((x == begin.x || x == end.x) && (y == begin.y || y == end.y)) || z == end.z) ? z++ : z = end.z) {
                        placeBlockCallback({ x: x, y: y, z: z, dimension: dimension }, index);
                    }
                    if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined;
                    }
                }
                if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        onComplete();
        generatorProgress[generatorProgressId].endTick = system.currentTick;
        generatorProgress[generatorProgressId].endTime = Date.now();
        generatorProgress[generatorProgressId].done = true;
        return;
    }
    catch (e) {
        generatorProgress[generatorProgressId].endTick = system.currentTick;
        generatorProgress[generatorProgressId].endTime = Date.now();
        generatorProgress[generatorProgressId].done = true;
        throw (e);
    }
}
/**
 * Generates a minecraft sphere.
 * @deprecated Superceeded by generateMinecraftSphereBG().
 */
export function generateMinecraftSphere(center, radius) {
    const centerX = center.x;
    const centerY = center.y;
    const centerZ = center.z;
    const coordinates = [];
    for (let x = centerX - radius; x <= centerX + radius; x++) {
        for (let y = centerY - radius; y <= centerY + radius; y++) {
            for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                const distanceSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) + Math.pow(z - centerZ, 2);
                if (distanceSquared <= Math.pow(radius, 2)) {
                    coordinates.push({ x: x, y: y, z: z });
                }
            }
        }
    }
    return coordinates;
}
/**
 * Generates a minecraft sphere.
 * @deprecated Superceeded by generateMinecraftSphereBG().
 */
export function generateMinecraftSphereB(center, radius, dimension, placeBlockCallback) {
    const centerX = center.x;
    const centerY = center.y;
    const centerZ = center.z;
    var counter = 0;
    for (let x = centerX - radius; x <= centerX + radius; x++) {
        for (let y = centerY - radius; y <= centerY + radius; y++) {
            for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                const distanceSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) + Math.pow(z - centerZ, 2);
                if (distanceSquared <= Math.pow(radius, 2)) {
                    placeBlockCallback({ x: x, y: y, z: z, dimension: dimension });
                }
            }
        }
    }
    return counter;
}
export let generatorProgressIndex = 0;
export const generatorProgress = {};
export function generatorProgressIdGenerator() {
    let id = "generatorId" + generatorProgressIndex + "Time" + Date.now();
    generatorProgressIndex = (generatorProgressIndex + 1) % 32767;
    return id;
}
export let generateMinecraftSphereBGProgressIndex = 0;
export const generateMinecraftSphereBGProgress = {};
export function generateMinecraftSphereBGIdGenerator() {
    let id = "generatorId" + generateMinecraftSphereBGProgressIndex + "Time" + Date.now();
    generateMinecraftSphereBGProgressIndex = (generateMinecraftSphereBGProgressIndex + 1) % 32767;
    return id;
}
/**
 * Generates a minecraft sphere.
 * @version 1.2.0
 * @generator
 */
export function* generateMinecraftSphereBG(center, radius, dimension, generateMinecraftSphereBGProgressId, minMSBetweenYields = 2000, placeBlockCallback = () => { }, onComplete = () => { }, integrity = 100) {
    try {
        const centerX = center.x;
        const centerY = center.y;
        const centerZ = center.z;
        var index = 0n;
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId] = { done: false, startTick: system.currentTick, startTime: Date.now(), containsUnloadedChunks: false };
        var msSinceLastYieldStart = Date.now();
        if (integrity != 100) {
            for (let x = centerX - radius; x <= centerX + radius; x++) {
                for (let y = centerY - radius; y <= centerY + radius; y++) {
                    for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                        const distanceSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) + Math.pow(z - centerZ, 2);
                        if (distanceSquared <= Math.pow(radius, 2)) {
                            if (Math.random() <= (integrity / 100)) {
                                placeBlockCallback({ x: x, y: y, z: z, dimension: dimension }, index);
                            }
                        }
                        index++;
                    }
                    if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined;
                    }
                }
                if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        else {
            for (let x = centerX - radius; x <= centerX + radius; x++) {
                for (let y = centerY - radius; y <= centerY + radius; y++) {
                    for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                        const distanceSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) + Math.pow(z - centerZ, 2);
                        if (distanceSquared <= Math.pow(radius, 2)) {
                            placeBlockCallback({ x: x, y: y, z: z, dimension: dimension }, index);
                        }
                        index++;
                    }
                    if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined;
                    }
                }
                if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        onComplete();
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].endTick = system.currentTick;
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].endTime = Date.now();
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].done = true;
        return;
    }
    catch (e) {
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].endTick = system.currentTick;
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].endTime = Date.now();
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].done = true;
        throw (e);
    }
}
/**
 * Generates a minecraft cone.
 * @since 1.18.0-development.20
 * @version 1.0.0
 * @generator
 */
export function* generateMinecraftConeBG(center, radius, height, dimension, generateMinecraftConeBGProgressId, minMSBetweenYields = 2000, placeBlockCallback = () => { }, onComplete = () => { }, integrity = 100) {
    try {
        const centerX = center.x;
        const centerY = center.y;
        const centerZ = center.z;
        var index = 0n;
        generateMinecraftSphereBGProgress[generateMinecraftConeBGProgressId] = { done: false, startTick: system.currentTick, startTime: Date.now(), containsUnloadedChunks: false };
        let msSinceLastYieldStart = Date.now();
        for (let y = centerY; y <= centerY + height; y++) {
            const currentRadius = radius * (1 - (y - centerY) / height);
            for (let x = centerX - currentRadius; x <= centerX + currentRadius; x++) {
                for (let z = centerZ - currentRadius; z <= centerZ + currentRadius; z++) {
                    const distanceSquared = Math.pow(x - centerX, 2) + Math.pow(z - centerZ, 2);
                    if (distanceSquared <= Math.pow(currentRadius, 2)) {
                        if (integrity != 100) {
                            if (Math.random() <= (integrity / 100)) {
                                placeBlockCallback({ x: x, y: y, z: z, dimension: dimension }, index);
                            }
                        }
                        else {
                            placeBlockCallback({ x: x, y: y, z: z, dimension: dimension }, index);
                        }
                    }
                    index++;
                }
                if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
            if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                msSinceLastYieldStart = Date.now();
                yield undefined;
            }
        }
        onComplete();
        generateMinecraftSphereBGProgress[generateMinecraftConeBGProgressId].endTick = system.currentTick;
        generateMinecraftSphereBGProgress[generateMinecraftConeBGProgressId].endTime = Date.now();
        generateMinecraftSphereBGProgress[generateMinecraftConeBGProgressId].done = true;
        return;
    }
    catch (e) {
        generateMinecraftSphereBGProgress[generateMinecraftConeBGProgressId].endTick = system.currentTick;
        generateMinecraftSphereBGProgress[generateMinecraftConeBGProgressId].endTime = Date.now();
        generateMinecraftSphereBGProgress[generateMinecraftConeBGProgressId].done = true;
        throw (e);
    }
}
/**
 * Generates a minecraft top half semi-sphere.
 * @version 1.1.0
 * @generator
 */
export function* generateMinecraftSemiSphereBG(center, radius, dimension, generateMinecraftSphereBGProgressId, minMSBetweenYields = 2000, placeBlockCallback = () => { }, onComplete = () => { }, integrity = 100) {
    try {
        const centerX = center.x;
        const centerY = center.y;
        const centerZ = center.z;
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId] = { done: false, startTick: system.currentTick, startTime: Date.now(), containsUnloadedChunks: false };
        var index = 0n;
        var msSinceLastYieldStart = Date.now();
        if (integrity != 100) {
            for (let x = centerX - radius; x <= centerX + radius; x++) {
                for (let y = centerY - radius; y <= centerY + radius; y++) {
                    if (y >= centerY) {
                        for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                            const distanceSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) + Math.pow(z - centerZ, 2);
                            if (distanceSquared <= Math.pow(radius, 2)) {
                                if (Math.random() <= (integrity / 100)) {
                                    placeBlockCallback({ x: x, y: y, z: z, dimension: dimension }, index);
                                }
                            }
                            index++;
                        }
                        if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                            msSinceLastYieldStart = Date.now();
                            yield undefined;
                        }
                    }
                }
                if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        else {
            for (let x = centerX - radius; x <= centerX + radius; x++) {
                for (let y = centerY; y <= centerY + radius; y++) {
                    for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                        const distanceSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) + Math.pow(z - centerZ, 2);
                        if (distanceSquared <= Math.pow(radius, 2)) {
                            placeBlockCallback({ x: x, y: y, z: z, dimension: dimension }, index);
                        }
                        index++;
                    }
                    if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined;
                    }
                }
                if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        onComplete();
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].endTick = system.currentTick;
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].endTime = Date.now();
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].done = true;
        return;
    }
    catch (e) {
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].endTick = system.currentTick;
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].endTime = Date.now();
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].done = true;
        throw (e);
    }
}
/**
 * Generates a minecraft bottom half semi-sphere.
 * @version 1.1.0
 * @generator
 */
export function* generateMinecraftSemiSphereBGB(center, radius, dimension, generateMinecraftSphereBGProgressId, minMSBetweenYields = 2000, placeBlockCallback = () => { }, onComplete = () => { }, integrity = 100) {
    try {
        const centerX = center.x;
        const centerY = center.y;
        const centerZ = center.z;
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId] = { done: false, startTick: system.currentTick, startTime: Date.now(), containsUnloadedChunks: false };
        var index = 0n;
        var msSinceLastYieldStart = Date.now();
        if (integrity != 100) {
            for (let x = centerX - radius; x <= centerX + radius; x++) {
                for (let y = centerY - radius; y <= centerY + radius; y++) {
                    if (y >= centerY) {
                        for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                            const distanceSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) + Math.pow(z - centerZ, 2);
                            if (distanceSquared <= Math.pow(radius, 2)) {
                                if (Math.random() <= (integrity / 100)) {
                                    placeBlockCallback({ x: x, y: y, z: z, dimension: dimension }, index);
                                }
                            }
                            index++;
                        }
                        if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                            msSinceLastYieldStart = Date.now();
                            yield undefined;
                        }
                    }
                }
                if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        else {
            for (let x = centerX - radius; x <= centerX + radius; x++) {
                for (let y = centerY - radius; y <= centerY; y++) {
                    for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                        const distanceSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) + Math.pow(z - centerZ, 2);
                        if (distanceSquared <= Math.pow(radius, 2)) {
                            placeBlockCallback({ x: x, y: y, z: z, dimension: dimension }, index);
                        }
                        index++;
                    }
                    if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined;
                    }
                }
                if ((Date.now() - msSinceLastYieldStart) >= minMSBetweenYields) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        onComplete();
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].endTick = system.currentTick;
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].endTime = Date.now();
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].done = true;
        return;
    }
    catch (e) {
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].endTick = system.currentTick;
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].endTime = Date.now();
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].done = true;
        throw (e);
    }
}
/**
 * Generates a list of coordinates for a minecraft sphere.
 * @deprecated Legacy function that may cause the script to exceed the scripting memory limit.
 */
export async function drawMinecraftSphere(center, radius, precision = 360) {
    const coordinates = [];
    for (let i = 0; i < precision; i++) {
        coordinates.push(...drawMinecraftCircleB(center, radius, { x: 0, y: i }));
    }
    return (async () => {
        for (let i = 0; i < precision; i++) {
            coordinates.push(...drawMinecraftCircleB(center, radius, { x: 90, y: i }));
        }
        ;
        return [...new Set(coordinates)];
    })();
}
/**
 * Generates a list of coordinates for a lopsided minecraft sphere.
 * @deprecated Legacy function that may cause the script to exceed the scripting memory limit.
 */
export function drawMinecraftLopsidedSphere(center, radius) {
    const coordinates = [];
    for (let i = 0; i < 360; i++) {
        coordinates.push(...drawMinecraftCircleB(center, radius, { x: i, y: i }));
    }
    return coordinates;
}
/**
 * Generates a list of coordinates for a minecraft cylinder.
 * @deprecated Legacy function that may cause the script to exceed the scripting memory limit.
 */
export function generateMinecraftCylinder(blockType, radius, thickness, centerX, centerY, centerZ) {
    // Example command to create a hollow cylinder with air inside:
    const commands = [];
    for (let y = -radius; y <= radius; y++) {
        const height = Math.floor(Math.sqrt(radius * radius - y * y));
        for (let x = -height; x <= height; x++) {
            for (let z = -height; z <= height; z++) {
                const distance = Math.sqrt(x * x + y * y + z * z);
                if (distance >= radius - thickness && distance <= radius) {
                    commands.push(`/setblock ${centerX + x} ${centerY + y} ${centerZ + z} ${blockType}`);
                }
            }
        }
    }
    return commands;
}
export function roundVector3ToMiddleOfBlock(vector) {
    return { x: Math.floor(vector.x) + 0.5, y: Math.floor(vector.y) + 0.5, z: Math.floor(vector.z) + 0.5 };
}
export function roundVector3ToMiddleOfBlockFloorY(vector) {
    return { x: Math.floor(vector.x) + 0.5, y: Math.floor(vector.y), z: Math.floor(vector.z) + 0.5 };
} /*
declare global {
    class Entity {
        localTeleport(localTeleport: ILocalTeleport): void;
    }}; */
//# sourceMappingURL=coordinates.js.map