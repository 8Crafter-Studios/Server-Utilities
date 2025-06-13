import { Entity } from "@minecraft/server";
var exports;
(function (exports) {
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
        player;
        /**
         * Creates a new instance of the PlayerPermissions class.
         *
         * @param {Entity} player The player whose permissions are being managed.
         */
        constructor(player) {
            this.player = player;
        }
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
        get canUseChatCommands() {
            return this.player.hasTag("canUseChatCommands");
        }
        set canUseChatCommands(value) {
            value ? this.player.addTag("canUseChatCommands") : this.player.removeTag("canUseChatCommands");
        }
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
        get canUseDangerousCommands() {
            return this.player.hasTag("canUseDangerousCommands");
        }
        set canUseDangerousCommands(value) {
            value ? this.player.addTag("canUseDangerousCommands") : this.player.removeTag("canUseDangerousCommands");
        }
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
        get canUseScriptEval() {
            return this.player.hasTag("canUseScriptEval");
        }
        set canUseScriptEval(value) {
            value ? this.player.addTag("canUseScriptEval") : this.player.removeTag("canUseScriptEval");
        }
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
        get canUseCommands() {
            return this.player.hasTag("canUseCommands");
        }
        set canUseCommands(value) {
            value ? this.player.addTag("canUseCommands") : this.player.removeTag("canUseCommands");
        }
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
        get canBypassProtectedAreas() {
            return this.player.hasTag("canBypassProtectedAreas");
        }
        set canBypassProtectedAreas(value) {
            value ? this.player.addTag("canBypassProtectedAreas") : this.player.removeTag("canBypassProtectedAreas");
        }
        /**
         * The player's ability to see notifications when any player runs any custom command.
         *
         * True if the player has the `getAllChatCommands` tag, otherwise false.
         *
         * @type {boolean}
         *
         * @default false
         */
        get getAllChatCommands() {
            return this.player.hasTag("getAllChatCommands");
        }
        set getAllChatCommands(value) {
            value ? this.player.addTag("getAllChatCommands") : this.player.removeTag("getAllChatCommands");
        }
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
        get admin() {
            return this.player.hasTag("admin");
        }
        set admin(value) {
            value ? this.player.addTag("admin") : this.player.removeTag("admin");
        }
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
        get permissionLevel() {
            let val = Number(this.player.getDynamicProperty("permissionLevel") ?? 0);
            return val.isFinite() ? val.round() : 0;
        }
        set permissionLevel(permissionLevel) {
            if (typeof permissionLevel !== "number")
                throw new TypeError("The permission level must be a number.");
            if (!permissionLevel.isFinite())
                throw new RangeError("The permission level must be a finite number.");
            this.player.setDynamicProperty("permissionLevel", permissionLevel.round());
        }
        /**
         * Disables all permissions for the player.
         */
        disableAllPermissions() {
            this.canUseChatCommands = false;
            this.canUseDangerousCommands = false;
            this.canUseScriptEval = false;
            this.canUseCommands = false;
            this.canBypassProtectedAreas = false;
            this.getAllChatCommands = false;
            this.admin = false;
            this.permissionLevel = 0;
        }
        /**
         * Gets a JSON object representing the player's permissions.
         *
         * @returns {Pick<typeof this, "canUseChatCommands" | "canUseDangerousCommands" | "canUseScriptEval" | "canUseCommands" | "canBypassProtectedAreas" | "getAllChatCommands" | "admin" | "permissionLevel">} The player's permissions as a JSON object.
         */
        toJSON() {
            return {
                canUseChatCommands: this.canUseChatCommands,
                canUseDangerousCommands: this.canUseDangerousCommands,
                canUseScriptEval: this.canUseScriptEval,
                canUseCommands: this.canUseCommands,
                canBypassProtectedAreas: this.canBypassProtectedAreas,
                getAllChatCommands: this.getAllChatCommands,
                admin: this.admin,
                permissionLevel: this.permissionLevel,
            };
        }
    }
    exports.PlayerPermissions = PlayerPermissions;
})(exports || (exports = {}));
export var PlayerPermissions = exports.PlayerPermissions;
Object.defineProperties(Entity.prototype, {
    playerPermissions: {
        get: function playerPermissions() {
            return new PlayerPermissions(this);
        },
        configurable: true,
        enumerable: true,
    },
}); /*
export function customFormUIEditor(sourceEntity: Entity|Player){
    let form2 = new ModalFormData();
    let players = world.getAllPlayers();
    let targetList = [players[0]!.nameTag]
    for (const index in players) {
        if (Number(index) != 0) {
        targetList = String([String(targetList), players[index]!.nameTag]).split(",");
        }
    }
    let formId = event.message ?? "test1234"
    let form = editCustomFormUI(formId)
    forceShow(form.form, (event.sourceEntity as Player)).then(to => {
        let t = (to as ModalFormResponse)
        if (t.canceled) return;
        world.setDynamicProperty(`customUI:${formId}`, `${t.formValues![0]}|${t.formValues![1]}`)
        let elementValues = t.formValues.slice(2, -2)
        console.warn(elementValues)
        elementValues.forEach((v, i)=>{switch(i % 5){
            case 0: world.setDynamicProperty(`customUIElement:${formId}|${form.indexList[Math.floor(i / 5)]}`, `${customElementTypeIds[Number(elementValues[i])]}|${elementValues.slice(i+1, i+4).join("|")}`); break;
            case 4: if(Boolean(v)==true){world.setDynamicProperty(`customUIElement:${formId}|${form.indexList[Math.floor(i / 5)]}`)}; break;
        }});
        if (t.formValues![t.formValues.length-2]){world.setDynamicProperty(`customUIElement:${formId}|${(Number(t.formValues![t.formValues.length-1]) ?? ((form.indexList[form.indexList.length-1] ?? -1)+1))}`, ""); }
}).catch(e => {
    console.error(e, e.stack);
});}*/
Object.defineProperty(globalThis, "PlayerPermissions", {
    value: exports.PlayerPermissions,
    enumerable: true,
    configurable: true,
    writable: false,
});
//# sourceMappingURL=PlayerPermissions.js.map