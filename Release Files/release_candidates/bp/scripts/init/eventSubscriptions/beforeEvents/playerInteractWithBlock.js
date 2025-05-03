import { world, ItemStack } from "@minecraft/server";
import { srun } from "init/functions/srun";
import { ProtectedAreaTester } from "init/variables/protectedAreaVariables";
import { rangeToIntArray } from "modules/command_utilities/functions/rangeToIntArray";
import { interactable_blockb } from "modules/main/classes/interactable_blockb";
import { debugAction } from "modules/main/functions/debugAction";
import { editorStick } from "modules/ui/functions/editorStick";
import { editorStickB } from "modules/ui/functions/editorStickB";
import { editorStickC } from "modules/ui/functions/editorStickC";
import { securityVariables } from "security/ultraSecurityModeUtils";
subscribedEvents.beforePlayerInteractWithBlock = world.beforeEvents.playerInteractWithBlock.subscribe((event) => {
    Object.defineProperty(event, "source", {
        value: event.player,
        writable: false,
        enumerable: true,
        configurable: true
    });
    if (event.player.hasTag("debugStickDyingMode") && event.block.typeId == "minecraft:cauldron") {
        event.cancel = false;
        srun(async () => {
            const arr = rangeToIntArray([0, 100]);
            for await (let i of arr) {
                if (!event.player.hasTag("debugStickDyingMode")) {
                    return;
                }
                event.player.onScreenDisplay.setActionBar("§aYou currently have Debug Stick Dying Mode enabled,\nwhich disables the use of the debug sticks, editor sticks,\nand pick block sticks on cauldrons, to allow them to\nbe dyed by the cauldron. To switch out of this mode\njust remove the debugStickDyingMode tag from yourself.");
                await waitTick();
            }
        });
        return;
    }
    if (event.itemStack?.typeId === "andexdb:selection_tool") {
        event.cancel = true;
        // console.log(1);
        return;
    }
    if (!!event?.itemStack?.getDynamicProperty("itemUseOnCode")) {
        try {
            eval(String(event?.itemStack?.getDynamicProperty("itemUseOnCode")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => {
                if (currentplayer.hasTag("itemUseOnCodeDebugErrors")) {
                    currentplayer.sendMessage(e + e.stack);
                }
            });
        }
    }
    if (!!event?.itemStack?.getDynamicProperty("playerInteractWithBlockCode")) {
        try {
            eval(String(event?.itemStack?.getDynamicProperty("playerInteractWithBlockCode")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => {
                if (currentplayer.hasTag("itemPlayerInteractWithBlockCodeDebugErrors")) {
                    currentplayer.sendMessage(e + e.stack);
                }
            });
        }
    }
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:playerInteractWithBlock")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => {
            if (currentplayer.hasTag("playerInteractWithBlockBeforeEventDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            }
        });
    }
    if (event.itemStack?.typeId === "andexdb:debug_stick" || event.itemStack?.typeId === "andexdb:liquid_clipped_debug_stick") {
        event.cancel = true;
        if (securityVariables.ultraSecurityModeEnabled) {
            if (securityVariables.testPlayerForPermission(event.player, "andexdb.canUseDebugStick") == false) {
                event.player.sendMessage("§cYou do not have permission to use an Debug Stick. You need the following permission to use this item: andexdb.canUseDebugStick");
                return;
            }
        }
        let initialDelay = 4;
        let delay = 4;
        let holdDuration = 10;
        if (event.player.getDynamicProperty("debugStickInitialUseCooldown") != undefined) {
            initialDelay = Number(event.player.getDynamicProperty("debugStickInitialUseCooldown"));
        }
        if (event.player.getDynamicProperty("debugStickUseCooldown") != undefined) {
            delay = Number(event.player.getDynamicProperty("debugStickUseCooldown"));
        }
        if (event.player.getDynamicProperty("debugStickHoldDuration") != undefined) {
            holdDuration = Number(event.player.getDynamicProperty("debugStickHoldDuration"));
        }
        if (interactable_blockb.interactable_block.find((playerId) => playerId.id == event.player.id) == undefined) {
            interactable_blockb.interactable_block.push({
                id: event.player.id,
                delay: 0,
            });
        }
        if (event.isFirstEvent) {
            interactable_blockb.interactable_block.find((playerId) => playerId.id == event.player.id).delay = initialDelay;
            interactable_blockb.interactable_block.find((playerId) => playerId.id == event.player.id).holdDuration = holdDuration;
            debugAction(event.block, event.player, 0, Number(event.player.isSneaking));
        }
        else if (interactable_blockb.interactable_block.find((playerId) => playerId.id == event.player.id).delay == 0 ||
            String(Object.values(event.player.getDynamicProperty("debugStickBlockLocation"))) != String(Object.values(event.block.location))) {
            interactable_blockb.interactable_block.find((playerId) => playerId.id == event.player.id).delay = delay;
            interactable_blockb.interactable_block.find((playerId) => playerId.id == event.player.id).holdDuration = holdDuration;
            debugAction(event.block, event.player, 0, Number(event.player.isSneaking));
        }
    } /*
    if (event.itemStack?.typeId === "andexdb:selection_tool") {
        event.cancel = true
        try {
            const mode = Boolean(event.player.getDynamicProperty("posM")??false)
            const posV = Vector3Utils.floor(event.block.location)
            event.player.setDynamicProperty(mode?"pos2":"pos1", posV)
            event.source.setDynamicProperty("posD", event.source.dimension.id)
            event.player.sendMessage(`Set ${mode?"pos2":"pos1"} to ${vTStr(posV)}.`)
            event.player.setDynamicProperty("posM", !mode)
        }catch(e){console.error(e, e.stack)}
    };*/
    world
        .getAllPlayers()
        .filter((player) => player.hasTag("getPlayerBlockInteractionEventNotifications"))
        .forEach((currentPlayer) => {
        currentPlayer.sendMessage("[beforeEvents.playerInteractWithBlock]Location: [ " +
            event.block.location.x +
            ", " +
            event.block.location.y +
            ", " +
            event.block.location.z +
            " ], Dimension: " +
            event.block.dimension.id +
            ", Block Type: " +
            (event.block?.typeId ?? "") +
            ", Item Type: " +
            (event.itemStack?.typeId ?? "") +
            ", Is First Event: " +
            event.isFirstEvent +
            ", Player: " +
            event.player.name);
    });
    if ((securityVariables.ultraSecurityModeEnabled ? securityVariables.testPlayerForPermission(event.player, permissionType["andexdb.bypassProtectedAreas"]) : event.player.hasTag("canBypassProtectedAreas")) != true &&
        new ProtectedAreaTester("playerInteractWithBlock").testIsInArea(event, event.block.location, event.block.dimension) /* (((testIsWithinRanges(
        protectedAreaVariables.noBlockInteractAreas.positive.filter((v) => v.dimension == dimensions.indexOf(event.block.dimension)),
        event.block.location
    ) ?? false) == true &&
        (testIsWithinRanges(
            protectedAreaVariables.noBlockInteractAreas.negative.filter((v) => v.dimension == dimensions.indexOf(event.block.dimension)),
            event.block.location
        ) ?? false) == false) ||
        ((testIsWithinRanges(
            protectedAreaVariables.noInteractAreas.positive.filter((v) => v.dimension == dimensions.indexOf(event.block.dimension)),
            event.block.location
        ) ?? false) == true &&
            (testIsWithinRanges(
                protectedAreaVariables.noInteractAreas.negative.filter((v) => v.dimension == dimensions.indexOf(event.block.dimension)),
                event.block.location
            ) ?? false) == false)) */) {
        event.cancel = true;
    }
    else {
        const borderSettings = Object.fromEntries(Object.entries(config.worldBorder[dimensionse[dimensionsd.indexOf(event.block.dimension.id)]]));
        if (borderSettings.enabled && borderSettings.preventWorldInteractionOutsideBorder) {
            if (!event.player.hasTag("canBypassWorldBorderInteractionLimits") &&
                (event.block.x >= borderSettings.to.x ||
                    event.block.z >= borderSettings.to.z ||
                    event.block.x < borderSettings.from.x ||
                    event.block.z < borderSettings.from.z)) {
                event.cancel = true;
            }
        }
    }
    if (event.isFirstEvent) {
        if (event.itemStack?.typeId === "andexdb:editor_stick") {
            event.cancel = true;
            if (securityVariables.ultraSecurityModeEnabled) {
                if (securityVariables.testPlayerForPermission(event.player, "andexdb.canUseEditorSticks") == false) {
                    event.player.sendMessage("§cYou do not have permission to use an Editor Stick. You need the following permission to use this item: andexdb.canUseEditorSticks");
                    return;
                }
            }
            try {
                editorStickMenuOpeningAsyncCancelActionNumbers[event.player.id] = srun(() => editorStick(event.player));
            }
            catch (e) {
                console.error(e, e.stack);
            }
        }
        if (event.itemStack?.typeId === "andexdb:editor_stick_b") {
            event.cancel = true;
            if (securityVariables.ultraSecurityModeEnabled) {
                if (securityVariables.testPlayerForPermission(event.player, "andexdb.canUseEditorSticks") == false) {
                    event.player.sendMessage("§cYou do not have permission to use an Editor Stick B. You need the following permission to use this item: andexdb.canUseEditorSticks");
                    return;
                }
            }
            try {
                editorStickMenuOpeningAsyncCancelActionNumbers[event.player.id] = srun(() => editorStickB(event.player));
            }
            catch (e) {
                console.error(e, e.stack);
            }
        }
        if (event.itemStack?.typeId === "andexdb:editor_stick_c") {
            event.cancel = true;
            if (securityVariables.ultraSecurityModeEnabled) {
                if (securityVariables.testPlayerForPermission(event.player, "andexdb.canUseEditorSticks") == false) {
                    event.player.sendMessage("§cYou do not have permission to use an Editor Stick C. You need the following permission to use this item: andexdb.canUseEditorSticks");
                    return;
                }
            }
            try {
                editorStickMenuOpeningAsyncCancelActionNumbers[event.player.id] = srun(() => editorStickC(event.player));
            }
            catch (e) {
                console.error(e, e.stack);
            }
        }
        if (["andexdb:pick_block_stick", "andexdb:liquid_clipped_pick_block_stick"].includes(event.itemStack?.typeId)) {
            event.cancel = true;
            if (securityVariables.ultraSecurityModeEnabled) {
                if (securityVariables.testPlayerForPermission(event.player, "andexdb.canUsePickBlockSticks") == false) {
                    event.player.sendMessage(`§cYou do not have permission to use a ${event.itemStack?.typeId == "andexdb:pick_block_stick" ? "" : "Liquid Clipped "}Pick Block Stick. You need the following permission to use this item: andexdb.canUsePickBlockSticks`);
                    return;
                }
            }
            try {
                srun(() => event.player.inventory.container.addItem(event.block.getItemStack() ?? tryget(() => new ItemStack(event.block.typeId))));
                return;
            }
            catch (e) {
                console.error(e, e.stack);
            }
        }
        if (["andexdb:data_pick_block_stick", "andexdb:liquid_clipped_data_pick_block_stick"].includes(event.itemStack?.typeId)) {
            event.cancel = true;
            if (securityVariables.ultraSecurityModeEnabled) {
                if (securityVariables.testPlayerForPermission(event.player, "andexdb.canUsePickBlockSticks") == false) {
                    event.player.sendMessage(`§cYou do not have permission to use a ${event.itemStack?.typeId == "andexdb:data_pick_block_stick" ? "" : "Liquid Clipped "}Data Pick Block Stick. You need the following permission to use this item: andexdb.canUsePickBlockSticks`);
                    return;
                }
            }
            try {
                srun(() => event.player.inventory.container.addItem(event.block.getItemStack(undefined, true) ?? tryget(() => new ItemStack(event.block.typeId))));
                return;
            }
            catch (e) {
                console.error(e, e.stack);
            }
        }
    }
});
//# sourceMappingURL=playerInteractWithBlock.js.map