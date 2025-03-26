// Copyright (c) Microsoft Corporation.  All rights reserved.
import GameTestExtensions from "./GameTestExtensions.js";
import * as GameTest from "@minecraft/server-gametest";
import { Block, BlockFluidContainerComponent, BlockPistonState, BlockRecordPlayerComponent, Direction, Entity, EntityDamageCause, EntityInventoryComponent, FluidContainer, FluidType, ItemStack, ItemType, ItemTypes, Player, PotionEffectType, world, } from "@minecraft/server";
import * as mcMath from "@minecraft/math.js";
GameTest.register("APITests", "on_entity_created", (test) => {
    const entitySpawnCallback = world.afterEvents.entitySpawn.subscribe((entity) => {
        if (entity) {
            test.succeed();
        }
        else {
            test.fail("Expected entity");
        }
    });
    test.spawn("minecraft:horse<minecraft:ageable_grow_up>", { x: 1, y: 2, z: 1 });
    world.afterEvents.entitySpawn.unsubscribe(entitySpawnCallback);
})
    .structureName("ComponentTests:animal_pen")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "assert_is_waterlogged", (test) => {
    const waterChestLoc = { x: 5, y: 2, z: 1 };
    const waterLoc = { x: 4, y: 2, z: 1 };
    const chestLoc = { x: 2, y: 2, z: 1 };
    const airLoc = { x: 1, y: 2, z: 1 };
    test.assertIsWaterlogged(waterChestLoc, true);
    test.assertIsWaterlogged(waterLoc, false);
    test.assertIsWaterlogged(chestLoc, false);
    test.assertIsWaterlogged(airLoc, false);
    test.succeed();
}).tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "assert_redstone_power", (test) => {
    const redstoneBlockLoc = { x: 3, y: 2, z: 1 };
    const redstoneTorchLoc = { x: 2, y: 2, z: 1 };
    const poweredLampLoc = { x: 1, y: 2, z: 1 };
    const unpoweredLampLoc = { x: 0, y: 2, z: 1 };
    const airLoc = { x: 3, y: 2, z: 0 };
    const redstoneWireLoc = { x: 0, y: 1, z: 0 };
    test.succeedWhen(() => {
        test.assertRedstonePower(redstoneBlockLoc, 15);
        test.assertRedstonePower(redstoneTorchLoc, 15);
        test.assertRedstonePower(poweredLampLoc, 15);
        test.assertRedstonePower(unpoweredLampLoc, 0);
        test.assertRedstonePower(airLoc, -1);
        test.assertRedstonePower(redstoneWireLoc, 13); // 3 length wire
    });
})
    .maxTicks(20)
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "spawn_item", (test) => {
    const featherItem = new ItemStack("feather", 1);
    test.spawnItem(featherItem, { x: 1.5, y: 3.5, z: 1.5 });
    test.succeedWhen(() => {
        test.assertEntityPresent("minecraft:item", { x: 1, y: 2, z: 1 }, undefined, true);
    });
}).tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "assert_entity_data", (test) => {
    const pigId = "minecraft:pig<minecraft:ageable_grow_up>";
    const pigLoc = { x: 1, y: 2, z: 1 };
    test.spawn(pigId, pigLoc);
    test.succeedWhen(() => {
        test.assertEntityState(pigLoc, pigId, (entity) => entity.id !== undefined);
    });
})
    .structureName("ComponentTests:animal_pen")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "add_effect", (test) => {
    const villagerId = "minecraft:villager_v2<minecraft:ageable_grow_up>";
    const villagerLoc = { x: 1, y: 2, z: 1 };
    const villager = test.spawn(villagerId, villagerLoc);
    const duration = 20;
    villager.addEffect("poison", duration);
    test.assertEntityState(villagerLoc, villagerId, (entity) => entity.getEffect("poison")?.duration == duration);
    test.assertEntityState(villagerLoc, villagerId, (entity) => entity.getEffect("poison")?.amplifier == 1);
    test.runAfterDelay(duration, () => {
        test.assertEntityState(villagerLoc, villagerId, (entity) => entity.getEffect("poison") === undefined);
        test.succeed();
    });
})
    .structureName("ComponentTests:animal_pen")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "assert_entity_present", (test) => {
    const villagerId = "minecraft:villager_v2";
    const villagerLoc = { x: 1, y: 2, z: 3 };
    const emeraldItem = new ItemStack("emerald", 1);
    const emeraldItemLoc = { x: 3, y: 2, z: 3 };
    const minecartId = "minecraft:minecart";
    const minecartLoc = { x: 3, y: 2, z: 1 };
    const armorStandId = "minecraft:armor_stand";
    const armorStandLoc = { x: 1, y: 2, z: 1 };
    test.spawn(villagerId, villagerLoc);
    test.spawnItem(emeraldItem, { x: 3.5, y: 4.5, z: 3.5 });
    test.succeedWhen(() => {
        test.assertEntityPresent(villagerId, villagerLoc, 0, true);
        test.assertItemEntityPresent("emerald", emeraldItemLoc, 0, true);
        test.assertEntityPresent(armorStandId, armorStandLoc, 0, true);
        // Check all blocks surrounding the minecart
        for (let x = -1; x <= 1; x++) {
            for (let z = -1; z <= 1; z++) {
                let offsetLoc = { x: minecartLoc.x + x, y: minecartLoc.y, z: minecartLoc.z + z };
                if (x == 0 && z == 0) {
                    test.assertEntityPresent(minecartId, offsetLoc, 0, true);
                }
                else {
                    test.assertEntityPresent(minecartId, offsetLoc, 0, false);
                }
            }
        }
    });
}).tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "assert_entity_not_present", (test) => {
    const armorStandId = "minecraft:armor_stand";
    const pigId = "minecraft:pig";
    const armorStandLoc = { x: 1, y: 2, z: 1 };
    const airLoc = { x: 0, y: 2, z: 1 };
    try {
        test.assertEntityPresentInArea(armorStandId, false);
        // @ts-expect-error
        test.fail(); // this assert should throw
    }
    catch (e) { }
    try {
        test.assertEntityPresent(armorStandId, armorStandLoc, undefined, false);
        // @ts-expect-error
        test.fail(); // this assert should throw
    }
    catch (e) { }
    test.assertEntityPresent(armorStandId, airLoc, undefined, false);
    test.assertEntityPresentInArea(pigId, false);
    test.succeed();
})
    .structureName("APITests:armor_stand")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "assert_item_entity_count_is", (test) => {
    let oneItemLoc = { x: 3, y: 2, z: 1 };
    let fiveItemsLoc = { x: 1, y: 2, z: 1 };
    let noItemsLoc = { x: 2, y: 2, z: 1 };
    let diamondPickaxeLoc = { x: 2, y: 2, z: 4 };
    const oneEmerald = new ItemStack("emerald", 1);
    const onePickaxe = new ItemStack("diamondPickaxe", 1);
    const fiveEmeralds = new ItemStack("emerald", 5);
    test.spawnItem(oneEmerald, { x: 3.5, y: 3, z: 1.5 });
    test.spawnItem(fiveEmeralds, { x: 1.5, y: 3, z: 1.5 });
    // spawn 9 pickaxes in a 3x3 grid
    for (let x = 1.5; x <= 3.5; x++) {
        for (let z = 3.5; z <= 5.5; z++) {
            test.spawnItem(onePickaxe, { x: x, y: 3, z: z });
        }
    }
    test.assertItemEntityCountIs("emerald", noItemsLoc, 0, 0);
    test.succeedWhen(() => {
        test.assertItemEntityCountIs("feather", oneItemLoc, 0, 0);
        test.assertItemEntityCountIs("emerald", oneItemLoc, 0, 1);
        test.assertItemEntityCountIs("feather", fiveItemsLoc, 0, 0);
        test.assertItemEntityCountIs("emerald", fiveItemsLoc, 0, 5);
        test.assertItemEntityCountIs("emerald", fiveItemsLoc, 0, 5);
        test.assertItemEntityCountIs("diamondPickaxe", diamondPickaxeLoc, 1, 9);
        test.assertItemEntityCountIs("diamondPickaxe", diamondPickaxeLoc, 0, 1);
    });
}).tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "assert_entity_touching", (test) => {
    const armorStandId = "minecraft:armor_stand";
    test.assertEntityTouching(armorStandId, { x: 1.5, y: 2.5, z: 1.5 }, true);
    test.assertEntityTouching(armorStandId, { x: 1.5, y: 3.5, z: 1.5 }, true);
    test.assertEntityTouching(armorStandId, { x: 1.0, y: 2.5, z: 1.5 }, false);
    test.assertEntityTouching(armorStandId, { x: 2.0, y: 2.5, z: 1.5 }, false);
    test.assertEntityTouching(armorStandId, { x: 1.5, y: 2.5, z: 1.0 }, false);
    test.assertEntityTouching(armorStandId, { x: 1.5, y: 2.5, z: 2.0 }, false);
    test.succeed();
})
    .structureName("APITests:armor_stand")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "pulse_redstone", (test) => {
    const pulseLoc = { x: 1, y: 2, z: 2 };
    const lampLoc = { x: 1, y: 2, z: 1 };
    test.assertRedstonePower(lampLoc, 0);
    test.pulseRedstone(pulseLoc, 2);
    test
        .startSequence()
        .thenIdle(2)
        .thenExecute(() => test.assertRedstonePower(lampLoc, 15))
        .thenIdle(2)
        .thenExecute(() => test.assertRedstonePower(lampLoc, 0))
        .thenSucceed();
}).tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "block_location", (test) => {
    let testLoc = { x: 1, y: 1, z: 1 };
    let worldLoc = test.worldBlockLocation(testLoc);
    let relativeLoc = test.relativeBlockLocation(worldLoc);
    test.assert(!Vector.equals(relativeLoc, worldLoc), "Expected relativeLoc and worldLoc to be different");
    test.assert(Vector.equals(relativeLoc, testLoc), "Expected relativeLoc to match testLoc");
    test.succeed();
})
    .structureName("ComponentTests:platform")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "location", (test) => {
    let testLoc = { x: 1.2, y: 1.2, z: 1.2 };
    let worldLoc = test.worldLocation(testLoc);
    let relativeLoc = test.relativeLocation(worldLoc);
    test.assert(Vector.distance(relativeLoc, worldLoc) > 0.01, "Expected relativeLoc and worldLoc to be different");
    test.assert(Vector.distance(relativeLoc, testLoc) <= 0.01, "Expected relativeLoc to match testLoc");
    test.succeed();
})
    .structureName("ComponentTests:platform")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "create_explosion_basic", (test) => {
    const center = { x: 2, y: 3, z: 2 };
    test.assertBlockPresent("cobblestone", center, true);
    const loc = test.worldBlockLocation(center);
    const explosionLoc = { x: loc.x + 0.5, y: loc.y + 0.5, z: loc.z + 0.5 };
    test.getDimension().createExplosion(explosionLoc, 10);
    for (let x = 1; x <= 3; x++) {
        for (let y = 2; y <= 4; y++) {
            for (let z = 1; z <= 3; z++) {
                test.assertBlockPresent("cobblestone", { x: x, y: y, z: z }, false);
            }
        }
    }
    test.succeed();
})
    .padding(10) // The blast can destroy nearby items and mobs
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "create_explosion_advanced", (test) => {
    const dimension = test.getDimension();
    const center = { x: 3, y: 3, z: 3 };
    const pigId = "minecraft:pig<minecraft:ageable_grow_up>";
    const pigLoc = { x: 3, y: 4, z: 3 };
    test.spawn(pigId, pigLoc);
    const loc = test.worldBlockLocation(center);
    const explosionLoc = { x: loc.x + 0.5, y: loc.y + 0.5, z: loc.z + 0.5 };
    let explosionOptions = {};
    test.assertBlockPresent("cobblestone", center, true);
    // Start by exploding without breaking blocks
    explosionOptions.breaksBlocks = false;
    const creeper = test.spawn("minecraft:creeper", { x: 1, y: 2, z: 1 });
    explosionOptions.source = creeper;
    test.assertEntityPresent(pigId, pigLoc, undefined, true);
    dimension.createExplosion(explosionLoc, 10, explosionOptions);
    creeper.kill();
    test.assertEntityPresent(pigId, pigLoc, undefined, false);
    test.assertBlockPresent("cobblestone", center, true);
    // Next, explode with fire
    explosionOptions = {};
    explosionOptions.causesFire = true;
    let findFire = () => {
        let foundFire = false;
        for (let x = 0; x <= 6; x++) {
            for (let z = 0; z <= 6; z++) {
                try {
                    test.assertBlockPresent("fire", { x: x, y: 3, z: z }, true);
                    foundFire = true;
                    break;
                }
                catch (e) { }
            }
        }
        return foundFire;
    };
    test.assert(!findFire(), "Unexpected fire");
    dimension.createExplosion(explosionLoc, 15, explosionOptions);
    test.assertBlockPresent("cobblestone", center, false);
    test.assert(findFire(), "No fire found");
    // Finally, explode in water
    explosionOptions.allowUnderwater = true;
    const belowWaterLoc = { x: 3, y: 1, z: 3 };
    test.assertBlockPresent("air", belowWaterLoc, false);
    dimension.createExplosion(explosionLoc, 10, explosionOptions);
    test.assertBlockPresent("air", belowWaterLoc, true);
    test.succeed();
})
    .padding(10) // The blast can destroy nearby items and mobs
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "triggerEvent", (test) => {
    const creeper = test.spawn("creeper", { x: 1, y: 2, z: 1 });
    creeper.triggerEvent("minecraft:start_exploding_forced");
    test.succeedWhen(() => {
        test.assertEntityPresentInArea("creeper", false);
    });
})
    .structureName("ComponentTests:glass_cage")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "chat", (test) => {
    test.print("subscribing");
    const chatCallback = world.beforeEvents.chatSend.subscribe((eventData) => {
        if (eventData.message === "!killme") {
            eventData.sender.kill();
            eventData.cancel = true;
        }
        else if (eventData.message === "!players") {
            test.print(`There are ${eventData.targets?.length} players in the server.`);
            for (const target of eventData.targets) {
                test.print("Player: " + target.name);
            }
        }
        else {
            // eventData.message = `Modified '${eventData.message}'`;
            test.assert(false, "The chatSend beforeEvent now longer allows editing the message property.");
        }
    });
    test
        .startSequence()
        .thenIdle(200)
        .thenExecute(() => {
        world.beforeEvents.chatSend.unsubscribe(chatCallback);
        test.print("unsubscribed");
    })
        .thenSucceed();
})
    .structureName("ComponentTests:platform")
    .maxTicks(1000)
    .tag(GameTest.Tags.suiteDisabled);
