import { anglesToDirectionVectorDeg } from "./anglesToDirectionVectorDeg";
import { caretNotation } from "./caretNotation";
export function caretNotationC(location, offset, rot) {
    return caretNotation(location, offset, anglesToDirectionVectorDeg(rot.x, rot.y));
}
//# sourceMappingURL=caretNotationC.js.map