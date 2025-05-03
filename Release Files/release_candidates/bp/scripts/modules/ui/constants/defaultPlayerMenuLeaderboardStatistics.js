import { MoneySystem } from "ExtraFeatures/money";
export const defaultPlayerMenuLeaderboardStatistics = [
    {
        type: "built-in",
        id: "money",
        buttonDisplayName: "Money",
        buttonIcon: "textures/items/emerald",
        menuTitle: "Money",
        statsListDisplayName: "Money",
        valueType: "bigint",
        getterFunction: (player) => {
            return tryget(() => new MoneySystem(player.id).money.toString()) ?? undefined;
        },
        sorter: (a, b) => (BigInt(a) > BigInt(b) ? -1 : BigInt(a) < BigInt(b) ? 1 : 0),
        displayOptions: {
            get currencyPrefix() {
                return config.ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.currencyPrefix;
            },
            get addCommaSeparators() {
                return config.ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.addCommaSeparators;
            },
        },
    },
];
//# sourceMappingURL=defaultPlayerMenuLeaderboardStatistics.js.map