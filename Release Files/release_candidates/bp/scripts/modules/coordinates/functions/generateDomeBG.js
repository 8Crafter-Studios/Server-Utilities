import { Dimension, system } from "@minecraft/server";
import { generatorProgress } from "modules/coordinates/constants/generatorProgress";
export function* generateDomeBG(center, radius, thickness, dimension, generatorProgressId, minMSBetweenYields = 2000, placeBlockCallback = () => { }, onComplete = () => { }, integrity = 100) {
    try {
        const centerX = center.x;
        const centerY = center.y;
        const centerZ = center.z;
        generatorProgress[generatorProgressId] = {
            done: false,
            startTick: system.currentTick,
            startTime: Date.now(),
            containsUnloadedChunks: false,
        };
        var msSinceLastYieldStart = Date.now();
        if (integrity != 100) {
            for (let x = centerX - radius; x <= centerX + radius; x++) {
                for (let y = centerY - radius; y <= centerY + radius; y++) {
                    if (y >= centerY) {
                        for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                            const distance = Math.sqrt((x - centerX) ** 2 +
                                (y - centerY) ** 2 +
                                (z - centerZ) ** 2);
                            if (distance >= radius - thickness &&
                                distance <= radius) {
                                if (Math.random() <= integrity / 100) {
                                    placeBlockCallback({
                                        x: x,
                                        y: y,
                                        z: z,
                                        dimension: dimension,
                                    });
                                }
                            }
                        }
                        if (Date.now() - msSinceLastYieldStart >=
                            minMSBetweenYields) {
                            msSinceLastYieldStart = Date.now();
                            yield undefined;
                        }
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
                    if (y >= centerY) {
                        for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                            const distance = Math.sqrt((x - centerX) ** 2 +
                                (y - centerY) ** 2 +
                                (z - centerZ) ** 2);
                            if (distance >= radius - thickness &&
                                distance <= radius) {
                                placeBlockCallback({
                                    x: x,
                                    y: y,
                                    z: z,
                                    dimension: dimension,
                                });
                            }
                        }
                        if (Date.now() - msSinceLastYieldStart >=
                            minMSBetweenYields) {
                            msSinceLastYieldStart = Date.now();
                            yield undefined;
                        }
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
//# sourceMappingURL=generateDomeBG.js.map