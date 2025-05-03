export function generateMinecraftOvoidC(center, radius, offset, thickness, dimension, placeBlockCallback = () => { }, integrity = 100) {
    const innerRadiusX = radius.x - thickness;
    const innerRadiusY = radius.y - thickness;
    const innerRadiusZ = radius.z - thickness;
    if (integrity != 100) {
        for (let x = Math.floor(center.x - radius.x - offset.x); x <= Math.ceil(center.x + radius.x + offset.x); x++) {
            for (let y = Math.floor(center.y - radius.y - offset.y); y <= Math.ceil(center.y + radius.y + offset.y); y++) {
                for (let z = Math.floor(center.z - radius.z - offset.z); z <= Math.ceil(center.z + radius.z + offset.z); z++) {
                    const distanceSquared = ((x - center.x) / (radius.x + offset.x)) ** 2 +
                        ((y - center.y) / (radius.y + offset.y)) ** 2 +
                        ((z - center.z) / (radius.z + offset.z)) ** 2;
                    if (distanceSquared <= 1 &&
                        distanceSquared >=
                            (innerRadiusX / (radius.x + offset.x)) ** 2 &&
                        distanceSquared >=
                            (innerRadiusY / (radius.y + offset.y)) ** 2 &&
                        distanceSquared >=
                            (innerRadiusZ / (radius.z + offset.z)) ** 2) {
                        if (Math.random() <= (integrity ?? 100) / 100) {
                            placeBlockCallback({
                                x: x,
                                y: y,
                                z: z,
                                dimension: dimension,
                            });
                        }
                    }
                }
            }
        }
    }
    else {
        for (let x = Math.floor(center.x - radius.x - offset.x); x <= Math.ceil(center.x + radius.x + offset.x); x++) {
            for (let y = Math.floor(center.y - radius.y - offset.y); y <= Math.ceil(center.y + radius.y + offset.y); y++) {
                for (let z = Math.floor(center.z - radius.z - offset.z); z <= Math.ceil(center.z + radius.z + offset.z); z++) {
                    const distanceSquared = ((x - center.x) / (radius.x + offset.x)) ** 2 +
                        ((y - center.y) / (radius.y + offset.y)) ** 2 +
                        ((z - center.z) / (radius.z + offset.z)) ** 2;
                    if (distanceSquared <= 1 &&
                        distanceSquared >=
                            (innerRadiusX / (radius.x + offset.x)) ** 2 &&
                        distanceSquared >=
                            (innerRadiusY / (radius.y + offset.y)) ** 2 &&
                        distanceSquared >=
                            (innerRadiusZ / (radius.z + offset.z)) ** 2) {
                        placeBlockCallback({
                            x: x,
                            y: y,
                            z: z,
                            dimension: dimension,
                        });
                    }
                }
            }
        }
    }
}
//# sourceMappingURL=generateMinecraftOvoidC.js.map