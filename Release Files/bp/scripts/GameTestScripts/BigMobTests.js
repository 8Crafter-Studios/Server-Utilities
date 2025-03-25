// Copyright (c) Microsoft Corporation.  All rights reserved.
import * as GameTest from "@minecraft/server-gametest";
const BIGMOB_TEST_MAX_TICKS = 100;
const BIGMOB_TEST_STARTUP_TICKS = 0;
const BIGMOB_REQUIRE = false;
const MOBTOTEST = ["zoglin", "ravager", "iron_golem", "spider", "horse"];
function _descending(test, wallSide, entityType) {
    const zOffset = wallSide == "RIGHT" ? -0.25 : 0.25;
    const spawnType = "minecraft:" + entityType;
    const mob = test.spawnWithoutBehaviorsAtLocation(spawnType, { x: 0.5, y: 6, z: 1.5 + zOffset });
    const targetPos = { x: 7, y: 2, z: 1 };
    test.walkTo(mob, targetPos, 1);
    test.succeedWhenEntityPresent(spawnType, targetPos, true);
}
function createDescendingTest(wallSide, entityType) {
    const structureName = "BigMobTests:altitude_change_wall_on_" + wallSide.toLowerCase();
    const testName = "altitude_change_wall_on_" + wallSide.toLowerCase() + "_descend_" + entityType;
    // Iron golems and Ravagers every so often get stucks when they are spawned
    if (entityType == "horse") {
        GameTest.register("BigMobTests", testName, (test) => {
            _descending(test, wallSide, entityType);
        })
            .structureName(structureName)
            .maxTicks(BIGMOB_TEST_MAX_TICKS)
            .setupTicks(BIGMOB_TEST_STARTUP_TICKS)
            .tag(GameTest.Tags.suiteDisabled) // Somes horses always walk at very low speed and cause timeout. So I disabled these tests.
            .required(BIGMOB_REQUIRE)
            .rotateTest(true);
    }
    else {
        GameTest.register("BigMobTests", testName, (test) => {
            _descending(test, wallSide, entityType);
        })
            .structureName(structureName)
            .maxTicks(BIGMOB_TEST_MAX_TICKS)
            .setupTicks(BIGMOB_TEST_STARTUP_TICKS)
            .tag(GameTest.Tags.suiteDefault)
            .required(BIGMOB_REQUIRE)
            .rotateTest(true);
    }
}
function _ascending(test, wallSide, entityType) {
    const spawnType = "minecraft:" + entityType;
    const targetPos = { x: 0, y: 6, z: 1 };
    const targetLocPos = { x: 0.5, y: 6, z: 1.5 };
    const zOffset = wallSide == "RIGHT" ? -0.25 : 0.25;
    const mob = test.spawnWithoutBehaviorsAtLocation(spawnType, { x: 7, y: 2, z: 1.5 + zOffset });
    test.walkToLocation(mob, targetLocPos, 1);
    test.succeedWhenEntityPresent(spawnType, targetPos, true);
}
function createAscendingTest(wallSide, entityType) {
    const structureName = "BigMobTests:altitude_change_wall_on_" + wallSide.toLowerCase();
    const testName = "altitude_change_wall_on_" + wallSide.toLowerCase() + "_ascend_" + entityType;
    if (entityType == "horse") {
        GameTest.register("BigMobTests", testName, (test) => {
            _ascending(test, wallSide, entityType);
        })
            .structureName(structureName)
            .maxTicks(BIGMOB_TEST_MAX_TICKS)
            .setupTicks(BIGMOB_TEST_STARTUP_TICKS)
            .tag("suite:java_parity")
            .tag(GameTest.Tags.suiteDisabled) // Somes horses always walk at very low speed and cause timeout.
            .required(BIGMOB_REQUIRE)
            .rotateTest(true);
    }
    else {
        GameTest.register("BigMobTests", testName, (test) => {
            _ascending(test, wallSide, entityType);
        })
            .structureName(structureName)
            .maxTicks(BIGMOB_TEST_MAX_TICKS)
            .setupTicks(BIGMOB_TEST_STARTUP_TICKS)
            .tag(GameTest.Tags.suiteDefault)
            .required(BIGMOB_REQUIRE)
            .rotateTest(true);
    }
}
for (var bigmobIndex = 0; bigmobIndex < MOBTOTEST.length; bigmobIndex++) {
    createDescendingTest("RIGHT", MOBTOTEST[bigmobIndex]);
    createDescendingTest("LEFT", MOBTOTEST[bigmobIndex]);
    createAscendingTest("RIGHT", MOBTOTEST[bigmobIndex]);
    createAscendingTest("LEFT", MOBTOTEST[bigmobIndex]);
}
//# sourceMappingURL=BigMobTests.js.map