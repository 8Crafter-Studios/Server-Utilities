import { moduleOptionalImportPathMap, optionalModuleObjectImportFilePaths, } from "../../directoryTree";
import {} from "../types";
import { getStringFromDynamicProperties } from "modules/utilities/functions/getStringFromDynamicProperties";
import { saveStringToDynamicProperties } from "modules/utilities/functions/saveStringToDynamicProperties";
export const moduleNamesForModuleImportsConfigList = [
    "ban",
    "chat",
    "command_utilities",
    "commands",
    "commands_documentation",
    "commands_list",
    "coordinates",
    "errors",
    "main",
    "player_save",
    "spawn_protection",
    "ui",
    "utilities",
];
export const moduleNamesForModuleImportsConfigListDisplay = [
    { name: "ban", icon: "" },
    { name: "chat", icon: "" },
    { name: "command_utilities", icon: "" },
    { name: "commands", icon: "" },
    { name: "commands_documentation", icon: "" },
    { name: "commands_list", icon: "" },
    { name: "coordinates", icon: "" },
    { name: "errors", icon: "" },
    { name: "main", icon: "" },
    { name: "player_save", icon: "" },
    { name: "spawn_protection", icon: "" },
    { name: "ui", icon: "" },
    { name: "utilities", icon: "" },
];
/**
 * A class containing configuration detailing which functions, classes, and constants from the modules to import into their respective properties on the global modules object.
 */
