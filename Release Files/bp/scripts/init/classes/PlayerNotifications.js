import { Entity } from "@minecraft/server";
export class PlayerNotifications {
    player;
    constructor(player) {
        this.player = player;
    }
    get getAllChatCommands() {
        return this.player.hasTag("getAllChatCommands");
    }
    set getAllChatCommands(value) {
        value
            ? this.player.addTag("getAllChatCommands")
            : this.player.removeTag("getAllChatCommands");
    }
    get getAllChatCommandsNotificationSound() {
        return JSON.parse(String(this.player.getDynamicProperty("getAllChatCommandsNotificationSound") ?? '{"soundId": "none"}'));
    }
    set getAllChatCommandsNotificationSound(value) {
        this.player.setDynamicProperty("getAllChatCommandsNotificationSound", JSON.stringify(value, undefined, 0));
    }
    get getAllChatMessages() {
        return this.player.hasTag("getAllChatMessages");
    }
    set getAllChatMessages(value) {
        value
            ? this.player.addTag("getAllChatMessages")
            : this.player.removeTag("getAllChatMessages");
    }
    get getAllChatMessagesNotificationSound() {
        return JSON.parse(String(this.player.getDynamicProperty("getAllChatMessagesNotificationSound") ?? '{"soundId": "none"}'));
    }
    set getAllChatMessagesNotificationSound(value) {
        this.player.setDynamicProperty("getAllChatMessagesNotificationSound", JSON.stringify(value, undefined, 0));
    }
    get getGameRuleChangeNotifications() {
        return this.player.hasTag("getGameRuleChangeNotifications");
    }
    set getGameRuleChangeNotifications(value) {
        value
            ? this.player.addTag("getGameRuleChangeNotifications")
            : this.player.removeTag("getGameRuleChangeNotifications");
    }
    get getGameRuleChangeNotificationsNotificationSound() {
        return JSON.parse(String(this.player.getDynamicProperty("getGameRuleChangeNotificationsNotificationSound") ?? '{"soundId": "none"}'));
    }
    set getGameRuleChangeNotificationsNotificationSound(value) {
        this.player.setDynamicProperty("getGameRuleChangeNotificationsNotificationSound", JSON.stringify(value, undefined, 0));
    }
    get getBlockExplodeNotifications() {
        return this.player.hasTag("getBlockExplodeNotifications");
    }
    set getBlockExplodeNotifications(value) {
        value
            ? this.player.addTag("getBlockExplodeNotifications")
            : this.player.removeTag("getBlockExplodeNotifications");
    }
    get getBlockExplodeNotificationsNotificationSound() {
        return JSON.parse(String(this.player.getDynamicProperty("getBlockExplodeNotificationsNotificationSound") ?? '{"soundId": "none"}'));
    }
    set getBlockExplodeNotificationsNotificationSound(value) {
        this.player.setDynamicProperty("getBlockExplodeNotificationsNotificationSound", JSON.stringify(value, undefined, 0));
    }
    get getButtonPushNotifications() {
        return this.player.hasTag("getButtonPushNotifications");
    }
    set getButtonPushNotifications(value) {
        value
            ? this.player.addTag("getButtonPushNotifications")
            : this.player.removeTag("getButtonPushNotifications");
    }
    get getButtonPushNotificationsNotificationSound() {
        return JSON.parse(String(this.player.getDynamicProperty("getButtonPushNotificationsNotificationSound") ?? '{"soundId": "none"}'));
    }
    set getButtonPushNotificationsNotificationSound(value) {
        this.player.setDynamicProperty("getButtonPushNotificationsNotificationSound", JSON.stringify(value, undefined, 0));
    }
    get getEffectAddNotifications() {
        return this.player.hasTag("getEffectAddNotifications");
    }
    set getEffectAddNotifications(value) {
        value
            ? this.player.addTag("getEffectAddNotifications")
            : this.player.removeTag("getEffectAddNotifications");
    }
    get getEffectAddNotificationsNotificationSound() {
        return JSON.parse(String(this.player.getDynamicProperty("getEffectAddNotificationsNotificationSound") ?? '{"soundId": "none"}'));
    }
    set getEffectAddNotificationsNotificationSound(value) {
        this.player.setDynamicProperty("getEffectAddNotificationsNotificationSound", JSON.stringify(value, undefined, 0));
    }
    get getEntityHurtNotifications() {
        return this.player.hasTag("getEntityHurtNotifications");
    }
    set getEntityHurtNotifications(value) {
        value
            ? this.player.addTag("getEntityHurtNotifications")
            : this.player.removeTag("getEntityHurtNotifications");
    }
    get getEntityHurtNotificationsNotificationSound() {
        return JSON.parse(String(this.player.getDynamicProperty("getEntityHurtNotificationsNotificationSound") ?? '{"soundId": "none"}'));
    }
    set getEntityHurtNotificationsNotificationSound(value) {
        this.player.setDynamicProperty("getEntityHurtNotificationsNotificationSound", JSON.stringify(value, undefined, 0));
    }
    get getEntityLoadNotifications() {
        return this.player.hasTag("getEntityLoadNotifications");
    }
    set getEntityLoadNotifications(value) {
        value
            ? this.player.addTag("getEntityLoadNotifications")
            : this.player.removeTag("getEntityLoadNotifications");
    }
    get getEntityLoadNotificationsNotificationSound() {
        return JSON.parse(String(this.player.getDynamicProperty("getEntityLoadNotificationsNotificationSound") ?? '{"soundId": "none"}'));
    }
    set getEntityLoadNotificationsNotificationSound(value) {
        this.player.setDynamicProperty("getEntityLoadNotificationsNotificationSound", JSON.stringify(value, undefined, 0));
    }
    get getEntityRemoveNotifications() {
        return this.player.hasTag("getEntityRemoveNotifications");
    }
    set getEntityRemoveNotifications(value) {
        value
            ? this.player.addTag("getEntityRemoveNotifications")
            : this.player.removeTag("getEntityRemoveNotifications");
    }
    get getEntityRemoveNotificationsNotificationSound() {
        return JSON.parse(String(this.player.getDynamicProperty("getEntityRemoveNotificationsNotificationSound") ?? '{"soundId": "none"}'));
    }
    set getEntityRemoveNotificationsNotificationSound(value) {
        this.player.setDynamicProperty("getEntityRemoveNotificationsNotificationSound", JSON.stringify(value, undefined, 0));
    }
    get getEntitySpawnNotifications() {
        return this.player.hasTag("getEntitySpawnNotifications");
    }
    set getEntitySpawnNotifications(value) {
        value
            ? this.player.addTag("getEntitySpawnNotifications")
            : this.player.removeTag("getEntitySpawnNotifications");
    }
    get getEntitySpawnNotificationsNotificationSound() {
        return JSON.parse(String(this.player.getDynamicProperty("getEntitySpawnNotificationsNotificationSound") ?? '{"soundId": "none"}'));
    }
    set getEntitySpawnNotificationsNotificationSound(value) {
        this.player.setDynamicProperty("getEntitySpawnNotificationsNotificationSound", JSON.stringify(value, undefined, 0));
    }
    get getExplosionNotifications() {
        return this.player.hasTag("getExplosionNotifications");
    }
    set getExplosionNotifications(value) {
        value
            ? this.player.addTag("getExplosionNotifications")
            : this.player.removeTag("getExplosionNotifications");
    }
    get getExplosionNotificationsNotificationSound() {
        return JSON.parse(String(this.player.getDynamicProperty("getExplosionNotificationsNotificationSound") ?? '{"soundId": "none"}'));
    }
    set getExplosionNotificationsNotificationSound(value) {
        this.player.setDynamicProperty("getExplosionNotificationsNotificationSound", JSON.stringify(value, undefined, 0));
    }
    get getPlayerDimensionChangeNotifications() {
        return this.player.hasTag("getPlayerDimensionChangeNotifications");
    }
    set getPlayerDimensionChangeNotifications(value) {
        value
            ? this.player.addTag("getPlayerDimensionChangeNotifications")
            : this.player.removeTag("getPlayerDimensionChangeNotifications");
    }
    get getPlayerDimensionChangeNotificationsNotificationSound() {
        return JSON.parse(String(this.player.getDynamicProperty("getPlayerDimensionChangeNotificationsNotificationSound") ?? '{"soundId": "none"}'));
    }
    set getPlayerDimensionChangeNotificationsNotificationSound(value) {
        this.player.setDynamicProperty("getPlayerDimensionChangeNotificationsNotificationSound", JSON.stringify(value, undefined, 0));
    }
    get getBeforeExplosionNotifications() {
        return this.player.hasTag("getBeforeExplosionNotifications");
    }
    set getBeforeExplosionNotifications(value) {
        value
            ? this.player.addTag("getBeforeExplosionNotifications")
            : this.player.removeTag("getBeforeExplosionNotifications");
    }
    get getBeforeExplosionNotificationsNotificationSound() {
        return JSON.parse(String(this.player.getDynamicProperty("getBeforeExplosionNotificationsNotificationSound") ?? '{"soundId": "none"}'));
    }
    set getBeforeExplosionNotificationsNotificationSound(value) {
        this.player.setDynamicProperty("getBeforeExplosionNotificationsNotificationSound", JSON.stringify(value, undefined, 0));
    }
    get getBeforeChatSendNotifications() {
        return this.player.hasTag("getBeforeChatSendNotifications");
    }
    set getBeforeChatSendNotifications(value) {
        value
            ? this.player.addTag("getBeforeChatSendNotifications")
            : this.player.removeTag("getBeforeChatSendNotifications");
    }
    get getBeforeChatSendNotificationsNotificationSound() {
        return JSON.parse(String(this.player.getDynamicProperty("getBeforeChatSendNotificationsNotificationSound") ?? '{"soundId": "none"}'));
    }
    set getBeforeChatSendNotificationsNotificationSound(value) {
        this.player.setDynamicProperty("getBeforeChatSendNotificationsNotificationSound", JSON.stringify(value, undefined, 0));
    }
    get getPlayerGameModeChangeNotifications() {
        return this.player.hasTag("getPlayerGameModeChangeNotifications");
    }
    set getPlayerGameModeChangeNotifications(value) {
        value
            ? this.player.addTag("getPlayerGameModeChangeNotifications")
            : this.player.removeTag("getPlayerGameModeChangeNotifications");
    }
    get getPlayerGameModeChangeNotificationsNotificationSound() {
        return JSON.parse(String(this.player.getDynamicProperty("getPlayerGameModeChangeNotificationsNotificationSound") ?? '{"soundId": "none"}'));
    }
    set getPlayerGameModeChangeNotificationsNotificationSound(value) {
        this.player.setDynamicProperty("getPlayerGameModeChangeNotificationsNotificationSound", JSON.stringify(value, undefined, 0));
    }
    get getWeatherChangeNotifications() {
        return this.player.hasTag("getWeatherChangeNotifications");
    }
    set getWeatherChangeNotifications(value) {
        value
            ? this.player.addTag("getWeatherChangeNotifications")
            : this.player.removeTag("getWeatherChangeNotifications");
    }
    get getWeatherChangeNotificationsNotificationSound() {
        return JSON.parse(String(this.player.getDynamicProperty("getWeatherChangeNotificationsNotificationSound") ?? '{"soundId": "none"}'));
    }
    set getWeatherChangeNotificationsNotificationSound(value) {
        this.player.setDynamicProperty("getWeatherChangeNotificationsNotificationSound", JSON.stringify(value, undefined, 0));
    }
    get getLeverActionNotifications() {
        return this.player.hasTag("getLeverActionNotifications");
    }
    set getLeverActionNotifications(value) {
        value
            ? this.player.addTag("getLeverActionNotifications")
            : this.player.removeTag("getLeverActionNotifications");
    }
    get getLeverActionNotificationsNotificationSound() {
        return JSON.parse(String(this.player.getDynamicProperty("getLeverActionNotificationsNotificationSound") ?? '{"soundId": "none"}'));
    }
    set getLeverActionNotificationsNotificationSound(value) {
        this.player.setDynamicProperty("getLeverActionNotificationsNotificationSound", JSON.stringify(value, undefined, 0));
    }
    get getMessageRecieveNotifications() {
        return this.player.hasTag("getMessageRecieveNotifications");
    }
    set getMessageRecieveNotifications(value) {
        value
            ? this.player.addTag("getMessageRecieveNotifications")
            : this.player.removeTag("getMessageRecieveNotifications");
    }
    get getMessageRecieveNotificationsNotificationSound() {
        return JSON.parse(String(this.player.getDynamicProperty("getMessageRecieveNotificationsNotificationSound") ?? '{"soundId": "none"}'));
    }
    set getMessageRecieveNotificationsNotificationSound(value) {
        this.player.setDynamicProperty("getMessageRecieveNotificationsNotificationSound", JSON.stringify(value, undefined, 0));
    }
    get getBlockInteractTriggerExplosionNotifications() {
        return this.player.hasTag("getBlockInteractTriggerExplosionNotifications");
    }
    set getBlockInteractTriggerExplosionNotifications(value) {
        value
            ? this.player.addTag("getBlockInteractTriggerExplosionNotifications")
            : this.player.removeTag("getBlockInteractTriggerExplosionNotifications");
    }
    get getBlockInteractTriggerExplosionNotificationsNotificationSound() {
        return JSON.parse(String(this.player.getDynamicProperty("getBlockInteractTriggerExplosionNotificationsNotificationSound") ?? '{"soundId": "none"}'));
    }
    set getBlockInteractTriggerExplosionNotificationsNotificationSound(value) {
        this.player.setDynamicProperty("getBlockInteractTriggerExplosionNotificationsNotificationSound", JSON.stringify(value, undefined, 0));
    }
    get getEntityInteractTriggerExplosionNotifications() {
        return this.player.hasTag("getEntityInteractTriggerExplosionNotifications");
    }
    set getEntityInteractTriggerExplosionNotifications(value) {
        value
            ? this.player.addTag("getEntityInteractTriggerExplosionNotifications")
            : this.player.removeTag("getEntityInteractTriggerExplosionNotifications");
    }
    get getEntityInteractTriggerExplosionNotificationsNotificationSound() {
        return JSON.parse(String(this.player.getDynamicProperty("getEntityInteractTriggerExplosionNotificationsNotificationSound") ?? '{"soundId": "none"}'));
    }
    set getEntityInteractTriggerExplosionNotificationsNotificationSound(value) {
        this.player.setDynamicProperty("getEntityInteractTriggerExplosionNotificationsNotificationSound", JSON.stringify(value, undefined, 0));
    }
}
Object.defineProperties(Entity.prototype, {
    playerNotifications: {
        get: function playerNotifications() {
            return new PlayerNotifications(this);
        },
        configurable: true,
        enumerable: true,
    },
}); /*
export function customFormUIEditor(sourceEntity: Entity|Player){
    let form2 = new ModalFormData();
    let players = world.getAllPlayers();
    let targetList = [players[0].nameTag]
    for (const index in players) {
        if (Number(index) != 0) {
        targetList = String([String(targetList), players[index].nameTag]).split(",");
        }
    }
    let formId = event.message ?? "test1234"
    let form = editCustomFormUI(formId)
    forceShow(form.form, (event.sourceEntity as Player)).then(to => {
        let t = (to as ModalFormResponse)
        if (t.canceled) return;
        world.setDynamicProperty(`customUI:${formId}`, `${t.formValues[0]}|${t.formValues[1]}`)
        let elementValues = t.formValues.slice(2, -2)
        console.warn(elementValues)
        elementValues.forEach((v, i)=>{switch(i % 5){
            case 0: world.setDynamicProperty(`customUIElement:${formId}|${form.indexList[Math.floor(i / 5)]}`, `${customElementTypeIds[Number(elementValues[i])]}|${elementValues.slice(i+1, i+4).join("|")}`); break;
            case 4: if(Boolean(v)==true){world.setDynamicProperty(`customUIElement:${formId}|${form.indexList[Math.floor(i / 5)]}`)}; break;
        }});
        if (t.formValues[t.formValues.length-2]){world.setDynamicProperty(`customUIElement:${formId}|${(Number(t.formValues[t.formValues.length-1]) ?? ((form.indexList[form.indexList.length-1] ?? -1)+1))}`, ""); }
}).catch(e => {
    console.error(e, e.stack);
});}*/
Object.defineProperty(globalThis, 'PlayerNotifications', {
    value: PlayerNotifications,
    enumerable: true,
    configurable: true,
    writable: false,
});
//# sourceMappingURL=PlayerNotifications.js.map