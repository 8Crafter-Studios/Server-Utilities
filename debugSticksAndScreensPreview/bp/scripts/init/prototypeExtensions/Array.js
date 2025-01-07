Object.defineProperties(Array.prototype, {
    forEachB: {
        value: function forEachB(callbackfn, thisArg) {
            this.forEach((v, i, a) => {
                Object.defineProperty(function b() {
                    callbackfn(v, i, a);
                }, "name", { value: `Array[${i}]` })();
            }, thisArg);
        },
        configurable: true,
        enumerable: false,
        writable: false,
    },
    mapAsync: {
        value: async function mapAsync(callbackfn, thisArg) {
            const out = [];
            const array = this;
            let i = 0;
            for (const v of array) {
                out[i] = await callbackfn.bind(thisArg)(v, i, array);
                i++;
            }
            return out;
        },
        configurable: true,
        enumerable: false,
        writable: false,
    },
    awaitEach: {
        value: async function awaitEach() {
            const out = [];
            const array = this;
            let i = 0;
            for await (let v of array) {
                out[i] = v;
                i++;
            }
            return out;
        },
        configurable: true,
        enumerable: false,
        writable: false,
    },
});
export const exports_5603749806156139082470132985463298047098135609812364098 = undefined;
//# sourceMappingURL=Array.js.map