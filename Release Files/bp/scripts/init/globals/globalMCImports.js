import { system, world } from "@minecraft/server";
import * as mcServer from "@minecraft/server";
Object.defineProperties(globalThis, {
    world: {
        value: world,
        configurable: false,
        enumerable: true,
        writable: false,
    },
    system: {
        value: system,
        configurable: false,
        enumerable: true,
        writable: false,
    },
});
//# sourceMappingURL=globalMCImports.js.map