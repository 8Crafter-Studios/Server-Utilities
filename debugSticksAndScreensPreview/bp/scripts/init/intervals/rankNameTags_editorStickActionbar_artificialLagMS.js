import { system, world, SignSide } from "@minecraft/server";
import { patternColors } from "modules/chat/constants/patternColors";
import { patternColorsMap } from "modules/chat/constants/patternColorsMap";
import { patternFunctionList } from "modules/chat/constants/patternFunctionList";
import { evaluateChatColorType } from "modules/chat/functions/evaluateChatColorType";
try {
    repeatingIntervals.rankNameTags_editorStickActionbar_artificialLagMS =
        system.runInterval(() => {
            try {
                let playerList2 = world.getPlayers();
                try {
                    for (let index in playerList2) {
                        try {
                            if (playerList2[index].hasTag("showBlockActionBarDebugInfo") ||
                                (playerList2[index].isSneaking &&
                                    playerList2[index].heldItem?.typeId ==
                                        "andexdb:editor_stick")) {
                                let block = playerList2[index].getBlockFromViewDirection({
                                    includeLiquidBlocks: true,
                                    includePassableBlocks: true,
                                }).block;
                                let blockStates = Object.entries(block.permutation.getAllStates());
                                let blockStatesB;
                                blockStatesB = ["none"];
                                blockStates.forEach((s, i) => {
                                    try {
                                        blockStatesB[i] = `${s[0]}: §c${s[1]}`;
                                    }
                                    catch { }
                                });
                                const newActionBarText = `§b${block.typeId}
§l§eTags: §r§a${block.getTags().join(", ")}
§l§eBlock States: §r§a${blockStatesB.join("\n§a")}
§l§eIs Waterlogged: §r${((b) => (b ? "§2" : "§4") + String(b))(block.isWaterlogged)}
§l§eIs Air: §r${((b) => (b ? "§2" : "§4") + String(b))(block.isAir)}
§l§eIs Liquid: §r${((b) => (b ? "§2" : "§4") + String(b))(block.isLiquid)}
§l§eIs Solid: §r${((b) => (b ? "§2" : "§4") + String(b))(block.isSolid)}
§l§eRedstone Power: §r§c${block.getRedstonePower()}${!!block.getComponent("inventory")
                                    ? `
§l§eminecraft:inventory: §r§9{§eSlots Filled: §r§c${block.getComponent("inventory")
                                        .container.size -
                                        block.getComponent("inventory")
                                            .container.emptySlotsCount}§b/§c${block.getComponent("inventory")
                                        .container.size}§9}`
                                    : ""}${!!block.getComponent("piston")
                                    ? `
§l§eminecraft:piston: §r§9{§eIs Moving: §r${((b) => (b ? "§2" : "§4") + String(b))(block.getComponent("piston")
                                        .isMoving)}§a, §eState: §r§u${block.getComponent("piston").state}§a, §eAttatched Block Count: §r§c${block
                                        .getComponent("piston")
                                        .getAttachedBlocks().length}§9}`
                                    : ""}${!!block.getComponent("record_player")
                                    ? `
§l§eminecraft:recordPlayer: §r§9{§eIs Playing: §r${((b) => (b ? "§2" : "§4") + String(b))(block
                                        .getComponent("record_player")
                                        .isPlaying())}§9}`
                                    : ""}${!!block.getComponent("sign")
                                    ? `
§l§eminecraft:sign: §r§9{§eIs Waxed: §r${((b) => (b ? "§2" : "§4") + String(b))(block.getComponent("sign").isWaxed)}§a, §eF Dye: §r§u${block
                                        .getComponent("sign")
                                        .getTextDyeColor(SignSide.Front) ?? "null"}§a, §eB Dye: §r§u${block
                                        .getComponent("sign")
                                        .getTextDyeColor(SignSide.Back) ?? "null"}§a, §eF Text Length: §r§c${block
                                        .getComponent("sign")
                                        .getText(SignSide.Front)
                                        .length}§a, §eB Text Length: §r§c${block
                                        .getComponent("sign")
                                        .getText(SignSide.Back).length}§a, §eF Is Raw Text: §r${((b) => (b ? "§2" : "§4") + String(b))(!!tryget(() => block
                                        .getComponent("sign")
                                        .getRawText(SignSide.Front)))}§a, §eB Is Raw Text: §r${((b) => (b ? "§2" : "§4") + String(b))(!!tryget(() => block
                                        .getComponent("sign")
                                        .getRawText(SignSide.Back)))}§9}`
                                    : ""}${!!block.getComponent("fluidContainer")
                                    ? `
§l§eminecraft:fluidContainer: §r§9{§eFill Level: §r§c${block.getComponent("fluidContainer").fillLevel}§a, §eFluid Type: §r§c§a${block
                                        .getComponent("fluidContainer")
                                        .getFluidType()}, §eCustom Color: §r§c${JSON.stringify(block.getComponent("fluidContainer").fluidColor)}§9}`
                                    : ""}`;
                                playerList2[index].onScreenDisplay.setActionBar(newActionBarText +
                                    "\n".repeat(Math.max(0, newActionBarText.split("\n")
                                        .length - 12)));
                            }
                        }
                        catch (e) { }
                        if (config.chatRanks.showRanksOnPlayerNameTags) {
                            if (!playerList2[index].hasTag("doNotSetNameTag")) {
                                let nameFormatting = "";
                                let nameGradientMode = undefined;
                                let showDimension = false;
                                let showHealth = false;
                                if (playerList2[index].hasTag("nameFormatting:r")) {
                                    nameFormatting += "§r";
                                }
                                if (playerList2[index].hasTag("nameFormatting:o")) {
                                    nameFormatting += "§o";
                                }
                                if (playerList2[index].hasTag("nameFormatting:l")) {
                                    nameFormatting += "§l";
                                }
                                if (playerList2[index].hasTag("nameFormatting:k")) {
                                    nameFormatting += "§k";
                                }
                                if (playerList2[index].hasTag("nameColor:0")) {
                                    nameFormatting += "§0";
                                }
                                else {
                                    if (playerList2[index].hasTag("nameColor:1")) {
                                        nameFormatting += "§1";
                                    }
                                    else {
                                        if (playerList2[index].hasTag("nameColor:2")) {
                                            nameFormatting += "§2";
                                        }
                                        else {
                                            if (playerList2[index].hasTag("nameColor:3")) {
                                                nameFormatting += "§3";
                                            }
                                            else {
                                                if (playerList2[index].hasTag("nameColor:4")) {
                                                    nameFormatting += "§4";
                                                }
                                                else {
                                                    if (playerList2[index].hasTag("nameColor:5")) {
                                                        nameFormatting += "§5";
                                                    }
                                                    else {
                                                        if (playerList2[index].hasTag("nameColor:6")) {
                                                            nameFormatting +=
                                                                "§6";
                                                        }
                                                        else {
                                                            if (playerList2[index].hasTag("nameColor:7")) {
                                                                nameFormatting +=
                                                                    "§7";
                                                            }
                                                            else {
                                                                if (playerList2[index].hasTag("nameColor:8")) {
                                                                    nameFormatting +=
                                                                        "§8";
                                                                }
                                                                else {
                                                                    if (playerList2[index].hasTag("nameColor:9")) {
                                                                        nameFormatting +=
                                                                            "§9";
                                                                    }
                                                                    else {
                                                                        if (playerList2[index].hasTag("nameColor:a")) {
                                                                            nameFormatting +=
                                                                                "§a";
                                                                        }
                                                                        else {
                                                                            if (playerList2[index].hasTag("nameColor:b")) {
                                                                                nameFormatting +=
                                                                                    "§b";
                                                                            }
                                                                            else {
                                                                                if (playerList2[index].hasTag("nameColor:c")) {
                                                                                    nameFormatting +=
                                                                                        "§c";
                                                                                }
                                                                                else {
                                                                                    if (playerList2[index].hasTag("nameColor:d")) {
                                                                                        nameFormatting +=
                                                                                            "§d";
                                                                                    }
                                                                                    else {
                                                                                        if (playerList2[index].hasTag("nameColor:e")) {
                                                                                            nameFormatting +=
                                                                                                "§e";
                                                                                        }
                                                                                        else {
                                                                                            if (playerList2[index].hasTag("nameColor:f")) {
                                                                                                nameFormatting +=
                                                                                                    "§f";
                                                                                            }
                                                                                            else {
                                                                                                if (playerList2[index].hasTag("nameColor:g")) {
                                                                                                    nameFormatting +=
                                                                                                        "§g";
                                                                                                }
                                                                                                else {
                                                                                                    if (playerList2[index].hasTag("nameColor:h")) {
                                                                                                        nameFormatting +=
                                                                                                            "§h";
                                                                                                    }
                                                                                                    else {
                                                                                                        if (playerList2[index].hasTag("nameColor:i")) {
                                                                                                            nameFormatting +=
                                                                                                                "§i";
                                                                                                        }
                                                                                                        else {
                                                                                                            if (playerList2[index].hasTag("nameColor:j")) {
                                                                                                                nameFormatting +=
                                                                                                                    "§j";
                                                                                                            }
                                                                                                            else {
                                                                                                                if (playerList2[index].hasTag("nameColor:m")) {
                                                                                                                    nameFormatting +=
                                                                                                                        "§m";
                                                                                                                }
                                                                                                                else {
                                                                                                                    if (playerList2[index].hasTag("nameColor:n")) {
                                                                                                                        nameFormatting +=
                                                                                                                            "§n";
                                                                                                                    }
                                                                                                                    else {
                                                                                                                        if (playerList2[index].hasTag("nameColor:p")) {
                                                                                                                            nameFormatting +=
                                                                                                                                "§p";
                                                                                                                        }
                                                                                                                        else {
                                                                                                                            if (playerList2[index].hasTag("nameColor:q")) {
                                                                                                                                nameFormatting +=
                                                                                                                                    "§q";
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                if (playerList2[index].hasTag("nameColor:s")) {
                                                                                                                                    nameFormatting +=
                                                                                                                                        "§s";
                                                                                                                                }
                                                                                                                                else {
                                                                                                                                    if (playerList2[index].hasTag("nameColor:t")) {
                                                                                                                                        nameFormatting +=
                                                                                                                                            "§t";
                                                                                                                                    }
                                                                                                                                    else {
                                                                                                                                        if (playerList2[index].hasTag("nameColor:u")) {
                                                                                                                                            nameFormatting +=
                                                                                                                                                "§u";
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                playerList2[index]
                                    .getTags()
                                    .filter((v) => v.startsWith("nameColor:"))
                                    .forEach((v) => {
                                    if (patternColors.includes(v.slice(10).toLowerCase())) {
                                        nameFormatting +=
                                            patternColorsMap[v.slice(10).toLowerCase()];
                                    }
                                    else if (Object.keys(patternFunctionList).includes(v.slice(10).toLowerCase())) {
                                        nameGradientMode = v
                                            .slice(10)
                                            .toLowerCase();
                                    }
                                    else if ([
                                        "0",
                                        "1",
                                        "2",
                                        "3",
                                        "4",
                                        "5",
                                        "6",
                                        "7",
                                        "8",
                                        "9",
                                        "a",
                                        "b",
                                        "c",
                                        "d",
                                        "e",
                                        "f",
                                        "g",
                                        "h",
                                        "i",
                                        "j",
                                        "m",
                                        "n",
                                        "p",
                                        "q",
                                        "s",
                                        "t",
                                        "u",
                                    ].includes(v.slice(13).toLowerCase())) {
                                        undefined;
                                    }
                                });
                                playerList2[index]
                                    .getTags()
                                    .filter((v) => v.startsWith("nameFormatting:"))
                                    .forEach((v) => {
                                    if (["r", "o", "l", "k"].includes(v.slice(15).toLowerCase())) {
                                        undefined;
                                    }
                                    else {
                                        nameFormatting += v
                                            .slice(15)
                                            .toLowerCase();
                                    }
                                });
                                if (playerList2[index].hasTag("config:health")) {
                                    showHealth = true;
                                }
                                if (playerList2[index].hasTag("config:dimension")) {
                                    showDimension = true;
                                }
                                let nameb = playerList2[index].hasTag("nameTagUseSudo")
                                    ? !!nameGradientMode
                                        ? evaluateChatColorType(playerList2[index]
                                            .getTags()
                                            .find((t) => t.startsWith(String(playerList2[index].getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ??
                                            world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ??
                                            "sudo:")))
                                            .slice(String(playerList2[index].getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ??
                                            world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ??
                                            "sudo:").length), nameGradientMode)
                                        : playerList2[index]
                                            .getTags()
                                            .find((t) => t.startsWith(String(playerList2[index].getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ??
                                            world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ??
                                            "sudo:")))
                                            .slice(String(playerList2[index].getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ??
                                            world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ??
                                            "sudo:").length)
                                    : !!playerList2[index]
                                        .getTags()
                                        .find((t) => t.startsWith("nameTagSudo:"))
                                        ? !!nameGradientMode
                                            ? evaluateChatColorType(tryget(() => playerList2[index]
                                                .getTags()
                                                .find((t) => t.startsWith("nameTagSudo:"))
                                                .slice(12)), nameGradientMode)
                                            : tryget(() => playerList2[index]
                                                .getTags()
                                                .find((t) => t.startsWith("nameTagSudo:"))
                                                .slice(12))
                                        : playerList2[index].hasTag("chatHideNameTag")
                                            ? ""
                                            : playerList2[index].hasTag("chatUseNameTag")
                                                ? !!nameGradientMode
                                                    ? evaluateChatColorType(playerList2[index].nameTag, nameGradientMode)
                                                    : playerList2[index].nameTag
                                                : !!nameGradientMode
                                                    ? evaluateChatColorType(playerList2[index].name, nameGradientMode)
                                                    : playerList2[index].name;
                                let indexb = index;
                                let rank = playerList2[indexb]
                                    .getTags()
                                    .filter((t) => t.startsWith(String(playerList2[indexb].getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ??
                                    world.getDynamicProperty("andexdbSettings:chatRankPrefix") ??
                                    "rank:")))
                                    .map((t, index, array) => {
                                    let rank = t.slice(String(playerList2[indexb].getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ??
                                        world.getDynamicProperty("andexdbSettings:chatRankPrefix") ??
                                        "rank:").length);
                                    let tags = playerList2[indexb].getTags();
                                    return eval(`\`${String(world.getDynamicProperty("andexdbSettings:rankTemplateString") ?? "[${rank}§r§f]")}\``);
                                })
                                    .join(String(playerList2[indexb].getDynamicProperty("andexdbPersonalSettings:rankDisplaySeparator") ??
                                    config.chatRanks.rankDisplaySeparator));
                                if (rank == "") {
                                    let tags = playerList2[indexb].getTags();
                                    rank = eval(`\`${String(world.getDynamicProperty("andexdbSettings:defaultRankTemplateString") ?? "")}\``);
                                }
                                let dimension = dimensionTypeDisplayFormattingE[playerList2[index].dimension.id];
                                const currentHealth = playerList2[indexb].getComponent("health").currentValue;
                                const maxHealth = playerList2[indexb].getComponent("health").effectiveMax;
                                playerList2[indexb].nameTag =
                                    eval(config.chatRanks.nameTagTemplateString ?? `\`${'${(showDimension ? `[${dimension}§r§f] ` : "")}${rank} ${nameb}${(showHealth ? `§r§f[${currentHealth}/${maxHealth}] ` : "")}'}\``); /*(
    playerList2[index].hasTag("nameTagUseSudo")?
    playerList2[index].getTags().find(t=>t.startsWith(String(playerList2[index].getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:")))
    .slice(String(playerList2[index].getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:").length):
    tryget(()=>playerList2[index].getTags().find(t=>t.startsWith("nameTagSudo:")).slice(12))??playerList2[index].name
)*/
                            }
                        }
                        try {
                            if (playerList2[index].hasTag("isSneaking")) {
                                try {
                                    playerList2[index].isSneaking = true;
                                    if (playerList2[index].hasTag("scriptDebugger2")) {
                                        console.warn(playerList2[index].nameTag, playerList2[index].isSneaking);
                                    }
                                }
                                catch (e) {
                                    if (playerList2[index].hasTag("scriptDebugger")) {
                                        console.error(e, e.stack);
                                    }
                                }
                            }
                        }
                        catch (e) {
                            if (playerList2[index].hasTag("scriptDebugger")) {
                                console.error(e, e.stack);
                            }
                        }
                    }
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            catch (e) {
                console.error(e, e.stack);
            }
            if (config.system.artificialLagMS != 0 &&
                !isNaN(config.system.artificialLagMS)) {
                const endTime = Date.now() + config.system.artificialLagMS;
                while (Date.now() < endTime) { }
            }
        }, 2);
}
catch (e) {
    console.error(e, e.stack);
}
//# sourceMappingURL=rankNameTags_editorStickActionbar_artificialLagMS.js.map