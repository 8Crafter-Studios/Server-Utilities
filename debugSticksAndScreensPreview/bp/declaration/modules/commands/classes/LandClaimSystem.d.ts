import { Player, type Vector3 } from "@minecraft/server";
import { LandClaim } from "./LandClaim";
export declare class LandClaimSystem {
    constructor();
    get warnAboutDeniedPermissions(): boolean | undefined;
    set warnAboutDeniedPermissions(warn: boolean | undefined);
    static land_claim_format_version: string;
    static getClaims(claimIds: string[]): LandClaim[];
    static getAllClaims(): LandClaim[];
    static getClaimIds(): string[];
    static getLandClaimIdsForPlayer(player: Player | string): string[];
    static getLandClaimsForPlayer(player: Player | string): LandClaim[];
    static testIfPlayerCanDoActionInArea(action: "BreakBlock" | "PlaceBlock" | "InteractWithBlock" | "EnterArea" | "CreateExplosion", player: any, location: any): void;
    static testIfClaimAreaIsAlreadyClaimed(area: {
        min: Vector3;
        max: Vector3;
    }): boolean;
}
