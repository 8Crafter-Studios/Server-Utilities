import { customFormUIElement } from "modules/main/classes/customFormUIElement";
import { strToCustomFormUIElement } from "modules/main/functions/strToCustomFormUIElement";
export function arrayToElementList(ids, array) {
    let a;
    a = [];
    array.forEach((ax, az) => {
        a[az] = strToCustomFormUIElement(Number(ids[az].split("|")[1]) + "|" + ax);
    });
    return a.sort((a, b) => a.index - b.index);
}
//# sourceMappingURL=arrayToElementList.js.map