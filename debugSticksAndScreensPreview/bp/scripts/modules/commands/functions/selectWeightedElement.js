export function selectWeightedElement(items, weightProp = "weight") {
    let total = items.reduce((acc, item) => acc + (item[weightProp] ?? 1), 0);
    let threshold = Math.random() * total;
    for (let item of items) {
        threshold -= item[weightProp] ?? 1;
        if (threshold < 0) {
            return item;
        }
    }
}
//# sourceMappingURL=selectWeightedElement.js.map