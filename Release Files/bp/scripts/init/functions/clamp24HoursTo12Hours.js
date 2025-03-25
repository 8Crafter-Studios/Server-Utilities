import "init/meta/importToMakeValidModule";
globalThis.clamp24HoursTo12Hours = function clamp24HoursTo12Hours(hours) {
    return twoWayModulo(hours - 1, 12) + 1;
};
//# sourceMappingURL=clamp24HoursTo12Hours.js.map