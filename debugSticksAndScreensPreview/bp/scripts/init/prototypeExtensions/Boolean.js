Object.defineProperties(Boolean.prototype, {
    /*
    toString: {
        value: function (): "true"|"false"{
            return this.valueOf()?"true":"false"
        },
        configurable: true,
        enumerable: true,
        writable: true
    },*/
    toNumber: {
        value: function () {
            return +this;
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toBigInt: {
        value: function () {
            return BigInt(+this);
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toBoolean: {
        value: function () {
            return this;
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toFormattedString: {
        value: function () {
            return this.valueOf() ? "§aTrue" : "§cFalse";
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toFormattedStringB: {
        value: function () {
            return this.valueOf() ? "§2True" : "§4False";
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toFormattedStringED: {
        value: function () {
            return this.valueOf() ? "§aEnabled" : "§cDisabled";
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toFormattedStringEDB: {
        value: function () {
            return this.valueOf() ? "§2Enabled" : "§4Disabled";
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toFormattedStringIO: {
        value: function () {
            return this.valueOf() ? "§aON" : "§cOFF";
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toFormattedStringIOB: {
        value: function () {
            return this.valueOf() ? "§2ON" : "§4OFF";
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toFormattedStringIOL: {
        value: function () {
            return this.valueOf() ? "§aOn" : "§cOff";
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toFormattedStringIOLB: {
        value: function () {
            return this.valueOf() ? "§2On" : "§4Off";
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
});
export const exports_5603749806156139082470132985463298047098135609812364098 = undefined;
//# sourceMappingURL=Boolean.js.map