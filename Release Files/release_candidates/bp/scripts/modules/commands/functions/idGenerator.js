export let idGeneratorIndex = 0;
export function idGenerator() {
    let id = "id" + idGeneratorIndex + "Time" + Date.now();
    idGeneratorIndex = (idGeneratorIndex + 1) % 32767;
    return id;
}
//# sourceMappingURL=idGenerator.js.map