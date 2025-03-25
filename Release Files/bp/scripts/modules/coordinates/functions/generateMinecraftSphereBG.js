import { Dimension, system } from "@minecraft/server";
import { generateMinecraftSphereBGProgress } from "modules/coordinates/constants/generateMinecraftSphereBGProgress";
/**
 * Generates a minecraft sphere.
 * @version 1.2.0
 * @generator
 */
export function* generateMinecraftSphereBG(center, radius, dimension, generateMinecraftSphereBGProgressId, minMSBetweenYields = 2000, placeBlockCallback = () => { }, onComplete = () => { }, integrity = 100) {
    try {
        const centerX = center.x;
        const centerY = center.y;
        const centerZ = center.z;
        var index = 0n;
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId] =
            {
                done: false,
                startTick: system.currentTick,
                startTime: Date.now(),
                containsUnloadedChunks: false,
            };
        var msSinceLastYieldStart = Date.now();
        if (integrity != 100) {
            for (let x = centerX - radius; x <= centerX + radius; x++) {
                for (let y = centerY - radius; y <= centerY + radius; y++) {
                    for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                        const distanceSquared = Math.pow(x - centerX, 2) +
                            Math.pow(y - centerY, 2) +
                            Math.pow(z - centerZ, 2);
                        if (distanceSquared <= Math.pow(radius, 2)) {
                            if (Math.random() <= integrity / 100) {
                                placeBlockCallback({ x: x, y: y, z: z, dimension: dimension }, index);
                            }
                        }
                        index++;
                    }
                    if (Date.now() - msSinceLastYieldStart >=
                        minMSBetweenYields) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined;
                    }
                }
                if (Date.now() - msSinceLastYieldStart >= minMSBetweenYields) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        else {
            for (let x = centerX - radius; x <= centerX + radius; x++) {
                for (let y = centerY - radius; y <= centerY + radius; y++) {
                    for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                        const distanceSquared = Math.pow(x - centerX, 2) +
                            Math.pow(y - centerY, 2) +
                            Math.pow(z - centerZ, 2);
                        if (distanceSquared <= Math.pow(radius, 2)) {
                            placeBlockCallback({ x: x, y: y, z: z, dimension: dimension }, index);
                        }
                        index++;
                    }
                    if (Date.now() - msSinceLastYieldStart >=
                        minMSBetweenYields) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined;
                    }
                }
                if (Date.now() - msSinceLastYieldStart >= minMSBetweenYields) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        onComplete();
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].endTick = system.currentTick;
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].endTime = Date.now();
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].done = true;
        return;
    }
    catch (e) {
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].endTick = system.currentTick;
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].endTime = Date.now();
        generateMinecraftSphereBGProgress[generateMinecraftSphereBGProgressId].done = true;
        throw e;
    }
}
//# sourceMappingURL=generateMinecraftSphereBG.js.map