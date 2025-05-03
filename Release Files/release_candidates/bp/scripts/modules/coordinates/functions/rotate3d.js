import { world } from "@minecraft/server";
export function rotate3d(points, pitchb, rollb, yawb) {
    let pitch = pitchb * (Math.PI / 180);
    let roll = rollb * (Math.PI / 180);
    let yaw = yawb * (Math.PI / 180);
    let cosa = Math.cos(yaw), sina = Math.sin(yaw);
    let cosb = Math.cos(pitch), sinb = Math.sin(pitch);
    let cosc = Math.cos(roll), sinc = Math.sin(roll);
    let Axx = cosa * cosb, Axy = cosa * sinb * sinc - sina * cosc, Axz = cosa * sinb * cosc + sina * sinc;
    let Ayx = sina * cosb, Ayy = sina * sinb * sinc + cosa * cosc, Ayz = sina * sinb * cosc - cosa * sinc;
    let Azx = -sinb, Azy = cosb * sinc, Azz = cosb * cosc;
    let px = points[0];
    let py = points[1];
    let pz = points[2];
    points[0] = Number((Axx * px + Axy * py + Axz * pz).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 10)));
    points[1] = Number((Ayx * px + Ayy * py + Ayz * pz).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 10)));
    points[2] = Number((Azx * px + Azy * py + Azz * pz).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 10)));
    return points;
}
//# sourceMappingURL=rotate3d.js.map