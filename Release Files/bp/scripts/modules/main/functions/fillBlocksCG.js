import { Dimension, BlockVolume, BlockTypes, BlockPermutation } from "@minecraft/server";
/**
 * @deprecated
 */
export function* fillBlocksCG(begin, end, dimension, blocktype = "air", blockStates, matchingBlock, matchingBlockStates, overrideAllBlockStates = false, onComplete = () => { }, onCompleteArgsObject, ...onCompleteArgs) {
    var timea = Date.now();
    var mainArray = Array.from(new BlockVolume(begin, end).getBlockLocationIterator());
    var counter = 0;
    var block = BlockTypes.get(matchingBlock)?.id;
    var blockmatching = BlockTypes.get(matchingBlock)?.id;
    if (overrideAllBlockStates) {
        if (!!matchingBlock) {
            //console.warn("3");
            if (!!matchingBlockStates) {
                //console.warn("4");
                if (!!blockStates) {
                    //console.warn("10b");
                    for (let i = 0; i < mainArray.length; i++) {
                        try {
                            //console.warn("1");
                            if (dimension.getBlock(mainArray[i])?.permutation !=
                                BlockPermutation.resolve(blocktype, blockStates)) {
                                //console.warn("2");
                                if (blockmatching ==
                                    dimension.getBlock(mainArray[i])?.typeId) {
                                    //console.warn("14");
                                    if (Object.entries(matchingBlockStates).every((p) => Object.entries(dimension
                                        .getBlock(mainArray[i])
                                        ?.permutation?.getAllStates()).includes(p))) {
                                        //console.warn("5");
                                        dimension
                                            .getBlock(mainArray[i])
                                            ?.setPermutation(BlockPermutation.resolve(blocktype, blockStates));
                                        counter++; //; console.warn("6");
                                    }
                                }
                            }
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        yield;
                    }
                }
                else {
                    for (let i = 0; i < mainArray.length; i++) {
                        try {
                            //console.warn("1");
                            if (dimension.getBlock(mainArray[i])?.permutation !=
                                BlockPermutation.resolve(blocktype, blockStates)) {
                                //console.warn("2");
                                if (blockmatching ==
                                    dimension.getBlock(mainArray[i])?.typeId) {
                                    //console.warn("14");
                                    if (Object.entries(matchingBlockStates).every((p) => Object.entries(dimension
                                        .getBlock(mainArray[i])
                                        ?.permutation?.getAllStates()).includes(p))) {
                                        //console.warn("5");
                                        dimension
                                            .getBlock(mainArray[i])
                                            ?.setPermutation(BlockPermutation.resolve(blocktype, blockStates));
                                        counter++; //; console.warn("6");
                                    }
                                }
                            }
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        yield;
                    }
                }
            }
            else {
                //console.warn("7");
                if (!!blockStates) {
                    //console.warn("10c");
                    for (let i = 0; i < mainArray.length; i++) {
                        try {
                            //console.warn("1");
                            if (dimension.getBlock(mainArray[i])?.permutation !=
                                BlockPermutation.resolve(blocktype, blockStates)) {
                                //console.warn("2");
                                if (block ==
                                    dimension.getBlock(mainArray[i])?.typeId) {
                                    //console.warn("14");
                                    dimension
                                        .getBlock(mainArray[i])
                                        ?.setPermutation(BlockPermutation.resolve(blocktype, blockStates));
                                    counter++; //; console.warn("8");
                                }
                            }
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        yield;
                    }
                }
                else {
                    for (let i = 0; i < mainArray.length; i++) {
                        try {
                            //console.warn("1");
                            if (dimension.getBlock(mainArray[i])?.permutation !=
                                BlockPermutation.resolve(blocktype)) {
                                //console.warn("2");
                                if (block ==
                                    dimension.getBlock(mainArray[i])?.typeId) {
                                    //console.warn("14");
                                    dimension
                                        .getBlock(mainArray[i])
                                        ?.setPermutation(BlockPermutation.resolve(blocktype));
                                    counter++; //; console.warn("8");
                                }
                            }
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        yield;
                    }
                }
            }
        }
        else {
            //console.warn("9");
            if (!!blockStates) {
                //console.warn("10");
                for (let i = 0; i < mainArray.length; i++) {
                    try {
                        //console.warn("1");
                        if (dimension.getBlock(mainArray[i])?.typeId != block) {
                            //console.warn("2");
                            dimension
                                .getBlock(mainArray[i])
                                ?.setPermutation(BlockPermutation.resolve(blocktype, blockStates));
                            counter++; //; console.warn("11");
                        }
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    yield;
                }
            }
            else {
                //console.warn("12");
                for (let i = 0; i < mainArray.length; i++) {
                    try {
                        //console.warn("1");
                        if (dimension.getBlock(mainArray[i])?.typeId != block) {
                            //console.warn("2");
                            dimension.getBlock(mainArray[i])?.setType(blocktype);
                            counter++; //; console.warn("13");
                        }
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    yield;
                }
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
                    for (let i = 0; i < mainArray.length; i++) {
                        try {
                            //console.warn("1");
                            if (dimension.getBlock(mainArray[i])?.permutation !=
                                BlockPermutation.resolve(blocktype, !overrideAllBlockStates &&
                                    BlockTypes.get(blocktype)?.id ==
                                        dimension.getBlock(mainArray[i])
                                            ?.typeId
                                    ? Object.fromEntries(Object.entries(Object.assign(dimension
                                        .getBlock(mainArray[i])
                                        ?.permutation?.getAllStates(), blockStates)).filter((v) => !!Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find((s) => v[0] == s[0])))
                                    : blockStates)) {
                                //console.warn("2");
                                if (BlockTypes.get(matchingBlock)?.id ==
                                    dimension.getBlock(mainArray[i])?.typeId) {
                                    //console.warn("14");
                                    if (Object.entries(matchingBlockStates).every((p) => Object.entries(dimension
                                        .getBlock(mainArray[i])
                                        ?.permutation?.getAllStates()).includes(p))) {
                                        //console.warn("5");
                                        dimension
                                            .getBlock(mainArray[i])
                                            ?.setPermutation(BlockPermutation.resolve(blocktype, !overrideAllBlockStates &&
                                            BlockTypes.get(blocktype)?.id ==
                                                dimension.getBlock(mainArray[i])?.typeId
                                            ? Object.fromEntries(Object.entries(Object.assign(dimension
                                                .getBlock(mainArray[i])
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
                        yield;
                    }
                }
                else {
                    for (let i = 0; i < mainArray.length; i++) {
                        try {
                            //console.warn("1");
                            if (dimension.getBlock(mainArray[i])?.permutation !=
                                BlockPermutation.resolve(blocktype, !overrideAllBlockStates &&
                                    BlockTypes.get(blocktype)?.id ==
                                        dimension.getBlock(mainArray[i])
                                            ?.typeId
                                    ? Object.fromEntries(Object.entries(dimension
                                        .getBlock(mainArray[i])
                                        ?.permutation?.getAllStates()).filter((v) => !!Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find((s) => v[0] == s[0])))
                                    : blockStates)) {
                                //console.warn("2");
                                if (BlockTypes.get(matchingBlock)?.id ==
                                    dimension.getBlock(mainArray[i])?.typeId) {
                                    //console.warn("14");
                                    if (Object.entries(matchingBlockStates).every((p) => Object.entries(dimension
                                        .getBlock(mainArray[i])
                                        ?.permutation?.getAllStates()).includes(p))) {
                                        //console.warn("5");
                                        dimension
                                            .getBlock(mainArray[i])
                                            ?.setPermutation(BlockPermutation.resolve(blocktype, !overrideAllBlockStates &&
                                            BlockTypes.get(blocktype)?.id ==
                                                dimension.getBlock(mainArray[i])?.typeId
                                            ? Object.fromEntries(Object.entries(dimension
                                                .getBlock(mainArray[i])
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
                        yield;
                    }
                }
            }
            else {
                //console.warn("7");
                if (!!blockStates) {
                    //console.warn("10c");
                    for (let i = 0; i < mainArray.length; i++) {
                        try {
                            //console.warn("1");
                            if (dimension.getBlock(mainArray[i])?.permutation !=
                                BlockPermutation.resolve(blocktype, !overrideAllBlockStates &&
                                    block ==
                                        dimension.getBlock(mainArray[i])
                                            ?.typeId
                                    ? Object.fromEntries(Object.entries(Object.assign(dimension
                                        .getBlock(mainArray[i])
                                        ?.permutation?.getAllStates(), blockStates)).filter((v) => !!Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find((s) => v[0] == s[0])))
                                    : blockStates)) {
                                //console.warn("2");
                                if (block ==
                                    dimension.getBlock(mainArray[i])?.typeId) {
                                    //console.warn("14");
                                    dimension
                                        .getBlock(mainArray[i])
                                        ?.setPermutation(BlockPermutation.resolve(blocktype, !overrideAllBlockStates &&
                                        BlockTypes.get(blocktype)
                                            ?.id ==
                                            dimension.getBlock(mainArray[i])?.typeId
                                        ? Object.fromEntries(Object.entries(Object.assign(dimension
                                            .getBlock(mainArray[i])
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
                        yield;
                    }
                }
                else {
                    for (let i = 0; i < mainArray.length; i++) {
                        try {
                            //console.warn("1");
                            if (dimension.getBlock(mainArray[i])?.permutation !=
                                BlockPermutation.resolve(blocktype, !overrideAllBlockStates &&
                                    block ==
                                        dimension.getBlock(mainArray[i])
                                            ?.typeId
                                    ? Object.fromEntries(Object.entries(dimension
                                        .getBlock(mainArray[i])
                                        ?.permutation?.getAllStates()).filter((v) => !!Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find((s) => v[0] == s[0])))
                                    : undefined)) {
                                //console.warn("2");
                                if (block ==
                                    dimension.getBlock(mainArray[i])?.typeId) {
                                    //console.warn("14");
                                    dimension
                                        .getBlock(mainArray[i])
                                        ?.setPermutation(BlockPermutation.resolve(blocktype, !overrideAllBlockStates &&
                                        BlockTypes.get(blocktype)
                                            ?.id ==
                                            dimension.getBlock(mainArray[i])?.typeId
                                        ? Object.fromEntries(Object.entries(dimension
                                            .getBlock(mainArray[i])
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
                        yield;
                    }
                }
            }
        }
        else {
            //console.warn("9");
            if (!!blockStates) {
                //console.warn("10");
                for (let i = 0; i < mainArray.length; i++) {
                    try {
                        //console.warn("1");
                        if (dimension.getBlock(mainArray[i])?.permutation !=
                            BlockPermutation.resolve(blocktype, !overrideAllBlockStates &&
                                BlockTypes.get(blocktype)?.id ==
                                    dimension.getBlock(mainArray[i])?.typeId
                                ? Object.fromEntries(Object.entries(Object.assign(dimension
                                    .getBlock(mainArray[i])
                                    ?.permutation?.getAllStates(), blockStates)).filter((v) => !!Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find((s) => v[0] == s[0])))
                                : blockStates)) {
                            //console.warn("2");
                            dimension
                                .getBlock(mainArray[i])
                                ?.setPermutation(BlockPermutation.resolve(blocktype, !overrideAllBlockStates &&
                                BlockTypes.get(blocktype)?.id ==
                                    dimension.getBlock(mainArray[i])
                                        ?.typeId
                                ? Object.fromEntries(Object.entries(Object.assign(dimension
                                    .getBlock(mainArray[i])
                                    ?.permutation?.getAllStates(), blockStates)).filter((v) => !!Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find((s) => v[0] == s[0])))
                                : blockStates));
                            counter++; //; console.warn("11");
                        }
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    yield;
                }
            }
            else {
                //console.warn("12");
                for (let i = 0; i < mainArray.length; i++) {
                    try {
                        //console.warn("1");
                        if (dimension.getBlock(mainArray[i])?.typeId != block) {
                            //console.warn("2");
                            dimension.getBlock(mainArray[i])?.setType(blocktype);
                            counter++; //; console.warn("13");
                        }
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    yield;
                }
            }
        }
    }
    var timeb = Date.now(); /*
    world.sendMessage(String(counter))*/
    onComplete(counter, timea, timeb, timeb - timea, onCompleteArgsObject, ...onCompleteArgs);
}
//# sourceMappingURL=fillBlocksCG.js.map