export function generateInverseSkygrid(from, to, gridSize, dimension, placeBlockCallback = () => { }, integrity = 100) {
    const startX = Math.floor(from.x);
    const startY = Math.floor(from.y);
    const startZ = Math.floor(from.z);
    const endX = Math.floor(to.x);
    const endY = Math.floor(to.y);
    const endZ = Math.floor(to.z);
    if ((integrity ?? 100) != 100) {
        for (let x = startX; x <= endX; x++) {
            for (let y = startY; y <= endY; y++) {
                for (let z = startZ; z <= endZ; z++) {
                    if (Math.floor(x) % gridSize !== 0 &&
                        Math.floor(y) % gridSize !== 0 &&
                        Math.floor(z) % gridSize !== 0) {
                        if (Math.random() <= (integrity ?? 100) / 100) {
                            placeBlockCallback({
                                x: Math.floor(x),
                                y: Math.floor(y),
                                z: Math.floor(z),
                                dimension: dimension,
                            });
                        }
                    }
                }
            }
        }
    }
    else {
        for (let x = startX; x <= endX; x++) {
            for (let y = startY; y <= endY; y++) {
                for (let z = startZ; z <= endZ; z++) {
                    if (Math.floor(x) % gridSize !== 0 &&
                        Math.floor(y) % gridSize !== 0 &&
                        Math.floor(z) % gridSize !== 0) {
                        placeBlockCallback({
                            x: Math.floor(x),
                            y: Math.floor(y),
                            z: Math.floor(z),
                            dimension: dimension,
                        });
                    }
                }
            }
        }
    }
}
//# sourceMappingURL=generateInverseSkygrid.js.map