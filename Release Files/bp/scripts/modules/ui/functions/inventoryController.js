import { Entity, Player, world, EntityInventoryComponent, EquipmentSlot, EntityEquippableComponent, ItemDurabilityComponent, ItemEnchantableComponent, ItemLockMode, ItemStack, BlockInventoryComponent, } from "@minecraft/server";
import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
export function inventoryController(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    let form2 = new ModalFormData();
    let players = world.getAllPlayers();
    let targetList = [players[0].nameTag];
    for (const index in players) {
        if (Number(index) != 0) {
            targetList = String([String(targetList), players[index].nameTag]).split(",");
        }
    }
    form2.textField("Slot Number", "Slot Number", { defaultValue: "0" });
    form2.dropdown("Slot Type", ["Inventory", "Equipment"], { defaultValueIndex: 0 });
    form2.dropdown("Player Target", String(targetList).split(","), { defaultValueIndex: 0 });
    form2.dropdown("Player Viewer", String(targetList).split(","), { defaultValueIndex: 0 });
    form2.toggle("Debug2", { defaultValue: false });
    form2
        .show(sourceEntity)
        .then((t) => {
        if (t.canceled)
            return;
        let [slotNumber, slotType, playerTarget, playerViewer, debug2] = t.formValues;
        let playerTargetB = Number(playerTarget);
        let playerViewerB = Number(playerViewer);
        let inventory;
        inventory = players[playerTargetB].getComponent("inventory"); /*
try{inventory = players[playerTargetB].getComponent("equipment_inventory") as EntityEquipmentInventoryComponent;} catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack); }};*/
        let item = inventory.container.getItem(Number(slotNumber));
        let equipmentPlayerSlotsList = [
            EquipmentSlot.Head,
            EquipmentSlot.Chest,
            EquipmentSlot.Legs,
            EquipmentSlot.Feet,
            EquipmentSlot.Mainhand,
            EquipmentSlot.Offhand,
        ];
        if (Number(slotType) == 1) {
            try {
                let a = players[playerTargetB].getComponent("equippable");
                item = a.getEquipmentSlot(equipmentPlayerSlotsList[Number(slotNumber)]);
            }
            catch (e) {
                if (Boolean(debug2) == true) {
                    console.error(e, e.stack);
                }
            }
        }
        function getDurability() {
            try {
                return item.getComponent("minecraft:durability");
            }
            catch (e) {
                if (Boolean(debug2) == true) {
                    console.error(e, e.stack);
                }
                return undefined;
            }
        }
        function getEnchantments() {
            try {
                return item.getComponent("minecraft:enchantments");
            }
            catch (e) {
                if (Boolean(debug2) == true) {
                    console.error(e, e.stack);
                }
                return undefined;
            }
        }
        const durability = getDurability();
        function itemNameTextCalculator() {
            try {
                if (item.nameTag == undefined) {
                    return undefined;
                }
                else {
                    if (item.nameTag != undefined) {
                        return item.nameTag;
                    }
                }
            }
            catch (e) {
                if (Boolean(debug2) == true) {
                    console.error(e, e.stack);
                }
                return undefined;
            }
        }
        let itemNameTextField = itemNameTextCalculator(); /*
console.warn(itemNameTextCalculator());*/
        function itemLoreTextCalculator() {
            try {
                if (item.getLore() == undefined) {
                    return undefined;
                }
                else {
                    if (item.getLore() != undefined) {
                        return Array(item.getLore().toString()).join("");
                    }
                }
            }
            catch (e) {
                if (Boolean(debug2) == true) {
                    console.error(e, e.stack);
                }
                return undefined;
            }
        }
        let itemLoreTextField = itemLoreTextCalculator();
        let currentValueItemAmount = 0;
        try {
            currentValueItemAmount = item.amount;
        }
        catch (e) {
            if (Boolean(debug2) == true) {
                console.error(e, e.stack);
            } /* return 0*/
        }
        let currentValueItemType = undefined;
        try {
            currentValueItemType = item.typeId;
        }
        catch (e) {
            if (Boolean(debug2) == true) {
                console.error(e, e.stack);
            } /* return 0*/
        }
        let itemKeepOnDeath = false;
        try {
            itemKeepOnDeath = item.keepOnDeath;
        }
        catch (e) {
            if (Boolean(debug2) == true) {
                console.error(e, e.stack);
            } /* return false*/
        }
        let form = new ModalFormData(); /*
console.warn(item.nameTag);*/ /*
                console.warn(Array(item.getLore().toString()).join(""));*/
        form.title("Item Modifier / Lore");
        form.textField("Item Type: " +
            currentValueItemType +
            "\nItem Name\nTo type multiple lines just put \\\\newline in between each line. \nTo clear item name just leave field blank. ", "Item Name", itemNameTextField /*(String(item.nameTag))*/);
        form.textField("Item Lore\nTo type multiple lines just put \\\\newline in between each line. ", "Item Lore", { defaultValue: itemLoreTextField });
        form.textField("Can Destroy", "Can Destroy", { defaultValue: "" /*(String(item.getCanDestroy()))*/ });
        form.textField("Can Place On", "Can Place On", { defaultValue: "" /*(String(item.getCanPlaceOn()))*/ });
        form.textField("Trigger Event", "Trigger Event", { defaultValue: "" });
        form.toggle("Set Count", { defaultValue: false });
        form.slider("Count", 0, 255, { valueStep: 1, defaultValue: currentValueItemAmount });
        form.toggle("keepOnDeath", { defaultValue: itemKeepOnDeath });
        function getItemLockMode(mode, input) {
            try {
                if (mode == 1) {
                    try {
                        if (item.lockMode == "inventory") {
                            return 0;
                        }
                        else {
                            if (item.lockMode == "none") {
                                return 1;
                            }
                            else {
                                if (item.lockMode == "slot") {
                                    return 2;
                                }
                            }
                        }
                    }
                    catch (e) {
                        if (Boolean(debug2) == true) {
                            console.error(e, e.stack);
                        }
                        return 1;
                    }
                }
                else {
                    if (mode == 0) {
                        if (input == 0) {
                            return ItemLockMode.inventory;
                        }
                        else {
                            if (input == 1) {
                                return ItemLockMode.none;
                            }
                            else {
                                if (input == 2) {
                                    return ItemLockMode.slot;
                                }
                            }
                        }
                    }
                }
            }
            catch (e) {
                console.error(e, e.stack);
                return undefined;
            }
        }
        let itemLockModeIndex = Number(getItemLockMode(1));
        form.dropdown("lockMode", ["inventory", "none", "slot"], { defaultValueIndex: Number(itemLockModeIndex) });
        form.toggle("setLore", { defaultValue: false });
        form.toggle("clearLore", { defaultValue: false });
        form.toggle("New Item", { defaultValue: false });
        form.textField("Item Type", "Item Type", { defaultValue: "" });
        form.textField("Item Count", "Item Count", { defaultValue: "1" }); /*
form.textField("Item Data", "Trigger Event", {defaultValue: ""});*/
        form.toggle("Move Item", { defaultValue: false });
        form.textField("From Slot", "From Slot", { defaultValue: "0" });
        form.textField("To Slot", "To Slot", { defaultValue: "1" });
        form.dropdown("From Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], {
            defaultValueIndex: 0,
        });
        form.dropdown("From Contriner Player", String(targetList).split(","), { defaultValueIndex: 0 });
        form.textField("From Container Block", "overworld, 500, 60, 500", {
            defaultValue: players[playerTargetB].dimension.id +
                ", " +
                players[playerTargetB].location.x +
                ", " +
                players[playerTargetB].location.y +
                ", " +
                players[playerTargetB].location.z,
        });
        form.dropdown("To Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], {
            defaultValueIndex: 0,
        });
        form.dropdown("To Container Player", String(targetList).split(","), { defaultValueIndex: 0 });
        form.textField("To Container Block", "overworld, 500, 60, 500", {
            defaultValue: players[playerTargetB].dimension.id +
                ", " +
                players[playerTargetB].location.x +
                ", " +
                players[playerTargetB].location.y +
                ", " +
                players[playerTargetB].location.z,
        });
        form.toggle("Swap Items", { defaultValue: false });
        form.textField("Slot", "Slot", { defaultValue: "0" });
        form.textField("Other Slot", "Other Slot", { defaultValue: "1" });
        form.dropdown("Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], {
            defaultValueIndex: 0,
        });
        form.dropdown("Container Player", String(targetList).split(","), { defaultValueIndex: 0 });
        form.textField("Container Block", "overworld, 500, 60, 500", {
            defaultValue: players[playerTargetB].dimension.id +
                ", " +
                players[playerTargetB].location.x +
                ", " +
                players[playerTargetB].location.y +
                ", " +
                players[playerTargetB].location.z,
        });
        form.dropdown("Other Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], {
            defaultValueIndex: 0,
        });
        form.dropdown("Other Container Player", String(targetList).split(","), { defaultValueIndex: 0 });
        form.textField("Other Container Block", "overworld, 500, 60, 500", {
            defaultValue: players[playerTargetB].dimension.id +
                ", " +
                players[playerTargetB].location.x +
                ", " +
                players[playerTargetB].location.y +
                ", " +
                players[playerTargetB].location.z,
        });
        form.toggle("Transfer Item", { defaultValue: false });
        form.textField("From Slot", "From Slot", { defaultValue: "0" });
        form.dropdown("From Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], {
            defaultValueIndex: 0,
        });
        form.dropdown("From Container Player", String(targetList).split(","), { defaultValueIndex: 0 });
        form.textField("From Container Block", "overworld, 500, 60, 500", {
            defaultValue: players[playerTargetB].dimension.id +
                ", " +
                players[playerTargetB].location.x +
                ", " +
                players[playerTargetB].location.y +
                ", " +
                players[playerTargetB].location.z,
        });
        form.dropdown("To Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], {
            defaultValueIndex: 0,
        });
        form.dropdown("To Container Player", String(targetList).split(","), { defaultValueIndex: 0 });
        form.textField("To Container Block", "overworld, 500, 60, 500", {
            defaultValue: players[playerTargetB].dimension.id +
                ", " +
                players[playerTargetB].location.x +
                ", " +
                players[playerTargetB].location.y +
                ", " +
                players[playerTargetB].location.z,
        });
        form.toggle("Debug", { defaultValue: false });
        forceShow(form, players[playerViewerB])
            .then((r) => {
            // This will stop the code when the player closes the form
            if (r.canceled)
                return;
            // This will assign every input their own variable
            let [itemName, itemLore, canDestroy, canPlaceOn, triggerEvent, setAmount, amount, keepOnDeath, lockMode, setLore, clearLore, newItem, newItemType, newItemCount /*, newItemData*/, moveItem, moveFromSlot, moveToSlot, moveFromContainerType, moveFromContainer, moveFromContainerBlock, moveToContainerType, moveToContainer, moveToContainerBlock, swapItems, swapSlot, swapOtherSlot, swapContainerType, swapContainer, swapContainerBlock, swapOtherContainerType, swapOtherContainer, swapOtherContainerBlock, transferItem, transferFromSlot, transferFromContainerType, transferFromContainer, transferFromContainerBlock, transferToContainerType, transferToContainer, transferToContainerBlock, debug,] = r.formValues; /*
console.warn(r.formValues);*/
            /*let item = inventory.container.getItem(Number(slotNumber));
if (Number(slotType) == 1) { try{let a = players[playerTargetB].getComponent("equipment_inventory") as EntityEquipmentInventoryComponent; item = a.getEquipmentSlot(equipmentPlayerSlotsList[Number(slotNumber)])} catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack); }};};*/
            let transferFromContainerBlockB = world.getDimension(String(transferFromContainerBlock).split(", ")[0]).getBlock({
                x: Number(String(transferFromContainerBlock).split(", ")[1]),
                y: Number(String(transferFromContainerBlock).split(", ")[2]),
                z: Number(String(transferFromContainerBlock).split(", ")[3]),
            });
            let transferToContainerBlockB = world.getDimension(String(transferToContainerBlock).split(", ")[0]).getBlock({
                x: Number(String(transferToContainerBlock).split(", ")[1]),
                y: Number(String(transferToContainerBlock).split(", ")[2]),
                z: Number(String(transferToContainerBlock).split(", ")[3]),
            });
            let moveFromContainerBlockB = world.getDimension(String(moveFromContainerBlock).split(", ")[0]).getBlock({
                x: Number(String(moveFromContainerBlock).split(", ")[1]),
                y: Number(String(moveFromContainerBlock).split(", ")[2]),
                z: Number(String(moveFromContainerBlock).split(", ")[3]),
            });
            let moveToContainerBlockB = world.getDimension(String(moveToContainerBlock).split(", ")[0]).getBlock({
                x: Number(String(moveToContainerBlock).split(", ")[1]),
                y: Number(String(moveToContainerBlock).split(", ")[2]),
                z: Number(String(moveToContainerBlock).split(", ")[3]),
            });
            let swapContainerBlockB = world.getDimension(String(swapContainerBlock).split(", ")[0]).getBlock({
                x: Number(String(swapContainerBlock).split(", ")[1]),
                y: Number(String(swapContainerBlock).split(", ")[2]),
                z: Number(String(swapContainerBlock).split(", ")[3]),
            });
            let swapOtherContainerBlockB = world.getDimension(String(swapOtherContainerBlock).split(", ")[0]).getBlock({
                x: Number(String(swapOtherContainerBlock).split(", ")[1]),
                y: Number(String(swapOtherContainerBlock).split(", ")[2]),
                z: Number(String(swapOtherContainerBlock).split(", ")[3]),
            });
            let durability2 = getDurability();
            let enchantments2 = getEnchantments(); /*
for (const index in inventory.) {
if (Number(index) != 0) {
targetList = String([String(targetList), players[index].nameTag]).split(",");
}
}*/
            let newItemNameTag = String(itemName).split("\\\\newline");
            try {
                item.nameTag = newItemNameTag.join("\n");
            }
            catch (e) {
                if (Boolean(debug2) == true) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(setLore) == true) {
                try {
                    item.setLore(String(itemLore).split("\\\\newline"));
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                }
            }
            if (Boolean(clearLore) == true) {
                try {
                    item.setLore();
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            try {
                item.lockMode = String(getItemLockMode(0, Number(lockMode)));
            }
            catch (e) {
                if (Boolean(debug2) == true) {
                    console.error(e, e.stack);
                }
            }
            try {
                item.keepOnDeath = Boolean(keepOnDeath);
            }
            catch (e) {
                if (Boolean(debug2) == true) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(setAmount) == true) {
                try {
                    item.amount = Number(amount);
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                }
            }
            if (String(canDestroy) !== "") {
                try {
                    item.setCanDestroy(String(canDestroy).split(", "));
                }
                catch (e) {
                    console.error(e, e.stack);
                } /*String[String(canDestroy)]*/
            }
            if (String(canPlaceOn) !== "") {
                try {
                    item.setCanPlaceOn(String(canPlaceOn).split(", "));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (String(triggerEvent) !== "") {
                try {
                    item.triggerEvent(String(triggerEvent));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            } /*
try{ durability2.damage = Number(10); } catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack)}; }*/ /*
                        let enchantment = new Enchantment("fire_aspect", 4)
                        enchantment.level = 5
                        try{ const enchantments3 = enchantments2.enchantments; enchantments3.addEnchantment(enchantment); enchantments2.enchantments = enchantments3} catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack)}; }*/
            if (Boolean(newItem) == true) {
                try {
                    item = new ItemStack(String(newItemType), Number(newItemCount));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (sourceEntity.hasTag("scriptDebugger")) {
                console.warn(item.typeId);
            }
            if (Number(slotType) == 1) {
                try {
                    let a = players[playerTargetB].getComponent("equippable");
                    a.setEquipment(equipmentPlayerSlotsList[Number(slotNumber)], item.clone());
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                }
            }
            else {
                try {
                    inventory.container.setItem(Number(slotNumber), item);
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            } /*
try{ durability2.damage = Number(10); } catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack)}; }*/
            if (Boolean(moveItem) == true) {
                /*
    let moveFromSlotB: any
    moveFromSlotB = undefined*/
                let moveFromContainerB;
                moveFromContainerB = players[Number(moveFromContainer)].getComponent("inventory");
                switch (moveFromContainerType) {
                    case 4:
                        moveFromContainerB = moveFromContainerBlockB.getComponent("inventory");
                        break;
                }
                let moveToContainerB;
                moveToContainerB = players[Number(moveToContainer)].getComponent("inventory");
                switch (moveToContainerType) {
                    case 4:
                        moveToContainerB = moveToContainerBlockB.getComponent("inventory");
                        break;
                }
                try {
                    moveFromContainerB.container.moveItem(Number(moveFromSlot), Number(moveToSlot), moveToContainerB.container);
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(swapItems) == true) {
                /*
    let moveFromSlotB: any
    moveFromSlotB = undefined*/
                let swapContainerB;
                let mode = 0;
                swapContainerB = players[Number(swapContainer)].getComponent("inventory");
                let itemA;
                itemA = undefined;
                if (Number(swapSlot) > 35 && Number(swapContainerType) == 0) {
                    try {
                        swapContainerB = players[playerTargetB].getComponent("equippable");
                        swapSlot = Number(swapSlot) - 36;
                        mode = 1;
                        itemA = swapContainerB.getEquipment(equipmentPlayerSlotsList[Number(swapSlot)]).clone();
                    }
                    catch (e) {
                        if (Boolean(debug2) == true) {
                            console.error(e, e.stack);
                        }
                    }
                }
                switch (swapContainerType) {
                    case 4:
                        swapContainerB = swapContainerBlockB.getComponent("inventory");
                        break;
                }
                let swapOtherContainerB;
                swapOtherContainerB = players[Number(swapOtherContainer)].getComponent("inventory");
                let itemB;
                itemB = undefined;
                if (Number(swapOtherSlot) > 35) {
                    try {
                        swapOtherContainerB = players[playerTargetB].getComponent("equippable");
                        swapOtherSlot = Number(swapOtherSlot) - 36;
                        if (mode == 1) {
                            mode = 2;
                        }
                        else {
                            mode = 3;
                        }
                        itemB = swapOtherContainerB.getEquipment(equipmentPlayerSlotsList[Number(swapOtherSlot)]).clone();
                    }
                    catch (e) {
                        if (Boolean(debug2) == true) {
                            console.error(e, e.stack);
                        }
                    }
                }
                switch (swapOtherContainerType) {
                    case 4:
                        swapOtherContainerB = swapOtherContainerBlockB.getComponent("inventory");
                        break;
                }
                try {
                    if (itemB == undefined) {
                        itemB = swapOtherContainerB.container.getItem(Number(swapOtherSlot)).clone();
                    }
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                try {
                    if (itemA == undefined) {
                        itemA = swapContainerB.container.getItem(Number(swapSlot)).clone();
                    }
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                switch (mode) {
                    case 0:
                        console.warn("Mode: 0");
                        try {
                            swapContainerB.container.swapItems(Number(swapSlot), Number(swapOtherSlot), swapOtherContainerB);
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 1:
                        console.warn("Mode: 1");
                        try {
                            swapContainerB.setEquipment(equipmentPlayerSlotsList[Number(swapOtherSlot)], itemB);
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        try {
                            swapOtherContainerB.container.setItem(Number(swapOtherSlot), itemA);
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 3:
                        console.warn("Mode: 3");
                        try {
                            swapOtherContainerB.setEquipment(equipmentPlayerSlotsList[Number(swapOtherSlot)], itemA);
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        try {
                            swapContainerB.container.setItem(Number(swapSlot), itemB);
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 2:
                        console.warn("Mode: 2");
                        try {
                            swapContainerB.setEquipment(equipmentPlayerSlotsList[Number(swapSlot)], itemA);
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        try {
                            swapOtherContainerB.setEquipment(equipmentPlayerSlotsList[Number(swapOtherSlot)], itemB);
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                }
            }
            if (Boolean(transferItem) == true) {
                /*
    let moveFromSlotB: any
    moveFromSlotB = undefined*/
                let transferFromContainerB;
                transferFromContainerB = players[Number(transferFromContainer)].getComponent("inventory");
                switch (transferFromContainerType) {
                    case 4:
                        transferFromContainerB = transferFromContainerBlockB.getComponent("inventory");
                        break;
                }
                let transferToContainerB;
                transferToContainerB = players[Number(transferToContainer)].getComponent("inventory");
                switch (transferToContainerType) {
                    case 4:
                        transferToContainerB = transferToContainerBlockB.getComponent("inventory");
                        break;
                }
                try {
                    transferFromContainerB.container.transferItem(Number(transferFromSlot), transferToContainerB.container);
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(debug) == true) {
                console.warn("Form Values", r.formValues);
                console.warn(["Item Components: ", item.getComponents()]);
                console.warn(item.getTags());
                console.warn(players);
                console.warn(players[0]);
                console.warn(players[1]); /*
try {console.warn(item.getCanDestroy());} catch(e){
console.error(e, e.stack)};
try {console.warn(item.getCanPlaceOn());} catch(e){
console.error(e, e.stack)};*/
                console.warn(item.isStackable);
                console.warn(item.maxAmount);
                console.warn(item.type);
                console.warn(item.typeId);
                console.warn(item.nameTag);
                console.warn(item.getLore());
                try {
                    console.warn(["Damage: ", durability.damage]);
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                try {
                    console.warn(["Damage Chance: ", durability.getDamageChance()]);
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                try {
                    console.warn(["Damage Range: ", durability.getDamageChanceRange()]);
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                try {
                    console.warn(["Max Durability: ", durability.maxDurability]);
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                let componentList = [item.getComponents()[0].typeId];
                for (const index in players) {
                    if (Number(index) != 0) {
                        componentList = String([String(componentList), item.getComponents()[index].typeId]).split(",");
                    }
                }
                console.warn(String(["Item Components: " + String(componentList)]));
            }
            // Do something
        })
            .catch((e) => {
            console.error(e, e.stack);
        });
    })
        .catch((e) => {
        console.error(e, e.stack);
    });
}
//# sourceMappingURL=inventoryController.js.map