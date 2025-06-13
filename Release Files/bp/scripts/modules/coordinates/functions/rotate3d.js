import { world } from "@minecraft/server";
export function rotate3d(points, pitchDeg, rollDeg, yawDeg) {
    let pitchRad = pitchDeg * (Math.PI / 180);
    let rollRad = rollDeg * (Math.PI / 180);
    let yawRad = yawDeg * (Math.PI / 180);
    let cosa = Math.cos(yawRad);
    let sina = Math.sin(yawRad);
    let cosb = Math.cos(pitchRad);
    let sinb = Math.sin(pitchRad);
    let cosc = Math.cos(rollRad);
    let sinc = Math.sin(rollRad);
    let Axx = cosa * cosb;
    let Axy = cosa * sinb * sinc - sina * cosc;
    let Axz = cosa * sinb * cosc + sina * sinc;
    let Ayx = sina * cosb;
    let Ayy = sina * sinb * sinc + cosa * cosc;
    let Ayz = sina * sinb * cosc - cosa * sinc;
    let Azx = -sinb;
    let Azy = cosb * sinc;
    let Azz = cosb * cosc;
    let px = points[0];
    let py = points[1];
    let pz = points[2];
    points[0] = Number((Axx * px + Axy * py + Axz * pz).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 10)));
    points[1] = Number((Ayx * px + Ayy * py + Ayz * pz).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 10)));
    points[2] = Number((Azx * px + Azy * py + Azz * pz).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 10)));
    return points;
}
//# sourceMappingURL=rotate3d.js.map