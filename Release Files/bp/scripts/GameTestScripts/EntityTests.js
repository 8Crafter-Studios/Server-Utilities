// Copyright (c) Microsoft Corporation.  All rights reserved.
import * as GameTest from "@minecraft/server-gametest";
import { BlockLocationIterator, MinecraftItemTypes, ItemStack, Location } from "@minecraft/server";
function shallowItemStream(test) {
    const lampPos = new BlockLocationIterator(0, 1, 1);
    let emerald = new ItemStack(MinecraftItemTypes.emerald, 1, 0);
    test.assertRedstonePower(lampPos, 0);
    test.spawnItem(emerald, new Location(1.5, 1.5, 1.5));
    test.succeedWhen(() => {
        test.assertRedstonePower(lampPos, 1);
    });
}
GameTest.register("EntityTests", "shallow_item_stream", shallowItemStream)
    .tag("suite:java_parity")
    .tag(GameTest.Tags.suiteDisabled); // The slab should be waterlogged
GameTest.register("EntityTests", "shallow_item_stream_bedrock", shallowItemStream).tag(GameTest.Tags.suiteDefault);
GameTest.register("EntityTests", "items_float_up", (test) => {
    const diamondHelmet = new ItemStack(MinecraftItemTypes.diamondHelmet, 1, 0);
    const netheriteHelmet = new ItemStack(MinecraftItemTypes.netheriteHelmet, 1, 0);
    const itemEntityId = "minecraft:item";
    test.spawnItem(diamondHelmet, new Location(1.5, 4.0, 1.5));
    test.spawnItem(diamondHelmet, new Location(2.5, 4.0, 1.5));
    test.spawnItem(diamondHelmet, new Location(3.5, 4.0, 1.5));
    test.spawnItem(netheriteHelmet, new Location(5.5, 4.0, 1.5));
    test.spawnItem(netheriteHelmet, new Location(6.5, 4.0, 1.5));
    test.spawnItem(netheriteHelmet, new Location(7.5, 4.0, 1.5));
    test
        .startSequence()
        .thenIdle(60)
        .thenExecute(() => test.assertEntityPresent(itemEntityId, new BlockLocationIterator(1, 2, 1)), true) // sink
        .thenExecute(() => test.assertEntityPresent(itemEntityId, new BlockLocationIterator(2, 2, 1)), false) // float
        .thenExecute(() => test.assertEntityPresent(itemEntityId, new BlockLocationIterator(3, 2, 1)), false) // float
        .thenExecute(() => test.assertEntityPresent(itemEntityId, new BlockLocationIterator(5, 2, 1)), true) // sink
        .thenExecute(() => test.assertEntityPresent(itemEntityId, new BlockLocationIterator(6, 2, 1)), false) // float
        .thenExecute(() => test.assertEntityPresent(itemEntityId, new BlockLocationIterator(7, 2, 1)), false) // float
        .thenSucceed();
})
    .tag("suite:java_parity")
    .tag(GameTest.Tags.suiteDisabled); // In Bedrock, item entities don't rest on the enchanting table after falling through the water block
//# sourceMappingURL=EntityTests.js.map