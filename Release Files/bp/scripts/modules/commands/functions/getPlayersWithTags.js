import { world } from "@minecraft/server";
export function getPlayersWithTags(tags) {
    return tags instanceof Array
        ? world.getAllPlayers().filter((p) => tags.every((t) => p.hasTag(t)))
        : world.getAllPlayers().filter((p) => p.hasTag(tags));
}
//# sourceMappingURL=getPlayersWithTags.js.map