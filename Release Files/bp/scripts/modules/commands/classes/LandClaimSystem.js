import { world, Player } from "@minecraft/server";
import { doBoundingBoxesIntersect } from "modules/coordinates/functions/doBoundingBoxesIntersect";
import { LandClaim } from "./LandClaim";
/**
 * This class is used for managing land claims.
 *
 * @alpha
 * @deprecated This class is not functional yet.
 */
export class LandClaimSystem {
    constructor() { }
    get warnAboutDeniedPermissions() {
        return Boolean(world.getDynamicProperty("landClaimSystemSettings:warnAboutDeniedPermissions") ?? false);
    }
    set warnAboutDeniedPermissions(warn) {
        world.setDynamicProperty("landClaimSystemSettings:warnAboutDeniedPermissions", warn);
    }
    static land_claim_format_version = "0.0.1-indev.1";
    static getClaims(claimIds) {
        let claims = [];
        claimIds.forEach((c) => claims.push(LandClaim.get(c)));
        return claims;
    }
    static getAllClaims() {
        let claims = [];
        this.getClaimIds().forEach((c) => claims.push(LandClaim.get(c)));
        return claims;
    }
    static getClaimIds() {
        return world
            .getDynamicPropertyIds()
            .filter((v) => v.startsWith("landClaim:"));
    }
    static getLandClaimIdsForPlayer(player) {
        return world
            .getDynamicPropertyIds()
            .filter((v) => v.startsWith("landClaim:"))
            .filter((v) => tryget(() => JSONParse(String(world.getDynamicProperty(v)))
            ?.ownerId) == (typeof player == "string" ? player : player.id));
    }
    static getLandClaimsForPlayer(player) {
        return this.getClaims(this.getLandClaimIdsForPlayer(player));
    }
    static testIfPlayerCanDoActionInArea(action, player, location) { }
    static testIfClaimAreaIsAlreadyClaimed(area) {
        return this.getAllClaims()
            .map((c) => tryget(() => c.area))
            .filter((c) => !!c)
            .every((c) => !doBoundingBoxesIntersect(area, c));
    }
}
//# sourceMappingURL=LandClaimSystem.js.map