import type { Vector3 } from "@minecraft/server";
import { StructureSaveMode, type DimensionLocation, Dimension } from "@minecraft/server";
import type { Warp } from "modules/coordinates/interfaces/Warp";
import type { PlayerDataSaveMode } from "modules/player_save/classes/savedPlayer";
import { menuButtonIds } from "modules/ui/constants/menuButtonIds";
import type { rankModes } from "modules/chat/constants/rankModes";
import type { playerMenuLeaderboardStatistic } from "modules/ui/types/playerMenuLeaderboardStatistic";
import type { rankEvaluatorModes } from "modules/chat/constants/rankEvaluatorModes";
import type { FilterKey } from "modules/utilities/functions/filterProperties";
declare namespace exports {
    /**
     * A class containing the configuration information for the add-on.
     * @hideconstructor
     */
    class config {
        /**
         * Whether or not chat commands are enabled.
         *
         * Dynamic Property ID: `andexdbSettings:chatCommandsEnabled`
         *
         * @default true
         *
         * @danger Disabling this setting is highly discouraged.
         */
        static get chatCommandsEnabled(): boolean;
        static set chatCommandsEnabled(enabled: boolean | undefined);
        /**
         * The prefix for all built-in chat commands.
         *
         * Dynamic Property ID: `andexdbSettings:chatCommandPrefix`
         *
         * @default "\\"
         */
        static get chatCommandPrefix(): string;
        static set chatCommandPrefix(prefix: string | undefined);
        /**
         * The list of command prefixes that the add-on will recognize and leave chat messages starting with those alone to allow other chat command add-ons to use them.
         *
         * Dynamic Property ID: `andexdbSettings:validChatCommandPrefixes`
         *
         * @default ""
         */
        static get validChatCommandPrefixes(): string;
        static set validChatCommandPrefixes(prefixes: string | undefined);
        /**
         * The action to take when an invalid chat command is entered.
         *
         * 0 = Do Nothing\
         * 1 = Send Message\
         * 2 = Cancel Message\
         * 3 = Warn Player
         *
         * Dynamic Property ID: `andexdbSettings:invalidChatCommandAction`
         *
         * @default 3
         */
        static get invalidChatCommandAction(): number;
        static set invalidChatCommandAction(invalidChatCommandAction: number | undefined);
        /**
         * The save mode for the undo clipboard.
         *
         * Dynamic Property ID: `andexdbSettings:undoClipboardMode`
         *
         * @default "Memory"
         */
        static get undoClipboardMode(): StructureSaveMode;
        static set undoClipboardMode(undoClipboardMode: StructureSaveMode | undefined);
        /**
         * The default spawn location for the gametest structures, this is used when spawning in no AI entities and simulated players.
         *
         * Dynamic Property ID: `andexdbSettings:gametestStructureDefaultSpawnLocation`
         *
         * @default { x: 1000000000, y: 100, z: 1000000000 }
         */
        static get gametestStructureDefaultSpawnLocation(): Vector3;
        static set gametestStructureDefaultSpawnLocation(gametestStructureDefaultSpawnLocation: Partial<Vector3> | undefined);
        /**
         * The location to teleport players when they use the \\spawn command.
         *
         * Dynamic Property ID: `andexdbSettings:spawnCommandLocation`
         *
         * @default { x: null, y: null, z: null, dimension: overworld }
         */
        static get spawnCommandLocation(): DimensionLocation | {
            x: null;
            y: null;
            z: null;
            dimension: Dimension;
        };
        static set spawnCommandLocation(spawnCommandLocation: DimensionLocation | {
            x: null;
            y: null;
            z: null;
            dimension: Dimension;
        } | undefined);
        /**
         * Whether or not players can teleport to spawn using the `\spawn` command when they are in a different dimension than the spawn.
         *
         * Dynamic Property ID: `andexdbSettings:spawnCommandAllowCrossDimensionalTeleport`
         *
         * @default true
         */
        static get spawnCommandAllowCrossDimensionalTeleport(): boolean;
        static set spawnCommandAllowCrossDimensionalTeleport(enabled: boolean | undefined);
        /**
         * The world border settings.
         * @group Subclasses
         */
        static get worldBorder(): {
            new (): {};
            /**
             * The world border settings for the overworld.
             * @group Subclasses
             */
            readonly overworld: {
                new (): {};
                enabled: boolean;
                get from(): {
                    x: number;
                    z: number;
                } | {
                    x: null;
                    z: null;
                };
                set from(from: {
                    x: number;
                    z: number;
                } | {
                    x: null;
                    z: null;
                } | undefined);
                get to(): {
                    x: number;
                    z: number;
                } | {
                    x: null;
                    z: null;
                };
                set to(to: {
                    x: number;
                    z: number;
                } | {
                    x: null;
                    z: null;
                } | undefined);
                mode: number;
                damage: number;
                knockbackH: number;
                knockbackV: number;
                preventWorldInteractionOutsideBorder: boolean;
                tintIntensity: number;
                /**
                 * d
                 * @todo
                 */
                warnPlayersInChat: boolean;
                /**
                 * b
                 * @todo
                 */
                showActionbarWarningWhenOutsideBorder: boolean;
                showRedScreenOutlineWhenOutsideBorder: boolean;
                showBorderParticles: boolean;
                /**
                 * @deprecated
                 */
                useShadersCompatibleBorderParticles: boolean;
                buffer: number;
            };
            /**
             * The world border settings for the nether.
             * @group Subclasses
             */
            readonly nether: {
                new (): {};
                enabled: boolean;
                get from(): {
                    x: number;
                    z: number;
                } | {
                    x: null;
                    z: null;
                };
                set from(from: {
                    x: number;
                    z: number;
                } | {
                    x: null;
                    z: null;
                } | undefined);
                get to(): {
                    x: number;
                    z: number;
                } | {
                    x: null;
                    z: null;
                };
                set to(to: {
                    x: number;
                    z: number;
                } | {
                    x: null;
                    z: null;
                } | undefined);
                mode: number;
                damage: number;
                knockbackH: number;
                knockbackV: number;
                preventWorldInteractionOutsideBorder: boolean;
                tintIntensity: number;
                /**
                 * @todo
                 */
                warnPlayersInChat: boolean;
                /**
                 * @todo
                 */
                showActionbarWarningWhenOutsideBorder: boolean;
                showRedScreenOutlineWhenOutsideBorder: boolean;
                showBorderParticles: boolean;
                /**
                 * @deprecated
                 */
                useShadersCompatibleBorderParticles: boolean;
                buffer: number;
            };
            /**
             * The world border settings for the end.
             * @group Subclasses
             */
            readonly the_end: {
                new (): {};
                enabled: boolean;
                get from(): {
                    x: number;
                    z: number;
                } | {
                    x: null;
                    z: null;
                };
                set from(from: {
                    x: number;
                    z: number;
                } | {
                    x: null;
                    z: null;
                } | undefined);
                get to(): {
                    x: number;
                    z: number;
                } | {
                    x: null;
                    z: null;
                };
                set to(to: {
                    x: number;
                    z: number;
                } | {
                    x: null;
                    z: null;
                } | undefined);
                mode: number;
                damage: number;
                knockbackH: number;
                knockbackV: number;
                preventWorldInteractionOutsideBorder: boolean;
                tintIntensity: number;
                /**
                 * @todo
                 */
                warnPlayersInChat: boolean;
                /**
                 * @todo
                 */
                showActionbarWarningWhenOutsideBorder: boolean;
                showRedScreenOutlineWhenOutsideBorder: boolean;
                showBorderParticles: boolean;
                /**
                 * @deprecated
                 */
                useShadersCompatibleBorderParticles: boolean;
                buffer: number;
            };
        };
        /**
         * The shop system settings.
         * @group Subclasses
         */
        static get shopSystem(): {
            new (): {};
            /**
             * The server shop system settings.
             * @group Subclasses
             */
            readonly server: {
                new (): {};
                /**
                 * Whether or not the server shop system is enabled.
                 *
                 * Dynamic Property ID: `andexdbShopSystemSettings:server.enabled`
                 *
                 * @default false
                 */
                enabled: boolean;
            };
            /**
             * The player shop system settings.
             * @group Subclasses
             */
            readonly player: {
                new (): {};
                /**
                 * Whether or not the player shop system is enabled.
                 *
                 * Dynamic Property ID: `andexdbShopSystemSettings:player.enabled`
                 *
                 * @default false
                 */
                enabled: boolean;
                /**
                 * The maximum amount of shops a player can have.
                 *
                 * Dynamic Property ID: `andexdbShopSystemSettings:player.maxShopsPerPlayer`
                 *
                 * @default 5
                 */
                maxShopsPerPlayer: number;
                /**
                 * Whether or not players can sell items that are locked to a specific slot in their inventory.
                 *
                 * Dynamic Property ID: `andexdbShopSystemSettings:player.allowSellingLockInSlotItems`
                 *
                 * @default false
                 */
                allowSellingLockInSlotItems: boolean;
                /**
                 * Whether or not players can sell items that are locked to inventory.
                 *
                 * Dynamic Property ID: `andexdbShopSystemSettings:player.allowSellingLockInInventoryItems`
                 *
                 * @default false
                 */
                allowSellingLockInInventoryItems: boolean;
                /**
                 * Whether or not players can sell items that have the keepOnDeath component set to true.
                 *
                 * Dynamic Property ID: `andexdbShopSystemSettings:player.allowSellingKeepOnDeathItems`
                 *
                 * @default true
                 */
                allowSellingKeepOnDeathItems: boolean;
            };
            /**
             * The sign shop system settings.
             * @alpha
             * @unused The sign shop system has not been implemented yet.
             * @group Subclasses
             */
            readonly sign: {
                new (): {};
                /**
                 * Whether or not the sign shop system is enabled.
                 *
                 * Dynamic Property ID: `andexdbShopSystemSettings:sign.enabled`
                 *
                 * @alpha
                 * @unused
                 *
                 * @default false
                 */
                enabled: boolean;
            };
        };
        /**
         * The settings for all teleportation related systems, features, and commands of that add-on that are available to regular players.
         * @group Subclasses
         */
        static get teleportSystems(): {
            new (): {};
            /**
             * Whether or not cross-dimensional teleports are allowed.
             *
             * Affects all types of teleports that regular players can use, including but not limited to the home system, TPA system, and the `\spawn` command.
             *
             * Overrides the `allowCrossDimensionalTeleport` options for the home system, TPA system, and `\spawn` command.
             *
             * Dynamic Property ID: `teleportSystemsSettings:allowCrossDimensionalTeleport`
             *
             * @default true
             */
            allowCrossDimensionalTeleport: boolean;
            /**
             * How long in seconds after teleporting that the player has to wait before they can teleport again.
             *
             * Set it to 0 to have no teleport cooldown.
             *
             * Dynamic Property ID: `homeSystemSettings:teleportCooldown`
             *
             * @default 30
             */
            teleportCooldown: number;
            /**
             * How long in seconds that the player has to stand still before they can teleport, if they move during this time period, the teleportation is canceled.
             *
             * Set it to 0 to have players teleport instantly.
             *
             * Dynamic Property ID: `homeSystemSettings:standStillTimeToTeleport`
             *
             * @default 5
             */
            standStillTimeToTeleport: number;
            /**
             * How long in seconds after getting damaged by another player that the player has to wait before they can teleport with the player menu or commands such as `\spawn`, `\home`, `\gohome`, `\tpa`, and `\rtp`.
             *
             * Set it to 0 to have no PVP cooldown.
             *
             * Dynamic Property ID: `andexdbSettings:pvpCooldownToTeleport`
             *
             * @default 15
             */
            pvpCooldownToTeleport: number;
        };
        /**
         * The home system settings.
         * @group Subclasses
         */
        static get homeSystem(): {
            new (): {};
            /**
             * Whether or not the home system is enabled.
             *
             * Dynamic Property ID: `homeSystemSettings:homeSystemEnabled`
             *
             * @default true
             */
            homeSystemEnabled: boolean;
            /**
             * The maximum number of homes a player can have.
             *
             * Dynamic Property ID: `homeSystemSettings:maxHomesPerPlayer`
             *
             * @default Infinity
             */
            maxHomesPerPlayer: number;
            /**
             * Whether or not you can teleport to a home that is in a different dimension than you.
             *
             * Dynamic Property ID: `homeSystemSettings:allowCrossDimensionalTeleport`
             *
             * @default true
             */
            allowCrossDimensionalTeleport: boolean;
            /**
             * Whether or not homes are allowed in dimensions other than the overworld.
             *
             * Dynamic Property ID: `homeSystemSettings:allowHomesInOtherDimensions`
             *
             * @default true
             */
            allowHomesInOtherDimensions: boolean;
        };
        /**
         * The teleport request system settings.
         * @group Subclasses
         */
        static get tpaSystem(): {
            new (): {};
            /**
             * Whether or not the teleport request system is enabled.
             *
             * Dynamic Property ID: `tpaSystemSettings:tpaSystemEnabled`
             *
             * @default true
             */
            tpaSystemEnabled: boolean;
            /**
             * The number of seconds after a teleport request is sent before it will time out.
             *
             * Dynamic Property ID: `tpaSystemSettings:timeoutDuration`
             *
             * @default 60
             */
            timeoutDuration: number;
            /**
             * Whether or not you can teleport to a player who is in a different dimension than you.
             *
             * Dynamic Property ID: `tpaSystemSettings:allowCrossDimensionalTeleport`
             *
             * @default true
             */
            allowCrossDimensionalTeleport: boolean;
        };
        /**
         * The chat and name tags settings.
         * @group Subclasses
         */
        static get chatRanks(): {
            new (): {};
            chatRankPrefix: string;
            chatSudoPrefix: string;
            chatDisplayTimeStamp: boolean;
            showRanksOnPlayerNameTags: boolean;
            showHealthOnPlayerNameTags: boolean;
            /**
             * The maximum number of decimal places to display on the health display on player name tags.
             *
             * Must be between 0 and 20 (inclusive).
             *
             * Dynamic Property ID: `andexdbSettings:playerNameTagHealthPrecision`
             *
             * @default 1
             */
            get playerNameTagHealthPrecision(): 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
            set playerNameTagHealthPrecision(playerNameTagHealthPrecision: number | undefined);
            rankMode: keyof typeof rankModes;
            rankEvaluatorMode_chat: (typeof rankEvaluatorModes)[number];
            rankEvaluatorMode_nameTags: (typeof rankEvaluatorModes)[number];
            rankDisplayPrefix: string;
            rankDisplaySuffix: string;
            nameDisplayPrefix: string;
            nameDisplaySuffix: string;
            chatNameAndMessageSeparator: string;
            rankDisplaySeparator: string;
            /**
             * The template string for displaying a player's dimension in the chat.
             *
             * Only applies in Custom(Advanced) mode.
             *
             * @todo
             *
             * @default "[${dimension}§r] "
             */
            chatDimensionTemplateString: string;
            /**
             * The template string for individual ranks.
             *
             * @default "[${rank}§r]"
             */
            rankTemplateString: string;
            messageTemplateString: string;
            nameTagTemplateString: string;
            defaultRank: string;
            defaultMessageFormatting: string;
            defaultNameFormatting: string;
            defaultSeparatorFormatting: string;
            disableCustomChatMessages: boolean;
            allowCustomChatMessagesMuting: boolean;
            autoEscapeChatMessages: boolean;
            autoURIEscapeChatMessages: boolean;
            allowChatEscapeCodes: boolean;
        };
        /**
         * The money system settings.
         * @group Subclasses
         */
        static get moneySystem(): {
            new (): {};
            /**
             * Whether or not to use a scoreboard-based money system instead of a dynamic property-based one.
             *
             * Enabling this option will cause the money system to max out at the 32-bit integer limit (approximately 2.1 billion), but will allow for modifying a player's money with the /scoreboard command instead of having to use the main menu or use script eval.
             *
             * When this option is disabled the limit is `10^32767`. So basically infinite.
             *
             * Dynamic Property ID: `andexdbSettings:moneySystem.useScoreboardBasedMoneySystem`
             *
             * @default false
             */
            useScoreboardBasedMoneySystem: boolean;
            /**
             * The name of the scoreboard to use for the money system.
             *
             * Dynamic Property ID: `andexdbSettings:moneySystem.scoreboardName`
             *
             * @default "andexdb:money"
             */
            scoreboardName: string;
        };
        /**
         * The bounty system settings.
         * @group Subclasses
         */
        static get bountySystem(): {
            new (): {};
            /**
             * Whether or not the bounty system is enabled.
             *
             * Dynamic Property ID: `andexdbSettings:bountySystem.enabled`
             *
             * @default true
             */
            enabled: boolean;
            /**
             * Whether to show the time that a player was last online in the stats list that is shown when a player clicks on the bounty for another player in the bounty list.
             *
             * Dynamic Property ID: `andexdbSettings:bountySystem.showLastOnlineTimeInPlayerStatsList`
             *
             * @default false
             */
            showLastOnlineTimeInBountyDetailsList: boolean;
        };
        /**
         * The warps system settings.
         * @group Subclasses
         */
        static get warpsSystem(): {
            new (): {};
            /**
             * Whether or not the warps system is enabled.
             *
             * Dynamic Property ID: `andexdbSettings:warpsSystem.enabled`
             *
             * @default true
             */
            enabled: boolean;
            /**
             * List of saved warps.
             *
             * Dynamic Property ID: `andexdbSettings:warpsSystem.warps`
             *
             * @default []
             *
             * @throws {TypeError} The setter throws if the input is not an array of warp interface objects or undefined.
             */
            warps: Warp[];
        };
        /**
         * The money transfer system settings.
         * @group Subclasses
         */
        static get moneyTransferSystem(): {
            new (): {};
            /**
             * Whether or not the money transfer system is enabled.
             *
             * Dynamic Property ID: `andexdbSettings:moneyTransferSystem.enabled`
             *
             * @default true
             */
            enabled: boolean;
        };
        /**
         * The anti-spam system settings.
         * @group Subclasses
         */
        static get antiSpamSystem(): {
            new (): {};
            /**
             * Whether or not the anti-spam system is enabled.
             *
             * Dynamic Property ID: `antispamSettings:antispamEnabled`
             *
             * @default false
             */
            antispamEnabled: boolean;
            /**
             * Whether or not to restart the anti-spam mute timer when a message is sent during a mute.
             *
             * Dynamic Property ID: `antispamSettings:restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute`
             *
             * @default false
             */
            restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute: boolean;
            /**
             * The wait time in seconds before a player can send another chat message.
             *
             * Dynamic Property ID: `antispamSettings:waitTimeAfterAntispamActivation`
             *
             * @default 60
             */
            waitTimeAfterAntispamActivation: number;
            /**
             * The maximum time in seconds between individual messages to trigger anti-spam.
             *
             * Dynamic Property ID: `antispamSettings:maxTimeBewteenMessagesToTriggerAntiSpam`
             *
             * @default 5
             */
            maxTimeBewteenMessagesToTriggerAntiSpam: number;
            /**
             * The message count to trigger anti-spam.
             *
             * Dynamic Property ID: `antispamSettings:antispamTriggerMessageCount`
             *
             * @default 4
             */
            antispamTriggerMessageCount: number;
        };
        /**
         * The moderation settings.
         * @group Subclasses
         */
        static get moderation(): {
            new (): {};
            /**
             * The ban settings.
             * @group Subclasses
             */
            readonly bans: {
                new (): {};
                /**
                 * Whether or not the ban system is enabled.
                 *
                 * Dynamic Property ID: `andexdbSettings:banEnabled`
                 *
                 * @default true
                 */
                enabled: boolean;
                /**
                 * How long it has to be since the last ban refresh before the bans list will be automatically refreshed, when getting the bans list or checking if a player is banned.
                 *
                 * Dynamic Property ID: `andexdbSettings:moderation.bans.minimumAutoRefresh`
                 *
                 * @default 1000
                 */
                minimumAutoRefresh: number | undefined;
            };
        };
        /**
         * The UI settings.
         * @group Subclasses
         */
        static get ui(): {
            new (): {};
            /**
             * The menu configurations.
             * @group Subclasses
             */
            readonly menus: {
                new (): {};
                /**
                 * The main menu settings.
                 * @group Subclasses
                 */
                readonly mainMenu: {
                    new (): {};
                    /**
                     *
                     */ /**
                     * Whether to show the buttons marked as deprecated on the main menu.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.mainMenu.showDeprecatedButtons`
                     *
                     * @default false
                     */
                    showDeprecatedButtons: boolean;
                    /**
                     * Whether to show the buttons marked as deprecated on the main menu.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.mainMenu.showExperimentalButtons`
                     *
                     * @default true
                     */
                    showExperimentalButtons: boolean;
                    /**
                     * Whether to show the buttons marked as deprecated on the main menu.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.mainMenu.showUnusedButtons`
                     *
                     * @default false
                     */
                    showUnusedButtons: boolean;
                    /**
                     * Whether to show the buttons for features that are planned to be added in a future update on the main menu.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.mainMenu.showUpcomingButtons`
                     *
                     * @default false
                     */
                    showUpcomingButtons: boolean;
                    /**
                     * Whether to show the buttons for features that are non-functional on the main menu.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.mainMenu.showNonFunctionalButtons`
                     *
                     * @default false
                     */
                    showNonFunctionalButtons: boolean;
                };
                /**
                 * The player menu settings.
                 * @group Subclasses
                 */
                readonly playerMenu: {
                    new (): {};
                    /**
                     * Whether or not the player menu is enabled.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.enabled`
                     *
                     * @default true
                     */
                    enabled: boolean;
                    /**
                     * The buttons to show on the player menu. They will appear in the order that they are specified in this option.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.buttons`
                     *
                     * @default JSON.stringify(
                     *    (Object.keys(menuButtonIds.playerMenu.buttons) as (keyof typeof menuButtonIds.playerMenu.buttons)[]).sort(
                     *        (a, b) =>
                     *            menuButtonIds.playerMenu.buttons[a].defaultButtonIndex >
                     *            menuButtonIds.playerMenu.buttons[b].defaultButtonIndex
                     *                ? 1
                     *                : menuButtonIds.playerMenu.buttons[a].defaultButtonIndex <
                     *                  menuButtonIds.playerMenu.buttons[b].defaultButtonIndex
                     *                ? -1
                     *                : 0
                     *    )
                     *)
                     */
                    buttons: (keyof typeof menuButtonIds.playerMenu.buttons)[];
                    /**
                     * The item name for the item that opens the player menu.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.itemName`
                     *
                     * @default "Menu"
                     */
                    itemName: string;
                    /**
                     * Whether to show the buttons marked as deprecated on the player menu.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.showDeprecatedButtons`
                     *
                     * @default false
                     */
                    showDeprecatedButtons: boolean;
                    /**
                     * Whether to show the buttons marked as deprecated on the player menu.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.showExperimentalButtons`
                     *
                     * @default true
                     */
                    showExperimentalButtons: boolean;
                    /**
                     * Whether to show the buttons marked as deprecated on the player menu.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.showUnusedButtons`
                     *
                     * @default false
                     */
                    showUnusedButtons: boolean;
                    /**
                     * Whether to show the buttons for features that are planned to be added in a future update on the player menu.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.showUpcomingButtons`
                     *
                     * @default false
                     */
                    showUpcomingButtons: boolean;
                    /**
                     * Whether to show the buttons for features that are non-functional on the player menu.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.showNonFunctionalButtons`
                     *
                     * @default false
                     */
                    showNonFunctionalButtons: boolean;
                };
                /**
                 * The settings for the player menu leaderboards.
                 * @group Subclasses
                 */
                readonly playerMenu_leaderboards: {
                    new (): {};
                    /**
                     * The settings for the built-in leaderboard statistics.
                     * @group Subclasses
                     */
                    readonly builtInStats: {
                        new (): {};
                        /**
                         * The settings for the built-in `money` leaderboard statistic.
                         * @group Subclasses
                         */
                        readonly money: {
                            new (): {};
                            /**
                             * Whether or not the built-in `money` leaderboard statictic is enabled.
                             *
                             * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.enabled`
                             *
                             * @default true
                             */
                            enabled: boolean;
                            /**
                             * The display options for the built-in `money` leaderboard statistic.
                             * @group Subclasses
                             */
                            readonly displayOptions: {
                                new (): {};
                                /**
                                 * A currency symbol to prefix the displayed value with.
                                 *
                                 * For example, if this is set to "$", then 1327401 would become $1327401 and -1234781 would become -$1234781. (Can be combined with "Add Comma Separators" to make it display like -$1,234,781.).
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.currencyPrefix`
                                 *
                                 * @default "$"
                                 */
                                currencyPrefix: string;
                                /**
                                 * Whether or not to add comma separators to the displayed value for this statistic.
                                 *
                                 * For example, if this is set to true, then 1327401 would become 1,327,401 and -1234781 would become -1,234,781.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.addCommaSeparators`
                                 *
                                 * @default true
                                 */
                                addCommaSeparators: boolean;
                            };
                        };
                    };
                    /**
                     * The custom leaderboard statistics.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu_leaderboards.customStats`
                     *
                     * @default []
                     */
                    customStats: playerMenuLeaderboardStatistic<"custom" | "customAdvanced">[];
                    /**
                     * The statistics that are displayed when a player clicks on another player inside of the player menu leaderboard, they will be displayed in the order they are in this array.
                     *
                     * It should be an array of ids of leaderboard statistics, including both custom and built-in ones.
                     *
                     * Defaults to the list of the built-in leaderboard statistics from the `defaultPlayerMenuLeaderboardStatistics` array, in the same order that they appear in the array.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu_leaderboards.trackedStats`
                     *
                     * @default defaultPlayerMenuLeaderboardStatistics.map((s) => s.id)
                     */
                    trackedStats: string[];
                    /**
                     * The list of statistics that have their own leaderboards, they will be displayed in the order they are in this array.
                     *
                     * It should be an array of ids of leaderboard statistics, including both custom and built-in ones.
                     *
                     * Defaults to the list of the built-in leaderboard statistics from the `defaultPlayerMenuLeaderboardStatistics` array, in the same order that they appear in the array.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu_leaderboards.leaderboards`
                     *
                     * @default defaultPlayerMenuLeaderboardStatistics.map((s) => s.id)
                     */
                    leaderboards: string[];
                    /**
                     * Whether to show the time that a player was last online in the stats list that is shown when a player click on another player in a leaderboard.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu_leaderboards.showLastOnlineTimeInPlayerStatsList`
                     *
                     * @default false
                     */
                    showLastOnlineTimeInPlayerStatsList: boolean;
                    /**
                     * Whether to show banned players inside of the leaderboards.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu_leaderboards.showBannedPlayersInLeaderboards`
                     *
                     * @default false
                     */
                    showBannedPlayersInLeaderboards: boolean;
                };
            };
            /**
             * The main UI settings.
             * @group Subclasses
             */
            readonly main: {
                new (): {};
            };
            /**
             * The settings for paged UI menus.
             * @group Subclasses
             */
            readonly pages: {
                new (): {};
                /**
                 * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
                 */
                maxPlayersPerManagePlayersPage: number;
                /**
                 * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
                 */
                maxBansPerManageBansPage: number;
                /**
                 * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
                 */
                maxHomesPerManageHomesPage: number;
            };
            /**
             * Other UI settings.
             * @group Subclasses
             */
            readonly other: {
                new (): {};
                useStarWarsReference404Page: boolean | undefined;
            };
        };
        /**
         * System settings.
         * @group Subclasses
         */
        static get system(): {
            new (): {};
            artificialLagMS: number;
            timeZone: number;
            playerDataRefreshRate: number;
            /**
             * How often to refresh protected areas.
             *
             * Dynamic Property ID: `andexdbSettings:protectedAreasRefreshRate`
             *
             * @default 200
             */
            protectedAreasRefreshRate: number;
            protectedAreasZoneActionsEnabled: boolean;
            protectedAreasZoneActionsInterval: number;
            protectedAreasZoneRefreshInterval: number;
            /**
             * How often to check for banned players.
             *
             * Dynamic Property ID: `andexdbSettings:bannedPlayersRefreshRate`
             *
             * @default 20
             */
            bannedPlayersRefreshRate: number;
            debugMode: boolean;
            /**
             * It is recommended to leave this set to false.
             *
             * Dynamic Property ID: `andexdbSettings:allowWatchdogTerminationCrash`
             *
             * @default false
             */
            allowWatchdogTerminationCrash: boolean;
            /**
             * It is recommended to leave this set to false.
             *
             * Dynamic Property ID: `andexdbSettings:hideWatchdogTerminationCrashEnabledWarningsOnStartup`
             *
             * @default false
             */
            hideWatchdogTerminationCrashEnabledWarningsOnStartup: boolean;
            autoSavePlayerData: boolean;
            /**
             * It is recommended to leave this set to false.
             *
             * Dynamic Property ID: `andexdbSettings:useLegacyPlayerInventoryDataSaveSystem`
             *
             * @default false
             */
            useLegacyPlayerInventoryDataSaveSystem: boolean;
            playerInventoryDataSaveSystemEnabled: boolean;
            spreadPlayerInventoryDataSavesOverMultipleTicks: boolean;
            playerDataSavePerformanceMode: PlayerDataSaveMode;
            showEntityScaleNotFoundConsoleLog: boolean;
            showEntityScaleFoundConsoleLog: boolean;
            showEntityScaleNotFoundChatLog: boolean;
            showEntityScaleFoundChatLog: boolean;
            showBlueModsAnticheatNotFoundConsoleLog: boolean;
            showBlueModsAnticheatFoundConsoleLog: boolean;
            showBlueModsAnticheatNotFoundChatLog: boolean;
            showBlueModsAnticheatFoundChatLog: boolean;
            /**
             * Sets whether or not the add-on is allowed to connect to and communicate with the entity scale add-on.
             * @warning It is HIGHLY DISCOURAGED to disable this option.
             */
            allowConnectingToEntityScale: boolean;
            /**
             * Sets whether or not the add-on is allowed to connect to and communicate with the BlueMods Anticheat add-on.
             * @warning It is HIGHLY DISCOURAGED to disable this option.
             */
            allowConnectingToBlueModsAnticheat: boolean;
        };
        /**
         * Resets the specified subsection of the config, or the entire config if no subsection is specified.
         * @param subsection The subsection of the config to reset. If not specified, the entire config will be reset.
         *
         * @example Reset the `config.worldBorder.overworld` section of the config:
         * ```ts
         * config.reset(config.worldBorder.overworld);
         * ```
         *
         * @example Reset the entire config:
         * ```ts
         * config.reset();
         * ```
         */
        static reset(subsection?: any): void;
        /**
         * Applies the specified settings to the config.
         * @param {FilterKey<DeepPartial<typeof config>, ["prototype", "reset", "applySettings", "toJSON"]>} settings The settings to apply to the config, as a partial of the JSONified version of the config.
         *
         * @example Apply settings to the config:
         * ```ts
         * config.applySettings({
         *     worldBorder: {
         *         overworld: {
         *             enabled: true
         *         },
         *     },
         *     chatCommandPrefix: "!",
         * });
         * ```
         */
        static applySettings<T extends FilterKey<typeof config, ["prototype", "reset", "applySettings", "toJSON"]>>(settings: DeepPartial<T>): void;
        /**
         * Converts the config object to a JSON-serializable object.
         * @returns {FilterKey<typeof config, ["prototype", "reset", "applySettings", "toJSON"]>} An object that can be serialized to JSON, containing all the properties of the config object except for the ones with the names "prototype", "reset", "applySettings", and "toJSON", and the ones that are not enumerable.
         */
        static toJSON(): FilterKey<typeof config, ["prototype", "reset", "applySettings", "toJSON"]>;
    }
}
export import config = exports.config;
/**
 * {@inheritDoc exports.config.system}
 */
