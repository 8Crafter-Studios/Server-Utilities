import { world, Entity } from "@minecraft/server";
export function targetSelectorAllListB(selector, filters, UUID) {
    let scoreboardUUID = Math.round(Math.random() * 1000 + 500);
    world
        .getAllPlayers()
        .find((currentlySelectedPlayerEntity) => Number(currentlySelectedPlayerEntity.id) == UUID)
        ?.runCommand("/execute as " +
        selector +
        filters +
        " at @s run /scoreboard players set @s andexdbDebug " +
        scoreboardUUID);
    let selectedEntity = [];
    for (let i in world.scoreboard.getObjective("andexdbDebug")?.getScores()) {
        selectedEntity.push(world.scoreboard
            .getObjective("andexdbDebug")
            ?.getScores()
            .filter((score) => score.score == scoreboardUUID)[i].participant.getEntity());
    }
    world
        .getAllPlayers()
        .find((currentlySelectedPlayerEntity) => Number(currentlySelectedPlayerEntity.id) == UUID)
        ?.runCommand("/execute as " +
        selector +
        filters +
        " at @s run /scoreboard players set @s andexdbDebug 0");
    return selectedEntity;
}
//# sourceMappingURL=targetSelectorAllListB.js.map