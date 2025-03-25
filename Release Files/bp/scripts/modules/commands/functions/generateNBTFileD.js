import { generateNBTFile } from "./generateNBTFile";
import { generateNBTFileF } from "./generateNBTFileF";
import { generateNBTFileE } from "./generateNBTFileE";
import { generateNBTFileEGG } from "./generateNBTFileEGG";
import { compressBedrockNBTData } from "./compressBedrockNBTData";
import { compressJavaNBTData } from "./compressJavaNBTData";
import { detectNBTDataType } from "./detectNBTDataType";
import { parseJSONifiedNBTData } from "./parseJSONifiedNBTData";
import { unsuperCompressG } from "./unsuperCompressG";
import { unultraCompress } from "./unultraCompress";
export async function generateNBTFileD(location, nbt, player) {
    /*
    generateTickingAreaFillCoordinatesC(player.location, (()=>{let a = new CompoundBlockVolume(); a.pushVolume({volume: new BlockVolume(Object.assign(location, {y: 320}),Vector3Utils.add(location, Object.assign(Vector3Utils.scale(VECTOR3_ONE, 320), {y: 0})))}); return a})(), player.dimension).then(tac=>{*/ try {
        let id = "andexdbmapartloader:" + Date.now();
        if (location.dimension.runCommand(`/tickingarea add ${location.x} -64 ${location.z} ${location.x + 136} 325 ${location.z + 136} "${id}"`).successCount == 0) {
            player.sendMessage("§6Warning: Map art generation may be incomplete because max amount of tickingareas were used up so some chunks might have not been loaded. ");
        }
        await waitTicks(2);
        try {
            switch (detectNBTDataType(nbt)) {
                case "cmprsnbt":
                    generateNBTFileF(location, nbt);
                    break;
                case "cmprbnbt":
                    generateNBTFileE(location, nbt);
                    break;
                case "supercmprsnbt":
                    generateNBTFileF(location, await unsuperCompressG(nbt));
                    break;
                case "supercmprbnbt":
                    pasend(player, (await completeGenerator(generateNBTFileEGG(location, await unsuperCompressG(nbt)))).return);
                    break;
                case "ultracmprsnbt":
                    generateNBTFileF(location, unultraCompress(nbt));
                    break;
                case "ultracmprbnbt":
                    generateNBTFileE(location, unultraCompress(nbt));
                    break;
                case "snbt":
                    generateNBTFileF(location, compressJavaNBTData(nbt));
                    break;
                case "nbt":
                    generateNBTFileF(location, parseJSONifiedNBTData(compressJavaNBTData(nbt)));
                    break;
                case "bnbt":
                    generateNBTFileE(location, compressBedrockNBTData(nbt));
                    break;
                case "pnbt":
                    generateNBTFileE(location, compressBedrockNBTData(parseJSONifiedNBTData(nbt)));
                    break;
                case "rawuenbt":
                    generateNBTFileE(location, compressBedrockNBTData(parseJSONifiedNBTData(nbt)));
                    break;
                case "unknownt":
                    generateNBTFile(location, nbt);
                    break;
                default:
                    generateNBTFile(location, nbt);
                    break;
            }
            location.dimension.runCommand(`/tickingarea remove "${id}"`);
        }
        catch (e) {
            player.sendMessage("§c" + e + e.stack);
        }
    }
    catch (e) {
        player.sendMessage("§c" + e + e.stack);
    } /*finally{tac.forEach(tab=>tab?.remove())}}, (e)=>{player.sendError(e+" "+e.stack, true)}); */
}
//# sourceMappingURL=generateNBTFileD.js.map