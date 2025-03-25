export function selectWeightedElement(items, weightProp) {
    let total = items.reduce((acc, item) => acc + (item[weightProp ?? "weight"] ?? 1), 0);
    let threshold = Math.random() * total;
    for (let item of items) {
        threshold -= item[weightProp ?? "weight"] ?? 1;
        if (threshold < 0) {
            return item;
        }
    }
}
//# sourceMappingURL=selectWeightedElement.js.map