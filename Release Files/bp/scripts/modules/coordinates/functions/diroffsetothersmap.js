export function diroffsetothersmap(direction) {
    return {
        Up: { x: 1, y: 0, z: 1 },
        Down: { x: 1, y: 0, z: 1 },
        East: { x: 0, y: 1, z: 1 },
        West: { x: 0, y: 1, z: 1 },
        North: { x: 1, y: 1, z: 0 },
        South: { x: 1, y: 1, z: 0 },
    }[direction];
}
//# sourceMappingURL=diroffsetothersmap.js.map