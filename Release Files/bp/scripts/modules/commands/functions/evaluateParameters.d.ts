import type { Dimension } from "@minecraft/server";
import { BlockMask } from "modules/commands/classes/BlockMask";
import { BlockPattern } from "modules/commands/classes/BlockPattern";
import type { evaluateParametersParameter, objectEvaluateParametersParameter as objectEvaluateParametersParameter } from "modules/commands/types/evaluateParametersParameter";
export declare const flagsParameterFlagKeysList: readonly ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "!", "@", "#", "$", "%", "^", "&", "*", "<", ">", ",", ".", "~"];
/**
 * A union type of all the valid flag keys for the flags parameter.
 */
export type FlagsParamterFlagKeys = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" | "!" | "@" | "#" | "$" | "%" | "^" | "&" | "*" | "<" | ">" | "," | "." | "~";
/**
 * The result of the {@link evaluateParameters} function.
 *
 * @template {evaluateParametersParameter[] | [evaluateParametersParameter]} T The paramter types.
 * @template {boolean} UOAT If the old args return type should be used. Default is false.
 *
 * @remarks
 * If the {@link UOAT} type parameter is set to true, the {@link args | args} property uses {@link EvaluateParemtersResultArgs_basic} instead of {@link EvaluateParemtersResultArgs_v2}.
 */
export interface EvalutateParamtersResult<T extends evaluateParametersParameter[] | [evaluateParametersParameter], UOAT extends boolean = false> {
    /**
     * The original parameters.
     *
     * @type {T}
     */
    params: T;
    /**
     * The rest of the commandstring paramter, that was not matched to any parameters.
     *
     * @type {string}
     */
    extra: string;
    /**
     * The evaluated parameters.
     */
    args: UOAT extends true ? EvaluateParemtersResultArgs_basic<T> : {} extends this["argsK"] ? this["argsT"] : this["argsK"] & this["argsT"];
    /**
     * The evaluated parameters, but with just the tuple type, and not the object intersection.
     *
     * The actual value is exactly the same as {@link args}, it is only the type that is different.
     *
     * Use this if you want to spread it into another tuple.
     *
     * @type {UOAT extends true ? EvaluateParemtersResultArgs_basic<T> : EvaluateParemtersResultArgs_v2_TupleOnly<T>}
     */
    get argsT(): UOAT extends true ? EvaluateParemtersResultArgs_basic<T> : EvaluateParemtersResultArgs_v2_TupleOnly<T>;
    /**
     * The evaluated parameters, but with just the object type, and not the tuple intersection.
     *
     * The actual value is exactly the same as {@link args}, it is only the type that is different.
     *
     * @type {UOAT extends true ? EvaluateParemtersResultArgs_basic<T> : EvaluateParemtersResultArgs_v2_KeyedOnly<T>}
     */
    get argsK(): UOAT extends true ? EvaluateParemtersResultArgs_basic<T> : EvaluateParemtersResultArgs_v2_KeyedOnly<T>;
    /**
     * Any errors that occurred.
     *
     * @type {[Error, any][]}
     *
     * @default []
     */
    err: [Error, any][];
}
/**
 * Maps a parameter type to a type that can be used in the {@link EvalutateParamtersResult} object.
 *
 * @template {evaluateParametersParameter[] | [evaluateParametersParameter]} T The paramter types.
 */
