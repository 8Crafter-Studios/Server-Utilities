import { Entity, Player, Dimension, world } from "@minecraft/server";
import { ModalFormData, ModalFormResponse, MessageFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { targetSelectorAllListC } from "modules/command_utilities/functions/targetSelectorAllListC";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
export async function createExplosion(sourceEntitya, parameterDefaults) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    let form = new ModalFormData();
    form.title("Create Explosion");
    form.textField("x", "number", { defaultValue: String(parameterDefaults?.x ?? sourceEntity.location.x) });
    form.textField("y", "number", { defaultValue: String(parameterDefaults?.y ?? sourceEntity.location.y) });
    form.textField("z", "number", { defaultValue: String(parameterDefaults?.z ?? sourceEntity.location.z) });
    form.textField("dimension", "dimensionId", { defaultValue: String(parameterDefaults?.dimension?.id ?? sourceEntity.dimension.id) });
    form.textField("radius", "number", { defaultValue: String(parameterDefaults?.radius ?? 1) });
    form.textField("source", "targetSelector", { defaultValue: parameterDefaults?.source });
    form.toggle("allowUnderwater", { defaultValue: parameterDefaults?.explosionOptions?.allowUnderwater ?? false });
    form.toggle("breaksBlocks", { defaultValue: parameterDefaults?.explosionOptions?.breaksBlocks ?? true });
    form.toggle("causesFire", { defaultValue: parameterDefaults?.explosionOptions?.causesFire ?? false });
    form.submitButton("Create");
    return await forceShow(form, sourceEntity)
        .then((ra) => {
        let r = ra;
        if (r.canceled) {
            return 1;
        }
        let [x, y, z, dimension, radius, source, allowUnderwater, breaksBlocks, causesFire] = r.formValues;
        try {
            world.getDimension(String(dimension)).createExplosion({ x: Number(x), y: Number(y), z: Number(z) }, Number(radius), {
                allowUnderwater: Boolean(allowUnderwater),
                breaksBlocks: Boolean(breaksBlocks),
                causesFire: Boolean(causesFire),
                source: source == ""
                    ? undefined
                    : targetSelectorAllListC(String(source), "", `${sourceEntity.location.x} ${sourceEntity.location.y} ${sourceEntity.location.z}`, sourceEntity)[0],
            });
        }
        catch (e) {
            console.error(e, e.stack);
        }
        return 1;
    })
        .catch(async (e) => {
        let formError = new MessageFormData();
        formError.body(e + e.stack);
        formError.title("Error");
        formError.button1("Back");
        formError.button2("Close");
        return await forceShow(formError, sourceEntity).then((r) => {
            return (1 - r.selection);
        });
    });
}
//# sourceMappingURL=createExplosion.js.map