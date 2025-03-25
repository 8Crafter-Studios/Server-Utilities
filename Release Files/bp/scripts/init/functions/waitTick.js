import { system } from "@minecraft/server";
globalThis.waitTick = async function waitTick() {
    return new Promise((resolve) => system.run(() => resolve(void null)));
};
//# sourceMappingURL=waitTick.js.map