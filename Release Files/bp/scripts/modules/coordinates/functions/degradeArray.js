import { shuffle } from "modules/utilities/functions/shuffle";
export function degradeArray(array /*, mode: "removeElements"|"changeTextOfStrings"|"corruptElements"|"removeElementsAndSubElements"*/, integrity, seed) {
    return shuffle([...array]).slice(0, array.length * Math.min(array.length, integrity / 100));
}
//# sourceMappingURL=degradeArray.js.map