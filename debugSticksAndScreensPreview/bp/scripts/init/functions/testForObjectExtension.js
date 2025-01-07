import "init/meta/importToMakeValidModule";
globalThis.testForObjectExtension = function testForObjectExtension(objectToTest, base) {
    return Object.entries(base).every((v) => Object.keys(objectToTest).includes(v[0])
        ? Object.entries(objectToTest).find((c) => c[0] == v[0])[1] == v[1]
        : false);
};
//# sourceMappingURL=testForObjectExtension.js.map