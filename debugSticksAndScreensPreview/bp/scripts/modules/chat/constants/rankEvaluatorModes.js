/**
 * An array of rank evaluator modes used in the chat module.
 *
 * - `default`: The default mode for rank evaluation.
 * - `suffix_and_prefix_only_once`: A mode where the suffix and prefix are added to the begginning and end of the joined ranks, instead of being added to each rank. So, instead of `[rank1] [rank2] [rank3]`, it will be `[rank1 rank2 rank3]`, or instead of `[rank1],[rank2],[rank3]`, it will be `[rank1,rank2,rank3]`.
 */
export const rankEvaluatorModes = [
    "default",
    "suffix_and_prefix_only_once"
];
export const rankEvaluatorModesDisplayMap = {
    default: "Default",
    suffix_and_prefix_only_once: "Suffix and Prefix Only Once",
};
//# sourceMappingURL=rankEvaluatorModes.js.map