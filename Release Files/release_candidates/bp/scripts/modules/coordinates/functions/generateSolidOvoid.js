export function generateSolidOvoid(center, radius, offset, dimension, placeBlockCallback = () => { }, integrity = 100) {
    if (integrity != 100) {
        for (let x = Math.floor(center.x - radius.x); x <= Math.ceil(center.x + radius.x); x++) {
            for (let y = Math.floor(center.y - radius.y); y <= Math.ceil(center.y + radius.y); y++) {
                for (let z = Math.floor(center.z - radius.z); z <= Math.ceil(center.z + radius.z); z++) {
                    const distanceSquared = ((x - center.x - offset.x) / radius.x) ** 2 +
                        ((y - center.y - offset.y) / radius.y) ** 2 +
                        ((z - center.z - offset.z) / radius.z) ** 2;
                    if (distanceSquared <= 1) {
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
        for (let x = Math.floor(center.x - radius.x); x <= Math.ceil(center.x + radius.x); x++) {
            for (let y = Math.floor(center.y - radius.y); y <= Math.ceil(center.y + radius.y); y++) {
                for (let z = Math.floor(center.z - radius.z); z <= Math.ceil(center.z + radius.z); z++) {
                    const distanceSquared = ((x - center.x - offset.x) / radius.x) ** 2 +
                        ((y - center.y - offset.y) / radius.y) ** 2 +
                        ((z - center.z - offset.z) / radius.z) ** 2;
                    if (distanceSquared <= 1) {
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
//# sourceMappingURL=generateSolidOvoid.js.map