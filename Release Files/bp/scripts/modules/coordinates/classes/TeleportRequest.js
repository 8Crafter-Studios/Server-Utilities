import { Player } from "@minecraft/server";
import { command } from "modules/commands/classes/command";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import moment from "moment";
import { securityVariables } from "security/ultraSecurityModeUtils";
/**
 * An array of active teleport requests.
 *
 * @type {TeleportRequest[]}
 */
const activeRequests = [];
/**
 * The current teleport request ID.
 *
 * @type {bigin}
 */
let currentId = 0n;
/**
 * The TeleportRequest class, it is used to handle teleport requests.
 */
export class TeleportRequest {
    /**
     * The unique identifier of this teleport request.
     *
     * @type {bigint}
     */
    id;
    /**
     * The player who sent this teleport request.
     *
     * @type {Player}
     */
    player;
    /**
     * The player this teleport request was sent to.
     *
     * @type {Player}
     */
    target;
    /**
     * When this teleport request was sent.
     *
     * @type {number}
     */
    sendTime;
    /**
     * Whether or not this teleport request is valid.
     *
     * @type {boolean}
     *
     * @default true
     */
    valid = true;
    /**
     * Whether or not this teleport request has been accepted.
     *
     * @type {boolean}
     *
     * @default false
     */
    accepted = false;
    /**
     * Creates a new teleport request.
     *
     * @param {Player} player The player who sent this teleport request.
     * @param {Player} target The player this teleport request was sent to.
     * @param {number} [sendTime=Date.now()] When this teleport request was sent.
     */
    constructor(player, target, sendTime = Date.now()) {
        this.player = player;
        this.target = target;
        this.sendTime = sendTime;
        this.id = currentId++;
        Object.defineProperty(this, "id", {
            value: this.id,
            configurable: true,
            enumerable: true,
            writable: false,
        });
        this.init();
    }
    /**
     * Initializes this teleport request.
     *
     * @returns {Promise<void>} A promise that resolves when this teleport request is accepted, denied, made invalid, or timed out.
     */
    async init() {
        activeRequests.push(this);
        while (this.valid && !this.accepted) {
            if (Date.now() - this.sendTime > config.tpaSystem.timeoutDuration * 1000) {
                this.timeOut();
                break;
            }
            await waitTick();
        }
    }
    /**
     * Deletes this teleport request.
     *
     * @returns {boolean} Whether or not this teleport request was deleted.
     */
    delete() {
        if (this.valid) {
            this.valid = false;
            activeRequests.splice(activeRequests.findIndex((r) => r === this), 1);
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * Cancels this teleport request.
     *
     * @returns {boolean} Whether or not this teleport request was canceled.
     */
    cancel() {
        if (this.valid) {
            this.cancelSequence();
            this.delete();
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * Times out this teleport request.
     *
     * @returns {boolean} Whether or not this teleport request was timed out.
     */
    timeOut() {
        if (this.valid) {
            this.timeOutSequence();
            this.delete();
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * Denies this teleport request.
     *
     * @returns {boolean} Whether or not this teleport request was denied.
     */
    deny() {
        if (this.valid) {
            this.denySequence();
            this.delete();
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * Accepts this teleport request.
     *
     * @returns {Promise<boolean>} Whether or not this teleport request was accepted.
     */
    async accept() {
        if (this.valid) {
            this.delete();
            await this.teleportSequence();
            this.accepted = true;
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * Runs the cancel sequence for this teleport request.
     */
    cancelSequence() {
        this.target.sendMessage(`§c${this.player.name} canceled their teleport request to you.`);
    }
    /**
     * Runs the time out sequence for this teleport request.
     */
    timeOutSequence() {
        this.target.sendMessage(`§c${this.player.name}'s teleport request timed out.`);
        this.player.sendMessage(`§cThe teleport request to ${this.target.name} timed out.`);
    }
    /**
     * Runs the deny sequence for this teleport request.
     */
    denySequence() {
        this.target.sendMessage(`§cDenied ${this.player.name}'s teleport request.`);
        this.player.sendMessage(`§c${this.target.name} denied your teleport request.`);
    }
    /**
     * Runs the teleport sequence for this teleport request.
     *
     * @returns {Promise<0 | 1>} A promise that resolves with `1` when the teleport sequence is complete, or `0` if the teleport sequence fails.
     */
    async teleportSequence() {
        const canBypassTeleportCooldowns = securityVariables.ultraSecurityModeEnabled
            ? securityVariables.testPlayerForPermission(this.player, "andexdb.bypassTeleportCooldowns")
            : this.player.hasTag("admin");
        if (!canBypassTeleportCooldowns &&
            Number(this.player.getDynamicProperty("lastHurtByPlayerTime") ?? 0) + config.teleportSystems.pvpCooldownToTeleport * 1000 > Date.now()) {
            this.target.sendMessage(`§cAccepted teleport request from "${this.player.name}", but they can't teleport to you right now because they have to wait another ${Math.round((Number(this.player.getDynamicProperty("lastHurtByPlayerTime") ?? 0) + config.teleportSystems.pvpCooldownToTeleport * 1000 - Date.now()) /
                1000)} seconds before they can teleport again because they are still on PVP cooldown.`);
            this.player.sendMessage(`§c${this.target.name} accepted your teleport request, but you can't teleport to them right now because you have to wait another ${Math.round((Number(this.player.getDynamicProperty("lastHurtByPlayerTime") ?? 0) + config.teleportSystems.pvpCooldownToTeleport * 1000 - Date.now()) /
                1000)} seconds before you can teleport again because you are still on PVP cooldown.`);
        }
        else if (!canBypassTeleportCooldowns &&
            Number(this.player.getDynamicProperty("lastTeleportTime") ?? 0) + config.teleportSystems.teleportCooldown * 1000 > Date.now()) {
            this.target.sendMessage(`§cAccepted teleport request from "${this.player.name}", but they can't teleport to you right now because they have to wait another ${Math.round((Number(this.player.getDynamicProperty("lastHurtByPlayerTime") ?? 0) + config.teleportSystems.pvpCooldownToTeleport * 1000 - Date.now()) /
                1000)} seconds before they can teleport again because they are still on cooldown.`);
            this.player.sendMessage(`§c${this.target.name} accepted your teleport request, but you can't teleport to them right now because you have to wait another ${Math.round((Number(this.player.getDynamicProperty("lastHurtByPlayerTime") ?? 0) + config.teleportSystems.pvpCooldownToTeleport * 1000 - Date.now()) /
                1000)} seconds before you can teleport again because you are still on cooldown.`);
        }
        else if (this.target.dimension !== this.player.dimension && !config.teleportSystems.allowCrossDimensionalTeleport) {
            this.target.sendMessage(`§cAccepted teleport request from ${this.player.name}, but they can't teleport to you right now because you are in a different dimension than that player and all cross-dimensional teleports have been disabled.`);
            this.player.sendMessage(`§c${this.target.name} accepted your teleport request, but you can't teleport to them right now because you are in a different dimension than that player and all cross-dimensional teleports have been disabled.`);
        }
        else if (this.target.dimension !== this.player.dimension && !config.tpaSystem.allowCrossDimensionalTeleport) {
            this.target.sendMessage(`§cAccepted teleport request from ${this.player.name}, but they can't teleport to you right now because you are in a different dimension than that player and cross-dimensional teleport requests have been disabled.`);
            this.player.sendMessage(`§c${this.target.name} accepted your teleport request, but you can't teleport to them right now because you are in a different dimension than that player and cross-dimensional teleport requests have been disabled.`);
        }
        else {
            this.target.sendMessage(`§aAccepted teleport request from ${this.player.name}.`);
            this.player.sendMessage(`§a${this.target.name} accepted your teleport request.`);
            const standStillTime = canBypassTeleportCooldowns ? 0 : config.teleportSystems.standStillTimeToTeleport;
            let successfulWaitForStandStill = true;
            if (standStillTime > 0) {
                this.player.sendMessage("§eStand still for " + standStillTime + " seconds to teleport.");
                await waitTicks(20);
                const start = Date.now();
                while (!Vector.equals(this.player.getVelocity(), Vector.zero)) {
                    if (Date.now() - start > 10000) {
                        successfulWaitForStandStill = false;
                        this.player.sendMessage(`§cYou took too long to start standing still so your teleport to ${this.target.name} was canceled.`);
                        this.target.sendMessage(`§c${this.player.name} took to long to start standing still so their teleport to you was canceled.`);
                        break;
                    }
                    await waitTick();
                }
            }
            if (!successfulWaitForStandStill) {
                return 0;
            }
            const playerPosition = this.player.location;
            let successful = true;
            for (let i = 0; i < standStillTime; i++) {
                if (!Vector.equals(this.player.location, playerPosition)) {
                    successful = false;
                    break;
                }
                this.player.sendMessage("§bTeleporting in " + (standStillTime - i));
                await waitTicks(20);
            }
            // Check for PVP cooldown again after ending the teleport countdown.
            if (!canBypassTeleportCooldowns &&
                Number(this.player.getDynamicProperty("lastHurtByPlayerTime") ?? 0) + config.teleportSystems.pvpCooldownToTeleport * 1000 > Date.now()) {
                this.player.sendMessage(`§cSorry but you have to wait another ${Math.round((Number(this.player.getDynamicProperty("lastHurtByPlayerTime") ?? 0) +
                    config.teleportSystems.pvpCooldownToTeleport * 1000 -
                    Date.now()) /
                    1000)} seconds before you can teleport again because you are still on PVP cooldown, as a result of you entering PVP cooldown, your teleport to "${this.target.name}" was canceled.`);
                this.target.sendMessage(`§c${this.player.name} entered PVP cooldown so their teleport to you was canceled.`);
                successful = false;
                return 0;
            }
            // Check for teleport cooldown again after ending the teleport countdown.
            if (!canBypassTeleportCooldowns &&
                Number(this.player.getDynamicProperty("lastTeleportTime") ?? 0) + config.teleportSystems.teleportCooldown * 1000 > Date.now()) {
                this.player.sendMessage(`§cSorry but you have to wait another ${Math.round((Number(this.player.getDynamicProperty("lastTeleportTime") ?? 0) + config.teleportSystems.teleportCooldown * 1000 - Date.now()) / 1000)} seconds before you can teleport again because you are still on cooldown.`);
                this.target.sendMessage(`§c${this.player.name} entered cooldown so their teleport to you was canceled.`);
                return 0;
            }
            if (successful) {
                try {
                    this.player.teleport(this.target.location, { dimension: this.target.dimension });
                    this.player.setDynamicProperty("lastTeleportTime", Date.now());
                    this.player.sendMessage(`§aSuccessfully teleported to ${this.target.name}.`);
                    return 1;
                }
                catch (e) {
                    this.player.sendMessage("§cAn error occurred while trying to teleport you to your home: " + e + e.stack);
                    this.target.sendMessage(`§cAn error occurred while ${this.target.name} was trying to teleport to you.`);
                    return 0;
                }
            }
            else {
                this.player.sendMessage("§cTeleport canceled.");
                this.target.sendMessage(`§c${this.player.name} moved so their teleport to you was canceled.`);
                this.delete();
                return 0;
            }
        }
        return 0;
    }
    /**
     * Sends a teleport request from one player to another.
     *
     * @param {Player | executeCommandPlayerW} fromPlayer The player who sent this teleport request.
     * @param {Player | executeCommandPlayerW} toPlayer The player this teleport request was sent to.
     * @param {number} [sendTime=Date.now()] When this teleport request was sent. Defaults to the current time.
     * @returns {TeleportRequest} The teleport request that was sent.
     *
     * @throws {TypeError} If the {@link fromPlayer} or {@link toPlayer} parameter is not an instance of the {@link Player} class, or an instance of the {@link executeCommandPlayerW} class with a {@link Player} linked to it.
     * @throws {Error} If there is already a teleport request from the {@link fromPlayer} to the {@link toPlayer}.
     */
    static send(fromPlayer, toPlayer, sendTime = Date.now()) {
        const player = fromPlayer instanceof executeCommandPlayerW ? fromPlayer.player : fromPlayer;
        const target = toPlayer instanceof executeCommandPlayerW ? toPlayer.player : toPlayer;
        if (!(player instanceof Player)) {
            throw new TypeError("Invalid Player. Expected an instance of the Player class, or an instance of the executeCommandPlayerW class with a Player linked to it, but instead got " +
                (typeof player == "object"
                    ? player === null
                        ? "object[null]"
                        : "object[" + (player.constructor.name ?? "unknown") + "]"
                    : typeof player) +
                ".");
        }
        if (!(target instanceof Player)) {
            throw new TypeError("Invalid Player. Expected an instance of the Player class, or an instance of the executeCommandPlayerW class with a Player linked to it, but instead got " +
                (typeof target == "object"
                    ? target === null
                        ? "object[null]"
                        : "object[" + (target.constructor.name ?? "unknown") + "]"
                    : typeof target) +
                ".");
        }
        if (!!activeRequests.find((r) => r.player === player && r.target === target)) {
            throw new Error("Duplicate Request");
        }
        const request = new TeleportRequest(player, target, sendTime);
        if (config.ui.menus.playerMenu.enabled) {
            target.sendMessage(`§a${player.name}§r§a sent you a teleport request, type "${command.dp}pm" or use the ${JSON.stringify(config.ui.menus.playerMenu.itemName).slice(0, -1)}§r§a" item to open the player menu to accept or deny this request, or type §b${command.dp}tpaccept ${/^[a-zA-Z0-9_\-.?:()]+$/.test(player.name) ? player.name : JSON.stringify(player.name)}§r§a or §b${command.dp}tpdeny ${/^[a-zA-Z0-9_\-.?:()]+$/.test(player.name) ? player.name : JSON.stringify(player.name)}§r§a to accept or deny this request, this request will expire in ${config.tpaSystem.timeoutDuration < 0
                ? "-" + moment().preciseDiff(moment(Date.now() + config.tpaSystem.timeoutDuration * 1000))
                : moment().preciseDiff(moment(Date.now() + config.tpaSystem.timeoutDuration * 1000))}.`);
        }
        else {
            target.sendMessage(`§a${player.name}§r§a sent you a teleport request, type §b${command.dp}tpaccept ${/^[a-zA-Z0-9_\-.?:()]+$/.test(player.name) ? player.name : JSON.stringify(player.name)}§r§a or §b${command.dp}tpdeny ${/^[a-zA-Z0-9_\-.?:()]+$/.test(player.name) ? player.name : JSON.stringify(player.name)}§r§a to accept or deny this request, this request will expire in ${config.tpaSystem.timeoutDuration < 0
                ? "-" + moment().preciseDiff(moment(Date.now() + config.tpaSystem.timeoutDuration * 1000))
                : moment().preciseDiff(moment(Date.now() + config.tpaSystem.timeoutDuration * 1000))}.`);
        }
        return request;
    }
    /**
     * Gets all teleport requests from a player.
     *
     * @param {Player | executeCommandPlayerW} fromPlayer The player to get the teleport requests from.
     * @returns {TeleportRequest[]} The array of teleport requests sent by the player.
     *
     * @throws {TypeError} If the player is not an instance of the {@link Player} class, or an instance of the {@link executeCommandPlayerW} class with a {@link Player} linked to it.
     */
    static getRequestsFromPlayer(fromPlayer) {
        /**
         * The player to get the teleport requests from.
         *
         * @type {Player | undefined}
         */
        const player = fromPlayer instanceof executeCommandPlayerW ? fromPlayer.player : fromPlayer;
        if (!(player instanceof Player)) {
            throw new TypeError("Invalid Player. Expected an instance of the Player class, or an instance of the executeCommandPlayerW class with a Player linked to it, but instead got " +
                (typeof player == "object"
                    ? player === null
                        ? "object[null]"
                        : "object[" + (player.constructor.name ?? "unknown") + "]"
                    : typeof player) +
                ".");
        }
        return activeRequests.filter((r) => r.player === player);
    }
    /**
     * Gets all teleport requests to a player.
     *
     * @param {Player | executeCommandPlayerW} toPlayer The player to get the teleport requests to.
     * @returns {TeleportRequest[]} The array of teleport requests sent to the player.
     *
     * @throws {TypeError} If the player is not an instance of the {@link Player} class, or an instance of the {@link executeCommandPlayerW} class with a {@link Player} linked to it.
     */
    static getRequestsToPlayer(toPlayer) {
        /**
         * The player to get the teleport requests to.
         *
         * @type {Player | undefined}
         */
        const target = toPlayer instanceof executeCommandPlayerW ? toPlayer.player : toPlayer;
        if (!(target instanceof Player)) {
            throw new TypeError("Invalid Player. Expected an instance of the Player class, or an instance of the executeCommandPlayerW class with a Player linked to it, but instead got " +
                (typeof target == "object"
                    ? target === null
                        ? "object[null]"
                        : "object[" + (target.constructor.name ?? "unknown") + "]"
                    : typeof target) +
                ".");
        }
        return activeRequests.filter((r) => r.target === target);
    }
    /**
     * Gets all active teleport requests.
     *
     * @returns {TeleportRequest[]} The array of active teleport requests.
     */
    static getAllRequests() {
        return activeRequests.filter((b) => b.valid);
    }
}
//# sourceMappingURL=TeleportRequest.js.map