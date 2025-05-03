import { Player, ChatSendBeforeEvent, type RawMessage } from "@minecraft/server";
export declare function requestConditionalChatInput(player: Player, conditions?: (player: Player, message: string, event: ChatSendBeforeEvent) => boolean, options?: {
    requestMessage?: string | RawMessage | (string | RawMessage)[];
    expireMs?: number;
    expireConditions?: (requestObject: {
        time: number;
        request?: string | RawMessage | (string | RawMessage)[];
        input?: string;
        id?: string;
        conditions: (player: Player, message: string, event: ChatSendBeforeEvent) => boolean;
        [k: string]: any;
    }) => boolean;
}): Promise<string>;
