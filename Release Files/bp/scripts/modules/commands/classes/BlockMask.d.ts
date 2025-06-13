import { Block, BlockPermutation, BlockType } from "@minecraft/server";
export declare const knownContainerTypes: readonly ["minecraft:yellow_shulker_box", "minecraft:beacon", "minecraft:lime_shulker_box", "minecraft:undyed_shulker_box", "minecraft:barrel", "minecraft:magenta_shulker_box", "minecraft:white_shulker_box", "minecraft:blast_furnace", "minecraft:chest", "minecraft:smoker", "minecraft:purple_shulker_box", "minecraft:orange_shulker_box", "minecraft:blue_shulker_box", "minecraft:brown_shulker_box", "minecraft:pink_shulker_box", "minecraft:red_shulker_box", "minecraft:jukebox", "minecraft:lit_furnace", "minecraft:gray_shulker_box", "minecraft:light_gray_shulker_box", "minecraft:trapped_chest", "minecraft:black_shulker_box", "minecraft:lit_blast_furnace", "minecraft:cyan_shulker_box", "minecraft:furnace", "minecraft:green_shulker_box", "minecraft:hopper", "minecraft:lectern", "minecraft:light_blue_shulker_box", "minecraft:dropper", "minecraft:brewing_stand", "minecraft:dispenser", "minecraft:lit_smoker"];
/**
 * The custom block mask filter presets.
 *
 * These contain a set of block mask filters that can be used in a block mask.
 *
 * They are used by putting the key for the preset in this object as the block ID for a block mask filter.
 *
 * @beta
 */
export declare const customMaskGroupPresets: {
    /**
     * All types of leaves.
     *
     * It gets all block types that include `leaves` anywhere in their ID.
     */
    "preset:leaves": string[];
    /**
     * Plant blocks.
     *
     * It gets all block types that include `leaves` or `sapling` anywhere in their ID.
     *
     * It also includes the following preset values:
     *
     * - `tag:log`
     * - `tag:plant`
     * - `short_grass`
     * - `short_grass`
     * - `tall_grass`
     * - `vine`
     * - `dandelion`
     * - `allium`
     * - `brown_mushroom_block`
     * - `red_mushroom_block`
     * - `mushroom_stem`
     * - `crimson_roots`
     * - `warped_roots`
     * - `bee_nest`
     *
     * @beta This preset is still a work in progress.
     * @todo Finish this preset.
     */
    "preset:deforest": string[];
    /**
     * All types of ores.
     *
     * It gets all block types that include `ore` anywhere in their ID.
     *
     * It also includes `ancient_debris`.
     */
    "preset:ores": string[];
    /**
     * All types of ore blocks.
     *
     * It includes the following preset values:
     * - `coal_block`
     * - `copper_block`
     * - `exposed_copper`
     * - `weathered_copper`
     * - `oxidized_copper`
     * - `waxed_copper`
     * - `waxed_exposed_copper`
     * - `waxed_weathered_copper`
     * - `waxed_oxidized_copper`
     * - `iron_block`
     * - `gold_block`
     * - `emerald_block`
     * - `diamond_block`
     * - `netherite_block`
     * - `redstone_block`
     * - `lapis_block`
     * - `raw_copper_block`
     * - `raw_iron_block`
     * - `raw_gold_block`
     */
    "preset:ore_blocks": string[];
    /**
     * All types of liquids.
     *
     * It includes the following preset values:
     * - `water`
     * - `flowing_water`
     * - `lava`
     * - `flowing_lava`
     */
    "preset:liquid": string[];
};
/**
 * A block mask filter.
 */
