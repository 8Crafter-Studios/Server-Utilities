import { extractIntArrayB } from "./extractIntArrayB";
export function extractIntArray(arry, revivement = "-1") {
    return extractIntArrayB(arry, revivement)
        .replaceAll(" ", "")
        .slice(1, -1)
        .split(",")
        .map((v) => Number.parseInt(v, 36));
}
//# sourceMappingURL=extractIntArray.js.map