import type { Player } from "@minecraft/server";
/**
 * Imports add-on data by displaying a modal form with the data to the given player.
 *
 * @param player - The player who is opening the UI.
 * @returns A promise that resolves when the modal form is submitted.
 */
export declare function importAddOnData(player: Player): Promise<1>;
