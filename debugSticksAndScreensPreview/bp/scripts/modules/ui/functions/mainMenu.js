import { Entity, Player, world } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { createExplosion } from "./createExplosion";
import { editorStick } from "./editorStick";
import { itemSelector } from "./itemSelector";
import { manageCommands } from "./manageCommands";
import { managePlayers } from "./managePlayers";
import { mapArtGenerator } from "./mapArtGenerator";
import { moderationSettings } from "./moderationSettings";
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
export async function mainMenu(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessMainMenu") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessMainMenu", "Back", "Cancel");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    let form = new ActionFormData();
    let players = world.getPlayers();
    form.title("Main Menu");
    form.body("Choose menu to open. ");
    form.button("Editor Stick", "textures/items/stick");
    form.button("Editor Stick Menu B", "textures/items/stick");
    form.button("Editor Stick Menu C", "textures/items/stick");
    form.button("§8Debug Screen§f(§cUnused§f)§b", "textures/ui/ui_debug_glyph_color");
    form.button("Inventory Controller", "textures/ui/inventory_icon.png");
    form.button("Player Debug", "textures/ui/debug_glyph_color");
    form.button("Entity Debug§b", "textures/ui/debug_glyph_color"); /*
form.button("Entity Debugger", "textures/ui/debug_glyph_color");*/
    form.button("Player Controller", "textures/ui/controller_glyph_color");
    form.button("Entity Controller", "textures/ui/controller_glyph_color_switch");
    form.button("World Options§b", "textures/ui/settings_glyph_color_2x");
    form.button("§4Dimension Options§f(§cComing Soon!§f)§b", "textures/ui/icon_setting");
    form.button("§eCreate Explosion §f[§cAlpha§f]", "textures/blocks/tnt_side");
    form.button("§4Fill Blocks(§cComing Soon!§f)§b", "textures/blocks/stone");
    form.button("§4World Debug§f(§cComing Soon!§f)§b", "textures/ui/xyz_axis.png");
    form.button("§4Dimension Debug§f(§cComing Soon!§f)§b", "textures/ui/NetherPortal");
    form.button("Inventory Transfer§f(§nDEPRECATED§f)", "textures/ui/NetherPortal");
    form.button("Run Command", "textures/ui/ImpulseSquare.png");
    form.button("Script Eval", "textures/ui/RepeatSquare.png");
    form.button("Mange Restricted Areas", "textures/ui/xyz_axis.png");
    form.button("Manage Custom UIs", "textures/ui/feedIcon");
    form.button("Moderation §f[§cAlpha§f]", "textures/ui/hammer_l");
    form.button("Security §f[§cAlpha§f]", "textures/ui/absorption_effect");
    form.button("Settings", "textures/ui/settings_glyph_color_2x");
    form.button("Manage Players", "textures/ui/user_icon_white");
    form.button("§eManage Commands §f[§6Beta§f]", "textures/ui/chat_keyboard_hover");
    form.button("§eItem Editor §f[§cAlpha§f]", "textures/ui/icon_recipe_item");
    form.button("§eMap Art Generator §f[§cAlpha§f]", "textures/items/map_locked");
    form.button("§eJava NBT Structure Loader §f[§cAlpha§f]", "textures/ui/xyz_axis");
    form.button("Close", "textures/ui/crossout");
    return await forceShow(form, players[players.findIndex((x) => x == sourceEntity)])
        .then(async (ra) => {
        let r = ra;
        // This will stop the code when the player closes the form
        if (r.canceled)
            return 1;
        let response = r.selection;
        switch (response) {
            case 0:
                editorStick(sourceEntity);
                return 0;
                break;
            case 1:
                try {
                    sourceEntity.runCommand(String("/scriptevent andexdb:debugStickMenuB saqw"));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                return 0;
                break;
            case 2:
                try {
                    sourceEntity.runCommand(String("/scriptevent andexdb:debugStickMenuC saqw"));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                return 0;
                break;
            case 3:
                try {
                    sourceEntity.runCommand(String("/scriptevent andexdb:debugScreen saqw"));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                return 0;
                break;
            case 4:
                try {
                    sourceEntity.runCommand(String("/scriptevent andexdb:itemLoreInventoryModifier hisw"));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                return 0;
                break;
            case 5:
                try {
                    sourceEntity.runCommand(String("/scriptevent andexdb:playerDebug saqw"));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                return 0;
                break;
            case 6:
                try {
                    sourceEntity.runCommand(String("/scriptevent andexdb:entityDebug saqw"));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                return 0;
                break; /*
case 4:
try { (sourceEntity).runCommand(String("/scriptevent andexdb:entityDebuger saqw")); }
// Do something
catch(e) {
console.error(e, e.stack);
};
// Do something when button 2 is pressed
break;*/
            case 7:
                try {
                    sourceEntity.runCommand(String("/scriptevent andexdb:playerController saqw"));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                return 0;
                break;
            case 8:
                try {
                    sourceEntity.runCommand(String("/scriptevent andexdb:entityController saqw"));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                return 0;
                break;
            case 9:
                try {
                    sourceEntity.runCommand(String("/scriptevent andexdb:worldOptions saqw"));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                return 0;
                break;
            case 10:
                try {
                    sourceEntity.runCommand(String("/scriptevent andexdb:dimensionOptions saqw"));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                return 0;
                break;
            case 11:
                createExplosion(sourceEntity);
                return 0;
                break;
            case 12:
                try {
                    sourceEntity.runCommand(String("/scriptevent andexdb:fillBlocks saqw"));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                return 0;
                break;
            case 15:
                try {
                    sourceEntity.runCommand(String("/scriptevent andexdb:inventoryTransfer saih"));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                return 0;
                break;
            case 16:
                terminal(sourceEntity);
                return 0;
                break;
            case 17:
                scriptEvalRunWindow(sourceEntity);
                return 0;
                break;
            case 18:
                editAreasMainMenu(sourceEntity);
                return 0;
                break;
            case 19:
                customFormListSelectionMenu(sourceEntity);
                return 0;
                break;
            case 20:
                moderationSettings(sourceEntity);
                return 0;
                break;
            case 21:
                if ((await securitySettings(sourceEntity)) == 1) {
                    return await mainMenu(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case 22:
                if ((await settings(sourceEntity)) == 1) {
                    return await mainMenu(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case 23:
                if ((await managePlayers(sourceEntity)) == 1) {
                    return await mainMenu(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case 24:
                manageCommands(sourceEntity);
                return 0;
                break;
            case 25:
                try {
                    itemSelector(sourceEntity, sourceEntity).then((a) => {
                        if (!!a) {
                            itemEditorTypeSelection(sourceEntity, sourceEntity, a);
                        }
                    });
                }
                catch { }
                break;
            case 26:
                mapArtGenerator(sourceEntity);
                return 0;
                break;
            case 27:
                nbtStructureLoader(sourceEntity);
                return 0;
                break;
            case 28:
                return 0;
            default:
                return 1;
        }
    })
        .catch((e) => {
        console.error(e, e.stack);
        return 0;
    });
}
//# sourceMappingURL=mainMenu.js.map