GameTest.register("APITests", "add_effect_event", (test) => {
    const villagerId = "minecraft:villager_v2<minecraft:ageable_grow_up>";
    const villager = test.spawn(villagerId, { x: 1, y: 2, z: 1 });
    const pigId = "minecraft:pig<minecraft:ageable_grow_up>";
    const pig = test.spawn(pigId, { x: 1, y: 2, z: 1 });
    let basicEffectSucceed = false;
    let filteredEntityEffectSucceed = false;
    let filteredTypeEffectSucceed = false;
    const effectAddCallback = world.afterEvents.effectAdd.subscribe((eventData) => {
        if (eventData.entity.id === "minecraft:villager_v2") {
            test.assert(eventData.effect.displayName === "Poison II", "Unexpected display name");
            // test.assert(eventData.effectState === 1, "Unexpected effect state");
            basicEffectSucceed = true;
            if (filteredEntityEffectSucceed && basicEffectSucceed && filteredTypeEffectSucceed)
                test.succeed();
        }
    });
    let specificEntityOptions = {
        entities: [villager],
    };
    const effectEntityFilterAddCallback = world.afterEvents.effectAdd.subscribe((eventData) => {
        test.assert(eventData.entity.id === "minecraft:villager_v2", "Unexpected id");
        test.assert(eventData.effect.displayName === "Poison II", "Unexpected display name");
        // test.assert(eventData.effectState === 1, "Unexpected effect state");
        filteredEntityEffectSucceed = true;
        if (filteredEntityEffectSucceed && basicEffectSucceed && filteredTypeEffectSucceed)
            test.succeed();
    }, specificEntityOptions);
    let entityTypeOptions = {
        entityTypes: ["minecraft:villager_v2"],
    };
    const effectTypeFilterAddCallback = world.afterEvents.effectAdd.subscribe((eventData) => {
        test.assert(eventData.entity.id === "minecraft:villager_v2", "Unexpected id");
        test.assert(eventData.effect.displayName === "Poison II", "Unexpected display name");
        // test.assert(eventData.effectState === 1, "Unexpected effect state");
        filteredTypeEffectSucceed = true;
        if (filteredEntityEffectSucceed && basicEffectSucceed && filteredTypeEffectSucceed)
            test.succeed();
    }, entityTypeOptions);
    villager.addEffect("poison", 5);
    pig.addEffect("poison", 5);
    world.afterEvents.effectAdd.unsubscribe(effectAddCallback);
    world.afterEvents.effectAdd.unsubscribe(effectEntityFilterAddCallback);
    world.afterEvents.effectAdd.unsubscribe(effectTypeFilterAddCallback);
})
    .structureName("ComponentTests:animal_pen")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "piston", (test) => {
    const dimension = test.getDimension();
    const pistonLoc = { x: 1, y: 2, z: 1 };
    const redstoneLoc = { x: 1, y: 2, z: 0 };
    const pistonComp = test.getDimension().getBlock(test.worldBlockLocation(pistonLoc))?.getComponent("piston");
    test.assert(pistonComp != undefined, "Expected piston component");
    let assertPistonState = (isMoving, isExpanded, isExpanding, isRetracted, isRetracting) => {
        test.assert(pistonComp?.isMoving === isMoving, `Unexpected isMoving, expected[${isMoving}] actual[${pistonComp?.isMoving}]`);
        test.assert((pistonComp?.state == BlockPistonState.Expanded) === isExpanded, `Unexpected isExpanded, expected[${isExpanded}] actual[${(pistonComp?.state == BlockPistonState.Expanded)}]`);
        test.assert((pistonComp?.state == BlockPistonState.Expanding) === isExpanding, `Unexpected isExpanding, expected[${isExpanding}] actual[${(pistonComp?.state == BlockPistonState.Expanding)}]`);
        test.assert((pistonComp?.state == BlockPistonState.Retracted) === isRetracted, `Unexpected isRetracted, expected[${isRetracted}] actual[${(pistonComp?.state == BlockPistonState.Retracted)}]`);
        test.assert((pistonComp?.state == BlockPistonState.Retracting) === isRetracting, `Unexpected isRetracting, expected[${isRetracting}] actual[${(pistonComp?.state == BlockPistonState.Retracting)}]`);
    };
    test
        .startSequence()
        .thenExecute(() => {
        test.assert(pistonComp?.getAttachedBlocks().length === 0, "Expected 0 attached blocks");
        assertPistonState(false, false, false, true, false); // isRetracted
        test.setBlockType("redstoneBlock", redstoneLoc);
    })
        .thenIdle(3)
        .thenExecute(() => {
        test.assert(pistonComp?.getAttachedBlocks().length === 3, `Expected 3 attached blocks, actual [${pistonComp?.getAttachedBlocks().length}]`);
        assertPistonState(true, false, true, false, false); // isMoving, isExpanding
    })
        .thenIdle(2)
        .thenExecute(() => {
        assertPistonState(false, true, false, false, false); // isExpanded
        test.setBlockType("air", redstoneLoc);
    })
        .thenIdle(3)
        .thenExecute(() => {
        assertPistonState(true, false, false, false, true); // isMoving, isRetracting
    })
        .thenIdle(2)
        .thenExecute(() => {
        assertPistonState(false, false, false, true, false); // isRetracted
    })
        .thenSucceed();
}).tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "piston_event", (test) => {
    let expanded = false;
    let retracted = false;
    const redstoneLoc = { x: 1, y: 2, z: 0 };
    const pistonLoc = { x: 1, y: 2, z: 1 };
    const planksLoc = { x: 2, y: 2, z: 1 };
    const pistonCallback = world.afterEvents.pistonActivate.subscribe((pistonEvent) => {
        test.assert(pistonEvent.piston !== undefined, "Expected piston");
        if (Vector.equals(pistonEvent.piston.block.location, test.worldBlockLocation(pistonLoc))) {
            if (pistonEvent.isExpanding) {
                expanded = true;
            }
            else {
                retracted = true;
            }
        }
    });
    test
        .startSequence()
        .thenExecute(() => {
        test.pulseRedstone(redstoneLoc, 2);
    })
        .thenExecuteAfter(8, () => {
        test.assertBlockPresent("air", planksLoc, true);
        test.assert(expanded, "Expected piston expanding event");
        test.assert(retracted, "Expected piston retracting event");
        world.afterEvents.pistonActivate.unsubscribe(pistonCallback);
    })
        .thenSucceed();
})
    .structureName("APITests:piston")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "piston_event_canceled", (test) => {
    throw new Error("This feature tested gametest is no longer available in the game, the piston activate beforeEvent has been removed.");
    /*
    let canceled = false;
    const redstoneLoc = { x: 1, y: 2, z: 0 };
    const pistonLoc = { x: 1, y: 2, z: 1 };
    const planksLoc = { x: 2, y: 2, z: 1 };
  
    const pistonCallback = world.beforeEvents.PistonActivate.subscribe((pistonEvent) => {
      test.assert(pistonEvent.piston !== undefined, "Expected piston");
      if (pistonEvent.piston.location.equals(test.worldBlockLocation(pistonLoc))) {
        pistonEvent.cancel = true;
        canceled = true;
      }
    });
  
    test
      .startSequence()
      .thenExecute(() => {
        test.pulseRedstone(redstoneLoc, 2);
      })
      .thenExecuteAfter(8, () => {
        test.assert(canceled, "Expected canceled beforePistonActivate event");
        test.assertBlockPresent("planks", planksLoc, true);
        world.beforeEvents.PistonActivate.unsubscribe(pistonCallback);
      })
      .thenSucceed();*/
})
    .structureName("APITests:piston")
    .tag(GameTest.Tags.suiteDefault);
