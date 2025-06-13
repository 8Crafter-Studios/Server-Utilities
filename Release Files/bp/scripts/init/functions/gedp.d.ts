import type { Entity, Vector3 } from "@minecraft/server";
declare namespace exports {
    /**
     * Runs {@link Entity.prototype.getDynamicProperty} on the provided entity.
     *
     * @param {Entity} entity The entity to get the dynamic property from.
     * @param {string} identifier The property identifier.
     * @returns {boolean | number | string | Vector3 | undefined} The value of the dynamic property.
     */
    function gedp(entity: Entity, identifier: string): boolean | number | string | Vector3 | undefined;
}
export import gedp = exports.gedp;
declare global {
    export import gedp = exports.gedp;
}
export {};
