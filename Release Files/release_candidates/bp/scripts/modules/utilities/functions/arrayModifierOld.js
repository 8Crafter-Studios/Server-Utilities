/**
 * @deprecated
 */
export function arrayModifierOld(array, callbackfn) { array.forEach((v, i, a) => { array[i] = callbackfn(v, i, a); }); return array; }
//# sourceMappingURL=arrayModifierOld.js.map