export function objectify(object) { let entries = Object.entries(object); entries.forEach((v, i) => { if (v[1] instanceof Array) {
    entries[i][1] = objectify(v[1]);
}
else if (v[1] instanceof Object) {
    entries[i][1] = objectify(v[1]);
} }); return Object.fromEntries(entries); }
;
//# sourceMappingURL=objectify.js.map