import "init/meta/importToMakeValidModule";
globalThis.testForObjectTypeExtension = function testForObjectTypeExtension(objectToTest, base) {
    return Object.entries(base).every((v) => {
        if (!Object.keys(objectToTest).includes(v[0])) {
            return false;
        }
        const objectValue = Object.entries(objectToTest).find((c) => c[0] == v[0])[1];
        if (typeof v[1] == "object") {
            if (typeof objectValue == "object") {
                return testForObjectTypeExtension(objectValue, v[1]);
            }
            else {
                return false;
            }
        }
        else {
            if (v[1].startsWith("[object ")) {
                return objectValue?.constructor?.name == v[1].slice(8, -1);
            }
            else {
                return typeof objectValue == v[1];
            }
        }
    });
};
//# sourceMappingURL=testForObjectTypeExtension.js.map