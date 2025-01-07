import type { Vector3 } from "@minecraft/server";
/**
 * Generates a list of coordinates for a minecraft sphere.
 * @deprecated Legacy function that may cause the script to exceed the scripting memory limit.
 */
export declare function drawMinecraftSphere(center: Vector3, radius: number, precision?: number): Promise<Vector3[]>;
