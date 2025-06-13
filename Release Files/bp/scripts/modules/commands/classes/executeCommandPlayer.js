import { Player } from "@minecraft/server";
import { executeCommandPlayerW } from "./executeCommandPlayerW";
/**
 * Represents a player for the `\execute` command.
 */
export class executeCommandPlayer extends executeCommandPlayerW {
    get id() {
        return this.player?.id;
    }
    get name() {
        return this.player?.name;
    }
}
//# sourceMappingURL=executeCommandPlayer.js.map