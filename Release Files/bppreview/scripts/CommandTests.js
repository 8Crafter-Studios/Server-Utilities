// Copyright (c) Microsoft Corporation.  All rights reserved.

import * as GameTest from "@minecraft/server-gametest";

///
// Commands
///

GameTest.registerAsync("CommandTests", "commands_api_player_teleport", async (test) => {
  const startLoc = {x: 6, y: 2, z: 1};
  const endLoc = {x: 1, y: 2, z: 6};

  const player = test.spawnSimulatedPlayer(startLoc, "Teleport-o-man"); // This line is never getting hit?!

  await test.idle(20);
  test.assertEntityInstancePresent(player, startLoc);

  await test.idle(20);
  const endLocAbs = test.worldBlockLocation(endLoc);
  player.runCommandAsync(`teleport ${endLocAbs.x} ${endLocAbs.y} ${endLocAbs.z}`);

  await test.idle(20);
  test.assertEntityInstancePresent(player, endLoc);

  test.succeed();
})
  .structureName("CommandTests:commands_teleport")
  .tag(GameTest.Tags.suiteDefault);

GameTest.registerAsync("CommandTests", "commands_api_pig_teleport", async (test) => {
  const startLoc = {x: 6, y: 2, z: 1};
  const endLoc = {x: 1, y: 2, z: 6};

  const entity = test.spawn("minecraft:pig", startLoc);

  await test.idle(20);
  test.assertEntityInstancePresent(entity, startLoc);

  await test.idle(20);
  const endLocAbs = test.worldBlockLocation(endLoc);
  entity.runCommandAsync(`teleport ${endLocAbs.x} ${endLocAbs.y} ${endLocAbs.z}`);

  await test.idle(20);
  test.assertEntityInstancePresent(entity, endLoc);

  test.succeed();
})
  .structureName("CommandTests:commands_teleport")
  .tag(GameTest.Tags.suiteDefault);

GameTest.registerAsync("CommandTests", "commands_api_dimension_spawn_pig", async (test) => {
  const spawnLoc = {x: 6, y: 2, z: 1};

  const absSpawnLoc = test.worldBlockLocation({x: 6, y: 2, z: 1});
  test.getDimension().runCommandAsync(`summon minecraft:pig ${absSpawnLoc.x} ${absSpawnLoc.y} ${absSpawnLoc.z}`);

  await test.idle(20);
  test.assertEntityPresent("minecraft:pig", spawnLoc);

  test.succeed();
})
  .structureName("CommandTests:commands_teleport")
  .tag(GameTest.Tags.suiteDefault);

GameTest.registerAsync("CommandTests", "commands_api_execute_vs_player", async (test) => {
  const spawnLoc1 = {x: 1, y: 2, z: 1};
  const spawnLoc2 = {x: 3, y: 2, z: 1};
  const playerName1 = "Sim Player (execute at)";
  const playerName2 = "Sim Player (runCommand)";
  const player1 = test.spawnSimulatedPlayer(spawnLoc1, playerName1);
  const player2 = test.spawnSimulatedPlayer(spawnLoc2, playerName2);

  // Spawn blocks
  await test.idle(20);

  test.getDimension().runCommandAsync(`execute "${playerName1}" ~ ~ ~ setblock ~ ~2 ~ stone`);
  player2.runCommandAsync(`setblock ~ ~2 ~ stone`);

  // Test for blocks
  await test.idle(40);

  test.assert(
    test.getBlock({x: 1, y: 4, z: 1}).id == "minecraft:stone",
    `Expected Stone block above ${playerName1}.`
  );
  test.assert(
    test.getBlock({x: 3, y: 4, z: 1}).id == "minecraft:stone",
    `Expected Stone block above ${playerName2}.`
  );
  test.succeed();
})
  .structureName("CommandTests:doublecage")
  .maxTicks(100);

///
// Async Commands
///

GameTest.registerAsync("CommandTests", "async_commands_api_player_teleport", async (test) => {
  const startLoc = {x: 6, y: 2, z: 1};
  const endLoc = {x: 1, y: 2, z: 6};

  const player = test.spawnSimulatedPlayer(startLoc, "Teleport-o-man"); // This line is never getting hit?!

  await test.idle(20);
  test.assertEntityInstancePresent(player, startLoc);

  await test.idle(20);
  const endLocAbs = test.worldBlockLocation(endLoc);
  let result = await player.runCommandAsync(`teleport ${endLocAbs.x} ${endLocAbs.y} ${endLocAbs.z}`);
  test.assert(result.successCount > 0, `Expected successCount > 0, ${result.successCount}`);

  await test.idle(20);
  test.assertEntityInstancePresent(player, endLoc);

  test.succeed();
})
  .structureName("CommandTests:commands_teleport")
  .tag(GameTest.Tags.suiteDefault);

GameTest.registerAsync("CommandTests", "async_commands_api_dimension_spawn_pig", async (test) => {
  const spawnLoc = {x: 6, y: 2, z: 1};

  const absSpawnLoc = test.worldBlockLocation({x: 6, y: 2, z: 1});
  let result = await test
    .getDimension()
    .runCommandAsync(`summon minecraft:pig ${absSpawnLoc.x} ${absSpawnLoc.y} ${absSpawnLoc.z}`);
  test.assert(result.successCount > 0, `Expected successCount > 0, ${result.successCount}`);

  await test.idle(20);
  test.assertEntityPresent("minecraft:pig", spawnLoc);

  test.succeed();
})
  .structureName("CommandTests:commands_teleport")
  .tag(GameTest.Tags.suiteDefault);

GameTest.registerAsync("CommandTests", "async_commands_api_execute_vs_player", async (test) => {
  const spawnLoc1 = {x: 1, y: 2, z: 1};
  const spawnLoc2 = {x: 3, y: 2, z: 1};
  const playerName1 = "Sim Player (execute at)";
  const playerName2 = "Sim Player (runCommand)";
  const player1 = test.spawnSimulatedPlayer(spawnLoc1, playerName1);
  const player2 = test.spawnSimulatedPlayer(spawnLoc2, playerName2);

  // Spawn blocks
  await test.idle(20);

  let result = await test.getDimension().runCommandAsync(`execute "${playerName1}" ~ ~ ~ setblock ~ ~2 ~ stone`);
  test.assert(result.successCount > 0, `Expected successCount > 0, ${result.successCount}`);

  player2.runCommandAsync(`setblock ~ ~2 ~ stone`);

  // Test for blocks
  await test.idle(40);

  test.assert(
    test.getBlock({x: 1, y: 4, z: 1}).id == "minecraft:stone",
    `Expected Stone block above ${playerName1}.`
  );
  test.assert(
    test.getBlock({x: 3, y: 4, z: 1}).id == "minecraft:stone",
    `Expected Stone block above ${playerName2}.`
  );
  test.succeed();
})
  .structureName("CommandTests:doublecage")
  .maxTicks(100);
