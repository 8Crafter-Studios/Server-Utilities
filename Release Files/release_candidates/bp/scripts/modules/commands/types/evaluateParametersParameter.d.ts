/**
 * A paramter for the {@link evaluateParameters} function.
 *
 * This includes both the {@link objectEvaluateParametersParameter} and {@link stringEvaluateParametersParameter} types.
 */
export type evaluateParametersParameter = objectEvaluateParametersParameter | stringEvaluateParametersParameter;
/**
 * An advanced paramter for the {@link evaluateParameters} function.
 *
 * This is for parameter types that are specified by an object.
 */
export type objectEvaluateParametersParameter = {
    /**
     * The type of the parameter.
     */
    type: "presetText" | "number" | "boolean" | "neboolean" | "string" | "non-booleanString" | "json" | "Vector" | "Vector1" | "Vector2" | "Vector3" | "Vector4" | "Vector5" | "Vector6" | "Vector7" | "Vector8" | "targetSelector" | "blockStates" | "blockPattern" | "block" | "blockMask" | "dimension" | `-${string}` | `f-${string}`;
    /**
     * The key to use for this parameter.
     *
     * If specified, it will be used as the property name used in the returned args object.
     *
     * This uses the {@link LooseAutocomplete} type to make sure that the type is inferred as a string literal rather than the generic string type.
     *
     * @type {string}
     *
     * @default Index
     */
    key?: LooseAutocomplete<"">;
    /**
     * The maximum length of the parameter.
     *
     * @deprecated This property is unused.
     *
     * @default Infinity
     */
    maxLength?: number;
} | {
    /**
     * The type of the parameter.
     */
    type: "Vectors";
    /**
     * The key to use for this parameter.
     *
     * If specified, it will be used as the property name used in the returned args object.
     *
     * This uses the {@link LooseAutocomplete} type to make sure that the type is inferred as a string literal rather than the generic string type.
     *
     * @type {string}
     *
     * @default Index
     */
    key?: LooseAutocomplete<"">;
    /**
     * The number of vectors to expect.
     *
     * @default 3
     */
    vectorCount?: number;
    /**
     * The maximum length of the parameter.
     *
     * @deprecated This property is unused.
     *
     * @default Infinity
     */
    maxLength?: number;
} | {
    /**
     * The type of the parameter.
     */
    type: "ignorableNamedParameter";
    /**
     * The key to use for this parameter.
     *
     * If specified, it will be used as the property name used in the returned args object.
     *
     * This uses the {@link LooseAutocomplete} type to make sure that the type is inferred as a string literal rather than the generic string type.
     *
     * @type {string}
     *
     * @default Index
     */
    key?: LooseAutocomplete<"">;
    /**
     * The name of the parameter.
     *
     * This will be used for users to provide the parameter.
     *
     * The value users will enter will be formatted as: `${name}${delimeter ?? "="}value` or `${name}${delimeter ?? "="}"value with spaces and escape codes"`
     *
     * This uses the {@link LooseAutocomplete} type to make sure that the type is inferred as a string literal rather than the generic string type.
     *
     * @type {string}
     */
    name: LooseAutocomplete<"">;
    /**
     * The value type of the parameter.
     *
     * This currently only supports the following types:
     * - `string`
     * - `number`
     * - `boolean`
     *
     * @default "string"
     */
    valueType?: Exclude<evaluateParametersParameter, {
        type: "ignorableNamedParameter";
    }>;
    /**
     * The delimeter to use between the name and the value.
     *
     * This uses the {@link LooseAutocomplete} type to make sure that the type is inferred as a string literal rather than the generic string type.
     *
     * @default "="
     */
    delimeter?: LooseAutocomplete<"">;
    /**
     * Whether the name is case sensitive.
     *
     * @default false
     */
    nameIsCaseSensitive?: boolean;
    /**
     * The maximum length of the parameter.
     *
     * @deprecated This property is unused.
     *
     * @default Infinity
     */
    maxLength?: number;
};
/**
 * A basic parameter type for {@link evaluateParameters}.
 *
 * This is for paramter types that are specified by just a string.
 */
export type stringEvaluateParametersParameter = "presetText" | "number" | "boolean" | "neboolean" | "string" | "non-booleanString" | "json" | "Vector" | "Vector1" | "Vector2" | "Vector3" | "Vector4" | "Vector5" | "Vector6" | "Vector7" | "Vector8" | "targetSelector" | "blockStates" | "blockPattern" | "block" | "blockMask" | "dimension" | `-${string}` | `f-${string}`;
