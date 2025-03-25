// Copyright (c) Microsoft Corporation.  All rights reserved.

import * as GameTest from "@minecraft/server-gametest";
import {
  BlockProperties,
  Direction,
  world,
  Location,
} from "@minecraft/server";
import GameTestExtensions from "./GameTestExtensions.js";

const TicksPerSecond = 20;
const FiveSecondsInTicks = 5 * TicksPerSecond;

const FALLING_SAND_TEMPLATE_NAME = "BlockTests:falling_sand_template";
const FALLING_SAND_STARTUP_TICKS = 1;
const FALLING_SAND_TIMEOUT_TICKS = 20;

const BLOCKS_THAT_POP_SAND = [
  ["woodenSlab", "air"], //replace missing oakSlab() with woodenSlab()
  ["chest", "stone"],
  ["rail", "stone"],
  ["stoneButton", "stone"],
  ["woodenPressurePlate", "stone"], //replace missing OakPressurePlate() with woodenPressurePlate()
  ["torch", "stone"],
  ["soulSand", "air"],
];

const BLOCKS_REPLACED_BY_SAND = [
  "water",
  "air",
  "tallgrass", //replace grass() with tallgrass(). It needs grass, not grass block, "grass is actually grass block.
];

const BLOCKS_THAT_SUPPORT_SAND = [
  "stone",
  "fence", //replace missing oakFence() with fence()
  "oakStairs",
  "scaffolding",
];

function testThatFallingSandPopsIntoItem(test) {
  test.setBlockType("sand", new BlockLocationIterator(1, 4, 1));
  const targetPos = new BlockLocationIterator(1, 2, 1);

  test.succeedWhen(() => {
    test.assertEntityPresentInArea("minecraft:item", true);
    test.assertEntityPresent("minecraft:falling_block", targetPos, false);
  });
}

function testThatFallingSandReplaces(test) {
  test.setBlockType("sand", new BlockLocationIterator(1, 4, 1));
  test.succeedWhenBlockPresent("sand", new BlockLocationIterator(1, 2, 1), true);
}

function testThatFallingSandLandsOnTop(test) {
  test.setBlockType("sand", new BlockLocationIterator(1, 4, 1));
  test.succeedWhenBlockPresent("sand", new BlockLocationIterator(1, 3, 1), true);
}

///
// Concrete Tests
///
for (let i = 0; i < BLOCKS_THAT_POP_SAND.length; i++) {
  const topBlock = BLOCKS_THAT_POP_SAND[i][0];
  const bottomBlock = BLOCKS_THAT_POP_SAND[i][1];
  const testName = "blocktests.falling_sand_pops_on_" + topBlock.id;
  let tag = null;

  GameTest.register("BlockTests", testName, (test) => {
    if (topBlock.id == "minecraft:stone_button") {
      const buttonPermutation = "stoneButton".createDefaultBlockPermutation();
      buttonPermutation.getProperty(BlockProperties.facingDirection).value = Direction.north;
      test.setBlockPermutation(buttonPermutation, new BlockLocationIterator(1, 2, 1));
    } else {
      test.setBlockType(topBlock, new BlockLocationIterator(1, 2, 1));
    }
    test.setBlockType(bottomBlock, new BlockLocationIterator(1, 1, 1));
    testThatFallingSandPopsIntoItem(test);
  })
    .batch("day")
    .structureName(FALLING_SAND_TEMPLATE_NAME)
    .maxTicks(FALLING_SAND_TIMEOUT_TICKS)
    .setupTicks(FALLING_SAND_STARTUP_TICKS)
    .required(true)
    .tag(GameTest.Tags.suiteDefault);
}

for (const block of BLOCKS_REPLACED_BY_SAND) {
  const testName = "blocktests.falling_sand_replaces_" + block.id;

  GameTest.register("BlockTests", testName, (test) => {
    //SetBlock will fail if set a block to what it already is. Skip to call setblock() for test falling_sand_replaces_air because it's just air block in initial structure.
    if (block.id != "minecraft:air") {
      test.setBlockType(block, new BlockLocationIterator(1, 2, 1));
    }
    testThatFallingSandReplaces(test);
  })
    .batch("day")
    .structureName(FALLING_SAND_TEMPLATE_NAME)
    .maxTicks(FALLING_SAND_TIMEOUT_TICKS)
    .setupTicks(FALLING_SAND_STARTUP_TICKS)
    .required(true)
    .tag(GameTest.Tags.suiteDefault);
}

