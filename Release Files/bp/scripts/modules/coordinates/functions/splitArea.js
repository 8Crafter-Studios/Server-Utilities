import { splitRange } from "./splitRange";
export function* splitArea(area, sizes = { x: 64, y: 128, z: 64 }) {
    const indices = { x: 0, y: 0, z: 0 };
    const xRanges = splitRange([area.from.x, area.to.x], sizes.x);
    for (const xRange of xRanges) {
        const zRanges = splitRange([area.from.z, area.to.z], sizes.z);
        for (const zRange of zRanges) {
            const partialRanges = [
                { x: xRange[0], z: zRange[0] },
                { x: xRange[1], z: zRange[1] },
            ];
            const yRanges = splitRange([area.from.y, area.to.y], sizes.y);
            for (const yRange of yRanges) {
                const finalRange = [
                    {
                        x: partialRanges[0].x,
                        y: yRange[0],
                        z: partialRanges[0].z,
                    },
                    {
                        x: partialRanges[1].x,
                        y: yRange[1],
                        z: partialRanges[1].z,
                    },
                    { ...indices },
                    {
                        x: partialRanges[0].x - area.from.x,
                        y: yRange[0] - area.from.y,
                        z: partialRanges[0].z - area.from.z,
                    },
                ];
                indices.y++;
                yield finalRange;
            }
            indices.y = 0;
            indices.z++;
        }
        indices.z = 0;
        indices.x++;
    }
}
//# sourceMappingURL=splitArea.js.map