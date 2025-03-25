/**
 * initializeMainGlobalVariables.ts
 * @module
 * @description This file is the first file imported by `index`, it initializes the main global variables.
 */
import { system } from "@minecraft/server";
import "init/functions/breakpoint";
/**
 * The main global variables.
 */
export var mainGlobalVariables;
(function (mainGlobalVariables) {
    /**
     * The version of the add-on.
     */
    mainGlobalVariables.current_format_version = "1.33.1-preview.20+BUILD.1";
    /**
     * The version of Minecraft Bedrock Edition supported by the add-on.
     */
    mainGlobalVariables.current_supported_minecraft_version = "1.21.6x";
    /**
     * The tick that the `initializeMainGlobalVariables` script was run.
     */
    mainGlobalVariables.beforeScriptStartTick = system.currentTick;
})(mainGlobalVariables || (mainGlobalVariables = {}));
globalThis.modules ??= {
    assets: {
        classes: {},
        constants: {},
    },
};
Object.defineProperties(globalThis, {
    errorLog: {
        // Keep current value in case it is already defined.
        value: globalThis.errorLog ?? {
            playerDataAutoSave: [],
        },
        writable: false,
        configurable: true,
        enumerable: true,
    },
    format_version: {
        value: mainGlobalVariables.current_format_version,
        writable: false,
        configurable: true,
        enumerable: true,
    },
    supported_minecraft_version: {
        value: mainGlobalVariables.current_supported_minecraft_version,
        writable: false,
        configurable: true,
        enumerable: true,
    },
    entity_scale_format_version: {
        // Keep current value in case it is already defined.
        value: globalThis.entity_scale_format_version ?? null,
        writable: true,
        configurable: true,
        enumerable: true,
    },
    multipleEntityScaleVersionsDetected: {
        // Keep current value in case it is already defined.
        value: globalThis.multipleEntityScaleVersionsDetected ?? false,
        writable: true,
        configurable: true,
        enumerable: true,
    },
    bluemods_anticheat_format_version: {
        // Keep current value in case it is already defined.
        value: globalThis.bluemods_anticheat_format_version ?? null,
        writable: true,
        configurable: true,
        enumerable: true,
    },
    multipleBlueModsAnticheatVersionsDetected: {
        // Keep current value in case it is already defined.
        value: globalThis.multipleBlueModsAnticheatVersionsDetected ?? false,
        writable: true,
        configurable: true,
        enumerable: true,
    },
    blueModsAnticheatConfig: {
        // Keep current value in case it is already defined.
        value: globalThis.blueModsAnticheatConfig ?? {},
        writable: true,
        configurable: true,
        enumerable: true,
    },
    beforeScriptStartTick: {
        value: mainGlobalVariables.beforeScriptStartTick,
        writable: false,
        configurable: true,
        enumerable: true,
    },
    scriptStartTick: {
        // Keep current value in case it is already defined.
        value: globalThis.scriptStartTick ?? -1,
        writable: true,
        configurable: true,
        enumerable: true,
    },
    beforeInitializeTick: {
        // Keep current value in case it is already defined.
        value: globalThis.beforeInitializeTick ?? -1,
        writable: true,
        configurable: true,
        enumerable: true,
    },
    initializeTick: {
        // Keep current value in case it is already defined.
        value: globalThis.initializeTick ?? -1,
        writable: true,
        configurable: true,
        enumerable: true,
    },
    crashEnabled: {
        // Keep current value in case it is already defined.
        value: globalThis.crashEnabled ?? false,
        writable: true,
        configurable: true,
        enumerable: true,
    },
    tempSavedVariables: {
        // Keep current value in case it is already defined.
        value: globalThis.tempSavedVariables ?? [],
        writable: true,
        configurable: true,
        enumerable: true,
    },
    tempVariables: {
        // Keep current value in case it is already defined.
        value: globalThis.tempVariables ?? {},
        writable: true,
        configurable: true,
        enumerable: true,
    },
    subscribedEvents: {
        // Keep current value in case it is already defined.
        value: globalThis.subscribedEvents ?? {},
        writable: true,
        configurable: true,
        enumerable: true,
    },
    repeatingIntervals: {
        // Keep current value in case it is already defined.
        value: globalThis.repeatingIntervals ?? {},
        writable: true,
        configurable: true,
        enumerable: true,
    },
    editorStickMenuOpeningAsyncCancelActionNumbers: {
        // Keep current value in case it is already defined.
        value: globalThis.editorStickMenuOpeningAsyncCancelActionNumbers ?? {},
        writable: true,
        configurable: true,
        enumerable: true,
    },
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