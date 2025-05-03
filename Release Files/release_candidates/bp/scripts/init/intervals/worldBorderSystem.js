import { system, world, EntityDamageCause } from "@minecraft/server";
import { WorldPosition } from "modules/coordinates/classes/WorldPosition";
import { anglesToDirectionVectorDeg } from "modules/coordinates/functions/anglesToDirectionVectorDeg";
import { facingPoint } from "modules/coordinates/functions/facingPoint";
import { outsideBorderTintParticleMolangVariableMapObject } from "modules/main/constants/outsideBorderTintParticleMolangVariableMapObject";
import { outsideBorderTintShownTimes } from "modules/main/constants/outsideBorderTintShownTimes";
import { getNextTopSolidBlockAbovePosition } from "modules/main/functions/getNextTopSolidBlockAbovePosition";
import { getTopSolidBlock } from "modules/main/functions/getTopSolidBlock";
repeatingIntervals.worldBorderSystem = system.runInterval(() => {
    if (config.worldBorder.overworld.enabled) {
        const borderSettings = Object.fromEntries(Object.entries(config.worldBorder.overworld));
        world
            .getAllPlayers()
            .filter((p) => p.dimension.id == "minecraft:overworld")
            .forEach((p) => {
            let loc = undefined;
            const intensity = Number(p.getDynamicProperty("outsideBorderTintIntensity") ??
                borderSettings.tintIntensity);
            if (intensity != 0 && !Number.isNaN(intensity)) {
                if (Date.now() >=
                    outsideBorderTintShownTimes[p.id] +
                        Number(p.getDynamicProperty("outsideBorderTintShowIntervalMS") ?? 500) ||
                    !!!outsideBorderTintShownTimes[p.id]) {
                    if (borderSettings.showRedScreenOutlineWhenOutsideBorder &&
                        (p.location.x > borderSettings.to.x ||
                            p.location.z > borderSettings.to.z ||
                            p.location.x < borderSettings.from.x ||
                            p.location.z < borderSettings.from.z)) {
                        loc = WorldPosition.fromentity(p)
                            .anchored("eyes")
                            .offset({ x: 0, y: 0.1, z: 0 })
                            .positioned("^^^0.2").location;
                        outsideBorderTintShownTimes[p.id] = Date.now();
                        for (let i = 0; i < intensity; i++) {
                            p.spawnParticle("andexdb:world_border_red_screen_tint", loc, outsideBorderTintParticleMolangVariableMapObject);
                        }
                    }
                }
            }
            if (!p.hasTag("canBypassWorldBorder") &&
                (p.location.x > borderSettings.to.x ||
                    p.location.z > borderSettings.to.z ||
                    p.location.x < borderSettings.from.x ||
                    p.location.z < borderSettings.from.z)) {
                if (borderSettings.mode == 0) {
                    if (!p.tryTeleport({
                        x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                        y: p.location.y,
                        z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z),
                    })) {
                        try {
                            p.teleport({
                                x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                                y: getNextTopSolidBlockAbovePosition({
                                    x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                                    y: p.location.y,
                                    z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z),
                                }, p.dimension).y,
                                z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z),
                            });
                        }
                        catch (e) {
                            p.teleport({
                                x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                                y: getTopSolidBlock({
                                    x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                                    y: p.location.y,
                                    z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z),
                                }, p.dimension).y,
                                z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z),
                            });
                        }
                    }
                }
                else if (borderSettings.mode == 1) {
                    let values = facingPoint(p.location, {
                        x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                        y: p.location.y,
                        z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z),
                    });
                    let rot = values.rot;
                    let difference = values.difference;
                    let dv = anglesToDirectionVectorDeg(rot.x, rot.y);
                    p.applyKnockback({
                        x: dv.x * (borderSettings.knockbackH ?? 2.5),
                        z: dv.z * (borderSettings.knockbackH ?? 2.5),
                    }, borderSettings.knockbackV ?? 1.25);
                }
                else if (borderSettings.mode == 2) {
                    if (p.location.x >
                        borderSettings.to.x + borderSettings.buffer ||
                        p.location.z >
                            borderSettings.to.z + borderSettings.buffer ||
                        p.location.x <
                            borderSettings.from.x - borderSettings.buffer ||
                        p.location.z <
                            borderSettings.from.z - borderSettings.buffer) {
                        p.applyDamage(borderSettings.damage, {
                            cause: EntityDamageCause.void,
                        });
                    }
                }
            }
            if (borderSettings.showBorderParticles) {
                const borderXDistance = Math.min(100, Math.abs(borderSettings.to.x - borderSettings.from.x));
                let borderXOffset = 0;
                const borderZDistance = Math.min(100, Math.abs(borderSettings.to.z - borderSettings.from.z));
                let borderZOffset = 0;
                if (borderSettings.to.x - p.location.x <
                    borderXDistance / 2) {
                    borderXOffset -=
                        borderXDistance / 2 -
                            (borderSettings.to.x - p.location.x);
                }
                if (borderSettings.from.x - p.location.x >
                    -(borderXDistance / 2)) {
                    borderXOffset -=
                        -(borderXDistance / 2) -
                            (borderSettings.from.x - p.location.x);
                }
                if (borderSettings.to.z - p.location.z <
                    borderZDistance / 2) {
                    borderZOffset -=
                        borderZDistance / 2 -
                            (borderSettings.to.z - p.location.z);
                }
                if (borderSettings.from.z - p.location.z >
                    -(borderZDistance / 2)) {
                    borderZOffset -=
                        -(borderZDistance / 2) -
                            (borderSettings.from.z - p.location.z);
                }
                if ((p.getDynamicProperty("useShadersCompatibleParticles") ?? false) == true ||
                    borderSettings.useShadersCompatibleBorderParticles) {
                    if (Math.abs(borderSettings.to.x - p.location.x) <=
                        50 &&
                        !(p.location.z > borderSettings.to.z + 50) &&
                        !(p.location.z < borderSettings.from.z - 50)) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: Math.max(Math.min(p.location.z +
                                (Math.random() *
                                    borderZDistance -
                                    borderZDistance / 2) +
                                borderZOffset, borderSettings.to.z), borderSettings.from.z),
                        });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: Math.max(Math.min(p.location.z +
                                (Math.random() *
                                    borderZDistance -
                                    borderZDistance / 2) +
                                borderZOffset, borderSettings.to.z), borderSettings.from.z),
                        });
                    }
                    if (Math.abs(borderSettings.to.z - p.location.z) <=
                        50 &&
                        !(p.location.x > borderSettings.to.x + 50) &&
                        !(p.location.x < borderSettings.from.x - 50)) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", {
                            z: borderSettings.to.z,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            x: Math.max(Math.min(p.location.x +
                                (Math.random() *
                                    borderXDistance -
                                    borderXDistance / 2) +
                                borderXOffset, borderSettings.to.x), borderSettings.from.x),
                        });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", {
                            z: borderSettings.to.z,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            x: Math.max(Math.min(p.location.x +
                                (Math.random() *
                                    borderXDistance -
                                    borderXDistance / 2) +
                                borderXOffset, borderSettings.to.x), borderSettings.from.x),
                        });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <=
                        50 &&
                        !(p.location.z > borderSettings.to.z + 50) &&
                        !(p.location.z < borderSettings.from.z - 50)) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: Math.max(Math.min(p.location.z +
                                (Math.random() *
                                    borderZDistance -
                                    borderZDistance / 2) +
                                borderZOffset, borderSettings.to.z), borderSettings.from.z),
                        });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: Math.max(Math.min(p.location.z +
                                (Math.random() *
                                    borderZDistance -
                                    borderZDistance / 2) +
                                borderZOffset, borderSettings.to.z), borderSettings.from.z),
                        });
                    }
                    if (Math.abs(borderSettings.from.z - p.location.z) <=
                        50 &&
                        !(p.location.x > borderSettings.to.x + 50) &&
                        !(p.location.x < borderSettings.from.x - 50)) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", {
                            z: borderSettings.from.z,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            x: Math.max(Math.min(p.location.x +
                                (Math.random() *
                                    borderXDistance -
                                    borderXDistance / 2) +
                                borderXOffset, borderSettings.to.x), borderSettings.from.x),
                        });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", {
                            z: borderSettings.from.z,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            x: Math.max(Math.min(p.location.x +
                                (Math.random() *
                                    borderXDistance -
                                    borderXDistance / 2) +
                                borderXOffset, borderSettings.to.x), borderSettings.from.x),
                        });
                    }
                    if (Math.abs(borderSettings.to.x - p.location.x) <=
                        50 &&
                        Math.abs(borderSettings.to.z - p.location.z) <= 50) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.to.z,
                        });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.to.z,
                        });
                    }
                    if (Math.abs(borderSettings.to.x - p.location.x) <=
                        50 &&
                        Math.abs(borderSettings.from.z - p.location.z) <= 50) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.from.z,
                        });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.from.z,
                        });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <=
                        50 &&
                        Math.abs(borderSettings.to.z - p.location.z) <= 50) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.to.z,
                        });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.to.z,
                        });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <=
                        50 &&
                        Math.abs(borderSettings.from.z - p.location.z) <= 50) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.from.z,
                        });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.from.z,
                        });
                    }
                }
                else {
                    if (Math.abs(borderSettings.to.x - p.location.x) <=
                        50 &&
                        !(p.location.z > borderSettings.to.z + 50) &&
                        !(p.location.z < borderSettings.from.z - 50)) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: Math.max(Math.min(p.location.z +
                                (Math.random() *
                                    borderZDistance -
                                    borderZDistance / 2) +
                                borderZOffset, borderSettings.to.z), borderSettings.from.z),
                        });
                        p.spawnParticle("minecraft:falling_border_dust_particle", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: Math.max(Math.min(p.location.z +
                                (Math.random() *
                                    borderZDistance -
                                    borderZDistance / 2) +
                                borderZOffset, borderSettings.to.z), borderSettings.from.z),
                        });
                    }
                    if (Math.abs(borderSettings.to.z - p.location.z) <=
                        50 &&
                        !(p.location.x > borderSettings.to.x + 50) &&
                        !(p.location.x < borderSettings.from.x - 50)) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", {
                            z: borderSettings.to.z,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            x: Math.max(Math.min(p.location.x +
                                (Math.random() *
                                    borderXDistance -
                                    borderXDistance / 2) +
                                borderXOffset, borderSettings.to.x), borderSettings.from.x),
                        });
                        p.spawnParticle("minecraft:falling_border_dust_particle", {
                            z: borderSettings.to.z,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            x: Math.max(Math.min(p.location.x +
                                (Math.random() *
                                    borderXDistance -
                                    borderXDistance / 2) +
                                borderXOffset, borderSettings.to.x), borderSettings.from.x),
                        });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <=
                        50 &&
                        !(p.location.z > borderSettings.to.z + 50) &&
                        !(p.location.z < borderSettings.from.z - 50)) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: Math.max(Math.min(p.location.z +
                                (Math.random() *
                                    borderZDistance -
                                    borderZDistance / 2) +
                                borderZOffset, borderSettings.to.z), borderSettings.from.z),
                        });
                        p.spawnParticle("minecraft:falling_border_dust_particle", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: Math.max(Math.min(p.location.z +
                                (Math.random() *
                                    borderZDistance -
                                    borderZDistance / 2) +
                                borderZOffset, borderSettings.to.z), borderSettings.from.z),
                        });
                    }
                    if (Math.abs(borderSettings.from.z - p.location.z) <=
                        50 &&
                        !(p.location.x > borderSettings.to.x + 50) &&
                        !(p.location.x < borderSettings.from.x - 50)) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", {
                            z: borderSettings.from.z,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            x: Math.max(Math.min(p.location.x +
                                (Math.random() *
                                    borderXDistance -
                                    borderXDistance / 2) +
                                borderXOffset, borderSettings.to.x), borderSettings.from.x),
                        });
                        p.spawnParticle("minecraft:falling_border_dust_particle", {
                            z: borderSettings.from.z,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            x: Math.max(Math.min(p.location.x +
                                (Math.random() *
                                    borderXDistance -
                                    borderXDistance / 2) +
                                borderXOffset, borderSettings.to.x), borderSettings.from.x),
                        });
                    }
                    if (Math.abs(borderSettings.to.x - p.location.x) <=
                        50 &&
                        Math.abs(borderSettings.to.z - p.location.z) <= 50) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.to.z,
                        });
                        p.spawnParticle("minecraft:falling_border_dust_particle", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.to.z,
                        });
                    }
                    if (Math.abs(borderSettings.to.x - p.location.x) <=
                        50 &&
                        Math.abs(borderSettings.from.z - p.location.z) <= 50) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.from.z,
                        });
                        p.spawnParticle("minecraft:falling_border_dust_particle", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.from.z,
                        });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <=
                        50 &&
                        Math.abs(borderSettings.to.z - p.location.z) <= 50) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.to.z,
                        });
                        p.spawnParticle("minecraft:falling_border_dust_particle", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.to.z,
                        });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <=
                        50 &&
                        Math.abs(borderSettings.from.z - p.location.z) <= 50) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.from.z,
                        });
                        p.spawnParticle("minecraft:falling_border_dust_particle", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.from.z,
                        });
                    }
                }
            }
        });
    }
    if (config.worldBorder.nether.enabled) {
        const borderSettings = Object.fromEntries(Object.entries(config.worldBorder.nether));
        world
            .getAllPlayers()
            .filter((p) => p.dimension.id == "minecraft:nether")
            .forEach((p) => {
            let loc = undefined;
            const intensity = Number(p.getDynamicProperty("outsideBorderTintIntensity") ??
                borderSettings.tintIntensity);
            if (intensity != 0 && !Number.isNaN(intensity)) {
                if (Date.now() >=
                    outsideBorderTintShownTimes[p.id] +
                        Number(p.getDynamicProperty("outsideBorderTintShowIntervalMS") ?? 500) ||
                    !!!outsideBorderTintShownTimes[p.id]) {
                    if (borderSettings.showRedScreenOutlineWhenOutsideBorder &&
                        (p.location.x > borderSettings.to.x ||
                            p.location.z > borderSettings.to.z ||
                            p.location.x < borderSettings.from.x ||
                            p.location.z < borderSettings.from.z)) {
                        loc = WorldPosition.fromentity(p)
                            .anchored("eyes")
                            .offset({ x: 0, y: 0.1, z: 0 })
                            .positioned("^^^0.2").location;
                        outsideBorderTintShownTimes[p.id] = Date.now();
                        for (let i = 0; i < intensity; i++) {
                            p.spawnParticle("andexdb:world_border_red_screen_tint", loc, outsideBorderTintParticleMolangVariableMapObject);
                        }
                    }
                }
            }
            if (!p.hasTag("canBypassWorldBorder") &&
                (p.location.x > borderSettings.to.x ||
                    p.location.z > borderSettings.to.z ||
                    p.location.x < borderSettings.from.x ||
                    p.location.z < borderSettings.from.z)) {
                if (borderSettings.mode == 0) {
                    if (!p.tryTeleport({
                        x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                        y: p.location.y,
                        z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z),
                    })) {
                        try {
                            p.teleport({
                                x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                                y: getNextTopSolidBlockAbovePosition({
                                    x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                                    y: p.location.y,
                                    z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z),
                                }, p.dimension).y,
                                z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z),
                            });
                        }
                        catch (e) {
                            p.teleport({
                                x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                                y: getTopSolidBlock({
                                    x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                                    y: p.location.y,
                                    z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z),
                                }, p.dimension).y,
                                z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z),
                            });
                        }
                    }
                }
                else if (borderSettings.mode == 1) {
                    let values = facingPoint(p.location, {
                        x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                        y: p.location.y,
                        z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z),
                    });
                    let rot = values.rot;
                    let difference = values.difference;
                    let dv = anglesToDirectionVectorDeg(rot.x, rot.y);
                    p.applyKnockback({
                        x: dv.x * (borderSettings.knockbackH ?? 2.5),
                        z: dv.z * (borderSettings.knockbackH ?? 2.5),
                    }, borderSettings.knockbackV ?? 1.25);
                }
                else if (borderSettings.mode == 2) {
                    if (p.location.x >
                        borderSettings.to.x + borderSettings.buffer ||
                        p.location.z >
                            borderSettings.to.z + borderSettings.buffer ||
                        p.location.x <
                            borderSettings.from.x - borderSettings.buffer ||
                        p.location.z <
                            borderSettings.from.z - borderSettings.buffer) {
                        p.applyDamage(borderSettings.damage, {
                            cause: EntityDamageCause.void,
                        });
                    }
                }
            }
            if (borderSettings.showBorderParticles) {
                const borderXDistance = Math.min(100, Math.abs(borderSettings.to.x - borderSettings.from.x));
                let borderXOffset = 0;
                const borderZDistance = Math.min(100, Math.abs(borderSettings.to.z - borderSettings.from.z));
                let borderZOffset = 0;
                if (borderSettings.to.x - p.location.x <
                    borderXDistance / 2) {
                    borderXOffset -=
                        borderXDistance / 2 -
                            (borderSettings.to.x - p.location.x);
                }
                if (borderSettings.from.x - p.location.x >
                    -(borderXDistance / 2)) {
                    borderXOffset -=
                        -(borderXDistance / 2) -
                            (borderSettings.from.x - p.location.x);
                }
                if (borderSettings.to.z - p.location.z <
                    borderZDistance / 2) {
                    borderZOffset -=
                        borderZDistance / 2 -
                            (borderSettings.to.z - p.location.z);
                }
                if (borderSettings.from.z - p.location.z >
                    -(borderZDistance / 2)) {
                    borderZOffset -=
                        -(borderZDistance / 2) -
                            (borderSettings.from.z - p.location.z);
                }
                if ((p.getDynamicProperty("useShadersCompatibleParticles") ?? false) == true ||
                    borderSettings.useShadersCompatibleBorderParticles) {
                    if (Math.abs(borderSettings.to.x - p.location.x) <=
                        50 &&
                        !(p.location.z > borderSettings.to.z + 50) &&
                        !(p.location.z < borderSettings.from.z - 50)) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: Math.max(Math.min(p.location.z +
                                (Math.random() *
                                    borderZDistance -
                                    borderZDistance / 2) +
                                borderZOffset, borderSettings.to.z), borderSettings.from.z),
                        });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: Math.max(Math.min(p.location.z +
                                (Math.random() *
                                    borderZDistance -
                                    borderZDistance / 2) +
                                borderZOffset, borderSettings.to.z), borderSettings.from.z),
                        });
                    }
                    if (Math.abs(borderSettings.to.z - p.location.z) <=
                        50 &&
                        !(p.location.x > borderSettings.to.x + 50) &&
                        !(p.location.x < borderSettings.from.x - 50)) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", {
                            z: borderSettings.to.z,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            x: Math.max(Math.min(p.location.x +
                                (Math.random() *
                                    borderXDistance -
                                    borderXDistance / 2) +
                                borderXOffset, borderSettings.to.x), borderSettings.from.x),
                        });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", {
                            z: borderSettings.to.z,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            x: Math.max(Math.min(p.location.x +
                                (Math.random() *
                                    borderXDistance -
                                    borderXDistance / 2) +
                                borderXOffset, borderSettings.to.x), borderSettings.from.x),
                        });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <=
                        50 &&
                        !(p.location.z > borderSettings.to.z + 50) &&
                        !(p.location.z < borderSettings.from.z - 50)) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: Math.max(Math.min(p.location.z +
                                (Math.random() *
                                    borderZDistance -
                                    borderZDistance / 2) +
                                borderZOffset, borderSettings.to.z), borderSettings.from.z),
                        });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: Math.max(Math.min(p.location.z +
                                (Math.random() *
                                    borderZDistance -
                                    borderZDistance / 2) +
                                borderZOffset, borderSettings.to.z), borderSettings.from.z),
                        });
                    }
                    if (Math.abs(borderSettings.from.z - p.location.z) <=
                        50 &&
                        !(p.location.x > borderSettings.to.x + 50) &&
                        !(p.location.x < borderSettings.from.x - 50)) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", {
                            z: borderSettings.from.z,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            x: Math.max(Math.min(p.location.x +
                                (Math.random() *
                                    borderXDistance -
                                    borderXDistance / 2) +
                                borderXOffset, borderSettings.to.x), borderSettings.from.x),
                        });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", {
                            z: borderSettings.from.z,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            x: Math.max(Math.min(p.location.x +
                                (Math.random() *
                                    borderXDistance -
                                    borderXDistance / 2) +
                                borderXOffset, borderSettings.to.x), borderSettings.from.x),
                        });
                    }
                    if (Math.abs(borderSettings.to.x - p.location.x) <=
                        50 &&
                        Math.abs(borderSettings.to.z - p.location.z) <= 50) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.to.z,
                        });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.to.z,
                        });
                    }
                    if (Math.abs(borderSettings.to.x - p.location.x) <=
                        50 &&
                        Math.abs(borderSettings.from.z - p.location.z) <= 50) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.from.z,
                        });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.from.z,
                        });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <=
                        50 &&
                        Math.abs(borderSettings.to.z - p.location.z) <= 50) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.to.z,
                        });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.to.z,
                        });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <=
                        50 &&
                        Math.abs(borderSettings.from.z - p.location.z) <= 50) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.from.z,
                        });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.from.z,
                        });
                    }
                }
                else {
                    if (Math.abs(borderSettings.to.x - p.location.x) <=
                        50 &&
                        !(p.location.z > borderSettings.to.z + 50) &&
                        !(p.location.z < borderSettings.from.z - 50)) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: Math.max(Math.min(p.location.z +
                                (Math.random() *
                                    borderZDistance -
                                    borderZDistance / 2) +
                                borderZOffset, borderSettings.to.z), borderSettings.from.z),
                        });
                        p.spawnParticle("minecraft:falling_border_dust_particle", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: Math.max(Math.min(p.location.z +
                                (Math.random() *
                                    borderZDistance -
                                    borderZDistance / 2) +
                                borderZOffset, borderSettings.to.z), borderSettings.from.z),
                        });
                    }
                    if (Math.abs(borderSettings.to.z - p.location.z) <=
                        50 &&
                        !(p.location.x > borderSettings.to.x + 50) &&
                        !(p.location.x < borderSettings.from.x - 50)) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", {
                            z: borderSettings.to.z,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            x: Math.max(Math.min(p.location.x +
                                (Math.random() *
                                    borderXDistance -
                                    borderXDistance / 2) +
                                borderXOffset, borderSettings.to.x), borderSettings.from.x),
                        });
                        p.spawnParticle("minecraft:falling_border_dust_particle", {
                            z: borderSettings.to.z,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            x: Math.max(Math.min(p.location.x +
                                (Math.random() *
                                    borderXDistance -
                                    borderXDistance / 2) +
                                borderXOffset, borderSettings.to.x), borderSettings.from.x),
                        });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <=
                        50 &&
                        !(p.location.z > borderSettings.to.z + 50) &&
                        !(p.location.z < borderSettings.from.z - 50)) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: Math.max(Math.min(p.location.z +
                                (Math.random() *
                                    borderZDistance -
                                    borderZDistance / 2) +
                                borderZOffset, borderSettings.to.z), borderSettings.from.z),
                        });
                        p.spawnParticle("minecraft:falling_border_dust_particle", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: Math.max(Math.min(p.location.z +
                                (Math.random() *
                                    borderZDistance -
                                    borderZDistance / 2) +
                                borderZOffset, borderSettings.to.z), borderSettings.from.z),
                        });
                    }
                    if (Math.abs(borderSettings.from.z - p.location.z) <=
                        50 &&
                        !(p.location.x > borderSettings.to.x + 50) &&
                        !(p.location.x < borderSettings.from.x - 50)) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", {
                            z: borderSettings.from.z,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            x: Math.max(Math.min(p.location.x +
                                (Math.random() *
                                    borderXDistance -
                                    borderXDistance / 2) +
                                borderXOffset, borderSettings.to.x), borderSettings.from.x),
                        });
                        p.spawnParticle("minecraft:falling_border_dust_particle", {
                            z: borderSettings.from.z,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            x: Math.max(Math.min(p.location.x +
                                (Math.random() *
                                    borderXDistance -
                                    borderXDistance / 2) +
                                borderXOffset, borderSettings.to.x), borderSettings.from.x),
                        });
                    }
                    if (Math.abs(borderSettings.to.x - p.location.x) <=
                        50 &&
                        Math.abs(borderSettings.to.z - p.location.z) <= 50) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.to.z,
                        });
                        p.spawnParticle("minecraft:falling_border_dust_particle", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.to.z,
                        });
                    }
                    if (Math.abs(borderSettings.to.x - p.location.x) <=
                        50 &&
                        Math.abs(borderSettings.from.z - p.location.z) <= 50) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.from.z,
                        });
                        p.spawnParticle("minecraft:falling_border_dust_particle", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.from.z,
                        });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <=
                        50 &&
                        Math.abs(borderSettings.to.z - p.location.z) <= 50) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.to.z,
                        });
                        p.spawnParticle("minecraft:falling_border_dust_particle", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.to.z,
                        });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <=
                        50 &&
                        Math.abs(borderSettings.from.z - p.location.z) <= 50) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.from.z,
                        });
                        p.spawnParticle("minecraft:falling_border_dust_particle", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.from.z,
                        });
                    }
                }
            }
        });
    }
    if (config.worldBorder.the_end.enabled) {
        const borderSettings = Object.fromEntries(Object.entries(config.worldBorder.the_end));
        world
            .getAllPlayers()
            .filter((p) => p.dimension.id == "minecraft:the_end")
            .forEach((p) => {
            let loc = undefined;
            const intensity = Number(p.getDynamicProperty("outsideBorderTintIntensity") ??
                borderSettings.tintIntensity);
            if (intensity != 0 && !Number.isNaN(intensity)) {
                if (Date.now() >=
                    outsideBorderTintShownTimes[p.id] +
                        Number(p.getDynamicProperty("outsideBorderTintShowIntervalMS") ?? 500) ||
                    !!!outsideBorderTintShownTimes[p.id]) {
                    if (borderSettings.showRedScreenOutlineWhenOutsideBorder &&
                        (p.location.x > borderSettings.to.x ||
                            p.location.z > borderSettings.to.z ||
                            p.location.x < borderSettings.from.x ||
                            p.location.z < borderSettings.from.z)) {
                        loc = WorldPosition.fromentity(p)
                            .anchored("eyes")
                            .offset({ x: 0, y: 0.1, z: 0 })
                            .positioned("^^^0.2").location;
                        outsideBorderTintShownTimes[p.id] = Date.now();
                        for (let i = 0; i < intensity; i++) {
                            p.spawnParticle("andexdb:world_border_red_screen_tint", loc, outsideBorderTintParticleMolangVariableMapObject);
                        }
                    }
                }
            }
            if (!p.hasTag("canBypassWorldBorder") &&
                (p.location.x > borderSettings.to.x ||
                    p.location.z > borderSettings.to.z ||
                    p.location.x < borderSettings.from.x ||
                    p.location.z < borderSettings.from.z)) {
                if (borderSettings.mode == 0) {
                    if (!p.tryTeleport({
                        x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                        y: p.location.y,
                        z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z),
                    })) {
                        try {
                            p.teleport({
                                x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                                y: getNextTopSolidBlockAbovePosition({
                                    x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                                    y: p.location.y,
                                    z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z),
                                }, p.dimension).y,
                                z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z),
                            });
                        }
                        catch (e) {
                            p.teleport({
                                x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                                y: getTopSolidBlock({
                                    x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                                    y: p.location.y,
                                    z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z),
                                }, p.dimension).y,
                                z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z),
                            });
                        }
                    }
                }
                else if (borderSettings.mode == 1) {
                    let values = facingPoint(p.location, {
                        x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                        y: p.location.y,
                        z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z),
                    });
                    let rot = values.rot;
                    // let difference = values.difference;
                    let dv = anglesToDirectionVectorDeg(rot.x, rot.y);
                    p.applyKnockback({
                        x: dv.x * (borderSettings.knockbackH ?? 2.5),
                        z: dv.z * (borderSettings.knockbackH ?? 2.5),
                    }, borderSettings.knockbackV ?? 1.25);
                }
                else if (borderSettings.mode == 2) {
                    if (p.location.x >
                        borderSettings.to.x + borderSettings.buffer ||
                        p.location.z >
                            borderSettings.to.z + borderSettings.buffer ||
                        p.location.x <
                            borderSettings.from.x - borderSettings.buffer ||
                        p.location.z <
                            borderSettings.from.z - borderSettings.buffer) {
                        p.applyDamage(borderSettings.damage, {
                            cause: EntityDamageCause.void,
                        });
                    }
                }
            }
            if (borderSettings.showBorderParticles) {
                const borderXDistance = Math.min(100, Math.abs(borderSettings.to.x - borderSettings.from.x));
                let borderXOffset = 0;
                const borderZDistance = Math.min(100, Math.abs(borderSettings.to.z - borderSettings.from.z));
                let borderZOffset = 0;
                if (borderSettings.to.x - p.location.x <
                    borderXDistance / 2) {
                    borderXOffset -=
                        borderXDistance / 2 -
                            (borderSettings.to.x - p.location.x);
                }
                if (borderSettings.from.x - p.location.x >
                    -(borderXDistance / 2)) {
                    borderXOffset -=
                        -(borderXDistance / 2) -
                            (borderSettings.from.x - p.location.x);
                }
                if (borderSettings.to.z - p.location.z <
                    borderZDistance / 2) {
                    borderZOffset -=
                        borderZDistance / 2 -
                            (borderSettings.to.z - p.location.z);
                }
                if (borderSettings.from.z - p.location.z >
                    -(borderZDistance / 2)) {
                    borderZOffset -=
                        -(borderZDistance / 2) -
                            (borderSettings.from.z - p.location.z);
                }
                if ((p.getDynamicProperty("useShadersCompatibleParticles") ?? false) == true ||
                    borderSettings.useShadersCompatibleBorderParticles) {
                    if (Math.abs(borderSettings.to.x - p.location.x) <=
                        50 &&
                        !(p.location.z > borderSettings.to.z + 50) &&
                        !(p.location.z < borderSettings.from.z - 50)) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: Math.max(Math.min(p.location.z +
                                (Math.random() *
                                    borderZDistance -
                                    borderZDistance / 2) +
                                borderZOffset, borderSettings.to.z), borderSettings.from.z),
                        });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: Math.max(Math.min(p.location.z +
                                (Math.random() *
                                    borderZDistance -
                                    borderZDistance / 2) +
                                borderZOffset, borderSettings.to.z), borderSettings.from.z),
                        });
                    }
                    if (Math.abs(borderSettings.to.z - p.location.z) <=
                        50 &&
                        !(p.location.x > borderSettings.to.x + 50) &&
                        !(p.location.x < borderSettings.from.x - 50)) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", {
                            z: borderSettings.to.z,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            x: Math.max(Math.min(p.location.x +
                                (Math.random() *
                                    borderXDistance -
                                    borderXDistance / 2) +
                                borderXOffset, borderSettings.to.x), borderSettings.from.x),
                        });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", {
                            z: borderSettings.to.z,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            x: Math.max(Math.min(p.location.x +
                                (Math.random() *
                                    borderXDistance -
                                    borderXDistance / 2) +
                                borderXOffset, borderSettings.to.x), borderSettings.from.x),
                        });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <=
                        50 &&
                        !(p.location.z > borderSettings.to.z + 50) &&
                        !(p.location.z < borderSettings.from.z - 50)) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: Math.max(Math.min(p.location.z +
                                (Math.random() *
                                    borderZDistance -
                                    borderZDistance / 2) +
                                borderZOffset, borderSettings.to.z), borderSettings.from.z),
                        });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: Math.max(Math.min(p.location.z +
                                (Math.random() *
                                    borderZDistance -
                                    borderZDistance / 2) +
                                borderZOffset, borderSettings.to.z), borderSettings.from.z),
                        });
                    }
                    if (Math.abs(borderSettings.from.z - p.location.z) <=
                        50 &&
                        !(p.location.x > borderSettings.to.x + 50) &&
                        !(p.location.x < borderSettings.from.x - 50)) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", {
                            z: borderSettings.from.z,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            x: Math.max(Math.min(p.location.x +
                                (Math.random() *
                                    borderXDistance -
                                    borderXDistance / 2) +
                                borderXOffset, borderSettings.to.x), borderSettings.from.x),
                        });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", {
                            z: borderSettings.from.z,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            x: Math.max(Math.min(p.location.x +
                                (Math.random() *
                                    borderXDistance -
                                    borderXDistance / 2) +
                                borderXOffset, borderSettings.to.x), borderSettings.from.x),
                        });
                    }
                    if (Math.abs(borderSettings.to.x - p.location.x) <=
                        50 &&
                        Math.abs(borderSettings.to.z - p.location.z) <= 50) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.to.z,
                        });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.to.z,
                        });
                    }
                    if (Math.abs(borderSettings.to.x - p.location.x) <=
                        50 &&
                        Math.abs(borderSettings.from.z - p.location.z) <= 50) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.from.z,
                        });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.from.z,
                        });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <=
                        50 &&
                        Math.abs(borderSettings.to.z - p.location.z) <= 50) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.to.z,
                        });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.to.z,
                        });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <=
                        50 &&
                        Math.abs(borderSettings.from.z - p.location.z) <= 50) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.from.z,
                        });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.from.z,
                        });
                    }
                }
                else {
                    if (Math.abs(borderSettings.to.x - p.location.x) <=
                        50 &&
                        !(p.location.z > borderSettings.to.z + 50) &&
                        !(p.location.z < borderSettings.from.z - 50)) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: Math.max(Math.min(p.location.z +
                                (Math.random() *
                                    borderZDistance -
                                    borderZDistance / 2) +
                                borderZOffset, borderSettings.to.z), borderSettings.from.z),
                        });
                        p.spawnParticle("minecraft:falling_border_dust_particle", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: Math.max(Math.min(p.location.z +
                                (Math.random() *
                                    borderZDistance -
                                    borderZDistance / 2) +
                                borderZOffset, borderSettings.to.z), borderSettings.from.z),
                        });
                    }
                    if (Math.abs(borderSettings.to.z - p.location.z) <=
                        50 &&
                        !(p.location.x > borderSettings.to.x + 50) &&
                        !(p.location.x < borderSettings.from.x - 50)) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", {
                            z: borderSettings.to.z,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            x: Math.max(Math.min(p.location.x +
                                (Math.random() *
                                    borderXDistance -
                                    borderXDistance / 2) +
                                borderXOffset, borderSettings.to.x), borderSettings.from.x),
                        });
                        p.spawnParticle("minecraft:falling_border_dust_particle", {
                            z: borderSettings.to.z,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            x: Math.max(Math.min(p.location.x +
                                (Math.random() *
                                    borderXDistance -
                                    borderXDistance / 2) +
                                borderXOffset, borderSettings.to.x), borderSettings.from.x),
                        });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <=
                        50 &&
                        !(p.location.z > borderSettings.to.z + 50) &&
                        !(p.location.z < borderSettings.from.z - 50)) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: Math.max(Math.min(p.location.z +
                                (Math.random() *
                                    borderZDistance -
                                    borderZDistance / 2) +
                                borderZOffset, borderSettings.to.z), borderSettings.from.z),
                        });
                        p.spawnParticle("minecraft:falling_border_dust_particle", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: Math.max(Math.min(p.location.z +
                                (Math.random() *
                                    borderZDistance -
                                    borderZDistance / 2) +
                                borderZOffset, borderSettings.to.z), borderSettings.from.z),
                        });
                    }
                    if (Math.abs(borderSettings.from.z - p.location.z) <=
                        50 &&
                        !(p.location.x > borderSettings.to.x + 50) &&
                        !(p.location.x < borderSettings.from.x - 50)) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", {
                            z: borderSettings.from.z,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            x: Math.max(Math.min(p.location.x +
                                (Math.random() *
                                    borderXDistance -
                                    borderXDistance / 2) +
                                borderXOffset, borderSettings.to.x), borderSettings.from.x),
                        });
                        p.spawnParticle("minecraft:falling_border_dust_particle", {
                            z: borderSettings.from.z,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            x: Math.max(Math.min(p.location.x +
                                (Math.random() *
                                    borderXDistance -
                                    borderXDistance / 2) +
                                borderXOffset, borderSettings.to.x), borderSettings.from.x),
                        });
                    }
                    if (Math.abs(borderSettings.to.x - p.location.x) <=
                        50 &&
                        Math.abs(borderSettings.to.z - p.location.z) <= 50) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.to.z,
                        });
                        p.spawnParticle("minecraft:falling_border_dust_particle", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.to.z,
                        });
                    }
                    if (Math.abs(borderSettings.to.x - p.location.x) <=
                        50 &&
                        Math.abs(borderSettings.from.z - p.location.z) <= 50) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.from.z,
                        });
                        p.spawnParticle("minecraft:falling_border_dust_particle", {
                            x: borderSettings.to.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.from.z,
                        });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <=
                        50 &&
                        Math.abs(borderSettings.to.z - p.location.z) <= 50) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.to.z,
                        });
                        p.spawnParticle("minecraft:falling_border_dust_particle", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.to.z,
                        });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <=
                        50 &&
                        Math.abs(borderSettings.from.z - p.location.z) <= 50) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.from.z,
                        });
                        p.spawnParticle("minecraft:falling_border_dust_particle", {
                            x: borderSettings.from.x,
                            y: Math.random() < 0.75
                                ? p.location.y +
                                    (Math.random() * 10 - 5)
                                : p.location.y +
                                    (Math.random() * 100 - 50),
                            z: borderSettings.from.z,
                        });
                    }
                }
            }
        });
    }
}, 1);
//# sourceMappingURL=worldBorderSystem.js.map