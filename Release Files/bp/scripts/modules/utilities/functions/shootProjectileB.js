import { v3Multiply } from "modules/main/functions/v3Multiply";
import { caretNotationC } from "modules/coordinates/functions/caretNotationC";
import { VECTOR3_ZERO, VECTOR3_FORWARD } from "@minecraft/math.js";
export function shootProjectileB(entityType, location, rotation, power, shootOptions = {}, setProjectileComponentPropertiesCallbackFn = (a) => { }) {
    let entityProjectileComponent = location.dimension
        .spawnEntity(String(entityType), location)
        .getComponent("projectile");
    try {
        setProjectileComponentPropertiesCallbackFn(entityProjectileComponent);
    }
    catch (e) {
        console.error(e, e.stack);
    }
    entityProjectileComponent?.shoot(caretNotationC(VECTOR3_ZERO, v3Multiply(VECTOR3_FORWARD, power), rotation), shootOptions);
}
//# sourceMappingURL=shootProjectileB.js.map