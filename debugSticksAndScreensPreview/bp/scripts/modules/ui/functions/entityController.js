import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
export function entityController(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
}
//# sourceMappingURL=entityController.js.map