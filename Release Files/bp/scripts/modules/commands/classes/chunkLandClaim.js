import { Dimension, world, Player } from "@minecraft/server";
import { getPlayerById } from "init/functions/getPlayerById";
import { chunkIndexToBoundingBox } from "modules/coordinates/functions/chunkIndexToBoundingBox";
import { LandClaimSystem } from "./LandClaimSystem";
import { LandClaim } from "./LandClaim";
/**
 * A chunk land claim for the land claim system.
 * @alpha
 * @deprecated This class is not functional yet.
 */
export class chunkLandClaim {
    chunks;
    dimension;
    name;
    ownerId;
    ownerName;
    saveId;
    format_version = format_version;
    land_claim_format_version = LandClaimSystem.land_claim_format_version;
    defaultPermissions = {
        breakBlocks: false,
        placeBlocks: false,
        interactWithBlocks: false,
        enterArea: true,
    };
    customPermissions = {};
    constructor(claim) {
        this.chunks = claim.chunks;
        this.dimension =
            typeof claim.dimension == "string"
                ? world.getDimension(claim.dimension)
                : claim.dimension;
        this.name = claim.name;
        this.ownerId = claim.ownerId;
        this.defaultPermissions = Object.assign({
            breakBlocks: false,
            placeBlocks: false,
            interactWithBlocks: false,
            enterArea: true,
        }, claim.defaultPermissions ?? {
            breakBlocks: false,
            placeBlocks: false,
            interactWithBlocks: false,
            enterArea: true,
        });
        this.customPermissions = claim.customPermissions ?? {};
        this.saveId = claim.saveId;
    }
    get owner() {
        return getPlayerById(this.ownerId);
    }
    get isOwnerOnline() {
        return !!world.getAllPlayers().find((p) => p.id == this.ownerId);
    }
    get isSaved() {
        return !!world.getDynamicProperty(this.saveId);
    }
    get areas() {
        return this.chunks.map((c) => chunkIndexToBoundingBox(c, [
            this.dimension.heightRange.min,
            this.dimension.heightRange.max,
        ]));
    }
    toJSON() {
        return {
            chunks: this.chunks,
            dimension: this.dimension.id,
            name: this.name,
            ownerId: this.ownerId,
            ownerName: this.ownerName,
            defaultPermissions: this.defaultPermissions,
            customPermissions: this.customPermissions,
            format_version: this.format_version ?? format_version,
            land_claim_format_version: this.land_claim_format_version ??
                LandClaimSystem.land_claim_format_version,
        };
    }
    setPermissions(permissions, playerOrPlayerId, playerName) {
        this.customPermissions[typeof playerOrPlayerId == "string"
            ? playerOrPlayerId
            : playerOrPlayerId.id] = Object.assign(permissions, {
            playerName: permissions.playerName ??
                (typeof playerOrPlayerId == "string"
                    ? playerName
                    : playerOrPlayerId.name),
        });
    }
    save(otherDataToChange, keepOldFormatVersion = false) {
        world.setDynamicProperty(this.saveId, Object.assign(Object.assign(Object.assign(world.getDynamicProperty(this.saveId) ?? {}, this.toJSON()), otherDataToChange), keepOldFormatVersion
            ? {}
            : {
                format_version,
                land_claim_format_version: LandClaimSystem.land_claim_format_version,
            }));
    }
    remove() {
        world.setDynamicProperty(this.saveId); /*; this=undefined*/
    }
    static get(claimId) {
        return !!world.getDynamicProperty(claimId)
            ? new LandClaim(Object.assign(JSONParse(String(world.getDynamicProperty(claimId))), { saveId: claimId }))
            : undefined;
    }
    static delete(claimId) {
        world.setDynamicProperty(claimId);
    }
}
//# sourceMappingURL=chunkLandClaim.js.map