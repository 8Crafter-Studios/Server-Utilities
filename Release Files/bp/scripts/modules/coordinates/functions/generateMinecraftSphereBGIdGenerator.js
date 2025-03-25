export let generateMinecraftSphereBGProgressIndex = 0;
export function generateMinecraftSphereBGIdGenerator() {
    let id = "generatorId" +
        generateMinecraftSphereBGProgressIndex +
        "Time" +
        Date.now();
    generateMinecraftSphereBGProgressIndex =
        (generateMinecraftSphereBGProgressIndex + 1) % 32767;
    return id;
}
//# sourceMappingURL=generateMinecraftSphereBGIdGenerator.js.map