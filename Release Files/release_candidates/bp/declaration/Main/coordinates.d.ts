import { Block, Dimension, type DimensionLocation, DimensionType, Player, type Vector2, type Vector3, Entity, CompoundBlockVolume, type BoundingBox, Direction, type StructurePlaceOptions, type StructureCreateOptions, Structure, type VectorXZ } from "@minecraft/server";
import * as coords from "Main/coordinates";
import mcMath from "@minecraft/math.js";
export declare const coordinates_format_version = "7.0.0";
export declare class Vector extends mcMath.Vector3Builder implements mcMath.Vector3Utils {
    zero: Vector3;
    one: Vector3;
    up: Vector3;
    down: Vector3;
    north: Vector3;
    south: Vector3;
    east: Vector3;
    west: Vector3;
    right: Vector3;
    left: Vector3;
    back: Vector3;
    forward: Vector3;
    static zero: Vector3;
    static one: Vector3;
    static up: Vector3;
    static down: Vector3;
    static north: Vector3;
    static south: Vector3;
    static east: Vector3;
    static west: Vector3;
    static right: Vector3;
    static left: Vector3;
    static back: Vector3;
    static forward: Vector3;
    static add: typeof mcMath.Vector3Utils.add;
    static clamp: typeof mcMath.Vector3Utils.clamp;
    static cross: typeof mcMath.Vector3Utils.cross;
    static distance: typeof mcMath.Vector3Utils.distance;
    static dot: typeof mcMath.Vector3Utils.dot;
    static equals: typeof mcMath.Vector3Utils.equals;
    static floor: typeof mcMath.Vector3Utils.floor;
    static lerp: typeof mcMath.Vector3Utils.lerp;
    static magnitude: typeof mcMath.Vector3Utils.magnitude;
    static normalize: typeof mcMath.Vector3Utils.normalize;
    static scale: typeof mcMath.Vector3Utils.scale;
    static slerp: typeof mcMath.Vector3Utils.slerp;
    static subtract: typeof mcMath.Vector3Utils.subtract;
}
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
    positioned(coordinateText: string): coords.WorldPosition;
    in(dimension?: DimensionType | Dimension | string): coords.WorldPosition;
    rotated(x: number | string, y: number | string): coords.WorldPosition;
    at(target: string | Entity[] | Player[]): coords.WorldPosition[];
    setSendErrorsTo(target: string | Entity[] | Player[]): coords.WorldPosition;
    clearSendErrorsTo(): coords.WorldPosition;
    resetSendErrorsTo(): coords.WorldPosition;
    as(target: string | Entity[] | Player[]): coords.WorldPosition[];
    asblock(block: DimensionLocation | Block): coords.WorldPosition;
    matchrotation(target: string | Entity[] | Player[]): coords.WorldPosition[];
    matchlocation(target: string | Entity[] | Player[]): coords.WorldPosition[];
    matchdimension(target: string | Entity[] | Player[]): coords.WorldPosition[];
    anchored(anchor: string | "feet" | "eyes"): coords.WorldPosition;
    resetRotation(): coords.WorldPosition;
    facing(location: Vector3): coords.WorldPosition;
    facingEntity(target: string | Entity[] | Player[]): coords.WorldPosition[];
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
export declare function getDistance(point1: Vector3, point2: Vector3): number;
/**
 * @deprecated Use {@link getChunkIndexC} instead.
 * @param location
 * @returns
 */
export declare function getChunkIndex(location: Vector3): {
    x: number;
    y: number;
};
/**
 * @deprecated Use {@link getChunkIndexC} instead.
 * @param x
 * @param z
 * @returns
 */
export declare function getChunkIndexB(x: number, z: number): {
    x: number;
    y: number;
};
/**
 * @deprecated
 * @param location
 * @returns
 */
export declare function getChunkIndexC(location: Vector2): {
    x: number;
    y: number;
};
/**
 * The newest and recommended version of this function to use.
 * @param location
 * @returns A VectorXZ object containg the chunk index.
 */
export declare function getChunkIndexD(location: VectorXZ): {
    x: number;
    z: number;
};
/**
 * @deprecated Use {@link chunkIndexToBoundingBoxXZ} instead.
 * @param chunkIndex
 * @param heightRange
 * @returns
 */
