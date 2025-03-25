import { world } from "@minecraft/server";
import { ProtectedAreaTester, protectedAreaVariables } from "init/variables/protectedAreaVariables";
import { testIsWithinRanges } from "modules/spawn_protection/functions/testIsWithinRanges";
import { securityVariables } from "security/ultraSecurityModeUtils";
subscribedEvents.beforeItemUseOn = world.beforeEvents.itemUseOn.subscribe((event) => {
    if (event.source.hasTag("debugStickDyingMode") &&
        event.block.typeId == "minecraft:cauldron") {
        event.cancel = false;
        return;
    }
    if (event.itemStack?.typeId === "andexdb:selection_tool") {
        event.cancel = true;
        // console.log(2);
        return;
    }
    if (!!event?.itemStack?.getDynamicProperty("itemUseOnCode")) {
        try {
            eval(String(event?.itemStack?.getDynamicProperty("itemUseOnCode")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => {
                if (currentplayer.hasTag("itemUseOnCodeDebugErrors")) {
                    currentplayer.sendMessage(e + e.stack);
                }
            });
        }
    }
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:itemUseOn")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => {
            if (currentplayer.hasTag("itemUseOnBeforeEventDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            }
        });
    }
    if (event.itemStack?.typeId === "andexdb:debug_stick" ||
        event.itemStack?.typeId === "andexdb:liquid_clipped_debug_stick") {
        event.cancel = true; /*
debugAction(event.source.getBlockFromViewDirection().block, event.source, 0)*/
    } /*
if (event.itemStack?.typeId === "andexdb:selection_tool") {
event.cancel = true
try {
    const mode = Boolean(event.source.getDynamicProperty("posM")??false)
    const posV = Vector3Utils.floor(event.block.location)
    event.source.setDynamicProperty(mode?"pos2":"pos1", posV)
    event.source.setDynamicProperty("posD", event.source.dimension.id)
    event.source.sendMessage(`Set ${mode?"pos2":"pos1"} to ${vTStr(posV)}.`)
    event.source.setDynamicProperty("posM", !mode)
}catch(e){console.error(e, e.stack)}
};*/
    world
        .getAllPlayers()
        .filter((player) => player.hasTag("getPlayerItemUseOnEventNotifications"))
        .forEach((currentPlayer) => {
        currentPlayer.sendMessage("[beforeEvents.itemUseOn]Location: [ " +
            event.block.location.x +
            ", " +
            event.block.location.y +
            ", " +
            event.block.location.z +
            " ], Dimension: " +
            event.block.dimension.id +
            ", Block Type: " +
            (event.block?.typeId ?? "") +
            ", Item Type: " +
            (event.itemStack?.typeId ?? "") +
            ", Player: " +
            event.source.name);
    });
    if ((securityVariables.ultraSecurityModeEnabled ? securityVariables.testPlayerForPermission(event.source, permissionType["andexdb.bypassProtectedAreas"]) : event.source.hasTag("canBypassProtectedAreas")) != true &&
        new ProtectedAreaTester("itemUseOn").testIsInArea(event, event.block.location, event.block.dimension) /* (((testIsWithinRanges(
        protectedAreaVariables.noBlockInteractAreas.positive.filter(
            (v) => v.dimension == dimensions.indexOf(event.block.dimension)
        ),
        event.block.location
    ) ?? false) == true &&
        (testIsWithinRanges(
            protectedAreaVariables.noBlockInteractAreas.negative.filter(
                (v) => v.dimension ==
                    dimensions.indexOf(event.block.dimension)
            ),
            event.block.location
        ) ?? false) == false) ||
        ((testIsWithinRanges(
            protectedAreaVariables.noInteractAreas.positive.filter(
                (v) => v.dimension ==
                    dimensions.indexOf(event.block.dimension)
            ),
            event.block.location
        ) ?? false) == true &&
            (testIsWithinRanges(
                protectedAreaVariables.noInteractAreas.negative.filter(
                    (v) => v.dimension ==
                        dimensions.indexOf(event.block.dimension)
                ),
                event.block.location
            ) ?? false) == false)) */) {
        event.cancel = true;
    }
    else {
        const borderSettings = Object.fromEntries(Object.entries(config.worldBorder[dimensionse[dimensionsd.indexOf(event.block.dimension.id)]]));
        if (borderSettings.enabled &&
            borderSettings.preventWorldInteractionOutsideBorder) {
            if (!event.source.hasTag("canBypassWorldBorderInteractionLimits") &&
                (event.block.x >= borderSettings.to.x ||
                    event.block.z >= borderSettings.to.z ||
                    event.block.x < borderSettings.from.x ||
                    event.block.z < borderSettings.from.z)) {
                event.cancel = true;
            }
        }
    }
    if (event.isFirstEvent) {
        if ([
            "andexdb:editor_stick",
            "andexdb:editor_stick_b",
            "andexdb:editor_stick_c",
            "andexdb:pick_block_stick",
            "andexdb:liquid_clipped_pick_block_stick",
            "andexdb:data_pick_block_stick",
            "andexdb:liquid_clipped_data_pick_block_stick",
        ].includes(event.itemStack?.typeId)) {
            event.cancel = true;
        }
    }
});
//# sourceMappingURL=itemUseOn.js.map