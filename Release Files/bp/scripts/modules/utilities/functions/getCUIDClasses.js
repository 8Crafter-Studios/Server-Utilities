import { world } from "@minecraft/server";
export function getCUIDClasses() { return world.getDynamicPropertyIds().filter(s => s.startsWith("cuidCounter:")); }
//# sourceMappingURL=getCUIDClasses.js.map