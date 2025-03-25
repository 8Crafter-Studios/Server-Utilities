import { Entity, Player, world } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { editorStickC } from "./editorStickC";
export function editorStickMenuC(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    let form = new ModalFormData();
    let playerList = world.getPlayers();
    form.toggle("includeLiquidBlocks", true);
    form.toggle("includePassableBlocks", true);
    form.textField("maxDistance ( Optional )", "maxDistance ( Optional )");
    forceShow(form, sourceEntity)
        .then((r) => {
        if (r.canceled)
            return;
        let [includeLiquidBlocks, includePassableBlocks, maxDistance] = r.formValues;
        editorStickC(sourceEntitya, includeLiquidBlocks, includePassableBlocks, maxDistance == "" ? undefined : Number(maxDistance));
    })
        .catch((e) => {
        console.error(e, e.stack);
    });
}
//# sourceMappingURL=editorStickMenuC.js.map