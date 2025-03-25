import { approxEqual } from "./approxEqual";
import { approxEquals } from "./approxEquals";
import { approximatelyEqual } from "./approximatelyEqual";
import { approximatelyEquals } from "./approximatelyEquals";
approxEqual;
approxEquals;
approximatelyEqual;
approximatelyEquals;
export function parseExpressionBR(str) {
    return (wx, wy, wz, x, y, z, ax, ay, az, bx, by, bz, nx, ny, nz, px, py, pz) => {
        return eval(str);
    };
}
//# sourceMappingURL=parseExpressionBR.js.map