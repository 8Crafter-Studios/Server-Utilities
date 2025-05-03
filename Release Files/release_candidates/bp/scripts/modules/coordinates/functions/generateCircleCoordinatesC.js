export function generateCircleCoordinatesC(centerX, centerY, centerZ, radius) {
    const coordinates = [];
    const diameter = radius * 2;
    for (let x = centerX - radius; x <= centerX + radius; x++) {
        for (let z = centerZ - radius; z <= centerZ + radius; z++) {
            const distanceSquared = (x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ);
            if (distanceSquared <= radius * radius) {
                coordinates.push({ x: x, y: centerY, z: z });
            }
        }
    }
    return coordinates;
}
//# sourceMappingURL=generateCircleCoordinatesC.js.map