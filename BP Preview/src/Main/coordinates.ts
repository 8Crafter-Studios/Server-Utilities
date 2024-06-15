import { Block, Dimension, type DimensionLocation, DimensionType, Player, type Vector2, type Vector3, world, Entity, system, BlockVolume, CompoundBlockVolume, type BoundingBox, BoundingBoxUtils } from "@minecraft/server";
import { targetSelectorAllListC, targetSelectorAllListE, format_version } from "../Main";
import * as GameTest from "@minecraft/server-gametest";
import * as mcServer from "@minecraft/server";
import * as mcServerUi from "@minecraft/server-ui";/*
import * as mcServerAdmin from "@minecraft/server-admin";*//*
import * as mcDebugUtilities from "@minecraft/debug-utilities";*//*
import * as mcCommon from "@minecraft/common";*//*
import * as mcVanillaData from "@minecraft/vanilla-data";*/
import *  as main from "../Main";
import *  as coords from "Main/coordinates";
import *  as cmds from "Main/commands";
import *  as bans from "Main/ban";
import *  as uis from "Main/ui";
import *  as playersave from "Main/player_save";
import *  as spawnprot from "Main/spawn_protection";
import mcMath from "@minecraft/math.js";
import { shuffle, vTStr } from "Main/commands";
mcServer
mcServerUi/*
mcServerAdmin*//*
mcDebugUtilities*//*
mcCommon*/
GameTest/*
mcVanillaData*/
main
coords
cmds
bans
uis
playersave
spawnprot
mcMath

export const coordinates_format_version = "6.0.1";
export class Vector extends mcMath.Vector3Builder implements mcMath.Vector3Utils {
    zero = mcMath.VECTOR3_ZERO
    one = mcMath.VECTOR3_ONE
    up = mcMath.VECTOR3_UP
    down = mcMath.VECTOR3_DOWN
    north = mcMath.VECTOR3_NORTH
    south = mcMath.VECTOR3_SOUTH
    east = mcMath.VECTOR3_EAST
    west = mcMath.VECTOR3_WEST
    right = mcMath.VECTOR3_RIGHT
    left = mcMath.VECTOR3_LEFT
    back = mcMath.VECTOR3_BACK
    forward = mcMath.VECTOR3_FORWARD
    static zero = mcMath.VECTOR3_ZERO
    static one = mcMath.VECTOR3_ONE
    static up = mcMath.VECTOR3_UP
    static down = mcMath.VECTOR3_DOWN
    static north = mcMath.VECTOR3_NORTH
    static south = mcMath.VECTOR3_SOUTH
    static east = mcMath.VECTOR3_EAST
    static west = mcMath.VECTOR3_WEST
    static right = mcMath.VECTOR3_RIGHT
    static left = mcMath.VECTOR3_LEFT
    static back = mcMath.VECTOR3_BACK
    static forward = mcMath.VECTOR3_FORWARD
    static add = mcMath.Vector3Utils.add
    static clamp = mcMath.Vector3Utils.clamp
    static cross = mcMath.Vector3Utils.cross
    static distance = mcMath.Vector3Utils.distance
    static dot = mcMath.Vector3Utils.dot
    static equals = mcMath.Vector3Utils.equals
    static floor = mcMath.Vector3Utils.floor
    static lerp = mcMath.Vector3Utils.lerp
    static magnitude = mcMath.Vector3Utils.magnitude
    static normalize = mcMath.Vector3Utils.normalize
    static scale = mcMath.Vector3Utils.scale
    static slerp = mcMath.Vector3Utils.slerp
    static subtract = mcMath.Vector3Utils.subtract
}
// LocalTeleport (Caret Notation ^^^)
export interface ILocalTeleport { 
    sway_1: number 
    heave_2: number 
    surge_3: number 
}
export class WorldPosition {
    x: number; 
    y: number; 
    z: number; 
    rotx: number; 
    roty: number; 
    dimension?: Dimension; 
    entity?: Entity; 
    block?: Block; 
    constructor(location: Vector3, rotation: Vector2, dimension?: DimensionType|Dimension|string, entity?: Entity|Player, block?: Block) {
        this.location = location; 
        this.rotation = rotation;  
        if(dimension == undefined){}else{this.dimension = world.getDimension((dimension as DimensionType)?.typeId ?? (dimension as Dimension)?.id ?? (dimension as string)); }; 
        this.entity = entity as Entity
        this.block = block/*
        if(dimension.constructor.name == DimensionType.constructor.name){this.dimension = world.getDimension((dimension as DimensionType)?.typeId)}else{this.dimension = world.getDimension((dimension as Dimension)?.id)}; */
    }
    get location() {
        return {x: this.x, y: this.y, z: this.z}; 
    }
    get locationstring() {
        return this.x+" "+this.y+" "+this.z; 
    }
    get rotation() {
        return {x: this.rotx, y: this.roty}; 
    }
    get rotationstring() {
        return this.rotx+" "+this.roty; 
    }
    get locationrotation() {
        return {x: this.x, y: this.y, z: this.z, rotx: this.rotx, roty: this.roty}; 
    }
    get directionvector() {
        return anglesToDirectionVectorDeg(this.rotx, this.roty) as Vector3; 
    }
    set location(location: Vector3) {
        this.x = location.x; 
        this.y = location.y; 
        this.z = location.z; 
    }
    set rotation(rotation: Vector2) {
        this.rotx = rotation.x; 
        this.roty = rotation.y; 
    }
    positioned(coordinateText: string) {
        this.location = coordinates(coordinateText, this.location, this.rotation); 
        return this as WorldPosition; 
    }
    in(dimension?: DimensionType|Dimension|string){
        if(dimension == undefined){this.dimension = undefined}else{this.dimension = world.getDimension((dimension as DimensionType)?.typeId ?? (dimension as Dimension)?.id ?? (dimension as string)); }; 
        return this as WorldPosition; 
    }
    rotated(x: number|string, y: number|string) {
        if(x.toString().startsWith("~")){this.rotx = (((this.rotx+Number(x.toString().slice(1) ?? "0")+180) % 360)-180)}else{this.rotx = Number(x.toString() ?? "0")}; 
        if(y.toString().startsWith("~")){this.roty = (((this.roty+Number(y.toString().slice(1) ?? "0")+90) % 180)-90)}else{this.roty = Number(y.toString() ?? "0")}; 
        return this as WorldPosition; 
    }
    at(target: string|Entity|Player) {
        if(target.constructor.name == "Entity"||target.constructor.name == "Player"){let entity = target as Entity; this.location = entity?.location ?? this.location; this.rotation = entity?.getRotation() ?? this.rotation; }else{
        if(this.entity == undefined){let entity = targetSelectorAllListE(target as string, this.x+" "+this.y+" "+this.z)[0] ?? this.entity; this.location = entity?.location ?? this.location; this.rotation = entity?.getRotation() ?? this.rotation; }else{let entity = targetSelectorAllListC(target as string, "", this.x+" "+this.y+" "+this.z, this.entity)[0] ?? this.entity; this.location = entity.location; this.rotation = entity.getRotation(); }}
        return this as WorldPosition; 
    }
    as(target: string|Entity|Player) {
        if(target.constructor.name == "Entity"||target.constructor.name == "Player"){this.entity = target as Entity; }else{
        if(this.entity == undefined){this.entity = targetSelectorAllListE(target as string, this.x+" "+this.y+" "+this.z)[0]; }else{this.entity = targetSelectorAllListC(target as string, "", this.x+" "+this.y+" "+this.z, this.entity)[0] ?? this.entity; }}
        return this as WorldPosition; 
    }
    asblock(block: DimensionLocation|Block) {
        if(block.constructor.name == "Block"){this.block = (block as Block)}else{this.block = block.dimension.getBlock(block as DimensionLocation)}; 
        return this as WorldPosition; 
    }
    matchrotation(target: string|Entity|Player) {
        if(target.constructor.name == "Entity"||target.constructor.name == "Player"){let entity = target as Entity; this.rotation = entity?.getRotation() ?? this.rotation; }else{
        if(this.entity == undefined){let entity = targetSelectorAllListE(target as string, this.x+" "+this.y+" "+this.z)[0] ?? this.entity; this.rotation = entity?.getRotation() ?? this.rotation; }else{let entity = targetSelectorAllListC(target as string, "", this.x+" "+this.y+" "+this.z, this.entity)[0] ?? this.entity; this.rotation = entity.getRotation(); }}
        return this as WorldPosition; 
    }
    matchlocation(target: string|Entity|Player) {
        if(target.constructor.name == "Entity"||target.constructor.name == "Player"){let entity = target as Entity; this.location = entity?.location ?? this.location; }else{
        if(this.entity == undefined){let entity = targetSelectorAllListE(target as string, this.x+" "+this.y+" "+this.z)[0] ?? this.entity; this.location = entity?.location ?? this.location; }else{let entity = targetSelectorAllListC(target as string, "", this.x+" "+this.y+" "+this.z, this.entity)[0] ?? this.entity; this.location = entity.location; this.rotation = entity.getRotation(); }}
        return this as WorldPosition; 
    }
    anchored(anchor: string) {
        if(this.entity != undefined){if(anchor.toLowerCase().includes("feet")){this.location = this.entity.location; }; if(anchor.toLowerCase().includes("eyes")){this.location = this.entity.getHeadLocation(); }; }; 
        return this as WorldPosition; 
    }
    resetRotation() {
        if(this.entity != undefined){this.rotation = this.entity.getRotation(); }; 
        return this as WorldPosition; 
    }
    facing(location: Vector3) {
        this.rotation = facingPoint(this.location, location).rot; 
        return this as WorldPosition; 
    }
    align(axis: string) {
        if(axis.toLowerCase().includes("x")){this.x = Math.round(this.x); }; 
        if(axis.toLowerCase().includes("y")){this.y = Math.round(this.y); }; 
        if(axis.toLowerCase().includes("z")){this.z = Math.round(this.z); }; 
        return this as WorldPosition; 
    }
    offset(offset: Vector3) {
        this.location = mcMath.Vector3Utils.add(this.location, offset); 
        return this as WorldPosition; 
    }
    static fromentity(entity: Entity|Player) {
        return new WorldPosition(entity?.location, entity?.getRotation(), entity?.dimension, entity)
    }
    static fromblock(block: Block) {
        const fdcb = [{x: 90, y: 0}, {x: -90, y: 0}, {x: 0, y: 180}, {x: 0, y: 0}, {x: 0, y: 90}, {x: 0, y: -90}]
        return new WorldPosition(block?.location, fdcb[Number(block?.permutation?.getState("facing_direction") ?? block?.permutation?.getState("minecraft:facing_direction") ?? 3) ?? 3] ?? {x: 0, y: 0}, block?.dimension, undefined, block)
    }
}; 
export const LocalTeleportFunctions = { 
    norm: ({ x, y, z }: Vector3, s: number) => { 
            const l = Math.hypot(x, y, z) 
            return { 
                    x: s * (x / l), 
                    y: s * (y / l), 
                    z: s * (z / l) 
            } 
    }, 

    xa: ({ x, y, z }: Vector3, s: number) => { 
            const m = Math.hypot(x, z) 
            const a = { 
                    x: z, 
                    y: 0, 
                    z: -x 
            } 

            return LocalTeleportFunctions.norm(a, s) 
    }, 

    ya: ({ x, y, z }: Vector3, s: number) => { 
            const m = Math.hypot(x, z) 

            const a = { 
                    x: (x / m) * -y, 
                    y: m, 
                    z: (z / m) * -y 
            } 

            return LocalTeleportFunctions.norm(a, s) 
    }, 

    za: (a: Vector3, s: number) => { 
            return LocalTeleportFunctions.norm(a, s) 
    } 
} 
Object.defineProperty(String.prototype, 'localTeleport', {value: function (localTeleport: ILocalTeleport) { 
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
}});
export function getDistance(point1: Vector3, point2: Vector3) {
    const deltaX = point2.x - point1.x;
    const deltaY = point2.y - point1.y;
    const deltaZ = point2.z - point1.z;

    return Math.sqrt(deltaX ** 2 + deltaY ** 2 + deltaZ ** 2);
}
export function getChunkIndex(location: Vector3){return {x: Math.floor(location.x/16), y: Math.floor(location.z/16)}}
export function getChunkIndexB(x: number, z: number){return {x: Math.floor(x/16), y: Math.floor(z/16)}}
export function getChunkIndexC(location: Vector2){return {x: Math.floor(location.x/16), y: Math.floor(location.y/16)}}
export function chunkIndexToBoundingBox(chunkIndex: Vector2, heightRange: [min: number, max: number] = [-64, 320]){return {from: {x: Math.floor(chunkIndex.x*16), y: heightRange[0], z: Math.floor(chunkIndex.y*16)}, to: {x: Math.round((chunkIndex.x*16)+15), y: heightRange[1], z: Math.round((chunkIndex.y*16)+15)}}}
export function doBoundingBoxesIntersect(box1: BoundingBox, box2: BoundingBox) {
    // Check for intersection along each axis
    const intersectX = (box1.min.x <= box2.max.x && box1.max.x >= box2.min.x);
    const intersectY = (box1.min.y <= box2.max.y && box1.max.y >= box2.min.y);
    const intersectZ = (box1.min.z <= box2.max.z && box1.max.z >= box2.min.z);

    // If all axes intersect, the bounding boxes intersect
    return intersectX && intersectY && intersectZ;
}
export const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
    Math.abs(v1 - v2) < epsilon;
