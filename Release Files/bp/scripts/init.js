import { system } from "@minecraft/server";
export const preStartTime = Date.now();
await import("preInit/eventSubscriptions/beforeEvents/startup");
await system.waitTicks(0);
export const startTime = Date.now();
try {
    await import("./index");
}
catch (e) {
    console.error(e, e.stack);
}
export const endTime = Date.now();
export const starupTime = endTime - startTime;
console.log(`§r[§b8Crafter's Debug Sticks§r] §aStartup time: ${starupTime}ms`);
//# sourceMappingURL=init.js.map
//# sourceMappingURL=init.js.map