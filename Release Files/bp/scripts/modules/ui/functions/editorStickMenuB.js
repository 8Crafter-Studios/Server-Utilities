import { Entity, Player, world } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { editorStickB } from "./editorStickB";
export function editorStickMenuB(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    let form = new ModalFormData();
    let playerList = world.getPlayers();
    form.textField("Block Dimension", "Block Dimension", String(sourceEntity.dimension.id));
    form.textField("Block X", "Block X", String(sourceEntity.location.x));
    form.textField("Block Y", "Block Y", String(sourceEntity.location.y));
    form.textField("Block Z", "Block Z", String(sourceEntity.location.z));
    form.submitButton("Edit");
    form.show(sourceEntity)
        .then((r) => {
        if (r.canceled)
            return;
        let [blockDimension, blockX, blockY, blockZ] = r.formValues; /*
let blockPropertyValue2: any
sourceEntity.runCommand("/scriptevent andexdb:debugStickB coordinates:"*/ /*"aslk"*/ /* + blockDimension + "|" + blockX + "|" + blockY + "|" + blockZ)*/
        editorStickB(sourceEntity, {
            dimension: world.getDimension(String(blockDimension)),
            x: Number(blockX),
            y: Number(blockY),
            z: Number(blockZ),
        });
    })
        .catch((e) => {
        console.error(e, e.stack);
    });
}
//# sourceMappingURL=editorStickMenuB.js.map