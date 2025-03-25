import { evaluateCoordinates } from "./evaluateCoordinates";
export function coordinatesD(coordinateText, source, rotation) {
    let location = { x: NaN, y: NaN, z: NaN };
    let startingPosition = source?.location ?? { x: 0, y: 0, z: 0 };
    try {
        location = evaluateCoordinates(coordinateText
            .split("~")
            .join(" ~")
            .split("^")
            .join(" ^")
            .split("*")
            .join(" *")
            .replaceAll("  ", " ")
            .trimStart()
            .split(" ")[0]
            .replaceAll(" ", ""), coordinateText
            .split("~")
            .join(" ~")
            .split("^")
            .join(" ^")
            .split("*")
            .join(" *")
            .replaceAll("  ", " ")
            .trimStart()
            .split(" ")[1]
            .replaceAll(" ", ""), coordinateText
            .split("~")
            .join(" ~")
            .split("^")
            .join(" ^")
            .split("*")
            .join(" *")
            .replaceAll("  ", " ")
            .trimStart()
            .split(" ")[2]
            .replaceAll(" ", ""), startingPosition, rotation);
    }
    catch (e) {
        console.error(e, e.stack);
    }
    return location;
}
//# sourceMappingURL=coordinatesD.js.map