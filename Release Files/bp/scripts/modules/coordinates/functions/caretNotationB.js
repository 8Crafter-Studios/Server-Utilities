export function caretNotationB(location, r, { x, y }) {
    const Z = r *
        (-Math.cos(x) * Math.sin(y), -Math.sin(x), Math.cos(x) * Math.cos(y));
    const Y = r *
        (-Math.sin(x) * Math.sin(y), Math.cos(x), Math.sin(x) * Math.cos(y));
    const X = r * (Math.cos(y), 0, Math.sin(y));
    const newPosition = {
        x: location.x + X,
        y: location.y + Y,
        z: location.z + Z,
    };
    return newPosition;
}
//# sourceMappingURL=caretNotationB.js.map