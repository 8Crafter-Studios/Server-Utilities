import { system, world, SignSide } from "@minecraft/server";
import { patternColors } from "modules/chat/constants/patternColors";
import { patternColorsMap } from "modules/chat/constants/patternColorsMap";
import { patternFunctionList } from "modules/chat/constants/patternFunctionList";
import { chatSend_getPlayerPersonalSettings } from "modules/chat/functions/chatSendMessageEvaluator";
import { evaluateChatColorType } from "modules/chat/functions/evaluateChatColorType";
import { rankNameTagEvaluator, rankNameTagEvaluator_getChatMessageFormatFromPlayerTags, rankNameTagEvaluator_getDisplayNameFromPlayer, rankNameTagEvaluator_getPlayerPersonalSettings, rankNameTagEvaluator_getRanksFromPlayerTags, rankNameTagEvaluator_players, rankNameTagEvaluator_prePlayers } from "modules/chat/functions/rankNameTagEvaluator";
try {
    repeatingIntervals.rankNameTags_editorStickActionbar_artificialLagMS = system.runInterval(() => {
        try {
            let playerList2 = world.getPlayers();
            try {
                for (let index in playerList2) {
                    try {
                        if (playerList2[index].hasTag("showBlockActionBarDebugInfo") ||
                            (playerList2[index].isSneaking && playerList2[index].heldItem?.typeId == "andexdb:editor_stick")) {
                            let block = playerList2[index].getBlockFromViewDirection({
                                includeLiquidBlocks: true,
                                includePassableBlocks: true,
                            })?.block;
                            assertIsDefined(block);
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
§l§eminecraft:inventory: §r§9{§eSlots Filled: §r§c${block.getComponent("inventory")?.container?.size -
                                    block.getComponent("inventory")?.container?.emptySlotsCount}§b/§c${block.getComponent("inventory")?.container?.size}§9}`
                                : ""}${!!block.getComponent("piston")
                                ? `
§l§eminecraft:piston: §r§9{§eIs Moving: §r${((b) => (b ? "§2" : "§4") + String(b))(block.getComponent("piston")?.isMoving)}§a, §eState: §r§u${block.getComponent("piston")?.state}§a, §eAttatched Block Count: §r§c${block.getComponent("piston")?.getAttachedBlocks().length}§9}`
                                : ""}${!!block.getComponent("record_player")
                                ? `
§l§eminecraft:recordPlayer: §r§9{§eIs Playing: §r${((b) => (b ? "§2" : "§4") + String(b))(block.getComponent("record_player")?.isPlaying())}§9}`
                                : ""}${!!block.getComponent("sign")
                                ? `
§l§eminecraft:sign: §r§9{§eIs Waxed: §r${((b) => (b ? "§2" : "§4") + String(b))(block.getComponent("sign")?.isWaxed)}§a, §eF Dye: §r§u${block.getComponent("sign")?.getTextDyeColor(SignSide.Front) ?? "null"}§a, §eB Dye: §r§u${block.getComponent("sign")?.getTextDyeColor(SignSide.Back) ?? "null"}§a, §eF Text Length: §r§c${block.getComponent("sign")?.getText(SignSide.Front)?.length}§a, §eB Text Length: §r§c${block.getComponent("sign")?.getText(SignSide.Back)?.length}§a, §eF Is Raw Text: §r${((b) => (b ? "§2" : "§4") + String(b))(!!tryget(() => block.getComponent("sign")?.getRawText(SignSide.Front)))}§a, §eB Is Raw Text: §r${((b) => (b ? "§2" : "§4") + String(b))(!!tryget(() => block.getComponent("sign")?.getRawText(SignSide.Back)))}§9}`
                                : ""}${!!block.getComponent("fluidContainer")
                                ? `
§l§eminecraft:fluidContainer: §r§9{§eFill Level: §r§c${block.getComponent("fluidContainer")?.fillLevel}§a, §eFluid Type: §r§c§a${block
                                    .getComponent("fluidContainer")
                                    ?.getFluidType()}, §eCustom Color: §r§c${JSON.stringify(block.getComponent("fluidContainer")?.fluidColor)}§9}`
                                : ""}`;
                            playerList2[index].onScreenDisplay.setActionBar(newActionBarText + "\n".repeat(Math.max(0, newActionBarText.split("\n").length - 12)));
                        }
                    }
                    catch (e) { }
                    if (config.chatRanks.showRanksOnPlayerNameTags) {
                        try {
                            if (!playerList2[index].hasTag("doNotSetNameTag")) {
                                const player = playerList2[index];
                                const playerPersonalSettings = rankNameTagEvaluator_getPlayerPersonalSettings(player);
                                const msgFormatFromTags = rankNameTagEvaluator_getChatMessageFormatFromPlayerTags(player);
                                const options = {
                                    isPlaceholderPlayer: false,
                                    player,
                                    isPlaceholderTargetPlayer: undefined,
                                    targetPlayer: undefined,
                                    allowEval: true,
                                    dimension: player.dimension.id,
                                    // messageFormatting,
                                    // messageGradientMode,
                                    // nameFormatting,
                                    // nameGradientMode,
                                    playerPersonalSettings,
                                    ranks: rankNameTagEvaluator_getRanksFromPlayerTags(player, { playerPersonalSettings: playerPersonalSettings }),
                                    // separatorFormatting,
                                    // separatorGradientMode,
                                    // showDimension,
                                    tags: player.getTags(),
                                    targetPlayerSettings: undefined,
                                    ...msgFormatFromTags,
                                };
                                const prePlayersOutput = rankNameTagEvaluator_prePlayers(rankNameTagEvaluator_getDisplayNameFromPlayer(player, { playerPersonalSettings: playerPersonalSettings }), options);
                                const newNameTag = rankNameTagEvaluator_players(prePlayersOutput, options);
                                player.nameTag = newNameTag;
                            }
                        }
                        catch (e) {
                            console.error(e, e.stack);
                            world
                                .getPlayers({ tags: ["getNameTagRankSettingsErrors"] })
                                .forEach((p) => p.sendMessage("§cError while setting " +
                                tryget(() => playerList2[index].name) +
                                "'s name tag in rankNameTags_editorStickActionbar_artificialLagMS: " +
                                e +
                                e.stack));
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
        if (config.system.artificialLagMS != 0 && !isNaN(config.system.artificialLagMS)) {
            const endTime = Date.now() + config.system.artificialLagMS;
            while (Date.now() < endTime) { }
        }
    }, 2);
}
catch (e) {
    console.error(e, e.stack);
}
//# sourceMappingURL=rankNameTags_editorStickActionbar_artificialLagMS.js.map