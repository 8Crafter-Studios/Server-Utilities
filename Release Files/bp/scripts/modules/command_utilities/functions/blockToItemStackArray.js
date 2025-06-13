export function blockToItemStackArray(block) {
    let itemList = [];
    let container = block.getComponent("inventory")?.container;
    for (let i = 0; i < (container?.size ?? 0); i++) {
        itemList.push(container?.getItem(i));
    }
    return itemList;
}
//# sourceMappingURL=blockToItemStackArray.js.map