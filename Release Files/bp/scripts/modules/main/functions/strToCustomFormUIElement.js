import { customFormUIElement } from "modules/main/classes/customFormUIElement";
export function strToCustomFormUIElement(string) {
    let x = string.split("|").slice(2);
    x.forEach((xa, xb) => {
        x[xb] = xa.replaceAll("\\vls", "|").replaceAll("\\x", "|");
    });
    return new customFormUIElement(Number(string.split("|")[0]), string.split("|")[1], x);
}
//# sourceMappingURL=strToCustomFormUIElement.js.map