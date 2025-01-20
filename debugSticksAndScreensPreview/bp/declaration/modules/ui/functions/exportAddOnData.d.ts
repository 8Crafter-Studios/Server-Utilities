import type { Player } from "@minecraft/server";
import { ModalFormResponse } from "@minecraft/server-ui";
/**
 * Exports add-on data for the given player by displaying a modal form with the data.
 *
 * @param player - The player for whom the add-on data is being exported.
 * @returns A promise that resolves when the modal form is submitted.
 */
export declare function exportAddOnData(player: Player): Promise<ModalFormResponse>;
