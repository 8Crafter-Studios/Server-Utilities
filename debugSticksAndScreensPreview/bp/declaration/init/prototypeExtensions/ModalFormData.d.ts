import { Player } from "@minecraft/server";
declare module "@minecraft/server-ui" {
    interface ModalFormData {
        /**
         * Forces a form to show even if the player has another form or menu open.
         * If the player has another form or menu open then it will wait until they close it.
         * @param {Player} player The player to show the form to
         * @param {number} timeout The number of ticks before the function will give up and throw an error, it defaults to 9999
         * @returns {ModalFormResponse|undefined} The response of the form
         */
        forceShow(player: Player, timeout?: number): Promise<ModalFormResponse>;
    }
}
