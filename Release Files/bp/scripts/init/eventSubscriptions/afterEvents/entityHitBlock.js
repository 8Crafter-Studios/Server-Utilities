import { world, EntityInventoryComponent, Player, Block } from "@minecraft/server";
import { debugAction } from "modules/main/functions/debugAction";
subscribedEvents.afterEntityHitBlock =
    world.afterEvents.entityHitBlock.subscribe((event) => {
        try {
            eval(String(world.getDynamicProperty("evalAfterEvents:entityHitBlock")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => {
                if (currentplayer.hasTag("entityHitBlockAfterEventDebugErrors")) {
                    currentplayer.sendMessage(e + e.stack);
                }
            });
        }
        if (event.damagingEntity.getComponent("minecraft:inventory").container?.getItem(event.damagingEntity.selectedSlotIndex)?.typeId === "andexdb:debug_stick") {
            debugAction(event.hitBlock, event.damagingEntity, 1, Number(event.damagingEntity.isSneaking));
        }
        if (event.damagingEntity.getComponent("minecraft:inventory").container?.getItem(event.damagingEntity.selectedSlotIndex)?.typeId === "andexdb:liquid_clipped_debug_stick") {
            debugAction(event.damagingEntity.getBlockFromViewDirection({
                includeLiquidBlocks: true,
            })?.block, event.damagingEntity, 1, Number(event.damagingEntity.isSneaking));
        }
        world
            .getAllPlayers()
            .filter((player) => player.hasTag("getEntityHitBlockEventNotifications"))
            .forEach((currentPlayer) => {
            currentPlayer.sendMessage("[beforeEvents.entityHitBlock]Location: " +
                event.hitBlock.location +
                ", Dimension: " +
                event.hitBlock.dimension +
                ", Block Type: " +
                (event.hitBlock?.typeId ?? "") +
                ", Player: " +
                event.damagingEntity.name);
        });
    });
//# sourceMappingURL=entityHitBlock.js.map