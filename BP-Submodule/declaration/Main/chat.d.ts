import { ChatSendBeforeEvent, Player, type RawMessage } from "@minecraft/server";
export declare const chatmetaimport: ImportMeta;
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
export declare const patternList: {
    rainbow: string[];
    blue: string[];
    yellow: string[];
    black: string[];
    gray: string[];
    purple: string[];
};
export declare const patternFunctionList: {
    rainbow: (ib: number) => string;
    randomrainbow: (ib: number, offset: number) => string;
    shuffledrainbow: () => string;
    bluegradient: (ib: number) => string;
    randombluegradient: (ib: number, offset: number) => string;
    shuffledbluegradient: () => string;
    yellowgradient: (ib: number) => string;
    randomyellowgradient: (ib: number, offset: number) => string;
    shuffledyellowgradient: () => string;
    blackgradient: (ib: number) => string;
    randomblackgradient: (ib: number, offset: number) => string;
    shuffledblackgradient: () => string;
    graygradient: (ib: number) => string;
    randomgraygradient: (ib: number, offset: number) => string;
    shuffledgraygradient: () => string;
    purplegradient: (ib: number) => string;
    randompurplegradient: (ib: number, offset: number) => string;
    shuffledpurplegradient: () => string;
};
export declare const patternColors: string[];
export declare const patternColorsMap: {
    aqua: string;
    darkpurple: string;
    darkgreen: string;
    darkred: string;
    gold: string;
    darkgray: string;
    yellow: string;
    white: string;
    red: string;
    minecoingold: string;
    green: string;
    lightpurple: string;
    gray: string;
    darkblue: string;
    darkaqua: string;
    blue: string;
    black: string;
    bluedarkgrey: string;
    mediumpurple: string;
    darkorange: string;
    mediumgreen: string;
    mediumcyan: string;
    beige: string;
    darkbrown: string;
    meduimred: string;
    brown: string;
    '\u00A70': string;
    '\u00A71': string;
    '\u00A72': string;
    '\u00A73': string;
    '\u00A74': string;
    '\u00A75': string;
    '\u00A76': string;
    '\u00A77': string;
    '\u00A78': string;
    '\u00A79': string;
    '\u00A7a': string;
    '\u00A7b': string;
    '\u00A7c': string;
    '\u00A7d': string;
    '\u00A7e': string;
    '\u00A7f': string;
    '\u00A7g': string;
    '\u00A7t': string;
    '\u00A7u': string;
    '\u00A7p': string;
    '\u00A7q': string;
    '\u00A7s': string;
    '\u00A7h': string;
    '\u00A7j': string;
    '\u00A7m': string;
    '\u00A7n': string;
};
export declare function evaluateChatColorType(text: string, type: string): string;
export declare function requestChatInput(player: Player, requestMessage?: string | RawMessage | (string | RawMessage)[]): Promise<string>;
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
export declare function chatMessage(eventData: ChatSendBeforeEvent, bypassChatInputRequests?: boolean): void;
export declare function chatSend(params: {
    returnBeforeChatSend: boolean | undefined;
    player: Player | undefined;
    eventData: ChatSendBeforeEvent | undefined;
    event: ChatSendBeforeEvent | undefined;
    newMessage: string | undefined;
}): void;
