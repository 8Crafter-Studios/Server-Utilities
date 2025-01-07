export function getType(areaGroup, type) {
    return areaGroup
        .split("|")
        .filter((q) => q.split(", ")[6] == String(type))
        .join("|");
}
//# sourceMappingURL=getType.js.map