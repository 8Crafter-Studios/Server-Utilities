import { CompoundBlockVolume, Dimension, BlockVolume } from "@minecraft/server";
export function generateTickingAreaFillCoordinates(area, dimension) {
    const locations = [];
    //${se}let b = new CompoundBlockVolume(); b.pushVolume({volume: new BlockVolume(Vector.one, Vector.multiply(Vector.one, 20)), action: 0}); bsend(b.getBlockLocationIterator()?.next()?.value);
    for (let x = 0; !!(() => {
        for (const c of area.getBlockLocationIterator()) {
            return c;
        }
    })(); x++) {
        let a = (() => {
            for (const c of area.getBlockLocationIterator()) {
                return c;
            }
        })();
        area.pushVolume({
            volume: new BlockVolume({ x: a.x - 64, y: area.getMin().y, z: a.z - 64 }, { x: a.x + 64, y: area.getMax().y, z: a.z + 64 }),
            action: 1,
        });
        locations.push(Object.assign(a, { dimension: dimension, y: 320 }));
    }
    return locations;
}
//# sourceMappingURL=generateTickingAreaFillCoordinates.js.map