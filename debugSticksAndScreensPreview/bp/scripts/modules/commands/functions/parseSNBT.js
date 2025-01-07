export function parseSNBT(snbt) {
    // Helper function to parse a value based on its suffix (if present)
    function parseValue(key, value) {
        if (typeof value !== "string") {
            return value; // Return the value as is if it's not a string
        }
        value = value.trim();
        // Check if value starts with a digit (or negative sign) and ends with a valid suffix
        if (/^-?\d+(\.\d+)?b$/.test(value)) {
            // Byte as integer
            return parseInt(value.slice(0, -1), 10);
        }
        else if (/^-?\d+(\.\d+)?s$/.test(value)) {
            // Short as integer
            return parseInt(value.slice(0, -1), 10);
        }
        else if (/^-?\d+(\.\d+)?l$/.test(value)) {
            // Long as BigInt
            return BigInt(value.slice(0, -1));
        }
        else if (/^-?\d+(\.\d+)?i$/.test(value)) {
            // Int as BigInt
            return BigInt(value.slice(0, -1));
        }
        else if (/^-?\d+(\.\d+)?f$/.test(value)) {
            // Float as number
            return parseFloat(value.slice(0, -1));
        }
        else if (/^-?\d+(\.\d+)?d$/.test(value)) {
            // Double as number
            return parseFloat(value.slice(0, -1));
        }
        else if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
            return JSON.parse(value.replace(/'/g, '"')); // Properly parse inner JSON strings
        }
        else if (value === "true" || value === "false") {
            // Boolean
            return value === "true";
        }
        else if (!isNaN(Number(value)) && !isNaN(parseFloat(value))) {
            // Regular number
            return Number(value);
        }
        else {
            // Default to a string if no other match
            return value;
        }
    }
    // Preprocess the SNBT string to be valid JSON-compatible
    function preprocessSNBT(snbt) {
        return (snbt
            .replace(/([{,])\s*([a-zA-Z0-9_]+)\s*:/g, '$1"$2":') // Quote keys
            .replace(/(?<=")([0-9.+-]+[bslidf])(?=")\b/g, '\\"$1\\"') // Quote
            .replace(/(?<!")([0-9.+-]+[bslidf])(?!\\")\b/g, '"$1"') // Quote values with suffixes
            .replace(/'([^']*?)'/g, (match, p1) => `"${p1.replace(/"/g, '\\"')}"`) // Replace single quotes and escape inner double quotes
            .replace(/([{,])\s*([a-zA-Z0-9_]+)\s*{/g, '$1"$2":{') // Quote nested object keys
            .replace(/:\s*([{[])/g, ": $1") // Add space after colons before nested objects or arrays
            .replace(/([{,])\s*([a-zA-Z0-9_.]+)\s*:/g, '$1"$2":') // Quote all object keys
            // Handle unquoted strings in arrays by quoting them
            .replace(/:\s*\[([^\]]*)\]/g, (match, p1) => ":[" +
            p1
                .replace(/([^",\s]+)(?=[,\]])/g, '"$1"')
                .replace(/""/g, '"') +
            "]"));
    }
    const jsonCompatibleString = preprocessSNBT(snbt);
    // Parse JSON with custom reviver to handle SNBT-specific types
    return JSON.parse(jsonCompatibleString, parseValue);
}
//# sourceMappingURL=parseSNBT.js.map