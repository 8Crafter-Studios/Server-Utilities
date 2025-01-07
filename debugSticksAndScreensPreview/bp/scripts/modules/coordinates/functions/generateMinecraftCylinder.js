/**
 * Generates a list of coordinates for a minecraft cylinder.
 * @deprecated Legacy function that may cause the script to exceed the scripting memory limit.
 */
export function generateMinecraftCylinder(blockType, radius, thickness, centerX, centerY, centerZ) {
    // Example command to create a hollow cylinder with air inside:
    const commands = [];
    for (let y = -radius; y <= radius; y++) {
        const height = Math.floor(Math.sqrt(radius * radius - y * y));
        for (let x = -height; x <= height; x++) {
            for (let z = -height; z <= height; z++) {
                const distance = Math.sqrt(x * x + y * y + z * z);
                if (distance >= radius - thickness && distance <= radius) {
                    commands.push(`/setblock ${centerX + x} ${centerY + y} ${centerZ + z} ${blockType}`);
                }
            }
        }
    }
    return commands;
}
//# sourceMappingURL=generateMinecraftCylinder.js.map