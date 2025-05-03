// Copyright (c) Microsoft Corporation.  All rights reserved.
import * as GameTest from "@minecraft/server-gametest";
import GameTestExtensions from "./GameTestExtensions.js";
import { /*
  BlockLocationIterator,*/ Direction, ItemStack, /*
Location,*/ /*
MinecraftBlockTypes,*/ /*
MinecraftItemTypes,*/ world, } from "@minecraft/server";
function targetSelectorAllListE(selector, position) {
    let scoreboardUUID = Math.round((Math.random() * 1000 + 500));
    DimensionTypes.getAll().forEach((dt) => { let dimension = world.getDimension(dt.typeId); dimension.runCommand("/execute positioned " + position + " as " + selector + " at @s run /scoreboard players set @s andexdbDebug " + scoreboardUUID); });
    let selectedEntity;
    selectedEntity = [];
    for (let i in world.scoreboard.getObjective("andexdbDebug").getScores()) {
        try {
            selectedEntity.push((world.scoreboard.getObjective("andexdbDebug").getScores().filter((score) => (score.score == scoreboardUUID)))[i].participant.getEntity());
        }
        catch (e) { }
    }
    ;
    DimensionTypes.getAll().forEach((dt) => { let dimension = world.getDimension(dt.typeId); dimension.runCommand("/execute as " + selector + " at @s run /scoreboard players set @s andexdbDebug 0"); });
    return selectedEntity;
}
function isNear(n1, n2) {
    return Math.abs(n1 - n2) < 0.01;
}
GameTest.register("SimulatedPlayerTests", "spawn_simulated_player", (test) => {
    const spawnLoc = { x: 1, y: 5, z: 1 };
    const landLoc = { x: 1, y: 2, z: 1 };
    const playerName = "Test Player";
    const player = test.spawnSimulatedPlayer(spawnLoc, playerName);
    test.assertEntityPresent("player", spawnLoc);
    test.assert(player.nameTag === playerName, "Unexpected name tag");
    test.succeedWhen(() => {
        test.assertEntityPresent("player", landLoc);
    });
})
    .structureName("ComponentTests:platform")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("AndexdbTests", "spawn_simulated_player_puffer", (test) => {
    const spawnLoc = { x: 1, y: 5, z: 1 };
    const landLoc = { x: 1, y: 2, z: 1 };
    const playerName = "PufferFish53426";
    const player = test.spawnSimulatedPlayer(spawnLoc, playerName);
    test.assertEntityPresent("player", spawnLoc); /*
    test.assert(player.nameTag === playerName, "Unexpected name tag");*/
    test
        .startSequence()
        .thenExecuteAfter(2147483647, () => {
        test.assertEntityPresent("player", spawnLoc, false);
    })
        .thenSucceed();
})
    .maxTicks(21474836)
    .structureName("ComponentTests:platform")
    .tag("suite:andexdb");
GameTest.register("AndexdbTests", "spawn_simulated_player_other", (test) => {
    const spawnLoc = { x: 1, y: 5, z: 1 };
    const landLoc = { x: 1, y: 2, z: 1 };
    const playerName = "Player";
    const player = test.spawnSimulatedPlayer(spawnLoc, playerName);
    test.assertEntityPresent("player", spawnLoc); /*
    test.assert(player.nameTag === playerName, "Unexpected name tag");*/
    test
        .startSequence()
        .thenExecuteAfter(2147483647, () => {
        test.assertEntityPresent("player", spawnLoc, false);
    })
        .thenSucceed();
})
    .maxTicks(21474836)
    .structureName("ComponentTests:platform")
    .tag("suite:andexdb");
GameTest.register("AndexdbTests", "spawn_simulated_player_custom", (test) => {
    let spawnLocA = { x: 1, y: 5, z: 1 };
    if (world.getDynamicProperty("andexdbGametest:spawnSimulatedPlayerLocation")?.x != undefined) {
        spawnLocA = test.relativeLocation(world.getDynamicProperty("andexdbGametest:spawnSimulatedPlayerLocation"));
    }
    const spawnLoc = spawnLocA;
    const landLoc = { x: 1, y: 2, z: 1 };
    const playerName = world.getDynamicProperty("andexdbGametest:customSimulatedPlayerName");
    const player = test.spawnSimulatedPlayer(spawnLoc, playerName);
    test.assertEntityPresent("player", spawnLoc); /*
    test.assert(player.nameTag === playerName, "Unexpected name tag");*/
    test
        .startSequence()
        .thenWait(() => { player.hasTag("customandexdbSimulatedPlayer:remove") || player.hasTag("customandexdbSimulatedPlayer:respawn") || player.hasTag("customandexdbSimulatedPlayer:disconnect") || player.hasTag("customandexdbSimulatedPlayer:fly") || player.hasTag("customandexdbSimulatedPlayer:stopFlying"); })
        .thenExecuteAfter(0, () => { if (player.hasTag("customandexdbSimulatedPlayer:remove")) {
        test.removeSimulatedPlayer(player);
    }
    else {
        if (player.hasTag("customandexdbSimulatedPlayer:remove")) {
            player.respawn();
        }
        else {
            if (player.hasTag("customandexdbSimulatedPlayer:disconnect")) {
                player.disconnect();
            }
            else {
                if (player.hasTag("customandexdbSimulatedPlayer:fly")) {
                    player.fly();
                }
                else {
                    if (player.hasTag("customandexdbSimulatedPlayer:stopFlying")) {
                        player.stopFlying();
                    }
                }
            }
        }
    } })
        .thenExecuteAfter(0, () => {
        test.assertEntityPresent("player", spawnLoc, false);
    })
        .thenExecuteAfter(2147483647, () => {
        test.assertEntityPresent("player", spawnLoc, false);
    })
        .thenSucceed();
})
    .maxTicks(21474836)
    .structureName("ComponentTests:platform")
    .tag("suite:andexdb");
GameTest.register("AndexdbTests", "spawn_without_behaviors", (test) => {
    let locationA = test.worldLocation({ x: 1, y: 5, z: 1 });
    if (world.getDynamicProperty("andexdbGametest:spawnWithoutBehaviorsLocation")?.x != undefined) {
        locationA = world.getDynamicProperty("andexdbGametest:spawnWithoutBehaviorsLocation");
    }
    const location = test.relativeLocation(locationA);
    const type = world.getDynamicProperty("andexdbGametest:spawnWithoutBehaviorsType");
    const entity = test.spawnWithoutBehaviors(type, location); /*
    test.assertEntityPresent(type, location);*/ /*
    test.assert(player.nameTag === playerName, "Unexpected name tag");*/
    test
        .startSequence()
        .thenExecuteAfter(2147483647, () => {
        test.assertEntityPresent(type, location, false);
    })
        .thenSucceed();
})
    .maxTicks(21474836)
    .structureName("ComponentTests:platform")
    .tag("suite:andexdb");
