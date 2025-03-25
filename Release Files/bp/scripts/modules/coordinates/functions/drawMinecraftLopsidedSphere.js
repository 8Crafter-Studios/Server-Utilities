import { drawMinecraftCircleB } from "./drawMinecraftCircleB";
/**
 * Generates a list of coordinates for a lopsided minecraft sphere.
 * @deprecated Legacy function that may cause the script to exceed the scripting memory limit.
 */
export function drawMinecraftLopsidedSphere(center, radius) {
    const coordinates = [];
    for (let i = 0; i < 360; i++) {
        coordinates.push(...drawMinecraftCircleB(center, radius, { x: i, y: i }));
    }
    return coordinates;
}
//# sourceMappingURL=drawMinecraftLopsidedSphere.js.map