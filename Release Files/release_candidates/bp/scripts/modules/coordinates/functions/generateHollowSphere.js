export function generateHollowSphere(center, radius, thickness) {
    const centerX = center.x;
    const centerY = center.y;
    const centerZ = center.z;
    const coordinates = [];
    for (let x = centerX - radius; x <= centerX + radius; x++) {
        for (let y = centerY - radius; y <= centerY + radius; y++) {
            for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2 + (z - centerZ) ** 2);
                if (distance >= radius - thickness && distance <= radius) {
                    coordinates.push({ x: x, y: y, z: z });
                }
            }
        }
    }
    return coordinates;
}
//# sourceMappingURL=generateHollowSphere.js.map