import { BlockPermutation, UnloadedChunksError, LocationInUnloadedChunkError, LocationOutOfWorldBoundariesError, } from "@minecraft/server";
/**
 * Regenerates blocks within a specified area based on surrounding blocks.
 *
 * @param corner1 - The first corner of the area to regenerate.
 * @param corner2 - The second corner of the area to regenerate.
 * @param dimension - The dimension in which the regeneration will take place.
 * @param radius - The radius around each block to consider for regeneration.
 * @param options - Optional parameters to customize the regeneration process.
 * @param options.minMSBetweenTickWaits - Minimum amount of time in milliseconds to spend regenerating the blocks each tick. Defaults to 2000.
 * @param options.ignoreAir - If true, then surrounding air blocks will not affect the type of blocks generated. Defaults to true.
 * @param options.onlyReplaceAir - If true, then only air blocks will be replaced. Defaults to true.
 * @param options.airPriority - The amount to multiply by the weight of air. Defaults to 0.5.
 * @param options.ignoreNotYetGeneratedAir - If true, then surrounding air blocks that are in the section that has yet to be generated will not affect the type of blocks generated. Defaults to true.
 * @param options.randomization - The maximum amount by which to multiply or divide weights of the surrounding block permutations to randomize the generated block slightly. Defaults to 0.2.
 * @param options.doDistanceBasedPriority - Whether to prioritize surrounding blocks that are closer to the block being generated. Defaults to true.
 * @param options.verticalDistancePriority - The amount that will be multiplied by the vertical distance between the blocks to determine the amount to divide the weight of the block by. Defaults to 1.5.
 * @param options.horizontalDistancePriority - The amount that will be multiplied by the horizontal distance between the blocks to determine the amount to divide the weight of the block by. Defaults to 1.2.
 *
 * @returns A promise that resolves with an object containing details about the regeneration process.
 * @returns successfulRegenerations - The number of blocks that were regenerated successfully.
 * @returns failedRegenerations - The number of blocks that failed to regenerate due to no surrounding blocks being detected.
 * @returns startTick - The tick that the block regeneration started.
 * @returns endTick - The tick that the block regeneration ended.
 * @returns startTime - The time that the block regeneration started.
 * @returns endTime - The time that the block regeneration ended.
 * @returns totalTimeSpentRegenerating - The total amount of time that the function actually spent regenerating blocks.
 * @returns finalIndex - The total number of blocks that were tested in the specified area.
 * @returns containsUnloadedChunks - Whether or not any of the blocks were in unloaded chunks.
 * @returns surroundingBlocksContainsUnloadedChunks - Whether or not any of the surrounding blocks were in unloaded chunks.
 * @returns unloadedBlockCount - How many blocks were in unloaded chunks.
 * @returns unloadedSurroundingBlockCount - How many surrounding blocks were in unloaded chunks.
 * @returns error? - The error that caused execution to be stopped early.
 */
