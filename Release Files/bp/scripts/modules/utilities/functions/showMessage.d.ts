import type { Player, RawMessage } from "@minecraft/server";
export declare function showMessage(player: Player, title?: RawMessage | string, body?: string, button1?: string, button2?: string): Promise<import("@minecraft/server-ui").MessageFormResponse>;
