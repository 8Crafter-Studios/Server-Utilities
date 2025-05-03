export function facingPoint(location, otherLocation) {
    const sl = location;
    const ol = otherLocation;
    const x = -ol.x + sl.x;
    const y = ol.y - sl.y;
    const z = ol.z - sl.z; /*
    let rotx = Math.atan2( y, z );
    let roty = 0
    if (z >= 0) {
       roty = -Math.atan2( x * Math.cos(rotx), z );
    }else{
       roty = Math.atan2( x * Math.cos(rotx), -z );
    }
    let rotz = Math.atan2( Math.cos(rotx), Math.sin(rotx) * Math.sin(roty) )*/
    let yaw = (Math.atan2(x, z) * 180.0) / Math.PI;
    let padj = Math.sqrt(Math.pow(x, 2) + Math.pow(z, 2));
    let pitch = (Math.atan2(padj, y) * 180.0) / Math.PI;
    const newPosition = {
        x: pitch - 90,
        y: yaw,
    };
    return { rot: newPosition, difference: { x, y, z } };
}
//# sourceMappingURL=facingPoint.js.map