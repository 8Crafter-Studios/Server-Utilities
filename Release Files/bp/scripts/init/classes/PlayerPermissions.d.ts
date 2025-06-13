import { Entity } from "@minecraft/server";
declare namespace exports {
    /**
     * A class that manages the permissions of a player.
     *
     * Note: This only applies when the security mode is set to "Standard Security Mode" and not "Ultra Security Mode".
     *
     * @see {@link securityVariables}
     */
    class PlayerPermissions {
        /**
         * The player whose permissions are being managed.
         *
         * @type {Entity}
         */
        readonly player: Entity;
        /**
         * Creates a new instance of the PlayerPermissions class.
         *
         * @param {Entity} player The player whose permissions are being managed.
         */
        constructor(player: Entity);
        /**
         * The player's ability to use most of the operator-level custom commands in the add-on.
         *
         * True if the player has the `canUseChatCommands` tag, otherwise false.
         *
         * @warning This permission is not recommended for most players, as it can be used to grief the server.
         *
         * @type {boolean}
         *
         * @default false
         */
        get canUseChatCommands(): boolean;
        set canUseChatCommands(value: boolean);
        /**
         * The player's ability to use the more dangerous operator-level custom commands in the add-on, such as `\chunkban`.
         *
         * True if the player has the `canUseDangerousCommands` tag, otherwise false.
         *
         * @warning This permission is not recommended for most players, as it can be used to grief the server.
         *
         * @type {boolean}
         *
         * @default false
         */
        get canUseDangerousCommands(): boolean;
        set canUseDangerousCommands(value: boolean);
        /**
         * Gets the player's ability to run arbitrary JavaScript code in the chat with the `${se}` or `${scripteval}` escape sequence.
         *
         * True if the player has the `canUseScriptEval` tag, otherwise false.
         *
         * @warning This permission is not recommended for most players, as it can be used to grief the server.
         *
         * @type {boolean}
         *
         * @default false
         */
        get canUseScriptEval(): boolean;
        set canUseScriptEval(value: boolean);
        /**
         * Gets the player's ability to run any vanilla command in the chat with the `${r}` or `${run}` escape sequence.
         *
         * True if the player has the `canUseCommands` tag, otherwise false.
         *
         * @warning This permission is not recommended for most players, as it can be used to grief the server.
         *
         * @type {boolean}
         *
         * @default false
         */
        get canUseCommands(): boolean;
        set canUseCommands(value: boolean);
        /**
         * The player's ability to bypass all forms of spawn protection.
         *
         * True if the player has the `canBypassProtectedAreas` tag, otherwise false.
         *
         * @warning This permission is not recommended for most players, as it will allow them to have tags that can be used to grief the server.
         *
         * @type {boolean}
         *
         * @default false
         */
        get canBypassProtectedAreas(): boolean;
        set canBypassProtectedAreas(value: boolean);
        /**
         * The player's ability to see notifications when any player runs any custom command.
         *
         * True if the player has the `getAllChatCommands` tag, otherwise false.
         *
         * @type {boolean}
         *
         * @default false
         */
        get getAllChatCommands(): boolean;
        set getAllChatCommands(value: boolean);
        /**
         * The player's ability to have operator-level tags.
         *
         * True if the player has the `admin` tag, otherwise false.
         *
         * Only applies when `Main Menu > Security > Settings > Require admin tag for operator level tags` is enabled.
         * @warning This permission is not recommended for most players, as it will allow them to have tags that can be used to grief the server.
         *
         * @type {boolean}
         *
         * @default false
         */
        get admin(): boolean;
        set admin(value: boolean);
        /**
         * The player's permission level.
         *
         * An integer representing the player's permission level.
         *
         * The value is stored in the player's dynamic properties as `permissionLevel`.
         *
         * @unused
         *
         * @type {number}
         *
         * @default 0
         */
        get permissionLevel(): number;
        set permissionLevel(permissionLevel: number);
        /**
         * Disables all permissions for the player.
         */
        disableAllPermissions(): void;
        /**
         * Gets a JSON object representing the player's permissions.
         *
         * @returns {Pick<typeof this, "canUseChatCommands" | "canUseDangerousCommands" | "canUseScriptEval" | "canUseCommands" | "canBypassProtectedAreas" | "getAllChatCommands" | "admin" | "permissionLevel">} The player's permissions as a JSON object.
         */
        toJSON(): Pick<typeof this, "canUseChatCommands" | "canUseDangerousCommands" | "canUseScriptEval" | "canUseCommands" | "canBypassProtectedAreas" | "getAllChatCommands" | "admin" | "permissionLevel">;
    }
}
export import PlayerPermissions = exports.PlayerPermissions;
declare global {
    namespace globalThis {
        export import PlayerPermissions = exports.PlayerPermissions;
    }
}
export {};
