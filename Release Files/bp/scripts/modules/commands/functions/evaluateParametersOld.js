/**
 * @deprecated
 */
export function evaluateParametersOld(parameters, paramEvalA) {
    let paramEval = paramEvalA;
    let args;
    args = [];
    let er;
    er = [];
    let erb;
    erb = [];
    parameters.forEach((p, i) => {
        try {
            if (p == "presetText") {
                args.push(paramEval.split(" ")[0]);
                paramEval = paramEval.split(" ").slice(1).join(" ");
            }
            else {
                if (p == "string") {
                    if (paramEval.startsWith('"')) {
                        if (!paramEval.includes('\\"')) {
                            args.push(paramEval.slice(1, paramEval.indexOf('"', 1)));
                            paramEval = paramEval.slice(paramEval.indexOf('"', 1) + 2);
                        }
                        else {
                            args.push([
                                paramEval
                                    .slice(1)
                                    .split('\\"')
                                    .slice(0, paramEval
                                    .slice(1)
                                    .split('\\"')
                                    .findIndex((v) => v.includes('"')))
                                    .join('\\"'),
                                paramEval
                                    .slice(1)
                                    .split('\\"')
                                    .find((v) => v.includes('"'))
                                    .split('"')[0],
                            ].join('"'));
                            paramEval = paramEval
                                .slice(1)
                                .split('\\"')
                                .find((v) => v.includes('"'))
                                .split('"')[1]
                                .slice(1);
                        }
                    }
                    else {
                        args.push(paramEval.split(" ")[0]);
                        paramEval = paramEval.split(" ").slice(1).join(" ");
                    }
                }
                else {
                    if (p == "json") {
                        let endCharacter = "}";
                        if (paramEval.startsWith("[")) {
                            endCharacter = "]";
                        }
                        else {
                            if (paramEval.startsWith("(")) {
                                endCharacter = ")";
                            }
                        }
                        try {
                            args.push(JSON.parse(paramEval.split(endCharacter + " ")[0] +
                                endCharacter));
                        }
                        catch (e) {
                            er.push([e, e.stack]);
                            erb.push([String(e), e.stack, i]);
                        }
                        paramEval =
                            paramEval.split(endCharacter + " ")[1] ?? "";
                    }
                    else {
                        if (p == "number") {
                            args.push(Number(paramEval.split(" ")[0]));
                            paramEval = paramEval.split(" ").slice(1).join(" ");
                        }
                        else {
                            if (p == "boolean") {
                                args.push(Boolean(paramEval
                                    .split(" ")[0]
                                    .trimStart()
                                    .toLowerCase()
                                    .startsWith("t") ||
                                    paramEval
                                        .split(" ")[0]
                                        .trimStart()
                                        .toLowerCase()
                                        .startsWith("y") ||
                                    paramEval
                                        .split(" ")[0]
                                        .trimStart()
                                        .toLowerCase()
                                        .startsWith("1") ||
                                    paramEval
                                        .split(" ")[0]
                                        .trimStart()
                                        .toLowerCase()
                                        .startsWith("+") ||
                                    paramEval
                                        .split(" ")[0]
                                        .trimStart()
                                        .toLowerCase()
                                        .startsWith("c") ||
                                    paramEval
                                        .split(" ")[0]
                                        .trimStart()
                                        .toLowerCase()
                                        .startsWith("v") ||
                                    paramEval
                                        .split(" ")[0]
                                        .trimStart()
                                        .toLowerCase()
                                        .startsWith("p")));
                                paramEval = paramEval
                                    .split(" ")
                                    .slice(1)
                                    .join(" ");
                            }
                            else {
                            }
                        }
                    }
                }
            }
        }
        catch (e) {
            er.push([e, e.stack]);
            erb.push([String(e), e.stack, i]);
        }
    });
    return {
        er: er,
        erb: erb,
        args: args,
        paramEval: paramEval,
        paramEvalA: paramEvalA,
        parameters: parameters,
    };
}
//# sourceMappingURL=evaluateParametersOld.js.map