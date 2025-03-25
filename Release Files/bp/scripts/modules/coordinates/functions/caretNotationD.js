import { LocalTeleportFunctions } from "../../../Main/coordinates";
export function caretNotationD(location, offset, rot) {
    const { x, y, z } = offset; /*
    const { location } = this */
    const viewDirection = rot;
    const xx = LocalTeleportFunctions.xa(viewDirection, x);
    const yy = LocalTeleportFunctions.ya(viewDirection, y);
    const newPosition = {
        x: location.x + xx.x + yy.x,
        y: location.y + xx.y + yy.y,
        z: location.z + xx.z + yy.z,
    };
    return newPosition;
}
//# sourceMappingURL=caretNotationD.js.map