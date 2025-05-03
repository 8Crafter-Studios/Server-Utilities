export function* extractIntArrayBGenerator(s, revivement = "-1", maxTimePerTick = 1250) {
    let lastYieldTime = Date.now();
    s = s
        .replaceAll(/,(?=[,\]\^])/g, "," + revivement)
        .replace(/\[(?=[,\^])/, "[" + revivement)
        .replace("]", ",]");
    // Yield the modified string after the first replacement
    yield s;
    const matchAllIterator = s.matchAll(/([\-\+]?[a-zA-Z0-9]+)\^([a-zA-Z0-9]+),/g);
    for (const v of matchAllIterator) {
        //v[0]=="32"?console.log(JSON.stringify(v), v[0], v[1], v[2]):undefined;
        isNaN(Number(v[2])) ? console.log(v[2]) : undefined;
        s = s.replace(v[0], (v[1] + ",").repeat(Number(v[2])));
        // Check if it's time to yield
        if (Date.now() - lastYieldTime >= maxTimePerTick) {
            lastYieldTime = Date.now();
            yield s; // Yield the modified string
        }
    }
    yield s.replace(",]", "]"); // Yield the final modified string
    return s.replace(",]", "]");
}
//# sourceMappingURL=extractIntArrayBGenerator.js.map