export type EvaluateParamtersParamterTypeMapper<T extends evaluateParametersParameter> = T extends "placeholder" ? undefined : T extends "presetText" ? string | undefined : T extends "number" ? number | undefined : T extends "boolean" ? boolean | undefined : T extends "neboolean" ? boolean | undefined : T extends "string" ? string | undefined : T extends "non-booleanString" ? string | undefined : T extends "json" ? any | undefined : T extends "Vector" ? string | undefined : T extends "Vector1" ? string | undefined : T extends "Vector2" ? string | undefined : T extends "Vector3" ? string | undefined : T extends "Vector4" ? string | undefined : T extends "Vector5" ? string | undefined : T extends "Vector6" ? string | undefined : T extends "Vector7" ? string | undefined : T extends "Vector8" ? string | undefined : T extends "Vectors" ? string | undefined : T extends "targetSelector" ? string | undefined : T extends "blockStates" ? {
    [id: string]: string | number | boolean;
} | undefined : T extends "blockPattern" ? BlockPattern | undefined : T extends "block" ? {
    id: string;
    states?: {
        [id: string]: string | number | boolean;
    };
} | undefined : T extends "blockMask" ? BlockMask | undefined : T extends "dimension" ? Dimension | undefined : T extends `-${string}` ? string : T extends `f-${string}` ? T extends `f-${infer Flags}` ? {
    [key in Split<Flags>[number] as key extends FlagsParamterFlagKeys ? key : never]: boolean;
} : never : T extends {
    type: "placeholder";
} ? undefined : T extends {
    type: "number";
    key?: infer PK extends string;
} ? number | undefined : T extends {
    type: "boolean";
    key?: infer PK extends string;
} ? boolean | undefined : T extends {
    type: "neboolean";
    key?: infer PK extends string;
} ? boolean | undefined : T extends {
    type: "string";
    key?: infer PK extends string;
} ? string | undefined : T extends {
    type: "presetText";
    key?: infer PK extends string;
} ? string | undefined : T extends {
    type: "non-booleanString";
    key?: infer PK extends string;
} ? string | undefined : T extends {
    type: "json";
} ? any | undefined : T extends {
    type: "Vector";
} ? string | undefined : T extends {
    type: "Vector1";
} ? string | undefined : T extends {
    type: "Vector2";
} ? string | undefined : T extends {
    type: "Vector3";
} ? string | undefined : T extends {
    type: "Vector4";
} ? string | undefined : T extends {
    type: "Vector5";
} ? string | undefined : T extends {
    type: "Vector6";
} ? string | undefined : T extends {
    type: "Vector7";
} ? string | undefined : T extends {
    type: "Vector8";
} ? string | undefined : T extends {
    type: "Vectors";
} ? string | undefined : T extends {
    type: "targetSelector";
} ? string | undefined : T extends {
    type: "blockStates";
} ? {
    [id: string]: string | number | boolean;
} | undefined : T extends {
    type: "blockPattern";
} ? BlockPattern | undefined : T extends {
    type: "block";
} ? {
    id: string;
    states?: {
        [id: string]: string | number | boolean;
    };
} | undefined : T extends {
    type: "blockMask";
} ? BlockMask | undefined : T extends {
    type: "dimension";
} ? Dimension | undefined : T extends {
    type: `-${string}`;
} ? string : T extends {
    type: `f-${string}`;
} ? T extends {
    type: `f-${infer Flags}`;
} ? {
    [key in Split<Flags>[number] as key extends FlagsParamterFlagKeys ? key : never]: boolean;
} : never : T extends {
    type: `ignorableNamedParameter`;
} ? T extends {
    type: `ignorableNamedParameter`;
    key?: infer PK extends string;
    name: infer Name;
    valueType?: infer ValueType extends Exclude<evaluateParametersParameter, {
        type: "ignorableNamedParameter";
    }>;
    delimeter?: infer Delimeter;
} ? (ValueType extends undefined ? string : ValueType extends "string" ? string : ValueType extends "number" ? number : ValueType extends "boolean" ? boolean : never) | null | undefined : never : any | undefined;
/**
 * The evaluated parameters from the {@link evaluateParameters} function.
 *
 * @template {evaluateParametersParameter[] | [evaluateParametersParameter]} T The paramter types.
 *
 * @deprecated This type is deprectated, use {@link EvaluateParemtersResultArgs_v2} instead.
 */
export type EvaluateParemtersResultArgs_basic<T extends evaluateParametersParameter[]> = {
    [Index in keyof T]: EvaluateParamtersParamterTypeMapper<T[Index]>;
};
/**
 * The evaluated parameters from the {@link evaluateParameters} function.
 *
 * This is similar to {@link EvaluateParemtersResultArgs_basic} but separates the paramter types that have a key property, and maps then to use that key as their property key in the resulting args object, and removing them from the tuple, including shifting the following non-keyed arguments' indices so that the keyed argument does leave a gap in their indices.
 *
 * @template {evaluateParametersParameter[] | [evaluateParametersParameter]} T The paramter types.
 * @template {boolean} INK If the non-keyed arguments should be included in the resulting args object.
 * @template {boolean} IK If the keyed arguments should be included in the resulting args object.
 * @template {ExcludeFromTuple<T, objectEvaluateParametersParameter & { key: string }>} NK The non-keyed paramter types.
 * @template {ExcludeFromTuple<T, ExcludeFromTuple<T, objectEvaluateParametersParameter & { key: string }>>} K The keyed paramter types.
 *
 * @deprecated This should avoid being used as it will has too many calculations and will be missing the keyed properties if there are too many paramters.
 */
