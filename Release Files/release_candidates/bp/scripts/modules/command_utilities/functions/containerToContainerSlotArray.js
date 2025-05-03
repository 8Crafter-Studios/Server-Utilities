export function containerToContainerSlotArray(container) {
    let itemList = [];
    for (let i = 0; i < container.size; i++) {
        itemList.push(container.getSlot(i));
    }
    return itemList;
}
//# sourceMappingURL=containerToContainerSlotArray.js.map