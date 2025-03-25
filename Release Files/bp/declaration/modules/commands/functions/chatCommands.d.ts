import { Player, ChatSendBeforeEvent } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
export declare function chatCommands(params: {
    returnBeforeChatSend: boolean | undefined;
    player: Player | executeCommandPlayerW | undefined;
    eventData: ChatSendBeforeEvent;
    event: ChatSendBeforeEvent | undefined;
    newMessage: string | undefined;
    fromExecute?: boolean;
    silentCMD?: boolean;
    isBultIn?: boolean;
    isCustom?: boolean;
}): void;
