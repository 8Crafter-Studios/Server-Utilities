import { Block, Dimension, type DimensionLocation, DimensionType, Player, type Vector2, type Vector3, Entity } from "@minecraft/server";
import * as coords from "Main/coordinates";
export declare const coordinates_format_version = "1.0.1";
export interface ILocalTeleport {
    sway_1: number;
    heave_2: number;
    surge_3: number;
}
export declare class WorldPosition {
    x: number;
    y: number;
    z: number;
    rotx: number;
    roty: number;
    dimension?: Dimension;
    entity?: Entity;
    block?: Block;
    constructor(location: Vector3, rotation: Vector2, dimension?: DimensionType | Dimension | string, entity?: Entity | Player, block?: Block);
    get location(): Vector3;
    get locationstring(): string;
    get rotation(): Vector2;
    get rotationstring(): string;
    get locationrotation(): {
        x: number;
        y: number;
        z: number;
        rotx: number;
        roty: number;
    };
    get directionvector(): Vector3;
    set location(location: Vector3);
    set rotation(rotation: Vector2);
    positioned(coordinateText: string): coords.WorldPosition;
    in(dimension?: DimensionType | Dimension | string): coords.WorldPosition;
    rotated(x: number | string, y: number | string): coords.WorldPosition;
    at(target: string | Entity | Player): coords.WorldPosition;
    as(target: string | Entity | Player): coords.WorldPosition;
    asblock(block: DimensionLocation | Block): coords.WorldPosition;
    matchrotation(target: string | Entity | Player): coords.WorldPosition;
    matchlocation(target: string | Entity | Player): coords.WorldPosition;
    anchored(anchor: string): coords.WorldPosition;
    resetRotation(): coords.WorldPosition;
    facing(location: Vector3): coords.WorldPosition;
    align(axis: string): coords.WorldPosition;
    offset(offset: Vector3): coords.WorldPosition;
    static fromentity(entity: Entity | Player): coords.WorldPosition;
    static fromblock(block: Block): coords.WorldPosition;
}
export declare const LocalTeleportFunctions: {
    norm: ({ x, y, z }: Vector3, s: number) => {
        x: number;
        y: number;
        z: number;
    };
    xa: ({ x, y, z }: Vector3, s: number) => {
        x: number;
        y: number;
        z: number;
    };
    ya: ({ x, y, z }: Vector3, s: number) => {
        x: number;
        y: number;
        z: number;
    };
    za: (a: Vector3, s: number) => {
        x: number;
        y: number;
        z: number;
    };
};
export declare function facingPoint(location: Vector3, otherLocation: Vector3): {
    rot: {
        x: number;
        y: number;
    };
    difference: {
        x: number;
        y: number;
        z: number;
    };
};
export declare function caretNotation(location: Vector3, offset: Vector3, rot: Vector3): {
    x: number;
    y: number;
    z: number;
};
export declare function caretNotationB(location: Vector3, r: number, { x, y }: Vector2): {
    x: number;
    y: number;
    z: number;
};
export declare function caretNotationC(location: Vector3, offset: Vector3, rot: Vector2): {
    x: number;
    y: number;
    z: number;
};
export declare function caretNotationD(location: Vector3, offset: Vector3, rot: Vector3): {
    x: number;
    y: number;
    z: number;
};
export declare function anglesToDirectionVector(yaw: number, pitch: number): {
    x: number;
    y: number;
    z: number;
};
export declare function anglesToDirectionVectorDeg(yaw: number, pitch: number): {
    x: number;
    y: number;
    z: number;
};
export declare function rotate(pitchb: any, rollb: any, yawb: any, points: any): any;
export declare function rotate3d(points: any, pitchb: any, rollb: any, yawb: any): any;
export declare function movePointInDirection(point: Vector3, direction: Vector2, distance: Vector3): {
    x: any;
    y: any;
    z: any;
};
export declare function evaluateCoordinates(x: string, y: string, z: string, startingPosition: Vector3, rotation: Vector2): Vector3;
export declare function evaluateCoordinatesB(x: string, y: string, z: string, startingPosition: Vector3, rotation: Vector3): Vector3;
export declare function coordinatesB(coordinateText: string, startingPosition: Vector3, rotation: Vector3): {
    x: number;
    y: number;
    z: number;
};
export declare function coordinates(coordinateText: string, startingPosition: Vector3, rotation: Vector2): {
    x: number;
    y: number;
    z: number;
};
export declare function coordinatesC(coordinateText: string, source: Entity): {
    x: number;
    y: number;
    z: number;
};
export declare function coordinatesD(coordinateText: string, source: Entity | Block, rotation: Vector2): {
    x: number;
    y: number;
    z: number;
};
export declare function coordinatesE(coordinateText: string, source: Entity | Block, rotation: Vector3): {
    x: number;
    y: number;
    z: number;
};
declare global {
    class Entity {
        localTeleport(localTeleport: ILocalTeleport): void;
    }
}
