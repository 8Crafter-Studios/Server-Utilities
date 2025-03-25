import type { Player, Entity } from "@minecraft/server";
import type { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
export declare function getCommandHelpPage(commandName: string, player?: Player | executeCommandPlayerW | Entity): string;
