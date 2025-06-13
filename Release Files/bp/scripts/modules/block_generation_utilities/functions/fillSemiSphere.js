import { Dimension, BlockPermutation, system, UnloadedChunksError } from "@minecraft/server";
/**
 * Generates a sphere in the specified area. Supports block masks.
 * @async
 * @param {Vector3} center The location of the center of the sphere.
 * @param {number} radius The radius of the sphere.
 * @param {Dimension} dimension The dimension to generate the fill in.
 * @param block The function to determine the BlockPermutation to generate.
 * @param options Optional extra options for the fill generation execution.
 * @param options.blockMask The block mask to match.
 * @param options.minMSBetweenTickWaits The shortest the generation can run for before pausing until the next tick.
 * @param options.replacemode Whether or not to clear container blocks before replacing them.
 * @param options.integrity The integrity of the fill generation.
 * @param options.liteMode Whether to skip keeping track of how many blocks were actually changed.
 * @param options.upsideDown Whether or not to generate the dome upside-down, as only generating the bottom half of the sphere instead of only the top half.
 * @returns A promise that resolves with the details of the fill generation once the fill generation is complete.
 * @remarks The most modern version of the sphere block filling functions.
 */
export async function fillSemiSphere(center, radius, dimension, block, options) {
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
    if (options?.liteMode ?? false) {
        // If lite mode is enabled.
        if (!!!options?.blockMask || options?.blockMask?.blocks?.length == 0) {
            // If there is no block mask or the block mask is empty.
            if (replacemode) {
                // If clearing containers is enabled.
                if (integrity != 100) {
                    // If integrity is not full.
                    for (let y = centerY - radius; y <= centerY + radius; y++) {
                        if (options?.upsideDown == true ? y > centerY : y < centerY) {
                            continue;
                        }
                        for (let x = centerX - radius; x <= centerX + radius; x++) {
                            for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                                const distanceSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) + Math.pow(z - centerZ, 2);
                                if (distanceSquared > Math.pow(radius, 2)) {
                                    continue;
                                }
                                if (Math.random() <= integrity / 100) {
                                    try {
                                        const b = dimension.getBlock({ x, y, z });
                                        if (b?.getComponent("inventory")) {
                                            // Check that the block has an inventory component before clearing it.
                                            b.getComponent("inventory").container.clearAll(); // Clear the container of the block before placing the new block there.
                                        }
                                        b?.setPermutation(block({ x, y, z, dimension }, index)); // Place the new block.
                                        counter++; // Increase the counter.
                                    }
                                    catch (e) {
                                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                            containsUnloadedChunks = true;
                                        }
                                    }
                                }
                                index++;
                                if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? config.system.defaultMinMSBetweenTickWaits)) {
                                    await waitTick();
                                    msSinceLastTickWait = Date.now();
                                }
                            }
                        }
                    }
                }
                else {
                    // If integrity is full.
                    for (let y = centerY - radius; y <= centerY + radius; y++) {
                        if (options?.upsideDown == true ? y > centerY : y < centerY) {
                            continue;
                        }
                        for (let x = centerX - radius; x <= centerX + radius; x++) {
                            for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                                const distanceSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) + Math.pow(z - centerZ, 2);
                                if (distanceSquared > Math.pow(radius, 2)) {
                                    continue;
                                }
                                try {
                                    const b = dimension.getBlock({ x, y, z });
                                    if (b?.getComponent("inventory")) {
                                        // Check that the block has an inventory component before clearing it.
                                        b.getComponent("inventory").container.clearAll(); // Clear the container of the block before placing the new block there.
                                    }
                                    b?.setPermutation(block({ x, y, z, dimension }, index)); // Place the new block.
                                }
                                catch (e) {
                                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                        containsUnloadedChunks = true;
                                    }
                                }
                                index++;
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
                // If clearing containers is disabled.
                if (integrity != 100) {
                    // If integrity is not full.
                    for (let y = centerY - radius; y <= centerY + radius; y++) {
                        if (options?.upsideDown == true ? y > centerY : y < centerY) {
                            continue;
                        }
                        for (let x = centerX - radius; x <= centerX + radius; x++) {
                            for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                                const distanceSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) + Math.pow(z - centerZ, 2);
                                if (distanceSquared > Math.pow(radius, 2)) {
                                    continue;
                                }
                                if (Math.random() <= integrity / 100) {
                                    try {
                                        const b = dimension.getBlock({ x, y, z });
                                        b?.setPermutation(block({ x, y, z, dimension }, index)); // Place the new block.
                                    }
                                    catch (e) {
                                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                            containsUnloadedChunks = true;
                                        }
                                    }
                                }
                                index++;
                                if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? config.system.defaultMinMSBetweenTickWaits)) {
                                    await waitTick();
                                    msSinceLastTickWait = Date.now();
                                }
                            }
                        }
                    }
                }
                else {
                    // If integrity is full.
                    for (let y = centerY - radius; y <= centerY + radius; y++) {
                        if (options?.upsideDown == true ? y > centerY : y < centerY) {
                            continue;
                        }
                        for (let x = centerX - radius; x <= centerX + radius; x++) {
                            for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                                const distanceSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) + Math.pow(z - centerZ, 2);
                                if (distanceSquared > Math.pow(radius, 2)) {
                                    continue;
                                }
                                try {
                                    const b = dimension.getBlock({ x, y, z });
                                    b?.setPermutation(block({ x, y, z, dimension }, index)); // Place the new block.
                                }
                                catch (e) {
                                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                        containsUnloadedChunks = true;
                                    }
                                }
                                index++;
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
            if (replacemode) {
                if (integrity != 100) {
                    // If integrity is not full.
                    for (let y = centerY - radius; y <= centerY + radius; y++) {
                        if (options?.upsideDown == true ? y > centerY : y < centerY) {
                            continue;
                        }
                        for (let x = centerX - radius; x <= centerX + radius; x++) {
                            for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                                const distanceSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) + Math.pow(z - centerZ, 2);
                                if (distanceSquared > Math.pow(radius, 2)) {
                                    continue;
                                }
                                try {
                                    const b = dimension.getBlock({ x, y, z });
                                    if (options.blockMask.testIfMatches(b)) {
                                        if (Math.random() <= integrity / 100) {
                                            if (b?.getComponent("inventory")) {
                                                // Check that the block has an inventory component before clearing it.
                                                b.getComponent("inventory").container.clearAll(); // Clear the container of the block before placing the new block there.
                                            }
                                            b?.setPermutation(block({ x, y, z, dimension }, index)); // Place the new block.
                                        }
                                    }
                                }
                                catch (e) {
                                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                        containsUnloadedChunks = true;
                                    }
                                }
                                index++;
                                if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? config.system.defaultMinMSBetweenTickWaits)) {
                                    await waitTick();
                                    msSinceLastTickWait = Date.now();
                                }
                            }
                        }
                    }
                }
                else {
                    // If integrity is full.
                    for (let y = centerY - radius; y <= centerY + radius; y++) {
                        if (options?.upsideDown == true ? y > centerY : y < centerY) {
                            continue;
                        }
                        for (let x = centerX - radius; x <= centerX + radius; x++) {
                            for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                                const distanceSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) + Math.pow(z - centerZ, 2);
                                if (distanceSquared > Math.pow(radius, 2)) {
                                    continue;
                                }
                                try {
                                    const b = dimension.getBlock({ x, y, z });
                                    if (options.blockMask.testIfMatches(b)) {
                                        if (b?.getComponent("inventory")) {
                                            // Check that the block has an inventory component before clearing it.
                                            b.getComponent("inventory").container.clearAll(); // Clear the container of the block before placing the new block there.
                                        }
                                        b?.setPermutation(block({ x, y, z, dimension }, index)); // Place the new block.
                                    }
                                }
                                catch (e) {
                                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                        containsUnloadedChunks = true;
                                    }
                                }
                                index++;
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
                if (integrity != 100) {
                    // If integrity is not full.
                    for (let y = centerY - radius; y <= centerY + radius; y++) {
                        if (options?.upsideDown == true ? y > centerY : y < centerY) {
                            continue;
                        }
                        for (let x = centerX - radius; x <= centerX + radius; x++) {
                            for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                                const distanceSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) + Math.pow(z - centerZ, 2);
                                if (distanceSquared > Math.pow(radius, 2)) {
                                    continue;
                                }
                                try {
                                    const b = dimension.getBlock({ x, y, z });
                                    if (options.blockMask.testIfMatches(b)) {
                                        if (Math.random() <= integrity / 100) {
                                            b?.setPermutation(block({ x, y, z, dimension }, index)); // Place the new block.
                                        }
                                    }
                                }
                                catch (e) {
                                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                        containsUnloadedChunks = true;
                                    }
                                }
                                index++;
                                if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? config.system.defaultMinMSBetweenTickWaits)) {
                                    await waitTick();
                                    msSinceLastTickWait = Date.now();
                                }
                            }
                        }
                    }
                }
                else {
                    // If integrity is full.
                    for (let y = centerY - radius; y <= centerY + radius; y++) {
                        if (options?.upsideDown == true ? y > centerY : y < centerY) {
                            continue;
                        }
                        for (let x = centerX - radius; x <= centerX + radius; x++) {
                            for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                                const distanceSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) + Math.pow(z - centerZ, 2);
                                if (distanceSquared > Math.pow(radius, 2)) {
                                    continue;
                                }
                                try {
                                    const b = dimension.getBlock({ x, y, z });
                                    if (options.blockMask.testIfMatches(b)) {
                                        b?.setPermutation(block({ x, y, z, dimension }, index)); // Place the new block.
                                    }
                                }
                                catch (e) {
                                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                        containsUnloadedChunks = true;
                                    }
                                }
                                index++;
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
    }
    else {
        // If lite mode is disabled.
        if (!!!options?.blockMask || options?.blockMask?.blocks?.length == 0) {
            // If there is no block mask or the block mask is empty.
            if (replacemode) {
                // If clearing containers is enabled.
                if (integrity != 100) {
                    // If integrity is not full.
                    for (let y = centerY - radius; y <= centerY + radius; y++) {
                        if (options?.upsideDown == true ? y > centerY : y < centerY) {
                            continue;
                        }
                        for (let x = centerX - radius; x <= centerX + radius; x++) {
                            for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                                const distanceSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) + Math.pow(z - centerZ, 2);
                                if (distanceSquared > Math.pow(radius, 2)) {
                                    continue;
                                }
                                if (Math.random() <= integrity / 100) {
                                    try {
                                        const b = dimension.getBlock({ x, y, z });
                                        const p = block({ x, y, z, dimension }, index);
                                        if (b && !p.matches(b.typeId, b.permutation.getAllStates())) {
                                            // Make sure the block is diferent than the once that would be placed there before increasing the counter.
                                            if (b?.getComponent("inventory")) {
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
                                if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? config.system.defaultMinMSBetweenTickWaits)) {
                                    await waitTick();
                                    msSinceLastTickWait = Date.now();
                                }
                            }
                        }
                    }
                }
                else {
                    // If integrity is full.
                    for (let y = centerY - radius; y <= centerY + radius; y++) {
                        if (options?.upsideDown == true ? y > centerY : y < centerY) {
                            continue;
                        }
                        for (let x = centerX - radius; x <= centerX + radius; x++) {
                            for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                                const distanceSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) + Math.pow(z - centerZ, 2);
                                if (distanceSquared > Math.pow(radius, 2)) {
                                    continue;
                                }
                                try {
                                    const b = dimension.getBlock({ x, y, z });
                                    const p = block({ x, y, z, dimension }, index);
                                    if (b && !p.matches(b.typeId, b.permutation.getAllStates())) {
                                        // Make sure the block is diferent than the once that would be placed there before increasing the counter.
                                        if (b?.getComponent("inventory")) {
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
                // If clearing containers is disabled.
                if (integrity != 100) {
                    // If integrity is not full.
                    for (let y = centerY - radius; y <= centerY + radius; y++) {
                        if (options?.upsideDown == true ? y > centerY : y < centerY) {
                            continue;
                        }
                        for (let x = centerX - radius; x <= centerX + radius; x++) {
                            for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                                const distanceSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) + Math.pow(z - centerZ, 2);
                                if (distanceSquared > Math.pow(radius, 2)) {
                                    continue;
                                }
                                if (Math.random() <= integrity / 100) {
                                    try {
                                        const b = dimension.getBlock({ x, y, z });
                                        const p = block({ x, y, z, dimension }, index);
                                        if (b && !p.matches(b.typeId, b.permutation.getAllStates())) {
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
                                if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? config.system.defaultMinMSBetweenTickWaits)) {
                                    await waitTick();
                                    msSinceLastTickWait = Date.now();
                                }
                            }
                        }
                    }
                }
                else {
                    // If integrity is full.
                    for (let y = centerY - radius; y <= centerY + radius; y++) {
                        if (options?.upsideDown == true ? y > centerY : y < centerY) {
                            continue;
                        }
                        for (let x = centerX - radius; x <= centerX + radius; x++) {
                            for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                                const distanceSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) + Math.pow(z - centerZ, 2);
                                if (distanceSquared > Math.pow(radius, 2)) {
                                    continue;
                                }
                                try {
                                    const b = dimension.getBlock({ x, y, z });
                                    const p = block({ x, y, z, dimension }, index);
                                    if (b && !p.matches(b.typeId, b.permutation.getAllStates())) {
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
            if (replacemode) {
                if (integrity != 100) {
                    // If integrity is not full.
                    for (let y = centerY - radius; y <= centerY + radius; y++) {
                        if (options?.upsideDown == true ? y > centerY : y < centerY) {
                            continue;
                        }
                        for (let x = centerX - radius; x <= centerX + radius; x++) {
                            for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                                const distanceSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) + Math.pow(z - centerZ, 2);
                                if (distanceSquared > Math.pow(radius, 2)) {
                                    continue;
                                }
                                try {
                                    const b = dimension.getBlock({ x, y, z });
                                    if (options.blockMask.testIfMatches(b)) {
                                        if (Math.random() <= integrity / 100) {
                                            const p = block({ x, y, z, dimension }, index);
                                            if (b && !p.matches(b.typeId, b.permutation.getAllStates())) {
                                                // Make sure the block is diferent than the once that would be placed there before increasing the counter.
                                                if (b?.getComponent("inventory")) {
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
                                if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? config.system.defaultMinMSBetweenTickWaits)) {
                                    await waitTick();
                                    msSinceLastTickWait = Date.now();
                                }
                            }
                        }
                    }
                }
                else {
                    // If integrity is full.
                    for (let y = centerY - radius; y <= centerY + radius; y++) {
                        if (options?.upsideDown == true ? y > centerY : y < centerY) {
                            continue;
                        }
                        for (let x = centerX - radius; x <= centerX + radius; x++) {
                            for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                                const distanceSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) + Math.pow(z - centerZ, 2);
                                if (distanceSquared > Math.pow(radius, 2)) {
                                    continue;
                                }
                                try {
                                    const b = dimension.getBlock({ x, y, z });
                                    if (options.blockMask.testIfMatches(b)) {
                                        const p = block({ x, y, z, dimension }, index);
                                        if (b && !p.matches(b.typeId, b.permutation.getAllStates())) {
                                            // Make sure the block is diferent than the once that would be placed there before increasing the counter.
                                            if (b?.getComponent("inventory")) {
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
                if (integrity != 100) {
                    // If integrity is not full.
                    for (let y = centerY - radius; y <= centerY + radius; y++) {
                        if (options?.upsideDown == true ? y > centerY : y < centerY) {
                            continue;
                        }
                        for (let x = centerX - radius; x <= centerX + radius; x++) {
                            for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                                const distanceSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) + Math.pow(z - centerZ, 2);
                                if (distanceSquared > Math.pow(radius, 2)) {
                                    continue;
                                }
                                try {
                                    const b = dimension.getBlock({ x, y, z });
                                    if (options.blockMask.testIfMatches(b)) {
                                        if (Math.random() <= integrity / 100) {
                                            const p = block({ x, y, z, dimension }, index);
                                            if (b && !p.matches(b.typeId, b.permutation.getAllStates())) {
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
                                if (Date.now() - msSinceLastTickWait >= (options?.minMSBetweenTickWaits ?? config.system.defaultMinMSBetweenTickWaits)) {
                                    await waitTick();
                                    msSinceLastTickWait = Date.now();
                                }
                            }
                        }
                    }
                }
                else {
                    // If integrity is full.
                    for (let y = centerY - radius; y <= centerY + radius; y++) {
                        if (options?.upsideDown == true ? y > centerY : y < centerY) {
                            continue;
                        }
                        for (let x = centerX - radius; x <= centerX + radius; x++) {
                            for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                                const distanceSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) + Math.pow(z - centerZ, 2);
                                if (distanceSquared > Math.pow(radius, 2)) {
                                    continue;
                                }
                                try {
                                    const b = dimension.getBlock({ x, y, z });
                                    if (options.blockMask.testIfMatches(b)) {
                                        const p = block({ x, y, z, dimension }, index);
                                        if (b && !p.matches(b.typeId, b.permutation.getAllStates())) {
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
//# sourceMappingURL=fillSemiSphere.js.map