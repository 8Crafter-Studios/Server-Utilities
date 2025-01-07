import { Player, world } from "@minecraft/server";
import { forceShow } from "modules/ui/functions/forceShow";
import { customFormListSelectionMenu } from "./customFormListSelectionMenu";
import { editCustomFormUI } from "./editCustomFormUI";
export function customFormUIEditorCode(UIId, player, goBackToMenu = false) {
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
    forceShow(form.formB, player)
        .then((to) => {
        let t = to;
        if (t.canceled)
            return;
        let elementValues = t.formValues.slice(0, -2);
        console.warn(elementValues);
        elementValues.forEach((v, i) => {
            switch (i % 2) {
                case 0:
                    world.setDynamicProperty(`customUICode:${formId}|${form.indexListB[Math.floor(i / 2)]}`, `${String(elementValues[i])}`);
                    break;
                case 1:
                    if (Boolean(v) == true) {
                        world.setDynamicProperty(`customUICode:${formId}|${form.indexListB[Math.floor(i / 2)]}`);
                    }
                    break;
            }
        });
        if (t.formValues[t.formValues.length - 2]) {
            world.setDynamicProperty(`customUICode:${formId}|${Number(t.formValues[t.formValues.length - 1]) ??
                (form.indexListB[form.indexListB.length - 1] ?? -1) + 1}`, "");
        }
        if (goBackToMenu == true) {
            customFormListSelectionMenu(player);
        }
    })
        .catch((e) => {
        console.error(e, e.stack);
    });
}
//# sourceMappingURL=customFormUIEditorCode.js.map