import type { Player, Vector3 } from "@minecraft/server";
export declare function spawnBlockSurroundingParticleForPlayer(player: Player, location: Vector3, textures: {
    default?: string;
    up?: string;
    down?: string;
    north?: string;
    south?: string;
    east?: string;
    west?: string;
}): void;
