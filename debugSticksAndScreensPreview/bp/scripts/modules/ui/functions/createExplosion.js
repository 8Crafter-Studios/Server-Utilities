import { Entity, Player, Dimension, world } from "@minecraft/server";
import { ModalFormData, ModalFormResponse, MessageFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { targetSelectorAllListC } from "modules/command_utilities/functions/targetSelectorAllListC";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
export function createExplosion(sourceEntitya, parameterDefaults) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    let form = new ModalFormData();
    form.title("Create Explosion");
    form.textField("x", "number", String(parameterDefaults?.x ?? sourceEntity.location.x));
    form.textField("y", "number", String(parameterDefaults?.y ?? sourceEntity.location.y));
    form.textField("z", "number", String(parameterDefaults?.z ?? sourceEntity.location.z));
    form.textField("dimension", "dimensionId", String(parameterDefaults?.dimension?.id ?? sourceEntity.dimension.id));
    form.textField("radius", "number", String(parameterDefaults?.radius ?? 1));
    form.textField("source", "targetSelector", parameterDefaults?.source);
    form.toggle("allowUnderwater", parameterDefaults?.explosionOptions?.allowUnderwater ?? false);
    form.toggle("breaksBlocks", parameterDefaults?.explosionOptions?.breaksBlocks ?? true);
    form.toggle("causesFire", parameterDefaults?.explosionOptions?.causesFire ?? false);
    form.submitButton("Create");
    forceShow(form, sourceEntity)
        .then((ra) => {
        let r = ra;
        if (r.canceled) {
            return;
        }
        let [x, y, z, dimension, radius, source, allowUnderwater, breaksBlocks, causesFire,] = r.formValues;
        try {
            world
                .getDimension(String(dimension))
                .createExplosion({ x: Number(x), y: Number(y), z: Number(z) }, Number(radius), {
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
//# sourceMappingURL=createExplosion.js.map