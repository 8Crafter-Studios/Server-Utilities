import { ActionFormData, ActionFormResponse, ModalFormData, ModalFormResponse, MessageFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
export function itemDynamicPropertyEditor(sourceEntitya, item) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    let formb = new ActionFormData();
    formb.title("Item Dynamic Property Editor");
    formb.button("Add Property");
    formb.button("§cEdit Property");
    formb.button("§cRemove Property");
    formb.button("Back");
    forceShow(formb, sourceEntity)
        .then((ba) => {
        let b = ba;
        if (b.canceled) {
            return;
        }
        let form = new ModalFormData();
        form.title("Item Dynamic Property Editor");
        let properties = item.getDynamicPropertyIds();
        switch (b.selection) {
            case 0:
                form.textField("Property Name", "string");
                form.textField("Property Value", "string|number|boolean|vector3json");
                form.dropdown("Property Type", [
                    "String",
                    "Number",
                    "Boolean",
                    "Vector3",
                ]);
                form.submitButton("Add Property");
                forceShow(form, sourceEntity)
                    .then((ra) => {
                    let r = ra;
                    if (r.canceled) {
                        return;
                    }
                    let [name, value, type] = r.formValues;
                    try {
                        item.setDynamicProperty(String(name), Number(type) == 0
                            ? String(value)
                            : Number(type) == 1
                                ? Number(value)
                                : Number(type) == 2
                                    ? Boolean(value)
                                    : JSONParse(String(value)));
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
//# sourceMappingURL=itemDynamicPropertyEditor.js.map