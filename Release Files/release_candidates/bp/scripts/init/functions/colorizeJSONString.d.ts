/**
 * Colorizes a JSON string or object.
 *
 * @param {string | object | number | boolean} json The JSON string or object to colorize.
 * @param {object} [options] The options for colorizing the JSON string.
 * @param {string} [options.number="§6"] The color to use for numbers.
 * @param {string} [options.key="§e"] The color to use for keys.
 * @param {string} [options.string="§q"] The color to use for strings.
 * @param {string} [options.true="§a"] The color to use for true.
 * @param {string} [options.false="§c"] The color to use for false.
 * @param {string} [options.null="§d"] The color to use for null.
 * @param {string} [options.undefined="§d"] The color to use for undefined.
 * @param {string} [options.bigint="§g"] The color to use for bigints.
 * @param {string} [options.leftCurlyBracket="§9"] The color to use for left curly brackets.
 * @param {string} [options.rightCurlyBracket="§9"] The color to use for right curly brackets.
 * @param {string} [options.leftSquareBracket="§5"] The color to use for left square brackets.
 * @param {string} [options.rightSquareBracket="§5"] The color to use for right square brackets.
 * @param {string} [options.comma="§f"] The color to use for commas.
 * @returns {string} The colorized JSON string.
 * @throws {any} If an error occurs while running {@link JSON.stringify}. Only applies the the `json` parameter is not a string.
 *
 * @default
 * enum options = {
 *     number = "§6",
 *     key = "§e",
 *     string = "§q",
 *     true = "§a",
 *     false = "§c",
 *     null = "§d",
 *     undefined = "§d"
 *     bigint = "§g",
 *     leftCurlyBracket = "§9",
 *     rightCurlyBracket = "§9",
 *     leftSquareBracket = "§5",
 *     rightSquareBracket = "§5",
 *     comma = "§f",
 * }
 */
export declare function colorizeJSONString(json: string | object | number | boolean, options?: {
    number?: string;
    key?: string;
    string?: string;
    true?: string;
    false?: string;
    null?: string;
    undefined?: string;
    bigint?: string;
    leftCurlyBracket?: string;
    rightCurlyBracket?: string;
    leftSquareBracket?: string;
    rightSquareBracket?: string;
    comma?: string;
}): string;
declare global {
    /**
     * Colorizes a JSON string or object.
     *
     * @param {string | object} json The JSON string or object to colorize.
     * @param {object} [options] The options for colorizing the JSON string.
     * @param {string} [options.number="§6"] The color to use for numbers.
     * @param {string} [options.key="§e"] The color to use for keys.
     * @param {string} [options.string="§q"] The color to use for strings.
     * @param {string} [options.true="§a"] The color to use for true.
     * @param {string} [options.false="§c"] The color to use for false.
     * @param {string} [options.null="§d"] The color to use for null.
     * @param {string} [options.undefined="§d"] The color to use for undefined.
     * @param {string} [options.bigint="§g"] The color to use for bigints.
     * @param {string} [options.leftCurlyBracket="§9"] The color to use for left curly brackets.
     * @param {string} [options.rightCurlyBracket="§9"] The color to use for right curly brackets.
     * @param {string} [options.leftSquareBracket="§5"] The color to use for left square brackets.
     * @param {string} [options.rightSquareBracket="§5"] The color to use for right square brackets.
     * @param {string} [options.comma="§f"] The color to use for commas.
     * @returns {string} The colorized JSON string.
     *
     * @default
     * enum options = {
     *     number = "§6",
     *     key = "§e",
     *     string = "§q",
     *     true = "§a",
     *     false = "§c",
     *     null = "§d",
     *     undefined = "§d"
     *     bigint = "§g",
     *     leftCurlyBracket = "§9",
     *     rightCurlyBracket = "§9",
     *     leftSquareBracket = "§5",
     *     rightSquareBracket = "§5",
     *     comma = "§f",
     * }
     */
    function colorizeJSONString(json: string | object, options?: {
        number?: string;
        key?: string;
        string?: string;
        true?: string;
        false?: string;
        null?: string;
        undefined?: string;
        bigint?: string;
        leftCurlyBracket?: string;
        rightCurlyBracket?: string;
        leftSquareBracket?: string;
        rightSquareBracket?: string;
        comma?: string;
    }): string;
}
