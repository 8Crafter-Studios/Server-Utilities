import { Entity, Player, world } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, ModalFormData, ModalFormResponse, MessageFormData, MessageFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { commandSettings } from "modules/commands/classes/commandSettings";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { command_settings_format_version } from "modules/commands/constants/command_settings_format_version";
import { commands_format_version } from "modules/commands/constants/commands_format_version";
import { mainMenu } from "./mainMenu";
import { commandCategories } from "./commandCategories";
import { commandCategoriesDisplay } from "./commandCategoriesDisplay";
import { command } from "modules/commands/classes/command";
import { showMessage } from "modules/utilities/functions/showMessage";
import { securityVariables } from "security/ultraSecurityModeUtils";
/**
 * Manages the commands UI for a given source entity.
 *
 * @todo update this function to use the new async ui system
 * @param sourceEntitya - The source entity which can be of type `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to a number indicating the result of the operation.
 *
 * This function performs the following tasks:
 * - Checks if ultra security mode is enabled and verifies if the player has the necessary permissions to access the manage commands UI.
 * - Displays a form to manage commands, including built-in and custom commands.
 * - Allows adding, editing, and deleting custom commands.
 * - Provides detailed information and settings for each command.
 * - Handles various user interactions with the UI, such as confirming deletions and saving changes.
 */
