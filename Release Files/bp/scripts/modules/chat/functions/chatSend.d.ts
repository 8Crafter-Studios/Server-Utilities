import { Player, ChatSendBeforeEvent } from "@minecraft/server";
import "init/classes/config";
export declare function chatSend(params: {
    returnBeforeChatSend: boolean | undefined;
    player: Player | undefined;
    eventData: ChatSendBeforeEvent | undefined;
    event: ChatSendBeforeEvent | undefined;
    newMessage: string | undefined;
}): void;
