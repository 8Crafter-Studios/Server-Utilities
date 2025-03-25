import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { srun } from "init/functions/srun";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { generateNBTFileB } from "modules/commands/functions/generateNBTFileB";
import { chunkIndexToBoundingBox } from "modules/coordinates/functions/chunkIndexToBoundingBox";
import { getChunkIndex } from "modules/coordinates/functions/getChunkIndex";
export function mapArtGeneratorB(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    srun(() => {
        let form = new ModalFormData();
        form.title("Map Art Generator [§cExperimental§r]");
        form.textField("To use this generator you must first use something like cubical.xyz to convert an image to a minecraft structure, then save that structure as a .nbt file, then convert that .nbt file to SNBT format, then paste the SNBT into the text box below. \nNote: When pasting into the text box the game might freeze for a few minutes until it finishes pasting, and then it will unfreeze. \nSNBT of the .nbt file", "SNBT Data");
        form.textField("Chunk Index x", "integer", String(Math.floor(getChunkIndex(sourceEntity.location).x / 8)));
        form.textField("Chunk Index y", "integer", String(Math.floor(getChunkIndex(sourceEntity.location).y / 8)));
        form.dropdown("Dimension", dimensions.map((d) => dimensionTypeDisplayFormatting[d.id]), dimensions.indexOf(sourceEntity.dimension));
        form.submitButton("Generate Map Art");
        forceShow(form, sourceEntity)
            .then((ra) => {
            let r = ra;
            // This will stop the code when the player closes the form
            if (r.canceled)
                return;
            // This will assign every input their own variable
            let [snbt, chunkx, chunky, dimension] = r.formValues; /*
    console.warn(r.formValues);*/
            if (String(snbt).includes("#")) {
                sourceEntity.sendMessage("§6Warning: The snbt was censored! ");
            }
            let newsnbta = JSON.parse(snbt.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?[\s\n]*:[\s\n]*([\"\'\`funIN\-0-9\{\[])/g, '"$2":$4'));
            //let newsnbta = JSONParse((snbt as string).replaceAll(/(?<!(?<!^([^"]*["][^"]*)+)(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*)(?<prefix>[\{\,])[\s\n]*(?<identifier>[\-\_a-zA-Z0-9\.\+]*)[\s\n]*\:[\s\n]*(?!([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*(?!([^"]*["][^"]*)+$))/g, "$<prefix>\"$<identifier>\":"))
            generateNBTFileB(Object.assign(chunkIndexToBoundingBox({
                x: chunkx,
                y: chunky,
            }).from, {
                dimension: dimensions[dimension] ??
                    sourceEntity.dimension,
                y: (dimensions[dimension] ??
                    sourceEntity.dimension).heightRange.max -
                    (newsnbta.size[1] ?? 1),
            }), newsnbta);
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
//# sourceMappingURL=mapArtGeneratorB.js.map