export function generateCircleCoordinates(centerX, centerY, centerZ, radius, axis) {
    const coordinates = [];
    const diameter = radius * 2;
    if (axis.toLowerCase() == "y" ||
        axis.toLowerCase() == "ud" ||
        axis.toLowerCase() == "du") {
        for (let x = -radius; x <= radius; x++) {
            for (let z = -radius; z <= radius; z++) {
                if (x * x + z * z <= radius * radius) {
                    const blockX = centerX + x;
                    const blockZ = centerZ + z;
                    coordinates.push({ x: blockX, y: centerY, z: blockZ });
                }
            }
        }
    }
    else if (axis.toLowerCase() == "x" ||
        axis.toLowerCase() == "ew" ||
        axis.toLowerCase() == "we") {
        for (let y = -radius; y <= radius; y++) {
            for (let z = -radius; z <= radius; z++) {
                if (y * y + z * z <= radius * radius) {
                    const blockY = centerY + y;
                    const blockZ = centerZ + z;
                    coordinates.push({ x: centerX, y: blockY, z: blockZ });
                }
            }
        }
    }
    else if (axis.toLowerCase() == "z" ||
        axis.toLowerCase() == "ns" ||
        axis.toLowerCase() == "sn") {
        for (let x = -radius; x <= radius; x++) {
            for (let y = -radius; y <= radius; y++) {
                if (x * x + y * y <= radius * radius) {
                    const blockX = centerX + x;
                    const blockY = centerY + y;
                    coordinates.push({ x: blockX, y: blockY, z: centerZ });
                }
            }
        }
    }
    return coordinates;
}
//# sourceMappingURL=generateCircleCoordinates.js.map