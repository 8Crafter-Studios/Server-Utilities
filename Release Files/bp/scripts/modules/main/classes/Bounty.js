import { Player } from "@minecraft/server";
import { MoneySystem } from "ExtraFeatures/money";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import { numberFormatter_compact } from "modules/utilities/functions/numberFormatter";
let activeBounties = [];
let currentId = BigInt(gwdp("lastBountyID") ?? 0n);
/**
 * Represents a bounty.
 */
export class Bounty {
    /**
     * The unique identifier of this bounty.
     *
     * @type {bigint}
     */
    id;
    /**
     * The UUID of the player who placed this bounty.
     *
     * @type {string}
     */
    playerId;
    /**
     * The UUID of the target of this bounty.
     *
     * @type {string}
     */
    targetId;
    /**
     * The value of this bounty.
     *
     * @type {bigint}
     */
    value;
    /**
     * The creation time of this bounty.
     *
     * @type {number}
     */
    creationTime;
    /**
     * Whether this bounty is valid.
     *
     * @type {boolean}
     *
     * @default true
     */
    valid = true;
    /**
     * The status of this bounty.
     *
     * @type {"none" | "deleted" | "claimed" | "canceled"}
     *
     * @default "none"
     */
    status = "none";
    /**
     * Creates a new bounty.
     *
     * @param {object} properties - The properties of the bounty.
     * @param {string} properties.playerId - The UUID of the player who placed this bounty.
     * @param {string} properties.targetId - The UUID of the target of this bounty.
     * @param {bigint} properties.value - The value of this bounty.
     * @param {number} [properties.creationTime] - The creation time of this bounty. Defaults to the current time.
     * @param {boolean} [properties.new] - Whether this bounty is new. Defaults to true.
     * @param {boolean} [properties.valid] - Whether this bounty is valid. Defaults to undefined.
     * @param {"none" | "deleted" | "claimed" | "canceled"} [properties.status] - The status of this bounty. Defaults to undefined.
     * @param {bigint} [properties.id] - The unique identifier of this bounty.
     */
    constructor(properties) {
        this.playerId = properties.playerId;
        this.targetId = properties.targetId;
        this.value = properties.value;
        this.creationTime = properties.creationTime ?? Date.now();
        if (properties.new === false) {
            this.valid = properties.valid;
            this.status = properties.status;
            this.id = properties.id;
            Object.defineProperty(this, "id", {
                value: this.id,
                configurable: true,
                enumerable: true,
                writable: false,
            });
        }
        else {
            this.id = currentId++;
            Object.defineProperty(this, "id", {
                value: this.id,
                configurable: true,
                enumerable: true,
                writable: false,
            });
            this.init();
        }
    }
    /**
     * Initializes this bounty.
     */
    init() {
        activeBounties.push(this);
        Bounty.saveBounties();
    }
    /**
     * Deletes this bounty.
     *
     * @returns {boolean} Whether this bounty was deleted.
     */
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
    /**
     * Cancels this bounty.
     *
     * @returns {boolean} Whether this bounty was canceled.
     */
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
    /**
     * Claims this bounty.
     *
     * @param {Player} claimer The player who claimed this bounty.
     * @returns {boolean} Whether this bounty was claimed.
     */
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
    /**
     * Gets a {@link savedPlayer} instance for the {@link targetId | target} of this bounty.
     *
     * @returns {savedPlayer | undefined} The saved player instance for the target of this bounty, or undefined if the target of this bounty has not been saved.
     */
    getLinkedTargetSavedPlayer() {
        return savedPlayer.getSavedPlayer("player:" + this.targetId);
    }
    /**
     * Gets a {@link savedPlayer} instance for the {@link playerId | source} of this bounty.
     *
     * @returns {savedPlayer | undefined} The saved player instance for the source of this bounty, or undefined if the source of this bounty has not been saved.
     */
    getLinkedSourceSavedPlayer() {
        return savedPlayer.getSavedPlayer("player:" + this.playerId);
    }
    /**
     * Converts this bounty to a {@link JSONB} serializable object.
     */
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
    /**
     * Loads all saved bounties.
     *
     * @throws {SyntaxError} If the saved bounties are not valid stringified {@link JSONB}.
     */
    static loadBounties() {
        activeBounties = JSONB.parse(world.getStringFromDynamicProperties("activeBounties", "[]")).map((v) => new Bounty({ new: false, ...v }));
        currentId = BigInt(gwdp("lastBountyID") ?? 0n);
    }
    /**
     * Saves all loaded bounties.
     */
    static saveBounties() {
        world.saveStringToDynamicProperties(JSONB.stringify(activeBounties), "activeBounties");
        swdp("lastBountyID", currentId.toString());
    }
    /**
     * Places a bounty on the specified player.
     *
     * @param {bigint} value The bounty value.
     * @param {string} playerId The player's UUID.
     * @param {string} targetId The target's UUID.
     * @param {string} [playerDisplayName] The player's display name.
     * @param {string} [targetDisplayName] The target's display name.
     * @param {boolean} [silent=false] If set to true, will not notify all online players of the bounty. Defaults to false.
     * @param {boolean} [chargePlayer=true] Whether to charge the player for the bounty. Defaults to true.
     * @param {number} [creationTime=Date.now()] The creation time of the bounty. Defaults to the current time.
     * @returns {Bounty} The created bounty.
     *
     * @throws {Error} If the player has already placed a bounty on the target.
     * @throws {Error} If {@link chargePlayer} is `true` and the player does not have enough money to place the bounty.
     */
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
            return new Bounty({ playerId, targetId, creationTime, value });
        }
        else {
            const playerName = playerDisplayName ??
                world.getAllPlayers().find((p) => p.id === playerId)?.id ??
                tryget(() => savedPlayer.getSavedPlayer("player:" + playerId)?.id);
            const targetName = targetDisplayName ??
                world.getAllPlayers().find((p) => p.id === targetId)?.id ??
                tryget(() => savedPlayer.getSavedPlayer("player:" + targetId)?.id);
            const bounty = new Bounty({ playerId, targetId, creationTime, value });
            world.sendMessage(`§e${playerName} has just placed a ${numberFormatter_compact(value, true, undefined, 0)} bounty on ${targetName}.`);
            return bounty;
        }
    }
    /**
     * Retrieves all bounties placed by the specified player.
     *
     * @param {string} playerId The player's UUID.
     * @returns {Bounty[]} An array of bounties placed by the player.
     */
    static getBountiesFromPlayer(playerId) {
        return activeBounties.filter((r) => r.playerId === playerId);
    }
    /**
     * Retrieves all bounties placed on the specified player.
     *
     * @param {string} targetId The target's UUID.
     * @returns {Bounty[]} An array of bounties placed on the target.
     */
    static getBountiesOnPlayer(targetId) {
        return activeBounties.filter((r) => r.targetId === targetId);
    }
    /**
     * @todo Make this method functional.
     */
    static getMergedBounties() {
        return activeBounties.filter((b) => b.valid);
    }
    /**
     * Retrieves all active bounties.
     *
     * @returns {Bounty[]} An array of active bounties.
     */
    static getAllBounties() {
        return activeBounties.filter((b) => b.valid);
    }
}
/**
 * Represents a total bounty on a player.
 */
export class TotalBounty {
    /**
     * The target's UUID.
     */
    targetId;
    constructor(targetId) {
        this.targetId = targetId;
        Object.defineProperty(this, "targetId", {
            value: this.targetId,
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