export interface BlockMaskFilter {
    /**
     * The {@link Block.prototype.typeId block ID} or filter type.
     *
     * Filter type examples:
     * - `minecraft:example_block` - A block ID ({@link Block.prototype.typeId}).
     * - `isAir` - Air ({@link Block.prototype.isAir}).
     * - `isLiquid` - Liquid ({@link Block.prototype.isLiquid}).
     * - `isSolid` - Solid ({@link Block.prototype.isSolid}).
     * - `isValid` - If the block is valid ({@link Block.prototype.isValid}).
     * - `isWaterlogged` - If the block is waterlogged ({@link Block.prototype.isWaterlogged}).
     * - `canBeWaterlogged`/`isWaterloggable`/`waterloggable` - If the block can be waterlogged ({@link Block.prototype.canContainLiquid}({@link modules.mcServer.LiquidType.Water})).
     * - `keep` - ({@link Block.prototype.typeId} === `minecraft:air`).
     * - `tag:minecraft:example_tag` - A block tag ({@link Block.prototype.hasTag}).
     * - `preset:example_preset` - A filter preset ({@link customMaskGroupPresets}).
     */
    type: string;
    /**
     * The {@link BlockPermutation.getAllStates block states}.
     */
    states?: {
        [id: string]: string | number | boolean;
    };
    /**
     * The raw string representation of the block mask filter, with the block states formatted as JSON.
     *
     * @example
     * ```mccmd
     * minecraft:example_block{"facing":"west","fill_level":5,"top_slot_bit":true}
     * ```
     */
    get raw(): string;
    /**
     * The raw string representation of the block mask filter, with the blocks states formatted like vanilla block states.
     *
     * @example
     * ```mccmd
     * minecraft:example_block["facing"="west","fill_level"=5,"top_slot_bit"=true]
     * ```
     */
    get rawsb(): string;
    /**
     * The raw string representation of the block mask filter, without the block states.
     *
     * It basically just returns the block ID or filter type.
     *
     * @example
     * ```mccmd
     * minecraft:example_block
     * ```
     */
    get rawns(): string;
}
/**
 * A class that represents a block mask.
 *
 * Block masks are used to filter blocks in a world.
 *
 * Many things use them, such as the spawn protection system, and many WorldEdit commands.
 */
