import { world, DimensionTypes } from "@minecraft/server";
export function targetSelectorB(selector, filters, UUID) {
    let scoreboardUUID = Math.round(Math.random() * 100 + 50);
    world
        .getAllPlayers()
        .find((currentlySelectedPlayerEntity) => Number(currentlySelectedPlayerEntity.id) == UUID)
        ?.runCommand("/execute as " +
        selector +
        filters +
        " at @s run /scoreboard players set @s andexdbDebug " +
        scoreboardUUID);
    let selectedEntityUUIDValue = world.scoreboard
        .getObjective("andexdbDebug")
        ?.getScores()
        .find((score) => score.score == scoreboardUUID)
        ?.participant.getEntity()?.id;
    world
        .getAllPlayers()
        .find((currentlySelectedPlayerEntity) => Number(currentlySelectedPlayerEntity.id) == UUID)
        ?.runCommand("/execute as " +
        selector +
        filters +
        " at @s run /scoreboard players set @s andexdbDebug 0");
    return world
        .getDimension(DimensionTypes.getAll().find((dimension) => world
        .getDimension(dimension.typeId)
        ?.getEntities()
        .find((entity) => entity.id == selectedEntityUUIDValue))?.typeId)
        .getEntities()
        .find((entity) => entity.id == selectedEntityUUIDValue);
}
//# sourceMappingURL=targetSelectorB.js.map