export const approxEqual = (v1, v2, epsilon = 0.001) =>
    Math.abs(v1 - v2) < epsilon;
export const approximatelyEquals = (v1, v2, epsilon = 0.001) =>
    Math.abs(v1 - v2) < epsilon;
export const approxEquals = (v1, v2, epsilon = 0.001) =>
    Math.abs(v1 - v2) < epsilon;
export function parseExpression(str: string){return Function("wx, wy, wz, x, y, z, ax, ay, az, bx, by, bz, nx, ny, nz, px, py, pz", "return("+str.replaceAll(/(?<!\^)\^(?!\^)/g, "**").replaceAll(/(?<!\=)\=(?!\=)/g, "==").replaceAll("^^", "^").replaceAll(/\|([^\|]+)\|/g, "Math.abs($1)").replaceAll(/([0-9en])(?=[xyzXYZ\(])/g, "$1*").replaceAll(/(?<=[xyXYzZ\)])([xyXYzZ\(])/g, "*$1").replaceAll(/(?<=[xyXYzZ\)])((rz|ry|rz|ax|ay|az|bx|by|bz}nx|ny|nz|px|py|pz))/g, "*$1").replaceAll(/(?<!Math\.)(sqrt|cbrt|tan|cotan|abs|acos|acosh|asin|asinh|atan|atan2|atanh|ceil|clz32|cos|cosh|exp|expm1|floor|fround|hypot|imul|log|log1p|log2|log10|max|min|pow|random|round|sign|sin|sinh|tanh|trunc)/g, "Math.$1").replaceAll(/(?<=[0-9enlENLxyXY\)])(Math\.)/g, "*$1")+")")}
  
  
  
export function* generateMathExpression(expression: (wx: number, wy: number, wz: number, x: number, y: number, z: number, ax: number, ay: number, az: number, bx: number, by: number, bz: number, nx: number, ny: number, nz: number, px: number, py: number, pz: number)=>boolean, generateCallback: (location: {x: number, y: number, z: number, rx: number, ry: number, rz: number, ax: number, ay: number, az: number, bx: number, by: number, bz: number, nx: number, ny: number, nz: number, px: number, py: number, pz: number, count: bigint, index: bigint})=>any, from: Vector3, to: Vector3, pos1: Vector3, pos2: Vector3, step = 1): Generator<void, bigint, unknown> {
      var count = 0n;
      var index = 0n;
      for (let x = Math.min(from.x, to.x); x <= Math.max(from.x, to.x); x += step) {
      for (let y = Math.min(from.y, to.y); y <= Math.max(from.y, to.y); y += step) {
      for (let z = Math.min(from.z, to.z); z <= Math.max(from.z, to.z); z+= step) {
              if (expression(x, y, z, x-((from.x+to.x)/2), y-((from.y+to.y)/2), z-((from.z+to.z)/2), pos1.x, pos1.y, pos1.z, pos2.x, pos2.y, pos2.z, Math.min(from.x, to.x), Math.min(from.y, to.y), Math.min(from.z, to.z), Math.max(from.x, to.x), Math.max(from.y, to.y), Math.max(from.z, to.z))) {
                  generateCallback({ x: x, y: y, z: z, rx: x-((from.x+to.x)/2), ry: y-((from.y+to.y)/2), rz: z-((from.z+to.z)/2), ax: pos1.x, ay: pos1.y, az: pos1.z, bx: pos2.x, by: pos2.y, bz: pos2.z, nx: Math.min(from.x, to.x), ny: Math.min(from.y, to.y), nz: Math.min(from.z, to.z), px: Math.max(from.x, to.x), py: Math.max(from.y, to.y), pz: Math.max(from.z, to.z), count, index });
                  count++;
              }
              index++;
              yield void null;
      }
      }
      }
  
      return count;
  }
