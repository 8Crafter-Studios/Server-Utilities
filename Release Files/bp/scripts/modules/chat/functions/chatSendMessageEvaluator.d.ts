import { Player } from "@minecraft/server";
import "init/classes/config";
import { patternFunctionList } from "modules/chat/constants/patternFunctionList";
export declare function chatSendMessageEvaluator(message: string, displayName: ReturnType<typeof chatSend_getDisplayNameFromPlayer>, options?: {
    isPlaceholderPlayer?: boolean;
    player?: Player;
    allowEval?: boolean;
    isPlaceholderTargetPlayer?: boolean;
    targetPlayer?: Player;
    playerPersonalSettings?: {
        defaultMessageFormatting?: string;
        defaultNameFormatting?: string;
        defaultSeparatorFormatting?: string;
        chatRankPrefix?: string;
        rankDisplayPrefix?: string;
        rankDisplaySuffix?: string;
        rankDisplaySeparator?: string;
        nameDisplayPrefix?: string;
        nameDisplaySuffix?: string;
        chatNameAndMessageSeparator?: string;
        /**
         * Should be true if the player has the `hideChatDisplayTimeStamp` tag.
         *
         * If true, the time stamp will not be displayed for messages sent by this player.
         *
         * @deprecated This option will soon be removed.
         */
        hideChatDisplayTimeStamp?: boolean;
    };
    targetPlayerSettings?: {
        /**
         * Should be true if the player has the `chatDisplayTimeStamps` tag.
         *
         * If true, the time stamp will be displayed for ALL messages sent to this player.
         */
        messageTimeStampEnabled?: boolean;
        /**
         * Should be true if the player has the `hideChatDisplayTimeStamps` tag.
         *
         * If true, the time stamp will not be displayed for messages sent to this player.
         */
        hideChatDisplayTimeStamps?: boolean;
        timeZone?: number;
    };
    ranks?: string[];
    tags?: string[];
    dimension?: keyof typeof dimensionTypeDisplayFormatting;
    messageFormatting?: string;
    messageGradientMode?: keyof typeof patternFunctionList;
    nameFormatting?: string;
    nameGradientMode?: keyof typeof patternFunctionList;
    separatorFormatting?: string;
    separatorGradientMode?: keyof typeof patternFunctionList;
    showDimension?: boolean;
    /**
     * Coming Soon!
     */
    /**
     * Should be true if the player has the `chatDisplayTimeStamp` tag.
     *
     * If true, the time stamp will be displayed for messages sent by this player.
     *
     * @deprecated This option will soon be removed.
     */
    messageTimeStampEnabled?: boolean;
    time?: number;
}): string;
export interface chatSendMessageEvaluator_prePlayersOutput {
    /**
     * The message formatting to use.
     *
     * Should be a string of formatting codes.
     *
     * @see https://minecraft.wiki/w/Formatting_codes
     *
     * @default ""
     *
     * @example
     * ```ts
     * "§r§l§o§4"
     * ```
     */
    messageFormatting: string;
    /**
     * The message gradient mode that was used.
     *
     * If undefined, no gradient was used.
     *
     * @type {keyof typeof patternFunctionList | undefined}
     *
     * @default undefined
     */
    readonly messageGradientMode: keyof typeof patternFunctionList;
    /**
     * The name formatting to use.
     *
     * Should be a string of formatting codes.
     *
     * @see https://minecraft.wiki/w/Formatting_codes
     *
     * @default ""
     *
     * @example
     * ```ts
     * "§r§l§o§4"
     * ```
     */
    nameFormatting: string;
    /**
     * The message gradient mode that was used.
     *
     * If undefined, no gradient was used.
     *
     * @type {keyof typeof patternFunctionList | undefined}
     *
     * @default undefined
     */
    readonly nameGradientMode: keyof typeof patternFunctionList;
    /**
     * The separator formatting to use.
     *
     * Should be a string of formatting codes.
     *
     * @see https://minecraft.wiki/w/Formatting_codes
     *
     * @default ""
     *
     * @example
     * ```ts
     * "§r§l§o§4"
     * ```
     */
    separatorFormatting: string;
    /**
     * The message gradient mode that was used.
     *
     * If undefined, no gradient was used.
     *
     * @type {keyof typeof patternFunctionList | undefined}
     *
     * @default undefined
     */
    readonly separatorGradientMode: keyof typeof patternFunctionList;
    /**
     * Whether to show the player's dimension in the message.
     *
     * @type {boolean}
     *
     * @default false
     */
    showDimension: boolean;
    /**
     * The player's evaluated rank string.
     *
     * @type {string}
     */
    rank: string;
    /**
     * The list of ranks the player has.
     *
     * If the player has any ranks, it is an array containing those ranks.
     *
     * If the player has no ranks and there is a default chat rank set, it is an array containing that rank.
     *
     * If the player has no ranks and there is no default chat rank set, it is an empty array.
     *
     * @type {string[]}
     */
    ranksListWithDefault: string[];
    /**
     * The player's evaluated name tag.
     *
     * @type {{ value?: string; hidden: boolean; sourceType: "hidden" | "sudo" | "nameTag" | "name" }}
     */
    displayName: {
        value?: string;
        hidden: boolean;
        sourceType: "hidden" | "sudo" | "nameTag" | "name";
    };
    /**
     * The player's evaluated name string, including the prefix, suffix, formatting, static color, and gradient.
     *
     * @type {string}
     *
     * @example "§r§l§o§4Andexter8"
     */
    name: string;
    /**
     * The player's evaluated name string without the prefix, suffix, formatting, and static color.
     * It does include the gradient.
     *
     * @type {string}
     *
     * @example "§a§cAndexter8"
     */
    nameb: string;
    /**
     * An unused property.
     *
     * @deprecated This is not used.
     */
    namec: string;
    /**
     * The player's evaluated message string, with the gradient already applied if {@link messageGradientMode} was not `undefined`.
     *
     * @type {string}
     */
    message: string;
    /**
     * The player's evaluated dimension string.
     *
     * @type {"the overworld" | "the nether" | "the end"}
     */
    dimension: "the overworld" | "the nether" | "the end";
}
export declare function chatSendMessageEvaluator_prePlayers(message: string, displayName: ReturnType<typeof chatSend_getDisplayNameFromPlayer>, options?: Exclude<Parameters<typeof chatSendMessageEvaluator>[2], "targetPlayerSettings">): chatSendMessageEvaluator_prePlayersOutput;
export declare function chatSendMessageEvaluator_players(prePlayersOutput: ReturnType<typeof chatSendMessageEvaluator_prePlayers>, options?: Parameters<typeof chatSendMessageEvaluator>[2]): string;
/**
 * The message format details from a list of player tags.
 *
 * @see {@link chatSend_getChatMessageFormatFromPlayerTags}
 */
