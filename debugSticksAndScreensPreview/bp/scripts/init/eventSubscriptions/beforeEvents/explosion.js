import { VECTOR3_ZERO, Vector3Utils } from "@minecraft/math.js";
import { world, Player } from "@minecraft/server";
import { ProtectedAreaTester, protectedAreaVariables } from "init/variables/protectedAreaVariables";
import { disconnectingPlayers } from "modules/commands/constants/disconnectingPlayers";
import { getPlayersWithAnyOfTags } from "modules/commands/functions/getPlayersWithAnyOfTags";
import { vTStr } from "modules/commands/functions/vTStr";
import { testIsWithinRanges } from "modules/spawn_protection/functions/testIsWithinRanges";
subscribedEvents.beforeExplosion = world.beforeEvents.explosion.subscribe((event) => {
    if (disconnectingPlayers.includes(event.source?.id)) {
        event.cancel = true;
        return;
    }
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:explosion")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => {
            if (currentplayer.hasTag("explosionBeforeEventDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            }
        });
    } /*
eval(String(world.getDynamicProperty("scriptEvalBeforeEventsExplosion")))*/
    try {
        getPlayersWithAnyOfTags([
            "getBeforeExplosionNotifications",
            "getExplosionNotificationsForSourceType:" +
                (event.source?.typeId ?? "none"),
            "getExplosionNotificationsForSourceId:" +
                (event.source?.id ?? "none"),
        ])
            .filter((p) => !p.hasTag("excludeBeforeExplosionNotificationsIn:" +
            event.dimension) &&
            (!!event.source
                ? !p.hasTag("excludeBeforeExplosionNotificationsType:" +
                    event.source?.typeId)
                : true) &&
            (!!event.source && (event.source?.isValid() ?? true)
                ? !p.hasTag("excludeBeforeExplosionNotificationsBy:" +
                    (event.source?.name ??
                        tryget(() => event.source?.nameTag))) &&
                    !p.hasTag("excludeBeforeExplosionNotificationsById:" +
                        event.source?.id)
                : !p.hasTag("excludeBeforeExplosionNotificationsWithNoSource")))
            .forEach((p) => {
            psend(p, `§r§f[§l§dServer§r§f]${world.getDynamicProperty("serverNotificationSpacer") ?? ""}[§ebeforeExplosion§r]${!!event.source
                ? "[" +
                    (event.source?.name ??
                        tryget(() => event.source?.nameTag == ""
                            ? undefined
                            : event.source?.nameTag) ??
                        event.source?.typeId +
                            "<" +
                            event.source?.id +
                            ">") +
                    "]"
                : ""} ${!!event.source
                ? "Triggered explosion"
                : "Explosion occurred"} in ${dimensionTypeDisplayFormatting[event.dimension.id]}${event.getImpactedBlocks().length == 0
                ? ""
                : " around " +
                    vTStr((() => {
                        let value = VECTOR3_ZERO;
                        event
                            .getImpactedBlocks()
                            .forEach((b) => {
                            value =
                                Vector3Utils.add(value, b.location);
                        });
                        return Vector3Utils.scale(value, 1 /
                            event.getImpactedBlocks()
                                .length);
                    })())}. `);
            let pn = new PlayerNotifications(p);
            srun(() => p.playSound(pn.getBeforeExplosionNotificationsNotificationSound
                .soundId, {
                pitch: pn
                    .getBeforeExplosionNotificationsNotificationSound
                    .pitch,
                volume: pn
                    .getBeforeExplosionNotificationsNotificationSound
                    .volume,
            }));
        });
    }
    catch (e) {
        console.error(e, e.stack);
    }
    //world.getAllPlayers().filter((player) => ( player.hasTag("getExplosionEventNotifications"))).forEach((currentPlayer) => { currentPlayer.sendMessage("Location: [ " + event.source.location.x+", "+event.source.location.y+", "+event.source.location.z + " ], Dimension: " + event.dimension.id) });
    if (!!!event.source?.location
        ? false
        : new ProtectedAreaTester("explosion").testIsInArea(event, event.source.location, event.source.dimension) /* ((testIsWithinRanges(
          protectedAreaVariables.noExplosionAreas.positive.filter(
              (v) =>
                  v.dimension == dimensions.indexOf(event.dimension)
          ),
          event.source.location
      ) ?? false) == true &&
          (testIsWithinRanges(
              protectedAreaVariables.noExplosionAreas.negative.filter(
                  (v) =>
                      v.dimension ==
                      dimensions.indexOf(event.dimension)
              ),
              event.source.location
          ) ?? false) == false) ||
      ((testIsWithinRanges(
          protectedAreaVariables.protectedAreas.positive.filter(
              (v) =>
                  v.dimension == dimensions.indexOf(event.dimension)
          ),
          event.source.location
      ) ?? false) == true &&
          (testIsWithinRanges(
              protectedAreaVariables.protectedAreas.negative.filter(
                  (v) =>
                      v.dimension ==
                      dimensions.indexOf(event.dimension)
              ),
              event.source.location
          ) ?? false) == false) */) {
        event.cancel = true; /*
    console.warn(event.isExpanding);
    console.warn(event.block.x, event.block.y, event.block.z);
    console.warn(event.piston.getAttachedBlocks());
    console.warn(event.dimension);*/
    }
    else {
        //console.warn("before set: "+JSONStringify(event.getImpactedBlocks(), true))
        event.setImpactedBlocks(event.getImpactedBlocks().filter((blockselected) => !new ProtectedAreaTester("explosion").testIsInArea(event, blockselected.location, event.dimension, { block: blockselected }) /* (
            ((testIsWithinRanges(
                protectedAreaVariables.noExplosionAreas.positive.filter(
                    (v) =>
                        v.dimension ==
                        dimensions.indexOf(event.dimension)
                ),
                blockselected.location
            ) ?? false) == true &&
                (testIsWithinRanges(
                    protectedAreaVariables.noExplosionAreas.negative.filter(
                        (v) =>
                            v.dimension ==
                            dimensions.indexOf(event.dimension)
                    ),
                    blockselected.location
                ) ?? false) == false) ||
            ((testIsWithinRanges(
                protectedAreaVariables.protectedAreas.positive.filter(
                    (v) =>
                        v.dimension ==
                        dimensions.indexOf(event.dimension)
                ),
                blockselected.location
            ) ?? false) == true &&
                (testIsWithinRanges(
                    protectedAreaVariables.protectedAreas.negative.filter(
                        (v) =>
                            v.dimension ==
                            dimensions.indexOf(event.dimension)
                    ),
                    blockselected.location
                ) ?? false) == false)
        ) */));
    }
    //console.warn("after set: "+JSONStringify(event.getImpactedBlocks(), true))
});
//# sourceMappingURL=explosion.js.map