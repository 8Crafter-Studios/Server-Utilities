import { Player, world } from "@minecraft/server";
import { getUICustomForm } from "modules/main/functions/getUICustomForm";
import { forceShow } from "modules/ui/functions/forceShow";
import { customFormDataTypes } from "./customFormDataTypes";
export function showCustomFormUI(UIId, player) {
    let customUI = getUICustomForm("customUIElement:" + UIId, "customUICode:" + UIId);
    let form12345678 = new customFormDataTypes[Number(String(world.getDynamicProperty("customUI:" + UIId)).split("|")[0])]();
    eval(`form12345678.title(${String(world.getDynamicProperty("customUI:" + UIId))
        .split("|")
        .slice(1)
        .join("|")})`);
    customUI.optionElements.forEach((v, i) => {
        try {
            eval("form12345678." +
                v.code
                    .replaceAll(", )", ")")
                    .replaceAll(", )", ")")
                    .replaceAll(", )", ")")
                    .replaceAll(", )", ")")
                    .replaceAll(", )", ")")
                    .replaceAll(", )", ")"));
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }); /*
form12.title({rawtext: [{text: "hi"}]})*/
    let rb;
    forceShow(form12345678, player).then((r) => {
        try {
            rb = r;
            eval(customUI.code);
            // let a = new MessageFormData(); a.body("Are you sure you want to send a teleport requrest to " + world.getAllPlayers()[r.formValues![0]]?.name); a.button1("yes"); a.button2("no"); a.forceShow(player).then(rb=>{if(rb.selection==0){player.runCommandAsync("/scriptevent andexdb:silentCmd \\tpa "+world.getAllPlayers()[r.formValues![0]]?.name)}})
            // /scriptevent andexdb:showCustomUI tpMenu
        }
        catch (e) {
            console.error(e, e.stack);
        }
    });
    return {
        form: form12345678,
        customUI: customUI,
        optionElements: customUI.optionElements,
        formResponse: rb,
    };
}
//# sourceMappingURL=showCustomFormUI.js.map