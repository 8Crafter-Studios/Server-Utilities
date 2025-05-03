/**
 * @deprecated Use {@link chunkIndexToBoundingBoxXZ} instead.
 * @param chunkIndex
 * @param heightRange
 * @returns
 */
export function chunkIndexToBoundingBox(chunkIndex, heightRange = [-64, 319]) { return { from: { x: Math.floor(chunkIndex.x * 16), y: heightRange[0], z: Math.floor(chunkIndex.y * 16) }, to: { x: Math.round((chunkIndex.x * 16) + 15), y: heightRange[1], z: Math.round((chunkIndex.y * 16) + 15) } }; }
//# sourceMappingURL=chunkIndexToBoundingBox.js.map