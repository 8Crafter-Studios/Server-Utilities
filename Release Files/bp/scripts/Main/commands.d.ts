import type { ChatSendBeforeEvent, Player } from "@minecraft/server";
import type { command } from "modules/commands/classes/command";
import type { commands } from "modules/commands_list/constants/commands";
export declare const cmdsmetaimport: ImportMeta;
export declare function cmdsEval(x: string, eventData?: ChatSendBeforeEvent, bypassChatInputRequests?: boolean, runreturn?: boolean, returnBeforeChatSend?: boolean, returnBeforeChatCommandsOrChatSend?: boolean, event?: ChatSendBeforeEvent, player?: Player, sendToPlayers?: Player[], newMessage?: string, switchTest?: string, switchTestB?: string, commanda?: command<"built-in" | "custom" | "unknown"> | typeof commands[number] | {
    type: string;
}): any;
export declare function indirectCmdsEval(x: string): any;
export declare function cmdsRun(x: (...args: any[]) => any, ...args: any[]): any;
