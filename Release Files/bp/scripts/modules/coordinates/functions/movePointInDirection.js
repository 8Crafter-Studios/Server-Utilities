import { rotate } from "./rotate";
export function movePointInDirection(point, direction, distance) {
    let add = rotate(direction.x, 0, direction.y, [
        { x: distance.x, y: distance.y, z: distance.z },
    ])[0];
    return { x: add.x + point.x, y: add.y + point.y, z: add.z + point.z };
}
//# sourceMappingURL=movePointInDirection.js.map