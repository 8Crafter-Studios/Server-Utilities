import { Dimension, system } from "@minecraft/server";
import { generatorProgress } from "modules/coordinates/constants/generatorProgress";
export function* generateInverseSkygridBG(from, to, gridSize, generatorProgressId, dimension, placeBlockCallback = () => { }, options) {
    try {
        const startX = Math.floor(from.x);
        const startY = Math.floor(from.y);
        const startZ = Math.floor(from.z);
        const endX = Math.floor(to.x);
        const endY = Math.floor(to.y);
        const endZ = Math.floor(to.z);
        generatorProgress[generatorProgressId] = {
            done: false,
            startTick: system.currentTick,
            startTime: Date.now(),
            containsUnloadedChunks: false,
        };
        var index = 0n;
        var msSinceLastYieldStart = Date.now();
        if ((options?.integrity ?? 100) != 100) {
            for (let x = startX; x <= endX; x++) {
                for (let y = startY; y <= endY; y++) {
                    for (let z = startZ; z <= endZ; z++) {
                        if (Math.floor(startX - x) % gridSize === 0 &&
                            Math.floor(startY - y) % gridSize === 0 &&
                            Math.floor(startZ - z) % gridSize === 0) {
                            index++;
                            continue; // Skip positions where the skygrid would generate blocks
                        }
                        if (Math.random() <=
                            (options?.integrity ?? 100) / 100) {
                            placeBlockCallback({
                                x: Math.floor(x),
                                y: Math.floor(y),
                                z: Math.floor(z),
                                dimension: dimension,
                            }, index);
                        }
                        index++;
                    }
                    if (Date.now() - msSinceLastYieldStart >=
                        (options?.minMSBetweenYields ?? 2000)) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined;
                    }
                }
                if (Date.now() - msSinceLastYieldStart >=
                    (options?.minMSBetweenYields ?? 2000)) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        else {
            for (let x = startX; x <= endX; x++) {
                for (let y = startY; y <= endY; y++) {
                    for (let z = startZ; z <= endZ; z++) {
                        //console.warn(x % gridSize, y % gridSize, z % gridSize)
                        if (Math.floor(startX - x) % gridSize === 0 &&
                            Math.floor(startY - y) % gridSize === 0 &&
                            Math.floor(startZ - z) % gridSize === 0) {
                            index++;
                            continue; // Skip positions where the skygrid would generate blocks
                        }
                        else {
                            placeBlockCallback({
                                x: Math.floor(x),
                                y: Math.floor(y),
                                z: Math.floor(z),
                                dimension: dimension,
                            }, index);
                        }
                        index++;
                    }
                    if (Date.now() - msSinceLastYieldStart >=
                        (options?.minMSBetweenYields ?? 2000)) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined;
                    }
                }
                if (Date.now() - msSinceLastYieldStart >=
                    (options?.minMSBetweenYields ?? 2000)) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined;
                }
            }
        }
        generatorProgress[generatorProgressId].endTick = system.currentTick;
        generatorProgress[generatorProgressId].endTime = Date.now();
        generatorProgress[generatorProgressId].done = true;
        return;
    }
    catch (e) {
        generatorProgress[generatorProgressId].endTick = system.currentTick;
        generatorProgress[generatorProgressId].endTime = Date.now();
        generatorProgress[generatorProgressId].done = true;
        throw e;
    }
}
//# sourceMappingURL=generateInverseSkygridBG.js.map