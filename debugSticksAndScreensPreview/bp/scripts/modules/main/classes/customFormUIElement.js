import { customElementTypeIds } from "modules/ui/functions/customElementTypeIds";
export class customFormUIElement {
    index;
    type;
    args;
    code;
    typeIndex;
    constructor(index, type, args) {
        this.index = index;
        this.type = type;
        this.args = args;
        this.code = this.type + "(" + this.args.join(", ") + ")";
        this.typeIndex = customElementTypeIds.findIndex((value, index) => value == this.type);
    }
}
//# sourceMappingURL=customFormUIElement.js.map