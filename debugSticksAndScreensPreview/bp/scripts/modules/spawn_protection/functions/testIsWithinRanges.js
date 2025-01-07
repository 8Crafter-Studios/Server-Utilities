export function testIsWithinRanges(blockvolumes, location) {
    let withinRange = false;
    blockvolumes.forEach((blockvolume) => {
        if (((blockvolume.from.x >= location.x &&
            location.x >= blockvolume.to.x) ||
            (blockvolume.to.x >= location.x &&
                location.x >= blockvolume.from.x)) &&
            ((blockvolume.from.y >= location.y &&
                location.y >= blockvolume.to.y) ||
                (blockvolume.to.y >= location.y &&
                    location.y >= blockvolume.from.y)) &&
            ((blockvolume.from.z >= location.z &&
                location.z >= blockvolume.to.z) ||
                (blockvolume.to.z >= location.z &&
                    location.z >= blockvolume.from.z))) {
            withinRange = true;
        }
    });
    return withinRange;
}
//# sourceMappingURL=testIsWithinRanges.js.map