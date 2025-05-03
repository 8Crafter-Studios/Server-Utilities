import { Dimension, system } from "@minecraft/server";
import { generatorProgress } from "modules/coordinates/constants/generatorProgress";
export function* generateMinecraftOvoidBG(center, radius, offset, thickness, generatorProgressId, dimension, placeBlockCallback = () => { }, options) {
    try {
        const innerRadiusX = radius.x - thickness;
        const innerRadiusY = radius.y - thickness;
        const innerRadiusZ = radius.z - thickness;
        const outerRadiusX = radius.x + offset.x;
        const outerRadiusY = radius.y + offset.y;
        const outerRadiusZ = radius.z + offset.z;
        generatorProgress[generatorProgressId] = {
            done: false,
            startTick: system.currentTick,
            startTime: Date.now(),
            containsUnloadedChunks: false,
        };
        var msSinceLastYieldStart = Date.now();
        if ((options?.integrity ?? 100) != 100) {
            for (let x = Math.floor(center.x - outerRadiusX); x <= Math.ceil(center.x + outerRadiusX); x++) {
                for (let y = Math.floor(center.y - outerRadiusY); y <= Math.ceil(center.y + outerRadiusY); y++) {
                    for (let z = Math.floor(center.z - outerRadiusZ); z <= Math.ceil(center.z + outerRadiusZ); z++) {
                        const distanceSquared = ((x - center.x) / outerRadiusX) ** 2 +
                            ((y - center.y) / outerRadiusY) ** 2 +
                            ((z - center.z) / outerRadiusZ) ** 2;
                        if (distanceSquared <= 1 &&
                            distanceSquared >=
                                (innerRadiusX / outerRadiusX) ** 2 &&
                            distanceSquared >=
                                (innerRadiusY / outerRadiusY) ** 2 &&
                            distanceSquared >=
                                (innerRadiusZ / outerRadiusZ) ** 2) {
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
            for (let x = Math.floor(center.x - outerRadiusX); x <= Math.ceil(center.x + outerRadiusX); x++) {
                for (let y = Math.floor(center.y - outerRadiusY); y <= Math.ceil(center.y + outerRadiusY); y++) {
                    for (let z = Math.floor(center.z - outerRadiusZ); z <= Math.ceil(center.z + outerRadiusZ); z++) {
                        const distanceSquared = ((x - center.x) / outerRadiusX) ** 2 +
                            ((y - center.y) / outerRadiusY) ** 2 +
                            ((z - center.z) / outerRadiusZ) ** 2;
                        if (distanceSquared <= 1 &&
                            distanceSquared >=
                                (innerRadiusX / outerRadiusX) ** 2 &&
                            distanceSquared >=
                                (innerRadiusY / outerRadiusY) ** 2 &&
                            distanceSquared >=
                                (innerRadiusZ / outerRadiusZ) ** 2) {
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
//# sourceMappingURL=generateMinecraftOvoidBG.js.map