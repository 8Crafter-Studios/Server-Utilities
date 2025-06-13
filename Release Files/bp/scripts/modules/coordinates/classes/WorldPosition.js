import { Vector3Utils } from "@minecraft/math.js";
import { Dimension, Entity, Block, DimensionType, Player, world } from "@minecraft/server";
import { targetSelectorAllListE } from "modules/command_utilities/functions/targetSelectorAllListE";
import { targetSelectorAllListC } from "modules/command_utilities/functions/targetSelectorAllListC";
import { anglesToDirectionVectorDeg } from "../functions/anglesToDirectionVectorDeg";
import { coordinates } from "../functions/coordinates";
import { facingPoint } from "../functions/facingPoint";
/**
 * A class that represents a location and rotation in the world, with optional dimension, entity, and block to be linked to it, and an options for where to send errors.
 *
 * @todo Add documentation.
 */
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
        this.x = location.x;
        this.y = location.y;
        this.z = location.z;
        this.rotx = rotation.x;
        this.roty = rotation.y;
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
        this.location = Vector3Utils.add(this.location, offset);
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
//# sourceMappingURL=WorldPosition.js.map