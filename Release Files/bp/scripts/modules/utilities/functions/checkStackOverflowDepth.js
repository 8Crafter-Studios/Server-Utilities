export function checkStackOverflowDepth(i) {
    i ??= 1;
    try {
        return checkStackOverflowDepth(i + 1);
    }
    catch (e) {
        if (e instanceof InternalError) {
            return { depth: i, error: e };
        }
        else {
            throw e;
        }
    }
}
//# sourceMappingURL=checkStackOverflowDepth.js.map