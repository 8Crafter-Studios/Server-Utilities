import {} from "@minecraft/server";
export const LocalTeleportFunctions = {
    norm: ({ x, y, z }, s) => {
        const l = Math.hypot(x, y, z);
        if (l === 0)
            return { x: 0, y: 0, z: 0 }; // or throw an error
        return {
            x: s * (x / l),
            y: s * (y / l),
            z: s * (z / l),
        };
    },
    xa: ({ x, y, z }, s) => {
        const m = Math.hypot(x, z);
        const a = {
            x: z,
            y: 0,
            z: -x,
        };
        return LocalTeleportFunctions.norm(a, s);
    },
    ya: ({ x, y, z }, s) => {
        const m = Math.hypot(x, z);
        if (m === 0) {
            // Direction is vertical; choose a default horizontal axis
            return { x: 0, y: 0, z: 0 }; // or maybe { x: 1, y: 0, z: 0 } normalized to s
        }
        const a = {
            x: (x / m) * -y,
            y: m,
            z: (z / m) * -y,
        };
        return LocalTeleportFunctions.norm(a, s);
    },
    za: (a, s) => {
        return LocalTeleportFunctions.norm(a, s);
    },
};
/* Object.defineProperty(String.prototype, "localTeleport", {
    value: function (localTeleport: ILocalTeleport) {
        const { sway_1, heave_2, surge_3 } = localTeleport;
        const { location } = this;
        const viewDirection = this.getViewDirection();

        const xx = LocalTeleportFunctions.xa(viewDirection, sway_1);
        const yy = LocalTeleportFunctions.ya(viewDirection, heave_2);
        const zz = LocalTeleportFunctions.za(viewDirection, surge_3);

        const newPosition = {
            x: location.x + xx.x + yy.x + zz.x,
            y: location.y + xx.y + yy.y + zz.y,
            z: location.z + xx.z + yy.z + zz.z,
        };

        this.teleport(newPosition);
    },
}); */
/*

Entity.prototype.localTeleport = function (localTeleport: ILocalTeleport) {
    const { sway_1, heave_2, surge_3 } = localTeleport
    const { location } = this
    const viewDirection = this.getViewDirection()

    const xx = LocalTeleportFunctions.xa(viewDirection, sway_1)
    const yy = LocalTeleportFunctions.ya(viewDirection, heave_2)
    const zz = LocalTeleportFunctions.za(viewDirection, surge_3)

    const newPosition = {
            x: location.x + xx.x + yy.x + zz.x,
            y: location.y + xx.y + yy.y + zz.y,
            z: location.z + xx.z + yy.z + zz.z
    }

    this.teleport(newPosition)
}*/
/*
Math.asin*/
/*
export function drawCircleOutline(ctx, centerX, centerY, radius, thickness, color) {
    const numSegments = 100; // Number of segments for drawing the circle
    const step = (2 * Math.PI) / numSegments;

    for (let i = 0; i < numSegments; i++) {
        const angle = i * step;
        const x1 = centerX + radius * Math.cos(angle);
        const y1 = centerY + radius * Math.sin(angle);

        // Calculate the new radius for the outline
        const newRadius = radius + thickness;

        const x2 = centerX + newRadius * Math.cos(angle);
        const y2 = centerY + newRadius * Math.sin(angle);

        // Draw a line segment between (x1, y1) and (x2, y2)
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = color;
        ctx.stroke();
    }
}*/
/*
declare global {
    class Entity {
        localTeleport(localTeleport: ILocalTeleport): void;
    }}; */
//# sourceMappingURL=coordinates.js.map