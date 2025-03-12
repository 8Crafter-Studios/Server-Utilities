import { ActionFormData } from "@minecraft/server-ui";
import { showMessage } from "modules/utilities/functions/showMessage";
import { manageWarps } from "./manageWarps";
import { customFormUICodes } from "../constants/customFormUICodes";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
/**
 * Shows the player a menu with all the warps defined in the config, and allows them to teleport to any of them.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function playerMenu_warps(sourceEntity) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    while (true) {
        try {
            if (!config.warpsSystem.enabled) {
                if ((await showMessage(player, "Error", `§cSorry but the warps system is currently disabled.`, "Back", "Close")).selection === 0) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
            let form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.general + "Warps");
            const warps = config.warpsSystem.warps;
            warps.forEach((w) => form.button(customFormUICodes.action.buttons.positions.main_only + w.displayName, w.icon));
            if (player.hasTag("admin")) {
                form.button(customFormUICodes.action.buttons.positions.main_only + "Manage Warps (§cAdmin Only§r)", "textures/ui/pencil_edit_icon");
            }
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            const r = await form.forceShow(player);
            if (r.canceled)
                return 1;
            switch ((!!warps[r.selection] ? "warp" : undefined) ??
                cullUndefined([player.hasTag("admin") ? "manageWarps" : undefined, "back", "close"])[r.selection - warps.length]) {
                case "warp":
                    const warp = warps[r.selection];
                    if (player.dimension !== dimensionsb[warp.dimension] && !config.teleportSystems.allowCrossDimensionalTeleport) {
                        if ((await showMessage(player, "Error", `§cSorry but all cross-dimensional teleports have been disabled.`, "Back", "Close"))
                            .selection === 0) {
                            continue;
                        }
                        else {
                            return 0;
                        }
                    }
                    // Check for PVP cooldown before starting the teleport countdown.
                    if (Number(player.getDynamicProperty("lastHurtByPlayerTime") ?? 0) + config.teleportSystems.pvpCooldownToTeleport * 1000 > Date.now()) {
                        player.sendMessage(`§cSorry but you have to wait another ${Math.round((Number(player.getDynamicProperty("lastHurtByPlayerTime") ?? 0) +
                            config.teleportSystems.pvpCooldownToTeleport * 1000 -
                            Date.now()) /
                            1000)} seconds before you can teleport again because you are still on PVP cooldown.`);
                        return 0;
                    }
                    // Check for teleport cooldown before starting the teleport countdown.
                    if (Number(player.getDynamicProperty("lastTeleportTime") ?? 0) + config.teleportSystems.teleportCooldown * 1000 > Date.now()) {
                        player.sendMessage(`§cSorry but you have to wait another ${Math.round((Number(player.getDynamicProperty("lastTeleportTime") ?? 0) + config.teleportSystems.teleportCooldown * 1000 - Date.now()) /
                            1000)} seconds before you can teleport again because you are still on cooldown.`);
                        return 0;
                    }
                    const standStillTime = config.teleportSystems.standStillTimeToTeleport;
                    if (standStillTime > 0) {
                        player.sendMessage("§eStand still for " + standStillTime + " seconds to teleport.");
                        await waitTicks(20);
                    }
                    const playerPosition = player.location;
                    let successful = true;
                    for (let i = 0; i < standStillTime; i++) {
                        if (!Vector.equals(player.location, playerPosition)) {
                            successful = false;
                            break;
                        }
                        player.sendMessage("§bTeleporting in " + (standStillTime - i));
                        await waitTicks(20);
                    }
                    // Check for PVP cooldown again after ending the teleport countdown.
                    if (Number(player.getDynamicProperty("lastHurtByPlayerTime") ?? 0) + config.teleportSystems.pvpCooldownToTeleport * 1000 > Date.now()) {
                        player.sendMessage(`§cSorry but you have to wait another ${Math.round((Number(player.getDynamicProperty("lastHurtByPlayerTime") ?? 0) +
                            config.teleportSystems.pvpCooldownToTeleport * 1000 -
                            Date.now()) /
                            1000)} seconds before you can teleport again because you are still on PVP cooldown.`);
                        successful = false;
                        return 0;
                    }
                    // Check for teleport cooldown again after ending the teleport countdown.
                    if (Number(player.getDynamicProperty("lastTeleportTime") ?? 0) + config.teleportSystems.teleportCooldown * 1000 > Date.now()) {
                        player.sendMessage(`§cSorry but you have to wait another ${Math.round((Number(player.getDynamicProperty("lastTeleportTime") ?? 0) + config.teleportSystems.teleportCooldown * 1000 - Date.now()) /
                            1000)} seconds before you can teleport again because you are still on cooldown.`);
                        return 0;
                    }
                    if (successful) {
                        try {
                            player.teleport(warp.location, { dimension: dimensionsb[warp.dimension] });
                            player.setDynamicProperty("lastTeleportTime", Date.now());
                            player.sendMessage("§aSuccessfully teleported.");
                        }
                        catch (e) {
                            player.sendMessage("§cAn error occurred while trying to teleport you to the selected warp: " + e + e.stack);
                        }
                    }
                    else {
                        player.sendMessage("§cTeleport canceled.");
                    }
                    return 0;
                case "manageWarps":
                    if ((await manageWarps(player)) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "back":
                    return 1;
                case "close":
                    return 0;
                default:
                    return 1;
            }
        }
        catch (e) {
            console.error(e, e.stack);
            // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
            return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        }
    }
}
//# sourceMappingURL=playerMenu_warps.js.map