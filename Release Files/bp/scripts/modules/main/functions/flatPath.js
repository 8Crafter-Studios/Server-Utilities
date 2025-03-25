export function flatPath(directoryObject, startingPath = ["input"]) {
    function flatPathArray(a, currentPath = ["input"]) {
        return [
            { path: currentPath, name: currentPath[currentPath.length - 1] },
            a.flatMap((v, i) => v instanceof Array
                ? flatPathArray(v, [...currentPath, String(i)])
                : typeof v == "object"
                    ? v?.notPathable == true
                        ? {
                            path: [...currentPath, String(i)],
                            name: v?.name ?? String(i),
                            index: i,
                            arrayindex: i,
                            notPathable: true,
                        }
                        : flatPathObject(v, [...currentPath, String(i)])
                    : {
                        path: [...currentPath, String(i)],
                        name: String(i),
                        index: i,
                        arrayindex: i,
                    }),
        ];
    }
    function flatPathObject(o, currentPath = ["input"]) {
        return [
            { path: currentPath, name: currentPath[currentPath.length - 1] },
            Object.entries(o).flatMap((v, i) => v[1] instanceof Array
                ? flatPathArray(v[1], [...currentPath, v[0]])[0]
                : typeof v[1] == "object"
                    ? v[1]?.notPathable == true
                        ? {
                            path: [...currentPath, v[0]],
                            name: v[0],
                            index: i,
                            objectindex: i,
                            notPathable: true,
                        }
                        : flatPathObject(v[1], [...currentPath, v[0]])
                    : {
                        path: [...currentPath, v[0]],
                        name: v[0],
                        index: i,
                        objectindex: i,
                    }),
        ];
    }
    return flatPathObject(directoryObject, startingPath);
}
//# sourceMappingURL=flatPath.js.map