GameTest.register("AndexdbInternalTests", "spawn_simulated_player_custom_internal", (test) => {
    let spawnLocA = { x: 1, y: 5, z: 1 };
    if (world.getDynamicProperty("andexdbGametest:spawnSimulatedPlayerInternalLocation")?.x != undefined) {
        spawnLocA = test.relativeLocation(world.getDynamicProperty("andexdbGametest:spawnSimulatedPlayerInternalLocation"));
    }
    const spawnLoc = spawnLocA;
    const landLoc = { x: 1, y: 2, z: 1 };
    const playerName = world.getDynamicProperty("andexdbGametest:customSimulatedPlayerInternalName");
    const player = test.spawnSimulatedPlayer(spawnLoc, playerName);
    test.assertEntityPresent("player", spawnLoc); /*
    test.assert(player.nameTag === playerName, "Unexpected name tag");*/
    test
        .startSequence()
        .thenWait(() => { player.hasTag("customandexdbSimulatedPlayer:remove") || player.hasTag("customandexdbSimulatedPlayer:respawn") || player.hasTag("customandexdbSimulatedPlayer:disconnect") || player.hasTag("customandexdbSimulatedPlayer:fly") || player.hasTag("customandexdbSimulatedPlayer:stopFlying"); })
        .thenExecuteAfter(0, () => { if (player.hasTag("customandexdbSimulatedPlayer:remove")) {
        test.removeSimulatedPlayer(player);
    }
    else {
        if (player.hasTag("customandexdbSimulatedPlayer:remove")) {
            player.respawn();
        }
        else {
            if (player.hasTag("customandexdbSimulatedPlayer:disconnect")) {
                player.disconnect();
            }
            else {
                if (player.hasTag("customandexdbSimulatedPlayer:fly")) {
                    player.fly();
                }
                else {
                    if (player.hasTag("customandexdbSimulatedPlayer:stopFlying")) {
                        player.stopFlying();
                    }
                }
            }
        }
    } })
        .thenExecuteAfter(0, () => {
        test.assertEntityPresent("player", spawnLoc, false);
    })
        .thenExecuteAfter(2147483647, () => {
        test.assertEntityPresent("player", spawnLoc, false);
    })
        .thenSucceed();
})
    .maxTicks(21474836)
    .structureName(String(world.getDynamicProperty("andexdbGametestSettigns:internalGametestStructureOverride") ?? "ComponentTests:platform"))
    .tag("suite:andexdbInternal");
GameTest.register("AndexdbInternalTests", "spawn_without_behaviors_internal", (test) => {
    let locationA = test.worldLocation({ x: 1, y: 5, z: 1 });
    if (world.getDynamicProperty("andexdbGametest:spawnWithoutBehaviorsInternalLocation")?.x != undefined) {
        locationA = world.getDynamicProperty("andexdbGametest:spawnWithoutBehaviorsInternalLocation");
    }
    const location = test.relativeLocation(locationA);
    const type = world.getDynamicProperty("andexdbGametest:spawnWithoutBehaviorsInternalType");
    const entity = test.spawnWithoutBehaviors(type, location); /*
    test.assertEntityPresent(type, location);*/ /*
    test.assert(player.nameTag === playerName, "Unexpected name tag");*/
    test
        .startSequence()
        .thenExecuteAfter(2147483647, () => {
        test.assertEntityPresent(type, location, false);
    })
        .thenSucceed();
})
    .maxTicks(21474836)
    .structureName(String(world.getDynamicProperty("andexdbGametestSettigns:internalGametestStructureOverride") ?? "ComponentTests:platform"))
    .tag("suite:andexdbInternal");
GameTest.register("AndexdbInternalTests", "pulse_redstone_internal", (test) => {
    let locationA = test.worldLocation({ x: 1, y: 2, z: 1 });
    if (world.getDynamicProperty("andexdbGametest:pulseRedstoneInternalLocation")?.x != undefined) {
        locationA = world.getDynamicProperty("andexdbGametest:pulseRedstoneInternalLocation");
    }
    const location = test.relativeLocation(locationA);
    const duration = Number(world.getDynamicProperty("andexdbGametest:pulseRedstoneInternalLocation") ?? 20);
    const pulseRedstone = test.pulseRedstone(location, duration); /*
    test.assertEntityPresent(type, location);*/ /*
    test.assert(player.nameTag === playerName, "Unexpected name tag");*/
    test
        .startSequence()
        .thenExecuteAfter(2147483647, () => {
        test.assert(false, testdone);
    })
        .thenSucceed();
})
    .maxTicks(21474836)
    .structureName(String(world.getDynamicProperty("andexdbGametestSettigns:internalGametestStructureOverride") ?? "ComponentTests:platform"))
    .tag("suite:andexdbInternal");
GameTest.register("AndexdbInternalTests", "set_tnt_fuse_internal", (test) => {
    let tntEntities = targetSelectorAllListE(world.getDynamicProperty("andexdbGametest:setTntFuseInternalTargetSelector") ?? "@e [type=tnt,c=1]", world.getDynamicProperty("andexdbGametest:setTntFuseInternalTargetSelectorExecutionLocation") ?? test.worldLocation({ x: 1, y: 2, z: 1 }));
    const location = test.relativeLocation(locationA);
    const fuseLength = Number(world.getDynamicProperty("andexdbGametest:setTntFuseInternalFuleLength") ?? 200);
    let setTntFuse = test.setTntFuse(location, duration); /*
    test.assertEntityPresent(type, location);*/ /*
    test.assert(player.nameTag === playerName, "Unexpected name tag");*/
    test
        .startSequence()
        .thenExecuteAfter(2147483647, () => {
        test.assert(true, testdone);
    })
        .thenSucceed();
})
    .maxTicks(21474836)
    .structureName(String(world.getDynamicProperty("andexdbGametestSettigns:internalGametestStructureOverride") ?? "ComponentTests:platform"))
    .tag("suite:andexdbInternal");
GameTest.register("AndexdbInternalTests", "script_eval_internal", (test) => {
    try {
        eval(String(world.getDynamicProperty("andexdbGametest:scriptEvalInternalCode")));
    }
    catch (e) {
        console.error(e, e.stack);
        test.fail(e, e.stack);
    }
    test.succeed();
})
    .maxTicks(21474836)
    .structureName(String(world.getDynamicProperty("andexdbGametestSettigns:internalGametestStructureOverride") ?? "ComponentTests:platform"))
    .tag("suite:andexdbInternal"); /*

GameTest.register("SimulatedPlayerTests", "spawn_simulated_player_ApolloSputnik", (test) => {
const spawnLoc = { x: 1, y: 5, z: 1 };
const landLoc = { x: 1, y: 2, z: 1 };
const playerName = "ApolloSputnik";
const player = test.spawnSimulatedPlayer(spawnLoc, playerName);
test.assertEntityPresent("player", spawnLoc);*/ /*
test.assert(player.nameTag === playerName, "Unexpected name tag");*/ /*
test
.startSequence()
.thenExecuteAfter(2147483647, () => {
  test.assertEntityPresent("player", spawnLoc, false);
})
.thenSucceed();
})
.maxTicks(21474836)
.structureName("ComponentTests:platform")
.tag(GameTest.Tags.suiteDefault);*/
GameTest.register("AndexdbTests", "spawn_simulated_player_Andexter8", (test) => {
    const spawnLoc = { x: 1, y: 5, z: 1 };
    const landLoc = { x: 1, y: 2, z: 1 };
    const playerName = "Andexter8";
    const player = test.spawnSimulatedPlayer(spawnLoc, playerName);
    test.assertEntityPresent("player", spawnLoc); /*
    test.assert(player.nameTag === playerName, "Unexpected name tag");*/
    test
        .startSequence()
        .thenExecuteAfter(2147483647, () => {
        test.assertEntityPresent("player", spawnLoc, false);
    })
        .thenSucceed();
})
    .maxTicks(2147483646)
    .structureName("ComponentTests:platform")
    .tag("suite:andexdb"); /*

GameTest.register("SimulatedPlayerTests", "spawn_simulated_player_SashaS555", (test) => {
const spawnLoc = { x: 1, y: 5, z: 1 };
const landLoc = { x: 1, y: 2, z: 1 };
const playerName = "SashaS555";
const player = test.spawnSimulatedPlayer(spawnLoc, playerName);
test.assertEntityPresent("player", spawnLoc);*/ /*
test.assert(player.nameTag === playerName, "Unexpected name tag");*/ /*
test
.startSequence()
.thenExecuteAfter(2147483647, () => {
  test.assertEntityPresent("player", spawnLoc, false);
})
.thenSucceed();
})
.maxTicks(21474836)
.structureName("ComponentTests:platform")
.tag(GameTest.Tags.suiteDefault);*/
GameTest.register("AndexdbTests", "spawn_simulated_player_Herobrine", (test) => {
    const spawnLoc = { x: 1, y: 5, z: 1 };
    const landLoc = { x: 1, y: 2, z: 1 };
    const playerName = "Herobrine";
    const player = test.spawnSimulatedPlayer(spawnLoc, playerName);
    test.assertEntityPresent("player", spawnLoc); /*
    test.assert(player.nameTag === playerName, "Unexpected name tag");*/
    test
        .startSequence()
        .thenExecuteAfter(2147483647, () => {
        test.assertEntityPresent("player", spawnLoc, false);
    })
        .thenSucceed();
})
    .maxTicks(21474836)
    .structureName("ComponentTests:platform")
    .tag("suite:andexdb");
