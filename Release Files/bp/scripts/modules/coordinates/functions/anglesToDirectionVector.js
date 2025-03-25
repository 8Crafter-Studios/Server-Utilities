import { world } from "@minecraft/server";
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
//# sourceMappingURL=anglesToDirectionVector.js.map