export declare const system: {
    new (): {};
    artificialLagMS: number;
    timeZone: number;
    playerDataRefreshRate: number;
    /**
     * How often to refresh protected areas.
     *
     * Dynamic Property ID: `andexdbSettings:protectedAreasRefreshRate`
     *
     * @default 200
     */
    protectedAreasRefreshRate: number;
    protectedAreasZoneActionsEnabled: boolean;
    protectedAreasZoneActionsInterval: number;
    protectedAreasZoneRefreshInterval: number;
    /**
     * How often to check for banned players.
     *
     * Dynamic Property ID: `andexdbSettings:bannedPlayersRefreshRate`
     *
     * @default 20
     */
    bannedPlayersRefreshRate: number;
    debugMode: boolean;
    /**
     * It is recommended to leave this set to false.
     *
     * Dynamic Property ID: `andexdbSettings:allowWatchdogTerminationCrash`
     *
     * @default false
     */
    allowWatchdogTerminationCrash: boolean;
    /**
     * It is recommended to leave this set to false.
     *
     * Dynamic Property ID: `andexdbSettings:hideWatchdogTerminationCrashEnabledWarningsOnStartup`
     *
     * @default false
     */
    hideWatchdogTerminationCrashEnabledWarningsOnStartup: boolean;
    autoSavePlayerData: boolean;
    /**
     * It is recommended to leave this set to false.
     *
     * Dynamic Property ID: `andexdbSettings:useLegacyPlayerInventoryDataSaveSystem`
     *
     * @default false
     */
    useLegacyPlayerInventoryDataSaveSystem: boolean;
    playerInventoryDataSaveSystemEnabled: boolean;
    spreadPlayerInventoryDataSavesOverMultipleTicks: boolean;
    playerDataSavePerformanceMode: PlayerDataSaveMode;
    showEntityScaleNotFoundConsoleLog: boolean;
    showEntityScaleFoundConsoleLog: boolean;
    showEntityScaleNotFoundChatLog: boolean;
    showEntityScaleFoundChatLog: boolean;
    showBlueModsAnticheatNotFoundConsoleLog: boolean;
    showBlueModsAnticheatFoundConsoleLog: boolean;
    showBlueModsAnticheatNotFoundChatLog: boolean;
    showBlueModsAnticheatFoundChatLog: boolean;
    /**
     * Sets whether or not the add-on is allowed to connect to and communicate with the entity scale add-on.
     * @warning It is HIGHLY DISCOURAGED to disable this option.
     */
    allowConnectingToEntityScale: boolean;
    /**
     * Sets whether or not the add-on is allowed to connect to and communicate with the BlueMods Anticheat add-on.
     * @warning It is HIGHLY DISCOURAGED to disable this option.
     */
    allowConnectingToBlueModsAnticheat: boolean;
};
declare global {
    namespace globalThis {
        export import config = exports.config;
    }
}
export {};
