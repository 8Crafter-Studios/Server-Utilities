import { compressIntArrayB } from "./compressIntArrayB";
export function compressIntArray(arry, replacement = "-1") {
    return compressIntArrayB(JSON.stringify(arry.map((v) => (v ?? -1).toString(36)), undefined, 0).replaceAll('"', ""), replacement);
}
//# sourceMappingURL=compressIntArray.js.map