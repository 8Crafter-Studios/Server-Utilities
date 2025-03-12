import { Player } from "@minecraft/server";
import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showMessage } from "modules/utilities/functions/showMessage";
import { customFormUICodes } from "../constants/customFormUICodes";
/**
 * Displays a modal form to the player for evaluating and running a script.
 *
 * @param sourceEntitya - The entity that initiated the script evaluation. It can be an instance of `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to `0` if the previous menu should not be re-opened, or `1` if the previous menu should be re-opened.
 * @throws {TypeError} If the provided `sourceEntitya` is not an instance of `Player` or `executeCommandPlayerW` with a linked `Player`.
 */
export async function scriptEvalRunWindow(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    if (!(sourceEntity instanceof Player)) {
        throw new TypeError("Invalid Player. Expected an instance of the Player class, or an instance of the executeCommandPlayerW class with a Player linked to it, but instead got " + (typeof sourceEntity == "object" ? sourceEntity === null ? "object[null]" : "object[" + (sourceEntity.constructor.name ?? "unknown") + "]" : typeof sourceEntity) + ".");
    }
    let form = new ModalFormData();
    form.title(customFormUICodes.modal.titles.formStyles.fullscreen + "Script Evaluate Run Window");
    form.textField("Script", "JavaScript");
    form.textField("Script", "JavaScript");
    form.textField("Script", "JavaScript");
    form.textField("Script", "JavaScript");
    form.textField("Script", "JavaScript");
    form.textField("Script", "JavaScript");
    form.textField("Script", "JavaScript");
    form.textField("Script", "JavaScript");
    form.submitButton("Run");
    return await forceShow(form, sourceEntity)
        .then((ro) => {
        let r = ro;
        if (r.canceled)
            return 1;
        let runScriptForEval = r.formValues;
        eval(String(runScriptForEval.join("\n")));
        return 1;
    })
        .catch(async (e) => {
        console.error(e, e.stack);
        return ((await showMessage(sourceEntity, "Error", e + e.stack, "Back", "Close")).selection == 0).toNumber();
    });
}
//# sourceMappingURL=scriptEvalRunWindow.js.map