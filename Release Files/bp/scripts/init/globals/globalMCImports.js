import { system, world } from "@minecraft/server";
Object.defineProperties(globalThis, {
    world: {
        value: world,
        configurable: true,
        enumerable: true,
        writable: false,
    },
    system: {
        value: system,
        configurable: true,
        enumerable: true,
        writable: false,
    }
});
//# sourceMappingURL=globalMCImports.js.map