GameTest.register("SimulatedPlayerTests", "remove_simulated_player", (test) => {
    const spawnLoc = { x: 1, y: 2, z: 1 };
    const player = test.spawnSimulatedPlayer(spawnLoc);
    test.assertEntityPresent("player", spawnLoc);
    test
        .startSequence()
        .thenExecuteAfter(10, () => {
        test.removeSimulatedPlayer(player);
        test.assertEntityPresent("player", spawnLoc, false);
    })
        .thenSucceed();
})
    .structureName("ComponentTests:platform")
    .tag("suite:andexdb");
GameTest.register("SimulatedPlayerTests", "jump", (test) => {
    const player = test.spawnSimulatedPlayer({ x: 1, y: 2, z: 0 });
    const goalLoc = { x: 1, y: 2, z: 3 };
    let jumpCount = 0;
    test
        .startSequence()
        .thenExecuteAfter(10, () => {
        player.move(0, 1);
    })
        .thenWait(() => {
        if (player.jump()) {
            jumpCount++;
        }
        test.assertEntityInstancePresent(player, goalLoc);
        test.assert(jumpCount === 10, "Expected 2 jumps up the stairs and 8 in the snow block");
    })
        .thenSucceed();
}).tag(GameTest.Tags.suiteDefault);
GameTest.register("SimulatedPlayerTests", "attack_entity", (test) => {
    const player = test.spawnSimulatedPlayer({ x: 1, y: 2, z: 1 });
    const cow = test.spawn("minecraft:cow<minecraft:ageable_grow_up>", { x: 3, y: 2, z: 3 });
    let hitCount = 0;
    test
        .startSequence()
        .thenWait(() => {
        player.lookAtEntity(cow);
        if (player.attackEntity(cow)) {
            hitCount++;
        }
        test.assertEntityPresentInArea("cow", false);
    })
        .thenExecute(() => {
        test.assert(hitCount === 10, "It should take 10 hits to kill a Cow.");
    })
        .thenSucceed();
})
    .maxTicks(200)
    .structureName("ComponentTests:large_animal_pen")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("SimulatedPlayerTests", "jump_attack_entity", (test) => {
    const player = test.spawnSimulatedPlayer({ x: 1, y: 2, z: 1 });
    const cow = test.spawn("minecraft:cow<minecraft:ageable_grow_up>", { x: 3, y: 2, z: 3 });
    let hitCount = 0;
    test
        .startSequence()
        .thenWait(() => {
        player.lookAtEntity(cow);
        player.jump();
        if (player.velocity.y < -0.3 && player.attackEntity(cow)) {
            hitCount++;
        }
        test.assertEntityPresentInArea("cow", false);
    })
        .thenExecute(() => {
        test.assert(hitCount === 7, "It should take 7 critical hits to kill a Cow.");
    })
        .thenSucceed();
})
    .maxTicks(200)
    .structureName("ComponentTests:large_animal_pen")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("SimulatedPlayerTests", "attack", (test) => {
    const player = test.spawnSimulatedPlayer({ x: 1, y: 2, z: 1 });
    const cow = test.spawn("minecraft:cow<minecraft:ageable_grow_up>", { x: 3, y: 2, z: 3 });
    let hitCount = 0;
    test
        .startSequence()
        .thenWait(() => {
        player.lookAtEntity(cow);
        if (player.attack()) {
            hitCount++;
        }
        test.assertEntityPresentInArea("cow", false);
    })
        .thenExecute(() => {
        test.assert(hitCount === 10, "It should take 10 hits to kill a Cow.");
    })
        .thenSucceed();
})
    .maxTicks(200)
    .structureName("ComponentTests:large_animal_pen")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("SimulatedPlayerTests", "use_item", (test) => {
    const player = test.spawnSimulatedPlayer({ x: 1, y: 2, z: 1 });
    const snowball = new ItemStack(MinecraftItemTypes.snowball, 1);
    test.spawn("blaze", { x: 1, y: 2, z: 3 });
    let useCount = 0;
    test
        .startSequence()
        .thenIdle(5)
        .thenWait(() => {
        if (player.useItem(snowball)) {
            useCount++;
        }
        test.assertEntityPresentInArea("blaze", false);
    })
        .thenExecute(() => {
        test.assert(useCount === 7, "It should take 7 snowballs to kill a Blaze");
    })
        .thenSucceed();
})
    .maxTicks(200)
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("SimulatedPlayerTests", "use_item_in_slot", (test) => {
    const player = test.spawnSimulatedPlayer({ x: 1, y: 2, z: 1 });
    test.spawn("blaze", { x: 1, y: 2, z: 3 });
    let useCount = 0;
    const slot = 0;
    const snowballCount = 10;
    const inventoryContainer = player.getComponent("inventory").container;
    player.setItem(new ItemStack(MinecraftItemTypes.snowball, snowballCount), slot, true);
    test
        .startSequence()
        .thenIdle(5)
        .thenWait(() => {
        test.assert(inventoryContainer.getItem(slot).amount === snowballCount - useCount, `Player should have ${snowballCount} snowballs`);
        if (player.useItemInSlot(slot)) {
            useCount++;
        }
        test.assertEntityPresentInArea("blaze", false);
    })
        .thenExecute(() => {
        test.assert(inventoryContainer.getItem(slot).amount === snowballCount - useCount, `Player should have ${snowballCount - useCount} snowballs`);
        test.assert(useCount === 7, "It should take 7 snowballs to kill a Blaze");
    })
        .thenSucceed();
})
    .maxTicks(200)
    .structureName("SimulatedPlayerTests:use_item")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("SimulatedPlayerTests", "use_item_on_block", (test) => {
    const player = test.spawnSimulatedPlayer({ x: 0, y: 2, z: 0 });
    test
        .startSequence()
        .thenWait(() => {
        const armorStand = new ItemStack(MinecraftItemTypes.armorStand, 1);
        const armorStandLoc = { x: 1, y: 1, z: 1 };
        const used = player.useItemOnBlock(armorStand, armorStandLoc, Direction.Up);
        test.assert(used, "Expected armor stand to be used");
        test.assertEntityPresent("armor_stand", armorStandLoc.above());
    })
        .thenWaitAfter(10, () => {
        const dirt = new ItemStack(MinecraftItemTypes.dirt, 1);
        const dirtLoc = { x: 2, y: 1, z: 1 };
        const used = player.useItemOnBlock(dirt, dirtLoc, Direction.Up);
        test.assert(used, "Expected dirt to be used");
        test.assertBlockPresent(MinecraftBlockTypes.dirt, dirtLoc.above());
    })
        .thenWaitAfter(10, () => {
        const bucket = new ItemStack(MinecraftItemTypes.bucket, 1);
        const waterLoc = { x: 1, y: 2, z: 3 };
        const used = player.useItemOnBlock(bucket, waterLoc);
        test.assert(used, "Expected bucket to be used");
        test.assertBlockPresent(MinecraftBlockTypes.air, waterLoc);
    })
        .thenSucceed();
}).tag(GameTest.Tags.suiteDefault);
GameTest.register("SimulatedPlayerTests", "give_item", (test) => {
    const player = test.spawnSimulatedPlayer({ x: 1, y: 2, z: 1 });
    let useCount = 0;
    test.assert(player.giveItem(new ItemStack(MinecraftItemTypes.snowball, 16), true), "giveItem() returned false");
    test.spawn("blaze", { x: 1, y: 2, z: 2 });
    test
        .startSequence()
        .thenIdle(5)
        .thenWait(() => {
        if (player.useItemInSlot(0)) {
            useCount++;
        }
        test.assertEntityPresentInArea("blaze", false);
    })
        .thenExecute(() => {
        test.assert(useCount === 7, "It should take 7 snowballs to kill a Blaze");
    })
        .thenSucceed();
})
    .maxTicks(200)
    .structureName("SimulatedPlayerTests:blaze_trap")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("SimulatedPlayerTests", "give_item_full_inventory", (test) => {
    const player = test.spawnSimulatedPlayer({ x: 1, y: 2, z: 1 });
    const containerSize = player.getComponent("inventory").container.size;
    for (let i = 0; i < containerSize; i++) {
        test.assert(player.giveItem(new ItemStack(MinecraftItemTypes.dirt, 64), false), "");
    }
    test
        .startSequence()
        .thenExecuteAfter(20, () => test.assert(!player.giveItem(new ItemStack(MinecraftItemTypes.oakStairs, 64), true), ""))
        .thenSucceed();
})
    .maxTicks(100)
    .structureName("ComponentTests:platform")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("SimulatedPlayerTests", "set_item", (test) => {
    const player = test.spawnSimulatedPlayer({ x: 1, y: 2, z: 1 });
    let useCount = 0;
    test.assert(player.setItem(new ItemStack(MinecraftItemTypes.snowball, 16), 0), "setItem() failed");
    test.spawn("blaze", { x: 1, y: 2, z: 2 });
    test
        .startSequence()
        .thenIdle(5)
        .thenWait(() => {
        if (player.useItemInSlot(0)) {
            useCount++;
        }
        test.assertEntityPresentInArea("blaze", false);
    })
        .thenExecute(() => {
        test.assert(useCount === 7, "It should take 7 snowballs to kill a Blaze");
    })
        .thenSucceed();
})
    .maxTicks(200)
    .structureName("SimulatedPlayerTests:blaze_trap")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("SimulatedPlayerTests", "set_item_full_inventory", (test) => {
    const player = test.spawnSimulatedPlayer({ x: 1, y: 2, z: 1 });
    const containerSize = player.getComponent("inventory").container.size;
    for (let i = 0; i < containerSize; i++) {
        test.assert(player.giveItem(new ItemStack(MinecraftItemTypes.dirt, 64), false), "");
    }
    test
        .startSequence()
        .thenExecuteAfter(20, () => test.assert(player.setItem(new ItemStack(MinecraftItemTypes.oakStairs, 64), 0, true), "setItem() failed"))
        .thenSucceed();
})
    .maxTicks(100)
    .structureName("ComponentTests:platform")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("SimulatedPlayerTests", "interact_with_entity", (test) => {
    const player = test.spawnSimulatedPlayer({ x: 0, y: 2, z: 0 });
    const minecart = test.spawn("minecart", { x: 1, y: 2, z: 1 });
    player.interactWithEntity(minecart);
    test.succeedWhenEntityPresent("minecraft:player", { x: 1, y: 3, z: 1 });
}).tag(GameTest.Tags.suiteDefault);
GameTest.register("SimulatedPlayerTests", "destroy_block", (test) => {
    const player = test.spawnSimulatedPlayer({ x: 0, y: 2, z: 0 });
    const fenceLoc = { x: 1, y: 2, z: 0 };
    const chestLoc = { x: 2, y: 2, z: 0 };
    const ironOreLoc = { x: 0, y: 2, z: 1 };
    const planksLoc = { x: 1, y: 2, z: 1 };
    const blockLocs = [fenceLoc, chestLoc, ironOreLoc, planksLoc];
    const blockTypes = [
        MinecraftBlockTypes.fence,
        MinecraftBlockTypes.chest,
        MinecraftBlockTypes.ironOre,
        MinecraftBlockTypes.planks,
    ];
    player.giveItem(new ItemStack(MinecraftItemTypes.ironPickaxe, 1), true);
    for (let i = 0; i < blockLocs.length; i++) {
        test.assertBlockPresent(blockTypes[i], blockLocs[i]);
    }
    const sequence = test.startSequence().thenIdle(5);
    for (let i = 0; i < blockLocs.length; i++) {
        sequence
            .thenExecute(() => {
            player.breakBlock(blockLocs[i]);
        })
            .thenWait(() => {
            test.assertBlockPresent(blockTypes[i], blockLocs[i], false);
        });
    }
    sequence.thenSucceed();
})
    .maxTicks(300)
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("SimulatedPlayerTests", "stop_destroying_block", (test) => {
    const ironOreLoc = { x: 1, y: 2, z: 1 };
    const player = test.spawnSimulatedPlayer({ x: 1, y: 2, z: 0 });
    test.setBlockType(MinecraftBlockTypes.ironOre, ironOreLoc);
    player.giveItem(new ItemStack(MinecraftItemTypes.ironPickaxe, 1), true);
    test
        .startSequence()
        .thenExecuteAfter(5, () => {
        player.breakBlock(ironOreLoc);
    })
        .thenExecuteAfter(10, () => {
        player.stopBreakingBlock();
    })
        .thenExecuteAfter(20, () => {
        test.assertBlockPresent(MinecraftBlockTypes.ironOre, ironOreLoc);
    })
        .thenSucceed();
})
    .structureName("ComponentTests:platform")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("SimulatedPlayerTests", "use_item_while_destroying_block", (test) => {
    const ironOreLoc = { x: 1, y: 2, z: 1 };
    const player = test.spawnSimulatedPlayer({ x: 1, y: 2, z: 0 });
    test.setBlockType(MinecraftBlockTypes.ironOre, ironOreLoc);
    player.giveItem(new ItemStack(MinecraftItemTypes.ironPickaxe, 1), false);
    player.giveItem(new ItemStack(MinecraftItemTypes.potion, 1), false);
    test
        .startSequence()
        .thenExecuteAfter(5, () => {
        player.breakBlock(ironOreLoc);
    })
        .thenExecuteAfter(10, () => {
        player.useItemInSlot(1); // drink potion
    })
        .thenExecuteAfter(30, () => {
        test.assertBlockPresent(MinecraftBlockTypes.ironOre, ironOreLoc);
    })
        .thenSucceed();
})
    .structureName("ComponentTests:platform")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("SimulatedPlayerTests", "move", (test) => {
    const player = test.spawnSimulatedPlayer({ x: 3, y: 2, z: 3 });
    test
        .startSequence()
        .thenIdle(10)
        .thenExecute(() => {
        player.move(0, -1);
        player.setBodyRotation(180);
    })
        .thenIdle(16)
        .thenExecute(() => {
        player.move(1, 1);
        player.setBodyRotation(50);
    })
        .thenIdle(16)
        .thenExecute(() => {
        player.move(-1, 1);
        player.setBodyRotation(100);
    })
        .thenIdle(16)
        .thenExecute(() => {
        player.move(-1, -1);
        player.setBodyRotation(220);
    })
        .thenIdle(16)
        .thenExecute(() => {
        player.move(1, -1);
        player.setBodyRotation(0);
    })
        .thenWait(() => {
        test.assertBlockPresent(MinecraftBlockTypes.air, { x: 2, y: 2, z: 0 });
        test.assertBlockPresent(MinecraftBlockTypes.air, { x: 0, y: 2, z: 4 });
        test.assertBlockPresent(MinecraftBlockTypes.air, { x: 4, y: 2, z: 6 });
        test.assertBlockPresent(MinecraftBlockTypes.air, { x: 6, y: 2, z: 2 });
    })
        .thenSucceed();
})
    .maxTicks(110)
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("SimulatedPlayerTests", "move_relative", (test) => {
    const player = test.spawnSimulatedPlayer({ x: 3, y: 2, z: 3 });
    test
        .startSequence()
        .thenIdle(10)
        .thenExecute(() => {
        player.moveRelative(0, 1);
        player.setBodyRotation(180);
    })
        .thenIdle(16)
        .thenExecute(() => {
        player.setBodyRotation(-45);
    })
        .thenIdle(16)
        .thenExecute(() => {
        player.setBodyRotation(45);
    })
        .thenIdle(16)
        .thenExecute(() => {
        player.setBodyRotation(135);
    })
        .thenIdle(16)
        .thenExecute(() => {
        player.setBodyRotation(225);
    })
        .thenWait(() => {
        test.assertBlockPresent(MinecraftBlockTypes.air, { x: 2, y: 2, z: 0 });
        test.assertBlockPresent(MinecraftBlockTypes.air, { x: 0, y: 2, z: 4 });
        test.assertBlockPresent(MinecraftBlockTypes.air, { x: 4, y: 2, z: 6 });
        test.assertBlockPresent(MinecraftBlockTypes.air, { x: 6, y: 2, z: 2 });
    })
        .thenSucceed();
})
    .maxTicks(110)
    .structureName("SimulatedPlayerTests:move")
    .tag(GameTest.Tags.suiteDefault); /*

GameTest.register("SimulatedPlayerTests", "move_to_block", (test) => {
const player = test.spawnSimulatedPlayer(new BlockLocationIterator(3, 2, 3));
test
  .startSequence()
  .thenIdle(5)
  .thenExecute(() => {
    player.moveToBlock(new BlockLocationIterator(3, 2, 1));
  })
  .thenIdle(25)
  .thenExecute(() => {
    player.moveToBlock(new BlockLocationIterator(5, 2, 3));
  })
  .thenIdle(25)
  .thenExecute(() => {
    player.moveToBlock(new BlockLocationIterator(3, 2, 5));
  })
  .thenIdle(25)
  .thenExecute(() => {
    player.moveToBlock(new BlockLocationIterator(1, 2, 3));
  })
  .thenIdle(25)
  .thenExecute(() => {
    player.moveToBlock(new BlockLocationIterator(3, 2, 1));
  })
  .thenIdle(25)
  .thenExecute(() => {
    player.moveToBlock(new BlockLocationIterator(3, 2, 3));
  })
  .thenWait(() => {
    test.assertBlockPresent(MinecraftBlockTypes.air, new BlockLocationIterator(2, 2, 0));
    test.assertBlockPresent(MinecraftBlockTypes.air, new BlockLocationIterator(0, 2, 4));
    test.assertBlockPresent(MinecraftBlockTypes.air, new BlockLocationIterator(4, 2, 6));
    test.assertBlockPresent(MinecraftBlockTypes.air, new BlockLocationIterator(6, 2, 2));
  })
  .thenSucceed();
})
.maxTicks(200)
.structureName("SimulatedPlayerTests:move")
.tag(GameTest.Tags.suiteDefault);

GameTest.register("SimulatedPlayerTests", "move_to_location", (test) => {
const player = test.spawnSimulatedPlayer(new BlockLocationIterator(3, 2, 3));
test
  .startSequence()
  .thenIdle(5)
  .thenExecute(() => {
    player.moveToLocation(new Location(3.5, 2, 1.5));
  })
  .thenIdle(25)
  .thenExecute(() => {
    player.moveToLocation(new Location(5.5, 2, 3.5));
  })
  .thenIdle(25)
  .thenExecute(() => {
    player.moveToLocation(new Location(3.5, 2, 5.5));
  })
  .thenIdle(25)
  .thenExecute(() => {
    player.moveToLocation(new Location(1.5, 2, 3.5));
  })
  .thenIdle(25)
  .thenExecute(() => {
    player.moveToLocation(new Location(3.5, 2, 1.5));
  })
  .thenIdle(25)
  .thenExecute(() => {
    player.moveToLocation(new Location(3.5, 2, 3.5));
  })
  .thenWait(() => {
    test.assertBlockPresent(MinecraftBlockTypes.air, new BlockLocationIterator(2, 2, 0));
    test.assertBlockPresent(MinecraftBlockTypes.air, new BlockLocationIterator(0, 2, 4));
    test.assertBlockPresent(MinecraftBlockTypes.air, new BlockLocationIterator(4, 2, 6));
    test.assertBlockPresent(MinecraftBlockTypes.air, new BlockLocationIterator(6, 2, 2));
  })
  .thenSucceed();
})
.maxTicks(200)
.structureName("SimulatedPlayerTests:move")
.tag(GameTest.Tags.suiteDefault);

GameTest.register("SimulatedPlayerTests", "navigate_to_block", (test) => {
const player = test.spawnSimulatedPlayer(new BlockLocationIterator(2, 2, 0));
const goalLoc = new BlockLocationIterator(0, 3, 2);
const behindDoorLoc = new BlockLocationIterator(4, 3, 2);

test
  .startSequence()
  .thenExecuteAfter(10, () => {
    const nav = player.navigateToBlock(behindDoorLoc);
    test.assert(nav.isFullPath, "Expected successful navigation result");
    const path = nav.path;
    test.assert(path[0].equals(new BlockLocationIterator(2, 2, 0)), "Unexpected starting BlockLocationIterator in navigation path.");
    test.assert(
      path[path.length - 1].equals(new BlockLocationIterator(4, 3, 2)),
      "Unexpected ending BlockLocationIterator in navigation path."
    );
  })
  .thenWait(() => {
    test.assertEntityInstancePresent(player, behindDoorLoc);
  })
  .thenExecuteAfter(10, () => {
    const nav = player.navigateToBlock(goalLoc);
    test.assert(nav.isFullPath, "Expected successful navigation result");
    const path = nav.path;
    test.assert(
      path[path.length - 1].equals(new BlockLocationIterator(0, 3, 2)),
      "Unexpected ending BlockLocationIterator in navigation path."
    );
  })
  .thenWait(() => {
    test.assertEntityInstancePresent(player, goalLoc);
  })
  .thenSucceed();
})
.maxTicks(300)
.structureName("SimulatedPlayerTests:navigate_to_location")
.tag(GameTest.Tags.suiteDefault);

GameTest.register("SimulatedPlayerTests", "navigate_to_entity", (test) => {
const player = test.spawnSimulatedPlayer(new BlockLocationIterator(2, 2, 0));
const goalLoc = new BlockLocationIterator(0, 3, 2);
const behindDoorLoc = new BlockLocationIterator(4, 3, 2);

const armorStand1 = test.spawn("armor_stand", behindDoorLoc.above());
const armorStand2 = test.spawn("armor_stand", goalLoc.above());

test
  .startSequence()
  .thenExecuteAfter(10, () => {
    const nav = player.navigateToEntity(armorStand1);
    test.assert(nav.isFullPath, "Expected successful navigation result");
    const path = nav.path;
    test.assert(path[0].equals(new BlockLocationIterator(2, 2, 0)), "Unexpected starting BlockLocationIterator in navigation path.");
    test.assert(
      path[path.length - 1].equals(new BlockLocationIterator(4, 3, 2)),
      "Unexpected ending BlockLocationIterator in navigation path."
    );
  })
  .thenWait(() => {
    test.assertEntityInstancePresent(player, behindDoorLoc);
  })
  .thenExecuteAfter(10, () => {
    const nav = player.navigateToEntity(armorStand2);
    test.assert(nav.isFullPath, "Expected successful navigation result");
    const path = nav.path;
    test.assert(
      path[path.length - 1].equals(new BlockLocationIterator(0, 3, 2)),
      "Unexpected ending BlockLocationIterator in navigation path."
    );
  })
  .thenWait(() => {
    test.assertEntityInstancePresent(player, goalLoc);
  })
  .thenSucceed();
})
.maxTicks(300)
.structureName("SimulatedPlayerTests:navigate_to_location")
.tag(GameTest.Tags.suiteDefault);

GameTest.register("SimulatedPlayerTests", "navigate_to_location", (test) => {
const player = test.spawnSimulatedPlayer(new BlockLocationIterator(2, 2, 0));
const goalLoc = new BlockLocationIterator(0, 3, 2);
const behindDoorLoc = new BlockLocationIterator(4, 3, 2);

test
  .startSequence()
  .thenExecuteAfter(10, () => {
    const nav = player.navigateToLocation(new Location(4.5, 3, 2.5));
    test.assert(nav.isFullPath, "Expected successful navigation result");
    const path = nav.path;
    test.assert(path[0].equals(new BlockLocationIterator(2, 2, 0)), "Unexpected starting BlockLocationIterator in navigation path.");
    test.assert(
      path[path.length - 1].equals(new BlockLocationIterator(4, 3, 2)),
      "Unexpected ending BlockLocationIterator in navigation path."
    );
  })
  .thenWait(() => {
    test.assertEntityInstancePresent(player, behindDoorLoc);
  })
  .thenExecuteAfter(10, () => {
    const nav = player.navigateToLocation(new Location(0.5, 3, 2.5));
    test.assert(nav.isFullPath, "Expected successful navigation result");
    const path = nav.path;
    test.assert(
      path[path.length - 1].equals(new BlockLocationIterator(0, 3, 2)),
      "Unexpected ending BlockLocationIterator in navigation path."
    );
  })
  .thenWait(() => {
    test.assertEntityInstancePresent(player, goalLoc);
  })
  .thenSucceed();
})
.maxTicks(300)
.tag(GameTest.Tags.suiteDefault);

GameTest.register("SimulatedPlayerTests", "navigate_to_locations", (test) => {
const player = test.spawnSimulatedPlayer(new BlockLocationIterator(2, 2, 0));
const goalLoc = new BlockLocationIterator(0, 3, 2);
const locations = [new Location(4.5, 3, 2.5), new Location(0.5, 3, 2.5)];

test
  .startSequence()
  .thenExecuteAfter(10, () => {
    player.navigateToLocations(locations);
  })
  .thenWait(() => {
    test.assertEntityInstancePresent(player, goalLoc);
  })
  .thenSucceed();
})
.maxTicks(300)
.structureName("SimulatedPlayerTests:navigate_to_location")
.tag(GameTest.Tags.suiteDefault);

GameTest.register("SimulatedPlayerTests", "stop_moving", (test) => {
const spawnLoc = new BlockLocationIterator(1, 2, 0);
const player = test.spawnSimulatedPlayer(spawnLoc);
player.move(0, 1);

test
  .startSequence()
  .thenExecuteAfter(10, () => {
    player.stopMoving();
  })
  .thenExecuteAfter(20, () => {
    test.assertEntityInstancePresent(player, spawnLoc, false);
    test.assertEntityInstancePresent(player, new BlockLocationIterator(1, 3, 4), false);
  })
  .thenSucceed();
}).tag(GameTest.Tags.suiteDefault);

GameTest.register("SimulatedPlayerTests", "shoot_bow", (test) => {
const player = test.spawnSimulatedPlayer(new BlockLocationIterator(1, 2, 1));
const lampLoc = new BlockLocationIterator(2, 3, 7);

test
  .startSequence()
  .thenExecuteAfter(5, () => {
    player.giveItem(new ItemStack(MinecraftItemTypes.bow, 1), false);
    player.giveItem(new ItemStack(MinecraftItemTypes.arrow, 64), false);
  })
  .thenExecuteAfter(5, () => {
    player.useItemInSlot(0);
  })
  .thenExecuteAfter(50, () => {
    player.stopUsingItem();
  })
  .thenWait(() => {
    test.assertBlockPresent(MinecraftBlockTypes.litRedstoneLamp, lampLoc);
  })
  .thenSucceed();
})
.structureName("SimulatedPlayerTests:target_practice")
.tag(GameTest.Tags.suiteDefault);

GameTest.register("SimulatedPlayerTests", "shoot_crossbow", (test) => {
const player = test.spawnSimulatedPlayer(new BlockLocationIterator(1, 2, 1));
const lampLoc = new BlockLocationIterator(2, 3, 7);

test
  .startSequence()
  .thenExecuteAfter(5, () => {
    player.giveItem(new ItemStack(MinecraftItemTypes.crossbow, 1), false);
    player.giveItem(new ItemStack(MinecraftItemTypes.arrow, 64), false);
  })
  .thenExecuteAfter(5, () => {
    player.useItemInSlot(0);
  })
  .thenExecuteAfter(50, () => {
    player.stopUsingItem();
    player.useItemInSlot(0);
  })
  .thenWait(() => {
    test.assertBlockPresent(MinecraftBlockTypes.litRedstoneLamp, lampLoc);
  })
  .thenSucceed();
})
.maxTicks(150)
.structureName("SimulatedPlayerTests:target_practice")
.tag(GameTest.Tags.suiteDefault);

GameTest.register("SimulatedPlayerTests", "move_in_minecart", (test) => {
const player = test.spawnSimulatedPlayer(new BlockLocationIterator(0, 2, 0));
const minecart = test.spawn("minecart", new BlockLocationIterator(1, 2, 0));
const lampLoc = new BlockLocationIterator(0, 2, 3);

test
  .startSequence()
  .thenExecuteAfter(20, () => {
    player.interactWithEntity(minecart);
    player.move(0, 1);
  })
  .thenWait(() => {
    test.assertBlockPresent(MinecraftBlockTypes.litRedstoneLamp, lampLoc);
  })
  .thenSucceed();
})
.maxTicks(200)
.tag(GameTest.Tags.suiteDefault);

GameTest.register("SimulatedPlayerTests", "rotate_body", (test) => {
const player = test.spawnSimulatedPlayer(new BlockLocationIterator(1, 2, 1));

test
  .startSequence()
  .thenExecuteAfter(5, () => {
    test.assert(player.rotation.y === 0, "Expected body rotation of 0 degrees (1)");
  })
  .thenExecuteAfter(5, () => {
    player.setBodyRotation(90);
    test.assert(player.rotation.y === 90, "Expected body rotation of 90 degrees (2)");
  })
  .thenExecuteAfter(5, () => {
    player.setBodyRotation(-90);
    test.assert(player.rotation.y === -90, "Expected body rotation of -90 degrees (3)");
  })
  .thenExecuteAfter(5, () => {
    player.setBodyRotation(180);
    test.assert(player.rotation.y === -180, "Expected body rotation of -180 degrees (4)");
  })
  .thenExecuteAfter(5, () => {
    player.rotateBody(180);
    test.assert(player.rotation.y === 0, "Expected body rotation of 0 degrees (5)");
  })
  .thenExecuteAfter(5, () => {
    player.rotateBody(90);
    test.assert(player.rotation.y === 90, "Expected body rotation of 90 degrees (6)");
  })
  .thenExecuteAfter(5, () => {
    player.rotateBody(-180);
    test.assert(player.rotation.y === -90, "Expected body rotation of -90 degrees (7)");
  })
  .thenSucceed();
})
.structureName("ComponentTests:platform")
.tag(GameTest.Tags.suiteDefault);

GameTest.register("SimulatedPlayerTests", "look_at_entity", (test) => {
const player = test.spawnSimulatedPlayer(new BlockLocationIterator(1, 2, 1));
const leftArmorStand = test.spawn("armor_stand", new BlockLocationIterator(2, 2, 1));
const rightArmorStand = test.spawn("armor_stand", new BlockLocationIterator(0, 2, 1));

test
  .startSequence()
  .thenExecuteAfter(5, () => {
    player.lookAtEntity(leftArmorStand);
    test.assert(player.rotation.y === -90, "Expected body rotation of -90 degrees");
  })
  .thenExecuteAfter(5, () => {
    player.lookAtEntity(rightArmorStand);
    test.assert(player.rotation.y === 90, "Expected body rotation of 90 degrees");
  })
  .thenSucceed();
})
.structureName("ComponentTests:platform")
.tag(GameTest.Tags.suiteDefault);

GameTest.register("SimulatedPlayerTests", "look_at_block", (test) => {
const player = test.spawnSimulatedPlayer(new BlockLocationIterator(1, 2, 1));
const leftBlockLoc = new BlockLocationIterator(2, 2, 1);
const rightBlockLoc = new BlockLocationIterator(0, 2, 1);

test
  .startSequence()
  .thenExecuteAfter(10, () => {
    test.assert(player.rotation.y === 0, "Expected body rotation of 0 degrees");
    test.assert(player.headRotation.x === 0, "Expected head pitch of 0 degrees");
    test.assert(player.headRotation.y === 0, "Expected head yaw of 0 degrees");
    player.lookAtBlock(leftBlockLoc);
  })
  .thenExecuteAfter(20, () => {
    test.assert(player.rotation.y === -90, "Expected body rotation of -90 degrees");
    test.assert(isNear(player.headRotation.x, 48.24), "Expected head pitch of ~48.24 degrees");
    test.assert(player.headRotation.y === -90, "Expected head yaw of -90 degrees");
  })
  .thenExecuteAfter(10, () => {
    player.lookAtBlock(rightBlockLoc);
  })
  .thenExecuteAfter(20, () => {
    test.assert(player.rotation.y === 90, "Expected body rotation of 90 degrees");
    test.assert(isNear(player.headRotation.x, 48.24), "Expected head pitch of ~48.24 degrees");
    test.assert(player.headRotation.y === 90, "Expected head yaw of 90 degrees");
  })
  .thenSucceed();
})
.structureName("ComponentTests:platform")
.tag(GameTest.Tags.suiteDefault);

GameTest.register("SimulatedPlayerTests", "look_at_location", (test) => {
const player = test.spawnSimulatedPlayer(new BlockLocationIterator(1, 2, 1));
const leftLoc = new Location(2.5, 2, 1.5);
const rightLoc = new Location(0.5, 2, 1.5);

test
  .startSequence()
  .thenExecuteAfter(10, () => {
    test.assert(player.rotation.y === 0, "Expected body rotation of 0 degrees");
    test.assert(player.headRotation.x === 0, "Expected head pitch of 0 degrees");
    test.assert(player.headRotation.y === 0, "Expected head yaw of 0 degrees");
    player.lookAtLocation(leftLoc);
  })
  .thenExecuteAfter(20, () => {
    test.assert(player.rotation.y === -90, "Expected body rotation of -90 degrees");
    test.assert(isNear(player.headRotation.x, 58.31), "Expected head pitch of ~58.31 degrees");
    test.assert(player.headRotation.y === -90, "Expected head yaw of -90 degrees");
  })
  .thenExecuteAfter(10, () => {
    player.lookAtLocation(rightLoc);
  })
  .thenExecuteAfter(20, () => {
    test.assert(player.rotation.y === 90, "Expected body rotation of 90 degrees");
    test.assert(isNear(player.headRotation.x, 58.31), "Expected head pitch of ~58.31 degrees");
    test.assert(player.headRotation.y === 90, "Expected head yaw of 90 degrees");
  })
  .thenSucceed();
})
.structureName("ComponentTests:platform")
.tag(GameTest.Tags.suiteDefault);

GameTest.register("SimulatedPlayerTests", "use_item_in_slot_on_block", (test) => {
const player = test.spawnSimulatedPlayer(new BlockLocationIterator(1, 2, 0));
const wallLoc = new BlockLocationIterator(1, 3, 2);
const slabLoc = new BlockLocationIterator(1, 3, 1);
const woodenSlabSlot = 1;
const inventoryContainer = player.getComponent("inventory").container;

test
  .startSequence()
  .thenExecuteAfter(5, () => {
    player.setItem(new ItemStack(MinecraftItemTypes.crimsonSlab, 2), 0);
    player.setItem(new ItemStack(MinecraftItemTypes.woodenSlab, 2), woodenSlabSlot);
    player.setItem(new ItemStack(MinecraftItemTypes.warpedSlab, 2), 2);
    test.assert(inventoryContainer.getItem(woodenSlabSlot).amount === 2, "Player should have 2 wooden slabs");
  })
  .thenExecuteAfter(10, () => {
    player.useItemInSlotOnBlock(woodenSlabSlot, wallLoc, Direction.north, 0.5, 0.75); // place upper slab
    test.assert(inventoryContainer.getItem(woodenSlabSlot).amount === 1, "Player should have 1 wooden slab");
  })
  .thenExecuteAfter(10, () => {
    player.useItemInSlotOnBlock(woodenSlabSlot, wallLoc, Direction.north, 0.5, 0.25); // place lower slab
    test.assert(inventoryContainer.getItem(woodenSlabSlot) === undefined, "Player should have 0 wooden slabs");
  })
  .thenWait(() => {
    test.assertBlockPresent(MinecraftBlockTypes.doubleWoodenSlab, slabLoc);
  })
  .thenSucceed();
}).tag(GameTest.Tags.suiteDefault);

GameTest.register("SimulatedPlayerTests", "use_item_on_block_2", (test) => {
const player = test.spawnSimulatedPlayer(new BlockLocationIterator(1, 2, 0));
const wallLoc = new BlockLocationIterator(1, 3, 2);
const slabLoc = new BlockLocationIterator(1, 3, 1);
const woodenSlab = new ItemStack(MinecraftItemTypes.woodenSlab, 1);

test
  .startSequence()
  .thenExecuteAfter(10, () => {
    player.useItemOnBlock(woodenSlab, wallLoc, Direction.north, 0.5, 0.75); // place upper slab
  })
  .thenExecuteAfter(10, () => {
    player.useItemOnBlock(woodenSlab, wallLoc, Direction.north, 0.5, 0.25); // place lower slab
  })
  .thenWait(() => {
    test.assertBlockPresent(MinecraftBlockTypes.doubleWoodenSlab, slabLoc);
  })
  .thenSucceed();
})
.structureName("SimulatedPlayerTests:use_item_in_slot_on_block")
.tag(GameTest.Tags.suiteDefault);

GameTest.register("SimulatedPlayerTests", "interact", (test) => {
const player = test.spawnSimulatedPlayer(new BlockLocationIterator(1, 2, 0));
const leverLoc = new BlockLocationIterator(1, 3, 2);
const lampLoc = new BlockLocationIterator(2, 2, 2);

test
  .startSequence()
  .thenExecuteAfter(5, () => {
    player.lookAtBlock(leverLoc);
    player.interact();
  })
  .thenWait(() => {
    test.assertBlockPresent(MinecraftBlockTypes.litRedstoneLamp, lampLoc);
  })
  .thenSucceed();
}).tag(GameTest.Tags.suiteDefault);*/
GameTest.register("SimulatedPlayerTests", "interact_with_block", (test) => {
    const player = test.spawnSimulatedPlayer({ x: 1, y: 2, z: 0 });
    const leverLoc = new BlockLocationIterator(1, 3, 2);
    const lampLoc = new BlockLocationIterator(2, 2, 2);
    test
        .startSequence()
        .thenExecuteAfter(5, () => {
        player.interactWithBlock(leverLoc);
    })
        .thenWait(() => {
        test.assertBlockPresent("lit_redstone_lamp", lampLoc);
    })
        .thenSucceed();
})
    .structureName("SimulatedPlayerTests:interact")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("SimulatedPlayerTests", "one_tick", (test) => {
    for (let i = 0; i < 3; i++) {
        test.spawnSimulatedPlayer({ x: 1, y: 2, z: 0 });
    }
    test.succeedOnTick(1);
})
    .structureName("ComponentTests:platform")
    .tag(GameTest.Tags.suiteDefault); /*

GameTest.register("SimulatedPlayerTests", "destroy_block_creative", (test) => {
const blockLoc = new BlockLocationIterator(2, 2, 1);
const spawnLoc = new BlockLocationIterator(2, 2, 3);
const playerName = "Simulated Player (Creative)";

let player = test.spawnSimulatedPlayer(spawnLoc, playerName);
test
  .startSequence()
  .thenExecuteAfter(5, () => {
    player.runCommandAsync("gamemode creative");
  })
  .thenExecute(() => {
    player.breakBlock(blockLoc);
  })
  .thenExecuteAfter(1, () => {
    test.assertBlockPresent(MinecraftBlockTypes.air, blockLoc);
    test.setBlockType(MinecraftBlockTypes.goldBlock, blockLoc);
  })
  .thenExecuteAfter(2, () => {
    test.assertBlockPresent(MinecraftBlockTypes.goldBlock, blockLoc);
  })
  .thenSucceed();
}).tag(GameTest.Tags.suiteDefault);*/
GameTest.registerAsync("SimulatedPlayerTests", "run_command_after_spawn", async (test) => {
    const spawnLoc = { x: 1, y: 2, z: 2 };
    let player = test.spawnSimulatedPlayer(spawnLoc);
    test.assertEntityPresent("player", spawnLoc);
    player.runCommandAsync("kill @s");
    test.assertEntityPresent("player", spawnLoc, false);
    test.succeed();
})
    .structureName("ComponentTests:platform")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("SimulatedPlayerTests", "sneaking", (test) => {
    const player = test.spawnSimulatedPlayer({ x: 1, y: 2, z: 0 });
    const goalLoc = { x: 1, y: 2, z: 3 };
    const healthComponent = player.getComponent("minecraft:health");
    player.isSneaking = true;
    player.moveToBlock(goalLoc);
    test
        .startSequence()
        .thenExecuteAfter(20, () => {
        test.assertEntityInstancePresent(player, goalLoc, false);
    })
        .thenExecuteAfter(60, () => {
        test.assertEntityInstancePresent(player, goalLoc);
        test.assert(healthComponent.current === healthComponent.value, "Player should not be hurt");
    })
        .thenSucceed();
    test.startSequence();
}).tag(GameTest.Tags.suiteDefault);
GameTest.register("SimulatedPlayerTests", "move_to_block_slowly", (test) => {
    const player = test.spawnSimulatedPlayer({ x: 1, y: 2, z: 0 });
    const goalLoc = { x: 1, y: 2, z: 3 };
    const healthComponent = player.getComponent("minecraft:health");
    player.moveToBlock(goalLoc, 0.3);
    test
        .startSequence()
        .thenExecuteAfter(20, () => {
        test.assertEntityInstancePresent(player, goalLoc, false);
    })
        .thenExecuteAfter(60, () => {
        test.assertEntityInstancePresent(player, goalLoc);
        test.assert(healthComponent.current !== healthComponent.value, "Player should be hurt");
    })
        .thenSucceed();
    test.startSequence();
})
    .structureName("SimulatedPlayerTests:sneaking")
    .tag(GameTest.Tags.suiteDefault);
