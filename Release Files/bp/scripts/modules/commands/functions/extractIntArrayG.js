import { extractIntArrayBGenerator } from "./extractIntArrayBGenerator";
export async function extractIntArrayG(arry, revivement = "-1", maxTimePerTick = 1500) {
    return (await completeGenerator(extractIntArrayBGenerator(arry, revivement, maxTimePerTick), maxTimePerTick - 250)).return
        .replaceAll(" ", "")
        .slice(1, -1)
        .split(",")
        .map((v) => Number.parseInt(v, 36));
}
//# sourceMappingURL=extractIntArrayG.js.map