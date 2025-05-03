export function getPlayerHeldItemSlot(player) {
    return player
        .getComponent("inventory")
        .container.getSlot(player.selectedSlotIndex);
}
//# sourceMappingURL=getPlayerHeldItemSlot.js.map