import "init/meta/importToMakeValidModule";
globalThis.catchtry = function catchtry(trycallbackfn, catchcallbackfn = (e) => console.error(e, e?.stack), finallycallbackfn = (v) => {
    return v;
}) {
    let v;
    v = undefined;
    try {
        v = trycallbackfn();
    }
    catch (e) {
        v = catchcallbackfn(e) ?? v;
    }
    finally {
        return finallycallbackfn(v) ?? v;
    }
};
//# sourceMappingURL=catchtry.js.map