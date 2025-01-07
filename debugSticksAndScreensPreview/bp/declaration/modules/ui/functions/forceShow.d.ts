import { Player } from "@minecraft/server";
import type { ModalFormData, ActionFormData, MessageFormData, ModalFormResponse, ActionFormResponse, MessageFormResponse } from "@minecraft/server-ui";
/**
 * Forces a form to show even if the player has another form or menu open.
 * If the player has another form or menu open then it will wait until they close it.
 * @param {ModalFormData|ActionFormData|MessageFormData} form The form to show
 * @param {Player} player The player to show the form to
 * @param {number} timeout The number of ticks before the function will give up and throw an error, it defaults to 9999
 * @returns {ModalFormResponse|ActionFormResponse|MessageFormResponse|undefined} The response of the form
 */
export declare function forceShow<T extends ModalFormData | ActionFormData | MessageFormData>(form: T, player: Player, timeout?: number): Promise<T extends ModalFormData ? ModalFormResponse : T extends ActionFormData ? ActionFormResponse : MessageFormResponse>;