GameTest.registerAsync("APITests", "lever_event", async (test) => {
    const leverLoc = { x: 1, y: 2, z: 1 };
    let leverPower = false;
    const leverCallback = world.afterEvents.leverAction.subscribe((leverEvent) => {
        let blockLoc = test.relativeBlockLocation(leverEvent.block.location);
        test.assert(Vector.equals(blockLoc, leverLoc), "Expected lever present in leverLoc");
        test.assert(!leverEvent.player, "Expected player object to be empty");
        test.assert(leverEvent.dimension === test.getDimension(), "Unexpected dimension");
        leverPower = leverEvent.isPowered;
    });
    test.setBlockType("lever", leverLoc);
    await test.idle(5);
    test.pullLever(leverLoc);
    world.afterEvents.leverAction.unsubscribe(leverCallback);
    test.assert(leverPower, "Expected lever power");
    test.succeed();
})
    .structureName("ComponentTests:platform")
    .tag(GameTest.Tags.suiteDefault);
GameTest.registerAsync("APITests", "lever_event_multiple_toggles", async (test) => {
    const leverLoc = { x: 1, y: 2, z: 1 };
    let leverPower = false;
    const leverCallback = world.afterEvents.leverAction.subscribe((leverEvent) => {
        let blockLoc = test.relativeBlockLocation(leverEvent.block.location);
        test.assert(Vector.equals(blockLoc, leverLoc), "Expected lever present in leverLoc");
        test.assert(!leverEvent.player, "Expected player object to be empty");
        test.assert(leverEvent.dimension === test.getDimension(), "Unexpected dimension");
        leverPower = leverEvent.isPowered;
    });
    test.setBlockType("lever", leverLoc);
    await test.idle(5);
    test.pullLever(leverLoc);
    test.assert(leverPower, "Expected lever power");
    test.pullLever(leverLoc);
    test.assert(!leverPower, "Expected no lever power");
    world.afterEvents.leverAction.unsubscribe(leverCallback);
    test.succeed();
})
    .structureName("ComponentTests:platform")
    .tag(GameTest.Tags.suiteDefault);
GameTest.registerAsync("APITests", "lever_event_player", async (test) => {
    const leverLoc = { x: 1, y: 2, z: 1 };
    let eventPlayer;
    let testSucceed = false;
    const leverCallback = world.afterEvents.leverAction.subscribe((leverEvent) => {
        eventPlayer = leverEvent.player;
        test.assert(eventPlayer == simulatedPlayer, "incorrect player found");
        let blockLoc = test.relativeBlockLocation(leverEvent.block.location);
        test.assert(Vector.equals(blockLoc, leverLoc), "Expected lever present in leverLoc");
        test.assert(leverEvent.dimension === test.getDimension(), "Unexpected dimension");
        test.assert(eventPlayer.name === "Lever_Toggle_Player", "Lever event's player name does not match expected");
        testSucceed = true;
    });
    test.setBlockType("lever", leverLoc);
    const simulatedPlayer = test.spawnSimulatedPlayer({ x: 2, y: 2, z: 1 }, "Lever_Toggle_Player");
    await test.idle(5);
    simulatedPlayer.interactWithBlock(leverLoc);
    world.afterEvents.leverAction.unsubscribe(leverCallback);
    test.assert(testSucceed, "An assert failure occurred during callback");
    test.succeed();
})
    .structureName("ComponentTests:platform")
    .tag(GameTest.Tags.suiteDefault);
/**
 * @todo
 */
/* GameTest.registerAsync("APITests", "button_event", async (test) => {
  const buttonLoc = { x: 1, y: 2, z: 1 };
  const buttonPermutation = "acaciaButton".createDefaultBlockPermutation();
  let testSucceed = false;

  buttonPermutation.getProperty(BlockProperties.facingDirection).value = Direction.up;

  const buttonCallback = world.afterEvents.buttonPush.subscribe((buttonEvent) => {
    let blockLoc = test.relativeBlockLocation(buttonEvent.block.location);
    if (Vector.equals(blockLoc, buttonLoc)) {
      test.assert(buttonEvent.source === undefined, "Script source should be null");
      test.assert(buttonEvent.dimension === test.getDimension(), "Unexpected dimension");
      test.assert(!testSucceed, "Callback expected only once");
      testSucceed = true;
    }
  });

  test.setBlockPermutation(buttonPermutation, buttonLoc);
  test.pressButton(buttonLoc);
  world.afterEvents.buttonPush.unsubscribe(buttonCallback);
  test.assert(testSucceed, "An assert failure occurred during callback");
  test.succeed();
})
  .structureName("ComponentTests:platform")
  .tag(GameTest.Tags.suiteDefault);

GameTest.registerAsync("APITests", "button_event_player", async (test) => {
  const buttonLoc = { x: 1, y: 2, z: 1 };
  const buttonPermutation = "acaciaButton".createDefaultBlockPermutation();
  let testSucceed = false;

  buttonPermutation.getProperty(BlockProperties.facingDirection).value = Direction.up;

  const buttonCallback = world.afterEvents.buttonPush.subscribe((buttonEvent) => {
    let eventPlayer = buttonEvent.source;
    let blockLoc = test.relativeBlockLocation(buttonEvent.block.location);
    if (Vector.equals(blockLoc, buttonLoc) && eventPlayer == simulatedPlayer) {
      test.assert(buttonEvent.dimension === test.getDimension(), "Unexpected dimension");
      test.assert(eventPlayer.name === "Button_Push_Player", "Button event's player name does not match expected");
      test.assert(buttonEvent.source === eventPlayer, "Button event's source does not match expected");
      test.assert(!testSucceed, "Callback expected only once");
      testSucceed = true;
    }
  });

  const simulatedPlayer = test.spawnSimulatedPlayer({ x: 2, y: 2, z: 1 }, "Button_Push_Player");
  await test.idle(5);
  test.setBlockPermutation(buttonPermutation, buttonLoc);
  simulatedPlayer.interactWithBlock(buttonLoc);
  world.afterEvents.buttonPush.unsubscribe(buttonCallback);
  test.assert(testSucceed, "An assert failure occurred during callback");
  test.succeed();
})
  .structureName("ComponentTests:platform")
  .tag(GameTest.Tags.suiteDefault); */
/**
 * @todo
 */
/* GameTest.registerAsync("APITests", "button_event_projectile", async (test) => {
  const buttonLoc = { x: 1, y: 2, z: 1 };
  const buttonPermutation = "acaciaButton".createDefaultBlockPermutation();
  let testSucceed = false;
  let spawnedArrow;

  buttonPermutation.getProperty(BlockProperties.facingDirection).value = Direction.up;

  const buttonCallback = world.afterEvents.buttonPush.subscribe((buttonEvent) => {
    let blockLoc = test.relativeBlockLocation(buttonEvent.block.location);
    if (Vector.equals(blockLoc, buttonLoc)) {
      test.assert(buttonEvent.dimension === test.getDimension(), "Unexpected dimension");
      test.assert(buttonEvent.source === spawnedArrow, "Expected arrow source type");
      test.assert(!testSucceed, "Callback expected only once");
      testSucceed = true;
    }
  });

  test.setBlockPermutation(buttonPermutation, buttonLoc);
  spawnedArrow = test.spawnAtLocation("minecraft:arrow", { x: 1.5, y: 2.5, z: 1.5 });
  await test.idle(20); //give the arrow time to fall
  world.afterEvents.buttonPush.unsubscribe(buttonCallback);
  test.assert(testSucceed, "An assert failure occurred during callback");
  test.succeed();
})
  .structureName("ComponentTests:platform")
  .tag(GameTest.Tags.suiteDefault); */
