import { Dimension, type Vector3 } from "@minecraft/server";
import { AreaBackup } from "./AreaBackup";
export declare class AreaBackups {
    static get ids(): string[];
    static get structureIds(): string[];
    static get areas(): AreaBackup[];
    static get(id: string): AreaBackup;
    static delete(id: string): void;
    static clear(): void;
    static createAreaBackup(id: string, dimension: Dimension, area: {
        from: Vector3;
        to: Vector3;
    }): AreaBackup;
}
