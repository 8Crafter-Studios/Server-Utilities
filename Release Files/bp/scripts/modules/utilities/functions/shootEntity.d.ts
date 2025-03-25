import type { EntityType, DimensionLocation, Vector3, Entity } from "@minecraft/server";
export declare function shootEntity(entityType: string | EntityType, location: DimensionLocation, velocity: Vector3, setProjectileComponentPropertiesCallbackFn?: (entity: Entity) => any): void;