export declare function chunkIndexToBoundingBox(chunkIndex: Vector2, heightRange?: [min: number, max: number]): {
    from: {
        x: number;
        y: number;
        z: number;
    };
    to: {
        x: number;
        y: number;
        z: number;
    };
};
/**
 * @deprecated Use {@link chunkIndexToBoundingBoxXZB} instead.
 * @param chunkIndex
 * @param heightRange
 * @returns
 */
export declare function chunkIndexToBoundingBoxB(chunkIndex: Vector2, heightRange?: {
    min: number;
    max: number;
}): {
    from: {
        x: number;
        y: number;
        z: number;
    };
    to: {
        x: number;
        y: number;
        z: number;
    };
};
export declare function chunkIndexToBoundingBoxXZ(chunkIndex: Vector2, heightRange?: [min: number, max: number]): {
    from: {
        x: number;
        y: number;
        z: number;
    };
    to: {
        x: number;
        y: number;
        z: number;
    };
};
export declare function chunkIndexToBoundingBoxXZB(chunkIndex: Vector2, heightRange?: {
    min: number;
    max: number;
}): {
    from: {
        x: number;
        y: number;
        z: number;
    };
    to: {
        x: number;
        y: number;
        z: number;
    };
};
export declare function doBoundingBoxesIntersect(box1: BoundingBox, box2: BoundingBox): boolean;
export declare function VSTR(vector1: Vector3, vector2: Vector3): {
    from: {
        x: number;
        y: number;
        z: number;
    };
    to: {
        x: number;
        y: number;
        z: number;
    };
};
export declare const approximatelyEqual: (v1: any, v2: any, epsilon?: number) => boolean;
export declare const approxEqual: (v1: any, v2: any, epsilon?: number) => boolean;
export declare const approximatelyEquals: (v1: any, v2: any, epsilon?: number) => boolean;
export declare const approxEquals: (v1: any, v2: any, epsilon?: number) => boolean;
export declare function parseExpression(str: string): Function;
export declare function parseExpressionKE(str: string): Function;
export declare function parseExpressionR(str: string): Function;
export declare function parseExpressionB(str: string): (wx: any, wy: any, wz: any, x: any, y: any, z: any, ax: any, ay: any, az: any, bx: any, by: any, bz: any, nx: any, ny: any, nz: any, px: any, py: any, pz: any) => any;
export declare function parseExpressionBKE(str: string): (wx: any, wy: any, wz: any, x: any, y: any, z: any, ax: any, ay: any, az: any, bx: any, by: any, bz: any, nx: any, ny: any, nz: any, px: any, py: any, pz: any) => any;
export declare function parseExpressionBR(str: string): (wx: any, wy: any, wz: any, x: any, y: any, z: any, ax: any, ay: any, az: any, bx: any, by: any, bz: any, nx: any, ny: any, nz: any, px: any, py: any, pz: any) => any;
export declare function generateMathExpression(expression: (wx: number, wy: number, wz: number, x: number, y: number, z: number, ax: number, ay: number, az: number, bx: number, by: number, bz: number, nx: number, ny: number, nz: number, px: number, py: number, pz: number) => boolean, generateCallback: (location: {
    x: number;
    y: number;
    z: number;
    rx: number;
    ry: number;
    rz: number;
    ax: number;
    ay: number;
    az: number;
    bx: number;
    by: number;
    bz: number;
    nx: number;
    ny: number;
    nz: number;
    px: number;
    py: number;
    pz: number;
    count: bigint;
    index: bigint;
}) => any, from: Vector3, to: Vector3, pos1: Vector3, pos2: Vector3, step?: number): Generator<void, bigint, unknown>;
export declare function dirmap(direction: Direction): "above" | "below" | "east" | "west" | "north" | "south";
export declare function diroffsetmap(direction: Direction): Vector3;
export declare function diroffsetmapb(direction: string): Vector3;
export declare function diroffsetothersmap(direction: Direction): {
    x: number;
    y: number;
    z: number;
} | {
    x: number;
    y: number;
    z: number;
} | {
    x: number;
    y: number;
    z: number;
} | {
    x: number;
    y: number;
    z: number;
} | {
    x: number;
    y: number;
    z: number;
} | {
    x: number;
    y: number;
    z: number;
};
export declare function splitRange([min, max]: [number, number], size: number): [number, number][];
export declare function splitArea(area: {
    from: Vector3;
    to: Vector3;
}, sizes?: Vector3): Generator<[from: Vector3, to: Vector3, indices: Vector3, offset: Vector3], void, unknown>;
export declare function splitAreaB(area: {
    from: Vector3;
    to: Vector3;
}, sizes?: Vector3): Generator<{
    from: {
        x: number;
        y: number;
        z: number;
    };
    to: {
        x: number;
        y: number;
        z: number;
    };
    indices: {
        x: number;
        y: number;
        z: number;
    };
    offset: {
        x: number;
        y: number;
        z: number;
    };
}, void, unknown>;
export declare class blockClipboard {
    static get ids(): string[];
    static get saveSize(): Vector3;
    static clear(): void;
    static saveRange(dimension: Dimension, range: [from: Vector3, to: Vector3, indices: Vector3], options?: StructureCreateOptions): void;
    static save(dimension: Dimension, area: {
        from: Vector3;
        to: Vector3;
    }, options?: StructureCreateOptions, sizeLimits?: {
        x: number;
        y: number;
        z: number;
    }): void;
    static place(location: DimensionLocation, options?: StructurePlaceOptions, sizes?: {
        x: number;
        y: number;
        z: number;
    }): void;
}
export declare class undoClipboard {
    static get ids(): string[];
    static saveIds(timestamp: number | string): string[];
    static saveSize(timestamp: number | string): Vector3;
    static get saves(): string[];
    static get saveTimes(): number[];
    static get newestSaveTime(): number;
    static cullItemsMissingStructure(): void;
    static clear(): void;
    static clearTime(timestamp: number | string): void;
    static saveRange(dimension: Dimension, range: [from: Vector3, to: Vector3, indices: Vector3], saveTime: number, options?: StructureCreateOptions): void;
    static save(dimension: Dimension, area: {
        from: Vector3;
        to: Vector3;
    }, saveTime?: number, options?: StructureCreateOptions, sizeLimits?: {
        x: number;
        y: number;
        z: number;
    }): void;
    static undo(saveTime?: number, options?: StructurePlaceOptions, clearSave?: boolean, sizes?: Vector3): 0 | 1;
}
export declare class AreaBackups {
    static get ids(): string[];
    static get structureIds(): string[];
    static get areas(): coords.AreaBackup[];
    static get(id: string): coords.AreaBackup;
    static delete(id: string): void;
    static clear(): void;
    static createAreaBackup(id: string, dimension: Dimension, area: {
        from: Vector3;
        to: Vector3;
    }): coords.AreaBackup;
}
export declare class AreaBackup {
    id: string;
    constructor(id: string);
    get from(): Vector3;
    get to(): Vector3;
    get dimension(): Dimension;
    get backups(): number[];
    get backupStructureIds(): string[];
    saveIds(timestamp: number | string): string[];
    get size(): Vector3;
    toJSON(): {
        id: string;
        from: Vector3;
        to: Vector3;
        dimension: Dimension;
    };
    toJSONNoId(): {
        from: Vector3;
        to: Vector3;
        dimension: Dimension;
    };
    delete(): void;
    clear(): void;
    clearBackup(timestamp: number | string): void;
    clearBackups(): void;
    backupRange(range: [from: Vector3, to: Vector3, indices: Vector3], saveTime: number, options?: StructureCreateOptions): void;
    backup(saveTime?: number, options?: StructureCreateOptions, sizeLimits?: {
        x: number;
        y: number;
        z: number;
    }): void;
    rollback(saveTime?: number, clearSave?: boolean, options?: StructurePlaceOptions, sizes?: Vector3): 0 | 1;
}
export declare function removeAirFromStructure(structure: Structure): Generator<any, void, unknown>;
export interface DimensionVolumeArea {
    dimension: Dimension;
    from: Vector3;
    to: Vector3;
}
export interface Vector4 {
    w: number;
    x: number;
    y: number;
    z: number;
}
export interface Vector5 {
    v: number;
    w: number;
    x: number;
    y: number;
    z: number;
}
export interface RotationLocation {
    rotX: number;
    rotY: number;
    x: number;
    y: number;
    z: number;
}
export interface DimensionRotationLocation {
    dimension: Dimension;
    rotX: number;
    rotY: number;
    x: number;
    y: number;
    z: number;
}
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
export declare function rotate(pitchb: number, rollb: number, yawb: number, points: any): any;
export declare function rotate3d(points: any, pitchb: any, rollb: any, yawb: any): any;
export declare function movePointInDirection(point: Vector3, direction: Vector2, distance: Vector3): {
    x: any;
    y: any;
    z: any;
};
export declare function evaluateCoordinates(x: string, y: string, z: string, startingPosition: Vector3, rotation: Vector2): Vector3;
export declare function evaluateRotationCoordinates(x: string, y: string, rotation: Vector2): Vector2;
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
export declare function degradeArray(array: any[], integrity: number, seed?: number): any[];
export declare function generateCircleCoordinates(centerX: number, centerY: number, centerZ: number, radius: number, axis: "x" | "y" | "z" | "ns" | "sn" | "ew" | "we" | "ud" | "du" | "X" | "Y" | "Z" | "NS" | "SN" | "EW" | "WE" | "UD" | "DU"): any[];
export declare function generateCircleCoordinatesB(center: Vector3, radius: number, axis: "x" | "y" | "z" | "ns" | "sn" | "ew" | "we" | "ud" | "du" | "X" | "Y" | "Z" | "NS" | "SN" | "EW" | "WE" | "UD" | "DU"): Vector3[];
export declare function generateCircleCoordinatesC(centerX: any, centerY: any, centerZ: any, radius: any): Vector3[];
export declare function generateMinecraftCircleOutline(center: Vector3, radius: number, thickness: number, dimension: Dimension, placeBlockCallback: (location: DimensionLocation) => any, integrity?: number): void;
export declare function generateMinecraftCircleOutlineBG(center: Vector3, radius: number, thickness: number, generatorProgressId: string, dimension?: Dimension, placeBlockCallback?: (location: DimensionLocation) => any, options?: {
    integrity?: number;
    minMSBetweenYields?: number;
}): Generator<void, void, unknown>;
export declare function generateMinecraftOvoid(center: Vector3, radius: Vector3, offset: Vector3, thickness: number, dimension?: Dimension, placeBlockCallback?: (location: DimensionLocation) => any, integrity?: number): void;
export declare function generateMinecraftOvoidBG(center: Vector3, radius: Vector3, offset: Vector3, thickness: number, generatorProgressId: string, dimension?: Dimension, placeBlockCallback?: (location: DimensionLocation) => any, options?: {
    integrity?: number;
    minMSBetweenYields?: number;
}): Generator<void, void, unknown>;
export declare function generateMinecraftOvoidC(center: Vector3, radius: Vector3, offset: Vector3, thickness: number, dimension?: Dimension, placeBlockCallback?: (location: DimensionLocation) => any, integrity?: number): void;
export declare function generateMinecraftOvoidCG(center: Vector3, radius: Vector3, offset: Vector3, thickness: number, generatorProgressId: string, dimension?: Dimension, placeBlockCallback?: (location: DimensionLocation) => any, options?: {
    integrity?: number;
    minMSBetweenYields?: number;
}): Generator<void, void, unknown>;
export declare function generateSolidOvoid(center: Vector3, radius: Vector3, offset: Vector3, dimension?: Dimension, placeBlockCallback?: (location: DimensionLocation) => any, integrity?: number): void;
export declare function generateSolidOvoidBG(center: Vector3, radius: Vector3, offset: Vector3, generatorProgressId: string, dimension?: Dimension, placeBlockCallback?: (location: DimensionLocation) => any, options?: {
    integrity?: number;
    minMSBetweenYields?: number;
}): Generator<void, void, unknown>;
export declare function generateSkygrid(from: Vector3, to: Vector3, gridSize: number, dimension?: Dimension, placeBlockCallback?: (location: DimensionLocation) => any, integrity?: number): void;
export declare function generateInverseSkygrid(from: Vector3, to: Vector3, gridSize: number, dimension?: Dimension, placeBlockCallback?: (location: DimensionLocation) => any, integrity?: number): void;
export declare function generateSkygridBG(from: Vector3, to: Vector3, gridSize: number, generatorProgressId: string, dimension?: Dimension, placeBlockCallback?: (location: DimensionLocation, index: bigint) => any, options?: {
    integrity?: number;
    minMSBetweenYields?: number;
}): Generator<void, void, unknown>;
export declare function generateInverseSkygridBG(from: Vector3, to: Vector3, gridSize: number, generatorProgressId: string, dimension?: Dimension, placeBlockCallback?: (location: DimensionLocation, index: bigint) => any, options?: {
    integrity?: number;
    minMSBetweenYields?: number;
}): Generator<void, void, unknown>;
export declare function generateTickingAreaFillCoordinates(area: CompoundBlockVolume, dimension: Dimension): DimensionLocation[];
export declare function generateTickingAreaFillCoordinatesB(area: CompoundBlockVolume, dimension: Dimension, spawnEntityCallback?: (location: DimensionLocation, locations: DimensionLocation[], index: number) => any): DimensionLocation[];
export declare function generateTickingAreaFillCoordinatesC(center: Vector3, area: CompoundBlockVolume, dimension: Dimension, spawnEntityCallback?: (location: DimensionLocation, locations: Entity[], index: number) => any): Promise<Entity[]>;
export declare function drawMinecraftCircle(center: Vector3, radius: number, axis: string, precision?: number): Vector3[];
export declare function generateMinecraftTunnel(center: Vector3, radius: number, length: number, axis: string, precision?: number): Vector3[];
export declare function generateMinecraftTunnelSet(center: Vector3, radius: number, length: number, axis: string, precision?: number): Set<Vector3>;
export declare function drawMinecraftCircleB(center: Vector3, radius: number, rotation: Vector2, precision?: number): Vector3[];
export declare function generateHollowSphere(center: Vector3, radius: number, thickness: number): Vector3[];
export declare function generateHollowSphereB(center: Vector3, radius: number, thickness: number, dimension: Dimension, placeBlockCallback: (location: DimensionLocation) => any): typeof coordinates;
export declare function generateHollowSphereBG(center: Vector3, radius: number, thickness: number, dimension: Dimension, generatorProgressId: string, minMSBetweenYields?: number, placeBlockCallback?: (location: DimensionLocation, index: bigint) => any, onComplete?: () => any, integrity?: number): Generator<void, void, unknown>;
export declare function generateDomeBG(center: Vector3, radius: number, thickness: number, dimension: Dimension, generatorProgressId: string, minMSBetweenYields?: number, placeBlockCallback?: (location: DimensionLocation) => any, onComplete?: () => any, integrity?: number): Generator<void, void, unknown>;
export declare function generateFillBG(begin: Vector3, end: Vector3, dimension: Dimension, generatorProgressId: string, minMSBetweenYields?: number, placeBlockCallback?: (location: DimensionLocation, index: bigint) => any, onComplete?: () => any, integrity?: number): Generator<void, void, unknown>;
export declare function generateWallsFillBG(begin: Vector3, end: Vector3, dimension: Dimension, generatorProgressId: string, minMSBetweenYields?: number, placeBlockCallback?: (location: DimensionLocation, index: bigint) => any, onComplete?: () => any, integrity?: number): Generator<void, void, unknown>;
export declare function generateHollowFillBG(begin: Vector3, end: Vector3, dimension: Dimension, generatorProgressId: string, minMSBetweenYields?: number, placeBlockCallback?: (location: DimensionLocation, index: bigint) => any, onComplete?: () => any, integrity?: number): Generator<void, void, unknown>;
export declare function generateOutlineFillBG(begin: Vector3, end: Vector3, dimension: Dimension, generatorProgressId: string, minMSBetweenYields?: number, placeBlockCallback?: (location: DimensionLocation, index: bigint) => any, onComplete?: () => any, integrity?: number): Generator<void, void, unknown>;
/**
 * Generates a minecraft sphere.
 * @deprecated Superceeded by generateMinecraftSphereBG().
 */
