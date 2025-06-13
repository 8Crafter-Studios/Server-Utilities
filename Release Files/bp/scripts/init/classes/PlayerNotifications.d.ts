import { Entity } from "@minecraft/server";
declare namespace exports {
    /**
     * A class that manages notifications settings for a player.
     */
    class PlayerNotifications {
        /**
         * The player whose notifications are being managed.
         *
         * @type {Entity}
         */
        readonly player: Entity;
        /**
         * Creates an new instance of the PlayerNotifications class.
         *
         * @param {Entity} player The player whose notifications are being managed.
         */
        constructor(player: Entity);
        get getAllChatCommands(): boolean;
        set getAllChatCommands(value: boolean);
        get getAllChatCommandsNotificationSound(): {
            soundId: string;
            pitch?: number;
            volume?: number;
        };
        set getAllChatCommandsNotificationSound(value: {
            soundId: string;
            pitch?: number;
            volume?: number;
        });
        get getAllChatMessages(): boolean;
        set getAllChatMessages(value: boolean);
        get getAllChatMessagesNotificationSound(): {
            soundId: string;
            pitch?: number;
            volume?: number;
        };
        set getAllChatMessagesNotificationSound(value: {
            soundId: string;
            pitch?: number;
            volume?: number;
        });
        get getGameRuleChangeNotifications(): boolean;
        set getGameRuleChangeNotifications(value: boolean);
        get getGameRuleChangeNotificationsNotificationSound(): {
            soundId: string;
            pitch?: number;
            volume?: number;
        };
        set getGameRuleChangeNotificationsNotificationSound(value: {
            soundId: string;
            pitch?: number;
            volume?: number;
        });
        get getBlockExplodeNotifications(): boolean;
        set getBlockExplodeNotifications(value: boolean);
        get getBlockExplodeNotificationsNotificationSound(): {
            soundId: string;
            pitch?: number;
            volume?: number;
        };
        set getBlockExplodeNotificationsNotificationSound(value: {
            soundId: string;
            pitch?: number;
            volume?: number;
        });
        get getButtonPushNotifications(): boolean;
        set getButtonPushNotifications(value: boolean);
        get getButtonPushNotificationsNotificationSound(): {
            soundId: string;
            pitch?: number;
            volume?: number;
        };
        set getButtonPushNotificationsNotificationSound(value: {
            soundId: string;
            pitch?: number;
            volume?: number;
        });
        get getEffectAddNotifications(): boolean;
        set getEffectAddNotifications(value: boolean);
        get getEffectAddNotificationsNotificationSound(): {
            soundId: string;
            pitch?: number;
            volume?: number;
        };
        set getEffectAddNotificationsNotificationSound(value: {
            soundId: string;
            pitch?: number;
            volume?: number;
        });
        get getEntityHurtNotifications(): boolean;
        set getEntityHurtNotifications(value: boolean);
        get getEntityHurtNotificationsNotificationSound(): {
            soundId: string;
            pitch?: number;
            volume?: number;
        };
        set getEntityHurtNotificationsNotificationSound(value: {
            soundId: string;
            pitch?: number;
            volume?: number;
        });
        get getEntityLoadNotifications(): boolean;
        set getEntityLoadNotifications(value: boolean);
        get getEntityLoadNotificationsNotificationSound(): {
            soundId: string;
            pitch?: number;
            volume?: number;
        };
        set getEntityLoadNotificationsNotificationSound(value: {
            soundId: string;
            pitch?: number;
            volume?: number;
        });
        get getEntityRemoveNotifications(): boolean;
        set getEntityRemoveNotifications(value: boolean);
        get getEntityRemoveNotificationsNotificationSound(): {
            soundId: string;
            pitch?: number;
            volume?: number;
        };
        set getEntityRemoveNotificationsNotificationSound(value: {
            soundId: string;
            pitch?: number;
            volume?: number;
        });
        get getEntitySpawnNotifications(): boolean;
        set getEntitySpawnNotifications(value: boolean);
        get getEntitySpawnNotificationsNotificationSound(): {
            soundId: string;
            pitch?: number;
            volume?: number;
        };
        set getEntitySpawnNotificationsNotificationSound(value: {
            soundId: string;
            pitch?: number;
            volume?: number;
        });
        get getExplosionNotifications(): boolean;
        set getExplosionNotifications(value: boolean);
        get getExplosionNotificationsNotificationSound(): {
            soundId: string;
            pitch?: number;
            volume?: number;
        };
        set getExplosionNotificationsNotificationSound(value: {
            soundId: string;
            pitch?: number;
            volume?: number;
        });
        get getPlayerDimensionChangeNotifications(): boolean;
        set getPlayerDimensionChangeNotifications(value: boolean);
        get getPlayerDimensionChangeNotificationsNotificationSound(): {
            soundId: string;
            pitch?: number;
            volume?: number;
        };
        set getPlayerDimensionChangeNotificationsNotificationSound(value: {
            soundId: string;
            pitch?: number;
            volume?: number;
        });
        get getBeforeExplosionNotifications(): boolean;
        set getBeforeExplosionNotifications(value: boolean);
        get getBeforeExplosionNotificationsNotificationSound(): {
            soundId: string;
            pitch?: number;
            volume?: number;
        };
        set getBeforeExplosionNotificationsNotificationSound(value: {
            soundId: string;
            pitch?: number;
            volume?: number;
        });
        get getBeforeChatSendNotifications(): boolean;
        set getBeforeChatSendNotifications(value: boolean);
        get getBeforeChatSendNotificationsNotificationSound(): {
            soundId: string;
            pitch?: number;
            volume?: number;
        };
        set getBeforeChatSendNotificationsNotificationSound(value: {
            soundId: string;
            pitch?: number;
            volume?: number;
        });
        get getPlayerGameModeChangeNotifications(): boolean;
        set getPlayerGameModeChangeNotifications(value: boolean);
        get getPlayerGameModeChangeNotificationsNotificationSound(): {
            soundId: string;
            pitch?: number;
            volume?: number;
        };
        set getPlayerGameModeChangeNotificationsNotificationSound(value: {
            soundId: string;
            pitch?: number;
            volume?: number;
        });
        get getWeatherChangeNotifications(): boolean;
        set getWeatherChangeNotifications(value: boolean);
        get getWeatherChangeNotificationsNotificationSound(): {
            soundId: string;
            pitch?: number;
            volume?: number;
        };
        set getWeatherChangeNotificationsNotificationSound(value: {
            soundId: string;
            pitch?: number;
            volume?: number;
        });
        get getLeverActionNotifications(): boolean;
        set getLeverActionNotifications(value: boolean);
        get getLeverActionNotificationsNotificationSound(): {
            soundId: string;
            pitch?: number;
            volume?: number;
        };
        set getLeverActionNotificationsNotificationSound(value: {
            soundId: string;
            pitch?: number;
            volume?: number;
        });
        get getMessageRecieveNotifications(): boolean;
        set getMessageRecieveNotifications(value: boolean);
        get getMessageRecieveNotificationsNotificationSound(): {
            soundId: string;
            pitch?: number;
            volume?: number;
        };
        set getMessageRecieveNotificationsNotificationSound(value: {
            soundId: string;
            pitch?: number;
            volume?: number;
        });
        get getBlockInteractTriggerExplosionNotifications(): boolean;
        set getBlockInteractTriggerExplosionNotifications(value: boolean);
        get getBlockInteractTriggerExplosionNotificationsNotificationSound(): {
            soundId: string;
            pitch?: number;
            volume?: number;
        };
        set getBlockInteractTriggerExplosionNotificationsNotificationSound(value: {
            soundId: string;
            pitch?: number;
            volume?: number;
        });
        get getEntityInteractTriggerExplosionNotifications(): boolean;
        set getEntityInteractTriggerExplosionNotifications(value: boolean);
        get getEntityInteractTriggerExplosionNotificationsNotificationSound(): {
            soundId: string;
            pitch?: number;
            volume?: number;
        };
        set getEntityInteractTriggerExplosionNotificationsNotificationSound(value: {
            soundId: string;
            pitch?: number;
            volume?: number;
        });
    }
}
export import PlayerNotifications = exports.PlayerNotifications;
declare global {
    namespace globalThis {
        export import PlayerNotifications = exports.PlayerNotifications;
    }
}
export {};
