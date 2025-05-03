/**
 * @deprecated
 */
export function arrayModifier(sourcearray, callbackfn, overwrite = false) {
    if (overwrite) {
        sourcearray.forEach((v, i, a) => {
            sourcearray[i] = callbackfn(v, i, a);
        });
        return sourcearray;
    }
    else {
        let newarray;
        newarray = [];
        sourcearray.forEach((v, i, a) => {
            newarray[i] = callbackfn(v, i, a);
        });
        return newarray;
    }
}
;
//# sourceMappingURL=arrayModifier.js.map