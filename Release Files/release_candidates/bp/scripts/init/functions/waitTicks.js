import { system } from "@minecraft/server";
globalThis.waitTicks = async function waitTicks(ticks = 1) {
    return new Promise((resolve) => system.runTimeout(() => resolve(void null), ticks));
};
//# sourceMappingURL=waitTicks.js.map