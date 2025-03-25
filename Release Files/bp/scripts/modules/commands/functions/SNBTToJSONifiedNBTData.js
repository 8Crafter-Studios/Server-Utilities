export function SNBTToJSONifiedNBTData(snbt) {
    return JSON.parse(snbt.replace(/(?<=[,\{][\s\n]*?)(['"])?(?<vb>[a-zA-Z0-9_]+)(['"])?[\s\n]*:[\s\n]*(?<vd>false|true|undefined|NULL|Infinity|-Infinity|[\-\+]?[0-9]+|"(?:[^"]|(?<=([^\\])(\\\\)*?\\)")*"|'(?:[^']|(?<=([^\\])(\\\\)*?\\)')*')(?=[\s\n]*?[,\}])/g, '"$<vb>":$<vd>'));
}
//# sourceMappingURL=SNBTToJSONifiedNBTData.js.map