import { Player } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { AdvancedProtectedAreaCategoryPropertyAllEnabledDefaults, AdvancedProtectedAreaCategoryPropertyAllEnabledDefaults_JSON, ProtectedAreas, } from "init/variables/protectedAreaVariables";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { customFormUICodes } from "modules/ui/constants/customFormUICodes";
import { getDetailedType } from "modules/utilities/functions/getDetailedType";
import { showMessage } from "modules/utilities/functions/showMessage";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { editCustomAreaCategory } from "./editCustomAreaCategory";
export const customAreaCategoryIDPlaceholders = ((obj) => obj)([
    "noTrapdoorFlippingArea",
    "spawn",
    "noChatZone",
    "indestructableGlassArea",
]);
/**
 * Creates a new custom area category for protected areas.
 *
 * @param {executeCommandPlayerW | Entity | Player} sourceEntitya The source entity, which can be an instance of `executeCommandPlayerW`, `Entity`, or `Player`.
 * @returns A promise that resolves to a number indicating the result of the operation.
 *
 * @throws {TypeError} If the number of arguments is incorrect or if the provided entity is not a valid `Player`.
 *
 * The function performs the following steps:
 * 1. Validates the number of arguments and the type of the source entity.
 * 2. Checks if the player has the necessary permissions to create a custom protected area category.
 * 3. Displays a form to the player to input the category ID and icon path.
 * 4. Validates the uniqueness of the category ID and prompts the player to overwrite if a duplicate is found.
 * 5. Saves the new category.
 * 6. Calls `editCustomAreaCategory` to allow further editing of the newly created category.
 */
export async function newCustomAreaCategory(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (arguments.length !== 1) {
        throw new TypeError(`Incorrect number of arguments to function. Expected 1, received ${arguments.length}.`);
    }
    if (!(sourceEntity instanceof Player)) {
        throw new TypeError("Invalid Player. Function argument [0] (sourceEntitya) expected an instance of the Player class, or an instance of the executeCommandPlayerW class with a Player linked to it, but instead got " +
            getDetailedType(sourceEntity) +
            ".");
    }
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.createCustomProtectedAreaCategories") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.createCustomProtectedAreaCategories.", "Back", "Cancel");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    const category_JSON = {
        enabled: true,
        id: "",
    };
    // const category_JSON = JSON.parse(JSON.stringify(AdvancedProtectedAreaCategoryPropertyAllEnabledDefaults_JSON)) as AdvancedProtectedAreaCategory<true>;
    // (Object.keys(category_JSON) as (keyof typeof category_JSON)[]).filter((key) => !["enabled", "id", "icon_path"].includes(key)).forEach((key: Exclude<keyof AdvancedProtectedAreaCategory, "icon_path" | "id" | "enabled">) => ((category_JSON[key] as Exclude<typeof category_JSON[typeof key], false>).enabled = false));
    const form = new ModalFormData();
    form.title(customFormUICodes.modal.titles.formStyles.medium + "Create Custom Area Category");
    form.textField("Category ID§c*§r\nThe ID of this category, this must be unique. It may not contain colons.", customAreaCategoryIDPlaceholders.randomElement());
    form.textField("Icon Path", "string?");
    form.submitButton("Create Category");
    const r = await form.forceShow(sourceEntity);
    if (r.canceled)
        return 1;
    category_JSON.id = r.formValues[0].replaceAll(":", "");
    category_JSON.icon_path = r.formValues[1];
    const category = {
        enabled: true,
        id: "",
    };
    if (ProtectedAreas.areas.advancedAreaCategories.findIndex((c) => c.id === category_JSON.id) !== -1 ||
        world.getDynamicProperty("advancedProtectedAreaCategory:" + category_JSON.id) !== undefined) {
        const r = await new ActionFormData()
            .title(customFormUICodes.action.titles.formStyles.medium + "Duplicate Category ID")
            .body("A category with the ID " + category_JSON.id + " already exists.\nDo you want to overwrite it?\nThis action cannot be undone.")
            .button("Overwrite", "textures/ui/WarningGlyph")
            .button("Cancel", "textures/ui/crossout")
            .forceShow(sourceEntity);
        if (r.canceled || r.selection === 1) {
            return 1;
        }
        else if (r.selection === 0) {
            if (ProtectedAreas.areas.advancedAreaCategories.findIndex((c) => c.id === category_JSON.id) !== -1) {
                ProtectedAreas.areas.advancedAreaCategories.splice(ProtectedAreas.areas.advancedAreaCategories.findIndex((c) => c.id === category_JSON.id), 1); // Deletes the category from the list of loaded categories.
            }
            // Deleting the dynamic property is not necessary, as the saving of the new area category will overwrite it.
        }
    }
    ProtectedAreas.areas.advancedAreaCategories.push({ ...category, id: category_JSON.id, icon_path: category_JSON.icon_path }); // Loads the category.
    ProtectedAreas.areas.advancedArea[category_JSON.id] = {
        overworld: [],
        nether: [],
        the_end: [],
    };
    world.setDynamicProperty("advancedProtectedAreaCategory:" + category_JSON.id, JSON.stringify(category_JSON)); // Saves the category.
    return await editCustomAreaCategory(sourceEntity, category_JSON.id);
}
//# sourceMappingURL=newCustomAreaCategory.js.map