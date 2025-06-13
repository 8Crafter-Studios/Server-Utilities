export function dirreversemap(direction) {
    return {
        above: "below",
        below: "above",
        east: "west",
        west: "east",
        north: "south",
        south: "north",
    }[direction.toLocaleLowerCase()];
}
//# sourceMappingURL=dirreversemap.js.map