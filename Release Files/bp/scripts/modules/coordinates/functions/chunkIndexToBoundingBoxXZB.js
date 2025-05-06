export function chunkIndexToBoundingBoxXZB(chunkIndex, heightRange = { min: -64, max: 320 }) {
    return {
        min: {
            x: Math.floor(chunkIndex.x * 16),
            y: heightRange.min,
            z: Math.floor(chunkIndex.z * 16),
        },
        max: {
            x: Math.round(chunkIndex.x * 16 + 15),
            y: heightRange.max,
            z: Math.round(chunkIndex.z * 16 + 15),
        },
    };
}
//# sourceMappingURL=chunkIndexToBoundingBoxXZB.js.map