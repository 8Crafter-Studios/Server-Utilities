import { Player, world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { createExplosion } from "./createExplosion";
import { editorStick } from "./editorStick";
import { itemSelector } from "./itemSelector";
import { manageCommands } from "./manageCommands";
import { managePlayers } from "./managePlayers";
import { mapArtGenerator } from "./mapArtGenerator";
import { moderationMenu } from "./moderationMenu";
import { nbtStructureLoader } from "./nbtStructureLoader";
import { scriptEvalRunWindow } from "./scriptEvalRunWindow";
import { settings } from "./settings";
import { editAreasMainMenu } from "modules/spawn_protection/functions/editAreasMainMenu";
import { terminal } from "./terminal";
import { customFormListSelectionMenu } from "./customFormListSelectionMenu";
import { itemEditorTypeSelection } from "./itemEditorTypeSelection";
import { securitySettings } from "./securitySettings";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
import { menuButtonIds } from "../constants/menuButtonIds";
import { customFormUICodes } from "../constants/customFormUICodes";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
export async function mainMenu(sourceEntity) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    while (true) {
        try {
            if (securityVariables.ultraSecurityModeEnabled) {
                if (securityVariables.testPlayerForPermission(player, "andexdb.accessMainMenu") == false) {
                    const r = await showMessage(player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessMainMenu", "Back", "Cancel");
                    if (r.canceled || r.selection == 0) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
            }
            const menuConfig = config.ui.menus.mainMenu;
            // menuConfig.buttons.map(k=>[k, menuButtonIds.mainMenu.buttons[k]])
            const buttons = Object.entries(menuButtonIds.mainMenu.buttons)
                .sort((a, b) => a[1].defaultButtonIndex - b[1].defaultButtonIndex)
                .filter(([k, b]) => {
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
            let players = world.getPlayers();
            form.title(customFormUICodes.action.titles.formStyles.gridMenu + "Main Menu");
            form.body("Choose menu to open. ");
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
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            const r = await form.forceShow(player);
            // This will stop the code when the player closes the form
            if (r.canceled)
                return 1;
            switch (buttons[r.selection]?.[0] ?? ["close"][r.selection - buttons.length]) {
                case "editorStick":
                    editorStick(player);
                    return 0;
                case "editorStickMenuB":
                    try {
                        player.runCommand(String("/scriptevent andexdb:debugStickMenuB saqw"));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    return 0;
                case "editorStickMenuC":
                    try {
                        player.runCommand(String("/scriptevent andexdb:debugStickMenuC saqw"));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    return 0;
                case "debugScreen":
                    try {
                        player.runCommand(String("/scriptevent andexdb:debugScreen saqw"));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    return 0;
                case "inventoryController":
                    try {
                        player.runCommand(String("/scriptevent andexdb:itemLoreInventoryModifier hisw"));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    return 0;
                case "playerDebug":
                    try {
                        player.runCommand(String("/scriptevent andexdb:playerDebug saqw"));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    return 0;
                case "entityDebug":
                    try {
                        player.runCommand(String("/scriptevent andexdb:entityDebug saqw"));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    return 0; /*
    case 4:
        try { (sourceEntity).runCommand(String("/scriptevent andexdb:entityDebuger saqw")); }
        // Do something
    catch(e) {
        console.error(e, e.stack);
    };
        // Do something when button 2 is pressed
        break;*/
                case "playerController":
                    try {
                        player.runCommand(String("/scriptevent andexdb:playerController saqw"));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    return 0;
                case "entityController":
                    try {
                        player.runCommand(String("/scriptevent andexdb:entityController saqw"));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    return 0;
                case "worldOptions":
                    try {
                        player.runCommand(String("/scriptevent andexdb:worldOptions saqw"));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    return 0;
                case "dimensionOptions":
                    try {
                        player.runCommand(String("/scriptevent andexdb:dimensionOptions saqw"));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    return 0;
                case "createExplosion":
                    if ((await createExplosion(player)) == 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "fillBlocks":
                    try {
                        player.runCommand(String("/scriptevent andexdb:fillBlocks saqw"));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    return 0;
                case "inventoryTransfer":
                    try {
                        player.runCommand(String("/scriptevent andexdb:inventoryTransfer saih"));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    return 0;
                case "runCommand":
                    if ((await terminal(player)) == 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "scriptEval":
                    if ((await scriptEvalRunWindow(player)) == 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "manageRestrictedAreas":
                    if ((await editAreasMainMenu(player)) == 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "manageCustomUIs":
                    customFormListSelectionMenu(player);
                    return 0;
                case "moderation":
                    if ((await moderationMenu(player)) == 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "security":
                    if ((await securitySettings(player)) == 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "settings":
                    if ((await settings(player)) == 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "managePlayers":
                    if ((await managePlayers(player)) == 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "manageCommands":
                    if ((await manageCommands(player)) == 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "itemEditor":
                    try {
                        itemSelector(player, player).then(async (a) => {
                            if (!!a) {
                                itemEditorTypeSelection(player, player, a);
                            }
                        });
                        return 0;
                    }
                    catch { }
                    break;
                case "mapArtGnerator":
                    if ((await mapArtGenerator(player)) == 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "javaNBTStructureLoader":
                    if ((await nbtStructureLoader(player)) == 1) {
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
            // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
            return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        }
    }
}
//# sourceMappingURL=mainMenu.js.map