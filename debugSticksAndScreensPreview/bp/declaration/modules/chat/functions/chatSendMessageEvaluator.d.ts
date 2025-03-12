import { Player } from "@minecraft/server";
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
    messageGradientMode?: string;
    nameFormatting?: string;
    nameGradientMode?: string;
    separatorFormatting?: string;
    separatorGradientMode?: string;
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
export declare function chatSendMessageEvaluator_prePlayers(message: string, displayName: ReturnType<typeof chatSend_getDisplayNameFromPlayer>, options?: Exclude<Parameters<typeof chatSendMessageEvaluator>[2], "targetPlayerSettings">): {
    messageFormatting: string;
    messageGradientMode: string;
    nameFormatting: string;
    nameGradientMode: string;
    separatorFormatting: string;
    separatorGradientMode: string;
    showDimension: boolean;
    rank: string;
    ranksListWithDefault: string[];
    displayName: {
        value?: string;
        hidden: boolean;
        sourceType: "hidden" | "sudo" | "nameTag" | "name";
    };
    name: string;
    nameb: string;
    namec: string;
    message: string;
    dimension: "the overworld" | "the nether" | "the end";
};
export declare function chatSendMessageEvaluator_players(prePlayersOutput: ReturnType<typeof chatSendMessageEvaluator_prePlayers>, options?: Parameters<typeof chatSendMessageEvaluator>[2]): string;
export declare function chatSend_getChatMessageFormatFromPlayerTags(player: Player | {
    hasTag: (tag: string) => boolean;
    getTags: () => string[];
}): {
    messageFormatting: string;
    messageGradientMode: string;
    nameFormatting: string;
    nameGradientMode: string;
    separatorFormatting: string;
    separatorGradientMode: string;
    showDimension: boolean;
};
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
