// Copyright (c) Microsoft Corporation.  All rights reserved.
import { GameMode } from "@minecraft/server";
import * as GameTest from "@minecraft/server-gametest";
const ticksPerSecond = 20;
GameTest.register("EnchantmentTests", "frostwalker_freezes_water", (test) => {
    const spawnLoc = { x: 5, y: 5, z: 2 };
    const landLoc = { x: 5, y: 3, z: 2 };
    const iceLoc = { x: 3, y: 2, z: 2 };
    const playerName = "Test Player";
    const player = test.spawnSimulatedPlayer(spawnLoc, playerName);
    test
        .startSequence()
        .thenIdle(10) //Frostwalker boots added here through a dispenser
        .thenExecute(() => {
        player.move(-1, 0);
    })
        .thenExecuteAfter(ticksPerSecond, () => {
        test.assertBlockPresent("frosted_ice", iceLoc, true);
    })
        .thenSucceed();
})
    .structureName("EnchantmentTests:FrostWalkerFreezesWater")
    .maxTicks(ticksPerSecond * 3)
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("EnchantmentTests", "spectator_with_frostwalker_doesnt_freeze_water", (test) => {
    const spawnLoc = { x: 5, y: 5, z: 2 };
    const landLoc = { x: 5, y: 3, z: 2 };
    const waterLoc = { x: 3, y: 2, z: 2 };
    const playerName = "Test Player";
    const player = test.spawnSimulatedPlayer(spawnLoc, playerName);
    test
        .startSequence()
        .thenIdle(60) //Frostwalker boots added here through a dispenser
        .thenExecute(() => {
        player.runCommandAsync("gamemode spectator");
        player.move(-1, 0);
    })
        .thenIdle(10)
        .thenExecute(() => {
        player.setGameMode(GameMode.creative);
        player.stopMoving();
    })
        .thenExecuteAfter(ticksPerSecond, () => {
        test.assertBlockPresent("water", waterLoc, true);
    })
        .thenSucceed();
})
    .structureName("EnchantmentTests:SpecFrstWlkFreeze")
    .maxTicks(ticksPerSecond * 5);
//remove this when deexperimentifying
//.tag(GameTest.Tags.suiteDefault);
//# sourceMappingURL=EnchantmentTests.js.map