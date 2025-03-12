import { Vector3Utils } from "@minecraft/math.js";
import { ModalFormData } from "@minecraft/server-ui";
import { generateNBTFileD } from "modules/commands/functions/generateNBTFileD";
import { chunkIndexToBoundingBox } from "modules/coordinates/functions/chunkIndexToBoundingBox";
import { getChunkIndex } from "modules/coordinates/functions/getChunkIndex";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import { showMessage } from "modules/utilities/functions/showMessage";
import { customFormUICodes } from "../constants/customFormUICodes";
/**
 * Opens a form for generating a map art structure based on the entered snbt data.
 *
 * @see https://www.8crafter.com/debug-sticks-add-on/andexdbnbtstructureloader
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function mapArtGenerator(sourceEntity) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    try {
        const form = new ModalFormData();
        form.title(customFormUICodes.modal.titles.formStyles.fullscreen + "Map Art Generator [§cExperimental§r]");
        form.textField("§fFor info on how to use this generator, go to §bhttps://www.8crafter.com/debug-sticks-add-on/andexdbnbtstructureloader§f\nNote: When pasting the nbt data into the text box the game might freeze for anywhere from a few seconds to half a hour depending on how much text is being pasted while it is pasting, and then it will unfreeze. \nNBT Data", "NBT Data");
        form.textField("Chunk Index x", "integer", String(getChunkIndex(player.location).x));
        form.textField("Chunk Index y", "integer", String(getChunkIndex(player.location).y));
        form.textField("Offset x", "integer", "0");
        form.textField("Offset z", "integer", "0");
        form.dropdown("Alignment Mode", ["Chunk Grid", "Map Grid"], 1);
        form.dropdown("Dimension", dimensions.map((d) => dimensionTypeDisplayFormatting[d.id]), dimensions.indexOf(player.dimension));
        form.submitButton("Generate Map Art");
        const r = await form.forceShow(player);
        if (r.canceled)
            return 1;
        let [snbt, chunkx, chunky, offsetx, offsetz, alignmentmode, dimension] = r.formValues; /*
console.warn(r.formValues);*/
        if (String(snbt).includes("#")) {
            player.sendMessage("§6Warning: The snbt was censored! ");
        }
        let newsnbta = JSON.parse(snbt.replace(/(?<=[,\{][\s\n]*?)(['"])?(?<vb>[a-zA-Z0-9_]+)(['"])?[\s\n]*:[\s\n]*(?<vd>false|true|undefined|NULL|Infinity|-Infinity|[\-\+]?[0-9]+|"(?:[^"]|(?<=([^\\])(\\\\)*?\\)")*"|'(?:[^']|(?<=([^\\])(\\\\)*?\\)')*')(?=[\s\n]*?[,\}])/g, '"$<vb>":$<vd>'));
        //let newsnbta = JSONParse((snbt as string).replaceAll(/(?<!(?<!^([^"]*["][^"]*)+)(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*)(?<prefix>[\{\,])[\s\n]*(?<identifier>[\-\_a-zA-Z0-9\.\+]*)[\s\n]*\:[\s\n]*(?!([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*(?!([^"]*["][^"]*)+$))/g, "$<prefix>\"$<identifier>\":"))
        //console.warn(JSONStringify(Object.assign(Vector3Utils.add({x: Number(offsetx), y: 0, z: Number(offsetz)}, chunkIndexToBoundingBox({x: (alignmentmode==1?((Math.floor(Number(chunkx) / 8)*8)+4):Number(chunkx)), y: (alignmentmode==1?((Math.floor(Number(chunky) / 8)*8)+4):Number(chunky))}).from), {dimension: dimensions[dimension as number]??sourceEntity.dimension, y: (dimensions[dimension as number]??sourceEntity.dimension).heightRange.max-((newsnbta.size[1]??1) as number)})))
        //console.warn(JSONStringify(newsnbta))
        generateNBTFileD(Object.assign(Vector3Utils.add({ x: Number(offsetx), y: 0, z: Number(offsetz) }, chunkIndexToBoundingBox({
            x: alignmentmode == 1 ? Math.floor(Number(chunkx) / 8 + 0.5) * 8 - 4 : Number(chunkx),
            y: alignmentmode == 1 ? Math.floor(Number(chunky) / 8 + 0.5) * 8 - 4 : Number(chunky),
        }).from), {
            dimension: dimensions[dimension] ?? player.dimension,
            y: (dimensions[dimension] ?? player.dimension).heightRange.max - (newsnbta.size[1] ?? 1),
        }), newsnbta, player);
        return 1;
        //console.warn(JSONStringify([Vector3Utils.add({x: Number(offsetx), y: 0, z: Number(offsetz)}, chunkIndexToBoundingBox({x: (alignmentmode==1?((Math.floor(Number(chunkx) / 8)*8)+4):Number(chunkx)), y: (alignmentmode==1?((Math.floor(Number(chunky) / 8)*8)+4):Number(chunky))}).from), chunkIndexToBoundingBox({x: (alignmentmode==1?((Math.floor(Number(chunkx) / 8)*8)+4):Number(chunkx)), y: (alignmentmode==1?((Math.floor(Number(chunky) / 8)*8)+4):Number(chunky))}).from]))
    }
    catch (e) {
        console.error(e, e.stack);
        // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
        return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    }
}
//# sourceMappingURL=mapArtGenerator.js.map