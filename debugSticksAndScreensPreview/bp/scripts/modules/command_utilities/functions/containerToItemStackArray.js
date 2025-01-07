export function containerToItemStackArray(container) {
    let itemList = [];
    for (let i = 0; i < container.size; i++) {
        itemList.push(container.getItem(i));
    }
    return itemList;
}
//# sourceMappingURL=containerToItemStackArray.js.map