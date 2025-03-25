export function doBoundingBoxesIntersect(box1, box2) {
    // Check for intersection along each axis
    const intersectX = box1.min.x <= box2.max.x && box1.max.x >= box2.min.x;
    const intersectY = box1.min.y <= box2.max.y && box1.max.y >= box2.min.y;
    const intersectZ = box1.min.z <= box2.max.z && box1.max.z >= box2.min.z;
    // If all axes intersect, the bounding boxes intersect
    return intersectX && intersectY && intersectZ;
}
//# sourceMappingURL=doBoundingBoxesIntersect.js.map