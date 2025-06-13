import { Player } from "@minecraft/server";
import "init/classes/config";
export declare function rankNameTagEvaluator(displayName: ReturnType<typeof rankNameTagEvaluator_getDisplayNameFromPlayer>, options?: {
    isPlaceholderPlayer?: boolean;
    player?: Player;
    playerPersonalSettings?: {
        defaultNameFormatting?: string;
        chatRankPrefix?: string;
        rankDisplayPrefix?: string;
        rankDisplaySuffix?: string;
        rankDisplaySeparator?: string;
    };
    ranks?: string[];
    tags?: string[];
    currentHealth?: number;
    maxHealth?: number;
    nameFormatting?: string;
    nameGradientMode?: string;
    showHealth?: boolean;
}): string;
export declare function rankNameTagEvaluator_prePlayers(displayName: ReturnType<typeof rankNameTagEvaluator_getDisplayNameFromPlayer>, options?: Exclude<Parameters<typeof rankNameTagEvaluator>[1], "targetPlayerSettings">): {
    nameFormatting: string;
    nameGradientMode: string | undefined;
    showHealth: boolean;
    currentHealth: number | undefined;
    maxHealth: number | undefined;
    rank: string;
    ranksListWithDefault: string[] | undefined;
    displayName: {
        value?: string;
        hidden: boolean;
        sourceType: "hidden" | "sudo" | "nameTag" | "name";
    };
    name: string;
};
export declare function rankNameTagEvaluator_players(prePlayersOutput: ReturnType<typeof rankNameTagEvaluator_prePlayers>, options?: Parameters<typeof rankNameTagEvaluator>[1]): string;
export declare function rankNameTagEvaluator_getChatMessageFormatFromPlayerTags(player: Player | {
    hasTag: (tag: string) => boolean;
    getTags: () => string[];
}): {
    nameFormatting: string;
    nameGradientMode?: string;
    showHealth: boolean;
};
export declare function rankNameTagEvaluator_getRanksFromPlayerTags(player: Player | {
    hasTag: (tag: string) => boolean;
    getTags: () => string[];
}, options?: {
    playerPersonalSettings?: {
        chatRankPrefix?: string;
    };
}): string[];
export declare function rankNameTagEvaluator_getDisplayNameFromPlayer(player: Player | {
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
export declare function rankNameTagEvaluator_generatePartialPlayerTypeForRankNameTagEvaluatorEvaluationFunctions(player: Player | {
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
export declare function rankNameTagEvaluator_getPlayerPersonalSettings(player: Player): NonNullable<Parameters<typeof rankNameTagEvaluator>[1]>["playerPersonalSettings"] & NonNullable<Parameters<typeof rankNameTagEvaluator_getDisplayNameFromPlayer>[1]>["playerPersonalSettings"];