for (const block of BLOCKS_THAT_SUPPORT_SAND) {
  const testName = "blocktests.falling_sand_lands_on_" + block.id;
  let tag = null;

  GameTest.register("BlockTests", testName, (test) => {
    test.setBlockType(block, new BlockLocationIterator(1, 2, 1));
    testThatFallingSandLandsOnTop(test);
  })
    .batch("day")
    .structureName(FALLING_SAND_TEMPLATE_NAME)
    .maxTicks(FALLING_SAND_TIMEOUT_TICKS)
    .setupTicks(FALLING_SAND_STARTUP_TICKS)
    .required(true)
    .tag(GameTest.Tags.suiteDefault);
}

GameTest.register("BlockTests", "concrete_solidifies_in_shallow_water", (test) => {
  test.setBlockType("concretePowder", new BlockLocationIterator(1, 3, 1));

  test.succeedWhen(() => {
    test.assertBlockPresent("concrete", new BlockLocationIterator(1, 2, 1), true);
  });
})
  .maxTicks(FiveSecondsInTicks)
  .tag(GameTest.Tags.suiteDefault);

GameTest.register("BlockTests", "concrete_solidifies_in_deep_water", (test) => {
  test.setBlockType("concretePowder", new BlockLocationIterator(1, 4, 1));

  test.succeedWhen(() => {
    test.assertBlockPresent("concrete", new BlockLocationIterator(1, 2, 1), true);
  });
})
  .maxTicks(FiveSecondsInTicks)
  .tag(GameTest.Tags.suiteDefault);

GameTest.register("BlockTests", "concrete_solidifies_next_to_water", (test) => {
  test.setBlockType("concretePowder", new BlockLocationIterator(1, 3, 1));

  test.succeedWhen(() => {
    test.assertBlockPresent("concrete", new BlockLocationIterator(1, 2, 1), true);
  });
})
  .maxTicks(FiveSecondsInTicks)
  .tag(GameTest.Tags.suiteDefault);

GameTest.register("BlockTests", "sand_fall_boats", (test) => {
  test.setBlockType("sand", new BlockLocationIterator(1, 4, 1));

  test.succeedWhen(() => {
    test.assertBlockPresent("sand", new BlockLocationIterator(1, 2, 1), true);
  });
})
  .maxTicks(FiveSecondsInTicks)
  .tag(GameTest.Tags.suiteDefault);

GameTest.register("BlockTests", "sand_fall_shulker", (test) => {
  const EntitySpawnType = "minecraft:shulker";
  const spawnPos = new BlockLocationIterator(1, 2, 1);

  test.spawn(EntitySpawnType, spawnPos);
  testThatFallingSandPopsIntoItem(test);
})
  .maxTicks(FiveSecondsInTicks)
  .tag(GameTest.Tags.suiteDefault);

///
// Turtle Egg Tests
///

GameTest.register("BlockTests", "turtle_eggs_survive_xp", (test) => {
  const xpOrb = "minecraft:xp_orb";
  const spawnPos = new BlockLocationIterator(1, 3, 1);

  for (let i = 0; i < 8; i++) {
    test.spawn(xpOrb, spawnPos);
  }

  // Fail if the turtle egg dies
  test.failIf(() => {
    test.assertBlockPresent("air", new BlockLocationIterator(1, 2, 1), true);
  });

  // Succeed after 4 seconds
  test.startSequence().thenIdle(80).thenSucceed();
})
  .maxTicks(FiveSecondsInTicks)
  .tag(GameTest.Tags.suiteDefault);

GameTest.register("BlockTests", "turtle_eggs_survive_item", (test) => {
  test.pressButton(new BlockLocationIterator(2, 4, 0));

  // Fail if the turtle egg dies
  test.failIf(() => {
    test.assertBlockPresent("air", new BlockLocationIterator(1, 2, 1), true);
  });

  // Succeed after 4 seconds
  test.startSequence().thenIdle(80).thenSucceed();
})
  .maxTicks(FiveSecondsInTicks)
  .tag(GameTest.Tags.suiteDefault);

