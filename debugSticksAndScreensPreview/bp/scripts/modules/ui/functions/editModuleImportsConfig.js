import { Entity, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, MessageFormData, ModalFormData, } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { moduleNamesForModuleImportsConfigList, moduleNamesForModuleImportsConfigListDisplay, } from "init/classes/moduleImportsConfig";
// ${se}srun(async()=>{try{(await import("modules/ui/functions/editModuleImportsConfig.js")).editModuleImportsConfig(player)}catch(e){console.error(e, e.stack)}})
/**
 * Edits the module imports configuration by presenting an action form to the user.
 * The user can change the full override, select a module to edit, go back, or close the form.
 *
 * @param sourceEntitya - The source entity which can be an {@linkcode Entity}, {@linkcode executeCommandPlayerW}, or {@linkcode Player}.
 * @returns A promise that resolves to:
 * - `0` if the form is closed,
 * - `1` if the form is canceled or the user goes back,
 * - `-2` if an error occurs.
 */
export async function editModuleImportsConfig(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    let form = new ActionFormData();
    form.title("Edit Module Imports Config");
    form.button("Change Full Override\n" + moduleImportsConfig.override);
    moduleNamesForModuleImportsConfigListDisplay.forEach((p) => {
        form.button(p.name, p.icon);
    });
    form.button("Back");
    form.button("Close");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        if (r.canceled) {
            return 1;
        }
        switch (r.selection) {
            case 0:
                let overrideForm = new ActionFormData();
                overrideForm.title("Select Override Option");
                moduleImportsConfig.overrideOptions.forEach((option) => {
                    overrideForm.button(moduleImportsConfig.override == option
                        ? option + "\n§aSelected"
                        : option);
                });
                return await forceShow(overrideForm, sourceEntity).then(async (response) => {
                    if (response.canceled) {
                        return await editModuleImportsConfig(sourceEntity);
                    }
                    moduleImportsConfig.override =
                        moduleImportsConfig.overrideOptions[response.selection];
                    return await editModuleImportsConfig(sourceEntity);
                });
            case moduleNamesForModuleImportsConfigListDisplay.length + 1:
                return 1;
            case moduleNamesForModuleImportsConfigListDisplay.length + 2:
                return 0;
            default:
                let result = await editModuleImportsConfig_module(sourceEntity, moduleNamesForModuleImportsConfigList[r.selection - 1]);
                if (result == 1) {
                    return await editModuleImportsConfig(sourceEntity);
                }
                else {
                    return result;
                }
        }
    })
        .catch(async (e) => {
        let formError = new MessageFormData();
        formError.body(e + " " + e.stack);
        formError.title("Error");
        formError.button1("Done");
        return await forceShow(formError, sourceEntity).then(() => {
            return -2;
        });
    });
}
/**
 * Edits the module imports configuration for a given module.
 *
 * @param sourceEntitya - The source entity which can be an {@linkcode Entity}, {@linkcode executeCommandPlayerW}, or {@linkcode Player}.
 * @param module - The module name from the list of module names for module imports configuration.
 * @returns A promise that resolves to:
 * - `0` if the form is closed,
 * - `1` if the form is canceled or the "Back" button is pressed,
 * - `-2` if an error occurs.
 */
export async function editModuleImportsConfig_module(sourceEntitya, module) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    const items = Object.entries(moduleImportsConfig.toJSON_module(module));
    const itemsB = [...new Set(items.map((item) => item[0].split("/")[4]))];
    let form = new ActionFormData();
    form.title("Edit Module Imports Config: " + module);
    form.button("Change Module Override\n" + moduleImportsConfig.moduleOverrides[module]);
    itemsB.forEach((item) => {
        form.button(item +
            "\n" +
            (items
                .filter((i) => i[0].split("/")[4] == item)
                .every((i) => i[1] == 1)
                ? "§aAll Enabled"
                : items
                    .filter((i) => i[0].split("/")[4] == item)
                    .every((i) => i[1] == 0)
                    ? "§cAll Disabled"
                    : "§eSome Disabled"));
    });
    form.button("Back");
    form.button("Close");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        if (r.canceled) {
            return 1;
        }
        switch (r.selection) {
            case 0:
                let overrideForm = new ActionFormData();
                overrideForm.title("Select Override Option");
                moduleImportsConfig.overrideOptions.forEach((option) => {
                    overrideForm.button(moduleImportsConfig.moduleOverrides[module] ==
                        option
                        ? option + "\n§aSelected"
                        : option);
                });
                return await forceShow(overrideForm, sourceEntity).then(async (response) => {
                    if (response.canceled) {
                        return await editModuleImportsConfig_module(sourceEntity, module);
                    }
                    moduleImportsConfig.moduleOverrides[module] =
                        moduleImportsConfig.overrideOptions[response.selection];
                    return await editModuleImportsConfig_module(sourceEntity, module);
                });
            case itemsB.length + 1:
                return 1;
            case itemsB.length + 2:
                return 0;
            default:
                let result = await editModuleImportsConfig_module_folder(sourceEntity, module, itemsB[r.selection - 1]);
                if (result == 1) {
                    return await editModuleImportsConfig_module(sourceEntity, module);
                }
                else {
                    return result;
                }
        }
    })
        .catch(async (e) => {
        let formError = new MessageFormData();
        formError.body(e + " " + e.stack);
        formError.title("Error");
        formError.button1("Done");
        return await forceShow(formError, sourceEntity).then(() => {
            return -2;
        });
    });
}
/**
 * Edits the module imports configuration for a given module.
 *
 * @param sourceEntitya - The source entity which can be an {@linkcode Entity}, {@linkcode executeCommandPlayerW}, or {@linkcode Player}.
 * @param module - The module name from the list of module names for module imports configuration.
 * @returns A promise that resolves to:
 * - `0` if the form is closed,
 * - `1` if the form is canceled or the "Back" button is pressed,
 * - `-2` if an error occurs.
 */
