import { DimensionTypes, world, Entity } from "@minecraft/server";
export function targetSelectorAllListE(selector, position) {
    let scoreboardUUID = Math.round(Math.random() * 1000 + 500);
    DimensionTypes.getAll().forEach((dt) => {
        let dimension = world.getDimension(dt.typeId);
        dimension.runCommand("/execute positioned " +
            position +
            " as " +
            selector +
            " at @s run /scoreboard players set @s andexdbDebug " +
            scoreboardUUID);
    });
    let selectedEntity;
    selectedEntity = [];
    for (let i in world.scoreboard.getObjective("andexdbDebug").getScores()) {
        try {
            selectedEntity.push(world.scoreboard
                .getObjective("andexdbDebug")
                .getScores()
                .filter((score) => score.score == scoreboardUUID)[i].participant.getEntity());
        }
        catch (e) { }
    }
    DimensionTypes.getAll().forEach((dt) => {
        let dimension = world.getDimension(dt.typeId);
        dimension.runCommand("/execute as " +
            selector +
            " at @s run /scoreboard players set @s andexdbDebug 0");
    });
    return selectedEntity;
}
//# sourceMappingURL=targetSelectorAllListE.js.map