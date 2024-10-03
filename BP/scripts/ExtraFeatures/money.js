import { world } from "@minecraft/server";
export class MoneySystem {
    get money() { return world.getDynamicProperty(`playerMoney:${this.playerID}`); }
    addMoney(amount) { }
    constructor(playerID) {
        this.playerID = playerID;
    }
}
//# sourceMappingURL=money.js.map