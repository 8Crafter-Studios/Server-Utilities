import type { Player } from "@minecraft/server";
import type { executeCommandPlayer } from "modules/commands/classes/executeCommandPlayer";
export type playerobject = Player & executeCommandPlayer;
