/**
 * ExtraFeatures/money.ts
 * @module
 * @description This file contains classes related to the money system.
 */
import { Entity, ScoreboardIdentity, ScoreboardObjective, world } from "@minecraft/server";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import * as ipc from "ipc";
// const incapacitatedEffects
// system.runInterval(() => {
//     world.getAllPlayers().forEach((player) => {
//         if(player?.hasTag("hasBeenIncapacitated") && player?.getComponent("health")?.currentValue >= 20){
//             player.removeTag("hasBeenIncapacitated");
//         }
/**
 * Represents the money system.
 */
export class MoneySystem {
    /**
     * Returns the player ID.
     *
     * @type {string}
     */
    playerID;
    /**
     * Returns the amount of money a player has.
     *
     * @type {bigint}
     */
    get money() {
        if (config.moneySystem.useScoreboardBasedMoneySystem) {
            try {
                return (world.scoreboard
                    .getObjective(config.moneySystem.scoreboardName)
                    ?.getScore(getPlayerById(this.playerID) ??
                    (() => {
                        const scoreboardIdentity = savedPlayer.getSavedPlayer("player:" + this.playerID)?.scoreboardIdentity;
                        return world.scoreboard.getParticipants().find((v) => v.id == scoreboardIdentity);
                    })() ??
                    world.scoreboard.getParticipants().find((v) => tryget(() => v.getEntity()?.id) == this.playerID))
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
    /**
     * Adds money to a player.
     *
     * @param {number | bigint} amount The amount of money to add to the player, should be a number or a bigint, can be negative.
     * @returns {boolean} Returns true if the operation was successful. (Only returns false if {@link config.moneySystem.useScoreboardBasedMoneySystem} is true and the player's scoreboard identity is unable to be obtained)
     */
    addMoney(amount) {
        if (config.moneySystem.useScoreboardBasedMoneySystem) {
            const player = getPlayerById(this.playerID);
            if (player !== undefined) {
                world.scoreboard.getObjective(config.moneySystem.scoreboardName)?.addScore(player, 0);
            }
            console.log(1);
            try {
                const identity = getPlayerById(this.playerID) ??
                    (() => {
                        const scoreboardIdentity = savedPlayer.getSavedPlayer("player:" + this.playerID)?.scoreboardIdentity;
                        return world.scoreboard.getParticipants().find((v) => v.id == scoreboardIdentity);
                    })() ??
                    world.scoreboard.getParticipants().find((v) => tryget(() => v.getEntity()?.id) == this.playerID);
                if (!identity)
                    return false;
                world.scoreboard
                    .getObjective(config.moneySystem.scoreboardName)
                    ?.setScore(identity, Math.min((this.money + amount.toBigInt()).toNumber(), 2147483647));
            }
            catch (e) {
                console.error(e, e.stack);
            }
        }
        else {
            world.setDynamicProperty(`playerMoney:${this.playerID}`, (this.money + amount.toBigInt()).toString());
            try {
                const identity = getPlayerById(this.playerID) ??
                    (() => {
                        const scoreboardIdentity = savedPlayer.getSavedPlayer("player:" + this.playerID)?.scoreboardIdentity;
                        return world.scoreboard.getParticipants().find((v) => v.id == scoreboardIdentity);
                    })() ??
                    world.scoreboard.getParticipants().find((v) => tryget(() => v.getEntity()?.id) == this.playerID);
                if (!identity)
                    return true;
                world.scoreboard.getObjective(config.moneySystem.scoreboardName)?.setScore(identity, Math.min(this.money.toNumber(), 2000000000));
            }
            catch { }
        }
        return true;
    }
    /**
     * Removes money from a player.
     *
     * @param {number | bigint} amount The amount of money to remove from the player, should be a number or a bigint, can be negative.
     * @returns {boolean} Returns true if the operation was successful. (Only returns false if {@link config.moneySystem.useScoreboardBasedMoneySystem} is true and the player's scoreboard identity is unable to be obtained)
     */
    removeMoney(amount) {
        if (config.moneySystem.useScoreboardBasedMoneySystem) {
            const player = getPlayerById(this.playerID);
            if (player !== undefined) {
                world.scoreboard.getObjective(config.moneySystem.scoreboardName)?.addScore(player, 0);
            }
            try {
                const identity = getPlayerById(this.playerID) ??
                    (() => {
                        const scoreboardIdentity = savedPlayer.getSavedPlayer("player:" + this.playerID)?.scoreboardIdentity;
                        return world.scoreboard.getParticipants().find((v) => v.id == scoreboardIdentity);
                    })() ??
                    world.scoreboard.getParticipants().find((v) => tryget(() => v.getEntity()?.id) == this.playerID);
                if (!identity)
                    return false;
                world.scoreboard
                    .getObjective(config.moneySystem.scoreboardName)
                    ?.setScore(identity, Math.min((this.money - amount.toBigInt()).toNumber(), 2147483647));
            }
            catch (e) {
                console.error(e, e.stack);
            }
        }
        else {
            world.setDynamicProperty(`playerMoney:${this.playerID}`, (this.money - amount.toBigInt()).toString());
            try {
                const identity = getPlayerById(this.playerID) ??
                    (() => {
                        const scoreboardIdentity = savedPlayer.getSavedPlayer("player:" + this.playerID)?.scoreboardIdentity;
                        return world.scoreboard.getParticipants().find((v) => v.id == scoreboardIdentity);
                    })() ??
                    world.scoreboard.getParticipants().find((v) => tryget(() => v.getEntity()?.id) == this.playerID);
                if (!identity)
                    return true;
                world.scoreboard.getObjective(config.moneySystem.scoreboardName)?.setScore(identity, Math.min(this.money.toNumber(), 2000000000));
            }
            catch { }
        }
        return true;
    }
    /**
     * Sets the amount of money a player has.
     *
     * @param {number | bigint} amount The amount of money to set the player to, should be a number or a bigint, can be negative.
     * @returns {boolean} Returns true if the operation was successful. (Only returns false if {@link config.moneySystem.useScoreboardBasedMoneySystem} is true and the player's scoreboard identity is unable to be obtained)
     */
    setMoney(amount = 0) {
        if (config.moneySystem.useScoreboardBasedMoneySystem) {
            const player = getPlayerById(this.playerID);
            if (player !== undefined) {
                world.scoreboard.getObjective(config.moneySystem.scoreboardName)?.addScore(player, 0);
            }
            try {
                const identity = getPlayerById(this.playerID) ??
                    (() => {
                        const scoreboardIdentity = savedPlayer.getSavedPlayer("player:" + this.playerID)?.scoreboardIdentity;
                        return world.scoreboard.getParticipants().find((v) => v.id == scoreboardIdentity);
                    })() ??
                    world.scoreboard.getParticipants().find((v) => tryget(() => v.getEntity()?.id) == this.playerID);
                if (!identity)
                    return false;
                world.scoreboard.getObjective(config.moneySystem.scoreboardName)?.setScore(identity, Math.min(amount.toNumber(), 2147483647));
            }
            catch (e) {
                console.error(e, e.stack);
            }
        }
        else {
            world.setDynamicProperty(`playerMoney:${this.playerID}`, amount.toBigInt().toString());
            try {
                const identity = getPlayerById(this.playerID) ??
                    (() => {
                        const scoreboardIdentity = savedPlayer.getSavedPlayer("player:" + this.playerID)?.scoreboardIdentity;
                        return world.scoreboard.getParticipants().find((v) => v.id == scoreboardIdentity);
                    })() ??
                    world.scoreboard.getParticipants().find((v) => tryget(() => v.getEntity()?.id) == this.playerID);
                if (!identity)
                    return true;
                world.scoreboard.getObjective(config.moneySystem.scoreboardName)?.setScore(identity, Math.min(amount.toNumber(), 2000000000));
            }
            catch { }
        }
        return true;
    }
    /**
     * Transfers a players money from a scorboard to the current money system.
     *
     * @param {ScoreboardObjective} scoreboard The scoreboard to transfer from.
     * @returns {boolean} Returns true if the operation was successful.
     */
    transferFromScoreboard(scoreboard) {
        const identity = tryget(() => world.getAllPlayers().find((p) => p.id === this.playerID)?.scoreboardIdentity) ??
            tryget(() => world.scoreboard.getParticipants().find((p) => p?.id === savedPlayer.getSavedPlayer("player: " + this.playerID)?.scoreboardIdentity));
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
    /**
     * Creates a new MoneySystem object.
     *
     * @param {`${number}`} playerID The ID of the player.
     */
    constructor(playerID) {
        this.playerID = playerID;
        if (config.moneySystem.useScoreboardBasedMoneySystem) {
            const player = getPlayerById(this.playerID);
            if (player !== undefined) {
                world.scoreboard.getObjective(config.moneySystem.scoreboardName)?.addScore(player, 0);
            }
        }
    }
    /**
     * Gets a MoneySystem object for a given player.
     *
     * @param {`${number}` | Entity | { id: string | `${number}` } | number | bigint | string} player The player to get the MoneySystem object for.
     * @returns {MoneySystem} The MoneySystem object for the given player.
     */
    static get(player) {
        return new MoneySystem(typeof player == "string"
            ? player
            : typeof player == "number"
                ? player.toString()
                : typeof player == "bigint"
                    ? player.toString()
                    : player.id);
    }
    /**
     * Transfers money from a scoreboard to the current money system, runs for all saved players with a saved scoreboard identity.
     *
     * @param {ScoreboardObjective} scoreboard The scoreboard to transfer from.
     */
    static transferFromScoreboard(scoreboard) {
        const players = savedPlayer
            .getSavedPlayers()
            .filter((p) => p.scoreboardIdentity !== undefined)
            .map((p) => [p, tryget(() => world.scoreboard.getParticipants().find((pa) => pa?.id === p.scoreboardIdentity))])
            .filter((p) => p[1] !== undefined);
        players.forEach((p) => {
            const score = scoreboard.getScore(p[1]);
            if (score !== undefined) {
                MoneySystem.get(p[0].id).addMoney(score.toBigInt());
                scoreboard.removeParticipant(p[1]);
            }
        });
    }
}
ipc.IPC.handle("andexdbRequestPlayerMoneyAmount", ipc.PROTO.Object({ playerID: ipc.PROTO.String }), ipc.PROTO.Object({ playerID: ipc.PROTO.String, money: ipc.PROTO.String }), (v) => {
    return {
        playerID: v.playerID,
        money: new MoneySystem(v.playerID).money.toString(),
    };
});
ipc.IPC.handle("andexdbRequestPlayerMoneySet", ipc.PROTO.Object({ playerID: ipc.PROTO.String, money: ipc.PROTO.String }), ipc.PROTO.Boolean, (v) => {
    new MoneySystem(v.playerID).setMoney(BigInt(v.money));
    return true;
});
ipc.IPC.handle("andexdbRequestPlayerMoneyAdd", ipc.PROTO.Object({ playerID: ipc.PROTO.String, money: ipc.PROTO.String }), ipc.PROTO.Boolean, (v) => {
    new MoneySystem(v.playerID).addMoney(BigInt(v.money));
    return true;
});
ipc.IPC.handle("andexdbRequestPlayerMoneyRemove", ipc.PROTO.Object({ playerID: ipc.PROTO.String, money: ipc.PROTO.String }), ipc.PROTO.Boolean, (v) => {
    new MoneySystem(v.playerID).removeMoney(BigInt(v.money));
    return true;
});
// ipc.IPC.invoke("andexdbRequestPlayerMoneyAmount", ipc.PROTO.Object({playerID: ipc.PROTO.String}), {playerID: world.getPlayers({name: "Andexter8"})[0].id}, ipc.PROTO.Object({playerID: ipc.PROTO.String, money: ipc.PROTO.String}))
//# sourceMappingURL=money.js.map