export interface TagChatMessageFormat {
    /**
     * The message formatting to use.
     *
     * Should be a string of formatting codes.
     *
     * @see https://minecraft.wiki/w/Formatting_codes
     *
     * @default ""
     *
     * @example
     * ```ts
     * "§r§l§o§4"
     * ```
     */
    messageFormatting: string;
    /**
     * The message gradient mode to use.
     *
     * If undefined, no gradient will be used.
     *
     * @type {keyof typeof patternFunctionList | undefined}
     *
     * @default undefined
     */
    messageGradientMode: keyof typeof patternFunctionList;
    /**
     * The name formatting to use.
     *
     * Should be a string of formatting codes.
     *
     * @see https://minecraft.wiki/w/Formatting_codes
     *
     * @default ""
     *
     * @example
     * ```ts
     * "§r§l§o§4"
     * ```
     */
    nameFormatting: string;
    /**
     * The message gradient mode to use.
     *
     * If undefined, no gradient will be used.
     *
     * @type {keyof typeof patternFunctionList | undefined}
     *
     * @default undefined
     */
    nameGradientMode: keyof typeof patternFunctionList;
    /**
     * The separator formatting to use.
     *
     * Should be a string of formatting codes.
     *
     * @see https://minecraft.wiki/w/Formatting_codes
     *
     * @default ""
     *
     * @example
     * ```ts
     * "§r§l§o§4"
     * ```
     */
    separatorFormatting: string;
    /**
     * The message gradient mode to use.
     *
     * If undefined, no gradient will be used.
     *
     * @type {keyof typeof patternFunctionList | undefined}
     *
     * @default undefined
     */
    separatorGradientMode: keyof typeof patternFunctionList;
    /**
     * Whether to show the player's dimension in the message.
     *
     * @type {boolean}
     *
     * @default false
     */
    showDimension: boolean;
}
export declare function chatSend_getChatMessageFormatFromPlayerTags(player: Player | {
    hasTag: (tag: string) => boolean;
    getTags: () => string[];
}): TagChatMessageFormat;
export declare function chatSend_getRanksFromPlayerTags(player: Player | {
    hasTag: (tag: string) => boolean;
    getTags: () => string[];
}, options?: {
    playerPersonalSettings?: {
        chatRankPrefix?: string;
    };
}): string[];
export declare function chatSend_getDisplayNameFromPlayer(player: Player | {
    hasTag: (tag: string) => boolean;
    getTags: () => string[];
    nameTag?: string;
    name?: string;
}, options?: {
    playerPersonalSettings?: {
        chatSudoPrefix?: string;
    };
}): {
    value?: string;
    hidden: boolean;
    sourceType: "hidden" | "sudo" | "nameTag" | "name";
};
export declare function chatSend_generatePartialPlayerTypeForChatSendEvaluationFunctions(player: Player | {
    tags?: string[];
    nameTag?: string;
    name?: string;
}): {
    name?: string;
    nameTag?: string;
    tags: string[];
    hasTag(tag: string): boolean;
    getTags(): string[];
};
export declare function chatSend_getPlayerPersonalSettings(player: Player): Parameters<typeof chatSendMessageEvaluator>[2]["playerPersonalSettings"] & Parameters<typeof chatSend_getDisplayNameFromPlayer>[1]["playerPersonalSettings"];
export declare function chatSend_getTargetPlayerSettings(player: Player): Parameters<typeof chatSendMessageEvaluator>[2]["targetPlayerSettings"];
