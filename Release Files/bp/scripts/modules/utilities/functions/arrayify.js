export function arrayify(object) {
    let entries = Object.entries(object);
    entries.forEach((v, i) => {
        if (v[1] instanceof Array) {
            entries[i][1] = arrayify(v[1]);
        }
        else if (v[1] instanceof Object) {
            entries[i][1] = arrayify(v[1]);
        }
    });
    return entries;
}
//# sourceMappingURL=arrayify.js.map