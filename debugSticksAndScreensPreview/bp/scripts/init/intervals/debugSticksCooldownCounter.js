import { system, world } from "@minecraft/server";
import { interactable_blockb } from "modules/main/classes/interactable_blockb";
repeatingIntervals.debugSticksCooldownCounter = system.runInterval(() => {
    world.getAllPlayers().forEach((player) => {
        if (interactable_blockb.interactable_block.find((playerId) => playerId.id == player.id) == undefined) {
            interactable_blockb.interactable_block.push({
                id: player.id,
                delay: 0,
                holdDuration: 0,
            });
        }
        else {
            interactable_blockb.interactable_block.find((playerId) => playerId.id == player.id).delay = Math.max(0, interactable_blockb.interactable_block.find((playerId) => playerId.id == player.id).delay - 1);
            interactable_blockb.interactable_block.find((playerId) => playerId.id == player.id).holdDuration = Math.max(0, interactable_blockb.interactable_block.find((playerId) => playerId.id == player.id).holdDuration - 1);
        } /*if (player.isSneaking && ((interactable_blockb.interactable_block.find((playerId)=>(playerId.id == player.id)).holdDuration == 0) || (interactable_blockb.interactable_block.find((playerId)=>(playerId.id == player.id)).holdDuration == undefined)) && ((player.getComponent("minecraft:inventory") as EntityInventoryComponent).container.getItem(player.selectedSlotIndex).typeId === "andexdb:debug_stick")){
    player.onScreenDisplay.setActionBar(`§l§eTags: §r§a${player.getBlockFromViewDirection().block.getTags().join(", ")}\n§l§eBlock States: §r§a${Object.entries(player.getBlockFromViewDirection().block.permutation.getAllStates()).join("\n")}`)}; */
    });
}, 1);
//# sourceMappingURL=debugSticksCooldownCounter.js.map