import { world } from "@minecraft/server";
export class MoneySystem {
    get money() { return world.getDynamicProperty(`playerMoney:${this.playerID}`).toString().toBigInt(); }
    addMoney(amount) {
        world.setDynamicProperty(`playerMoney:${this.playerID}`, (this.money + amount.toBigInt()).toString());
    }
    removeMoney(amount) {
        world.setDynamicProperty(`playerMoney:${this.playerID}`, (this.money - amount.toBigInt()).toString());
    }
    setMoney(amount = 0) {
        world.setDynamicProperty(`playerMoney:${this.playerID}`, amount.toBigInt().toString());
    }
    constructor(playerID) {
        this.playerID = playerID;
    }
}
//# sourceMappingURL=money.js.map