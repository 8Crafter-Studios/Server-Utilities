import { Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { showMessage } from "modules/utilities/functions/showMessage";
import { menuButtonIds } from "../constants/menuButtonIds";
import { playerMenu_leaderboards } from "./playerMenu_leaderboards";
import { playerMenu_about } from "./playerMenu_about";
import { playerMenu_homes } from "./playerMenu_homes";
import { ServerShop } from "ExtraFeatures/server_shop";
import { PlayerShop } from "ExtraFeatures/player_shop";
import { playerMenu_TPA } from "./playerMenu_TPA";
import { playerMenu_bounties } from "./playerMenu_bounties";
import { playerMenu_warps } from "./playerMenu_warps";
import { playerMenu_moneyTransfer } from "./playerMenu_moneyTransfer";
import { playerMenu_redeemCode } from "./playerMenu_redeemCode";
import { customFormUICodes } from "../constants/customFormUICodes";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
/**
 * Opens the player menu.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0>} A promise that resolves to `0` once the player menu has been closed.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function playerMenu(sourceEntity) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    while (true) {
        try {
            if (!config.ui.menus.playerMenu.enabled) {
                const r = await showMessage(player, "Menu Disabled", "The player menu is disabled. It must be enabled in Main Menu > Settings > Player Menu.", "Back", "Cancel");
                if (r.canceled || r.selection == 0) {
                    return 0;
                }
                else {
                    return 0;
                }
            }
            const menuConfig = config.ui.menus.playerMenu;
            // menuConfig.buttons.map(k=>[k, menuButtonIds.mainMenu.buttons[k]])
            const buttons = menuConfig.buttons.map((k) => [k, menuButtonIds.playerMenu.buttons[k]]).filter(([k, b]) => {
                if (!menuConfig.showDeprecatedButtons && b.deprecated) {
                    return false;
                }
                if (!menuConfig.showExperimentalButtons && b.experimental) {
                    return false;
                }
                if (!menuConfig.showNonFunctionalButtons && !b.functional && !(menuConfig.showUpcomingButtons && b.upcoming)) {
                    return false;
                }
                if (!menuConfig.showUnusedButtons && b.unused) {
                    return false;
                }
                if (!menuConfig.showUpcomingButtons && b.upcoming) {
                    return false;
                }
                if (b.extraVisibilityConditionsCheck !== undefined) {
                    return b.extraVisibilityConditionsCheck();
                }
                return true;
            });
            let form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.gridMenu + "Player Menu");
            form.body("Hello " + player.name);
            buttons.forEach(([k, b]) => {
                form.button(customFormUICodes.action.buttons.positions.main_only + b.displayName, b.icon);
            }); /*
    form.button("Editor Stick", "textures/items/stick");
    form.button("Editor Stick Menu B", "textures/items/stick");
    form.button("Editor Stick Menu C", "textures/items/stick");
    form.button(
        "§8Debug Screen§f(§cUnused§f)§b",
        "textures/ui/ui_debug_glyph_color"
    );
    form.button("Inventory Controller", "textures/ui/inventory_icon.png");
    form.button("Player Debug", "textures/ui/debug_glyph_color");
    form.button("Entity Debug§b", "textures/ui/debug_glyph_color"); */ /*
        form.button("Entity Debugger", "textures/ui/debug_glyph_color");*/ /*
            
                form.button("Player Controller", "textures/ui/controller_glyph_color");
                form.button(
                    "Entity Controller",
                    "textures/ui/controller_glyph_color_switch"
                );
                form.button("World Options§b", "textures/ui/settings_glyph_color_2x");
                form.button(
                    "§4Dimension Options§f(§cComing Soon!§f)§b",
                    "textures/ui/icon_setting"
                );
                form.button("Create Explosion", "textures/blocks/tnt_side");
                form.button("§4Fill Blocks(§cComing Soon!§f)§b", "textures/blocks/stone");
                form.button(
                    "§4World Debug§f(§cComing Soon!§f)§b",
                    "textures/ui/xyz_axis.png"
                );
                form.button(
                    "§4Dimension Debug§f(§cComing Soon!§f)§b",
                    "textures/ui/NetherPortal"
                );
                form.button(
                    "Inventory Transfer§f(§nDEPRECATED§f)",
                    "textures/ui/NetherPortal"
                );
                form.button("Run Command", "textures/ui/ImpulseSquare.png");
                form.button("Script Eval", "textures/ui/RepeatSquare.png");
                form.button("Mange Restricted Areas", "textures/ui/xyz_axis.png");
                form.button("Manage Custom UIs", "textures/ui/feedIcon");
                form.button("Moderation", "textures/ui/hammer_l");
                form.button("Security", "textures/ui/absorption_effect");
                form.button("Settings", "textures/ui/settings_glyph_color_2x");
                form.button("Manage Players", "textures/ui/user_icon_white");
                form.button(
                    "Manage Commands",
                    "textures/ui/chat_keyboard_hover"
                );
                form.button("§eItem Editor §f[§cAlpha§f]", "textures/ui/icon_recipe_item");
                form.button(
                    "§eMap Art Generator §f[§cAlpha§f]",
                    "textures/items/map_locked"
                );
                form.button(
                    "§eJava NBT Structure Loader §f[§cAlpha§f]",
                    "textures/ui/xyz_axis"
                ); */
            // form.button("Close", "textures/ui/crossout");
            const r = await form.forceShow(player);
            if (r.canceled)
                return 0;
            switch (buttons[r.selection]?.[0] ?? ["close"][r.selection - buttons.length]) {
                case "leaderboards":
                    if ((await playerMenu_leaderboards(player)) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "homes":
                    if ((await playerMenu_homes(player)) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "TPA":
                    if ((await playerMenu_TPA(player)) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "warps":
                    if ((await playerMenu_warps(player)) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "bounties":
                    if ((await playerMenu_bounties(player)) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "serverShops":
                    if ((await ServerShop.openPublicShopsSelector(player, true)) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "playerShops":
                    if ((await PlayerShop.openPublicShopsSelector(player, true)) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "moneyTransfer":
                    if ((await playerMenu_moneyTransfer(player)) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "dailyRewards":
                    /**
                     * @todo Implement daily rewards system
                     */
                    if ((await showMessage(player, undefined, "§cSorry, the daily rewards system does not exist yet.", "Back", "Close")).selection !==
                        1) {
                        continue;
                    }
                    else {
                        return 0;
                    } /*
                if ((await playerMenu_dailyRewards(sourceEntity)) === 1) {
                    continue;
                } else {
                    return 0;
                } */
                case "redeemCode":
                    if ((await playerMenu_redeemCode(player)) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "about":
                    if ((await playerMenu_about(player)) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "close":
                    return 0;
                default:
                    throw new Error("Invalid selection: " + r.selection);
            }
        }
        catch (e) {
            console.error(e, e.stack);
            // Present the error to the user, and return 0 if they select "Back", and 0 if they select "Close".
            return (((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber() *
                0);
        }
    }
}
//# sourceMappingURL=playerMenu.js.map