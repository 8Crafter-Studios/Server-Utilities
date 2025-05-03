import { EquipmentSlot } from "@minecraft/server";
/**
 * Parses a slot name or number into a valid slot name or number, or undefined if the slot is invalid.
 *
 * @param {string | number} slot The slot to parse.
 * @param {I} [selectedSlotIndex] The index of the selected slot, if not provided and the slot is "\~", "\~" will be returned, otherwise the selected slot index will be returned if the slot is "\~".
 * @template {number} I The type of the index of the selected slot.
 * @returns {number | EquipmentSlot | "cursor" | (I extends number ? number : "~") | undefined} The parsed slot. Returns undefined if the slot is invalid.
 *
 * @remarks
 * Value Mapping:
 * ```typescript
 * const headValue: "head" | "helmet" | "cap" | "hat";
 * const headReturnType: EquipmentSlot.Head;
 * const chestValue: "chest" | "chestplate" | "tunic" | "shirt";
 * const chestReturnType: EquipmentSlot.Chest;
 * const legsValue: "legs" | "leggings" | "pants";
 * const legsReturnType: EquipmentSlot.Legs;
 * const feetValue: "feet" | "boots";
 * const feetReturnType: EquipmentSlot.Feet;
 * const mainhandValue: "mainhand" | "hand" | "righthand" | "firsthand";
 * const mainhandReturnType: EquipmentSlot.Mainhand;
 * const offhandValue: "offhand" | "secondhand";
 * const offhandReturnType: EquipmentSlot.Offhand;
 * const cursorValue: "cursor";
 * const cursorReturnType: "cursor";
 * const tildeValue: "~" | "";
 * const tildeReturnType: I extends number ? number : "~";
 * const numberValue: number | `${number}`; // Note: If the value is Infinity, -Infinity, or NaN, it return undefined.
 * const numberReturnType: number | undefined = Math.floor(Number(numberValue)).isInteger() ? Math.floor(Number(numberValue)) : undefined; // The number if it is finite and not NaN, otherwise undefined.
 * const invalidValue: any;
 * const invalidReturnType: undefined;
 * ```
 *
 * @example
 * ```typescript
 * let slot: number | EquipmentSlot | "cursor" | "~" | undefined;
 * slot = parseSlot("mainhand"); // EquipmentSlot.Mainhand
 * slot = parseSlot(0); // 0
 * slot = parseSlot("3"); // 3
 * slot = parseSlot("cursor"); // "cursor"
 * slot = parseSlot("~"); // undefined
 * slot = parseSlot("~", 0); // 0
 * slot = parseSlot("~", 5); // 5
 * slot = parseSlot("invalid"); // undefined
 * slot = parseSlot("invalid", 7); // undefined
 * slot = parseSlot(true, 8); // undefined
 * slot = parseSlot(Symbol.toStringTag); // undefined
 * slot = parseSlot(""); // undefined
 * slot = parseSlot("", 6); // 6
 *
 * ```
 */
export declare function parseSlot<I extends number>(slot: string | number, selectedSlotIndex?: I): number | EquipmentSlot | "cursor" | (I extends number ? number : "~") | undefined;
