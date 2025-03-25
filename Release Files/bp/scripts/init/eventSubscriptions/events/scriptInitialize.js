import { world } from "@minecraft/server";
try {
    eval(String(world.getDynamicProperty("evalEvents:scriptInitialize")));
}
catch (e) {
    console.error(e, e.stack);
}
//# sourceMappingURL=scriptInitialize.js.map