export interface DimensionVolumeArea{
    dimension: Dimension, 
    from: Vector3, 
    to: Vector3
}
export interface Vector4{
    w: number
    x: number
    y: number
    z: number
}
export interface Vector5{
    v: number
    w: number
    x: number
    y: number
    z: number
}
export interface RotationLocation{
    rotX: number
    rotY: number
    x: number
    y: number
    z: number
}
export interface DimensionRotationLocation{
    dimension: Dimension
    rotX: number
    rotY: number
    x: number
    y: number
    z: number
}
export function facingPoint(location: Vector3, otherLocation: Vector3) { 
    const sl = location
    const ol = otherLocation
    const x = (-ol.x)-sl.x
    const y = ol.y-sl.y
    const z = ol.z-sl.z/*
    let rotx = Math.atan2( y, z );
    let roty = 0
    if (z >= 0) {
       roty = -Math.atan2( x * Math.cos(rotx), z );
    }else{
       roty = Math.atan2( x * Math.cos(rotx), -z );
    }
    let rotz = Math.atan2( Math.cos(rotx), Math.sin(rotx) * Math.sin(roty) )*/
    let yaw = Math.atan2(x, z) *180.0/Math.PI;
    let padj = Math.sqrt(Math.pow(x, 2) + Math.pow(z, 2)); 
    let pitch = Math.atan2(padj, y) *180.0/Math.PI;

    const newPosition = { 
            x: pitch-90, 
            y: yaw
    } 

    return {rot: newPosition, difference: {x, y, z}}
}/*

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
export function caretNotation(location: Vector3, offset: Vector3, rot: Vector3) { 
    const { x, y, z } = offset /*
    const { location } = this */
    const viewDirection = rot

    const xx = LocalTeleportFunctions.xa(viewDirection, x) 
    const yy = LocalTeleportFunctions.ya(viewDirection, y) 
    const zz = LocalTeleportFunctions.za(viewDirection, z) 

    const newPosition = { 
            x: Number((location.x + xx.x + yy.x + zz.x).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 5))), 
            y: Number((location.y + xx.y + yy.y + zz.y).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 5))), 
            z: Number((location.z + xx.z + yy.z + zz.z).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 5))) 
    } 

    return newPosition
}
export function caretNotationB(location: Vector3, r: number, {x, y}: Vector2) { 
    const Z = r*(-Math.cos(x)*Math.sin(y), -Math.sin(x), Math.cos(x)*Math.cos(y))
    const Y = r*(-Math.sin(x)*Math.sin(y), Math.cos(x), Math.sin(x)*Math.cos(y))
    const X = r*(Math.cos(y), 0, Math.sin(y))

    const newPosition = { 
            x: location.x + X, 
            y: location.y + Y, 
            z: location.z + Z 
    } 

    return newPosition
}
export function caretNotationC(location: Vector3, offset: Vector3, rot: Vector2) { 
    return caretNotation(location, offset, anglesToDirectionVectorDeg(rot.x, rot.y))
}
export function caretNotationD(location: Vector3, offset: Vector3, rot: Vector3) { 
    const { x, y, z } = offset /*
    const { location } = this */
    const viewDirection = rot

    const xx = LocalTeleportFunctions.xa(viewDirection, x) 
    const yy = LocalTeleportFunctions.ya(viewDirection, y) 

    const newPosition = { 
            x: location.x + xx.x + yy.x, 
            y: location.y + xx.y + yy.y, 
            z: location.z + xx.z + yy.z 
    } 

    return newPosition
}/*
Math.asin*/
export function anglesToDirectionVector(yaw: number, pitch: number/*, roll: number*/) {
    const cosYaw = Math.cos(yaw);
    const sinYaw = Math.sin(yaw);
    const cosPitch = Math.cos(pitch);
    const sinPitch = Math.sin(pitch);/*
    const cosRoll = Math.cos(roll);
    const sinRoll = Math.sin(roll);*/

    // Calculate components of the normalized direction vector
    const x = Number((cosYaw * cosPitch).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 5)));
    const y = Number((-sinYaw).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 5)));
    const z = Number((cosYaw * sinPitch).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 5)));

    return { x, y, z };
}
export function anglesToDirectionVectorDeg(yaw: number, pitch: number/*, roll: number*/) {
    const cosYaw = Math.cos((Math.PI/180)*yaw);
    const sinYaw = Math.sin((Math.PI/180)*yaw);
    const cosPitch = Math.cos((Math.PI/180)*(90+pitch));
    const sinPitch = Math.sin((Math.PI/180)*(90+pitch));/*
    const cosRoll = Math.cos((Math.PI/180)*roll);
    const sinRoll = Math.sin((Math.PI/180)*roll);*/

    // Calculate components of the normalized direction vector
    const x = Number((cosYaw * cosPitch).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 5)));
    const y = Number((-sinYaw).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 5)));
    const z = Number((cosYaw * sinPitch).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 5)));

    return { x, y, z };
}
export function rotate(pitchb: number, rollb: number, yawb: number, points) {
    let pitch = (pitchb*(Math.PI/180))
    let roll = (rollb*(Math.PI/180))
    let yaw = (yawb*(Math.PI/180))
    var cosa = Math.cos(yaw);
    var sina = Math.sin(yaw);

    var cosb = Math.cos(pitch);
    var sinb = Math.sin(pitch);

    var cosc = Math.cos(roll);
    var sinc = Math.sin(roll);

    var Axx = cosa*cosb;
    var Axy = cosa*sinb*sinc - sina*cosc;
    var Axz = cosa*sinb*cosc + sina*sinc;

    var Ayx = sina*cosb;
    var Ayy = sina*sinb*sinc + cosa*cosc;
    var Ayz = sina*sinb*cosc - cosa*sinc;

    var Azx = -sinb;
    var Azy = cosb*sinc;
    var Azz = cosb*cosc;

    for (var i = 0; i < points.length; i++) {
        var px = points[i].x;
        var py = points[i].y;
        var pz = points[i].z;

        points[i].x = Number((Axx*px + Axy*py + Axz*pz).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 10)));
        points[i].y = Number((Ayx*px + Ayy*py + Ayz*pz).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 10)));
        points[i].z = Number((Azx*px + Azy*py + Azz*pz).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 10)));
    }; 
    return points; 
}
export function rotate3d(points, pitchb, rollb, yawb){
    let pitch = (pitchb*(Math.PI/180))
    let roll = (rollb*(Math.PI/180))
    let yaw = (yawb*(Math.PI/180))
    let cosa = Math.cos(yaw),
        sina = Math.sin(yaw);
    let cosb = Math.cos(pitch),
        sinb = Math.sin(pitch);
    let cosc = Math.cos(roll),
        sinc = Math.sin(roll);
    let Axx = cosa*cosb,
        Axy = cosa*sinb*sinc - sina*cosc,
        Axz = cosa*sinb*cosc + sina*sinc;
    let Ayx = sina*cosb,
        Ayy = sina*sinb*sinc + cosa*cosc,
        Ayz = sina*sinb*cosc - cosa*sinc;
    let Azx = -sinb,
        Azy = cosb*sinc,
        Azz = cosb*cosc;
    let px = points[0];
    let py = points[1];
    let pz = points[2];
    points[0] = Number((Axx*px + Axy*py + Axz*pz).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 10)));
    points[1] = Number((Ayx*px + Ayy*py + Ayz*pz).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 10)));
    points[2] = Number((Azx*px + Azy*py + Azz*pz).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 10)));
    return points;
}
export function movePointInDirection(point: Vector3, direction: Vector2, distance: Vector3){
let add = rotate(direction.x, 0, direction.y, [{x: distance.x, y: distance.y, z: distance.z}])[0]; return {x: add.x + point.x, y: add.y + point.y, z: add.z + point.z}
}
export function evaluateCoordinates(x: string, y: string, z: string, startingPosition: Vector3, rotation: Vector2){
let coordinates = startingPosition; 
[x, y, z].forEach((v, i)=>{if(v.startsWith("^")){if(v.length == 1){}else{let crds = [0, 0, 0]; crds[i] = Number(v.slice(1)); coordinates = caretNotationC(coordinates, {x: crds[0], y: crds[1], z: crds[2]}, rotation)}}}); 
[x, y, z].forEach((v, i)=>{if(v.startsWith("~")){if(v.length == 1){}else{let crds = [coordinates.x, coordinates.y, coordinates.z]; crds[i] = crds[i] + Number(v.slice(1)); coordinates = {x: crds[0], y: crds[1], z: crds[2]}}}}); 
[x, y, z].forEach((v, i)=>{if(v.startsWith("*")){if(v.length == 1){let crds = [coordinates.x, coordinates.y, coordinates.z]; let crdsb = [startingPosition.x, startingPosition.y, startingPosition.z]; crds[i] = crdsb[i]; coordinates = {x: crds[0], y: crds[1], z: crds[2]}}else{let crds = [coordinates.x, coordinates.y, coordinates.z]; let crdsb = [startingPosition.x, startingPosition.y, startingPosition.z]; crds[i] = crdsb[i] + Number(v.slice(1)); coordinates = {x: crds[0], y: crds[1], z: crds[2]}}}}); 
[x, y, z].forEach((v, i)=>{if(v.startsWith("~")){}else{if(v.startsWith("^")){}else{if(v.startsWith("*")){}else{let crds = [coordinates.x, coordinates.y, coordinates.z]; crds[i] = Number(v.slice(0)); coordinates = {x: crds[0], y: crds[1], z: crds[2]}}}}}); 
return coordinates
}
export function evaluateRotationCoordinates(x: string, y: string, rotation: Vector2){
let coordinates = rotation; 
[x, y].forEach((v, i)=>{if(v.startsWith("~")){if(v.length == 1){}else{let crds = [coordinates.x, coordinates.y]; crds[i] = crds[i] + Number(v.slice(1)); coordinates = {x: crds[0], y: crds[1]}}}}); 
[x, y].forEach((v, i)=>{if(v.startsWith("*")){if(v.length == 1){let crds = [coordinates.x, coordinates.y]; let crdsb = [rotation.x, rotation.y]; crds[i] = crdsb[i]; coordinates = {x: crds[0], y: crds[1]}}else{let crds = [coordinates.x, coordinates.y]; let crdsb = [rotation.x, rotation.y]; crds[i] = crdsb[i] + Number(v.slice(1)); coordinates = {x: crds[0], y: crds[1]}}}}); 
[x, y].forEach((v, i)=>{if(v.startsWith("~")){}else{if(v.startsWith("^")){}else{if(v.startsWith("*")){}else{let crds = [coordinates.x, coordinates.y]; crds[i] = Number(v.slice(0)); coordinates = {x: crds[0], y: crds[1]}}}}}); 
return coordinates
}
export function evaluateCoordinatesB(x: string, y: string, z: string, startingPosition: Vector3, rotation: Vector3){
let coordinates = startingPosition; 
[x, y, z].forEach((v, i)=>{if(v.startsWith("^")){if(v.length == 1){}else{let crds = [0, 0, 0]; crds[i] = Number(v.slice(1)); coordinates = caretNotation(coordinates, {x: crds[0], y: crds[1], z: crds[2]}, rotation)}}}); 
[x, y, z].forEach((v, i)=>{if(v.startsWith("~")){if(v.length == 1){}else{let crds = [coordinates.x, coordinates.y, coordinates.z]; crds[i] = crds[i] + Number(v.slice(1)); coordinates = {x: crds[0], y: crds[1], z: crds[2]}}}}); 
[x, y, z].forEach((v, i)=>{if(v.startsWith("*")){if(v.length == 1){let crds = [coordinates.x, coordinates.y, coordinates.z]; let crdsb = [startingPosition.x, startingPosition.y, startingPosition.z]; crds[i] = crdsb[i]; coordinates = {x: crds[0], y: crds[1], z: crds[2]}}else{let crds = [coordinates.x, coordinates.y, coordinates.z]; let crdsb = [startingPosition.x, startingPosition.y, startingPosition.z]; crds[i] = crdsb[i] + Number(v.slice(1)); coordinates = {x: crds[0], y: crds[1], z: crds[2]}}}}); 
[x, y, z].forEach((v, i)=>{if(v.startsWith("~")){}else{if(v.startsWith("^")){}else{if(v.startsWith("*")){}else{let crds = [coordinates.x, coordinates.y, coordinates.z]; crds[i] = Number(v.slice(0)); coordinates = {x: crds[0], y: crds[1], z: crds[2]}}}}}); 
return coordinates
}
export function coordinatesB(coordinateText: string, startingPosition: Vector3, rotation: Vector3){
    let location = {x: NaN, y: NaN, z: NaN}
    try{location = evaluateCoordinatesB(coordinateText.split(/(?=[\^\!\~\*\&\s])/g)[0], coordinateText.split(/(?=[\^\!\~\*\&\s])/g)[1], coordinateText.split(/(?=[\^\!\~\*\&\s])/g)[2], startingPosition, rotation)}catch(e){console.error(e, e.stack)}
return location
}
export function coordinates(coordinateText: string, startingPosition: Vector3, rotation: Vector2){
    let location = {x: NaN, y: NaN, z: NaN}
    try{location = evaluateCoordinates(coordinateText.split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[0].replaceAll(" ", ""), coordinateText.split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[1].replaceAll(" ", ""), coordinateText.split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[2].replaceAll(" ", ""), startingPosition, rotation)}catch(e){console.error(e, e.stack)}
return location
}
export function coordinatesC(coordinateText: string, source: Entity){
    let location = {x: NaN, y: NaN, z: NaN}
    let startingPosition = source?.location ?? {x: 0, y: 0, z: 0}
    let rotation = source?.getRotation() ?? {x: 0, y: 0}
    try{location = evaluateCoordinates(coordinateText.split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[0].replaceAll(" ", ""), coordinateText.split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[1].replaceAll(" ", ""), coordinateText.split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[2].replaceAll(" ", ""), startingPosition, rotation)}catch(e){console.error(e, e.stack)}
return location
}
export function coordinatesD(coordinateText: string, source: Entity|Block, rotation: Vector2){
    let location = {x: NaN, y: NaN, z: NaN}
    let startingPosition = source?.location ?? {x: 0, y: 0, z: 0}
    try{location = evaluateCoordinates(coordinateText.split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[0].replaceAll(" ", ""), coordinateText.split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[1].replaceAll(" ", ""), coordinateText.split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[2].replaceAll(" ", ""), startingPosition, rotation)}catch(e){console.error(e, e.stack)}
return location
}
export function coordinatesE(coordinateText: string, source: Entity|Block, rotation: Vector3){
    let location = {x: NaN, y: NaN, z: NaN}
    let startingPosition = source?.location ?? {x: 0, y: 0, z: 0}
    try{location = evaluateCoordinatesB(coordinateText.split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[0].replaceAll(" ", ""), coordinateText.split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[1].replaceAll(" ", ""), coordinateText.split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[2].replaceAll(" ", ""), startingPosition, rotation)}catch(e){console.error(e, e.stack)}
return location
}
export function degradeArray(array: any[]/*, mode: "removeElements"|"changeTextOfStrings"|"corruptElements"|"removeElementsAndSubElements"*/, integrity: number, seed?: number) {
    return shuffle([...array]).slice(0, array.length*(Math.min(array.length, integrity/100)))
}
export function generateCircleCoordinates(centerX: number, centerY: number, centerZ: number, radius: number, axis: "x"|"y"|"z"|"ns"|"sn"|"ew"|"we"|"ud"|"du"|"X"|"Y"|"Z"|"NS"|"SN"|"EW"|"WE"|"UD"|"DU") {
    const coordinates = [];
    const diameter = radius * 2;

    if(axis.toLowerCase()=="y"||axis.toLowerCase()=="ud"||axis.toLowerCase()=="du"){
    for (let x = -radius; x <= radius; x++) {
        for (let z = -radius; z <= radius; z++) {
            if (x * x + z * z <= radius * radius) {
                const blockX = centerX + x;
                const blockZ = centerZ + z;
                coordinates.push({ x: blockX, y: centerY, z: blockZ });
            }
        }
    }
    }else if(axis.toLowerCase()=="x"||axis.toLowerCase()=="ew"||axis.toLowerCase()=="we"){
    for (let y = -radius; y <= radius; y++) {
        for (let z = -radius; z <= radius; z++) {
            if (y * y + z * z <= radius * radius) {
                const blockY = centerY + y;
                const blockZ = centerZ + z;
                coordinates.push({ x: centerX, y: blockY, z: blockZ });
            }
        }
    }
    }else if(axis.toLowerCase()=="z"||axis.toLowerCase()=="ns"||axis.toLowerCase()=="sn"){
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
export function generateCircleCoordinatesB(center: Vector3, radius: number, axis: "x"|"y"|"z"|"ns"|"sn"|"ew"|"we"|"ud"|"du"|"X"|"Y"|"Z"|"NS"|"SN"|"EW"|"WE"|"UD"|"DU") {
    const coordinates = [] as Vector3[];
    const diameter = radius * 2;

    if(axis.toLowerCase()=="y"||axis.toLowerCase()=="ud"||axis.toLowerCase()=="du"){
    for (let x = -radius; x <= radius; x++) {
        for (let z = -radius; z <= radius; z++) {
            if (x * x + z * z <= radius * radius) {
                const blockX = center.x + x;
                const blockZ = center.z + z;
                coordinates.push({ x: blockX, y: center.y, z: blockZ });
            }
        }
    }
    }else if(axis.toLowerCase()=="x"||axis.toLowerCase()=="ew"||axis.toLowerCase()=="we"){
    for (let y = -radius; y <= radius; y++) {
        for (let z = -radius; z <= radius; z++) {
            if (y * y + z * z <= radius * radius) {
                const blockY = center.y + y;
                const blockZ = center.z + z;
                coordinates.push({ x: center.x, y: blockY, z: blockZ });
            }
        }
    }
    }else if(axis.toLowerCase()=="z"||axis.toLowerCase()=="ns"||axis.toLowerCase()=="sn"){
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

    return coordinates as Vector3[];
}
export function generateCircleCoordinatesC(centerX, centerY, centerZ, radius) {
    const coordinates = [] as Vector3[];
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
}/*
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
export function generateMinecraftCircleOutline(center: Vector3, radius: number, thickness: number, dimension: Dimension, placeBlockCallback: (location: DimensionLocation)=>any, integrity: number = 100) {
    const innerRadius = radius - thickness;
    const outerRadius = radius;
    
    for (let x = Math.floor(center.x - outerRadius); x <= Math.ceil(center.x + outerRadius); x++) {
        for (let z = Math.floor(center.z - outerRadius); z <= Math.ceil(center.z + outerRadius); z++) {
            const distanceSquared = (x - center.x) ** 2 + (z - center.z) ** 2;
            
            if (distanceSquared <= outerRadius ** 2 && distanceSquared >= innerRadius ** 2) {
                placeBlockCallback({x: x, y: center.y, z: z, dimension: dimension});
            }
        }
    }
}
export function* generateMinecraftCircleOutlineBG(center: Vector3, radius: number, thickness: number, generatorProgressId: string, dimension?: Dimension, placeBlockCallback: (location: DimensionLocation)=>any = ()=>{}, options?: {integrity?: number, minMSBetweenYields?: number}) {
    try{
        const innerRadius = radius - thickness;
        const outerRadius = radius;
        generatorProgress[generatorProgressId]={done: false, startTick: system.currentTick, startTime: Date.now(), containsUnloadedChunks: false}
        var msSinceLastYieldStart = Date.now()

        if((options?.integrity??100)!=100){
            for (let x = Math.floor(center.x - outerRadius); x <= Math.ceil(center.x + outerRadius); x++) {
                for (let z = Math.floor(center.z - outerRadius); z <= Math.ceil(center.z + outerRadius); z++) {
                    const distanceSquared = (x - center.x) ** 2 + (z - center.z) ** 2;
                    
                    if (distanceSquared <= outerRadius ** 2 && distanceSquared >= innerRadius ** 2) {
                        if(Math.random()<=((options?.integrity??100)/100)){placeBlockCallback({x: x, y: center.y, z: z, dimension: dimension});}
                    }
                    if((Date.now()-msSinceLastYieldStart)>=(options?.minMSBetweenYields??2000)){msSinceLastYieldStart = Date.now(); yield undefined as void}
                }
                if((Date.now()-msSinceLastYieldStart)>=(options?.minMSBetweenYields??2000)){msSinceLastYieldStart = Date.now(); yield undefined as void}
            }
        }else{
            for (let x = Math.floor(center.x - outerRadius); x <= Math.ceil(center.x + outerRadius); x++) {
                for (let z = Math.floor(center.z - outerRadius); z <= Math.ceil(center.z + outerRadius); z++) {
                    const distanceSquared = (x - center.x) ** 2 + (z - center.z) ** 2;
                    
                    if (distanceSquared <= outerRadius ** 2 && distanceSquared >= innerRadius ** 2) {
                        placeBlockCallback({x: x, y: center.y, z: z, dimension: dimension});
                    }
                    if((Date.now()-msSinceLastYieldStart)>=(options?.minMSBetweenYields??2000)){msSinceLastYieldStart = Date.now(); yield undefined as void}
                }
                if((Date.now()-msSinceLastYieldStart)>=(options?.minMSBetweenYields??2000)){msSinceLastYieldStart = Date.now(); yield undefined as void}
            }
        }
        generatorProgress[generatorProgressId].endTick=system.currentTick; 
        generatorProgress[generatorProgressId].endTime=Date.now(); 
        generatorProgress[generatorProgressId].done=true; 
        return
    }catch(e){generatorProgress[generatorProgressId].endTick=system.currentTick; generatorProgress[generatorProgressId].endTime=Date.now(); generatorProgress[generatorProgressId].done=true; throw(e)}
}
export function generateMinecraftOvoid(center: Vector3, radius: Vector3, offset: Vector3, thickness: number, dimension?: Dimension, placeBlockCallback: (location: DimensionLocation)=>any = ()=>{}, integrity: number = 100) {
    const innerRadiusX = radius.x - thickness;
    const innerRadiusY = radius.y - thickness;
    const innerRadiusZ = radius.z - thickness;
    const outerRadiusX = radius.x + offset.x
    const outerRadiusY = radius.y + offset.y;
    const outerRadiusZ = radius.z + offset.z;

    for (let x = Math.floor(center.x - outerRadiusX); x <= Math.ceil(center.x + outerRadiusX); x++) {
        for (let y = Math.floor(center.y - outerRadiusY); y <= Math.ceil(center.y + outerRadiusY); y++) {
            for (let z = Math.floor(center.z - outerRadiusZ); z <= Math.ceil(center.z + outerRadiusZ); z++) {
                const distanceSquared = ((x - center.x) / outerRadiusX) ** 2 + ((y - center.y) / outerRadiusY) ** 2 + ((z - center.z) / outerRadiusZ) ** 2;

                if (distanceSquared <= 1 && distanceSquared >= (innerRadiusX / outerRadiusX) ** 2 && distanceSquared >= (innerRadiusY / outerRadiusY) ** 2 && distanceSquared >= (innerRadiusZ / outerRadiusZ) ** 2) {
                    placeBlockCallback({x: x, y: y, z: z, dimension: dimension});
                }
            }
        }
    }
}
export function* generateMinecraftOvoidBG(center: Vector3, radius: Vector3, offset: Vector3, thickness: number, generatorProgressId: string, dimension?: Dimension, placeBlockCallback: (location: DimensionLocation)=>any = ()=>{}, options?: {integrity?: number, minMSBetweenYields?: number}) {
    try{
        const innerRadiusX = radius.x - thickness;
        const innerRadiusY = radius.y - thickness;
        const innerRadiusZ = radius.z - thickness;
        const outerRadiusX = radius.x + offset.x
        const outerRadiusY = radius.y + offset.y;
        const outerRadiusZ = radius.z + offset.z;
        generatorProgress[generatorProgressId]={done: false, startTick: system.currentTick, startTime: Date.now(), containsUnloadedChunks: false}
        var msSinceLastYieldStart = Date.now()

        if((options?.integrity??100)!=100){
            for (let x = Math.floor(center.x - outerRadiusX); x <= Math.ceil(center.x + outerRadiusX); x++) {
                for (let y = Math.floor(center.y - outerRadiusY); y <= Math.ceil(center.y + outerRadiusY); y++) {
                    for (let z = Math.floor(center.z - outerRadiusZ); z <= Math.ceil(center.z + outerRadiusZ); z++) {
                        const distanceSquared = ((x - center.x) / outerRadiusX) ** 2 + ((y - center.y) / outerRadiusY) ** 2 + ((z - center.z) / outerRadiusZ) ** 2;

                        if (distanceSquared <= 1 && distanceSquared >= (innerRadiusX / outerRadiusX) ** 2 && distanceSquared >= (innerRadiusY / outerRadiusY) ** 2 && distanceSquared >= (innerRadiusZ / outerRadiusZ) ** 2) {
                            if(Math.random()<=((options?.integrity??100)/100)){placeBlockCallback({x: x, y: y, z: z, dimension: dimension});}
                        }
                    }
                    if((Date.now()-msSinceLastYieldStart)>=(options?.minMSBetweenYields??2000)){msSinceLastYieldStart = Date.now(); yield undefined as void}
                }
                if((Date.now()-msSinceLastYieldStart)>=(options?.minMSBetweenYields??2000)){msSinceLastYieldStart = Date.now(); yield undefined as void}
            }
        }else{
            for (let x = Math.floor(center.x - outerRadiusX); x <= Math.ceil(center.x + outerRadiusX); x++) {
                for (let y = Math.floor(center.y - outerRadiusY); y <= Math.ceil(center.y + outerRadiusY); y++) {
                    for (let z = Math.floor(center.z - outerRadiusZ); z <= Math.ceil(center.z + outerRadiusZ); z++) {
                        const distanceSquared = ((x - center.x) / outerRadiusX) ** 2 + ((y - center.y) / outerRadiusY) ** 2 + ((z - center.z) / outerRadiusZ) ** 2;

                        if (distanceSquared <= 1 && distanceSquared >= (innerRadiusX / outerRadiusX) ** 2 && distanceSquared >= (innerRadiusY / outerRadiusY) ** 2 && distanceSquared >= (innerRadiusZ / outerRadiusZ) ** 2) {
                            placeBlockCallback({x: x, y: y, z: z, dimension: dimension});
                        }
                    }
                    if((Date.now()-msSinceLastYieldStart)>=(options?.minMSBetweenYields??2000)){msSinceLastYieldStart = Date.now(); yield undefined as void}
                }
                if((Date.now()-msSinceLastYieldStart)>=(options?.minMSBetweenYields??2000)){msSinceLastYieldStart = Date.now(); yield undefined as void}
            }
        }
        
        generatorProgress[generatorProgressId].endTick=system.currentTick; 
        generatorProgress[generatorProgressId].endTime=Date.now(); 
        generatorProgress[generatorProgressId].done=true; 
        return
    }catch(e){generatorProgress[generatorProgressId].endTick=system.currentTick; generatorProgress[generatorProgressId].endTime=Date.now(); generatorProgress[generatorProgressId].done=true; throw(e)}
}
export function generateMinecraftOvoidC(center: Vector3, radius: Vector3, offset: Vector3, thickness: number, dimension?: Dimension, placeBlockCallback: (location: DimensionLocation)=>any = ()=>{}, integrity: number = 100) {
    const innerRadiusX = radius.x - thickness;
    const innerRadiusY = radius.y - thickness;
    const innerRadiusZ = radius.z - thickness;

    if((integrity)!=100){
        for (let x = Math.floor(center.x - radius.x - offset.x); x <= Math.ceil(center.x + radius.x + offset.x); x++) {
            for (let y = Math.floor(center.y - radius.y - offset.y); y <= Math.ceil(center.y + radius.y + offset.y); y++) {
                for (let z = Math.floor(center.z - radius.z - offset.z); z <= Math.ceil(center.z + radius.z + offset.z); z++) {
                    const distanceSquared = ((x - center.x) / (radius.x + offset.x)) ** 2 + ((y - center.y) / (radius.y + offset.y)) ** 2 + ((z - center.z) / (radius.z + offset.z)) ** 2;

                    if (distanceSquared <= 1 && distanceSquared >= (innerRadiusX / (radius.x + offset.x)) ** 2 && distanceSquared >= (innerRadiusY / (radius.y + offset.y)) ** 2 && distanceSquared >= (innerRadiusZ / (radius.z + offset.z)) ** 2) {
                        if(Math.random()<=((integrity??100)/100)){placeBlockCallback({x: x, y: y, z: z, dimension: dimension});}
                    }
                }
            }
        }
    }else{
        for (let x = Math.floor(center.x - radius.x - offset.x); x <= Math.ceil(center.x + radius.x + offset.x); x++) {
            for (let y = Math.floor(center.y - radius.y - offset.y); y <= Math.ceil(center.y + radius.y + offset.y); y++) {
                for (let z = Math.floor(center.z - radius.z - offset.z); z <= Math.ceil(center.z + radius.z + offset.z); z++) {
                    const distanceSquared = ((x - center.x) / (radius.x + offset.x)) ** 2 + ((y - center.y) / (radius.y + offset.y)) ** 2 + ((z - center.z) / (radius.z + offset.z)) ** 2;

                    if (distanceSquared <= 1 && distanceSquared >= (innerRadiusX / (radius.x + offset.x)) ** 2 && distanceSquared >= (innerRadiusY / (radius.y + offset.y)) ** 2 && distanceSquared >= (innerRadiusZ / (radius.z + offset.z)) ** 2) {
                        placeBlockCallback({x: x, y: y, z: z, dimension: dimension});
                    }
                }
            }
        }
    }
}
export function* generateMinecraftOvoidCG(center: Vector3, radius: Vector3, offset: Vector3, thickness: number, generatorProgressId: string, dimension?: Dimension, placeBlockCallback: (location: DimensionLocation)=>any = ()=>{}, options?: {integrity?: number, minMSBetweenYields?: number}) {
    try{
        const innerRadiusX = radius.x - thickness;
        const innerRadiusY = radius.y - thickness;
        const innerRadiusZ = radius.z - thickness;
        generatorProgress[generatorProgressId]={done: false, startTick: system.currentTick, startTime: Date.now(), containsUnloadedChunks: false}
        var msSinceLastYieldStart = Date.now()

        if((options?.integrity??100)!=100){
            for (let x = Math.floor(center.x - radius.x); x <= Math.ceil(center.x + radius.x); x++) {
                for (let y = Math.floor(center.y - radius.y); y <= Math.ceil(center.y + radius.y); y++) {
                    for (let z = Math.floor(center.z - radius.z); z <= Math.ceil(center.z + radius.z); z++) {
                        const distanceSquared = ((x - center.x - offset.x) / radius.x) ** 2 + ((y - center.y - offset.y) / radius.y) ** 2 + ((z - center.z - offset.z) / radius.z) ** 2;

                        if (distanceSquared <= 1 && distanceSquared >= (innerRadiusX / radius.x) ** 2 && distanceSquared >= (innerRadiusY / radius.y) ** 2 && distanceSquared >= (innerRadiusZ / radius.z) ** 2) {
                            if(Math.random()<=((options?.integrity??100)/100)){placeBlockCallback({x: x, y: y, z: z, dimension: dimension});}
                        }
                    }
                    if((Date.now()-msSinceLastYieldStart)>=(options?.minMSBetweenYields??2000)){msSinceLastYieldStart = Date.now(); yield undefined as void}
                }
                if((Date.now()-msSinceLastYieldStart)>=(options?.minMSBetweenYields??2000)){msSinceLastYieldStart = Date.now(); yield undefined as void}
            }
        }else{
            for (let x = Math.floor(center.x - radius.x); x <= Math.ceil(center.x + radius.x); x++) {
                for (let y = Math.floor(center.y - radius.y); y <= Math.ceil(center.y + radius.y); y++) {
                    for (let z = Math.floor(center.z - radius.z); z <= Math.ceil(center.z + radius.z); z++) {
                        const distanceSquared = ((x - center.x - offset.x) / radius.x) ** 2 + ((y - center.y - offset.y) / radius.y) ** 2 + ((z - center.z - offset.z) / radius.z) ** 2;

                        if (distanceSquared <= 1 && distanceSquared >= ((innerRadiusX + offset.x) / radius.x) ** 2 && distanceSquared >= ((innerRadiusY + offset.y) / radius.y) ** 2 && distanceSquared >= ((innerRadiusZ + offset.z) / radius.z) ** 2) {
                            placeBlockCallback({x: x, y: y, z: z, dimension: dimension});
                        }
                    }
                    if((Date.now()-msSinceLastYieldStart)>=(options?.minMSBetweenYields??2000)){msSinceLastYieldStart = Date.now(); yield undefined as void}
                }
                if((Date.now()-msSinceLastYieldStart)>=(options?.minMSBetweenYields??2000)){msSinceLastYieldStart = Date.now(); yield undefined as void}
            }
        }
        generatorProgress[generatorProgressId].endTick=system.currentTick; 
        generatorProgress[generatorProgressId].endTime=Date.now(); 
        generatorProgress[generatorProgressId].done=true; 
        return
    }catch(e){generatorProgress[generatorProgressId].endTick=system.currentTick; generatorProgress[generatorProgressId].endTime=Date.now(); generatorProgress[generatorProgressId].done=true; throw(e)}
}
export function generateSolidOvoid(center: Vector3, radius: Vector3, offset: Vector3, dimension?: Dimension, placeBlockCallback: (location: DimensionLocation)=>any = ()=>{}, integrity: number = 100) {

    if((integrity)!=100){
        for (let x = Math.floor(center.x - radius.x); x <= Math.ceil(center.x + radius.x); x++) {
            for (let y = Math.floor(center.y - radius.y); y <= Math.ceil(center.y + radius.y); y++) {
                for (let z = Math.floor(center.z - radius.z); z <= Math.ceil(center.z + radius.z); z++) {
                    const distanceSquared = ((x - center.x - offset.x) / radius.x) ** 2 + ((y - center.y - offset.y) / radius.y) ** 2 + ((z - center.z - offset.z) / radius.z) ** 2;

                    if (distanceSquared <= 1) {
                        if(Math.random()<=((integrity??100)/100)){placeBlockCallback({x: x, y: y, z: z, dimension: dimension});}
                    }
                }
            }
        }
    }else{
        for (let x = Math.floor(center.x - radius.x); x <= Math.ceil(center.x + radius.x); x++) {
            for (let y = Math.floor(center.y - radius.y); y <= Math.ceil(center.y + radius.y); y++) {
                for (let z = Math.floor(center.z - radius.z); z <= Math.ceil(center.z + radius.z); z++) {
                    const distanceSquared = ((x - center.x - offset.x) / radius.x) ** 2 + ((y - center.y - offset.y) / radius.y) ** 2 + ((z - center.z - offset.z) / radius.z) ** 2;

                    if (distanceSquared <= 1) {
                        placeBlockCallback({x: x, y: y, z: z, dimension: dimension});
                    }
                }
            }
        }
    }
}
export function* generateSolidOvoidBG(center: Vector3, radius: Vector3, offset: Vector3, generatorProgressId: string, dimension?: Dimension, placeBlockCallback: (location: DimensionLocation)=>any = ()=>{}, options?: {integrity?: number, minMSBetweenYields?: number}) {
    try{
        generatorProgress[generatorProgressId]={done: false, startTick: system.currentTick, startTime: Date.now(), containsUnloadedChunks: false}
        var msSinceLastYieldStart = Date.now()

        if((options?.integrity)!=100){
            for (let x = Math.floor(center.x - radius.x); x <= Math.ceil(center.x + radius.x); x++) {
                for (let y = Math.floor(center.y - radius.y); y <= Math.ceil(center.y + radius.y); y++) {
                    for (let z = Math.floor(center.z - radius.z); z <= Math.ceil(center.z + radius.z); z++) {
                        const distanceSquared = ((x - center.x) / radius.x) ** 2 + ((y - center.y) / radius.y) ** 2 + ((z - center.z) / radius.z) ** 2;

                        if (distanceSquared <= 1) {
                            if(Math.random()<=((options?.integrity??100)/100)){placeBlockCallback({x: x, y: y, z: z, dimension: dimension});}
                        }
                    }
                    if((Date.now()-msSinceLastYieldStart)>=(options?.minMSBetweenYields??2000)){msSinceLastYieldStart = Date.now(); yield undefined as void}
                }
                if((Date.now()-msSinceLastYieldStart)>=(options?.minMSBetweenYields??2000)){msSinceLastYieldStart = Date.now(); yield undefined as void}
            }
        }else{
            for (let x = Math.floor(center.x - radius.x); x <= Math.ceil(center.x + radius.x); x++) {
                for (let y = Math.floor(center.y - radius.y); y <= Math.ceil(center.y + radius.y); y++) {
                    for (let z = Math.floor(center.z - radius.z); z <= Math.ceil(center.z + radius.z); z++) {
                        const distanceSquared = ((x - center.x) / radius.x) ** 2 + ((y - center.y) / radius.y) ** 2 + ((z - center.z) / radius.z) ** 2;

                        if (distanceSquared <= 1) {
                            placeBlockCallback({x: x, y: y, z: z, dimension: dimension});
                        }
                    }
                    if((Date.now()-msSinceLastYieldStart)>=(options?.minMSBetweenYields??2000)){msSinceLastYieldStart = Date.now(); yield undefined as void}
                }
                if((Date.now()-msSinceLastYieldStart)>=(options?.minMSBetweenYields??2000)){msSinceLastYieldStart = Date.now(); yield undefined as void}
            }
        }
        generatorProgress[generatorProgressId].endTick=system.currentTick; 
        generatorProgress[generatorProgressId].endTime=Date.now(); 
        generatorProgress[generatorProgressId].done=true; 
        return
    }catch(e){generatorProgress[generatorProgressId].endTick=system.currentTick; generatorProgress[generatorProgressId].endTime=Date.now(); generatorProgress[generatorProgressId].done=true; throw(e)}
}
export function generateSkygrid(from: Vector3, to: Vector3, gridSize: number, dimension?: Dimension, placeBlockCallback: (location: DimensionLocation)=>any = ()=>{}, integrity: number = 100) {
    const startX = Math.floor(from.x);
    const startY = Math.floor(from.y);
    const startZ = Math.floor(from.z);
    const endX = Math.floor(to.x);
    const endY = Math.floor(to.y);
    const endZ = Math.floor(to.z);

    if((integrity??100)!=100){
        for (let x = startX; x <= endX; x += gridSize) {
            for (let y = startY; y <= endY; y += gridSize) {
                for (let z = startZ; z <= endZ; z += gridSize) {
                    if(Math.random()<=((integrity??100)/100)){placeBlockCallback({ x: Math.floor(x), y: Math.floor(y), z: Math.floor(z), dimension: dimension });}
                }
            }
        }
    }else{
        for (let x = startX; x <= endX; x += gridSize) {
            for (let y = startY; y <= endY; y += gridSize) {
                for (let z = startZ; z <= endZ; z += gridSize) {
                    placeBlockCallback({ x: Math.floor(x), y: Math.floor(y), z: Math.floor(z), dimension: dimension });
                }
            }
        }
    }
}
export function generateInverseSkygrid(from: Vector3, to: Vector3, gridSize: number, dimension?: Dimension, placeBlockCallback: (location: DimensionLocation)=>any = ()=>{}, integrity: number = 100) {
    const startX = Math.floor(from.x);
    const startY = Math.floor(from.y);
    const startZ = Math.floor(from.z);
    const endX = Math.floor(to.x);
    const endY = Math.floor(to.y);
    const endZ = Math.floor(to.z);

    if((integrity??100)!=100){
        for (let x = startX; x <= endX; x++) {
            for (let y = startY; y <= endY; y++) {
                for (let z = startZ; z <= endZ; z++) {
                    if (Math.floor(x) % gridSize !== 0 && Math.floor(y) % gridSize !== 0 && Math.floor(z) % gridSize !== 0) {
                        if(Math.random()<=((integrity??100)/100)){placeBlockCallback({ x: Math.floor(x), y: Math.floor(y), z: Math.floor(z), dimension: dimension });}
                    }
                }
            }
        }
    }else{
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
export function* generateSkygridBG(from: Vector3, to: Vector3, gridSize: number, generatorProgressId: string, dimension?: Dimension, placeBlockCallback: (location: DimensionLocation)=>any = ()=>{}, options?: {integrity?: number, minMSBetweenYields?: number}) {
    try{
        const startX = Math.floor(from.x);
        const startY = Math.floor(from.y);
        const startZ = Math.floor(from.z);
        const endX = Math.floor(to.x);
        const endY = Math.floor(to.y);
        const endZ = Math.floor(to.z);
        generatorProgress[generatorProgressId]={done: false, startTick: system.currentTick, startTime: Date.now(), containsUnloadedChunks: false}
        var msSinceLastYieldStart = Date.now()

        if((options?.integrity??100)!=100){
            for (let x = startX; x <= endX; x += gridSize) {
                for (let y = startY; y <= endY; y += gridSize) {
                    for (let z = startZ; z <= endZ; z += gridSize) {
                        if(Math.random()<=((options?.integrity??100)/100)){placeBlockCallback({ x: Math.floor(x), y: Math.floor(y), z: Math.floor(z), dimension: dimension });}
                    }
                    if((Date.now()-msSinceLastYieldStart)>=(options?.minMSBetweenYields??2000)){msSinceLastYieldStart = Date.now(); yield undefined as void}
                }
                if((Date.now()-msSinceLastYieldStart)>=(options?.minMSBetweenYields??2000)){msSinceLastYieldStart = Date.now(); yield undefined as void}
            }
        }else{
            for (let x = startX; x <= endX; x += gridSize) {
                for (let y = startY; y <= endY; y += gridSize) {
                    for (let z = startZ; z <= endZ; z += gridSize) {
                        placeBlockCallback({ x: Math.floor(x), y: Math.floor(y), z: Math.floor(z), dimension: dimension });
                    }
                    if((Date.now()-msSinceLastYieldStart)>=(options?.minMSBetweenYields??2000)){msSinceLastYieldStart = Date.now(); yield undefined as void}
                }
                if((Date.now()-msSinceLastYieldStart)>=(options?.minMSBetweenYields??2000)){msSinceLastYieldStart = Date.now(); yield undefined as void}
            }
        }
        generatorProgress[generatorProgressId].endTick=system.currentTick; 
        generatorProgress[generatorProgressId].endTime=Date.now(); 
        generatorProgress[generatorProgressId].done=true; 
        return
    }catch(e){generatorProgress[generatorProgressId].endTick=system.currentTick; generatorProgress[generatorProgressId].endTime=Date.now(); generatorProgress[generatorProgressId].done=true; throw(e)}
}
export function* generateInverseSkygridBG(from: Vector3, to: Vector3, gridSize: number, generatorProgressId: string, dimension?: Dimension, placeBlockCallback: (location: DimensionLocation)=>any = ()=>{}, options?: {integrity?: number, minMSBetweenYields?: number}) {
    try{
        const startX = Math.floor(from.x);
        const startY = Math.floor(from.y);
        const startZ = Math.floor(from.z);
        const endX = Math.floor(to.x);
        const endY = Math.floor(to.y);
        const endZ = Math.floor(to.z);
        generatorProgress[generatorProgressId]={done: false, startTick: system.currentTick, startTime: Date.now(), containsUnloadedChunks: false}
        var msSinceLastYieldStart = Date.now()

        if((options?.integrity??100)!=100){
            for (let x = startX; x <= endX; x++) {
                for (let y = startY; y <= endY; y++) {
                    for (let z = startZ; z <= endZ; z++) {
                        if (Math.floor(startX-x) % gridSize === 0 && Math.floor(startY-y) % gridSize === 0 && Math.floor(startZ-z) % gridSize === 0) {
                            continue; // Skip positions where the skygrid would generate blocks
                        }
                            if(Math.random()<=((options?.integrity??100)/100)){placeBlockCallback({ x: Math.floor(x), y: Math.floor(y), z: Math.floor(z), dimension: dimension });}
                    }
                    if((Date.now()-msSinceLastYieldStart)>=(options?.minMSBetweenYields??2000)){msSinceLastYieldStart = Date.now(); yield undefined as void}
                }
                if((Date.now()-msSinceLastYieldStart)>=(options?.minMSBetweenYields??2000)){msSinceLastYieldStart = Date.now(); yield undefined as void}
            }
        }else{
            for (let x = startX; x <= endX; x++) {
                for (let y = startY; y <= endY; y++) {
                    for (let z = startZ; z <= endZ; z++) {
                        //console.warn(x % gridSize, y % gridSize, z % gridSize)
                        if (Math.floor(startX-x) % gridSize === 0 && Math.floor(startY-y) % gridSize === 0 && Math.floor(startZ-z) % gridSize === 0) {
                            continue; // Skip positions where the skygrid would generate blocks
                        }else{
                            placeBlockCallback({ x: Math.floor(x), y: Math.floor(y), z: Math.floor(z), dimension: dimension });}
                    }
                    if((Date.now()-msSinceLastYieldStart)>=(options?.minMSBetweenYields??2000)){msSinceLastYieldStart = Date.now(); yield undefined as void}
                }
                if((Date.now()-msSinceLastYieldStart)>=(options?.minMSBetweenYields??2000)){msSinceLastYieldStart = Date.now(); yield undefined as void}
            }
        }
        generatorProgress[generatorProgressId].endTick=system.currentTick; 
        generatorProgress[generatorProgressId].endTime=Date.now(); 
        generatorProgress[generatorProgressId].done=true; 
        return
    }catch(e){generatorProgress[generatorProgressId].endTick=system.currentTick; generatorProgress[generatorProgressId].endTime=Date.now(); generatorProgress[generatorProgressId].done=true; throw(e)}
}
export function generateTickingAreaFillCoordinates(area: CompoundBlockVolume, dimension: Dimension) {
    const locations = [] as DimensionLocation[]
    //${se}let b = new CompoundBlockVolume(); b.pushVolume({volume: new BlockVolume(Vector.one, Vector.multiply(Vector.one, 20)), action: 0}); bsend(b.getBlockLocationIterator()?.next()?.value); 
    
    for (let x = 0; !!(()=>{for(const c of area.getBlockLocationIterator()){return c}})(); x++) {
        let a = (()=>{for(const c of area.getBlockLocationIterator()){return c}})()
        area.pushVolume({volume: new BlockVolume({x: a.x-64, y: area.getMin().y, z: a.z-64}, {x: a.x+64, y: area.getMax().y, z: a.z+64}), action: 1})
        locations.push(Object.assign(a, {dimension: dimension, y: 320}));
    }
    return locations
}
export function generateTickingAreaFillCoordinatesB(area: CompoundBlockVolume, dimension: Dimension, spawnEntityCallback: (location: DimensionLocation, locations: DimensionLocation[], index: number)=>any = (l, e, i)=>{try{let name = `generateTickingAreaFillCoordinates${Date.now()}EntityTickingArea${i}`; l.dimension.runCommand(`summon andexdb:tickingarea_6 ${name} ${vTStr(l)}`); e.push(l)}catch(e){console.warn(e, e.stack)}}) {
    const locations = [] as DimensionLocation[]
    //${se}let b = new CompoundBlockVolume(); b.pushVolume({volume: new BlockVolume(Vector.one, Vector.multiply(Vector.one, 20)), action: 0}); bsend(b.getBlockLocationIterator()?.next()?.value); 
    
    for (let x = 0; !!(()=>{for(const c of area.getBlockLocationIterator()){return c}})(); x++) {
        let a = (()=>{for(const c of area.getBlockLocationIterator()){return c}})()
        area.pushVolume({volume: new BlockVolume({x: a.x-64, y: area.getMin().y, z: a.z-64}, {x: a.x+64, y: area.getMax().y, z: a.z+64}), action: 1})
        spawnEntityCallback(Object.assign(a, {dimension: dimension, y: 320}), locations, x);
    }
    return locations
}
export async function generateTickingAreaFillCoordinatesC(center: Vector3, area: CompoundBlockVolume, dimension: Dimension, spawnEntityCallback: (location: DimensionLocation, locations: Entity[], index: number)=>any = (l, e, i)=>{try{let name = `generateTickingAreaFillCoordinates${Date.now()}EntityTickingArea${i}`; l.dimension.runCommand(`summon andexdb:tickingarea_6 ${name} ${vTStr(l)}`); e.push(l.dimension.getEntitiesAtBlockLocation(l).find(v=>v.typeId=="andexdb:tickingarea"&&v.nameTag==name))}catch(e){console.warn(e, e.stack)}}) {
    const locations = generateTickingAreaFillCoordinates(area, dimension).sort((a, b) => getDistance(a, center) - getDistance(b, center))
    const entities = [] as Entity[]
    //${se}let b = new CompoundBlockVolume(); b.pushVolume({volume: new BlockVolume(Vector.one, Vector.multiply(Vector.one, 20)), action: 0}); bsend(b.getBlockLocationIterator()?.next()?.value); 
    
    for (const l of locations) {
        system.runTimeout(()=>spawnEntityCallback(l, entities, locations.indexOf(l)), 2*locations.indexOf(l));
    }
    return new Promise((resolve: (value: Entity[]) => void, reject) => {
        system.runTimeout(()=>resolve(entities), locations.length*2)
    })
}
export function drawMinecraftCircle(center: Vector3, radius: number, axis: string, precision: number = 360) {
    const coordinates = [] as Vector3[];

    if(axis.toLowerCase().includes("y")||axis.toLowerCase().includes("ud")||axis.toLowerCase().includes("du")){
        for (let i = 0; i < precision; i++) {
            const angle = i * Math.PI / 180;
            const xPos = center.x + (radius) * Math.cos(angle);
            const zPos = center.z + (radius) * Math.sin(angle);
            coordinates.push({ x: Math.floor(xPos), y: center.y, z: Math.floor(zPos) });

        }
    }else if(axis.toLowerCase().includes("x")||axis.toLowerCase().includes("ew")||axis.toLowerCase().includes("we")){
        for (let i = 0; i < precision; i++) {
            const angle = i * Math.PI / 180;
            const zPos = center.z + (radius) * Math.cos(angle);
            const yPos = center.y + (radius) * Math.sin(angle);
            coordinates.push({ x: center.x, y: Math.floor(yPos), z: Math.floor(zPos) });

        }
    }else if(axis.toLowerCase().includes("z")||axis.toLowerCase().includes("ns")||axis.toLowerCase().includes("sn")){
        for (let i = 0; i < precision; i++) {
            const angle = i * Math.PI / 180;
            const xPos = center.x + radius * Math.cos(angle);
            const yPos = center.y + radius * Math.sin(angle);
            coordinates.push({ x: Math.floor(xPos), y: Math.floor(yPos), z: center.z });

        }
    }

    return coordinates;
}
export function generateMinecraftTunnel(center: Vector3, radius: number, length: number, axis: string, precision: number = 360) {
    const coordinates = new Set([] as Vector3[]);

    if(axis.toLowerCase().includes("y")||axis.toLowerCase().includes("ud")||axis.toLowerCase().includes("du")){
        for (let i = 0; i < precision; i++) {
            const angle = i * Math.PI / 180;
            const xPos = center.x + (radius) * Math.cos(angle);
            const zPos = center.z + (radius) * Math.sin(angle);
            Array.from(new BlockVolume({ x: Math.floor(xPos), y: center.y-(length/2), z: Math.floor(zPos) }, { x: Math.floor(xPos), y: center.y+(length/2), z: Math.floor(zPos) }).getBlockLocationIterator()).forEach(v=>coordinates.add(v));

        }
    }else if(axis.toLowerCase().includes("x")||axis.toLowerCase().includes("ew")||axis.toLowerCase().includes("we")){
        for (let i = 0; i < precision; i++) {
            const angle = i * Math.PI / 180;
            const zPos = center.z + (radius) * Math.cos(angle);
            const yPos = center.y + (radius) * Math.sin(angle);
            Array.from(new BlockVolume({ x: center.x-(length/2), y: Math.floor(yPos), z: Math.floor(zPos) }, { x: center.x+(length/2), y: Math.floor(yPos), z: Math.floor(zPos) }).getBlockLocationIterator()).forEach(v=>coordinates.add(v));

        }
    }else if(axis.toLowerCase().includes("z")||axis.toLowerCase().includes("ns")||axis.toLowerCase().includes("sn")){
        for (let i = 0; i < precision; i++) {
            const angle = i * Math.PI / 180;
            const xPos = center.x + radius * Math.cos(angle);
            const yPos = center.y + radius * Math.sin(angle);
            Array.from(new BlockVolume({ x: Math.floor(xPos), y: Math.floor(yPos), z: center.z-(length/2) }, { x: Math.floor(xPos), y: Math.floor(yPos), z: center.z+(length/2) }).getBlockLocationIterator()).forEach(v=>coordinates.add(v));

        }
    }

    return Array.from(coordinates);
}
export function generateMinecraftTunnelSet(center: Vector3, radius: number, length: number, axis: string, precision: number = 360) {
    const coordinates = new Set([] as Vector3[]);

    if(axis.toLowerCase().includes("y")||axis.toLowerCase().includes("ud")||axis.toLowerCase().includes("du")){
        for (let i = 0; i < precision; i++) {
            const angle = i * Math.PI / 180;
            const xPos = center.x + (radius) * Math.cos(angle);
            const zPos = center.z + (radius) * Math.sin(angle);
            Array.from(new BlockVolume({ x: Math.floor(xPos), y: center.y-(length/2), z: Math.floor(zPos) }, { x: Math.floor(xPos), y: center.y+(length/2), z: Math.floor(zPos) }).getBlockLocationIterator()).forEach(v=>coordinates.add(v));

        }
    }else if(axis.toLowerCase().includes("x")||axis.toLowerCase().includes("ew")||axis.toLowerCase().includes("we")){
        for (let i = 0; i < precision; i++) {
            const angle = i * Math.PI / 180;
            const zPos = center.z + (radius) * Math.cos(angle);
            const yPos = center.y + (radius) * Math.sin(angle);
            Array.from(new BlockVolume({ x: center.x-(length/2), y: Math.floor(yPos), z: Math.floor(zPos) }, { x: center.y+(length/2), y: Math.floor(yPos), z: Math.floor(zPos) }).getBlockLocationIterator()).forEach(v=>coordinates.add(v));

        }
    }else if(axis.toLowerCase().includes("z")||axis.toLowerCase().includes("ns")||axis.toLowerCase().includes("sn")){
        for (let i = 0; i < precision; i++) {
            const angle = i * Math.PI / 180;
            const xPos = center.x + radius * Math.cos(angle);
            const yPos = center.y + radius * Math.sin(angle);
            Array.from(new BlockVolume({ x: Math.floor(xPos), y: Math.floor(yPos), z: center.z-(length/2) }, { x: Math.floor(xPos), y: Math.floor(yPos), z: center.z+(length/2) }).getBlockLocationIterator()).forEach(v=>coordinates.add(v));

        }
    }

    return coordinates;
}
export function drawMinecraftCircleB(center: Vector3, radius: number, rotation: Vector2, precision: number = 360) {
    const coordinates = new Set([] as Vector3[]);
    for (let i = 0; i < precision; i++) {
        const angle = i * Math.PI / 180;
        const xPos = (radius) * Math.cos(angle);
        const zPos = (radius) * Math.sin(angle);
        const newPos = rotate(rotation.x, 0, rotation.y, [{ x: Math.floor(xPos), y: 0, z: Math.floor(zPos) }])[0]
        const value = {x: center.x+newPos.x, y: center.y+newPos.y, z: center.z+newPos.z}
        coordinates.add(value);

    }

    return Array.from(coordinates);
}
export function generateHollowSphere(center: Vector3, radius: number, thickness: number) {
    const centerX = center.x
    const centerY = center.y
    const centerZ = center.z
    const coordinates = [] as Vector3[]
    for (let x = centerX - radius; x <= centerX + radius; x++) {
        for (let y = centerY - radius; y <= centerY + radius; y++) {
            for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2 + (z - centerZ) ** 2);
                if (distance >= radius - thickness && distance <= radius) {
                    coordinates.push({x: x, y: y, z: z});
                }
            }
        }
    }
    return coordinates
}
export function generateHollowSphereB(center: Vector3, radius: number, thickness: number, dimension: Dimension, placeBlockCallback: (location: DimensionLocation)=>any) {
    const centerX = center.x
    const centerY = center.y
    const centerZ = center.z
    for (let x = centerX - radius; x <= centerX + radius; x++) {
        for (let y = centerY - radius; y <= centerY + radius; y++) {
            for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2 + (z - centerZ) ** 2);
                if (distance >= radius - thickness && distance <= radius) {
                    placeBlockCallback({x: x, y: y, z: z, dimension: dimension});
                }
            }
        }
    }
    return coordinates
}
export function* generateHollowSphereBG(center: Vector3, radius: number, thickness: number, dimension: Dimension, generatorProgressId: string, minMSBetweenYields: number = 2000, placeBlockCallback: (location: DimensionLocation)=>any = ()=>{}, onComplete: ()=>any = ()=>{}, integrity: number = 100) {
    try{
        const centerX = center.x
        const centerY = center.y
        const centerZ = center.z
        generatorProgress[generatorProgressId]={done: false, startTick: system.currentTick, startTime: Date.now(), containsUnloadedChunks: false}
        var msSinceLastYieldStart = Date.now()
        if(integrity!=100){
            for (let x = centerX - radius; x <= centerX + radius; x++) {
                for (let y = centerY - radius; y <= centerY + radius; y++) {
                    for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                        const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2 + (z - centerZ) ** 2);
                        if (distance >= radius - thickness && distance <= radius) {
                            if(Math.random()<=(integrity/100)){placeBlockCallback({x: x, y: y, z: z, dimension: dimension});}
                        }
                    }
                    if((Date.now()-msSinceLastYieldStart)>=minMSBetweenYields){msSinceLastYieldStart = Date.now(); yield undefined as void}
                }
                if((Date.now()-msSinceLastYieldStart)>=minMSBetweenYields){msSinceLastYieldStart = Date.now(); yield undefined as void}
            }
        }else{
            for (let x = centerX - radius; x <= centerX + radius; x++) {
                for (let y = centerY - radius; y <= centerY + radius; y++) {
                    for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                        const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2 + (z - centerZ) ** 2);
                        if (distance >= radius - thickness && distance <= radius) {
                            placeBlockCallback({x: x, y: y, z: z, dimension: dimension});
                        }
                    }
                    if((Date.now()-msSinceLastYieldStart)>=minMSBetweenYields){msSinceLastYieldStart = Date.now(); yield undefined as void}
                }
                if((Date.now()-msSinceLastYieldStart)>=minMSBetweenYields){msSinceLastYieldStart = Date.now(); yield undefined as void}
            }
        }
        onComplete()
        generatorProgress[generatorProgressId].endTick=system.currentTick; 
        generatorProgress[generatorProgressId].endTime=Date.now(); 
        generatorProgress[generatorProgressId].done=true; 
        return
    }catch(e){generatorProgress[generatorProgressId].endTick=system.currentTick; generatorProgress[generatorProgressId].endTime=Date.now(); generatorProgress[generatorProgressId].done=true; throw(e)}
}
export function* generateDomeBG(center: Vector3, radius: number, thickness: number, dimension: Dimension, generatorProgressId: string, minMSBetweenYields: number = 2000, placeBlockCallback: (location: DimensionLocation)=>any = ()=>{}, onComplete: ()=>any = ()=>{}, integrity: number = 100) {
    try{
        const centerX = center.x
        const centerY = center.y
        const centerZ = center.z
        generatorProgress[generatorProgressId]={done: false, startTick: system.currentTick, startTime: Date.now(), containsUnloadedChunks: false}
        var msSinceLastYieldStart = Date.now()
        if(integrity!=100){
            for (let x = centerX - radius; x <= centerX + radius; x++) {
                for (let y = centerY - radius; y <= centerY + radius; y++) {
                    if(y>=centerY){
                        for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                            const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2 + (z - centerZ) ** 2);
                            if (distance >= radius - thickness && distance <= radius) {
                                if(Math.random()<=(integrity/100)){placeBlockCallback({x: x, y: y, z: z, dimension: dimension});}
                            }
                        }
                        if((Date.now()-msSinceLastYieldStart)>=minMSBetweenYields){msSinceLastYieldStart = Date.now(); yield undefined as void}
                    }
                }
                if((Date.now()-msSinceLastYieldStart)>=minMSBetweenYields){msSinceLastYieldStart = Date.now(); yield undefined as void}
            }
        }else{
            for (let x = centerX - radius; x <= centerX + radius; x++) {
                for (let y = centerY - radius; y <= centerY + radius; y++) {
                    if(y>=centerY){
                        for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                            const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2 + (z - centerZ) ** 2);
                            if (distance >= radius - thickness && distance <= radius) {
                                placeBlockCallback({x: x, y: y, z: z, dimension: dimension});
                            }
                        }
                        if((Date.now()-msSinceLastYieldStart)>=minMSBetweenYields){msSinceLastYieldStart = Date.now(); yield undefined as void}
                    }
                }
                if((Date.now()-msSinceLastYieldStart)>=minMSBetweenYields){msSinceLastYieldStart = Date.now(); yield undefined as void}
            }
        }
        onComplete()
        generatorProgress[generatorProgressId].endTick=system.currentTick; 
        generatorProgress[generatorProgressId].endTime=Date.now(); 
        generatorProgress[generatorProgressId].done=true; 
        return
    }catch(e){generatorProgress[generatorProgressId].endTick=system.currentTick; generatorProgress[generatorProgressId].endTime=Date.now(); generatorProgress[generatorProgressId].done=true; throw(e)}
}
export function* generateFillBG(begin: Vector3, end: Vector3, dimension: Dimension, generatorProgressId: string, minMSBetweenYields: number = 2000, placeBlockCallback: (location: DimensionLocation, index: bigint)=>any = ()=>{}, onComplete: ()=>any = ()=>{}, integrity: number = 100) {
    try{
        generatorProgress[generatorProgressId]={done: false, startTick: system.currentTick, startTime: Date.now(), containsUnloadedChunks: false}
        var msSinceLastYieldStart = Date.now()
        var index = 0n
        if(integrity!=100){
            for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x++) {
                for (let y = Math.min(begin.y, end.y); y <= Math.max(begin.y, end.y); y++) {
                    for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z++) {
                            if(Math.random()<=(integrity/100)){placeBlockCallback({x: x, y: y, z: z, dimension: dimension}, index);}
                            index++
                    }
                    if((Date.now()-msSinceLastYieldStart)>=minMSBetweenYields){msSinceLastYieldStart = Date.now(); yield undefined as void}
                }
                if((Date.now()-msSinceLastYieldStart)>=minMSBetweenYields){msSinceLastYieldStart = Date.now(); yield undefined as void}
            }
        }else{
            for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x++) {
                for (let y = Math.min(begin.y, end.y); y <= Math.max(begin.y, end.y); y++) {
                    for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z++) {
                            placeBlockCallback({x: x, y: y, z: z, dimension: dimension}, index);
                            index++
                    }
                    if((Date.now()-msSinceLastYieldStart)>=minMSBetweenYields){msSinceLastYieldStart = Date.now(); yield undefined as void}
                }
                if((Date.now()-msSinceLastYieldStart)>=minMSBetweenYields){msSinceLastYieldStart = Date.now(); yield undefined as void}
            }
        }
        onComplete()
        generatorProgress[generatorProgressId].endTick=system.currentTick; 
        generatorProgress[generatorProgressId].endTime=Date.now(); 
        generatorProgress[generatorProgressId].done=true; 
        return
    }catch(e){generatorProgress[generatorProgressId].endTick=system.currentTick; generatorProgress[generatorProgressId].endTime=Date.now(); generatorProgress[generatorProgressId].done=true; throw(e)}
}
export function* generateWallsFillBG(begin: Vector3, end: Vector3, dimension: Dimension, generatorProgressId: string, minMSBetweenYields: number = 2000, placeBlockCallback: (location: DimensionLocation)=>any = ()=>{}, onComplete: ()=>any = ()=>{}, integrity: number = 100) {
    try{
        generatorProgress[generatorProgressId]={done: false, startTick: system.currentTick, startTime: Date.now(), containsUnloadedChunks: false}
        var msSinceLastYieldStart = Date.now()
        if(integrity!=100){
            for (let x = begin.x; x <= end.x; x++) {
                for (let y = begin.y; y <= end.y; y++) {
                    for (let z = begin.z; z <= end.z; (x==begin.x||x==end.x||z==end.z)?z++:z=end.z) {
                            if(Math.random()<=(integrity/100)){placeBlockCallback({x: x, y: y, z: z, dimension: dimension});}
                    }
                    if((Date.now()-msSinceLastYieldStart)>=minMSBetweenYields){msSinceLastYieldStart = Date.now(); yield undefined as void}
                }
                if((Date.now()-msSinceLastYieldStart)>=minMSBetweenYields){msSinceLastYieldStart = Date.now(); yield undefined as void}
            }
        }else{
            for (let x = begin.x; x <= end.x; x++) {
                for (let y = begin.y; y <= end.y; y++) {
                    for (let z = begin.z; z <= end.z; (x==begin.x||x==end.x||z==end.z)?z++:z=end.z) {
                            placeBlockCallback({x: x, y: y, z: z, dimension: dimension});
                    }
                    if((Date.now()-msSinceLastYieldStart)>=minMSBetweenYields){msSinceLastYieldStart = Date.now(); yield undefined as void}
                }
                if((Date.now()-msSinceLastYieldStart)>=minMSBetweenYields){msSinceLastYieldStart = Date.now(); yield undefined as void}
            }
        }
        onComplete()
        generatorProgress[generatorProgressId].endTick=system.currentTick; 
        generatorProgress[generatorProgressId].endTime=Date.now(); 
        generatorProgress[generatorProgressId].done=true; 
        return
    }catch(e){generatorProgress[generatorProgressId].endTick=system.currentTick; generatorProgress[generatorProgressId].endTime=Date.now(); generatorProgress[generatorProgressId].done=true; throw(e)}
}
export function* generateHollowFillBG(begin: Vector3, end: Vector3, dimension: Dimension, generatorProgressId: string, minMSBetweenYields: number = 2000, placeBlockCallback: (location: DimensionLocation)=>any = ()=>{}, onComplete: ()=>any = ()=>{}, integrity: number = 100) {
    try{
        generatorProgress[generatorProgressId]={done: false, startTick: system.currentTick, startTime: Date.now(), containsUnloadedChunks: false}
        var msSinceLastYieldStart = Date.now()
        if(integrity!=100){
            for (let x = begin.x; x <= end.x; x++) {
                for (let y = begin.y; y <= end.y; y++) {
                    for (let z = begin.z; z <= end.z; (x==begin.x||x==end.x||y==begin.y||y==end.y||z==end.z)?z++:z=end.z) {
                            if(Math.random()<=(integrity/100)){placeBlockCallback({x: x, y: y, z: z, dimension: dimension});}
                    }
                    if((Date.now()-msSinceLastYieldStart)>=minMSBetweenYields){msSinceLastYieldStart = Date.now(); yield undefined as void}
                }
                if((Date.now()-msSinceLastYieldStart)>=minMSBetweenYields){msSinceLastYieldStart = Date.now(); yield undefined as void}
            }
        }else{
            for (let x = begin.x; x <= end.x; x++) {
                for (let y = begin.y; y <= end.y; y++) {
                    for (let z = begin.z; z <= end.z; (x==begin.x||x==end.x||y==begin.y||y==end.y||z==end.z)?z++:z=end.z) {
                            placeBlockCallback({x: x, y: y, z: z, dimension: dimension});
                    }
                    if((Date.now()-msSinceLastYieldStart)>=minMSBetweenYields){msSinceLastYieldStart = Date.now(); yield undefined as void}
                }
                if((Date.now()-msSinceLastYieldStart)>=minMSBetweenYields){msSinceLastYieldStart = Date.now(); yield undefined as void}
            }
        }
        onComplete()
        generatorProgress[generatorProgressId].endTick=system.currentTick; 
        generatorProgress[generatorProgressId].endTime=Date.now(); 
        generatorProgress[generatorProgressId].done=true; 
        return
    }catch(e){generatorProgress[generatorProgressId].endTick=system.currentTick; generatorProgress[generatorProgressId].endTime=Date.now(); generatorProgress[generatorProgressId].done=true; throw(e)}
}
export function* generateOutlineFillBG(begin: Vector3, end: Vector3, dimension: Dimension, generatorProgressId: string, minMSBetweenYields: number = 2000, placeBlockCallback: (location: DimensionLocation)=>any = ()=>{}, onComplete: ()=>any = ()=>{}, integrity: number = 100) {
    try{
        generatorProgress[generatorProgressId]={done: false, startTick: system.currentTick, startTime: Date.now(), containsUnloadedChunks: false}
        var msSinceLastYieldStart = Date.now()
        if(integrity!=100){
            for (let x = begin.x; x <= end.x; x++) {
                for (let y = begin.y; y <= end.y; y++) {
                    for (let z = begin.z; z <= end.z; (((x==begin.x||x==end.x)&&(y==begin.y||y==end.y))||z==end.z)?z++:z=end.z) {
                            if(Math.random()<=(integrity/100)){placeBlockCallback({x: x, y: y, z: z, dimension: dimension});}
                    }
                    if((Date.now()-msSinceLastYieldStart)>=minMSBetweenYields){msSinceLastYieldStart = Date.now(); yield undefined as void}
                }
                if((Date.now()-msSinceLastYieldStart)>=minMSBetweenYields){msSinceLastYieldStart = Date.now(); yield undefined as void}
            }
        }else{
            for (let x = begin.x; x <= end.x; x++) {
                for (let y = begin.y; y <= end.y; (x==begin.x||x==end.x||y==end.y)?y++:y=end.y) {
                    for (let z = begin.z; z <= end.z; (((x==begin.x||x==end.x)&&(y==begin.y||y==end.y))||z==end.z)?z++:z=end.z) {
                            placeBlockCallback({x: x, y: y, z: z, dimension: dimension});
                    }
                    if((Date.now()-msSinceLastYieldStart)>=minMSBetweenYields){msSinceLastYieldStart = Date.now(); yield undefined as void}
                }
                if((Date.now()-msSinceLastYieldStart)>=minMSBetweenYields){msSinceLastYieldStart = Date.now(); yield undefined as void}
            }
        }
        onComplete()
        generatorProgress[generatorProgressId].endTick=system.currentTick; 
        generatorProgress[generatorProgressId].endTime=Date.now(); 
        generatorProgress[generatorProgressId].done=true; 
        return
    }catch(e){generatorProgress[generatorProgressId].endTick=system.currentTick; generatorProgress[generatorProgressId].endTime=Date.now(); generatorProgress[generatorProgressId].done=true; throw(e)}
}

export function generateMinecraftSphere(center: Vector3, radius: number) {
    const centerX = center.x
    const centerY = center.y
    const centerZ = center.z
    const coordinates = [] as Vector3[]
    for (let x = centerX - radius; x <= centerX + radius; x++) {
        for (let y = centerY - radius; y <= centerY + radius; y++) {
            for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                const distanceSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) + Math.pow(z - centerZ, 2);
                if (distanceSquared <= Math.pow(radius, 2)) {
                    coordinates.push({x: x, y: y, z: z});
                }
            }
        }
    }
    return coordinates
}
export function generateMinecraftSphereB(center: Vector3, radius: number, dimension: Dimension, placeBlockCallback: (location: DimensionLocation)=>any) {
    const centerX = center.x
    const centerY = center.y
    const centerZ = center.z
    var counter = 0
    for (let x = centerX - radius; x <= centerX + radius; x++) {
        for (let y = centerY - radius; y <= centerY + radius; y++) {
            for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                const distanceSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) + Math.pow(z - centerZ, 2);
                if (distanceSquared <= Math.pow(radius, 2)) {
                    placeBlockCallback({x: x, y: y, z: z, dimension: dimension});
                }
            }
        }
    }
    return counter
}
export let generatorProgressIndex = 0
export const generatorProgress = {} as {[k: string]: {done: boolean, startTick: number, endTick?: number, startTime: number, endTime?: number, containsUnloadedChunks: boolean}}
export function generatorProgressIdGenerator() {
    let id = "generatorId"+generatorProgressIndex+"Time"+Date.now()
    generatorProgressIndex = (generatorProgressIndex+1)%32767
    return id
}
export let generateMinecraftSphereBGProgressIndex = 0
export const generateMinecraftSphereBGProgress = {} as {[k: string]: {done: boolean, startTick: number, endTick?: number, startTime: number, endTime?: number, containsUnloadedChunks: boolean}}
export function generateMinecraftSphereBGIdGenerator() {
    let id = "generatorId"+generateMinecraftSphereBGProgressIndex+"Time"+Date.now()
    generateMinecraftSphereBGProgressIndex = (generateMinecraftSphereBGProgressIndex+1)%32767
    return id
}
export function* generateMinecraftSphereBG(center: Vector3, radius: number, dimension: Dimension, generateMinecraftSphereBGProgressId: string, minMSBetweenYields: number = 2000, placeBlockCallback: (location: DimensionLocation)=>any = ()=>{}, onComplete: ()=>any = ()=>{}, integrity: number = 100) {
    try{
        const centerX = center.x
        const centerY = center.y
        const centerZ = center.z
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId]={done: false, startTick: system.currentTick, startTime: Date.now(), containsUnloadedChunks: false}
        var msSinceLastYieldStart = Date.now()
        if(integrity!=100){
            for (let x = centerX - radius; x <= centerX + radius; x++) {
                for (let y = centerY - radius; y <= centerY + radius; y++) {
                    for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                        const distanceSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) + Math.pow(z - centerZ, 2);
                        if (distanceSquared <= Math.pow(radius, 2)) {
                            if(Math.random()<=(integrity/100)){placeBlockCallback({x: x, y: y, z: z, dimension: dimension});}
                        }
                    }
                    if((Date.now()-msSinceLastYieldStart)>=minMSBetweenYields){msSinceLastYieldStart = Date.now(); yield undefined as void}
                }
                if((Date.now()-msSinceLastYieldStart)>=minMSBetweenYields){msSinceLastYieldStart = Date.now(); yield undefined as void}
            }
        }else{
            for (let x = centerX - radius; x <= centerX + radius; x++) {
                for (let y = centerY - radius; y <= centerY + radius; y++) {
                    for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                        const distanceSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) + Math.pow(z - centerZ, 2);
                        if (distanceSquared <= Math.pow(radius, 2)) {
                            placeBlockCallback({x: x, y: y, z: z, dimension: dimension});
                        }
                    }
                    if((Date.now()-msSinceLastYieldStart)>=minMSBetweenYields){msSinceLastYieldStart = Date.now(); yield undefined as void}
                }
                if((Date.now()-msSinceLastYieldStart)>=minMSBetweenYields){msSinceLastYieldStart = Date.now(); yield undefined as void}
            }
        }
        onComplete()
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].endTick=system.currentTick; 
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].endTime=Date.now(); 
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].done=true; 
        return
    }catch(e){generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].endTick=system.currentTick; generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].endTime=Date.now(); generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].done=true; throw(e)}
}
export function* generateMinecraftSemiSphereBG(center: Vector3, radius: number, dimension: Dimension, generateMinecraftSphereBGProgressId: string, minMSBetweenYields: number = 2000, placeBlockCallback: (location: DimensionLocation)=>any = ()=>{}, onComplete: ()=>any = ()=>{}, integrity: number = 100) {
    try{
        const centerX = center.x
        const centerY = center.y
        const centerZ = center.z
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId]={done: false, startTick: system.currentTick, startTime: Date.now(), containsUnloadedChunks: false}
        var msSinceLastYieldStart = Date.now()
        if(integrity!=100){
            for (let x = centerX - radius; x <= centerX + radius; x++) {
                for (let y = centerY - radius; y <= centerY + radius; y++) {
                    if(y>=centerY){
                        for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                            const distanceSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) + Math.pow(z - centerZ, 2);
                            if (distanceSquared <= Math.pow(radius, 2)) {
                                if(Math.random()<=(integrity/100)){placeBlockCallback({x: x, y: y, z: z, dimension: dimension});}
                            }
                        }
                        if((Date.now()-msSinceLastYieldStart)>=minMSBetweenYields){msSinceLastYieldStart = Date.now(); yield undefined as void}
                    }
                }
                if((Date.now()-msSinceLastYieldStart)>=minMSBetweenYields){msSinceLastYieldStart = Date.now(); yield undefined as void}
            }
        }else{
            for (let x = centerX - radius; x <= centerX + radius; x++) {
                for (let y = centerY - radius; y <= centerY + radius; y++) {
                    if(y>=centerY){
                        for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                            const distanceSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) + Math.pow(z - centerZ, 2);
                            if (distanceSquared <= Math.pow(radius, 2)) {
                                placeBlockCallback({x: x, y: y, z: z, dimension: dimension});
                            }
                        }
                        if((Date.now()-msSinceLastYieldStart)>=minMSBetweenYields){msSinceLastYieldStart = Date.now(); yield undefined as void}
                    }
                }
                if((Date.now()-msSinceLastYieldStart)>=minMSBetweenYields){msSinceLastYieldStart = Date.now(); yield undefined as void}
            }
        }
        onComplete()
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].endTick=system.currentTick; 
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].endTime=Date.now(); 
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].done=true; 
        return
    }catch(e){generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].endTick=system.currentTick; generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].endTime=Date.now(); generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].done=true; throw(e)}
}
export async function drawMinecraftSphere(center: Vector3, radius: number, precision: number = 360) {
    const coordinates = [] as Vector3[];
    for (let i = 0; i < precision; i++) {
        coordinates.push(...drawMinecraftCircleB(center, radius, {x: 0, y: i}));

    }
    return (async ()=>{
        for (let i = 0; i < precision; i++) {
            coordinates.push(...drawMinecraftCircleB(center, radius, {x: 90, y: i}));
        }; 
        return [...new Set(coordinates)]
    })()
    
}
export function drawMinecraftLopsidedSphere(center: Vector3, radius: number) {
    const coordinates = [] as Vector3[];
    for (let i = 0; i < 360; i++) {
        coordinates.push(...drawMinecraftCircleB(center, radius, {x: i, y: i}));

    }
    return coordinates;
}
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
export function roundVector3ToMiddleOfBlock(vector: Vector3) {
    return {x: Math.floor(vector.x)+0.5, y: Math.floor(vector.y)+0.5, z: Math.floor(vector.z)+0.5};
}
export function roundVector3ToMiddleOfBlockFloorY(vector: Vector3) {
    return {x: Math.floor(vector.x)+0.5, y: Math.floor(vector.y), z: Math.floor(vector.z)+0.5};
}
declare global {
    class Entity {
        localTeleport(localTeleport: ILocalTeleport): void;
    }}; 