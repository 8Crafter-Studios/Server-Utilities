export class TimeoutError extends Error {
    constructor(message) {
        // Need to pass `options` as the second parameter to install the "cause" property.
        super(message);
    }
}
//# sourceMappingURL=TimeoutError.js.map