GameTest.registerAsync("SimulatedPlayerTests", "player_join_leave_events", async (test) => {
    const thePlayerName = "Gary_The_Duck_411";
    let expectedPlayerJoined = false;
    const playerJoinCallback = world.events.playerJoin.subscribe((e) => {
        if (e.playerName == thePlayerName) {
            expectedPlayerJoined = true;
        }
    });
    let expectedPlayerLeft = false;
    const playerLeaveCallback = world.events.playerLeave.subscribe((e) => {
        if (e.playerName == thePlayerName) {
            expectedPlayerLeft = true;
        }
    });
    let simPlayer = test.spawnSimulatedPlayer({ x: 0, y: 2, z: 0 }, thePlayerName);
    await test.idle(1);
    if (!expectedPlayerJoined) {
        test.fail("Expected playerJoin event");
    }
    test.removeSimulatedPlayer(simPlayer);
    await test.idle(1);
    if (!expectedPlayerLeft) {
        test.fail("Expected playerLeave event");
    }
    world.events.playerJoin.unsubscribe(playerJoinCallback);
    world.events.playerLeave.unsubscribe(playerLeaveCallback);
    test.succeed();
})
    .structureName("ComponentTests:platform")
    .tag(GameTest.Tags.suiteDefault);
GameTest.registerAsync("SimulatedPlayerTests", "player_update_selected_slot", async (test) => {
    const player = test.spawnSimulatedPlayer({ x: 0, y: 2, z: 0 });
    await test.idle(1);
    test.assert(player.selectedSlot === 0, "Expected default selected slot of the player to be 0");
    player.selectedSlot = 1;
    test.assert(player.selectedSlot === 1, "Expected player selected slot to be updated after change");
    test.succeed();
})
    .structureName("ComponentTests:platform")
    .tag(GameTest.Tags.suiteDefault);
GameTest.registerAsync("SimulatedPlayerTests", "player_uses_correct_item_from_updated_slot", async (test) => {
    const player = test.spawnSimulatedPlayer({ x: 0, y: 2, z: 0 });
    const blockLoc = { x: 2, y: 1, z: 1 };
    const dirt = new ItemStack("dirt", 1);
    const stone = new ItemStack("stone", 1);
    await test.idle(1);
    player.giveItem(dirt, false);
    player.giveItem(stone, false);
    await test.idle(1);
    test.assert(player.selectedSlot === 0, "Player selected slot should not have been updated");
    player.selectedSlot = 1;
    player.useItemInSlotOnBlock(player.selectedSlot, blockLoc, Direction.Up);
    await test.idle(1);
    test.assertBlockPresent(MinecraftBlockTypes.stone, blockLoc.above(), true);
    test.succeed();
})
    .structureName("ComponentTests:platform")
    .tag(GameTest.Tags.suiteDefault);
//# sourceMappingURL=SimulatedPlayerTests.js.map