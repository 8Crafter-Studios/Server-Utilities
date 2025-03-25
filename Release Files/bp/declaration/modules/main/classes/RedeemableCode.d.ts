import { Player, type DimensionLocation, type ItemStack } from "@minecraft/server";
export declare class RedeemableCode {
    /**
     * The code that users enter to redeem this code.
     *
     * @type {string}
     */
    code: string;
    /**
     * The super unique ID of this code.
     *
     * @type {string}
     * @readonly
     */
    readonly id: string;
    /**
     * List of UUIDs of players who have redeemed this code.
     *
     * @type {string[]}
     * @default []
     */
    redeemers: string[];
    /**
     * How many times this code has been used.
     *
     * @type {bigint}
     * @default 0n
     */
    uses: bigint;
    /**
     * The maximum number of uses allowed for this code.
     *
     * Set it to `-1n` to make the max uses infinite.
     *
     * @type {bigint}
     */
    maxUses: bigint;
    /**
     * When this code should expire.
     *
     * Set it to -1 to make it never expire.
     *
     * @type {number}
     */
    expirationTime: number;
    constructor(code: string, savedDetails?: {
        id: string;
        redeemers: string[];
        uses: bigint;
        maxUses: bigint;
        expirationTime: number;
    });
    /**
     * Saves the current redeemable code instance.
     *
     * This method performs the following actions:
     * 1. Filters out any existing code that matches the current instance's code or id.
     * 2. Adds the current instance to the list of codes.
     * 3. Calls the static method `saveCodes` to persist the updated list of codes.
     */
    save(): void;
    /**
     * Removes the current redeemable code from the list of codes, saves the updated list,
     * and deletes the corresponding structure in the world structure manager.
     *
     * @remarks
     * This method filters out the current code from the `codes` array, saves the updated
     * list of codes by calling `RedeemableCode.saveCodes()`, and deletes the structure
     * associated with this redeemable code using the `world.structureManager.delete` method.
     */
    remove(): void;
    /**
     * Retrieves the saved item linked to this code.
     *
     * This method places a structure at the given location, searches for an entity
     * with a specific dynamic property, retrieves the item from the entity's inventory,
     * and then removes the entity.
     *
     * @param {DimensionLocation} loadLocation - The location in the dimension where the structure containing the item storage entity is to be spawned.
     * @returns {ItemStack} The item stack retrieved from the entity's inventory.
     * @throws {ReferenceError} If no entity with the specified dynamic property is found.
     */
    getItem(loadLocation: DimensionLocation): ItemStack;
    /**
     * Sets the item linked to this code.
     *
     * @param {ItemStack} item - The item to be set in the storage entity.
     * @param {DimensionLocation} saveLocation - The location where the item should be saved, including the dimension.
     *
     * This method performs the following steps:
     * 1. Retrieves and temporarily teleports other entities away from the save location.
     * 2. Spawns a storage entity at the save location and sets the item in its inventory.
     * 3. Saves the storage entity to the world structure manager.
     * 4. Removes the storage entity after saving.
     * 5. Teleports the other entities back to their original locations.
     */
    setItem(item: ItemStack, saveLocation: DimensionLocation): void;
    /**
     * Redeems a code for the given player. This method checks if the code has reached its maximum number of uses
     * or if the player has already redeemed the code. If neither condition is met, it spawns the item for the player,
     * adds the player to the list of redeemers, and saves the state.
     *
     * @param {Player} player - The player who is redeeming the code.
     * @throws {Error} If the code has reached the maximum number of uses.
     * @throws {Error} If the player has already redeemed the code.
     */
    redeem(player: Player): void;
    /**
     * Converts the RedeemableCode instance to a JSONB object.
     *
     * @returns {{ code: string; id: string; redeemers: string[]; uses: bigint; maxUses: bigint; expirationTime: number; }} An object containing the code, id, redeemers, uses, max uses, and expiration time of the RedeemableCode instance.
     */
    toJSONB(): {
        code: string;
        id: string;
        redeemers: string[];
        uses: bigint;
        maxUses: bigint;
        expirationTime: number;
    };
    static addCode(code: string, item: ItemStack, saveLocation: DimensionLocation): void;
    static removeCode(code: string): void;
    static getCode(code: string): RedeemableCode | undefined;
    static getAll(): RedeemableCode[];
    static redeemCode(code: string, player: Player): void;
    static loadCodes(): void;
    static saveCodes(): void;
}