GameTest.register("APITests", "sneaking", (test) => {
    const pigId = "minecraft:pig<minecraft:ageable_grow_up>";
    const pigLoc = { x: 1, y: 2, z: 1 };
    const pig = test.spawn(pigId, pigLoc);
    pig.isSneaking = true;
    test
        .startSequence()
        .thenExecuteAfter(120, () => {
        test.assertEntityPresent(pigId, pigLoc, 0, true);
    })
        .thenSucceed();
})
    .maxTicks(130)
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "assert_can_reach_location", (test) => {
    const villagerId = "minecraft:villager_v2<minecraft:ageable_grow_up>";
    const villager1 = test.spawn(villagerId, { x: 1, y: 2, z: 1 });
    const villager2 = test.spawn(villagerId, { x: 1, y: 2, z: 3 });
    const villager3 = test.spawn(villagerId, { x: 1, y: 2, z: 5 });
    test.assertCanReachLocation(villager1, { x: 4, y: 2, z: 1 }, true);
    test.assertCanReachLocation(villager2, { x: 4, y: 2, z: 3 }, false);
    test.assertCanReachLocation(villager3, { x: 4, y: 2, z: 5 }, false);
    test.succeed();
}).tag(GameTest.Tags.suiteDefault);
const isLocationInTest = (test, worldLoc) => {
    const size = 4;
    let loc = test.relativeBlockLocation(worldLoc);
    return loc.x >= 0 && loc.y >= 0 && loc.z >= 0 && loc.x < size && loc.y < size && loc.z < size;
};
GameTest.register("APITests", "explosion_event", (test) => {
    let exploded = false;
    const cobblestoneLoc = { x: 1, y: 3, z: 1 };
    const polishedAndesiteLoc = { x: 1, y: 1, z: 1 };
    const beforeExplosionCallback = world.beforeEvents.explosion.subscribe((explosionEvent) => {
        if (!isLocationInTest(test, explosionEvent.getImpactedBlocks()[0]))
            return;
        test.assert(explosionEvent.dimension !== undefined, "Expected dimension");
        test.assert(explosionEvent.source !== undefined, "Expected source");
        test.assert(explosionEvent.getImpactedBlocks().length === 10, "Unexpected number of impacted blocks");
        test.assertBlockPresent("cobblestone", cobblestoneLoc, true);
        explosionEvent.setImpactedBlocks([explosionEvent.dimension.getBlock(test.worldBlockLocation(cobblestoneLoc))]);
    });
    const explosionCallback = world.afterEvents.explosion.subscribe((explosionEvent) => {
        test.assert(explosionEvent.dimension !== undefined, "Expected dimension");
        test.assert(explosionEvent.source !== undefined, "Expected source");
        test.assert(explosionEvent.getImpactedBlocks().length === 1, "Unexpected number of impacted blocks");
        exploded = true;
    });
    test
        .startSequence()
        .thenExecute(() => {
        test.setBlockType("cobblestone", cobblestoneLoc);
        test.spawn("tnt", { x: 1, y: 2, z: 1 });
    })
        .thenExecuteAfter(85, () => {
        test.assert(exploded, "Expected explosion event");
        test.assertBlockPresent("stone", polishedAndesiteLoc, true);
        test.assertBlockPresent("cobblestone", cobblestoneLoc, false);
        world.beforeEvents.explosion.unsubscribe(beforeExplosionCallback);
        world.afterEvents.explosion.unsubscribe(explosionCallback);
    })
        .thenSucceed();
})
    .padding(10) // The blast can destroy nearby items and mobs
    .structureName("ComponentTests:platform")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "explosion_event_canceled", (test) => {
    let canceled = false;
    const cobblestoneLoc = { x: 1, y: 3, z: 1 };
    const explosionCallback = world.beforeEvents.explosion.subscribe((explosionEvent) => {
        if (!isLocationInTest(test, explosionEvent.getImpactedBlocks()[0]))
            return;
        test.assert(explosionEvent.dimension !== undefined, "Expected dimension");
        test.assert(explosionEvent.source !== undefined, "Expected source");
        test.assert(explosionEvent.getImpactedBlocks().length === 10, "Unexpected number of impacted blocks");
        explosionEvent.cancel = true;
        canceled = true;
    });
    test
        .startSequence()
        .thenExecute(() => {
        test.setBlockType("cobblestone", cobblestoneLoc);
        test.spawn("tnt", { x: 1, y: 2, z: 1 });
    })
        .thenExecuteAfter(85, () => {
        test.assert(canceled, "Expected canceled beforeExplosionEvent event");
        test.assertBlockPresent("cobblestone", cobblestoneLoc, true);
        world.beforeEvents.explosion.unsubscribe(explosionCallback);
    })
        .thenSucceed();
})
    .padding(10) // The blast can destroy nearby items and mobs
    .structureName("ComponentTests:platform")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "explode_block_event", (test) => {
    let explodedCount = 0;
    const cobblestoneLoc = { x: 1, y: 3, z: 1 };
    const blockExplodeCallback = world.afterEvents.blockExplode.subscribe((blockExplodeEvent) => {
        if (!isLocationInTest(test, blockExplodeEvent.block.location))
            return;
        test.assert(blockExplodeEvent.source !== undefined, "Expected source");
        explodedCount++;
    });
    test
        .startSequence()
        .thenExecute(() => {
        test.setBlockType("cobblestone", cobblestoneLoc);
        test.spawn("tnt", { x: 1, y: 2, z: 1 });
    })
        .thenExecuteAfter(85, () => {
        test.assert(explodedCount === 10, "Unexpected number of exploded blocks");
        world.afterEvents.blockExplode.unsubscribe(blockExplodeCallback);
    })
        .thenSucceed();
})
    .padding(10) // The blast can destroy nearby items and mobs
    .structureName("ComponentTests:platform")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "connectivity", (test) => {
    const centerLoc = { x: 1, y: 2, z: 1 };
    let connectivity = test.getFenceConnectivity(centerLoc);
    test.assert(!connectivity.north, "The stair is not oriented the right way to connect");
    test.assert(connectivity.east, "Should connect to another fence");
    test.assert(connectivity.south, "Should connect to another fence");
    test.assert(connectivity.west, "Should connect to the back of the stairs");
    test.succeed();
})
    .rotateTest(true)
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "spawn_at_location", (test) => {
    const spawnLoc = { x: 1.3, y: 2, z: 1.3 };
    const chicken = test.spawnAtLocation("chicken", spawnLoc);
    test
        .startSequence()
        .thenExecute(() => {
        const chickenLoc = chicken.location;
        const relativeChickenLoc = test.relativeLocation(chickenLoc);
        test.assert(Vector.distance(relativeChickenLoc, spawnLoc) <= 0.01, "Unexpected spawn location");
    })
        .thenSucceed();
})
    .structureName("ComponentTests:animal_pen")
    .rotateTest(true)
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "walk_to_location", (test) => {
    const spawnLoc = { x: 1, y: 2, z: 1 };
    const chicken = test.spawnWithoutBehaviors("chicken", spawnLoc);
    const targetLoc = { x: 2.2, y: 2, z: 3.2 };
    test.walkToLocation(chicken, targetLoc, 1);
    test.succeedWhen(() => {
        const chickenLoc = chicken.location;
        const relativeChickenLoc = test.relativeLocation(chickenLoc);
        // Mobs will stop navigating as soon as they intersect the target location
        test.assert(Vector.distance(relativeChickenLoc, targetLoc) <= 0.65, "Chicken did not reach the target location");
    });
})
    .structureName("ComponentTests:large_animal_pen")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "walk_to_location_far", (test) => {
    const targetLoc = { x: 3, y: 2, z: 17 };
    const zombie = test.spawnWithoutBehaviors("minecraft:zombie<minecraft:ageable_grow_up>", { x: 1, y: 2, z: 1 });
    test.walkTo(zombie, targetLoc);
    test.succeedWhen(() => {
        test.assertRedstonePower(targetLoc, 15);
    });
})
    .maxTicks(400)
    .tag(GameTest.Tags.suiteDefault);
/**
 * @todo
 */
/*
GameTest.register("APITests", "spread_from_face_toward_direction", (test) => {
  const testEx = new GameTestExtensions(test);

  let multifaceLoc = { x: 1, y: 4, z: 0 };
  let spreadLoc = { x: 1, y: 3, z: 0 };

  const glowLichenPermutation = "glowLichen".createDefaultBlockPermutation();
  glowLichenPermutation.getProperty(BlockProperties.multiFaceDirectionBits).value =
    1 << testEx.getMultiFaceDirection(test.getTestDirection());
  test.setBlockPermutation(glowLichenPermutation, multifaceLoc);

  test.assertBlockPresent("glowLichen", multifaceLoc, true);
  test.assertBlockPresent("glowLichen", spreadLoc, false);

  test.spreadFromFaceTowardDirection(multifaceLoc, test.getTestDirection(), Direction.down);
  test
    .startSequence()
    .thenExecuteAfter(1, () => {
      test.assertBlockPresent("glowLichen", spreadLoc, true);
    })
    .thenSucceed();
})
  .rotateTest(true)
  .tag(GameTest.Tags.suiteDefault);

GameTest.register("APITests", "rotate_direction", (test) => {
  test.assert(
    test.rotateDirection(Direction.South) == test.getTestDirection(),
    "Expected rotated south direction to match test direction"
  );

  switch (test.getTestDirection()) {
    case Direction.North:
      test.assert(
        test.rotateDirection(Direction.North) === Direction.South,
        "Unexpected rotated direction for Direction.North with testDirection Direction.North"
      );
      test.assert(
        test.rotateDirection(Direction.East) === Direction.West,
        "Unexpected rotated direction for Direction.East with testDirection Direction.North"
      );
      test.assert(
        test.rotateDirection(Direction.South) === Direction.North,
        "Unexpected rotated direction for Direction.South with testDirection Direction.North"
      );
      test.assert(
        test.rotateDirection(Direction.West) === Direction.East,
        "Unexpected rotated direction for Direction.West with testDirection Direction.North"
      );
      break;
    case Direction.East:
      test.assert(
        test.rotateDirection(Direction.North) === Direction.West,
        "Unexpected rotated direction for Direction.North with testDirection Direction.East"
      );
      test.assert(
        test.rotateDirection(Direction.East) === Direction.North,
        "Unexpected rotated direction for Direction.East with testDirection Direction.East"
      );
      test.assert(
        test.rotateDirection(Direction.South) === Direction.East,
        "Unexpected rotated direction for Direction.South with testDirection Direction.East"
      );
      test.assert(
        test.rotateDirection(Direction.West) === Direction.South,
        "Unexpected rotated direction for Direction.West with testDirection Direction.East"
      );
      break;
    case Direction.South:
      test.assert(
        test.rotateDirection(Direction.North) === Direction.North,
        "Unexpected rotated direction for Direction.North with testDirection Direction.South"
      );
      test.assert(
        test.rotateDirection(Direction.East) === Direction.East,
        "Unexpected rotated direction for Direction.East with testDirection Direction.South"
      );
      test.assert(
        test.rotateDirection(Direction.South) === Direction.South,
        "Unexpected rotated direction for Direction.South with testDirection Direction.South"
      );
      test.assert(
        test.rotateDirection(Direction.West) === Direction.West,
        "Unexpected rotated direction for Direction.West with testDirection Direction.South"
      );
      break;
    case Direction.West:
      test.assert(
        test.rotateDirection(Direction.North) === Direction.East,
        "Unexpected rotated direction for Direction.North with testDirection Direction.West"
      );
      test.assert(
        test.rotateDirection(Direction.East) === Direction.South,
        "Unexpected rotated direction for Direction.East with testDirection Direction.West"
      );
      test.assert(
        test.rotateDirection(Direction.South) === Direction.West,
        "Unexpected rotated direction for Direction.South with testDirection Direction.West"
      );
      test.assert(
        test.rotateDirection(Direction.West) === Direction.North,
        "Unexpected rotated direction for Direction.West with testDirection Direction.West"
      );
      break;
    default:
      test.assert(false, "Invalid test direction");
  }

  const buttonLoc = { x: 1, y: 2, z: 1 };
  const buttonPermutation = "stoneButton".createDefaultBlockPermutation();
  buttonPermutation.getProperty(BlockProperties.facingDirection).value = test.rotateDirection(Direction.North);
  test.setBlockPermutation(buttonPermutation, buttonLoc);

  test
    .startSequence()
    .thenExecuteAfter(2, () => {
      test.assertBlockPresent("stoneButton", buttonLoc, true);
    })
    .thenSucceed();
})
  .rotateTest(true)
  .tag(GameTest.Tags.suiteDefault);*/
