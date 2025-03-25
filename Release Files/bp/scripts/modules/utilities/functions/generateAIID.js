import { world } from "@minecraft/server";
export function generateAIID(classid) { let AIID = Number(world.getDynamicProperty("aiidCounter:" + (classid ?? "default")) ?? 0) + 1; world.setDynamicProperty("aiidCounter:" + (classid ?? "default"), AIID); return AIID; }
//# sourceMappingURL=generateAIID.js.map