export class moduleImportsConfig {
    static overrideOptions = [
        "none",
        "disableAll",
        "enableAll",
        "enableAllNonDeprecated",
    ];
    /**
     * @remarks overrides all other options, including overrides for specific modules
     * @todo Make the deprecated list.
     */
    static get override() {
        const option = gwdp("moduleImportsConfig:override");
        if (option == "disableAll") {
            return "disableAll";
        }
        else if (option == "enableAll") {
            return "enableAll";
        }
        else if (option == "enableAllNonDeprecated") {
            return "enableAllNonDeprecated";
        }
        else {
            return "none";
        }
    }
    static set override(option) {
        swdp("moduleImportsConfig:override", [
            "none",
            "disableAll",
            "enableAll",
            "enableAllNonDeprecated",
        ].includes(option)
            ? option
            : "none");
    }
    static get moduleOverrides() {
        return {
            get ban() {
                const option = gwdp("moduleImportsConfig:moduleOverride.ban");
                if (option == "disableAll") {
                    return "disableAll";
                }
                else if (option == "enableAll") {
                    return "enableAll";
                }
                else if (option == "enableAllNonDeprecated") {
                    return "enableAllNonDeprecated";
                }
                else {
                    return "none";
                }
            },
            set ban(option) {
                swdp("moduleImportsConfig:moduleOverride.ban", [
                    "none",
                    "disableAll",
                    "enableAll",
                    "enableAllNonDeprecated",
                ].includes(option)
                    ? option
                    : "none");
            },
            get chat() {
                const option = gwdp("moduleImportsConfig:moduleOverride.chat");
                if (option == "disableAll") {
                    return "disableAll";
                }
                else if (option == "enableAll") {
                    return "enableAll";
                }
                else if (option == "enableAllNonDeprecated") {
                    return "enableAllNonDeprecated";
                }
                else {
                    return "none";
                }
            },
            set chat(option) {
                swdp("moduleImportsConfig:moduleOverride.chat", [
                    "none",
                    "disableAll",
                    "enableAll",
                    "enableAllNonDeprecated",
                ].includes(option)
                    ? option
                    : "none");
            },
            get command_utilities() {
                const option = gwdp("moduleImportsConfig:moduleOverride.command_utilities");
                if (option == "disableAll") {
                    return "disableAll";
                }
                else if (option == "enableAll") {
                    return "enableAll";
                }
                else if (option == "enableAllNonDeprecated") {
                    return "enableAllNonDeprecated";
                }
                else {
                    return "none";
                }
            },
            set command_utilities(option) {
                swdp("moduleImportsConfig:moduleOverride.command_utilities", [
                    "none",
                    "disableAll",
                    "enableAll",
                    "enableAllNonDeprecated",
                ].includes(option)
                    ? option
                    : "none");
            },
            get commands() {
                const option = gwdp("moduleImportsConfig:moduleOverride.commands");
                if (option == "disableAll") {
                    return "disableAll";
                }
                else if (option == "enableAll") {
                    return "enableAll";
                }
                else if (option == "enableAllNonDeprecated") {
                    return "enableAllNonDeprecated";
                }
                else {
                    return "none";
                }
            },
            set commands(option) {
                swdp("moduleImportsConfig:moduleOverride.commands", [
                    "none",
                    "disableAll",
                    "enableAll",
                    "enableAllNonDeprecated",
                ].includes(option)
                    ? option
                    : "none");
            },
            get commands_documentation() {
                const option = gwdp("moduleImportsConfig:moduleOverride.commands_documentation");
                if (option == "disableAll") {
                    return "disableAll";
                }
                else if (option == "enableAll") {
                    return "enableAll";
                }
                else if (option == "enableAllNonDeprecated") {
                    return "enableAllNonDeprecated";
                }
                else {
                    return "none";
                }
            },
            set commands_documentation(option) {
                swdp("moduleImportsConfig:moduleOverride.commands_documentation", [
                    "none",
                    "disableAll",
                    "enableAll",
                    "enableAllNonDeprecated",
                ].includes(option)
                    ? option
                    : "none");
            },
            get commands_list() {
                const option = gwdp("moduleImportsConfig:moduleOverride.commands_list");
                if (option == "disableAll") {
                    return "disableAll";
                }
                else if (option == "enableAll") {
                    return "enableAll";
                }
                else if (option == "enableAllNonDeprecated") {
                    return "enableAllNonDeprecated";
                }
                else {
                    return "none";
                }
            },
            set commands_list(option) {
                swdp("moduleImportsConfig:moduleOverride.commands_list", [
                    "none",
                    "disableAll",
                    "enableAll",
                    "enableAllNonDeprecated",
                ].includes(option)
                    ? option
                    : "none");
            },
            get coordinates() {
                const option = gwdp("moduleImportsConfig:moduleOverride.coordinates");
                if (option == "disableAll") {
                    return "disableAll";
                }
                else if (option == "enableAll") {
                    return "enableAll";
                }
                else if (option == "enableAllNonDeprecated") {
                    return "enableAllNonDeprecated";
                }
                else {
                    return "none";
                }
            },
            set coordinates(option) {
                swdp("moduleImportsConfig:moduleOverride.coordinates", [
                    "none",
                    "disableAll",
                    "enableAll",
                    "enableAllNonDeprecated",
                ].includes(option)
                    ? option
                    : "none");
            },
            get errors() {
                const option = gwdp("moduleImportsConfig:moduleOverride.errors");
                if (option == "disableAll") {
                    return "disableAll";
                }
                else if (option == "enableAll") {
                    return "enableAll";
                }
                else if (option == "enableAllNonDeprecated") {
                    return "enableAllNonDeprecated";
                }
                else {
                    return "none";
                }
            },
            set errors(option) {
                swdp("moduleImportsConfig:moduleOverride.errors", [
                    "none",
                    "disableAll",
                    "enableAll",
                    "enableAllNonDeprecated",
                ].includes(option)
                    ? option
                    : "none");
            },
            get main() {
                const option = gwdp("moduleImportsConfig:moduleOverride.main");
                if (option == "disableAll") {
                    return "disableAll";
                }
                else if (option == "enableAll") {
                    return "enableAll";
                }
                else if (option == "enableAllNonDeprecated") {
                    return "enableAllNonDeprecated";
                }
                else {
                    return "none";
                }
            },
            set main(option) {
                swdp("moduleImportsConfig:moduleOverride.main", [
                    "none",
                    "disableAll",
                    "enableAll",
                    "enableAllNonDeprecated",
                ].includes(option)
                    ? option
                    : "none");
            },
            get player_save() {
                const option = gwdp("moduleImportsConfig:moduleOverride.player_save");
                if (option == "disableAll") {
                    return "disableAll";
                }
                else if (option == "enableAll") {
                    return "enableAll";
                }
                else if (option == "enableAllNonDeprecated") {
                    return "enableAllNonDeprecated";
                }
                else {
                    return "none";
                }
            },
            set player_save(option) {
                swdp("moduleImportsConfig:moduleOverride.player_save", [
                    "none",
                    "disableAll",
                    "enableAll",
                    "enableAllNonDeprecated",
                ].includes(option)
                    ? option
                    : "none");
            },
            get spawn_protection() {
                const option = gwdp("moduleImportsConfig:moduleOverride.spawn_protection");
                if (option == "disableAll") {
                    return "disableAll";
                }
                else if (option == "enableAll") {
                    return "enableAll";
                }
                else if (option == "enableAllNonDeprecated") {
                    return "enableAllNonDeprecated";
                }
                else {
                    return "none";
                }
            },
            set spawn_protection(option) {
                swdp("moduleImportsConfig:moduleOverride.spawn_protection", [
                    "none",
                    "disableAll",
                    "enableAll",
                    "enableAllNonDeprecated",
                ].includes(option)
                    ? option
                    : "none");
            },
            get ui() {
                const option = gwdp("moduleImportsConfig:moduleOverride.ui");
                if (option == "disableAll") {
                    return "disableAll";
                }
                else if (option == "enableAll") {
                    return "enableAll";
                }
                else if (option == "enableAllNonDeprecated") {
                    return "enableAllNonDeprecated";
                }
                else {
                    return "none";
                }
            },
            set ui(option) {
                swdp("moduleImportsConfig:moduleOverride.ui", [
                    "none",
                    "disableAll",
                    "enableAll",
                    "enableAllNonDeprecated",
                ].includes(option)
                    ? option
                    : "none");
            },
            get utilities() {
                const option = gwdp("moduleImportsConfig:moduleOverride.utilities");
                if (option == "disableAll") {
                    return "disableAll";
                }
                else if (option == "enableAll") {
                    return "enableAll";
                }
                else if (option == "enableAllNonDeprecated") {
                    return "enableAllNonDeprecated";
                }
                else {
                    return "none";
                }
            },
            set utilities(option) {
                swdp("moduleImportsConfig:moduleOverride.utilities", [
                    "none",
                    "disableAll",
                    "enableAll",
                    "enableAllNonDeprecated",
                ].includes(option)
                    ? option
                    : "none");
            },
        };
    }
    static get default() {
        return Object.fromEntries(optionalModuleObjectImportFilePaths.map((s) => [s, 0]));
    }
    /**
     *
     * @param filePath The path of the file, should be a value in the {@link optionalModuleObjectImportFilePaths} array.
     * @returns {boolean} A boolean representing whether or not the file is deprecated.
     * @todo Make a way for it to check if the file is deprecated, besides just checking if the path contains "/deprecated/".
     */
    static isFileDeprecated(filePath) {
        this.assertIsValidModuleImport(filePath, "[moduleImportsConfig::isFileDeprecated::Args[0]]");
        if (filePath.includes("/deprecated/")) {
            return true;
        }
        else {
            return false;
        }
    }
    static reset() {
        this.setJSON(this.default);
    }
    static toJSON() {
        return (JSON.parse(getStringFromDynamicProperties("moduleImportsConfigData", "null")) ??
            this.default);
    }
    static toJSON_module(module) {
        let string = getStringFromDynamicProperties("moduleImportsConfigData");
        return Object.fromEntries(Object.entries(JSON.parse(string == "" ? JSON.stringify(this.default) : string)).filter((f) => f[0].startsWith(`BP/scripts/modules/${module}/`)));
    }
    static setJSON(json) {
        saveStringToDynamicProperties(JSON.stringify(json), "moduleImportsConfigData");
    }
    static get(filePath) {
        this.assertIsValidModuleImport(filePath, "[moduleImportsConfig::get::Args[0]]");
        return this.toJSON()[filePath].toBoolean();
    }
    static set(filePath, enabled = 0) {
        if (![0, 1].includes(enabled.toNumber())) {
            throw new SyntaxError(`[moduleImportsConfig::set::Args[0]]: Expected a boolean, 0, or 1, but got ${JSON.stringify(enabled)} instead.`);
        }
        this.assertIsValidModuleImport(filePath, "[moduleImportsConfig::set::Args[0]]");
        return this.setJSON(Object.assign(this.toJSON(), { [filePath]: enabled.toNumber() }));
    }
    static enableAll() {
        return this.setJSON(Object.fromEntries(Object.entries(this.toJSON()).map((s) => [s[0], 1])));
    }
    static enableAllDeprecated() {
        return this.setJSON(Object.fromEntries(Object.entries(this.toJSON()).map((s) => [
            s[0],
            this.isFileDeprecated(s[0]) ? 1 : s[1],
        ])));
    }
    static enableAllNonDeprecated() {
        return this.setJSON(Object.fromEntries(Object.entries(this.toJSON()).map((s) => [
            s[0],
            this.isFileDeprecated(s[0]) ? s[1] : 1,
        ])));
    }
    static disableAll() {
        return this.setJSON(Object.fromEntries(Object.entries(this.toJSON()).map((s) => [s[0], 0])));
    }
    static disableAllDeprecated() {
        return this.setJSON(Object.fromEntries(Object.entries(this.toJSON()).map((s) => [
            s[0],
            this.isFileDeprecated(s[0]) ? 0 : s[1],
        ])));
    }
    static disableAllNonDeprecated() {
        return this.setJSON(Object.fromEntries(Object.entries(this.toJSON()).map((s) => [
            s[0],
            this.isFileDeprecated(s[0]) ? s[1] : 0,
        ])));
    }
    static assertIsValidModuleImport(filePath, argIndex) {
        if (!optionalModuleObjectImportFilePaths.includes(filePath)) {
            throw new SyntaxError(`${!!argIndex ? argIndex + ": " : ""}${JSON.stringify(filePath)} is not a valid module object import file path.`);
        }
    }
    static async forceImport(module) {
        return Object.fromEntries(await Object.entries(this.toJSON_module(module)).mapAsync(async function importFile(v) {
            return [v[0], await import(v[0].slice(11))];
        }));
    }
    static async import(module) {
        switch (true) {
            case this.override == "none" &&
                this.moduleOverrides[module] == "none":
                return Object.fromEntries((await Object.entries(this.toJSON_module(module))
                    .filter((v) => v[1].toBoolean())
                    .mapAsync(async function importFile(v) {
                    return Object.entries(await import(v[0].slice(11)));
                })).flat());
                break;
            case this.override == "none" &&
                this.moduleOverrides[module] == "disableAll":
            case this.override == "disableAll":
                return {};
                break;
            case this.override == "none" &&
                this.moduleOverrides[module] == "enableAll":
            case this.override == "enableAll":
                return Object.fromEntries((await Object.entries(this.toJSON_module(module)).mapAsync(async function importFile(v) {
                    return Object.entries(await import(v[0].slice(11)));
                })).flat());
                break;
            case this.override == "none" &&
                this.moduleOverrides[module] == "enableAllNonDeprecated":
            case this.override == "enableAllNonDeprecated":
                return Object.fromEntries((await Object.entries(this.toJSON_module(module))
                    .filter((v) => !this.isFileDeprecated(v[0]))
                    .mapAsync(async function importFile(v) {
                    return Object.entries(await import(v[0].slice(11)));
                })).flat());
                break;
            default:
                // #Error Code: 0x1000;
                throw new InternalError("Something went wrong and the switch case for [moduleImportsConfig::import] has reached an unreachable state. Please notify 8Crafter of this error, you can do this through 8Crafter's discord server or email. Make sure to include the following error code: 0x1000");
                break;
        }
    }
    static async importSeparatedIntoPaths(module) {
        switch (true) {
            case this.override == "none" &&
                this.moduleOverrides[module] == "none":
                return Object.fromEntries(await Object.entries(this.toJSON_module(module))
                    .filter((v) => v[1].toBoolean())
                    .mapAsync(async function importFile(v) {
                    return [
                        v[0],
                        await import(v[0].slice(11)),
                    ];
                }));
                break;
            case this.override == "none" &&
                this.moduleOverrides[module] == "disableAll":
            case this.override == "disableAll":
                return {};
                break;
            case this.override == "none" &&
                this.moduleOverrides[module] == "enableAll":
            case this.override == "enableAll":
                return Object.fromEntries(await Object.entries(this.toJSON_module(module)).mapAsync(async function importFile(v) {
                    return [v[0], await import(v[0].slice(11))];
                }));
                break;
            case this.override == "none" &&
                this.moduleOverrides[module] == "enableAllNonDeprecated":
            case this.override == "enableAllNonDeprecated":
                return Object.fromEntries(await Object.entries(this.toJSON_module(module))
                    .filter((v) => this.isFileDeprecated(v[0]))
                    .mapAsync(async function importFile(v) {
                    return [
                        v[0],
                        await import(v[0].slice(11)),
                    ];
                }));
                break;
            default:
                // #Error Code: 0x1000;
                throw new InternalError("Something went wrong and the switch case for [moduleImportsConfig::import] has reached an unreachable state. Please notify 8Crafter of this error, you can do this through 8Crafter's discord server or email. Make sure to include the following error code: 0x1000");
                break;
        }
    }
}
/*
// asserts operator test
let a: any = 2
a
moduleImportsConfig.set("a", a)
a
 */
Object.defineProperties(globalThis, {
    moduleImportsConfig: {
        value: moduleImportsConfig,
        configurable: true,
        enumerable: true,
        writable: false,
    },
});
// await moduleImportsConfig.import("command_utilities");
/* let a: {[key in typeof moduleOptionalImportPathMap["ban"][number]]: optionalModuleObjectImportFilePathsImportMap[key]}
let b: UnionToIntersection<optionalModuleObjectImportFilePathsImportMap[typeof moduleOptionalImportPathMap["ban"][number]]>
a
b */
//# sourceMappingURL=moduleImportsConfig.js.map