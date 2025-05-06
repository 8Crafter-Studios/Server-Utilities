import { ModalFormData } from "@minecraft/server-ui";
import "init/classes/config";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import { customFormUICodes } from "../constants/customFormUICodes";
/**
 * Displays and handles the teleport systems settings form for a given entity.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 *
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled.
 * 2. If enabled, verifies if the player has the required permission to access the settings.
 * 3. If the player lacks permission, displays an access denied message.
 * 4. If the player has permission or ultra security mode is disabled, displays the UI settings form.
 * 5. Updates the configuration based on the form input.
 * 6. Returns the appropriate status code based on the outcome.
 */
export async function teleportSystemsSettings(sourceEntity) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    try {
        if (securityVariables.ultraSecurityModeEnabled) {
            if (securityVariables.testPlayerForPermission(player, "andexdb.accessSettings") == false) {
                const r = await showMessage(player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSettings", "Back", "Cancel");
                if (r.canceled || r.selection == 0) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
        }
        const menuConfig = config.teleportSystems;
        const includedOptions = [
            "allowCrossDimensionalTeleport",
            "pvpCooldownToTeleport",
            "standStillTimeToTeleport",
            "teleportCooldown",
        ];
        const form = new ModalFormData();
        form.title(customFormUICodes.modal.titles.formStyles.medium + "Teleport Systems Settings");
        const formOptionsMap = {
            allowCrossDimensionalTeleport: () => form.toggle("§l§fAllow Cross-Dimensional Teleport§r§f\nWhether or not players can teleport to locations that are in dimensions other than their current dimensions, applies to all forms of teleportation available to regular players, including the \\spawn commmand, the TPA system, the homes system, the warps system, etc. Defaults to true.", { defaultValue: menuConfig.allowCrossDimensionalTeleport }),
            pvpCooldownToTeleport: () => form.textField("§l§fpvpCooldownToTeleport§r§f\nHow long in seconds after getting damaged by another player that the player has to wait before they can teleport with the player menu or commands such as \\spawn, \\home, \\gohome, \\tpa, and \\rtp. Set it to 0 to have no cooldown. Defaults to 15.", "float", { defaultValue: menuConfig.pvpCooldownToTeleport.toString() }),
            standStillTimeToTeleport: () => form.textField("§l§fstandStillTimeToTeleport§r§f\nHow long in seconds that the player has to stand still before they can teleport, if they move during this time period, the teleportation is canceled. Set it to 0 to have players teleport instantly. Defaults to 5.", "float", { defaultValue: menuConfig.standStillTimeToTeleport.toString() }),
            teleportCooldown: () => form.textField("§l§fteleportCooldown§r§f\nHow long in seconds after teleporting that the player has to wait before they can teleport again. Set it to 0 to have no cooldown. Defaults to 30.", "float", { defaultValue: menuConfig.teleportCooldown.toString() }),
        };
        includedOptions.forEach((o) => formOptionsMap[o]());
        form.submitButton("Save");
        const r = await form.forceShow(player);
        if (r.canceled) {
            return 1;
        }
        const options = Object.fromEntries(includedOptions.map((o, i) => [o, r.formValues[i]]));
        includedOptions.forEach((v) => {
            switch (v) {
                case "allowCrossDimensionalTeleport":
                    menuConfig.allowCrossDimensionalTeleport = options[v];
                    break;
                case "pvpCooldownToTeleport":
                    menuConfig.pvpCooldownToTeleport = options[v].toNumber();
                    break;
                case "standStillTimeToTeleport":
                    menuConfig.standStillTimeToTeleport = options[v].toNumber();
                    break;
                case "teleportCooldown":
                    menuConfig.teleportCooldown = options[v].toNumber();
                    break;
                default:
                    throw new Error(`Save action for setting ${JSON.stringify(v)} was not defined.`);
            }
        });
        return 1;
    }
    catch (e) {
        console.error(e, e.stack);
        // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
        return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    }
}
//# sourceMappingURL=teleportSystemsSettings.js.map