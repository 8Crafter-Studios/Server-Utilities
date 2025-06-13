import { world, Dimension } from "@minecraft/server";
import { AreaBackup } from "./AreaBackup";
/**
 * A class representing a collection of area backups.
 */
export class AreaBackups {
    /**
     * The IDs of the area backups.
     *
     * @type {string[]}
     */
    static get ids() {
        return world
            .getDynamicPropertyIds()
            .filter((v) => v.startsWith("areabackup:"));
    }
    /**
     * The structure IDs of the area backups.
     *
     * @type {string[]}
     */
    static get structureIds() {
        return world.structureManager
            .getWorldStructureIds()
            .filter((v) => v.startsWith("areabackup:"));
    }
    /**
     * The area backups.
     *
     * @type {AreaBackup[]}
     */
    static get areas() {
        return this.ids.map((v) => this.get(v));
    }
    /**
     * Gets an area backup by its ID.
     *
     * @param {string} id The ID of the area backup.
     * @returns {AreaBackup} The area backup.
     */
    static get(id) {
        return new AreaBackup(id);
    }
    /**
     * Deletes an area backup by its ID.
     *
     * @param {string} id The ID of the area backup.
     */
    static delete(id) {
        new AreaBackup(id).delete();
    }
    /**
     * Deletes all area backups.
     */
    static clear() {
        this.ids.forEach((v) => new AreaBackup(v).delete());
    }
    /**
     * Creates an area backup.
     *
     * @param {string} id The ID of the area backup.
     * @param {Dimension | string} dimension The dimension of the area backup.
     * @param {{ from: Vector3; to: Vector3; }} area The area of the area backup.
     * @returns {AreaBackup} The newly created area backup.
     */
    static createAreaBackup(id, dimension, area) {
        world.setDynamicProperty("areabackup:" + id.replaceAll(";", "").replaceAll(",", ""), JSON.stringify({
            from: area.from,
            to: area.to,
            dimension: typeof dimension === "string" ? dimension : dimension.id,
        }));
        return new AreaBackup(id);
    }
}
//# sourceMappingURL=AreaBackups.js.map