import { CompoundBlockVolume } from "@minecraft/server";
export function convertToCompoundBlockVolume(selection) {
    let compoundFullBlockVolumes = new CompoundBlockVolume({
        x: 0,
        y: 0,
        z: 0,
    });
    let blockVolumeAllLists;
    blockVolumeAllLists = [];
    selection.split("|").forEach((selectionSection) => {
        blockVolumeAllLists.push({
            from: {
                x: Math.min(Number(selectionSection.split(",")[0]), Number(selectionSection.split(",")[3])),
                y: Math.min(Number(selectionSection.split(",")[1]), Number(selectionSection.split(",")[4])),
                z: Math.min(Number(selectionSection.split(",")[2]), Number(selectionSection.split(",")[5])),
            },
            to: {
                x: Math.max(Number(selectionSection.split(",")[0]), Number(selectionSection.split(",")[3])),
                y: Math.max(Number(selectionSection.split(",")[1]), Number(selectionSection.split(",")[4])),
                z: Math.max(Number(selectionSection.split(",")[2]), Number(selectionSection.split(",")[5])),
            },
        });
    });
    return blockVolumeAllLists;
}
//# sourceMappingURL=convertToCompoundBlockVolume.js.map