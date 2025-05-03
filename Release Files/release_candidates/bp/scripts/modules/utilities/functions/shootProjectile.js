export function shootProjectile(entityType, location, velocity, shootOptions = {}, setProjectileComponentPropertiesCallbackFn = (a) => { }) {
    let entityProjectileComponent = location.dimension
        .spawnEntity(String(entityType), location)
        .getComponent("projectile");
    try {
        setProjectileComponentPropertiesCallbackFn(entityProjectileComponent);
    }
    catch (e) {
        console.error(e, e.stack);
    }
    entityProjectileComponent?.shoot(velocity, shootOptions);
}
//# sourceMappingURL=shootProjectile.js.map