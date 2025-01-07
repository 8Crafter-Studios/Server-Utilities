/**
 * @example
 * ```ts
 * const str = "something \@e[type='pig',family=mob,hasitem=[{item=stick,slot=0,location=\"slot.enderchest\"},{item='iron_sword',location=slot.weapon.offhand,slot=0}],name=entityname] somethingelseelse";
 * const selectors = extractSelectors(str);
 * console.log(selectors);
 * ```
 * @param str
 * @returns
 */
export function extractSelectors(str) {
    const selectors = [];
    let startIndex = -1;
    const stack = [];
    let insideQuotes = false;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '"' && str[i - 1] !== "\\") {
            insideQuotes = !insideQuotes;
        }
        if (!insideQuotes && str[i] === "@" && startIndex === -1) {
            startIndex = i;
        }
        if (!insideQuotes) {
            if (str[i] === "[") {
                stack.push("[");
            }
            else if (str[i] === "]") {
                if (stack.length > 0) {
                    stack.pop();
                    if (stack.length === 0 && startIndex !== -1) {
                        selectors.push(str.substring(startIndex, i + 1));
                        startIndex = -1;
                    }
                }
                else {
                    // Invalid selector, reset startIndex
                    startIndex = -1;
                }
            }
            else if (((str[i] !== " " &&
                str[i] !== "" &&
                str[i] !== undefined &&
                i - startIndex >= 2) ||
                (i == str.length - 1 && i - startIndex >= 1)) &&
                startIndex !== -1 &&
                stack.length === 0) {
                selectors.push(str.substring(startIndex, i + +(i == str.length - 1)).trim());
                startIndex = -1;
            }
        }
    }
    return selectors;
}
//# sourceMappingURL=extractSelectors.js.map