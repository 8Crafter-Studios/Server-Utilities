import { world, Dimension } from "@minecraft/server";
import { splitArea } from "modules/coordinates/functions/splitArea";
export class blockClipboard {
    static get ids() {
        return world.structureManager
            .getWorldStructureIds()
            .filter((v) => v.startsWith("andexdb:clipboard"));
    }
    static get saveSize() {
        return (world.getDynamicProperty(`andexdb:clipboards`) ??
            Vector.zero);
    }
    static clear() {
        this.ids.forEach((v) => world.structureManager.delete(v));
    }
    static saveRange(dimension, range, options) {
        try {
            world.structureManager.createFromWorld(`andexdb:clipboard,${range[2].x ?? 0},${range[2].y ?? 0},${range[2].z ?? 0}`, dimension, range[0], range[1], options);
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    static save(dimension, area, options, sizeLimits = { x: 64, y: 128, z: 64 }) {
        world.setDynamicProperty(`andexdb:clipboards`, ((v) => ({
            x: Math.abs(v.x),
            y: Math.abs(v.y),
            z: Math.abs(v.z),
        }))(Vector.subtract(area.to, area.from)));
        for (const range of splitArea(area, sizeLimits)) {
            this.saveRange(dimension, range, options);
        }
    }
    static place(location, options, sizes = { x: 64, y: 128, z: 64 }) {
        this.ids
            .map((v) => ({
            id: v,
            x: Number(v.split(",")[1] ?? 0) * sizes.x,
            y: Number(v.split(",")[2] ?? 0) * sizes.y,
            z: Number(v.split(",")[3] ?? 0) * sizes.z,
        }))
            .forEach((v) => world.structureManager.place(v.id, location.dimension, Vector.add(v, location), options));
    }
}
//# sourceMappingURL=blockClipboard.js.map