export async function regenerateBlocksBasic(corner1, corner2, dimension, radius, options) {
    const startTime = Date.now();
    const startTick = system.currentTick;
    var successfulRegenerations = 0n;
    var failedRegenerations = 0n;
    var msSinceLastTickWait = Date.now();
    var index = 0n;
    var totalTimeSpentRegenerating = 0;
    var unloadedBlockCount = 0n;
    var unloadedSurroundingBlockCount = 0n;
    const opts = {
        minMSBetweenTickWaits: options?.minMSBetweenTickWaits ?? config.system.defaultMinMSBetweenTickWaits,
        ignoreAir: options?.ignoreAir ?? true,
        onlyReplaceAir: options?.onlyReplaceAir ?? true,
        airPriority: options?.airPriority ?? 0.5,
        ignoreNotYetGeneratedAir: options?.ignoreNotYetGeneratedAir ?? true,
        ignoreNotYetGeneratedBlocks: options?.ignoreNotYetGeneratedBlocks ?? false,
        randomization: options?.randomization ?? 0.2,
        doDistanceBasedPriority: options?.doDistanceBasedPriority ?? true,
        verticalDistancePriority: options?.verticalDistancePriority ?? 1.5,
        horizontalDistancePriority: options?.horizontalDistancePriority ?? 1.2,
        airPriorityScalingMode: options?.airPriorityScalingMode ?? "none",
        airPriorityCalculationFunction: options?.airPriorityCalculationFunction ?? undefined,
    };
    const minX = Math.min(corner1.x, corner2.x);
    const maxX = Math.max(corner1.x, corner2.x);
    const minY = Math.min(corner1.y, corner2.y);
    const maxY = Math.max(corner1.y, corner2.y);
    const minZ = Math.min(corner1.z, corner2.z);
    const maxZ = Math.max(corner1.z, corner2.z);
    const calculateWeight = !opts.doDistanceBasedPriority
        ? function calculateWeight() {
            return 1;
        }
        : opts.ignoreAir
            ? function calculateWeight(blockLocation, surroundingBlock) {
                let weight = 1;
                weight /=
                    Vector.distance({ x: blockLocation.x, y: 0, z: blockLocation.z }, { x: surroundingBlock.x, y: 0, z: surroundingBlock.z }) *
                        opts.horizontalDistancePriority +
                        1;
                weight /= Vector.distance({ x: 0, y: blockLocation.y, z: 0 }, { x: 0, y: surroundingBlock.y, z: 0 }) * opts.verticalDistancePriority + 1;
                return weight;
            }
            : opts.ignoreNotYetGeneratedBlocks
                ? function calculateWeight(blockLocation, surroundingBlock) {
                    if ((surroundingBlock.x > blockLocation.x && surroundingBlock.x < maxX) ||
                        (surroundingBlock.y > blockLocation.y && surroundingBlock.y < maxY) ||
                        (surroundingBlock.z > blockLocation.z && surroundingBlock.z < maxZ))
                        return 0;
                    let weight = 1;
                    weight /=
                        Vector.distance({ x: blockLocation.x, y: 0, z: blockLocation.z }, { x: surroundingBlock.x, y: 0, z: surroundingBlock.z }) *
                            opts.horizontalDistancePriority +
                            1;
                    weight /= Vector.distance({ x: 0, y: blockLocation.y, z: 0 }, { x: 0, y: surroundingBlock.y, z: 0 }) * opts.verticalDistancePriority + 1;
                    return weight;
                }
                : opts.ignoreNotYetGeneratedAir
                    ? function calculateWeight(blockLocation, surroundingBlock) {
                        if (surroundingBlock.typeId == "minecraft:air" &&
                            ((surroundingBlock.x > blockLocation.x && surroundingBlock.x < maxX) ||
                                (surroundingBlock.y > blockLocation.y && surroundingBlock.y < maxY) ||
                                (surroundingBlock.z > blockLocation.z && surroundingBlock.z < maxZ)))
                            return 0;
                        let weight = 1;
                        weight /=
                            Vector.distance({ x: blockLocation.x, y: 0, z: blockLocation.z }, { x: surroundingBlock.x, y: 0, z: surroundingBlock.z }) *
                                opts.horizontalDistancePriority +
                                1;
                        weight /= Vector.distance({ x: 0, y: blockLocation.y, z: 0 }, { x: 0, y: surroundingBlock.y, z: 0 }) * opts.verticalDistancePriority + 1;
                        return weight;
                    }
                    : function calculateWeight(blockLocation, surroundingBlock) {
                        let weight = 1;
                        if (surroundingBlock.typeId == "minecraft:air")
                            weight *= opts.airPriority;
                        weight /=
                            Vector.distance({ x: blockLocation.x, y: 0, z: blockLocation.z }, { x: surroundingBlock.x, y: 0, z: surroundingBlock.z }) *
                                opts.horizontalDistancePriority +
                                1;
                        weight /= Vector.distance({ x: 0, y: blockLocation.y, z: 0 }, { x: 0, y: surroundingBlock.y, z: 0 }) * opts.verticalDistancePriority + 1;
                        return weight;
                    };
    for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
            for (let z = minZ; z <= maxZ; z++) {
                try {
                    const block = dimension.getBlock({ x, y, z });
                    if (block === undefined) {
                        unloadedBlockCount++;
                    }
                    else if (!opts.onlyReplaceAir || block.typeId === "minecraft:air") {
                        const surroundingBlocks = [];
                        for (let dx = -radius; dx <= radius; dx++) {
                            for (let dy = -radius; dy <= radius; dy++) {
                                for (let dz = -radius; dz <= radius; dz++) {
                                    if (dx === 0 && dy === 0 && dz === 0)
                                        continue;
                                    const surroundingBlock = dimension.getBlock({ x: x + dx, y: y + dy, z: z + dz });
                                    if (surroundingBlock === undefined) {
                                        unloadedSurroundingBlockCount++;
                                        continue;
                                    }
                                    if (!opts.ignoreAir || surroundingBlock.typeId !== "minecraft:air") {
                                        surroundingBlocks.push(surroundingBlock);
                                    }
                                }
                            }
                        }
                        if (surroundingBlocks.length > 0) {
                            const blockTypeCounts = {};
                            for (const surroundingBlock of surroundingBlocks) {
                                const key = JSON.stringify([
                                    surroundingBlock.typeId,
                                    Object.entries(surroundingBlock.permutation.getAllStates()).sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0)),
                                ]);
                                if (!blockTypeCounts[key]) {
                                    blockTypeCounts[key] = 0;
                                }
                                blockTypeCounts[key] += calculateWeight({ x, y, z }, surroundingBlock);
                            }
                            Object.keys(blockTypeCounts).forEach((b) => (blockTypeCounts[b] *=
                                Math.random() >= 0.5 ? Math.random() * opts.randomization + 1 : 1 / (Math.random() * opts.randomization + 1)));
                            const mostCommonBlockType = JSON.parse(Object.keys(blockTypeCounts).reduce((a, b) => blockTypeCounts[a] > blockTypeCounts[b] ? a : blockTypeCounts[a] < blockTypeCounts[b] ? b : Math.random() >= 0.5 ? a : b));
                            dimension.setBlockPermutation({ x, y, z }, BlockPermutation.resolve(mostCommonBlockType[0], Object.fromEntries(mostCommonBlockType[1])));
                            successfulRegenerations++;
                        }
                        else {
                            failedRegenerations++;
                        }
                    }
                    index++;
                    if (Date.now() - msSinceLastTickWait >= opts.minMSBetweenTickWaits) {
                        totalTimeSpentRegenerating += Date.now() - msSinceLastTickWait;
                        await waitTick();
                        msSinceLastTickWait = Date.now();
                    }
                }
                catch (e) {
                    if (e instanceof LocationInUnloadedChunkError || e instanceof UnloadedChunksError) {
                        unloadedBlockCount++;
                    }
                    else if (e instanceof LocationOutOfWorldBoundariesError) {
                        continue;
                    }
                    else {
                        totalTimeSpentRegenerating += Date.now() - msSinceLastTickWait;
                        return {
                            successfulRegenerations,
                            failedRegenerations,
                            startTick,
                            endTick: system.currentTick,
                            startTime,
                            endTime: Date.now(),
                            totalTimeSpentRegenerating,
                            finalIndex: index,
                            containsUnloadedChunks: unloadedBlockCount > 0,
                            surroundingBlocksContainsUnloadedChunks: unloadedSurroundingBlockCount > 0,
                            unloadedBlockCount,
                            unloadedSurroundingBlockCount,
                            error: e,
                        };
                    }
                }
            }
        }
    }
    totalTimeSpentRegenerating += Date.now() - msSinceLastTickWait;
    return {
        successfulRegenerations,
        failedRegenerations,
        startTick,
        endTick: system.currentTick,
        startTime,
        endTime: Date.now(),
        totalTimeSpentRegenerating,
        finalIndex: index,
        containsUnloadedChunks: unloadedBlockCount > 0,
        surroundingBlocksContainsUnloadedChunks: unloadedSurroundingBlockCount > 0,
        unloadedBlockCount,
        unloadedSurroundingBlockCount,
    };
}
// ${se}srun(async()=>dcsend((await modules.utils.regenerateBlocksBasic(player.worldEditSelection.pos1, player.worldEditSelection.pos2, player.dimension, 3, {ignoreAir: false, airPriority: 2, verticalDistancePriority: 5}))))
//# sourceMappingURL=regenerateBlocksBasic.js.map