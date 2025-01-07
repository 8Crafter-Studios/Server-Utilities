/**
 * @deprecated Use {@link chunkIndexToBoundingBoxXZB} instead.
 * @param chunkIndex
 * @param heightRange
 * @returns
 */
export function chunkIndexToBoundingBoxB(chunkIndex, heightRange = { min: -64, max: 320 }) { return { from: { x: Math.floor(chunkIndex.x * 16), y: heightRange.min, z: Math.floor(chunkIndex.y * 16) }, to: { x: Math.round((chunkIndex.x * 16) + 15), y: heightRange.max, z: Math.round((chunkIndex.y * 16) + 15) } }; }
//# sourceMappingURL=chunkIndexToBoundingBoxB.js.map