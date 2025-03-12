import { Player } from "@minecraft/server";
import { MoneySystem } from "ExtraFeatures/money";
import { command } from "modules/commands/classes/command";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import { numberFormatter_compact } from "modules/utilities/functions/numberFormatter";
let activeBounties = [];
let currentId = BigInt(gwdp("lastBountyID") ?? 0n);
export class Bounty {
    id;
    playerId;
    targetId;
    value;
    creationTime;
    valid = true;
    status = "none";
    constructor(properties) {
        this.playerId = properties.playerId;
        this.targetId = properties.targetId;
        this.value = properties.value;
        this.creationTime = properties.creationTime ?? Date.now();
        if (properties.new === false) {
            this.valid = properties.valid;
            this.status = properties.status;
            Object.defineProperty(this, "id", {
                value: properties.id,
                configurable: true,
                enumerable: true,
                writable: false,
            });
        }
        else {
            Object.defineProperty(this, "id", {
                value: currentId++,
                configurable: true,
                enumerable: true,
                writable: false,
            });
            this.init();
        }
    }
    async init() {
        activeBounties.push(this);
        Bounty.saveBounties();
    }
    delete() {
        if (this.valid) {
            if (this.status === "none") {
                this.status = "deleted";
            }
            this.valid = false;
            activeBounties.splice(activeBounties.findIndex((r) => r === this), 1);
            Bounty.saveBounties();
            return true;
        }
        else {
            return false;
        }
    }
    cancel() {
        if (this.valid) {
            this.status = "canceled";
            this.delete();
            new MoneySystem(this.playerId).addMoney(this.value);
            return true;
        }
        else {
            return false;
        }
    }
    claim(claimer) {
        if (this.valid) {
            this.status = "claimed";
            this.delete();
            claimer.moneySystem.addMoney(this.value);
            return true;
        }
        else {
            return false;
        }
    }
    getLinkedTargetSavedPlayer() {
        return savedPlayer.getSavedPlayer("player:" + this.targetId);
    }
    getLinkedSourceSavedPlayer() {
        return savedPlayer.getSavedPlayer("player:" + this.playerId);
    }
    toJSONB() {
        return {
            id: this.id,
            playerId: this.playerId,
            targetId: this.targetId,
            value: this.value,
            creationTime: this.creationTime,
            valid: this.valid,
            status: this.status,
        };
    }
    static loadBounties() {
        activeBounties = JSONB.parse(world.getStringFromDynamicProperties("activeBounties", "[]")).map((v) => new Bounty({ new: false, ...v }));
        currentId = BigInt(gwdp("lastBountyID") ?? 0n);
    }
    static saveBounties() {
        world.saveStringToDynamicProperties(JSONB.stringify(activeBounties), "activeBounties");
        swdp("lastBountyID", currentId.toString());
    }
    static placeBountyOnPlayer(value, playerId, targetId, playerDisplayName, targetDisplayName, silent = false, chargePlayer = true, creationTime = Date.now()) {
        if (!!activeBounties.find((r) => r.playerId === playerId && r.targetId === targetId)) {
            throw new Error("Duplicate Bounty");
        }
        if (chargePlayer) {
            let playerMoney = new MoneySystem(playerId);
            if (playerMoney.money >= value) {
                playerMoney.removeMoney(value);
            }
            else {
                throw new Error("Insufficient Funds");
            }
        }
        if (silent) {
            new Bounty({ playerId, targetId, creationTime, value });
        }
        else {
            const playerName = playerDisplayName ??
                world.getAllPlayers().find((p) => p.id === playerId)?.id ??
                tryget(() => savedPlayer.getSavedPlayer("player:" + playerId)?.id);
            const targetName = targetDisplayName ??
                world.getAllPlayers().find((p) => p.id === targetId)?.id ??
                tryget(() => savedPlayer.getSavedPlayer("player:" + targetId)?.id);
            new Bounty({ playerId, targetId, creationTime, value });
            world.sendMessage(`§e${playerName} has just placed a ${numberFormatter_compact(value, true, undefined, 0)} bounty on ${targetName}.`);
        }
    }
    static getBountiesFromPlayer(playerId) {
        return activeBounties.filter((r) => r.playerId === playerId);
    }
    static getBountiesOnPlayer(targetId) {
        return activeBounties.filter((r) => r.targetId === targetId);
    }
    static getMergedBounties() {
        return activeBounties.filter((b) => b.valid);
    }
    static getAllBounties() {
        return activeBounties.filter((b) => b.valid);
    }
}
export class TotalBounty {
    targetId;
    constructor(targetId) {
        Object.defineProperty(this, "targetId", {
            value: targetId,
            configurable: true,
            enumerable: true,
            writable: false,
        });
    }
    get totalValue() {
        let total = 0n;
        this.getBounties().forEach((b) => (total += b.value));
        return total;
    }
    getLinkedTargetSavedPlayer() {
        return savedPlayer.getSavedPlayer("player:" + this.targetId);
    }
    getBounties() {
        return Bounty.getBountiesOnPlayer(this.targetId);
    }
    static getTotalBountyOnPlayer(player) {
        return new TotalBounty(player.id);
    }
    static getAll() {
        const playerIds = [...new Set(Bounty.getAllBounties().map((b) => b.targetId))];
        return playerIds.map((p) => new TotalBounty(p));
    }
    static claimBounty(claimer, targetId) {
        const totalBounty = new TotalBounty(targetId);
        const applicableBounties = totalBounty.getBounties();
        applicableBounties.forEach((b) => b.claim(claimer));
    }
}
Bounty.loadBounties();
//# sourceMappingURL=Bounty.js.map