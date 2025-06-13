import { Player, system } from "@minecraft/server";
import { MessageFormData, } from "@minecraft/server-ui";
Object.defineProperty(MessageFormData.prototype, "forceShow", {
    value: async function forceShow(player, timeout) {
        const timeoutTicks = system.currentTick + (timeout ?? 9999);
        let r;
        while (system.currentTick <= timeoutTicks) {
            r = await this.show(player);
            if (r.cancelationReason != "UserBusy" || r.canceled == false) {
                return r;
            }
        }
        return r;
    },
    configurable: true,
    enumerable: true,
    writable: true,
});
//# sourceMappingURL=MessageFormData.js.map