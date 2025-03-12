export declare const defaultPlayerMenuLeaderboardStatistics: [{
    readonly type: "built-in";
    readonly id: "money";
    readonly buttonDisplayName: "Money";
    readonly buttonIcon: "textures/items/emerald";
    readonly menuTitle: "Money";
    readonly statsListDisplayName: "Money";
    readonly valueType: "bigint";
    readonly getterFunction: (player: import("../../player_save/classes/savedPlayer").savedPlayer) => string;
    readonly sorter: (a: string, b: string) => 1 | -1 | 0;
    readonly displayOptions: {
        readonly currencyPrefix: string;
        readonly addCommaSeparators: boolean;
    };
}];
