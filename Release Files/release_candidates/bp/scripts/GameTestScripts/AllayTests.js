// Copyright (c) Microsoft Corporation.  All rights reserved.
import * as GameTest from "@minecraft/server-gametest";
import { BlockLocationIterator, TicksPerSecond, ItemStack } from "@minecraft/server";
import GameTestExtensions from "./GameTestExtensions.js";
const TEST_MAX_TICKS = TicksPerSecond * 10;
GameTest.register("AllayTests", "allay_pickup_item", (test) => {
    const startPosAllay = { x: 1, y: 2, z: 1 };
    const startPosPlayer = { x: 3, y: 2, z: 1 };
    const torchItem = new ItemStack("torch", 1);
    test.spawnItem(torchItem, { x: 4.5, y: 2.5, z: 4.5 });
    let playerSim = test.spawnSimulatedPlayer(startPosPlayer, "playerSim_allay");
    let allay = test.spawn("minecraft:allay", startPosAllay);
    const testEx = new GameTestExtensions(test);
    test
        .startSequence()
        .thenExecute(() => testEx.giveItem(playerSim, "torch", 1, 0))
        .thenExecute(() => test.assert(playerSim.interactWithEntity(allay) == true, ""))
        .thenWait(() => {
        test.assertEntityPresentInArea("minecraft:item", false); // Make sure the torch is picked up.
    })
        .thenSucceed();
})
    .maxTicks(TEST_MAX_TICKS)
    .tag(GameTest.Tags.suiteDefault);
// Tests that an Allay can leave a vertically partial block it got stuck into (e.g. lantern).
GameTest.register("AllayTests", "allay_unstucks_from_lantern", (test) => {
    // Really make sure it's stuck up in the lanterns.
    const spawnPos = { x: 5.75, y: 4.25, z: 2.5 };
    const allayEntityType = "minecraft:allay";
    const allay = test.spawnWithoutBehaviorsAtLocation(allayEntityType, spawnPos);
    const targetPos = { x: 2, y: 2, z: 2 };
    test.walkTo(allay, targetPos, 1);
    test.succeedWhen(() => {
        test.assertEntityPresent(allayEntityType, targetPos, 0, true);
    });
})
    .maxTicks(TEST_MAX_TICKS)
    .tag(GameTest.Tags.suiteDefault);
// Tests that an Allay can leave a horizontally partial block it got stuck into (e.g. fence).
GameTest.register("AllayTests", "allay_unstucks_from_fence", (test) => {
    const spawnPos = { x: 5.75, y: 3, z: 2.5 };
    const allayEntityType = "minecraft:allay";
    const allay = test.spawnWithoutBehaviorsAtLocation(allayEntityType, spawnPos);
    const targetPos = { x: 2, y: 2, z: 2 };
    test.walkTo(allay, targetPos, 1);
    test.succeedWhen(() => {
        test.assertEntityPresent(allayEntityType, targetPos, 0, true);
    });
})
    .maxTicks(TEST_MAX_TICKS)
    .tag(GameTest.Tags.suiteDefault);
//# sourceMappingURL=AllayTests.js.map