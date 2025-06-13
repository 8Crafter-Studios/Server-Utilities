import { Dimension, type Vector3 } from "@minecraft/server";
import { AreaBackup } from "./AreaBackup";
/**
 * A class representing a collection of area backups.
 */
export declare class AreaBackups {
    /**
     * The IDs of the area backups.
     *
     * @type {string[]}
     */
    static get ids(): string[];
    /**
     * The structure IDs of the area backups.
     *
     * @type {string[]}
     */
    static get structureIds(): string[];
    /**
     * The area backups.
     *
     * @type {AreaBackup[]}
     */
    static get areas(): AreaBackup[];
    /**
     * Gets an area backup by its ID.
     *
     * @param {string} id The ID of the area backup.
     * @returns {AreaBackup} The area backup.
     */
    static get(id: string): AreaBackup;
    /**
     * Deletes an area backup by its ID.
     *
     * @param {string} id The ID of the area backup.
     */
    static delete(id: string): void;
    /**
     * Deletes all area backups.
     */
    static clear(): void;
    /**
     * Creates an area backup.
     *
     * @param {string} id The ID of the area backup.
     * @param {Dimension | string} dimension The dimension of the area backup.
     * @param {{ from: Vector3; to: Vector3; }} area The area of the area backup.
     * @returns {AreaBackup} The newly created area backup.
     */
    static createAreaBackup(id: string, dimension: Dimension | string, area: {
        from: Vector3;
        to: Vector3;
    }): AreaBackup;
}
