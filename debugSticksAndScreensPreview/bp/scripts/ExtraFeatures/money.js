import { Entity, world } from "@minecraft/server";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
export class MoneySystem {
    playerID;
    get money() {
        if (world.scoreboard
            .getObjective(config.moneySystem.scoreboardName)
            ?.getParticipants()
            .find((v) => tryget(() => v.getEntity()?.id) == this.playerID) == undefined) {
            const player = world.getAllPlayers().find((v) => v.id == this.playerID);
            if (player != undefined) {
                world.scoreboard.getObjective(config.moneySystem.scoreboardName)?.addScore(player, 0);
            }
        }
        if (config.moneySystem.useScoreboardBasedMoneySystem) {
            try {
                return (world.scoreboard
                    .getObjective(config.moneySystem.scoreboardName)
                    ?.getScore(world.scoreboard.getParticipants().find((v) => tryget(() => v.getEntity()?.id) == this.playerID) ??
                    world.scoreboard
                        .getParticipants()
                        .find((v) => v.id == savedPlayer.getSavedPlayer("player:" + this.playerID).scoreboardIdentity))
                    ?.toBigInt() ?? 0n);
            }
            catch {
                return 0n;
            }
        }
        else {
            return String(world.getDynamicProperty(`playerMoney:${this.playerID}`)).toBigInt() ?? 0n;
        }
    }
    addMoney(amount) {
        if (world.scoreboard
            .getObjective(config.moneySystem.scoreboardName)
            ?.getParticipants()
            .find((v) => tryget(() => v.getEntity()?.id) == this.playerID) == undefined) {
            const player = world.getAllPlayers().find((v) => v.id == this.playerID);
            if (player != undefined) {
                world.scoreboard.getObjective(config.moneySystem.scoreboardName)?.addScore(player, 0);
            }
        }
        if (config.moneySystem.useScoreboardBasedMoneySystem) {
            try {
                world.scoreboard
                    .getObjective(config.moneySystem.scoreboardName)
                    ?.setScore(world.scoreboard.getParticipants().find((v) => tryget(() => v.getEntity()?.id) == this.playerID) ??
                    world.scoreboard.getParticipants().find((v) => v.id == savedPlayer.getSavedPlayer("player:" + this.playerID).scoreboardIdentity), Math.min((this.money + amount.toBigInt()).toNumber(), 2147483647));
            }
            catch { }
        }
        else {
            world.setDynamicProperty(`playerMoney:${this.playerID}`, (this.money + amount.toBigInt()).toString());
            try {
                world.scoreboard
                    .getObjective(config.moneySystem.scoreboardName)
                    ?.setScore(world.scoreboard.getParticipants().find((v) => tryget(() => v.getEntity()?.id) == this.playerID) ??
                    world.scoreboard.getParticipants().find((v) => v.id == savedPlayer.getSavedPlayer("player:" + this.playerID).scoreboardIdentity), Math.min(this.money.toNumber(), 2000000000));
            }
            catch { }
        }
    }
    removeMoney(amount) {
        if (world.scoreboard
            .getObjective(config.moneySystem.scoreboardName)
            ?.getParticipants()
            .find((v) => tryget(() => v.getEntity()?.id) == this.playerID) == undefined) {
            if (world.getAllPlayers().find((v) => v.id == this.playerID) != undefined) {
                world.scoreboard.getObjective(config.moneySystem.scoreboardName)?.addScore(world.getAllPlayers().find((v) => v.id == this.playerID), 0);
            }
        }
        if (config.moneySystem.useScoreboardBasedMoneySystem) {
            try {
                world.scoreboard
                    .getObjective(config.moneySystem.scoreboardName)
                    ?.setScore(world.scoreboard.getParticipants().find((v) => tryget(() => v.getEntity()?.id) == this.playerID) ??
                    world.scoreboard.getParticipants().find((v) => v.id == savedPlayer.getSavedPlayer("player:" + this.playerID).scoreboardIdentity), Math.min((this.money - amount.toBigInt()).toNumber(), 2147483647));
            }
            catch { }
        }
        else {
            world.setDynamicProperty(`playerMoney:${this.playerID}`, (this.money - amount.toBigInt()).toString());
            try {
                world.scoreboard
                    .getObjective(config.moneySystem.scoreboardName)
                    ?.setScore(world.scoreboard.getParticipants().find((v) => tryget(() => v.getEntity()?.id) == this.playerID) ??
                    world.scoreboard.getParticipants().find((v) => v.id == savedPlayer.getSavedPlayer("player:" + this.playerID).scoreboardIdentity), Math.min(this.money.toNumber(), 2000000000));
            }
            catch { }
        }
    }
    setMoney(amount = 0) {
        if (world.scoreboard
            .getObjective(config.moneySystem.scoreboardName)
            ?.getParticipants()
            .find((v) => tryget(() => v.getEntity()?.id) == this.playerID) == undefined) {
            const player = world.getAllPlayers().find((v) => v.id == this.playerID);
            if (player != undefined) {
                world.scoreboard.getObjective(config.moneySystem.scoreboardName)?.addScore(player, 0);
            }
        }
        if (config.moneySystem.useScoreboardBasedMoneySystem) {
            try {
                world.scoreboard
                    .getObjective(config.moneySystem.scoreboardName)
                    ?.setScore(world.scoreboard.getParticipants().find((v) => tryget(() => v.getEntity()?.id) == this.playerID) ??
                    world.scoreboard.getParticipants().find((v) => v.id == savedPlayer.getSavedPlayer("player:" + this.playerID).scoreboardIdentity), Math.min(amount.toNumber(), 2147483647));
            }
            catch { }
        }
        else {
            world.setDynamicProperty(`playerMoney:${this.playerID}`, amount.toBigInt().toString());
            try {
                world.scoreboard
                    .getObjective(config.moneySystem.scoreboardName)
                    ?.setScore(world.scoreboard.getParticipants().find((v) => tryget(() => v.getEntity()?.id) == this.playerID) ??
                    world.scoreboard.getParticipants().find((v) => v.id == savedPlayer.getSavedPlayer("player:" + this.playerID).scoreboardIdentity), Math.min(amount.toNumber(), 2000000000));
            }
            catch { }
        }
    }
    constructor(playerID) {
        this.playerID = playerID;
        if (world.scoreboard
            .getObjective(config.moneySystem.scoreboardName)
            ?.getParticipants()
            .find((v) => tryget(() => v.getEntity()?.id) == this.playerID) == undefined) {
            const player = world.getAllPlayers().find((v) => v.id == this.playerID);
            if (player != undefined) {
                world.scoreboard.getObjective(config.moneySystem.scoreboardName)?.addScore(player, 0);
            }
        }
    }
    static get(player) {
        return new MoneySystem(typeof player == "string"
            ? player
            : typeof player == "number"
                ? player.toString()
                : typeof player == "bigint"
                    ? player.toString()
                    : player.id);
    }
}
//# sourceMappingURL=money.js.map