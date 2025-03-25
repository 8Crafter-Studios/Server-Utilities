import { Player, type RawMessage } from "@minecraft/server";
export declare function requestChatInput(player: Player, requestMessage?: string | RawMessage | (string | RawMessage)[]): Promise<string>;
