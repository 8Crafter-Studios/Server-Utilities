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
         */
        get equippable(): EntityEquippableComponent | undefined;
        /**
         * Represents the players cursor inventory. Used when moving
         * items between between containers in the inventory UI. Not
         * used with touch controls.
         *
         * Only works on players, on non-players it will return undefined.
         *
         * This returns the same value as `Entity.prototype.getComponent("cursor_inventory")`.
         */
        get cursorInventory(): PlayerCursorInventoryComponent | undefined;
        get heldItem(): ItemStack | undefined;
        get activeSlot(): ContainerSlot | undefined;
        get moneySystem(): MoneySystem;
        get playerNotifications(): PlayerNotifications;
        get playerPermissions(): PlayerPermissions;
        get worldEditSelection(): WorldEditSelection;
        get dimensionLocation(): DimensionLocation;
        get locationstring(): `${number} ${number} ${number}`;
        get rotationstring(): `${number} ${number}`;
        get locationrotation(): RotationLocation;
        get directionvector(): Vector3;
        get xy(): Vector2;
        get yz(): VectorYZ;
        get xz(): VectorXZ;
        get chunkIndex(): VectorXZ;
        get x(): number;
        get y(): number;
        get z(): number;
        get rotx(): number;
        get roty(): number;
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
         */
        saveStringToDynamicProperties(string: string, propertyName: string, clearOldProperties?: boolean, chunkSize?: number | bigint): void;
        /**
         * Retrieves a concatenated string from an entity's dynamic properties.
         *
         * @param {string} propertyName - The base name of the dynamic property to retrieve.
         * @param {string} zeroLengthPlaceholder - A placeholder string to return if the dynamic property length is zero. Defaults to an empty string.
         * @returns {string} The concatenated string from the entity's dynamic properties, or the zeroLengthPlaceholder if the length is zero.
         * @throws {TypeError} If the propertyName is not a string.
         */
        getStringFromDynamicProperties(propertyName: string, zeroLengthPlaceholder?: string): string;
        /**
         * Deletes a string from an entity's dynamic properties.
         *
         * @param {string} propertyName - The name of the property the string is saved under.
         *
         * @throws {TypeError} If `propertyName` is not a string.
         */
        deleteStringFromDynamicProperties(propertyName: string): void;
    }
}
