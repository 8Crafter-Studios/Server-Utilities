import { Dimension, BlockPermutation, system, UnloadedChunksError } from "@minecraft/server";
/**
 * Fills the outline of the specified area. Supports block masks.
 * @async
 * @param {Vector3} begin The location of a corner of the area to fill in.
 * @param {Vector3} end The location of the opposite corner of the area to fill in.
 * @param {number} gridSize The size of the skygrid.
 * @param {Dimension} dimension The dimension to generate the fill in.
 * @param block The function to determine the BlockPermutation to generate.
 * @param options Optional extra options for the fill generation execution.
 * @param options.blockMask The block mask to match.
 * @param options.minMSBetweenTickWaits The shortest the generation can run for before pausing until the next tick.
 * @param options.replacemode Whether or not to clear container blocks before replacing them.
 * @param options.integrity The integrity of the fill generation.
 * @param options.liteMode Whether to skip keeping track of how many blocks were actually changed.
 * @returns A promise that resolves with the details of the fill generation once the fill generation is complete.
 * @remarks The most modern version of the skygrid block filling functions.
 */
export async function fillSkygrid(begin, end, gridSize, dimension, block, options) {
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
                    for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x += gridSize) {
                        for (let y = Math.min(begin.y, end.y); y <= Math.max(begin.y, end.y); y += gridSize) {
                            for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z += gridSize) {
                                if (Math.random() <= integrity / 100) {
                                    try {
                                        const b = dimension.getBlock({ x, y, z });
                                        if (!!b.getComponent("inventory")) {
                                            // Check that the block has an inventory component before clearing it.
                                            b.getComponent("inventory").container.clearAll(); // Clear the container of the block before placing the new block there.
                                        }
                                        b.setPermutation(block({ x, y, z, dimension }, index)); // Place the new block.
                                        counter++; // Increase the counter.
                                    }
                                    catch (e) {
                                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                            containsUnloadedChunks = true;
                                        }
                                    }
                                }
                                index++;
                                if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? 2000)) {
                                    await waitTick();
                                    msSinceLastTickWait = Date.now();
                                }
                            }
                        }
                    }
                }
                else {
                    // If integrity is full.
                    for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x += gridSize) {
                        for (let y = Math.min(begin.y, end.y); y <= Math.max(begin.y, end.y); y += gridSize) {
                            for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z += gridSize) {
                                try {
                                    const b = dimension.getBlock({ x, y, z });
                                    if (!!b.getComponent("inventory")) {
                                        // Check that the block has an inventory component before clearing it.
                                        b.getComponent("inventory").container.clearAll(); // Clear the container of the block before placing the new block there.
                                    }
                                    b.setPermutation(block({ x, y, z, dimension }, index)); // Place the new block.
                                }
                                catch (e) {
                                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                        containsUnloadedChunks = true;
                                    }
                                }
                                index++;
                                if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? 2000)) {
                                    await waitTick();
                                    msSinceLastTickWait = Date.now();
                                }
                            }
                        }
                    }
                }
            }
            else {
                // If clearing containers is disabled.
                if (integrity != 100) {
                    // If integrity is not full.
                    for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x += gridSize) {
                        for (let y = Math.min(begin.y, end.y); y <= Math.max(begin.y, end.y); y += gridSize) {
                            for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z += gridSize) {
                                if (Math.random() <= integrity / 100) {
                                    try {
                                        const b = dimension.getBlock({ x, y, z });
                                        b.setPermutation(block({ x, y, z, dimension }, index)); // Place the new block.
                                    }
                                    catch (e) {
                                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                            containsUnloadedChunks = true;
                                        }
                                    }
                                }
                                index++;
                                if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? 2000)) {
                                    await waitTick();
                                    msSinceLastTickWait = Date.now();
                                }
                            }
                        }
                    }
                }
                else {
                    // If integrity is full.
                    for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x += gridSize) {
                        for (let y = Math.min(begin.y, end.y); y <= Math.max(begin.y, end.y); y += gridSize) {
                            for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z += gridSize) {
                                try {
                                    const b = dimension.getBlock({ x, y, z });
                                    b.setPermutation(block({ x, y, z, dimension }, index)); // Place the new block.
                                }
                                catch (e) {
                                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                        containsUnloadedChunks = true;
                                    }
                                }
                                index++;
                                if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? 2000)) {
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
            if (replacemode) {
                if (integrity != 100) {
                    // If integrity is not full.
                    for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x += gridSize) {
                        for (let y = Math.min(begin.y, end.y); y <= Math.max(begin.y, end.y); y += gridSize) {
                            for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z += gridSize) {
                                try {
                                    const b = dimension.getBlock({ x, y, z });
                                    if (options.blockMask.testIfMatches(b)) {
                                        if (Math.random() <= integrity / 100) {
                                            if (!!b.getComponent("inventory")) {
                                                // Check that the block has an inventory component before clearing it.
                                                b.getComponent("inventory").container.clearAll(); // Clear the container of the block before placing the new block there.
                                            }
                                            b.setPermutation(block({ x, y, z, dimension }, index)); // Place the new block.
                                        }
                                    }
                                }
                                catch (e) {
                                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                        containsUnloadedChunks = true;
                                    }
                                }
                                index++;
                                if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? 2000)) {
                                    await waitTick();
                                    msSinceLastTickWait = Date.now();
                                }
                            }
                        }
                    }
                }
                else {
                    // If integrity is full.
                    for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x += gridSize) {
                        for (let y = Math.min(begin.y, end.y); y <= Math.max(begin.y, end.y); y += gridSize) {
                            for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z += gridSize) {
                                try {
                                    const b = dimension.getBlock({ x, y, z });
                                    if (options.blockMask.testIfMatches(b)) {
                                        if (!!b.getComponent("inventory")) {
                                            // Check that the block has an inventory component before clearing it.
                                            b.getComponent("inventory").container.clearAll(); // Clear the container of the block before placing the new block there.
                                        }
                                        b.setPermutation(block({ x, y, z, dimension }, index)); // Place the new block.
                                    }
                                }
                                catch (e) {
                                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                        containsUnloadedChunks = true;
                                    }
                                }
                                index++;
                                if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? 2000)) {
                                    await waitTick();
                                    msSinceLastTickWait = Date.now();
                                }
                            }
                        }
                    }
                }
            }
            else {
                if (integrity != 100) {
                    // If integrity is not full.
                    for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x += gridSize) {
                        for (let y = Math.min(begin.y, end.y); y <= Math.max(begin.y, end.y); y += gridSize) {
                            for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z += gridSize) {
                                try {
                                    const b = dimension.getBlock({ x, y, z });
                                    if (options.blockMask.testIfMatches(b)) {
                                        if (Math.random() <= integrity / 100) {
                                            b.setPermutation(block({ x, y, z, dimension }, index)); // Place the new block.
                                        }
                                    }
                                }
                                catch (e) {
                                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                        containsUnloadedChunks = true;
                                    }
                                }
                                index++;
                                if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? 2000)) {
                                    await waitTick();
                                    msSinceLastTickWait = Date.now();
                                }
                            }
                        }
                    }
                }
                else {
                    // If integrity is full.
                    for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x += gridSize) {
                        for (let y = Math.min(begin.y, end.y); y <= Math.max(begin.y, end.y); y += gridSize) {
                            for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z += gridSize) {
                                try {
                                    const b = dimension.getBlock({ x, y, z });
                                    if (options.blockMask.testIfMatches(b)) {
                                        b.setPermutation(block({ x, y, z, dimension }, index)); // Place the new block.
                                    }
                                }
                                catch (e) {
                                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                        containsUnloadedChunks = true;
                                    }
                                }
                                index++;
                                if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? 2000)) {
                                    await waitTick();
                                    msSinceLastTickWait = Date.now();
                                }
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
                    for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x += gridSize) {
                        for (let y = Math.min(begin.y, end.y); y <= Math.max(begin.y, end.y); y += gridSize) {
                            for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z += gridSize) {
                                if (Math.random() <= integrity / 100) {
                                    try {
                                        const b = dimension.getBlock({ x, y, z });
                                        const p = block({ x, y, z, dimension }, index);
                                        if (!p.matches(b.typeId, b.permutation.getAllStates())) {
                                            // Make sure the block is diferent than the once that would be placed there before increasing the counter.
                                            if (!!b.getComponent("inventory")) {
                                                // Check that the block has an inventory component before clearing it.
                                                b.getComponent("inventory").container.clearAll(); // Clear the container of the block before placing the new block there.
                                            }
                                            b.setPermutation(p); // Place the new block.
                                            counter++; // Increase the counter.
                                        }
                                    }
                                    catch (e) {
                                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                            containsUnloadedChunks = true;
                                        }
                                    }
                                }
                                index++;
                                if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? 2000)) {
                                    await waitTick();
                                    msSinceLastTickWait = Date.now();
                                }
                            }
                        }
                    }
                }
                else {
                    // If integrity is full.
                    for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x += gridSize) {
                        for (let y = Math.min(begin.y, end.y); y <= Math.max(begin.y, end.y); y += gridSize) {
                            for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z += gridSize) {
                                try {
                                    const b = dimension.getBlock({ x, y, z });
                                    const p = block({ x, y, z, dimension }, index);
                                    if (!p.matches(b.typeId, b.permutation.getAllStates())) {
                                        // Make sure the block is diferent than the once that would be placed there before increasing the counter.
                                        if (!!b.getComponent("inventory")) {
                                            // Check that the block has an inventory component before clearing it.
                                            b.getComponent("inventory").container.clearAll(); // Clear the container of the block before placing the new block there.
                                        }
                                        b.setPermutation(p); // Place the new block.
                                        counter++; // Increase the counter.
                                    }
                                }
                                catch (e) {
                                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                        containsUnloadedChunks = true;
                                    }
                                }
                                index++;
                                if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? 2000)) {
                                    await waitTick();
                                    msSinceLastTickWait = Date.now();
                                }
                            }
                        }
                    }
                }
            }
            else {
                // If clearing containers is disabled.
                if (integrity != 100) {
                    // If integrity is not full.
                    for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x += gridSize) {
                        for (let y = Math.min(begin.y, end.y); y <= Math.max(begin.y, end.y); y += gridSize) {
                            for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z += gridSize) {
                                if (Math.random() <= integrity / 100) {
                                    try {
                                        const b = dimension.getBlock({ x, y, z });
                                        const p = block({ x, y, z, dimension }, index);
                                        if (!p.matches(b.typeId, b.permutation.getAllStates())) {
                                            // Make sure the block is diferent than the once that would be placed there before increasing the counter.
                                            b.setPermutation(p); // Place the new block.
                                            counter++; // Increase the counter.
                                        }
                                    }
                                    catch (e) {
                                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                            containsUnloadedChunks = true;
                                        }
                                    }
                                }
                                index++;
                                if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? 2000)) {
                                    await waitTick();
                                    msSinceLastTickWait = Date.now();
                                }
                            }
                        }
                    }
                }
                else {
                    // If integrity is full.
                    for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x += gridSize) {
                        for (let y = Math.min(begin.y, end.y); y <= Math.max(begin.y, end.y); y += gridSize) {
                            for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z += gridSize) {
                                try {
                                    const b = dimension.getBlock({ x, y, z });
                                    const p = block({ x, y, z, dimension }, index);
                                    if (!p.matches(b.typeId, b.permutation.getAllStates())) {
                                        // Make sure the block is diferent than the once that would be placed there before increasing the counter.
                                        b.setPermutation(p); // Place the new block.
                                        counter++; // Increase the counter.
                                    }
                                }
                                catch (e) {
                                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                        containsUnloadedChunks = true;
                                    }
                                }
                                index++;
                                if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? 2000)) {
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
            if (replacemode) {
                if (integrity != 100) {
                    // If integrity is not full.
                    for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x += gridSize) {
                        for (let y = Math.min(begin.y, end.y); y <= Math.max(begin.y, end.y); y += gridSize) {
                            for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z += gridSize) {
                                try {
                                    const b = dimension.getBlock({ x, y, z });
                                    if (options.blockMask.testIfMatches(b)) {
                                        if (Math.random() <= integrity / 100) {
                                            const p = block({ x, y, z, dimension }, index);
                                            if (!p.matches(b.typeId, b.permutation.getAllStates())) {
                                                // Make sure the block is diferent than the once that would be placed there before increasing the counter.
                                                if (!!b.getComponent("inventory")) {
                                                    // Check that the block has an inventory component before clearing it.
                                                    b.getComponent("inventory").container.clearAll(); // Clear the container of the block before placing the new block there.
                                                }
                                                b.setPermutation(p); // Place the new block.
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
                                index++;
                                if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? 2000)) {
                                    await waitTick();
                                    msSinceLastTickWait = Date.now();
                                }
                            }
                        }
                    }
                }
                else {
                    // If integrity is full.
                    for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x += gridSize) {
                        for (let y = Math.min(begin.y, end.y); y <= Math.max(begin.y, end.y); y += gridSize) {
                            for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z += gridSize) {
                                try {
                                    const b = dimension.getBlock({ x, y, z });
                                    if (options.blockMask.testIfMatches(b)) {
                                        const p = block({ x, y, z, dimension }, index);
                                        if (!p.matches(b.typeId, b.permutation.getAllStates())) {
                                            // Make sure the block is diferent than the once that would be placed there before increasing the counter.
                                            if (!!b.getComponent("inventory")) {
                                                // Check that the block has an inventory component before clearing it.
                                                b.getComponent("inventory").container.clearAll(); // Clear the container of the block before placing the new block there.
                                            }
                                            b.setPermutation(p); // Place the new block.
                                            counter++; // Increase the counter.
                                        }
                                    }
                                }
                                catch (e) {
                                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                        containsUnloadedChunks = true;
                                    }
                                }
                                index++;
                                if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? 2000)) {
                                    await waitTick();
                                    msSinceLastTickWait = Date.now();
                                }
                            }
                        }
                    }
                }
            }
            else {
                if (integrity != 100) {
                    // If integrity is not full.
                    for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x += gridSize) {
                        for (let y = Math.min(begin.y, end.y); y <= Math.max(begin.y, end.y); y += gridSize) {
                            for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z += gridSize) {
                                try {
                                    const b = dimension.getBlock({ x, y, z });
                                    if (options.blockMask.testIfMatches(b)) {
                                        if (Math.random() <= integrity / 100) {
                                            const p = block({ x, y, z, dimension }, index);
                                            if (!p.matches(b.typeId, b.permutation.getAllStates())) {
                                                // Make sure the block is diferent than the once that would be placed there before increasing the counter.
                                                b.setPermutation(p); // Place the new block.
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
                                index++;
                                if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? 2000)) {
                                    await waitTick();
                                    msSinceLastTickWait = Date.now();
                                }
                            }
                        }
                    }
                }
                else {
                    // If integrity is full.
                    for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x += gridSize) {
                        for (let y = Math.min(begin.y, end.y); y <= Math.max(begin.y, end.y); y += gridSize) {
                            for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z += gridSize) {
                                try {
                                    const b = dimension.getBlock({ x, y, z });
                                    if (options.blockMask.testIfMatches(b)) {
                                        const p = block({ x, y, z, dimension }, index);
                                        if (!p.matches(b.typeId, b.permutation.getAllStates())) {
                                            // Make sure the block is diferent than the once that would be placed there before increasing the counter.
                                            b.setPermutation(p); // Place the new block.
                                            counter++; // Increase the counter.
                                        }
                                    }
                                }
                                catch (e) {
                                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                        containsUnloadedChunks = true;
                                    }
                                }
                                index++;
                                if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? 2000)) {
                                    await waitTick();
                                    msSinceLastTickWait = Date.now();
                                }
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
//# sourceMappingURL=fillSkygrid.js.map