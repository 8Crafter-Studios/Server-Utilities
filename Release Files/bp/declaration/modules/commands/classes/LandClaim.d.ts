import { type Vector3, Dimension, Player } from "@minecraft/server";
export declare class LandClaim {
    area: {
        min: Vector3;
        max: Vector3;
    };
    dimension: Dimension;
    name: string;
    ownerId: string;
    ownerName?: string;
    saveId: string;
    format_version: string;
    land_claim_format_version: string;
    defaultPermissions: {
        breakBlocks: boolean;
        placeBlocks: boolean;
        interactWithBlocks: boolean;
        enterArea: boolean;
    };
    customPermissions: {
        [playerId: string]: {
            playerName?: string;
            breakBlocks: boolean;
            placeBlocks: boolean;
            interactWithBlocks: boolean;
            enterArea: boolean;
        };
    };
    constructor(claim: {
        saveId: string;
        area: {
            min: Vector3;
            max: Vector3;
        };
        dimension: string | Dimension;
        name: string;
        ownerId: string;
        format_version?: string;
        land_claim_format_version?: string;
        defaultPermissions?: {
            breakBlocks?: boolean;
            placeBlocks?: boolean;
            interactWithBlocks?: boolean;
            enterArea?: boolean;
        };
        customPermissions?: {
            [playerId: string]: {
                playerName?: string;
                breakBlocks: boolean;
                placeBlocks: boolean;
                interactWithBlocks: boolean;
                enterArea: boolean;
            };
        };
    });
    get owner(): Player;
    get isOwnerOnline(): boolean;
    get isSaved(): boolean;
    toJSON(): {
        area: {
            min: Vector3;
            max: Vector3;
        };
        dimension: string;
        name: string;
        ownerId: string;
        ownerName: string;
        defaultPermissions: {
            breakBlocks: boolean;
            placeBlocks: boolean;
            interactWithBlocks: boolean;
            enterArea: boolean;
        };
        customPermissions: {
            [playerId: string]: {
                playerName?: string;
                breakBlocks: boolean;
                placeBlocks: boolean;
                interactWithBlocks: boolean;
                enterArea: boolean;
            };
        };
        format_version: string;
        land_claim_format_version: string;
    };
    setPermissions(permissions: {
        playerName?: string;
        breakBlocks: boolean;
        placeBlocks: boolean;
        interactWithBlocks: boolean;
        enterArea: boolean;
    }, playerOrPlayerId: Player | string, playerName?: string): void;
    save(otherDataToChange: any, keepOldFormatVersion?: boolean): void;
    remove(): void;
    static get(claimId: string): LandClaim;
    static delete(claimId: string): void;
}
