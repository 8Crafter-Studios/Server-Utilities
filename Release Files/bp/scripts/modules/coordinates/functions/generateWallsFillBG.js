import { Dimension, system } from "@minecraft/server";
import { generatorProgress } from "modules/coordinates/constants/generatorProgress";
export function* generateWallsFillBG(begin, end, dimension, generatorProgressId, minMSBetweenYields = 2000, placeBlockCallback = () => { }, onComplete = () => { }, integrity = 100) {
    try {
        generatorProgress[generatorProgressId] = {
            done: false,
            startTick: system.currentTick,
            startTime: Date.now(),
            containsUnloadedChunks: false,
        };
        var index = 0n;
        var msSinceLastYieldStart = Date.now();
        if (integrity != 100) {
            for (let x = begin.x; x <= end.x; x++) {
                for (let y = begin.y; y <= end.y; y++) {
                    for (let z = begin.z; z <= end.z; x == begin.x || x == end.x || z == end.z
                        ? z++
                        : (z = end.z)) {
                        if (Math.random() <= integrity / 100) {
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
        else {
            for (let x = begin.x; x <= end.x; x++) {
                for (let y = begin.y; y <= end.y; y++) {
                    for (let z = begin.z; z <= end.z; x == begin.x || x == end.x || z == end.z
                        ? z++
                        : (z = end.z)) {
                        placeBlockCallback({ x: x, y: y, z: z, dimension: dimension }, index);
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
//# sourceMappingURL=generateWallsFillBG.js.map