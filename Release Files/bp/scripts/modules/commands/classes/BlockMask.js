import { Block, BlockPermutation, BlockType, BlockTypes } from "@minecraft/server";
export const knownContainerTypes = [
    "minecraft:yellow_shulker_box",
    "minecraft:beacon",
    "minecraft:lime_shulker_box",
    "minecraft:undyed_shulker_box",
    "minecraft:barrel",
    "minecraft:magenta_shulker_box",
    "minecraft:white_shulker_box",
    "minecraft:blast_furnace",
    "minecraft:chest",
    "minecraft:smoker",
    "minecraft:purple_shulker_box",
    "minecraft:orange_shulker_box",
    "minecraft:blue_shulker_box",
    "minecraft:brown_shulker_box",
    "minecraft:pink_shulker_box",
    "minecraft:red_shulker_box",
    "minecraft:jukebox",
    "minecraft:lit_furnace",
    "minecraft:gray_shulker_box",
    "minecraft:light_gray_shulker_box",
    "minecraft:trapped_chest",
    "minecraft:black_shulker_box",
    "minecraft:lit_blast_furnace",
    "minecraft:cyan_shulker_box",
    "minecraft:furnace",
    "minecraft:green_shulker_box",
    "minecraft:hopper",
    "minecraft:lectern",
    "minecraft:light_blue_shulker_box",
    "minecraft:dropper",
    "minecraft:brewing_stand",
    "minecraft:dispenser",
    "minecraft:lit_smoker",
];
/**
 * The custom block mask filter presets.
 *
 * These contain a set of block mask filters that can be used in a block mask.
 *
 * They are used by putting the key for the preset in this object as the block ID for a block mask filter.
 *
 * @beta
 */
export const customMaskGroupPresets = {
    /**
     * All types of leaves.
     *
     * It gets all block types that include `leaves` anywhere in their ID.
     */
    "preset:leaves": BlockTypes.getAll()
        .map((v) => v.id)
        .filter((v) => v.includes("leaves")),
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
    "preset:deforest": [
        ...new Set([
            ...BlockTypes.getAll()
                .map((v) => v.id)
                .filter((v) => v.includes("leaves")),
            ...BlockTypes.getAll()
                .map((v) => v.id)
                .filter((v) => v.includes("sapling")),
            "tag:log",
            "tag:plant",
            "short_grass",
            "tall_grass",
            "vine",
            "dandelion",
            "allium",
            "brown_mushroom_block",
            "red_mushroom_block",
            "mushroom_stem",
            "crimson_roots",
            "warped_roots",
            "bee_nest", // TO-DO
        ]),
    ],
    /**
     * All types of ores.
     *
     * It gets all block types that include `ore` anywhere in their ID.
     *
     * It also includes `ancient_debris`.
     */
    "preset:ores": [
        ...new Set([
            ...BlockTypes.getAll()
                .map((v) => v.id)
                .filter((v) => v.includes("ore")),
            "ancient_debris",
        ]),
    ],
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
    "preset:ore_blocks": [
        ...new Set([
            "coal_block",
            "copper_block",
            "exposed_copper",
            "weathered_copper",
            "oxidized_copper",
            "waxed_copper",
            "waxed_exposed_copper",
            "waxed_weathered_copper",
            "waxed_oxidized_copper",
            "iron_block",
            "gold_block",
            "emerald_block",
            "diamond_block",
            "netherite_block",
            "redstone_block",
            "lapis_block",
            "raw_copper_block",
            "raw_iron_block",
            "raw_gold_block",
        ]),
    ],
    /**
     * All types of liquids.
     *
     * It includes the following preset values:
     * - `water`
     * - `flowing_water`
     * - `lava`
     * - `flowing_lava`
     */
    "preset:liquid": [...new Set(["water", "flowing_water", "lava", "flowing_lava"])],
};
/**
 * A class that represents a block mask.
 *
 * Block masks are used to filter blocks in a world.
 *
 * Many things use them, such as the spawn protection system, and many WorldEdit commands.
 */
