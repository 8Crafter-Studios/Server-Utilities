export function getPathInObject(directoryObject, path = ["input"]) {
    let a;
    a = directoryObject;
    path.slice(1).forEach((v) => (a = a[v]));
    return a;
}
//# sourceMappingURL=getPathInObject.js.map