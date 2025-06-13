import { Vector3Utils } from "@minecraft/math.js";
import { Entity, Player, world, BlockPermutation, SignSide, ItemStack, DyeColor, BlockTypes, Block } from "@minecraft/server";
import { MessageFormData, MessageFormResponse, ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
export async function editorStick(sourceEntitya, message = "") {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    let form = new ModalFormData();
    let playerList = world.getPlayers();
    let block = sourceEntity.getBlockFromViewDirection();
    if (!block) {
        const r = await new MessageFormData().title("No Block Found").body("No block was found to use the Editor Stick C on.").button1("OK").button2("Close").forceShow(sourceEntity);
        return;
    }
    let block2 = block.block;
    let allCoordinates = [];
    if (message.startsWith("coordinates:") && message.includes("|") && message.slice(12).split("|").length == 4) {
        allCoordinates = message.slice(12).split("|");
        block2 = world.getDimension(allCoordinates[0]).getBlock({
            x: allCoordinates[1].toNumber(),
            y: allCoordinates[2].toNumber(),
            z: allCoordinates[3].toNumber(),
        });
    }
    if (!block2) {
        const r = await new MessageFormData().title("No Block Found").body("No block was found to use the Editor Stick C on.").button1("OK").button2("Close").forceShow(sourceEntity);
        return;
    }
    form.title("Editor Stick");
    form.submitButton("Save");
    let blockStatesFullList; /*
    try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]); } catch(e){console.error(e, e.stack);}
    try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]).split(","); } catch(e){console.error(e, e.stack);}*/
    try {
        BlockPermutation.resolve("minecraft:bedrock", block2.permutation.getAllStates());
    }
    catch (e) {
        if (String(e).includes('Error: Failed to resolve block "minecraft:bedrock" with properties')) {
            blockStatesFullList =
                "§r§b" +
                    String(e)
                        .slice(68, String(e).length - 2)
                        .split(",")
                        .join("\n§b")
                        .split('":')
                        .join('": §a') +
                    "§r§f";
        }
        else {
            blockStatesFullList = "§r§cThis block has no block states. §f";
        }
    } /*
    for (const index in block.block.permutation.getAllStates()) {*/ /*
        console.warn(index);*/ /*
if (Number(index) != 0) {*/ /*
        try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()[index]]).split(","); } catch(e){console.error(e, e.stack);}
        try {blockStatesFullList } catch(e){console.error(e, e.stack);}*/ /*
}*/ /*
        console.warn(targetList);*/ /*
}*/
    try {
        form.textField("x: " +
            block2.x +
            "\ny: " +
            block2.y +
            "\nz: " +
            block2.z +
            "\ndimension: " +
            block2.dimension.id +
            "\ndistance: " +
            Vector3Utils.distance(sourceEntity.location, block2.location) +
            "\ngetRedstonePower: " +
            block2.getRedstonePower() +
            "\nblockFace: " +
            block.face +
            "\nblockFaceLocation: { x: " +
            block.faceLocation.x +
            ", y: " +
            block.faceLocation.y +
            ", z: " +
            block.faceLocation.z +
            " }\nsetType", "Block Type", { defaultValue: block2.typeId });
    }
    catch (e) {
        console.error(e, e.stack);
        form.textField("setType\nERROR: NO BLOCK SELECTED", "Block Type", { defaultValue: "minecraft:air" });
    } /*Error: Failed To resolve block "minecraft:bedrock" with properties */
    form.toggle("setType Enabled", { defaultValue: false });
    try {
        form.textField("List Of Block Properties: " +
            blockStatesFullList /*(BlockPermutation.resolve("minecraft:bedrock", block.block.permutation.getAllStates()))*/ +
            "\nBlock Property Identifier", "bool_state, num_state, str_state");
    }
    catch (e) {
        console.error(e, e.type /*e.stack*/);
        console.warn("test: " + String(e).slice(67) /*e.stack*/);
        form.textField("Block Property Identifier", "bool_state, num_state, str_state");
    }
    form.textField("Block Property Value", 'true, 1, "North"');
    form.toggle("setProperty Enabled", { defaultValue: false }); /*
    try {console.warn(block.block.permutation.getAllStates()) } catch(e){console.error(e, e.stack);}
    try {console.warn(block.block.permutation.getAllStates()[0]) } catch(e){console.error(e, e.stack);}
    try {console.warn(block.block.permutation.getAllStates()[0]![0]) } catch(e){console.error(e, e.stack);}*/
    /*form.dropdown("Block Permutation To Set", block.getTags())*/ /*
    form.slider("Selected Slot", 0, 56, 1)*/
    form.toggle("isWaterlogged", { defaultValue: block2.isWaterlogged }); /*
    form.toggle("Clear Velocity", false)*/
    form.toggle("Debug", { defaultValue: false }); /*
    let rawtextf = "["
    function evalRawText(rawtextf: string, rt: RawMessage){
        
    rawtextf = rawtextf + "{"
    let ic = 0;
    if(rt?.rawtext != undefined){
        rawtextf = rawtextf + "["
        rt?.rawtext.forEach((rt, ib)=>{
            rawtextf = evalRawText(rawtextf, rt);
        });
        rawtextf = rawtextf + "]"
    }
    if(rt?.score != undefined){
        if(ic == 0){
            ic = 1
            rawtextf = rawtextf + "score: {name: \"" + rt.score.name.replaceAll("\"", "\\\"") + "\", objective: \"" + rt.score.objective.replaceAll("\"", "\\\"") + "\"}"
        }else{
            rawtextf = rawtextf + ", score: {name: \"" + rt.score.name.replaceAll("\"", "\\\"") + "\", objective: \"" + rt.score.objective.replaceAll("\"", "\\\"") + "\"}"
        }
    }
    if(rt?.text != undefined){
        if(ic == 0){
            ic = 1
            rawtextf = rawtextf + "text: \"" + rt.text.replaceAll("\"", "\\\"") + "\"}"
        }else{
            rawtextf = rawtextf + ", text: \"" + rt.text.replaceAll("\"", "\\\"") + "\"}"
        }
    }
    if(rt?.translate != undefined){
        if(ic == 0){
            ic = 1
            rawtextf = rawtextf + "translate: \"" + rt.translate.replaceAll("\"", "\\\"") + "\"}"
        }else{
            rawtextf = rawtextf + ", translate: \"" + rt.translate.replaceAll("\"", "\\\"") + "\"}"
        }
    }
    if(rt?.with != undefined){
        if(typeof rt.with == typeof ["hisa", "sahi"]){
            let abdc: string[]
            abdc = [];
            Array((rt.with as string[])).forEach((rtwh)=>{abdc.push("\"" + String(rtwh).replaceAll("\"", "\\\"") + "\""); });
            if(ic == 0){
                ic = 1
                rawtextf = rawtextf + "with: [" + abdc.join(", ") + "]}"
            }else{
                rawtextf = rawtextf + ", with: [" + abdc.join(", ") + "]}"
            }
        }
    }
    rawtextf = rawtextf + "}"
    return rawtextf
    }
    block2.getComponent("sign")?.getRawText(SignSide.Front)?.rawtext.forEach((rt, i)=>{
        rawtextf = evalRawText(rawtextf, rt);
    });
    rawtextf = rawtextf + "]"*/
    try {
        if (block2.getComponent("fluid_container") != undefined) {
            form.textField(`Cauldron Water RGBA Color/Fill Level\n§cRed: §g${block2.getComponent("fluid_container").fluidColor.red}\n§aGreen: §g${block2.getComponent("fluid_container").fluidColor.green}\n§bBlue: §g${block2.getComponent("fluid_container").fluidColor.blue}\n§dAlpha: §g${block2.getComponent("fluid_container").fluidColor.alpha}`, `red: 0-1, green: 0-1, blue: 0-1, alpha: 0-1`, {
                defaultValue: `${block2.getComponent("fluid_container").fluidColor.red}, ${block2.getComponent("fluid_container").fluidColor.green}, ${block2.getComponent("fluid_container").fluidColor.blue}, ${block2.getComponent("fluid_container").fluidColor.alpha}`,
            });
            form.slider(`Cauldron Fill Level\nFill Level: §g${block2.getComponent("fluid_container").fillLevel}`, 0, 6, {
                valueStep: 1,
                defaultValue: block2.getComponent("fluid_container").fillLevel,
            });
            form.textField(`Cauldron Potion Type Contents\nHas Potion: §g${block2.getComponent("fluid_container").getFluidType() == "Potion"}`, `item type`);
        }
        else {
            form.textField(`§4Cauldron RGBA Color`, `§4Unavailable`);
            form.slider(`§4Cauldron Fill Level (Unavailable)`, 0, 0, { valueStep: 0, defaultValue: 0 });
            form.textField(`§4Cauldron Potion Type Contents`, `§r§4Unavailable`);
        }
    }
    catch {
        form.textField(`§4Cauldron RGBA Color`, `§4Unavailable`);
        form.slider(`§4Cauldron Fill Level (Unavailable)`, 0, 0, { valueStep: 0, defaultValue: 0 });
        form.textField(`§4Cauldron Potion Type Contents`, `§r§4Unavailable`);
    }
    form.toggle("setSignFrontRawText Enabled", { defaultValue: false });
    if (block2.getComponent("sign") != undefined) {
        form.textField(`Sign Front RawText\nRawText: §g${JSON.stringify(block2.getComponent("sign")?.getRawText(SignSide.Front))}`, `{rawtext: [{text|translate|rawtext|score|with: value, ...}]}`, { defaultValue: JSON.stringify(block2.getComponent("sign")?.getRawText(SignSide.Front)) });
    }
    else {
        form.textField(`§4Sign Front RawText`, `§r§4Unavailable`);
    }
    form.toggle("setSignBackRawText Enabled", { defaultValue: false });
    if (block2.getComponent("sign") != undefined) {
        form.textField(`Sign Back RawText\nRawText: §g${JSON.stringify(block2.getComponent("sign")?.getRawText(SignSide.Back))}`, `{rawtext: [{text|translate|rawtext|score|with: value, ...}]}`, { defaultValue: JSON.stringify(block2.getComponent("sign")?.getRawText(SignSide.Back)) });
    }
    else {
        form.textField(`§4Sign Back RawText`, `§r§4Unavailable`);
    }
    form.toggle("setSignFrontText Enabled", { defaultValue: false });
    if (block2.getComponent("sign") != undefined) {
        form.textField(`Sign Front Text\nRawText: §g${block2.getComponent("sign")?.getText(SignSide.Front)}`, `text`, {
            defaultValue: block2.getComponent("sign")?.getText(SignSide.Front),
        });
    }
    else {
        form.textField(`§4Sign Front Text`, `§r§4Unavailable`);
    }
    form.toggle("setSignBackText Enabled", { defaultValue: false });
    if (block2.getComponent("sign") != undefined) {
        form.textField(`Sign Back Text\Text: §g${block2.getComponent("sign")?.getText(SignSide.Back)}`, `text`, {
            defaultValue: block2.getComponent("sign")?.getText(SignSide.Back),
        });
    }
    else {
        form.textField(`§4Sign Back Text`, `§r§4Unavailable`);
    }
    form.toggle("setSignFrontTextColor Enabled", { defaultValue: false });
    if (block2.getComponent("sign") != undefined) {
        form.textField(`Sign Front Text Color\Text: §g${block2.getComponent("sign")?.getTextDyeColor(SignSide.Front)}`, `dye color`, {
            defaultValue: block2.getComponent("sign")?.getTextDyeColor(SignSide.Front),
        });
    }
    else {
        form.textField(`§4Sign Front Text Color`, `§r§4Unavailable`);
    }
    form.toggle("setSignBackTextColor Enabled", { defaultValue: false });
    if (block2.getComponent("sign") != undefined) {
        form.textField(`Sign Back Text Color\Text: §g${block2.getComponent("sign")?.getTextDyeColor(SignSide.Back)}`, `dye color`, {
            defaultValue: block2.getComponent("sign")?.getTextDyeColor(SignSide.Back),
        });
    }
    else {
        form.textField(`§4Sign Back Text Color`, `§r§4Unavailable`);
    }
    form.toggle("setSignIsWaxed", { defaultValue: block2.getComponent("sign")?.isWaxed });
    forceShow(form, playerList[playerList.findIndex((x) => x == sourceEntity)])
        .then((ro) => {
        let r = ro;
        if (r.canceled)
            return;
        let [setType, setTypeEnabled, blockPropertyIdentifier, blockPropertyValue, setPropertyEnabled /*,
selectedSlotIndex*/, isWaterlogged /*,
clearVelocity*/, debug, fluidContainerColor, fluidContainerFillLevel, potionType, signFrontRawTextEnabled, signFrontRawText, signBackRawTextEnabled, signBackRawText, signFrontTextEnabled, signFrontText, signBackTextEnabled, signBackText, signFrontTextColorEnabled, signFrontTextColor, signBackTextColorEnabled, signBackTextColor, setSignIsWaxed,] = r.formValues;
        let blockPropertyValue2;
        blockPropertyValue2 = "";
        let blockPropertyValueArray;
        blockPropertyValueArray = String(blockPropertyValue).split(", ");
        let blockPropertyValueLength = String(blockPropertyIdentifier).split(", ").length;
        if (block2.getComponent("fluid_container") != undefined) {
            if (((c) => `${c.red},${c.green},${c.blue},${c.alpha}`)(block2.getComponent("fluid_container").fluidColor) !=
                fluidContainerColor
                    .split(",")
                    .map((v) => v.trim())
                    .join()) {
                block2.getComponent("fluid_container").fluidColor = {
                    red: fluidContainerColor.split(",")[0].toNumber(),
                    green: fluidContainerColor.split(",")[1].toNumber(),
                    blue: fluidContainerColor.split(",")[2].toNumber(),
                    alpha: fluidContainerColor.split(",")[3].toNumber(),
                };
            }
            if (fluidContainerFillLevel != block2.getComponent("fluid_container").fillLevel) {
                block2.getComponent("fluid_container").fillLevel = fluidContainerFillLevel;
            }
            if (potionType != "") {
                block2.getComponent("fluid_container").setPotion(new ItemStack(potionType, 255));
            }
        }
        if (signFrontRawTextEnabled &&
            block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) {
            /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/ block2
                .getComponent("sign")
                .setText(JSON.parse(String(signFrontRawText)), SignSide.Front);
        }
        if (signBackRawTextEnabled &&
            block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) {
            /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/ block2
                .getComponent("sign")
                .setText(JSON.parse(String(signBackRawText)), SignSide.Back);
        }
        if (signFrontTextEnabled &&
            block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) {
            /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/ block2
                .getComponent("sign")
                .setText(String(signFrontText).replaceAll("\\n", "\n"), SignSide.Front);
        }
        if (signBackTextEnabled &&
            block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) {
            /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/ block2
                .getComponent("sign")
                .setText(String(signBackText).replaceAll("\\n", "\n"), SignSide.Back);
        }
        if (block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) {
            /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/ block2.getComponent("sign")?.setWaxed(Boolean(setSignIsWaxed));
        }
        DyeColor.Blue; //make it save this DyeColor in the imports from @minecraft/server.
        if (signFrontTextColorEnabled &&
            block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) {
            /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/ block2
                .getComponent("sign")
                .setTextDyeColor(eval(`DyeColor.${signFrontTextColor}`), SignSide.Front);
        }
        if (signBackTextColorEnabled &&
            block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) {
            /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/ block2
                .getComponent("sign")
                .setTextDyeColor(eval(`DyeColor.${signBackTextColor}`), SignSide.Back);
        }
        for (let index in blockPropertyValueArray) {
            if (String(blockPropertyValueArray[index]).startsWith('"') && String(blockPropertyValueArray[index]).endsWith('"')) {
                blockPropertyValueArray[index] = String(blockPropertyValueArray[index]).slice(1, String(blockPropertyValueArray[index]).length - 1);
            }
            else {
                if (String(blockPropertyValueArray[index]).startsWith('"') == false &&
                    String(blockPropertyValueArray[index]).endsWith('"') == false &&
                    "0123456789.".includes(String(blockPropertyValueArray[index]).charAt(0))) {
                    blockPropertyValueArray[index] = Number(blockPropertyValueArray[index]);
                }
                else {
                    if (String(blockPropertyValueArray[index]).startsWith('"') == false &&
                        String(blockPropertyValueArray[index]).endsWith('"') == false &&
                        (String(blockPropertyValueArray[index]) == "false" || String(blockPropertyValueArray[index]) == "true")) {
                        blockPropertyValueArray[index] = Boolean(blockPropertyValueArray[index]);
                    }
                    else {
                        if (String(blockPropertyValueArray[index]).startsWith('"') == false &&
                            String(blockPropertyValueArray[index]).endsWith('"') == false &&
                            (String(blockPropertyValueArray[index]) == "false" ||
                                String(blockPropertyValueArray[index]) == "true" ||
                                blockPropertyValueArray[index] == false ||
                                blockPropertyValueArray[index] == true)) {
                            blockPropertyValueArray[index] = String(blockPropertyValueArray[index]);
                        }
                    }
                }
            }
        } /*
if (String(blockPropertyValue).startsWith("\"") && String(blockPropertyValue).endsWith("\"")) {
blockPropertyValue2 = String(blockPropertyValue).slice(2, (String(blockPropertyValue).length - 3))
} else {
if ((String(blockPropertyValue).startsWith("\"") == false) && (String(blockPropertyValue).endsWith("\"") == false) && ("0123456789.".includes(String(blockPropertyValue).charAt(0)))) {
blockPropertyValue2 = Number(blockPropertyValue)
} else {
if ((String(blockPropertyValue).startsWith("\"") == false) && (String(blockPropertyValue).endsWith("\"") == false) && ((String(blockPropertyValue) == "false") || (String(blockPropertyValue) == "true"))) {
blockPropertyValue2 = Boolean(blockPropertyValue)
} else {
if ((String(blockPropertyValue).startsWith("\"") == false) && (String(blockPropertyValue).endsWith("\"") == false) && ((String(blockPropertyValue) == "false") || (String(blockPropertyValue) == "true") || (blockPropertyValue == false) || (blockPropertyValue == true))) {
    blockPropertyValue2 = String(blockPropertyValue)
}}}}*/
        if (setTypeEnabled == true) {
            try {
                block2.setType(BlockTypes.get(String(setType)) /*String(setType)*/);
            }
            catch (e) {
                console.error(e, e.stack);
            }
        } /*
try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier)]: blockPropertyValue2 })) } catch ( e ) { console.error(e, e.stack) }*/
        if (setPropertyEnabled == true) {
            switch (blockPropertyValueLength) {
                case 1:
                    try {
                        block2.setPermutation(BlockPermutation.resolve(block2.typeId, {
                            [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0],
                        }) /*block2.permutation.clone().withState(String(blockPropertyIdentifier), blockPropertyValue2).clone().getAllStates()*/);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    break;
                case 2:
                    try {
                        block2.setPermutation(BlockPermutation.resolve(block2.typeId, {
                            [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0],
                            [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1],
                        }));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    break;
                case 3:
                    try {
                        block2.setPermutation(BlockPermutation.resolve(block2.typeId, {
                            [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0],
                            [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1],
                            [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2],
                        }));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    break;
                case 4:
                    try {
                        block2.setPermutation(BlockPermutation.resolve(block2.typeId, {
                            [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0],
                            [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1],
                            [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2],
                            [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3],
                        }));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    break;
                case 5:
                    try {
                        block2.setPermutation(BlockPermutation.resolve(block2.typeId, {
                            [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0],
                            [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1],
                            [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2],
                            [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3],
                            [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4],
                        }));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    break;
                case 6:
                    try {
                        block2.setPermutation(BlockPermutation.resolve(block2.typeId, {
                            [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0],
                            [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1],
                            [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2],
                            [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3],
                            [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4],
                            [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5],
                        }));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    break;
                case 7:
                    try {
                        block2.setPermutation(BlockPermutation.resolve(block2.typeId, {
                            [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0],
                            [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1],
                            [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2],
                            [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3],
                            [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4],
                            [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5],
                            [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6],
                        }));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    break;
                case 8:
                    try {
                        block2.setPermutation(BlockPermutation.resolve(block2.typeId, {
                            [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0],
                            [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1],
                            [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2],
                            [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3],
                            [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4],
                            [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5],
                            [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6],
                            [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7],
                        }));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    break;
                case 9:
                    try {
                        block2.setPermutation(BlockPermutation.resolve(block2.typeId, {
                            [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0],
                            [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1],
                            [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2],
                            [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3],
                            [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4],
                            [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5],
                            [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6],
                            [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7],
                            [String(blockPropertyIdentifier).split(", ")[8]]: blockPropertyValueArray[8],
                        }));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    break;
                case 10:
                    try {
                        block2.setPermutation(BlockPermutation.resolve(block2.typeId, {
                            [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0],
                            [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1],
                            [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2],
                            [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3],
                            [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4],
                            [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5],
                            [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6],
                            [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7],
                            [String(blockPropertyIdentifier).split(", ")[8]]: blockPropertyValueArray[8],
                            [String(blockPropertyIdentifier).split(", ")[9]]: blockPropertyValueArray[9],
                        }));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    break;
                default:
                    break; /*
break;*/
            }
        }
        try {
            block2.setWaterlogged(Boolean(isWaterlogged));
        }
        catch (e) {
            console.error(e, e.stack);
        } /*
GameTest.register("StarterTests", "simpleMobTest", (test: GameTest.Test) => {

test.setBlockType("minecraft:redstone_repeater", test.relativeBlockLocation({ x: 2313, y: 64, z: 10944}));

})
.maxTicks(400)
.structureName("gametests:mediumglass");*/ /*
        sourceEntity.runCommand("/gametest run gametests:mediumglass")*/
        /*BlockType.arguments({id: "minecraft:grass"})*/
        // Do something
    })
        .catch((e) => {
        console.error(e, e.stack);
    });
}
//# sourceMappingURL=editorStick.js.map