import { BlockPattern } from "modules/commands/classes/BlockPattern";
import { getParametersFromString } from "modules/utilities/functions/getParametersFromString";
import { extractSelectors } from "./extractSelectors";
/**
 * @deprecated
 */
export function evaluateParametersOldB(commandstring, parameters) {
    let argumentsa = [];
    let ea = [];
    let paramEval = commandstring; /*
    let parametersb = []
    if(typeof parameters[0] == "string"){parametersb = parameters.map(v=>({type: v}))}else{parametersb = parameters}*/
    parameters
        .map((v) => typeof v == "string"
        ? v == "Vectors"
            ? {
                type: v,
                vectorCount: 3,
                maxLength: undefined,
            }
            : { type: v, vectorCount: undefined, maxLength: undefined }
        : v?.type == "Vectors"
            ? v
            : v)
        .forEach((p, i) => {
        if (paramEval.trim() == "") {
            if (!!p.type.match(/^-[a-zA-Z0-9!@#$%^&*<>,.~]+$/)) {
                argumentsa.push("");
            }
            else if (!!p.type.match(/^f-[a-zA-Z0-9!@#$%^&*<>,.~]+$/)) {
                argumentsa.push(Object.fromEntries(p.type
                    .slice(2)
                    .split("")
                    .map((v) => [v, false])));
            }
            else {
                argumentsa.push(null);
                return;
            }
        }
        else {
            if (p.type == "presetText") {
                argumentsa.push(paramEval.trimStart().split(" ")[0]);
                paramEval = paramEval
                    .trimStart()
                    .split(" ")
                    .slice(1)
                    .join(" ");
            }
            else {
                if (p.type == "number") {
                    argumentsa.push(Number(paramEval.trimStart().split(" ")[0]));
                    paramEval = paramEval
                        .trimStart()
                        .split(" ")
                        .slice(1)
                        .join(" ");
                }
                else {
                    if (p.type == "boolean") {
                        argumentsa.push(paramEval.trimStart().split(" ")[0]?.trim?.() ==
                            ""
                            ? undefined
                            : Boolean(JSON.parse(paramEval
                                .trimStart()
                                .split(" ")[0]
                                .replace(/^t$/i, "true")
                                .replace(/^f$/i, "false")
                                .replace(/^true$/i, "true")
                                .replace(/^false$/i, "false"))));
                        paramEval = paramEval
                            .trimStart()
                            .split(" ")
                            .slice(1)
                            .join(" ");
                    }
                    else {
                        if (p.type == "neboolean") {
                            try {
                                argumentsa.push(paramEval
                                    .trimStart()
                                    .split(" ")[0]
                                    ?.trim?.() == ""
                                    ? undefined
                                    : Boolean(JSON.parse(paramEval
                                        .trimStart()
                                        .split(" ")[0]
                                        .replace(/^t$/i, "true")
                                        .replace(/^f$/i, "false")
                                        .replace(/^true$/i, "true")
                                        .replace(/^false$/i, "false"))));
                                paramEval = paramEval
                                    .trimStart()
                                    .split(" ")
                                    .slice(1)
                                    .join(" ");
                            }
                            catch {
                                argumentsa.push(undefined);
                            }
                        }
                        else {
                            if (p.type == "string") {
                                if (paramEval.trimStart().startsWith('"')) {
                                    let value = getParametersFromString(paramEval.trimStart()).resultsincludingunmodified[0];
                                    paramEval =
                                        paramEval
                                            .trimStart()
                                            .slice(value?.s?.length + 1) ??
                                            "";
                                    try {
                                        argumentsa.push(value?.v);
                                    }
                                    catch (e) {
                                        ea.push([e, e.stack]);
                                        argumentsa.push(null);
                                    }
                                }
                                else {
                                    argumentsa.push(paramEval.trimStart().split(" ")[0]);
                                    paramEval = paramEval
                                        .trimStart()
                                        .split(" ")
                                        .slice(1)
                                        .join(" ");
                                }
                            }
                            else {
                                if (p.type == "non-booleanString") {
                                    if ([
                                        "true",
                                        "false",
                                        "t",
                                        "f",
                                        "1",
                                        "0",
                                    ].includes(paramEval
                                        .trimStart()
                                        .split(" ")[0]
                                        .toLowerCase())) {
                                        argumentsa.push(undefined);
                                    }
                                    else if (paramEval
                                        .trimStart()
                                        .startsWith('"')) {
                                        let value = getParametersFromString(paramEval.trimStart()).resultsincludingunmodified[0];
                                        paramEval =
                                            paramEval
                                                .trimStart()
                                                .slice(value?.s?.length + 1) ?? "";
                                        try {
                                            argumentsa.push(value?.v);
                                        }
                                        catch (e) {
                                            ea.push([e, e.stack]);
                                            argumentsa.push(null);
                                        }
                                    }
                                    else {
                                        argumentsa.push(paramEval
                                            .trimStart()
                                            .split(" ")[0]);
                                        paramEval = paramEval
                                            .trimStart()
                                            .split(" ")
                                            .slice(1)
                                            .join(" ");
                                    } //1870//7018
                                }
                                else {
                                    if (!!p.type.match(/^-[a-zA-Z0-9!@#$%^&*<>,.~]+$/)) {
                                        if (!!paramEval
                                            .trimStart()
                                            .match(new RegExp(`(?<=^\\-)(${p.type
                                            .slice(1)
                                            .split("")
                                            .join("|")})+(?=$|\\s)`))) {
                                            let value = paramEval
                                                .trimStart()
                                                .match(new RegExp(`(?<=^\\-)(${p.type
                                                .slice(1)
                                                .split("")
                                                .join("|")})+(?=$|\\s)`))[0];
                                            paramEval =
                                                paramEval
                                                    .trimStart()
                                                    .slice(paramEval
                                                    .trimStart()
                                                    .indexOf(value) + value.length) ?? "";
                                            try {
                                                argumentsa.push(value);
                                            }
                                            catch (e) {
                                                argumentsa.push("");
                                                ea.push([e, e.stack]);
                                            }
                                        }
                                        else {
                                            argumentsa.push("");
                                        }
                                    }
                                    else {
                                        if (!!p.type.match(/^f-[a-zA-Z0-9!@#$%^&*<>,.~]+$/)) {
                                            if (!!paramEval
                                                .trimStart()
                                                .match(new RegExp(`(?<=^\\-)(${p.type
                                                .slice(2)
                                                .split("")
                                                .join("|")})+(?=$|\\s)`))) {
                                                let value = paramEval
                                                    .trimStart()
                                                    .match(new RegExp(`(?<=^\\-)(${p.type
                                                    .slice(2)
                                                    .split("")
                                                    .join("|")})+(?=$|\\s)`))[0];
                                                paramEval =
                                                    paramEval
                                                        .trimStart()
                                                        .slice(paramEval
                                                        .trimStart()
                                                        .indexOf(value) +
                                                        value.length) ?? "";
                                                try {
                                                    argumentsa.push(Object.fromEntries(p.type
                                                        .slice(2)
                                                        .split("")
                                                        .map((v) => [
                                                        v,
                                                        value.includes(v),
                                                    ])));
                                                }
                                                catch (e) {
                                                    argumentsa.push(Object.fromEntries(p.type
                                                        .slice(2)
                                                        .split("")
                                                        .map((v) => [
                                                        v,
                                                        false,
                                                    ])));
                                                    ea.push([e, e.stack]);
                                                }
                                            }
                                            else {
                                                argumentsa.push(Object.fromEntries(p.type
                                                    .slice(2)
                                                    .split("")
                                                    .map((v) => [
                                                    v,
                                                    false,
                                                ])));
                                            }
                                        }
                                        else {
                                            if (p.type == "json") {
                                                let value = getParametersFromString(paramEval.trimStart())
                                                    .resultsincludingunmodified[0];
                                                paramEval =
                                                    paramEval
                                                        .trimStart()
                                                        .slice(value?.s
                                                        ?.length + 1) ?? "";
                                                try {
                                                    argumentsa.push(value?.v ??
                                                        JSONParse(value?.s ??
                                                            paramEval, true));
                                                }
                                                catch (e) {
                                                    ea.push([e, e.stack]);
                                                    argumentsa.push(null);
                                                }
                                            }
                                            else {
                                                if (p.type == "blockStates") {
                                                    if (paramEval.indexOf("[") == -1 &&
                                                        paramEval.indexOf("{") == -1) {
                                                        argumentsa.push(undefined);
                                                    }
                                                    else if ((paramEval.indexOf("[") == -1
                                                        ? Infinity
                                                        : paramEval.indexOf("[")) <
                                                        (paramEval.indexOf("{") == -1
                                                            ? Infinity
                                                            : paramEval.indexOf("{"))) {
                                                        let value = getParametersFromString(paramEval
                                                            .replaceAll("=", ":")
                                                            .replaceAll("[", "{")
                                                            .replaceAll("]", "}"))
                                                            .resultsincludingunmodified[0];
                                                        paramEval =
                                                            paramEval.slice(value?.s
                                                                ?.length +
                                                                1) ?? "";
                                                        try {
                                                            argumentsa.push(value?.v ??
                                                                JSONParse(value?.s ??
                                                                    "undefined", true));
                                                        }
                                                        catch (e) {
                                                            ea.push([
                                                                e,
                                                                e.stack,
                                                            ]);
                                                            argumentsa.push(null);
                                                        }
                                                    }
                                                    else {
                                                        let value = getParametersFromString(paramEval)
                                                            .resultsincludingunmodified[0];
                                                        paramEval =
                                                            paramEval.slice(value?.s
                                                                ?.length +
                                                                1) ?? "";
                                                        try {
                                                            argumentsa.push(value?.v ??
                                                                JSONParse(value?.s ??
                                                                    "undefined", true));
                                                        }
                                                        catch (e) {
                                                            ea.push([
                                                                e,
                                                                e.stack,
                                                            ]);
                                                            argumentsa.push(null);
                                                        }
                                                    }
                                                }
                                                else {
                                                    if (p.type ==
                                                        "blockPattern") {
                                                        const ep = BlockPattern.extractWRaw(paramEval.trimStart());
                                                        paramEval =
                                                            paramEval.slice(paramEval.indexOf(ep.raw) +
                                                                ep.raw
                                                                    .length) ?? "";
                                                        try {
                                                            argumentsa.push(ep.parsed);
                                                        }
                                                        catch (e) {
                                                            ea.push([
                                                                e,
                                                                e.stack,
                                                            ]);
                                                            argumentsa.push(null);
                                                        }
                                                    }
                                                    else {
                                                        if (p.type ==
                                                            "targetSelector") {
                                                            if (!paramEval
                                                                .trimStart()
                                                                .startsWith("@")) {
                                                                if (paramEval
                                                                    .trimStart()
                                                                    .startsWith('"')) {
                                                                    let value = getParametersFromString(paramEval.trimStart())
                                                                        .resultsincludingunmodified[0];
                                                                    paramEval =
                                                                        paramEval
                                                                            .trimStart()
                                                                            .slice(value
                                                                            ?.s
                                                                            ?.length) ??
                                                                            "";
                                                                    paramEval =
                                                                        paramEval.slice(+(paramEval[0] ==
                                                                            " ")) ??
                                                                            "";
                                                                    try {
                                                                        argumentsa.push(!!!value?.v
                                                                            ? undefined
                                                                            : '"' +
                                                                                value?.v +
                                                                                '"');
                                                                    }
                                                                    catch (e) {
                                                                        ea.push([
                                                                            e,
                                                                            e.stack,
                                                                        ]);
                                                                    }
                                                                }
                                                                else {
                                                                    argumentsa.push(paramEval.split(" ")[0]);
                                                                    return paramEval
                                                                        .split(" ")
                                                                        .slice(1)
                                                                        .join(" ");
                                                                }
                                                            }
                                                            else {
                                                                let value = extractSelectors(paramEval)[0];
                                                                paramEval =
                                                                    paramEval.slice(paramEval.indexOf(value) +
                                                                        value?.length) ?? "";
                                                                try {
                                                                    argumentsa.push(value);
                                                                }
                                                                catch (e) {
                                                                    ea.push([
                                                                        e,
                                                                        e.stack,
                                                                    ]);
                                                                    argumentsa.push(null);
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            if (p.type ==
                                                                "Vector" ||
                                                                (p?.type ??
                                                                    p) ==
                                                                    "Vector1") {
                                                                let value = paramEval.match(/(?<!(?<!^([^"]*["][^"]*)+)(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*)(((?<=[\s\~\!\^\%\&\*\d])|^)[\~\!\^\%\&\*]([\-\+]?\d+(\.\d+)?)?|((?<=\s)|^)[\-\+]?\d+(\.\d+)?)(?!([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*(?!([^"]*["][^"]*)+$))/g)?.[0];
                                                                paramEval =
                                                                    paramEval.slice(paramEval.indexOf(value) +
                                                                        value?.length) ?? "";
                                                                if (paramEval.startsWith(" ")) {
                                                                    paramEval =
                                                                        paramEval.slice(1) ??
                                                                            "";
                                                                }
                                                                try {
                                                                    argumentsa.push(value);
                                                                }
                                                                catch (e) {
                                                                    ea.push([
                                                                        e,
                                                                        e.stack,
                                                                    ]);
                                                                    argumentsa.push(null);
                                                                }
                                                            }
                                                            else {
                                                                if (!!p.type.match(/^Vector[2-8]$/)) {
                                                                    let value = paramEval.match(new RegExp(String.raw `(?<!(?<!^([^"]*["][^"]*)+)(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*)(((((?<=[\s\~\!\^\%\&\*\d])|^)[\~\!\^\%\&\*](?:[\-\+]?\d+(\.\d+)?)?)|(((?<=\s)|^)[\-\+]?\d+(\.\d+)?))\s*?){${p.type.slice(6)}}(?!([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*(?!([^"]*["][^"]*)+$))`))?.[0];
                                                                    paramEval =
                                                                        paramEval.slice(paramEval.indexOf(value) +
                                                                            value?.length) ??
                                                                            "";
                                                                    if (paramEval.startsWith(" ")) {
                                                                        paramEval =
                                                                            paramEval.slice(1) ??
                                                                                "";
                                                                    }
                                                                    try {
                                                                        argumentsa.push(value);
                                                                    }
                                                                    catch (e) {
                                                                        ea.push([
                                                                            e,
                                                                            e.stack,
                                                                        ]);
                                                                        argumentsa.push(null);
                                                                    }
                                                                }
                                                                else {
                                                                    if (p.type ==
                                                                        "Vectors") {
                                                                        let value = paramEval.match(new RegExp(String.raw `(?<!(?<!^([^"]*["][^"]*)+)(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*)(((((?<=[\s\~\!\^\%\&\*\d])|^)[\~\!\^\%\&\*](?:[\-\+]?\d+(\.\d+)?)?)|(((?<=\s)|^)[\-\+]?\d+(\.\d+)?))\s*?){${p.vectorCount ??
                                                                            3}}(?!([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*(?!([^"]*["][^"]*)+$))`))?.[0];
                                                                        paramEval =
                                                                            paramEval.slice(paramEval.indexOf(value) +
                                                                                value?.length) ??
                                                                                "";
                                                                        if (paramEval.startsWith(" ")) {
                                                                            paramEval =
                                                                                paramEval.slice(1) ??
                                                                                    "";
                                                                        }
                                                                        try {
                                                                            argumentsa.push(value);
                                                                        }
                                                                        catch (e) {
                                                                            ea.push([
                                                                                e,
                                                                                e.stack,
                                                                            ]);
                                                                            argumentsa.push(null);
                                                                        }
                                                                    }
                                                                    else {
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    return {
        params: parameters,
        extra: paramEval,
        args: argumentsa,
        err: ea,
    };
}
//# sourceMappingURL=evaluateParametersOldB.js.map