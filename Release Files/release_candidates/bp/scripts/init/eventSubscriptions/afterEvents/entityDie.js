import { world } from "@minecraft/server";
import { TotalBounty } from "modules/main/classes/Bounty";
subscribedEvents.afterEntityDie = world.afterEvents.entityDie.subscribe((event) => {
    // /scriptevent andexdb:spawnSimulatedPlayer Simulated Player|~~~|overworld|1000000 100 1000000
    // swdp("evalAfterEvents:entityDie", `if(event.deadEntity.typeId=="minecraft:player" && event.damageSource.damagingEntity.typeId=="minecraft:player"){world.scoreboard.getObjective("Kills").addScore(event.damageSource.damagingEntity.scoreboardIdentity, 1);}`);
    if (event.deadEntity?.typeId === "minecraft:player" &&
        event.damageSource?.damagingEntity?.typeId === "minecraft:player" &&
        typeof event.deadEntity.id === "string" &&
        typeof event.damageSource.damagingEntity.id === "string" &&
        event.deadEntity.id !== event.damageSource.damagingEntity.id) {
        TotalBounty.claimBounty(event.damageSource.damagingEntity, event.deadEntity.id);
    }
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:entityDie")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => {
            if (currentplayer.hasTag("entityDieAfterEventDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            }
        });
    }
});
//# sourceMappingURL=entityDie.js.map