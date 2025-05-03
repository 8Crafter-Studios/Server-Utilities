import { getAllEntities } from "modules/commands/functions/getAllEntities";
export function getEntityById(entityId) {
    return getAllEntities().find((v) => v.id == String(entityId));
}
//# sourceMappingURL=getEntityById.js.map