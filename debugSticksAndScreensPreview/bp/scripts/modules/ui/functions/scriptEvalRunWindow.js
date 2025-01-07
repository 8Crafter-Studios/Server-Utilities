import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
export function scriptEvalRunWindow(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    let form = new ModalFormData();
    form.title("Script Evaluate Run Window");
    form.textField("Script", "JavaScript");
    form.textField("Script", "JavaScript");
    form.textField("Script", "JavaScript");
    form.textField("Script", "JavaScript");
    form.textField("Script", "JavaScript");
    form.textField("Script", "JavaScript");
    form.textField("Script", "JavaScript");
    form.textField("Script", "JavaScript");
    form.submitButton("Run");
    forceShow(form, sourceEntity)
        .then((ro) => {
        let r = ro;
        if (r.canceled)
            return;
        let runScriptForEval = r.formValues;
        eval(String(runScriptForEval.join("\n")));
    })
        .catch((e) => {
        console.error(e, e.stack);
    });
}
//# sourceMappingURL=scriptEvalRunWindow.js.map