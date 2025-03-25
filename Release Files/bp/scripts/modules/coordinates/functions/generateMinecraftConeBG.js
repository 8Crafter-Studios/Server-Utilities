import { Dimension, system } from "@minecraft/server";
import { generateMinecraftSphereBGProgress } from "modules/coordinates/constants/generateMinecraftSphereBGProgress";
/**
 * Generates a minecraft cone.
 * @since 1.18.0-development.20
 * @version 1.0.0
 * @generator
 */
export function* generateMinecraftConeBG(center, radius, height, dimension, generateMinecraftConeBGProgressId, minMSBetweenYields = 2000, placeBlockCallback = () => { }, onComplete = () => { }, integrity = 100) {
    try {
        const centerX = center.x;
        const centerY = center.y;
        const centerZ = center.z;
        var index = 0n;
        generateMinecraftSphereBGProgress[generateMinecraftConeBGProgressId] = {
            done: false,
            startTick: system.currentTick,
            startTime: Date.now(),
            containsUnloadedChunks: false,
        };
        let msSinceLastYieldStart = Date.now();
        for (let y = centerY; y <= centerY + height; y++) {
            const currentRadius = radius * (1 - (y - centerY) / height);
            for (let x = centerX - currentRadius; x <= centerX + currentRadius; x++) {
                for (let z = centerZ - currentRadius; z <= centerZ + currentRadius; z++) {
                    const distanceSquared = Math.pow(x - centerX, 2) + Math.pow(z - centerZ, 2);
                    if (distanceSquared <= Math.pow(currentRadius, 2)) {
                        if (integrity != 100) {
                            if (Math.random() <= integrity / 100) {
                                placeBlockCallback({ x: x, y: y, z: z, dimension: dimension }, index);
                            }
                        }
                        else {
                            placeBlockCallback({ x: x, y: y, z: z, dimension: dimension }, index);
                        }
                    }
                    index++;
                }
                if (Date.now() - msSinceLastYieldStart >= minMSBetweenYields) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
            if (Date.now() - msSinceLastYieldStart >= minMSBetweenYields) {
                msSinceLastYieldStart = Date.now();
                yield undefined;
            }
        }
        onComplete();
        generateMinecraftSphereBGProgress[generateMinecraftConeBGProgressId].endTick = system.currentTick;
        generateMinecraftSphereBGProgress[generateMinecraftConeBGProgressId].endTime = Date.now();
        generateMinecraftSphereBGProgress[generateMinecraftConeBGProgressId].done = true;
        return;
    }
    catch (e) {
        generateMinecraftSphereBGProgress[generateMinecraftConeBGProgressId].endTick = system.currentTick;
        generateMinecraftSphereBGProgress[generateMinecraftConeBGProgressId].endTime = Date.now();
        generateMinecraftSphereBGProgress[generateMinecraftConeBGProgressId].done = true;
        throw e;
    }
}
//# sourceMappingURL=generateMinecraftConeBG.js.map