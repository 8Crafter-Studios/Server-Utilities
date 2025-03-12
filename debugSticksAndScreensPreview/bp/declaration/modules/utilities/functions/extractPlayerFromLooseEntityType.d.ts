import { Player } from "@minecraft/server";
import type { loosePlayerType } from "../types/loosePlayerType";
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
export declare function extractPlayerFromLooseEntityType(looseEntityType: loosePlayerType, functionArgumentDetails?: {
    index: number;
    name: string;
} | {
    customSourceMessage: string;
} | "none"): Player;
