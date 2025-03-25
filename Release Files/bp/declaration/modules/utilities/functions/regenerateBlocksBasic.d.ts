import { type Vector3, type Dimension } from "@minecraft/server";
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
export declare function regenerateBlocksBasic(corner1: Vector3, corner2: Vector3, dimension: Dimension, radius: number, options?: {
    /**
     * Minimum amount of time in milliseconds to spend regenrating the blocks each tick.\
     * Defaults to 2000.
     */
    minMSBetweenTickWaits?: number;
    /**
     * If true, then surrounding air blocks will not affect the type of blocks generated.\
     * Defaults to true.
     */
    ignoreAir?: boolean;
    /**
     * If true, then only air blocks will be replaced.\
     * Defaults to true.
     */
    onlyReplaceAir?: boolean;
    /**
     * The amount to multiply by the weight of air.\
     * Only applies when options.ignoreAir is set to false.\
     * Defaults to 0.5.
     */
    airPriority?: number;
    /**
     * If true, then surrounding air blocks that are in the section that has yet to be generated will not affect the type of blocks generated.\
     * Only applies when options.ignoreAir and options.ignoreNotYetGeneratedBlocks are set to false.\
     * Defaults to true.
     */
    ignoreNotYetGeneratedAir?: boolean;
    /**
     * If true, then all surrounding blocks that are in the section that has yet to be generated will not affect the type of blocks generated.\
     * Defaults to false.
     */
    ignoreNotYetGeneratedBlocks?: boolean;
    /**
     * The maximum amount by which to multiply or divide weights of the surrounding block permutations to randomize the generated block slightly.\
     * It will add 1 to the randomization amount before calculating, so 0.2 would result in the weights being multiplied or divided by between 1 and 1.2.\
     * Defaults to 0.2.
     */
    randomization?: number;
    /**
     * Whether to prioritize surrounding blocks that are closer to the block being generated.\
     * Defaults to true.
     */
    doDistanceBasedPriority?: boolean;
    /**
     * The amount that will be multiplied by the vertical distance between the blocks to determine the amount to divide the weight of the block by.\
     * Setting it to 0 will disable vertical distance priority.\
     * Only aplies when options.doDistanceBasedPriority is set to true.\
     * Defaults to 1.5.
     */
    verticalDistancePriority?: number;
    /**
     * The amount that will be multiplied by the horizontal distance between the blocks to determine the amount to divide the weight of the block by.\
     * Setting it to 0 will disable horizontal distance priority.\
     * Only aplies when options.doDistanceBasedPriority is set to true.\
     * Defaults to 1.2.
     */
    horizontalDistancePriority?: number;
    /**
     * @todo Add functionality to this option.
     */
    airPriorityScalingMode?: "none" | "linear-bottom-to-top" | "linear-top-to-bottom" | "linear-east-to-west" | "linear-north-to-south" | "linear-radial-center" | "linear-radial-TNE" | "linear-radial-CNE" | "linear-radial-BNE" | "linear-radial-TNW" | "linear-radial-CNW" | "linear-radial-BNW" | "linear-radial-TSE" | "linear-radial-CSE" | "linear-radial-BSE" | "linear-radial-TSW" | "linear-radial-CSW" | "linear-radial-BSW" | "linear-radial-TN" | "linear-radial-CN" | "linear-radial-BN" | "linear-radial-TE" | "linear-radial-CE" | "linear-radial-BE" | "linear-radial-TS" | "linear-radial-CS" | "linear-radial-BS" | "linear-radial-TW" | "linear-radial-CW" | "linear-radial-BW";
    /**
     * @todo Add functionality to this option.
     */
    airPriorityCalculationFunction?: ((minRelativeLocation: Vector3, min: Vector3, max: Vector3) => number);
}): Promise<{
    /**
     * The number of blocks that were regenerated successfully.
     */
    successfulRegenerations: bigint;
    /**
     * The number of blocks that failed to regenerate due to no surrounding blocks being detected.
     */
    failedRegenerations: bigint;
    /**
     * The tick that the block regeneration started.
     */
    startTick: number;
    /**
     * The tick that the block regeneration ended.
     */
    endTick: number;
    /**
     * The time that the block regeneration started.
     */
    startTime: number;
    /**
     * The time that the block regeneration ended.
     */
    endTime: number;
    /**
     * The total amount of time that the function actually spent regenerating blocks.
     */
    totalTimeSpentRegenerating: number;
    /**
     * The total number of blocks that were tested in the specified area.
     */
    finalIndex: bigint;
    /**
     * Whether or not any of the blocks were in unloaded chunks.
     */
    containsUnloadedChunks: boolean;
    /**
     * Whether or not any of the surrounding blocks were in unloaded chunks.
     */
    surroundingBlocksContainsUnloadedChunks: boolean;
    /**
     * How many blocks were in unloaded chunks.
     */
    unloadedBlockCount: bigint;
    /**
     * How many surrounding blocks were in unloaded chunks.
     */
    unloadedSurroundingBlockCount: bigint;
    /**
     * The error that caused execution to be stopped early.
     */
    error?: Error;
}>;
