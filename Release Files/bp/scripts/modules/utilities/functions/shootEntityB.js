import { v3Multiply } from "modules/main/functions/v3Multiply";
import { caretNotationC } from "modules/coordinates/functions/caretNotationC";
import { VECTOR3_ZERO, VECTOR3_FORWARD } from "@minecraft/math.js";
export function shootEntityB(entityType, location, rotation, power, setProjectileComponentPropertiesCallbackFn = (a) => { }) {
    let entity = location.dimension.spawnEntity(String(entityType), location);
    try {
        setProjectileComponentPropertiesCallbackFn(entity);
    }
    catch (e) {
        console.error(e, e.stack);
    }
    entity.applyImpulse(caretNotationC(VECTOR3_ZERO, v3Multiply(VECTOR3_FORWARD, power), rotation));
}
//# sourceMappingURL=shootEntityB.js.map