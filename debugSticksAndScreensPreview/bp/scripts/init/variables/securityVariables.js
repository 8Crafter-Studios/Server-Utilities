let owner = world.getDynamicProperty("owner");
export class securityVariables {
    get owner() {
        return owner;
    }
}
system.afterEvents.scriptEventReceive.subscribe((event) => {
    if (event.id == "andexdb:securityConfiguratorOwnerSet") {
        const functionName = event.message;
    }
});
//# sourceMappingURL=securityVariables.js.map