export async function manageCommands(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessManageCommandsUI") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessManageCommandsUI", "Back", "Cancel");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    let form = new ActionFormData();
    form.title("Manage Commands");
    let defaultCommands = command.getDefaultCommands();
    //defaultCommands.forEach((p)=>{form.button(`${p.formatting_code+p.commandName}\n${p.type+": "+(p.settings.enabled?"enabled":"disabled")+"; "+p.command_version}`/*, "textures/ui/online"*/)});
    let customCommands = command.getCustomCommands();
    //customCommands.forEach((p)=>{form.button(`${p.formatting_code+p.commandName}\n${p.type+": "+(p.settings.enabled?"enabled":"disabled")+"; "+p.command_version}`/*, "textures/ui/online"*/)});
    let commandsList = defaultCommands.concat(customCommands);
    //form.button("Add Custom Command");
    commandCategoriesDisplay.forEach((p) => {
        form.button(p.name, p.icon);
    });
    form.button("Back");
    forceShow(form, sourceEntity)
        .then((ra) => {
        let r = ra;
        if (r.canceled) {
            return;
        }
        switch (r.selection) {
            case commandCategories.length:
                mainMenu(sourceEntity);
                break;
            default:
                let category = commandCategories[r.selection];
                let categoryDisplay = commandCategories[r.selection];
                // pbsend(player, command.getCustomCommands().find((v) => v.commandName == "tpmenu").settings);
                let commandsListB = category == "all"
                    ? commandsList
                    : category == "built-in"
                        ? defaultCommands
                        : category == "custom"
                            ? customCommands
                            : command.getDefaultCommandsOfCategory(category);
                let formB = new ActionFormData();
                formB.title(`Manage ${categoryDisplay}§r Commands`);
                commandsListB.forEach((p) => {
                    formB.button(`${p.formatting_code + p.commandName}\n${p.type +
                        ": " +
                        (p.settings.enabled ? "enabled" : "disabled") +
                        "; " +
                        p.command_version}` /*, "textures/ui/online"*/);
                });
                if (category == "custom" || category == "all") {
                    formB.button("Add Custom Command");
                }
                formB.button("Back");
                forceShow(formB, sourceEntity)
                    .then((ra) => {
                    let r = ra;
                    if (r.canceled) {
                        manageCommands(sourceEntity);
                        return;
                    }
                    switch (r.selection) {
                        case commandsListB.length +
                            +(category != "custom" &&
                                category != "all"):
                            let form5 = new ModalFormData();
                            form5.title(`Add Custom Command`);
                            form5.textField("Command Name§c*", "mycommand");
                            form5.dropdown("Command Code Type (commands means the command just runs a list of minecraft commands, and javascript means that the command runs a list of javascript scripts/code)", ["commands", "javascript"]);
                            form5.textField("Command Version§c*", "SemVer String; ex. 1.7.0-beta.1.2.a.b.c.d", "1.0.0");
                            form5.textField("Formatting Code§c*", "required: string", "§r§f");
                            form5.textField("Description", "string");
                            form5.textField("Formats", "JSON", '["myCommand", "myCommand <string: string> [integer: int]"]');
                            form5.textField("Command Prefix (leave blank to use default)", "default");
                            form5.toggle("Enable Automatic Parameter Evaluation", true);
                            form5.submitButton("Create Command");
                            forceShow(form5, sourceEntity)
                                .then((ha) => {
                                let h = ha;
                                if (h.canceled) {
                                    manageCommands(sourceEntity);
                                    return;
                                }
                                if (!!!h.formValues[0]) {
                                    let formErrora = new MessageFormData();
                                    formErrora.body(`Required parameter 'Command Name' was left blank`);
                                    formErrora.title("Error");
                                    formErrora.button1("Back");
                                    formErrora.button2("Cancel");
                                    forceShow(formErrora, sourceEntity).then(() => {
                                        manageCommands(sourceEntity);
                                        return;
                                    });
                                    return;
                                }
                                if (!!command
                                    .getCustomCommands()
                                    .find((v) => v.commandName ==
                                    String(h.formValues[0]))) {
                                    let formError = new MessageFormData();
                                    formError.body(`There is already a custom command with the name '${String(h.formValues[0]).replaceAll("'", "\\'")}`);
                                    formError.title("Error");
                                    formError.button1("Done");
                                    forceShow(formError, sourceEntity).then(() => {
                                        return;
                                    });
                                    manageCommands(sourceEntity);
                                    return;
                                }
                                new command({
                                    commandName: String(h.formValues[0]),
                                    commands_format_version: commands_format_version,
                                    command_version: String(h.formValues[2]),
                                    customCommandType: [
                                        "commands",
                                        "javascript",
                                    ][Number(h.formValues[1])],
                                    description: String(h.formValues[4]),
                                    type: "custom",
                                    formatting_code: String(h.formValues[3]),
                                    formats: JSONParse(h.formValues[5] == ""
                                        ? "undefined"
                                        : String(h.formValues[5] ??
                                            "undefined")),
                                    customCommandPrefix: String(h.formValues[6]),
                                    customCommandParametersEnabled: Boolean(h.formValues[7]),
                                    customCommandId: "customCommand:" +
                                        String(h.formValues[0]),
                                    format_version: format_version,
                                }).save();
                                manageCommands(sourceEntity);
                            })
                                .catch((e) => {
                                let formError = new MessageFormData();
                                formError.body(e + e.stack);
                                formError.title("Error");
                                formError.button1("Done");
                                forceShow(formError, sourceEntity).then(() => {
                                    return e;
                                });
                            });
                            break;
                        case commandsListB.length +
                            1 -
                            +(category != "custom" &&
                                category != "all"):
                            manageCommands(sourceEntity);
                            break;
                        default:
                            let commandsItem = commandsListB[r.selection];
                            let form2 = new ActionFormData();
                            form2.title(commandsItem.commandName);
                            form2.body(`Command Name: ${commandsItem.commandName}\nType: ${commandsItem.type}\nCommand Version: ${commandsItem.command_version}\nCustom Command Id: ${commandsItem.customCommandId}\nCommand Settings Id: ${commandsItem.commandSettingsId}\nCategor${typeof commandsItem.category ==
                                "string"
                                ? "y"
                                : "ies"}: ${JSONStringify(commandsItem.category)}\n\nDescription: ${commandsItem.description}\nFormats: ${JSONStringify(commandsItem.formats)}`);
                            if (commandsItem.type == "custom") {
                                form2.button("Delete Command");
                            }
                            if (commandsItem.type == "custom") {
                                form2.button("Edit Command");
                            }
                            if (commandsItem.type == "custom") {
                                form2.button("Edit Code");
                            }
                            form2.button("Show Info");
                            form2.button("Settings");
                            form2.button("Back");
                            forceShow(form2, sourceEntity)
                                .then((ga) => {
                                let g = ga;
                                if (g.canceled) {
                                    manageCommands(sourceEntity);
                                    return;
                                }
                                switch (g.selection +
                                    Number(commandsItem.type !=
                                        "custom") *
                                        3) {
                                    case 0:
                                        let form3 = new MessageFormData();
                                        form3.title("Confirm Deletion of Command");
                                        form3.body(`Are you sure you want to delete the custom ${commandsItem.commandName} command?\nThis action cannot be undone.`);
                                        form3.button2("Delete Command");
                                        form3.button1("Cancel");
                                        forceShow(form3, sourceEntity)
                                            .then((ha) => {
                                            let h = ha;
                                            if (h.canceled) {
                                                return;
                                            }
                                            if (h.selection == 0) {
                                                manageCommands(sourceEntity);
                                            }
                                            if (h.selection == 1) {
                                                commandsItem.remove();
                                                manageCommands(sourceEntity);
                                            }
                                        })
                                            .catch((e) => {
                                            let formError = new MessageFormData();
                                            formError.body(e + e.stack);
                                            formError.title("Error");
                                            formError.button1("Done");
                                            forceShow(formError, sourceEntity).then(() => {
                                                return e;
                                            });
                                        });
                                        break;
                                    case 1:
                                        let form5 = new ModalFormData();
                                        form5.title(`Edit Custom Command`);
                                        form5.textField("Command Name§c*", "mycommand", commandsItem.commandName);
                                        form5.dropdown("Command Code Type (commands means the command just runs a list of minecraft commands, and javascript means that the command runs a list of javascript scripts/code)", [
                                            "commands",
                                            "javascript",
                                        ], [
                                            "commands",
                                            "javascript",
                                        ].findIndex((v) => v ==
                                            commandsItem.customCommandType));
                                        form5.slider("Number of Code Lines", 1, 100, 1, Number(commandsItem.customCommandCodeLines ??
                                            1));
                                        form5.textField("Command Version§c*", "SemVer String; ex. 1.7.0-beta.1.2.a.b.c.d", String(commandsItem.command_version));
                                        form5.textField("Formatting Code§c*", "required: string", commandsItem.formatting_code);
                                        form5.textField("Description", "string", commandsItem.description);
                                        form5.textField("Formats", "JSON", JSONStringify(commandsItem.formats));
                                        form5.textField("Command Prefix (leave blank to use default)", "default", commandsItem.customCommandPrefix);
                                        form5.toggle("Enable Automatic Parameter Evaluation", commandsItem.customCommandParametersEnabled);
                                        form5.textField('Parameters for Automatic Parameter Evaluation (requires enable automatic parameter evaluation to be enabled)\nThis is a list of strings stating the parameter types, valid values are "presetText", "number", "boolean", "string", and"json". \npresetText matches a string of text with no quotation marks or spaces in it\nnumber matches a number, boolean matches a boolean\nstring matches either a string of text with no quotation marks or spaces, or a string of text inside of quotation marks that may include spaces and also escape characters\njson matches a JSON array, object, or string\nthis list should always start with presetText to match the command name\nfor example: if you have the command \'say hi "test stuff" 9768 true 8 {"some": "thing", "a": [1, 2, 3, 4, 5]} [1, 2, 3, 4, "5"]\' and you set this value to ["presetText", "presetText", "string", "number", "boolean", "string", "json", "json"] then it would return ["say", "hi", "test stuff", 9768, true, "8", {"some": "thing", "a": [1, 2, 3, 4, 5]}, [1, 2, 3, 4, "5"]]', "JSON", JSONStringify(commandsItem.customCommandParametersList ?? [
                                            "presetText",
                                        ]));
                                        form5.submitButton("Save");
                                        forceShow(form5, sourceEntity)
                                            .then((ha) => {
                                            let h = ha;
                                            if (h.canceled) {
                                                return;
                                            }
                                            if (!!!h
                                                .formValues[0]) {
                                                let formErrora = new MessageFormData();
                                                formErrora.body(`Required parameter 'Command Name' was left blank`);
                                                formErrora.title("Error");
                                                formErrora.button1("Back");
                                                forceShow(formErrora, sourceEntity).then(() => {
                                                    manageCommands(sourceEntity);
                                                    return;
                                                });
                                                return;
                                            }
                                            if (!!command
                                                .getCustomCommands()
                                                .find((v) => v.commandName ==
                                                String(h
                                                    .formValues[0])) &&
                                                String(h
                                                    .formValues[0]) !=
                                                    commandsItem.commandName) {
                                                let formError = new MessageFormData();
                                                formError.body(`There is already a custom command with the name '${String(h
                                                    .formValues[0]).replaceAll("'", "\\'")}, saving this will overwrite it, are you sure you want to do this?\nThis action cannot be undone.`);
                                                formError.title("Error");
                                                formError.button2("Confirm");
                                                formError.button1("Cancel");
                                                forceShow(formError, sourceEntity).then((sa) => {
                                                    console.warn(sa
                                                        .selection);
                                                    if (sa
                                                        .selection ==
                                                        0) {
                                                        manageCommands(sourceEntity);
                                                        return;
                                                    }
                                                    else {
                                                        if (String(h
                                                            .formValues[0]) !=
                                                            commandsItem.commandName) {
                                                            JSONParse(h
                                                                .formValues[9] ==
                                                                ""
                                                                ? "[]"
                                                                : String(h
                                                                    .formValues[9]));
                                                            JSONParse(h
                                                                .formValues[6] ==
                                                                ""
                                                                ? "undefined"
                                                                : String(h
                                                                    .formValues[6] ??
                                                                    "undefined"));
                                                            commandsItem.remove();
                                                            commandsItem.settings.remove();
                                                            new commandSettings("customCommandSettings:" +
                                                                String(h
                                                                    .formValues[0])).save(commandsItem.settings.toJSON());
                                                            commandsItem =
                                                                new command({
                                                                    commandName: String(h
                                                                        .formValues[0]),
                                                                    commands_format_version: commands_format_version,
                                                                    command_version: String(h
                                                                        .formValues[3]),
                                                                    customCommandType: [
                                                                        "commands",
                                                                        "javascript",
                                                                    ][Number(h
                                                                        .formValues[1])],
                                                                    customCommandCodeLines: Number(h
                                                                        .formValues[2]),
                                                                    description: String(h
                                                                        .formValues[5]),
                                                                    type: "custom",
                                                                    formatting_code: String(h
                                                                        .formValues[4]),
                                                                    formats: JSONParse(h
                                                                        .formValues[6] ==
                                                                        ""
                                                                        ? "undefined"
                                                                        : String(h
                                                                            .formValues[6] ??
                                                                            "undefined")),
                                                                    customCommandPrefix: String(h
                                                                        .formValues[7]),
                                                                    customCommandParametersEnabled: Boolean(h
                                                                        .formValues[8]),
                                                                    customCommandId: "customCommand:" +
                                                                        String(h
                                                                            .formValues[0]),
                                                                    commandSettingsId: "customCommandSettings:" +
                                                                        String(h
                                                                            .formValues[0]),
                                                                    customCommandParametersList: JSONParse(h
                                                                        .formValues[9] ==
                                                                        ""
                                                                        ? "[]"
                                                                        : String(h
                                                                            .formValues[9])),
                                                                    format_version: format_version,
                                                                });
                                                            commandsItem.save();
                                                        }
                                                    }
                                                });
                                                manageCommands(sourceEntity);
                                            }
                                            else {
                                                if (String(h
                                                    .formValues[0]) !=
                                                    commandsItem.commandName) {
                                                    JSONParse(h
                                                        .formValues[9] ==
                                                        ""
                                                        ? "[]"
                                                        : String(h
                                                            .formValues[9]));
                                                    JSONParse(h
                                                        .formValues[6] ==
                                                        ""
                                                        ? "undefined"
                                                        : String(h
                                                            .formValues[6] ??
                                                            "undefined"));
                                                    commandsItem.remove();
                                                    commandsItem.settings.remove();
                                                    new commandSettings("customCommandSettings:" +
                                                        String(h
                                                            .formValues[0])).save(commandsItem.settings.toJSON());
                                                    commandsItem =
                                                        new command({
                                                            commandName: String(h
                                                                .formValues[0]),
                                                            commands_format_version: commands_format_version,
                                                            command_version: String(h
                                                                .formValues[3]),
                                                            customCommandType: [
                                                                "commands",
                                                                "javascript",
                                                            ][Number(h
                                                                .formValues[1])],
                                                            customCommandCodeLines: Number(h
                                                                .formValues[2]),
                                                            description: String(h
                                                                .formValues[5]),
                                                            type: "custom",
                                                            formatting_code: String(h
                                                                .formValues[4]),
                                                            formats: JSONParse(h
                                                                .formValues[6] ==
                                                                ""
                                                                ? "undefined"
                                                                : String(h
                                                                    .formValues[6] ??
                                                                    "undefined")),
                                                            customCommandPrefix: String(h
                                                                .formValues[7]),
                                                            customCommandParametersEnabled: Boolean(h
                                                                .formValues[8]),
                                                            customCommandId: "customCommand:" +
                                                                String(h
                                                                    .formValues[0]),
                                                            commandSettingsId: "customCommandSettings:" +
                                                                String(h
                                                                    .formValues[0]),
                                                            customCommandParametersList: JSONParse(h
                                                                .formValues[9] ==
                                                                ""
                                                                ? "[]"
                                                                : String(h
                                                                    .formValues[9])),
                                                            format_version: format_version,
                                                        });
                                                    commandsItem.save();
                                                }
                                                else {
                                                    JSONParse(h
                                                        .formValues[9] ==
                                                        ""
                                                        ? "[]"
                                                        : String(h
                                                            .formValues[9]));
                                                    JSONParse(h
                                                        .formValues[6] ==
                                                        ""
                                                        ? "undefined"
                                                        : String(h
                                                            .formValues[6] ??
                                                            "undefined"));
                                                    new command({
                                                        commandName: String(h
                                                            .formValues[0]),
                                                        commands_format_version: commands_format_version,
                                                        command_version: String(h
                                                            .formValues[3]),
                                                        customCommandType: [
                                                            "commands",
                                                            "javascript",
                                                        ][Number(h
                                                            .formValues[1])],
                                                        customCommandCodeLines: Number(h
                                                            .formValues[2]),
                                                        description: String(h
                                                            .formValues[5]),
                                                        type: "custom",
                                                        formatting_code: String(h
                                                            .formValues[4]),
                                                        formats: JSONParse(h
                                                            .formValues[6] ==
                                                            ""
                                                            ? "undefined"
                                                            : String(h
                                                                .formValues[6] ??
                                                                "undefined")),
                                                        customCommandPrefix: String(h
                                                            .formValues[7]),
                                                        customCommandParametersEnabled: Boolean(h
                                                            .formValues[8]),
                                                        customCommandId: "customCommand:" +
                                                            String(h
                                                                .formValues[0]),
                                                        commandSettingsId: "customCommandSettings:" +
                                                            String(h
                                                                .formValues[0]),
                                                        customCommandParametersList: JSONParse(h
                                                            .formValues[9] ==
                                                            ""
                                                            ? "[]"
                                                            : String(h
                                                                .formValues[9])),
                                                        format_version: format_version,
                                                    }).save();
                                                }
                                                manageCommands(sourceEntity);
                                            }
                                        })
                                            .catch((e) => {
                                            let formError = new MessageFormData();
                                            formError.body(e + e.stack);
                                            formError.title("Error");
                                            formError.button1("Done");
                                            forceShow(formError, sourceEntity).then(() => {
                                                return e;
                                            });
                                        });
                                        break;
                                    case 2:
                                        let form7 = new ModalFormData();
                                        form7.title(`Editing Code for ${commandsItem.commandName}`);
                                        if (commandsItem.customCommandCodeLines ==
                                            1 ||
                                            commandsItem.customCommandCodeLines ==
                                                0 ||
                                            !!!commandsItem.customCommandCodeLines) {
                                            form7.textField("Line " +
                                                0 +
                                                "\nUse ${params[index]} to acess the value of a parameter or to access a javascript variable use ${javascript code}.", commandsItem.customCommandType ==
                                                "commands"
                                                ? "Minecraft Command"
                                                : "JavaScript Code", commandsItem.code[0]);
                                        }
                                        else {
                                            for (let i = 0; i <
                                                commandsItem.customCommandCodeLines; i++) {
                                                form7.textField("Line " +
                                                    i +
                                                    (i == 0
                                                        ? "\nUse ${params[index]} to acess the value of a parameter or to access a javascript variable use ${javascript code}."
                                                        : ""), commandsItem.customCommandType ==
                                                    "commands"
                                                    ? "Minecraft Command"
                                                    : "JavaScript Code", commandsItem
                                                    .code[i]);
                                            }
                                        }
                                        form7.submitButton("Save");
                                        forceShow(form7, sourceEntity)
                                            .then((ha) => {
                                            let h = ha;
                                            if (h.canceled) {
                                                manageCommands(sourceEntity);
                                                return;
                                            }
                                            h.formValues.forEach((v, i) => {
                                                world.setDynamicProperty("customCommandCode:" +
                                                    commandsItem.commandName +
                                                    ":" +
                                                    i, v);
                                            });
                                            world
                                                .getDynamicPropertyIds()
                                                .filter((v) => v.startsWith("customCommandCode:" +
                                                commandsItem.commandName +
                                                ":") &&
                                                Number(v.slice(("customCommandCode:" +
                                                    commandsItem.commandName +
                                                    ":")
                                                    .length)) >=
                                                    commandsItem.customCommandCodeLines)
                                                .forEach((v) => world.setDynamicProperty(v));
                                            manageCommands(sourceEntity);
                                        })
                                            .catch((e) => {
                                            let formError = new MessageFormData();
                                            formError.body(e + e.stack);
                                            formError.title("Error");
                                            formError.button1("Done");
                                            forceShow(formError, sourceEntity).then(() => {
                                                return e;
                                            });
                                        });
                                        break;
                                    case 3:
                                        let form4 = new ActionFormData();
                                        form4.title(`${commandsItem.commandName} Command Info`);
                                        form4.body(`§r§f${
                                        /*arrayModifier(*/ JSON.stringify(commandsItem).replaceAll(/(?<!\\)(?![},:](\"|{\"))\"/g, '§r§f"') /*.split(""), (v, i)=>(Number(String((i/30).toFixed(4)))==Math.round(i/30)?"\n"+v:v))*/}`);
                                        form4.button("Done");
                                        forceShow(form4, sourceEntity)
                                            .then((ha) => {
                                            let h = ha;
                                            if (h.canceled) {
                                                manageCommands(sourceEntity);
                                                return;
                                            }
                                            manageCommands(sourceEntity);
                                        })
                                            .catch((e) => {
                                            let formError = new MessageFormData();
                                            formError.body(e + e.stack);
                                            formError.title("Error");
                                            formError.button1("Done");
                                            forceShow(formError, sourceEntity).then(() => {
                                                return e;
                                            });
                                        });
                                        break;
                                    case 4:
                                        let form6 = new ModalFormData();
                                        form6.title(`Command Settings for ${commandsItem.type} ${commandsItem.commandName}`);
                                        form6.textField("Required Tags", "JSON", JSONStringify(commandsItem
                                            ?.settings
                                            ?.requiredTags ?? [
                                            "canUseChatCommands",
                                        ]));
                                        form6.slider("Required Permission Level", 0, 15, 1, Number(commandsItem
                                            ?.settings
                                            ?.requiredPermissionLevel ??
                                            0));
                                        form6.toggle("Requires OP", commandsItem.settings
                                            ?.requiresOp ?? false);
                                        form6.toggle("Enabled", commandsItem.settings
                                            ?.enabled ?? true);
                                        form6.submitButton("Save");
                                        forceShow(form6, sourceEntity)
                                            .then((ha) => {
                                            let h = ha;
                                            if (h.canceled) {
                                                manageCommands(sourceEntity);
                                                return;
                                            }
                                            commandsItem.settings.save({
                                                requiredTags: h
                                                    .formValues[0] ==
                                                    ""
                                                    ? commandsItem.type ==
                                                        "built-in"
                                                        ? tryget(() => commandsItem
                                                            .settings
                                                            .defaultSettings
                                                            .requiredTags) ??
                                                            []
                                                        : []
                                                    : JSONParse(String(h
                                                        .formValues[0])),
                                                requiredPermissionLevel: Number(h
                                                    .formValues[1]),
                                                requiresOp: Boolean(h
                                                    .formValues[2]),
                                                enabled: Boolean(h
                                                    .formValues[3]),
                                                settings_version: command_settings_format_version,
                                                format_version: format_version,
                                            });
                                            manageCommands(sourceEntity);
                                        })
                                            .catch((e) => {
                                            let formError = new MessageFormData();
                                            formError.body(e + e.stack);
                                            formError.title("Error");
                                            formError.button1("Done");
                                            forceShow(formError, sourceEntity).then(() => {
                                                return e;
                                            });
                                        });
                                        break;
                                    case 5:
                                        manageCommands(sourceEntity);
                                        break;
                                    default:
                                }
                            })
                                .catch((e) => {
                                let formError = new MessageFormData();
                                formError.body(e + e.stack);
                                formError.title("Error");
                                formError.button1("Done");
                                forceShow(formError, sourceEntity).then(() => {
                                    return e;
                                });
                            });
                    }
                })
                    .catch((e) => {
                    let formError = new MessageFormData();
                    formError.body(e + e.stack);
                    formError.title("Error");
                    formError.button1("Done");
                    forceShow(formError, sourceEntity).then(() => {
                        return e;
                    });
                });
        }
    })
        .catch((e) => {
        let formError = new MessageFormData();
        formError.body(e + e.stack);
        formError.title("Error");
        formError.button1("Done");
        forceShow(formError, sourceEntity).then(() => {
            return e;
        });
    });
}
//# sourceMappingURL=manageCommands.js.map