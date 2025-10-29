import { system } from "@minecraft/server";
/**
 * The time the early-execution scripts started executing.
 */
export const preStartTime = Date.now();
await Promise.all([
    // This must be imported BEFORE exiting early-execution mode.
    import("@minecraft/server-editor").then(async () => {
        Object.defineProperty(globalThis, "isEditorEdition", {
            // TO-DO: Make this value hardcoded into the add-on.
            value: system.isEditorWorld,
            enumerable: true,
            configurable: true,
            writable: false,
        });
        await import("./init/editorExtension/index");
    }, () => {
        Object.defineProperty(globalThis, "isEditorEdition", {
            // TO-DO: Make this value hardcoded into the add-on.
            value: false,
            enumerable: true,
            configurable: true,
            writable: false,
        });
    }),
    // This script must be run in early-execution mode.
    import("preInit/eventSubscriptions/beforeEvents/startup"),
]);
/**
 * The time the early-execution scripts finished executing.
 */
export const preEndTime = Date.now();
await system.waitTicks(0);
/**
 * The time the main script started executing.
 */
export const startTime = Date.now();
try {
    await import("./index");
}
catch (e) {
    console.error(e, e.stack);
}
/**
 * The time the main script finished executing.
 */
export const endTime = Date.now();
/**
 * The total time spent running the early-execution scripts.
 */
export const preStartupTime = preEndTime - preStartTime;
/**
 * The total time spent running the main script.
 */
export const startupTime = endTime - startTime;
/**
 * The total time spent running all scripts.
 */
export const totalStartupTime = preStartupTime + startupTime;
/**
 * The delay between finishing the early-execution scripts and starting the main script (while `await system.waitTicks(0)` was running).
 */
export const exitingEarlyExecutionDelay = startTime - preEndTime;
console.log(`§r<§b8Crafter's Server Utilities§r[§gv${format_version}${isEditorEdition ? " §r(§eEditor Edition§r)" : "§r"}]> §aTotal Startup time: ${totalStartupTime}ms; Pre-startup time: ${preStartupTime}ms; Startup time: ${startupTime}ms; Exiting early-execution delay: ${exitingEarlyExecutionDelay}ms`);
//# sourceMappingURL=init.js.map
//# sourceMappingURL=init.js.map