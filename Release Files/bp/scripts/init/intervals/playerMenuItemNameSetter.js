import { system, world } from "@minecraft/server";
import { entityToContainerSlotArray } from "modules/command_utilities/functions/entityToContainerSlotArray";
repeatingIntervals.playerMenuItemNameSetter = system.runInterval(() => {
    const name = config.ui.menus.playerMenu.itemName;
    world.getAllPlayers().forEach((player) => {
        try {
            entityToContainerSlotArray(player).forEach(s => {
                if (s.hasItem() && s.typeId === "andexdb:player_menu" && s.nameTag !== name && !s.getDynamicProperty("keep_current_item_name")) {
                    s.nameTag = name;
                }
            });
        }
        catch (e) {
            console.error(e, e.stack);
        }
    });
}, 1);
//# sourceMappingURL=playerMenuItemNameSetter.js.map