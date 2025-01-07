export function parseExpressionR(str) {
    return Function("wx, wy, wz, x, y, z, ax, ay, az, bx, by, bz, nx, ny, nz, px, py, pz", "const approxEquals = (v1, v2, epsilon = 0.001) => Math.abs(v1 - v2) < epsilon; return(" +
        str +
        ")");
}
//# sourceMappingURL=parseExpressionR.js.map