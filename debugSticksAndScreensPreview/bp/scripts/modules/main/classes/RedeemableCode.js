import { Player, StructureSaveMode } from "@minecraft/server";
import { getSuperUniqueID } from "modules/utilities/functions/getSuperUniqueID";
let codes = [];
export class RedeemableCode {
    /**
     * The code that users enter to redeem this code.
     *
     * @type {string}
     */
    code;
    /**
     * The super unique ID of this code.
     *
     * @type {string}
     * @readonly
     */
    id;
    /**
     * List of UUIDs of players who have redeemed this code.
     *
     * @type {string[]}
     * @default []
     */
    redeemers = [];
    /**
     * How many times this code has been used.
     *
     * @type {bigint}
     * @default 0n
     */
    uses = 0n;
    /**
     * The maximum number of uses allowed for this code.
     *
     * Set it to `-1n` to make the max uses infinite.
     *
     * @type {bigint}
     */
    maxUses = -1n;
    /**
     * When this code should expire.
     *
     * Set it to -1 to make it never expire.
     *
     * @type {number}
     */
    expirationTime = -1;
    constructor(code, savedDetails) {
        this.code = code;
        if (savedDetails !== undefined) {
            this.redeemers = savedDetails.redeemers;
            this.uses = savedDetails.uses;
            this.maxUses = savedDetails.maxUses;
            this.expirationTime = savedDetails.expirationTime;
            Object.defineProperty(this, "id", {
                value: savedDetails.id,
                configurable: true,
                enumerable: true,
                writable: false,
            });
        }
        else {
            if (!!codes.find((c) => c.code === code)) {
                throw new Error("Duplicate Code");
            }
            Object.defineProperty(this, "id", {
                value: getSuperUniqueID(),
                configurable: true,
                enumerable: true,
                writable: false,
            });
        }
    }
    /**
     * Saves the current redeemable code instance.
     *
     * This method performs the following actions:
     * 1. Filters out any existing code that matches the current instance's code or id.
     * 2. Adds the current instance to the list of codes.
     * 3. Calls the static method `saveCodes` to persist the updated list of codes.
     */
    save() {
        codes = codes.filter((c) => c.code !== this.code && c.id !== this.id);
        codes.push(this);
        RedeemableCode.saveCodes();
    }
    /**
     * Removes the current redeemable code from the list of codes, saves the updated list,
     * and deletes the corresponding structure in the world structure manager.
     *
     * @remarks
     * This method filters out the current code from the `codes` array, saves the updated
     * list of codes by calling `RedeemableCode.saveCodes()`, and deletes the structure
     * associated with this redeemable code using the `world.structureManager.delete` method.
     */
    remove() {
        codes = codes.filter((c) => c.code !== this.code && c.id !== this.id);
        RedeemableCode.saveCodes();
        world.structureManager.delete("redeemableCodeItem:" + this.id);
    }
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
    getItem(loadLocation) {
        world.structureManager.place("redeemableCodeItem:" + this.id, loadLocation.dimension, Vector.add(loadLocation, { x: 0, y: 10, z: 0 }), {
            includeBlocks: false,
            includeEntities: true,
        });
        const entity = loadLocation.dimension
            .getEntitiesAtBlockLocation(Vector.add(loadLocation, { x: 0, y: 10, z: 0 }))
            .find((v) => tryget(() => String(v.getDynamicProperty("andexdb:saved_item_save_id"))) == this.id);
        if (!!!entity) {
            throw new ReferenceError(`No entity with a andexdb:saved_item_save_id dynamic property set to ${this.id} was found inside of the specified structure.`);
        }
        const itemStack = entity.getComponent("inventory").container.getItem(0);
        entity.remove();
        return itemStack;
    }
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
    setItem(item, saveLocation) {
        /**
         * This makes the script temporarily teleport the other entities away so that when it saves the storage entity, it can't save and possibly duplicate other entities.
         */
        var otherEntities = tryget(() => saveLocation.dimension.getEntitiesAtBlockLocation(Vector.add(saveLocation, { x: 0, y: 10, z: 0 })).filter((v) => v.id != entity.id)) ??
            [];
        var locs = otherEntities.map((v) => v.location);
        const entity = saveLocation.dimension.spawnEntity("andexdb:saved_item", {
            x: Math.floor(saveLocation.x) + 0.5,
            y: Math.floor(saveLocation.y) + 0.5,
            z: Math.floor(saveLocation.z) + 0.5,
        });
        entity.setDynamicProperty("andexdb:saved_item_save_id", this.id);
        entity.getComponent("inventory").container.setItem(0, item);
        otherEntities.forEach((v) => tryrun(() => v.teleport(Vector.add(v.location, { x: 0, y: 50, z: 0 }))));
        try {
            world.structureManager.createFromWorld("redeemableCodeItem:" + this.id, saveLocation.dimension, {
                x: Math.floor(saveLocation.x),
                y: Math.floor(saveLocation.y),
                z: Math.floor(saveLocation.z),
            }, {
                x: Math.floor(saveLocation.x),
                y: Math.floor(saveLocation.y),
                z: Math.floor(saveLocation.z),
            }, {
                includeBlocks: false,
                includeEntities: true,
                saveMode: StructureSaveMode.World,
            });
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            entity.remove();
        }
        catch (e) {
            console.error(e, e.stack);
        }
        otherEntities.forEach((v, i) => tryrun(() => v.teleport(locs[i], { keepVelocity: false })));
    }
    /**
     * Redeems a code for the given player. This method checks if the code has reached its maximum number of uses
     * or if the player has already redeemed the code. If neither condition is met, it spawns the item for the player,
     * adds the player to the list of redeemers, and saves the state.
     *
     * @param {Player} player - The player who is redeeming the code.
     * @throws {Error} If the code has reached the maximum number of uses.
     * @throws {Error} If the player has already redeemed the code.
     */
    redeem(player) {
        if (this.maxUses !== -1n && this.uses >= this.maxUses) {
            throw new Error("This code has reached the maximum number of uses.");
        }
        else if (this.redeemers.includes(player.id)) {
            throw new Error("This player has already redeemed this code.");
        }
        else {
            player.dimension.spawnItem(this.getItem(player.dimensionLocation), player.location);
            this.redeemers.push(player.id);
            this.save();
        }
    }
    /**
     * Converts the RedeemableCode instance to a JSONB object.
     *
     * @returns {{ code: string; id: string; redeemers: string[]; uses: bigint; maxUses: bigint; expirationTime: number; }} An object containing the code, id, redeemers, uses, max uses, and expiration time of the RedeemableCode instance.
     */
    toJSONB() {
        return {
            code: this.code,
            id: this.id,
            redeemers: this.redeemers,
            uses: this.uses,
            maxUses: this.maxUses,
            expirationTime: this.expirationTime,
        };
    }
    static addCode(code, item, saveLocation) {
        const newCode = new RedeemableCode(code);
        newCode.setItem(item, saveLocation);
        newCode.save();
    }
    static removeCode(code) {
        codes = codes.filter((c) => c.code !== code);
        RedeemableCode.saveCodes();
    }
    static getCode(code) {
        return codes.find((c) => c.code === code);
    }
    static getAll() {
        return codes.filter(() => true);
    }
    static redeemCode(code, player) {
        const codeInstance = this.getCode(code);
        if (codeInstance !== undefined) {
            codeInstance.redeem(player);
        }
        else {
            throw new Error("Invalid code.");
        }
    }
    static loadCodes() {
        codes = tryget(() => JSONB.parse(world.getStringFromDynamicProperties("redeemableCodes", "[]")).map((c) => new RedeemableCode(c.code, { ...c }))) ?? [];
    }
    static saveCodes() {
        world.saveStringToDynamicProperties(JSONB.stringify(codes), "redeemableCodes", true);
    }
}
RedeemableCode.loadCodes();
//# sourceMappingURL=RedeemableCode.js.map