export declare class BlockMask {
    #private;
    /**
     * The type of the block mask.
     *
     * "include" will make it only select blocks included in the block mask
     *
     * "exclude" will make it only select blocks that are not included in the block mask
     *
     * @default "include"
     */
    type: "include" | "exclude";
    /**
     * The filters in the block mask.
     */
    get blocks(): BlockMaskFilter[];
    set blocks(blocks: Omit<BlockMaskFilter, "raw" | "rawsb" | "rawns">[]);
    /**
     * Whether the block mask has any filters with block states.
     */
    get includesStates(): boolean;
    /**
     * The block IDs and filters types in the block mask.
     */
    get blockTypes(): string[];
    /**
     * The raw string representation of the block mask.
     *
     * @example
     * ```mccmd
     * e:preset:liquid,minecraft:example_block["facing"="west","fill_level"=5,"top_slot_bit"=true],tag:minecraft:example_tag
     * ```
     */
    get raw(): string;
    /**
     * Converts the block mask to a string.
     *
     * It returns the same value as {@link BlockMask.prototype.raw}.
     *
     * @returns {string} The raw string representation of the block mask.
     */
    toString(): string;
    /**
     * Evaluates the block IDs and filters types in the block mask.
     *
     * This method does the following things:
     *
     * - Removes any filters that have a block ID of "none" or "any".
     * - Converts any filter that is missing its `raw`, `rawsb`, or `rawns` getter to a {@link BlockMaskFilter} that does have the getters.
     */
    evaluateIds(): void;
    /**
     * Creates a new block mask.
     *
     * @param {Omit<BlockMaskFilter, "raw" | "rawsb" | "rawns">[]} blocks The filters for the block mask.
     * @param {"include" | "exclude"} [type = "include"] The type of the block mask.
     * @returns A new block mask.
     */
    constructor(blocks?: Omit<BlockMaskFilter, "raw" | "rawsb" | "rawns">[], type?: "include" | "exclude");
    /**
     * Pushes new filters to the block mask.
     * @param {...Omit<BlockMaskFilter, "raw" | "rawsb" | "rawns">[]} blocks The filters to push to the block mask.
     * @returns {number} The new amount of filters in the block mask.
     */
    push(...blocks: Omit<BlockMaskFilter, "raw" | "rawsb" | "rawns">[]): number;
    /**
     * Tests if a block matches the block mask.
     *
     * @param {Block | BlockPermutation | BlockType | { type: BlockType | string; states?: Record<string, boolean | number | string> } | string} block The block to test.
     * @param {typeof this.type} [mode = this.type] The mode to test in. If specified, this paramter will override the block mask's type property.
     * @returns {boolean} Whether the block matches the block mask.
     */
    testIfMatches(block: Block | BlockPermutation | BlockType | {
        type: BlockType | string;
        states?: Record<string, boolean | number | string>;
    } | string, mode?: typeof this.type): boolean;
    /**
     * Tests if the states in the first parameter extend the states in the second parameter.
     *
     * @param {Record<string, boolean | number | string>} states The states to test.
     * @param {Record<string, boolean | number | string>} statesMask The states to test against.
     * @returns {boolean} True if the states in the first parameter extend the states in the second parameter, false otherwise.
     *
     * @example
     * ```typescript
     * const BlockMask = modules.cmds.BlockMask;
     *
     * const states = {
     *   "foo": true,
     *   "bar": false,
     * };
     * const statesMask = {
     *   "foo": true,
     *   "bar": true,
     * };
     * const result = BlockMask.testForStatesMatch(states, statesMask);
     * console.log(result); // false
     * ```
     *
     * @example
     * ```typescript
     * const BlockMask = modules.cmds.BlockMask;
     *
     * const states = {
     *   "foo": true,
     *   "bar": false,
     * };
     * const statesMask = {
     *   "foo": true,
     * };
     * const result = BlockMask.testForStatesMatch(states, statesMask);
     * console.log(result); // true
     * ```
     *
     * @example
     * ```typescript
     * const BlockMask = modules.cmds.BlockMask;
     *
     * const states = {
     *   "foo": true,
     *   "bar": false,
     * };
     * const statesMask = {
     *   "foo": true,
     *   "bar": false,
     *   "baz": false,
     * };
     * const result = BlockMask.testForStatesMatch(states, statesMask);
     * console.log(result); // false
     * ```
     */
    static testForStatesMatch(states: Record<string, boolean | number | string>, statesMask: Record<string, boolean | number | string>): boolean;
    /**
     * Parses a string into a BlockMask object.
     *
     * @deprecated This function is non-functional, and does absolutely nothing.
     */
    static parse(): void;
    /**
     * Extracts a raw block mask from a string.
     *
     * @param {string} str The string to extract the raw block mask from.
     * @returns {string | null} The raw block mask, or null if no raw block mask was found.
     */
    static extractRaw(str: string): string | undefined;
    /**
     * Extracts a block mask from a string.
     *
     * @param {string} str The string to extract the block mask from.
     * @param {boolean} [extraIdParsingEnabled = true] Whether to enable extra ID parsing. If emabled, filters with block IDs of "none" or "any" will be removed.
     * @param {"include" | "exclude"} [modeOverride] Override the mode of the block mask. If not provided, the mode will be determined based on the string.
     * @returns {BlockMask} The block mask extracted from the string.
     */
    static extract(str: string, extraIdParsingEnabled?: boolean, modeOverride?: "include" | "exclude"): BlockMask;
    /**
     * Extracts a block mask and its raw string from a string.
     *
     * @param {string} str The string to extract the block mask from.
     * @param {boolean} [extraIdParsingEnabled = true] Whether to enable extra ID parsing. If emabled, filters with block IDs of "none" or "any" will be removed. Only applies to the block mask, the raw string is not affected.
     * @param {"include" | "exclude"} [modeOverride] Override the mode of the block mask. If not provided, the mode will be determined based on the string. Only applies to the block mask, the raw string is not affected.
     * @returns {{ raw: string; parsed: BlockMask }} The raw string and the block mask extracted from the string.
     */
    static extractWRaw(str: string, extraIdParsingEnabled?: boolean, modeOverride?: "include" | "exclude"): {
        raw: string;
        parsed: BlockMask;
    };
    /**
     * Extracts the raw strings of all block masks from a string.
     *
     * @param {string} str The string to extract the block masks from.
     * @returns {string[] | null} The raw strings of the block masks extracted from the string, or null if no block masks were found.
     */
    static extractAllRaw(str: string): string[] | null;
    /**
     * Extracts all block masks from a string.
     *
     * @param {string} str The string to extract the block masks from.
     * @param {boolean} [extraIdParsingEnabled = true] Whether to enable extra ID parsing. If emabled, filters with block IDs of "none" or "any" will be removed.
     * @param {"include" | "exclude"} [modeOverride] Override the mode of the block mask. If not provided, the mode will be determined based on the string.
     * @returns {BlockMask[]} The block masks extracted from the string.
     */
    static extractAll(str: string, extraIdParsingEnabled?: boolean, modeOverride?: "include" | "exclude"): BlockMask[];
    /**
     * Extracts all block masks from a string and their raw strings.
     *
     * @param {string} str The string to extract the block masks from.
     * @param {boolean} [extraIdParsingEnabled = true] Whether to enable extra ID parsing. If emabled, filters with block IDs of "none" or "any" will be removed. Only applies to the block masks, the raw strings are not affected.
     * @param {"include" | "exclude"} [modeOverride] Override the mode of the block mask. If not provided, the mode will be determined based on the string. Only applies to the block masks, the raw strings are not affected.
     * @returns {{ raw: string[] | null; parsed: BlockMask[] }} An object containing the raw strings and the block masks extracted from the string.
     */
    static extractAllWRaw(str: string, extraIdParsingEnabled?: boolean, modeOverride?: "include" | "exclude"): {
        raw: string[] | null;
        parsed: BlockMask[];
    };
}
