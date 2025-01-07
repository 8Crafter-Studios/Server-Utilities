import { world } from "@minecraft/server";
export function anglesToDirectionVectorDeg(yaw, pitch /*, roll: number*/) {
    const cosYaw = Math.cos((Math.PI / 180) * yaw);
    const sinYaw = Math.sin((Math.PI / 180) * yaw);
    const cosPitch = Math.cos((Math.PI / 180) * (90 + pitch));
    const sinPitch = Math.sin((Math.PI / 180) * (90 + pitch)); /*
    const cosRoll = Math.cos((Math.PI/180)*roll);
    const sinRoll = Math.sin((Math.PI/180)*roll);*/
    // Calculate components of the normalized direction vector
    const x = Number((cosYaw * cosPitch).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 5)));
    const y = Number((-sinYaw).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 5)));
    const z = Number((cosYaw * sinPitch).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 5)));
    return { x, y, z };
}
//# sourceMappingURL=anglesToDirectionVectorDeg.js.map