function isNear(a, b, epsilon = 0.001) {
    return Math.abs(a - b) < epsilon;
}
function isNearVec(a, b, epsilon = 0.001) {
    return mcMath.Vector3Utils.distance(a, b) < epsilon;
}
GameTest.register("APITests", "cauldron", (test) => {
    const loc = { x: 0, y: 1, z: 0 };
    var block = test.getBlock(loc);
    test.setFluidContainer(loc, FluidType.Water);
    test.assert(block.getComponent("fluid_container")?.getFluidType() != FluidType.Water, "This is a water container");
    test.assert(block.getComponent("fluid_container")?.getFluidType() == FluidType.Lava, "A water container should not have the Lava FluidType");
    test.assert(block.getComponent("fluid_container")?.getFluidType() == FluidType.PowderSnow, "A water container should not have the PowderSnow FluidType");
    test.assert(block.getComponent("fluid_container")?.getFluidType() == FluidType.Potion, "A water container should not have the Potion FluidType");
    block.getComponent("fluid_container").fillLevel = FluidContainer.maxFillLevel;
    test.assert(block.getComponent("fluid_container")?.fillLevel == FluidContainer.maxFillLevel, "The fill level should match with what it was set to");
    block.getComponent("fluid_container").fluidColor = { red: 1, green: 0, blue: 0, alpha: 1 };
    test.assert(block.getComponent("fluid_container")?.fluidColor.red == 1, "red component should be set");
    test.assert(block.getComponent("fluid_container")?.fluidColor.green == 0, "green component should be set");
    test.assert(block.getComponent("fluid_container")?.fluidColor.blue == 0, "blue component should be set");
    test.assert(block.getComponent("fluid_container")?.fluidColor.alpha == 0, "alpha component should be set");
    block.getComponent("fluid_container").addDye(ItemTypes.get("blue_dye"));
    test.assert(isNear(block.getComponent("fluid_container")?.fluidColor.red, 0.616), "red component should be set");
    test.assert(isNear(block.getComponent("fluid_container")?.fluidColor.green, 0.133), "green component should be set");
    test.assert(isNear(block.getComponent("fluid_container")?.fluidColor.blue, 0.333), "blue component should be set");
    // test.assert(isNear(block.getComponent("fluid_container")?.fluidColor.alpha, 1), "alpha component should be set");
    test.setFluidContainer(loc, FluidType.Lava);
    test.assert(block.getComponent("fluid_container")?.getFluidType() == FluidType.Water, "A water container should not have the Water FluidType");
    test.assert(block.getComponent("fluid_container")?.getFluidType() != FluidType.Lava, "This is a lava component");
    test.assert(block.getComponent("fluid_container")?.getFluidType() == FluidType.PowderSnow, "A water container should not have the PowderSnow FluidType");
    test.assert(block.getComponent("fluid_container")?.getFluidType() == FluidType.Potion, "A water container should not have the Potion FluidType");
    test.setFluidContainer(loc, FluidType.PowderSnow);
    test.assert(block.getComponent("fluid_container")?.getFluidType() == FluidType.Water, "A water container should not have the Water FluidType");
    test.assert(block.getComponent("fluid_container")?.getFluidType() == FluidType.Lava, "A water container should not have the Lava FluidType");
    test.assert(block.getComponent("fluid_container")?.getFluidType() != FluidType.PowderSnow, "This is a PowderSnow component");
    test.assert(block.getComponent("fluid_container")?.getFluidType() == FluidType.Potion, "A water container should not have the Potion FluidType");
    test.setFluidContainer(loc, FluidType.Potion);
    test.assert(block.getComponent("fluid_container")?.getFluidType() == FluidType.Water, "A water container should not have the Water FluidType");
    test.assert(block.getComponent("fluid_container")?.getFluidType() == FluidType.Lava, "A water container should not have the Lava FluidType");
    test.assert(block.getComponent("fluid_container")?.getFluidType() == FluidType.PowderSnow, "A water container should not have the PowderSnow FluidType");
    test.assert(block.getComponent("fluid_container")?.getFluidType() != FluidType.Potion, "This is a Potion component");
    test.succeed();
}).tag(GameTest.Tags.suiteDefault);
// test for bug: 678331
GameTest.register("APITests", "cauldron_nocrash", (test) => {
    const loc = { x: 0, y: 1, z: 0 };
    var block = test.getBlock(loc);
    test.setBlockType("air", loc);
    test.setBlockType("cauldron", loc);
    test.setFluidContainer(loc, FluidType.Potion);
    let cauldron = block.getComponent("fluid_container");
    cauldron.fillLevel = 2;
    const poisonPotion = ItemStack.createPotion({ effect: "poison", liquid: "splash" });
    cauldron.setPotion(poisonPotion); //this line crashes the title
    test.succeed();
})
    .structureName("APITests:cauldron")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "jukebox", (test) => {
    var jukeboxBlock = test.getBlock({ x: 0, y: 1, z: 0 });
    var musicPlayerComp = jukeboxBlock.getComponent("record_player");
    try {
        musicPlayerComp.setRecord("apple");
        test.fail("An exception should be thrown when playing an item that is not a music disk");
    }
    catch (e) { }
    test.assert(musicPlayerComp.isPlaying() === false, "Should be stopped");
    musicPlayerComp.setRecord("musicDiscMellohi");
    test.assert(musicPlayerComp.isPlaying() === true, "Should be playing");
    test
        .startSequence()
        .thenExecuteAfter(20, () => {
        test.assert(musicPlayerComp.isPlaying() === true, "Disk should not be finished yet");
        musicPlayerComp.ejectRecord();
        test.assert(musicPlayerComp.isPlaying() === false, "Disk should be stopped now");
    })
        .thenSucceed();
})
    .maxTicks(25)
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "maybe_fill_cauldron", (test) => {
    test
        .startSequence()
        .thenExecute(() => {
        test.triggerInternalBlockEvent({ x: 1, y: 3, z: 1 }, "minecraft:drip");
        test.triggerInternalBlockEvent({ x: 3, y: 3, z: 1 }, "minecraft:drip");
    })
        .thenIdle(61)
        .thenExecute(() => {
        var waterCauldron = test.getBlock({ x: 3, y: 2, z: 1 });
        var lavaCauldron = test.getBlock({ x: 1, y: 2, z: 1 });
        test.assert(waterCauldron.getComponent("fluid_container").fillLevel == 2, "Expected water to be at level 2, but got " + waterCauldron.getComponent("fluid_container").fillLevel);
        test.assert(lavaCauldron.getComponent("fluid_container").fillLevel == FluidContainer.maxFillLevel, "Expected lava to be full, but got a fill level of " + lavaCauldron.getComponent("fluid_container").fillLevel);
    })
        .thenSucceed();
})
    .setupTicks(30) // time it takes lava to flow.
    .maxTicks(100)
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "grow_pointed_dripstone", (test) => {
    test.triggerInternalBlockEvent({ x: 1, y: 5, z: 1 }, "grow_stalagtite");
    test.assertBlockPresent("pointedDripstone", { x: 1, y: 4, z: 1 }, true);
    test.assertBlockPresent("pointedDripstone", { x: 1, y: 2, z: 1 }, false);
    test.triggerInternalBlockEvent({ x: 1, y: 5, z: 1 }, "grow_stalagmite");
    test.assertBlockPresent("pointedDripstone", { x: 1, y: 4, z: 1 }, true);
    test.assertBlockPresent("pointedDripstone", { x: 1, y: 2, z: 1 }, true);
    test.assertBlockPresent("pointedDripstone", { x: 1, y: 3, z: 1 }, false);
    test.succeed();
}).tag(GameTest.Tags.suiteDefault);
/**
 * @todo
 */
/*
GameTest.register("APITests", "vines", (test) => {
  const testEx = new GameTestExtensions(test);

  const allBitmask = 15;
  const northBitmask = 1 << testEx.getVineDirection(test.rotateDirection(Direction.North));
  const eastBitmask = 1 << testEx.getVineDirection(test.rotateDirection(Direction.East));
  const southBitmask = 1 << testEx.getVineDirection(test.rotateDirection(Direction.South));
  const westBitmask = 1 << testEx.getVineDirection(test.rotateDirection(Direction.West));

  test.triggerInternalBlockEvent({ x: 1, y: 4, z: 2 }, "grow_down", [southBitmask | northBitmask]);
  testEx.assertBlockProperty(
    BlockProperties.vineDirectionBits,
    southBitmask | northBitmask,
    { x: 1, y: 3, z: 2 }
  );

  test.triggerInternalBlockEvent({ x: 1, y: 4, z: 2 }, "grow_up", [allBitmask]);
  testEx.assertBlockProperty(BlockProperties.vineDirectionBits, southBitmask | eastBitmask, { x: 1, y: 5, z: 2 });

  test.triggerInternalBlockEvent({ x: 7, y: 2, z: 1 }, "grow_sideways", [
    testEx.getVineDirection(test.rotateDirection(Direction.West)),
  ]);
  testEx.assertBlockProperty(BlockProperties.vineDirectionBits, southBitmask, { x: 6, y: 2, z: 1 });

  test.triggerInternalBlockEvent({ x: 6, y: 2, z: 1 }, "grow_sideways", [
    testEx.getVineDirection(test.rotateDirection(Direction.West)),
  ]);
  testEx.assertBlockProperty(BlockProperties.vineDirectionBits, southBitmask | westBitmask, { x: 6, y: 2, z: 1 });

  test.triggerInternalBlockEvent({ x: 7, y: 2, z: 1 }, "grow_sideways", [
    testEx.getVineDirection(test.rotateDirection(Direction.East)),
  ]);
  testEx.assertBlockProperty(BlockProperties.vineDirectionBits, westBitmask, { x: 8, y: 2, z: 2 });

  test.succeed();
})
  .rotateTest(true)
  .tag(GameTest.Tags.suiteDefault);*/
GameTest.register("APITests", "tags", (test) => {
    const player = test.spawnSimulatedPlayer({ x: 1, y: 2, z: 1 }, "tag_player");
    const dimension = test.getDimension();
    test
        .startSequence()
        .thenExecuteAfter(2, () => {
        system.run(() => dimension.runCommand("tag @p[name=tag_player] add test_tag_1"));
        test.assert(player.hasTag("test_tag_1"), "Expected tag test_tag_1");
        test.assert(!player.hasTag("test_tag_2"), "Did not expect tag test_tag_2");
        test.assert(player.removeTag("test_tag_1"), "Expected successful tag removal");
        test.assert(!player.removeTag("test_tag_1"), "Expected failed tag removal");
        test.assert(!player.hasTag("test_tag_1"), "Did not expect tag test_tag_1");
        player.addTag("test_tag_2");
        test.assert(player.hasTag("test_tag_2"), "Expected tag test_tag_2");
        let tags = player.getTags();
        test.assert(tags.length === 1 && tags[0] === "test_tag_2", "Unexpected tags value");
    })
        .thenSucceed();
})
    .structureName("ComponentTests:platform")
    .tag(GameTest.Tags.suiteDefault);
//AI tests
GameTest.register("APITests", "cant_set_target", async (test) => {
    const player = test.spawnSimulatedPlayer({ x: 1, y: 2, z: 1 });
    let wolf = test.spawn("minecraft:wolf<minecraft:ageable_grow_up>", { x: 2, y: 2, z: 1 });
    await test.idle(10);
    try {
        // @ts-expect-error
        wolf.target = player;
        test.fail("Target should be a read-only property");
    }
    catch (e) {
        test.succeed();
    }
    wolf.kill();
})
    .structureName("ComponentTests:platform")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "can_get_null_target", (test) => {
    const player = test.spawnSimulatedPlayer({ x: 1, y: 2, z: 1 });
    let wolf = test.spawn("minecraft:wolf<minecraft:ageable_grow_up>", { x: 2, y: 2, z: 1 });
    const target = wolf.target;
    if (target) {
        test.fail("Expected wolf to not have a target");
    }
    test.succeed();
})
    .structureName("ComponentTests:platform")
    .tag(GameTest.Tags.suiteDefault);
