import { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { moduleNamesForModuleImportsConfigList } from "init/classes/moduleImportsConfig";
import type { optionalModuleObjectImportFilePaths } from "directoryTree";
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
export declare function editModuleImportsConfig(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<0 | 1 | -2>;
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
export declare function editModuleImportsConfig_module(sourceEntitya: Entity | executeCommandPlayerW | Player, module: (typeof moduleNamesForModuleImportsConfigList)[number]): Promise<0 | 1 | -2>;
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
export declare function editModuleImportsConfig_module_folder(sourceEntitya: Entity | executeCommandPlayerW | Player, module: (typeof moduleNamesForModuleImportsConfigList)[number], folder: string): Promise<0 | 1 | -2>;
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
export declare function editModuleImportsConfig_module_item(sourceEntitya: Entity | executeCommandPlayerW | Player, module: (typeof moduleNamesForModuleImportsConfigList)[number], item: (typeof optionalModuleObjectImportFilePaths)[number]): Promise<0 | 1 | -2>;
