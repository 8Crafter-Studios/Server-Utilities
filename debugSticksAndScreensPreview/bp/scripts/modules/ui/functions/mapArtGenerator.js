import { Vector3Utils } from "@minecraft/math.js";
import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { srun } from "init/functions/srun";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { generateNBTFileD } from "modules/commands/functions/generateNBTFileD";
import { chunkIndexToBoundingBox } from "modules/coordinates/functions/chunkIndexToBoundingBox";
import { getChunkIndex } from "modules/coordinates/functions/getChunkIndex";
export function mapArtGenerator(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    srun(() => {
        let form = new ModalFormData();
        form.title("Map Art Generator [§cExperimental§r]");
        form.textField("§fFor info on how to use this generator, go to §bhttps://sites.google.com/view/8craftermods/debug-sticks-add-on/andexdbnbtstructureloader§f\nNote: When pasting the nbt data into the text box the game might freeze for anywhere from a few seconds to half a hour depending on how much text is being pasted while it is pasting, and then it will unfreeze. \nNBT Data", "NBT Data");
        form.textField("Chunk Index x", "integer", String(getChunkIndex(sourceEntity.location).x));
        form.textField("Chunk Index y", "integer", String(getChunkIndex(sourceEntity.location).y));
        form.textField("Offset x", "integer", "0");
        form.textField("Offset z", "integer", "0");
        form.dropdown("Alignment Mode", ["Chunk Grid", "Map Grid"], 1);
        form.dropdown("Dimension", dimensions.map((d) => dimensionTypeDisplayFormatting[d.id]), dimensions.indexOf(sourceEntity.dimension));
        form.submitButton("Generate Map Art");
        forceShow(form, sourceEntity)
            .then((ra) => {
            let r = ra;
            // This will stop the code when the player closes the form
            if (r.canceled)
                return;
            // This will assign every input their own variable
            let [snbt, chunkx, chunky, offsetx, offsetz, alignmentmode, dimension,] = r.formValues; /*
    console.warn(r.formValues);*/
            if (String(snbt).includes("#")) {
                sourceEntity.sendMessage("§6Warning: The snbt was censored! ");
            }
            let newsnbta = JSON.parse(snbt.replace(/(?<=[,\{][\s\n]*?)(['"])?(?<vb>[a-zA-Z0-9_]+)(['"])?[\s\n]*:[\s\n]*(?<vd>false|true|undefined|NULL|Infinity|-Infinity|[\-\+]?[0-9]+|"(?:[^"]|(?<=([^\\])(\\\\)*?\\)")*"|'(?:[^']|(?<=([^\\])(\\\\)*?\\)')*')(?=[\s\n]*?[,\}])/g, '"$<vb>":$<vd>'));
            //let newsnbta = JSONParse((snbt as string).replaceAll(/(?<!(?<!^([^"]*["][^"]*)+)(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*)(?<prefix>[\{\,])[\s\n]*(?<identifier>[\-\_a-zA-Z0-9\.\+]*)[\s\n]*\:[\s\n]*(?!([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*(?!([^"]*["][^"]*)+$))/g, "$<prefix>\"$<identifier>\":"))
            //console.warn(JSONStringify(Object.assign(Vector3Utils.add({x: Number(offsetx), y: 0, z: Number(offsetz)}, chunkIndexToBoundingBox({x: (alignmentmode==1?((Math.floor(Number(chunkx) / 8)*8)+4):Number(chunkx)), y: (alignmentmode==1?((Math.floor(Number(chunky) / 8)*8)+4):Number(chunky))}).from), {dimension: dimensions[dimension as number]??sourceEntity.dimension, y: (dimensions[dimension as number]??sourceEntity.dimension).heightRange.max-((newsnbta.size[1]??1) as number)})))
            //console.warn(JSONStringify(newsnbta))
            generateNBTFileD(Object.assign(Vector3Utils.add({ x: Number(offsetx), y: 0, z: Number(offsetz) }, chunkIndexToBoundingBox({
                x: alignmentmode == 1
                    ? Math.floor(Number(chunkx) / 8 + 0.5) *
                        8 -
                        4
                    : Number(chunkx),
                y: alignmentmode == 1
                    ? Math.floor(Number(chunky) / 8 + 0.5) *
                        8 -
                        4
                    : Number(chunky),
            }).from), {
                dimension: dimensions[dimension] ??
                    sourceEntity.dimension,
                y: (dimensions[dimension] ??
                    sourceEntity.dimension).heightRange.max -
                    (newsnbta.size[1] ?? 1),
            }), newsnbta, sourceEntity);
            //console.warn(JSONStringify([Vector3Utils.add({x: Number(offsetx), y: 0, z: Number(offsetz)}, chunkIndexToBoundingBox({x: (alignmentmode==1?((Math.floor(Number(chunkx) / 8)*8)+4):Number(chunkx)), y: (alignmentmode==1?((Math.floor(Number(chunky) / 8)*8)+4):Number(chunky))}).from), chunkIndexToBoundingBox({x: (alignmentmode==1?((Math.floor(Number(chunkx) / 8)*8)+4):Number(chunkx)), y: (alignmentmode==1?((Math.floor(Number(chunky) / 8)*8)+4):Number(chunky))}).from]))
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
//# sourceMappingURL=mapArtGenerator.js.map