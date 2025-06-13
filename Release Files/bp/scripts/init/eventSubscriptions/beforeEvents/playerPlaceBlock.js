import { world } from "@minecraft/server";
import { ProtectedAreaTester, protectedAreaVariables } from "init/variables/protectedAreaVariables";
import { testIsWithinRanges } from "modules/spawn_protection/functions/testIsWithinRanges";
import { securityVariables } from "security/ultraSecurityModeUtils";
subscribedEvents.beforePlayerPlaceBlock =
    world.beforeEvents.playerPlaceBlock.subscribe((event) => {
        try {
            eval(String(world.getDynamicProperty("evalBeforeEvents:playerPlaceBlock")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => {
                if (currentplayer.hasTag("playerPlaceBlockBeforeEventDebugErrors")) {
                    currentplayer.sendMessage(e + " " + e.stack);
                }
            });
        } /*
    if (event.itemStack?.typeId === "andexdb:debug_stick" || event.itemStack?.typeId === "andexdb:liquid_clipped_debug_stick"){
    event.cancel = true
    }; */
        world
            .getAllPlayers()
            .filter((player) => player.hasTag("getPlayerBlockPlacingEventNotifications"))
            .forEach((currentPlayer) => {
            currentPlayer.sendMessage("[beforeEvents.playerPlaceBlock]Location: [ " +
                event.block.location.x +
                ", " +
                event.block.location.y +
                ", " +
                event.block.location.z +
                " ], Dimension: " +
                event.block.dimension.id +
                ", Block Type: " +
                (event.block?.typeId ?? "") +
                ", Player: " +
                event.player.name);
        });
        if ((securityVariables.ultraSecurityModeEnabled ? securityVariables.testPlayerForPermission(event.player, permissionType["andexdb.bypassProtectedAreas"]) : event.player.hasTag("canBypassProtectedAreas")) != true &&
            new ProtectedAreaTester("playerPlaceBlock").testIsInArea(event, event.block.location, event.block.dimension) /* (((testIsWithinRanges(
            protectedAreaVariables.noBlockPlaceAreas.positive.filter(
                (v) => v.dimension == dimensions.indexOf(event.dimension)
            ),
            event.block.location
        ) ?? false) == true &&
            (testIsWithinRanges(
                protectedAreaVariables.noBlockPlaceAreas.negative.filter(
                    (v) => v.dimension == dimensions.indexOf(event.dimension)
                ),
                event.block.location
            ) ?? false) == false) ||
            ((testIsWithinRanges(
                protectedAreaVariables.protectedAreas.positive.filter(
                    (v) => v.dimension == dimensions.indexOf(event.dimension)
                ),
                event.block.location
            ) ?? false) == true &&
                (testIsWithinRanges(
                    protectedAreaVariables.protectedAreas.negative.filter(
                        (v) => v.dimension ==
                            dimensions.indexOf(event.dimension)
                    ),
                    event.block.location
                ) ?? false) == false)) */) {
            event.cancel = true;
        }
        else {
            const borderSettings = config.toJSON(config.worldBorder[dimensionse[dimensionsd.indexOf(event.dimension.id)]]);
            if (borderSettings.enabled &&
                borderSettings.preventWorldInteractionOutsideBorder) {
                if (!event.player.hasTag("canBypassWorldBorderInteractionLimits") &&
                    (event.block.x >= borderSettings.to.x ||
                        event.block.z >= borderSettings.to.z ||
                        event.block.x < borderSettings.from.x ||
                        event.block.z < borderSettings.from.z)) {
                    event.cancel = true;
                }
            }
        }
    });
//# sourceMappingURL=playerPlaceBlock.js.map