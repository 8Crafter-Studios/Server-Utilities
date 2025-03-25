export function roundVector3ToMiddleOfBlockFloorY(vector) {
    return {
        x: Math.floor(vector.x) + 0.5,
        y: Math.floor(vector.y),
        z: Math.floor(vector.z) + 0.5,
    };
}
//# sourceMappingURL=roundVector3ToMiddleOfBlockFloorY.js.map