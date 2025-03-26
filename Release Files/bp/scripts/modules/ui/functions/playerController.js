import { Entity, Player, world } from "@minecraft/server";
import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
export function playerController(sourceEntitya, message = "") {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    let form2 = new ModalFormData();
    let playerList = world.getPlayers();
    let targetList = [playerList[0].nameTag];
    let componentList = [playerList[0].getComponents()[0]];
    let dimension = "";
    let spawnXPosition = "";
    let spawnYPosition = "";
    let spawnZPosition = "";
    for (const index in playerList) {
        /*
        console.warn(index);*/
        if (Number(index) != 0) {
            targetList = String([
                String(targetList),
                playerList[index].nameTag,
            ]).split(","); /*
        targetList = String([String(targetList), playerList[index].nameTag]).split(",");*/
        } /*
        console.warn(targetList);*/
    } /*
    console.warn(targetList);
    console.warn(String(targetList).split(","));
    console.warn(String(targetList));
    console.warn([String(targetList)]);*/
    function playerControllerFormPopup(playerTargetB, playerViewerB) {
        let form = new ModalFormData();
        try {
            dimension = String(playerList[playerTargetB].getSpawnPoint().dimension.id);
        }
        catch (e) {
            dimension = "";
        }
        try {
            spawnXPosition = String(playerList[playerTargetB].getSpawnPoint().x);
        }
        catch (e) {
            spawnXPosition = "";
        }
        try {
            spawnYPosition = String(playerList[playerTargetB].getSpawnPoint().y);
        }
        catch (e) {
            spawnYPosition = "";
        }
        try {
            spawnZPosition = String(playerList[playerTargetB].getSpawnPoint().z);
        }
        catch (e) {
            spawnZPosition = "";
        }
        let playerCurrentNameTag = "";
        try {
            playerCurrentNameTag = String(playerList[playerTargetB].nameTag);
        }
        catch (e) {
            playerCurrentNameTag = "";
        }
        form.title("Player Controller");
        form.toggle("Change Name Tag", false);
        form.toggle("Multiline Name Tag", false);
        form.textField("Name Tag", "Name Tag", playerCurrentNameTag);
        form.textField("Trigger Event", "Trigger Event");
        form.textField("addExperience", "Experience Amount");
        form.textField("addLevels", "Level Amount");
        form.slider("Selected Slot", 0, 56, 1, playerList[playerTargetB].selectedSlotIndex);
        form.slider("§4Scale", 0, 10, 0.5);
        form.toggle("Is Sneaking", playerList[playerTargetB].isSneaking);
        form.toggle("Clear Velocity", false);
        form.toggle("Extinguish Fire", false);
        form.toggle("Kill", false);
        form.toggle("§4Remove (Unavailable Until Future Minecraft Update)", false);
        form.toggle("Set On Fire", false);
        form.textField("Set On Fire - Seconds", "Time To Set On Fire For");
        form.toggle("Set On Fire - Use Effects", false);
        form.toggle("Add Effect", false);
        form.textField("Effect To Add", "Effect To Add");
        form.textField("Ticks Of Effect", "Ticks Of Effect");
        form.textField("Effect Amplifier", "Effect Amplifier");
        form.toggle("Show Particles Of Effect", true);
        form.toggle("Add tag", false);
        form.textField("Tag To Add", "Tag To Add");
        form.toggle("Remove Effect", false);
        form.textField("Effect To Remove", "Effect To Remove");
        form.toggle("Remove tag", false);
        form.textField("Tag To Remove", "Tag To Remove"); /*
        form2.dropdown("damageType", ["entity", "projectile"], 0)
        form2.dropdown("damageCause", ["anvil", "none"], 0)*/
        form.toggle("§eapplyImpulse", false);
        form.textField("§eX Velocity", "§eX Velocity" /*, String(playerList[playerTargetB].getVelocity().x)*/);
        form.textField("§eY Velocity", "§eY Velocity" /*, String(playerList[playerTargetB].getVelocity().y)*/);
        form.textField("§eZ Velocity", "§eZ Velocity" /*, String(playerList[playerTargetB].getVelocity().z)*/);
        form.toggle("applyKnockback", false);
        form.textField("directionX", "directionX");
        form.textField("directionZ", "directionZ");
        form.textField("horizontalStrength", "horizontalStrength");
        form.textField("verticalStrength", "verticalStrength");
        form.toggle("Set Rotation", false);
        form.textField("X Rotation", "X Rotation", String(playerList[playerTargetB].getRotation().x));
        form.textField("Y Rotation", "Y Rotation", String(playerList[playerTargetB].getRotation().y));
        form.toggle("Teleport", false);
        form.textField("Teleport Dimension", "Dimension", playerList[playerTargetB].dimension.id);
        form.textField("Teleport X Coordinate", "X Coordinate", String(playerList[playerTargetB].location.x));
        form.textField("Teleport Y Coordinate", "Y Coordinate", String(playerList[playerTargetB].location.y));
        form.textField("Teleport Z Coordinate", "Z Coordinate", String(playerList[playerTargetB].location.z));
        form.textField("Teleport X Rotation", "X Rotation", String(playerList[playerTargetB].getRotation().x));
        form.textField("Teleport Y Rotation", "Y Rotation", String(playerList[playerTargetB].getRotation().y));
        form.dropdown("§eTeleport Rotation Type Mode", ["Rotation", "§4Facing"], 0);
        form.toggle("Teleport - checkForBlocks", false);
        form.toggle("Teleport - keepVelocity", false);
        form.toggle("Try Teleport", false);
        form.textField("Try Teleport Dimension", "§4Dimension", playerList[playerTargetB].dimension.id);
        form.textField("Try Teleport X Coordinate", "§4X Coordinate", String(playerList[playerTargetB].location.x));
        form.textField("Try Teleport Y Coordinate", "§4Y Coordinate", String(playerList[playerTargetB].location.y));
        form.textField("Try Teleport Z Coordinate", "§4Z Coordinate", String(playerList[playerTargetB].location.z));
        form.toggle("Try Teleport - checkForBlocks", false);
        form.toggle("Try Teleport - keepVelocity", false);
        form.toggle("Set Operator", playerList[playerTargetB].isOp());
        form.toggle("Set Spawn Point", false);
        form.textField("Spawn Dimension", "Spawn Dimension", dimension);
        form.textField("Spawn X Coordinate", "Spawn X Coordinate", spawnXPosition);
        form.textField("Spawn Y Coordinate", "Spawn Y Coordinate", spawnYPosition);
        form.textField("Spawn Z Coordinate", "Spawn Z Coordinate", spawnZPosition);
        form.toggle("Start Item Cooldown", false);
        form.textField("Item Category", "Item Category");
        form.textField("Tick Duration", "Tick Duration");
        form.toggle("Send Message", false);
        form.textField("Message To Send", "Message To Send");
        form.toggle("§4Open The Item Modification Form Afterwards", false);
        form.toggle("resetLevel", false);
        form.toggle("§4Debug", false);
        forceShow(form, playerList[playerViewerB])
            .then((r) => {
            if (r.canceled)
                return;
            let [changeNameTag, multilineNameTag, nameTag, triggerEvent, addExperience, addLevels, selectedSlotIndex, scaleValue, isSneaking, clearVelocity, extinguishFire, kill, remove, setOnFire, setOnFireSeconds, setOnFireRemoveEffects, addEffect, effectToAdd, secondsOfEffect, effectAmplifier, effectShowEffectParticles, addTag, tagToAdd, removeEffect, effectToRemove, removeTag, tagToRemove, applyImpulse, velocityX, velocityY, velocityZ, applyKnockback, kockbackDirectionX, knockbackDirectionZ, knockbackHorizontalStrength, knockbackVerticalStrength, setRot, rotX, rotY, teleport, teleportDimension, teleportX, teleportY, teleportZ, teleportRotX, teleportRotY, teleportRotationType, teleportCheckForBlocks, teleportKeepVelocity, tryTeleport, tryTeleportDimension, tryTeleportX, tryTeleportY, tryTeleportZ, tryTeleportCheckForBlocks, tryTeleportKeepVelocity, setOp, setSpawnPoint, spawnDimension, spawnX, spawnY, spawnZ, setItemCooldown, itemCategory, tickDuration, sendMessage, messageToSend, openTheItemModificationFormAfterwards, resetLevel, debug,] = r.formValues;
            let newNameTag = String(nameTag);
            if (Boolean(multilineNameTag) == true) {
                newNameTag = String(nameTag)
                    .split("\\\\newline")
                    .join("\n");
            }
            /*
        let scale = playerList[0].getComponent("scale") as EntityScaleComponent;
        scale.value = Number(scaleValue);*/ /**/
            if (Boolean(changeNameTag) == true) {
                try {
                    playerList[playerTargetB].setOp(Boolean(setOp));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            } /**/
            if (Boolean(changeNameTag) == true) {
                try {
                    playerList[playerTargetB].nameTag = String(newNameTag);
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            playerList[playerTargetB].isSneaking = Boolean(isSneaking);
            playerList[playerTargetB].selectedSlotIndex =
                Number(selectedSlotIndex);
            if (Boolean(addEffect) == true) {
                try {
                    playerList[playerTargetB].addEffect(String(effectToAdd), Number(secondsOfEffect), {
                        amplifier: Number(effectAmplifier),
                        showParticles: Boolean(effectShowEffectParticles),
                    });
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(applyImpulse) == true) {
                try {
                    playerList[playerTargetB].applyImpulse({
                        x: Number(velocityX),
                        y: Number(velocityY),
                        z: Number(velocityZ),
                    });
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(applyKnockback) == true) {
                try {
                    playerList[playerTargetB].applyKnockback({
                        x: Number(kockbackDirectionX) * Number(knockbackHorizontalStrength),
                        z: Number(knockbackDirectionZ) * Number(knockbackHorizontalStrength),
                    }, Number(knockbackVerticalStrength));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(addTag) == true) {
                try {
                    playerList[playerTargetB].addTag(String(tagToAdd));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(removeTag) == true) {
                try {
                    playerList[playerTargetB].removeTag(String(tagToRemove));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(removeEffect) == true) {
                try {
                    playerList[playerTargetB].removeEffect(String(effectToRemove));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(setSpawnPoint) == true) {
                try {
                    playerList[playerTargetB].setSpawnPoint({
                        dimension: world.getDimension(String(spawnDimension)),
                        x: Number(spawnX),
                        y: Number(spawnY),
                        z: Number(spawnZ),
                    });
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(teleport) == true) {
                try {
                    playerList[playerTargetB].teleport({
                        x: Number(teleportX),
                        y: Number(teleportY),
                        z: Number(teleportZ),
                    }, {
                        checkForBlocks: Boolean(teleportCheckForBlocks),
                        dimension: world.getDimension(String(teleportDimension)),
                        keepVelocity: Boolean(teleportKeepVelocity),
                        rotation: {
                            x: Number(teleportRotX),
                            y: Number(teleportRotY),
                        },
                    });
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(tryTeleport) == true) {
                try {
                    playerList[playerTargetB].tryTeleport({
                        x: Number(tryTeleportX),
                        y: Number(tryTeleportY),
                        z: Number(tryTeleportZ),
                    }, {
                        checkForBlocks: Boolean(tryTeleportCheckForBlocks),
                        dimension: world.getDimension(String(tryTeleportDimension)),
                        keepVelocity: Boolean(tryTeleportKeepVelocity),
                    });
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(setOnFire) == true) {
                try {
                    playerList[playerTargetB].setOnFire(Number(setOnFireSeconds), Boolean(setOnFireRemoveEffects));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(setRot) == true) {
                try {
                    playerList[playerTargetB].setRotation({
                        x: Number(rotX),
                        y: Number(rotY),
                    });
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(resetLevel) == true) {
                try {
                    playerList[playerTargetB].resetLevel();
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(kill) == true) {
                try {
                    playerList[playerTargetB].kill();
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(remove) == true) {
                try {
                    playerList[playerTargetB].remove();
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(clearVelocity) == true) {
                try {
                    playerList[playerTargetB].clearVelocity();
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(extinguishFire) == true) {
                try {
                    playerList[playerTargetB].extinguishFire();
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (triggerEvent !== undefined) {
                try {
                    playerList[playerTargetB].triggerEvent(String(triggerEvent));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (addExperience !== undefined) {
                try {
                    playerList[playerTargetB].addExperience(Number(addExperience));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (setItemCooldown !== undefined) {
                try {
                    playerList[playerTargetB].startItemCooldown(String(itemCategory), Number(tickDuration));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (addLevels !== undefined) {
                try {
                    playerList[playerTargetB].addExperience(Number(addLevels));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(sendMessage) == true) {
                try {
                    playerList[playerTargetB].sendMessage(String(messageToSend));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(isSneaking) == true) {
                playerList[playerTargetB].isSneaking = true;
                try {
                    playerList[playerTargetB].addTag("isSneaking");
                }
                catch (e) {
                    console.error(e, e.stack);
                } /*
        if (playerList[playerTargetB].hasTag("isSneaking")) {
          system.runInterval( () => {
          playerList[playerTargetB].isSneaking == true
          if (playerList[playerTargetB].hasTag("isSneaking") == false) {
          return
          }
          }, 2)
        }*/
            }
            else {
                try {
                    playerList[playerTargetB].removeTag("isSneaking");
                    playerList[playerTargetB].isSneaking = false;
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
        })
            .catch((e) => {
            console.error(e, e.stack);
        });
    }
    let showMenuForm2 = sourceEntity;
    if (message.startsWith("players:") &&
        "0123456789".includes(message.charAt(8)) &&
        "0123456789".includes(message.charAt(message.length)) &&
        message.includes("|")) {
        let message2 = message.slice(8, message.length);
        let message3 = message2.split("|");
        let playerTargetB = Number(message3[0]);
        let playerViewerB = Number(message3[1]);
        playerControllerFormPopup(playerTargetB, playerViewerB);
        showMenuForm2 = playerList[playerViewerB];
    }
    else {
        form2.title("Player Controller");
        form2.dropdown("Player Target", String(targetList).split(","), 0);
        form2.dropdown("Player Viewer", String(targetList).split(","), 0);
        forceShow(form2, playerList[playerList.findIndex((x) => x == sourceEntity)])
            .then((t) => {
            if (t.canceled)
                return;
            let [playerTarget, playerViewer] = t
                .formValues;
            let playerTargetB = Number(playerTarget);
            let playerViewerB = Number(playerViewer);
            playerControllerFormPopup(playerTargetB, playerViewerB);
        })
            .catch((e) => {
            console.error(e, e.stack);
        });
    }
}
//# sourceMappingURL=playerController.js.map