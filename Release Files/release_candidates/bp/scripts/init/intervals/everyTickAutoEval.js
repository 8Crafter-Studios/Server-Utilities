import { system, world } from "@minecraft/server";
repeatingIntervals.everyTickAutoEval = system.runInterval(() => {
    try {
        eval(String(world.getDynamicProperty("autoEval:everyTick")));
    }
    catch { }
}, 1); //fixed and this one is also nows new
//# sourceMappingURL=everyTickAutoEval.js.map