export type EvaluateParemtersResultArgs_v2<T extends evaluateParametersParameter[] | [evaluateParametersParameter], INK extends boolean = true, IK extends boolean = true, NK extends [...evaluateParametersParameter[]] = ExcludeFromTuple<T, objectEvaluateParametersParameter & {
    key: string;
}>, K extends [...(objectEvaluateParametersParameter & {
    key: string;
})[]] = ExcludeFromTuple<T, NK[keyof NK]> extends [
    ...(objectEvaluateParametersParameter & {
        key: string;
    })[]
] ? ExcludeFromTuple<T, NK[keyof NK]> : [...(objectEvaluateParametersParameter & {
    key: string;
})[]]> = [] extends K ? INK extends true ? {
    [Index in keyof NK]: EvaluateParamtersParamterTypeMapper<NK[Index]>;
} : unknown : (IK extends true ? {
    [Key in K[number]["key"] extends string ? K[number]["key"] : never]: EvaluateParamtersParamterTypeMapper<Exclude<K[number], Exclude<K[number], {
        key: Key;
    }>>>;
} : unknown) & (INK extends true ? {
    [Index in keyof NK]: EvaluateParamtersParamterTypeMapper<NK[Index]>;
} : unknown);
/**
 * The evaluated parameters from the {@link evaluateParameters} function.
 *
 * This is similar to {@link EvaluateParemtersResultArgs_basic} but separates the paramter types that have a key property, and maps then to use that key as their property key in the resulting args object, and removing them from the tuple, including shifting the following non-keyed arguments' indices so that the keyed argument does leave a gap in their indices.
 *
 * This only returns the tuple part of the evaluated parameters, not the keyed properties.
 *
 * @template {evaluateParametersParameter[] | [evaluateParametersParameter]} T The paramter types.
 * @template {ExcludeFromTuple<T, objectEvaluateParametersParameter & { key: string }>} NK The non-keyed paramter types.
 */
export type EvaluateParemtersResultArgs_v2_TupleOnly<T extends evaluateParametersParameter[] | [evaluateParametersParameter], NK extends [...evaluateParametersParameter[]] = ExcludeFromTuple<T, objectEvaluateParametersParameter & {
    key: string;
}>> = {
    [Index in keyof NK]: EvaluateParamtersParamterTypeMapper<NK[Index]>;
};
/**
 * The evaluated parameters from the {@link evaluateParameters} function.
 *
 * This is similar to {@link EvaluateParemtersResultArgs_basic} but separates the paramter types that have a key property, and maps then to use that key as their property key in the resulting args object, and removing them from the tuple, including shifting the following non-keyed arguments' indices so that the keyed argument does leave a gap in their indices.
 *
 * This only returns the keyed properties of the evaluated parameters, not the tuple part.
 *
 * @template {evaluateParametersParameter[] | [evaluateParametersParameter]} T The paramter types.
 * @template {IncludeFromTuple<T, objectEvaluateParametersParameter & { key: string }>} K The keyed paramter types.
 */
export type EvaluateParemtersResultArgs_v2_KeyedOnly<T extends evaluateParametersParameter[] | [evaluateParametersParameter], K extends (objectEvaluateParametersParameter & {
    key: string;
})[] = IncludeFromTuple<T, objectEvaluateParametersParameter & {
    key: string;
}> extends [
    ...(objectEvaluateParametersParameter & {
        key: string;
    })[]
] ? IncludeFromTuple<T, objectEvaluateParametersParameter & {
    key: string;
}> : [...(objectEvaluateParametersParameter & {
    key: string;
})[]]> = {
    [Key in K[number]["key"]]: EvaluateParamtersParamterTypeMapper<IncludeFromTuple<K, {
        key: Key;
    }>[number]>;
};
/**
 * Evaluates the parameters of a command string.
 *
 * @template {evaluateParametersParameter[] | [evaluateParametersParameter]} T The paramter types.
 * @template {boolean} UOAT If the old args return type should be used. Default is false.
 * @param {string} commandstring The command string to evaluate.
 * @param {T} parameters The parameters to evaluate.
 * @param {UOAT} useOldNamedIgnorableParametersType If the old args return type should be used. Default is false.
 * @returns {EvalutateParamtersResult<T>} The evaluated parameters.
 */
