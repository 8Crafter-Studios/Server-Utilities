import { Player } from "@minecraft/server";
import { command } from "modules/commands/classes/command";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
const activeRequests = [];
let currentId = 0n;
export class TeleportRequest {
    id;
    player;
    target;
    sendTime;
    valid = true;
    accepted = false;
    constructor(player, target, sendTime = Date.now()) {
        this.player = player;
        this.target = target;
        this.sendTime = sendTime;
        Object.defineProperty(this, "id", {
            value: currentId++,
            configurable: true,
            enumerable: true,
            writable: false,
        });
        this.init();
    }
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
    cancelSequence() {
        this.target.sendMessage(`§c${this.player.name} canceled their teleport request to you.`);
    }
    timeOutSequence() {
        this.target.sendMessage(`§c${this.player.name}'s teleport request timed out.`);
        this.player.sendMessage(`§cThe teleport request to ${this.target.name} timed out.`);
    }
    denySequence() {
        this.target.sendMessage(`§cDenied ${this.player.name}'s teleport request.`);
        this.player.sendMessage(`§c${this.target.name} denied your teleport request.`);
    }
    async teleportSequence() {
        if (Number(this.player.getDynamicProperty("lastHurtByPlayerTime") ?? 0) + config.teleportSystems.pvpCooldownToTeleport * 1000 > Date.now()) {
            this.target.sendMessage(`§cAccepted teleport request from "${this.player.name}", but they can't teleport to you right now because they have to wait another ${Math.round((Number(this.player.getDynamicProperty("lastHurtByPlayerTime") ?? 0) + config.teleportSystems.pvpCooldownToTeleport * 1000 - Date.now()) / 1000)} seconds before they can teleport again because they are still on PVP cooldown.`);
            this.player.sendMessage(`§c${this.target.name} accepted your teleport request, but you can't teleport to them right now because you have to wait another ${Math.round((Number(this.player.getDynamicProperty("lastHurtByPlayerTime") ?? 0) + config.teleportSystems.pvpCooldownToTeleport * 1000 - Date.now()) / 1000)} seconds before you can teleport again because you are still on PVP cooldown.`);
        }
        else if (Number(this.player.getDynamicProperty("lastTeleportTime") ?? 0) + config.teleportSystems.teleportCooldown * 1000 > Date.now()) {
            this.target.sendMessage(`§cAccepted teleport request from "${this.player.name}", but they can't teleport to you right now because they have to wait another ${Math.round((Number(this.player.getDynamicProperty("lastHurtByPlayerTime") ?? 0) + config.teleportSystems.pvpCooldownToTeleport * 1000 - Date.now()) / 1000)} seconds before they can teleport again because they are still on cooldown.`);
            this.player.sendMessage(`§c${this.target.name} accepted your teleport request, but you can't teleport to them right now because you have to wait another ${Math.round((Number(this.player.getDynamicProperty("lastHurtByPlayerTime") ?? 0) + config.teleportSystems.pvpCooldownToTeleport * 1000 - Date.now()) / 1000)} seconds before you can teleport again because you are still on cooldown.`);
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
            const standStillTime = config.teleportSystems.standStillTimeToTeleport;
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
            if (Number(this.player.getDynamicProperty("lastHurtByPlayerTime") ?? 0) + config.teleportSystems.pvpCooldownToTeleport * 1000 > Date.now()) {
                this.player.sendMessage(`§cSorry but you have to wait another ${Math.round((Number(this.player.getDynamicProperty("lastHurtByPlayerTime") ?? 0) + config.teleportSystems.pvpCooldownToTeleport * 1000 - Date.now()) / 1000)} seconds before you can teleport again because you are still on PVP cooldown, as a result of you entering PVP cooldown, your teleport to "${this.target.name}" was canceled.`);
                this.target.sendMessage(`§c${this.player.name} entered PVP cooldown so their teleport to you was canceled.`);
                successful = false;
                return 0;
            }
            // Check for teleport cooldown again after ending the teleport countdown.
            if (Number(this.player.getDynamicProperty("lastTeleportTime") ?? 0) + config.teleportSystems.teleportCooldown * 1000 > Date.now()) {
                this.player.sendMessage(`§cSorry but you have to wait another ${Math.round((Number(this.player.getDynamicProperty("lastTeleportTime") ?? 0) + config.teleportSystems.teleportCooldown * 1000 - Date.now()) / 1000)} seconds before you can teleport again because you are still on cooldown.`);
                this.target.sendMessage(`§c${this.player.name} entered cooldown so their teleport to you was canceled.`);
                return 0;
            }
            if (successful) {
                try {
                    this.player.teleport(this.target.location, { dimension: this.target.dimension });
                    this.player.setDynamicProperty("lastTeleportTime", Date.now());
                    this.player.sendMessage(`§aSuccessfully teleported to ${this.target.name}.`);
                }
                catch (e) {
                    this.player.sendMessage("§cAn error occurred while trying to teleport you to your home: " + e + e.stack);
                    this.target.sendMessage(`§cAn error occurred while ${this.target.name} was trying to teleport to you.`);
                }
            }
            else {
                this.player.sendMessage("§cTeleport canceled.");
                this.target.sendMessage(`§c${this.player.name} moved so their teleport to you was canceled.`);
                this.delete();
            }
        }
    }
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
        target.sendMessage(`§a${player.name} sent you a teleport request, type "${command.dp}pm" or use the ${JSON.stringify(config.ui.menus.playerMenu.itemName)} item to open the player menu to accept or deny this request, this request will expire in ${config.tpaSystem.timeoutDuration == 60
            ? "1 minute"
            : (config.tpaSystem.timeoutDuration / 60).floor() == 1
                ? `1 minute and ${(config.tpaSystem.timeoutDuration % 60).floor()} second${(config.tpaSystem.timeoutDuration % 60).floor() != 1 ? "s" : ""}`
                : (config.tpaSystem.timeoutDuration / 60).floor() == 0
                    ? `${(config.tpaSystem.timeoutDuration % 60).floor()} second${(config.tpaSystem.timeoutDuration % 60).floor() != 1 ? "s" : ""}`
                    : `${(config.tpaSystem.timeoutDuration / 60).floor()} minutes and ${(config.tpaSystem.timeoutDuration % 60).floor()} second${(config.tpaSystem.timeoutDuration % 60).floor() != 1 ? "s" : ""}`}.`);
    }
    static getRequestsFromPlayer(fromPlayer) {
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
    static getRequestsToPlayer(toPlayer) {
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
    static getAllRequests() {
        return activeRequests.filter(b => b.valid);
    }
}
//# sourceMappingURL=TeleportRequest.js.map