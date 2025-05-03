import { Player, system } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";
Object.defineProperty(ModalFormData.prototype, "forceShow", {
    value: async function forceShow(player, timeout) {
        const timeoutTicks = system.currentTick + (timeout ?? 9999);
        while (system.currentTick <= timeoutTicks) {
            const r = await this.show(player);
            if (r.cancelationReason != "UserBusy" || r.canceled == false) {
                return r;
            }
        }
    },
    configurable: true,
    enumerable: true,
    writable: true,
});
//# sourceMappingURL=ModalFormData.js.map