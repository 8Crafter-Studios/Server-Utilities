import { Dimension, BlockPermutation, system, UnloadedChunksError } from "@minecraft/server";
import { getTopSolidBlock } from "modules/main/functions/getTopSolidBlock";
/**
 * Covers the blocks in the specified area. Supports block masks.
 *
 * @async
 * @template LiteModeEnabled Whether to skip keeping track of how many blocks were actually changed.
 * @param {Vector3} begin The location of a corner of the area to cover.
 * @param {Vector3} end The location of the opposite corner of the area to cover.
 * @param {Dimension} dimension The dimension of the area to cover.
 * @param block The function to determine the BlockPermutation to generate.
 * @param options Optional extra options for the overlay generation execution.
 * @returns A promise that resolves with the details of the overlay generation once the overlay generation is complete.
 */
export async function overlayArea(begin, end, dimension, block, options) {
    const startTime = Date.now();
    const startTick = system.currentTick;
    const replacemode = options?.replacemode ?? false;
    const integrity = options?.integrity ?? 100;
    var counter = 0n;
    var msSinceLastTickWait = Date.now();
    var index = 0n;
    let containsUnloadedChunks = false;
    if (options?.liteMode ?? false) {
        // If lite mode is enabled.
        if (!!!options?.blockMask || options?.blockMask?.blocks?.length == 0) {
            // If there is no block mask or the block mask is empty.
            if (replacemode) {
                // If clearing containers is enabled.
                if (integrity != 100) {
                    // If integrity is not full.
                    for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x++) {
                        for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z++) {
                            if (Math.random() <= integrity / 100) {
                                try {
                                    const b = getTopSolidBlock({ x, y: 0, z }, dimension, options?.onlySolid);
                                    if (!(!b || b.y >= dimension.heightRange.max - 1 || b.y >= end.y || b.y < begin.y - 1)) {
                                        for (let y = b.y + 1; y < Math.min(b.y + 1 + (options?.layers ?? 1), dimension.heightRange.max, end.y + 1); y++) {
                                            if (y >= dimension.heightRange.max || y > end.y)
                                                break;
                                            dimension
                                                .getBlock({ x, y, z })
                                                ?.setPermutation(block({ x, y, z, dimension }, index + (options?.pillarSequencePatternMode ? 0n : BigInt(b.y + 1 - y)))); // Place the new block.
                                        }
                                    }
                                }
                                catch (e) {
                                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                        containsUnloadedChunks = true;
                                    }
                                }
                            }
                            index += options?.pillarSequencePatternMode ? 1n : BigInt(options?.layers ?? 1);
                            if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? config.system.defaultMinMSBetweenTickWaits)) {
                                await waitTick();
                                msSinceLastTickWait = Date.now();
                            }
                        }
                    }
                }
                else {
                    // If integrity is full.
                    for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x++) {
                        for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z++) {
                            try {
                                const b = getTopSolidBlock({ x, y: 0, z }, dimension, options?.onlySolid);
                                if (!(!b || b.y >= dimension.heightRange.max - 1 || b.y >= end.y || b.y < begin.y - 1)) {
                                    for (let y = b.y + 1; y < Math.min(b.y + 1 + (options?.layers ?? 1), dimension.heightRange.max, end.y + 1); y++) {
                                        if (y >= dimension.heightRange.max || y > end.y)
                                            break;
                                        dimension
                                            .getBlock({ x, y, z })
                                            ?.setPermutation(block({ x, y, z, dimension }, index + (options?.pillarSequencePatternMode ? 0n : BigInt(b.y + 1 - y)))); // Place the new block.
                                    }
                                }
                            }
                            catch (e) {
                                if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                    containsUnloadedChunks = true;
                                }
                            }
                            index += options?.pillarSequencePatternMode ? 1n : BigInt(options?.layers ?? 1);
                            if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? config.system.defaultMinMSBetweenTickWaits)) {
                                await waitTick();
                                msSinceLastTickWait = Date.now();
                            }
                        }
                    }
                }
            }
            else {
                // If clearing containers is disabled.
                if (integrity != 100) {
                    // If integrity is not full.
                    for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x++) {
                        for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z++) {
                            if (Math.random() <= integrity / 100) {
                                try {
                                    const b = getTopSolidBlock({ x, y: 0, z }, dimension, options?.onlySolid);
                                    if (!(!b || b.y >= dimension.heightRange.max - 1 || b.y >= end.y || b.y < begin.y - 1)) {
                                        for (let y = b.y + 1; y < Math.min(b.y + 1 + (options?.layers ?? 1), dimension.heightRange.max, end.y + 1); y++) {
                                            if (y >= dimension.heightRange.max || y > end.y)
                                                break;
                                            dimension
                                                .getBlock({ x, y, z })
                                                ?.setPermutation(block({ x, y, z, dimension }, index + (options?.pillarSequencePatternMode ? 0n : BigInt(b.y + 1 - y)))); // Place the new block.
                                        }
                                    }
                                }
                                catch (e) {
                                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                        containsUnloadedChunks = true;
                                    }
                                }
                            }
                            index += options?.pillarSequencePatternMode ? 1n : BigInt(options?.layers ?? 1);
                            if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? config.system.defaultMinMSBetweenTickWaits)) {
                                await waitTick();
                                msSinceLastTickWait = Date.now();
                            }
                        }
                    }
                }
                else {
                    // If integrity is full.
                    for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x++) {
                        for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z++) {
                            try {
                                const b = getTopSolidBlock({ x, y: 0, z }, dimension, options?.onlySolid);
                                if (!(!b || b.y >= dimension.heightRange.max - 1 || b.y >= end.y || b.y < begin.y - 1)) {
                                    for (let y = b.y + 1; y < Math.min(b.y + 1 + (options?.layers ?? 1), dimension.heightRange.max, end.y + 1); y++) {
                                        if (y >= dimension.heightRange.max || y > end.y)
                                            break;
                                        dimension
                                            .getBlock({ x, y, z })
                                            ?.setPermutation(block({ x, y, z, dimension }, index + (options?.pillarSequencePatternMode ? 0n : BigInt(b.y + 1 - y)))); // Place the new block.
                                    }
                                }
                            }
                            catch (e) {
                                if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                    containsUnloadedChunks = true;
                                }
                            }
                            index += options?.pillarSequencePatternMode ? 1n : BigInt(options?.layers ?? 1);
                            if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? config.system.defaultMinMSBetweenTickWaits)) {
                                await waitTick();
                                msSinceLastTickWait = Date.now();
                            }
                        }
                    }
                }
            }
        }
        else {
            if (replacemode) {
                if (integrity != 100) {
                    // If integrity is not full.
                    for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x++) {
                        for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z++) {
                            try {
                                const b = getTopSolidBlock({ x, y: 0, z }, dimension, options?.onlySolid);
                                if (!(!b || b.y >= dimension.heightRange.max - 1 || b.y >= end.y || b.y < begin.y - 1)) {
                                    if (options.blockMask.testIfMatches(b)) {
                                        if (Math.random() <= integrity / 100) {
                                            for (let y = b.y + 1; y < Math.min(b.y + 1 + (options?.layers ?? 1), dimension.heightRange.max, end.y + 1); y++) {
                                                if (y >= dimension.heightRange.max || y > end.y)
                                                    break;
                                                dimension
                                                    .getBlock({ x, y, z })
                                                    ?.setPermutation(block({ x, y, z, dimension }, index + (options?.pillarSequencePatternMode ? 0n : BigInt(b.y + 1 - y)))); // Place the new block.
                                            }
                                        }
                                    }
                                }
                            }
                            catch (e) {
                                if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                    containsUnloadedChunks = true;
                                }
                            }
                            index += options?.pillarSequencePatternMode ? 1n : BigInt(options?.layers ?? 1);
                            if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? config.system.defaultMinMSBetweenTickWaits)) {
                                await waitTick();
                                msSinceLastTickWait = Date.now();
                            }
                        }
                    }
                }
                else {
                    // If integrity is full.
                    for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x++) {
                        for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z++) {
                            try {
                                const b = getTopSolidBlock({ x, y: 0, z }, dimension, options?.onlySolid);
                                if (!(!b || b.y >= dimension.heightRange.max - 1 || b.y >= end.y || b.y < begin.y - 1)) {
                                    if (options.blockMask.testIfMatches(b)) {
                                        for (let y = b.y + 1; y < Math.min(b.y + 1 + (options?.layers ?? 1), dimension.heightRange.max, end.y + 1); y++) {
                                            if (y >= dimension.heightRange.max || y > end.y)
                                                break;
                                            dimension
                                                .getBlock({ x, y, z })
                                                ?.setPermutation(block({ x, y, z, dimension }, index + (options?.pillarSequencePatternMode ? 0n : BigInt(b.y + 1 - y)))); // Place the new block.
                                        }
                                    }
                                }
                            }
                            catch (e) {
                                if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                    containsUnloadedChunks = true;
                                }
                            }
                            index += options?.pillarSequencePatternMode ? 1n : BigInt(options?.layers ?? 1);
                            if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? config.system.defaultMinMSBetweenTickWaits)) {
                                await waitTick();
                                msSinceLastTickWait = Date.now();
                            }
                        }
                    }
                }
            }
            else {
                if (integrity != 100) {
                    // If integrity is not full.
                    for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x++) {
                        for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z++) {
                            try {
                                const b = getTopSolidBlock({ x, y: 0, z }, dimension, options?.onlySolid);
                                if (!(!b || b.y >= dimension.heightRange.max - 1 || b.y >= end.y || b.y < begin.y - 1)) {
                                    if (options.blockMask.testIfMatches(b)) {
                                        if (Math.random() <= integrity / 100) {
                                            for (let y = b.y + 1; y < Math.min(b.y + 1 + (options?.layers ?? 1), dimension.heightRange.max, end.y + 1); y++) {
                                                if (y >= dimension.heightRange.max || y > end.y)
                                                    break;
                                                dimension
                                                    .getBlock({ x, y, z })
                                                    ?.setPermutation(block({ x, y, z, dimension }, index + (options?.pillarSequencePatternMode ? 0n : BigInt(b.y + 1 - y)))); // Place the new block.
                                            }
                                        }
                                    }
                                }
                            }
                            catch (e) {
                                if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                    containsUnloadedChunks = true;
                                }
                            }
                            index += options?.pillarSequencePatternMode ? 1n : BigInt(options?.layers ?? 1);
                            if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? config.system.defaultMinMSBetweenTickWaits)) {
                                await waitTick();
                                msSinceLastTickWait = Date.now();
                            }
                        }
                    }
                }
                else {
                    // If integrity is full.
                    for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x++) {
                        for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z++) {
                            try {
                                const b = getTopSolidBlock({ x, y: 0, z }, dimension, options?.onlySolid);
                                if (!(!b || b.y >= dimension.heightRange.max - 1 || b.y >= end.y || b.y < begin.y - 1)) {
                                    if (options.blockMask.testIfMatches(b)) {
                                        for (let y = b.y + 1; y < Math.min(b.y + 1 + (options?.layers ?? 1), dimension.heightRange.max, end.y + 1); y++) {
                                            if (y >= dimension.heightRange.max || y > end.y)
                                                break;
                                            dimension
                                                .getBlock({ x, y, z })
                                                ?.setPermutation(block({ x, y, z, dimension }, index + (options?.pillarSequencePatternMode ? 0n : BigInt(b.y + 1 - y)))); // Place the new block.
                                        }
                                    }
                                }
                            }
                            catch (e) {
                                if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                    containsUnloadedChunks = true;
                                }
                            }
                            index += options?.pillarSequencePatternMode ? 1n : BigInt(options?.layers ?? 1);
                            if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? config.system.defaultMinMSBetweenTickWaits)) {
                                await waitTick();
                                msSinceLastTickWait = Date.now();
                            }
                        }
                    }
                }
            }
        }
    }
    else {
        // If lite mode is disabled.
        if (!!!options?.blockMask || options?.blockMask?.blocks?.length == 0) {
            // If there is no block mask or the block mask is empty.
            if (replacemode) {
                // If clearing containers is enabled.
                if (integrity != 100) {
                    // If integrity is not full.
                    for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x++) {
                        for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z++) {
                            if (Math.random() <= integrity / 100) {
                                try {
                                    const b = getTopSolidBlock({ x, y: 0, z }, dimension, options?.onlySolid);
                                    if (!(!b || b.y >= dimension.heightRange.max - 1 || b.y >= end.y || b.y < begin.y - 1)) {
                                        for (let y = b.y + 1; y < Math.min(b.y + 1 + (options?.layers ?? 1), dimension.heightRange.max, end.y + 1); y++) {
                                            if (y >= dimension.heightRange.max || y > end.y)
                                                break;
                                            const bA = dimension.getBlock({ x, y, z });
                                            if (!bA)
                                                continue;
                                            const p = block({ x, y, z, dimension }, index + (options?.pillarSequencePatternMode ? 0n : BigInt(b.y + 1 - y)));
                                            if (!p.matches(bA.typeId, bA.permutation.getAllStates())) {
                                                // Make sure the block is diferent than the once that would be placed there before increasing the counter.
                                                bA.setPermutation(p); // Place the new block.
                                                counter++; // Increase the counter.
                                            }
                                        }
                                    }
                                }
                                catch (e) {
                                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                        containsUnloadedChunks = true;
                                    }
                                }
                            }
                            index += options?.pillarSequencePatternMode ? 1n : BigInt(options?.layers ?? 1);
                            if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? config.system.defaultMinMSBetweenTickWaits)) {
                                await waitTick();
                                msSinceLastTickWait = Date.now();
                            }
                        }
                    }
                }
                else {
                    // If integrity is full.
                    for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x++) {
                        for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z++) {
                            try {
                                const b = getTopSolidBlock({ x, y: 0, z }, dimension, options?.onlySolid);
                                if (!(!b || b.y >= dimension.heightRange.max - 1 || b.y >= end.y || b.y < begin.y - 1)) {
                                    for (let y = b.y + 1; y < Math.min(b.y + 1 + (options?.layers ?? 1), dimension.heightRange.max, end.y + 1); y++) {
                                        if (y >= dimension.heightRange.max || y > end.y)
                                            break;
                                        const bA = dimension.getBlock({ x, y, z });
                                        if (!bA)
                                            continue;
                                        const p = block({ x, y, z, dimension }, index + (options?.pillarSequencePatternMode ? 0n : BigInt(b.y + 1 - y)));
                                        if (!p.matches(bA.typeId, bA.permutation.getAllStates())) {
                                            // Make sure the block is diferent than the once that would be placed there before increasing the counter.
                                            bA.setPermutation(p); // Place the new block.
                                            counter++; // Increase the counter.
                                        }
                                    }
                                }
                            }
                            catch (e) {
                                if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                    containsUnloadedChunks = true;
                                }
                            }
                            index += options?.pillarSequencePatternMode ? 1n : BigInt(options?.layers ?? 1);
                            if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? config.system.defaultMinMSBetweenTickWaits)) {
                                await waitTick();
                                msSinceLastTickWait = Date.now();
                            }
                        }
                    }
                }
            }
            else {
                // If clearing containers is disabled.
                if (integrity != 100) {
                    // If integrity is not full.
                    for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x++) {
                        for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z++) {
                            if (Math.random() <= integrity / 100) {
                                try {
                                    const b = getTopSolidBlock({ x, y: 0, z }, dimension, options?.onlySolid);
                                    if (!(!b || b.y >= dimension.heightRange.max - 1 || b.y >= end.y || b.y < begin.y - 1)) {
                                        for (let y = b.y + 1; y < Math.min(b.y + 1 + (options?.layers ?? 1), dimension.heightRange.max, end.y + 1); y++) {
                                            if (y >= dimension.heightRange.max || y > end.y)
                                                break;
                                            const bA = dimension.getBlock({ x, y, z });
                                            if (!bA)
                                                continue;
                                            const p = block({ x, y, z, dimension }, index + (options?.pillarSequencePatternMode ? 0n : BigInt(b.y + 1 - y)));
                                            if (!p.matches(bA.typeId, bA.permutation.getAllStates())) {
                                                // Make sure the block is diferent than the once that would be placed there before increasing the counter.
                                                bA.setPermutation(p); // Place the new block.
                                                counter++; // Increase the counter.
                                            }
                                        }
                                    }
                                }
                                catch (e) {
                                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                        containsUnloadedChunks = true;
                                    }
                                }
                            }
                            index += options?.pillarSequencePatternMode ? 1n : BigInt(options?.layers ?? 1);
                            if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? config.system.defaultMinMSBetweenTickWaits)) {
                                await waitTick();
                                msSinceLastTickWait = Date.now();
                            }
                        }
                    }
                }
                else {
                    // If integrity is full.
                    for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x++) {
                        for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z++) {
                            try {
                                const b = getTopSolidBlock({ x, y: 0, z }, dimension, options?.onlySolid);
                                if (!(!b || b.y >= dimension.heightRange.max - 1 || b.y >= end.y || b.y < begin.y - 1)) {
                                    for (let y = b.y + 1; y < Math.min(b.y + 1 + (options?.layers ?? 1), dimension.heightRange.max, end.y + 1); y++) {
                                        if (y >= dimension.heightRange.max || y > end.y)
                                            break;
                                        const bA = dimension.getBlock({ x, y, z });
                                        if (!bA)
                                            continue;
                                        const p = block({ x, y, z, dimension }, index + (options?.pillarSequencePatternMode ? 0n : BigInt(b.y + 1 - y)));
                                        if (!p.matches(bA.typeId, bA.permutation.getAllStates())) {
                                            // Make sure the block is diferent than the once that would be placed there before increasing the counter.
                                            bA.setPermutation(p); // Place the new block.
                                            counter++; // Increase the counter.
                                        }
                                    }
                                }
                            }
                            catch (e) {
                                if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                    containsUnloadedChunks = true;
                                }
                            }
                            index += options?.pillarSequencePatternMode ? 1n : BigInt(options?.layers ?? 1);
                            if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? config.system.defaultMinMSBetweenTickWaits)) {
                                await waitTick();
                                msSinceLastTickWait = Date.now();
                            }
                        }
                    }
                }
            }
        }
        else {
            if (replacemode) {
                if (integrity != 100) {
                    // If integrity is not full.
                    for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x++) {
                        for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z++) {
                            try {
                                const b = getTopSolidBlock({ x, y: 0, z }, dimension, options?.onlySolid);
                                if (!(!b || b.y >= dimension.heightRange.max - 1 || b.y >= end.y || b.y < begin.y - 1)) {
                                    if (options.blockMask.testIfMatches(b)) {
                                        if (Math.random() <= integrity / 100) {
                                            for (let y = b.y + 1; y < Math.min(b.y + 1 + (options?.layers ?? 1), dimension.heightRange.max, end.y + 1); y++) {
                                                if (y >= dimension.heightRange.max || y > end.y)
                                                    break;
                                                const bA = dimension.getBlock({ x, y, z });
                                                if (!bA)
                                                    continue;
                                                const p = block({ x, y, z, dimension }, index + (options?.pillarSequencePatternMode ? 0n : BigInt(b.y + 1 - y)));
                                                if (!p.matches(bA.typeId, bA.permutation.getAllStates())) {
                                                    // Make sure the block is diferent than the once that would be placed there before increasing the counter.
                                                    bA.setPermutation(p); // Place the new block.
                                                    counter++; // Increase the counter.
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            catch (e) {
                                if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                    containsUnloadedChunks = true;
                                }
                            }
                            index += options?.pillarSequencePatternMode ? 1n : BigInt(options?.layers ?? 1);
                            if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? config.system.defaultMinMSBetweenTickWaits)) {
                                await waitTick();
                                msSinceLastTickWait = Date.now();
                            }
                        }
                    }
                }
                else {
                    // If integrity is full.
                    for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x++) {
                        for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z++) {
                            try {
                                const b = getTopSolidBlock({ x, y: 0, z }, dimension, options?.onlySolid);
                                if (!(!b || b.y >= dimension.heightRange.max - 1 || b.y >= end.y || b.y < begin.y - 1)) {
                                    if (options.blockMask.testIfMatches(b)) {
                                        for (let y = b.y + 1; y < Math.min(b.y + 1 + (options?.layers ?? 1), dimension.heightRange.max, end.y + 1); y++) {
                                            if (y >= dimension.heightRange.max || y > end.y)
                                                break;
                                            const bA = dimension.getBlock({ x, y, z });
                                            if (!bA)
                                                continue;
                                            const p = block({ x, y, z, dimension }, index + (options?.pillarSequencePatternMode ? 0n : BigInt(b.y + 1 - y)));
                                            if (!p.matches(bA.typeId, bA.permutation.getAllStates())) {
                                                // Make sure the block is diferent than the once that would be placed there before increasing the counter.
                                                bA.setPermutation(p); // Place the new block.
                                                counter++; // Increase the counter.
                                            }
                                        }
                                    }
                                }
                            }
                            catch (e) {
                                if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                    containsUnloadedChunks = true;
                                }
                            }
                            index += options?.pillarSequencePatternMode ? 1n : BigInt(options?.layers ?? 1);
                            if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? config.system.defaultMinMSBetweenTickWaits)) {
                                await waitTick();
                                msSinceLastTickWait = Date.now();
                            }
                        }
                    }
                }
            }
            else {
                if (integrity != 100) {
                    // If integrity is not full.
                    for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x++) {
                        for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z++) {
                            try {
                                const b = getTopSolidBlock({ x, y: 0, z }, dimension, options?.onlySolid);
                                if (!(!b || b.y >= dimension.heightRange.max - 1 || b.y >= end.y || b.y < begin.y - 1)) {
                                    if (options.blockMask.testIfMatches(b)) {
                                        if (Math.random() <= integrity / 100) {
                                            for (let y = b.y + 1; y < Math.min(b.y + 1 + (options?.layers ?? 1), dimension.heightRange.max, end.y + 1); y++) {
                                                if (y >= dimension.heightRange.max || y > end.y)
                                                    break;
                                                const bA = dimension.getBlock({ x, y, z });
                                                if (!bA)
                                                    continue;
                                                const p = block({ x, y, z, dimension }, index + (options?.pillarSequencePatternMode ? 0n : BigInt(b.y + 1 - y)));
                                                if (!p.matches(bA.typeId, bA.permutation.getAllStates())) {
                                                    // Make sure the block is diferent than the once that would be placed there before increasing the counter.
                                                    bA.setPermutation(p); // Place the new block.
                                                    counter++; // Increase the counter.
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            catch (e) {
                                if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                    containsUnloadedChunks = true;
                                }
                            }
                            index += options?.pillarSequencePatternMode ? 1n : BigInt(options?.layers ?? 1);
                            if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? config.system.defaultMinMSBetweenTickWaits)) {
                                await waitTick();
                                msSinceLastTickWait = Date.now();
                            }
                        }
                    }
                }
                else {
                    // If integrity is full.
                    for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x++) {
                        for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z++) {
                            try {
                                const b = getTopSolidBlock({ x, y: 0, z }, dimension, options?.onlySolid);
                                if (!(!b || b.y >= dimension.heightRange.max - 1 || b.y >= end.y || b.y < begin.y - 1)) {
                                    if (options.blockMask.testIfMatches(b)) {
                                        for (let y = b.y + 1; y < Math.min(b.y + 1 + (options?.layers ?? 1), dimension.heightRange.max, end.y + 1); y++) {
                                            if (y >= dimension.heightRange.max || y > end.y)
                                                break;
                                            const bA = dimension.getBlock({ x, y, z });
                                            if (!bA)
                                                continue;
                                            const p = block({ x, y, z, dimension }, index + (options?.pillarSequencePatternMode ? 0n : BigInt(b.y + 1 - y)));
                                            if (!p.matches(bA.typeId, bA.permutation.getAllStates())) {
                                                // Make sure the block is diferent than the once that would be placed there before increasing the counter.
                                                bA.setPermutation(p); // Place the new block.
                                                counter++; // Increase the counter.
                                            }
                                        }
                                    }
                                }
                            }
                            catch (e) {
                                if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                    containsUnloadedChunks = true;
                                }
                            }
                            index += options?.pillarSequencePatternMode ? 1n : BigInt(options?.layers ?? 1);
                            if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? config.system.defaultMinMSBetweenTickWaits)) {
                                await waitTick();
                                msSinceLastTickWait = Date.now();
                            }
                        }
                    }
                }
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
//# sourceMappingURL=overlayArea.js.map