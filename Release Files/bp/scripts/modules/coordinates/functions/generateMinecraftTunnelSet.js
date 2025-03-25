import { BlockVolume } from "@minecraft/server";
export function generateMinecraftTunnelSet(center, radius, length, axis, precision = 360) {
    const coordinates = new Set([]);
    if (axis.toLowerCase().includes("y") ||
        axis.toLowerCase().includes("ud") ||
        axis.toLowerCase().includes("du")) {
        for (let i = 0; i < precision; i++) {
            const angle = (i * Math.PI) / 180;
            const xPos = center.x + radius * Math.cos(angle);
            const zPos = center.z + radius * Math.sin(angle);
            Array.from(new BlockVolume({
                x: Math.floor(xPos),
                y: center.y - length / 2,
                z: Math.floor(zPos),
            }, {
                x: Math.floor(xPos),
                y: center.y + length / 2,
                z: Math.floor(zPos),
            }).getBlockLocationIterator()).forEach((v) => coordinates.add(v));
        }
    }
    else if (axis.toLowerCase().includes("x") ||
        axis.toLowerCase().includes("ew") ||
        axis.toLowerCase().includes("we")) {
        for (let i = 0; i < precision; i++) {
            const angle = (i * Math.PI) / 180;
            const zPos = center.z + radius * Math.cos(angle);
            const yPos = center.y + radius * Math.sin(angle);
            Array.from(new BlockVolume({
                x: center.x - length / 2,
                y: Math.floor(yPos),
                z: Math.floor(zPos),
            }, {
                x: center.y + length / 2,
                y: Math.floor(yPos),
                z: Math.floor(zPos),
            }).getBlockLocationIterator()).forEach((v) => coordinates.add(v));
        }
    }
    else if (axis.toLowerCase().includes("z") ||
        axis.toLowerCase().includes("ns") ||
        axis.toLowerCase().includes("sn")) {
        for (let i = 0; i < precision; i++) {
            const angle = (i * Math.PI) / 180;
            const xPos = center.x + radius * Math.cos(angle);
            const yPos = center.y + radius * Math.sin(angle);
            Array.from(new BlockVolume({
                x: Math.floor(xPos),
                y: Math.floor(yPos),
                z: center.z - length / 2,
            }, {
                x: Math.floor(xPos),
                y: Math.floor(yPos),
                z: center.z + length / 2,
            }).getBlockLocationIterator()).forEach((v) => coordinates.add(v));
        }
    }
    return coordinates;
}
//# sourceMappingURL=generateMinecraftTunnelSet.js.map