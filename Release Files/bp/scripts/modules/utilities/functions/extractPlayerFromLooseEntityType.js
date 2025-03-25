import { Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { getDetailedType } from "./getDetailedType";
/**
 * Converts a loose entity type into a Player type, ensuring that the loose entity type is an instance of the Player class, or an instance of the executeCommandPlayerW class with a Player linked to it.
 * If the loose entity type is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it, a TypeError is thrown with a message explaining what went wrong.
 * The functionArgumentDetails parameter is an object that contains details about the function argument that the loose entity type is derived from.
 * The functionArgumentDetails object can have the following properties:
 * - index: The index of the function argument in the function's parameter list.
 * - name: The name of the function argument.
 * - customSourceMessage: A custom message to include in the error message.
 * If the functionArgumentDetails parameter is not provided, the function will use default values of `{index: 0, name: "sourceEntity"}`.
 * @param {loosePlayerType} looseEntityType The loose entity type to convert to a Player type.
 * @param {{index: number, name: string}|{customSourceMessage: string}|"none"} functionArgumentDetails An object containing details about the function argument that the loose entity type is derived from.
 * @returns {Player} A Player instance.
 * @throws {TypeError} If the loose entity type is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export function extractPlayerFromLooseEntityType(looseEntityType, functionArgumentDetails = { index: 0, name: "sourceEntity" }) {
    const player = looseEntityType instanceof executeCommandPlayerW ? looseEntityType.player : looseEntityType;
    if (!(player instanceof Player)) {
        throw new TypeError(`Invalid Player. ${functionArgumentDetails === "none" ? "E" : "customSourceMessage" in functionArgumentDetails ? functionArgumentDetails.customSourceMessage + " e" : `Function argument [${functionArgumentDetails.index ?? 0}] (${functionArgumentDetails.name ?? "sourceEntitya"}) e`}xpected an instance of the Player class, or an instance of the executeCommandPlayerW class with a Player linked to it, but instead got ${getDetailedType(player)}.`);
    }
    return player;
}
//# sourceMappingURL=extractPlayerFromLooseEntityType.js.map