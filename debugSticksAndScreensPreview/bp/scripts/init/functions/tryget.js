import "init/meta/importToMakeValidModule";
globalThis.tryget = function tryget(callbackfn) {
    try {
        return callbackfn();
    }
    catch { }
};
//# sourceMappingURL=tryget.js.map