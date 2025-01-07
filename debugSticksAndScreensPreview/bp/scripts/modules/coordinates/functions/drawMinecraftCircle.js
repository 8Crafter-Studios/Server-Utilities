export function drawMinecraftCircle(center, radius, axis, precision = 360) {
    const coordinates = [];
    if (axis.toLowerCase().includes("y") ||
        axis.toLowerCase().includes("ud") ||
        axis.toLowerCase().includes("du")) {
        for (let i = 0; i < precision; i++) {
            const angle = (i * Math.PI) / 180;
            const xPos = center.x + radius * Math.cos(angle);
            const zPos = center.z + radius * Math.sin(angle);
            coordinates.push({
                x: Math.floor(xPos),
                y: center.y,
                z: Math.floor(zPos),
            });
        }
    }
    else if (axis.toLowerCase().includes("x") ||
        axis.toLowerCase().includes("ew") ||
        axis.toLowerCase().includes("we")) {
        for (let i = 0; i < precision; i++) {
            const angle = (i * Math.PI) / 180;
            const zPos = center.z + radius * Math.cos(angle);
            const yPos = center.y + radius * Math.sin(angle);
            coordinates.push({
                x: center.x,
                y: Math.floor(yPos),
                z: Math.floor(zPos),
            });
        }
    }
    else if (axis.toLowerCase().includes("z") ||
        axis.toLowerCase().includes("ns") ||
        axis.toLowerCase().includes("sn")) {
        for (let i = 0; i < precision; i++) {
            const angle = (i * Math.PI) / 180;
            const xPos = center.x + radius * Math.cos(angle);
            const yPos = center.y + radius * Math.sin(angle);
            coordinates.push({
                x: Math.floor(xPos),
                y: Math.floor(yPos),
                z: center.z,
            });
        }
    }
    return coordinates;
}
//# sourceMappingURL=drawMinecraftCircle.js.map