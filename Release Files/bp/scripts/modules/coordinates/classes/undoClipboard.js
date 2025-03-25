import { world, Dimension } from "@minecraft/server";
import "init/classes/config";
import { splitArea } from "modules/coordinates/functions/splitArea";
export class undoClipboard {
    static get ids() {
        return world.structureManager
            .getWorldStructureIds()
            .filter((v) => v.startsWith("andexdb:undoclipboard;"));
    }
    static saveIds(timestamp) {
        return world.structureManager
            .getWorldStructureIds()
            .filter((v) => v.startsWith(`andexdb:undoclipboard;${timestamp}`));
    }
    static saveSize(timestamp) {
        return (world.getDynamicProperty(`andexdb:undoclipboards;${timestamp}`) ?? Vector.zero);
    }
    static get saves() {
        return world
            .getDynamicPropertyIds()
            .filter((v) => v.startsWith("andexdb:undoclipboard;"));
    }
    static get saveTimes() {
        return [
            ...new Set(world
                .getDynamicPropertyIds()
                .filter((v) => v.startsWith("andexdb:undoclipboard;"))
                .map((v) => Number(v.slice(22)))),
        ]
            .sort()
            .reverse();
    }
    static get newestSaveTime() {
        return this.saveTimes[0];
    }
    static cullItemsMissingStructure() {
        this.saveTimes
            .filter((v) => !!!world.structureManager.get(`andexdb:undoclipboard;${v},0,0,0`))
            .forEach((v) => this.clearTime(v));
    }
    static clear() {
        this.ids.forEach((v) => world.structureManager.delete(v));
    }
    static clearTime(timestamp) {
        this.saveIds(timestamp).forEach((v) => world.structureManager.delete(v));
        world.setDynamicProperty(`andexdb:undoclipboard;${timestamp}`);
        world.setDynamicProperty(`andexdb:undoclipboardd;${timestamp}`);
        world.setDynamicProperty(`andexdb:undoclipboards;${timestamp}`);
    }
    static saveRange(dimension, range, saveTime, options) {
        try {
            world.structureManager.createFromWorld(`andexdb:undoclipboard;${saveTime},${range[2].x ?? 0},${range[2].y ?? 0},${range[2].z ?? 0}`, dimension, range[0], range[1], options);
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    static save(dimension, area, saveTime = Date.now(), options, sizeLimits = { x: 64, y: 128, z: 64 }) {
        world.setDynamicProperty(`andexdb:undoclipboard;${saveTime}`, area.from);
        world.setDynamicProperty(`andexdb:undoclipboardd;${saveTime}`, dimension.id);
        world.setDynamicProperty(`andexdb:undoclipboards;${saveTime}`, ((v) => ({
            x: Math.abs(v.x),
            y: Math.abs(v.y),
            z: Math.abs(v.z),
        }))(Vector.subtract(area.to, area.from)));
        for (const range of splitArea(area, sizeLimits)) {
            this.saveRange(dimension, range, saveTime, {
                saveMode: options?.saveMode ?? config.undoClipboardMode,
                includeBlocks: options?.includeBlocks,
                includeEntities: options?.includeEntities,
            });
        }
    }
    static undo(saveTime = this.newestSaveTime, options, clearSave = true, sizes = { x: 64, y: 128, z: 64 }) {
        if (this.ids.length == 0) {
            return 0;
        }
        this.saveIds(saveTime)
            .map((v) => ({
            id: v,
            x: Number(v.split(",")[1] ?? 0) * sizes.x,
            y: Number(v.split(",")[2] ?? 0) * sizes.y,
            z: Number(v.split(",")[3] ?? 0) * sizes.z,
        }))
            .forEach((v) => {
            /*
        main.clearAllContainerBlocks(main.scanForContainerBlocks(v, Vector.add(v, sizes), dimensionsb[String(world.getDynamicProperty(`andexdb:undoclipboardd;${saveTime}`))]??overworld, "Block") as Block[])*/
            world.structureManager.place(v.id, dimensionsb[String(world.getDynamicProperty(`andexdb:undoclipboardd;${saveTime}`))] ?? dimensionsb["minecraft:overworld"], Vector.add(v, world.getDynamicProperty(`andexdb:undoclipboard;${saveTime}`)), options);
        });
        if (clearSave) {
            this.saveIds(saveTime).forEach((v) => {
                this.clearTime(saveTime);
            });
        }
        return 1;
    }
}
//# sourceMappingURL=undoClipboard.js.map