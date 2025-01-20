import { Dimension, BlockPermutation, system, UnloadedChunksError } from "@minecraft/server";
/**
 * Generates a cylinder in the specified area. Supports block masks.
 * @async
 * @param {Vector3} center The location of the center of the cylinder.
 * @param {number} radius The radius of the cylinder.
 * @param {number} length The length of the cylinder.
 * @param {"x"|"y"|"z"} axis The axis of the cylinder.
 * @param {Dimension} dimension The dimension to generate the fill in.
 * @param block The function to determine the BlockPermutation to generate.
 * @param options Optional extra options for the fill generation execution.
 * @param options.blockMask The block mask to match.
 * @param options.minMSBetweenTickWaits The shortest the generation can run for before pausing until the next tick.
 * @param options.replacemode Whether or not to clear container blocks before replacing them.
 * @param options.integrity The integrity of the fill generation.
 * @param options.liteMode Whether to skip keeping track of how many blocks were actually changed.
 * @returns A promise that resolves with the details of the fill generation once the fill generation is complete.
 * @remarks The most modern version of the cylinder block filling functions.
 * @warning THIS FUNCTION NEEDS LOTS OF TESTING AS IT WAS GREATLY SIMPLIFIED WHEN THE AI CHANGED IT TO GENERATE CYLINDERS INSTEAD OF SPHERES, AND REMOVED THE BLOCK MASK MATCHER, SO I HAD TO ADD IT BACK AGIAN, SO OTHER FUNCTIONS MIGHT HAVE GOT MESSED UP TOO!
 * @todo Test this function FULLY.
 */
export async function fillCylinder(center, radius, length, axis, dimension, block, options) {
    const startTime = Date.now();
    const startTick = system.currentTick;
    const replacemode = options?.replacemode ?? false;
    const integrity = options?.integrity ?? 100;
    var counter = 0n;
    var msSinceLastTickWait = Date.now();
    var index = 0n;
    let containsUnloadedChunks = false;
    const centerX = center.x;
    const centerY = center.y;
    const centerZ = center.z;
    const minMSBetweenTickWaits = options?.minMSBetweenTickWaits ?? 2000;
    const isWithinCylinder = (x, y, z) => {
        switch (axis) {
            case 'x':
                return Math.pow(y - centerY, 2) + Math.pow(z - centerZ, 2) <= Math.pow(radius, 2) && Math.abs(x - centerX) <= length / 2;
            case 'y':
                return Math.pow(x - centerX, 2) + Math.pow(z - centerZ, 2) <= Math.pow(radius, 2) && Math.abs(y - centerY) <= length / 2;
            case 'z':
                return Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) <= Math.pow(radius, 2) && Math.abs(z - centerZ) <= length / 2;
            default:
                throw new Error(`Invalid axis: ${axis}`);
        }
    };
    const fillBlock = async (x, y, z) => {
        if (isWithinCylinder(x, y, z)) {
            if (Math.random() <= integrity / 100) {
                try {
                    const b = dimension.getBlock({ x, y, z });
                    if (options?.blockMask?.testIfMatches(b) ?? true) {
                        const p = block({ x, y, z, dimension }, index);
                        if (!p.matches(b.typeId, b.permutation.getAllStates())) {
                            if (replacemode && !!b.getComponent("inventory")) {
                                b.getComponent("inventory").container.clearAll();
                            }
                            b.setPermutation(p);
                            counter++;
                        }
                    }
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        containsUnloadedChunks = true;
                    }
                }
            }
            index++;
            if (Date.now() - msSinceLastTickWait >= minMSBetweenTickWaits) {
                await waitTick();
                msSinceLastTickWait = Date.now();
            }
        }
    };
    for (let x = centerX - (axis == "x" ? length / 2 : radius); x <= centerX + (axis == "x" ? length / 2 : radius); x++) {
        for (let y = centerY - (axis == "y" ? length / 2 : radius); y <= centerY + (axis == "y" ? length / 2 : radius); y++) {
            for (let z = centerZ - (axis == "z" ? length / 2 : radius); z <= centerZ + (axis == "z" ? length / 2 : radius); z++) {
                await fillBlock(x, y, z);
            }
        }
    }
    if (options?.liteMode == true) {
        return {
            startTick,
            endTick: system.currentTick,
            startTime,
            endTime: Date.now(),
            containsUnloadedChunks,
        };
    }
    else {
        return {
            counter: counter,
            startTick,
            endTick: system.currentTick,
            startTime,
            endTime: Date.now(),
            containsUnloadedChunks,
        };
    }
}
//# sourceMappingURL=fillCylinder.js.map