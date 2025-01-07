import { escapeRegExp } from "./escapeRegExp";
export function extractJSONStrings(inputString, includeOtherResultData = true) {
    const jsonStringArray = [];
    let currentIndex = 0;
    let inquotes = false;
    while (currentIndex < inputString.length) {
        let currentChar = inputString[currentIndex];
        if (inputString[currentIndex] == "\"" && !!inputString.slice(0, currentIndex + 1).match(/(?<!(?:(?:[^\\]\\)(?:\\\\)*))"$/g)) {
            inquotes = !inquotes;
        }
        // Find potential start of JSON string
        if ((currentChar === '{' || currentChar === '[') && !inquotes) {
            let jsonString = '';
            let openBrackets = 0;
            let closeBrackets = 0;
            // Iterate until balanced brackets are found
            for (let i = currentIndex; i < inputString.length; i++) {
                jsonString += inputString[i];
                if ((inputString[i] === '{' || inputString[i] === '[') && !inquotes) {
                    openBrackets++;
                }
                else if ((inputString[i] === '}' || inputString[i] === ']') && !inquotes) {
                    closeBrackets++;
                }
                if (inputString[i] == "\"" && !!inputString.slice(0, i + 1).match(/(?<!(?:(?:[^\\]\\)(?:\\\\)*))"$/g)) {
                    inquotes = !inquotes;
                }
                // If brackets are balanced, attempt to parse JSON
                if (openBrackets === closeBrackets) {
                    try {
                        JSONParse(jsonString); // Attempt to parse JSON
                        jsonStringArray.push(includeOtherResultData ? (() => {
                            let atest = Array.from((" ".repeat(currentIndex) + inputString.slice(currentIndex))?.matchAll(new RegExp("")?.compile("" + escapeRegExp(jsonString) + "", `g`)))[0];
                            atest.indices = [[atest?.index, atest?.index + atest[0]?.length]];
                            try {
                                atest.value = JSONParse(atest[0]);
                            }
                            catch (e) {
                                atest.value = atest[0];
                            }
                            ;
                            try {
                                atest.modifiedinput = structuredClone(atest.input);
                            }
                            catch (e) {
                                atest.modifiedinput = atest.input;
                            }
                            ;
                            atest.input = inputString;
                            atest.evaluationindex = currentIndex;
                            return atest;
                        })() : jsonString); // Convert string into RegExp match data, then push valid JSON string to array. 
                        currentIndex = i;
                        break;
                    }
                    catch (error) {
                        // Invalid JSON, continue searching
                    }
                }
            }
        }
        currentIndex++;
    }
    return jsonStringArray;
}
//# sourceMappingURL=extractJSONStrings.js.map