export async function editModuleImportsConfig_module_folder(sourceEntitya, module, folder) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    const items = Object.entries(moduleImportsConfig.toJSON_module(module)).filter((v) => v[0].split("/")[4] == folder);
    let form = new ActionFormData();
    form.title("Edit Module Imports Config: " + module);
    form.body(`Path: ${module}/${folder}/`);
    form.button("Change Module Override\n" + moduleImportsConfig.moduleOverrides[module]);
    items.forEach((item) => {
        form.button(item[0].split("/").slice(5).join("/").slice(-30) +
            "\n" +
            (item[1] == 1 ? "§aEnabled" : "§cDisabled"));
    });
    form.button("Back");
    form.button("Close");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        if (r.canceled) {
            return 1;
        }
        switch (r.selection) {
            case 0:
                let overrideForm = new ActionFormData();
                overrideForm.title("Select Override Option");
                moduleImportsConfig.overrideOptions.forEach((option) => {
                    overrideForm.button(moduleImportsConfig.moduleOverrides[module] ==
                        option
                        ? option + "\n§aSelected"
                        : option);
                });
                return await forceShow(overrideForm, sourceEntity).then(async (response) => {
                    if (response.canceled) {
                        return await editModuleImportsConfig_module(sourceEntity, module);
                    }
                    moduleImportsConfig.moduleOverrides[module] =
                        moduleImportsConfig.overrideOptions[response.selection];
                    return await editModuleImportsConfig_module(sourceEntity, module);
                });
            case items.length + 1:
                return 1;
            case items.length + 2:
                return 0;
            default:
                let result = await editModuleImportsConfig_module_item(sourceEntity, module, items[r.selection - 1][0]);
                if (result == 1) {
                    return await editModuleImportsConfig_module(sourceEntity, module);
                }
                else {
                    return result;
                }
        }
    })
        .catch(async (e) => {
        let formError = new MessageFormData();
        formError.body(e + " " + e.stack);
        formError.title("Error");
        formError.button1("Done");
        return await forceShow(formError, sourceEntity).then(() => {
            return -2;
        });
    });
}
/**
 * Edits the module imports configuration for a specific module item.
 *
 * @param sourceEntitya - The source entity which can be an {@linkcode Entity}, {@linkcode executeCommandPlayerW}, or {@linkcode Player}.
 * @param module - The module name from the list of module names for module imports configuration.
 * @param item - The item path from the list of optional module object import file paths.
 * @returns A promise that resolves to:
 * - `0` if the form was closed,
 * - `1` if the configuration was successfully edited or the form was canceled,
 * - `-2` if an error occurred or an invalid selection was made.
 */
export async function editModuleImportsConfig_module_item(sourceEntitya, module, item) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    const configJSON = moduleImportsConfig.toJSON();
    let form = new ActionFormData();
    form.title("Edit Module Imports Config");
    form.body(`Module: ${module}
Path: ${item}
Status: ${configJSON[item] == 1 ? "Enabled" : "Disabled"}
Deprecated: ${moduleImportsConfig.isFileDeprecated(item)}`);
    form.button(configJSON[item] == 1 ? "Disable" : "Enable");
    form.button("View Data");
    form.button("Back");
    form.button("Close");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        if (r.canceled) {
            return 1;
        }
        switch (r.selection) {
            case 0:
                configJSON[item] = (1 - configJSON[item]);
                moduleImportsConfig.setJSON(configJSON);
                return await editModuleImportsConfig_module_item(sourceEntity, module, item);
            case 1:
                let form = new ActionFormData();
                form.title("Data");
                form.body(JSONB.stringify(await import(item.split("/").slice(2).join("/")), undefined, 4, {
                    bigint: true,
                    function: true,
                    get: true,
                    Infinity: true,
                    NaN: true,
                    NegativeInfinity: true,
                    set: true,
                    undefined: true,
                }));
                form.button("Done");
                return await form
                    .forceShow(sourceEntity)
                    .then(async () => {
                    return await editModuleImportsConfig_module_item(sourceEntity, module, item);
                })
                    .catch(async (e) => {
                    let formError = new MessageFormData();
                    formError.body(e + " " + e.stack);
                    formError.title("Error");
                    formError.button1("Done");
                    return await forceShow(formError, sourceEntity).then(() => {
                        return -2;
                    });
                });
            case 2:
                return 1;
            case 3:
                return 0;
            default:
                const error = new InternalError("Invalid selection");
                console.error(error, error.stack);
                return -2;
        }
    })
        .catch(async (e) => {
        let formError = new MessageFormData();
        formError.body(e + " " + e.stack);
        formError.title("Error");
        formError.button1("Done");
        return await forceShow(formError, sourceEntity).then(() => {
            return -2;
        });
    });
}
//# sourceMappingURL=editModuleImportsConfig.js.map