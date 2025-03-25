import { type DimensionLocation, Player } from "@minecraft/server";
export declare class Home {
    location: DimensionLocation;
    name: string;
    ownerId: string;
    ownerName?: string;
    saveId: string;
    format_version?: string;
    home_format_version?: string;
    constructor(home: {
        location: DimensionLocation;
        name: string;
        owner?: Player;
        ownerId?: string;
        ownerName?: string;
        saveId: string;
        format_version?: string;
        home_format_version?: string;
    });
    get owner(): Player;
    get isOwnerOnline(): boolean;
    get isSaved(): boolean;
    toJSON(): {
        location: DimensionLocation & {
            dimension: string;
        };
        name: string;
        ownerId: string;
        ownerName: string;
        format_version: string;
        home_format_version: string;
    };
    save(otherDataToChange?: any, keepOldFormatVersion?: boolean): void;
    remove(): void;
    static get(homeId: string): Home;
    static delete(homeId: string): void;
}
