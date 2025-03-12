import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { formatBytes } from "modules/utilities/functions/formatBytes";
/**
 * Exports add-on data by displaying a modal form with the data to the given player.
 *
 * @param player - The player who is opening the UI.
 * @returns A promise that resolves when the modal form is submitted.
 */
export async function exportAddOnData(player) {
    const data = JSON.stringify(Object.fromEntries(world.getDynamicPropertyIds().map((v) => [v, world.getDynamicProperty(v)])));
    return await new ModalFormData().title("Export Add-on Data")
        .textField(`Data (${formatBytes(Uint8Array.from(data, x => x.charCodeAt(0)).byteLength)}), To transfer this data, go to the other world/realm/server with the add-on on, and paste the text from the text box below into the text box in the Import Add-on Data menu (Main Menu > Settings > Import Data).`, "Data", data)
        .submitButton("Done")
        .forceShow(player);
}
//# sourceMappingURL=exportAddOnData.js.map