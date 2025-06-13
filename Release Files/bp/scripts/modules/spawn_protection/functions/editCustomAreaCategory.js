import { EffectTypes, GameMode, Player } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { advancedCategoryPropertyDisplayNames, AdvancedProtectedAreaCategoryPropertyAllEnabledDefaults, AdvancedProtectedAreaCategoryPropertyAllEnabledDefaults_JSON, ProtectedAreas, } from "init/variables/protectedAreaVariables";
import { BlockMask } from "modules/commands/classes/BlockMask";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { customFormUICodes } from "modules/ui/constants/customFormUICodes";
import { selectTexturePreset } from "modules/ui/functions/selectTexturePreset";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import { getDetailedType } from "modules/utilities/functions/getDetailedType";
import { showActions } from "modules/utilities/functions/showActions";
import { showMessage } from "modules/utilities/functions/showMessage";
import { securityVariables } from "security/ultraSecurityModeUtils";
export async function editCustomAreaCategory(sourceEntity, categoryID) {
    if (arguments.length !== 2) {
        throw new TypeError(`Incorrect number of arguments to function. Expected 2, received ${arguments.length}.`);
    }
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    if (!(typeof categoryID === "string")) {
        throw new TypeError(`Native type conversion failed. Function argument [1] (categoryID) expected type string but got type ${getDetailedType(categoryID)} instead`);
    }
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(player, "andexdb.editCustomProtectedAreaCategories") == false) {
            const r = await showMessage(player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.editCustomProtectedAreaCategories", "Back", "Cancel");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    // While loop to reopen the menu without stack overflow errors.
    while (true) {
        const category = ProtectedAreas.areas.advancedAreaCategories.find((v) => v.id == categoryID);
        if (category === undefined)
            return ((await showMessage(player, "Invalid Category ID", `The custom protected area category with ID ${JSON.stringify(categoryID)} does not exist.`, "Back", "Close")).selection !== 1).toNumber();
        try {
            const form = new ActionFormData()
                .title(customFormUICodes.action.titles.formStyles.medium + "Edit Custom Category")
                .body(`ID: ${category.id}§r
Icon Path: ${category.icon_path ?? "None"}`)
                .button(customFormUICodes.action.buttons.positions.main_only + `Settings\n${!!category && category.enabled ? "§aEnabled" : "§cDisabled"}`, "textures/ui/icon_setting")
                .button(customFormUICodes.action.buttons.positions.main_only + "Apply Icon Texture Preset", "textures/items/map_locked")
                .button(`${customFormUICodes.action.buttons.positions.main_only}${category.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Block Placement Prevention\n${!!category.playerPlaceBlock && category.playerPlaceBlock.enabled !== false ? "§aEnabled" : "§cDisabled"}`, "textures/ui/pencil_edit_icon")
                .button(`${customFormUICodes.action.buttons.positions.main_only}${category.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Block Breaking Prevention\n${!!category.playerBreakBlock && category.playerBreakBlock.enabled !== false ? "§aEnabled" : "§cDisabled"}`, "textures/ui/pencil_edit_icon")
                .button(`${customFormUICodes.action.buttons.positions.main_only}${category.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Block Interaction Prevention\n${!!category.playerInteractWithBlock && category.playerInteractWithBlock.enabled !== false ? "§aEnabled" : "§cDisabled"}`, "textures/ui/pencil_edit_icon")
                .button(`${customFormUICodes.action.buttons.positions.main_only}Entity Interaction Prevention\n${!!category.playerInteractWithEntity && category.playerInteractWithEntity.enabled !== false ? "§aEnabled" : "§cDisabled"}`, "textures/ui/pencil_edit_icon")
                .button(`${customFormUICodes.action.buttons.positions.main_only}Item Use Prevention\n${!!category.itemUse && category.itemUse.enabled !== false ? "§aEnabled" : "§cDisabled"}`, "textures/ui/pencil_edit_icon")
                .button(`${customFormUICodes.action.buttons.positions.main_only}${category.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Explosion Prevention\n${!!category.explosion && category.explosion.enabled !== false ? "§aEnabled" : "§cDisabled"}`, "textures/ui/pencil_edit_icon")
                .button(`${customFormUICodes.action.buttons.positions.main_only}${category.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Entity Effect Add Prevention\n${!!category.effectAdd && category.effectAdd.enabled !== false ? "§aEnabled" : "§cDisabled"}`, "textures/ui/pencil_edit_icon")
                .button(`${customFormUICodes.action.buttons.positions.main_only}${category.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Player Chat Message Send Prevention\n${!!category.chatSend && category.chatSend.enabled !== false ? "§aEnabled" : "§cDisabled"}`, "textures/ui/pencil_edit_icon")
                .button(`${customFormUICodes.action.buttons.positions.main_only}${category.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Player Game Mode Change Prevention\n${!!category.playerGameModeChange && category.playerGameModeChange.enabled !== false ? "§aEnabled" : "§cDisabled"}`, "textures/ui/pencil_edit_icon")
                .button(`${customFormUICodes.action.buttons.positions.main_only}PVP Prevention\n${!!category.noPVPZone && category.noPVPZone.enabled !== false ? "§aEnabled" : "§cDisabled"}`, "textures/ui/pencil_edit_icon")
                .button(`${customFormUICodes.action.buttons.positions.main_only}Tag Area\n${!!category.tagZone && category.tagZone.enabled !== false ? "§aEnabled" : "§cDisabled"}`, "textures/ui/pencil_edit_icon")
                // .button(`${customFormUICodes.action.buttons.positions.main_only}Effect Area\n${!!category.effectZone && category.effectZone.enabled !== false ? "§aEnabled" : "§cDisabled"}`, "textures/ui/pencil_edit_icon")
                .button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left")
                .button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout")
                .button(customFormUICodes.action.buttons.positions.title_bar_only + "Delete", "textures/ui/trash_default")
                .button(customFormUICodes.action.buttons.positions.title_bar_only + "Duplicate", "textures/ui/copy")
                .button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh This Category", "textures/ui/refresh");
            const debugMode = config.system.debugMode;
            if (debugMode) {
                form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Raw Data\n§8(Debug Mode Only)", "textures/ui/debug_glyph_color");
            }
            const rb = await form.forceShow(player);
            if (rb.canceled)
                return 1;
            switch (cullUndefined([
                "settings",
                "applyIconTexturePreset",
                "playerPlaceBlock",
                "playerBreakBlock",
                "playerInteractWithBlock",
                "playerInteractWithEntity",
                "itemUse",
                // "itemUseOn",
                "explosion",
                "effectAdd",
                "chatSend",
                "playerGameModeChange",
                "noPVPZone",
                "tagZone",
                "back",
                "close",
                "delete",
                "duplicate",
                "refresh",
                debugMode ? "rawData" : undefined,
            ])[rb.selection]) {
                case "settings":
                    if ((await editCustomAreaCategorySettings(player, categoryID)) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "applyIconTexturePreset": {
                    const r = await selectTexturePreset(player);
                    if (r === 1) {
                        continue;
                    }
                    else if (r === 0) {
                        return 0;
                    }
                    else {
                        category.icon_path = r;
                        const out = JSON.parse(world.getDynamicProperty("advancedProtectedAreaCategory:" + categoryID));
                        out.icon_path = r;
                        world.setDynamicProperty("advancedProtectedAreaCategory:" + categoryID, JSON.stringify(out));
                        continue;
                    }
                }
                case "playerPlaceBlock":
                    if ((await editCustomAreaCategorySetting(player, categoryID, "playerPlaceBlock")) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "playerBreakBlock":
                    if ((await editCustomAreaCategorySetting(player, categoryID, "playerBreakBlock")) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "playerInteractWithBlock":
                    if ((await editCustomAreaCategorySetting(player, categoryID, "playerInteractWithBlock")) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "playerInteractWithEntity":
                    if ((await editCustomAreaCategorySetting(player, categoryID, "playerInteractWithEntity")) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "itemUse":
                    if ((await editCustomAreaCategorySetting(player, categoryID, "itemUse")) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "explosion":
                    if ((await editCustomAreaCategorySetting(player, categoryID, "explosion")) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "effectAdd":
                    if ((await editCustomAreaCategorySetting(player, categoryID, "effectAdd")) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "chatSend":
                    if ((await editCustomAreaCategorySetting(player, categoryID, "chatSend")) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "playerGameModeChange":
                    if ((await editCustomAreaCategorySetting(player, categoryID, "playerGameModeChange")) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "noPVPZone":
                    if ((await editCustomAreaCategorySetting(player, categoryID, "noPVPZone")) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "tagZone":
                    if ((await editCustomAreaCategorySetting(player, categoryID, "tagZone")) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "back":
                    return 1;
                case "close":
                    return 0;
                case "delete":
                    if (securityVariables.ultraSecurityModeEnabled) {
                        if (securityVariables.testPlayerForPermission(player, "andexdb.deleteCustomProtectedAreaCategories") == false) {
                            const r = await showMessage(player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.deleteCustomProtectedAreaCategories", "Back", "Cancel");
                            if (r.canceled || r.selection == 0) {
                                continue;
                            }
                            else {
                                return 0;
                            }
                        }
                    }
                    if ((await showMessage(player, "Are you sure?", "Are you sure you want to delete this category? This will also delete any linked protected areas.", "Cancel", "Delete")).selection === 1) {
                        ProtectedAreas.loadAreasForAdvancedCategory(categoryID);
                        [
                            ...ProtectedAreas.areas.advancedArea[categoryID].overworld,
                            ...ProtectedAreas.areas.advancedArea[categoryID].nether,
                            ...ProtectedAreas.areas.advancedArea[categoryID].the_end,
                        ].forEach((area) => {
                            world.setDynamicProperty("advancedProtectedArea:" + categoryID + ":" + area.id);
                        });
                        delete ProtectedAreas.areas.advancedArea[categoryID];
                        world.setDynamicProperty("advancedProtectedAreaCategory:" + categoryID);
                        delete ProtectedAreas.areas.advancedAreaCategories[ProtectedAreas.areas.advancedAreaCategories.findIndex((category) => category.id === categoryID)];
                        if ((await showMessage(player, "Category Deleted", "This protected area category has been successfully deleted.", "Back", "Close"))
                            .selection !== 1) {
                            return 1;
                        }
                        else {
                            return 0;
                        }
                    }
                    else {
                        if ((await showMessage(player, "Deletion Canceled", "The deletion of this protected area category has been successfully canceled.", "Back", "Close")).selection !== 1) {
                            continue;
                        }
                        else {
                            return 0;
                        }
                    }
                case "duplicate": {
                    if (securityVariables.ultraSecurityModeEnabled) {
                        if (securityVariables.testPlayerForPermission(player, "andexdb.createCustomProtectedAreaCategories") == false) {
                            const r = await showMessage(player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.createCustomProtectedAreaCategories", "Back", "Cancel");
                            if (r.canceled || r.selection == 0) {
                                continue;
                            }
                            else {
                                return 0;
                            }
                        }
                    }
                    const r = await duplicateCustomAreaCategory(player, categoryID);
                    switch (r) {
                        case 0:
                            return 0;
                        case 1:
                            continue;
                        case 2:
                            return 1;
                        default:
                            throw new Error(`Unknown return value from duplicateCustomAreaCategory: ${r}`);
                    } /*
                    return await showMessage(
                        sourceEntity as Player,
                        undefined,
                        "§cSorry, the ability to duplicate custom area categories is not yet implemented.",
                        "Back",
                        "Close"
                    ).then(async (r) => {
                        if (r.selection !== 1) {
                            continue;
                        } else {
                            return 0;
                        }
                    }); */
                }
                case "refresh":
                    ProtectedAreas.loadAdvancedCategory(categoryID);
                    continue;
                case "rawData":
                    if ((await showActions(player, customFormUICodes.action.titles.formStyles.medium + "Raw Data", JSONB.stringify(category, undefined, 4), [customFormUICodes.action.buttons.positions.main_only + "Done"], [customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left"], [customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout"])).selection !== 2) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                default:
                    throw new Error(`No action defined for button index ${rb.selection}.`);
            }
        }
        catch (e) {
            console.error(e, e.stack);
            // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
            return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        }
    }
}
/**
 * Duplicates a custom protected area category.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @param categoryID The ID of the category to duplicate.
 * @returns {Promise<0 | 1 | 2>} A promise that resolves to `0` if the previous menu should be closed, `1` if the previous menu should be reopened, or `2` if the menu before the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 *
 * The function performs the following steps:
 * 1. Validates the number of arguments and the type of the source entity.
 * 2. Checks if the player has the necessary permissions to create a custom protected area category.
 * 3. Checks if the category with the provided ID exists.
 * 4. Asks the player for a name for the new category.
 * 5. Duplicates the category with the provided ID.
 * 6. Calls `editCustomAreaCategory` to allow further editing of the newly created category.
 */
export async function duplicateCustomAreaCategory(sourceEntity, categoryID) {
    if (arguments.length !== 2) {
        throw new TypeError(`Incorrect number of arguments to function. Expected 2, received ${arguments.length}.`);
    }
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    if (!(typeof categoryID === "string")) {
        throw new TypeError(`Native type conversion failed. Function argument [1] (categoryID) expected type string but got type ${getDetailedType(categoryID)} instead`);
    }
    try {
        if (securityVariables.ultraSecurityModeEnabled) {
            if (securityVariables.testPlayerForPermission(player, "andexdb.createCustomProtectedAreaCategories") == false) {
                const r = await showMessage(player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.createCustomProtectedAreaCategories", "Back", "Cancel");
                if (r.canceled || r.selection == 0) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
        }
        const category = ProtectedAreas.areas.advancedAreaCategories.find((v) => v.id == categoryID);
        if (category === undefined)
            return ((await showMessage(player, "Invalid Category ID", `The custom protected area category with ID ${JSON.stringify(categoryID)} does not exist.`, "Back", "Close")).selection !== 1).toNumber();
        while (true) {
            const form = new ModalFormData();
            form.title(customFormUICodes.action.titles.formStyles.medium + "Duplicate Custom Area Category");
            form.textField("Enter the name for the new category:", "");
            form.submitButton("Duplicate");
            const r = await form.forceShow(player);
            if (r.canceled) {
                return 1;
            }
            const newName = r.formValues[0];
            if (newName === "") {
                if ((await showMessage(player, "Invalid Name", "You must enter a name for the category.", "Back", "Close")).selection !== 1) {
                    continue;
                }
                else {
                    return 0;
                }
            }
            world.setDynamicProperty("advancedProtectedAreaCategory:" + newName, JSON.stringify({ ...JSON.parse(world.getDynamicProperty("advancedProtectedAreaCategory:" + categoryID)), id: newName }));
            ProtectedAreas.loadAdvancedCategory(newName);
            if ((await editCustomAreaCategory(player, newName)) === 1) {
                return 2;
            }
            else {
                return 0;
            }
        }
    }
    catch (e) {
        console.error(e, e.stack);
        // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
        return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    }
}
export async function editCustomAreaCategorySettings(sourceEntity, categoryID) {
    if (arguments.length !== 2) {
        throw new TypeError(`Incorrect number of arguments to function. Expected 2, received ${arguments.length}.`);
    }
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    if (!(typeof categoryID === "string")) {
        throw new TypeError(`Native type conversion failed. Function argument [1] (categoryID) expected type string but got type ${getDetailedType(categoryID)} instead`);
    }
    try {
        if (securityVariables.ultraSecurityModeEnabled) {
            if (securityVariables.testPlayerForPermission(player, "andexdb.editCustomProtectedAreaCategories") == false) {
                const r = await showMessage(player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.editCustomProtectedAreaCategories", "Back", "Cancel");
                if (r.canceled || r.selection == 0) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
        }
        const category = ProtectedAreas.areas.advancedAreaCategories.find((v) => v.id == categoryID);
        if (category === undefined)
            return ((await showMessage(player, "Invalid Category ID", `The custom protected area category with ID ${JSON.stringify(categoryID)} does not exist.`, "Back", "Close")).selection !== 1).toNumber();
        const form = new ModalFormData();
        form.title(customFormUICodes.modal.titles.formStyles.medium + "Custom Area Category Settings"); /*
        form.textField(
            "Category ID",
            "string",
            category.id
        ) */
        form.toggle("Enabled\nWhether or not this protected area category is enabled. If disabled, then any areas in this category will cease to function until this is enabled.", { defaultValue: category.enabled ?? true });
        form.textField("Icon Path (Optional)", "string", { defaultValue: category.icon_path ?? "" });
        form.submitButton("Save");
        const r = await form.forceShow(player);
        if (r.canceled)
            return 1;
        category.enabled = r.formValues[0];
        category.icon_path = r.formValues[1];
        const out = JSON.parse(world.getDynamicProperty("advancedProtectedAreaCategory:" + categoryID));
        out.enabled = r.formValues[0];
        out.icon_path = r.formValues[1];
        world.setDynamicProperty("advancedProtectedAreaCategory:" + categoryID, JSON.stringify(out));
        return 1;
    }
    catch (e) {
        console.error(e, e.stack);
        // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
        return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    }
}
export async function editCustomAreaCategorySetting(sourceEntity, categoryID, setting) {
    if (arguments.length !== 3) {
        throw new TypeError(`Incorrect number of arguments to function. Expected 3, received ${arguments.length}.`);
    }
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    if (!(typeof categoryID === "string")) {
        throw new TypeError(`Native type conversion failed. Function argument [1] (categoryID) expected type string but got type ${getDetailedType(categoryID)} instead`);
    }
    if (!(typeof setting === "string")) {
        throw new TypeError(`Native type conversion failed. Function argument [2] (setting) expected type string but got type ${getDetailedType(categoryID)} instead`);
    }
    while (true) {
        try {
            if (securityVariables.ultraSecurityModeEnabled) {
                if (securityVariables.testPlayerForPermission(player, "andexdb.editCustomProtectedAreaCategories") == false) {
                    const r = await showMessage(player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.editCustomProtectedAreaCategories", "Back", "Cancel");
                    if (r.canceled || r.selection == 0) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
            }
            const category = ProtectedAreas.areas.advancedAreaCategories.find((v) => v.id == categoryID);
            if (category === undefined)
                return ((await showMessage(player, "Invalid Category ID", `The custom protected area category with ID ${JSON.stringify(categoryID)} does not exist.`, "Back", "Close")).selection !== 1).toNumber();
            const option = category[setting];
            const form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.medium + advancedCategoryPropertyDisplayNames[setting] + " Settings");
            form.body(`Edit custom area category settings for ${advancedCategoryPropertyDisplayNames[setting]} in ${categoryID}.`);
            form.button(`${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled !== false ? "§aEnabled" : "§cDisabled"}`, !!option && option.enabled ? "textures/ui/toggle_on" : "textures/ui/toggle_off");
            let optionsList = [];
            switch (setting) {
                case "playerPlaceBlock": {
                    // !!category[setting] && category[setting];
                    optionsList = ["allowedBypassTags", "heldItemFilters", "mask"];
                    const option = category[setting];
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Allowed Bypass Tags\n${!!option && !!option.allowedBypassTags
                        ? option.allowedBypassTags.length === 1
                            ? "1 tag"
                            : `${option.allowedBypassTags.length} tags`
                        : "0 tags"}`, "textures/ui/pencil_edit_icon");
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Held Item Filters\n${!!option && !!option.heldItemFilters
                        ? option.heldItemFilters.items.length === 1
                            ? `1 item ${option.heldItemFilters.mode ?? "exclude"}d`
                            : `${option.heldItemFilters.items.length} items ${option.heldItemFilters.mode ?? "exclude"}d`
                        : `0 items excluded`}`, "textures/ui/pencil_edit_icon");
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Block Mask\n${!!option && !!option.mask && option.mask.blocks.length !== 0
                        ? option.mask.blocks.length === 1
                            ? `1 block permutation ${option.mode ?? "exclude"}d`
                            : `${option.mask.blocks.length} blocks ${option.mode ?? "exclude"}d`
                        : `All Blocks`}`, "textures/ui/pencil_edit_icon");
                    break;
                }
                case "playerBreakBlock": {
                    optionsList = ["allowedBypassTags", "heldItemFilters", "mask"];
                    const option = category[setting];
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Allowed Bypass Tags\n${!!option && !!option.allowedBypassTags
                        ? option.allowedBypassTags.length === 1
                            ? "1 tag"
                            : `${option.allowedBypassTags.length} tags`
                        : "0 tags"}`, "textures/ui/pencil_edit_icon");
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Held Item Filters\n${!!option && !!option.heldItemFilters
                        ? option.heldItemFilters.items.length === 1
                            ? `1 item ${option.heldItemFilters.mode ?? "exclude"}d`
                            : `${option.heldItemFilters.items.length} items ${option.heldItemFilters.mode ?? "exclude"}d`
                        : `0 items excluded`}`, "textures/ui/pencil_edit_icon");
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Block Mask\n${!!option && !!option.mask && option.mask.blocks.length !== 0
                        ? option.mask.blocks.length === 1
                            ? `1 block permutation ${option.mode ?? "exclude"}d`
                            : `${option.mask.blocks.length} blocks ${option.mode ?? "exclude"}d`
                        : `All Blocks`}`, "textures/ui/pencil_edit_icon");
                    break;
                }
                case "playerInteractWithBlock": {
                    optionsList = ["allowedBypassTags", "heldItemFilters", "mask"];
                    const option = category[setting];
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Allowed Bypass Tags\n${!!option && !!option.allowedBypassTags
                        ? option.allowedBypassTags.length === 1
                            ? "1 tag"
                            : `${option.allowedBypassTags.length} tags`
                        : "0 tags"}`, "textures/ui/pencil_edit_icon");
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Held Item Filters\n${!!option && !!option.heldItemFilters
                        ? option.heldItemFilters.items.length === 1
                            ? `1 item ${option.heldItemFilters.mode ?? "exclude"}d`
                            : `${option.heldItemFilters.items.length} items ${option.heldItemFilters.mode ?? "exclude"}d`
                        : `0 items excluded`}`, "textures/ui/pencil_edit_icon");
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Block Mask\n${!!option && !!option.mask && option.mask.blocks.length !== 0
                        ? option.mask.blocks.length === 1
                            ? `1 block permutation ${option.mode ?? "exclude"}d`
                            : `${option.mask.blocks.length} blocks ${option.mode ?? "exclude"}d`
                        : `All Blocks`}`, "textures/ui/pencil_edit_icon");
                    break;
                }
                case "itemUse": {
                    optionsList = ["allowedBypassTags", "heldItemFilters"];
                    const option = category[setting];
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Allowed Bypass Tags\n${!!option && !!option.allowedBypassTags
                        ? option.allowedBypassTags.length === 1
                            ? "1 tag"
                            : `${option.allowedBypassTags.length} tags`
                        : "0 tags"}`, "textures/ui/pencil_edit_icon");
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Held Item Filters\n${!!option && !!option.heldItemFilters
                        ? option.heldItemFilters.items.length === 1
                            ? `1 item ${option.heldItemFilters.mode ?? "exclude"}d`
                            : `${option.heldItemFilters.items.length} items ${option.heldItemFilters.mode ?? "exclude"}d`
                        : `0 items excluded`}`, "textures/ui/pencil_edit_icon");
                    break;
                }
                case "explosion": {
                    optionsList = ["allowedBypassTags", "heldItemFilters", "mask", "sourceEntityFilter"];
                    const option = category[setting];
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Allowed Bypass Tags\n${!!option && !!option.allowedBypassTags
                        ? option.allowedBypassTags.length === 1
                            ? "1 tag"
                            : `${option.allowedBypassTags.length} tags`
                        : "0 tags"}`, "textures/ui/pencil_edit_icon");
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Held Item Filters\n${!!option && !!option.heldItemFilters
                        ? option.heldItemFilters.items.length === 1
                            ? `1 item ${option.heldItemFilters.mode ?? "exclude"}d`
                            : `${option.heldItemFilters.items.length} items ${option.heldItemFilters.mode ?? "exclude"}d`
                        : `0 items excluded`}`, "textures/ui/pencil_edit_icon");
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Block Mask\n${!!option && !!option.mask && option.mask.blocks.length !== 0
                        ? option.mask.blocks.length === 1
                            ? `1 block permutation ${option.mode ?? "exclude"}d`
                            : `${option.mask.blocks.length} blocks ${option.mode ?? "exclude"}d`
                        : `All Blocks`}`, "textures/ui/pencil_edit_icon");
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Source Entity Filter\n${!!option &&
                        !!option.sourceEntityFilter &&
                        (option.sourceEntityFilter.excludeTags?.length > 0 ||
                            option.sourceEntityFilter.includeTags?.length > 0 ||
                            option.sourceEntityFilter.excludeTypes?.length > 0 ||
                            option.sourceEntityFilter.includeTypes?.length > 0)
                        ? `${option.sourceEntityFilter.excludeTags?.length > 0
                            ? option.sourceEntityFilter.excludeTags.length === 1
                                ? `1 tag excluded`
                                : `${option.sourceEntityFilter.excludeTags.length} tags excluded`
                            : option.sourceEntityFilter.includeTags?.length > 0
                                ? option.sourceEntityFilter.includeTags?.length === 1
                                    ? `1 tag included`
                                    : `${option.sourceEntityFilter.includeTags.length} tags included`
                                : ""}${option.sourceEntityFilter.excludeTypes?.length > 0
                            ? option.sourceEntityFilter.excludeTypes.length === 1
                                ? `1 type excluded`
                                : `${option.sourceEntityFilter.excludeTypes.length} types excluded`
                            : option.sourceEntityFilter.includeTypes?.length > 0
                                ? option.sourceEntityFilter.includeTypes?.length === 1
                                    ? `1 type included`
                                    : `${option.sourceEntityFilter.includeTypes.length} types included`
                                : ""}`
                        : "No Filter"}`, "textures/ui/pencil_edit_icon");
                    break;
                }
                case "playerInteractWithEntity": {
                    optionsList = ["targetEntityFilter", "allowedBypassTags", "heldItemFilters"];
                    const option = category[setting];
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Target Entity Filter\n${!!option &&
                        !!option.targetEntityFilter &&
                        (option.targetEntityFilter.excludeTags?.length > 0 ||
                            option.targetEntityFilter.includeTags?.length > 0 ||
                            option.targetEntityFilter.excludeTypes?.length > 0 ||
                            option.targetEntityFilter.includeTypes?.length > 0)
                        ? `${option.targetEntityFilter.excludeTags?.length > 0
                            ? option.targetEntityFilter.excludeTags.length === 1
                                ? `1 tag excluded`
                                : `${option.targetEntityFilter.excludeTags.length} tags excluded`
                            : option.targetEntityFilter.includeTags?.length > 0
                                ? option.targetEntityFilter.includeTags?.length === 1
                                    ? `1 tag included`
                                    : `${option.targetEntityFilter.includeTags.length} tags included`
                                : ""}${option.targetEntityFilter.excludeTypes?.length > 0
                            ? option.targetEntityFilter.excludeTypes.length === 1
                                ? `1 type excluded`
                                : `${option.targetEntityFilter.excludeTypes.length} types excluded`
                            : option.targetEntityFilter.includeTypes?.length > 0
                                ? option.targetEntityFilter.includeTypes?.length === 1
                                    ? `1 type included`
                                    : `${option.targetEntityFilter.includeTypes.length} types included`
                                : ""}`
                        : "No Filter"}`, "textures/ui/pencil_edit_icon");
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Allowed Bypass Tags\n${!!option && !!option.allowedBypassTags
                        ? option.allowedBypassTags.length === 1
                            ? "1 tag"
                            : `${option.allowedBypassTags.length} tags`
                        : "0 tags"}`, "textures/ui/pencil_edit_icon");
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Held Item Filters\n${!!option && !!option.heldItemFilters
                        ? option.heldItemFilters.items.length === 1
                            ? `1 item ${option.heldItemFilters.mode ?? "exclude"}d`
                            : `${option.heldItemFilters.items.length} items ${option.heldItemFilters.mode ?? "exclude"}d`
                        : `0 items excluded`}`, "textures/ui/pencil_edit_icon");
                    break;
                }
                case "playerGameModeChange": {
                    optionsList = ["allowedBypassTags", "heldItemFilters", "gameModeFilters"];
                    const option = category[setting];
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Allowed Bypass Tags\n${!!option && !!option.allowedBypassTags
                        ? option.allowedBypassTags.length === 1
                            ? "1 tag"
                            : `${option.allowedBypassTags.length} tags`
                        : "0 tags"}`, "textures/ui/pencil_edit_icon");
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Held Item Filters\n${!!option && !!option.heldItemFilters
                        ? option.heldItemFilters.items.length === 1
                            ? `1 item ${option.heldItemFilters.mode ?? "exclude"}d`
                            : `${option.heldItemFilters.items.length} items ${option.heldItemFilters.mode ?? "exclude"}d`
                        : `0 items excluded`}`, "textures/ui/pencil_edit_icon");
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Game Mode Filters\n${!!option &&
                        ((!!option.fromGameModes && option.fromGameModes.length > 0) ||
                            (!!option.toGameModes && option.toGameModes.length > 0) ||
                            (!!option.fromGameModesToGameModes && option.fromGameModesToGameModes.length > 0))
                        ? (() => {
                            let filterCount = 0;
                            if (!!option.fromGameModes && option.fromGameModes.length > 0)
                                filterCount += option.fromGameModes.length;
                            if (!!option.toGameModes && option.toGameModes.length > 0)
                                filterCount += option.toGameModes.length;
                            if (!!option.fromGameModesToGameModes && option.fromGameModesToGameModes.length > 0)
                                filterCount += option.fromGameModesToGameModes.length;
                            return filterCount === 1 ? "1 filter" : `${filterCount} filters`;
                        })()
                        : `No Filters`}`, "textures/ui/pencil_edit_icon");
                    break;
                }
                case "chatSend": {
                    optionsList = ["allowedBypassTags", "heldItemFilters"];
                    const option = category[setting];
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Allowed Bypass Tags\n${!!option && !!option.allowedBypassTags
                        ? option.allowedBypassTags.length === 1
                            ? "1 tag"
                            : `${option.allowedBypassTags.length} tags`
                        : "0 tags"}`, "textures/ui/pencil_edit_icon");
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Held Item Filters\n${!!option && !!option.heldItemFilters
                        ? option.heldItemFilters.items.length === 1
                            ? `1 item ${option.heldItemFilters.mode ?? "exclude"}d`
                            : `${option.heldItemFilters.items.length} items ${option.heldItemFilters.mode ?? "exclude"}d`
                        : `0 items excluded`}`, "textures/ui/pencil_edit_icon");
                    break;
                }
                case "effectAdd": {
                    optionsList = ["effectFilter", "sourceEntityFilter"];
                    const option = category[setting];
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Effect Filter\n${!!option && !!option.effectFilter && (option.effectFilter.excludeTypes?.length > 0 || option.effectFilter.includeTypes?.length > 0)
                        ? option.effectFilter.excludeTypes?.length > 0
                            ? option.effectFilter.excludeTypes.length === 1
                                ? "1 effect excluded"
                                : `${option.effectFilter.excludeTypes.length} effects excluded`
                            : option.effectFilter.includeTypes.length === 1
                                ? "1 effect included"
                                : `${option.effectFilter.includeTypes.length} effects included`
                        : "All Effects"}${!!option && !!option.effectFilter && !Number.isNaN(Number(option.effectFilter.minDuration))
                        ? `, min duration: ${option.effectFilter.minDuration}`
                        : ""}${!!option && !!option.effectFilter && !Number.isNaN(Number(option.effectFilter.maxDuration))
                        ? `, max duration: ${option.effectFilter.maxDuration}`
                        : ""}`, "textures/ui/pencil_edit_icon");
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Source Entity Filter\n${!!option &&
                        !!option.sourceEntityFilter &&
                        (option.sourceEntityFilter.excludeTags?.length > 0 ||
                            option.sourceEntityFilter.includeTags?.length > 0 ||
                            option.sourceEntityFilter.excludeTypes?.length > 0 ||
                            option.sourceEntityFilter.includeTypes?.length > 0)
                        ? `${option.sourceEntityFilter.excludeTags?.length > 0
                            ? option.sourceEntityFilter.excludeTags.length === 1
                                ? `1 tag excluded`
                                : `${option.sourceEntityFilter.excludeTags.length} tags excluded`
                            : option.sourceEntityFilter.includeTags?.length > 0
                                ? option.sourceEntityFilter.includeTags?.length === 1
                                    ? `1 tag included`
                                    : `${option.sourceEntityFilter.includeTags.length} tags included`
                                : ""}${option.sourceEntityFilter.excludeTypes?.length > 0
                            ? option.sourceEntityFilter.excludeTypes.length === 1
                                ? `1 type excluded`
                                : `${option.sourceEntityFilter.excludeTypes.length} types excluded`
                            : option.sourceEntityFilter.includeTypes?.length > 0
                                ? option.sourceEntityFilter.includeTypes?.length === 1
                                    ? `1 type included`
                                    : `${option.sourceEntityFilter.includeTypes.length} types included`
                                : ""}`
                        : "No Filter"}`, "textures/ui/pencil_edit_icon");
                    break;
                }
                case "noPVPZone": {
                    if (entity_scale_format_version === null) {
                        optionsList = ["ignoredLabelOption"];
                        form.button(`${customFormUICodes.action.buttons.positions.main_only}${"§e8Crafter's Entity Scale Add-On is required for the no PVP zones to work."}`, "textures/ui/WarningGlyph");
                    }
                    // This one currently has no options.
                    break;
                }
                case "tagZone": {
                    optionsList = ["tags"];
                    const option = category[setting];
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Tags\n${!!option && !!option.tags ? (option.tags.length === 1 ? "1 tag" : `${option.tags.length} tags`) : "0 tags"}`, "textures/ui/pencil_edit_icon");
                    break;
                }
                default:
                    throw new Error("Invalid option type.");
            } /*
            form.button(
                `${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled}`,
                !!option && option.enabled ? "textures/ui/toggle_on" : "textures/ui/toggle_off"
            ); */
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            const r = await form.forceShow(player);
            if (r.canceled)
                return 1;
            switch (["toggle", undefined][r.selection] ?? (optionsList[r.selection - 1] ? optionsList[r.selection - 1] : undefined) ?? ["back", "close"][r.selection - optionsList.length - 1]) {
                case "toggle": {
                    if (!!category[setting]) {
                        if (category[setting].enabled === false) {
                            category[setting].enabled = true;
                        }
                        else {
                            category[setting].enabled = false;
                        }
                    }
                    else {
                        category[setting] = AdvancedProtectedAreaCategoryPropertyAllEnabledDefaults[setting];
                    }
                    const out = JSON.parse(world.getDynamicProperty("advancedProtectedAreaCategory:" + categoryID));
                    if (!!out[setting]) {
                        if (out[setting].enabled === false) {
                            out[setting].enabled = true;
                        }
                        else {
                            out[setting].enabled = false;
                        }
                    }
                    else {
                        out[setting] = AdvancedProtectedAreaCategoryPropertyAllEnabledDefaults_JSON[setting];
                    }
                    world.setDynamicProperty("advancedProtectedAreaCategory:" + categoryID, JSON.stringify(out));
                    continue;
                }
                case "allowedBypassTags": {
                    if (!!!category[setting]) {
                        if ((await showMessage(player, "Event Disabled", `${advancedCategoryPropertyDisplayNames[setting]} is disabled, so this menu cannot be accessed.`, "Back", "Cancel")).selection !== 1) {
                            continue;
                        }
                        else {
                            return 0;
                        }
                    }
                    if (!("allowedBypassTags" in category[setting]))
                        throw new Error("allowedBypassTags is not a property of this event");
                    let form = new ModalFormData();
                    form.title(customFormUICodes.modal.titles.formStyles.medium + "Allowed Bypass Tags");
                    form.textField("Allowed Bypass Tags", "Comma separated list.", {
                        defaultValue: category[setting].allowedBypassTags?.join(",") ?? "",
                    });
                    form.submitButton("Save");
                    const r = await form.forceShow(player);
                    if (r.canceled)
                        continue;
                    category[setting].allowedBypassTags = !!r
                        .formValues?.[0]
                        ? (r.formValues?.[0]).split(/,\s?/g)
                        : [];
                    const out = JSON.parse(world.getDynamicProperty("advancedProtectedAreaCategory:" + categoryID));
                    out[setting].allowedBypassTags = !!r.formValues?.[0]
                        ? (r.formValues?.[0]).split(/,\s?/g)
                        : [];
                    world.setDynamicProperty("advancedProtectedAreaCategory:" + categoryID, JSON.stringify(out));
                    continue;
                }
                case "effectFilter": {
                    if (!!!category[setting]) {
                        if ((await showMessage(player, "Event Disabled", `${advancedCategoryPropertyDisplayNames[setting]} is disabled, so this menu cannot be accessed.`, "Back", "Cancel")).selection !== 1) {
                            continue;
                        }
                        else {
                            return 0;
                        }
                    }
                    if (!("effectFilter" in category[setting]))
                        throw new Error("effectFilter is not a property of this event");
                    const catProp = category[setting];
                    let form = new ModalFormData();
                    form.title(customFormUICodes.modal.titles.formStyles.medium + "Effect Filter");
                    form.dropdown("Effect Filter Type\nInclude will cause only effects listed below to be blocked, exclude will cause all other effects to be blocked.", ["exclude", "include"], { defaultValueIndex: catProp.effectFilter?.excludeTypes?.length === 1 ? 0 : 1 });
                    form.textField(`Types\nList of effect types to allow or block.\nValid Effect Types: ${EffectTypes.getAll()
                        .map((t) => t.getName())
                        .join(", ")}\nComma separated list.`, "Comma separated list.", {
                        defaultValue: (category[setting].effectFilter?.excludeTypes?.length ?? 0) === 0
                            ? category[setting].effectFilter?.includeTypes?.join(",") ?? ""
                            : category[setting].effectFilter?.excludeTypes?.join(",") ?? "",
                    });
                    form.textField("Minimum Effect Duration\nThis will cause this to only block effects with a duration of at least this many seconds.\nLeave blank to have no minimum.", "int", { defaultValue: String(category[setting]?.effectFilter?.minDuration ?? "") });
                    form.textField("Maximum Effect Duration\nThis will cause this to only block effects with a duration of at most this many seconds.\nLeave blank to have no maximum.", "int", { defaultValue: String(category[setting]?.effectFilter?.maxDuration ?? "") });
                    form.submitButton("Save");
                    const r = await form.forceShow(player);
                    if (r.canceled)
                        continue;
                    const [mode, types, minDuration, maxDuration] = r.formValues;
                    catProp.effectFilter.excludeTypes = mode === 0 ? (types === "" ? [] : types.split(/,\s?/g)) : [];
                    catProp.effectFilter.includeTypes = mode === 1 ? (types === "" ? [] : types.split(/,\s?/g)) : [];
                    catProp.effectFilter.minDuration = minDuration === "" ? undefined : minDuration.toNumber();
                    catProp.effectFilter.maxDuration = maxDuration === "" ? undefined : maxDuration.toNumber();
                    const out = JSON.parse(world.getDynamicProperty("advancedProtectedAreaCategory:" + categoryID));
                    const outProp = out[setting];
                    outProp.effectFilter.excludeTypes =
                        r.formValues?.[0] === 0 ? (r.formValues?.[1] === "" ? [] : (r.formValues?.[1]).split(/,\s?/g)) : [];
                    outProp.effectFilter.includeTypes =
                        r.formValues?.[0] === 1 ? (r.formValues?.[1] === "" ? [] : (r.formValues?.[1]).split(/,\s?/g)) : [];
                    outProp.effectFilter.minDuration = minDuration === "" ? undefined : minDuration.toNumber();
                    outProp.effectFilter.maxDuration = maxDuration === "" ? undefined : maxDuration.toNumber();
                    world.setDynamicProperty("advancedProtectedAreaCategory:" + categoryID, JSON.stringify(out));
                    continue;
                }
                case "gameModeFilters": {
                    if (!!!category[setting]) {
                        if ((await showMessage(player, "Event Disabled", `${advancedCategoryPropertyDisplayNames[setting]} is disabled, so this menu cannot be accessed.`, "Back", "Cancel")).selection !== 1) {
                            continue;
                        }
                        else {
                            return 0;
                        }
                    }
                    if (!("fromGameModes" in category[setting]))
                        throw new Error("fromGameModes is not a property of this event");
                    if (!("toGameModes" in category[setting]))
                        throw new Error("toGameModes is not a property of this event");
                    if (!("fromGameModesToGameModes" in category[setting]))
                        throw new Error("fromGameModesToGameModes is not a property of this event");
                    let form = new ModalFormData();
                    form.title(customFormUICodes.modal.titles.formStyles.medium + "Game Mode Filter");
                    form.textField("To block all game mode changes, leave all of the text boxes below blank.\n\nFrom Game Modes\nA list of gamemodes that if the player is switching out of one of these gamemodes, it will be blocked.\nComma separated list.\nLeave blank to have no from game modes filter.", "Comma separated list.", {
                        defaultValue: category[setting].fromGameModes?.length === 0
                            ? category[setting].fromGameModes?.length === 0
                                ? category[setting].fromGameModes?.join(",") ?? ""
                                : ""
                            : category[setting].fromGameModes?.join(",") ?? "",
                    });
                    form.textField("To Game Modes\nA list of gamemodes that if the player is switching to one of these gamemodes, it will be blocked.\nComma separated list.\nLeave blank to have no to game modes filter.", "Comma separated list.", {
                        defaultValue: category[setting].fromGameModes?.length === 0
                            ? category[setting].fromGameModes?.length === 0
                                ? category[setting].fromGameModes?.join(",") ?? ""
                                : ""
                            : category[setting].fromGameModes?.join(",") ?? "",
                    });
                    form.textField('From Game Modes To Game Modes\nA JSON onject that if an array with arrays that each have two strings inside of it, if in any of these arrays, the first string matches the from gamemode and the second matches the to gamemode, it will be blocked.\nJSON: [from: string, to: string][]\nex. [["survival", "creative"], ["adventure", "spectator"]]\nLeave blank to have no from game modes to game modes filter.', "Comma separated list.", {
                        defaultValue: category[setting].fromGameModes?.length === 0
                            ? category[setting].fromGameModes?.length === 0
                                ? category[setting].fromGameModes?.join(",") ?? ""
                                : ""
                            : category[setting].fromGameModes?.join(",") ?? "",
                    });
                    form.submitButton("Save");
                    const r = await form.forceShow(player);
                    if (r.canceled)
                        continue;
                    const [fromGameModes, toGameModes, fromGameModesToGameModes] = r.formValues;
                    const catProp = category[setting];
                    catProp.fromGameModes = fromGameModes === "" ? [] : fromGameModes.split(/,\s?/g);
                    catProp.toGameModes = toGameModes === "" ? [] : toGameModes.split(/,\s?/g);
                    catProp.fromGameModesToGameModes =
                        fromGameModesToGameModes === "" ? [] : JSON.parse(fromGameModesToGameModes);
                    const out = JSON.parse(world.getDynamicProperty("advancedProtectedAreaCategory:" + categoryID));
                    const outProp = out[setting];
                    outProp.fromGameModes = fromGameModes === "" ? [] : fromGameModes.split(/,\s?/g);
                    outProp.toGameModes = toGameModes === "" ? [] : toGameModes.split(/,\s?/g);
                    outProp.fromGameModesToGameModes =
                        fromGameModesToGameModes === "" ? [] : JSON.parse(fromGameModesToGameModes);
                    world.setDynamicProperty("advancedProtectedAreaCategory:" + categoryID, JSON.stringify(out));
                    continue;
                }
                case "heldItemFilters": {
                    if (!!!category[setting]) {
                        if ((await showMessage(player, "Event Disabled", `${advancedCategoryPropertyDisplayNames[setting]} is disabled, so this menu cannot be accessed.`, "Back", "Cancel")).selection !== 1) {
                            continue;
                        }
                        else {
                            return 0;
                        }
                    }
                    if (!("heldItemFilters" in category[setting]))
                        throw new Error("heldItemFilters is not a property of this event");
                    const catProp = category[setting];
                    const catFilters = catProp?.heldItemFilters;
                    let form = new ModalFormData();
                    form.title(customFormUICodes.modal.titles.formStyles.medium + "Held Item Filters");
                    form.dropdown("Filter Type\nInclude will cause only players with held items listed below to be blocked, exclude will cause only players who are not holding one of the item types listed below to be blocked.", ["exclude", "include"], { defaultValueIndex: catFilters.mode === "exclude" ? 0 : 1 });
                    form.textField(`Item Types\nList of item types to allow or block. These should be item namespaced IDs.\nex. minecraft:stick,minecraft:diamond_pickaxe\nComma separated list.`, "Comma separated list.", { defaultValue: catFilters?.items?.length === 0 ? "" : catFilters?.items?.join(",") ?? "" });
                    form.submitButton("Save");
                    const r = await form.forceShow(player);
                    if (r.canceled)
                        continue;
                    const [mode, types] = r.formValues;
                    catFilters.mode = mode === 0 ? "exclude" : "include";
                    catFilters.items = types === "" ? [] : types.split(/,\s?/g);
                    const out = JSON.parse(world.getDynamicProperty("advancedProtectedAreaCategory:" + categoryID));
                    const outProp = out[setting];
                    const outFilters = outProp.heldItemFilters;
                    outFilters.mode = mode === 0 ? "exclude" : "include";
                    outFilters.items = types === "" ? [] : types.split(/,\s?/g);
                    world.setDynamicProperty("advancedProtectedAreaCategory:" + categoryID, JSON.stringify(out));
                    continue;
                }
                case "mask": {
                    if (!!!category[setting]) {
                        if ((await showMessage(player, "Event Disabled", `${advancedCategoryPropertyDisplayNames[setting]} is disabled, so this menu cannot be accessed.`, "Back", "Cancel")).selection !== 1) {
                            continue;
                        }
                        else {
                            return 0;
                        }
                    }
                    if (!("mask" in category[setting]))
                        throw new Error("mask is not a property of this event");
                    const catProp = category[setting];
                    let form = new ModalFormData();
                    form.title(customFormUICodes.modal.titles.formStyles.medium + "Block Mask");
                    form.dropdown("Mask Type\nInclude will cause only only blocks matching the block mask below to be blocked, exclude will cause only players who are not holding one of the item types listed below to be blocked.", ["exclude", "include"], { defaultValueIndex: +(catProp.mode === "include") });
                    form.textField(`Block Mask\nA block mask, more information is available at §bhttps://wiki.8crafter.com/andexdb/commands/parameter-types#mask§r.`, "Mask", { defaultValue: (catProp.rawmask ?? "") === "none" ? "" : String(catProp.rawmask ?? "") });
                    form.submitButton("Save");
                    const r = await form.forceShow(player);
                    if (r.canceled)
                        continue;
                    const [mode, mask] = r.formValues;
                    catProp.mode = mode === 0 ? "exclude" : "include";
                    catProp.mask = BlockMask.extract(mask === "" ? "none" : mask);
                    catProp.mask.type = catProp.mode;
                    catProp.rawmask = mask === "" ? "none" : mask;
                    const out = JSON.parse(world.getDynamicProperty("advancedProtectedAreaCategory:" + categoryID));
                    const outProp = out[setting];
                    outProp.mode = mode === 0 ? "exclude" : "include";
                    outProp.mask = mask === "" ? "none" : mask;
                    world.setDynamicProperty("advancedProtectedAreaCategory:" + categoryID, JSON.stringify(out));
                    continue;
                }
                case "sourceEntityFilter": {
                    if (!!!category[setting]) {
                        if ((await showMessage(player, "Event Disabled", `${advancedCategoryPropertyDisplayNames[setting]} is disabled, so this menu cannot be accessed.`, "Back", "Cancel")).selection !== 1) {
                            continue;
                        }
                        else {
                            return 0;
                        }
                    }
                    if (!("sourceEntityFilter" in category[setting]))
                        throw new Error("sourceEntityFilter is not a property of this event");
                    const catProp = category[setting];
                    let form = new ModalFormData();
                    form.title(customFormUICodes.modal.titles.formStyles.medium + "Source Entity Filter");
                    form.dropdown("Entity Type Filter Type\nInclude will cause only entity types listed below to be blocked, exclude will cause all other entity types to be blocked.", ["exclude", "include"], { defaultValueIndex: catProp.sourceEntityFilter?.includeTypes?.length === 0 ? 0 : 1 });
                    form.textField(`Entity Types\nList of entity types to allow or block.\nShould be entity namespaced IDs.\nComma separated list.`, "Comma separated list.", {
                        defaultValue: (category[setting].sourceEntityFilter?.excludeTypes?.length ?? 0) === 0
                            ? category[setting].sourceEntityFilter?.includeTypes?.join(",") ?? ""
                            : category[setting].sourceEntityFilter?.excludeTypes?.join(",") ?? "",
                    });
                    form.dropdown("Entity Tags Filter Type\nInclude will cause only entities with at least one of the tags listed below to be blocked, exclude will cause all other entities to be blocked.", ["exclude", "include"], { defaultValueIndex: catProp.sourceEntityFilter?.includeTags?.length === 0 ? 0 : 1 });
                    form.textField(`Entity Tags\nList of entity tags to allow or block.\nComma separated list.`, "Comma separated list.", {
                        defaultValue: (category[setting].sourceEntityFilter?.excludeTags?.length ?? 0) === 0
                            ? category[setting].sourceEntityFilter?.includeTags?.join(",") ?? ""
                            : category[setting].sourceEntityFilter?.excludeTags?.join(",") ?? "",
                    });
                    form.submitButton("Save");
                    const r = await form.forceShow(player);
                    if (r.canceled)
                        continue;
                    const [mode, types, tagsMode, tags] = r.formValues;
                    catProp.sourceEntityFilter.excludeTypes = mode === 0 ? (types === "" ? [] : types.split(/,\s?/g)) : [];
                    catProp.sourceEntityFilter.includeTypes = mode === 1 ? (types === "" ? [] : types.split(/,\s?/g)) : [];
                    catProp.sourceEntityFilter.excludeTags = tagsMode === 0 ? (tags === "" ? [] : tags.split(/,\s?/g)) : [];
                    catProp.sourceEntityFilter.includeTags = tagsMode === 1 ? (tags === "" ? [] : tags.split(/,\s?/g)) : [];
                    const out = JSON.parse(world.getDynamicProperty("advancedProtectedAreaCategory:" + categoryID));
                    const outProp = out[setting];
                    outProp.sourceEntityFilter.excludeTypes = mode === 0 ? (types === "" ? [] : types.split(/,\s?/g)) : [];
                    outProp.sourceEntityFilter.includeTypes = mode === 1 ? (types === "" ? [] : types.split(/,\s?/g)) : [];
                    outProp.sourceEntityFilter.excludeTags = tagsMode === 0 ? (tags === "" ? [] : tags.split(/,\s?/g)) : [];
                    outProp.sourceEntityFilter.includeTags = tagsMode === 1 ? (tags === "" ? [] : tags.split(/,\s?/g)) : [];
                    world.setDynamicProperty("advancedProtectedAreaCategory:" + categoryID, JSON.stringify(out));
                    continue;
                }
                case "targetEntityFilter": {
                    if (!!!category[setting]) {
                        if ((await showMessage(player, "Event Disabled", `${advancedCategoryPropertyDisplayNames[setting]} is disabled, so this menu cannot be accessed.`, "Back", "Cancel")).selection !== 1) {
                            continue;
                        }
                        else {
                            return 0;
                        }
                    }
                    if (!("targetEntityFilter" in category[setting]))
                        throw new Error("targetEntityFilter is not a property of this event");
                    const catProp = category[setting];
                    let form = new ModalFormData();
                    form.title(customFormUICodes.modal.titles.formStyles.medium + "Target Entity Filter");
                    form.dropdown("Entity Type Filter Type\nInclude will cause only entity types listed below to be blocked, exclude will cause all other entity types to be blocked.", ["exclude", "include"], { defaultValueIndex: catProp.targetEntityFilter?.includeTypes?.length === 0 ? 0 : 1 });
                    form.textField(`Entity Types\nList of entity types to allow or block.\nShould be entity namespaced IDs.\nComma separated list.`, "Comma separated list.", {
                        defaultValue: (catProp.targetEntityFilter?.excludeTypes?.length ?? 0) === 0
                            ? catProp.targetEntityFilter?.includeTypes?.join(",") ?? ""
                            : catProp.targetEntityFilter?.excludeTypes?.join(",") ?? "",
                    });
                    form.dropdown("Entity Tags Filter Type\nInclude will cause only entities with at least one of the tags listed below to be blocked, exclude will cause all other entities to be blocked.", ["exclude", "include"], { defaultValueIndex: catProp.targetEntityFilter?.includeTags?.length === 0 ? 0 : 1 });
                    form.textField(`Entity Tags\nList of entity tags to allow or block.\nComma separated list.`, "Comma separated list.", {
                        defaultValue: (catProp.targetEntityFilter?.excludeTags?.length ?? 0) === 0
                            ? catProp.targetEntityFilter?.includeTags?.join(",") ?? ""
                            : catProp.targetEntityFilter?.excludeTags?.join(",") ?? "",
                    });
                    form.submitButton("Save");
                    const r = await form.forceShow(player);
                    if (r.canceled)
                        continue;
                    const [mode, types, tagsMode, tags] = r.formValues;
                    catProp.targetEntityFilter.excludeTypes = mode === 0 ? (types === "" ? [] : types.split(/,\s?/g)) : [];
                    catProp.targetEntityFilter.includeTypes = mode === 1 ? (types === "" ? [] : types.split(/,\s?/g)) : [];
                    catProp.targetEntityFilter.excludeTags = tagsMode === 0 ? (tags === "" ? [] : tags.split(/,\s?/g)) : [];
                    catProp.targetEntityFilter.includeTags = tagsMode === 1 ? (tags === "" ? [] : tags.split(/,\s?/g)) : [];
                    const out = JSON.parse(world.getDynamicProperty("advancedProtectedAreaCategory:" + categoryID));
                    const outProp = out[setting];
                    outProp.targetEntityFilter.excludeTypes = mode === 0 ? (types === "" ? [] : types.split(/,\s?/g)) : [];
                    outProp.targetEntityFilter.includeTypes = mode === 1 ? (types === "" ? [] : types.split(/,\s?/g)) : [];
                    outProp.targetEntityFilter.excludeTags = tagsMode === 0 ? (tags === "" ? [] : tags.split(/,\s?/g)) : [];
                    outProp.targetEntityFilter.includeTags = tagsMode === 1 ? (tags === "" ? [] : tags.split(/,\s?/g)) : [];
                    world.setDynamicProperty("advancedProtectedAreaCategory:" + categoryID, JSON.stringify(out));
                    continue;
                }
                case "tags":
                    if (!!!category[setting]) {
                        if ((await showMessage(player, "Event Disabled", `${advancedCategoryPropertyDisplayNames[setting]} is disabled, so this menu cannot be accessed.`, "Back", "Cancel")).selection !== 1) {
                            continue;
                        }
                        else {
                            return 0;
                        }
                    }
                    if (!("tags" in category[setting]))
                        throw new Error("tags is not a property of this event");
                    const catProp = category[setting];
                    let form = new ModalFormData();
                    form.title(customFormUICodes.modal.titles.formStyles.medium + "Tag Zone Tags");
                    form.textField("Tags\nThis is a comma-separated list of tags to will be given to players entering this area.", "Comma separated list.", {
                        defaultValue: catProp.tags?.join(",") ?? "",
                    });
                    form.toggle("Remove Tags On Exit\nWhether or not to remove the tags given to players entering this area when they exit.", {
                        defaultValue: catProp.removeOnExit ?? false,
                    });
                    form.submitButton("Save");
                    const r = await form.forceShow(player);
                    if (r.canceled)
                        continue;
                    catProp.tags = !!r.formValues?.[0] ? (r.formValues?.[0]).split(/,\s?/g) : [];
                    catProp.removeOnExit = r.formValues?.[1];
                    const out = JSON.parse(world.getDynamicProperty("advancedProtectedAreaCategory:" + categoryID));
                    const outProp = out[setting];
                    outProp.tags = !!r.formValues?.[0] ? (r.formValues?.[0]).split(/,\s?/g) : [];
                    outProp.removeOnExit = r.formValues?.[1];
                    world.setDynamicProperty("advancedProtectedAreaCategory:" + categoryID, JSON.stringify(out));
                    continue;
                case "back":
                    return 1;
                case "close":
                    return 0;
            }
        }
        catch (e) {
            console.error(e, e.stack);
            // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
            return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        }
    }
}
//# sourceMappingURL=editCustomAreaCategory.js.map