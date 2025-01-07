export function shootEntity(entityType, location, velocity, setProjectileComponentPropertiesCallbackFn = (a) => { }) { let entity = location.dimension.spawnEntity(String(entityType), location); try {
    setProjectileComponentPropertiesCallbackFn(entity);
}
catch (e) {
    console.error(e, e.stack);
} ; entity.applyImpulse(velocity); }
;
//# sourceMappingURL=shootEntity.js.map