import { Player, world } from "@minecraft/server";
import { forceShow } from "modules/ui/functions/forceShow";
import { customElementTypeIds } from "./customElementTypeIds";
import { customFormListSelectionMenu } from "./customFormListSelectionMenu";
import { editCustomFormUI } from "./editCustomFormUI";
export function customFormUIEditor(UIId, player, goBackToMenu = false) {
    let players = world.getAllPlayers();
    let targetList = [players[0].nameTag];
    for (const index in players) {
        if (Number(index) != 0) {
            targetList = String([
                String(targetList),
                players[index].nameTag,
            ]).split(",");
        }
    }
    let formId = UIId.slice(9);
    let form = editCustomFormUI(formId);
    forceShow(form.form, player)
        .then((to) => {
        let t = to;
        if (t.canceled)
            return;
        world.setDynamicProperty(`customUI:${formId}`, `${t.formValues[0]}|${t.formValues[1]}`);
        let elementValues = t.formValues.slice(2, -2);
        console.warn(elementValues);
        elementValues.forEach((v, i) => {
            switch (i % 7) {
                case 0:
                    world.setDynamicProperty(`customUIElement:${formId}|${form.indexList[Math.floor(i / 7)]}`, `${customElementTypeIds[Number(elementValues[i])]}|${elementValues.slice(i + 1, i + 6).join("|")}`);
                    break;
                case 6:
                    if (Boolean(v) == true) {
                        world.setDynamicProperty(`customUIElement:${formId}|${form.indexList[Math.floor(i / 7)]}`);
                    }
                    break;
            }
        });
        if (t.formValues[t.formValues.length - 2]) {
            world.setDynamicProperty(`customUIElement:${formId}|${Number(t.formValues[t.formValues.length - 1]) ??
                (form.indexList[form.indexList.length - 1] ?? -1) + 1}`, "");
        }
        if (goBackToMenu == true) {
            customFormListSelectionMenu(player);
        }
    })
        .catch((e) => {
        console.error(e, e.stack);
    });
}
//# sourceMappingURL=customFormUIEditor.js.map