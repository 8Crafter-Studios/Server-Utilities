export let generatorProgressIndex = 0;
export function generatorProgressIdGenerator() {
    let id = "generatorId" + generatorProgressIndex + "Time" + Date.now();
    generatorProgressIndex = (generatorProgressIndex + 1) % 32767;
    return id;
}
//# sourceMappingURL=generatorProgressIdGenerator.js.map