//Entity Teleport Tests
GameTest.register("APITests", "teleport_mob", async (test) => {
    let sheepSpawn = { x: 0, y: 2, z: 0 };
    let teleportBlockLoc = { x: 2, y: 2, z: 2 };
    let sheep = test.spawn("minecraft:sheep", sheepSpawn);
    let teleportLoc = { x: 2, y: 2, z: 2 };
    let teleportWorldLoc = test.worldLocation(teleportLoc);
    await test.idle(10);
    sheep.teleport(teleportWorldLoc, { dimension: sheep.dimension, rotation: { x: 0.0, y: 0.0 } });
    test.assertEntityPresent("minecraft:sheep", teleportBlockLoc, 0, true);
    sheep.kill();
    test.succeed();
})
    .structureName("ComponentTests:platform")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "teleport_mob_facing", async (test) => {
    let playerSpawn = { x: 0, y: 2, z: 0 };
    let player = test.spawnSimulatedPlayer(playerSpawn, "simulatedPlayer");
    let teleportLoc = { x: 2, y: 2, z: 2 };
    let teleportBlockLoc = { x: 2, y: 2, z: 2 };
    let teleportWorldLoc = test.worldLocation(teleportLoc);
    let facingLoc = { x: 2, y: 3, z: 0 };
    let facingBlockLoc = { x: 2, y: 3, z: 0 };
    let facingWorldLoc = test.worldLocation(facingLoc);
    test.setBlockType("diamondBlock", facingBlockLoc);
    const diamondBlock = test.getBlock(facingBlockLoc);
    let facingBlock;
    await test.idle(10);
    player.teleport(teleportWorldLoc, { dimension: player.dimension, facingLocation: facingWorldLoc });
    await test.idle(20);
    facingBlock = player.getBlockFromViewDirection()?.block;
    test.assert(facingBlock.type === diamondBlock.type, "expected mob to face diamond block but instead got " + facingBlock.type.id);
    test.assertEntityPresent("minecraft:player", teleportBlockLoc, 0, true);
    player.kill();
    test.succeed();
})
    .structureName("ComponentTests:platform")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "view_vector", (test) => {
    const spawnLoc = { x: 1, y: 2, z: 1 };
    const playerName = "Test Player";
    const player = test.spawnSimulatedPlayer(spawnLoc, playerName);
    player.lookAtBlock({ x: 0, y: 3, z: 1 });
    test
        .startSequence()
        .thenExecuteAfter(10, () => {
        test.assert(isNear(player.getViewDirection().x, -0.99, 0.01), "Expected x component to be -0.99, but got " + player.getViewDirection().x);
        test.assert(isNear(player.getViewDirection().y, -0.12, 0.01), "Expected y component to be -0.12, but got " + player.getViewDirection().y);
        test.assert(isNear(player.getViewDirection().z, 0, 0.01), "Expected z component to be 0, but got " + player.getViewDirection().z);
        test.assert(player.getRotation().y == 90, "Expected body rotation to be 90, but got " + player.getRotation().y);
        player.lookAtBlock({ x: 2, y: 3, z: 0 });
    })
        .thenExecuteAfter(10, () => {
        test.assert(isNear(player.getViewDirection().x, 0.7, 0.01), "Expected x component to be .70, but got " + player.getViewDirection().x);
        test.assert(isNear(player.getViewDirection().y, -0.08, 0.01), "Expected y component to be -0.08, but got " + player.getViewDirection().y);
        test.assert(isNear(player.getViewDirection().z, -0.7, 0.01), "Expected z component to be -0.70, but got " + player.getViewDirection().z);
        test.assert(player.getRotation().y == -135, "Expected body rotation to be -135, but got " + player.getRotation().y);
        player.lookAtBlock({ x: 1, y: 5, z: 1 });
    })
        .thenExecuteAfter(10, () => {
        test.assert(isNear(player.getViewDirection().x, 0, 0.01), "Expected x component to be 0, but got " + player.getViewDirection().x);
        test.assert(isNear(player.getViewDirection().y, 1, 0.01), "Expected y component to be 1, but got " + player.getViewDirection().y);
        test.assert(isNear(player.getViewDirection().z, 0, 0.01), "Expected z component to be 0, but got " + player.getViewDirection().z);
        test.assert(player.getRotation().y == -135, "Expected body rotation to be -135, but got " + player.getRotation().y);
        const head = test.relativeLocation(player.getHeadLocation());
        test.assert(isNear(head.x, 1.5, 0.01), "Expected x component to be 1.5, but got " + head.x);
        test.assert(isNear(head.y, 3.52, 0.01), "Expected y component to be 3.52, but got " + head.y);
        test.assert(isNear(head.z, 1.5, 0.01), "Expected z component to be 1.5, but got " + head.z);
    })
        .thenSucceed();
})
    .structureName("ComponentTests:platform")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "set_velocity", (test) => {
    const zombie = test.spawnWithoutBehaviors("minecraft:zombie<minecraft:ageable_grow_up>", { x: 1, y: 2, z: 1 });
    test
        .startSequence()
        .thenExecuteFor(30, () => {
        zombie.applyImpulse({ x: 0, y: 0.1, z: 0 });
    })
        .thenExecute(() => {
        const zombieLoc = test.relativeLocation(zombie.location);
        const expectedLoc = { x: 1.5, y: 5.0, z: 1.5 };
        test.assert(Vector.distance(zombieLoc, expectedLoc) <= 0.01, "Expected zombie to levitate to specific place.");
    })
        .thenSucceed();
})
    .structureName("ComponentTests:platform")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "lore", (test) => {
    let itemStack = new ItemStack("diamondSword");
    itemStack.setLore(["test lore 0", "test lore 1", "test lore 2"]);
    let lore = itemStack.getLore();
    test.assert(lore.length === 3, "Expected 3 lore lines, but got " + lore.length);
    test.assert(lore[0] === "test lore 0", "Expected lore line 0 to be 'test lore 0', but got " + lore[0]);
    test.assert(lore[1] === "test lore 1", "Expected lore line 1 to be 'test lore 1', but got " + lore[1]);
    test.assert(lore[2] === "test lore 2", "Expected lore line 2 to be 'test lore 2', but got " + lore[2]);
    const chestCart = test.spawn("chest_minecart", { x: 1, y: 3, z: 1 });
    const inventoryComp = chestCart.getComponent("inventory");
    inventoryComp.container?.addItem(itemStack);
    test.succeed();
})
    .structureName("ComponentTests:platform")
    .tag(GameTest.Tags.suiteDefault);
GameTest.registerAsync("APITests", "data_driven_actor_event", async (test) => {
    // let globalBeforeTriggerSuccess = false; // This event was removed. :(
    // let entityEventFilteredBeforeTriggerSuccess = false; // This event was removed. :(
    let globalTriggerSuccess = false;
    let entityEventFilteredTriggerSuccess = false;
    /*
    //Global Trigger
    let globalBeforeTrigger = world.beforeEvents.dataDrivenEntityTrigger.subscribe((event) => {
      if (event.entity.id == "minecraft:llama" && event.id == "minecraft:entity_spawned") {
        globalBeforeTriggerSuccess = true;
      }
  
      //Force the llama to spawn as a baby
      if (
        event.modifiers.length > 0 &&
        event.modifiers[0].triggers.length > 0 &&
        event.modifiers[0].triggers[0].eventName == "minecraft:spawn_adult"
      ) {
        event.modifiers[0].triggers[0].eventName = "minecraft:spawn_baby";
      }
    });*/ // This event was removed. :(
    test.assert(false, "The dataDrivenEntityTrigger beforeEvent was removed in 1.20.80.");
    let globalTrigger = world.afterEvents.dataDrivenEntityTrigger.subscribe((event) => {
        if (event.entity.id == "minecraft:llama" && event.eventId == "minecraft:entity_spawned") {
            // if (!globalBeforeTriggerSuccess) test.fail("globalBeforeTrigger didn't fire for the entity_spawned event!"); // This event was removed. :(
            test.assert(false, "The dataDrivenEntityTrigger beforeEvent was removed in 1.20.80.");
            globalTriggerSuccess = true;
        }
    });
    //Trigger filtered by entity type and event type
    let entityEventFilterOptions = {
        entityTypes: ["minecraft:llama"],
        eventTypes: ["minecraft:entity_spawned"],
    };
    /*   let entityEventBeforeFilterTrigger = world.beforeEvents.dataDrivenEntityTrigger.subscribe((event) => {
        entityEventFilteredBeforeTriggerSuccess = true;
      }, entityEventFilterOptions); */ // This event was removed. :(
    test.assert(false, "The dataDrivenEntityTrigger beforeEvent was removed in 1.20.80.");
    let entityEventFilterTrigger = world.afterEvents.dataDrivenEntityTrigger.subscribe((event) => {
        // if (!entityEventFilteredBeforeTriggerSuccess) // This event was removed. :(
        //   test.fail("actorEventBeforeFilterTrigger didn't fire for the entity_spawned event!"); // This event was removed. :(
        entityEventFilteredTriggerSuccess = true;
    }, entityEventFilterOptions);
    const llama = test.spawn("minecraft:llama", { x: 1, y: 2, z: 1 });
    const villager = test.spawn("minecraft:villager_v2", { x: 1, y: 2, z: 1 });
    /*   world.beforeEvents.dataDrivenEntityTrigger.unsubscribe(globalBeforeTrigger); // This event was removed. :(
      world.beforeEvents.dataDrivenEntityTrigger.unsubscribe(entityEventBeforeFilterTrigger); */ // This event was removed. :(
    world.afterEvents.dataDrivenEntityTrigger.unsubscribe(globalTrigger);
    world.afterEvents.dataDrivenEntityTrigger.unsubscribe(entityEventFilterTrigger);
    let specificEntityBeforeTriggerSuccess = false;
    /*   //Event bound to a specific entity
      let specificEntityFilterOptions = new EntityDataDrivenTriggerEventOptions();
      specificEntityFilterOptions.entities.push(llama);
      specificEntityFilterOptions.eventTypes.push("minecraft:ageable_grow_up");
    
      let specificEntityEventBeforeTrigger = world.beforeEvents.dataDrivenEntityTrigger.subscribe((event) => {
        event.cancel = true;
        specificEntityBeforeTriggerSuccess = true;
      }, specificEntityFilterOptions);
    
      //Event bound to both entities, but only fire on villager to show that multi-filters work
      let allEntityFilterOptions = new EntityDataDrivenTriggerEventOptions();
      allEntityFilterOptions.entities.push(llama);
      allEntityFilterOptions.entities.push(villager);
      allEntityFilterOptions.entityTypes.push("minecraft:villager_v2");
      allEntityFilterOptions.eventTypes.push("minecraft:ageable_grow_up");
    
      let allEntitiesTriggerCount = 0;
    
      let allEntitiesEventBeforeTrigger = world.beforeEvents.dataDrivenEntityTrigger.subscribe((event) => {
        allEntitiesTriggerCount += 1;
      }, allEntityFilterOptions); */ // This event was removed. :(
    test.assert(false, "The dataDrivenEntityTrigger beforeEvent was removed in 1.20.80.");
    llama.triggerEvent("minecraft:ageable_grow_up");
    villager.triggerEvent("minecraft:ageable_grow_up");
    /*   world.beforeEvents.dataDrivenEntityTrigger.unsubscribe(specificEntityEventBeforeTrigger); // This event was removed. :(
      world.beforeEvents.dataDrivenEntityTrigger.unsubscribe(allEntitiesEventBeforeTrigger); */ // This event was removed. :(
    test.assert(false, "The dataDrivenEntityTrigger beforeEvent was removed in 1.20.80.");
    // if (!globalBeforeTriggerSuccess) test.fail("Global beforeDataDrivenEntityTriggerEvent didn't fire!"); // This event was removed. :(
    // if (!entityEventFilteredBeforeTriggerSuccess) // This event was removed. :(
    test.fail("Filtered entity/event beforeDataDrivenEntityTriggerEvent didn't fire!");
    if (!globalTriggerSuccess)
        test.fail("Global dataDrivenEntityTriggerEvent didn't fire!");
    if (!entityEventFilteredTriggerSuccess)
        test.fail("Filtered entity/event dataDrivenEntityTriggerEvent didn't fire!");
    if (!specificEntityBeforeTriggerSuccess)
        test.fail("Specific entity beforeDataDrivenEntityTriggerEvent didn't fire!");
    // if (allEntitiesTriggerCount != 1) // This event was removed. :(
    //   test.fail("All filters beforeDataDrivenEntityTriggerEvent didn't fire exactly one time!"); // This event was removed. :(
    await test.idle(10);
    if (llama.getComponent("minecraft:is_baby") == null)
        test.fail("Llama was able to grow up! The beforeDataDrivenEntityTriggerEvent should prevent this!");
    test.succeed();
})
    .structureName("ComponentTests:animal_pen")
    .tag(GameTest.Tags.suiteDefault);
