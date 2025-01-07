export function spawnBlockSurroundingParticle(dimension, location, textures) {
    dimension.spawnParticle(textures.up ?? textures.default, Vector.add(location, { x: 0.5, y: 1.005, z: 0.5 }));
    dimension.spawnParticle(textures.north ?? textures.default, Vector.add(location, { x: 0.5, y: 0.5, z: -0.005 }));
    dimension.spawnParticle(textures.east ?? textures.default, Vector.add(location, { x: -0.005, y: 0.5, z: 0.5 }));
    dimension.spawnParticle(textures.down ?? textures.default, Vector.add(location, { x: 0.5, y: -0.005, z: 0.5 }));
    dimension.spawnParticle(textures.south ?? textures.default, Vector.add(location, { x: 0.5, y: 0.5, z: 1.005 }));
    dimension.spawnParticle(textures.west ?? textures.default, Vector.add(location, { x: 1.005, y: 0.5, z: 0.5 }));
}
//# sourceMappingURL=spawnBlockSurroundingParticle.js.map