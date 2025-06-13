import { type Vector3, Dimension, Player } from "@minecraft/server";
/**
 * A land claim for the land claim system.
 *
 * @alpha
 * @deprecated This class is not functional yet.
 */
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
    get owner(): Player | undefined;
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
        ownerName: string | undefined;
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
    static get(claimId: string): LandClaim | undefined;
    static delete(claimId: string): void;
}
