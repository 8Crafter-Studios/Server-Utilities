export function v3Multiply(a, b) {
    return typeof b == "object"
        ? { x: a.x * b.x, y: a.y * b.y, z: a.z * b.z }
        : { x: a.x * b, y: a.y * b, z: a.z * b };
}
//# sourceMappingURL=v3Multiply.js.map