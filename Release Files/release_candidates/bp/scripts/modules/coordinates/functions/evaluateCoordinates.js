import { caretNotationC } from "./caretNotationC";
export function evaluateCoordinates(x, y, z, startingPosition, rotation) {
    let coordinates = startingPosition;
    [x, y, z].forEach((v, i) => {
        if (v.startsWith("^")) {
            if (v.length == 1) {
            }
            else {
                let crds = [0, 0, 0];
                crds[i] = Number(v.slice(1));
                coordinates = caretNotationC(coordinates, { x: crds[0], y: crds[1], z: crds[2] }, rotation);
            }
        }
    });
    [x, y, z].forEach((v, i) => {
        if (v.startsWith("~")) {
            if (v.length == 1) {
            }
            else {
                let crds = [coordinates.x, coordinates.y, coordinates.z];
                crds[i] = crds[i] + Number(v.slice(1));
                coordinates = { x: crds[0], y: crds[1], z: crds[2] };
            }
        }
    });
    [x, y, z].forEach((v, i) => {
        if (v.startsWith("*")) {
            if (v.length == 1) {
                let crds = [coordinates.x, coordinates.y, coordinates.z];
                let crdsb = [
                    startingPosition.x,
                    startingPosition.y,
                    startingPosition.z,
                ];
                crds[i] = crdsb[i];
                coordinates = { x: crds[0], y: crds[1], z: crds[2] };
            }
            else {
                let crds = [coordinates.x, coordinates.y, coordinates.z];
                let crdsb = [
                    startingPosition.x,
                    startingPosition.y,
                    startingPosition.z,
                ];
                crds[i] = crdsb[i] + Number(v.slice(1));
                coordinates = { x: crds[0], y: crds[1], z: crds[2] };
            }
        }
    });
    [x, y, z].forEach((v, i) => {
        if (v.startsWith("~")) {
        }
        else {
            if (v.startsWith("^")) {
            }
            else {
                if (v.startsWith("*")) {
                }
                else {
                    let crds = [coordinates.x, coordinates.y, coordinates.z];
                    crds[i] = Number(v.slice(0));
                    coordinates = { x: crds[0], y: crds[1], z: crds[2] };
                }
            }
        }
    });
    return coordinates;
}
//# sourceMappingURL=evaluateCoordinates.js.map