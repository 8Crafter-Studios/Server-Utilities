import "init/meta/importToMakeValidModule";
globalThis.tryrun = function tryrun(callbackfn) {
    try {
        callbackfn();
    }
    catch { }
};
//# sourceMappingURL=tryrun.js.map