// Copyright (c) Microsoft Corporation.  All rights reserved.

import * as GameTest from "@minecraft/server-gametest";
import GameTestExtensions from "./GameTestExtensions.js";
import { BlockLocationIterator } from "@minecraft/server";

GameTest.register("ExtensionTests", "add_entity_in_boat", (test) => {
  const testEx = new GameTestExtensions(test);
  testEx.addEntityInBoat("sheep", new BlockLocationIterator(1, 2, 1));
  test.succeed();
})
  .structureName("ComponentTests:platform")
  .tag(GameTest.Tags.suiteDefault);

GameTest.register("ExtensionTests", "make_about_to_drown", (test) => {
  const testEx = new GameTestExtensions(test);
  const villagerId = "minecraft:villager_v2<minecraft:ageable_grow_up>";
  const villager = test.spawn(villagerId, new BlockLocationIterator(2, 2, 2));

  testEx.makeAboutToDrown(villager);

  test.succeedWhen(() => {
    test.assertEntityPresentInArea(villagerId, false);
  });
})
  .structureName("ComponentTests:aquarium")
  .maxTicks(20)
  .tag(GameTest.Tags.suiteDefault);
