import { world } from "@minecraft/server";
export function getAllEntities() {
    return [
        ...world.getDimension("overworld").getEntities(),
        ...world.getDimension("nether").getEntities(),
        ...world.getDimension("the_end").getEntities(),
    ];
}
//# sourceMappingURL=getAllEntities.js.map