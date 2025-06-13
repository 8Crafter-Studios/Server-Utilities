import { BlockTypes } from "@minecraft/server";
export function parseBlockMatcherType(matcher) {
    let raw = matcher
        .trim()
        .match(/(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\s])?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[\s]|$)/)?.[0];
    let type = raw.trim();
    const statesMatch = type.match(/[\[\{]([^\]\}]*)[\]\}]/);
    let states = undefined;
    if (!!statesMatch) {
        const statesStr = statesMatch[1];
        try {
            states = JSON.parse(statesMatch[0].replace(/'/g, '"'));
        }
        catch (error) {
            // States couldn't be parsed as JSON, parse as key-value pairs
            states = {};
            const keyValuePairs = statesStr.split(",");
            keyValuePairs.forEach((pair) => {
                const keyValue = pair.trim().split("=");
                const key = keyValue[0].trim();
                let value = keyValue[1].trim();
                // Convert value to number or boolean if possible
                if (!isNaN(value)) {
                    value = parseFloat(value);
                }
                else if (value.toLowerCase() === "true") {
                    value = true;
                }
                else if (value.toLowerCase() === "false") {
                    value = false;
                }
                states[key] = value;
            });
        }
        // Remove states from the type
        type = type.replace(/[\[\{][^\]\}]*[\]\}]/, "").trim();
    }
    // Extract chance if present
    const stringMatch = type.match(/^["']([^"]+)["']$/);
    if (!!stringMatch) {
        type = stringMatch[1].trim() /*.escapeCharactersB()*/;
    }
    return {
        raw: raw,
        block: {
            id: tryget(() => BlockTypes.get(type)?.id) ?? type,
            states: states,
        },
    };
}
//# sourceMappingURL=parseBlockMatcherType.js.map