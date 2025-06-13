var exports;
(function (exports) {
    /**
     * Runs {@link Entity.prototype.getDynamicProperty} on the provided entity.
     *
     * @param {Entity} entity The entity to get the dynamic property from.
     * @param {string} identifier The property identifier.
     * @returns {boolean | number | string | Vector3 | undefined} The value of the dynamic property.
     */
    function gedp(entity, identifier) {
        return entity.getDynamicProperty(identifier);
    }
    exports.gedp = gedp;
})(exports || (exports = {}));
export var gedp = exports.gedp;
Object.defineProperty(globalThis, "gedp", {
    value: gedp,
    configurable: true,
    enumerable: true,
    writable: false,
});
//# sourceMappingURL=gedp.js.map