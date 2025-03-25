import { world, Dimension } from "@minecraft/server";
import { AreaBackup } from "./AreaBackup";
export class AreaBackups {
    static get ids() {
        return world
            .getDynamicPropertyIds()
            .filter((v) => v.startsWith("areabackup:"));
    }
    static get structureIds() {
        return world.structureManager
            .getWorldStructureIds()
            .filter((v) => v.startsWith("areabackup:"));
    }
    static get areas() {
        return this.ids.map((v) => this.get(v));
    }
    static get(id) {
        return new AreaBackup(id);
    }
    static delete(id) {
        new AreaBackup(id).delete();
    }
    static clear() {
        this.ids.forEach((v) => new AreaBackup(v).delete());
    }
    static createAreaBackup(id, dimension, area) {
        world.setDynamicProperty("areabackup:" + id.replaceAll(";", "").replaceAll(",", ""), JSON.stringify({
            from: area.from,
            to: area.to,
            dimension: dimension.id,
        }));
        return new AreaBackup(id);
    }
}
//# sourceMappingURL=AreaBackups.js.map