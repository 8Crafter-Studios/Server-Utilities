import { World } from "@minecraft/server";
import { getStringFromDynamicProperties } from "modules/utilities/functions/getStringFromDynamicProperties";
import { saveStringToDynamicProperties } from "modules/utilities/functions/saveStringToDynamicProperties";
Object.defineProperties(World.prototype, {
    saveStringToDynamicProperties: {
        value: saveStringToDynamicProperties,
        configurable: false,
        enumerable: true,
        writable: true,
    },
    getStringFromDynamicProperties: {
        value: getStringFromDynamicProperties,
        configurable: false,
        enumerable: true,
        writable: true,
    },
});
//# sourceMappingURL=world.js.map