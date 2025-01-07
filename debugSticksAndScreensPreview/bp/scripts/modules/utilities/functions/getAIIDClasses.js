import { world } from "@minecraft/server";
export function getAIIDClasses() { return world.getDynamicPropertyIds().filter(s => s.startsWith("aiidCounter:")); }
//# sourceMappingURL=getAIIDClasses.js.map