/**
 * ExtraFeatures/shop_main.ts
 * @module
 * @description This file contains functions and types related to the shop system..
 */
import { Player, Entity, ItemLockMode, ItemStack, ItemEnchantableComponent, ItemDurabilityComponent } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { forceShow } from "modules/ui/functions/forceShow";
import "init/classes/config";
import { showMessage } from "modules/utilities/functions/showMessage";
import { ServerShopManager } from "./server_shop";
import { PlayerShopManager } from "./player_shop";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { customFormUICodes } from "modules/ui/constants/customFormUICodes";
/**
 * Main function to handle the shop system settings interface.
 *
 * @param sourceEntitya - The entity that initiated the request. Can be an `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to one of the following values:
 * - `-2` if an error occurs.
 * - `0` if the operation is closed.
 * - `1` if the operation is successful.
 *
 * The function displays a menu with options to configure the server shop, player shop, and sign shop settings.
 * It also checks for permissions if ultra security mode is enabled.
 *
 * The menu options are:
 * - Server Shop: Toggles the server shop system settings.
 * - Player Shop: Toggles the player shop system settings.
 * - Sign Shop: Displays a message that the sign shop system does not exist yet.
 * - Back: Returns to the previous menu.
 * - Close: Closes the menu.
 *
 * If an error occurs during the execution, it logs the error and returns `-2`.
 */
export async function mainShopSystemSettings(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    assertIsDefined(sourceEntity);
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessExtraFeaturesSettings") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessExtraFeaturesSettings", "Go Back", "Close");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    let form = new ActionFormData();
    form.title(customFormUICodes.action.titles.formStyles.gridMenu + "Shop Sytem Settings");
    form.button(customFormUICodes.action.buttons.positions.main_only + "Server Shop\n" + (config.shopSystem.server.enabled ? "§aEnabled" : "§cDisabled"), "textures/ui/servers");
    form.button(customFormUICodes.action.buttons.positions.main_only + "Player Shop\n" + (config.shopSystem.player.enabled ? "§aEnabled" : "§cDisabled"), "textures/ui/icon_multiplayer");
    form.button(customFormUICodes.action.buttons.positions.main_only + "§cSign Shop\n" + (config.shopSystem.sign.enabled ? "§aEnabled" : "§cDisabled"), "textures/ui/icon_sign");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    return await forceShow(form, sourceEntity)
        .then(async (r) => {
        if (r.canceled)
            return 1;
        let response = r.selection;
        switch (response) {
            case 0:
                if ((await ServerShopManager.serverShopSystemSettings(sourceEntity)) === 1) {
                    return await mainShopSystemSettings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case 1:
                if ((await PlayerShopManager.playerShopSystemSettings(sourceEntity)) === 1) {
                    return await mainShopSystemSettings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case 2:
                return await showMessage(sourceEntity, undefined, "§cSorry, the sign shop system does not exist yet.", "Back", "Close").then(async (r) => {
                    if (r.selection !== 1) {
                        return await mainShopSystemSettings(sourceEntity);
                    }
                    else {
                        return 0;
                    }
                });
                // signShopSystemSettings(sourceEntity)
                break;
            case 3:
                return 1;
                break;
            case 4:
                return 0;
                break;
            default:
                return 1;
        }
    })
        .catch((e) => {
        console.error(e, e.stack);
        return -2;
    });
}
//# sourceMappingURL=shop_main.js.map