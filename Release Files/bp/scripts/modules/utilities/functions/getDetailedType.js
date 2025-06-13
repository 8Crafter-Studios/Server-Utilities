/**
 * Determines and returns a detailed type description of the provided value.
 *
 * @param {any} value - The value to determine the type of.
 * @returns {string} A string representing the type of the value,
 * including special handling for objects to include their constructor's name,
 * or "unknown" if it cannot be determined,
 * and special handling for functions to include their name,
 * or "unknown" if it cannot be determined,
 * and special handling for symbols,
 * and special handling for `Infinity`, `-Infinity`, `NaN`, and `null` values.
 *
 * @version 1.1.0
 */
export function getDetailedType(value) {
    if (typeof value === "object") {
        if (value === null) {
            return "object[null]";
        }
        return "object[" + (value.constructor.name ?? "unknown") + "]";
    }
    else if (typeof value === "function") {
        return "function[" + (value.name ?? "unknown") + "]";
    }
    else if (typeof value === "symbol") {
        return "symbol[" + (value.description ?? "unknown") + "]";
    }
    else if (typeof value === "number") {
        if (value === Infinity) {
            return "number[Infinity]";
        }
        else if (value === -Infinity) {
            return "number[-Infinity]";
        }
        else if (Number.isNaN(value)) {
            return "number[NaN]";
        }
    }
    return typeof value;
}
//# sourceMappingURL=getDetailedType.js.map