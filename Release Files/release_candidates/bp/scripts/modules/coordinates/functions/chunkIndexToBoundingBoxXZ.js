export function chunkIndexToBoundingBoxXZ(chunkIndex, heightRange = [-64, 320]) {
    return {
        min: {
            x: Math.floor(chunkIndex.x * 16),
            y: heightRange[0],
            z: Math.floor(chunkIndex.z * 16),
        },
        max: {
            x: Math.round(chunkIndex.x * 16 + 15),
            y: heightRange[1],
            z: Math.round(chunkIndex.z * 16 + 15),
        },
    };
}
//# sourceMappingURL=chunkIndexToBoundingBoxXZ.js.map