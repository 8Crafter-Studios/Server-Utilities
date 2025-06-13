import { Block } from "@minecraft/server";
import type { MinecraftBlockTypes } from "@minecraft/vanilla-data";
/**
 * The ID of the block, a name of a property of the block, or a string of true or false.
 *
 * This is used for the {@link TestForBlockMatchMask} interface.
 *
 * It supports the following special values:
 * - `isAir` - The {@link Block.prototype.isAir | isAir} property.
 * - `isWaterlogged` - The {@link Block.prototype.isWaterlogged | isWaterlogged} property.
 * - `isLiquid` - The {@link Block.prototype.isLiquid | isLiquid} property.
 * - `isSolid` - The {@link Block.prototype.isSolid | isSolid} property.
 * - `isValid` - The {@link Block.prototype.isValid | isValid} property.
 * - `true` - Makes the match always succeed.
 * - `false` - Makes the match always fail.
 */
export type TestForBlockMatchMaskID = LooseAutocomplete<"isAir" | "isWaterlogged" | "isLiquid" | "isSolid" | "isValid" | "true" | "false" | `${MinecraftBlockTypes}`>;
/**
 * A mask for the {@link testBlockForMatch} function.
 */
export interface TestForBlockMatchMask {
    /**
     * The ID of the block, a name of a property of the block, or a string of true or false.
     *
     * If not specified the mask will be ignored.
     *
     * It supports the following special values:
     * - `isAir` - The {@link Block.prototype.isAir | isAir} property.
     * - `isWaterlogged` - The {@link Block.prototype.isWaterlogged | isWaterlogged} property.
     * - `isLiquid` - The {@link Block.prototype.isLiquid | isLiquid} property.
     * - `isSolid` - The {@link Block.prototype.isSolid | isSolid} property.
     * - `isValid` - The {@link Block.prototype.isValid | isValid} property.
     * - `true` - Makes the match always succeed.
     * - `false` - Makes the match always fail.
     *
     * @type {TestForBlockMatchMaskID}
     */
    id?: TestForBlockMatchMaskID;
    /**
     * The states of the block.
     *
     * Any states that are not included will be ignored.
     *
     * If not specified only the ID will be tested.
     *
     * @type {Record<string, string|number|boolean>}
     */
    states?: Record<string, string | number | boolean>;
}
/**
 * A {@link TestForBlockMatchMask} or an array of {@link TestForBlockMatchMask}.
 *
 * This is used for the {@link testBlockForMatch} function.
 */
export type TestForBlockMatchMasks = TestForBlockMatchMask | TestForBlockMatchMask[];
/**
 * Tests if a block matches the any of the specified types.
 *
 * Tests a block against objects with a block ID and block states, and returns true if any of them are satisfied by the block.
 *
 * @param {Block} [block] The block to test, if not specified the function will always return false.
 * @param {TestForBlockMatchMasks} [masks] A mask or array of masks to test against the block, if not specified the function will always return false.
 * @returns {boolean} Whether the block matches any of the provided masks.
 */
export declare function testBlockForMatch(block?: Block, masks?: TestForBlockMatchMasks): boolean;
