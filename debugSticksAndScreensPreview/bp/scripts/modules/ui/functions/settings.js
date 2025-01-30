import { Entity, Player, world } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { advancedSettings } from "./advancedSettings";
import { chatRanksSettings } from "./chatRanksSettings";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { evalAutoScriptSettings } from "./evalAutoScriptSettings";
import { extraFeaturesSettings } from "./extraFeaturesSettings";
import { globalSettings } from "./globalSettings";
import { homeSystemSettings } from "./homeSystemSettings";
import { manageGameRulesUI } from "./manageGameRulesUI";
import { notificationsSettings } from "./notificationsSettings";
import { personalSettings } from "./personalSettings";
import { scriptSettings } from "./scriptSettings";
import { tpaSettings } from "./tpaSettings";
import { uiSettings } from "./uiSettings";
import { editModuleImportsConfig } from "./editModuleImportsConfig";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
import { moneySystemSettings } from "./moneySystemSettings";
export async function settings(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessSettings") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSettings", "Back", "Cancel");
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
    form.title("Settings");
    form.body("Choose menu to open. ");
    form.button("Global Settings", "textures/ui/worldsIcon");
    form.button("Chat Ranks Settings", "textures/ui/message");
    form.button("Script Settings", "textures/ui/debug_glyph_color");
    form.button("UI Settings", "textures/ui/feedIcon");
    form.button("Eval Auto Execute Settings", "textures/ui/automation_glyph_color");
    form.button("Personal Settings", "textures/ui/profile_glyph_color");
    form.button("Notifications Settings", "textures/ui/icon_bell");
    form.button("Home System Settings", "textures/ui/store_home_icon");
    form.button("TPA System Settings", "textures/items/ender_pearl");
    form.button("Money System Settings", "textures/items/emerald");
    form.button("Module Imports", "textures/ui/import");
    form.button("Manage Game Rules", "textures/ui/controller_glyph_color");
    form.button("Extra Features", "textures/ui/color_plus");
    form.button("Advanced", "textures/ui/creator_glyph_color");
    form.button("Back", "textures/ui/arrow_left");
    form.button("Close", "textures/ui/crossout"); /*
form.button("Debug Screen", "textures/ui/ui_debug_glyph_color");*/
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        // This will stop the code when the player closes the form
        if (r.canceled)
            return 1;
        let response = r.selection;
        switch (response) {
            case 0:
                if ((await globalSettings(sourceEntity)) == 1) {
                    return await settings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case 1:
                if ((await chatRanksSettings(sourceEntity)) == 1) {
                    return await settings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case 2:
                if ((await scriptSettings(sourceEntity)) == 1) {
                    return await settings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case 3:
                if ((await uiSettings(sourceEntity)) == 1) {
                    return await settings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case 4:
                if ((await evalAutoScriptSettings(sourceEntity)) == 1) {
                    return await settings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case 5:
                if ((await personalSettings(sourceEntity)) == 1) {
                    return await settings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case 6:
                if ((await notificationsSettings(sourceEntity)) == 1) {
                    return await settings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case 7:
                if ((await homeSystemSettings(sourceEntity)) == 1) {
                    return await settings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case 8:
                if ((await tpaSettings(sourceEntity)) == 1) {
                    return await settings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case 9:
                if ((await moneySystemSettings(sourceEntity)) == 1) {
                    return await settings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case 10:
                if ((await editModuleImportsConfig(sourceEntity)) == 1) {
                    return await settings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case 11:
                if ((await manageGameRulesUI(sourceEntity)) == 1) {
                    return await settings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case 12:
                if ((await extraFeaturesSettings(sourceEntity)) == 1) {
                    return await settings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case 13:
                if ((await advancedSettings(sourceEntity)) == 1) {
                    return await settings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case 14:
                return 1;
            case 15:
                return 0;
            default:
                return 1;
        }
    })
        .catch((e) => {
        console.error(e, e.stack);
        return -2;
    });
}
//# sourceMappingURL=settings.js.map