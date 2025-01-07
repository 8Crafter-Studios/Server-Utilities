import { MoneySystem } from "ExtraFeatures/money";
import type { RotationLocation } from "modules/coordinates/interfaces/RotationLocation";
import type { PlayerNotifications } from "init/classes/PlayerNotifications";
import type { PlayerPermissions } from "init/classes/PlayerPermissions";
import type { WorldEditSelection } from "init/classes/WorldEditSelection";
export declare const exports_5603749806156139082470132985463298047098135609812364098: any;
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
    }
}
