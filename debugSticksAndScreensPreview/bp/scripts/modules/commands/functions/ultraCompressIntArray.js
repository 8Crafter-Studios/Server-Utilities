import { ultraCompressIntArrayB } from "./ultraCompressIntArrayB";
export function ultraCompressIntArray(arry, replacement = "-1") {
    return ultraCompressIntArrayB(JSON.stringify(arry.map((v) => (v ?? -1).toString(36)), undefined, 0).replaceAll('"', ""), replacement);
}
//# sourceMappingURL=ultraCompressIntArray.js.map