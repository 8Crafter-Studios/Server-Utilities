import { moduleOptionalImportPathMap, optionalModuleObjectImportFilePaths, type optionalModuleObjectImportFilePathsImportMap } from "../../directoryTree";
import { type Mutable } from "../types";
type moduleImportNamesToModuleImportsConfigObjectMapper<valueTypes extends any> = {
    [K in keyof Mutable<typeof optionalModuleObjectImportFilePaths> as K extends number ? (typeof optionalModuleObjectImportFilePaths)[K] : never]: valueTypes;
};
type moduleOptionalImportPathMapObjectMapper<module extends moduleNameForModuleImportsConfig, valueTypes extends any> = {
    [K in keyof Mutable<(typeof moduleOptionalImportPathMap)[module]> as K extends number ? (typeof moduleOptionalImportPathMap)[module][K] : never]: valueTypes;
};
type moduleNameForModuleImportsConfig = keyof typeof moduleOptionalImportPathMap;
export declare const moduleNamesForModuleImportsConfigList: readonly ["ban", "block_generation_utilities", "chat", "command_utilities", "commands", "commands_documentation", "commands_list", "coordinates", "errors", "main", "player_save", "spawn_protection", "ui", "utilities"];
export declare const moduleNamesForModuleImportsConfigListDisplay: readonly [{
    readonly name: "ban";
    readonly icon: "";
}, {
    readonly name: "block_generation_utilities";
    readonly icon: "";
}, {
    readonly name: "chat";
    readonly icon: "";
}, {
    readonly name: "command_utilities";
    readonly icon: "";
}, {
    readonly name: "commands";
    readonly icon: "";
}, {
    readonly name: "commands_documentation";
    readonly icon: "";
}, {
    readonly name: "commands_list";
    readonly icon: "";
}, {
    readonly name: "coordinates";
    readonly icon: "";
}, {
    readonly name: "errors";
    readonly icon: "";
}, {
    readonly name: "main";
    readonly icon: "";
}, {
    readonly name: "player_save";
    readonly icon: "";
}, {
    readonly name: "spawn_protection";
    readonly icon: "";
}, {
    readonly name: "ui";
    readonly icon: "";
}, {
    readonly name: "utilities";
    readonly icon: "";
}];
/**
 * A class containing configuration detailing which functions, classes, and constants from the modules to import into their respective properties on the global modules object.
 */
export declare class moduleImportsConfig {
    static overrideOptions: readonly ["none", "disableAll", "enableAll", "enableAllNonDeprecated"];
    /**
     * @remarks overrides all other options, including overrides for specific modules
     * @todo Make the deprecated list.
     */
    static get override(): (typeof this.overrideOptions)[number];
    static set override(option: (typeof this.overrideOptions)[number] | undefined | null);
    static get moduleOverrides(): {
        ban: "none" | "disableAll" | "enableAll" | "enableAllNonDeprecated" | undefined | null;
        block_generation_utilities: "none" | "disableAll" | "enableAll" | "enableAllNonDeprecated" | undefined | null;
        chat: "none" | "disableAll" | "enableAll" | "enableAllNonDeprecated" | undefined | null;
        command_utilities: "none" | "disableAll" | "enableAll" | "enableAllNonDeprecated" | undefined | null;
        commands: "none" | "disableAll" | "enableAll" | "enableAllNonDeprecated" | undefined | null;
        commands_documentation: "none" | "disableAll" | "enableAll" | "enableAllNonDeprecated" | undefined | null;
        commands_list: "none" | "disableAll" | "enableAll" | "enableAllNonDeprecated" | undefined | null;
        coordinates: "none" | "disableAll" | "enableAll" | "enableAllNonDeprecated" | undefined | null;
        errors: "none" | "disableAll" | "enableAll" | "enableAllNonDeprecated" | undefined | null;
        main: "none" | "disableAll" | "enableAll" | "enableAllNonDeprecated" | undefined | null;
        moderation: "none" | "disableAll" | "enableAll" | "enableAllNonDeprecated" | undefined | null;
        player_save: "none" | "disableAll" | "enableAll" | "enableAllNonDeprecated" | undefined | null;
        spawn_protection: "none" | "disableAll" | "enableAll" | "enableAllNonDeprecated" | undefined | null;
        ui: "none" | "disableAll" | "enableAll" | "enableAllNonDeprecated" | undefined | null;
        utilities: "none" | "disableAll" | "enableAll" | "enableAllNonDeprecated" | undefined | null;
    };
    static get default(): moduleImportNamesToModuleImportsConfigObjectMapper<1>;
    /**
     *
     * @param filePath The path of the file, should be a value in the {@link optionalModuleObjectImportFilePaths} array.
     * @returns {boolean} A boolean representing whether or not the file is deprecated.
     * @todo Make a way for it to check if the file is deprecated, besides just checking if the path contains "/deprecated/".
     */
    static isFileDeprecated(filePath: keyof moduleImportNamesToModuleImportsConfigObjectMapper<unknown>): boolean;
    static reset(): void;
    static toJSON(): moduleImportNamesToModuleImportsConfigObjectMapper<0 | 1>;
    static toJSON_module(module: moduleNameForModuleImportsConfig): Partial<moduleImportNamesToModuleImportsConfigObjectMapper<0 | 1>>;
    static setJSON(json: moduleImportNamesToModuleImportsConfigObjectMapper<0 | 1>): void;
    static get(filePath: keyof moduleImportNamesToModuleImportsConfigObjectMapper<unknown>): boolean;
    static set(filePath: keyof moduleImportNamesToModuleImportsConfigObjectMapper<unknown>, enabled?: "0" | "1" | boolean | 0 | 1): asserts enabled is "0" | "1" | boolean | 0 | 1;
    static enableAll(): void;
    static enableAllDeprecated(): void;
    static enableAllNonDeprecated(): void;
    static disableAll(): void;
    static disableAllDeprecated(): void;
    static disableAllNonDeprecated(): void;
    static assertIsValidModuleImport(filePath: string, argIndex?: string): asserts filePath is keyof moduleImportNamesToModuleImportsConfigObjectMapper<unknown>;
    static forceImport<M extends moduleNameForModuleImportsConfig>(module: M): Promise<{
        [K in keyof moduleOptionalImportPathMapObjectMapper<M, unknown> & keyof optionalModuleObjectImportFilePathsImportMap]?: optionalModuleObjectImportFilePathsImportMap[K];
    }>;
    static import<M extends moduleNameForModuleImportsConfig>(module: M): Promise<Partial<UnionToIntersection<optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)[M][number]]>>>;
    static importSeparatedIntoPaths<M extends moduleNameForModuleImportsConfig>(module: M): Promise<{
        [K in keyof moduleOptionalImportPathMapObjectMapper<M, unknown> & keyof optionalModuleObjectImportFilePathsImportMap]?: optionalModuleObjectImportFilePathsImportMap[K];
    }>;
}
export {};
