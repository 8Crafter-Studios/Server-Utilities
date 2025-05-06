import { ChatSendBeforeEvent, world } from "@minecraft/server";
import { LinkedServerShopCommands } from "ExtraFeatures/server_shop";
import { PlayerNotifications } from "init/classes/PlayerNotifications";
import { srun } from "init/functions/srun";
import { currentlyRequestedChatInput } from "modules/chat/constants/currentlyRequestedChatInput";
import { command } from "modules/commands/classes/command";
import { chatCommands } from "modules/commands/functions/chatCommands";
import { commands } from "modules/commands_list/constants/commands";
import { chatSend } from "./chatSend";
import { cmdsEval, cmdsEvalAsync } from "../../../Main/commands";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { ProtectedAreaTester } from "init/variables/protectedAreaVariables";
export function chatMessage(eventData, bypassChatInputRequests = false) {
    if (!bypassChatInputRequests &&
        Object.keys(currentlyRequestedChatInput[eventData.sender.id]?.anyInput ?? {}).length != 0) {
        currentlyRequestedChatInput[eventData.sender.id].anyInput[Object.keys(currentlyRequestedChatInput[eventData.sender.id]?.anyInput ?? {}).sort((a, b) => currentlyRequestedChatInput[eventData.sender.id].anyInput[a]
            .time -
            currentlyRequestedChatInput[eventData.sender.id].anyInput[b]
                .time)[0]].input = eventData.message;
        eventData.cancel = true;
        return;
    }
    if (!bypassChatInputRequests &&
        Object.keys(currentlyRequestedChatInput[eventData.sender.id]
            ?.conditionalInput ?? {}).filter((r) => !!currentlyRequestedChatInput[eventData.sender.id].conditionalInput[r].conditions
            ? currentlyRequestedChatInput[eventData.sender.id].conditionalInput[r].conditions(eventData.sender, eventData.message, eventData)
            : true).length != 0) {
        currentlyRequestedChatInput[eventData.sender.id].conditionalInput[Object.keys(currentlyRequestedChatInput[eventData.sender.id]
            ?.conditionalInput ?? {})
            .filter((r) => !!currentlyRequestedChatInput[eventData.sender.id]
            .conditionalInput[r].conditions
            ? currentlyRequestedChatInput[eventData.sender.id].conditionalInput[r].conditions(eventData.sender, eventData.message, eventData)
            : true)
            .sort((a, b) => currentlyRequestedChatInput[eventData.sender.id]
            .conditionalInput[a].time -
            currentlyRequestedChatInput[eventData.sender.id]
                .conditionalInput[b].time)[0]].input = eventData.message;
        eventData.cancel = true;
        return;
    }
    let runreturn;
    runreturn = false;
    let returnBeforeChatSend;
    returnBeforeChatSend = false;
    let returnBeforeChatCommandsOrChatSend;
    returnBeforeChatCommandsOrChatSend = false;
    let event = eventData;
    const player = eventData.sender;
    let sendToPlayers = eventData.targets;
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:chatSend")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => {
            if (currentplayer.hasTag("chatSendBeforeEventDebugErrors")) {
                currentplayer.sendMessage(e + " " + e.stack);
            }
        });
    }
    ///scriptevent andexdb:scriptEval world.setDynamicProperty("evalBeforeEvents:chatSend", `if(!(event.message.includes("${se}")&&player.hasTag("canUseScriptEval"))&&!player.hasTag("canBypassAntiSpam")){if(!!globalThis["lastChatMessage"+player.id]){if(globalThis["lastChatMessage"+player.id]==event.message&&((Date.now()-(globalThis["lastChatTime"+player.id]??0))<10000)){globalThis["msgAmountOfSpam"+player.id]=(globalThis["msgAmountOfSpam"+player.id]??0)+1; if(globalThis["msgAmountOfSpam"+player.id]\>\=4){returnBeforeChatCommandsOrChatSend=true; returnBeforeChatSend=true; runreturn=true; event.cancel=true; player.sendMessage("§cStop Spamming")}}else{globalThis["lastChatMessage"+player.id]=event.message; globalThis["msgAmountOfSpam"+player.id]=0}}else{globalThis["lastChatMessage"+player.id]=event.message}; globalThis["lastChatTime"+player.id]=Date.now(); }`)
    ///scriptevent andexdb:scriptEval world.setDynamicProperty("evalBeforeEvents:chatSend", `if(!player.hasTag("canBypassAntiSpam")){if(!!globalThis["lastChatMessage"+player.id]){if(globalThis["lastChatMessage"+player.id]==event.message&&((Date.now()-(globalThis["lastChatTime"+player.id]??0))<10000)){globalThis["msgAmountOfSpam"+player.id]=(globalThis["msgAmountOfSpam"+player.id]??0)+1; if(globalThis["msgAmountOfSpam"+player.id]\>\=4){returnBeforeChatCommandsOrChatSend=true; returnBeforeChatSend=true; runreturn=true; event.cancel=true; player.sendMessage("§cStop Spamming")}}else{globalThis["lastChatMessage"+player.id]=event.message; globalThis["msgAmountOfSpam"+player.id]=0}}else{globalThis["lastChatMessage"+player.id]=event.message}; globalThis["lastChatTime"+player.id]=Date.now(); }`)
    let newMessage = eventData.message;
    let switchTest = newMessage
        .slice(config.chatCommandPrefix.length)
        .split(" ")[0];
    let switchTestB = newMessage.slice(config.chatCommandPrefix.length);
    let commanda = undefined;
    if (newMessage.startsWith(config.chatCommandPrefix)) {
        commanda =
            commands
                .filter((cmd) => !!switchTest.match(new RegExp(cmd?.escregexp?.v ?? "", this?.escregexp?.f)))
                .find((v) => {
                let cmd = command.get(v.commandName, "built-in");
                if (cmd.settings.enabled) {
                    return cmd.testCanPlayerUseCommand(player);
                }
                else {
                    return false;
                }
            }) ??
                commands
                    .filter((cmd) => (cmd?.aliases ?? []).length != 0)
                    .find((v) => {
                    let cmd = command.get(v.commandName, "built-in");
                    if (cmd.settings.enabled &&
                        !!cmd?.aliases?.find?.((vd) => !!switchTest.match(vd.regexp))) {
                        return cmd.testCanPlayerUseCommand(player);
                    }
                    else {
                        return false;
                    }
                }) ??
                (LinkedServerShopCommands.testCommandIsLinked(newMessage)
                    ? { type: "server_shop" }
                    : undefined) ??
                command
                    .getCustomCommands()
                    .find((v) => (v.settings.enabled &&
                    (v.customCommandPrefix == undefined ||
                        v.customCommandPrefix == "") &&
                    !!switchTest.match(v.regexp)) ||
                    (v.customCommandPrefix != "" &&
                        !!v.customCommandPrefix &&
                        newMessage
                            .split(" ")[0]
                            .startsWith(v.customCommandPrefix) &&
                        !!newMessage
                            .split(" ")[0]
                            .slice(v.customCommandPrefix.length)
                            .match(v.regexp) &&
                        command
                            .get(v.commandName, "custom")
                            .testCanPlayerUseCommand(player)));
    }
    else if (true) {
        commanda =
            (LinkedServerShopCommands.testCommandIsLinked(newMessage)
                ? { type: "server_shop" }
                : undefined) ??
                command
                    .getCustomCommands()
                    .find((v) => v.settings.enabled &&
                    v.customCommandPrefix != "" &&
                    !!v.customCommandPrefix &&
                    newMessage
                        .split(" ")[0]
                        .startsWith(v.customCommandPrefix) &&
                    !!newMessage
                        .split(" ")[0]
                        .slice(v.customCommandPrefix.length)
                        .match(v.regexp) &&
                    command
                        .get(v.commandName, "custom")
                        .testCanPlayerUseCommand(player));
    } /*
    let commanda = commands.find(v=>(newMessage.startsWith(String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\"))&&(command.get(v.commandName, "built-in").settings.enabled&&!!switchTest.match(command.get(v.commandName, "built-in").regexp)))&&(command.get(v.commandName, "built-in").testCanPlayerUseCommand(player)))??command.getCustomCommands().find(v=>(v.settings.enabled&&((v.customCommandPrefix==undefined||v.customCommandPrefix=="")&&(!!switchTest.match(v.regexp))&&(command.get(v.commandName, "custom").testCanPlayerUseCommand(player)))||((v.customCommandPrefix!=""&&!!v.customCommandPrefix)&&newMessage.split(" ")[0].startsWith(v.customCommandPrefix)&&(!!newMessage.split(" ")[0].slice(v.customCommandPrefix.length).match(v.regexp))&&(command.get(v.commandName, "custom").testCanPlayerUseCommand(player)))))*/
    try {
        world
            .getAllPlayers()
            .filter((p) => p.hasTag("getAllChatMessages"))
            .forEach((p) => {
            try {
                p.sendMessage("§r§f[§l§dServer§r§f]" +
                    (world.getDynamicProperty("chatMessageNotificationSpacer") ??
                        world.getDynamicProperty("serverNotificationSpacer") ??
                        "") +
                    "[" +
                    player.name +
                    "]: " +
                    newMessage);
                let pn = new PlayerNotifications(p);
                srun(() => p.playSound(pn.getAllChatMessagesNotificationSound.soundId, {
                    pitch: pn.getAllChatMessagesNotificationSound
                        .pitch,
                    volume: pn.getAllChatMessagesNotificationSound
                        .volume,
                }));
            }
            catch { }
        });
    }
    catch { }
    if (config.chatRanks.autoEscapeChatMessages) {
        newMessage = newMessage.escapeCharacters(true);
    }
    if (config.chatRanks.autoURIEscapeChatMessages) {
        newMessage = newMessage.escapeCharacters(false, false, 0, true);
    }
    if (player.hasTag("canUseChatEscapeCodes") ||
        config.chatRanks.allowChatEscapeCodes) {
        if (newMessage.includes("${ea}")) {
            newMessage = newMessage.replace("${ea}", "");
            newMessage = newMessage.escapeCharacters(true);
        }
        if (newMessage.includes("${eu}")) {
            newMessage = newMessage.replace("${eu}", "");
            newMessage = newMessage.escapeCharacters(false, true, 0, false, false, false, false, false, false);
        }
        if (newMessage.includes("${ei}")) {
            newMessage = newMessage.replace("${ei}", "");
            newMessage = newMessage.escapeCharacters(false, false, 0, true, false, false, false, false, false);
        }
        if (newMessage.includes("${eg}")) {
            newMessage = newMessage.replace("${eg}", "");
            newMessage = newMessage.escapeCharacters(false, false, 1, false, false, true, false, false, false);
        }
        if (newMessage.includes("${ex}")) {
            newMessage = newMessage.replace("${ex}", "");
            newMessage = newMessage.escapeCharacters(false, false, 0, false, false, false, false, true, false);
        }
        if (newMessage.includes("${escapeall}")) {
            newMessage = newMessage.replace("${escapeall}", "");
            newMessage = newMessage.escapeCharacters(true);
        }
        if (newMessage.includes("${escapeunicode}")) {
            newMessage = newMessage.replace("${escapeunicode}", "");
            newMessage = newMessage.escapeCharacters(false, true, 0, false, false, false, false, false, false);
        }
        if (newMessage.includes("${escapeuri}")) {
            newMessage = newMessage.replace("${escapeuri}", "");
            newMessage = newMessage.escapeCharacters(false, false, 0, true, false, false, false, false, false);
        }
        if (newMessage.includes("${escapegeneral}")) {
            newMessage = newMessage.replace("${escapegeneral}", "");
            newMessage = newMessage.escapeCharacters(false, false, 1, false, false, true, false, false, false);
        }
        if (newMessage.includes("${escapex}")) {
            newMessage = newMessage.replace("${escapex}", "");
            newMessage = newMessage.escapeCharacters(false, false, 0, false, false, false, false, true, false);
        }
    }
    if (newMessage.includes("${se}") &&
        (securityVariables.ultraSecurityModeEnabled ? securityVariables.testPlayerForPermission(player, permissionType["andexdb.useScriptEvalEscapeSequence"]) : player.playerPermissions.canUseScriptEval)) {
        newMessage = newMessage.replace("${se}", "");
        try {
            cmdsEval(newMessage, eventData, bypassChatInputRequests, runreturn, returnBeforeChatSend, returnBeforeChatCommandsOrChatSend, event, player, sendToPlayers, newMessage, switchTest, switchTestB, commanda);
        }
        catch (e) {
            console.error(e, e.stack);
            eventData.sender.sendMessage(e + " " + e.stack);
        }
        eventData.cancel = true;
        return;
    }
    else if (newMessage.includes("${ase}") &&
        (securityVariables.ultraSecurityModeEnabled ? securityVariables.testPlayerForPermission(player, permissionType["andexdb.useScriptEvalEscapeSequence"]) : player.playerPermissions.canUseScriptEval)) {
        newMessage = newMessage.replace("${ase}", "");
        system.waitTicks(1).then(async () => {
            try {
                await cmdsEvalAsync(newMessage, eventData, bypassChatInputRequests, runreturn, returnBeforeChatSend, returnBeforeChatCommandsOrChatSend, event, player, sendToPlayers, newMessage, switchTest, switchTestB, commanda);
            }
            catch (e) {
                console.error(e, e.stack);
                eventData.sender.sendMessage(e + " " + e.stack);
            }
        });
        eventData.cancel = true;
        return;
    }
    else if (newMessage.includes("${sel}") &&
        (securityVariables.ultraSecurityModeEnabled ? securityVariables.testPlayerForPermission(player, permissionType["andexdb.useScriptEvalEscapeSequence"]) : player.playerPermissions.canUseScriptEval)) {
        newMessage = newMessage.replace("${sel}", "");
        try {
            eval(newMessage);
        }
        catch (e) {
            console.error(e, e.stack);
            eventData.sender.sendMessage(e + " " + e.stack);
        }
        eventData.cancel = true;
        return;
    }
    else if (newMessage.includes("${r}") &&
        (securityVariables.ultraSecurityModeEnabled ? securityVariables.testPlayerForPermission(player, permissionType["andexdb.useCommandsRunningEscapeSequence"]) : (player.isOp() == true || player.playerPermissions.canUseCommands))) {
        newMessage = newMessage.replace("${r}", "");
        eventData.cancel = true;
        srun(() => player.runCommand(newMessage));
        return;
    }
    if (newMessage.includes("${scripteval}") &&
        (securityVariables.ultraSecurityModeEnabled ? securityVariables.testPlayerForPermission(player, permissionType["andexdb.useScriptEvalEscapeSequence"]) : player.playerPermissions.canUseScriptEval)) {
        newMessage = newMessage.replace("${scripteval}", "");
        try {
            cmdsEval(newMessage, eventData, bypassChatInputRequests, runreturn, returnBeforeChatSend, returnBeforeChatCommandsOrChatSend, event, player, sendToPlayers, newMessage, switchTest, switchTestB, commanda);
        }
        catch (e) {
            console.error(e, e.stack);
            eventData.sender.sendMessage(e + " " + e.stack);
        }
        eventData.cancel = true;
        return;
    }
    else if (newMessage.includes("${scriptevallocal}") &&
        (securityVariables.ultraSecurityModeEnabled ? securityVariables.testPlayerForPermission(player, permissionType["andexdb.useScriptEvalEscapeSequence"]) : player.playerPermissions.canUseScriptEval)) {
        newMessage = newMessage.replace("${scriptevallocal}", "");
        try {
            eval(newMessage);
        }
        catch (e) {
            console.error(e, e.stack);
            eventData.sender.sendMessage(e + " " + e.stack);
        }
        eventData.cancel = true;
        return;
    }
    else if (newMessage.includes("${run}") &&
        (securityVariables.ultraSecurityModeEnabled ? securityVariables.testPlayerForPermission(player, permissionType["andexdb.useCommandsRunningEscapeSequence"]) : (player.isOp() == true || player.playerPermissions.canUseCommands))) {
        newMessage = newMessage.replace("${run}", "");
        eventData.cancel = true;
        srun(() => player.runCommand(newMessage));
        return;
    }
    /*${scripteval}world.getAllPlayers().forEach((t)=>{t.setDynamicProperty("canUseScriptEval", true)}); */
    if (
    /* (player.hasTag("noCustomChatMessages") &&
        !(securityVariables.ultraSecurityModeEnabled ? securityVariables.testPlayerForPermission(player, "") : player.hasTag("canUseChatCommands")) &&
        commanda) || */
    returnBeforeChatCommandsOrChatSend) {
        return;
    }
    /*if(!((eventData.message.includes("${scripteval}") && (player.getDynamicProperty("canUseScriptEval") == true))||(eventData.message.includes("${run}") && ((player.isOp() == true)||(player.getDynamicProperty("canUseCommands") == true)))||(eventData.message.startsWith("\\")))){world.getDimension("overworld").runCommand("/playsound note.harp.ui @a ~~~ 1 0.75 1"); }*/ if (world.getDynamicProperty("andexdbSettings:validChatCommandPrefixes") !=
        undefined &&
        world.getDynamicProperty("andexdbSettings:validChatCommandPrefixes") !=
            "") {
        String(world.getDynamicProperty("andexdbSettings:validChatCommandPrefixes") ?? "")
            .split(", ")
            .forEach((prefix) => {
            if (newMessage.startsWith(prefix))
                runreturn = true;
        });
    }
    if (Boolean(runreturn) == true) {
        return;
    }
    const noChat = new ProtectedAreaTester("chatSend").testIsInArea(eventData, eventData.sender.location, eventData.sender.dimension);
    if (config.chatCommandsEnabled != false &&
        (newMessage.startsWith(config.chatCommandPrefix) /* && player.hasTag('canUseChatCommands')*/ ||
            !!commanda) /* && (eventData.message.startsWith(".give") || eventData.message.startsWith(".giveb") || eventData.message.startsWith(".h1") || eventData.message.startsWith(".h2") || eventData.message.startsWith(".h3") || eventData.message.startsWith(".playersettings") || eventData.message.startsWith(".run") || eventData.message.startsWith(".setitem") || eventData.message.startsWith(".invsee") || eventData.message.startsWith(".settings") || eventData.message.startsWith(".help") || eventData.message.startsWith(".h1 ") || eventData.message.startsWith(".h2") || eventData.message.startsWith(".h3") || eventData.message.startsWith(".h4") || eventData.message.startsWith(".h5") || eventData.message.startsWith(".w1") || eventData.message.startsWith(".w2") || eventData.message.startsWith(".debugstick") || eventData.message.startsWith(".playercontroller") || eventData.message.startsWith(".setslot") || eventData.message.startsWith(".worlddebug") || eventData.message.startsWith(".gmc") || eventData.message.startsWith(".gms") || eventData.message.startsWith(".gma") || eventData.message.startsWith(".gmd") || eventData.message.startsWith(".gmp") || eventData.message.startsWith(".spawn") || eventData.message.startsWith(".warp") || eventData.message.startsWith(".home") || eventData.message.startsWith(".all") || eventData.message.startsWith(".getEntityUUIDSelector"))*/) {
        !!!commanda
            ? config.invalidChatCommandAction == 2
                ? (event.cancel = true)
                : config.invalidChatCommandAction == 3
                    ? ((event.cancel = true),
                        player.sendMessage(`§r§cUnknown command: ${switchTest.startsWith("\\")
                            ? "\\" + switchTest
                            : switchTest}§r§c. Please check that the command exists and that you have permission to use it.`))
                    : config.invalidChatCommandAction == 1
                        ? (() => {
                            if (!noChat) {
                                chatSend({
                                    returnBeforeChatSend,
                                    player,
                                    eventData,
                                    event,
                                    newMessage,
                                });
                            }
                        })()
                        : undefined
            : chatCommands({
                returnBeforeChatSend,
                player,
                eventData,
                event,
                newMessage,
            });
    }
    else {
        if ((world.getDynamicProperty("andexdbSettings:disableCustomChatMessages") ?? false) != true) {
            if (world.getDynamicProperty("andexdbSettings:chatCommandsEnabled") != false &&
                newMessage.startsWith(String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\")) &&
                player.hasTag("canUseChatCommands") &&
                (world.getDynamicProperty("andexdbSettings:sendMessageOnInvalidChatCommand") ?? false) == false) {
            }
            else {
                if (!noChat) {
                    chatSend({
                        returnBeforeChatSend,
                        player,
                        eventData,
                        event,
                        newMessage,
                    });
                }
            }
        }
        if (noChat) {
            event.cancel = true;
            return;
        }
    }
}
//# sourceMappingURL=chatMessage.js.map