import { Dimension, world, Entity } from "@minecraft/server";
export function targetSelectorAllListD(selector, position, dimension = world.getDimension("overworld")) {
    let scoreboardUUID = Math.round(Math.random() * 1000 + 500);
    dimension.runCommand("/execute positioned " +
        position +
        " as " +
        selector +
        " at @s run /scoreboard players set @s andexdbDebug " +
        scoreboardUUID);
    let selectedEntity;
    selectedEntity = [];
    for (let i in world.scoreboard.getObjective("andexdbDebug")?.getScores()) {
        try {
            selectedEntity.push(world.scoreboard
                .getObjective("andexdbDebug")
                ?.getScores()
                .filter((score) => score.score == scoreboardUUID)[i].participant.getEntity());
        }
        catch (e) { }
    }
    dimension.runCommand("/execute as " +
        selector +
        " at @s run /scoreboard players set @s andexdbDebug 0");
    return selectedEntity;
}
//# sourceMappingURL=targetSelectorAllListD.js.map