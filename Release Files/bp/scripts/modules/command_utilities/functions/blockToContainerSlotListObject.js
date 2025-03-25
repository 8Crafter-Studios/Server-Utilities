export function blockToContainerSlotListObject(block) {
    let itemList = {};
    let container = block.getComponent("inventory")?.container;
    for (let i = 0; i < (container?.size ?? 0); i++) {
        itemList[String(i)] = container.getSlot(i);
    }
    return !!container ? itemList : undefined;
}
//# sourceMappingURL=blockToContainerSlotListObject.js.map