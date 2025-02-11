import { StructureSaveMode, type DimensionLocation, Dimension } from "@minecraft/server";
import { menuButtonIds } from "modules/ui/constants/menuButtonIds";
/**
 * A class containing the configuration information for the add-on.
 */
export declare class config {
    static get chatCommandsEnabled(): boolean;
    static set chatCommandsEnabled(enabled: boolean | undefined);
    static get chatCommandPrefix(): string;
    static set chatCommandPrefix(prefix: string | undefined);
    static get validChatCommandPrefixes(): string;
    static set validChatCommandPrefixes(prefixes: string | undefined);
    static get invalidChatCommandAction(): number;
    static set invalidChatCommandAction(invalidChatCommandAction: number | undefined);
    /**
     * How long in seconds after getting damaged by another player that the player has to wait before they can teleport with commands such as `\spawn`, `\home`, `\gohome`, `\tpa`, and `\rtp`.
     *
     * It defaults to 0.
     */
    static get pvpCooldownToTeleport(): number;
    static set pvpCooldownToTeleport(invalidChatCommandAction: number | undefined);
    static get undoClipboardMode(): StructureSaveMode;
    static set undoClipboardMode(undoClipboardMode: StructureSaveMode | undefined);
    static get spawnCommandLocation(): {
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
    static get worldBorder(): {
        readonly overworld: {
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
        readonly nether: {
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
        readonly the_end: {
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
    static get shopSystem(): {
        readonly server: {
            enabled: boolean;
        };
        readonly player: {
            enabled: boolean;
            maxShopsPerPlayer: number;
            allowSellingLockInSlotItems: boolean;
            allowSellingLockInInventoryItems: boolean;
            allowSellingKeepOnDeathItems: boolean;
        };
        readonly sign: {
            enabled: boolean;
        };
    };
    static get homeSystem(): {
        homeSystemEnabled: boolean;
        maxHomesPerPlayer: number;
    };
    static get tpaSystem(): {
        tpaSystemEnabled: boolean;
        /**
         * The number of seconds after a teleport request is sent before it will time out.
         */
        timeoutDuration: number;
    };
    static get chatRanks(): {
        chatDisplayTimeStamp: boolean;
        showRanksOnPlayerNameTags: boolean;
        rankMode: string;
        rankDisplayPrefix: string;
        rankDisplaySuffix: string;
        nameDisplayPrefix: string;
        nameDisplaySuffix: string;
        chatNameAndMessageSeparator: string;
        rankDisplaySeparator: string;
        /**
         * The template string for individual ranks.
         */
        rankTemplateString: string;
        messageTemplateString: string;
        nameTagTemplateString: string;
        defaultRankTemplateString: string;
        defaultMessageFormatting: string;
        defaultNameFormatting: string;
        defaultSeparatorFormatting: string;
        disableCustomChatMessages: boolean;
        allowCustomChatMessagesMuting: boolean;
        autoEscapeChatMessages: boolean;
        autoURIEscapeChatMessages: boolean;
        allowChatEscapeCodes: boolean;
    };
    static get moneySystem(): {
        /**
         * Whether or not to use a scoreboard-based money system instead of a dynamic property-based one.
         *
         * Enabling this option will cause the money system to max out at the 32-bit integer limit (approximately 2.1 billion), but will allow for modifying a player's money with the /scoreboard command instead of having to use the main menu or use script eval.
         *
         * When this option is disabled the limit is 10^32767. So basically infinite.
         *
         * Default: false.
         *
         * Dynamic Property ID: andexdbSettings:moneySystem.useScoreboardBasedMoneySystem
         */
        useScoreboardBasedMoneySystem: boolean;
        /**
         * The name of the scoreboard to use for the money system.
         *
         * Default: "andexdb:money".
         *
         * Dynamic Property ID: andexdbSettings:moneySystem.scoreboardName
         */
        scoreboardName: string;
    };
    static get antiSpamSystem(): {
        antispamEnabled: boolean;
        restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute: boolean;
        waitTimeAfterAntispamActivation: number;
        maxTimeBewteenMessagesToTriggerAntiSpam: number;
        antispamTriggerMessageCount: number;
    };
    static get ui(): {
        readonly menus: {
            readonly mainMenu: {
                /**
                 *
                 */
                buttons: (keyof typeof menuButtonIds.mainMenu.buttons)[];
            };
        };
        readonly main: {};
        readonly pages: {
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
        readonly other: {
            useStarWarsReference404Page: boolean | undefined;
        };
    };
    static get system(): {
        artificialLagMS: number;
        timeZone: number;
        playerDataRefreshRate: number;
        protectedAreasRefreshRate: number;
        bannedPlayersRefreshRate: number;
        debugMode: boolean;
        /**
         * It is reccommended to leave this set to false.
         */
        allowWatchdogTerminationCrash: boolean;
        /**
         * It is reccommended to leave this set to false.
         */
        hideWatchdogTerminationCrashEnabledWarningsOnStartup: boolean;
        /**
         * It is recommended to leave this set to false.
         * @default false
         * @decorator
         * also
         * false
         */
        useLegacyPlayerInventoryDataSaveSystem: boolean;
        playerInventoryDataSaveSystemEnabled: boolean;
        spreadPlayerInventoryDataSavesOverMultipleTicks: boolean;
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
    static reset(): void;
    static toJSON(): {
        [k: string]: string | number | boolean | config | {
            x: null;
            y: null;
            z: null;
            dimension: Dimension;
        } | {
            readonly overworld: {
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
            readonly nether: {
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
            readonly the_end: {
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
        } | {
            readonly server: {
                enabled: boolean;
            };
            readonly player: {
                enabled: boolean;
                maxShopsPerPlayer: number;
                allowSellingLockInSlotItems: boolean;
                allowSellingLockInInventoryItems: boolean;
                allowSellingKeepOnDeathItems: boolean;
            };
            readonly sign: {
                enabled: boolean;
            };
        } | {
            homeSystemEnabled: boolean;
            maxHomesPerPlayer: number;
        } | {
            tpaSystemEnabled: boolean;
            /**
             * The number of seconds after a teleport request is sent before it will time out.
             */
            timeoutDuration: number;
        } | {
            chatDisplayTimeStamp: boolean;
            showRanksOnPlayerNameTags: boolean;
            rankMode: string;
            rankDisplayPrefix: string;
            rankDisplaySuffix: string;
            nameDisplayPrefix: string;
            nameDisplaySuffix: string;
            chatNameAndMessageSeparator: string;
            rankDisplaySeparator: string;
            /**
             * The template string for individual ranks.
             */
            rankTemplateString: string;
            messageTemplateString: string;
            nameTagTemplateString: string;
            defaultRankTemplateString: string;
            defaultMessageFormatting: string;
            defaultNameFormatting: string;
            defaultSeparatorFormatting: string;
            disableCustomChatMessages: boolean;
            allowCustomChatMessagesMuting: boolean;
            autoEscapeChatMessages: boolean;
            autoURIEscapeChatMessages: boolean;
            allowChatEscapeCodes: boolean;
        } | {
            /**
             * Whether or not to use a scoreboard-based money system instead of a dynamic property-based one.
             *
             * Enabling this option will cause the money system to max out at the 32-bit integer limit (approximately 2.1 billion), but will allow for modifying a player's money with the /scoreboard command instead of having to use the main menu or use script eval.
             *
             * When this option is disabled the limit is 10^32767. So basically infinite.
             *
             * Default: false.
             *
             * Dynamic Property ID: andexdbSettings:moneySystem.useScoreboardBasedMoneySystem
             */
            useScoreboardBasedMoneySystem: boolean;
            /**
             * The name of the scoreboard to use for the money system.
             *
             * Default: "andexdb:money".
             *
             * Dynamic Property ID: andexdbSettings:moneySystem.scoreboardName
             */
            scoreboardName: string;
        } | {
            antispamEnabled: boolean;
            restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute: boolean;
            waitTimeAfterAntispamActivation: number;
            maxTimeBewteenMessagesToTriggerAntiSpam: number;
            antispamTriggerMessageCount: number;
        } | {
            readonly menus: {
                readonly mainMenu: {
                    /**
                     *
                     */
                    buttons: (keyof typeof menuButtonIds.mainMenu.buttons)[];
                };
            };
            readonly main: {};
            readonly pages: {
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
            readonly other: {
                useStarWarsReference404Page: boolean | undefined;
            };
        } | {
            artificialLagMS: number;
            timeZone: number;
            playerDataRefreshRate: number;
            protectedAreasRefreshRate: number;
            bannedPlayersRefreshRate: number;
            debugMode: boolean;
            /**
             * It is reccommended to leave this set to false.
             */
            allowWatchdogTerminationCrash: boolean;
            /**
             * It is reccommended to leave this set to false.
             */
            hideWatchdogTerminationCrashEnabledWarningsOnStartup: boolean;
            /**
             * It is recommended to leave this set to false.
             * @default false
             * @decorator
             * also
             * false
             */
            useLegacyPlayerInventoryDataSaveSystem: boolean;
            playerInventoryDataSaveSystemEnabled: boolean;
            spreadPlayerInventoryDataSavesOverMultipleTicks: boolean;
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
        } | typeof config.reset | typeof config.toJSON;
    };
}
