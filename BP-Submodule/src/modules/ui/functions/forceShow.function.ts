/**
 * Forces a form to show even if the player has another form or menu open.
 * If the player has another form or menu open then it will wait until they close it.
 * @param {ModalFormData|ActionFormData|MessageFormData} form The form to show
 * @param {Player} player The player to show the form to
 * @param {number} timeout The number of ticks before the function will give up and throw an error, it defaults to 9999
 * @returns {ModalFormResponse|ActionFormResponse|MessageFormResponse|undefined} The response of the form
 */
export async function forceShow<T extends ModalFormData|ActionFormData|MessageFormData>(form: T, player: Player, timeout?: number): Promise<T extends ModalFormData ? ModalFormResponse : T extends ActionFormData ? ActionFormResponse : MessageFormResponse> {
    const timeoutTicks = system.currentTick + (timeout ?? 9999)
    while (system.currentTick <= timeoutTicks){
        const r = await form.show(player as any)
        if(r.cancelationReason != "UserBusy"||r.canceled == false){return r as any}
    }
}