import { Entity, Player, system } from "@minecraft/server";
import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showMessage } from "modules/utilities/functions/showMessage";
import { customFormUICodes } from "../constants/customFormUICodes";
/**
 * Displays a modal form to the player for running a command with an optional delay.
 *
 * @param sourceEntitya - The entity that will receive the form. It can be an instance of `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to `0` if the previous menu should not be re-opened, or `1` if the previous menu should be re-opened.
 * @throws {TypeError} If the provided entity is not an instance of `Player` or `executeCommandPlayerW` with a linked `Player`.
 */
export async function terminal(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    if (!(sourceEntity instanceof Player)) {
        throw new TypeError("Invalid Player. Expected an instance of the Player class, or an instance of the executeCommandPlayerW class with a Player linked to it, but instead got " + (typeof sourceEntity == "object" ? sourceEntity === null ? "object[null]" : "object[" + (sourceEntity.constructor.name ?? "unknown") + "]" : typeof sourceEntity) + ".");
    }
    let form = new ModalFormData();
    form.title(customFormUICodes.modal.titles.formStyles.fullscreen + "Command Runner / Terminal");
    form.textField("Run Command", "Run Command");
    form.textField("Run Delay", "Run Delay");
    // form.toggle("Debug", false);
    form.submitButton("Run");
    return await forceShow(form, sourceEntity)
        .then((ra) => {
        let r = ra;
        if (r.canceled)
            return 1;
        let [commandId, commandDelay /* , debug */] = r.formValues;
        system.runTimeout(() => {
            try {
                sourceEntity.sendMessage(String(sourceEntity.runCommand(String(commandId))
                    .successCount));
            }
            catch (e) {
                sourceEntity.sendMessage("§cAn error occurred while running the commmand through the command runner: " + e + e.stack);
            }
        }, Number(commandDelay));
        return 1;
    })
        .catch(async (e) => {
        console.error(e, e.stack);
        return ((await showMessage(sourceEntity, "Error", e + e.stack, "Back", "Close")).selection == 0).toNumber();
    });
}
//# sourceMappingURL=terminal.js.map