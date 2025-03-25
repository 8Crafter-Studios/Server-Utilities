import { Block, Entity, Player, type Vector2, type Vector3, type DimensionLocation, Dimension } from "@minecraft/server";
export declare function evaluateSelectors(selector: string, options?: {
    source?: Block | Entity | Player;
    rotation?: Vector2;
    viewDirection?: Vector3;
    location?: Vector3 | DimensionLocation;
    dimension?: Dimension;
    indirect?: number | boolean;
    asDimension?: number | boolean;
    asWorld?: number | boolean;
    inAllDimensions?: number | boolean;
    enableJ?: boolean;
    enableI?: boolean;
}): any;