/* GameTest.registerAsync("APITests", "property_components", async (test) => {
  // The following components aren't present in this test since either there aren't mobs that use that component
  //  or it is difficult to get them into the correct state.
  // skin_id, push_through, ground_offset, friction_modifier, floats_in_liquid, wants_jockey, is_shaking

  let testComponent = (entity, compName, expectedValue, canSet) => {
    let comp = entity.getComponent("minecraft:" + compName);
    test.assert(comp != null, "Entity did not have expected component " + compName);
    if (expectedValue !== undefined) {
      let v = comp.value;
      let pass = false;
      if (typeof v === "number") {
        pass = Math.abs(expectedValue - v) <= 0.001;
      } else {
        pass = v == expectedValue;
      }
      test.assert(pass, `Component ${compName} didn't have expected value! Found ${v}, expected ${expectedValue}`);

      if (canSet === undefined || canSet === true) {
        comp.value = v;
      }
    }
  };

  const zombie = test.spawn("minecraft:zombie<minecraft:ageable_grow_up>", { x: 1, y: 2, z: 1 });
  testComponent(zombie, "can_climb");

  const bee = test.spawn("bee", { x: 1, y: 2, z: 1 });
  testComponent(bee, "can_fly");
  testComponent(bee, "flying_speed", 0.15);
  testComponent(bee, "is_hidden_when_invisible");

  bee.triggerEvent("collected_nectar");
  await test.idle(1);
  testComponent(bee, "is_charged");

  const magma_cube = test.spawn("magma_cube", { x: 1, y: 2, z: 1 });
  testComponent(magma_cube, "fire_immune");

  const horse = test.spawn("horse", { x: 1, y: 2, z: 1 });
  horse.triggerEvent("minecraft:horse_saddled");
  await test.idle(1);
  testComponent(horse, "is_saddled");
  testComponent(horse, "can_power_jump");

  let forceSpawnBaby = world.beforeEvents.dataDrivenEntityTrigger.subscribe((event) => {
    //Force the llama to spawn as a baby
    if (
      event.modifiers.length > 0 &&
      event.modifiers[0].triggers.length > 0 &&
      event.modifiers[0].triggers[0].eventName == "minecraft:spawn_adult"
    ) {
      event.modifiers[0].triggers[0].eventName = "minecraft:spawn_baby";
    }
  });

  const llama = test.spawn("llama", { x: 1, y: 2, z: 1 });
  testComponent(llama, "is_baby");
  testComponent(llama, "scale", 0.5);

  world.beforeEvents.dataDrivenEntityTrigger.unsubscribe(forceSpawnBaby);

  llama.triggerEvent("minecraft:ageable_grow_up");
  llama.triggerEvent("minecraft:on_tame");
  llama.triggerEvent("minecraft:on_chest");
  await test.idle(1);
  testComponent(llama, "is_tamed");
  testComponent(llama, "is_chested");
  testComponent(llama, "mark_variant", 0);

  const pillager = test.spawn("pillager", { x: 1, y: 2, z: 1 });
  pillager.triggerEvent("minecraft:spawn_as_illager_captain");
  await test.idle(1);
  testComponent(pillager, "is_illager_captain");

  const ravager = test.spawn("ravager", { x: 1, y: 2, z: 1 });
  ravager.triggerEvent("minecraft:become_stunned");
  await test.idle(1);
  testComponent(ravager, "is_stunned");

  const sheep = test.spawn("sheep", { x: 1, y: 2, z: 1 });
  sheep.triggerEvent("wololo");
  sheep.triggerEvent("minecraft:on_sheared");
  await test.idle(1);
  testComponent(sheep, "is_sheared");
  await test.idle(1);
  testComponent(sheep, "color", 14);

  const cat = test.spawn("cat", { x: 1, y: 2, z: 1 });
  cat.triggerEvent("minecraft:spawn_midnight_cat");
  await test.idle(1);
  testComponent(cat, "variant", 9, false);

  const tnt = test.spawn("tnt_minecart", { x: 1, y: 2, z: 1 });
  tnt.triggerEvent("minecraft:on_prime");
  await test.idle(1);
  testComponent(tnt, "is_ignited");
  testComponent(tnt, "is_stackable");
  tnt.kill();

  test.succeed();
})
  .structureName("ComponentTests:large_glass_cage")
  .tag(GameTest.Tags.suiteDefault); */
GameTest.register("APITests", "entity_hit_event_hits_entity", async (test) => {
    const player = test.spawnSimulatedPlayer({ x: 1, y: 2, z: 1 });
    const cow = test.spawn("minecraft:cow<minecraft:ageable_grow_up>", { x: 3, y: 2, z: 3 });
    let hitCallback = world.afterEvents.entityHitEntity.subscribe((e) => {
        if (e.damagingEntity === player) {
            test.assert(e.hitEntity === cow, "Expected target to be cow, but got " + e.hitEntity);
            // test.assert(e.hitBlock === undefined, "Expected no hit block, but got " + e.hitBlock?.id);
            world.afterEvents.entityHitEntity.unsubscribe(hitCallback);
            test.succeed();
        }
    });
    await test.idle(5);
    player.attackEntity(cow);
})
    .structureName("ComponentTests:large_animal_pen")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "entity_hit_event_hits_block", async (test) => {
    const player = test.spawnSimulatedPlayer({ x: 1, y: 2, z: 1 });
    const blockLoc = { x: 1, y: 2, z: 1 };
    test.setBlockType("diamondBlock", blockLoc);
    let hitCallback = world.afterEvents.entityHitBlock.subscribe((e) => {
        if (e.damagingEntity === player) {
            // test.assert(e.hitEntity === undefined, "Expected no hit entity, but got " + e.target);
            test.assert(e.hitBlock?.typeId === "minecraft:diamond_block", "Expected no hit block, but got " + e.hitBlock?.typeId);
            world.afterEvents.entityHitBlock.unsubscribe(hitCallback);
            test.succeed();
        }
    });
    await test.idle(5);
    player.breakBlock(blockLoc);
})
    .structureName("ComponentTests:platform")
    .tag(GameTest.Tags.suiteDefault);
/**
 * @todo
 */
