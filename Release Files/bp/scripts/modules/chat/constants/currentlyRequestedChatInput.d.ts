import type { RawMessage, Player, ChatSendBeforeEvent } from "@minecraft/server";
export declare const currentlyRequestedChatInput: {
    [playerId: string]: {
        anyInput: {
            [id: string]: {
                time: number;
                request?: string | RawMessage | (string | RawMessage)[];
                input?: string;
                id?: string;
            };
        };
        conditionalInput: {
            [id: string]: {
                time: number;
                request?: string | RawMessage | (string | RawMessage)[];
                input?: string;
                id?: string;
                conditions: (player: Player, message: string, event: ChatSendBeforeEvent) => boolean;
                expireTime: number;
                expireConditions?: (requestObject: {
                    [k: string]: any;
                }) => boolean;
            };
        };
    };
};
