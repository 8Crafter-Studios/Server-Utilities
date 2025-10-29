import "init/meta/importToMakeValidModule";
globalThis.twoWayModulo = function twoWayModulo(number, modulo) {
    if (number < 0) {
        return (modulo + (number % modulo)) % modulo;
    }
    else {
        return number % modulo;
    }
};
//# sourceMappingURL=twoWayModulo.js.map