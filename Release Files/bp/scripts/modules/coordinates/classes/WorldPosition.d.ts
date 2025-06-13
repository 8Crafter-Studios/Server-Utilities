import { Dimension, Entity, Block, type Vector3, type Vector2, DimensionType, Player, type DimensionLocation } from "@minecraft/server";
import type { RotationLocation } from "modules/coordinates/interfaces/RotationLocation";
/**
 * A class that represents a location and rotation in the world, with optional dimension, entity, and block to be linked to it, and an options for where to send errors.
 *
 * @todo Add documentation.
 */
export declare class WorldPosition {
    x: number;
    y: number;
    z: number;
    rotx: number;
    roty: number;
    dimension?: Dimension;
    entity?: Entity;
    block?: Block;
    sendErrorsTo?: any;
    constructor(location: Vector3, rotation: Vector2, dimension?: DimensionType | Dimension | string, entity?: Entity | Player, block?: Block, sendErrorsTo?: any);
    get location(): Vector3;
    get locationstring(): string;
    get rotation(): Vector2;
    get rotationstring(): string;
    get locationrotation(): RotationLocation;
    get directionvector(): Vector3;
    set location(location: Vector3);
    set rotation(rotation: Vector2);
    positioned(coordinateText: string): WorldPosition;
    in(dimension?: DimensionType | Dimension | string): WorldPosition;
    rotated(x: number | string, y: number | string): WorldPosition;
    at(target: string | Entity[] | Player[]): WorldPosition[];
    setSendErrorsTo(target: string | Entity[] | Player[]): WorldPosition;
    clearSendErrorsTo(): WorldPosition;
    resetSendErrorsTo(): WorldPosition;
    as(target: string | Entity[] | Player[]): WorldPosition[];
    asblock(block: DimensionLocation | Block): WorldPosition;
    matchrotation(target: string | Entity[] | Player[]): WorldPosition[];
    matchlocation(target: string | Entity[] | Player[]): WorldPosition[];
    matchdimension(target: string | Entity[] | Player[]): WorldPosition[];
    anchored(anchor: string | "feet" | "eyes"): WorldPosition;
    resetRotation(): WorldPosition;
    facing(location: Vector3): WorldPosition;
    facingEntity(target: string | Entity[] | Player[]): WorldPosition[];
    align(axis: string): WorldPosition;
    offset(offset: Vector3): WorldPosition;
    static fromentity(entity: Entity | Player): WorldPosition;
    static fromblock(block: Block): WorldPosition;
}
