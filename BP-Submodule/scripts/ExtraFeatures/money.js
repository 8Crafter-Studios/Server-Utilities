import { Entity, world } from "@minecraft/server";
export class MoneySystem {
    playerID;
    get money() { return String(world.getDynamicProperty(`playerMoney:${this.playerID}`)).toBigInt() ?? 0n; }
    addMoney(amount) {
        world.setDynamicProperty(`playerMoney:${this.playerID}`, (this.money + amount.toBigInt()).toString());
        try {
            world.scoreboard.getObjective("andexdb:money").setScore(world.scoreboard.getObjective("andexdb:money").getParticipants().find(v => v.getEntity()?.id == this.playerID), Math.min(this.money.toNumber(), 2000000000));
        }
        catch { }
    }
    removeMoney(amount) {
        world.setDynamicProperty(`playerMoney:${this.playerID}`, (this.money - amount.toBigInt()).toString());
        try {
            world.scoreboard.getObjective("andexdb:money").setScore(world.scoreboard.getObjective("andexdb:money").getParticipants().find(v => v.getEntity()?.id == this.playerID), Math.min(this.money.toNumber(), 2000000000));
        }
        catch { }
    }
    setMoney(amount = 0) {
        world.setDynamicProperty(`playerMoney:${this.playerID}`, amount.toBigInt().toString());
        try {
            world.scoreboard.getObjective("andexdb:money").setScore(world.scoreboard.getObjective("andexdb:money").getParticipants().find(v => v.getEntity()?.id == this.playerID), Math.min(amount.toNumber(), 2000000000));
        }
        catch { }
    }
    constructor(playerID) {
        this.playerID = playerID;
    }
    static get(player) {
        return new MoneySystem(typeof player == "string" ? player : typeof player == "number" ? player.toString() : typeof player == "bigint" ? player.toString() : player.id);
    }
}
//# sourceMappingURL=money.js.map