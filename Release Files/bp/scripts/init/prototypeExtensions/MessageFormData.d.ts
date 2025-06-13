import { Player } from "@minecraft/server";
declare module "@minecraft/server-ui" {
    interface MessageFormData {
        /**
         * Forces a form to show even if the player has another form or menu open.
         * If the player has another form or menu open then it will wait until they close it.
         *
         * @param {Player} player The player to show the form to
         * @param {number} [timeout=9999] The number of ticks before the function will give up and return the failed response, it defaults to 9999
         * @returns {Promise<MessageFormResponse>} The response of the form
         */
        forceShow(player: Player, timeout?: number): Promise<MessageFormResponse>;
    }
}
