export function* generateMathExpression(expression, generateCallback, from, to, pos1, pos2, step = 1) {
    var count = 0n;
    var index = 0n;
    for (let x = Math.min(from.x, to.x); x <= Math.max(from.x, to.x); x += step) {
        for (let y = Math.min(from.y, to.y); y <= Math.max(from.y, to.y); y += step) {
            for (let z = Math.min(from.z, to.z); z <= Math.max(from.z, to.z); z += step) {
                if (expression(x, y, z, x - (from.x + to.x) / 2, y - (from.y + to.y) / 2, z - (from.z + to.z) / 2, pos1.x, pos1.y, pos1.z, pos2.x, pos2.y, pos2.z, Math.min(from.x, to.x), Math.min(from.y, to.y), Math.min(from.z, to.z), Math.max(from.x, to.x), Math.max(from.y, to.y), Math.max(from.z, to.z))) {
                    generateCallback({
                        x: x,
                        y: y,
                        z: z,
                        rx: x - (from.x + to.x) / 2,
                        ry: y - (from.y + to.y) / 2,
                        rz: z - (from.z + to.z) / 2,
                        ax: pos1.x,
                        ay: pos1.y,
                        az: pos1.z,
                        bx: pos2.x,
                        by: pos2.y,
                        bz: pos2.z,
                        nx: Math.min(from.x, to.x),
                        ny: Math.min(from.y, to.y),
                        nz: Math.min(from.z, to.z),
                        px: Math.max(from.x, to.x),
                        py: Math.max(from.y, to.y),
                        pz: Math.max(from.z, to.z),
                        count,
                        index,
                    });
                    count++;
                }
                index++;
                yield void null;
            }
        }
    }
    return count;
}
//# sourceMappingURL=generateMathExpression.js.map