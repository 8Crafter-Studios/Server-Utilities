export function blockToContainerSlotArray(block) {
    let itemList = [];
    let container = block.getComponent("inventory")?.container;
    for (let i = 0; i < (container?.size ?? 0); i++) {
        itemList.push(container.getSlot(i));
    }
    return !!container ? itemList : undefined;
}
//# sourceMappingURL=blockToContainerSlotArray.js.map