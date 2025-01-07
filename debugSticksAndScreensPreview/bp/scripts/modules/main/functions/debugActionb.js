import { Block, Player, BlockStates, system, BlockPermutation } from "@minecraft/server";
import { customModulo } from "modules/utilities/functions/customModulo";
export function debugActionb(block, player, mode, direction) {
    if (player.getDynamicProperty("debugStickSelectedBlock") != block.typeId) {
        player.setDynamicProperty("debugStickSelectedBlock", block.typeId);
        if (Object.entries(block.permutation.getAllStates()).findIndex((entry) => entry[0] ==
            player.getDynamicProperty("debugStickPropertyIndexName")) == -1 &&
            (player.getDynamicProperty("debugStickPropertyIndexName") !=
                "waterlogged" ||
                !block.type.canBeWaterlogged)) {
            player.setDynamicProperty("debugStickPropertyIndex", 0);
            player.setDynamicProperty("debugStickPropertyIndexName", "");
        }
        else {
            player.setDynamicProperty("debugStickPropertyIndex", Object.entries(block.permutation.getAllStates()).findIndex((entry) => entry[0] ==
                player.getDynamicProperty("debugStickPropertyIndexName")));
        }
        player.setDynamicProperty("debugStickPropertyIndexIndex", 0);
    }
    else {
        if (Object.entries(block.permutation.getAllStates()).length +
            Number(block.type.canBeWaterlogged) !=
            0) {
            if (mode == 1) {
                if (direction == 1) {
                    player.setDynamicProperty("debugStickPropertyIndex", Number(customModulo(Number(player.getDynamicProperty("debugStickPropertyIndex")) - 1, 0, Object.entries(block.permutation.getAllStates())
                        .length +
                        Number(block.type.canBeWaterlogged))));
                    if (player.getDynamicProperty("debugStickPropertyIndex") ==
                        Object.entries(block.permutation.getAllStates()).length) {
                        player.setDynamicProperty("debugStickPropertyIndexName", "waterlogged");
                    }
                    else {
                        player.setDynamicProperty("debugStickPropertyIndexName", Object.entries(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))][0]);
                    }
                }
                else {
                    player.setDynamicProperty("debugStickPropertyIndex", Number(customModulo(Number(player.getDynamicProperty("debugStickPropertyIndex")) + 1, 0, Object.entries(block.permutation.getAllStates())
                        .length +
                        Number(block.type.canBeWaterlogged))));
                    if (player.getDynamicProperty("debugStickPropertyIndex") ==
                        Object.entries(block.permutation.getAllStates()).length) {
                        player.setDynamicProperty("debugStickPropertyIndexName", "waterlogged");
                    }
                    else {
                        player.setDynamicProperty("debugStickPropertyIndexName", Object.entries(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))][0]);
                    }
                }
            }
            else {
                if (mode == 0) {
                    if (player.getDynamicProperty("debugStickPropertyIndexName") == "waterlogged") {
                        player.setDynamicProperty("debugStickPropertyIndexIndex", 1 - Number(block.isWaterlogged));
                    }
                    else {
                        if (direction == 1) {
                            player.setDynamicProperty("debugStickPropertyIndexIndex", customModulo(BlockStates.getAll()
                                .find((state) => state.id ==
                                Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))])
                                .validValues.findIndex((value) => value ==
                                Object.entries(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))][1]) - 1, 0, BlockStates.getAll().find((state) => state.id ==
                                Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))]).validValues.length));
                        }
                        else {
                            player.setDynamicProperty("debugStickPropertyIndexIndex", customModulo(BlockStates.getAll()
                                .find((state) => state.id ==
                                Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))])
                                .validValues.findIndex((value) => value ==
                                Object.entries(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))][1]) + 1, 0, BlockStates.getAll().find((state) => state.id ==
                                Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))]).validValues.length));
                        }
                    }
                }
            }
        }
    } /*BlockStates.getAll().forEach((stateb)=>{player.sendMessage(stateb.id + ": " + stateb.validValues)}); */ /*let test = Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))]; console.warn(Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))] + "\n" + String(Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))]) + "\n" + test + "\n" + BlockStates.getAll()[BlockStates.getAll().length-2].id + BlockStates.getAll().findIndex((statec)=>{console.warn("\"" + String(statec.id) + "\", \"" + String(Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))]) + "\""); statec.id == test})); */
    if (Object.entries(block.permutation.getAllStates()).length +
        Number(block.type.canBeWaterlogged) !=
        0) {
        if (mode == 0) {
            if (player.getDynamicProperty("debugStickPropertyIndexName") ==
                "waterlogged") {
                system.run(() => {
                    block.setWaterlogged(Boolean(1 - Number(block.isWaterlogged)));
                    player.onScreenDisplay.setActionBar(`"waterlogged" to ${block.isWaterlogged}`);
                });
            }
            else {
                let permutation = Object.entries(block.permutation.getAllStates());
                permutation[Number(player.getDynamicProperty("debugStickPropertyIndex"))][1] = BlockStates.getAll().find((state) => state.id ==
                    Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))]).validValues[Number(player.getDynamicProperty("debugStickPropertyIndexIndex"))];
                system.run(() => {
                    player.onScreenDisplay.setActionBar(`"${Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))]}" to ${permutation[Number(player.getDynamicProperty("debugStickPropertyIndex"))][1]}`);
                    block.setPermutation(BlockPermutation.resolve(block.typeId, Object.fromEntries(permutation)));
                });
            }
        }
        else {
            if (mode == 1) {
                let permutation = Object.entries(block.permutation.getAllStates());
                if (true /*typeof Object.values(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))] == typeof String*/) {
                    if (player.getDynamicProperty("debugStickPropertyIndexName") == "waterlogged") {
                        system.run(() => {
                            player.onScreenDisplay.setActionBar(`selected "waterlogged" (${block.isWaterlogged})`);
                        });
                    }
                    else {
                        system.run(() => {
                            player.onScreenDisplay.setActionBar(`selected "${permutation[Number(player.getDynamicProperty("debugStickPropertyIndex"))][0]}" (${Object.values(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))]})`);
                        });
                    }
                }
                else {
                    system.run(() => {
                        player.onScreenDisplay.setActionBar(`selected "${permutation[Number(player.getDynamicProperty("debugStickPropertyIndex"))][0]}" ${Object.values(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))]}`);
                    });
                }
            }
        }
    }
    if (Object.entries(block.permutation.getAllStates()).length +
        Number(block.type.canBeWaterlogged) ==
        0) {
        system.run(() => {
            player.onScreenDisplay.setActionBar(`${block.typeId} has no properties`);
        });
    } /*
    console.warn(Object.entries(block.permutation.getAllStates()))*/
}
//# sourceMappingURL=debugActionb.js.map