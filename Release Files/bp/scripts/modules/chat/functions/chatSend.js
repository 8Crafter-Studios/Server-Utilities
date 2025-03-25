import { Player, ChatSendBeforeEvent, world } from "@minecraft/server";
import { config } from "init/classes/config";
import { patternColors } from "modules/chat/constants/patternColors";
import { patternColorsMap } from "modules/chat/constants/patternColorsMap";
import { patternFunctionList } from "modules/chat/constants/patternFunctionList";
import { evaluateChatColorType } from "./evaluateChatColorType";
import { chatSend_getChatMessageFormatFromPlayerTags, chatSend_getDisplayNameFromPlayer, chatSend_getPlayerPersonalSettings, chatSend_getRanksFromPlayerTags, chatSend_getTargetPlayerSettings, chatSendMessageEvaluator, chatSendMessageEvaluator_players, chatSendMessageEvaluator_prePlayers } from "./chatSendMessageEvaluator";
export function chatSend(params) {
    let returnBeforeChatSend = params.returnBeforeChatSend;
    let player = params.player;
    let eventData = params.eventData;
    let event = params.event;
    let newMessage = params.newMessage;
    if (config.antiSpamSystem.antispamEnabled) {
        if (!player.hasTag("canBypassAntiSpam")) {
            if ( /*
                globalThis["lastChatMessage" + player.id] == event.message &&*/Date.now() - ((globalThis["msgAmountOfSpam" + player.id] >= config.antiSpamSystem.antispamTriggerMessageCount ? globalThis["antiSpamMuteStartTime" + player.id] : globalThis["lastChatTime" + player.id]) ?? 0) <
                config.antiSpamSystem.waitTimeAfterAntispamActivation * 1000) {
                globalThis["msgAmountOfSpam" + player.id] = (globalThis["msgAmountOfSpam" + player.id] ?? 0) + 1;
                if (globalThis["msgAmountOfSpam" + player.id] >= config.antiSpamSystem.antispamTriggerMessageCount) {
                    if (globalThis["msgAmountOfSpam" + player.id] == config.antiSpamSystem.antispamTriggerMessageCount || config.antiSpamSystem.restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute) {
                        globalThis["antiSpamMuteStartTime" + player.id] = Date.now();
                    }
                    returnBeforeChatSend = true;
                    event.cancel = true;
                    const remainingSeconds = (((globalThis["antiSpamMuteStartTime" + player.id] ?? 0) + (config.antiSpamSystem.waitTimeAfterAntispamActivation * 1000) - Date.now()) / 1000).ceil();
                    player.sendMessage("§cStop Spamming!§r You are muted for " + remainingSeconds + " second" + (remainingSeconds === 1 ? "" : "s") + ".");
                }
            }
            else {
                globalThis["msgAmountOfSpam" + player.id] = 0;
            }
            globalThis["lastChatMessage" + player.id] = event.message;
            globalThis["lastChatTime" + player.id] = Date.now();
        }
    }
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:chatSendComplete")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("chatSendBeforeEventDebugErrors")) {
            currentplayer.sendMessage((e + " " + e.stack));
        } });
    }
    if (returnBeforeChatSend)
        return;
    const playerPersonalSettings = chatSend_getPlayerPersonalSettings(player);
    const msgFormatFromTags = chatSend_getChatMessageFormatFromPlayerTags(player);
    // let messageFormatting: string = msgFormatFromTags.messageFormatting;
    // let messageGradientMode: string = msgFormatFromTags.messageGradientMode;
    // let nameFormatting: string = msgFormatFromTags.nameFormatting;
    // let nameGradientMode: string = msgFormatFromTags.nameGradientMode;
    // let separatorFormatting: string = msgFormatFromTags.separatorFormatting;
    // let separatorGradientMode: string = msgFormatFromTags.separatorGradientMode;
    // let showDimension: boolean = msgFormatFromTags.showDimension;
    const time = Date.now();
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
        ranks: chatSend_getRanksFromPlayerTags(player, { playerPersonalSettings: playerPersonalSettings }),
        // separatorFormatting,
        // separatorGradientMode,
        // showDimension,
        tags: player.getTags(),
        targetPlayerSettings: undefined,
        time,
        ...msgFormatFromTags,
    };
    const prePlayersOutput = chatSendMessageEvaluator_prePlayers(newMessage, chatSend_getDisplayNameFromPlayer(player, { playerPersonalSettings: playerPersonalSettings }), options);
    //    let showHealth = false
    /* if (player.hasTag('messageFormatting:r')) { messageFormatting += "§r"; };
    if (player.hasTag('messageFormatting:o')) { messageFormatting += "§o"; };
    if (player.hasTag('messageFormatting:l')) { messageFormatting += "§l"; };
    if (player.hasTag('messageFormatting:k')) { messageFormatting += "§k"; };
    if (player.hasTag('messageColor:0')) { messageFormatting += "§0"; } else {
        if (player.hasTag('messageColor:1')) { messageFormatting += "§1"; } else {
            if (player.hasTag('messageColor:2')) { messageFormatting += "§2"; } else {
                if (player.hasTag('messageColor:3')) { messageFormatting += "§3"; } else {
                    if (player.hasTag('messageColor:4')) { messageFormatting += "§4"; } else {
                        if (player.hasTag('messageColor:5')) { messageFormatting += "§5"; } else {
                            if (player.hasTag('messageColor:6')) { messageFormatting += "§6"; } else {
                                if (player.hasTag('messageColor:7')) { messageFormatting += "§7"; } else {
                                    if (player.hasTag('messageColor:8')) { messageFormatting += "§8"; } else {
                                        if (player.hasTag('messageColor:9')) { messageFormatting += "§9"; } else {
                                            if (player.hasTag('messageColor:a')) { messageFormatting += "§a"; } else {
                                                if (player.hasTag('messageColor:b')) { messageFormatting += "§b"; } else {
                                                    if (player.hasTag('messageColor:c')) { messageFormatting += "§c"; } else {
                                                        if (player.hasTag('messageColor:d')) { messageFormatting += "§d"; } else {
                                                            if (player.hasTag('messageColor:e')) { messageFormatting += "§e"; } else {
                                                                if (player.hasTag('messageColor:f')) { messageFormatting += "§f"; } else {
                                                                    if (player.hasTag('messageColor:g')) { messageFormatting += "§g"; } else {
                                                                        if (player.hasTag('messageColor:h')) { messageFormatting += "§h"; } else {
                                                                            if (player.hasTag('messageColor:i')) { messageFormatting += "§i"; } else {
                                                                                if (player.hasTag('messageColor:j')) { messageFormatting += "§j"; } else {
                                                                                    if (player.hasTag('messageColor:m')) { messageFormatting += "§m"; } else {
                                                                                        if (player.hasTag('messageColor:n')) { messageFormatting += "§n"; } else {
                                                                                            if (player.hasTag('messageColor:p')) { messageFormatting += "§p"; } else {
                                                                                                if (player.hasTag('messageColor:q')) { messageFormatting += "§q"; } else {
                                                                                                    if (player.hasTag('messageColor:s')) { messageFormatting += "§s"; } else {
                                                                                                        if (player.hasTag('messageColor:t')) { messageFormatting += "§t"; } else {
                                                                                                            if (player.hasTag('messageColor:u')) { messageFormatting += "§u"; };
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
    player.getTags().filter(v => v.startsWith("messageColor:")).forEach(v => {
        if (patternColors.includes(v.slice(13).toLowerCase())) {
            messageFormatting += patternColorsMap[v.slice(13).toLowerCase() as keyof typeof patternColorsMap];
        } else if (Object.keys(patternFunctionList).includes(v.slice(13).toLowerCase())) {
            messageGradientMode = v.slice(13).toLowerCase();
        } else if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'm', 'n', 'p', 'q', 's', 't', 'u'].includes(v.slice(13).toLowerCase())) {
            undefined;
        }
    });
    player.getTags().filter(v => v.startsWith("messageFormatting:")).forEach(v => {
        if (['r', 'o', 'l', 'k'].includes(v.slice(18).toLowerCase())) {
            undefined;
        } else {
            messageFormatting += v.slice(18).toLowerCase();
        }
    });
    if (player.hasTag('nameFormatting:r')) { nameFormatting += "§r"; };
    if (player.hasTag('nameFormatting:o')) { nameFormatting += "§o"; };
    if (player.hasTag('nameFormatting:l')) { nameFormatting += "§l"; };
    if (player.hasTag('nameFormatting:k')) { nameFormatting += "§k"; };
    if (player.hasTag('nameColor:0')) { nameFormatting += "§0"; } else {
        if (player.hasTag('nameColor:1')) { nameFormatting += "§1"; } else {
            if (player.hasTag('nameColor:2')) { nameFormatting += "§2"; } else {
                if (player.hasTag('nameColor:3')) { nameFormatting += "§3"; } else {
                    if (player.hasTag('nameColor:4')) { nameFormatting += "§4"; } else {
                        if (player.hasTag('nameColor:5')) { nameFormatting += "§5"; } else {
                            if (player.hasTag('nameColor:6')) { nameFormatting += "§6"; } else {
                                if (player.hasTag('nameColor:7')) { nameFormatting += "§7"; } else {
                                    if (player.hasTag('nameColor:8')) { nameFormatting += "§8"; } else {
                                        if (player.hasTag('nameColor:9')) { nameFormatting += "§9"; } else {
                                            if (player.hasTag('nameColor:a')) { nameFormatting += "§a"; } else {
                                                if (player.hasTag('nameColor:b')) { nameFormatting += "§b"; } else {
                                                    if (player.hasTag('nameColor:c')) { nameFormatting += "§c"; } else {
                                                        if (player.hasTag('nameColor:d')) { nameFormatting += "§d"; } else {
                                                            if (player.hasTag('nameColor:e')) { nameFormatting += "§e"; } else {
                                                                if (player.hasTag('nameColor:f')) { nameFormatting += "§f"; } else {
                                                                    if (player.hasTag('nameColor:g')) { nameFormatting += "§g"; } else {
                                                                        if (player.hasTag('nameColor:h')) { nameFormatting += "§h"; } else {
                                                                            if (player.hasTag('nameColor:i')) { nameFormatting += "§i"; } else {
                                                                                if (player.hasTag('nameColor:j')) { nameFormatting += "§j"; } else {
                                                                                    if (player.hasTag('nameColor:m')) { nameFormatting += "§m"; } else {
                                                                                        if (player.hasTag('nameColor:n')) { nameFormatting += "§n"; } else {
                                                                                            if (player.hasTag('nameColor:p')) { nameFormatting += "§p"; } else {
                                                                                                if (player.hasTag('nameColor:q')) { nameFormatting += "§q"; } else {
                                                                                                    if (player.hasTag('nameColor:s')) { nameFormatting += "§s"; } else {
                                                                                                        if (player.hasTag('nameColor:t')) { nameFormatting += "§t"; } else {
                                                                                                            if (player.hasTag('nameColor:u')) { nameFormatting += "§u"; };
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
    player.getTags().filter(v => v.startsWith("nameColor:")).forEach(v => {
        if (patternColors.includes(v.slice(10).toLowerCase())) {
            nameFormatting += patternColorsMap[v.slice(10).toLowerCase() as keyof typeof patternColorsMap];
        } else if (Object.keys(patternFunctionList).includes(v.slice(10).toLowerCase())) {
            nameGradientMode = v.slice(10).toLowerCase();
        } else if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'm', 'n', 'p', 'q', 's', 't', 'u'].includes(v.slice(13).toLowerCase())) {
            undefined;
        }
    });
    player.getTags().filter(v => v.startsWith("nameFormatting:")).forEach(v => {
        if (['r', 'o', 'l', 'k'].includes(v.slice(15).toLowerCase())) {
            undefined;
        } else {
            nameFormatting += v.slice(15).toLowerCase();
        }
    });
    if (player.hasTag('separatorFormatting:r')) { separatorFormatting += "§r"; };
    if (player.hasTag('separatorFormatting:o')) { separatorFormatting += "§o"; };
    if (player.hasTag('separatorFormatting:l')) { separatorFormatting += "§l"; };
    if (player.hasTag('separatorFormatting:k')) { separatorFormatting += "§k"; };
    if (player.hasTag('separatorColor:0')) { separatorFormatting += "§0"; } else {
        if (player.hasTag('separatorColor:1')) { separatorFormatting += "§1"; } else {
            if (player.hasTag('separatorColor:2')) { separatorFormatting += "§2"; } else {
                if (player.hasTag('separatorColor:3')) { separatorFormatting += "§3"; } else {
                    if (player.hasTag('separatorColor:4')) { separatorFormatting += "§4"; } else {
                        if (player.hasTag('separatorColor:5')) { separatorFormatting += "§5"; } else {
                            if (player.hasTag('separatorColor:6')) { separatorFormatting += "§6"; } else {
                                if (player.hasTag('separatorColor:7')) { separatorFormatting += "§7"; } else {
                                    if (player.hasTag('separatorColor:8')) { separatorFormatting += "§8"; } else {
                                        if (player.hasTag('separatorColor:9')) { separatorFormatting += "§9"; } else {
                                            if (player.hasTag('separatorColor:a')) { separatorFormatting += "§a"; } else {
                                                if (player.hasTag('separatorColor:b')) { separatorFormatting += "§b"; } else {
                                                    if (player.hasTag('separatorColor:c')) { separatorFormatting += "§c"; } else {
                                                        if (player.hasTag('separatorColor:d')) { separatorFormatting += "§d"; } else {
                                                            if (player.hasTag('separatorColor:e')) { separatorFormatting += "§e"; } else {
                                                                if (player.hasTag('separatorColor:f')) { separatorFormatting += "§f"; } else {
                                                                    if (player.hasTag('separatorColor:g')) { separatorFormatting += "§g"; } else {
                                                                        if (player.hasTag('separatorColor:h')) { separatorFormatting += "§h"; } else {
                                                                            if (player.hasTag('separatorColor:i')) { separatorFormatting += "§i"; } else {
                                                                                if (player.hasTag('separatorColor:j')) { separatorFormatting += "§j"; } else {
                                                                                    if (player.hasTag('separatorColor:m')) { separatorFormatting += "§m"; } else {
                                                                                        if (player.hasTag('separatorColor:n')) { separatorFormatting += "§n"; } else {
                                                                                            if (player.hasTag('separatorColor:p')) { separatorFormatting += "§p"; } else {
                                                                                                if (player.hasTag('separatorColor:q')) { separatorFormatting += "§q"; } else {
                                                                                                    if (player.hasTag('separatorColor:s')) { separatorFormatting += "§s"; } else {
                                                                                                        if (player.hasTag('separatorColor:t')) { separatorFormatting += "§t"; } else {
                                                                                                            if (player.hasTag('separatorColor:u')) { separatorFormatting += "§u"; };
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
    player.getTags().filter(v => v.startsWith("separatorColor:")).forEach(v => {
        if (patternColors.includes(v.slice(15).toLowerCase())) {
            separatorFormatting += patternColorsMap[v.slice(15).toLowerCase() as keyof typeof patternColorsMap];
        } else if (Object.keys(patternFunctionList).includes(v.slice(15).toLowerCase())) {
            separatorGradientMode = v.slice(15).toLowerCase();
        } else if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'm', 'n', 'p', 'q', 's', 't', 'u'].includes(v.slice(13).toLowerCase())) {
            undefined;
        }
    });
    player.getTags().filter(v => v.startsWith("separatorFormatting:")).forEach(v => {
        if (['r', 'o', 'l', 'k'].includes(v.slice(20).toLowerCase())) {
            undefined;
        } else {
            separatorFormatting += v.slice(20).toLowerCase();
        }
    });
    if (player.hasTag('config:dimension')) { showDimension = true; };
    if (player.hasTag('config:chatdimension')) { showDimension = true; };
    if (messageFormatting == "") { messageFormatting = String(player.getDynamicProperty("andexdbPersonalSettings:defaultMessageFormatting") ?? world.getDynamicProperty("andexdbSettings:defaultMessageFormatting") ?? ""); }
    if (nameFormatting == "") { nameFormatting = String(player.getDynamicProperty("andexdbPersonalSettings:defaultNameFormatting") ?? world.getDynamicProperty("andexdbSettings:defaultNameFormatting") ?? ""); }
    if (separatorFormatting == "") { separatorFormatting = String(player.getDynamicProperty("andexdbPersonalSettings:defaultSeparatorFormatting") ?? world.getDynamicProperty("andexdbSettings:defaultSeparatorFormatting") ?? ""); } */
    /* let rank = player.getTags().filter(t => t.startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:")))
        .map(t => String(player.getDynamicProperty("andexdbPersonalSettings:rankDisplayPrefix") ?? world.getDynamicProperty("andexdbSettings:rankDisplayPrefix") ?? "[") +
            t.slice(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:").length) +
            String(player.getDynamicProperty("andexdbPersonalSettings:rankDisplaySuffix") ?? world.getDynamicProperty("andexdbSettings:rankDisplaySuffix") ?? "]"))
        .join(String(
            player.getDynamicProperty(
                "andexdbPersonalSettings:rankDisplaySeparator"
            ) ??
            config.chatRanks.rankDisplaySeparator
        ));
    let name = !!player.getTags().find(t => t.startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:"))) ?
        String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplayPrefix") ?? world.getDynamicProperty("andexdbSettings:nameDisplayPrefix") ?? "§r<") + nameFormatting +
        (!!nameGradientMode ?
            evaluateChatColorType(
                player.getTags().find(t => t.startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:")))
                    .slice(String(player.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:").length), nameGradientMode
            ) :
            player.getTags().find(t => t.startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:")))
                .slice(String(player.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:").length)
        ) +
        String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplaySuffix") ?? world.getDynamicProperty("andexdbSettings:nameDisplaySuffix") ?? "§r>") :
        player.hasTag("chatHideNameTag") ? "" :
            player.hasTag("chatUseNameTag") ? String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplayPrefix") ?? world.getDynamicProperty("andexdbSettings:nameDisplayPrefix") ?? "§r<") + nameFormatting +
                (!!nameGradientMode ? evaluateChatColorType(player.nameTag, nameGradientMode) : player.nameTag) +
                String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplaySuffix") ?? world.getDynamicProperty("andexdbSettings:nameDisplaySuffix") ?? "§r>") :
                String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplayPrefix") ?? world.getDynamicProperty("andexdbSettings:nameDisplayPrefix") ?? "§r<") +
                (!!nameGradientMode ? evaluateChatColorType(player.name, nameGradientMode) : player.name) +
                String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplaySuffix") ?? world.getDynamicProperty("andexdbSettings:nameDisplaySuffix") ?? "§r>");
    let nameb = !!player.getTags().find(t => t.startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:"))) ?
        (!!nameGradientMode ?
            evaluateChatColorType(
                player.getTags().find(t => t.startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:")))
                    .slice(String(player.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:").length), nameGradientMode
            ) :
            player.getTags().find(t => t.startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:")))
                .slice(String(player.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:").length)
        ) :
        player.hasTag("chatHideNameTag") ? "" :
            player.hasTag("chatUseNameTag") ? (!!nameGradientMode ? evaluateChatColorType(player.nameTag, nameGradientMode) : player.nameTag) :
                (!!nameGradientMode ? evaluateChatColorType(player.name, nameGradientMode) : player.name);
    name.length != 0 ? name += String(player.getDynamicProperty("andexdbPersonalSettings:chatNameAndMessageSeparator") ?? world.getDynamicProperty("andexdbSettings:chatNameAndMessageSeparator") ?? " ") : undefined;  */ /*
    let rankMode = 0
    for (let index in player.getTags()) {
            if (player.getTags()[Number(index)].startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:"))) { rank = (rank + String(player.getDynamicProperty("andexdbPersonalSettings:rankDisplayPrefix") ?? world.getDynamicProperty("andexdbSettings:rankDisplayPrefix") ?? "[") + player.getTags()[Number(index)].slice(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:").length) + String(player.getDynamicProperty("andexdbPersonalSettings:rankDisplaySuffix") ?? world.getDynamicProperty("andexdbSettings:rankDisplaySuffix") ?? "]")) }
            if (player.getTags()[Number(index)] == ("chatHideNameTag")) { name = ""; rankMode = 1 } else {
            if (player.getTags()[Number(index)].startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:")) && rankMode !== 1) { name = String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplayPrefix") ?? world.getDynamicProperty("andexdbSettings:nameDisplayPrefix") ?? "§r<") + player.getTags()[Number(index)].slice(String(player.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:").length) + String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplaySuffix") ?? world.getDynamicProperty("andexdbSettings:nameDisplaySuffix") ?? "§r>") + String(player.getDynamicProperty("andexdbPersonalSettings:chatNameAndMessageSeparator") ?? world.getDynamicProperty("andexdbSettings:chatNameAndMessageSeparator") ?? " "); rankMode = 2 } else {
            if (player.getTags()[Number(index)] == ("chatUseNameTag") && rankMode !== 1 && rankMode !== 2) { name = String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplayPrefix") ?? world.getDynamicProperty("andexdbSettings:nameDisplayPrefix") ?? "<") + player.nameTag + String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplaySuffix") ?? world.getDynamicProperty("andexdbSettings:nameDisplaySuffix") ?? ">") + String(player.getDynamicProperty("andexdbPersonalSettings:chatNameAndMessageSeparator") ?? world.getDynamicProperty("andexdbSettings:chatNameAndMessageSeparator") ?? " "); rankMode = 3 } } }
    }*/
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:chatSendBeforeModifiedMessageEval")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("chatSendBeforeEventDebugErrors")) {
            currentplayer.sendMessage((e + " " + e.stack));
        } });
    }
    eventData.cancel = true;
    //╙
    if (player.hasTag("doNotSendChatMessages")) {
        return;
    }
    else {
        world.getAllPlayers().forEach(p => {
            // let messageTimeStampEnabled = (player.hasTag("chatDisplayTimeStamp") || p.hasTag("chatDisplayTimeStamps") || ((world.getDynamicProperty("andexdbSettings:chatDisplayTimeStamp") ?? false) && !player.hasTag("hideChatDisplayTimeStamp") && !p.hasTag("hideChatDisplayTimeStamps")));
            // let timestampenabled = messageTimeStampEnabled;
            // let timestamp = messageTimeStampEnabled ? formatTime(new Date(Date.now() + (Number(p.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbSettings:timeZone") ?? 0) * 3600000))) : "";
            // let dimension = dimensionTypeDisplayFormatting[player.dimension.id as keyof typeof dimensionTypeDisplayFormatting];
            // let namec = name;
            // let message = (world.getDynamicProperty("autoEscapeChatMessages") == true) ? newMessage.escapeCharacters(true) : newMessage;
            // if (!!messageGradientMode) {
            //     message = evaluateChatColorType(message, messageGradientMode);
            // }
            // let messageOutput = "";
            // if (String(world.getDynamicProperty("andexdbSettings:rankMode") ?? "custom_simple") == "custom_simple") {
            //     if (rank == "") { let tags = player.getTags(); rank = eval(`\`${String(world.getDynamicProperty("andexdbSettings:defaultRankTemplateString") ?? "")}\``); }
            //     messageOutput = (showDimension ? "[" + dimension + "§r] " : "") + (timestampenabled ? "[" + timestamp + "]" + String(player.getDynamicProperty("andexdbPersonalSettings:rankDisplaySeparator") ?? world.getDynamicProperty("andexdbSettings:rankDisplaySeparator") ?? " ") : "") + rank + nameFormatting + name + messageFormatting + message;
            // } else if (String(world.getDynamicProperty("andexdbSettings:rankMode") ?? "custom_simple") == "custom_advanced") {
            //     rank = player.getTags().filter(t => t.startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:")))
            //         .map((t, index, array) => { let rank = t.slice(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:").length); let tags = player.getTags(); return eval(`\`${String(world.getDynamicProperty("andexdbSettings:rankTemplateString") ?? "[${rank}§r]")}\``); /*Function("rank, tags", `return ${String(world.getDynamicProperty("andexdbSettings:rankTemplateString") ?? "[${rank}§r]")}`)(rank, player.getTags())*/ }).join(String(player.getDynamicProperty("andexdbPersonalSettings:rankDisplaySeparator") ?? config.chatRanks.rankDisplaySeparator));
            //     if (rank == "") { let tags = player.getTags(); rank = eval(`\`${String(world.getDynamicProperty("andexdbSettings:defaultRankTemplateString") ?? "")}\``); }
            //     const ranks = rank;
            //     let name = nameb;
            //     messageOutput = eval(`\`${String(world.getDynamicProperty("andexdbSettings:messageTemplateString") ?? "§r${showDimension?`[${dimension}] `:\"\"}${timestampenabled?`[${timestamp}]`:\"\"}${ranks}§r${(ranks!=\"\")?\" \":\"\"}<${nameFormatting}${name}§r> ${message}")}\``);
            // } else if (String(world.getDynamicProperty("andexdbSettings:rankMode") ?? "custom_simple") == "style_1") {
            //     rank = player.getTags().filter(t => t.startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:")))
            //         .map(t => "[§r" + t.slice(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:").length) + "§r]").join(" ");
            //     if (rank == "") { let tags = player.getTags(); rank = eval(`\`${String(world.getDynamicProperty("andexdbSettings:defaultRankTemplateString") ?? "")}\``); }
            //     messageOutput = `§r${showDimension ? `[${dimension}§r] ` : ""}${timestamp != "" ? `[${timestamp}] ` : ""}${rank != "" ? `${rank}§r ` : ""}${name != "" ? `<${nameFormatting}${nameb}§r> ` : ""}${messageFormatting}${message}`;
            // } else if (String(world.getDynamicProperty("andexdbSettings:rankMode") ?? "custom_simple") == "style_2") {
            //     rank = player.getTags().filter(t => t.startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:")))
            //         .map(t => "[§r" + t.slice(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:").length) + "§r§8]").join(" ");
            //     if (rank == "") { let tags = player.getTags(); rank = eval(`\`${String(world.getDynamicProperty("andexdbSettings:defaultRankTemplateString") ?? "")}\``); }
            //     messageOutput = `§r§8${showDimension ? `[${dimension}§r] ` : ""}${timestamp != "" ? `[${timestamp}] ` : ""}${rank != "" ? `${rank}§r ` : ""}${name != "" ? `§r${nameFormatting}${nameb}§r§8 ${separatorFormatting}` : `§r§8${separatorFormatting}`}»§r §f${messageFormatting}${message}`;
            // } else if (String(world.getDynamicProperty("andexdbSettings:rankMode") ?? "custom_simple") == "style_3") {
            //     rank = player.getTags().filter(t => t.startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:")))
            //         .map(t => "[§r" + t.slice(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:").length) + "§r§8]").join(" ");
            //     if (rank == "") { let tags = player.getTags(); rank = eval(`\`${String(world.getDynamicProperty("andexdbSettings:defaultRankTemplateString") ?? "")}\``); }
            //     messageOutput = `§r§8${showDimension ? `[${dimension}§r] ` : ""}${timestamp != "" ? `[${timestamp}] ` : ""}${rank != "" ? `${rank}§r ` : ""}§r${name != "" ? `${nameFormatting}${nameb}§r ${separatorFormatting}` : `${separatorFormatting}`}>>§r §f${messageFormatting}${message}`;
            // } else if (String(world.getDynamicProperty("andexdbSettings:rankMode") ?? "custom_simple") == "style_4") {
            //     rank = player.getTags().filter(t => t.startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:")))
            //         .map(t => "[§r" + t.slice(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:").length) + "§r§7]").join(" ");
            //     if (rank == "") { let tags = player.getTags(); rank = eval(`\`${String(world.getDynamicProperty("andexdbSettings:defaultRankTemplateString") ?? "")}\``); }
            //     messageOutput = `§r§7${showDimension ? `[${dimension}§r] ` : ""}${timestamp != "" ? `[${timestamp}]` : ""}${rank != "" ? ` ${rank}` : ""}§r§7${name != "" ? ` ${nameFormatting}${nameb}§r§7` : ""}§l ${separatorFormatting}>§r§l §r${messageFormatting}${message}`;
            // } else if (String(world.getDynamicProperty("andexdbSettings:rankMode") ?? "custom_simple") == "style_5") {
            //     rank = "[§r" + player.getTags().filter(t => t.startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:")))
            //         .map(t => t.slice(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:").length)).join("§r,") + "§r]";
            //     if (rank == "[§r§r]") { let tags = player.getTags(); rank = eval(`\`${String(world.getDynamicProperty("andexdbSettings:defaultRankTemplateString") ?? "")}\``); }
            //     messageOutput = `§r${showDimension ? `[${dimension}§r] ` : ""}${timestamp != "" ? `[${timestamp}] ` : ""}${rank != "" ? `${rank}` : ""}§r§7${name != "" ? ` ${nameFormatting}${nameb}§r§7` : ""}${separatorFormatting}:§r §f${messageFormatting}${message}`;
            // }
            options.isPlaceholderTargetPlayer = false;
            options.targetPlayer = p;
            options.targetPlayerSettings = chatSend_getTargetPlayerSettings(p);
            const messageOutput = chatSendMessageEvaluator_players(prePlayersOutput, options);
            try {
                eval(String(world.getDynamicProperty("evalBeforeEvents:chatSendBeforeModifiedMessageSend")));
            }
            catch (e) {
                console.error(e, e.stack);
                world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("chatSendBeforeEventDebugErrors")) {
                    currentplayer.sendMessage((e + " " + e.stack));
                } });
            }
            if (world.getDynamicProperty("allowCustomChatMessagesMuting") != true) {
                p.sendMessage(messageOutput);
            }
            else {
                p.runCommandAsync(`/tellraw @s ${JSON.stringify({ "rawtext": [{ "text": messageOutput }] })}`);
            }
        });
    } /*
    if(messageTimeStampEnabled){
        if (player.hasTag("doNotSendChatMessages")) { return; } else {
            if(world.getDynamicProperty("allowCustomChatMessagesMuting") != true){
                if(world.getDynamicProperty("autoEscapeChatMessages") != true){
                    world.getAllPlayers().forEach(p=>p.sendMessage("["+new Date(Date.now()+(Number(p.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbSettings:timeZone") ?? 0)*3600000)).toLocaleTimeString()+"]" + rank + name + messageFormatting + newMessage));
                }else{
                    world.getAllPlayers().forEach(p=>world.sendMessage({rawtext: [{text: String("["+new Date(Date.now()+(Number(p.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbSettings:timeZone") ?? 0)*3600000)).toLocaleTimeString()+"]" + rank + name + messageFormatting + newMessage.escapeCharacters(true))}]}));
                }
            }else{
                if(world.getDynamicProperty("autoEscapeChatMessages") != true){
                    world.getAllPlayers().forEach(p=>p.runCommandAsync(`/tellraw @s ${JSON.stringify({"rawtext":[{"text":String("["+new Date(Date.now()+(Number(p.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbSettings:timeZone") ?? 0)*3600000)).toLocaleTimeString()+"]" + rank + name + messageFormatting + newMessage)}]})}`));
                }else{
                    world.getAllPlayers().forEach(p=>p.runCommandAsync(`/tellraw @s ${JSON.stringify({"rawtext":[{"text":String("["+new Date(Date.now()+(Number(p.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbSettings:timeZone") ?? 0)*3600000)).toLocaleTimeString()+"]" + rank + name + messageFormatting + newMessage.escapeCharacters(true))}]})}`));
                }
            }
        }
    }else{
        if (player.hasTag("doNotSendChatMessages")) { return; } else {
            if(world.getDynamicProperty("allowCustomChatMessagesMuting") != true){
                if(world.getDynamicProperty("autoEscapeChatMessages") != true){
                    world.sendMessage(rank + name + messageFormatting + newMessage);
                }else{
                    world.sendMessage({rawtext: [{text: String(rank + name + messageFormatting + newMessage)}]});
                }
            }else{
                if(world.getDynamicProperty("autoEscapeChatMessages") != true){
                    world.getDimension("overworld").runCommandAsync(`/tellraw @a ${JSON.stringify({"rawtext":[{"text":String(rank + name + messageFormatting + newMessage)}]})}`);
                }else{
                    world.getDimension("overworld").runCommandAsync(`/tellraw @a ${JSON.stringify({"rawtext":[{"text":String(rank + name + messageFormatting + newMessage.escapeCharacters(true))}]})}`);
                }
            }
        }
    }*/
}
//# sourceMappingURL=chatSend.js.map