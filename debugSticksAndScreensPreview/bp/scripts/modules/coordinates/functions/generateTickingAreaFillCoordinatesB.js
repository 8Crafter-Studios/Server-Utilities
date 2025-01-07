import { CompoundBlockVolume, Dimension, BlockVolume } from "@minecraft/server";
import { vTStr } from "modules/commands/functions/vTStr";
export function generateTickingAreaFillCoordinatesB(area, dimension, spawnEntityCallback = (l, e, i) => {
    try {
        let name = `generateTickingAreaFillCoordinates${Date.now()}EntityTickingArea${i}`;
        l.dimension.runCommand(`summon andexdb:tickingarea_6 ${name} ${vTStr(l)}`);
        e.push(l);
    }
    catch (e) {
        console.warn(e, e.stack);
    }
}) {
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
        spawnEntityCallback(Object.assign(a, { dimension: dimension, y: 320 }), locations, x);
    }
    return locations;
}
//# sourceMappingURL=generateTickingAreaFillCoordinatesB.js.map