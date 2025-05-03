import { BlockPermutation } from "@minecraft/server";
/**
 * A block pattern entry.
 */
export interface BlockPatternEntry {
    /**
     * The {@link modules.mcServer.Block.prototype.typeId block ID} or pattern type.
     */
    type: string;
    /**
     * The {@link BlockPermutation.getAllStates block states}.
     */
    states?: {
        [id: string]: string | number | boolean;
    };
    /**
     * The weight of the block pattern entry.
     *
     * This is used to determine the chance of the block pattern entry being selected.
     *
     * Increasing this value is like putting this entry in the pattern the specified number of times.
     *
     * If this is used while in sequence mode, then it will just repeat this entry the specified number of times.
     *
     * @default 1
     */
    weight?: number;
    /**
     * The raw string representation of the block pattern entry, with the block states formatted as JSON.
     *
     * @example
     * ```mccmd
     * minecraft:example_block%36{"facing":"west","fill_level":5,"top_slot_bit":true}
     * ```
     */
    get raw(): string;
    /**
     * The raw string representation of the block pattern entry, with the blocks states formatted like vanilla block states.
     *
     * @example
     * ```mccmd
     * minecraft:example_block%36["facing"="west","fill_level"=5,"top_slot_bit"=true]
     * ```
     *
     * @since v1.33.1-preview.20+BUILD.1
     */
    get rawsb(): string;
    /**
     * The raw string representation of the block pattern entry, without the block states.
     *
     * @example
     * ```mccmd
     * minecraft:example_block%36
     * ```
     */
    get rawns(): string;
}
/**
 * A class that represents a block pattern.
 *
 * Block patterns are used to generate blocks in a world.
 *
 * Many things use them, such as many of the WorldEdit commands.
 */
export declare class BlockPattern {
    /**
     * The entries for the block pattern.
     *
     * @default []
     */
    blocks: BlockPatternEntry[];
    /**
     * The type of the block pattern.
     *
     * "random" will make it generate the block pattern in a random order and will use the weights to determine the chance of each block pattern entry being selected.
     *
     * "sequence" will make it generate the block pattern in a sequence and will use the weights to determine the number of times each block pattern entry will be repeated.
     *
     * @default "random"
     */
    type: "random" | "sequence";
    /**
     * The raw string representation of the block pattern.
     *
     * @example
     * ```mccmd
     * s:minecraft:example_block%36["facing"="west","fill_level"=5,"top_slot_bit"=true],minecraft:glass,minecraft:stone%10,minecraft:spruce_slab["top_slot_bit"=true]
     * ```
     *
     * @since v1.33.1-preview.20+BUILD.1
     */
    get raw(): string;
    /**
     * Converts the block pattern to a string.
     *
     * It returns the same value as {@link BlockPattern.prototype.raw}.
     *
     * @returns {string} The raw string representation of the block pattern.
     *
     * @since v1.33.1-preview.20+BUILD.1
     */
    toString(): string;
    /**
     * Creates a new block pattern.
     *
     * @param {Omit<BlockPatternEntry, "raw" | "rawsb" | "rawns">[]} blocks The entries for the block pattern.
     * @param {"random" | "sequence"} [type = "random"] The type of the block pattern.
     * @returns A new block pattern.
     */
    constructor(blocks?: Omit<BlockPatternEntry, "raw" | "rawsb" | "rawns">[], type?: "random" | "sequence");
    /**
     * Gets a block pattern entry.
     *
     * @param {number | bigint} [generateIndex = 0] The current index of the generation. This is used to determine which block pattern entry to get if the type is "sequence".
     * @param {"random" | "sequence"} [forceMode] The type of the block pattern. If specified, it will override the type property of the block pattern.
     * @returns {BlockPatternEntry} The block pattern entry.
     */
    generateBlock(generateIndex?: number | bigint, forceMode?: "random" | "sequence"): BlockPatternEntry;
    /**
     * Gets a block permutation from a block pattern entry.
     *
     * @param {number | bigint} [generateIndex = 0] The current index of the generation. This is used to determine which block pattern entry to get if the type is "sequence".
     * @param {"random" | "sequence"} [forceMode] The type of the block pattern. If specified, it will override the type property of the block pattern.
     * @returns {BlockPermutation} The block permutation.
     */
    generateBlockP(generateIndex?: number | bigint, forceMode?: "random" | "sequence"): BlockPermutation;
    /**
     * Pushes a block pattern entry to the block pattern.
     *
     * @param {...Omit<BlockPatternEntry, "raw" | "rawsb" | "rawns">[]} blocks The entries to push to the block pattern.
     * @returns {number} The new amount of entries in the block pattern.
     */
    push(...blocks: Omit<BlockPatternEntry, "raw" | "rawsb" | "rawns">[]): number;
    /**
     * Parses a string into a BlockPattern object.
     *
     * @deprecated This function is non-functional, and does absolutely nothing.
     */
    static parse(): void;
    /**
     * Extracts a raw block pattern from a string.
     *
     * @param {string} str The string to extract the raw block pattern from.
     * @returns {string | null} The raw block pattern, or null if no raw block pattern was found.
     */
    static extractRaw(str: string): string | null;
    /**
     * Extracts a block pattern from a string.
     *
     * @param {string} str The string to extract the block pattern from.
     * @param {"random" | "sequence"} [mode] The type of the block pattern. If not provided, the mode will be determined based on the string.
     * @returns {BlockPattern} The block pattern extracted from the string.
     */
    static extract(str: string, mode?: "random" | "sequence"): BlockPattern;
    /**
     * Extracts a block pattern from a string and returns the raw string and the parsed block pattern.
     *
     * @param {string} str The string to extract the block pattern from.
     * @param {"random" | "sequence"} [mode] The type of the block pattern. If not provided, the mode will be determined based on the string. Only Only applies to the block pattern, the raw string is not affected.
     * @returns {{ raw: string | null; parsed: BlockPattern; }} The raw string and the parsed block pattern. Only applies to the block pattern, the raw string is not affected.
     */
    static extractWRaw(str: string, mode?: "random" | "sequence"): {
        raw: string | null;
        parsed: BlockPattern;
    };
    /**
     * Extracts all raw block patterns from a string.
     *
     * @param {string} str The string to extract the raw block patterns from.
     * @returns {string[] | null} The raw block patterns, or null if no raw block patterns were found.
     */
    static extractAllRaw(str: string): string[] | null;
    /**
     * Extracts all block patterns from a string.
     *
     * @param {string} str The string to extract the block patterns from.
     * @param {"random" | "sequence"} [mode] The type of the block patterns. If not provided, the mode will be determined based on the string.
     * @returns {BlockPattern[]} The block patterns extracted from the string.
     */
    static extractAll(str: string, mode?: "random" | "sequence"): BlockPattern[];
    /**
     * Extracts all raw block patterns from a string and returns the raw strings and the parsed block patterns.
     *
     * @param {string} str The string to extract the raw block patterns from.
     * @param {"random" | "sequence"} [mode] The type of the block patterns. If not provided, the mode will be determined based on the string. Only applies to the block patterns, the raw strings are not affected.
     * @returns {{ raw: string[] | null; parsed: BlockPattern[]; }} The raw strings and the parsed block patterns. Only applies to the block patterns, the raw strings are not affected.
     */
    static extractAllWRaw(str: string, mode?: "random" | "sequence"): {
        raw: string[] | null;
        parsed: BlockPattern[];
    };
}
