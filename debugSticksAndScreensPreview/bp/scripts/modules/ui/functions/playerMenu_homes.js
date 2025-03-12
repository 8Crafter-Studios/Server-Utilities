import { Entity, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, ModalFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showActions } from "modules/utilities/functions/showActions";
import { HomeSystem } from "modules/commands/classes/HomeSystem";
import { vTStr } from "modules/commands/functions/vTStr";
import { showMessage } from "modules/utilities/functions/showMessage";
import { Home } from "modules/commands/classes/Home";
import { customFormUICodes } from "../constants/customFormUICodes";
export async function playerMenu_homes(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (!(sourceEntity instanceof Player)) {
        throw new TypeError("Invalid Player. Expected an instance of the Player class, or an instance of the executeCommandPlayerW class with a Player linked to it, but instead got " +
            (typeof sourceEntity == "object"
                ? sourceEntity === null
                    ? "object[null]"
                    : "object[" + (sourceEntity.constructor.name ?? "unknown") + "]"
                : typeof sourceEntity) +
            ".");
    }
    if (!config.homeSystem.homeSystemEnabled) {
        if ((await showMessage(sourceEntity, "Error", `§cSorry but the home system is currently disabled.`, "Back", "Close")).selection === 0) {
            return 1;
        }
        else {
            return 0;
        }
    }
    let form = new ActionFormData();
    form.title(customFormUICodes.action.titles.formStyles.general + "Homes");
    const homes = HomeSystem.getHomesForPlayer(sourceEntity.id);
    homes.forEach((h) => form.button(`${customFormUICodes.action.buttons.positions.main_only}${h.name}\n${dimensionTypeDisplayFormatting[dimensionse[dimensions.indexOf(h.location.dimension)]]}§r ${vTStr(Vector.floor(h.location))}`));
    form.button(customFormUICodes.action.buttons.positions.main_only + "New Home", "textures/ui/color_plus");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        if (r.canceled)
            return 1;
        switch ((!!homes[r.selection] ? "home" : undefined) ?? ["newHome", "back", "close"][r.selection - homes.length]) {
            case "home":
                const home = homes[r.selection];
                switch (["teleport", "delete", "back", "close"][(await showActions(sourceEntity, "Home Details", `${home.name}\nDimension${dimensionTypeDisplayFormattingD[home.location.dimension.id]}`, ["Teleport", "textures/items/ender_pearl"], ["Delete", "textures/ui/trash_default"], ["Back", "textures/ui/arrow_left"], ["Close", "textures/ui/crossout"])).selection]) {
                    case "teleport":
                        if (home.location.dimension !== overworld && !config.homeSystem.allowHomesInOtherDimensions) {
                            if ((await showMessage(sourceEntity, "Error", `§cSorry but homes in dimensions other than the overworld have been disabled.`, "Back", "Close")).selection === 0) {
                                return await playerMenu_homes(sourceEntity);
                            }
                            else {
                                return 0;
                            }
                        }
                        if (sourceEntity.dimension !== home.location.dimension && !config.teleportSystems.allowCrossDimensionalTeleport) {
                            if ((await showMessage(sourceEntity, "Error", `§cSorry but all cross-dimensional teleports have been disabled.`, "Back", "Close")).selection === 0) {
                                return await playerMenu_homes(sourceEntity);
                            }
                            else {
                                return 0;
                            }
                        }
                        if (sourceEntity.dimension !== home.location.dimension && !config.homeSystem.allowCrossDimensionalTeleport) {
                            if ((await showMessage(sourceEntity, "Error", `§cSorry but cross-dimensional home teleports have been disabled.`, "Back", "Close")).selection === 0) {
                                return await playerMenu_homes(sourceEntity);
                            }
                            else {
                                return 0;
                            }
                        }
                        // Check for PVP cooldown before starting the teleport countdown.
                        if (Number(sourceEntity.getDynamicProperty("lastHurtByPlayerTime") ?? 0) + config.teleportSystems.pvpCooldownToTeleport * 1000 > Date.now()) {
                            sourceEntity.sendMessage(`§cSorry but you have to wait another ${Math.round((Number(sourceEntity.getDynamicProperty("lastHurtByPlayerTime") ?? 0) + config.teleportSystems.pvpCooldownToTeleport * 1000 - Date.now()) / 1000)} seconds before you can teleport again because you are still on PVP cooldown.`);
                            return 0;
                        }
                        // Check for teleport cooldown before starting the teleport countdown.
                        if (Number(sourceEntity.getDynamicProperty("lastTeleportTime") ?? 0) + config.teleportSystems.teleportCooldown * 1000 > Date.now()) {
                            sourceEntity.sendMessage(`§cSorry but you have to wait another ${Math.round((Number(sourceEntity.getDynamicProperty("lastTeleportTime") ?? 0) + config.teleportSystems.teleportCooldown * 1000 - Date.now()) / 1000)} seconds before you can teleport again because you are still on cooldown.`);
                            return 0;
                        }
                        const standStillTime = config.teleportSystems.standStillTimeToTeleport;
                        if (standStillTime > 0) {
                            sourceEntity.sendMessage("§eStand still for " + standStillTime + " seconds to teleport.");
                            await waitTicks(20);
                        }
                        const playerPosition = sourceEntity.location;
                        let successful = true;
                        for (let i = 0; i < standStillTime; i++) {
                            if (!Vector.equals(sourceEntity.location, playerPosition)) {
                                successful = false;
                                break;
                            }
                            ;
                            sourceEntity.sendMessage("§bTeleporting in " + (standStillTime - i));
                            await waitTicks(20);
                        }
                        // Check for PVP cooldown again after ending the teleport countdown.
                        if (Number(sourceEntity.getDynamicProperty("lastHurtByPlayerTime") ?? 0) + config.teleportSystems.pvpCooldownToTeleport * 1000 > Date.now()) {
                            sourceEntity.sendMessage(`§cSorry but you have to wait another ${Math.round((Number(sourceEntity.getDynamicProperty("lastHurtByPlayerTime") ?? 0) + config.teleportSystems.pvpCooldownToTeleport * 1000 - Date.now()) / 1000)} seconds before you can teleport again because you are still on PVP cooldown.`);
                            successful = false;
                            return 0;
                        }
                        // Check for teleport cooldown again after ending the teleport countdown.
                        if (Number(sourceEntity.getDynamicProperty("lastTeleportTime") ?? 0) + config.teleportSystems.teleportCooldown * 1000 > Date.now()) {
                            sourceEntity.sendMessage(`§cSorry but you have to wait another ${Math.round((Number(sourceEntity.getDynamicProperty("lastTeleportTime") ?? 0) + config.teleportSystems.teleportCooldown * 1000 - Date.now()) / 1000)} seconds before you can teleport again because you are still on cooldown.`);
                            return 0;
                        }
                        if (successful) {
                            try {
                                sourceEntity.teleport(home.location, { dimension: home.location.dimension });
                                sourceEntity.setDynamicProperty("lastTeleportTime", Date.now());
                                sourceEntity.sendMessage("§aSuccessfully teleported.");
                            }
                            catch (e) {
                                sourceEntity.sendMessage("§cAn error occurred while trying to teleport you to your home: " + e + e.stack);
                            }
                        }
                        else {
                            sourceEntity.sendMessage("§cTeleport canceled.");
                        }
                        return 0;
                    case "delete":
                        if ((await showMessage(sourceEntity, "Are You Sure?", "Are you sure you want to delete this home!?\nThis action cannot be undone!", "Cancel", "Confirm")).selection == 1) {
                            home.remove();
                        }
                        return await playerMenu_homes(sourceEntity);
                    case "back":
                        return await playerMenu_homes(sourceEntity);
                    case "close":
                        return 0;
                }
            case "newHome": {
                if (sourceEntity.dimension !== overworld && !config.homeSystem.allowHomesInOtherDimensions) {
                    if ((await showMessage(sourceEntity, "Error", `§cSorry but homes in dimensions other than the overworld have been disabled.`, "Back", "Close")).selection === 0) {
                        return await playerMenu_homes(sourceEntity);
                    }
                    else {
                        return 0;
                    }
                }
                if (HomeSystem.testIfPlayerAtMaxHomes(sourceEntity)) {
                    if ((await showMessage(sourceEntity, "Error", `§cMax homes reached. Please delete a home if you want to add a new one.`, "Back", "Close")).selection === 0) {
                        return await playerMenu_homes(sourceEntity);
                    }
                    else {
                        return 0;
                    }
                }
                const location = sourceEntity.dimensionLocation;
                const r = await new ModalFormData().title("New Home").textField(`Location: ${vTStr(location)}\nDimension: ${dimensionTypeDisplayFormattingD[location.dimension.id]}\n\nPlease enter the name for your new home below.`, "Home Name").submitButton("Create Home").forceShow(sourceEntity);
                if (r.canceled) {
                    return await playerMenu_homes(sourceEntity);
                }
                if (r.formValues?.[0] === "") {
                    if ((await showMessage(sourceEntity, "Error", `§cPlease specify a name for the home.`, "Back", "Close")).selection === 0) {
                        return await playerMenu_homes(sourceEntity);
                    }
                    else {
                        return 0;
                    }
                }
                if (!!HomeSystem.getHomesForPlayer(sourceEntity).find((h) => h.name == r.formValues?.[0])) {
                    if ((await showMessage(sourceEntity, "Error", `§cYou already have a home with this name. Please delete the home and create it again if you want to change its location.`, "Back", "Close")).selection === 0) {
                        return await playerMenu_homes(sourceEntity);
                    }
                    else {
                        return 0;
                    }
                }
                new Home({
                    location: Object.assign(sourceEntity.location, { dimension: sourceEntity.dimension }),
                    name: r.formValues?.[0],
                    owner: sourceEntity,
                    saveId: "home:" + sourceEntity.id + ":" + r.formValues?.[0],
                }).save();
                return await playerMenu_homes(sourceEntity);
            }
            case "back":
                return 1;
            case "close":
                return 0;
            default:
                return 1;
        }
    })
        .catch((e) => {
        console.error(e, e.stack);
        return 0;
    });
}
//# sourceMappingURL=playerMenu_homes.js.map