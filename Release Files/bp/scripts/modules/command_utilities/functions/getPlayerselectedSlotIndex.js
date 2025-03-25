export function getPlayerselectedSlotIndex(player) {
    return player
        .getComponent("inventory")
        .container.getSlot(player.selectedSlotIndex);
}
//# sourceMappingURL=getPlayerselectedSlotIndex.js.map