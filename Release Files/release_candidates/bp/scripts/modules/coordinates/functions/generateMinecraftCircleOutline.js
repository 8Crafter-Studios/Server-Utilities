export function generateMinecraftCircleOutline(center, radius, thickness, dimension, placeBlockCallback, integrity = 100) {
    const innerRadius = radius - thickness;
    const outerRadius = radius;
    for (let x = Math.floor(center.x - outerRadius); x <= Math.ceil(center.x + outerRadius); x++) {
        for (let z = Math.floor(center.z - outerRadius); z <= Math.ceil(center.z + outerRadius); z++) {
            const distanceSquared = (x - center.x) ** 2 + (z - center.z) ** 2;
            if (distanceSquared <= outerRadius ** 2 &&
                distanceSquared >= innerRadius ** 2) {
                placeBlockCallback({
                    x: x,
                    y: center.y,
                    z: z,
                    dimension: dimension,
                });
            }
        }
    }
}
//# sourceMappingURL=generateMinecraftCircleOutline.js.map