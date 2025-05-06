import { Player } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { texturePresets } from "Assets/constants/texturePresets";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showMessage } from "modules/utilities/functions/showMessage";
import { customFormUICodes } from "../constants/customFormUICodes";
import { forceShow } from "./forceShow";
export async function selectTexturePreset(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (!(sourceEntity instanceof Player)) {
        throw new TypeError("Invalid Player. Expected an instance of the Player class, or an instance of the executeCommandPlayerW class with a Player linked to it, but instead got " +
            (typeof sourceEntity == "object"
                ? sourceEntity === null
                    ? "object[null]"
                    : "object[" + (sourceEntity.constructor.name ?? "unknown") + "]"
                : typeof sourceEntity) +
            ".");
    }
    let form = new ActionFormData();
    form.title(customFormUICodes.action.titles.formStyles.gridMenu + "Select Texture Preset");
    const keys = Object.keys(texturePresets).filter(k => texturePresets[k].visibilityConditions());
    keys.forEach((key) => {
        form.button(customFormUICodes.action.buttons.positions.main_only + texturePresets[key].displayName, texturePresets[key].icon);
    });
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    const r = await forceShow(form, sourceEntitya);
    if (r.canceled || r.selection === keys.length)
        return 1;
    if (r.selection === keys.length + 1)
        return 0;
    const rb = await selectTexturePresetInCategory(sourceEntity, keys[r.selection]);
    if (rb === 1)
        return await selectTexturePreset(sourceEntity);
    if (rb === 0)
        return 0;
    return rb;
}
export async function selectTexturePresetInCategory(sourceEntitya, category, pagen = 0, search, cachedTextures) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (!(sourceEntity instanceof Player)) {
        throw new TypeError("Invalid Player. Expected an instance of the Player class, or an instance of the executeCommandPlayerW class with a Player linked to it, but instead got " +
            (typeof sourceEntity == "object"
                ? sourceEntity === null
                    ? "object[null]"
                    : "object[" + (sourceEntity.constructor.name ?? "unknown") + "]"
                : typeof sourceEntity) +
            ".");
    }
    let form = new ActionFormData();
    const page = Math.max(0, pagen);
    const textures = cachedTextures ?? [];
    if (cachedTextures === undefined) {
        const data = texturePresets[category].texture_data;
        if (data instanceof Array) {
            data.forEach((texture) => {
                if (!!search) {
                    if (search.caseSensitive ? !texture.includes(search.value) : !texture.toLowerCase().includes(search.value.toLowerCase())) {
                        return;
                    }
                }
                textures.push([customFormUICodes.action.buttons.positions.main_only + texture, texture]);
            });
        }
        else {
            const entries = Object.entries(data);
            entries.forEach(([key, value]) => {
                if (typeof value.textures === "string") {
                    if (!!search) {
                        if (search.caseSensitive
                            ? !(key.includes(search.value) || value.textures.includes(search.value))
                            : !(key.toLowerCase().includes(search.value.toLowerCase()) || value.textures.toLowerCase().includes(search.value.toLowerCase()))) {
                            return;
                        }
                    }
                    textures.push([customFormUICodes.action.buttons.positions.main_only + key, value.textures]);
                }
                else if (value.textures instanceof Array) {
                    value.textures.forEach((icon, index) => {
                        if (typeof icon === "object") {
                            if (!!search) {
                                if (search.caseSensitive
                                    ? !(key.includes(search.value) || icon.path.includes(search.value))
                                    : !(key.toLowerCase().includes(search.value.toLowerCase()) || icon.path.toLowerCase().includes(search.value.toLowerCase()))) {
                                    return;
                                }
                            }
                            textures.push([customFormUICodes.action.buttons.positions.main_only + key + "[" + index + "]", icon.path]);
                        }
                        else {
                            if (!!search) {
                                if (search.caseSensitive
                                    ? !(key.includes(search.value) || icon.includes(search.value))
                                    : !(key.toLowerCase().includes(search.value.toLowerCase()) || icon.toLowerCase().includes(search.value.toLowerCase()))) {
                                    return;
                                }
                            }
                            textures.push([customFormUICodes.action.buttons.positions.main_only + key + "[" + index + "]", icon]);
                        }
                    });
                }
            });
        }
    }
    form.title(`${customFormUICodes.action.titles.formStyles.gridMenu}${!!search ? "Search Results" : "Select Texture Preset"} ${Math.min(textures.length, page * 9 + 1)}-${Math.min(textures.length, (page + 1) * 9)} of ${textures.length}`);
    const numpages = Math.ceil(textures.length / 9);
    if (!!search) {
        form.body(`Searching for: ${JSON.stringify(search.value)}\nCase Sensitive: ${JSON.stringify(search.caseSensitive ?? false)}`);
    }
    form.button(customFormUICodes.action.buttons.positions.left_side_only + "Search", "textures/ui/spyglass_flat");
    form.button(customFormUICodes.action.buttons.positions.left_side_only +
        (page != 0 ? "" : customFormUICodes.action.buttons.options.disabled + "§8") +
        "Previous Page", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.left_side_only +
        (numpages > 1 ? "" : customFormUICodes.action.buttons.options.disabled + "§8") +
        "Go To Page", "textures/ui/page");
    form.button(customFormUICodes.action.buttons.positions.left_side_only +
        (page < numpages - 1 ? "" : customFormUICodes.action.buttons.options.disabled + "§8") +
        "Next Page", "textures/ui/arrow_right");
    // Padding
    form.button("");
    form.button("");
    const texturesB = textures.slice(page * 9, (page + 1) * 9);
    texturesB.forEach(([displayName, icon]) => {
        form.button(displayName, icon);
    });
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    return await forceShow(form, sourceEntity)
        .then(async (r) => {
        if (r.canceled)
            return 1;
        switch (["search", "previous", "go", "next", "", ""][r.selection] ??
            (!!texturesB[r.selection - 6] ? "texture" : undefined) ??
            ["back", "close"][r.selection - texturesB.length - 6]) {
            case "search": {
                const rb = await tryget(async () => await new ModalFormData()
                    .title("Search")
                    .textField("", "Search", { defaultValue: search?.value ?? "" })
                    .toggle("Case Sensitive", { defaultValue: search?.caseSensitive ?? false })
                    .submitButton("Search")
                    .forceShow(sourceEntity));
                if (!!!rb || rb?.canceled == true) {
                    return await selectTexturePresetInCategory(sourceEntity, category, page, search, textures);
                }
                return await selectTexturePresetInCategory(sourceEntity, category, undefined, {
                    value: rb.formValues[0],
                    caseSensitive: rb.formValues[1],
                }, undefined);
            }
            case "previous":
                return await selectTexturePresetInCategory(sourceEntity, category, Math.max(0, page - 1), search, textures);
            case "go": {
                const rb = await tryget(async () => await new ModalFormData()
                    .title("Go To Page")
                    .textField(`Current Page: ${page + 1}\nPage # (Between 1 and ${numpages})`, "Page #")
                    .submitButton("Go To Page")
                    .forceShow(sourceEntity));
                return await selectTexturePresetInCategory(sourceEntity, category, Math.max(1, Math.min(numpages, rb.formValues?.[0]?.toNumber() ?? page + 1)) - 1, search, textures);
            }
            case "next":
                return await selectTexturePresetInCategory(sourceEntity, category, Math.min(numpages - 1, page + 1), search, textures);
            case "texture":
                return texturesB[r.selection - 6][1];
            case "back":
                return 1;
            case "close":
                return 0;
            default:
                return 1;
        }
    })
        .catch(async (e) => {
        console.error(e, e.stack);
        return ((await showMessage(sourceEntity, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    });
}
//# sourceMappingURL=selectTexturePreset.js.map