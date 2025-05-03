import type { Player, RawMessage } from "@minecraft/server";
export declare function showActions(player: Player, title?: RawMessage | string, body?: string, ...buttons: [string, string?][]): Promise<import("@minecraft/server-ui").ActionFormResponse>;
