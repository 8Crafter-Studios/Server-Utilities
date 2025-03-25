export function splitRange([min, max], size) {
    const result = [];
    let start = min;
    while (start <= max) {
        const end = Math.min(start + size - 1, max);
        result.push([start, end]);
        start = end + 1;
    }
    return result;
}
//# sourceMappingURL=splitRange.js.map