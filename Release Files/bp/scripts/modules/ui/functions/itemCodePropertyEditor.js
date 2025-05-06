import { ModalFormData, ModalFormResponse, MessageFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
export function itemCodePropertyEditor(sourceEntitya, item) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    let form = new ModalFormData();
    form.title("Code Editor");
    form.textField("Item Use Code", "JavaScript", { defaultValue: String(item.getDynamicProperty("code")) });
    form.textField("Item Use On Code", "JavaScript", {
        defaultValue: !!item.getDynamicProperty("itemUseOnCode") ? String(item.getDynamicProperty("itemUseOnCode")) : undefined,
    });
    form.submitButton("Done");
    forceShow(form, sourceEntity)
        .then((ra) => {
        let r = ra;
        if (r.canceled) {
            return;
        }
        let [code, itemUseOnCode] = r.formValues;
        try {
            if (String(code) != String(item.getDynamicProperty("code"))) {
                item.setDynamicProperty("code", String(code));
            }
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            if (itemUseOnCode == "" ? undefined : String(itemUseOnCode) != String(item.getDynamicProperty("itemUseOnCode"))) {
                item.setDynamicProperty("itemUseOnCode", itemUseOnCode == "" ? undefined : String(itemUseOnCode));
            }
        }
        catch (e) {
            console.error(e, e.stack);
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
//# sourceMappingURL=itemCodePropertyEditor.js.map