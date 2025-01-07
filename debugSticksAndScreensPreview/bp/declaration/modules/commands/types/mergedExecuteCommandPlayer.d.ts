import type { Player } from "@minecraft/server";
import type { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
export type mergedExecuteCommandPlayer = executeCommandPlayerW & Player;
