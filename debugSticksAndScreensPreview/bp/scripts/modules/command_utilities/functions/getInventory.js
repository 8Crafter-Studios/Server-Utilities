import { Block } from "@minecraft/server";
export function getInventory(containerBlockPlayerOrEntity) {
    return (containerBlockPlayerOrEntity instanceof Block
        ? containerBlockPlayerOrEntity.getComponent("inventory")
        : containerBlockPlayerOrEntity.getComponent("inventory"));
}
//# sourceMappingURL=getInventory.js.map