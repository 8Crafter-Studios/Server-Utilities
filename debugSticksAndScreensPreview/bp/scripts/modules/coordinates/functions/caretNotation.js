import { world } from "@minecraft/server";
import { LocalTeleportFunctions } from "../../../Main/coordinates";
export function caretNotation(location, offset, rot) {
    const { x, y, z } = offset; /*
    const { location } = this */
    const viewDirection = rot;
    const xx = LocalTeleportFunctions.xa(viewDirection, x);
    const yy = LocalTeleportFunctions.ya(viewDirection, y);
    const zz = LocalTeleportFunctions.za(viewDirection, z);
    const newPosition = {
        x: Number((location.x + xx.x + yy.x + zz.x).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 5))),
        y: Number((location.y + xx.y + yy.y + zz.y).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 5))),
        z: Number((location.z + xx.z + yy.z + zz.z).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 5))),
    };
    return newPosition;
}
//# sourceMappingURL=caretNotation.js.map