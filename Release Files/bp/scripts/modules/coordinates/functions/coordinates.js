import { evaluateCoordinates } from "./evaluateCoordinates";
export function coordinates(coordinateText, startingPosition, rotation) {
    let location = { x: NaN, y: NaN, z: NaN };
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
//# sourceMappingURL=coordinates.js.map