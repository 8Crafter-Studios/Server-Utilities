import { drawMinecraftCircleB } from "./drawMinecraftCircleB";
/**
 * Generates a list of coordinates for a minecraft sphere.
 * @deprecated Legacy function that may cause the script to exceed the scripting memory limit.
 */
export async function drawMinecraftSphere(center, radius, precision = 360) {
    const coordinates = [];
    for (let i = 0; i < precision; i++) {
        coordinates.push(...drawMinecraftCircleB(center, radius, { x: 0, y: i }));
    }
    return (async () => {
        for (let i = 0; i < precision; i++) {
            coordinates.push(...drawMinecraftCircleB(center, radius, { x: 90, y: i }));
        }
        return [...new Set(coordinates)];
    })();
}
//# sourceMappingURL=drawMinecraftSphere.js.map