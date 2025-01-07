import { CompoundBlockVolume, Dimension, Entity, system } from "@minecraft/server";
import { vTStr } from "modules/commands/functions/vTStr";
import { generateTickingAreaFillCoordinates } from "./generateTickingAreaFillCoordinates";
import { getDistance } from "./getDistance";
export async function generateTickingAreaFillCoordinatesC(center, area, dimension, spawnEntityCallback = (l, e, i) => {
    try {
        let name = `generateTickingAreaFillCoordinates${Date.now()}EntityTickingArea${i}`;
        l.dimension.runCommand(`summon andexdb:tickingarea_6 ${name} ${vTStr(l)}`);
        e.push(l.dimension
            .getEntitiesAtBlockLocation(l)
            .find((v) => v.typeId == "andexdb:tickingarea_6" &&
            v.nameTag == name));
    }
    catch (e) {
        console.warn(e, e.stack);
    }
}) {
    const locations = generateTickingAreaFillCoordinates(area, dimension).sort((a, b) => getDistance(a, center) - getDistance(b, center));
    const entities = [];
    //${se}let b = new CompoundBlockVolume(); b.pushVolume({volume: new BlockVolume(Vector.one, Vector.multiply(Vector.one, 20)), action: 0}); bsend(b.getBlockLocationIterator()?.next()?.value);
    for (const l of locations) {
        system.runTimeout(() => spawnEntityCallback(l, entities, locations.indexOf(l)), 2 * locations.indexOf(l));
    }
    return new Promise((resolve, reject) => {
        system.runTimeout(() => resolve(entities), locations.length * 2);
    });
}
//# sourceMappingURL=generateTickingAreaFillCoordinatesC.js.map