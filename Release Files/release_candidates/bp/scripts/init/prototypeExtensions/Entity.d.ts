import { MoneySystem } from "ExtraFeatures/money";
import type { RotationLocation } from "modules/coordinates/interfaces/RotationLocation";
import type { PlayerNotifications } from "init/classes/PlayerNotifications";
import type { PlayerPermissions } from "init/classes/PlayerPermissions";
import type { WorldEditSelection } from "init/classes/WorldEditSelection";
export declare const exports_5603749806156139082470132985463298047098135609812364098: undefined;
declare module "@minecraft/server" {
    interface Entity {
        /**
         * Defines this entity's inventory properties.
         *
         * @author 8Crafter
         */
        get inventory(): EntityInventoryComponent | undefined;
        /**
         * Provides access to a mob's equipment slots. This component
         * exists for all mob entities.
         * @example givePlayerElytra.ts
         * ```typescript
         * // Gives the player Elytra
         * import { EquipmentSlot, ItemStack, Player, EntityComponentTypes } from '@minecraft/server';
         * import { MinecraftItemTypes } from '@minecraft/vanilla-data';
         *
         * function giveEquipment(player: Player) {
         *     const equipmentCompPlayer = player.getComponent(EntityComponentTypes.Equippable);
         *     if (equipmentCompPlayer) {
         *         equipmentCompPlayer.setEquipment(EquipmentSlot.Chest, new ItemStack(MinecraftItemTypes.Elytra));
         *     }
         * }
         * ```
         * @example givePlayerEquipment.ts
         * ```typescript
         * // Gives the player some equipment
         * import { EquipmentSlot, ItemStack, Player, EntityComponentTypes } from '@minecraft/server';
         * import { MinecraftItemTypes } from '@minecraft/vanilla-data';
         *
         * function giveEquipment(player: Player) {
         *     const equipmentCompPlayer = player.getComponent(EntityComponentTypes.Equippable);
         *     if (equipmentCompPlayer) {
         *         equipmentCompPlayer.setEquipment(EquipmentSlot.Head, new ItemStack(MinecraftItemTypes.GoldenHelmet));
         *         equipmentCompPlayer.setEquipment(EquipmentSlot.Chest, new ItemStack(MinecraftItemTypes.IronChestplate));
         *         equipmentCompPlayer.setEquipment(EquipmentSlot.Legs, new ItemStack(MinecraftItemTypes.DiamondLeggings));
         *         equipmentCompPlayer.setEquipment(EquipmentSlot.Feet, new ItemStack(MinecraftItemTypes.NetheriteBoots));
         *         equipmentCompPlayer.setEquipment(EquipmentSlot.Mainhand, new ItemStack(MinecraftItemTypes.WoodenSword));
         *         equipmentCompPlayer.setEquipment(EquipmentSlot.Offhand, new ItemStack(MinecraftItemTypes.Shield));
         *     } else {
         *         console.warn('No equipment component found on player');
         *     }
         * }
         * ```
         *
         * @author 8Crafter
         */
        get equippable(): EntityEquippableComponent | undefined;
        /**
         * Represents the player's cursor inventory. Used when moving
         * items between between containers in the inventory UI. Not
         * used with touch controls.
         *
         * Only works on players, on non-players it will return undefined.
         *
         * This returns the same value as `Entity.prototype.getComponent("cursor_inventory")`.
         *
         * @author 8Crafter
         */
        get cursorInventory(): PlayerCursorInventoryComponent | undefined;
        /**
         * Represents the player's held item.
         *
         * Only works on players, on non-players it will return undefined.
         *
         * This returns the same value as `Entity.prototype.getComponent("inventory").container.getItem(Entity.prototype.selectedSlotIndex)`.
         *
         * @author 8Crafter
         */
        get heldItem(): ItemStack | undefined;
        /**
         * Represents the player's active slot.
         *
         * Only works on players, on non-players it will return undefined.
         *
         * This returns the same value as `Entity.prototype.getComponent("inventory").container.getSlot(Entity.prototype.selectedSlotIndex)`.
         *
         * @author 8Crafter
         */
        get activeSlot(): ContainerSlot | undefined;
        /**
         * Returns an instance of the {@link MoneySystem} class that is associated with this entity.
         *
         * @author 8Crafter
         */
        get moneySystem(): MoneySystem;
        /**
         * Returns an instance of the {@link PlayerNotifications} class that is associated with this entity.
         *
         * @author 8Crafter
         */
        get playerNotifications(): PlayerNotifications;
        /**
         * Returns an instance of the {@link PlayerPermissions} class that is associated with this entity.
         *
         * @author 8Crafter
         */
        get playerPermissions(): PlayerPermissions;
        /**
         * Returns an instance of the {@link WorldEditSelection} class that is associated with this entity.
         *
         * @author 8Crafter
         */
        get worldEditSelection(): WorldEditSelection;
        /**
         * Returns the dimension location of the entity.
         *
         * @author 8Crafter
         */
        get dimensionLocation(): DimensionLocation;
        /**
         * Returns the stringified location of the entity in the format `x y z`.
         *
         * @author 8Crafter
         */
        get locationstring(): `${number} ${number} ${number}`;
        /**
         * Returns the stringified rotation of the entity in the format `rotx roty`.
         *
         * @author 8Crafter
         */
        get rotationstring(): `${number} ${number}`;
        /**
         * Returns the rotation location of the entity.
         *
         * It is a Vector3 object with the rotation values added as the `rotx` and `roty` properties.
         *
         * @author 8Crafter
         */
        get locationrotation(): RotationLocation;
        /**
         * Returns the direction vector of the entity's rotation.
         *
         * @author 8Crafter
         */
        get directionvector(): Vector3;
        /**
         * Returns the x and y coordinates of the entity.
         *
         * @author 8Crafter
         */
        get xy(): Vector2;
        /**
         * Returns the y and z coordinates of the entity.
         *
         * @author 8Crafter
         */
        get yz(): VectorYZ;
        /**
         * Returns the x and z coordinates of the entity.
         *
         * @author 8Crafter
         */
        get xz(): VectorXZ;
        /**
         * Returns the chunk index of the entity.
         *
         * @author 8Crafter
         */
        get chunkIndex(): VectorXZ;
        /**
         * Returns the x coordinate of the entity.
         *
         * It is the same as `Entity.prototype.location.x`.
         *
         * @author 8Crafter
         */
        get x(): number;
        /**
         * Returns the y coordinate of the entity.
         *
         * It is the same as `Entity.prototype.location.y`.
         *
         * @author 8Crafter
         */
        get y(): number;
        /**
         * Returns the z coordinate of the entity.
         *
         * It is the same as `Entity.prototype.location.z`.
         *
         * @author 8Crafter
         */
        get z(): number;
        /**
         * Returns the x rotation of the entity.
         *
         * It is the same as {@link Entity.prototype.getRotation()}{@link Vector2.x|.x}.
         *
         * @author 8Crafter
         */
        get rotx(): number;
        /**
         * Returns the y rotation of the entity.
         *
         * It is the same as {@link Entity.prototype.getRotation()}{@link Vector2.y|.y}.
         *
         * @author 8Crafter
         */
        get roty(): number;
        /**
         * The time zone of the player as the number of hours offset from UTC.
         *
         * @author 8Crafter
         */
        get timeZone(): number;
        set timeZone(timezone: number | string | boolean | null | undefined);
        /**
         * Saves a string to an entity's dynamic properties, optionally clearing old properties first.
         *
         * @param {string} string - The string to save to the entity's dynamic properties.
         * @param {string} propertyName - The base name of the dynamic property where the string will be saved.
         * @param {boolean} clearOldProperties - Whether to clear old properties before saving the new string. Defaults to `true`.
         * @param {number | bigint} chunkSize - The size of each chunk of the string to save. Defaults to `32760`.
         *
         * @throws {TypeError} If `propertyName` is not a string.
         * @throws {TypeError} If `clearOldProperties` is not a boolean.
         *
         * @author 8Crafter
         */
        saveStringToDynamicProperties(string: string, propertyName: string, clearOldProperties?: boolean, chunkSize?: number | bigint): void;
        /**
         * Retrieves a concatenated string from an entity's dynamic properties.
         *
         * @param {string} propertyName - The base name of the dynamic property to retrieve.
         * @param {string} zeroLengthPlaceholder - A placeholder string to return if the dynamic property length is zero. Defaults to an empty string.
         * @returns {string} The concatenated string from the entity's dynamic properties, or the zeroLengthPlaceholder if the length is zero.
         * @throws {TypeError} If the propertyName is not a string.
         *
         * @author 8Crafter
         */
        getStringFromDynamicProperties(propertyName: string, zeroLengthPlaceholder?: string): string;
        /**
         * Deletes a string from an entity's dynamic properties.
         *
         * @param {string} propertyName - The name of the property the string is saved under.
         *
         * @throws {TypeError} If `propertyName` is not a string.
         *
         * @author 8Crafter
         */
        deleteStringFromDynamicProperties(propertyName: string): void;
        /**
         * @remarks
         * Gets a component (that represents additional capabilities)
         * for an entity.
         *
         * @param componentId
         * The identifier of the component (e.g., 'minecraft:health').
         * If no namespace prefix is specified, 'minecraft:' is
         * assumed. Available component IDs can be found as part of the
         * {@link EntityComponentTypes} enum.
         * @returns
         * Returns the component if it exists on the entity, otherwise
         * undefined.
         * @throws This function can throw errors.
         *
         * {@link InvalidEntityError}
         */
        getComponent<T extends LooseAutocomplete<keyof EntityComponentTypeMap>>(componentId: T): EntityComponentReturnType<T> | undefined;
    }
}
