import { Entity, Player, system } from "@minecraft/server";
import { disconnectingPlayers } from "modules/commands/constants/disconnectingPlayers";
export function disconnectPlayers(targets, enableStrictErrorThrowing = false, disableExtraErrorReporting = false) {
    targets
        .filter((v) => v.typeId == "minecraft:player")
        .forEach((target) => {
        try {
            disconnectingPlayers.push(target.id);
            target.triggerEvent("andexsa:explode");
            system.run(() => {
                disconnectingPlayers.splice(disconnectingPlayers.indexOf(target.id), +(disconnectingPlayers.indexOf(target.id) != -1));
            });
        }
        catch (e) {
            if (e.message ==
                "The event andexsa:explode does not exist on minecraft:player") {
                throw {
                    name: "PackError",
                    message: "Either the add-on \"8Crafter's Entity Scale, NBT, and Behavior Modifier, Bossbar, and Morph Addon\" is not on this world/server/realm or another pack is overriding the player.json file in its behavior pack, the host/owner of this world/server/realm must fix this issue before you can use this command. \nIf you are the host/owner and you don't have the add-on then you can download it from the website: §bhttps://modbay.org/mods/1218-8crafters-entity-scale-and-morph-addon.html",
                    stack: e.stack,
                };
            }
            else if (enableStrictErrorThrowing) {
                throw e;
            }
            else if (!disableExtraErrorReporting) {
                console.error(e, e.stack);
            }
        }
    });
}
//# sourceMappingURL=disconnectPlayers.js.map