import { BlockPermutation } from "@minecraft/server";
import { selectWeightedElement } from "modules/commands/functions/selectWeightedElement";
function extractCustomPatternTypes(str) {
    const patterns = [];
    const regex = /(?<=\s|^)([rs]:)?((?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[%*]{1,2}\d+)?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$))(,(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[%*]{1,2}\d+)?(?:[\[\{](?:[^\]\}]*)[\]\}])?)*/g;
    const regexb = /([rs]:)?(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[%*]{1,2}\d+)?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$)/g;
    const matchesa = str.match(regex);
    matchesa.forEach((m) => {
        const matches = m.match(regexb);
        if (matches) {
            let mode = "random";
            const patternTypes = [];
            matches.forEach((match, index) => {
                if (index == 0 && !!match.match(/^r:/)) {
                    match = match.slice(2);
                }
                else if (index == 0 && !!match.match(/^s:/)) {
                    match = match.slice(2);
                    mode = "sequence";
                }
                let type = match.trim();
                let weight = null;
                let states = null;
                // Extract chance if present
                const weightMatch = type.match(/[%*]{1,2}(\d+)(?=[\s\n]*$|\[|\{)/);
                if (!!weightMatch) {
                    weight = parseInt(weightMatch[1]);
                    type = type
                        .replace(/[%*]{1,2}(\d+)(?=[\s\n]*$|\[|\{)/, "")
                        .trim();
                }
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
                patternTypes.push({ type, states, weight });
            });
            patterns.push(Object.assign(patternTypes, { mode: mode }));
        }
    });
    return patterns;
}
function extractCustomPatternType(str) {
    const patternTypes = [];
    const regex = /(?<=\s|^)([rs]:)?((?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[%*]{1,2}\d+)?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$))(,(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[%*]{1,2}\d+)?(?:[\[\{](?:[^\]\}]*)[\]\}])?)*/;
    const regexb = /([rs]:)?(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[%*]{1,2}\d+)?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$)/g;
    const matches = str.match(regex)[0].match(regexb);
    let mode = "random";
    if (matches) {
        matches.forEach((match, index) => {
            if (index == 0 && !!match.match(/^r:/)) {
                match = match.slice(2);
            }
            else if (index == 0 && !!match.match(/^s:/)) {
                match = match.slice(2);
                mode = "sequence";
            }
            let type = match.trim();
            let weight = null;
            let states = null;
            // Extract chance if present
            const weightMatch = type.match(/[%*]{1,2}(\d+)(?=[\s\n]*$|\[|\{)/);
            if (!!weightMatch) {
                weight = parseInt(weightMatch[1]);
                type = type
                    .replace(/[%*]{1,2}(\d+)(?=[\s\n]*$|\[|\{)/, "")
                    .trim();
            }
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
            patternTypes.push({ type, states, weight });
        });
    }
    return Object.assign(patternTypes, { mode: mode });
}
/**
 * A class that represents a block pattern.
 *
 * Block patterns are used to generate blocks in a world.
 *
 * Many things use them, such as many of the WorldEdit commands.
 */
export class BlockPattern {
    /**
     * The entries for the block pattern.
     *
     * @default []
     */
    blocks = [];
    /**
     * The type of the block pattern.
     *
     * "random" will make it generate the block pattern in a random order and will use the weights to determine the chance of each block pattern entry being selected.
     *
     * "sequence" will make it generate the block pattern in a sequence and will use the weights to determine the number of times each block pattern entry will be repeated.
     *
     * @default "random"
     */
    type = "random";
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
    get raw() {
        return (this.type === "sequence" ? "s:" : "r:") + (this.blocks.length === 0 ? "none" : this.blocks.map((v) => v.rawsb).join(","));
    }
    /**
     * Converts the block pattern to a string.
     *
     * It returns the same value as {@link BlockPattern.prototype.raw}.
     *
     * @returns {string} The raw string representation of the block pattern.
     *
     * @since v1.33.1-preview.20+BUILD.1
     */
    toString() {
        return this.raw;
    }
    /**
     * Creates a new block pattern.
     *
     * @param {Omit<BlockPatternEntry, "raw" | "rawsb" | "rawns">[]} blocks The entries for the block pattern.
     * @param {"random" | "sequence"} [type = "random"] The type of the block pattern.
     * @returns A new block pattern.
     */
    constructor(blocks = [], type = "random") {
        (this.blocks = blocks.map((v) => ({
            type: v.type,
            states: v.states,
            weight: v.weight,
            get raw() {
                return `${this.type}${!!this.weight ? `%${this.weight}` : ""}${!!this.states ? `${JSON.stringify(this.states)}` : ""}`;
            },
            get rawsb() {
                return `${this.type}${!!this.weight ? `%${this.weight}` : ""}${!!this.states
                    ? `[${Object.entries(this.states)
                        .map(([k, v]) => JSON.stringify(k) + "=" + JSON.stringify(v))
                        .join(",")}]`
                    : ""}`;
            },
            get rawns() {
                return `${this.type}${!!this.weight ? `%${this.weight}` : ""}`;
            },
        }))),
            (this.type = type);
    }
    /**
     * Gets a block pattern entry.
     *
     * @param {number | bigint} [generateIndex = 0] The current index of the generation. This is used to determine which block pattern entry to get if the type is "sequence".
     * @param {"random" | "sequence"} [forceMode] The type of the block pattern. If specified, it will override the type property of the block pattern.
     * @returns {BlockPatternEntry} The block pattern entry.
     */
    generateBlock(generateIndex = 0, forceMode) {
        return ((!!!forceMode && this.type == "random") || forceMode == "random"
            ? selectWeightedElement(this.blocks)
            : this.blocks
                .map((b) => !!b.weight ? new Array(b.weight).fill(b) : [b])
                .flat()[Number(BigInt(generateIndex) %
                BigInt(this.blocks
                    .map((b) => !!b.weight
                    ? new Array(b.weight).fill(b)
                    : [b])
                    .flat().length))]);
    }
    /**
     * Gets a block permutation from a block pattern entry.
     *
     * @param {number | bigint} [generateIndex = 0] The current index of the generation. This is used to determine which block pattern entry to get if the type is "sequence".
     * @param {"random" | "sequence"} [forceMode] The type of the block pattern. If specified, it will override the type property of the block pattern.
     * @returns {BlockPermutation} The block permutation.
     */
    generateBlockP(generateIndex = 0, forceMode) {
        const p = (!!!forceMode && this.type == "random") || forceMode == "random"
            ? selectWeightedElement(this.blocks)
            : this.blocks
                .map((b) => !!b.weight ? new Array(b.weight).fill(b) : [b])
                .flat()[Number(BigInt(generateIndex) %
                BigInt(this.blocks
                    .map((b) => !!b.weight
                    ? new Array(b.weight).fill(b)
                    : [b])
                    .flat().length))];
        return BlockPermutation.resolve(p.type, p.states);
    }
    /**
     * Pushes a block pattern entry to the block pattern.
     *
     * @param {...Omit<BlockPatternEntry, "raw" | "rawsb" | "rawns">[]} blocks The entries to push to the block pattern.
     * @returns {number} The new amount of entries in the block pattern.
     */
    push(...blocks) {
        return this.blocks.push(...blocks.map((v) => ({
            type: v.type,
            states: v.states,
            weight: v.weight,
            get raw() {
                return `${this.type}${!!this.weight ? `%${this.weight}` : ""}${!!this.states ? `${JSON.stringify(this.states)}` : ""}`;
            },
            get rawsb() {
                return `${this.type}${!!this.weight ? `%${this.weight}` : ""}${!!this.states
                    ? `[${Object.entries(this.states)
                        .map(([k, v]) => JSON.stringify(k) + "=" + JSON.stringify(v))
                        .join(",")}]`
                    : ""}`;
            },
            get rawns() {
                return `${this.type}${!!this.weight ? `%${this.weight}` : ""}`;
            },
        })));
    }
    /**
     * Parses a string into a BlockPattern object.
     *
     * @deprecated This function is non-functional, and does absolutely nothing.
     */
    static parse() { }
    /**
     * Extracts a raw block pattern from a string.
     *
     * @param {string} str The string to extract the raw block pattern from.
     * @returns {string | null} The raw block pattern, or null if no raw block pattern was found.
     */
    static extractRaw(str) {
        return str.match(/(?<=\s|^)([rs]:)?((?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[%*]{1,2}\d+)?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$))(,(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[%*]{1,2}\d+)?(?:[\[\{](?:[^\]\}]*)[\]\}])?)*/)?.[0];
    }
    /**
     * Extracts a block pattern from a string.
     *
     * @param {string} str The string to extract the block pattern from.
     * @param {"random" | "sequence"} [mode] The type of the block pattern. If not provided, the mode will be determined based on the string.
     * @returns {BlockPattern} The block pattern extracted from the string.
     */
    static extract(str, mode) {
        return new BlockPattern(...((v) => [v, mode ?? v.mode])(extractCustomPatternType(str)));
    }
    /**
     * Extracts a block pattern from a string and returns the raw string and the parsed block pattern.
     *
     * @param {string} str The string to extract the block pattern from.
     * @param {"random" | "sequence"} [mode] The type of the block pattern. If not provided, the mode will be determined based on the string. Only Only applies to the block pattern, the raw string is not affected.
     * @returns {{ raw: string | null; parsed: BlockPattern; }} The raw string and the parsed block pattern. Only applies to the block pattern, the raw string is not affected.
     */
    static extractWRaw(str, mode) {
        return {
            raw: str.match(/(?<=\s|^)([rs]:)?((?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[%*]{1,2}\d+)?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$))(,(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[%*]{1,2}\d+)?(?:[\[\{](?:[^\]\}]*)[\]\}])?)*/)?.[0],
            parsed: new BlockPattern(...((v) => [v, mode ?? v.mode])(extractCustomPatternType(str))),
        };
    }
    /**
     * Extracts all raw block patterns from a string.
     *
     * @param {string} str The string to extract the raw block patterns from.
     * @returns {string[] | null} The raw block patterns, or null if no raw block patterns were found.
     */
    static extractAllRaw(str) {
        return str.match(/(?<=\s|^)([rs]:)?((?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[%*]{1,2}\d+)?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$))(,(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[%*]{1,2}\d+)?(?:[\[\{](?:[^\]\}]*)[\]\}])?)*/g);
    }
    /**
     * Extracts all block patterns from a string.
     *
     * @param {string} str The string to extract the block patterns from.
     * @param {"random" | "sequence"} [mode] The type of the block patterns. If not provided, the mode will be determined based on the string.
     * @returns {BlockPattern[]} The block patterns extracted from the string.
     */
    static extractAll(str, mode) {
        return extractCustomPatternTypes(str).map((v) => new BlockPattern(v, mode ?? v.mode));
    }
    /**
     * Extracts all raw block patterns from a string and returns the raw strings and the parsed block patterns.
     *
     * @param {string} str The string to extract the raw block patterns from.
     * @param {"random" | "sequence"} [mode] The type of the block patterns. If not provided, the mode will be determined based on the string. Only applies to the block patterns, the raw strings are not affected.
     * @returns {{ raw: string[] | null; parsed: BlockPattern[]; }} The raw strings and the parsed block patterns. Only applies to the block patterns, the raw strings are not affected.
     */
    static extractAllWRaw(str, mode) {
        return {
            raw: str.match(/(?<=\s|^)([rs]:)?((?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[%*]{1,2}\d+)?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$))(,(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[%*]{1,2}\d+)?(?:[\[\{](?:[^\]\}]*)[\]\}])?)*/g),
            parsed: extractCustomPatternTypes(str).map((v) => new BlockPattern(v, mode ?? v.mode)),
        };
    }
}
//# sourceMappingURL=BlockPattern.js.map