export function roundVector3ToMiddleOfBlock(vector) {
    return {
        x: Math.floor(vector.x) + 0.5,
        y: Math.floor(vector.y) + 0.5,
        z: Math.floor(vector.z) + 0.5,
    };
}
//# sourceMappingURL=roundVector3ToMiddleOfBlock.js.map