import type { Player } from "@minecraft/server";
import { ModalFormResponse } from "@minecraft/server-ui";
/**
 * Exports add-on data by displaying a modal form with the data to the given player.
 *
 * @param player - The player who is opening the UI.
 * @returns A promise that resolves when the modal form is submitted.
 */
export declare function exportAddOnData(player: Player): Promise<ModalFormResponse>;
