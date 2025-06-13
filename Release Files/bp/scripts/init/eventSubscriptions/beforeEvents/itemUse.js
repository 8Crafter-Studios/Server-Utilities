import { Vector3Utils } from "@minecraft/math.js";
import { world, system, BlockTypes, BlockPermutation, Structure, StructureSaveMode } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";
import { BlockPattern } from "modules/commands/classes/BlockPattern";
import { vTStr } from "modules/commands/functions/vTStr";
import { dirmap } from "modules/coordinates/functions/dirmap";
import { diroffsetothersmap } from "modules/coordinates/functions/diroffsetothersmap";
import { roundVector3ToMiddleOfBlock } from "modules/coordinates/functions/roundVector3ToMiddleOfBlock";
import { fillBlocksHB } from "modules/main/functions/fillBlocksHB";
import { fillBlocksHFGB } from "modules/main/functions/fillBlocksHFGB";
import { fillBlocksHSGB } from "modules/main/functions/fillBlocksHSGB";
import { scriptEvalRunWindow } from "modules/ui/functions/scriptEvalRunWindow";
import { editorStick } from "modules/ui/functions/editorStick";
import { editorStickB } from "modules/ui/functions/editorStickB";
import { editorStickC } from "modules/ui/functions/editorStickC";
import { mainMenu } from "modules/ui/functions/mainMenu";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { BlockMask } from "modules/commands/classes/BlockMask";
import { fillSphere } from "modules/block_generation_utilities/functions/fillSphere";
import { fillArea } from "modules/block_generation_utilities/functions/fillArea";
import { playerMenu } from "modules/ui/functions/playerMenu";
import { ProtectedAreaTester } from "init/variables/protectedAreaVariables";
import { dirreversemap } from "modules/coordinates/functions/dirreversemap";
import { getSuperUniqueID } from "modules/utilities/functions/getSuperUniqueID";
import { BlockClipboard, GlobalBlockClipboard } from "modules/coordinates/classes/BlockClipboard";
import { removeAirFromStructure } from "modules/coordinates/functions/removeAirFromStructure";
subscribedEvents.beforeItemUse = world.beforeEvents.itemUse.subscribe((event) => {
    if (!!event?.itemStack?.getDynamicProperty("code")) {
        try {
            eval(String(event?.itemStack?.getDynamicProperty("code")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => {
                if (currentplayer.hasTag("itemCodeDebugErrors")) {
                    currentplayer.sendMessage(e + e.stack);
                }
            });
        }
    }
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:itemUse")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => {
            if (currentplayer.hasTag("itemUseBeforeEventDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            }
        });
    }
    world
        .getAllPlayers()
        .filter((player) => player.hasTag("getPlayerItemUseEventNotifications"))
        .forEach((currentPlayer) => {
        currentPlayer.sendMessage("[beforeEvents.itemUse]Location: [ " +
            event.source.location.x +
            ", " +
            event.source.location.y +
            ", " +
            event.source.location.z +
            " ], Dimension: " +
            event.source.dimension.id +
            ", Item Type: " +
            (event.itemStack?.typeId ?? "") +
            ", Player: " +
            event.source.name);
    }); /*
if (event.itemStack?.typeId === "andexdb:debug_stick" || event.itemStack?.typeId === "andexdb:liquid_clipped_debug_stick"){*/ /*
    if (interactable_blockb.interactable_block == true){interactable_blockb.interactable_block = false}else{*/ /*
        interactable_blockb.interactable_block.find((playerId)=>(playerId.id == event.source.id)).delay = 0; */ /*
if (event.source.isSneaking){system.run(()=>{
    event.cancel = false;
    (event.source as Player).onScreenDisplay.setActionBar(`§l§eTags: §r§a${event.source.getBlockFromViewDirection().block.getTags().join(", ")}\n§l§eBlock States: §r§a${Object.entries(event.source.getBlockFromViewDirection().block.permutation.getAllStates()).join("\n")}`)})}; */ /*
debugAction(event.source.getBlockFromViewDirection().block, event.source, 0)
}; */ /*
    }; */
    if (event.itemStack?.typeId === "andexdb:inventory_controller") {
        event.cancel = true;
        try {
            if (securityVariables.ultraSecurityModeEnabled) {
                if (securityVariables.testPlayerForPermission(event.source, "andexdb.canUseInventoryController") == false) {
                    event.source.sendMessage("§cYou do not have permission to use an Inventory Controller. You need the following permission to use this item: andexdb.canUseInventoryController");
                    return;
                }
            }
            srun(() => event.source.runCommand(String("/scriptevent andexdb:itemLoreInventoryModifier hisw")));
        }
        catch (e) {
            // Do something
            console.error(e, e.stack);
        } /*
        system.run(() => {
        let form2 = new ModalFormData();
        let players = world.getAllPlayers();
        let targetList = [players[0]!.nameTag]
        for (const index in players) {
            if (Number(index) != 0) {
            targetList = String([String(targetList), players[index]!.nameTag]).split(",");
            }
        }
        form2.textField("Slot Number", "Slot Number", {defaultValue: "0"});
        form2.dropdown("Player Target", String(targetList).split(","), 0)
        form2.dropdown("Player Viewer", String(targetList).split(","), 0)
        form2.show(event.source as Player).then(t => {
            if (t.canceled)
                return;
                let [slotNumber, playerTarget, playerViewer] = t.formValues!;
                let playerTargetB = Number(playerTarget)
                let playerViewerB = Number(playerViewer)
        const inventory = players[playerTargetB]!.getComponent("inventory") as EntityInventoryComponent;
        let item = inventory.container.getItem(Number(slotNumber));
        function getDurability() { try {return item.getComponent("minecraft:durability") as ItemDurabilityComponent;} catch(e){console.error(e, e.stack); return undefined};}
        const durability = getDurability()
        let itemNameTextField = itemNameTextCalculator();
        function itemNameTextCalculator(){
        if (item.nameTag == undefined) {
            return undefined;
        } else {
        if (item.nameTag != undefined) {
            return item.nameTag;
        }}}
        let form = new ModalFormData();
        console.warn(item.nameTag);
        console.warn(Array(item.getLore().toString()).join(""));
        form.title("Item Modifier / Lore");
        form.textField("Item Name\nTo type multiple lines just put \\\\newline in between each line. \nTo clear item name just leave field blank. ", "Item Name", {defaultValue: itemNameTextField*/ /*(String(item.nameTag))*/ /*});
        form.textField("Item Lore\nTo type multiple lines just put \\\\newline in between each line. ", "Item Lore", {defaultValue: (Array(item.getLore().toString()).join(""))});
        form.textField("Can Destroy", "Can Destroy", {defaultValue: ""*/ /*(String(item.getCanDestroy()))*/ /*});
        form.textField("Can Place On", "Can Place On", {defaultValue: ""*/ /*(String(item.getCanPlaceOn()))*/ /*});
        form.textField("Trigger Event", "Trigger Event", {defaultValue: ""});
        form.slider("Count", 0, 255, {valueStep: 1, defaultValue: item.amount});
        form.toggle("keepOnDeath", {defaultValue: (item.keepOnDeath)});
        function getItemLockMode(mode?: Number, input?: Number) {if (mode == 1) {
        if(item.lockMode == "inventory") {
            return 0
        } else{
            if(item.lockMode == "none") {return 1} else{
                if(item.lockMode == "slot") {return 2}}}}
                else {if (mode == 0) {if(input == 0) {
                    return ItemLockMode.inventory
                } else{
                    if(input == 1) {return ItemLockMode.none} else{
                        if(input == 2) {return ItemLockMode.slot}}}}}}
        let itemLockModeIndex = Number(getItemLockMode(1))
        form.dropdown("lockMode", [ "inventory", "none", "slot" ], {defaultValueIndex: (itemLockModeIndex)});
        form.toggle("setLore", {defaultValue: false});
        form.toggle("clearLore", {defaultValue: false});
        form.toggle("Debug", {defaultValue: false});

        form.show(players[playerViewerB]).then(r => {
            // This will stop the code when the player closes the form
            if (r.canceled) return;
        
            // This will assign every input their own variable
            let [ itemName, itemLore, canDestroy, canPlaceOn, triggerEvent, amount, keepOnDeath, lockMode, setLore, clearLore, debug ] = r.formValues!;*/ /*
        console.warn(r.formValues);*/ /*
    
        let item = inventory.container.getItem(Number(slotNumber));
        let newItemNameTag = String(itemName).split("\\\\newline")
        try {item.nameTag = newItemNameTag.join("\n");} catch(e){console.error(e, e.stack);}
        if (Boolean(setLore) == true) {
            try {item.setLore(String(itemLore).split("\\\\newline"));} catch(e){console.error(e, e.stack);}
        }
        if (Boolean(clearLore) == true) {
            try {item.setLore();} catch(e){console.error(e, e.stack);}
        }
        item.lockMode = String(getItemLockMode(0, Number(lockMode))) as ItemLockMode;
        item.keepOnDeath = Boolean(keepOnDeath);
        item.amount = Number(amount);
        try {item.setCanDestroy(String(canDestroy).split(", "))} catch(e){console.error(e, e.stack);};*/ /*String[String(canDestroy)]*/ /*;
        try {item.setCanPlaceOn(String(canPlaceOn).split(", "))} catch(e){console.error(e, e.stack);};
        item.triggerEvent(String(triggerEvent));
        try{ durability.damage = Number(10); } catch(e){console.error(e, e.stack)}
        inventory.container.setItem(Number(slotNumber), item);
        try{ durability.damage = Number(10); } catch(e){console.error(e, e.stack)}
        if (Boolean(debug) == true) {
            console.warn("Form Values", r.formValues);
            console.warn(["Item Components: ", item.getComponents()]);
            console.warn(item.getTags());
            console.warn(players);
            console.warn(players[0]);
            console.warn(players[1]);*/ /*
        try {console.warn(item.getCanDestroy());} catch(e){
            console.error(e, e.stack)};
        try {console.warn(item.getCanPlaceOn());} catch(e){
            console.error(e, e.stack)};*/ /*
    console.warn(item.isStackable);
    console.warn(item.maxAmount);
    console.warn(item.type);
    console.warn(item.typeId);
    console.warn(item.nameTag);
    console.warn(item.getLore());
    try {console.warn(["Damage: ", durability.damage]);} catch(e){console.error(e, e.stack)};
    try {console.warn(["Damage Chance: ", durability.getDamageChance()]);} catch(e){console.error(e, e.stack)};
    try {console.warn(["Damage Range: ", durability.getDamageRange()]);} catch(e){console.error(e, e.stack)};
    try {console.warn(["Max Durability: ", durability.maxDurability]);} catch(e){console.error(e, e.stack)};
    let componentList = [item.getComponents()[0]!.typeId]
    for (const index in players) {
        if (Number(index) != 0) {
        componentList = String([String(componentList), item.getComponents()[index].typeId]).split(",");
        }
    }
    console.warn(String(["Item Components: " + String(componentList)]));
}

// Do something
}).catch(e => {
console.error(e, e.stack);
});
}).catch(e => {
console.error(e, e.stack);
});
})*/
        // ...
        // Output: [ <TextField Input>, <Dropdown Input>, <Slider Input>, <Toggle Input> ]
    }
    if (event.itemStack?.typeId === "andexdb:debug_stick" && event.itemStack.nameTag === "§r§dItem Modifier") {
        event.cancel = true;
        try {
            if (securityVariables.ultraSecurityModeEnabled) {
                if (securityVariables.testPlayerForPermission(event.source, "andexdb.canUseInventoryController") == false) {
                    event.source.sendMessage("§cYou do not have permission to use an Inventory Controller. You need the following permission to use this item: andexdb.canUseInventoryController");
                    return;
                }
            }
            srun(() => event.source.runCommand(String("/scriptevent andexdb:itemLoreInventoryModifier hisw")));
        }
        catch (e) {
            // Do something
            console.error(e, e.stack);
        } /*
        system.run(() => {
        let form2 = new ModalFormData();
        let players = world.getAllPlayers();
        let targetList = [players[0]!.nameTag]
        for (const index in players) {
            if (Number(index) != 0) {
            targetList = String([String(targetList), players[index]!.nameTag]).split(",");
            }
        }
        form2.textField("Slot Number", "Slot Number", {defaultValue: "0"});
        form2.dropdown("Player Target", String(targetList).split(","), 0)
        form2.dropdown("Player Viewer", String(targetList).split(","), 0)
        form2.show(event.source as Player).then(t => {
            if (t.canceled)
                return;
                let [slotNumber, playerTarget, playerViewer] = t.formValues!;
                let playerTargetB = Number(playerTarget)
                let playerViewerB = Number(playerViewer)
        const inventory = players[playerTargetB]!.getComponent("inventory") as EntityInventoryComponent;
        let item = inventory.container.getItem(Number(slotNumber));
        function getDurability() { try {return item.getComponent("minecraft:durability") as ItemDurabilityComponent;} catch(e){console.error(e, e.stack); return undefined};}
        const durability = getDurability()
        let itemNameTextField = itemNameTextCalculator();
        function itemNameTextCalculator(){
        if (item.nameTag == undefined) {
            return undefined;
        } else {
        if (item.nameTag != undefined) {
            return item.nameTag;
        }}}
        let form = new ModalFormData();
        console.warn(item.nameTag);
        console.warn(Array(item.getLore().toString()).join(""));
        form.title("Item Modifier / Lore");
        form.textField("Item Name\nTo type multiple lines just put \\\\newline in between each line. \nTo clear item name just leave field blank. ", "Item Name", {defaultValue: itemNameTextField*/ /*(String(item.nameTag))*/ /*});
        form.textField("Item Lore\nTo type multiple lines just put \\\\newline in between each line. ", "Item Lore", {defaultValue: (Array(item.getLore().toString()).join(""))});
        form.textField("Can Destroy", "Can Destroy", {defaultValue: ""*/ /*(String(item.getCanDestroy()))*/ /*});
        form.textField("Can Place On", "Can Place On", {defaultValue: ""*/ /*(String(item.getCanPlaceOn()))*/ /*});
        form.textField("Trigger Event", "Trigger Event", {defaultValue: ""});
        form.slider("Count", 0, 255, {valueStep: 1, defaultValue: item.amount});
        form.toggle("keepOnDeath", {defaultValue: (item.keepOnDeath)});
        function getItemLockMode(mode?: Number, input?: Number) {if (mode == 1) {
        if(item.lockMode == "inventory") {
            return 0
        } else{
            if(item.lockMode == "none") {return 1} else{
                if(item.lockMode == "slot") {return 2}}}}
                else {if (mode == 0) {if(input == 0) {
                    return ItemLockMode.inventory
                } else{
                    if(input == 1) {return ItemLockMode.none} else{
                        if(input == 2) {return ItemLockMode.slot}}}}}}
        let itemLockModeIndex = Number(getItemLockMode(1))
        form.dropdown("lockMode", [ "inventory", "none", "slot" ], {defaultValueIndex: (itemLockModeIndex)});
        form.toggle("setLore", {defaultValue: false});
        form.toggle("clearLore", {defaultValue: false});
        form.toggle("Debug", {defaultValue: false});

        form.show(players[playerViewerB]).then(r => {
            // This will stop the code when the player closes the form
            if (r.canceled) return;
        
            // This will assign every input their own variable
            let [ itemName, itemLore, canDestroy, canPlaceOn, triggerEvent, amount, keepOnDeath, lockMode, setLore, clearLore, debug ] = r.formValues!;*/ /*
        console.warn(r.formValues);*/ /*
    
        let item = inventory.container.getItem(Number(slotNumber));
        let newItemNameTag = String(itemName).split("\\\\newline")
        try {item.nameTag = newItemNameTag.join("\n");} catch(e){console.error(e, e.stack);}
        if (Boolean(setLore) == true) {
            try {item.setLore(String(itemLore).split("\\\\newline"));} catch(e){console.error(e, e.stack);}
        }
        if (Boolean(clearLore) == true) {
            try {item.setLore();} catch(e){console.error(e, e.stack);}
        }
        item.lockMode = String(getItemLockMode(0, Number(lockMode))) as ItemLockMode;
        item.keepOnDeath = Boolean(keepOnDeath);
        item.amount = Number(amount);
        try {item.setCanDestroy(String(canDestroy).split(", "))} catch(e){console.error(e, e.stack);};*/ /*String[String(canDestroy)]*/ /*;
        try {item.setCanPlaceOn(String(canPlaceOn).split(", "))} catch(e){console.error(e, e.stack);};
        item.triggerEvent(String(triggerEvent));
        try{ durability.damage = Number(10); } catch(e){console.error(e, e.stack)}
        inventory.container.setItem(Number(slotNumber), item);
        try{ durability.damage = Number(10); } catch(e){console.error(e, e.stack)}
        if (Boolean(debug) == true) {
            console.warn("Form Values", r.formValues);
            console.warn(["Item Components: ", item.getComponents()]);
            console.warn(item.getTags());
            console.warn(players);
            console.warn(players[0]);
            console.warn(players[1]);*/ /*
        try {console.warn(item.getCanDestroy());} catch(e){
            console.error(e, e.stack)};
        try {console.warn(item.getCanPlaceOn());} catch(e){
            console.error(e, e.stack)};*/ /*
    console.warn(item.isStackable);
    console.warn(item.maxAmount);
    console.warn(item.type);
    console.warn(item.typeId);
    console.warn(item.nameTag);
    console.warn(item.getLore());
    try {console.warn(["Damage: ", durability.damage]);} catch(e){console.error(e, e.stack)};
    try {console.warn(["Damage Chance: ", durability.getDamageChance()]);} catch(e){console.error(e, e.stack)};
    try {console.warn(["Damage Range: ", durability.getDamageRange()]);} catch(e){console.error(e, e.stack)};
    try {console.warn(["Max Durability: ", durability.maxDurability]);} catch(e){console.error(e, e.stack)};
    let componentList = [item.getComponents()[0]!.typeId]
    for (const index in players) {
        if (Number(index) != 0) {
        componentList = String([String(componentList), item.getComponents()[index].typeId]).split(",");
        }
    }
    console.warn(String(["Item Components: " + String(componentList)]));
}

// Do something
}).catch(e => {
console.error(e, e.stack);
});
}).catch(e => {
console.error(e, e.stack);
});
})*/
        // ...
        // Output: [ <TextField Input>, <Dropdown Input>, <Slider Input>, <Toggle Input> ]
    }
    if (event.itemStack?.typeId === "andexdb:command_runner") {
        event.cancel = true;
        if (securityVariables.ultraSecurityModeEnabled) {
            if (securityVariables.testPlayerForPermission(event.source, "andexdb.canUseCommandRunnerStick") == false) {
                event.source.sendMessage("§cYou do not have permission to use a Command Runner. You need the following permission to use this item: andexdb.canUseCommandRunnerStick");
                return;
            }
        }
        system.run(() => {
            let form = new ModalFormData();
            form.title("Command Runner / Terminal");
            form.textField("Run Command", "Run Command");
            form.textField("Run Delay", "Run Delay");
            form.toggle("Debug", { defaultValue: false });
            form.show(event.source)
                .then((r) => {
                // This will stop the code when the player closes the form
                if (r.canceled)
                    return;
                // This will assign every input their own variable
                let [commandId, commandDelay, debug] = r.formValues; /*
            console.warn(r.formValues);*/
                system.runTimeout(() => {
                    console.warn(event.source.runCommand(String(commandId)).successCount);
                }, Number(commandDelay));
                // Do something
            })
                .catch((e) => {
                console.error(e, e.stack);
            });
        });
        // ...
        // Output: [ <TextField Input>, <Dropdown Input>, <Slider Input>, <Toggle Input> ]
    }
    if (event.itemStack?.typeId === "andexdb:script_runner") {
        event.cancel = true;
        if (securityVariables.ultraSecurityModeEnabled) {
            if (securityVariables.testPlayerForPermission(event.source, "andexdb.canUseScriptRunnerStick") == false) {
                event.source.sendMessage("§cYou do not have permission to use a Script Runner. You need the following permission to use this item: andexdb.canUseScriptRunnerStick");
                return;
            }
        }
        srun(() => scriptEvalRunWindow(event.source));
    }
    if (event.itemStack?.typeId === "andexdb:editor_stick") {
        event.cancel = true;
        if (securityVariables.ultraSecurityModeEnabled) {
            if (securityVariables.testPlayerForPermission(event.source, "andexdb.canUseEditorSticks") == false) {
                event.source.sendMessage("§cYou do not have permission to use an Editor Stick. You need the following permission to use this item: andexdb.canUseEditorSticks");
                return;
            }
        }
        try {
            system.clearRun(editorStickMenuOpeningAsyncCancelActionNumbers[event.source.id]);
            editorStickMenuOpeningAsyncCancelActionNumbers[event.source.id] = srun(() => editorStick(event.source));
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (event.itemStack?.typeId === "andexdb:editor_stick_b") {
        event.cancel = true;
        if (securityVariables.ultraSecurityModeEnabled) {
            if (securityVariables.testPlayerForPermission(event.source, "andexdb.canUseEditorSticks") == false) {
                event.source.sendMessage("§cYou do not have permission to use an Editor Stick B. You need the following permission to use this item: andexdb.canUseEditorSticks");
                return;
            }
        }
        try {
            system.clearRun(editorStickMenuOpeningAsyncCancelActionNumbers[event.source.id]);
            editorStickMenuOpeningAsyncCancelActionNumbers[event.source.id] = srun(() => editorStickB(event.source));
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (event.itemStack?.typeId === "andexdb:editor_stick_c") {
        event.cancel = true;
        if (securityVariables.ultraSecurityModeEnabled) {
            if (securityVariables.testPlayerForPermission(event.source, "andexdb.canUseEditorSticks") == false) {
                event.source.sendMessage("§cYou do not have permission to use an Editor StickC. You need the following permission to use this item: andexdb.canUseEditorSticks");
                return;
            }
        }
        try {
            system.clearRun(editorStickMenuOpeningAsyncCancelActionNumbers[event.source.id]);
            editorStickMenuOpeningAsyncCancelActionNumbers[event.source.id] = srun(() => editorStickC(event.source));
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (event.itemStack?.typeId === "andexdb:player_debug_stick") {
        event.cancel = true;
        if (securityVariables.ultraSecurityModeEnabled) {
            if (securityVariables.testPlayerForPermission(event.source, "andexdb.canUseEntityDebugSticks") == false) {
                event.source.sendMessage("§cYou do not have permission to use a Player Debug Stick. You need the following permission to use this item: andexdb.canUseEntityDebugSticks");
                return;
            }
        }
        try {
            srun(() => event.source.runCommand(String("/scriptevent andexdb:playerDebug saqw")));
        }
        catch (e) {
            // Do something
            console.error(e, e.stack);
        }
        // ...
        // Output: [ <TextField Input>, <Dropdown Input>, <Slider Input>, <Toggle Input> ]
    }
    if (event.itemStack?.typeId === "andexdb:player_controller") {
        event.cancel = true;
        if (securityVariables.ultraSecurityModeEnabled) {
            if (securityVariables.testPlayerForPermission(event.source, "andexdb.canUseEntityControllerItems") == false) {
                event.source.sendMessage("§cYou do not have permission to use a Player Controller. You need the following permission to use this item: andexdb.canUseEntityControllerItems");
                return;
            }
        }
        try {
            srun(() => event.source.runCommand(String("/scriptevent andexdb:playerController asdw")));
        }
        catch (e) {
            // Do something
            console.error(e, e.stack);
        }
        // ...
        // Output: [ <TextField Input>, <Dropdown Input>, <Slider Input>, <Toggle Input> ]
    }
    if (event.itemStack?.typeId === "andexdb:debug_screen") {
        event.cancel = true;
        if (securityVariables.ultraSecurityModeEnabled) {
            if (securityVariables.testPlayerForPermission(event.source, "andexdb.canUseEditorSticks") == false) {
                event.source.sendMessage("§cYou do not have permission to use a Debug Screen. You need the following permission to use this item: andexdb.canUseEditorSticks");
                return;
            }
        }
        try {
            srun(() => event.source.runCommand(String("/scriptevent andexdb:debugScreen sdaq")));
        }
        catch (e) {
            // Do something
            console.error(e, e.stack);
        }
        // ...
        // Output: [ <TextField Input>, <Dropdown Input>, <Slider Input>, <Toggle Input> ]
    }
    if (event.itemStack?.typeId === "andexdb:entity_controller") {
        event.cancel = true;
        if (securityVariables.ultraSecurityModeEnabled) {
            if (securityVariables.testPlayerForPermission(event.source, "andexdb.canUseEntityControllerItems") == false) {
                event.source.sendMessage("§cYou do not have permission to use an Entity Controller. You need the following permission to use this item: andexdb.canUseEntityControllerItems");
                return;
            }
        }
        try {
            srun(() => event.source.runCommand(String("/scriptevent andexdb:entityController nsaz")));
        }
        catch (e) {
            // Do something
            console.error(e, e.stack);
        }
        // ...
        // Output: [ <TextField Input>, <Dropdown Input>, <Slider Input>, <Toggle Input> ]
    }
    if (event.itemStack?.typeId === "andexdb:entity_debug_stick") {
        event.cancel = true;
        if (securityVariables.ultraSecurityModeEnabled) {
            if (securityVariables.testPlayerForPermission(event.source, "andexdb.canUseEntityDebugSticks") == false) {
                event.source.sendMessage("§cYou do not have permission to use a Entity Debug Stick. You need the following permission to use this item: andexdb.canUseEntityDebugSticks");
                return;
            }
        }
        try {
            srun(() => event.source.runCommand(String("/scriptevent andexdb:entityDebug saop")));
        }
        catch (e) {
            // Do something
            console.error(e, e.stack);
        }
        // ...
        // Output: [ <TextField Input>, <Dropdown Input>, <Slider Input>, <Toggle Input> ]
    }
    if (event.itemStack?.typeId === "andexdb:main_menu") {
        event.cancel = true;
        // Don't bother adding a permissions checker because it will check when opening the main menu.
        try {
            srun(() => mainMenu(event.source));
        }
        catch (e) {
            // Do something
            console.error(e, e.stack);
        }
        // ...
        // Output: [ <TextField Input>, <Dropdown Input>, <Slider Input>, <Toggle Input> ]
    }
    if (event.itemStack?.typeId === "andexdb:player_menu") {
        event.cancel = true;
        // Permissions check is not necessary because this menu is made for regular players to access it.
        try {
            srun(() => playerMenu(event.source));
        }
        catch (e) {
            // Do something
            console.error(e, e.stack);
        }
        // ...
        // Output: [ <TextField Input>, <Dropdown Input>, <Slider Input>, <Toggle Input> ]
    }
    if (event.itemStack?.typeId === "andexdb:selection_menu") {
        event.cancel = true;
        // Don't bother adding a permissions checker because it will check when opening the main menu.
        try {
            srun(() => mainMenu(event.source));
        }
        catch (e) {
            // Do something
            console.error(e, e.stack);
        }
        // ...
        // Output: [ <TextField Input>, <Dropdown Input>, <Slider Input>, <Toggle Input> ]
    }
    if (!!event.itemStack.getDynamicProperty("brushtype")) {
        if (securityVariables.ultraSecurityModeEnabled) {
            if (securityVariables.testPlayerForPermission(event.source, "andexdb.useWorldEdit") == false) {
                event.source.sendMessage("§cYou do not have permission to use WorldEdit Brushes. You need the following permission to use this item: andexdb.useWorldEdit");
                return;
            }
        }
        try {
            //console.warn("b")
            srun(async () => {
                try {
                    const selectMode = String(event.itemStack.getDynamicProperty("selectmode") ?? "");
                    switch (String(event.itemStack.getDynamicProperty("brushtype")).toLowerCase()) {
                        case "sphere":
                            {
                                const loc = event.source.getBlockFromViewDirection({
                                    includeLiquidBlocks: !selectMode.includes("noliquid"),
                                    includePassableBlocks: !selectMode.includes("nopassable"),
                                })?.block?.location;
                                const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 3))
                                    ? 3
                                    : Number(event.itemStack.getDynamicProperty("radius") ?? 3);
                                const blockpattern = new BlockPattern(JSON.parse(String(event.itemStack.getDynamicProperty("pattern"))), String(event.itemStack.getDynamicProperty("patterntype") ?? "random"));
                                const mask = event.itemStack.getDynamicProperty("mask") != undefined
                                    ? new BlockMask(JSON.parse(String(event.itemStack.getDynamicProperty("mask"))), String(event.itemStack.getDynamicProperty("masktype") ?? "include"))
                                    : undefined;
                                if (!!!loc) {
                                    event.source.sendMessage("§cError: You must be facing a block.");
                                }
                                else if (!!!event.itemStack.getDynamicProperty("pattern")) {
                                    event.source.sendMessage("§cError: Pattern for sphere generation is not defined on the item's dynamic properties.");
                                }
                                else {
                                    const pos = roundVector3ToMiddleOfBlock(loc);
                                    const blocktypes = BlockTypes.getAll();
                                    //console.warn("a")
                                    try {
                                        await fillSphere(pos, radius, event.source.dimension, (l, i) => {
                                            const b = blockpattern.generateBlock(i);
                                            return b.type == "random"
                                                ? BlockPermutation.resolve(blocktypes[Math.floor(blocktypes.length * Math.random())].id)
                                                : BlockPermutation.resolve(b.type, b.states);
                                        }, {
                                            blockMask: mask,
                                            minMSBetweenTickWaits: config.system.defaultMinMSBetweenTickWaits,
                                            replacemode: true,
                                            integrity: 100,
                                            liteMode: true,
                                        });
                                    }
                                    catch (e) {
                                        event.source.sendMessage("§c" + e + e.stack);
                                    }
                                }
                            }
                            break;
                        case "cube":
                            {
                                const loc = event.source.getBlockFromViewDirection({
                                    includeLiquidBlocks: !selectMode.includes("noliquid"),
                                    includePassableBlocks: !selectMode.includes("nopassable"),
                                })?.block?.location;
                                const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 3))
                                    ? 3
                                    : Number(event.itemStack.getDynamicProperty("radius") ?? 3);
                                const blockpattern = new BlockPattern(JSON.parse(String(event.itemStack.getDynamicProperty("pattern"))), String(event.itemStack.getDynamicProperty("patterntype") ?? "random"));
                                const mask = event.itemStack.getDynamicProperty("mask") != undefined
                                    ? new BlockMask(JSON.parse(String(event.itemStack.getDynamicProperty("mask"))), String(event.itemStack.getDynamicProperty("masktype") ?? "include"))
                                    : undefined;
                                if (!!!loc) {
                                    event.source.sendMessage("§cError: You must be facing a block.");
                                }
                                else if (!!!event.itemStack.getDynamicProperty("pattern")) {
                                    event.source.sendMessage("§cError: Pattern for sphere generation is not defined on the item's dynamic properties.");
                                }
                                else {
                                    const pos = roundVector3ToMiddleOfBlock(loc);
                                    const blocktypes = BlockTypes.getAll();
                                    //console.warn("a")
                                    try {
                                        await fillArea({
                                            x: pos.x - radius,
                                            y: pos.y - radius,
                                            z: pos.z - radius,
                                        }, {
                                            x: pos.x + radius,
                                            y: pos.y + radius,
                                            z: pos.z + radius,
                                        }, event.source.dimension, (l, i) => {
                                            const b = blockpattern.generateBlock(i);
                                            return b.type == "random"
                                                ? BlockPermutation.resolve(blocktypes[Math.floor(blocktypes.length * Math.random())].id)
                                                : BlockPermutation.resolve(b.type, b.states);
                                        }, {
                                            blockMask: mask,
                                            minMSBetweenTickWaits: config.system.defaultMinMSBetweenTickWaits,
                                            replacemode: true,
                                            integrity: 100,
                                            liteMode: true,
                                        });
                                    }
                                    catch (e) {
                                        event.source.sendMessage("§c" + e + e.stack);
                                    }
                                }
                            }
                            break;
                        case "square":
                            {
                                const loca = event.source.getBlockFromViewDirection({
                                    includeLiquidBlocks: !selectMode.includes("noliquid"),
                                    includePassableBlocks: !selectMode.includes("nopassable"),
                                });
                                const locb = dirmap(loca.face);
                                const loc = loca?.block?.location;
                                const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 3))
                                    ? 3
                                    : Number(event.itemStack.getDynamicProperty("radius") ?? 3);
                                const blockpattern = new BlockPattern(JSON.parse(String(event.itemStack.getDynamicProperty("pattern"))), String(event.itemStack.getDynamicProperty("patterntype") ?? "random"));
                                const mask = event.itemStack.getDynamicProperty("mask") != undefined
                                    ? new BlockMask(JSON.parse(String(event.itemStack.getDynamicProperty("mask"))), String(event.itemStack.getDynamicProperty("masktype") ?? "include"))
                                    : undefined;
                                if (!!!loc) {
                                    event.source.sendMessage("§cError: You must be facing a block.");
                                }
                                else if (!!!event.itemStack.getDynamicProperty("pattern")) {
                                    event.source.sendMessage("§cError: Pattern for sphere generation is not defined on the item's dynamic properties.");
                                }
                                else {
                                    const pos = roundVector3ToMiddleOfBlock(loc);
                                    const blocktypes = BlockTypes.getAll();
                                    //console.warn("a")
                                    try {
                                        await fillArea(Vector.add(pos, Vector.scale(diroffsetothersmap(loca.face), -radius)), Vector.add(pos, Vector.scale(diroffsetothersmap(loca.face), radius)), event.source.dimension, (l, i) => {
                                            const b = blockpattern.generateBlock(i);
                                            return b.type == "random"
                                                ? BlockPermutation.resolve(blocktypes[Math.floor(blocktypes.length * Math.random())].id)
                                                : BlockPermutation.resolve(b.type, b.states);
                                        }, {
                                            blockMask: mask,
                                            minMSBetweenTickWaits: config.system.defaultMinMSBetweenTickWaits,
                                            replacemode: true,
                                            integrity: 100,
                                            liteMode: true,
                                        });
                                    }
                                    catch (e) {
                                        event.source.sendMessage("§c" + e + e.stack);
                                    }
                                }
                            }
                            break;
                        case "splatter":
                            {
                                const loc = event.source.getBlockFromViewDirection({
                                    includeLiquidBlocks: !selectMode.includes("noliquid"),
                                    includePassableBlocks: !selectMode.includes("nopassable"),
                                })?.block?.location;
                                const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 3))
                                    ? 3
                                    : Number(event.itemStack.getDynamicProperty("radius") ?? 3);
                                const decay = isNaN(Number(event.itemStack.getDynamicProperty("decay") ?? 0))
                                    ? 0
                                    : Number(event.itemStack.getDynamicProperty("decay") ?? 0);
                                const blockpattern = new BlockPattern(JSON.parse(String(event.itemStack.getDynamicProperty("pattern"))), String(event.itemStack.getDynamicProperty("patterntype") ?? "random"));
                                const mask = event.itemStack.getDynamicProperty("mask") != undefined
                                    ? new BlockMask(JSON.parse(String(event.itemStack.getDynamicProperty("mask"))), String(event.itemStack.getDynamicProperty("masktype") ?? "include"))
                                    : undefined;
                                if (!!!loc) {
                                    event.source.sendMessage("§cError: You must be facing a block.");
                                }
                                else if (!!!event.itemStack.getDynamicProperty("pattern")) {
                                    event.source.sendMessage("§cError: Pattern for sphere generation is not defined on the item's dynamic properties.");
                                }
                                else {
                                    const pos = roundVector3ToMiddleOfBlock(loc);
                                    const blocktypes = BlockTypes.getAll();
                                    //console.warn("a")
                                    try {
                                        await fillSphere(pos, radius, event.source.dimension, (l, i) => {
                                            if (Math.max(0.0001, Math.random()) < (Vector.distance(pos, l) / radius) * (decay / 10) ||
                                                (tryget(() => l.dimension.getBlock(l)?.isAir) ?? true)) {
                                                return null;
                                            }
                                            const b = blockpattern.generateBlock(i);
                                            return b.type == "random"
                                                ? BlockPermutation.resolve(blocktypes[Math.floor(blocktypes.length * Math.random())].id)
                                                : BlockPermutation.resolve(b.type, b.states);
                                        }, {
                                            blockMask: mask,
                                            minMSBetweenTickWaits: config.system.defaultMinMSBetweenTickWaits,
                                            replacemode: true,
                                            integrity: 100,
                                            liteMode: true,
                                        });
                                    }
                                    catch (e) {
                                        event.source.sendMessage("§c" + e + e.stack);
                                    }
                                }
                            }
                            break;
                        case "splattercube":
                            {
                                const loc = event.source.getBlockFromViewDirection({
                                    includeLiquidBlocks: !selectMode.includes("noliquid"),
                                    includePassableBlocks: !selectMode.includes("nopassable"),
                                })?.block?.location;
                                const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 3))
                                    ? 3
                                    : Number(event.itemStack.getDynamicProperty("radius") ?? 3);
                                const decay = isNaN(Number(event.itemStack.getDynamicProperty("decay") ?? 0))
                                    ? 0
                                    : Number(event.itemStack.getDynamicProperty("decay") ?? 0);
                                const blockpattern = new BlockPattern(JSON.parse(String(event.itemStack.getDynamicProperty("pattern"))), String(event.itemStack.getDynamicProperty("patterntype") ?? "random"));
                                const mask = event.itemStack.getDynamicProperty("mask") != undefined
                                    ? new BlockMask(JSON.parse(String(event.itemStack.getDynamicProperty("mask"))), String(event.itemStack.getDynamicProperty("masktype") ?? "include"))
                                    : undefined;
                                if (!!!loc) {
                                    event.source.sendMessage("§cError: You must be facing a block.");
                                }
                                else if (!!!event.itemStack.getDynamicProperty("pattern")) {
                                    event.source.sendMessage("§cError: Pattern for sphere generation is not defined on the item's dynamic properties.");
                                }
                                else {
                                    const pos = roundVector3ToMiddleOfBlock(loc);
                                    const blocktypes = BlockTypes.getAll();
                                    //console.warn("a")
                                    try {
                                        await fillArea({
                                            x: pos.x - radius,
                                            y: pos.y - radius,
                                            z: pos.z - radius,
                                        }, {
                                            x: pos.x + radius,
                                            y: pos.y + radius,
                                            z: pos.z + radius,
                                        }, event.source.dimension, (l, i) => {
                                            if (Math.max(0.0001, Math.random()) < (Vector.distance(pos, l) / radius) * (decay / 10) ||
                                                (tryget(() => l.dimension.getBlock(l)?.isAir) ?? true)) {
                                                return null;
                                            }
                                            const b = blockpattern.generateBlock(i);
                                            return b.type == "random"
                                                ? BlockPermutation.resolve(blocktypes[Math.floor(blocktypes.length * Math.random())].id)
                                                : BlockPermutation.resolve(b.type, b.states);
                                        }, {
                                            blockMask: mask,
                                            minMSBetweenTickWaits: config.system.defaultMinMSBetweenTickWaits,
                                            replacemode: true,
                                            integrity: 100,
                                            liteMode: true,
                                        });
                                    }
                                    catch (e) {
                                        event.source.sendMessage("§c" + e + e.stack);
                                    }
                                }
                            }
                            break;
                        case "splattersquare":
                            {
                                const loca = event.source.getBlockFromViewDirection({
                                    includeLiquidBlocks: !selectMode.includes("noliquid"),
                                    includePassableBlocks: !selectMode.includes("nopassable"),
                                });
                                const locb = dirmap(loca.face);
                                const loc = loca?.block?.location;
                                const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 3))
                                    ? 3
                                    : Number(event.itemStack.getDynamicProperty("radius") ?? 3);
                                const decay = isNaN(Number(event.itemStack.getDynamicProperty("decay") ?? 0))
                                    ? 0
                                    : Number(event.itemStack.getDynamicProperty("decay") ?? 0);
                                const blockpattern = new BlockPattern(JSON.parse(String(event.itemStack.getDynamicProperty("pattern"))), String(event.itemStack.getDynamicProperty("patterntype") ?? "random"));
                                const mask = event.itemStack.getDynamicProperty("mask") != undefined
                                    ? new BlockMask(JSON.parse(String(event.itemStack.getDynamicProperty("mask"))), String(event.itemStack.getDynamicProperty("masktype") ?? "include"))
                                    : undefined;
                                if (!!!loc) {
                                    event.source.sendMessage("§cError: You must be facing a block.");
                                }
                                else if (!!!event.itemStack.getDynamicProperty("pattern")) {
                                    event.source.sendMessage("§cError: Pattern for sphere generation is not defined on the item's dynamic properties.");
                                }
                                else {
                                    const pos = roundVector3ToMiddleOfBlock(loc);
                                    const blocktypes = BlockTypes.getAll();
                                    //console.warn("a")
                                    try {
                                        await fillArea(Vector.add(pos, Vector.scale(diroffsetothersmap(loca.face), -radius)), Vector.add(pos, Vector.scale(diroffsetothersmap(loca.face), radius)), event.source.dimension, (l, i) => {
                                            if (Math.max(0.0001, Math.random()) < (Vector.distance(pos, l) / radius) * (decay / 10) ||
                                                (tryget(() => l.dimension.getBlock(l)?.isAir) ?? true)) {
                                                return null;
                                            }
                                            const b = blockpattern.generateBlock(i);
                                            return b.type == "random"
                                                ? BlockPermutation.resolve(blocktypes[Math.floor(blocktypes.length * Math.random())].id)
                                                : BlockPermutation.resolve(b.type, b.states);
                                        }, {
                                            blockMask: mask,
                                            minMSBetweenTickWaits: config.system.defaultMinMSBetweenTickWaits,
                                            replacemode: true,
                                            integrity: 100,
                                            liteMode: true,
                                        });
                                    }
                                    catch (e) {
                                        event.source.sendMessage("§c" + e + e.stack);
                                    }
                                }
                            }
                            break;
                        case "splattersurface":
                            {
                                const loca = event.source.getBlockFromViewDirection({
                                    includeLiquidBlocks: !selectMode.includes("noliquid"),
                                    includePassableBlocks: !selectMode.includes("nopassable"),
                                });
                                const locb = dirmap(loca.face);
                                const loc = loca?.block?.location;
                                const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 3))
                                    ? 3
                                    : Number(event.itemStack.getDynamicProperty("radius") ?? 3);
                                const decay = isNaN(Number(event.itemStack.getDynamicProperty("decay") ?? 0))
                                    ? 0
                                    : Number(event.itemStack.getDynamicProperty("decay") ?? 0);
                                const blockpattern = new BlockPattern(JSON.parse(String(event.itemStack.getDynamicProperty("pattern"))), String(event.itemStack.getDynamicProperty("patterntype") ?? "random"));
                                const mask = event.itemStack.getDynamicProperty("mask") != undefined
                                    ? new BlockMask(JSON.parse(String(event.itemStack.getDynamicProperty("mask"))), String(event.itemStack.getDynamicProperty("masktype") ?? "include"))
                                    : undefined;
                                if (!!!loc) {
                                    event.source.sendMessage("§cError: You must be facing a block.");
                                }
                                else if (!!!event.itemStack.getDynamicProperty("pattern")) {
                                    event.source.sendMessage("§cError: Pattern for sphere generation is not defined on the item's dynamic properties.");
                                }
                                else {
                                    const pos = roundVector3ToMiddleOfBlock(loc);
                                    const blocktypes = BlockTypes.getAll();
                                    //console.warn("a")
                                    try {
                                        await fillSphere(pos, radius, event.source.dimension, (l, i) => {
                                            if (Math.max(0.0001, Math.random()) < (Vector.distance(pos, l) / radius) * (decay / 10) ||
                                                (tryget(() => l.dimension.getBlock(l)?.isAir) ?? true) ||
                                                !(tryget(() => l.dimension.getBlock(l)?.[locb]()?.isAir) ?? true)) {
                                                return null;
                                            }
                                            const b = blockpattern.generateBlock(i);
                                            return b.type == "random"
                                                ? BlockPermutation.resolve(blocktypes[Math.floor(blocktypes.length * Math.random())].id)
                                                : BlockPermutation.resolve(b.type, b.states);
                                        }, {
                                            blockMask: mask,
                                            minMSBetweenTickWaits: config.system.defaultMinMSBetweenTickWaits,
                                            replacemode: true,
                                            integrity: 100,
                                            liteMode: true,
                                        });
                                    }
                                    catch (e) {
                                        event.source.sendMessage("§c" + e + e.stack);
                                    }
                                }
                            }
                            break;
                        case "overlaysurface":
                            {
                                const loca = event.source.getBlockFromViewDirection({
                                    includeLiquidBlocks: !selectMode.includes("noliquid"),
                                    includePassableBlocks: !selectMode.includes("nopassable"),
                                });
                                const locb = dirreversemap(dirmap(loca.face));
                                const loc = loca?.block?.location;
                                const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 3))
                                    ? 3
                                    : Number(event.itemStack.getDynamicProperty("radius") ?? 3);
                                const decay = isNaN(Number(event.itemStack.getDynamicProperty("decay") ?? 0))
                                    ? 0
                                    : Number(event.itemStack.getDynamicProperty("decay") ?? 0);
                                const blockpattern = new BlockPattern(JSON.parse(String(event.itemStack.getDynamicProperty("pattern"))), String(event.itemStack.getDynamicProperty("patterntype") ?? "random"));
                                const mask = event.itemStack.getDynamicProperty("mask") != undefined
                                    ? new BlockMask(JSON.parse(String(event.itemStack.getDynamicProperty("mask"))), String(event.itemStack.getDynamicProperty("masktype") ?? "include"))
                                    : undefined;
                                if (!!!loc) {
                                    event.source.sendMessage("§cError: You must be facing a block.");
                                }
                                else if (!!!event.itemStack.getDynamicProperty("pattern")) {
                                    event.source.sendMessage("§cError: Pattern for sphere generation is not defined on the item's dynamic properties.");
                                }
                                else {
                                    const pos = roundVector3ToMiddleOfBlock(loc);
                                    const blocktypes = BlockTypes.getAll();
                                    //console.warn("a")
                                    try {
                                        await fillSphere(pos, radius, event.source.dimension, (l, i) => {
                                            if (Math.max(0.0001, Math.random()) < (Vector.distance(pos, l) / radius) * (decay / 10) ||
                                                !(tryget(() => l.dimension.getBlock(l)?.isAir) ?? false) ||
                                                (tryget(() => l.dimension.getBlock(l)?.[locb]()?.isAir) ?? true)) {
                                                return null;
                                            }
                                            const b = blockpattern.generateBlock(i);
                                            return b.type == "random"
                                                ? BlockPermutation.resolve(blocktypes[Math.floor(blocktypes.length * Math.random())].id)
                                                : BlockPermutation.resolve(b.type, b.states);
                                        }, {
                                            blockMask: mask,
                                            minMSBetweenTickWaits: config.system.defaultMinMSBetweenTickWaits,
                                            replacemode: true,
                                            integrity: 100,
                                            liteMode: true,
                                        });
                                    }
                                    catch (e) {
                                        event.source.sendMessage("§c" + e + e.stack);
                                    }
                                }
                            }
                            break;
                        case "flatten":
                            {
                                const loca = event.source.getBlockFromViewDirection({
                                    includeLiquidBlocks: !selectMode.includes("noliquid"),
                                    includePassableBlocks: !selectMode.includes("nopassable"),
                                });
                                const locb = dirreversemap(dirmap(loca.face));
                                const loc = loca?.block?.location;
                                let flattenDirection = (event.itemStack.getDynamicProperty("flattendirection") ?? "up");
                                if (flattenDirection === "auto") {
                                    flattenDirection = locb === "above" ? "up" : locb === "below" ? "down" : locb;
                                }
                                else if (flattenDirection === "autor") {
                                    flattenDirection = locb === "above" ? "down" : locb === "below" ? "up" : dirreversemap(locb);
                                }
                                const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 3))
                                    ? 3
                                    : Number(event.itemStack.getDynamicProperty("radius") ?? 3);
                                const decay = isNaN(Number(event.itemStack.getDynamicProperty("decay") ?? 0))
                                    ? 0
                                    : Number(event.itemStack.getDynamicProperty("decay") ?? 0);
                                const mask = event.itemStack.getDynamicProperty("mask") != undefined
                                    ? new BlockMask(JSON.parse(String(event.itemStack.getDynamicProperty("mask"))), String(event.itemStack.getDynamicProperty("masktype") ?? "include"))
                                    : undefined;
                                if (!!!loc) {
                                    event.source.sendMessage("§cError: You must be facing a block.");
                                }
                                else {
                                    const pos = roundVector3ToMiddleOfBlock(loc);
                                    const structureID = `andexdb:WorldEdit_brush_${getSuperUniqueID()}`;
                                    try {
                                        /**
                                         * Whether or not to use reverse offset mode.
                                         *
                                         * @todo Make this work better, it is currently very buggy.
                                         */
                                        const useReverseOffset = Boolean(event.itemStack.getDynamicProperty("usereverseoffset") ?? false);
                                        /**
                                         * Whether or not to use whole mode.
                                         *
                                         * This makes the section that is moved extend to the edge of the selection on the side it is moving towards,
                                         * this results in the parts in the selection not being replaced and instead moved to replace the parts outside
                                         * of the selection instead.
                                         */
                                        const wholeMode = Boolean(event.itemStack.getDynamicProperty("wholemode") ?? false);
                                        let offsetDistance = useReverseOffset ? radius : -radius;
                                        const axis = flattenDirection === "up" || flattenDirection === "down"
                                            ? "y"
                                            : flattenDirection === "north" || flattenDirection === "south"
                                                ? "z"
                                                : "x";
                                        const sign = flattenDirection === "up" || flattenDirection === "north" || flattenDirection === "west" ? 1 : -1;
                                        for (let x = axis === "x" ? pos.x + sign * radius : pos.x - radius; axis === "x" && sign === 1 ? x >= pos.x - radius : x <= pos.x + radius; x -= axis === "x" ? sign : -1) {
                                            for (let y = axis === "y" ? pos.y + sign * radius : pos.y - radius; axis === "y" && sign === 1 ? y >= pos.y - radius : y <= pos.y + radius; y -= axis === "y" ? sign : -1) {
                                                if (y < event.source.dimension.heightRange.min || y >= event.source.dimension.heightRange.max)
                                                    continue;
                                                for (let z = axis === "z" ? pos.z + sign * radius : pos.z - radius; axis === "z" && sign === 1 ? z >= pos.z - radius : z <= pos.z + radius; z -= axis === "z" ? sign : -1) {
                                                    const distanceSquared = Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2) + Math.pow(z - pos.z, 2);
                                                    if (distanceSquared > Math.pow(radius, 2)) {
                                                        continue;
                                                    }
                                                    const currentDistance = { x, y, z }[axis] - pos[axis];
                                                    if (useReverseOffset
                                                        ? -sign * currentDistance > -sign * offsetDistance
                                                        : sign * currentDistance > sign * offsetDistance) {
                                                        const block = event.source.dimension.getBlock({ x, y, z });
                                                        if (!block)
                                                            continue;
                                                        if ((block.isSolid ||
                                                            (event.source.dimension.getBlock(Vector.clamp(Vector.add({ ...Vector.zero, [axis]: -sign }, { x, y, z }), {
                                                                min: { y: event.source.dimension.heightRange.min },
                                                                max: { y: event.source.dimension.heightRange.max - 1 },
                                                            }))?.isAir &&
                                                                !block.isAir)) &&
                                                            (mask ? mask.testIfMatches(block) : true)) {
                                                            offsetDistance = currentDistance;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        await fillSphere(pos, radius, event.source.dimension, (l) => {
                                            if (Math.max(0.0001, Math.random()) < (Vector.distance(pos, l) / radius) * (decay / 10) ||
                                                sign * (l[axis] - pos[axis]) !== sign * offsetDistance) {
                                                return null;
                                            }
                                            const block = event.source.dimension.getBlock(l);
                                            if (!block)
                                                return null;
                                            if (!(block.isSolid ||
                                                (event.source.dimension.getBlock(Vector.clamp(Vector.add({ ...Vector.zero, [axis]: -sign }, l), {
                                                    min: { y: event.source.dimension.heightRange.min },
                                                    max: { y: event.source.dimension.heightRange.max - 1 },
                                                }))?.isAir &&
                                                    !block.isAir)) ||
                                                !(mask ? mask.testIfMatches(block) : true)) {
                                                return null;
                                            }
                                            const structure = world.structureManager.createFromWorld(structureID, event.source.dimension, Vector.add(l, { [axis]: wholeMode ? -sign * radius - offsetDistance : 0 }), Vector.clamp(Vector.add(l, { [axis]: sign * Math.abs(radius + (pos[axis] - l[axis])) }), {
                                                min: { y: event.source.dimension.heightRange.min },
                                                max: { y: event.source.dimension.heightRange.max - 1 },
                                            }), {
                                                includeBlocks: true,
                                                includeEntities: false,
                                                saveMode: StructureSaveMode.Memory,
                                            });
                                            world.structureManager.place(structure, event.source.dimension, Vector.clamp(Vector.add({ ...Vector.zero, [axis]: wholeMode ? -sign * (radius + 1) - offsetDistance : -sign }, l), {
                                                min: { y: event.source.dimension.heightRange.min },
                                                max: { y: event.source.dimension.heightRange.max - 1 },
                                            }));
                                            world.structureManager.delete(structure);
                                            const blockToRemove = l.dimension.getBlock(Vector.clamp(Vector.add(l, { [axis]: sign * Math.abs(radius + (pos[axis] - l[axis])) }), {
                                                min: { y: event.source.dimension.heightRange.min },
                                                max: { y: event.source.dimension.heightRange.max - 1 },
                                            }));
                                            blockToRemove?.getComponent("inventory")?.container?.clearAll();
                                            blockToRemove?.setType("minecraft:air");
                                            return null;
                                        }, {
                                            blockMask: mask,
                                            minMSBetweenTickWaits: config.system.defaultMinMSBetweenTickWaits,
                                            replacemode: true,
                                            integrity: 100,
                                            liteMode: true,
                                        });
                                    }
                                    catch (e) {
                                        event.source.sendMessage("§c" + e + e.stack);
                                        try {
                                            world.structureManager.delete(structureID);
                                        }
                                        catch { }
                                    }
                                }
                            }
                            break;
                        case "flattensquare":
                            {
                                const loca = event.source.getBlockFromViewDirection({
                                    includeLiquidBlocks: !selectMode.includes("noliquid"),
                                    includePassableBlocks: !selectMode.includes("nopassable"),
                                });
                                const locb = dirreversemap(dirmap(loca.face));
                                const loc = loca?.block?.location;
                                let flattenDirection = (event.itemStack.getDynamicProperty("flattendirection") ?? "up");
                                if (flattenDirection === "auto") {
                                    flattenDirection = locb === "above" ? "up" : locb === "below" ? "down" : locb;
                                }
                                else if (flattenDirection === "autor") {
                                    flattenDirection = locb === "above" ? "down" : locb === "below" ? "up" : dirreversemap(locb);
                                }
                                const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 3))
                                    ? 3
                                    : Number(event.itemStack.getDynamicProperty("radius") ?? 3);
                                const decay = isNaN(Number(event.itemStack.getDynamicProperty("decay") ?? 0))
                                    ? 0
                                    : Number(event.itemStack.getDynamicProperty("decay") ?? 0);
                                const mask = event.itemStack.getDynamicProperty("mask") != undefined
                                    ? new BlockMask(JSON.parse(String(event.itemStack.getDynamicProperty("mask"))), String(event.itemStack.getDynamicProperty("masktype") ?? "include"))
                                    : undefined;
                                if (!!!loc) {
                                    event.source.sendMessage("§cError: You must be facing a block.");
                                }
                                else {
                                    const pos = roundVector3ToMiddleOfBlock(loc);
                                    const structureID = `andexdb:WorldEdit_brush_${getSuperUniqueID()}`;
                                    try {
                                        /**
                                         * Whether or not to use reverse offset mode.
                                         *
                                         * @todo Make this work better, it is currently very buggy.
                                         */
                                        const useReverseOffset = Boolean(event.itemStack.getDynamicProperty("usereverseoffset") ?? false);
                                        /**
                                         * Whether or not to use whole mode.
                                         *
                                         * This makes the section that is moved extend to the edge of the selection on the side it is moving towards,
                                         * this results in the parts in the selection not being replaced and instead moved to replace the parts outside
                                         * of the selection instead.
                                         */
                                        const wholeMode = Boolean(event.itemStack.getDynamicProperty("wholemode") ?? false);
                                        let offsetDistance = useReverseOffset ? radius : -radius;
                                        const axis = flattenDirection === "up" || flattenDirection === "down"
                                            ? "y"
                                            : flattenDirection === "north" || flattenDirection === "south"
                                                ? "z"
                                                : "x";
                                        const sign = flattenDirection === "up" || flattenDirection === "north" || flattenDirection === "west" ? 1 : -1;
                                        for (let x = axis === "x" ? pos.x + sign * radius : pos.x - radius; axis === "x" && sign === 1 ? x >= pos.x - radius : x <= pos.x + radius; x -= axis === "x" ? sign : -1) {
                                            for (let y = axis === "y" ? pos.y + sign * radius : pos.y - radius; axis === "y" && sign === 1 ? y >= pos.y - radius : y <= pos.y + radius; y -= axis === "y" ? sign : -1) {
                                                if (y < event.source.dimension.heightRange.min || y >= event.source.dimension.heightRange.max)
                                                    continue;
                                                for (let z = axis === "z" ? pos.z + sign * radius : pos.z - radius; axis === "z" && sign === 1 ? z >= pos.z - radius : z <= pos.z + radius; z -= axis === "z" ? sign : -1) {
                                                    const currentDistance = { x, y, z }[axis] - pos[axis];
                                                    if (useReverseOffset
                                                        ? sign * currentDistance < sign * offsetDistance
                                                        : sign * currentDistance > sign * offsetDistance) {
                                                        const block = event.source.dimension.getBlock({ x, y, z });
                                                        if (!block)
                                                            continue;
                                                        if ((block.isSolid ||
                                                            (event.source.dimension.getBlock(Vector.clamp(Vector.add({ ...Vector.zero, [axis]: -sign }, { x, y, z }), {
                                                                min: { y: event.source.dimension.heightRange.min },
                                                                max: { y: event.source.dimension.heightRange.max - 1 },
                                                            }))?.isAir &&
                                                                !block.isAir)) &&
                                                            (mask ? mask.testIfMatches(block) : true)) {
                                                            offsetDistance = currentDistance;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        await fillArea(Vector.clamp({
                                            x: pos.x - radius,
                                            y: pos.y - radius,
                                            z: pos.z - radius,
                                        }, {
                                            min: { y: event.source.dimension.heightRange.min },
                                            max: { y: event.source.dimension.heightRange.max - 1 },
                                        }), Vector.clamp({
                                            x: pos.x + radius,
                                            y: pos.y + radius,
                                            z: pos.z + radius,
                                        }, {
                                            min: { y: event.source.dimension.heightRange.min },
                                            max: { y: event.source.dimension.heightRange.max - 1 },
                                        }), event.source.dimension, (l) => {
                                            if (Math.max(0.0001, Math.random()) < (Vector.distance(pos, l) / radius) * (decay / 10) ||
                                                sign * (l[axis] - pos[axis]) !== sign * offsetDistance) {
                                                return null;
                                            }
                                            const block = event.source.dimension.getBlock(l);
                                            if (!block)
                                                return null;
                                            if (!(block.isSolid ||
                                                (event.source.dimension.getBlock(Vector.clamp(Vector.add({ ...Vector.zero, [axis]: -sign }, l), {
                                                    min: { y: event.source.dimension.heightRange.min },
                                                    max: { y: event.source.dimension.heightRange.max - 1 },
                                                }))?.isAir &&
                                                    !block.isAir)) ||
                                                !(mask ? mask.testIfMatches(block) : true)) {
                                                return null;
                                            }
                                            const structure = world.structureManager.createFromWorld(structureID, event.source.dimension, Vector.add(l, { [axis]: wholeMode ? -sign * radius - offsetDistance : 0 }), Vector.clamp(Vector.add(l, { [axis]: sign * Math.abs(radius + (pos[axis] - l[axis])) }), {
                                                min: { y: event.source.dimension.heightRange.min },
                                                max: { y: event.source.dimension.heightRange.max - 1 },
                                            }), {
                                                includeBlocks: true,
                                                includeEntities: false,
                                                saveMode: StructureSaveMode.Memory,
                                            });
                                            world.structureManager.place(structure, event.source.dimension, Vector.clamp(Vector.add({ ...Vector.zero, [axis]: wholeMode ? -sign * (radius + 1) - offsetDistance : -sign }, l), {
                                                min: { y: event.source.dimension.heightRange.min },
                                                max: { y: event.source.dimension.heightRange.max - 1 },
                                            }));
                                            world.structureManager.delete(structure);
                                            const blockToRemove = l.dimension.getBlock(Vector.clamp(Vector.add(l, { [axis]: sign * Math.abs(radius + (pos[axis] - l[axis])) }), {
                                                min: { y: event.source.dimension.heightRange.min },
                                                max: { y: event.source.dimension.heightRange.max - 1 },
                                            }));
                                            blockToRemove?.getComponent("inventory")?.container?.clearAll();
                                            blockToRemove?.setType("minecraft:air");
                                            return null;
                                        }, {
                                            blockMask: mask,
                                            minMSBetweenTickWaits: config.system.defaultMinMSBetweenTickWaits,
                                            replacemode: true,
                                            integrity: 100,
                                            liteMode: true,
                                        });
                                    }
                                    catch (e) {
                                        event.source.sendMessage("§c" + e + e.stack);
                                        try {
                                            world.structureManager.delete(structureID);
                                        }
                                        catch { }
                                    }
                                }
                            }
                            break;
                        case "flattenfill":
                            {
                                const loca = event.source.getBlockFromViewDirection({
                                    includeLiquidBlocks: !selectMode.includes("noliquid"),
                                    includePassableBlocks: !selectMode.includes("nopassable"),
                                });
                                const locb = dirreversemap(dirmap(loca.face));
                                const loc = loca?.block?.location;
                                let flattenDirection = (event.itemStack.getDynamicProperty("flattendirection") ?? "up");
                                if (flattenDirection === "auto") {
                                    flattenDirection = locb === "above" ? "up" : locb === "below" ? "down" : locb;
                                }
                                else if (flattenDirection === "autor") {
                                    flattenDirection = locb === "above" ? "down" : locb === "below" ? "up" : dirreversemap(locb);
                                }
                                const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 3))
                                    ? 3
                                    : Number(event.itemStack.getDynamicProperty("radius") ?? 3);
                                const decay = isNaN(Number(event.itemStack.getDynamicProperty("decay") ?? 0))
                                    ? 0
                                    : Number(event.itemStack.getDynamicProperty("decay") ?? 0);
                                const blockpattern = new BlockPattern(JSON.parse(String(event.itemStack.getDynamicProperty("pattern"))), String(event.itemStack.getDynamicProperty("patterntype") ?? "random"));
                                const mask = event.itemStack.getDynamicProperty("mask") != undefined
                                    ? new BlockMask(JSON.parse(String(event.itemStack.getDynamicProperty("mask"))), String(event.itemStack.getDynamicProperty("masktype") ?? "include"))
                                    : undefined;
                                if (!!!loc) {
                                    event.source.sendMessage("§cError: You must be facing a block.");
                                }
                                else if (!!!event.itemStack.getDynamicProperty("pattern")) {
                                    event.source.sendMessage("§cError: Pattern for sphere generation is not defined on the item's dynamic properties.");
                                }
                                else {
                                    const pos = roundVector3ToMiddleOfBlock(loc);
                                    const blocktypes = BlockTypes.getAll();
                                    //console.warn("a")
                                    try {
                                        /**
                                         * Whether or not to use reverse offset mode.
                                         *
                                         * @todo Make this work better, it is currently very buggy.
                                         */
                                        const useReverseOffset = Boolean(event.itemStack.getDynamicProperty("usereverseoffset") ?? false);
                                        let offsetDistance = useReverseOffset ? radius : -radius;
                                        const axis = flattenDirection === "up" || flattenDirection === "down"
                                            ? "y"
                                            : flattenDirection === "north" || flattenDirection === "south"
                                                ? "z"
                                                : "x";
                                        const sign = flattenDirection === "up" || flattenDirection === "north" || flattenDirection === "west" ? 1 : -1;
                                        for (let x = axis === "x" ? pos.x + sign * radius : pos.x - radius; axis === "x" && sign === 1 ? x >= pos.x - radius : x <= pos.x + radius; x -= axis === "x" ? sign : -1) {
                                            for (let y = axis === "y" ? pos.y + sign * radius : pos.y - radius; axis === "y" && sign === 1 ? y >= pos.y - radius : y <= pos.y + radius; y -= axis === "y" ? sign : -1) {
                                                if (y < event.source.dimension.heightRange.min || y >= event.source.dimension.heightRange.max)
                                                    continue;
                                                for (let z = axis === "z" ? pos.z + sign * radius : pos.z - radius; axis === "z" && sign === 1 ? z >= pos.z - radius : z <= pos.z + radius; z -= axis === "z" ? sign : -1) {
                                                    const distanceSquared = Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2) + Math.pow(z - pos.z, 2);
                                                    if (distanceSquared > Math.pow(radius, 2)) {
                                                        continue;
                                                    }
                                                    const currentDistance = { x, y, z }[axis] - pos[axis];
                                                    if (useReverseOffset
                                                        ? sign * currentDistance < sign * offsetDistance
                                                        : sign * currentDistance > sign * offsetDistance) {
                                                        const block = event.source.dimension.getBlock({ x, y, z });
                                                        if (!block)
                                                            continue;
                                                        if (!block.isAir && (mask ? mask.testIfMatches(block) : true)) {
                                                            offsetDistance = currentDistance;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        await fillSphere(pos, radius, event.source.dimension, (l, i) => {
                                            if (Math.max(0.0001, Math.random()) < (Vector.distance(pos, l) / radius) * (decay / 10) ||
                                                sign * (l[axis] - pos[axis]) !== sign * offsetDistance) {
                                                return null;
                                            }
                                            const block = event.source.dimension.getBlock(l);
                                            if (!block)
                                                return null;
                                            if (block.isAir || !(mask ? mask.testIfMatches(block) : true)) {
                                                return null;
                                            }
                                            const b = blockpattern.generateBlock(i);
                                            return b.type == "random"
                                                ? BlockPermutation.resolve(blocktypes[Math.floor(blocktypes.length * Math.random())].id)
                                                : BlockPermutation.resolve(b.type, b.states);
                                        }, {
                                            blockMask: mask,
                                            minMSBetweenTickWaits: config.system.defaultMinMSBetweenTickWaits,
                                            replacemode: true,
                                            integrity: 100,
                                            liteMode: true,
                                        });
                                    }
                                    catch (e) {
                                        event.source.sendMessage("§c" + e + e.stack);
                                    }
                                }
                            }
                            break;
                        case "flattensquarefill":
                            {
                                const loca = event.source.getBlockFromViewDirection({
                                    includeLiquidBlocks: !selectMode.includes("noliquid"),
                                    includePassableBlocks: !selectMode.includes("nopassable"),
                                });
                                const locb = dirreversemap(dirmap(loca.face));
                                const loc = loca?.block?.location;
                                let flattenDirection = (event.itemStack.getDynamicProperty("flattendirection") ?? "up");
                                if (flattenDirection === "auto") {
                                    flattenDirection = locb === "above" ? "up" : locb === "below" ? "down" : locb;
                                }
                                else if (flattenDirection === "autor") {
                                    flattenDirection = locb === "above" ? "down" : locb === "below" ? "up" : dirreversemap(locb);
                                }
                                const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 3))
                                    ? 3
                                    : Number(event.itemStack.getDynamicProperty("radius") ?? 3);
                                const decay = isNaN(Number(event.itemStack.getDynamicProperty("decay") ?? 0))
                                    ? 0
                                    : Number(event.itemStack.getDynamicProperty("decay") ?? 0);
                                const blockpattern = new BlockPattern(JSON.parse(String(event.itemStack.getDynamicProperty("pattern"))), String(event.itemStack.getDynamicProperty("patterntype") ?? "random"));
                                const mask = event.itemStack.getDynamicProperty("mask") != undefined
                                    ? new BlockMask(JSON.parse(String(event.itemStack.getDynamicProperty("mask"))), String(event.itemStack.getDynamicProperty("masktype") ?? "include"))
                                    : undefined;
                                if (!!!loc) {
                                    event.source.sendMessage("§cError: You must be facing a block.");
                                }
                                else if (!!!event.itemStack.getDynamicProperty("pattern")) {
                                    event.source.sendMessage("§cError: Pattern for sphere generation is not defined on the item's dynamic properties.");
                                }
                                else {
                                    const pos = roundVector3ToMiddleOfBlock(loc);
                                    const blocktypes = BlockTypes.getAll();
                                    //console.warn("a")
                                    try {
                                        /**
                                         * Whether or not to use reverse offset mode.
                                         *
                                         * @todo Make this work better, it is currently very buggy.
                                         */
                                        const useReverseOffset = Boolean(event.itemStack.getDynamicProperty("usereverseoffset") ?? false);
                                        let offsetDistance = useReverseOffset ? radius : -radius;
                                        const axis = flattenDirection === "up" || flattenDirection === "down"
                                            ? "y"
                                            : flattenDirection === "north" || flattenDirection === "south"
                                                ? "z"
                                                : "x";
                                        const sign = flattenDirection === "up" || flattenDirection === "north" || flattenDirection === "west" ? 1 : -1;
                                        for (let x = axis === "x" ? pos.x + sign * radius : pos.x - radius; axis === "x" && sign === 1 ? x >= pos.x - radius : x <= pos.x + radius; x -= axis === "x" ? sign : -1) {
                                            for (let y = axis === "y" ? pos.y + sign * radius : pos.y - radius; axis === "y" && sign === 1 ? y >= pos.y - radius : y <= pos.y + radius; y -= axis === "y" ? sign : -1) {
                                                if (y < event.source.dimension.heightRange.min || y >= event.source.dimension.heightRange.max)
                                                    continue;
                                                for (let z = axis === "z" ? pos.z + sign * radius : pos.z - radius; axis === "z" && sign === 1 ? z >= pos.z - radius : z <= pos.z + radius; z -= axis === "z" ? sign : -1) {
                                                    const currentDistance = { x, y, z }[axis] - pos[axis];
                                                    if (useReverseOffset
                                                        ? sign * currentDistance < sign * offsetDistance
                                                        : sign * currentDistance > sign * offsetDistance) {
                                                        const block = event.source.dimension.getBlock({ x, y, z });
                                                        if (!block)
                                                            continue;
                                                        if (!block.isAir && (mask ? mask.testIfMatches(block) : true)) {
                                                            offsetDistance = currentDistance;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        await fillArea({
                                            x: pos.x - radius,
                                            y: pos.y - radius,
                                            z: pos.z - radius,
                                        }, {
                                            x: pos.x + radius,
                                            y: pos.y + radius,
                                            z: pos.z + radius,
                                        }, event.source.dimension, (l, i) => {
                                            if (Math.max(0.0001, Math.random()) < (Vector.distance(pos, l) / radius) * (decay / 10) ||
                                                sign * (l[axis] - pos[axis]) !== sign * offsetDistance) {
                                                return null;
                                            }
                                            const block = event.source.dimension.getBlock(l);
                                            if (!block)
                                                return null;
                                            if (block.isAir || !(mask ? mask.testIfMatches(block) : true)) {
                                                return null;
                                            }
                                            const b = blockpattern.generateBlock(i);
                                            return b.type == "random"
                                                ? BlockPermutation.resolve(blocktypes[Math.floor(blocktypes.length * Math.random())].id)
                                                : BlockPermutation.resolve(b.type, b.states);
                                        }, {
                                            blockMask: mask,
                                            minMSBetweenTickWaits: config.system.defaultMinMSBetweenTickWaits,
                                            replacemode: true,
                                            integrity: 100,
                                            liteMode: true,
                                        });
                                    }
                                    catch (e) {
                                        event.source.sendMessage("§c" + e + e.stack);
                                    }
                                }
                            }
                            break;
                        case "nudge":
                            {
                                const loca = event.source.getBlockFromViewDirection({
                                    includeLiquidBlocks: !selectMode.includes("noliquid"),
                                    includePassableBlocks: !selectMode.includes("nopassable"),
                                });
                                const locb = dirreversemap(dirmap(loca.face));
                                const loc = loca?.block?.location;
                                let nudgeDirection = (event.itemStack.getDynamicProperty("nudgedirection") ?? "up");
                                if (nudgeDirection === "auto") {
                                    nudgeDirection = locb === "above" ? "up" : locb === "below" ? "down" : dirreversemap(locb);
                                }
                                else if (nudgeDirection === "autor") {
                                    nudgeDirection = locb === "above" ? "down" : locb === "below" ? "up" : locb;
                                }
                                const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 3))
                                    ? 3
                                    : Number(event.itemStack.getDynamicProperty("radius") ?? 3);
                                const decay = isNaN(Number(event.itemStack.getDynamicProperty("decay") ?? 0))
                                    ? 0
                                    : Number(event.itemStack.getDynamicProperty("decay") ?? 0);
                                const mask = event.itemStack.getDynamicProperty("mask") != undefined
                                    ? new BlockMask(JSON.parse(String(event.itemStack.getDynamicProperty("mask"))), String(event.itemStack.getDynamicProperty("masktype") ?? "include"))
                                    : undefined;
                                /**
                                 * The shape of the area to nudge.
                                 */
                                const shape = (event.itemStack.getDynamicProperty("shape") ?? "sphere");
                                /**
                                 * Whether or not to not erase the blocks left behind after copying the area over one block.
                                 */
                                const trailMode = Boolean(event.itemStack.getDynamicProperty("trailmode") ?? false);
                                if (!!!loc) {
                                    event.source.sendMessage("§cError: You must be facing a block.");
                                }
                                else {
                                    const pos = roundVector3ToMiddleOfBlock(loc);
                                    const structureID = `andexdb:WorldEdit_brush_${getSuperUniqueID()}`;
                                    try {
                                        const axis = nudgeDirection === "up" || nudgeDirection === "down"
                                            ? "y"
                                            : nudgeDirection === "north" || nudgeDirection === "south"
                                                ? "z"
                                                : "x";
                                        const sign = nudgeDirection === "up" || nudgeDirection === "north" || nudgeDirection === "west" ? 1 : -1;
                                        let msSinceLastTickWait = Date.now();
                                        const minMSBetweenTickWaits = config.system.defaultMinMSBetweenTickWaits;
                                        for (let x = axis === "x" ? pos.x + sign * radius : pos.x - radius; axis === "x" && sign === 1 ? x >= pos.x - radius : x <= pos.x + radius; x -= axis === "x" ? sign : -1) {
                                            for (let y = axis === "y" ? pos.y + sign * radius : pos.y - radius; axis === "y" && sign === 1 ? y >= pos.y - radius : y <= pos.y + radius; y -= axis === "y" ? sign : -1) {
                                                if (y < event.source.dimension.heightRange.min || y >= event.source.dimension.heightRange.max)
                                                    continue;
                                                for (let z = axis === "z" ? pos.z + sign * radius : pos.z - radius; axis === "z" && sign === 1 ? z >= pos.z - radius : z <= pos.z + radius; z -= axis === "z" ? sign : -1) {
                                                    if (shape === "sphere") {
                                                        const distanceSquared = Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2) + Math.pow(z - pos.z, 2);
                                                        if (distanceSquared > Math.pow(radius, 2)) {
                                                            continue;
                                                        }
                                                    }
                                                    if (Math.max(0.0001, Math.random()) < (Vector.distance(pos, { x, y, z }) / radius) * (decay / 10)) {
                                                        continue;
                                                    }
                                                    const block = event.source.dimension.getBlock({ x, y, z });
                                                    if (!block)
                                                        continue;
                                                    if (!(mask ? mask.testIfMatches(block) : true)) {
                                                        continue;
                                                    }
                                                    const structure = world.structureManager.createFromWorld(structureID, event.source.dimension, { x, y, z }, { x, y, z }, {
                                                        includeBlocks: true,
                                                        includeEntities: false,
                                                        saveMode: StructureSaveMode.Memory,
                                                    });
                                                    if (trailMode) {
                                                        for (let x = 0; x < structure.size.x; x++) {
                                                            for (let y = 0; y < structure.size.y; y++) {
                                                                for (let z = 0; z < structure.size.z; z++) {
                                                                    if (structure.getBlockPermutation({ x, y, z })?.type.id === "minecraft:air") {
                                                                        structure.setBlockPermutation({ x, y, z });
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    Array.from(removeAirFromStructure(structure));
                                                    world.structureManager.place(structure, event.source.dimension, Vector.clamp(Vector.add({ x, y, z }, { [axis]: sign }), {
                                                        min: { y: event.source.dimension.heightRange.min },
                                                        max: { y: event.source.dimension.heightRange.max - 1 },
                                                    }));
                                                    world.structureManager.delete(structure);
                                                    if (!trailMode) {
                                                        block.getComponent("inventory")?.container?.clearAll();
                                                        block.setType("minecraft:air");
                                                    }
                                                    if (Date.now() - msSinceLastTickWait >= minMSBetweenTickWaits) {
                                                        await waitTick();
                                                        msSinceLastTickWait = Date.now();
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    catch (e) {
                                        event.source.sendMessage("§c" + e + e.stack);
                                        try {
                                            world.structureManager.delete(structureID);
                                        }
                                        catch { }
                                    }
                                }
                            }
                            break;
                        case "copy":
                            {
                                const loca = event.source.getBlockFromViewDirection({
                                    includeLiquidBlocks: !selectMode.includes("noliquid"),
                                    includePassableBlocks: !selectMode.includes("nopassable"),
                                });
                                const locb = dirreversemap(dirmap(loca.face));
                                const loc = loca?.block?.location;
                                const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 3))
                                    ? 3
                                    : Number(event.itemStack.getDynamicProperty("radius") ?? 3);
                                const decay = isNaN(Number(event.itemStack.getDynamicProperty("decay") ?? 0))
                                    ? 0
                                    : Number(event.itemStack.getDynamicProperty("decay") ?? 0);
                                const mask = event.itemStack.getDynamicProperty("mask") != undefined
                                    ? new BlockMask(JSON.parse(String(event.itemStack.getDynamicProperty("mask"))), String(event.itemStack.getDynamicProperty("masktype") ?? "include"))
                                    : undefined;
                                const clipboardID = (event.itemStack.getDynamicProperty("clipboardID") ??
                                    `player_WorldEdit_brush_${event.source.id}`);
                                /**
                                 * The shape of the area to copy.
                                 */
                                const shape = (event.itemStack.getDynamicProperty("shape") ?? "sphere");
                                /**
                                 * Whether or not to copy air.
                                 */
                                const copyAir = Boolean(event.itemStack.getDynamicProperty("copyair") ?? false);
                                if (!!!loc) {
                                    event.source.sendMessage("§cError: You must be facing a block.");
                                }
                                else {
                                    const pos = roundVector3ToMiddleOfBlock(loc);
                                    try {
                                        let msSinceLastTickWait = Date.now();
                                        const minMSBetweenTickWaits = config.system.defaultMinMSBetweenTickWaits;
                                        const clipboard = !clipboardID || clipboardID === "global" ? BlockClipboard.global : BlockClipboard.getClipboard(clipboardID);
                                        clipboard.clear();
                                        clipboard.copy(event.source.dimension, {
                                            from: Vector.clamp({ x: pos.x - radius, y: pos.y - radius, z: pos.z - radius }, {
                                                min: { y: event.source.dimension.heightRange.min },
                                                max: { y: event.source.dimension.heightRange.max - 1 },
                                            }),
                                            to: Vector.clamp({ x: pos.x + radius, y: pos.y + radius, z: pos.z + radius }, {
                                                min: { y: event.source.dimension.heightRange.min },
                                                max: { y: event.source.dimension.heightRange.max - 1 },
                                            }),
                                        });
                                        const size = clipboard.contentsSize;
                                        const sizeLimits = clipboard.contentsSizeLimits;
                                        for (let xI = 0; xI < Math.ceil(sizeLimits.x / size.x) * sizeLimits.x; xI++) {
                                            for (let yI = 0; yI < Math.ceil(sizeLimits.y / size.y) * sizeLimits.y; yI++) {
                                                for (let zI = 0; zI < Math.ceil(sizeLimits.z / size.z) * sizeLimits.z; zI++) {
                                                    const structure = clipboard.getStructureAtIndices({
                                                        x: xI,
                                                        y: yI,
                                                        z: zI,
                                                    });
                                                    if (!structure) {
                                                        if (Date.now() - msSinceLastTickWait >= minMSBetweenTickWaits) {
                                                            await waitTick();
                                                            msSinceLastTickWait = Date.now();
                                                        }
                                                        continue;
                                                    }
                                                    for (let x = 0; x < structure.size.x; x++) {
                                                        for (let y = 0; y < structure.size.y; y++) {
                                                            for (let z = 0; z < structure.size.z; z++) {
                                                                if (shape === "sphere") {
                                                                    const distanceSquared = Math.pow(xI * size.x + x - size.x / 2, 2) +
                                                                        Math.pow(yI * size.y + y - size.y / 2, 2) +
                                                                        Math.pow(zI * size.z + z - size.z / 2, 2);
                                                                    if (distanceSquared <= Math.pow(radius, 2) &&
                                                                        Math.max(0.0001, Math.random()) >=
                                                                            (Vector.distance({ x: size.x / 2, y: size.y / 2, z: size.z / 2 }, { x: xI * size.x + x, y: yI * size.y + y, z: zI * size.z + z }) /
                                                                                radius) *
                                                                                (decay / 10) &&
                                                                        (mask ? mask.testIfMatches(structure.getBlockPermutation({ x, y, z })) : true) &&
                                                                        (copyAir || structure.getBlockPermutation({ x, y, z })?.type.id !== "minecraft:air")) {
                                                                        continue;
                                                                    }
                                                                }
                                                                else {
                                                                    if (Math.max(0.0001, Math.random()) >=
                                                                        (Vector.distance({ x: size.x / 2, y: size.y / 2, z: size.z / 2 }, { x: xI * size.x + x, y: yI * size.y + y, z: zI * size.z + z }) /
                                                                            radius) *
                                                                            (decay / 10) &&
                                                                        (mask ? mask.testIfMatches(structure.getBlockPermutation({ x, y, z })) : true) &&
                                                                        (copyAir || structure.getBlockPermutation({ x, y, z })?.type.id !== "minecraft:air")) {
                                                                        continue;
                                                                    }
                                                                }
                                                                structure.setBlockPermutation({ x, y, z });
                                                                if (Date.now() - msSinceLastTickWait >= minMSBetweenTickWaits) {
                                                                    await waitTick();
                                                                    msSinceLastTickWait = Date.now();
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    catch (e) {
                                        event.source.sendMessage("§c" + e + e.stack);
                                    }
                                }
                            }
                            break;
                        case "paste":
                            {
                                const loca = event.source.getBlockFromViewDirection({
                                    includeLiquidBlocks: !selectMode.includes("noliquid"),
                                    includePassableBlocks: !selectMode.includes("nopassable"),
                                }); /*
                                const locb = dirreversemap(dirmap(loca.face)); */
                                const loc = loca?.block?.location; /*
                                const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 3))
                                    ? 3
                                    : Number(event.itemStack.getDynamicProperty("radius") ?? 3);
                                const decay = isNaN(Number(event.itemStack.getDynamicProperty("decay") ?? 0))
                                    ? 0
                                    : Number(event.itemStack.getDynamicProperty("decay") ?? 0);
                                const mask =
                                    event.itemStack.getDynamicProperty("mask") != undefined
                                        ? new BlockMask(
                                              JSON.parse(String(event.itemStack.getDynamicProperty("mask"))),
                                              String(event.itemStack.getDynamicProperty("masktype") ?? "include") as typeof BlockMask.prototype.type
                                          )
                                        : undefined; */
                                const clipboardID = (event.itemStack.getDynamicProperty("clipboardID") ??
                                    `player_WorldEdit_brush_${event.source.id}`);
                                if (!!!loc) {
                                    event.source.sendMessage("§cError: You must be facing a block.");
                                }
                                else {
                                    const pos = roundVector3ToMiddleOfBlock(loc);
                                    try {
                                        const clipboard = !clipboardID || clipboardID === "global" ? BlockClipboard.global : BlockClipboard.getClipboard(clipboardID);
                                        clipboard.paste({
                                            ...Vector.subtract(pos, Vector.scale(clipboard.contentsSize, 0.5)),
                                            dimension: event.source.dimension,
                                        });
                                    }
                                    catch (e) {
                                        event.source.sendMessage("§c" + e + e.stack);
                                    }
                                }
                            }
                            break;
                        case "brokennudge":
                            {
                                const loca = event.source.getBlockFromViewDirection({
                                    includeLiquidBlocks: !selectMode.includes("noliquid"),
                                    includePassableBlocks: !selectMode.includes("nopassable"),
                                });
                                const locb = dirreversemap(dirmap(loca.face));
                                const loc = loca?.block?.location;
                                let nudgeDirection = (event.itemStack.getDynamicProperty("nudgedirection") ?? "up");
                                if (nudgeDirection === "auto") {
                                    nudgeDirection = locb === "above" ? "up" : locb === "below" ? "down" : locb;
                                }
                                else if (nudgeDirection === "autor") {
                                    nudgeDirection = locb === "above" ? "down" : locb === "below" ? "up" : dirreversemap(locb);
                                }
                                const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 3))
                                    ? 3
                                    : Number(event.itemStack.getDynamicProperty("radius") ?? 3);
                                const decay = isNaN(Number(event.itemStack.getDynamicProperty("decay") ?? 0))
                                    ? 0
                                    : Number(event.itemStack.getDynamicProperty("decay") ?? 0);
                                const mask = event.itemStack.getDynamicProperty("mask") != undefined
                                    ? new BlockMask(JSON.parse(String(event.itemStack.getDynamicProperty("mask"))), String(event.itemStack.getDynamicProperty("masktype") ?? "include"))
                                    : undefined;
                                if (!!!loc) {
                                    event.source.sendMessage("§cError: You must be facing a block.");
                                }
                                else {
                                    const pos = roundVector3ToMiddleOfBlock(loc);
                                    const structureID = `andexdb:WorldEdit_brush_${getSuperUniqueID()}`;
                                    try {
                                        const axis = nudgeDirection === "up" || nudgeDirection === "down"
                                            ? "y"
                                            : nudgeDirection === "north" || nudgeDirection === "south"
                                                ? "z"
                                                : "x";
                                        const sign = nudgeDirection === "up" || nudgeDirection === "north" || nudgeDirection === "west" ? 1 : -1;
                                        let msSinceLastTickWait = Date.now();
                                        const minMSBetweenTickWaits = config.system.defaultMinMSBetweenTickWaits;
                                        for (let x = axis === "x" ? pos.x + sign * radius : pos.x - radius; axis === "x" && sign === 1 ? x >= pos.x - radius : x <= pos.x + radius; x -= axis === "x" ? sign : -1) {
                                            for (let y = axis === "y" ? pos.y + sign * radius : pos.y - radius; axis === "y" && sign === 1 ? y >= pos.y - radius : y <= pos.y + radius; y -= axis === "y" ? sign : -1) {
                                                if (y < event.source.dimension.heightRange.min || y >= event.source.dimension.heightRange.max)
                                                    continue;
                                                for (let z = axis === "z" ? pos.z + sign * radius : pos.z - radius; axis === "z" && sign === 1 ? z >= pos.z - radius : z <= pos.z + radius; z -= axis === "z" ? sign : -1) {
                                                    const distanceSquared = Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2) + Math.pow(z - pos.z, 2);
                                                    if (distanceSquared > Math.pow(radius, 2)) {
                                                        continue;
                                                    }
                                                    if (Math.max(0.0001, Math.random()) < (Vector.distance(pos, { x, y, z }) / radius) * (decay / 10)) {
                                                        continue;
                                                    }
                                                    const block = event.source.dimension.getBlock({ x, y, z });
                                                    if (!block)
                                                        continue;
                                                    if (!(mask ? mask.testIfMatches(block) : true)) {
                                                        continue;
                                                    }
                                                    const structure = world.structureManager.createFromWorld(structureID, event.source.dimension, { x, y, z }, { x, y, z }, {
                                                        includeBlocks: true,
                                                        includeEntities: false,
                                                        saveMode: StructureSaveMode.Memory,
                                                    });
                                                    world.structureManager.place(structure, event.source.dimension, Vector.clamp(Vector.add({ x, y, z }, { [axis]: -sign }), {
                                                        min: { y: event.source.dimension.heightRange.min },
                                                        max: { y: event.source.dimension.heightRange.max - 1 },
                                                    }));
                                                    world.structureManager.delete(structure);
                                                    if (Math.pow((axis === "x" ? x + sign : x) - pos.x, 2) +
                                                        Math.pow((axis === "y" ? y + sign : y) - pos.y, 2) +
                                                        Math.pow((axis === "z" ? z + sign : z) - pos.z, 2) >
                                                        Math.pow(radius, 2)) {
                                                        block.setType("minecraft:air");
                                                    }
                                                    if (Date.now() - msSinceLastTickWait >= minMSBetweenTickWaits) {
                                                        await waitTick();
                                                        msSinceLastTickWait = Date.now();
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    catch (e) {
                                        event.source.sendMessage("§c" + e + e.stack);
                                        try {
                                            world.structureManager.delete(structureID);
                                        }
                                        catch { }
                                    }
                                }
                            }
                            break;
                        case "splattercubesurface":
                            {
                                const loca = event.source.getBlockFromViewDirection({
                                    includeLiquidBlocks: !selectMode.includes("noliquid"),
                                    includePassableBlocks: !selectMode.includes("nopassable"),
                                });
                                const locb = dirmap(loca.face);
                                const loc = loca?.block?.location;
                                const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 3))
                                    ? 3
                                    : Number(event.itemStack.getDynamicProperty("radius") ?? 3);
                                const decay = isNaN(Number(event.itemStack.getDynamicProperty("decay") ?? 0))
                                    ? 0
                                    : Number(event.itemStack.getDynamicProperty("decay") ?? 0);
                                const blockpattern = new BlockPattern(JSON.parse(String(event.itemStack.getDynamicProperty("pattern"))), String(event.itemStack.getDynamicProperty("patterntype") ?? "random"));
                                const mask = event.itemStack.getDynamicProperty("mask") != undefined
                                    ? new BlockMask(JSON.parse(String(event.itemStack.getDynamicProperty("mask"))), String(event.itemStack.getDynamicProperty("masktype") ?? "include"))
                                    : undefined;
                                if (!!!loc) {
                                    event.source.sendMessage("§cError: You must be facing a block.");
                                }
                                else if (!!!event.itemStack.getDynamicProperty("pattern")) {
                                    event.source.sendMessage("§cError: Pattern for sphere generation is not defined on the item's dynamic properties.");
                                }
                                else {
                                    const pos = roundVector3ToMiddleOfBlock(loc);
                                    //const cornerradius = Vector.distance(pos, {x: pos.x-radius, y: pos.y-radius, z: pos.z-radius})
                                    const blocktypes = BlockTypes.getAll();
                                    //console.warn("a")
                                    try {
                                        await fillArea({
                                            x: pos.x - radius,
                                            y: pos.y - radius,
                                            z: pos.z - radius,
                                        }, {
                                            x: pos.x + radius,
                                            y: pos.y + radius,
                                            z: pos.z + radius,
                                        }, event.source.dimension, (l, i) => {
                                            if (Math.max(0.0001, Math.random()) < (Math.min(radius, Vector.distance(pos, l)) / radius) * (decay / 10) ||
                                                (tryget(() => l.dimension.getBlock(l)?.isAir) ?? true) ||
                                                !(tryget(() => l.dimension.getBlock(l)?.[locb]()?.isAir) ?? true)) {
                                                return null;
                                            }
                                            const b = blockpattern.generateBlock(i);
                                            return b.type == "random"
                                                ? BlockPermutation.resolve(blocktypes[Math.floor(blocktypes.length * Math.random())].id)
                                                : BlockPermutation.resolve(b.type, b.states);
                                        }, {
                                            blockMask: mask,
                                            minMSBetweenTickWaits: config.system.defaultMinMSBetweenTickWaits,
                                            replacemode: true,
                                            integrity: 100,
                                            liteMode: true,
                                        });
                                    }
                                    catch (e) {
                                        event.source.sendMessage("§c" + e + e.stack);
                                    }
                                }
                            }
                            break;
                        case "splattersquaresurface":
                            {
                                const loca = event.source.getBlockFromViewDirection({
                                    includeLiquidBlocks: !selectMode.includes("noliquid"),
                                    includePassableBlocks: !selectMode.includes("nopassable"),
                                });
                                const locb = dirmap(loca.face);
                                const loc = loca?.block?.location;
                                const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 3))
                                    ? 3
                                    : Number(event.itemStack.getDynamicProperty("radius") ?? 3);
                                const decay = isNaN(Number(event.itemStack.getDynamicProperty("decay") ?? 0))
                                    ? 0
                                    : Number(event.itemStack.getDynamicProperty("decay") ?? 0);
                                const blockpattern = new BlockPattern(JSON.parse(String(event.itemStack.getDynamicProperty("pattern"))), String(event.itemStack.getDynamicProperty("patterntype") ?? "random"));
                                const mask = event.itemStack.getDynamicProperty("mask") != undefined
                                    ? new BlockMask(JSON.parse(String(event.itemStack.getDynamicProperty("mask"))), String(event.itemStack.getDynamicProperty("masktype") ?? "include"))
                                    : undefined;
                                if (!!!loc) {
                                    event.source.sendMessage("§cError: You must be facing a block.");
                                }
                                else if (!!!event.itemStack.getDynamicProperty("pattern")) {
                                    event.source.sendMessage("§cError: Pattern for sphere generation is not defined on the item's dynamic properties.");
                                }
                                else {
                                    const pos = roundVector3ToMiddleOfBlock(loc);
                                    //const cornerradius = Vector.distance(pos, {x: pos.x-radius, y: pos.y-radius, z: pos.z-radius})
                                    const blocktypes = BlockTypes.getAll();
                                    //console.warn("a")
                                    try {
                                        await fillArea(Vector.add(pos, Vector.scale(diroffsetothersmap(loca.face), -radius)), Vector.add(pos, Vector.scale(diroffsetothersmap(loca.face), radius)), event.source.dimension, (l, i) => {
                                            if (Math.max(0.0001, Math.random()) < (Math.min(radius, Vector.distance(pos, l)) / radius) * (decay / 10) ||
                                                (tryget(() => l.dimension.getBlock(l)?.isAir) ?? true) ||
                                                !(tryget(() => l.dimension.getBlock(l)?.[locb]()?.isAir) ?? true)) {
                                                return null;
                                            }
                                            const b = blockpattern.generateBlock(i);
                                            return b.type == "null"
                                                ? null
                                                : b.type == "random"
                                                    ? BlockPermutation.resolve(blocktypes[Math.floor(blocktypes.length * Math.random())].id)
                                                    : BlockPermutation.resolve(b.type, b.states);
                                        }, {
                                            blockMask: mask,
                                            minMSBetweenTickWaits: config.system.defaultMinMSBetweenTickWaits,
                                            replacemode: true,
                                            integrity: 100,
                                            liteMode: true,
                                        });
                                    }
                                    catch (e) {
                                        event.source.sendMessage("§c" + e + e.stack);
                                    }
                                }
                            }
                            break;
                        case "extinguish":
                            {
                                const loc = event.source.getBlockFromViewDirection({
                                    includeLiquidBlocks: !selectMode.includes("noliquid"),
                                    includePassableBlocks: !selectMode.includes("nopassable"),
                                })?.block?.location;
                                const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 10))
                                    ? 10
                                    : Number(event.itemStack.getDynamicProperty("radius") ?? 10);
                                if (!!!loc) {
                                    event.source.sendMessage("§cError: You must be facing a block.");
                                }
                                else {
                                    const pos = roundVector3ToMiddleOfBlock(loc);
                                    let froma = Vector3Utils.subtract(pos, {
                                        x: radius,
                                        y: radius,
                                        z: radius,
                                    });
                                    let from = {
                                        x: froma.x,
                                        y: froma.y,
                                        z: froma.z,
                                    };
                                    let toa = Vector3Utils.add(pos, {
                                        x: radius,
                                        y: radius,
                                        z: radius,
                                    });
                                    let to = { x: toa.x, y: toa.y, z: toa.z };
                                    try {
                                        fillBlocksHB(from, to, event.source.dimension, "air", undefined, { matchingBlock: "fire" });
                                        fillBlocksHB(from, to, event.source.dimension, "air", undefined, { matchingBlock: "soul_fire" });
                                    }
                                    catch (e) {
                                        event.source.sendMessage("§c" + e + e.stack);
                                    }
                                }
                            }
                            break;
                        case "remexp":
                            {
                                //console.warn("d")
                                const loc = event.source.getBlockFromViewDirection({
                                    includeLiquidBlocks: !selectMode.includes("noliquid"),
                                    includePassableBlocks: !selectMode.includes("nopassable"),
                                })?.block?.location;
                                const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 10))
                                    ? 10
                                    : Number(event.itemStack.getDynamicProperty("radius") ?? 10);
                                if (!!!loc) {
                                    event.source.sendMessage("§cError: You must be facing a block.");
                                }
                                else {
                                    const pos = roundVector3ToMiddleOfBlock(loc);
                                    let froma = Vector3Utils.subtract(pos, {
                                        x: radius,
                                        y: radius,
                                        z: radius,
                                    });
                                    let from = {
                                        x: froma.x,
                                        y: froma.y,
                                        z: froma.z,
                                    };
                                    let toa = Vector3Utils.add(pos, {
                                        x: radius,
                                        y: radius,
                                        z: radius,
                                    });
                                    let to = { x: toa.x, y: toa.y, z: toa.z };
                                    switch (event.source.dimension.id) {
                                        case "minecraft:overworld":
                                            try {
                                                fillBlocksHB(from, to, event.source.dimension, "air", undefined, { matchingBlock: "tnt" });
                                                fillBlocksHB(from, to, event.source.dimension, "air", undefined, {
                                                    matchingBlock: "respawn_anchor",
                                                });
                                            }
                                            catch (e) {
                                                event.source.sendMessage("§c" + e + e.stack);
                                            }
                                            break;
                                        case "minecraft:nether":
                                            try {
                                                fillBlocksHB(from, to, event.source.dimension, "air", undefined, { matchingBlock: "tnt" });
                                                fillBlocksHB(from, to, event.source.dimension, "air", undefined, { matchingBlock: "bed" });
                                            }
                                            catch (e) {
                                                event.source.sendMessage("§c" + e + e.stack);
                                            }
                                            break;
                                        case "minecraft:the_end":
                                            try {
                                                fillBlocksHB(from, to, event.source.dimension, "air", undefined, { matchingBlock: "tnt" });
                                                fillBlocksHB(from, to, event.source.dimension, "air", undefined, {
                                                    matchingBlock: "respawn_anchor",
                                                });
                                                fillBlocksHB(from, to, event.source.dimension, "air", undefined, { matchingBlock: "bed" });
                                            }
                                            catch (e) {
                                                event.source.sendMessage("§c" + e + e.stack);
                                            }
                                            break;
                                        default:
                                            try {
                                                fillBlocksHB(from, to, event.source.dimension, "air", undefined, { matchingBlock: "tnt" });
                                            }
                                            catch (e) {
                                                event.source.sendMessage("§c" + e + e.stack);
                                            }
                                    }
                                    [
                                        ...event.source.dimension.getEntities({
                                            location: event.source.location,
                                            type: "minecraft:tnt",
                                            maxDistance: radius,
                                        }),
                                        ...event.source.dimension.getEntities({
                                            location: event.source.location,
                                            type: "minecraft:tnt_minecart",
                                            maxDistance: radius,
                                        }),
                                        ...event.source.dimension.getEntities({
                                            location: event.source.location,
                                            type: "minecraft:wither",
                                            maxDistance: radius,
                                        }),
                                        ...event.source.dimension.getEntities({
                                            location: event.source.location,
                                            type: "minecraft:wither_skull",
                                            maxDistance: radius,
                                        }),
                                        ...event.source.dimension.getEntities({
                                            location: event.source.location,
                                            type: "minecraft:wither_skull_dangerous",
                                            maxDistance: radius,
                                        }),
                                        ...event.source.dimension.getEntities({
                                            location: event.source.location,
                                            type: "minecraft:ender_dragon",
                                            maxDistance: radius,
                                        }),
                                        ...event.source.dimension.getEntities({
                                            location: event.source.location,
                                            type: "projectile:tnt",
                                            maxDistance: radius,
                                        }),
                                        ...event.source.dimension.getEntities({
                                            location: event.source.location,
                                            type: "andexsa:fire_tnt_arrow",
                                            maxDistance: radius,
                                        }),
                                        ...event.source.dimension.getEntities({
                                            location: event.source.location,
                                            type: "andexsa:normal_fire_tnt_arrow",
                                            maxDistance: radius,
                                        }),
                                        ...event.source.dimension.getEntities({
                                            location: event.source.location,
                                            type: "andexsa:normal_tnt_arrow",
                                            maxDistance: radius,
                                        }),
                                        ...event.source.dimension.getEntities({
                                            location: event.source.location,
                                            type: "andexsa:tnt_arrow",
                                            maxDistance: radius,
                                        }),
                                    ].forEach((v) => v.remove());
                                }
                            }
                            break;
                        case "remexpne":
                            {
                                //console.warn("d")
                                const loc = event.source.getBlockFromViewDirection({
                                    includeLiquidBlocks: !selectMode.includes("noliquid"),
                                    includePassableBlocks: !selectMode.includes("nopassable"),
                                })?.block?.location;
                                const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 10))
                                    ? 10
                                    : Number(event.itemStack.getDynamicProperty("radius") ?? 10);
                                if (!!!loc) {
                                    event.source.sendMessage("§cError: You must be facing a block.");
                                }
                                else {
                                    const pos = roundVector3ToMiddleOfBlock(loc);
                                    let froma = Vector3Utils.subtract(pos, {
                                        x: radius,
                                        y: radius,
                                        z: radius,
                                    });
                                    let from = {
                                        x: froma.x,
                                        y: froma.y,
                                        z: froma.z,
                                    };
                                    let toa = Vector3Utils.add(pos, {
                                        x: radius,
                                        y: radius,
                                        z: radius,
                                    });
                                    let to = { x: toa.x, y: toa.y, z: toa.z };
                                    switch (event.source.dimension.id) {
                                        case "minecraft:overworld":
                                            try {
                                                fillBlocksHB(from, to, event.source.dimension, "air", undefined, { matchingBlock: "tnt" });
                                                fillBlocksHB(from, to, event.source.dimension, "air", undefined, {
                                                    matchingBlock: "respawn_anchor",
                                                });
                                            }
                                            catch (e) {
                                                event.source.sendMessage("§c" + e + e.stack);
                                            }
                                            break;
                                        case "minecraft:nether":
                                            try {
                                                fillBlocksHB(from, to, event.source.dimension, "air", undefined, { matchingBlock: "tnt" });
                                                fillBlocksHB(from, to, event.source.dimension, "air", undefined, { matchingBlock: "bed" });
                                            }
                                            catch (e) {
                                                event.source.sendMessage("§c" + e + e.stack);
                                            }
                                            break;
                                        case "minecraft:the_end":
                                            try {
                                                fillBlocksHB(from, to, event.source.dimension, "air", undefined, { matchingBlock: "tnt" });
                                                fillBlocksHB(from, to, event.source.dimension, "air", undefined, {
                                                    matchingBlock: "respawn_anchor",
                                                });
                                                fillBlocksHB(from, to, event.source.dimension, "air", undefined, { matchingBlock: "bed" });
                                            }
                                            catch (e) {
                                                event.source.sendMessage("§c" + e + e.stack);
                                            }
                                            break;
                                        default:
                                            try {
                                                fillBlocksHB(from, to, event.source.dimension, "air", undefined, { matchingBlock: "tnt" });
                                            }
                                            catch (e) {
                                                event.source.sendMessage("§c" + e + e.stack);
                                            }
                                    }
                                }
                            }
                            break;
                        case "remexpentity":
                            {
                                //console.warn("d")
                                const loc = event.source.getBlockFromViewDirection({
                                    includeLiquidBlocks: !selectMode.includes("noliquid"),
                                    includePassableBlocks: !selectMode.includes("nopassable"),
                                })?.block?.location;
                                const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 10))
                                    ? 10
                                    : Number(event.itemStack.getDynamicProperty("radius") ?? 10);
                                if (!!!loc) {
                                    event.source.sendMessage("§cError: You must be facing a block.");
                                }
                                else {
                                    const pos = roundVector3ToMiddleOfBlock(loc);
                                    [
                                        ...event.source.dimension.getEntities({
                                            location: event.source.location,
                                            type: "minecraft:tnt",
                                            maxDistance: radius,
                                        }),
                                        ...event.source.dimension.getEntities({
                                            location: event.source.location,
                                            type: "minecraft:tnt_minecart",
                                            maxDistance: radius,
                                        }),
                                        ...event.source.dimension.getEntities({
                                            location: event.source.location,
                                            type: "minecraft:wither",
                                            maxDistance: radius,
                                        }),
                                        ...event.source.dimension.getEntities({
                                            location: event.source.location,
                                            type: "minecraft:wither_skull",
                                            maxDistance: radius,
                                        }),
                                        ...event.source.dimension.getEntities({
                                            location: event.source.location,
                                            type: "minecraft:wither_skull_dangerous",
                                            maxDistance: radius,
                                        }),
                                        ...event.source.dimension.getEntities({
                                            location: event.source.location,
                                            type: "minecraft:ender_dragon",
                                            maxDistance: radius,
                                        }),
                                        ...event.source.dimension.getEntities({
                                            location: event.source.location,
                                            type: "projectile:tnt",
                                            maxDistance: radius,
                                        }),
                                        ...event.source.dimension.getEntities({
                                            location: event.source.location,
                                            type: "andexsa:fire_tnt_arrow",
                                            maxDistance: radius,
                                        }),
                                        ...event.source.dimension.getEntities({
                                            location: event.source.location,
                                            type: "andexsa:normal_fire_tnt_arrow",
                                            maxDistance: radius,
                                        }),
                                        ...event.source.dimension.getEntities({
                                            location: event.source.location,
                                            type: "andexsa:normal_tnt_arrow",
                                            maxDistance: radius,
                                        }),
                                        ...event.source.dimension.getEntities({
                                            location: event.source.location,
                                            type: "andexsa:tnt_arrow",
                                            maxDistance: radius,
                                        }),
                                    ].forEach((v) => v.remove());
                                }
                            }
                            break;
                        default:
                            //console.warn("c")
                            break;
                    }
                }
                catch (e) {
                    event.source.sendMessage("§c" + e + e.stack);
                }
            });
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    else if (event.itemStack?.typeId === "andexdb:selection_tool") {
        event.cancel = true;
        if (securityVariables.ultraSecurityModeEnabled) {
            if (securityVariables.testPlayerForPermission(event.source, "andexdb.useWorldEdit") == false) {
                event.source.sendMessage("§cYou do not have permission to use the WorldEdit Selection Tool. You need the following permission to use this item: andexdb.useWorldEdit");
                return;
            }
        }
        try {
            const selectMode = String(event.itemStack.getDynamicProperty("selectmode") ?? "");
            const mode = Boolean(event.source.getDynamicProperty("posM") ?? false);
            const loc = event.source.getBlockFromViewDirection({
                includeLiquidBlocks: !selectMode.includes("noliquid"),
                includePassableBlocks: !selectMode.includes("nopassable"),
            })?.block?.location;
            if (!!!loc) {
                event.source.sendMessage("§cError: You must be facing a block.");
            }
            else {
                const posV = Vector3Utils.floor(loc);
                event.source.setDynamicProperty(mode ? "pos2" : "pos1", posV);
                event.source.setDynamicProperty("posD", event.source.dimension.id);
                event.source.sendMessage(`Set ${mode ? "pos2" : "pos1"} to ${vTStr(posV)}.`);
                event.source.setDynamicProperty("posM", !mode);
                srun(() => {
                    event.source.spawnParticle(mode ? "andexdb:xz_axis_particle_pos2" : "andexdb:xz_axis_particle_pos1", Vector.add(loc, { x: 0.5, y: 1.005, z: 0.5 }));
                    event.source.spawnParticle(mode ? "andexdb:xz_axis_particle_pos2_north" : "andexdb:xz_axis_particle_pos1_north", Vector.add(loc, { x: 0.5, y: 0.5, z: 1.005 }));
                    event.source.spawnParticle(mode ? "andexdb:xz_axis_particle_pos2_east" : "andexdb:xz_axis_particle_pos1_east", Vector.add(loc, { x: -0.005, y: 0.5, z: 0.5 }));
                    event.source.spawnParticle(mode ? "andexdb:xz_axis_particle_pos2_down" : "andexdb:xz_axis_particle_pos1_down", Vector.add(loc, { x: 0.5, y: -0.005, z: 0.5 }));
                    event.source.spawnParticle(mode ? "andexdb:xz_axis_particle_pos2_south" : "andexdb:xz_axis_particle_pos1_south", Vector.add(loc, { x: 0.5, y: 0.5, z: -0.005 }));
                    event.source.spawnParticle(mode ? "andexdb:xz_axis_particle_pos2_west" : "andexdb:xz_axis_particle_pos1_west", Vector.add(loc, { x: 1.005, y: 0.5, z: 0.5 }));
                });
            }
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (new ProtectedAreaTester("itemUse").testIsInArea(event, event.source.location, event.source.dimension)) {
        event.cancel = true;
        return;
    }
});
//# sourceMappingURL=itemUse.js.map