export declare function generateMinecraftSphere(center: Vector3, radius: number): Vector3[];
/**
 * Generates a minecraft sphere.
 * @deprecated Superceeded by generateMinecraftSphereBG().
 */
export declare function generateMinecraftSphereB(center: Vector3, radius: number, dimension: Dimension, placeBlockCallback: (location: DimensionLocation) => any): number;
export declare let generatorProgressIndex: number;
export declare const generatorProgress: {
    [k: string]: {
        done: boolean;
        startTick: number;
        endTick?: number;
        startTime: number;
        endTime?: number;
        containsUnloadedChunks: boolean;
    };
};
export declare function generatorProgressIdGenerator(): string;
export declare let generateMinecraftSphereBGProgressIndex: number;
export declare const generateMinecraftSphereBGProgress: {
    [k: string]: {
        done: boolean;
        startTick: number;
        endTick?: number;
        startTime: number;
        endTime?: number;
        containsUnloadedChunks: boolean;
    };
};
export declare function generateMinecraftSphereBGIdGenerator(): string;
/**
 * Generates a minecraft sphere.
 * @version 1.2.0
 * @generator
 */
export declare function generateMinecraftSphereBG(center: Vector3, radius: number, dimension: Dimension, generateMinecraftSphereBGProgressId: string, minMSBetweenYields?: number, placeBlockCallback?: (location: DimensionLocation, index: bigint) => any, onComplete?: () => any, integrity?: number): Generator<void, void, unknown>;
/**
 * Generates a minecraft cone.
 * @since 1.18.0-development.20
 * @version 1.0.0
 * @generator
 */
