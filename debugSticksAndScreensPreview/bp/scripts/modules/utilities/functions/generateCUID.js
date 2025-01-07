import { world } from "@minecraft/server";
export function generateCUID(classid) { let CUID = Number(world.getDynamicProperty("cuidCounter:" + (classid ?? "default")) ?? 0) + 1; world.setDynamicProperty("cuidCounter:" + (classid ?? "default"), CUID); return CUID; }
//# sourceMappingURL=generateCUID.js.map