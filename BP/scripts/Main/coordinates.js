import { Vector, world } from "@minecraft/server";
import { targetSelectorAllListC, targetSelectorAllListE } from "Main";
import * as GameTest from "@minecraft/server-gametest";
import * as mcServer from "@minecraft/server";
import * as mcServerUi from "@minecraft/server-ui"; /*
import * as mcServerAdmin from "@minecraft/server-admin";*/ /*
import * as mcDebugUtilities from "@minecraft/debug-utilities";*/ /*
import * as mcCommon from "@minecraft/common";*/ /*
import * as mcVanillaData from "@minecraft/vanilla-data";*/
import * as main from "Main";
import * as coords from "Main/coordinates";
import * as cmds from "Main/commands";
import * as bans from "Main/ban";
import * as uis from "Main/ui";
import * as playersave from "Main/player_save";
import * as spawnprot from "Main/spawn_protection";
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
export const coordinates_format_version = "1.0.1";
export class WorldPosition {
    constructor(location, rotation, dimension, entity, block) {
        this.location = location;
        this.rotation = rotation;
        if (dimension == undefined) { }
        else {
            this.dimension = world.getDimension(dimension?.typeId ?? dimension?.id ?? dimension);
        }
        ;
        this.entity = entity;
        this.block = block; /*
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
        return { x: this.x, y: this.y, z: this.z, rotx: this.rotx, roty: this.roty };
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
        if (target.constructor.name == "Entity" || target.constructor.name == "Player") {
            let entity = target;
            this.location = entity?.location ?? this.location;
            this.rotation = entity?.getRotation() ?? this.rotation;
        }
        else {
            if (this.entity == undefined) {
                let entity = targetSelectorAllListE(target, this.x + " " + this.y + " " + this.z)[0] ?? this.entity;
                this.location = entity?.location ?? this.location;
                this.rotation = entity?.getRotation() ?? this.rotation;
            }
            else {
                let entity = targetSelectorAllListC(target, "", this.x + " " + this.y + " " + this.z, this.entity)[0] ?? this.entity;
                this.location = entity.location;
                this.rotation = entity.getRotation();
            }
        }
        return this;
    }
    as(target) {
        if (target.constructor.name == "Entity" || target.constructor.name == "Player") {
            this.entity = target;
        }
        else {
            if (this.entity == undefined) {
                this.entity = targetSelectorAllListE(target, this.x + " " + this.y + " " + this.z)[0];
            }
            else {
                this.entity = targetSelectorAllListC(target, "", this.x + " " + this.y + " " + this.z, this.entity)[0] ?? this.entity;
            }
        }
        return this;
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
        if (target.constructor.name == "Entity" || target.constructor.name == "Player") {
            let entity = target;
            this.rotation = entity?.getRotation() ?? this.rotation;
        }
        else {
            if (this.entity == undefined) {
                let entity = targetSelectorAllListE(target, this.x + " " + this.y + " " + this.z)[0] ?? this.entity;
                this.rotation = entity?.getRotation() ?? this.rotation;
            }
            else {
                let entity = targetSelectorAllListC(target, "", this.x + " " + this.y + " " + this.z, this.entity)[0] ?? this.entity;
                this.rotation = entity.getRotation();
            }
        }
        return this;
    }
    matchlocation(target) {
        if (target.constructor.name == "Entity" || target.constructor.name == "Player") {
            let entity = target;
            this.location = entity?.location ?? this.location;
        }
        else {
            if (this.entity == undefined) {
                let entity = targetSelectorAllListE(target, this.x + " " + this.y + " " + this.z)[0] ?? this.entity;
                this.location = entity?.location ?? this.location;
            }
            else {
                let entity = targetSelectorAllListC(target, "", this.x + " " + this.y + " " + this.z, this.entity)[0] ?? this.entity;
                this.location = entity.location;
                this.rotation = entity.getRotation();
            }
        }
        return this;
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
        this.location = Vector.add(this.location, offset);
        return this;
    }
    static fromentity(entity) {
        return new WorldPosition(entity?.location, entity?.getRotation(), entity?.dimension, entity);
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
export function facingPoint(location, otherLocation) {
    const sl = location;
    const ol = otherLocation;
    const x = (-ol.x) - sl.x;
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
        location = evaluateCoordinatesB(coordinateText.split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[0].replaceAll(" ", ""), coordinateText.split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[1].replaceAll(" ", ""), coordinateText.split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[2].replaceAll(" ", ""), startingPosition, rotation);
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
;
