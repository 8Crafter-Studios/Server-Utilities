import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { srun } from "init/functions/srun";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { generateNBTFileD } from "modules/commands/functions/generateNBTFileD";
//evaluateParameters("{a: \"a\", \"b\": \"b\"}", [{type: "json"}])
export function nbtStructureLoader(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    srun(() => {
        let form = new ModalFormData();
        form.title("Java NBT Structure Loader [§cExperimental§r]");
        form.textField("§fFor info on how to use this loader, go to §bhttps://sites.google.com/view/8craftermods/debug-sticks-add-on/andexdbnbtstructureloader§f\nNote: When pasting the nbt data into the text box the game might freeze for anywhere from a few seconds to half a hour depending on how much text is being pasted while it is pasting, and then it will unfreeze. \nNBT Data", "NBT Data");
        form.textField("spawn position x", "integer", String(sourceEntity.location.x));
        form.textField("spawn position y", "integer", String(sourceEntity.location.y));
        form.textField("spawn position z", "integer", String(sourceEntity.location.z));
        form.dropdown("Dimension", dimensions.map((d) => dimensionTypeDisplayFormatting[d.id]), dimensions.indexOf(sourceEntity.dimension));
        form.submitButton("Load Java NBT Structure");
        forceShow(form, sourceEntity)
            .then((ra) => {
            let r = ra;
            // This will stop the code when the player closes the form
            if (r.canceled)
                return;
            // This will assign every input their own variable
            let [snbt, x, y, z, dimension] = r.formValues; /*
    console.warn(r.formValues);*/
            if (String(snbt).includes("#")) {
                sourceEntity.sendMessage("§6Warning: The snbt was censored! ");
            }
            let newsnbta = JSON.parse(snbt.replace(/(?<=[,\{][\s\n]*?)(['"])?(?<vb>[a-zA-Z0-9_]+)(['"])?[\s\n]*:[\s\n]*(?<vd>false|true|undefined|NULL|Infinity|-Infinity|[\-\+]?[0-9]+|"(?:[^"]|(?<=([^\\])(\\\\)*?\\)")*"|'(?:[^']|(?<=([^\\])(\\\\)*?\\)')*')(?=[\s\n]*?[,\}])/g, '"$<vb>":$<vd>'));
            //let newsnbta = JSONParse((snbt as string).replaceAll(/(?<!(?<!^([^"]*["][^"]*)+)(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*)(?<prefix>[\{\,])[\s\n]*(?<identifier>[\-\_a-zA-Z0-9\.\+]*)[\s\n]*\:[\s\n]*(?!([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*(?!([^"]*["][^"]*)+$))/g, "$<prefix>\"$<identifier>\":"))
            generateNBTFileD({
                dimension: dimensions[dimension] ??
                    sourceEntity.dimension,
                x: Number(x) ?? sourceEntity.location.x,
                y: Number(y) ?? sourceEntity.location.y,
                z: Number(z) ?? sourceEntity.location.z,
            }, newsnbta, sourceEntity);
            // Do something
        })
            .catch((e) => {
            console.error(e, e.stack);
        });
    }); /*
    try { (sourceEntity).runCommand(String("/scriptevent andexdb:commandRunner hisa")); }
    // Do something
catch(e) {
    console.error(e, e.stack);
};*/
}
//# sourceMappingURL=nbtStructureLoader.js.map