import { system } from "@minecraft/server";
import "init/functions/breakpoint";
globalThis.beforeScriptStartTick = system.currentTick;
export const current_format_version = "1.29.1";
globalThis.format_version = current_format_version;
export const current_supported_minecraft_version = "1.21.5x";
globalThis.supported_minecraft_version = current_supported_minecraft_version;
globalThis.entity_scale_format_version = null;
globalThis.multipleEntityScaleVersionsDetected = false;
globalThis.modules = {
    assets: {
        classes: {},
        constants: {},
    },
};
globalThis.subscribedEvents = {};
globalThis.repeatingIntervals = {};
globalThis.tempVariables = {};
globalThis.editorStickMenuOpeningAsyncCancelActionNumbers = {};
globalThis.crashEnabled = false;
globalThis.tempSavedVariables = [];
globalThis.scriptStartTick = -1;
Object.defineProperties(globalThis, {
    errorLog: {
        value: {
            playerDataAutoSave: []
        },
    }
});
/* Object.defineProperty(console, "error", {
    value: function error(...args: any[]) {
        world.sendMessage(args.join(" "));
    },
    configurable: true,
    writable: true,
}) */
// Object.defineProperty(console, "error", { value: function error(...args: any[]) { world.getAllPlayers().filter(p=>p.hasTag("getAllConsoleNotifications")||p.hasTag("getConsoleErrors")).forEach(p=>p.sendMessage(args.join(" "))); }, configurable: true, writable: true, });
// JS: Object.defineProperty(console, "error", { value: function error(...args) { world.sendMessage(args.join(" ")); }, configurable: true, writable: true, });
//# sourceMappingURL=initializeMainGlobalVariables.js.map