import { Entity, Player, world } from "@minecraft/server";
import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
import { customFormUICodes } from "../constants/customFormUICodes";
/**
 * Evaluates and displays the auto script settings form to the specified entity.
 *
 * @todo Replace this menu with an action form with buttons for each of the script dynamic properties, allowing the player to edit them directly.
 *
 * @param sourceEntitya - The entity that will receive the form. It can be an instance of `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `1` if the form was successfully shown and processed.
 * - `0` if the form was canceled by the user.
 * - `-2` if an error occurred during the process.
 *
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled and verifies the player's permission to access the settings.
 * 2. Constructs a form with multiple text fields for various script API codes.
 * 3. Displays the form to the player and processes the input values.
 * 4. Updates the dynamic properties of the world based on the input values.
 *
 * @throws Will log an error and return `-2` if an exception occurs during form processing.
 */
export async function evalAutoScriptSettings(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessAdvancedSettings") == false ||
            securityVariables.testPlayerForPermission(sourceEntity, "andexdb.useScriptEval") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permissions to access this menu: andexdb.accessAdvancedSettings, andexdb.useScriptEval", "Back", "Cancel");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    let form2 = new ModalFormData();
    let players = world.getAllPlayers();
    let targetList = [players[0].nameTag];
    for (const index in players) {
        if (Number(index) != 0) {
            targetList = String([String(targetList), players[index].nameTag]).split(",");
        }
    }
    form2.title(customFormUICodes.modal.titles.formStyles.fullscreen + "§r§0Eval Auto Script Settings (§nDEPRECATED§r§0)");
    form2.textField("evalBeforeEvents:chatSend", "JavaScript Script API Code", {
        defaultValue: String(world.getDynamicProperty("evalBeforeEvents:chatSend") ?? ""),
    });
    form2.textField("evalBeforeEvents:dataDrivenEntityTrggerEvent", "JavaScript Script API Code", {
        defaultValue: String(world.getDynamicProperty("evalBeforeEvents:dataDrivenEntityTriggerEvent") ?? ""),
    });
    form2.textField("evalBeforeEvents:effectAdd", "JavaScript Script API Code", {
        defaultValue: String(world.getDynamicProperty("evalBeforeEvents:effectAdd") ?? ""),
    });
    form2.textField("evalBeforeEvents:entityRemove", "JavaScript Script API Code", {
        defaultValue: String(world.getDynamicProperty("evalBeforeEvents:entityRemove")),
    });
    form2.textField("evalBeforeEvents:explosion", "JavaScript Script API Code", {
        defaultValue: String(world.getDynamicProperty("evalBeforeEvents:explosion")),
    });
    form2.textField("evalBeforeEvents:itemDefinitionEvent", "JavaScript Script API Code", {
        defaultValue: String(world.getDynamicProperty("evalBeforeEvents:itemDefinitionEvent") ?? ""),
    });
    form2.textField("evalBeforeEvents:itemUse", "JavaScript Script API Code", {
        defaultValue: String(world.getDynamicProperty("evalBeforeEvents:itemUse") ?? ""),
    });
    form2.textField("evalBeforeEvents:itemUseOn", "JavaScript Script API Code", {
        defaultValue: String(world.getDynamicProperty("evalBeforeEvents:itemUseOn") ?? ""),
    });
    form2.textField("evalBeforeEvents:pistonActivate", "JavaScript Script API Code", {
        defaultValue: String(world.getDynamicProperty("evalBeforeEvents:pistonActivate") ?? ""),
    });
    form2.textField("evalBeforeEvents:playerBreakBlock", "JavaScript Script API Code", {
        defaultValue: String(world.getDynamicProperty("evalBeforeEvents:playerBreakBlock") ?? ""),
    });
    form2.textField("evalBeforeEvents:playerInteractWithBlock", "JavaScript Script API Code", {
        defaultValue: String(world.getDynamicProperty("evalBeforeEvents:playerInteractWithBlock") ?? ""),
    });
    form2.textField("evalBeforeEvents:playerInteractWithEntity", "JavaScript Script API Code", {
        defaultValue: String(world.getDynamicProperty("evalBeforeEvents:playerInteractWithEntity") ?? ""),
    });
    form2.textField("evalBeforeEvents:playerLeave", "JavaScript Script API Code", {
        defaultValue: String(world.getDynamicProperty("evalBeforeEvents:playerLeave") ?? ""),
    });
    form2.textField("evalBeforeEvents:playerPlaceBlock", "JavaScript Script API Code", {
        defaultValue: String(world.getDynamicProperty("evalBeforeEvents:playerPlaceBlock") ?? ""),
    });
    form2.textField("evalAfterEvents:blockExplode", "JavaScript Script API Code", {
        defaultValue: String(world.getDynamicProperty("evalAfterEvents:blockExplode") ?? ""),
    });
    form2.textField("evalAfterEvents:playerLeave", "JavaScript Script API Code", {
        defaultValue: String(world.getDynamicProperty("evalAfterEvents:playerLeave") ?? ""),
    });
    form2.textField("evalAfterEvents:entityDie", "JavaScript Script API Code", {
        defaultValue: String(world.getDynamicProperty("evalAfterEvents:entityDie") ?? ""),
    }); /*
    form2.textField("Slot Number", "Slot Number", {defaultValue: "0"});
    form2.dropdown("Player Target", String(targetList).split(","), 0)
    form2.dropdown("Player Viewer", String(targetList).split(","), 0)
    form2.toggle("Debug2", {defaultValue: false});*/
    form2.submitButton("Save");
    return await forceShow(form2, sourceEntity)
        .then((to) => {
        let t = to;
        if (t.canceled) {
            return 1;
        }
        let [becs, beddete, beea, beer, bee, beide, beiu, beiuo, bepa, bepbb, bepiwb, bepiwe, bepl, beppb, aebe, aepl, aeed] = t.formValues;
        world.setDynamicProperty("evalBeforeEvents:chatSend", becs);
        world.setDynamicProperty("evalBeforeEvents:dataDrivenEntityTrggerEvent", beddete);
        world.setDynamicProperty("evalBeforeEvents:effectAdd", beea);
        world.setDynamicProperty("evalBeforeEvents:entityRemove", beer);
        world.setDynamicProperty("evalBeforeEvents:explosion", bee);
        world.setDynamicProperty("evalBeforeEvents:itemDefinitionEvent", beide);
        world.setDynamicProperty("evalBeforeEvents:itemUse", beiu);
        world.setDynamicProperty("evalBeforeEvents:itemUseOn", beiuo);
        world.setDynamicProperty("evalBeforeEvents:pistonActivate", bepa);
        world.setDynamicProperty("evalBeforeEvents:playerBreakBlock", bepbb);
        world.setDynamicProperty("evalBeforeEvents:playerInteractWithBlock", bepiwb);
        world.setDynamicProperty("evalBeforeEvents:playerInteractWithEntity", bepiwe);
        world.setDynamicProperty("evalBeforeEvents:playerLeave", bepl);
        world.setDynamicProperty("evalBeforeEvents:playerPlaceBlock", beppb);
        world.setDynamicProperty("evalAfterEvents:blockExplode", aebe);
        world.setDynamicProperty("evalAfterEvents:playerLeave", aepl);
        world.setDynamicProperty("evalAfterEvents:entityDie", aeed);
        return 1;
    })
        .catch((e) => {
        console.error(e, e.stack);
        return -2;
    });
}
//# sourceMappingURL=evalAutoScriptSettings.js.map