import { world, StructureSaveMode } from "@minecraft/server";
import { splitArea } from "modules/coordinates/functions/splitArea";
export class AreaBackup {
    id;
    constructor(id) {
        this.id = id;
    }
    get from() {
        return JSON.parse(String(world.getDynamicProperty(this.id)))
            .from;
    }
    get to() {
        return JSON.parse(String(world.getDynamicProperty(this.id)))
            .to;
    }
    get dimension() {
        return (tryget(() => world.getDimension(JSON.parse(String(world.getDynamicProperty(this.id)))
            .dimension)) ?? dimensionsc.overworld);
    }
    get backups() {
        return [
            ...new Set(world.structureManager
                .getWorldStructureIds()
                .filter((v) => v.startsWith(`${this.id};`))
                .map((v) => Number(v.split(";")[1].split(",")[0]))),
        ]
            .sort()
            .reverse();
    }
    get backupStructureIds() {
        return world.structureManager
            .getWorldStructureIds()
            .filter((v) => v.startsWith(`${this.id};`));
    }
    saveIds(timestamp) {
        return world.structureManager
            .getWorldStructureIds()
            .filter((v) => v.startsWith(`${this.id};${timestamp}`));
    }
    get size() {
        return ((v) => ({
            x: Math.abs(v.x),
            y: Math.abs(v.y),
            z: Math.abs(v.z),
        }))(Vector.subtract(this.from, this.to));
    }
    toJSON() {
        return {
            id: this.id,
            from: this.from,
            to: this.to,
            dimension: this.dimension,
        };
    }
    toJSONNoId() {
        return { from: this.from, to: this.to, dimension: this.dimension };
    }
    delete() {
        this.clear();
        world.setDynamicProperty(this.id);
    }
    clear() {
        this.backupStructureIds.forEach((v) => world.structureManager.delete(v));
    }
    clearBackup(timestamp) {
        this.saveIds(timestamp).forEach((v) => world.structureManager.delete(v));
    }
    clearBackups() {
        this.backups.forEach((v) => this.saveIds(v).forEach((v) => world.structureManager.delete(v)));
    }
    backupRange(range, saveTime, options) {
        try {
            world.structureManager.createFromWorld(`${this.id};${saveTime},${range[2].x ?? 0},${range[2].y ?? 0},${range[2].z ?? 0}`, this.dimension, range[0], range[1], options);
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    backup(saveTime = Date.now(), options = {
        saveMode: StructureSaveMode.World,
        includeBlocks: true,
        includeEntities: false,
    }, sizeLimits = { x: 64, y: 128, z: 64 }) {
        for (const range of splitArea({ from: this.from, to: this.to }, sizeLimits)) {
            this.backupRange(range, saveTime, options);
        }
    }
    rollback(saveTime = this.backups[0], clearSave = false, options, sizes = { x: 64, y: 128, z: 64 }) {
        if (this.backupStructureIds.length == 0) {
            return 0;
        }
        this.saveIds(saveTime)
            .map((v) => ({
            id: v,
            x: Number(v.split(",")[1] ?? 0) * sizes.x,
            y: Number(v.split(",")[2] ?? 0) * sizes.y,
            z: Number(v.split(",")[3] ?? 0) * sizes.z,
        }))
            .forEach((v) => world.structureManager.place(v.id, this.dimension, Vector.add(this.from, v), options));
        if (clearSave) {
            this.clearBackup(saveTime);
        }
        return 1;
    }
}
//# sourceMappingURL=AreaBackup.js.map