export declare function generateMinecraftConeBG(center: Vector3, radius: number, height: number, dimension: Dimension, generateMinecraftConeBGProgressId: string, minMSBetweenYields?: number, placeBlockCallback?: (location: DimensionLocation, index: bigint) => any, onComplete?: () => any, integrity?: number): Generator<void, void, unknown>;
/**
 * Generates a minecraft top half semi-sphere.
 * @version 1.1.0
 * @generator
 */
export declare function generateMinecraftSemiSphereBG(center: Vector3, radius: number, dimension: Dimension, generateMinecraftSphereBGProgressId: string, minMSBetweenYields?: number, placeBlockCallback?: (location: DimensionLocation, index: bigint) => any, onComplete?: () => any, integrity?: number): Generator<void, void, unknown>;
/**
 * Generates a minecraft bottom half semi-sphere.
 * @version 1.1.0
 * @generator
 */
export declare function generateMinecraftSemiSphereBGB(center: Vector3, radius: number, dimension: Dimension, generateMinecraftSphereBGProgressId: string, minMSBetweenYields?: number, placeBlockCallback?: (location: DimensionLocation, index: bigint) => any, onComplete?: () => any, integrity?: number): Generator<void, void, unknown>;
/**
 * Generates a list of coordinates for a minecraft sphere.
 * @deprecated Legacy function that may cause the script to exceed the scripting memory limit.
 */
export declare function drawMinecraftSphere(center: Vector3, radius: number, precision?: number): Promise<Vector3[]>;
/**
 * Generates a list of coordinates for a lopsided minecraft sphere.
 * @deprecated Legacy function that may cause the script to exceed the scripting memory limit.
 */
export declare function drawMinecraftLopsidedSphere(center: Vector3, radius: number): Vector3[];
/**
 * Generates a list of coordinates for a minecraft cylinder.
 * @deprecated Legacy function that may cause the script to exceed the scripting memory limit.
 */
export declare function generateMinecraftCylinder(blockType: string, radius: number, thickness: number, centerX: number, centerY: number, centerZ: number): any[];
export declare function roundVector3ToMiddleOfBlock(vector: Vector3): {
    x: number;
    y: number;
    z: number;
};
export declare function roundVector3ToMiddleOfBlockFloorY(vector: Vector3): {
    x: number;
    y: number;
    z: number;
};
