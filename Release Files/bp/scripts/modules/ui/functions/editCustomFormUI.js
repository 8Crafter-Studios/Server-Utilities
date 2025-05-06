import { world } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";
import { getUICustomForm } from "modules/main/functions/getUICustomForm";
import { customElementTypeIds } from "./customElementTypeIds";
import { customFormDataTypeIds } from "./customFormDataTypeIds";
export function editCustomFormUI(UIId) {
    let customUI = getUICustomForm("customUIElement:" + UIId, "customUICode:" + UIId);
    let variableList = "formType, formTitle";
    let form12 = new ModalFormData();
    let form1234 = new ModalFormData();
    let indexList;
    indexList = [];
    let indexListB;
    indexListB = [];
    form12.dropdown("Form Type", customFormDataTypeIds, { defaultValueIndex: Number(String(world.getDynamicProperty("customUI:" + UIId)).split("|")[0]) });
    form12.textField("Form Title (JavaScript Code)", '"My Form" or {rawtext: [{text: "hi"}]}', {
        defaultValue: String(world.getDynamicProperty("customUI:" + UIId))
            .split("|")
            .slice(1)
            .join("|"),
    });
    customUI.optionElements.forEach((element, index) => {
        form12.dropdown("§lElement " + Number(element.index) + "§r§f\nElement Type", customElementTypeIds, { defaultValueIndex: element.typeIndex });
        form12.textField("Element Argument 1", "JavaScript Code", { defaultValue: element.args[0]?.toString() });
        form12.textField("Element Argument 2", "JavaScript Code", { defaultValue: element.args[1]?.toString() });
        form12.textField("Element Argument 3", "JavaScript Code", { defaultValue: element.args[2]?.toString() });
        form12.textField("Element Argument 4", "JavaScript Code", { defaultValue: element.args[3]?.toString() });
        form12.textField("Element Argument 5", "JavaScript Code", { defaultValue: element.args[4]?.toString() });
        form12.toggle("Remove Element " + element.index);
        indexList.push(element.index);
        variableList =
            variableList +
                ", elementType" +
                index +
                ", elementArgumentA" +
                index +
                ", elementArgumentB" +
                index +
                ", elementArgumentC" +
                index +
                ", elementArgumentD" +
                index +
                ", elementArgumentE" +
                index +
                ", removeElement" +
                index;
    });
    customUI.codeValues.forEach((element, index) => {
        if (index == 0) {
            form1234.textField('The response variable is "r", if ActionFormData or MessageFormData was chosen then r.selection can be used to see which button was chosen, and if ModalFormData was chosen then r.formValues can be used to get an array containing the values of the form. \nCode Line ' +
                Number(customUI.codeIds[index].split("|")[1]), "JavaScript Code", { defaultValue: element });
        }
        else {
            form1234.textField("Code Line " + Number(customUI.codeIds[index].split("|")[1]), "JavaScript Code", { defaultValue: element });
        }
        form1234.toggle("Remove Code Line " + Number(customUI.codeIds[index].split("|")[1]));
        indexListB.push(Number(customUI.codeIds[index].split("|")[1]));
    });
    form1234.toggle("New Code Line");
    form1234.textField("New Code Line Index", "Number", { defaultValue: String((indexListB[indexListB.length - 1] ?? 0) + 1) });
    form1234.submitButton("Save");
    form12.toggle("New Element");
    form12.textField("New Element Index", "Number", { defaultValue: String((indexList[indexList.length - 1] ?? 0) + 1) });
    form12.submitButton("Save");
    return { form: form12, variableList: variableList, indexList: indexList, formB: form1234, indexListB: indexListB };
}
//# sourceMappingURL=editCustomFormUI.js.map