export declare function evaluateParameters<T extends evaluateParametersParameter[] | [evaluateParametersParameter], UOAT extends boolean = false>(commandstring: string, parameters: T, useOldNamedIgnorableParametersType?: UOAT): EvalutateParamtersResult<T, UOAT>;
/**
 * Stores the found named ignorable parameters.
 *
 * This is used for the {@link evaluateParameters} function to allow changing the order of named ignorable parameters that are defined next to each other.
 */
export declare class EvaluateParameters_NamedIgnorableParamaters {
    /**
     * The found named ignorable parameters, with their original indexes, and indexes of parameters than are not named ignorable paramters having a value of `undefined`.
     *
     * @type {(EvaluateParameters_NamedIgnorableParamater | undefined)[]}
     */
    parameters: (EvaluateParameters_NamedIgnorableParamater | undefined)[];
    /**
     * Creates a new instance of the {@link EvaluateParameters_NamedIgnorableParamaters} class.
     *
     * @param {evaluateParametersParameter[]} parameters The parameters to extract named ignorable parameters from.
     */
    constructor(parameters: evaluateParametersParameter[]);
    /**
     * Gets the sibling named ignorable parameters for an index.
     *
     * @param {number} index The index to get the named ignorable parameters for.
     * @returns {EvaluateParameters_NamedIgnorableParamater[]} The named ignorable parameters for the index.
     * @throws {RangeError} If the index is less than 0 or greater than or equal to the number of parameters.
     *
     * @description
     * It splits up the list of ignorable parameters into chunks, separated by indexes of parameters that are not ignorable parameters.
     *
     * It then returns the chunk that the index is in.
     */
    getValidNamedParametersForIndex(index: number): EvaluateParameters_NamedIgnorableParamater[];
    /**
     * Applies the detected values to the args object.
     *
     * This function mutates the object passed in to the {@link args} parameter.
     *
     * @template {evaluateParametersParameter[] | [evaluateParametersParameter]} T The paramter types.
     * @template {boolean} UOAT If the old args return type should be used. Default is false.
     * @param {ReturnType<typeof evaluateParameters<evaluateParametersParameter[], UOAT>>["args"]} args The args array to apply the detected values to.
     */
    applyDetectedValuesToArgsObject<T extends evaluateParametersParameter[] | [evaluateParametersParameter], UOAT extends boolean = false>(args: UOAT extends true ? EvaluateParemtersResultArgs_basic<T> : EvaluateParemtersResultArgs_v2_KeyedOnly<T> & EvaluateParemtersResultArgs_v2_TupleOnly<T>): void;
}
/**
 * An ignorable named parameter.
 *
 * This is used for the {@link evaluateParameters} function to allow changing the order of named ignorable parameters that are defined next to each other.
 */
export declare class EvaluateParameters_NamedIgnorableParamater implements Exclude<evaluateParametersParameter, Exclude<evaluateParametersParameter, {
    type: "ignorableNamedParameter";
}>> {
    name: Exclude<evaluateParametersParameter, Exclude<evaluateParametersParameter, {
        type: "ignorableNamedParameter";
    }>>["name"];
    valueType: Exclude<evaluateParametersParameter, Exclude<evaluateParametersParameter, {
        type: "ignorableNamedParameter";
    }>>["valueType"];
    delimeter: Exclude<evaluateParametersParameter, Exclude<evaluateParametersParameter, {
        type: "ignorableNamedParameter";
    }>>["delimeter"];
    nameIsCaseSensitive: Exclude<evaluateParametersParameter, Exclude<evaluateParametersParameter, {
        type: "ignorableNamedParameter";
    }>>["nameIsCaseSensitive"];
    type: "ignorableNamedParameter";
    key?: string;
    /**
     * The detected value of the parameter fron the command string.
     *
     * @type {EvaluateParamtersParamterTypeMapper<Exclude<objectEvaluateParametersParameter, Exclude<objectEvaluateParametersParameter, { type: "ignorableNamedParameter" }>>> | null}
     *
     * @default null
     */
    value: EvaluateParamtersParamterTypeMapper<Exclude<objectEvaluateParametersParameter, Exclude<objectEvaluateParametersParameter, {
        type: "ignorableNamedParameter";
    }>>> | null;
    /**
     * Creates a new instance of the {@link EvaluateParameters_NamedIgnorableParamater} class.
     *
     * @param {Exclude<evaluateParametersParameter, Exclude<evaluateParametersParameter, { type: "ignorableNamedParameter" }>>} parameter The named ignorable parameter.
     */
    constructor(parameter: Exclude<evaluateParametersParameter, Exclude<evaluateParametersParameter, {
        type: "ignorableNamedParameter";
    }>>);
}
