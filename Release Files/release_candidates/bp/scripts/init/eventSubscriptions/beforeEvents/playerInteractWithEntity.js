import { Vector3Utils } from "@minecraft/math.js";
import { world, Player } from "@minecraft/server";
import { ProtectedAreaTester } from "init/variables/protectedAreaVariables";
import { securityVariables } from "security/ultraSecurityModeUtils";
subscribedEvents.beforePlayerInteractWithEntity =
    world.beforeEvents.playerInteractWithEntity.subscribe((event) => {
        if (!!event?.itemStack?.getDynamicProperty("playerInteractWithEntityCode")) {
            try {
                eval(String(event?.itemStack?.getDynamicProperty("playerInteractWithEntityCode")));
            }
            catch (e) {
                console.error(e, e.stack);
                world.getAllPlayers().forEach((currentplayer) => {
                    if (currentplayer.hasTag("itemPlayerInteractWithEntityCodeDebugErrors")) {
                        currentplayer.sendMessage(e + e.stack);
                    }
                });
            }
        }
        try {
            eval(String(world.getDynamicProperty("evalBeforeEvents:playerInteractWithEntity")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => {
                if (currentplayer.hasTag("playerInteractWithEntityBeforeEventDebugErrors")) {
                    currentplayer.sendMessage(e + e.stack);
                }
            });
        }
        if (new ProtectedAreaTester("playerInteractWithEntity").testIsInArea(event, event.target.location, event.target.dimension)) {
            event.cancel = true;
            return;
        }
        if (event.itemStack?.typeId == "andexdb:entity_debug_stick") {
            event.cancel = true;
            if (securityVariables.ultraSecurityModeEnabled) {
                if (securityVariables.testPlayerForPermission(event.player, "andexdb.canUseEntityDebugSticks") == false) {
                    event.player.sendMessage("§cYou do not have permission to use an Entity Debug Stick. You need the following permission to use this item: andexdb.canUseEntityDebugSticks");
                    return;
                }
            }
            const playerTargetB = event.target;
            let entityViewedEntityType;
            let entityViewedEntityName;
            let entityViewedEntityDistance;
            let blockViewedBlockType;
            let spawnPointAllCoordinates;
            entityViewedEntityType = "None";
            entityViewedEntityName = "None";
            entityViewedEntityDistance = "None";
            blockViewedBlockType = "None";
            spawnPointAllCoordinates = "None";
            let scoreboardIdentity = undefined;
            let scoreboardIdentityDisplayName = undefined;
            let scoreboardIdentityType = undefined;
            let distance = Vector3Utils.distance(event.player.location, playerTargetB.location);
            try {
                entityViewedEntityType =
                    playerTargetB.getEntitiesFromViewDirection()[0].entity
                        .typeId;
            }
            catch (e) {
                entityViewedEntityType = "§4None§a";
            }
            try {
                entityViewedEntityName =
                    playerTargetB.getEntitiesFromViewDirection()[0].entity
                        .typeId;
            }
            catch (e) {
                entityViewedEntityName = "§4None§a";
            }
            try {
                entityViewedEntityDistance =
                    playerTargetB.getEntitiesFromViewDirection()[0].distance;
            }
            catch (e) {
                entityViewedEntityDistance = "§4None§a";
            }
            let componentList;
            componentList = [];
            try {
                componentList = [playerTargetB.getComponents()[0].typeId];
            }
            catch (e) {
                console.error(e, e.stack);
                componentList = "§4None§a";
            }
            let effectsList = [];
            try {
                effectsList = [
                    "§9{ §stypeId§a: §u" +
                        playerTargetB.getEffects()[0].typeId +
                        "§a, §sdisplayName§a: §u" +
                        playerTargetB.getEffects()[0].displayName +
                        "§a, §sduration§a: §c" +
                        playerTargetB.getEffects()[0].duration +
                        "§a, §samplifier§a: §c" +
                        playerTargetB.getEffects()[0].amplifier +
                        "§9 }§a",
                ];
            }
            catch (e) {
                console.error(e, e.stack);
            }
            let blockProperties = [];
            try {
                blockProperties = [
                    playerTargetB
                        .getBlockFromViewDirection()
                        .block.permutation.getAllStates()[0],
                ];
            }
            catch (e) {
                console.error(e, e.stack);
            } /*
                let effectsList = [players[playerTargetB].getComponents[0]]*/
            try {
                scoreboardIdentity = playerTargetB.scoreboardIdentity.id;
            }
            catch (e) {
                scoreboardIdentity = "§4None§a";
            }
            try {
                scoreboardIdentityDisplayName =
                    playerTargetB.scoreboardIdentity.displayName;
            }
            catch (e) {
                scoreboardIdentityDisplayName = "§4None§a";
            }
            try {
                scoreboardIdentityType = playerTargetB.scoreboardIdentity.type;
            }
            catch (e) {
                scoreboardIdentityType = "§4None§a";
            }
            try {
                blockViewedBlockType =
                    "§9{ §btypeId§a: §u" +
                        playerTargetB.getBlockFromViewDirection().block.typeId +
                        "§a, §bcanBeWaterlogged§a: §u" +
                        playerTargetB.getBlockFromViewDirection().block.canContainLiquid(modules.mcServer.LiquidType.Water) +
                        "§9 }§a";
            }
            catch (e) {
                blockViewedBlockType = "§4None§a";
            }
            for (const index in playerTargetB.getComponents()) {
                /*
                    console.warn(index);*/
                if (Number(index) != 0) {
                    componentList = String([
                        String(componentList),
                        playerTargetB.getComponents()[index].typeId,
                    ]).split(",");
                } /*
                    console.warn(targetList);*/
            }
            for (const index in playerTargetB.getEffects()) {
                /*
                    console.warn(index);*/
                if (Number(index) != 0) {
                    effectsList = String([
                        String(effectsList),
                        "§9{ §stypeId§a: §u" +
                            playerTargetB.getEffects()[index].typeId +
                            "§a, §sdisplayName§a: §u" +
                            playerTargetB.getEffects()[index].displayName +
                            ", §sduration§a: §c" +
                            playerTargetB.getEffects()[index].duration +
                            "§a, §samplifier§a: §c" +
                            playerTargetB.getEffects()[index].amplifier +
                            "§9 }§a",
                    ]).split(",");
                } /*
                    console.warn(targetList);*/
            }
            event.player.sendMessage("§btypeId§a: §u" +
                playerTargetB.typeId +
                "§a, §bUUID§a: §u" +
                playerTargetB.id +
                "§a, §bnameTag§a: §u" +
                playerTargetB.nameTag +
                "§a, §bdistance§a: §u" +
                distance +
                "§a, §bLocation§a: §9{ §c" +
                playerTargetB.location.x +
                "§a, §c" +
                playerTargetB.location.y +
                "§a, §c" +
                playerTargetB.location.z +
                "§9 }§a, §bdimension§a: §u" +
                playerTargetB.dimension +
                "§a, §bhealth§a: §g" +
                playerTargetB.getComponent("health")?.currentValue +
                "§a, §bdefaultHealth§a: §g" +
                playerTargetB.getComponent("health")?.defaultValue +
                "§a, §beffectiveMinHealth§a: §g" +
                playerTargetB.getComponent("health")?.effectiveMin +
                "§a, §beffectiveMaxHealth§a: §g" +
                playerTargetB.getComponent("health")?.effectiveMax +
                "§a, §bisSneaking§a: §g" +
                playerTargetB.isSneaking +
                "§a, §bscoreboardIdentityId§a: §u" +
                scoreboardIdentity +
                "§a, §bscoreboardIdentityDisplayName§a: §u" +
                scoreboardIdentityDisplayName +
                "§a, §bscoreboardIdentityType§a: §u" +
                scoreboardIdentityType +
                "§a, §bgetBlockFromViewDirection§a: " +
                blockViewedBlockType +
                ", §bgetEntitiesFromViewDirection§a: { §sEntity§a: " +
                entityViewedEntityType +
                ", §sDistance§a: " +
                entityViewedEntityDistance +
                " }, §bgetComponents§a: §n[§u" +
                componentList +
                "§n]§a, §bgetEffects§a: §n[§a" +
                effectsList +
                "§n]§a, §bgetTags§a: [" +
                playerTargetB.getTags() +
                "], §bgetVelocity§a: §9{ §c" +
                (playerTargetB.getVelocity().x +
                    "§a, §c" +
                    playerTargetB.getVelocity().y +
                    "§a, §c" +
                    playerTargetB.getVelocity().z) +
                "§9 }§a, §bgetViewDirection§a: { " +
                (playerTargetB.getViewDirection().x,
                    playerTargetB.getViewDirection().y,
                    playerTargetB.getViewDirection().z) +
                ", §bselectedSlotIndex§a: " +
                playerTargetB.selectedSlotIndex +
                (!!playerTargetB.getComponent("projectile")
                    ? "§a, §bprojectile§a: §9{ §3airInertia§a: §c" +
                        playerTargetB.getComponent("projectile").airInertia +
                        "§a, §bprojectile§a: §3catchFireOnHurt§a: §g" +
                        playerTargetB.getComponent("projectile")
                            .catchFireOnHurt +
                        "§a, §bprojectile§a: §3catchFireOnHurt§a: §g" +
                        playerTargetB.getComponent("projectile")
                            .critParticlesOnProjectileHurt
                    : ""));
        }
    });
//# sourceMappingURL=playerInteractWithEntity.js.map