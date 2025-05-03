/**
 * Generates a minecraft sphere.
 * @deprecated Superceeded by generateMinecraftSphereBG().
 */
export function generateMinecraftSphere(center, radius) {
    const centerX = center.x;
    const centerY = center.y;
    const centerZ = center.z;
    const coordinates = [];
    for (let x = centerX - radius; x <= centerX + radius; x++) {
        for (let y = centerY - radius; y <= centerY + radius; y++) {
            for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                const distanceSquared = Math.pow(x - centerX, 2) +
                    Math.pow(y - centerY, 2) +
                    Math.pow(z - centerZ, 2);
                if (distanceSquared <= Math.pow(radius, 2)) {
                    coordinates.push({ x: x, y: y, z: z });
                }
            }
        }
    }
    return coordinates;
}
//# sourceMappingURL=generateMinecraftSphere.js.map