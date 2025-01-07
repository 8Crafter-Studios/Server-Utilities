import { Player, ChatSendBeforeEvent } from "@minecraft/server";
export declare function chatSend(params: {
    returnBeforeChatSend: boolean | undefined;
    player: Player | undefined;
    eventData: ChatSendBeforeEvent | undefined;
    event: ChatSendBeforeEvent | undefined;
    newMessage: string | undefined;
}): void;
