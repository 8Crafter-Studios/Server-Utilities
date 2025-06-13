import { Player, system } from "@minecraft/server";
/**
 * Forces a form to show even if the player has another form or menu open.
 *
 * If the player has another form or menu open then it will wait until they close it.
 *
 * @param {ModalFormData|ActionFormData|MessageFormData} form The form to show
 * @param {Player} player The player to show the form to
 * @param {number} timeout The number of ticks before the function will give up and return the failed response, it defaults to 9999
 * @returns {ModalFormResponse|ActionFormResponse|MessageFormResponse} The response of the form
 */
export async function forceShow(form, player, timeout) {
    const timeoutTicks = system.currentTick + (timeout ?? 9999);
    let r;
    while (system.currentTick <= timeoutTicks) {
        r = (await form.show(player));
        if (r.cancelationReason != "UserBusy" || r.canceled == false) {
            return r;
        }
    }
    return r;
}
//# sourceMappingURL=forceShow.js.map