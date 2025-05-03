import { Dimension, system } from "@minecraft/server";
import { generatorProgress } from "modules/coordinates/constants/generatorProgress";
export function* generateMinecraftOvoidCG(center, radius, offset, thickness, generatorProgressId, dimension, placeBlockCallback = () => { }, options) {
    try {
        const innerRadiusX = radius.x - thickness;
        const innerRadiusY = radius.y - thickness;
        const innerRadiusZ = radius.z - thickness;
        generatorProgress[generatorProgressId] = {
            done: false,
            startTick: system.currentTick,
            startTime: Date.now(),
            containsUnloadedChunks: false,
        };
        var msSinceLastYieldStart = Date.now();
        if ((options?.integrity ?? 100) != 100) {
            for (let x = Math.floor(center.x - radius.x); x <= Math.ceil(center.x + radius.x); x++) {
                for (let y = Math.floor(center.y - radius.y); y <= Math.ceil(center.y + radius.y); y++) {
                    for (let z = Math.floor(center.z - radius.z); z <= Math.ceil(center.z + radius.z); z++) {
                        const distanceSquared = ((x - center.x - offset.x) / radius.x) ** 2 +
                            ((y - center.y - offset.y) / radius.y) ** 2 +
                            ((z - center.z - offset.z) / radius.z) ** 2;
                        if (distanceSquared <= 1 &&
                            distanceSquared >= (innerRadiusX / radius.x) ** 2 &&
                            distanceSquared >= (innerRadiusY / radius.y) ** 2 &&
                            distanceSquared >= (innerRadiusZ / radius.z) ** 2) {
                            if (Math.random() <=
                                (options?.integrity ?? 100) / 100) {
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
            for (let x = Math.floor(center.x - radius.x); x <= Math.ceil(center.x + radius.x); x++) {
                for (let y = Math.floor(center.y - radius.y); y <= Math.ceil(center.y + radius.y); y++) {
                    for (let z = Math.floor(center.z - radius.z); z <= Math.ceil(center.z + radius.z); z++) {
                        const distanceSquared = ((x - center.x - offset.x) / radius.x) ** 2 +
                            ((y - center.y - offset.y) / radius.y) ** 2 +
                            ((z - center.z - offset.z) / radius.z) ** 2;
                        if (distanceSquared <= 1 &&
                            distanceSquared >=
                                ((innerRadiusX + offset.x) / radius.x) ** 2 &&
                            distanceSquared >=
                                ((innerRadiusY + offset.y) / radius.y) ** 2 &&
                            distanceSquared >=
                                ((innerRadiusZ + offset.z) / radius.z) ** 2) {
                            placeBlockCallback({
                                x: x,
                                y: y,
                                z: z,
                                dimension: dimension,
                            });
                        }
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
//# sourceMappingURL=generateMinecraftOvoidCG.js.map