import { executeCommandPlayerW } from "./executeCommandPlayerW";
export class executeCommandPlayer extends executeCommandPlayerW {
    get id() {
        return this.player?.id;
    }
    get name() {
        return this.player?.name;
    }
}
//# sourceMappingURL=executeCommandPlayer.js.map