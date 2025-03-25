import { type Vector2, Dimension, Player } from "@minecraft/server";
import { LandClaim } from "./LandClaim";
/**
 * A chunk land claim for the land claim system.
 * @alpha
 * @deprecated This class is not functional yet.
 */
export declare class chunkLandClaim {
    chunks: Vector2[];
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
        chunks: Vector2[];
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
    get areas(): {
        from: {
            x: number;
            y: number;
            z: number;
        };
        to: {
            x: number;
            y: number;
            z: number;
        };
    }[];
    toJSON(): {
        chunks: Vector2[];
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
