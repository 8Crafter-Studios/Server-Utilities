// Copyright (c) Microsoft Corporation.  All rights reserved.
import * as GameTest from "@minecraft/server-gametest";
function poweredRailTest(test, pulseTicks) {
    test.pulseRedstone({ x: 1, y: 2, z: 3 }, pulseTicks);
    test
        .startSequence()
        .thenIdle(8)
        .thenExecute(() => test.assertItemEntityCountIs("powered_rail", { x: 1, y: 2, z: 1 }, 1.0, 1)) // powered rail
        .thenSucceed();
}
GameTest.register("DuplicationTests", "powered_rail_twist_bedrock", (test) => {
    poweredRailTest(test, 2);
})
    .structureName("DuplicationTests:powered_rail_twist")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("DuplicationTests", "powered_rail_twist", (test) => {
    poweredRailTest(test, 1);
})
    .tag("suite:java_parity")
    .tag(GameTest.Tags.suiteDisabled); // Single pulse redstone sometimes doesn't activate the piston
GameTest.register("DuplicationTests", "powered_rail_straight_bedrock", (test) => {
    poweredRailTest(test, 2);
})
    .structureName("DuplicationTests:powered_rail_straight")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("DuplicationTests", "powered_rail_straight", (test) => {
    poweredRailTest(test, 1);
})
    .tag("suite:java_parity")
    .tag(GameTest.Tags.suiteDisabled); // Single pulse redstone sometimes doesn't activate the piston
GameTest.register("DuplicationTests", "detector_rail", (test) => {
    test.spawn("minecraft:minecart", { x: 1, y: 3, z: 2 });
    test
        .startSequence()
        .thenIdle(8)
        .thenExecute(() => test.assertItemEntityCountIs("detector_rail", { x: 1, y: 2, z: 1 }, 1.0, 1))
        .thenSucceed();
}).tag(GameTest.Tags.suiteDefault);
function railClassicTest(test, pulseTicks) {
    test.pulseRedstone({ x: 1, y: 5, z: 5 }, pulseTicks);
    test
        .startSequence()
        .thenIdle(3)
        .thenExecute(() => test.assertItemEntityCountIs("rail", { x: 1, y: 4, z: 2 }, 1.0, 0))
        .thenSucceed();
}
GameTest.register("DuplicationTests", "rail_classic_bedrock", (test) => {
    railClassicTest(test, 2);
})
    .structureName("DuplicationTests:rail_classic")
    .tag(GameTest.Tags.suiteDefault);
GameTest.register("DuplicationTests", "rail_classic", (test) => {
    railClassicTest(test, 1);
})
    .tag("suite:java_parity")
    .tag(GameTest.Tags.suiteDisabled); // Single pulse redstone sometimes doesn't activate the piston
//# sourceMappingURL=DuplicationTests.js.map