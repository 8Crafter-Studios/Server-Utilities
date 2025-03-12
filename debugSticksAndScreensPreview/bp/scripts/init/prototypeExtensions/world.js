import { World } from "@minecraft/server";
import { deleteStringFromDynamicProperties } from "modules/utilities/functions/deleteStringFromDynamicProperties";
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
    deleteStringFromDynamicProperties: {
        value: deleteStringFromDynamicProperties,
        configurable: false,
        enumerable: true,
        writable: true,
    },
});
//# sourceMappingURL=world.js.map