GameTest.register("BlockTests", "turtle_eggs_squished_by_mob", (test) => {
  const zombieEntityType = "minecraft:husk";
  const zombiePosition = new BlockLocationIterator(1, 5, 1);
  test.spawn(zombieEntityType, zombiePosition);
  test.succeedWhenBlockPresent("air", new BlockLocationIterator(1, 2, 1), true);
})
  .required(false)
  .maxTicks(TicksPerSecond * 20)
  .tag(GameTest.Tags.suiteDefault);

GameTest.register("BlockTests", "explosion_drop_location", (test) => {
  test.pressButton(new BlockLocationIterator(4, 3, 4));

  test.succeedWhen(() => {
    const redSandstonePos = new BlockLocationIterator(6, 2, 4);
    const sandstonePos = new BlockLocationIterator(2, 2, 4);

    test.assertBlockPresent("red_sandstone", redSandstonePos, false);
    test.assertBlockPresent("sandstone", sandstonePos, false);
    test.assertItemEntityPresent(MinecraftItemTypes.redSandstone, redSandstonePos, 2.0, true);
    test.assertItemEntityPresent(MinecraftItemTypes.sandstone, sandstonePos, 2.0, true);
  });
})
  .maxTicks(TicksPerSecond * 10)
  .tag("suite:java_parity")
  .tag(GameTest.Tags.suiteDisabled) //redSandstone and sandstone items should be present.
  .maxAttempts(3);

GameTest.register("BlockTests", "concrete_pops_off_waterlogged_chest", (test) => {
  test.setBlockType("concrete_powder", new BlockLocationIterator(1, 4, 1));
  test.succeedWhen(() => {
    const chestPos = new BlockLocationIterator(1, 2, 1);
    test.assertBlockPresent("chest", chestPos, true);
    test.assertItemEntityPresent(MinecraftItemTypes.concretePowder, chestPos, 2, true);
    test.assertEntityPresentInArea("falling_block", false);
  });
})
  .maxTicks(TicksPerSecond * 5)
  .tag(GameTest.Tags.suiteDefault);

GameTest.register("BlockTests", "waterlogged_slab", (test) => {
  const slabPos = new BlockLocationIterator(1, 1, 1);
  test.assertIsWaterlogged(slabPos, false);
  test.succeedWhen(() => {
    test.assertIsWaterlogged(slabPos, true);
  });
})
  .tag("suite:java_parity")
  .tag(GameTest.Tags.suiteDisabled) // Slab should be waterlogged
  .maxTicks(TicksPerSecond * 2);

GameTest.register("BlockTests", "dispenser_light_candles", (test) => {
  const testEx = new GameTestExtensions(test);
  test.pressButton(new BlockLocationIterator(1, 3, 0));
  test.pressButton(new BlockLocationIterator(1, 3, 2));

  test.succeedWhen(() => {
    testEx.assertBlockProperty("lit", 1, new BlockLocationIterator(0, 2, 0));
    testEx.assertBlockProperty("lit", 1, new BlockLocationIterator(0, 2, 2));
  });
}).tag(GameTest.Tags.suiteDefault);

GameTest.register("BlockTests", "put_out_candles", (test) => {
  const player = test.spawnSimulatedPlayer(new BlockLocationIterator(0, 2, 0));
  const testEx = new GameTestExtensions(test);
  const candlePos = new BlockLocationIterator(0, 2, 0);

  test
    .startSequence()
    .thenExecuteAfter(5, () => {
      player.interactWithBlock(candlePos);
    })
    .thenWait(() => {
      testEx.assertBlockProperty("lit", 0, candlePos);
    })
    .thenSucceed();
}).tag(GameTest.Tags.suiteDefault);

///
// Big Dripleaf Tests
///
const platformStructure = "ComponentTests:platform";

GameTest.register("BlockTests", "dripleaf_player_fall", (test) => {
  test.setBlockType("big_dripleaf", new BlockLocationIterator(1, 2, 1));
  let playerSim = test.spawnSimulatedPlayer(new BlockLocationIterator(1, 4, 1));
  test
    .startSequence()
    .thenExecuteAfter(40, () => test.assertEntityPresent("player", new BlockLocationIterator(1, 2, 1), true))
    .thenSucceed();
})
  .structureName(platformStructure)
  .tag(GameTest.Tags.suiteDefault);

