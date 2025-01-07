export function getParametersFromExtractedJSON(rawdata) {
    function arrayModifier(sourcearray, callbackfn, overwrite = false) {
        if (overwrite) {
            sourcearray.forEach((v, i, a) => {
                sourcearray[i] = callbackfn(v, i, a);
            });
            return sourcearray;
        }
        else {
            let newarray;
            newarray = [];
            newarray.forEach((v, i, a) => {
                newarray[i] = callbackfn(v, i, a);
            });
            return newarray;
        }
    }
    ;
    const getStringsFromString = (ce) => {
        let cd = Array.from(ce.matchAll(/(?<!(?:(?:[^\\]\\)(?:\\\\)*))".*?(?<!(?:(?:[^\\]\\)(?:\\\\)*))"/gis));
        cd.forEach((v, i) => cd[i] = Object.assign(cd[i], { indices: [[v?.index, v?.index + v[0]?.length]] }));
        let cc = [];
        cc.push({
            t: "non-json",
            v: ce.substring(0, cd[0]?.indices[0][0])
        });
        cd.forEach((v, i) => {
            cc.push({
                t: "json",
                v: v[0]
            });
            cc.push({
                t: "non-json",
                v: ce.substring(v?.indices[0][1], cd[0][i + 1]?.indices[0][0] ?? ce.length)
            });
        });
        return cc;
    };
    let a = rawdata;
    let b = rawdata[0].input;
    let c = [];
    c.push(...getStringsFromString(b.substring(0, a[0]?.indices[0][0])));
    a.forEach((v, i) => {
        c.push({ t: "json", v: v[0] });
        c.push(...getStringsFromString(b.substring(v?.indices[0][1], a[i + 1]?.indices[0][0] ?? b.length)));
    });
    c;
    let e = [];
    let d = arrayModifier(c, (cb, i) => arrayModifier((cb.t == "json" ? [cb.v] : String(cb.v).trimStart().trimEnd().split(/\x20+?/g)), v => {
        if (v instanceof Function) {
            return { s: v, v: v.toString() };
        }
        else {
            try {
                return { s: v, v: JSONParse(String(v)) };
            }
            catch (f) {
                e.push({ i: i, v: f });
                return { s: v, v: String(v) };
            }
        }
    }), false);
    let f = [];
    arrayModifier(d, d => arrayModifier(d, d => d.v)).forEach(d => f.push(...d));
    let h = [];
    d.forEach(d => h.push(...d));
    return {
        input: a,
        originalinput: b,
        resultAndTypeList: c,
        separatedResultList: d,
        errors: e,
        unfilteredresults: f,
        results: f.filter(f => f != ""),
        unfilteredresultsincludingunmodified: h,
        resultsincludingunmodified: h.filter(f => f.v != "")
    };
}
//# sourceMappingURL=getParametersFromExtractedJSON.js.map