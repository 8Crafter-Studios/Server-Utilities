import { ModalFormData } from "@minecraft/server-ui";
import { generateNBTFileD } from "modules/commands/functions/generateNBTFileD";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import { showMessage } from "modules/utilities/functions/showMessage";
import { customFormUICodes } from "../constants/customFormUICodes";
//evaluateParameters("{a: \"a\", \"b\": \"b\"}", [{type: "json"}])
/**
 * Loads a structure from Java SNBT data pasted into a text box.
 *
 * @see https://www.8crafter.com/debug-sticks-add-on/andexdbnbtstructureloader
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function nbtStructureLoader(sourceEntity) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    try {
        const form = new ModalFormData();
        form.title(customFormUICodes.modal.titles.formStyles.fullscreen + "Java NBT Structure Loader [§cExperimental§r]");
        form.textField("§fFor info on how to use this loader, go to §bhttps://www.8crafter.com/debug-sticks-add-on/andexdbnbtstructureloader§f\nNote: When pasting the nbt data into the text box the game might freeze for anywhere from a few seconds to half a hour depending on how much text is being pasted while it is pasting, and then it will unfreeze. \nNBT Data", "NBT Data");
        form.textField("spawn position x", "integer", { defaultValue: String(player.location.x) });
        form.textField("spawn position y", "integer", { defaultValue: String(player.location.y) });
        form.textField("spawn position z", "integer", { defaultValue: String(player.location.z) });
        form.dropdown("Dimension", dimensions.map((d) => dimensionTypeDisplayFormatting[d.id]), { defaultValueIndex: dimensions.indexOf(player.dimension) });
        form.submitButton("Load Java NBT Structure");
        const r = await form.forceShow(player);
        // This will stop the code when the player closes the form
        if (r.canceled)
            return 1;
        // This will assign every input their own variable
        let [snbt, x, y, z, dimension] = r.formValues; /*
        console.warn(r.formValues);*/
        if (String(snbt).includes("#")) {
            player.sendMessage("§6Warning: The snbt was censored! ");
        }
        let newsnbta = JSON.parse(snbt.replace(/(?<=[,\{][\s\n]*?)(['"])?(?<vb>[a-zA-Z0-9_]+)(['"])?[\s\n]*:[\s\n]*(?<vd>false|true|undefined|NULL|Infinity|-Infinity|[\-\+]?[0-9]+|"(?:[^"]|(?<=([^\\])(\\\\)*?\\)")*"|'(?:[^']|(?<=([^\\])(\\\\)*?\\)')*')(?=[\s\n]*?[,\}])/g, '"$<vb>":$<vd>'));
        //let newsnbta = JSONParse((snbt as string).replaceAll(/(?<!(?<!^([^"]*["][^"]*)+)(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*)(?<prefix>[\{\,])[\s\n]*(?<identifier>[\-\_a-zA-Z0-9\.\+]*)[\s\n]*\:[\s\n]*(?!([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*(?!([^"]*["][^"]*)+$))/g, "$<prefix>\"$<identifier>\":"))
        generateNBTFileD({
            dimension: dimensions[dimension] ?? player.dimension,
            x: x.toNumber() ?? player.location.x,
            y: y.toNumber() ?? player.location.y,
            z: z.toNumber() ?? player.location.z,
        }, newsnbta, player);
        return 1;
    }
    catch (e) {
        console.error(e, e.stack);
        // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
        return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    }
}
//# sourceMappingURL=nbtStructureLoader.js.map