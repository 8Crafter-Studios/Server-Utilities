/**
 * @see {@link world.setDynamicProperty}
 * @remarks
 * Sets a specified property on the world to a value.
 *
 * @param identifier
 * The property identifier.
 * @param value
 * Data value of the property to set.
 * @throws
 * Throws if the given dynamic property identifier is not
 * defined.
 * @example incrementDynamicProperty.ts
 * ```typescript
 * import { world, DimensionLocation } from "@minecraft/server";
 *
 * function incrementDynamicProperty(
 *   log: (message: string, status?: number) => void,
 *   targetLocation: DimensionLocation
 * ) {
 *   let number = world.getDynamicProperty("samplelibrary:number");
 *
 *   log("Current value is: " + number);
 *
 *   if (number === undefined) {
 *     number = 0;
 *   }
 *
 *   if (typeof number !== "number") {
 *     log("Number is of an unexpected type.");
 *     return -1;
 *   }
 *
 *   world.setDynamicProperty("samplelibrary:number", number + 1);
 * }
 * ```
 * @example incrementDynamicPropertyInJsonBlob.ts
 * ```typescript
 * import { world, DimensionLocation } from "@minecraft/server";
 *
 * function incrementDynamicPropertyInJsonBlob(
 *   log: (message: string, status?: number) => void,
 *   targetLocation: DimensionLocation
 * ) {
 *   let paintStr = world.getDynamicProperty("samplelibrary:longerjson");
 *   let paint: { color: string; intensity: number } | undefined = undefined;
 *
 *   log("Current value is: " + paintStr);
 *
 *   if (paintStr === undefined) {
 *     paint = {
 *       color: "purple",
 *       intensity: 0,
 *     };
 *   } else {
 *     if (typeof paintStr !== "string") {
 *       log("Paint is of an unexpected type.");
 *       return -1;
 *     }
 *
 *     try {
 *       paint = JSON.parse(paintStr);
 *     } catch (e) {
 *       log("Error parsing serialized struct.");
 *       return -1;
 *     }
 *   }
 *
 *   if (!paint) {
 *     log("Error parsing serialized struct.");
 *     return -1;
 *   }
 *
 *   paint.intensity++;
 *   paintStr = JSON.stringify(paint); // be very careful to ensure your serialized JSON str cannot exceed limits
 *   world.setDynamicProperty("samplelibrary:longerjson", paintStr);
 * }
 * ```
 */
export declare function swdp(identifier: string, value?: string | number | boolean | undefined): void;
declare global {
    /**
     * @see {@link world.setDynamicProperty}
     * @remarks
     * Sets a specified property on the world to a value.
     *
     * @param identifier
     * The property identifier.
     * @param value
     * Data value of the property to set.
     * @throws
     * Throws if the given dynamic property identifier is not
     * defined.
     * @example incrementDynamicProperty.ts
     * ```typescript
     * import { world, DimensionLocation } from "@minecraft/server";
     *
     * function incrementDynamicProperty(
     *   log: (message: string, status?: number) => void,
     *   targetLocation: DimensionLocation
     * ) {
     *   let number = world.getDynamicProperty("samplelibrary:number");
     *
     *   log("Current value is: " + number);
     *
     *   if (number === undefined) {
     *     number = 0;
     *   }
     *
     *   if (typeof number !== "number") {
     *     log("Number is of an unexpected type.");
     *     return -1;
     *   }
     *
     *   world.setDynamicProperty("samplelibrary:number", number + 1);
     * }
     * ```
     * @example incrementDynamicPropertyInJsonBlob.ts
     * ```typescript
     * import { world, DimensionLocation } from "@minecraft/server";
     *
     * function incrementDynamicPropertyInJsonBlob(
     *   log: (message: string, status?: number) => void,
     *   targetLocation: DimensionLocation
     * ) {
     *   let paintStr = world.getDynamicProperty("samplelibrary:longerjson");
     *   let paint: { color: string; intensity: number } | undefined = undefined;
     *
     *   log("Current value is: " + paintStr);
     *
     *   if (paintStr === undefined) {
     *     paint = {
     *       color: "purple",
     *       intensity: 0,
     *     };
     *   } else {
     *     if (typeof paintStr !== "string") {
     *       log("Paint is of an unexpected type.");
     *       return -1;
     *     }
     *
     *     try {
     *       paint = JSON.parse(paintStr);
     *     } catch (e) {
     *       log("Error parsing serialized struct.");
     *       return -1;
     *     }
     *   }
     *
     *   if (!paint) {
     *     log("Error parsing serialized struct.");
     *     return -1;
     *   }
     *
     *   paint.intensity++;
     *   paintStr = JSON.stringify(paint); // be very careful to ensure your serialized JSON str cannot exceed limits
     *   world.setDynamicProperty("samplelibrary:longerjson", paintStr);
     * }
     * ```
     */
    const swdp: typeof import("./swdp").swdp;
}