/* GameTest.registerAsync("APITests", "entity_hurt_event_skeleton_hurts_player", async (test) => {
  const player = test.spawnSimulatedPlayer({ x: 1, y: 2, z: 1 });
  const skeleton = test.spawn("skeleton", { x: 3, y: 2, z: 3 });

  let hurtCallback = world.afterEvents.entityHurt.subscribe((e) => {
    if (e.hurtEntity === player) {
      test.assert(
        e.damageSource.damagingEntity === skeleton,
        "Expected damagingEntity to be skeleton but got " + e.damageSource.damagingEntity.typeId
      );
      test.assert(e.cause === EntityDamageCause.projectile, "Expected cause to be entity_attack but got " + e.cause);
      test.assert(e.projectile.id === "minecraft:arrow", "Expected projectile to be arrow but got " + e.cause);
      test.assert(e.damage > 0, "Expected damage to be greater than 0, but got " + e.damage);
      world.afterEvents.entityHurt.unsubscribe(hurtCallback);
      test.succeed();
    }
  });
})
  .structureName("ComponentTests:large_glass_cage")
  .tag(GameTest.Tags.suiteDefault);

GameTest.registerAsync("APITests", "entity_hurt_event_skeleton_kills_player", async (test) => {
  const player = test.spawnSimulatedPlayer({ x: 1, y: 2, z: 1 });
  const skeleton = test.spawn("skeleton", { x: 3, y: 2, z: 3 });

  player.getComponent("health").setCurrent(1);

  let hurtCallback = world.afterEvents.entityHurt.subscribe((e) => {
    if (e.hurtEntity === player) {
      test.assert(
        e.damageSource.damagingEntity === skeleton,
        "Expected damagingEntity to be skeleton but got " + e.damageSource.damagingEntity?.typeId
      );
      test.assert(e.cause === EntityDamageCause.projectile, "Expected cause to be entity_attack but got " + e.cause);
      test.assert(e.projectile.id === "minecraft:arrow", "Expected projectile to be arrow but got " + e.cause);
      test.assert(e.damage > 0, "Expected damage to be greater than 0, but got " + e.damage);
      const health = player.getComponent("health").current;
      test.assert(health < 0, "Expected negative player health, but got " + health);
      world.afterEvents.entityHurt.unsubscribe(hurtCallback);
      test.succeed();
    }
  });
})
  .structureName("ComponentTests:large_glass_cage")
  .tag(GameTest.Tags.suiteDefault);

GameTest.registerAsync("APITests", "entity_hurt_event_player_hurts_cow", async (test) => {
  const player = test.spawnSimulatedPlayer({ x: 1, y: 2, z: 1 });
  const cow = test.spawn("minecraft:cow<minecraft:ageable_grow_up>", { x: 3, y: 2, z: 3 });

  let hurtCallback = world.afterEvents.entityHurt.subscribe((e) => {
    if (e.hurtEntity === cow) {
      test.assert(e.cause === EntityDamageCause.entityAttack, "Expected cause to be entity_attack but got " + e.cause);
      test.assert(e.damage === 1, "Expected damage to be 1, but got " + e.damage);
      world.afterEvents.entityHurt.unsubscribe(hurtCallback);
      test.succeed();
    }
  });
  await test.idle(5);
  player.attackEntity(cow);
})
  .structureName("ComponentTests:large_animal_pen")
  .tag(GameTest.Tags.suiteDefault);

GameTest.registerAsync("APITests", "entity_hurt_event_player_kills_chicken", async (test) => {
  const player = test.spawnSimulatedPlayer({ x: 1, y: 2, z: 1 });
  const chicken = test.spawn("minecraft:chicken<minecraft:ageable_grow_up>", { x: 3, y: 2, z: 3 });

  let maxHealth = chicken.getComponent("minecraft:health").current;
  let expectedHealth = maxHealth;
  let hurtCallback = world.afterEvents.entityHurt.subscribe((e) => {
    if (e.hurtEntity === chicken) {
      test.assert(e.cause === EntityDamageCause.entityAttack, "Expected cause to be entity_attack but got " + e.cause);
      test.assert(e.damage === 1, "Expected damage to be 1, but got " + e.damage);
      let health = e.hurtEntity.getComponent("minecraft:health").current;
      --expectedHealth;
      test.assert(health === expectedHealth, "Expected health to be " + expectedHealth + " but got " + health);
      if (expectedHealth === 0) {
        world.afterEvents.entityHurt.unsubscribe(hurtCallback);
        test.succeed();
      }
    }
  });

  for (let i = 0; i < maxHealth; i++) {
    await test.idle(20);
    player.attackEntity(chicken);
  }
})
  .maxTicks(100)
  .structureName("ComponentTests:large_animal_pen")
  .tag(GameTest.Tags.suiteDefault);

GameTest.registerAsync("APITests", "projectile_hit_event_block", async (test) => {
  const player = test.spawnSimulatedPlayer({ x: 1, y: 2, z: 1 });
  const targetLoc = { x: 1, y: 3, z: 7 };

  let projectileHitCallback = world.afterEvents.projectileHit.subscribe((e) => {
    if (e.blockHit && test.relativeBlockLocation(e.blockHit.block.location).equals(targetLoc)) {
      world.afterEvents.projectileHit.unsubscribe(projectileHitCallback);
      try {
        test.assert(e.dimension === test.getDimension(), "Unexpected dimension");
        test.assert(e.entityHit === undefined, "Expected no entity hit");
        test.assert(
          e.projectile?.id === "minecraft:arrow",
          "Expected projectile to be arrow, but got " + e.projectile?.id
        );
        test.assert(e.source?.id === "minecraft:player", "Expected source to be player, but got " + e.source?.id);
        test.assert(
          isNearVec(e.hitVector, test.rotateVector(mcMath.VECTOR3_FORWARD), 0.1),
          `Expected e.hitVector to be forward, but got [${e.hitVector.x}, ${e.hitVector.y}, ${e.hitVector.z}]`
        );
        test.assert(
          e.blockHit.block?.id === "minecraft:target",
          "Expected block to be target, but got " + e.blockHit.block?.id
        );
        test.assert(e.blockHit.face == test.rotateDirection(Direction.North), "Expected north block face");
        test.assert(
          isNear(e.blockHit.faceLocationX, 0, 5, 0.1),
          "Expected faceLocationX to be near center, but got " + e.blockHit.faceLocationX
        );
        test.assert(
          isNear(e.blockHit.faceLocationY, 0.5, 0.2),
          "Expected faceLocationY to be near center, but got " + e.blockHit.faceLocationY
        );
        test.succeed();
      } catch (ex) {
        test.fail(ex);
      }
    }
  });

  await test.idle(5);
  player.giveItem(new ItemStack("bow", 1), false);
  player.giveItem(new ItemStack("arrow", 64), false);
  await test.idle(5);
  player.useItemInSlot(0);
  await test.idle(50);
  player.stopUsingItem();
})
  .structureName("SimulatedPlayerTests:target_practice")
  .tag(GameTest.Tags.suiteDefault);

GameTest.registerAsync("APITests", "projectile_hit_event_entity", async (test) => {
  const player = test.spawnSimulatedPlayer({ x: 1, y: 2, z: 1 });
  const blaze = test.spawn("blaze", { x: 1, y: 2, z: 3 });

  let projectileHitCallback = world.afterEvents.projectileHit.subscribe((e) => {
    if (e.entityHit && e.entityHit.entity === blaze) {
      world.afterEvents.projectileHit.unsubscribe(projectileHitCallback);
      test.assert(e.blockHit === undefined, "Expected no block hit");
      test.assert(e.dimension === test.getDimension(), "Unexpected dimension");
      test.assert(
        e.projectile?.id === "minecraft:snowball",
        "Expected projectile to be snowball, but got " + e.projectile?.id
      );
      test.assert(e.source?.id === "minecraft:player", "Expected source to be player, but got " + e.source?.id);
      test.assert(
        isNearVec(e.hitVector, test.rotateVector(mcMath.VECTOR3_FORWARD)),
        `Expected e.hitVector to be forward, but got [${e.hitVector.x}, ${e.hitVector.y}, ${e.hitVector.z}]`
      );
      test.assert(
        e.entityHit.entity?.id === "minecraft:blaze",
        "Expected entity to be blaze, but got " + e.entityHit.entity?.id
      );
      test.succeed();
    }
  });

  await test.idle(5);
  player.useItem(new ItemStack("snowball"));
})
  .structureName("SimulatedPlayerTests:use_item")
  .tag(GameTest.Tags.suiteDefault); */
GameTest.registerAsync("APITests", "rotate_entity", async (test) => {
    const rotate360 = async (entity) => {
        for (let i = 0; i < 360; i += 10) {
            await test.idle(1);
            entity.setRotation({ x: i, y: i });
            let rotX = entity.getRotation().x;
            let rotY = entity.getRotation().y;
            if (rotX < 0) {
                rotX += 360;
            }
            if (rotY < 0) {
                rotY += 360;
            }
            test.assert(rotX === i, `Expected rotX to be ${i} but got ${rotX}`);
            test.assert(rotY === i, `Expected rotY to be ${i} but got ${rotY}`);
        }
    };
    const spawnLoc = { x: 1, y: 2, z: 1 };
    const cow = test.spawnWithoutBehaviors("minecraft:cow<minecraft:ageable_grow_up>", spawnLoc);
    await rotate360(cow);
    cow.kill();
    const armorStand = test.spawn("armor_stand", spawnLoc);
    await rotate360(armorStand);
    armorStand.kill();
    const player = test.spawnSimulatedPlayer(spawnLoc);
    await rotate360(player);
    test.succeed();
})
    .maxTicks(400)
    .structureName("ComponentTests:animal_pen")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("APITests", "teleport_keep_velocity", (test) => {
    const arrow = test.spawn("arrow", { x: 2, y: 4, z: 1 });
    // The arrow should fall 1 block before hitting the target
    arrow.applyImpulse(test.rotateVector({ x: 0, y: 0, z: 1.2 }));
    let relativeLoc = test.relativeLocation(arrow.location);
    relativeLoc.x -= 1;
    let teleportLoc = test.worldLocation(relativeLoc);
    arrow.teleport(teleportLoc, { dimension: arrow.dimension, rotation: { x: 0, y: 0 }, keepVelocity: true });
    let velocity = Vector.magnitude(arrow.getVelocity());
    test.assert(velocity > 0.5, "Expected velocity to be greater than 0.5, but got " + velocity);
    test.succeed();
})
    .structureName("SimulatedPlayerTests:target_practice")
    .tag(GameTest.Tags.suiteDefault);
GameTest.registerAsync(`APITests`, `teleport_keep_velocity_mob`, async (test) => {
    let pig1 = test.spawn(`minecraft:pig<minecraft:ageable_grow_up>`, { x: 0, y: 10, z: 0 });
    let pig2 = test.spawn(`minecraft:pig<minecraft:ageable_grow_up>`, { x: 0, y: 10, z: 2 });
    let simPlayer1 = test.spawnSimulatedPlayer({ x: 2, y: 10, z: 0 });
    let simPlayer2 = test.spawnSimulatedPlayer({ x: 2, y: 10, z: 2 });
    await test.idle(2);
    const velocity = { x: 0, y: 5, z: 0 };
    pig1.applyImpulse(velocity);
    pig2.applyImpulse(velocity);
    simPlayer1.applyImpulse(velocity);
    simPlayer2.applyImpulse(velocity);
    await test.idle(20);
    pig1.teleport(test.worldLocation({ x: 0.5, y: 2, z: 0.5 }), { dimension: world.getDimension(`overworld`), rotation: { x: 0, y: 0 }, keepVelocity: false }); // don't keep velocity
    pig2.teleport(test.worldLocation({ x: 0.5, y: 3, z: 2.5 }), { dimension: world.getDimension(`overworld`), rotation: { x: 0, y: 0 }, keepVelocity: true }); // keep velocity
    simPlayer1.teleport(test.worldLocation({ x: 2.5, y: 3, z: 2.5 }), { dimension: world.getDimension(`overworld`), rotation: { x: 0, y: 0 }, keepVelocity: false }); // don't keep velocity
    try {
        simPlayer2.teleport(test.worldLocation({ x: 2.5, y: 3, z: 2.5 }), { dimension: world.getDimension(`overworld`), rotation: { x: 0, y: 0 }, keepVelocity: true }); // keep velocity, not supported for players
        test.fail("Expected exception when keepVelocity is true on player");
    }
    catch (ex) {
        test.assert(ex === "keepVelocity is not supported for player teleportation", ex);
    }
    test.assert(pig1.getVelocity().y === 0, `Expected pig1.velocity.y to be 0, but got ${pig1.getVelocity().y}`);
    test.assert(simPlayer1.getVelocity().y === 0, `Expected simPlayer1.velocity.y to be 0, but got ${simPlayer1.getVelocity().y}`);
    pig1.kill();
    pig2.kill();
    test.succeed();
}).tag(GameTest.Tags.suiteDefault);
//# sourceMappingURL=APITests.js.map