GameTest.register("BlockTests", "dripleaf_walk_across", (test) => {
  test.setBlockType("big_dripleaf", new BlockLocationIterator(1, 2, 0));
  test.setBlockType("big_dripleaf", new BlockLocationIterator(1, 2, 1));
  test.setBlockType("smooth_stone", new BlockLocationIterator(1, 2, 2));
  let playerSim = test.spawnSimulatedPlayer(new BlockLocationIterator(1, 4, 0));
  test
    .startSequence()
    .thenExecuteAfter(10, () => test.assertEntityPresent("player", new BlockLocationIterator(1, 3, 2), false))
    .thenExecute(() => playerSim.moveToLocation(new Location(1, 3, 2.5)))
    .thenExecuteAfter(40, () => test.assertEntityPresent("player", new BlockLocationIterator(1, 3, 2)))
    .thenSucceed();
})
  .structureName(platformStructure)
  .tag(GameTest.Tags.suiteDefault);

///
// Powder snow tests
///

GameTest.register("BlockTests", "powder_snow_player_sink_and_freeze", (test) => {
  test.setBlockType("powder_snow", new BlockLocationIterator(1, 2, 1));
  let playerSim = test.spawnSimulatedPlayer(new BlockLocationIterator(1, 3, 1));
  let healthComp = playerSim.getComponent("health");
  test
    .startSequence()
    .thenExecuteAfter(180, () => test.assert(healthComp.current < healthComp.value, "no damage"))
    .thenExecute(() => test.assertEntityInstancePresent(playerSim, new BlockLocationIterator(1, 2, 1)))
    .thenSucceed();
})
  .maxTicks(200)
  .structureName(platformStructure)
  .tag(GameTest.Tags.suiteDefault);

GameTest.register("BlockTests", "powder_snow_leather_boots_walk", (test) => {
  test.setBlockType("powder_snow", new BlockLocationIterator(1, 2, 0));
  test.setBlockType("powder_snow", new BlockLocationIterator(1, 2, 1));
  test.setBlockType("powder_snow", new BlockLocationIterator(1, 2, 2));
  let playerSim = test.spawnSimulatedPlayer(new BlockLocationIterator(1, 5, 0), "playerSim_snow");
  test
    .startSequence()
    .thenExecuteAfter(5, () => {
      playerSim.dimension.runCommandAsync("replaceitem entity playerSim_snow slot.armor.feet 0 leather_boots");
    })
    .thenExecuteAfter(10, () => playerSim.moveToLocation(new Location(1, 3, 2.5)))
    .thenExecuteAfter(40, () => test.assertEntityPresent("player", new BlockLocationIterator(1, 4, 2)))
    .thenSucceed();
})
  .structureName(platformStructure)
  .tag(GameTest.Tags.suiteDefault);

///
// Candle cake tests
///

GameTest.register("BlockTests", "player_light_birthday_cake_candle", (test) => {
  let playerSim = test.spawnSimulatedPlayer(new BlockLocationIterator(1, 2, 0), "playerSim_cake");
  test.setBlockType("cake", new BlockLocationIterator(1, 2, 1));
  const testEx = new GameTestExtensions(test);

  test
    .startSequence()
    .thenExecuteAfter(20, () => testEx.giveItem(playerSim, MinecraftItemTypes.candle, 1, 0))
    .thenExecute(() => test.assert(playerSim.interactWithBlock(new BlockLocationIterator(1, 2, 1), Direction.up), ""))
    .thenExecute(() => testEx.giveItem(playerSim, MinecraftItemTypes.flintAndSteel, 1, 0))
    .thenExecute(() => test.assert(playerSim.interactWithBlock(new BlockLocationIterator(1, 2, 1), Direction.up), ""))
    .thenExecute(() => testEx.assertBlockProperty("lit", 1, new BlockLocationIterator(1, 2, 1)))
    .thenSucceed();
})
  .structureName(platformStructure)
  .tag(GameTest.Tags.suiteDefault);
