import { Entity } from "@minecraft/server";
export declare class PlayerPermissions {
    readonly player: Entity;
    constructor(player: Entity);
    /**
     * Gets the player's ability to use most of the operator-level custom commands in the add-on.
     * @warning This permission is not recommended for most players, as it can be used to grief the server.
     *
     * @param value - True if the player has the "canUseChatCommands" tag, otherwise false.
     */
    get canUseChatCommands(): boolean;
    /**
     * Sets the player's ability to use most of the operator-level custom commands in the add-on.
     * @warning This permission is not recommended for most players, as it can be used to grief the server.
     *
     * @param value - A boolean indicating whether the player can use the operator-level custom commands.
     *                 If true, the player will be granted the "canUseChatCommands" tag.
     *                 If false, the "canUseChatCommands" tag will be removed from the player.
     */
    set canUseChatCommands(value: boolean);
    /**
     * Gets the player's ability to use the more dangerous operator-level custom commands in the add-on, such as `\chunkban`.
     * @warning This permission is not recommended for most players, as it can be used to grief the server.
     *
     * @param value - True if the player has the "canUseDangerousCommands" tag, otherwise false.
     */
    get canUseDangerousCommands(): boolean;
    /**
     * Sets the player's ability to use most of the operator-level custom commands in the add-on.
     * @warning This permission is not recommended for most players, as it can be used to grief the server.
     *
     * @param value - A boolean indicating whether the player can use the operator-level custom commands.
     *                 If true, the player will be granted the "canUseDangerousCommands" tag.
     *                 If false, the "canUseDangerousCommands" tag will be removed from the player.
     */
    set canUseDangerousCommands(value: boolean);
    /**
     * Gets the player's ability to run arbitrary JavaScript code in the chat with the `${se}` or `${scripteval}` escape sequence.
     * @warning This permission is not recommended for most players, as it can be used to grief the server.
     *
     * @returns {boolean} True if the player has the "canUseScriptEval" tag, otherwise false.
     */
    get canUseScriptEval(): boolean;
    /**
     * Sets the player's ability to run arbitrary JavaScript code in the chat with the `${se}` or `${scripteval}` escape sequence.
     * @warning This permission is not recommended for most players, as it can be used to grief the server.
     *
     * @param value - A boolean indicating whether the player can run arbitrary JavaScript code in the chat with the `${se}` or `${scripteval}` escape sequence.
     *                 If true, the player is granted the "canUseScriptEval" tag.
     *                 If false, the "canUseScriptEval" tag is removed from the player.
     */
    set canUseScriptEval(value: boolean);
    /**
     * Gets the player's ability to run any vanilla command in the chat with the `${r}` or `${run}` escape sequence.
     * @warning This permission is not recommended for most players, as it can be used to grief the server.
     *
     * @returns {boolean} True if the player has the "canUseCommands" tag, otherwise false.
     */
    get canUseCommands(): boolean;
    /**
     * Sets the player's ability to run any vanilla command in the chat with the `${r}` or `${run}` escape sequence.
     * @warning This permission is not recommended for most players, as it can be used to grief the server.
     *
     * @param value - A boolean indicating whether the player can run commands in the chat with the `${r}` or `${run}` escape sequence.
     *                 If true, the player is granted the "canUseCommands" tag.
     *                 If false, the "canUseCommands" tag is removed from the player.
     */
    set canUseCommands(value: boolean);
    /**
     * The player's ability to bypass all forms of spawn protection.
     *
     * @warning This permission is not recommended for most players, as it will allow them to have tags that can be used to grief the server.
     *
     * @type {boolean} True if the player has the "canBypassProtectedAreas" tag, otherwise false.
     */
    get canBypassProtectedAreas(): boolean;
    set canBypassProtectedAreas(value: boolean);
    /**
     * The player's ability to see notifications when any player runs any custom command.
     *
     * @type {boolean} True if the player has the "getAllChatCommands" tag, otherwise false.
     */
    get getAllChatCommands(): boolean;
    set getAllChatCommands(value: boolean);
    /**
     * The player's ability to have operator-level tags.
     *
     * Only applies when `Main Menu > Security > Settings > Require admin tag for operator level tags` is enabled.
     * @warning This permission is not recommended for most players, as it will allow them to have tags that can be used to grief the server.
     *
     * @type {boolean} True if the player has the "admin" tag, otherwise false.
     */
    get admin(): boolean;
    set admin(value: boolean);
    /**
     * The player's permission level.
     *
     * The value is stored in the player's dynamic properties as `permissionLevel`.
     *
     * @type {number} An integer representing the player's permission level.
     * @unused
     */
    get permissionLevel(): number;
    set permissionLevel(permissionLevel: number);
    disableAllPermissions(): void;
    toJSON(): {
        canUseChatCommands: boolean;
        canUseDangerousCommands: boolean;
        canUseScriptEval: boolean;
        canUseCommands: boolean;
        canBypassProtectedAreas: boolean;
        getAllChatCommands: boolean;
        admin: boolean;
        permissionLevel: number;
    };
}
declare global {
    namespace globalThis {
        const PlayerPermissions: typeof import("./PlayerPermissions").PlayerPermissions;
    }
}
