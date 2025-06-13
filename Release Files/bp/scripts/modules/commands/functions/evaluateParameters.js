import { BlockMask } from "modules/commands/classes/BlockMask";
import { BlockPattern } from "modules/commands/classes/BlockPattern";
import { parseBlockMatcherType } from "modules/commands/functions/parseBlockMatcherType";
import { getParametersFromString } from "modules/utilities/functions/getParametersFromString";
import { extractSelectors } from "./extractSelectors";
export const flagsParameterFlagKeysList = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "<",
    ">",
    ",",
    ".",
    "~",
];
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
export function evaluateParameters(commandstring, parameters, useOldNamedIgnorableParametersType = false) {
    let argumentsa = [];
    if (!useOldNamedIgnorableParametersType) {
        Object.defineProperty(argumentsa, "toJSON", { value: () => Object.fromEntries(Object.entries(argumentsa)) });
    }
    const addValueToArgumentsA = useOldNamedIgnorableParametersType
        ? function addValueToArgumentsA(key, value) {
            argumentsa.push(value);
        }
        : function addValueToArgumentsA(key, value) {
            if (key === undefined) {
                argumentsa.push(value);
            }
            else {
                argumentsa[key] = value;
            }
        };
    let ea = [];
    let paramEval = commandstring; /*
    let parametersb = []
    if(typeof parameters[0] == "string"){parametersb = parameters.map(v=>({type: v}))}else{parametersb = parameters}*/
    const namedIgnorableParameters = new EvaluateParameters_NamedIgnorableParamaters(parameters);
    parameters
        .map((v) => typeof v === "string"
        ? v === "Vectors"
            ? {
                type: v,
                key: undefined,
                vectorCount: 3,
                maxLength: undefined,
            }
            : { type: v, key: undefined, vectorCount: undefined, maxLength: undefined }
        : v?.type == "Vectors"
            ? v
            : v?.type === "ignorableNamedParameter"
                ? v
                : v)
        .forEach((p, i) => {
        switch (true) {
            case paramEval.trim() == "":
                {
                    if (!!p.type.match(/^-[a-zA-Z0-9!@#$%^&*<>,.~]+$/)) {
                        addValueToArgumentsA(p.key, "");
                    }
                    else if (!!p.type.match(/^f-[a-zA-Z0-9!@#$%^&*<>,.~]+$/)) {
                        addValueToArgumentsA(p.key, Object.fromEntries(p.type
                            .slice(2)
                            .split("")
                            .map((v) => [v, false])));
                    }
                    else {
                        addValueToArgumentsA(p.key, undefined);
                    }
                    return;
                }
                break;
            case p.type == "placeholder":
                {
                    addValueToArgumentsA(p.key, undefined);
                }
                break;
            case p.type == "presetText":
                {
                    addValueToArgumentsA(p.key, paramEval.trimStart().split(" ")[0]);
                    paramEval = paramEval.trimStart().split(" ").slice(1).join(" ");
                }
                break;
            case p.type == "number":
                {
                    addValueToArgumentsA(p.key, Number(paramEval.trimStart().split(" ")[0]));
                    paramEval = paramEval.trimStart().split(" ").slice(1).join(" ");
                }
                break;
            case p.type == "boolean":
                {
                    addValueToArgumentsA(p.key, paramEval.trimStart().split(" ")[0]?.trim?.() == ""
                        ? undefined
                        : Boolean(JSON.parse(paramEval
                            .trimStart()
                            .split(" ")[0]
                            .replace(/^t$/i, "true")
                            .replace(/^f$/i, "false")
                            .replace(/^true$/i, "true")
                            .replace(/^false$/i, "false"))));
                    paramEval = paramEval.trimStart().split(" ").slice(1).join(" ");
                }
                break;
            case p.type == "neboolean":
                {
                    try {
                        addValueToArgumentsA(p.key, paramEval.trimStart().split(" ")[0]?.trim?.() == ""
                            ? undefined
                            : Boolean(JSON.parse(paramEval
                                .trimStart()
                                .split(" ")[0]
                                .replace(/^t$/i, "true")
                                .replace(/^f$/i, "false")
                                .replace(/^true$/i, "true")
                                .replace(/^false$/i, "false"))));
                        paramEval = paramEval.trimStart().split(" ").slice(1).join(" ");
                    }
                    catch {
                        addValueToArgumentsA(p.key, undefined);
                    }
                }
                break;
            case p.type == "string":
                {
                    if (paramEval.trimStart().startsWith('""')) {
                        addValueToArgumentsA(p.key, "");
                        paramEval = paramEval.trimStart().slice(2);
                    }
                    else if (paramEval.trimStart().startsWith('"')) {
                        let value = getParametersFromString(paramEval.trimStart()).resultsincludingunmodified[0];
                        paramEval = paramEval.trimStart().slice(value?.s?.length + 1) ?? "";
                        try {
                            addValueToArgumentsA(p.key, value?.v);
                        }
                        catch (e) {
                            ea.push([e, e.stack]);
                            addValueToArgumentsA(p.key, undefined);
                        }
                    }
                    else {
                        addValueToArgumentsA(p.key, paramEval.trimStart().split(" ")[0]);
                        paramEval = paramEval.trimStart().split(" ").slice(1).join(" ");
                    }
                }
                break;
            case p.type == "non-booleanString":
                {
                    if (["true", "false", "t", "f", "1", "0"].includes(paramEval.trimStart().split(" ")[0].toLowerCase())) {
                        addValueToArgumentsA(p.key, undefined);
                    }
                    else if (paramEval.trimStart().startsWith('"')) {
                        let value = getParametersFromString(paramEval.trimStart()).resultsincludingunmodified[0];
                        paramEval = paramEval.trimStart().slice(value?.s?.length + 1) ?? "";
                        try {
                            addValueToArgumentsA(p.key, value?.v);
                        }
                        catch (e) {
                            ea.push([e, e.stack]);
                            addValueToArgumentsA(p.key, undefined);
                        }
                    }
                    else {
                        addValueToArgumentsA(p.key, paramEval.trimStart().split(" ")[0]);
                        paramEval = paramEval.trimStart().split(" ").slice(1).join(" ");
                    } //1870//7018
                }
                break;
            case !!p.type.match(/^-[a-zA-Z0-9!@#$%^&*<>,.~]+$/):
                {
                    if (!!paramEval.trimStart().match(new RegExp(`(?<=^\\-)(${p.type.slice(1).split("").join("|")})+(?=$|\\s)`))) {
                        let value = paramEval.trimStart().match(new RegExp(`(?<=^\\-)(${p.type.slice(1).split("").join("|")})+(?=$|\\s)`))[0];
                        paramEval = paramEval.trimStart().slice(paramEval.trimStart().indexOf(value) + value.length) ?? "";
                        try {
                            addValueToArgumentsA(p.key, value);
                        }
                        catch (e) {
                            addValueToArgumentsA(p.key, "");
                            ea.push([e, e.stack]);
                        }
                    }
                    else {
                        addValueToArgumentsA(p.key, "");
                    }
                }
                break;
            case !!p.type.match(/^f-[a-zA-Z0-9!@#$%^&*<>,.~]+$/):
                {
                    if (!!paramEval.trimStart().match(new RegExp(`(?<=^\\-)(${p.type.slice(2).split("").join("|")})+(?=$|\\s)`))) {
                        let value = paramEval.trimStart().match(new RegExp(`(?<=^\\-)(${p.type.slice(2).split("").join("|")})+(?=$|\\s)`))[0];
                        paramEval = paramEval.trimStart().slice(paramEval.trimStart().indexOf(value) + value.length) ?? "";
                        try {
                            addValueToArgumentsA(p.key, Object.fromEntries(p.type
                                .slice(2)
                                .split("")
                                .map((v) => [v, value.includes(v)])));
                        }
                        catch (e) {
                            addValueToArgumentsA(p.key, Object.fromEntries(p.type
                                .slice(2)
                                .split("")
                                .map((v) => [v, false])));
                            ea.push([e, e.stack]);
                        }
                    }
                    else {
                        addValueToArgumentsA(p.key, Object.fromEntries(p.type
                            .slice(2)
                            .split("")
                            .map((v) => [v, false])));
                    }
                }
                break;
            case p.type == "json":
                {
                    let value = getParametersFromString(paramEval.trimStart()).resultsincludingunmodified[0];
                    paramEval = paramEval.trimStart().slice(value?.s?.length + 1) ?? "";
                    try {
                        addValueToArgumentsA(p.key, value?.v ?? JSONParse(value?.s ?? paramEval, true));
                    }
                    catch (e) {
                        ea.push([e, e.stack]);
                        addValueToArgumentsA(p.key, undefined);
                    }
                }
                break;
            case p.type == "blockStates":
                {
                    if (paramEval.indexOf("[") == -1 && paramEval.indexOf("{") == -1) {
                        addValueToArgumentsA(p.key, undefined);
                    }
                    else if ((paramEval.indexOf("[") == -1 ? Infinity : paramEval.indexOf("[")) <
                        (paramEval.indexOf("{") == -1 ? Infinity : paramEval.indexOf("{"))) {
                        let value = getParametersFromString(paramEval.replaceAll("=", ":").replaceAll("[", "{").replaceAll("]", "}"))
                            .resultsincludingunmodified[0];
                        paramEval = paramEval.slice(value?.s?.length + 1) ?? "";
                        try {
                            addValueToArgumentsA(p.key, value?.v ?? JSONParse(value?.s ?? "undefined", true));
                        }
                        catch (e) {
                            ea.push([e, e.stack]);
                            addValueToArgumentsA(p.key, undefined);
                        }
                    }
                    else {
                        let value = getParametersFromString(paramEval).resultsincludingunmodified[0];
                        paramEval = paramEval.slice(value?.s?.length + 1) ?? "";
                        try {
                            addValueToArgumentsA(p.key, value?.v ?? JSONParse(value?.s ?? "undefined", true));
                        }
                        catch (e) {
                            ea.push([e, e.stack]);
                            addValueToArgumentsA(p.key, undefined);
                        }
                    }
                }
                break;
            case p.type == "blockPattern":
                {
                    const ep = BlockPattern.extractWRaw(paramEval.trimStart());
                    paramEval = paramEval.slice(paramEval.indexOf(ep.raw) + ep.raw.length) ?? "";
                    try {
                        addValueToArgumentsA(p.key, ep.parsed);
                    }
                    catch (e) {
                        ea.push([e, e.stack]);
                        addValueToArgumentsA(p.key, undefined);
                    }
                }
                break;
            case p.type == "block":
                {
                    const ep = parseBlockMatcherType(paramEval.trimStart());
                    paramEval = paramEval.slice(paramEval.indexOf(ep.raw) + ep.raw.length) ?? "";
                    try {
                        addValueToArgumentsA(p.key, ep.block);
                    }
                    catch (e) {
                        ea.push([e, e.stack]);
                        addValueToArgumentsA(p.key, undefined);
                    }
                }
                break;
            case p.type == "blockMask":
                {
                    const ep = BlockMask.extractWRaw(paramEval.trimStart());
                    paramEval = paramEval.slice(paramEval.indexOf(ep.raw) + ep.raw.length) ?? "";
                    try {
                        addValueToArgumentsA(p.key, ep.parsed);
                    }
                    catch (e) {
                        ea.push([e, e.stack]);
                        addValueToArgumentsA(p.key, undefined);
                    }
                }
                break;
            case p.type == "targetSelector":
                {
                    if (!paramEval.trimStart().startsWith("@")) {
                        if (paramEval.trimStart().startsWith('"')) {
                            let value = getParametersFromString(paramEval.trimStart()).resultsincludingunmodified[0];
                            paramEval = paramEval.trimStart().slice(value?.s?.length) ?? "";
                            paramEval = paramEval.slice(+(paramEval[0] == " ")) ?? "";
                            try {
                                addValueToArgumentsA(p.key, !!!value?.v ? undefined : '"' + value?.v + '"');
                            }
                            catch (e) {
                                ea.push([e, e.stack]);
                                addValueToArgumentsA(p.key, undefined);
                            }
                        }
                        else {
                            addValueToArgumentsA(p.key, paramEval.trimStart().split(" ")[0]);
                            paramEval = paramEval.trimStart().split(" ").slice(1).join(" ").trimStart();
                        }
                    }
                    else {
                        if (!!paramEval.trimStart().match(/^@[a-zA-Z]\s*(?![\s\[])/)) {
                            let value = paramEval.trimStart().match(/^@[seapvrc]/)[0];
                            paramEval = paramEval.slice(paramEval.indexOf(value) + value?.length) ?? "";
                            try {
                                addValueToArgumentsA(p.key, value);
                            }
                            catch (e) {
                                ea.push([e, e.stack]);
                                addValueToArgumentsA(p.key, undefined);
                            }
                        }
                        else {
                            let value = extractSelectors(paramEval)[0];
                            paramEval = paramEval.slice(paramEval.indexOf(value) + value?.length) ?? "";
                            try {
                                addValueToArgumentsA(p.key, value);
                            }
                            catch (e) {
                                ea.push([e, e.stack]);
                                addValueToArgumentsA(p.key, undefined);
                            }
                        }
                    }
                }
                break;
            case p.type == "Vector" || (p?.type ?? p) == "Vector1":
                {
                    let value = paramEval.match(/(?<!(?<!^([^"]*["][^"]*)+)(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*)(((?<=[\s\~\!\^\%\&\*\d])|^)[\~\!\^\%\&\*]([\-\+]?\d+(\.\d+)?)?|((?<=\s)|^)[\-\+]?\d+(\.\d+)?)(?!([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*(?!([^"]*["][^"]*)+$))/g)?.[0];
                    paramEval = paramEval.slice(paramEval.indexOf(value) + value?.length) ?? "";
                    if (paramEval.startsWith(" ")) {
                        paramEval = paramEval.slice(1) ?? "";
                    }
                    try {
                        addValueToArgumentsA(p.key, value);
                    }
                    catch (e) {
                        ea.push([e, e.stack]);
                        addValueToArgumentsA(p.key, undefined);
                    }
                }
                break;
            case !!p.type.match(/^Vector[2-8]$/):
                {
                    let value = paramEval.match(new RegExp(String.raw `(?<!(?<!^([^"]*["][^"]*)+)(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*)(((((?<=[\s\~\!\^\%\&\*\d])|^)[\~\!\^\%\&\*](?:[\-\+]?\d+(\.\d+)?)?)|(((?<=\s)|^)[\-\+]?\d+(\.\d+)?))\s*?){${p.type.slice(6)}}(?!([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*(?!([^"]*["][^"]*)+$))`))?.[0];
                    paramEval = paramEval.slice(paramEval.indexOf(value) + value?.length) ?? "";
                    if (paramEval.startsWith(" ")) {
                        paramEval = paramEval.slice(1) ?? "";
                    }
                    try {
                        addValueToArgumentsA(p.key, value);
                    }
                    catch (e) {
                        ea.push([e, e.stack]);
                        addValueToArgumentsA(p.key, undefined);
                    }
                }
                break;
            case p.type == "Vectors":
                {
                    let value = paramEval.match(new RegExp(String.raw `(?<!(?<!^([^"]*["][^"]*)+)(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*)(((((?<=[\s\~\!\^\%\&\*\d])|^)[\~\!\^\%\&\*](?:[\-\+]?\d+(\.\d+)?)?)|(((?<=\s)|^)[\-\+]?\d+(\.\d+)?))\s*?){${p.vectorCount ?? 3}}(?!([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*(?!([^"]*["][^"]*)+$))`))?.[0];
                    paramEval = paramEval.slice(paramEval.indexOf(value) + value?.length) ?? "";
                    if (paramEval.startsWith(" ")) {
                        paramEval = paramEval.slice(1) ?? "";
                    }
                    try {
                        addValueToArgumentsA(p.key, value);
                    }
                    catch (e) {
                        ea.push([e, e.stack]);
                        addValueToArgumentsA(p.key, undefined);
                    }
                }
                break;
            case p.type == "ignorableNamedParameter":
                {
                    // Push the named ignorable paramter class instance to the array, it will be replaced with the actual value later.
                    addValueToArgumentsA(p.key, namedIgnorableParameters.parameters[i]);
                    /**
                     * The named ignorable parameter class instance that matches the value of this paramter, or undefined if there is no match.
                     *
                     * @type {EvaluateParameters_NamedIgnorableParamater | undefined}
                     */
                    const parameter = namedIgnorableParameters
                        .getValidNamedParametersForIndex(i)
                        .find((p) => p
                        ? p.nameIsCaseSensitive
                            ? paramEval.trimStart().startsWith(`${p.name}${p.delimeter}`)
                            : paramEval.trimStart().toLowerCase().startsWith(`${p.name}${p.delimeter}`.toLowerCase())
                        : false);
                    if (parameter) {
                        paramEval = paramEval.trimStart().slice(`${parameter.name}${parameter.delimeter ?? "="}`.length);
                        /**
                         * The value type of the named ignorable parameter class instance that matches the value of this paramter.
                         *
                         * @type {typeof parameter.valueType}
                         */
                        const valueType = typeof parameter.valueType === "string" ? { type: parameter.valueType } : parameter.valueType;
                        switch (valueType?.type) {
                            case "string":
                                if (paramEval.startsWith('""')) {
                                    parameter.value = "";
                                    paramEval = paramEval.slice(2);
                                }
                                else if (paramEval.startsWith('"')) {
                                    let value = getParametersFromString(paramEval).resultsincludingunmodified[0];
                                    paramEval = paramEval.slice(value?.s?.length + 1) ?? "";
                                    try {
                                        parameter.value = value?.v;
                                    }
                                    catch (e) {
                                        ea.push([e, e.stack]);
                                        parameter.value = null;
                                    }
                                }
                                else {
                                    parameter.value = paramEval.split(" ")[0];
                                    paramEval = paramEval.split(" ").slice(1).join(" ");
                                }
                                break;
                            case "number":
                                parameter.value = Number(paramEval.split(" ")[0]);
                                paramEval = paramEval.split(" ").slice(1).join(" ");
                                break;
                            case "boolean":
                                parameter.value =
                                    paramEval.split(" ")[0]?.trim?.() == ""
                                        ? undefined
                                        : Boolean(JSON.parse(paramEval
                                            .split(" ")[0]
                                            .replace(/^t$/i, "true")
                                            .replace(/^f$/i, "false")
                                            .replace(/^true$/i, "true")
                                            .replace(/^false$/i, "false")));
                                paramEval = paramEval.split(" ").slice(1).join(" ");
                                break;
                            default:
                                throw new TypeError(`Unsupported value type: ${JSON.stringify(p.valueType)}`);
                        }
                    }
                }
                break;
            default:
                throw new TypeError(`Unsupported parameter type: ${JSON.stringify(p)}`);
        }
    });
    namedIgnorableParameters.applyDetectedValuesToArgsObject(argumentsa);
    return {
        params: parameters,
        extra: paramEval,
        args: argumentsa,
        get argsT() {
            return argumentsa;
        },
        get argsK() {
            return argumentsa;
        },
        err: ea,
    };
}
/**
 * Stores the found named ignorable parameters.
 *
 * This is used for the {@link evaluateParameters} function to allow changing the order of named ignorable parameters that are defined next to each other.
 */
export class EvaluateParameters_NamedIgnorableParamaters {
    /**
     * The found named ignorable parameters, with their original indexes, and indexes of parameters than are not named ignorable paramters having a value of `undefined`.
     *
     * @type {(EvaluateParameters_NamedIgnorableParamater | undefined)[]}
     */
    parameters;
    /**
     * Creates a new instance of the {@link EvaluateParameters_NamedIgnorableParamaters} class.
     *
     * @param {evaluateParametersParameter[]} parameters The parameters to extract named ignorable parameters from.
     */
    constructor(parameters) {
        this.parameters = parameters.map((v) => {
            if (typeof v === "object" ? v?.type !== "ignorableNamedParameter" : true) {
                return undefined;
            }
            else {
                return new EvaluateParameters_NamedIgnorableParamater(v);
            }
        });
    }
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
    getValidNamedParametersForIndex(index) {
        if (index < 0) {
            throw new RangeError("Index must be greater than or equal to 0.");
        }
        if (index >= this.parameters.length) {
            throw new RangeError("Index must be less than the number of parameters.");
        }
        const endIndex = this.parameters.indexOf(undefined, index);
        return this.parameters.slice(index, endIndex === -1 ? this.parameters.length : endIndex);
    }
    /**
     * Applies the detected values to the args object.
     *
     * This function mutates the object passed in to the {@link args} parameter.
     *
     * @template {evaluateParametersParameter[] | [evaluateParametersParameter]} T The paramter types.
     * @template {boolean} UOAT If the old args return type should be used. Default is false.
     * @param {ReturnType<typeof evaluateParameters<evaluateParametersParameter[], UOAT>>["args"]} args The args array to apply the detected values to.
     */
    applyDetectedValuesToArgsObject(args) {
        for (const key of Object.keys(args)) {
            if (args[key] instanceof EvaluateParameters_NamedIgnorableParamater) {
                args[key] = args[key].value;
            }
        }
    }
}
/**
 * An ignorable named parameter.
 *
 * This is used for the {@link evaluateParameters} function to allow changing the order of named ignorable parameters that are defined next to each other.
 */
export class EvaluateParameters_NamedIgnorableParamater {
    name;
    valueType;
    delimeter;
    nameIsCaseSensitive;
    type = "ignorableNamedParameter";
    key;
    /**
     * The detected value of the parameter fron the command string.
     *
     * @type {EvaluateParamtersParamterTypeMapper<Exclude<objectEvaluateParametersParameter, Exclude<objectEvaluateParametersParameter, { type: "ignorableNamedParameter" }>>> | null}
     *
     * @default null
     */
    value = null;
    /**
     * Creates a new instance of the {@link EvaluateParameters_NamedIgnorableParamater} class.
     *
     * @param {Exclude<evaluateParametersParameter, Exclude<evaluateParametersParameter, { type: "ignorableNamedParameter" }>>} parameter The named ignorable parameter.
     */
    constructor(parameter) {
        this.name = parameter.name;
        this.valueType = parameter.valueType ?? "string";
        this.delimeter = parameter.delimeter ?? "=";
        this.nameIsCaseSensitive = parameter.nameIsCaseSensitive ?? false;
        this.key = parameter.key;
    }
}
//# sourceMappingURL=evaluateParameters.js.map