export class BlockMask {
    /**
     * The filters in the block mask.
     *
     * @default []
     */
    #blocksList = [];
    /**
     * Whether the block mask has any filters with block states.
     */
    #hasStates;
    /**
     * The block IDs and filters types in the block mask.
     */
    #blockTypeIds;
    /**
     * The type of the block mask.
     *
     * "include" will make it only select blocks included in the block mask
     *
     * "exclude" will make it only select blocks that are not included in the block mask
     *
     * @default "include"
     */
    type = "include";
    /**
     * The filters in the block mask.
     */
    get blocks() {
        return this.#blocksList;
    }
    set blocks(blocks) {
        this.#blocksList = blocks.map((v) => ({
            type: v.type,
            states: v.states,
            get raw() {
                return `${this.type}${!!this.states ? `${JSON.stringify(this.states)}` : ""}`;
            },
            get rawsb() {
                return `${this.type}${!!this.states
                    ? `[${Object.entries(this.states)
                        .map(([k, v]) => JSON.stringify(k) + "=" + JSON.stringify(v))
                        .join(",")}]`
                    : ""}`;
            },
            get rawns() {
                return `${this.type}`;
            },
        }));
        this.#hasStates = !!blocks.find((v) => !!v.states);
        [...new Set((this.#blockTypeIds = blocks.map((v) => v.type)))];
    }
    /**
     * Whether the block mask has any filters with block states.
     */
    get includesStates() {
        return this.#hasStates;
    }
    /**
     * The block IDs and filters types in the block mask.
     */
    get blockTypes() {
        return this.#blockTypeIds;
    }
    /**
     * The raw string representation of the block mask.
     *
     * @example
     * ```mccmd
     * e:preset:liquid,minecraft:example_block["facing"="west","fill_level"=5,"top_slot_bit"=true],tag:minecraft:example_tag
     * ```
     */
    get raw() {
        return (this.type === "exclude" ? "e:" : "i:") + (this.#blocksList.length === 0 ? "none" : this.#blocksList.map((v) => v.rawsb).join(","));
    }
    /**
     * Converts the block mask to a string.
     *
     * It returns the same value as {@link BlockMask.prototype.raw}.
     *
     * @returns {string} The raw string representation of the block mask.
     */
    toString() {
        return this.raw;
    }
    /**
     * Evaluates the block IDs and filters types in the block mask.
     *
     * This method does the following things:
     *
     * - Removes any filters that have a block ID of "none" or "any".
     * - Converts any filter that is missing its `raw`, `rawsb`, or `rawns` getter to a {@link BlockMaskFilter} that does have the getters.
     */
    evaluateIds() {
        this.#blocksList = cullEmpty(this.#blocksList.map((v) => v.type == "none"
            ? undefined
            : v.type == "any"
                ? undefined
                : {
                    type: v.type == "keep" ? "minecraft:air" : tryget(() => BlockTypes.get(v.type).id) ?? v.type,
                    states: v.states,
                    get raw() {
                        return `${this.type}${!!this.states ? `${JSON.stringify(this.states)}` : ""}`;
                    },
                    get rawsb() {
                        return `${this.type}${!!this.states
                            ? `[${Object.entries(this.states)
                                .map(([k, v]) => JSON.stringify(k) + "=" + JSON.stringify(v))
                                .join(",")}]`
                            : ""}`;
                    },
                    get rawns() {
                        return `${this.type}`;
                    },
                }));
    }
    /**
     * Creates a new block mask.
     *
     * @param {Omit<BlockMaskFilter, "raw" | "rawsb" | "rawns">[]} blocks The filters for the block mask.
     * @param {"include" | "exclude"} [type = "include"] The type of the block mask.
     * @returns A new block mask.
     */
    constructor(blocks = [], type = "include") {
        this.#blocksList = blocks.map((v) => ({
            type: v.type,
            states: v.states,
            get raw() {
                return `${this.type}${!!this.states ? `${JSON.stringify(this.states)}` : ""}`;
            },
            get rawsb() {
                return `${this.type}${!!this.states
                    ? `[${Object.entries(this.states)
                        .map(([k, v]) => JSON.stringify(k) + "=" + JSON.stringify(v))
                        .join(",")}]`
                    : ""}`;
            },
            get rawns() {
                return `${this.type}`;
            },
        }));
        this.type = type;
        this.#hasStates = !!blocks.find((v) => !!v.states);
        this.#blockTypeIds = [...new Set(blocks.map((v) => v.type))];
    }
    /**
     * Pushes new filters to the block mask.
     * @param {...Omit<BlockMaskFilter, "raw" | "rawsb" | "rawns">[]} blocks The filters to push to the block mask.
     * @returns {number} The new amount of filters in the block mask.
     */
    push(...blocks) {
        this.#hasStates = this.#hasStates || !!blocks.find((v) => !!v.states);
        [...new Set((this.#blockTypeIds = [...this.#blocksList, ...blocks].map((v) => v.type)))];
        return this.#blocksList.push(...blocks.map((v) => ({
            type: v.type,
            states: v.states,
            get raw() {
                return `${this.type}${!!this.states ? `${JSON.stringify(this.states)}` : ""}`;
            },
            get rawsb() {
                return `${this.type}${!!this.states
                    ? `[${Object.entries(this.states)
                        .map(([k, v]) => JSON.stringify(k) + "=" + JSON.stringify(v))
                        .join(",")}]`
                    : ""}`;
            },
            get rawns() {
                return `${this.type}`;
            },
        })));
    }
    /**
     * Tests if a block matches the block mask.
     *
     * @param {Block | BlockPermutation | BlockType | { type: BlockType | string; states?: Record<string, boolean | number | string> } | string} block The block to test.
     * @param {typeof this.type} [mode = this.type] The mode to test in. If specified, this paramter will override the block mask's type property.
     * @returns {boolean} Whether the block matches the block mask.
     */
    testIfMatches(block, mode = this.type) {
        if (this.#blocksList.length == 0) {
            return true;
        }
        if (block instanceof Block) {
            let resultFound = this.#blocksList
                .flatMap((v) => v.type in customMaskGroupPresets
                ? customMaskGroupPresets[v.type].map((s) => ({ type: s, rawns: v.rawns, raw: v.raw }))
                : v)
                .find((b) => {
                switch (b.type) {
                    case "isAir":
                        if (block.isAir) {
                            if (b.states != undefined) {
                                return BlockMask.testForStatesMatch(block.permutation.getAllStates(), b.states);
                            }
                            else {
                                return true;
                            }
                        }
                        else {
                            return false;
                        }
                    case "isLiquid":
                        if (block.isLiquid) {
                            if (b.states != undefined) {
                                return BlockMask.testForStatesMatch(block.permutation.getAllStates(), b.states);
                            }
                            else {
                                return true;
                            }
                        }
                        else {
                            return false;
                        }
                    case "isSolid":
                        if (block.isSolid) {
                            if (b.states != undefined) {
                                return BlockMask.testForStatesMatch(block.permutation.getAllStates(), b.states);
                            }
                            else {
                                return true;
                            }
                        }
                        else {
                            return false;
                        }
                    case "isValid":
                        if (block.isValid()) {
                            if (b.states != undefined) {
                                return BlockMask.testForStatesMatch(block.permutation.getAllStates(), b.states);
                            }
                            else {
                                return true;
                            }
                        }
                        else {
                            return false;
                        }
                    case "isWaterlogged":
                        if (block.isWaterlogged) {
                            if (b.states != undefined) {
                                return BlockMask.testForStatesMatch(block.permutation.getAllStates(), b.states);
                            }
                            else {
                                return true;
                            }
                        }
                        else {
                            return false;
                        }
                    case "canBeWaterlogged":
                    case "isWaterloggable":
                    case "waterloggable":
                        if (block.canContainLiquid(modules.mcServer.LiquidType.Water)) {
                            if (b.states != undefined) {
                                return BlockMask.testForStatesMatch(block.permutation.getAllStates(), b.states);
                            }
                            else {
                                return true;
                            }
                        }
                        else {
                            return false;
                        }
                    case "keep":
                        if (block.typeId == "minecraft:air") {
                            if (b.states != undefined) {
                                return BlockMask.testForStatesMatch(block.permutation.getAllStates(), b.states);
                            }
                            else {
                                return true;
                            }
                        }
                        else {
                            return false;
                        }
                    case "containers":
                        if (block.getComponent("inventory") != undefined) {
                            if (b.states != undefined) {
                                return BlockMask.testForStatesMatch(block.permutation.getAllStates(), b.states);
                            }
                            else {
                                return true;
                            }
                        }
                        else {
                            return false;
                        }
                    case "none":
                        return this.#blocksList.find((bb) => (bb?.type ?? "none") != "none") != undefined;
                    case "true":
                        return true;
                    case "false":
                        return false;
                    default:
                        if (block.typeId == (tryget(() => BlockTypes.get(b.type).id) ?? "invalid")) {
                            if (b.states != undefined) {
                                return BlockMask.testForStatesMatch(block.permutation.getAllStates(), b.states);
                            }
                            else {
                                return true;
                            }
                        }
                        else {
                            return false;
                        }
                }
            }) != undefined;
            return mode == "exclude" ? !resultFound : resultFound;
        }
        if (block instanceof BlockPermutation) {
            let resultFound = this.#blocksList
                .flatMap((v) => v.type in customMaskGroupPresets
                ? customMaskGroupPresets[v.type].map((s) => ({ type: s, rawns: v.rawns, raw: v.raw }))
                : v)
                .find((b) => {
                switch (b.type) {
                    // only works for the regular vanilla air block when using a BlockPermutation as the parameter
                    case "isAir":
                        if (block.type.id == "minecraft:air") {
                            if (b.states != undefined) {
                                return BlockMask.testForStatesMatch(block.getAllStates(), b.states);
                            }
                            else {
                                return true;
                            }
                        }
                        else {
                            return false;
                        }
                    // only works for the regular vanilla water, flowing water, lava, and flowing lava blocks when using a BlockPermutation as the parameter
                    case "isLiquid":
                        if (["minecraft:water", "minecraft:flowing_water", "minecraft:lava", "minecraft:flowing_lava"].includes(block.type.id)) {
                            if (b.states != undefined) {
                                return BlockMask.testForStatesMatch(block.getAllStates(), b.states);
                            }
                            else {
                                return true;
                            }
                        }
                        else {
                            return false;
                        }
                    // does not work when using a BlockPermutation as the parameter
                    case "isSolid":
                        return false;
                    // does not work when using a BlockPermutation as the parameter
                    case "isValid":
                        return false;
                    // does not work when using a BlockPermutation as the parameter
                    case "isWaterlogged":
                        return false;
                    case "canBeWaterlogged":
                    case "isWaterloggable":
                    case "waterloggable":
                        if (block.canContainLiquid(modules.mcServer.LiquidType.Water)) {
                            if (b.states != undefined) {
                                return BlockMask.testForStatesMatch(block.getAllStates(), b.states);
                            }
                            else {
                                return true;
                            }
                        }
                        else {
                            return false;
                        }
                    case "keep":
                        if (block.type.id == "minecraft:air") {
                            if (b.states != undefined) {
                                return BlockMask.testForStatesMatch(block.getAllStates(), b.states);
                            }
                            else {
                                return true;
                            }
                        }
                        else {
                            return false;
                        }
                    // only works for some container types when using a BlockPermutation as the parameter
                    case "containers":
                        if (knownContainerTypes.includes(block.type.id)) {
                            if (b.states != undefined) {
                                return BlockMask.testForStatesMatch(block.getAllStates(), b.states);
                            }
                            else {
                                return true;
                            }
                        }
                        else {
                            return false;
                        }
                    case "none":
                        return this.#blocksList.find((bb) => (bb?.type ?? "none") != "none") != undefined;
                    case "true":
                        return true;
                    case "false":
                        return false;
                    default:
                        if (b.type.startsWith("tag:")) {
                            return block.hasTag(b.type.slice(4));
                        }
                        else if (block.type.id == (tryget(() => BlockTypes.get(b.type).id) ?? "invalid")) {
                            if (b.states != undefined) {
                                return BlockMask.testForStatesMatch(block.getAllStates(), b.states);
                            }
                            else {
                                return true;
                            }
                        }
                        else {
                            return false;
                        }
                }
            }) != undefined;
            return mode == "exclude" ? !resultFound : resultFound;
        }
        if (block instanceof BlockType) {
            let resultFound = this.#blocksList
                .flatMap((v) => v.type in customMaskGroupPresets
                ? customMaskGroupPresets[v.type].map((s) => ({ type: s, rawns: v.rawns, raw: v.raw }))
                : v)
                .find((b) => {
                switch (b.type) {
                    // only works for the regular vanilla air block when using a BlockType as the parameter
                    case "isAir":
                        if (block.id == "minecraft:air") {
                            return true;
                        }
                        else {
                            return false;
                        }
                    // only works for the regular vanilla water, flowing water, lava, and flowing lava blocks when using a BlockType as the parameter
                    case "isLiquid":
                        if (["minecraft:water", "minecraft:flowing_water", "minecraft:lava", "minecraft:flowing_lava"].includes(block.id)) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    // does not work when using a BlockType as the parameter
                    case "isSolid":
                        return false;
                    // does not work when using a BlockType as the parameter
                    case "isValid":
                        return false;
                    // does not work when using a BlockType as the parameter
                    case "isWaterlogged":
                        return false;
                    case "canBeWaterlogged":
                    case "isWaterloggable":
                    case "waterloggable":
                        if (BlockPermutation.resolve(block.id).canContainLiquid(modules.mcServer.LiquidType.Water)) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    case "keep":
                        if (block.id == "minecraft:air") {
                            return true;
                        }
                        else {
                            return false;
                        }
                    // only works for some container types when using a BlockType as the parameter
                    case "containers":
                        if (knownContainerTypes.includes(block.id)) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    case "none":
                        return this.#blocksList.find((bb) => (bb?.type ?? "none") != "none") != undefined;
                    case "true":
                        return true;
                    case "false":
                        return false;
                    default:
                        if (b.type.startsWith("tag:")) {
                            return BlockPermutation.resolve(block.id).hasTag(b.type.slice(4));
                        }
                        else if (block.id == (tryget(() => BlockTypes.get(b.type).id) ?? "invalid")) {
                            return true;
                        }
                        else {
                            return false;
                        }
                }
            }) != undefined;
            return mode == "exclude" ? !resultFound : resultFound;
        }
        if (typeof block == "string") {
            let resultFound = this.#blocksList
                .flatMap((v) => v.type in customMaskGroupPresets
                ? customMaskGroupPresets[v.type].map((s) => ({ type: s, rawns: v.rawns, raw: v.raw }))
                : v)
                .find((b) => {
                switch (b.type) {
                    // only works for the regular vanilla air block when using a BlockType as the parameter
                    case "isAir":
                        if (block == "minecraft:air") {
                            return true;
                        }
                        else {
                            return false;
                        }
                    // only works for the regular vanilla water, flowing water, lava, and flowing lava blocks when using a BlockType as the parameter
                    case "isLiquid":
                        if (["minecraft:water", "minecraft:flowing_water", "minecraft:lava", "minecraft:flowing_lava"].includes(block)) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    // does not work when using a BlockType as the parameter
                    case "isSolid":
                        return false;
                    // does not work when using a BlockType as the parameter
                    case "isValid":
                        return false;
                    // does not work when using a BlockType as the parameter
                    case "isWaterlogged":
                        return false;
                    // does not work when using a BlockType as the parameter
                    case "canBeWaterlogged":
                    case "isWaterloggable":
                    case "waterloggable":
                        if (tryget(() => BlockPermutation.resolve(BlockTypes.get(block).id).canContainLiquid(modules.mcServer.LiquidType.Water)) ??
                            false) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    case "keep":
                        if (block == "minecraft:air") {
                            return true;
                        }
                        else {
                            return false;
                        }
                    // only works for some container types when using a BlockType as the parameter
                    case "containers":
                        if (knownContainerTypes.includes(block)) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    case "none":
                        return this.#blocksList.find((bb) => (bb?.type ?? "none") != "none") != undefined;
                    case "true":
                        return true;
                    case "false":
                        return false;
                    default:
                        if (b.type.startsWith("tag:")) {
                            return BlockPermutation.resolve(block).hasTag(b.type.slice(4));
                        }
                        else if (block == (tryget(() => BlockTypes.get(b.type).id) ?? "invalid")) {
                            return true;
                        }
                        else {
                            return false;
                        }
                }
            }) != undefined;
            return mode == "exclude" ? !resultFound : resultFound;
        }
        if (typeof block == "object") {
            let resultFound = this.#blocksList
                .flatMap((v) => v.type in customMaskGroupPresets
                ? customMaskGroupPresets[v.type].map((s) => ({ type: s, rawns: v.rawns, raw: v.raw }))
                : v)
                .find((b) => {
                switch (b.type) {
                    // only works for the regular vanilla air block when using a BlockPermutation as the parameter
                    case "isAir":
                        if ((block.type instanceof BlockType ? block.type.id : block.type) == "minecraft:air") {
                            if (b.states != undefined && block.states != undefined) {
                                return BlockMask.testForStatesMatch(block.states, b.states);
                            }
                            else {
                                return true;
                            }
                        }
                        else {
                            return false;
                        }
                    // only works for the regular vanilla water, flowing water, lava, and flowing lava blocks when using a BlockPermutation as the parameter
                    case "isLiquid":
                        if (["minecraft:water", "minecraft:flowing_water", "minecraft:lava", "minecraft:flowing_lava"].includes(block.type instanceof BlockType ? block.type.id : block.type)) {
                            if (b.states != undefined && block.states != undefined) {
                                return BlockMask.testForStatesMatch(block.states, b.states);
                            }
                            else {
                                return true;
                            }
                        }
                        else {
                            return false;
                        }
                    // does not work when using a BlockPermutation as the parameter
                    case "isSolid":
                        return false;
                    // does not work when using a BlockPermutation as the parameter
                    case "isValid":
                        return false;
                    // does not work when using a BlockPermutation as the parameter
                    case "isWaterlogged":
                        return false;
                    case "canBeWaterlogged":
                    case "isWaterloggable":
                    case "waterloggable":
                        if (tryget(() => block.type instanceof BlockType
                            ? BlockPermutation.resolve(block.type.id).canContainLiquid(modules.mcServer.LiquidType.Water)
                            : BlockPermutation.resolve(BlockTypes.get(block.type).id).canContainLiquid(modules.mcServer.LiquidType.Water)) ??
                            false) {
                            if (b.states != undefined && block.states != undefined) {
                                return BlockMask.testForStatesMatch(block.states, b.states);
                            }
                            else {
                                return true;
                            }
                        }
                        else {
                            return false;
                        }
                    case "keep":
                        if ((block.type instanceof BlockType ? block.type.id : block.type) == "minecraft:air") {
                            if (b.states != undefined && block.states != undefined) {
                                return BlockMask.testForStatesMatch(block.states, b.states);
                            }
                            else {
                                return true;
                            }
                        }
                        else {
                            return false;
                        }
                    // only works for some container types when using a BlockPermutation as the parameter
                    case "containers":
                        if (knownContainerTypes.includes((block.type instanceof BlockType ? block.type.id : block.type))) {
                            if (b.states != undefined && block.states != undefined) {
                                return BlockMask.testForStatesMatch(block.states, b.states);
                            }
                            else {
                                return true;
                            }
                        }
                        else {
                            return false;
                        }
                    case "none":
                        return this.#blocksList.find((bb) => (bb?.type ?? "none") != "none") != undefined;
                    case "true":
                        return true;
                    case "false":
                        return false;
                    default:
                        if (b.type.startsWith("tag:")) {
                            return BlockPermutation.resolve(block.type instanceof BlockType ? block.type.id : block.type).hasTag(b.type.slice(4));
                        }
                        else if ((block.type instanceof BlockType ? block.type.id : block.type) == (tryget(() => BlockTypes.get(b.type).id) ?? "invalid")) {
                            if (b.states != undefined && block.states != undefined) {
                                return BlockMask.testForStatesMatch(block.states, b.states);
                            }
                            else {
                                return true;
                            }
                        }
                        else {
                            return false;
                        }
                }
            }) != undefined;
            return mode == "exclude" ? !resultFound : resultFound;
        }
    }
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
    static testForStatesMatch(states, statesMask) {
        return testForObjectExtension(states, statesMask);
    }
    /**
     * Parses a string into a BlockMask object.
     *
     * @deprecated This function is non-functional, and does absolutely nothing.
     */
    static parse() { }
    /**
     * Extracts a raw block mask from a string.
     *
     * @param {string} str The string to extract the raw block mask from.
     * @returns {string | null} The raw block mask, or null if no raw block mask was found.
     */
    static extractRaw(str) {
        return str.match(/(?<=\s|^)([ie]:)?((?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:(?:[a-zA-Z0-9_\-\.]+:)?)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$))(,(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:(?:[a-zA-Z0-9_\-\.]+:)?)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?)*/)?.[0];
    }
    /**
     * Extracts a block mask from a string.
     *
     * @param {string} str The string to extract the block mask from.
     * @param {boolean} [extraIdParsingEnabled = true] Whether to enable extra ID parsing. If emabled, filters with block IDs of "none" or "any" will be removed.
     * @param {"include" | "exclude"} [modeOverride] Override the mode of the block mask. If not provided, the mode will be determined based on the string.
     * @returns {BlockMask} The block mask extracted from the string.
     */
    static extract(str, extraIdParsingEnabled = true, modeOverride) {
        if (extraIdParsingEnabled) {
            const result = extractCustomMaskType(str);
            const out = cullEmpty(result.map((v) => v.type == "none"
                ? undefined
                : v.type == "any"
                    ? undefined
                    : {
                        type: v.type == "keep" ? "air" : v.type,
                        states: v.states,
                    }));
            return new BlockMask(out, modeOverride ?? result.mode);
        }
        else {
            const result = extractCustomMaskType(str);
            return new BlockMask(result, modeOverride ?? result.mode);
        }
    }
    /**
     * Extracts a block mask and its raw string from a string.
     *
     * @param {string} str The string to extract the block mask from.
     * @param {boolean} [extraIdParsingEnabled = true] Whether to enable extra ID parsing. If emabled, filters with block IDs of "none" or "any" will be removed. Only applies to the block mask, the raw string is not affected.
     * @param {"include" | "exclude"} [modeOverride] Override the mode of the block mask. If not provided, the mode will be determined based on the string. Only applies to the block mask, the raw string is not affected.
     * @returns {{ raw: string; parsed: BlockMask }} The raw string and the block mask extracted from the string.
     */
    static extractWRaw(str, extraIdParsingEnabled = true, modeOverride) {
        let result;
        let mode = "include";
        if (extraIdParsingEnabled) {
            const r = extractCustomMaskType(str);
            result = cullEmpty(r.map((v) => v.type == "none"
                ? undefined
                : v.type == "any"
                    ? undefined
                    : {
                        type: v.type == "keep" ? "air" : v.type,
                        states: v.states,
                    }));
            mode = r.mode;
        }
        else {
            const r = extractCustomMaskType(str);
            result = r;
            mode = r.mode;
        }
        return {
            raw: str.match(/(?<=\s|^)([ie]:)?((?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:(?:[a-zA-Z0-9_\-\.]+:)?)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$))(,(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:(?:[a-zA-Z0-9_\-\.]+:)?)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?)*/)[0],
            parsed: extraIdParsingEnabled ? new BlockMask(result, modeOverride ?? mode) : new BlockMask(result, modeOverride ?? mode),
        };
    }
    /**
     * Extracts the raw strings of all block masks from a string.
     *
     * @param {string} str The string to extract the block masks from.
     * @returns {string[] | null} The raw strings of the block masks extracted from the string, or null if no block masks were found.
     */
    static extractAllRaw(str) {
        return str.match(/(?<=\s|^)([ie]:)?((?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:(?:[a-zA-Z0-9_\-\.]+:)?)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$))(,(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:(?:[a-zA-Z0-9_\-\.]+:)?)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?)*/g);
    }
    /**
     * Extracts all block masks from a string.
     *
     * @param {string} str The string to extract the block masks from.
     * @param {boolean} [extraIdParsingEnabled = true] Whether to enable extra ID parsing. If emabled, filters with block IDs of "none" or "any" will be removed.
     * @param {"include" | "exclude"} [modeOverride] Override the mode of the block mask. If not provided, the mode will be determined based on the string.
     * @returns {BlockMask[]} The block masks extracted from the string.
     */
    static extractAll(str, extraIdParsingEnabled = true, modeOverride) {
        return extractCustomMaskTypes(str).map((v) => new BlockMask(extraIdParsingEnabled
            ? cullEmpty(v.map((v) => v.type == "none"
                ? undefined
                : v.type == "any"
                    ? undefined
                    : {
                        type: v.type == "keep" ? "air" : v.type,
                        states: v.states,
                    }))
            : v, modeOverride ?? v.mode));
    }
    /**
     * Extracts all block masks from a string and their raw strings.
     *
     * @param {string} str The string to extract the block masks from.
     * @param {boolean} [extraIdParsingEnabled = true] Whether to enable extra ID parsing. If emabled, filters with block IDs of "none" or "any" will be removed. Only applies to the block masks, the raw strings are not affected.
     * @param {"include" | "exclude"} [modeOverride] Override the mode of the block mask. If not provided, the mode will be determined based on the string. Only applies to the block masks, the raw strings are not affected.
     * @returns {{ raw: string[] | null; parsed: BlockMask[] }} An object containing the raw strings and the block masks extracted from the string.
     */
    static extractAllWRaw(str, extraIdParsingEnabled = true, modeOverride) {
        return {
            raw: str.match(/(?<=\s|^)([ie]:)?((?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:(?:[a-zA-Z0-9_\-\.]+:)?)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$))(,(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:(?:[a-zA-Z0-9_\-\.]+:)?)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?)*/g),
            parsed: extractCustomMaskTypes(str).map((v) => new BlockMask(extraIdParsingEnabled
                ? cullEmpty(v.map((v) => v.type == "none"
                    ? undefined
                    : v.type == "any"
                        ? undefined
                        : {
                            type: v.type == "keep" ? "air" : v.type,
                            states: v.states,
                        }))
                : v, modeOverride ?? v.mode)),
        };
    }
}
function extractCustomMaskType(str) {
    const maskTypes = [];
    const regex = /(?<=\s|^)([ie]:)?((?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:(?:[a-zA-Z0-9_\-\.]+:)?)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$))(,(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:(?:[a-zA-Z0-9_\-\.]+:)?)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?)*/;
    const regexb = /([ie]:)?(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:(?:[a-zA-Z0-9_\-\.]+:)?)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$)/g;
    const rawMatch = str.match(regex)[0];
    const matches = rawMatch.match(regexb);
    let mode = "include";
    if (matches) {
        matches.forEach((match, index) => {
            if (index == 0 && !!match.match(/^i:/)) {
                match = match.slice(2);
            }
            else if (index == 0 && !!match.match(/^e:/)) {
                match = match.slice(2);
                mode = "exclude";
            }
            let type = match.trim();
            let states = null;
            // Extract states if present
            const statesMatch = type.match(/[\[\{]([^\]\}]*)[\]\}]/);
            if (!!statesMatch) {
                const statesStr = statesMatch[1];
                try {
                    states = JSON.parse(statesMatch[0].replace(/'/g, '"'));
                }
                catch (error) {
                    // States couldn't be parsed as JSON, parse as key-value pairs
                    states = {};
                    const keyValuePairs = statesStr.split(",");
                    keyValuePairs.forEach((pair) => {
                        const keyValue = pair.trim().split("=");
                        const key = keyValue[0].trim().slice(1, -1);
                        let value = keyValue[1].trim();
                        // Convert value to number or boolean if possible
                        if (!isNaN(value)) {
                            value = parseFloat(value);
                        }
                        else if (value.toLowerCase() === "true") {
                            value = true;
                        }
                        else if (value.toLowerCase() === "false") {
                            value = false;
                        }
                        states[key] = value;
                    });
                }
                // Remove states from the type
                type = type.replace(/[\[\{][^\]\}]*[\]\}]/, "").trim();
            }
            // Extract chance if present
            const stringMatch = type.match(/^["']([^"]+)["']$/);
            if (!!stringMatch) {
                type = stringMatch[1].trim() /*.escapeCharactersB()*/;
            }
            maskTypes.push({
                type: tryget(() => BlockTypes.get(type).id) ?? type,
                states,
            });
        });
    }
    return Object.assign(maskTypes, { mode, rawMatch });
}
function extractCustomMaskTypes(str) {
    const masks = [];
    const regex = /(?<=\s|^)([ie]:)?((?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:(?:[a-zA-Z0-9_\-\.]+:)?)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$))(,(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:(?:[a-zA-Z0-9_\-\.]+:)?)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?)*/g;
    const regexb = /([ie]:)?(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:(?:[a-zA-Z0-9_\-\.]+:)?)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$)/g;
    const matchesa = str.match(regex);
    matchesa.forEach((m) => {
        const matches = m.match(regexb);
        if (matches) {
            let mode = "include";
            const maskTypes = [];
            matches.forEach((match, index) => {
                if (index == 0 && !!match.match(/^i:/)) {
                    match = match.slice(2);
                }
                else if (index == 0 && !!match.match(/^e:/)) {
                    match = match.slice(2);
                    mode = "exclude";
                }
                let type = match.trim();
                let states = null;
                // Extract states if present
                const statesMatch = type.match(/[\[\{]([^\]\}]*)[\]\}]/);
                if (!!statesMatch) {
                    const statesStr = statesMatch[1];
                    try {
                        states = JSON.parse(statesMatch[0].replace(/'/g, '"'));
                    }
                    catch (error) {
                        // States couldn't be parsed as JSON, parse as key-value pairs
                        states = {};
                        const keyValuePairs = statesStr.split(",");
                        keyValuePairs.forEach((pair) => {
                            const keyValue = pair.trim().split("=");
                            const key = keyValue[0].trim().slice(1, -1);
                            let value = keyValue[1].trim();
                            // Convert value to number or boolean if possible
                            if (!isNaN(value)) {
                                value = parseFloat(value);
                            }
                            else if (value.toLowerCase() === "true") {
                                value = true;
                            }
                            else if (value.toLowerCase() === "false") {
                                value = false;
                            }
                            states[key] = value;
                        });
                    }
                    // Remove states from the type
                    type = type.replace(/[\[\{][^\]\}]*[\]\}]/, "").trim();
                }
                // Extract chance if present
                const stringMatch = type.match(/^["']([^"]+)["']$/);
                if (!!stringMatch) {
                    type = stringMatch[1].trim() /*.escapeCharactersB()*/;
                }
                maskTypes.push({
                    type: tryget(() => BlockTypes.get(type).id) ?? type,
                    states,
                });
            });
            masks.push(Object.assign(maskTypes, { mode: mode, rawMatch: m }));
        }
    });
    return masks;
}
//# sourceMappingURL=BlockMask.js.map