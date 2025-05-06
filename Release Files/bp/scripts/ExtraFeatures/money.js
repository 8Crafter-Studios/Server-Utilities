/**
 * ExtraFeatures/money.ts
 * @module
 * @description This file contains classes related to the money system.
 */
import { Entity, ScoreboardIdentity, ScoreboardObjective, world } from "@minecraft/server";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import * as ipc from "ipc";
export class MoneySystem {
    playerID;
    get money() {
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
        if (config.moneySystem.useScoreboardBasedMoneySystem && world.scoreboard
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
        if (config.moneySystem.useScoreboardBasedMoneySystem && world.scoreboard
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
    transferFromScoreboard(scoreboard) {
        const identity = tryget(() => world.getAllPlayers().find(p => p.id === this.playerID).scoreboardIdentity) ?? tryget(() => world.scoreboard.getParticipants().find(p => p?.id === savedPlayer.getSavedPlayer("player: " + this.playerID).scoreboardIdentity));
        if (identity !== undefined) {
            const score = scoreboard.getScore(identity);
            if (score !== undefined) {
                this.addMoney(score);
                scoreboard.removeParticipant(identity);
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    constructor(playerID) {
        this.playerID = playerID;
        if (config.moneySystem.useScoreboardBasedMoneySystem && world.scoreboard
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
    static transferFromScoreboard(scoreboard) {
        const players = savedPlayer.getSavedPlayers().filter(p => p.scoreboardIdentity !== undefined).map(p => [p, tryget(() => world.scoreboard.getParticipants().find(pa => pa?.id === p.scoreboardIdentity))]).filter(p => p[1] !== undefined);
        players.forEach(p => {
            const score = scoreboard.getScore(p[1]);
            if (score !== undefined) {
                MoneySystem.get(p[0].id).addMoney(score.toBigInt());
                scoreboard.removeParticipant(p[1]);
            }
        });
    }
}
ipc.IPC.handle("andexdbRequestPlayerMoneyAmount", ipc.PROTO.Object({ playerID: ipc.PROTO.String }), ipc.PROTO.Object({ playerID: ipc.PROTO.String, money: ipc.PROTO.String }), v => {
    return {
        playerID: v.playerID,
        money: new MoneySystem(v.playerID).money.toString(),
    };
});
ipc.IPC.handle("andexdbRequestPlayerMoneySet", ipc.PROTO.Object({ playerID: ipc.PROTO.String, money: ipc.PROTO.String }), ipc.PROTO.Boolean, v => {
    new MoneySystem(v.playerID).setMoney(BigInt(v.money));
    return true;
});
ipc.IPC.handle("andexdbRequestPlayerMoneyAdd", ipc.PROTO.Object({ playerID: ipc.PROTO.String, money: ipc.PROTO.String }), ipc.PROTO.Boolean, v => {
    new MoneySystem(v.playerID).addMoney(BigInt(v.money));
    return true;
});
ipc.IPC.handle("andexdbRequestPlayerMoneyRemove", ipc.PROTO.Object({ playerID: ipc.PROTO.String, money: ipc.PROTO.String }), ipc.PROTO.Boolean, v => {
    new MoneySystem(v.playerID).removeMoney(BigInt(v.money));
    return true;
});
// ipc.IPC.invoke("andexdbRequestPlayerMoneyAmount", ipc.PROTO.Object({playerID: ipc.PROTO.String}), {playerID: world.getPlayers({name: "Andexter8"})[0].id}, ipc.PROTO.Object({playerID: ipc.PROTO.String, money: ipc.PROTO.String}))
//# sourceMappingURL=money.js.map