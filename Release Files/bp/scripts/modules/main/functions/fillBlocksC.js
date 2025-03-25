import { Dimension, BlockVolume, BlockTypes, BlockPermutation } from "@minecraft/server";
/**
 * @deprecated
 */
export function fillBlocksC(begin, end, dimension, blocktype = "air", blockStates, matchingBlock, matchingBlockStates, overrideAllBlockStates = false) {
    let mainArray = Array.from(new BlockVolume(begin, end).getBlockLocationIterator());
    let counter = 0;
    let block = BlockTypes.get(matchingBlock).id;
    let blockmatching = BlockTypes.get(matchingBlock).id;
    if (overrideAllBlockStates) {
        if (!!matchingBlock) {
            //console.warn("3");
            if (!!matchingBlockStates) {
                //console.warn("4");
                if (!!blockStates) {
                    //console.warn("10b");
                    mainArray.forEach((v) => {
                        try {
                            //console.warn("1");
                            if (dimension.getBlock(v)?.permutation !=
                                BlockPermutation.resolve(blocktype, blockStates)) {
                                //console.warn("2");
                                if (blockmatching ==
                                    dimension.getBlock(v)?.typeId) {
                                    //console.warn("14");
                                    if (Object.entries(matchingBlockStates).every((p) => Object.entries(dimension
                                        .getBlock(v)
                                        ?.permutation?.getAllStates()).includes(p))) {
                                        //console.warn("5");
                                        dimension
                                            .getBlock(v)
                                            .setPermutation(BlockPermutation.resolve(blocktype, blockStates));
                                        counter++; //; console.warn("6");
                                    }
                                }
                            }
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                    });
                }
                else {
                    mainArray.forEach((v) => {
                        try {
                            //console.warn("1");
                            if (dimension.getBlock(v)?.permutation !=
                                BlockPermutation.resolve(blocktype, blockStates)) {
                                //console.warn("2");
                                if (blockmatching ==
                                    dimension.getBlock(v)?.typeId) {
                                    //console.warn("14");
                                    if (Object.entries(matchingBlockStates).every((p) => Object.entries(dimension
                                        .getBlock(v)
                                        ?.permutation?.getAllStates()).includes(p))) {
                                        //console.warn("5");
                                        dimension
                                            .getBlock(v)
                                            .setPermutation(BlockPermutation.resolve(blocktype, blockStates));
                                        counter++; //; console.warn("6");
                                    }
                                }
                            }
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                    });
                }
            }
            else {
                //console.warn("7");
                if (!!blockStates) {
                    //console.warn("10c");
                    mainArray.forEach((v) => {
                        try {
                            //console.warn("1");
                            if (dimension.getBlock(v)?.permutation !=
                                BlockPermutation.resolve(blocktype, blockStates)) {
                                //console.warn("2");
                                if (block == dimension.getBlock(v)?.typeId) {
                                    //console.warn("14");
                                    dimension
                                        .getBlock(v)
                                        .setPermutation(BlockPermutation.resolve(blocktype, blockStates));
                                    counter++; //; console.warn("8");
                                }
                            }
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                    });
                }
                else {
                    mainArray.forEach((v) => {
                        try {
                            //console.warn("1");
                            if (dimension.getBlock(v)?.permutation !=
                                BlockPermutation.resolve(blocktype)) {
                                //console.warn("2");
                                if (block == dimension.getBlock(v)?.typeId) {
                                    //console.warn("14");
                                    dimension
                                        .getBlock(v)
                                        .setPermutation(BlockPermutation.resolve(blocktype));
                                    counter++; //; console.warn("8");
                                }
                            }
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                    });
                }
            }
        }
        else {
            //console.warn("9");
            if (!!blockStates) {
                //console.warn("10");
                mainArray.forEach((v) => {
                    try {
                        //console.warn("1");
                        if (dimension.getBlock(v)?.typeId != block) {
                            //console.warn("2");
                            dimension
                                .getBlock(v)
                                .setPermutation(BlockPermutation.resolve(blocktype, blockStates));
                            counter++; //; console.warn("11");
                        }
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                });
            }
            else {
                //console.warn("12");
                mainArray.forEach((v) => {
                    try {
                        //console.warn("1");
                        if (dimension.getBlock(v)?.typeId != block) {
                            //console.warn("2");
                            dimension.getBlock(v).setType(blocktype);
                            counter++; //; console.warn("13");
                        }
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                });
            }
        }
    }
    else {
        if (!!matchingBlock) {
            //console.warn("3");
            if (!!matchingBlockStates) {
                //console.warn("4");
                if (!!blockStates) {
                    //console.warn("10b");
                    mainArray.forEach((v) => {
                        try {
                            //console.warn("1");
                            if (dimension.getBlock(v)?.permutation !=
                                BlockPermutation.resolve(blocktype, !overrideAllBlockStates &&
                                    BlockTypes.get(blocktype).id ==
                                        dimension.getBlock(v)?.typeId
                                    ? Object.fromEntries(Object.entries(Object.assign(dimension
                                        .getBlock(v)
                                        ?.permutation?.getAllStates(), blockStates)).filter((v) => !!Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find((s) => v[0] == s[0])))
                                    : blockStates)) {
                                //console.warn("2");
                                if (BlockTypes.get(matchingBlock).id ==
                                    dimension.getBlock(v)?.typeId) {
                                    //console.warn("14");
                                    if (Object.entries(matchingBlockStates).every((p) => Object.entries(dimension
                                        .getBlock(v)
                                        ?.permutation?.getAllStates()).includes(p))) {
                                        //console.warn("5");
                                        dimension
                                            .getBlock(v)
                                            .setPermutation(BlockPermutation.resolve(blocktype, !overrideAllBlockStates &&
                                            BlockTypes.get(blocktype).id ==
                                                dimension.getBlock(v)?.typeId
                                            ? Object.fromEntries(Object.entries(Object.assign(dimension
                                                .getBlock(v)
                                                ?.permutation?.getAllStates(), blockStates)).filter((v) => !!Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find((s) => v[0] ==
                                                s[0])))
                                            : blockStates));
                                        counter++; //; console.warn("6");
                                    }
                                }
                            }
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                    });
                }
                else {
                    mainArray.forEach((v) => {
                        try {
                            //console.warn("1");
                            if (dimension.getBlock(v)?.permutation !=
                                BlockPermutation.resolve(blocktype, !overrideAllBlockStates &&
                                    BlockTypes.get(blocktype).id ==
                                        dimension.getBlock(v)?.typeId
                                    ? Object.fromEntries(Object.entries(dimension
                                        .getBlock(v)
                                        ?.permutation?.getAllStates()).filter((v) => !!Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find((s) => v[0] == s[0])))
                                    : blockStates)) {
                                //console.warn("2");
                                if (BlockTypes.get(matchingBlock).id ==
                                    dimension.getBlock(v)?.typeId) {
                                    //console.warn("14");
                                    if (Object.entries(matchingBlockStates).every((p) => Object.entries(dimension
                                        .getBlock(v)
                                        ?.permutation?.getAllStates()).includes(p))) {
                                        //console.warn("5");
                                        dimension
                                            .getBlock(v)
                                            .setPermutation(BlockPermutation.resolve(blocktype, !overrideAllBlockStates &&
                                            BlockTypes.get(blocktype).id ==
                                                dimension.getBlock(v)?.typeId
                                            ? Object.fromEntries(Object.entries(dimension
                                                .getBlock(v)
                                                ?.permutation?.getAllStates()).filter((v) => !!Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find((s) => v[0] ==
                                                s[0])))
                                            : blockStates));
                                        counter++; //; console.warn("6");
                                    }
                                }
                            }
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                    });
                }
            }
            else {
                //console.warn("7");
                if (!!blockStates) {
                    //console.warn("10c");
                    mainArray.forEach((v) => {
                        try {
                            //console.warn("1");
                            if (dimension.getBlock(v)?.permutation !=
                                BlockPermutation.resolve(blocktype, !overrideAllBlockStates &&
                                    block == dimension.getBlock(v)?.typeId
                                    ? Object.fromEntries(Object.entries(Object.assign(dimension
                                        .getBlock(v)
                                        ?.permutation?.getAllStates(), blockStates)).filter((v) => !!Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find((s) => v[0] == s[0])))
                                    : blockStates)) {
                                //console.warn("2");
                                if (block == dimension.getBlock(v)?.typeId) {
                                    //console.warn("14");
                                    dimension
                                        .getBlock(v)
                                        .setPermutation(BlockPermutation.resolve(blocktype, !overrideAllBlockStates &&
                                        BlockTypes.get(blocktype)
                                            .id ==
                                            dimension.getBlock(v)
                                                ?.typeId
                                        ? Object.fromEntries(Object.entries(Object.assign(dimension
                                            .getBlock(v)
                                            ?.permutation?.getAllStates(), blockStates)).filter((v) => !!Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find((s) => v[0] ==
                                            s[0])))
                                        : blockStates));
                                    counter++; //; console.warn("8");
                                }
                            }
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                    });
                }
                else {
                    mainArray.forEach((v) => {
                        try {
                            //console.warn("1");
                            if (dimension.getBlock(v)?.permutation !=
                                BlockPermutation.resolve(blocktype, !overrideAllBlockStates &&
                                    block == dimension.getBlock(v)?.typeId
                                    ? Object.fromEntries(Object.entries(dimension
                                        .getBlock(v)
                                        ?.permutation?.getAllStates()).filter((v) => !!Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find((s) => v[0] == s[0])))
                                    : undefined)) {
                                //console.warn("2");
                                if (block == dimension.getBlock(v)?.typeId) {
                                    //console.warn("14");
                                    dimension
                                        .getBlock(v)
                                        .setPermutation(BlockPermutation.resolve(blocktype, !overrideAllBlockStates &&
                                        BlockTypes.get(blocktype)
                                            .id ==
                                            dimension.getBlock(v)
                                                ?.typeId
                                        ? Object.fromEntries(Object.entries(dimension
                                            .getBlock(v)
                                            ?.permutation?.getAllStates()).filter((v) => !!Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find((s) => v[0] ==
                                            s[0])))
                                        : undefined));
                                    counter++; //; console.warn("8");
                                }
                            }
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                    });
                }
            }
        }
        else {
            //console.warn("9");
            if (!!blockStates) {
                //console.warn("10");
                mainArray.forEach((v) => {
                    try {
                        //console.warn("1");
                        if (dimension.getBlock(v)?.permutation !=
                            BlockPermutation.resolve(blocktype, !overrideAllBlockStates &&
                                BlockTypes.get(blocktype).id ==
                                    dimension.getBlock(v)?.typeId
                                ? Object.fromEntries(Object.entries(Object.assign(dimension
                                    .getBlock(v)
                                    ?.permutation?.getAllStates(), blockStates)).filter((v) => !!Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find((s) => v[0] == s[0])))
                                : blockStates)) {
                            //console.warn("2");
                            dimension
                                .getBlock(v)
                                .setPermutation(BlockPermutation.resolve(blocktype, !overrideAllBlockStates &&
                                BlockTypes.get(blocktype).id ==
                                    dimension.getBlock(v)?.typeId
                                ? Object.fromEntries(Object.entries(Object.assign(dimension
                                    .getBlock(v)
                                    ?.permutation?.getAllStates(), blockStates)).filter((v) => !!Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find((s) => v[0] == s[0])))
                                : blockStates));
                            counter++; //; console.warn("11");
                        }
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                });
            }
            else {
                //console.warn("12");
                mainArray.forEach((v) => {
                    try {
                        //console.warn("1");
                        if (dimension.getBlock(v)?.typeId != block) {
                            //console.warn("2");
                            dimension.getBlock(v).setType(blocktype);
                            counter++; //; console.warn("13");
                        }
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                });
            }
        }
    }
    return counter;
}
//# sourceMappingURL=fillBlocksC.js.map