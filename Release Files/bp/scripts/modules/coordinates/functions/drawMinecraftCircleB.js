import { rotate } from "./rotate";
export function drawMinecraftCircleB(center, radius, rotation, precision = 360) {
    const coordinates = new Set([]);
    for (let i = 0; i < precision; i++) {
        const angle = (i * Math.PI) / 180;
        const xPos = radius * Math.cos(angle);
        const zPos = radius * Math.sin(angle);
        const newPos = rotate(rotation.x, 0, rotation.y, [
            { x: Math.floor(xPos), y: 0, z: Math.floor(zPos) },
        ])[0];
        const value = {
            x: center.x + newPos.x,
            y: center.y + newPos.y,
            z: center.z + newPos.z,
        };
        coordinates.add(value);
    }
    return Array.from(coordinates);
}
//# sourceMappingURL=drawMinecraftCircleB.js.map