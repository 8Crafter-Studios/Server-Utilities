globalThis.tryget = function tryget(callbackfn) {
    try {
        return callbackfn();
    }
    catch { }
};
export {};
//# sourceMappingURL=tryget.js.map