import { Player } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { showActions } from "modules/utilities/functions/showActions";
import { vTStr } from "modules/commands/functions/vTStr";
import { showMessage } from "modules/utilities/functions/showMessage";
import { coordinatesB } from "modules/coordinates/functions/coordinatesB";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import { customFormUICodes } from "../constants/customFormUICodes";
import { selectTexturePreset } from "./selectTexturePreset";
/**
 * Shows the manage warps UI to the player.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 *
 * The function performs the following steps:
 * 1. Validates the number of arguments and the type of the source entity.
 * 2. Checks if the player has the necessary permissions to create a custom protected area category.
 * 3. Checks if the warps system is enabled.
 * 4. Shows the manage warps UI to the player.
 * 5. Handles the player's response to the UI, and calls the function according to the response.
 */
export async function manageWarps(sourceEntity) {
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
            if (securityVariables.ultraSecurityModeEnabled) {
                if (securityVariables.testPlayerForPermission(player, "andexdb.accessManageWarpsUI") == false) {
                    const r = await showMessage(player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessManageWarpsUI", "Okay", "Cancel");
                    if (r.canceled || r.selection == 0) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
            }
            else if (!player.hasTag("admin")) {
                const r = await showMessage(player, "Access Denied (403)", "You do not have permission to access this menu. You need the following tag to access this menu: admin", "Okay", "Cancel");
                if (r.canceled || r.selection == 0) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
            let form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.medium + "Manage Warps");
            const warps = config.warpsSystem.warps;
            warps.forEach((w) => form.button(customFormUICodes.action.buttons.positions.main_only + w.displayName, w.icon));
            form.button(customFormUICodes.action.buttons.positions.main_only + "Add Warp", "textures/ui/color_plus");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            const r = await form.forceShow(player);
            if (r.canceled)
                return 1;
            switch ((!!warps[r.selection] ? "warp" : undefined) ?? ["newWarp", "back", "close"][r.selection - warps.length]) {
                case "warp": {
                    const warp = warps[r.selection];
                    const warpsb = warps.filter((w) => w !== warp);
                    switch (["applyIconTexturePreset", "move", "edit", "delete", "back", "close"][(await showActions(player, customFormUICodes.action.titles.formStyles.medium + "Warp Details", `${warp.displayName}\nDimension: ${dimensionTypeDisplayFormattingD[warp.dimension]}\nLocation: ${vTStr(warp.location)}\nIcon: ${warp.icon}`, [customFormUICodes.action.buttons.positions.main_only + "Apply Icon Texture Preset", "textures/items/map_locked"], [customFormUICodes.action.buttons.positions.main_only + "Move", "textures/ui/move"], [customFormUICodes.action.buttons.positions.main_only + "Edit", "textures/ui/pencil_edit_icon"], [customFormUICodes.action.buttons.positions.main_only + "Delete", "textures/ui/trash_default"], [customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left"], [customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout"]))?.selection ?? 4]) {
                        case "applyIconTexturePreset": {
                            const r = await selectTexturePreset(player);
                            if (r === 1) {
                                continue;
                            }
                            else if (r === 0) {
                                return 0;
                            }
                            else {
                                warp.icon = r;
                                config.warpsSystem.warps = warps;
                                continue;
                            }
                        }
                        case "move": {
                            const r = await showActions(player, customFormUICodes.action.titles.formStyles.medium + "Move Warp", "Would you like to move this warp above or below another warp?", [customFormUICodes.action.buttons.positions.main_only + "Move Above", "textures/ui/chevron_white_up"], [customFormUICodes.action.buttons.positions.main_only + "Move Below", "textures/ui/chevron_white_down"], [customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left"], [customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout"]);
                            if (r.canceled || r.selection === 2) {
                                continue;
                            }
                            if (r.selection === 3) {
                                return 0;
                            }
                            let form = new ActionFormData();
                            form.title(customFormUICodes.action.titles.formStyles.medium + "Move Warp");
                            form.body(`Select the warp you would like to move this warp ${r.selection === 0 ? "above" : "below"}.`);
                            warpsb.forEach((w) => form.button(customFormUICodes.action.buttons.positions.main_only + w.displayName, w.icon));
                            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
                            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
                            const rb = await form.forceShow(player);
                            if (rb.canceled || rb.selection === warpsb.length) {
                                continue;
                            }
                            if (rb.selection === warpsb.length + 1) {
                                return 0;
                            }
                            const destinationIndex = rb.selection + r.selection;
                            const currentWarps = config.warpsSystem.warps;
                            currentWarps.splice(currentWarps.findIndex((w) => w.displayName === warp.displayName), 1);
                            currentWarps.splice(destinationIndex, 0, warp);
                            config.warpsSystem.warps = currentWarps;
                            continue;
                        }
                        case "edit": {
                            const r = await new ModalFormData()
                                .title(customFormUICodes.modal.titles.formStyles.medium + "Edit Warp")
                                .textField(`Warp Display Name`, "Warp Name", { defaultValue: warp.displayName })
                                .textField(`Warp Location. ex. 172.41 76 29.5`, "x y z", { defaultValue: vTStr(warp.location) })
                                .dropdown("Warp Dimension", dimensionsd.map((d) => dimensionTypeDisplayFormattingE[d]), { defaultValueIndex: dimensionsd.indexOf(warp.dimension) })
                                .textField(`Warp Button Icon Path. (Optional)`, "textures/items/ender_pearl", { defaultValue: warp.icon })
                                .submitButton("Save Changes")
                                .forceShow(player);
                            if (r.canceled) {
                                continue;
                            }
                            if (r.formValues?.[0] === "") {
                                if ((await showMessage(player, "Error", `§cPlease specify a name for the warp.`, "Back", "Close")).selection === 0) {
                                    continue;
                                }
                                else {
                                    return 0;
                                }
                            }
                            if (r.formValues?.[1] === "") {
                                if ((await showMessage(player, "Error", `§cPlease specify a location for the warp.`, "Back", "Close")).selection === 0) {
                                    continue;
                                }
                                else {
                                    return 0;
                                }
                            }
                            if (warp.displayName !== r.formValues?.[0] && !!warps.find((w) => w.displayName === r.formValues?.[0])) {
                                if ((await showMessage(player, "Error", `§cYou already have a warp with this name.`, "Back", "Close")).selection === 0) {
                                    continue;
                                }
                                else {
                                    return 0;
                                }
                            }
                            warp.dimension = dimensionsd[r.formValues?.[2]];
                            warp.displayName = r.formValues?.[0];
                            warp.location = coordinatesB(r.formValues?.[1], player.location, player.getViewDirection());
                            warp.icon = r.formValues?.[3] !== "" ? r.formValues?.[3] : undefined;
                            config.warpsSystem.warps = warps;
                            continue;
                        }
                        case "delete": {
                            if ((await showMessage(player, "Are You Sure?", "Are you sure you want to delete this warp!?\nThis action cannot be undone!", "Cancel", "Confirm")).selection == 1) {
                                config.warpsSystem.warps = warpsb;
                            }
                            continue;
                        }
                        case "back":
                            continue;
                        case "close":
                            return 0;
                        default:
                            throw new Error("Invalid selection: " + r.selection);
                    }
                }
                case "newWarp": {
                    const r = await new ModalFormData()
                        .title(customFormUICodes.modal.titles.formStyles.medium + "New Warp")
                        .textField(`Please enter the name for the new warp below.`, "Warp Name")
                        .textField(`Please enter the coordinates for the new warp below (put ~~~ to use your current location). ex. 172.41 76 29.5`, "x y z")
                        .dropdown("Please select the dimension for the new warp below.", dimensionsd.map((d) => dimensionTypeDisplayFormattingE[d]), { defaultValueIndex: dimensions.indexOf(player.dimension) })
                        .textField(`Enter the path to an icon for the warp button below. (Optional)`, "textures/items/ender_pearl")
                        .submitButton("Create Warp")
                        .forceShow(player);
                    if (r.canceled) {
                        continue;
                    }
                    if (r.formValues?.[0] === "") {
                        if ((await showMessage(player, "Error", `§cPlease specify a name for the warp.`, "Back", "Close")).selection === 0) {
                            continue;
                        }
                        else {
                            return 0;
                        }
                    }
                    if (r.formValues?.[1] === "") {
                        if ((await showMessage(player, "Error", `§cPlease specify a location for the warp.`, "Back", "Close")).selection === 0) {
                            continue;
                        }
                        else {
                            return 0;
                        }
                    }
                    if (!!warps.find((w) => w.displayName === r.formValues?.[0])) {
                        if ((await showMessage(player, "Error", `§cYou already have a warp with this name.`, "Back", "Close")).selection === 0) {
                            continue;
                        }
                        else {
                            return 0;
                        }
                    }
                    const dimension = dimensionsd[r.formValues?.[2]];
                    const displayName = r.formValues?.[0];
                    const location = coordinatesB(r.formValues?.[1], player.location, player.getViewDirection());
                    const icon = r.formValues?.[3] !== "" ? r.formValues?.[3] : undefined;
                    config.warpsSystem.warps = [
                        ...config.warpsSystem.warps,
                        {
                            dimension,
                            displayName,
                            location,
                            icon,
                        },
                    ];
                    if ((await showMessage(player, "Warp Created", `You have successfully created a new warp with the name ${JSON.stringify(displayName)}, at ${vTStr(location)} in ${dimensionTypeDisplayFormatting[dimension]}, with ${icon === undefined ? "no icon" : "the icon " + JSON.stringify(icon)}.`, "Okay", "Close")).selection !== 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
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
//# sourceMappingURL=manageWarps.js.map