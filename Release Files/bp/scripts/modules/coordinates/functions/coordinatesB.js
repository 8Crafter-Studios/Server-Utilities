import { evaluateCoordinatesB } from "./evaluateCoordinatesB";
export function coordinatesB(coordinateText, startingPosition, rotation) {
    let location = { x: NaN, y: NaN, z: NaN };
    try {
        location = evaluateCoordinatesB(coordinateText.split(/(?=[\^\!\~\*\&\s])/g)[0], coordinateText.split(/(?=[\^\!\~\*\&\s])/g)[1], coordinateText.split(/(?=[\^\!\~\*\&\s])/g)[2], startingPosition, rotation);
    }
    catch (e) {
        console.error(e, e.stack);
    }
    return location;
}
//# sourceMappingURL=coordinatesB.js.map