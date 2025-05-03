export function evaluateRotationCoordinates(x, y, rotation) {
    let coordinates = rotation;
    [x, y].forEach((v, i) => {
        if (v.startsWith("~")) {
            if (v.length == 1) {
            }
            else {
                let crds = [coordinates.x, coordinates.y];
                crds[i] = crds[i] + Number(v.slice(1));
                coordinates = { x: crds[0], y: crds[1] };
            }
        }
    });
    [x, y].forEach((v, i) => {
        if (v.startsWith("*")) {
            if (v.length == 1) {
                let crds = [coordinates.x, coordinates.y];
                let crdsb = [rotation.x, rotation.y];
                crds[i] = crdsb[i];
                coordinates = { x: crds[0], y: crds[1] };
            }
            else {
                let crds = [coordinates.x, coordinates.y];
                let crdsb = [rotation.x, rotation.y];
                crds[i] = crdsb[i] + Number(v.slice(1));
                coordinates = { x: crds[0], y: crds[1] };
            }
        }
    });
    [x, y].forEach((v, i) => {
        if (v.startsWith("~")) {
        }
        else {
            if (v.startsWith("^")) {
            }
            else {
                if (v.startsWith("*")) {
                }
                else {
                    let crds = [coordinates.x, coordinates.y];
                    crds[i] = Number(v.slice(0));
                    coordinates = { x: crds[0], y: crds[1] };
                }
            }
        }
    });
    return coordinates;
}
//# sourceMappingURL=evaluateRotationCoordinates.js.map