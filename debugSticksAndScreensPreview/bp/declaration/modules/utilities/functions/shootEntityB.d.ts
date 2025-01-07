import type { EntityType, DimensionLocation, Vector2, Entity } from "@minecraft/server";
export declare function shootEntityB(entityType: string | EntityType, location: DimensionLocation, rotation: Vector2, power: number, setProjectileComponentPropertiesCallbackFn?: (entity: Entity) => any): void;
