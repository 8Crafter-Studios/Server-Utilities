/**
 * The newest and recommended version of this function to use.
 * @param location
 * @returns A VectorXZ object containg the chunk index.
 */
export function getChunkIndexD(location) { return { x: Math.floor(location.x / 16), z: Math.floor(location.z / 16) }; }
//# sourceMappingURL=getChunkIndexD.js.map