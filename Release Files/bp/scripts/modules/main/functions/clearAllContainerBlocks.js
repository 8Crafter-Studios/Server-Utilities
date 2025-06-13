import { clearContainer } from "modules/command_utilities/functions/clearContainer";
export function clearAllContainerBlocks(blocks) {
    blocks.forEach((v) => clearContainer(v.getComponent("inventory")?.container));
    return blocks;
}
//# sourceMappingURL=clearAllContainerBlocks.js.map