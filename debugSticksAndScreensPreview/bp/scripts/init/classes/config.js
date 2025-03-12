import { world, StructureSaveMode, Dimension } from "@minecraft/server";
import { gwdp } from "init/functions/gwdp";
import { defaultPlayerMenuLeaderboardStatistics } from "modules/ui/constants/defaultPlayerMenuLeaderboardStatistics";
import { menuButtonIds } from "modules/ui/constants/menuButtonIds";
/**
 * A class containing the configuration information for the add-on.
 */
export class config {
    /*
    @log
    @loggedMethod
    greet() {
        console.log(`Hello, my name is 1.`);
    }*/
    static get chatCommandsEnabled() {
        return Boolean(world.getDynamicProperty("andexdbSettings:chatCommandsEnabled") ?? true);
    }
    static set chatCommandsEnabled(enabled) {
        world.setDynamicProperty("andexdbSettings:chatCommandsEnabled", enabled ?? true);
    }
    static get chatCommandPrefix() {
        return String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\");
    }
    static set chatCommandPrefix(prefix) {
        world.setDynamicProperty("andexdbSettings:chatCommandPrefix", prefix ?? "\\");
    }
    static get validChatCommandPrefixes() {
        return String(world.getDynamicProperty("andexdbSettings:validChatCommandPrefixes") ?? "");
    }
    static set validChatCommandPrefixes(prefixes) {
        world.setDynamicProperty("andexdbSettings:validChatCommandPrefixes", prefixes ?? "");
    }
    static get invalidChatCommandAction() {
        return isNaN(Number(world.getDynamicProperty("andexdbSettings:invalidChatCommandAction")))
            ? 3
            : Number(world.getDynamicProperty("andexdbSettings:invalidChatCommandAction") ?? 3);
    }
    static set invalidChatCommandAction(invalidChatCommandAction) {
        world.setDynamicProperty("andexdbSettings:invalidChatCommandAction", invalidChatCommandAction ?? 3);
    }
    static get undoClipboardMode() {
        return String(world.getDynamicProperty("andexdbSettings:undoClipboardMode") ?? StructureSaveMode.Memory);
    }
    static set undoClipboardMode(undoClipboardMode) {
        world.setDynamicProperty("andexdbSettings:undoClipboardMode", undoClipboardMode ?? StructureSaveMode.Memory);
    }
    /**
     * The default spawn location for the gametest structures, this is used when spawning in no AI entities and simulated players.
     *
     * Dynamic Property ID: `andexdbSettings:gametestStructureDefaultSpawnLocation`
     *
     * @default { x: 1000000000, y: 100, z: 1000000000 }
     */
    static get gametestStructureDefaultSpawnLocation() {
        const v = (world.getDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation") ?? { x: 1000000000, y: 100, z: 1000000000 });
        return (tryget(() => ({
            x: v.x ?? 1000000000,
            y: v.y ?? 100,
            z: v.z ?? 1000000000,
        })) ?? { x: 1000000000, y: 100, z: 1000000000 });
    }
    static set gametestStructureDefaultSpawnLocation(gametestStructureDefaultSpawnLocation) {
        world.setDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation", {
            x: gametestStructureDefaultSpawnLocation?.x ?? 1000000000,
            y: gametestStructureDefaultSpawnLocation?.y ?? 100,
            z: gametestStructureDefaultSpawnLocation?.z ?? 1000000000,
        });
    }
    /**
     * The location to teleport players when they use the \\spawn command.
     *
     * Dynamic Property ID: `andexdbSettings:spawnCommandLocation`
     *
     * @default { x: null, y: null, z: null, dimension: overworld }
     */
    static get spawnCommandLocation() {
        const v = tryget(() => JSON.parse(String(world.getDynamicProperty("andexdbSettings:spawnCommandLocation") ?? '{x: null, y: null, z: null, dimension: "overworld"}'))) ?? { x: null, y: null, z: null, dimension: "overworld" };
        return (tryget(() => ({
            x: v.x,
            y: v.y,
            z: v.z,
            dimension: dimensionsf[String(v.dimension)] ?? overworld,
        })) ?? { x: null, y: null, z: null, dimension: overworld });
    }
    static set spawnCommandLocation(spawnCommandLocation) {
        world.setDynamicProperty("andexdbSettings:spawnCommandLocation", JSON.stringify({
            x: spawnCommandLocation?.x ?? null,
            y: spawnCommandLocation?.y ?? null,
            z: spawnCommandLocation?.z ?? null,
            dimension: spawnCommandLocation?.dimension ?? overworld,
        }));
    }
    /**
     * Whether or not players can teleport to spawn using the `\spawn` command when they are in a different dimension than the spawn.
     *
     * @default true
     */
    static get spawnCommandAllowCrossDimensionalTeleport() {
        return Boolean(world.getDynamicProperty("andexdbSettings:spawnCommandAllowCrossDimensionalTeleport") ?? true);
    }
    static set spawnCommandAllowCrossDimensionalTeleport(enabled) {
        world.setDynamicProperty("andexdbSettings:spawnCommandAllowCrossDimensionalTeleport", enabled ?? true);
    }
    static get worldBorder() {
        return {
            get overworld() {
                return {
                    get enabled() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.enabled") ?? false);
                    },
                    set enabled(enabled) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:overworld.enabled", enabled ?? false);
                    },
                    get from() {
                        return (tryget(() => JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.from") ?? "{x: -29999984, z: -29999984}"))) ?? { x: -29999984, z: -29999984 });
                    },
                    set from(from) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:overworld.from", JSON.stringify(from ?? { x: -29999984, z: -29999984 }));
                    },
                    get to() {
                        return (tryget(() => JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.to") ?? "{x: 29999984, z: 29999984}"))) ?? { x: 29999984, z: 29999984 });
                    },
                    set to(to) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:overworld.to", JSON.stringify(to ?? { x: 29999984, z: 29999984 }));
                    },
                    get mode() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.mode") ?? 1);
                    },
                    set mode(mode) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:overworld.mode", mode ?? 1);
                    },
                    get damage() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.damageMode.damage") ?? 1);
                    },
                    set damage(damage) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:overworld.damageMode.damage", damage ?? 1);
                    },
                    get knockbackH() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.knockbackMode.knockbackH") ?? 2.5);
                    },
                    set knockbackH(horizontalKnockback) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:overworld.knockbackMode.knockbackH", horizontalKnockback ?? 2.5);
                    },
                    get knockbackV() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.knockbackMode.knockbackV") ?? 1.25);
                    },
                    set knockbackV(verticalKnockback) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:overworld.knockbackMode.knockbackV", verticalKnockback ?? 1.25);
                    },
                    get preventWorldInteractionOutsideBorder() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.preventWorldInteractionOutsideBorder") ?? false);
                    },
                    set preventWorldInteractionOutsideBorder(preventWorldInteractionOutsideBorder) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:overworld.preventWorldInteractionOutsideBorder", preventWorldInteractionOutsideBorder ?? false);
                    },
                    get tintIntensity() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.tintIntensity") ?? 1);
                    },
                    set tintIntensity(tintIntensity) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:overworld.tintIntensity", tintIntensity ?? 1);
                    },
                    /**
                     * d
                     * @todo
                     */
                    get warnPlayersInChat() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.warnPlayersInChat") ?? false);
                    },
                    /**
                     * c
                     * @todo
                     */
                    set warnPlayersInChat(warnPlayersInChat) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:overworld.warnPlayersInChat", warnPlayersInChat ?? false);
                    },
                    /**
                     * b
                     * @todo
                     */
                    get showActionbarWarningWhenOutsideBorder() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.showActionbarWarningWhenOutsideBorder") ?? false);
                    },
                    /**
                     * a
                     * @todo
                     */
                    set showActionbarWarningWhenOutsideBorder(showActionbarWarningWhenOutsideBorder) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:overworld.showActionbarWarningWhenOutsideBorder", showActionbarWarningWhenOutsideBorder ?? false);
                    },
                    get showRedScreenOutlineWhenOutsideBorder() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.showRedScreenOutlineWhenOutsideBorder") ?? true);
                    },
                    set showRedScreenOutlineWhenOutsideBorder(showRedScreenOutlineWhenOutsideBorder) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:overworld.showRedScreenOutlineWhenOutsideBorder", showRedScreenOutlineWhenOutsideBorder ?? true);
                    },
                    get showBorderParticles() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.showBorderParticles") ?? true);
                    },
                    set showBorderParticles(showBorderParticles) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:overworld.showBorderParticles", showBorderParticles ?? true);
                    },
                    /**
                     * @deprecated
                     */
                    get useShadersCompatibleBorderParticles() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.useShadersCompatibleBorderParticles") ?? false);
                    },
                    /**
                     * @deprecated
                     */
                    set useShadersCompatibleBorderParticles(useShadersCompatibleBorderParticles) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:overworld.useShadersCompatibleBorderParticles", useShadersCompatibleBorderParticles ?? false);
                    },
                    get buffer() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.buffer") ?? 5);
                    },
                    set buffer(buffer) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:overworld.buffer", buffer ?? 5);
                    },
                };
            },
            get nether() {
                return {
                    get enabled() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.enabled") ?? false);
                    },
                    set enabled(enabled) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:nether.enabled", enabled ?? false);
                    },
                    get from() {
                        return (tryget(() => JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:nether.from") ?? "{x: -29999984, z: -29999984}"))) ?? { x: -29999984, z: -29999984 });
                    },
                    set from(from) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:nether.from", JSON.stringify(from ?? { x: -29999984, z: -29999984 }));
                    },
                    get to() {
                        return (tryget(() => JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:nether.to") ?? "{x: 29999984, z: 29999984}"))) ?? { x: 29999984, z: 29999984 });
                    },
                    set to(to) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:nether.to", JSON.stringify(to ?? { x: 29999984, z: 29999984 }));
                    },
                    get mode() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.mode") ?? 1);
                    },
                    set mode(mode) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:nether.mode", mode ?? 1);
                    },
                    get damage() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.damageMode.damage") ?? 1);
                    },
                    set damage(damage) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:nether.damageMode.damage", damage ?? 1);
                    },
                    get knockbackH() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.knockbackMode.knockbackH") ?? 2.5);
                    },
                    set knockbackH(horizontalKnockback) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:nether.knockbackMode.knockbackH", horizontalKnockback ?? 2.5);
                    },
                    get knockbackV() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.knockbackMode.knockbackV") ?? 1.25);
                    },
                    set knockbackV(verticalKnockback) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:nether.knockbackMode.knockbackV", verticalKnockback ?? 1.25);
                    },
                    get preventWorldInteractionOutsideBorder() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.preventWorldInteractionOutsideBorder") ?? false);
                    },
                    set preventWorldInteractionOutsideBorder(preventWorldInteractionOutsideBorder) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:nether.preventWorldInteractionOutsideBorder", preventWorldInteractionOutsideBorder ?? false);
                    },
                    get tintIntensity() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.tintIntensity") ?? 1);
                    },
                    set tintIntensity(tintIntensity) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:nether.tintIntensity", tintIntensity ?? 1);
                    },
                    /**
                     * @todo
                     */
                    get warnPlayersInChat() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.warnPlayersInChat") ?? false);
                    },
                    /**
                     * @todo
                     */
                    set warnPlayersInChat(warnPlayersInChat) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:nether.warnPlayersInChat", warnPlayersInChat ?? false);
                    },
                    /**
                     * @todo
                     */
                    get showActionbarWarningWhenOutsideBorder() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.showActionbarWarningWhenOutsideBorder") ?? false);
                    },
                    /**
                     * @todo
                     */
                    set showActionbarWarningWhenOutsideBorder(showActionbarWarningWhenOutsideBorder) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:nether.showActionbarWarningWhenOutsideBorder", showActionbarWarningWhenOutsideBorder ?? false);
                    },
                    get showRedScreenOutlineWhenOutsideBorder() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.showRedScreenOutlineWhenOutsideBorder") ?? true);
                    },
                    set showRedScreenOutlineWhenOutsideBorder(showRedScreenOutlineWhenOutsideBorder) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:nether.showRedScreenOutlineWhenOutsideBorder", showRedScreenOutlineWhenOutsideBorder ?? true);
                    },
                    get showBorderParticles() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.showBorderParticles") ?? true);
                    },
                    set showBorderParticles(showBorderParticles) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:nether.showBorderParticles", showBorderParticles ?? true);
                    },
                    /**
                     * @deprecated
                     */
                    get useShadersCompatibleBorderParticles() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.useShadersCompatibleBorderParticles") ?? false);
                    },
                    /**
                     * @deprecated
                     */
                    set useShadersCompatibleBorderParticles(useShadersCompatibleBorderParticles) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:nether.useShadersCompatibleBorderParticles", useShadersCompatibleBorderParticles ?? false);
                    },
                    get buffer() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.buffer") ?? 5);
                    },
                    set buffer(buffer) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:nether.buffer", buffer ?? 5);
                    },
                };
            },
            get the_end() {
                return {
                    get enabled() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.enabled") ?? false);
                    },
                    set enabled(enabled) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:the_end.enabled", enabled ?? false);
                    },
                    get from() {
                        return (tryget(() => JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.from") ?? "{x: -29999984, z: -29999984}"))) ?? { x: -29999984, z: -29999984 });
                    },
                    set from(from) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:the_end.from", JSON.stringify(from ?? { x: -29999984, z: -29999984 }));
                    },
                    get to() {
                        return (tryget(() => JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.to") ?? "{x: 29999984, z: 29999984}"))) ?? { x: 29999984, z: 29999984 });
                    },
                    set to(to) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:the_end.to", JSON.stringify(to ?? { x: 29999984, z: 29999984 }));
                    },
                    get mode() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.mode") ?? 1);
                    },
                    set mode(mode) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:the_end.mode", mode ?? 1);
                    },
                    get damage() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.damageMode.damage") ?? 1);
                    },
                    set damage(damage) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:the_end.damageMode.damage", damage ?? 1);
                    },
                    get knockbackH() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.knockbackMode.knockbackH") ?? 2.5);
                    },
                    set knockbackH(horizontalKnockback) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:the_end.knockbackMode.knockbackH", horizontalKnockback ?? 2.5);
                    },
                    get knockbackV() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.knockbackMode.knockbackV") ?? 1.25);
                    },
                    set knockbackV(verticalKnockback) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:the_end.knockbackMode.knockbackV", verticalKnockback ?? 1.25);
                    },
                    get preventWorldInteractionOutsideBorder() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.preventWorldInteractionOutsideBorder") ?? false);
                    },
                    set preventWorldInteractionOutsideBorder(preventWorldInteractionOutsideBorder) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:the_end.preventWorldInteractionOutsideBorder", preventWorldInteractionOutsideBorder ?? false);
                    },
                    get tintIntensity() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.tintIntensity") ?? 1);
                    },
                    set tintIntensity(tintIntensity) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:the_end.tintIntensity", tintIntensity ?? 1);
                    },
                    /**
                     * @todo
                     */
                    get warnPlayersInChat() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.warnPlayersInChat") ?? false);
                    },
                    /**
                     * @todo
                     */
                    set warnPlayersInChat(warnPlayersInChat) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:the_end.warnPlayersInChat", warnPlayersInChat ?? false);
                    },
                    /**
                     * @todo
                     */
                    get showActionbarWarningWhenOutsideBorder() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.showActionbarWarningWhenOutsideBorder") ?? false);
                    },
                    /**
                     * @todo
                     */
                    set showActionbarWarningWhenOutsideBorder(showActionbarWarningWhenOutsideBorder) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:the_end.showActionbarWarningWhenOutsideBorder", showActionbarWarningWhenOutsideBorder ?? false);
                    },
                    get showRedScreenOutlineWhenOutsideBorder() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.showRedScreenOutlineWhenOutsideBorder") ?? true);
                    },
                    set showRedScreenOutlineWhenOutsideBorder(showRedScreenOutlineWhenOutsideBorder) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:the_end.showRedScreenOutlineWhenOutsideBorder", showRedScreenOutlineWhenOutsideBorder ?? true);
                    },
                    get showBorderParticles() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.showBorderParticles") ?? true);
                    },
                    set showBorderParticles(showBorderParticles) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:the_end.showBorderParticles", showBorderParticles ?? true);
                    },
                    /**
                     * @deprecated
                     */
                    get useShadersCompatibleBorderParticles() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.useShadersCompatibleBorderParticles") ?? false);
                    },
                    /**
                     * @deprecated
                     */
                    set useShadersCompatibleBorderParticles(useShadersCompatibleBorderParticles) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:the_end.useShadersCompatibleBorderParticles", useShadersCompatibleBorderParticles ?? false);
                    },
                    get buffer() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.buffer") ?? 5);
                    },
                    set buffer(buffer) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:the_end.buffer", buffer ?? 5);
                    },
                };
            },
        };
    }
    static get shopSystem() {
        return {
            get server() {
                return {
                    get enabled() {
                        return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:server.enabled") ?? false);
                    },
                    set enabled(enabled) {
                        world.setDynamicProperty("andexdbShopSystemSettings:server.enabled", enabled ?? false);
                    },
                };
            },
            get player() {
                return {
                    get enabled() {
                        return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:player.enabled") ?? false);
                    },
                    set enabled(enabled) {
                        world.setDynamicProperty("andexdbShopSystemSettings:player.enabled", enabled ?? false);
                    },
                    get maxShopsPerPlayer() {
                        return (world.getDynamicProperty("andexdbShopSystemSettings:player.maxShopsPerPlayer") ?? 5).toString().toNumber() ?? 5;
                    },
                    set maxShopsPerPlayer(maxShopsPerPlayer) {
                        world.setDynamicProperty("andexdbShopSystemSettings:player.maxShopsPerPlayer", maxShopsPerPlayer ?? 5);
                    },
                    get allowSellingLockInSlotItems() {
                        return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:player.allowSellingLockInSlotItems") ?? false);
                    },
                    set allowSellingLockInSlotItems(allowSellingLockInSlotItems) {
                        world.setDynamicProperty("andexdbShopSystemSettings:player.allowSellingLockInSlotItems", allowSellingLockInSlotItems ?? false);
                    },
                    get allowSellingLockInInventoryItems() {
                        return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:player.allowSellingLockInInventoryItems") ?? false);
                    },
                    set allowSellingLockInInventoryItems(allowSellingLockInInventoryItems) {
                        world.setDynamicProperty("andexdbShopSystemSettings:player.allowSellingLockInInventoryItems", allowSellingLockInInventoryItems ?? false);
                    },
                    get allowSellingKeepOnDeathItems() {
                        return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:player.allowSellingKeepOnDeathItems") ?? true);
                    },
                    set allowSellingKeepOnDeathItems(allowSellingKeepOnDeathItems) {
                        world.setDynamicProperty("andexdbShopSystemSettings:player.allowSellingKeepOnDeathItems", allowSellingKeepOnDeathItems ?? true);
                    },
                };
            },
            get sign() {
                return {
                    get enabled() {
                        return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:sign.enabled") ?? false);
                    },
                    set enabled(enabled) {
                        world.setDynamicProperty("andexdbShopSystemSettings:sign.enabled", enabled ?? false);
                    },
                };
            },
        };
    }
    static get teleportSystems() {
        return {
            /**
             * Whether or not cross-dimensional teleports are allowed.
             *
             * Affects all types of teleports that regular players can use, including but not limited to the home system, TPA system, and the `\spawn` command.
             *
             * Overrides the `allowCrossDimensionalTeleport` options for the home system, TPA system, and `\spawn` command.
             *
             * @default true
             */
            get allowCrossDimensionalTeleport() {
                return Boolean(world.getDynamicProperty("teleportSystemsSettings:allowCrossDimensionalTeleport") ?? true);
            },
            set allowCrossDimensionalTeleport(enabled) {
                world.setDynamicProperty("teleportSystemsSettings:allowCrossDimensionalTeleport", enabled ?? true);
            },
            /**
             * How long in seconds after teleporting that the player has to wait before they can teleport again.
             *
             * Set it to 0 to have no teleport cooldown.
             *
             * @default 30
             */
            get teleportCooldown() {
                return Number(world.getDynamicProperty("homeSystemSettings:teleportCooldown") ?? 30);
            },
            set teleportCooldown(maxHomes) {
                world.setDynamicProperty("homeSystemSettings:teleportCooldown", maxHomes ?? 30);
            },
            /**
             * How long in seconds that the player has to stand still before they can teleport, if they move during this time period, the teleportation is canceled.
             *
             * Set it to 0 to have players teleport instantly.
             *
             * @default 5
             */
            get standStillTimeToTeleport() {
                return Number(world.getDynamicProperty("homeSystemSettings:standStillTimeToTeleport") ?? 5);
            },
            set standStillTimeToTeleport(maxHomes) {
                world.setDynamicProperty("homeSystemSettings:standStillTimeToTeleport", maxHomes ?? 5);
            },
            /**
             * How long in seconds after getting damaged by another player that the player has to wait before they can teleport with the player menu or commands such as `\spawn`, `\home`, `\gohome`, `\tpa`, and `\rtp`.
             *
             * Set it to 0 to have no PVP cooldown.
             *
             * @default 15
             */
            get pvpCooldownToTeleport() {
                return isNaN(Number(world.getDynamicProperty("andexdbSettings:pvpCooldownToTeleport")))
                    ? 15
                    : Number(world.getDynamicProperty("andexdbSettings:pvpCooldownToTeleport") ?? 15);
            },
            set pvpCooldownToTeleport(invalidChatCommandAction) {
                world.setDynamicProperty("andexdbSettings:pvpCooldownToTeleport", invalidChatCommandAction ?? 15);
            },
        };
    }
    static get homeSystem() {
        return {
            get homeSystemEnabled() {
                return Boolean(world.getDynamicProperty("homeSystemSettings:homeSystemEnabled") ?? true);
            },
            set homeSystemEnabled(enabled) {
                world.setDynamicProperty("homeSystemSettings:homeSystemEnabled", enabled ?? true);
            },
            get maxHomesPerPlayer() {
                return world.getDynamicProperty("homeSystemSettings:maxHomesPerPlayer") == -1
                    ? Infinity
                    : Number(world.getDynamicProperty("homeSystemSettings:maxHomesPerPlayer") ?? Infinity);
            },
            set maxHomesPerPlayer(maxHomes) {
                world.setDynamicProperty("homeSystemSettings:maxHomesPerPlayer", (maxHomes ?? Infinity) == Infinity ? -1 : maxHomes);
            },
            /**
             * Whether or not you can teleport to a home that is in a different dimension than you.
             *
             * Defaults to true.
             */
            get allowCrossDimensionalTeleport() {
                return Boolean(world.getDynamicProperty("homeSystemSettings:allowCrossDimensionalTeleport") ?? true);
            },
            set allowCrossDimensionalTeleport(enabled) {
                world.setDynamicProperty("homeSystemSettings:allowCrossDimensionalTeleport", enabled ?? true);
            },
            /**
             * Whether or not homes are allowed in dimensions other than the overworld.
             *
             * Defaults to true.
             */
            get allowHomesInOtherDimensions() {
                return Boolean(world.getDynamicProperty("homeSystemSettings:allowHomesInOtherDimensions") ?? true);
            },
            set allowHomesInOtherDimensions(enabled) {
                world.setDynamicProperty("homeSystemSettings:allowHomesInOtherDimensions", enabled ?? true);
            },
        };
    }
    static get tpaSystem() {
        return {
            get tpaSystemEnabled() {
                return Boolean(world.getDynamicProperty("tpaSystemSettings:tpaSystemEnabled") ?? world.getDynamicProperty("rtpSystemSettings:rtpSystemEnabled") ?? true);
            },
            set tpaSystemEnabled(enabled) {
                world.setDynamicProperty("tpaSystemSettings:tpaSystemEnabled", enabled ?? true);
            },
            /**
             * The number of seconds after a teleport request is sent before it will time out.
             *
             * Defaults to 60.
             */
            get timeoutDuration() {
                return isNaN(Number(world.getDynamicProperty("tpaSystemSettings:timeoutDuration")))
                    ? 60
                    : Number(world.getDynamicProperty("tpaSystemSettings:timeoutDuration") ?? 60);
            },
            set timeoutDuration(timeoutDuration) {
                world.setDynamicProperty("tpaSystemSettings:timeoutDuration", timeoutDuration ?? 60);
            },
            /**
             * Whether or not you can teleport to a player who is in a different dimension than you.
             *
             * Defaults to true.
             */
            get allowCrossDimensionalTeleport() {
                return Boolean(world.getDynamicProperty("tpaSystemSettings:allowCrossDimensionalTeleport") ?? true);
            },
            set allowCrossDimensionalTeleport(enabled) {
                world.setDynamicProperty("tpaSystemSettings:allowCrossDimensionalTeleport", enabled ?? true);
            },
        };
    }
    static get banSystem() {
        return {
            get enabled() {
                return Boolean(world.getDynamicProperty("andexdbSettings:banEnabled") ?? true);
            },
            set enabled(enabled) {
                world.setDynamicProperty("andexdbSettings:banEnabled", enabled ?? true);
            },
        };
    }
    static get chatRanks() {
        return {
            get chatRankPrefix() {
                return String(world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:");
            },
            set chatRankPrefix(chatRankPrefix) {
                world.setDynamicProperty("andexdbSettings:chatRankPrefix", chatRankPrefix ?? "rank:");
            },
            get chatSudoPrefix() {
                return String(world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:");
            },
            set chatSudoPrefix(chatSudoPrefix) {
                world.setDynamicProperty("andexdbSettings:chatSudoPrefix", chatSudoPrefix ?? "sudo:");
            },
            get chatDisplayTimeStamp() {
                return Boolean(world.getDynamicProperty("andexdbSettings:chatDisplayTimeStamp") ?? false);
            },
            set chatDisplayTimeStamp(chatDisplayTimeStampEnabled) {
                world.setDynamicProperty("andexdbSettings:chatDisplayTimeStamp", chatDisplayTimeStampEnabled ?? false);
            },
            get showRanksOnPlayerNameTags() {
                return Boolean(world.getDynamicProperty("andexdbSettings:showRanksOnPlayerNameTags") ?? false);
            },
            set showRanksOnPlayerNameTags(showRanksOnPlayerNameTags) {
                world.setDynamicProperty("andexdbSettings:showRanksOnPlayerNameTags", showRanksOnPlayerNameTags ?? false);
            },
            get showHealthOnPlayerNameTags() {
                return Boolean(world.getDynamicProperty("andexdbSettings:showHealthOnPlayerNameTags") ?? false);
            },
            set showHealthOnPlayerNameTags(showHealthOnPlayerNameTags) {
                world.setDynamicProperty("andexdbSettings:showHealthOnPlayerNameTags", showHealthOnPlayerNameTags ?? false);
            },
            get rankMode() {
                return String(world.getDynamicProperty("andexdbSettings:rankMode") ?? "custom_simple");
            },
            set rankMode(rankMode) {
                world.setDynamicProperty("andexdbSettings:rankMode", rankMode ?? "custom_simple");
            },
            get rankEvaluatorMode_chat() {
                return String(world.getDynamicProperty("andexdbSettings:rankEvaluatorMode_chat") ?? "default");
            },
            set rankEvaluatorMode_chat(rankEvaluatorMode_chat) {
                world.setDynamicProperty("andexdbSettings:rankEvaluatorMode_chat", rankEvaluatorMode_chat ?? "default");
            },
            get rankEvaluatorMode_nameTags() {
                return String(world.getDynamicProperty("andexdbSettings:rankEvaluatorMode_nameTags") ?? "default");
            },
            set rankEvaluatorMode_nameTags(rankEvaluatorMode_nameTags) {
                world.setDynamicProperty("andexdbSettings:rankEvaluatorMode_nameTags", rankEvaluatorMode_nameTags ?? "default");
            },
            get rankDisplayPrefix() {
                return String(world.getDynamicProperty("andexdbSettings:rankDisplayPrefix") ?? "[");
            },
            set rankDisplayPrefix(rankDisplayPrefix) {
                world.setDynamicProperty("andexdbSettings:rankDisplayPrefix", rankDisplayPrefix ?? "[");
            },
            get rankDisplaySuffix() {
                return String(world.getDynamicProperty("andexdbSettings:rankDisplaySuffix") ?? "§r]");
            },
            set rankDisplaySuffix(rankDisplaySuffix) {
                world.setDynamicProperty("andexdbSettings:rankDisplaySuffix", rankDisplaySuffix ?? "§r]");
            },
            get nameDisplayPrefix() {
                return String(world.getDynamicProperty("andexdbSettings:nameDisplayPrefix") ?? "[");
            },
            set nameDisplayPrefix(nameDisplayPrefix) {
                world.setDynamicProperty("andexdbSettings:nameDisplayPrefix", nameDisplayPrefix ?? "<");
            },
            get nameDisplaySuffix() {
                return String(world.getDynamicProperty("andexdbSettings:nameDisplaySuffix") ?? "§r]");
            },
            set nameDisplaySuffix(nameDisplaySuffix) {
                world.setDynamicProperty("andexdbSettings:nameDisplaySuffix", nameDisplaySuffix ?? "§r>");
            },
            get chatNameAndMessageSeparator() {
                return String(world.getDynamicProperty("andexdbSettings:chatNameAndMessageSeparator") ?? " ");
            },
            set chatNameAndMessageSeparator(chatNameAndMessageSeparator) {
                world.setDynamicProperty("andexdbSettings:chatNameAndMessageSeparator", chatNameAndMessageSeparator ?? " ");
            },
            get rankDisplaySeparator() {
                return String(world.getDynamicProperty("andexdbSettings:rankDisplaySeparator") ?? " ");
            },
            set rankDisplaySeparator(rankDisplaySeparator) {
                world.setDynamicProperty("andexdbSettings:rankDisplaySeparator", rankDisplaySeparator ?? " ");
            },
            /**
             * The template string for displaying a player's dimension in the chat.
             *
             * Only applies in Custom(Advanced) mode.
             *
             * @todo
             *
             * @default "[${dimension}§r] "
             */
            get chatDimensionTemplateString() {
                return String(world.getDynamicProperty("andexdbSettings:chatDimensionTemplateString") ?? "[${dimension}§r] ");
            },
            set chatDimensionTemplateString(chatDimensionTemplateString) {
                world.setDynamicProperty("andexdbSettings:chatDimensionTemplateString", chatDimensionTemplateString ?? "[${dimension}§r] ");
            },
            /**
             * The template string for individual ranks.
             *
             * @default "[${rank}§r]"
             */
            get rankTemplateString() {
                return String(world.getDynamicProperty("andexdbSettings:rankTemplateString") ?? "[${rank}§r]");
            },
            set rankTemplateString(rankTemplateString) {
                world.setDynamicProperty("andexdbSettings:rankTemplateString", rankTemplateString ?? "[${rank}§r]");
            },
            get messageTemplateString() {
                return String(world.getDynamicProperty("andexdbSettings:messageTemplateString") ??
                    '${(showDimension ? `[${dimension}§r] ` : "")}${timestampenabled?`[${timestamp}] `:""}${ranks}§r${(ranks!="")?" ":""}<${name}§r> ${message}');
            },
            set messageTemplateString(messageTemplateString) {
                world.setDynamicProperty("andexdbSettings:messageTemplateString", messageTemplateString ?? '${(showDimension ? `[${dimension}§r] ` : "")}${timestampenabled?`[${timestamp}] `:""}${ranks}§r${(ranks!="")?" ":""}<${name}§r> ${message}');
            },
            get nameTagTemplateString() {
                return String(world.getDynamicProperty("andexdbSettings:nameTagTemplateString") ??
                    '${rank} ${nameFormatting}${name}${(showHealth ? `§r§f [${currentHealth}/${maxHealth}]` : "")}');
            },
            set nameTagTemplateString(nameTagTemplateString) {
                world.setDynamicProperty("andexdbSettings:nameTagTemplateString", nameTagTemplateString ??
                    '${rank} ${nameFormatting}${name}${(showHealth ? `§r§f [${currentHealth}/${maxHealth}]` : "")}');
            },
            get defaultRank() {
                return String(world.getDynamicProperty("andexdbSettings:defaultRank") ?? "§bMember§r");
            },
            set defaultRank(defaultRank) {
                world.setDynamicProperty("andexdbSettings:defaultRank", defaultRank ?? "§bMember§r");
            },
            get defaultMessageFormatting() {
                return String(world.getDynamicProperty("andexdbSettings:defaultMessageFormatting") ?? "");
            },
            set defaultMessageFormatting(defaultMessageFormatting) {
                world.setDynamicProperty("andexdbSettings:defaultMessageFormatting", defaultMessageFormatting ?? "");
            },
            get defaultNameFormatting() {
                return String(world.getDynamicProperty("andexdbSettings:defaultNameFormatting") ?? "");
            },
            set defaultNameFormatting(defaultNameFormatting) {
                world.setDynamicProperty("andexdbSettings:defaultNameFormatting", defaultNameFormatting ?? "");
            },
            get defaultSeparatorFormatting() {
                return String(world.getDynamicProperty("andexdbSettings:defaultSeparatorFormatting") ?? "");
            },
            set defaultSeparatorFormatting(defaultSeparatorFormatting) {
                world.setDynamicProperty("andexdbSettings:defaultSeparatorFormatting", defaultSeparatorFormatting ?? "");
            },
            get disableCustomChatMessages() {
                return Boolean(world.getDynamicProperty("andexdbSettings:disableCustomChatMessages") ?? false);
            },
            set disableCustomChatMessages(disableCustomChatMessages) {
                world.setDynamicProperty("andexdbSettings:disableCustomChatMessages", disableCustomChatMessages ?? false);
            },
            get allowCustomChatMessagesMuting() {
                return Boolean(world.getDynamicProperty("andexdbSettings:allowCustomChatMessagesMuting") ?? false);
            },
            set allowCustomChatMessagesMuting(allowCustomChatMessagesMuting) {
                world.setDynamicProperty("andexdbSettings:showRanksOnPlayerNameTags", allowCustomChatMessagesMuting ?? false);
            },
            get autoEscapeChatMessages() {
                return Boolean(world.getDynamicProperty("andexdbSettings:autoEscapeChatMessages") ?? false);
            },
            set autoEscapeChatMessages(autoEscapeChatMessages) {
                world.setDynamicProperty("andexdbSettings:autoEscapeChatMessages", autoEscapeChatMessages ?? false);
            },
            get autoURIEscapeChatMessages() {
                return Boolean(world.getDynamicProperty("andexdbSettings:autoURIEscapeChatMessages") ?? false);
            },
            set autoURIEscapeChatMessages(autoURIEscapeChatMessages) {
                world.setDynamicProperty("andexdbSettings:autoURIEscapeChatMessages", autoURIEscapeChatMessages ?? false);
            },
            get allowChatEscapeCodes() {
                return Boolean(world.getDynamicProperty("andexdbSettings:allowChatEscapeCodes") ?? false);
            },
            set allowChatEscapeCodes(allowChatEscapeCodes) {
                world.setDynamicProperty("andexdbSettings:allowChatEscapeCodes", allowChatEscapeCodes ?? false);
            },
        };
    }
    static get moneySystem() {
        return {
            /**
             * Whether or not to use a scoreboard-based money system instead of a dynamic property-based one.
             *
             * Enabling this option will cause the money system to max out at the 32-bit integer limit (approximately 2.1 billion), but will allow for modifying a player's money with the /scoreboard command instead of having to use the main menu or use script eval.
             *
             * When this option is disabled the limit is 10^32767. So basically infinite.
             *
             * Dynamic Property ID: `andexdbSettings:moneySystem.useScoreboardBasedMoneySystem`
             *
             * @default false
             */
            get useScoreboardBasedMoneySystem() {
                return Boolean(world.getDynamicProperty("andexdbSettings:moneySystem.useScoreboardBasedMoneySystem") ?? false);
            },
            set useScoreboardBasedMoneySystem(enabled) {
                world.setDynamicProperty("andexdbSettings:moneySystem.useScoreboardBasedMoneySystem", enabled ?? false);
            },
            /**
             * The name of the scoreboard to use for the money system.
             *
             * Dynamic Property ID: `andexdbSettings:moneySystem.scoreboardName`
             *
             * @default "andexdb:money"
             */
            get scoreboardName() {
                return String(world.getDynamicProperty("andexdbSettings:moneySystem.scoreboardName") ?? "andexdb:money");
            },
            set scoreboardName(enabled) {
                world.setDynamicProperty("andexdbSettings:moneySystem.scoreboardName", enabled ?? "andexdb:money");
            },
        };
    }
    static get bountySystem() {
        return {
            /**
             * Whether or not the bounty system is enabled.
             *
             * Dynamic Property ID: `andexdbSettings:bountySystem.enabled`
             *
             * @default true
             */
            get enabled() {
                return Boolean(world.getDynamicProperty("andexdbSettings:bountySystem.enabled") ?? true);
            },
            set enabled(enabled) {
                world.setDynamicProperty("andexdbSettings:bountySystem.enabled", enabled ?? true);
            },
            /**
             * Whether to show the time that a player was last online in the stats list that is shown when a player clicks on the bounty for another player in the bounty list.
             *
             * Defaults to false.
             */
            get showLastOnlineTimeInBountyDetailsList() {
                return Boolean(world.getDynamicProperty("andexdbSettings:bountySystem.showLastOnlineTimeInPlayerStatsList") ?? false);
            },
            set showLastOnlineTimeInBountyDetailsList(show) {
                world.setDynamicProperty("andexdbSettings:bountySystem.showLastOnlineTimeInPlayerStatsList", show ?? false);
            },
        };
    }
    static get warpsSystem() {
        return {
            /**
             * Whether or not the warps system is enabled.
             *
             * Dynamic Property ID: `andexdbSettings:warpsSystem.enabled`
             *
             * @default true
             */
            get enabled() {
                return Boolean(world.getDynamicProperty("warpsSystem:bountySystem.enabled") ?? true);
            },
            set enabled(enabled) {
                world.setDynamicProperty("andexdbSettings:warpsSystem.enabled", enabled ?? true);
            },
            /**
             * List of saved warps.
             *
             * Dynamic Property ID: `andexdbSettings:warpsSystem.warps`
             *
             * @default []
             *
             * @throws The setter throws if the input is not an array of warp interface objects or undefined.
             */
            get warps() {
                return JSONB.parse(world.getStringFromDynamicProperties("warpsSystem:warpsSystem.warps", "[]"));
            },
            set warps(warps) {
                if (warps === undefined) {
                    world.saveStringToDynamicProperties("[]", "warpsSystem:warpsSystem.warps");
                }
                else if (warps instanceof Array) {
                    world.saveStringToDynamicProperties(JSONB.stringify(warps), "warpsSystem:warpsSystem.warps");
                }
                else {
                    throw new TypeError("Invalid warps list provided, expected an array of warp interface objects or undefined, but instead got " +
                        (typeof warps == "object"
                            ? warps === null
                                ? "object[null]"
                                : "object[" + (warps.constructor.name ?? "unknown") + "]"
                            : typeof warps) +
                        ".");
                }
            },
        };
    }
    static get moneyTransferSystem() {
        return {
            /**
             * Whether or not the money transfer system is enabled.
             *
             * Dynamic Property ID: `andexdbSettings:moneyTransferSystem.enabled`
             *
             * @default true
             */
            get enabled() {
                return Boolean(world.getDynamicProperty("andexdbSettings:moneyTransferSystem.enabled") ?? true);
            },
            set enabled(enabled) {
                world.setDynamicProperty("andexdbSettings:moneyTransferSystem.enabled", enabled ?? true);
            },
        };
    }
    static get antiSpamSystem() {
        return {
            get antispamEnabled() {
                return Boolean(world.getDynamicProperty("antispamSettings:antispamEnabled") ?? false);
            },
            set antispamEnabled(enabled) {
                world.setDynamicProperty("antispamSettings:antispamEnabled", enabled ?? false);
            },
            get restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute() {
                return Boolean(world.getDynamicProperty("antispamSettings:restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute") ?? false);
            },
            set restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute(restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute) {
                world.setDynamicProperty("antispamSettings:restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute", restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute ?? false);
            },
            get waitTimeAfterAntispamActivation() {
                return isNaN(Number(world.getDynamicProperty("antispamSettings:waitTimeAfterAntispamActivation")))
                    ? 60
                    : Number(world.getDynamicProperty("antispamSettings:waitTimeAfterAntispamActivation") ?? 60);
            },
            set waitTimeAfterAntispamActivation(waitTimeInSeconds) {
                world.setDynamicProperty("antispamSettings:waitTimeAfterAntispamActivation", waitTimeInSeconds ?? 60);
            },
            get maxTimeBewteenMessagesToTriggerAntiSpam() {
                return isNaN(Number(world.getDynamicProperty("antispamSettings:maxTimeBewteenMessagesToTriggerAntiSpam")))
                    ? 5
                    : Number(world.getDynamicProperty("antispamSettings:maxTimeBewteenMessagesToTriggerAntiSpam") ?? 5);
            },
            set maxTimeBewteenMessagesToTriggerAntiSpam(maxTimeInSeconds) {
                world.setDynamicProperty("antispamSettings:maxTimeBewteenMessagesToTriggerAntiSpam", maxTimeInSeconds ?? 5);
            },
            get antispamTriggerMessageCount() {
                return isNaN(Number(world.getDynamicProperty("antispamSettings:antispamTriggerMessageCount")))
                    ? 4
                    : Number(gwdp("antispamSettings:antispamTriggerMessageCount") ?? 4);
            },
            set antispamTriggerMessageCount(messageCount) {
                world.setDynamicProperty("antispamSettings:antispamTriggerMessageCount", messageCount ?? 4);
            },
        };
    }
    static get ui() {
        return {
            get menus() {
                return {
                    get mainMenu() {
                        return {
                            /**
                             *
                             */ /*
                           get buttons(): (keyof typeof menuButtonIds.mainMenu.buttons)[] {
                               return JSON.parse(
                                   String(
                                       world.getDynamicProperty("andexdbSettings:ui.menus.mainMenu.buttons") ??
                                           JSON.stringify(
                                               (Object.keys(menuButtonIds.mainMenu.buttons) as (keyof typeof menuButtonIds.mainMenu.buttons)[]).sort((a, b) =>
                                                   menuButtonIds.mainMenu.buttons[a].defaultButtonIndex > menuButtonIds.mainMenu.buttons[b].defaultButtonIndex
                                                       ? 1
                                                       : menuButtonIds.mainMenu.buttons[a].defaultButtonIndex <
                                                         menuButtonIds.mainMenu.buttons[b].defaultButtonIndex
                                                       ? -1
                                                       : 0
                                               )
                                           )
                                   )
                               );
                           },
                           set buttons(buttonList: (keyof typeof menuButtonIds.mainMenu.buttons)[] | undefined) {
                               world.setDynamicProperty(
                                   "andexdbSettings:ui.menus.mainMenu.buttons",
                                   JSON.stringify(
                                       buttonList ??
                                           (Object.keys(menuButtonIds.mainMenu.buttons) as (keyof typeof menuButtonIds.mainMenu.buttons)[]).sort((a, b) =>
                                               menuButtonIds.mainMenu.buttons[a].defaultButtonIndex > menuButtonIds.mainMenu.buttons[b].defaultButtonIndex
                                                   ? 1
                                                   : menuButtonIds.mainMenu.buttons[a].defaultButtonIndex <
                                                     menuButtonIds.mainMenu.buttons[b].defaultButtonIndex
                                                   ? -1
                                                   : 0
                                           )
                                   )
                               );
                           }, */
                            /**
                             * Whether to show the buttons marked as deprecated on the main menu.
                             *
                             * Defaults to false.
                             */
                            get showDeprecatedButtons() {
                                return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.mainMenu.showDeprecatedButtons") ?? false);
                            },
                            set showDeprecatedButtons(show) {
                                world.setDynamicProperty("andexdbSettings:ui.menus.mainMenu.showDeprecatedButtons", show ?? false);
                            },
                            /**
                             * Whether to show the buttons marked as deprecated on the main menu.
                             *
                             * Defaults to true.
                             */
                            get showExperimentalButtons() {
                                return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.mainMenu.showExperimentalButtons") ?? true);
                            },
                            set showExperimentalButtons(show) {
                                world.setDynamicProperty("andexdbSettings:ui.menus.mainMenu.showExperimentalButtons", show ?? true);
                            },
                            /**
                             * Whether to show the buttons marked as deprecated on the main menu.
                             *
                             * Defaults to false.
                             */
                            get showUnusedButtons() {
                                return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.mainMenu.showUnusedButtons") ?? false);
                            },
                            set showUnusedButtons(show) {
                                world.setDynamicProperty("andexdbSettings:ui.menus.mainMenu.showUnusedButtons", show ?? false);
                            },
                            /**
                             * Whether to show the buttons for features that are planned to be added in a future update on the main menu.
                             *
                             * Defaults to false.
                             */
                            get showUpcomingButtons() {
                                return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.mainMenu.showUpcomingButtons") ?? false);
                            },
                            set showUpcomingButtons(show) {
                                world.setDynamicProperty("andexdbSettings:ui.menus.mainMenu.showUpcomingButtons", show ?? false);
                            },
                            /**
                             * Whether to show the buttons for features that are non-functional on the main menu.
                             *
                             * Defaults to false.
                             */
                            get showNonFunctionalButtons() {
                                return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.mainMenu.showNonFunctionalButtons") ?? false);
                            },
                            set showNonFunctionalButtons(show) {
                                world.setDynamicProperty("andexdbSettings:ui.menus.mainMenu.showNonFunctionalButtons", show ?? false);
                            },
                        };
                    },
                    get playerMenu() {
                        return {
                            /**
                             * Whether or not the player menu is enabled.
                             *
                             * Defaults to true.
                             */
                            get enabled() {
                                return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu.enabled") ?? true);
                            },
                            set enabled(enabled) {
                                world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu.enabled", enabled ?? true);
                            },
                            /**
                             *
                             */
                            get buttons() {
                                return JSON.parse(String(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu.buttons") ??
                                    JSON.stringify(Object.keys(menuButtonIds.playerMenu.buttons).sort((a, b) => menuButtonIds.playerMenu.buttons[a].defaultButtonIndex >
                                        menuButtonIds.playerMenu.buttons[b].defaultButtonIndex
                                        ? 1
                                        : menuButtonIds.playerMenu.buttons[a].defaultButtonIndex <
                                            menuButtonIds.playerMenu.buttons[b].defaultButtonIndex
                                            ? -1
                                            : 0))));
                            },
                            set buttons(buttonList) {
                                world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu.buttons", JSON.stringify(buttonList ??
                                    Object.keys(menuButtonIds.playerMenu.buttons).sort((a, b) => menuButtonIds.playerMenu.buttons[a].defaultButtonIndex > menuButtonIds.playerMenu.buttons[b].defaultButtonIndex
                                        ? 1
                                        : menuButtonIds.playerMenu.buttons[a].defaultButtonIndex <
                                            menuButtonIds.playerMenu.buttons[b].defaultButtonIndex
                                            ? -1
                                            : 0)));
                            },
                            /**
                             * The item name for the item that opens the player menu.
                             *
                             * Defaults to "Menu".
                             */
                            get itemName() {
                                return String(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu.itemName") ?? "§r§fMenu");
                            },
                            set itemName(itemName) {
                                world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu.itemName", itemName ?? "§r§fMenu");
                            },
                            /**
                             * Whether to show the buttons marked as deprecated on the player menu.
                             *
                             * Defaults to false.
                             */
                            get showDeprecatedButtons() {
                                return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu.showDeprecatedButtons") ?? false);
                            },
                            set showDeprecatedButtons(show) {
                                world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu.showDeprecatedButtons", show ?? false);
                            },
                            /**
                             * Whether to show the buttons marked as deprecated on the player menu.
                             *
                             * Defaults to true.
                             */
                            get showExperimentalButtons() {
                                return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu.showExperimentalButtons") ?? true);
                            },
                            set showExperimentalButtons(show) {
                                world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu.showExperimentalButtons", show ?? true);
                            },
                            /**
                             * Whether to show the buttons marked as deprecated on the player menu.
                             *
                             * Defaults to false.
                             */
                            get showUnusedButtons() {
                                return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu.showUnusedButtons") ?? false);
                            },
                            set showUnusedButtons(show) {
                                world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu.showUnusedButtons", show ?? false);
                            },
                            /**
                             * Whether to show the buttons for features that are planned to be added in a future update on the player menu.
                             *
                             * Defaults to false.
                             */
                            get showUpcomingButtons() {
                                return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu.showUpcomingButtons") ?? false);
                            },
                            set showUpcomingButtons(show) {
                                world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu.showUpcomingButtons", show ?? false);
                            },
                            /**
                             * Whether to show the buttons for features that are non-functional on the player menu.
                             *
                             * Defaults to false.
                             */
                            get showNonFunctionalButtons() {
                                return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu.showNonFunctionalButtons") ?? false);
                            },
                            set showNonFunctionalButtons(show) {
                                world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu.showNonFunctionalButtons", show ?? false);
                            },
                        };
                    },
                    get playerMenu_leaderboards() {
                        return {
                            /**
                             * The settings for the built-in leaderboard statistics.
                             */
                            get builtInStats() {
                                return {
                                    get money() {
                                        return {
                                            /**
                                             * Whether or not this built-in statictic is enabled.
                                             *
                                             * Defaults to true.
                                             */
                                            get enabled() {
                                                return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.enabled") ??
                                                    true);
                                            },
                                            set enabled(enabled) {
                                                world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.enabled", enabled ?? true);
                                            },
                                            get displayOptions() {
                                                return {
                                                    /**
                                                     * A currency symbol to prefix the displayed value with.
                                                     *
                                                     * Defaults to "$".
                                                     */
                                                    get currencyPrefix() {
                                                        return String(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.currencyPrefix") ?? "$");
                                                    },
                                                    set currencyPrefix(prefixWithDollarSign) {
                                                        world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.currencyPrefix", prefixWithDollarSign ?? "$");
                                                    },
                                                    /**
                                                     * Whether or not to add comma separators to the displayed value for this statistic.
                                                     *
                                                     * Defaults to true.
                                                     */
                                                    get addCommaSeparators() {
                                                        return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.addCommaSeparators") ?? true);
                                                    },
                                                    set addCommaSeparators(addCommaSeparators) {
                                                        world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.addCommaSeparators", addCommaSeparators ?? true);
                                                    },
                                                };
                                            },
                                        };
                                    },
                                };
                            },
                            /**
                             *
                             */
                            get customStats() {
                                return JSONB.parse(String(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.customStats") ?? "[]")).map((s) => {
                                    if (s.type === "custom") {
                                        return {
                                            buttonDisplayName: s.buttonDisplayName,
                                            buttonIcon: s.buttonIcon,
                                            displayOptions: {
                                                addCommaSeparators: s.displayOptions?.addCommaSeparators ?? true,
                                                currencyPrefix: s.displayOptions?.currencyPrefix ?? "",
                                                toFixed: s.displayOptions?.toFixed,
                                                valueDisplayColor: s.displayOptions?.valueDisplayColor,
                                                valueDisplayTransformer_button: s.displayOptions?.valueDisplayTransformer_button !== undefined
                                                    ? eval?.(s.displayOptions.valueDisplayTransformer_button)
                                                    : undefined,
                                                valueDisplayTransformer_statsList: s.displayOptions?.valueDisplayTransformer_button !== undefined
                                                    ? eval?.(s.displayOptions.valueDisplayTransformer_statsList)
                                                    : undefined,
                                            },
                                            id: s.id,
                                            menuTitle: s.menuTitle,
                                            scoreboardObjective: s.scoreboardObjective,
                                            sorter: s.sorter,
                                            statsListDisplayName: s.statsListDisplayName,
                                            type: s.type,
                                            valueType: s.valueType,
                                        };
                                    }
                                    else if (s.type === "customAdvanced") {
                                        if (s.sortType === "function") {
                                            return {
                                                buttonDisplayName: s.buttonDisplayName,
                                                buttonIcon: s.buttonIcon,
                                                displayOptions: {
                                                    addCommaSeparators: s.displayOptions?.addCommaSeparators ?? true,
                                                    currencyPrefix: s.displayOptions?.currencyPrefix ?? "",
                                                    toFixed: s.displayOptions?.toFixed,
                                                    valueDisplayColor: s.displayOptions?.valueDisplayColor,
                                                    valueDisplayTransformer_button: s.displayOptions?.valueDisplayTransformer_button !== undefined
                                                        ? eval?.(s.displayOptions.valueDisplayTransformer_button)
                                                        : undefined,
                                                    valueDisplayTransformer_statsList: s.displayOptions?.valueDisplayTransformer_button !== undefined
                                                        ? eval?.(s.displayOptions.valueDisplayTransformer_statsList)
                                                        : undefined,
                                                },
                                                getterFunction: eval?.(s.getterFunction),
                                                id: s.id,
                                                menuTitle: s.menuTitle,
                                                sorter: eval?.(s.sorter),
                                                sortType: s.sortType,
                                                statsListDisplayName: s.statsListDisplayName,
                                                type: s.type,
                                                valueType: s.valueType,
                                            };
                                        }
                                        else {
                                            return {
                                                buttonDisplayName: s.buttonDisplayName,
                                                buttonIcon: s.buttonIcon,
                                                displayOptions: {
                                                    addCommaSeparators: s.displayOptions?.addCommaSeparators ?? true,
                                                    currencyPrefix: s.displayOptions?.currencyPrefix ?? "",
                                                    toFixed: s.displayOptions?.toFixed,
                                                    valueDisplayColor: s.displayOptions?.valueDisplayColor,
                                                    valueDisplayTransformer_button: s.displayOptions?.valueDisplayTransformer_button !== undefined
                                                        ? eval?.(s.displayOptions.valueDisplayTransformer_button)
                                                        : undefined,
                                                    valueDisplayTransformer_statsList: s.displayOptions?.valueDisplayTransformer_button !== undefined
                                                        ? eval?.(s.displayOptions.valueDisplayTransformer_statsList)
                                                        : undefined,
                                                },
                                                getterFunction: eval?.(s.getterFunction),
                                                id: s.id,
                                                menuTitle: s.menuTitle,
                                                sorter: s.sorter,
                                                sortType: s.sortType,
                                                statsListDisplayName: s.statsListDisplayName,
                                                type: s.type,
                                                valueType: s.valueType,
                                            };
                                        }
                                    }
                                });
                            },
                            set customStats(buttonList) {
                                world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.customStats", JSONB.stringify((buttonList ?? []).map((s) => {
                                    if (s.type === "custom") {
                                        return {
                                            buttonDisplayName: s.buttonDisplayName,
                                            buttonIcon: s.buttonIcon,
                                            displayOptions: {
                                                addCommaSeparators: s.displayOptions?.addCommaSeparators ?? true,
                                                currencyPrefix: s.displayOptions?.currencyPrefix ?? "",
                                                toFixed: s.displayOptions?.toFixed,
                                                valueDisplayColor: s.displayOptions?.valueDisplayColor,
                                                valueDisplayTransformer_button: s.displayOptions?.valueDisplayTransformer_button !== undefined
                                                    ? s.displayOptions.valueDisplayTransformer_button.toString()
                                                    : undefined,
                                                valueDisplayTransformer_statsList: s.displayOptions?.valueDisplayTransformer_button !== undefined
                                                    ? s.displayOptions.valueDisplayTransformer_statsList.toString()
                                                    : undefined,
                                            },
                                            id: s.id,
                                            menuTitle: s.menuTitle,
                                            scoreboardObjective: s.scoreboardObjective,
                                            sorter: s.sorter,
                                            statsListDisplayName: s.statsListDisplayName,
                                            type: s.type,
                                            valueType: s.valueType,
                                        };
                                    }
                                    else if (s.type === "customAdvanced") {
                                        if (s.sortType === "function") {
                                            return {
                                                buttonDisplayName: s.buttonDisplayName,
                                                buttonIcon: s.buttonIcon,
                                                displayOptions: {
                                                    addCommaSeparators: s.displayOptions?.addCommaSeparators ?? true,
                                                    currencyPrefix: s.displayOptions?.currencyPrefix ?? "",
                                                    toFixed: s.displayOptions?.toFixed,
                                                    valueDisplayColor: s.displayOptions?.valueDisplayColor,
                                                    valueDisplayTransformer_button: s.displayOptions?.valueDisplayTransformer_button !== undefined
                                                        ? s.displayOptions.valueDisplayTransformer_button.toString()
                                                        : undefined,
                                                    valueDisplayTransformer_statsList: s.displayOptions?.valueDisplayTransformer_button !== undefined
                                                        ? s.displayOptions.valueDisplayTransformer_statsList.toString()
                                                        : undefined,
                                                },
                                                getterFunction: s.getterFunction.toString(),
                                                id: s.id,
                                                menuTitle: s.menuTitle,
                                                sorter: s.sorter.toString(),
                                                sortType: s.sortType,
                                                statsListDisplayName: s.statsListDisplayName,
                                                type: s.type,
                                                valueType: s.valueType,
                                            };
                                        }
                                        else {
                                            return {
                                                buttonDisplayName: s.buttonDisplayName,
                                                buttonIcon: s.buttonIcon,
                                                displayOptions: {
                                                    addCommaSeparators: s.displayOptions?.addCommaSeparators ?? true,
                                                    currencyPrefix: s.displayOptions?.currencyPrefix ?? "",
                                                    toFixed: s.displayOptions?.toFixed,
                                                    valueDisplayColor: s.displayOptions?.valueDisplayColor,
                                                    valueDisplayTransformer_button: s.displayOptions?.valueDisplayTransformer_button !== undefined
                                                        ? s.displayOptions.valueDisplayTransformer_button.toString()
                                                        : undefined,
                                                    valueDisplayTransformer_statsList: s.displayOptions?.valueDisplayTransformer_button !== undefined
                                                        ? s.displayOptions.valueDisplayTransformer_statsList.toString()
                                                        : undefined,
                                                },
                                                getterFunction: s.getterFunction.toString(),
                                                id: s.id,
                                                menuTitle: s.menuTitle,
                                                sorter: s.sorter,
                                                sortType: s.sortType,
                                                statsListDisplayName: s.statsListDisplayName,
                                                type: s.type,
                                                valueType: s.valueType,
                                            };
                                        }
                                    }
                                })));
                            },
                            /**
                             * The statistics that are displayed when a player clicks on another player inside of the player menu leaderboard, they will be displayed in the order they are in this array.
                             *
                             * It should be an array of ids of leaderboard statistics, including both custom and built-in ones.
                             *
                             * Defaults to the list of the built-in leaderboard statistics from the `defaultPlayerMenuLeaderboardStatistics` array, in the same order that they appear in the array.
                             */
                            get trackedStats() {
                                return JSON.parse(String(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.trackedStats") ??
                                    JSON.stringify(defaultPlayerMenuLeaderboardStatistics.map((s) => s.id))));
                            },
                            set trackedStats(buttonList) {
                                world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.trackedStats", JSON.stringify(buttonList ?? defaultPlayerMenuLeaderboardStatistics.map((s) => s.id)));
                            },
                            /**
                             * The list of statistics that have their own leaderboards, they will be displayed in the order they are in this array.
                             *
                             * It should be an array of ids of leaderboard statistics, including both custom and built-in ones.
                             *
                             * Defaults to the list of the built-in leaderboard statistics from the `defaultPlayerMenuLeaderboardStatistics` array, in the same order that they appear in the array.
                             */
                            get leaderboards() {
                                return JSON.parse(String(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.leaderboards") ??
                                    JSON.stringify(defaultPlayerMenuLeaderboardStatistics.map((s) => s.id))));
                            },
                            set leaderboards(buttonList) {
                                world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.leaderboards", JSON.stringify(buttonList ?? defaultPlayerMenuLeaderboardStatistics.map((s) => s.id)));
                            },
                            /**
                             * Whether to show the time that a player was last online in the stats list that is shown when a player click on another player in a leaderboard.
                             *
                             * Defaults to false.
                             */
                            get showLastOnlineTimeInPlayerStatsList() {
                                return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.showLastOnlineTimeInPlayerStatsList") ?? false);
                            },
                            set showLastOnlineTimeInPlayerStatsList(show) {
                                world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.showLastOnlineTimeInPlayerStatsList", show ?? false);
                            },
                            /**
                             * Whether to show banned players inside of the leaderboards.
                             *
                             * Defaults to false.
                             */
                            get showBannedPlayersInLeaderboards() {
                                return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.showBannedPlayersInLeaderboards") ?? false);
                            },
                            set showBannedPlayersInLeaderboards(show) {
                                world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.showBannedPlayersInLeaderboards", show ?? false);
                            },
                        };
                    },
                };
            },
            get main() {
                return {};
            },
            get pages() {
                return {
                    /**
                     * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
                     */
                    get maxPlayersPerManagePlayersPage() {
                        return Number(world.getDynamicProperty("andexdbSettings:maxPlayersPerManagePlayersPage") ?? 9);
                    },
                    set maxPlayersPerManagePlayersPage(maxPlayersPerManagePlayersPage) {
                        world.setDynamicProperty("andexdbSettings:maxPlayersPerManagePlayersPage", Math.min(1000, Math.max(1, maxPlayersPerManagePlayersPage ?? 9)));
                    },
                    /**
                     * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
                     */
                    get maxBansPerManageBansPage() {
                        return Number(world.getDynamicProperty("andexdbSettings:maxBansPerManageBansPage") ?? 10);
                    },
                    set maxBansPerManageBansPage(maxBansPerManageBansPage) {
                        world.setDynamicProperty("andexdbSettings:maxBansPerManageBansPage", maxBansPerManageBansPage ?? 10);
                    },
                    /**
                     * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
                     */
                    get maxHomesPerManageHomesPage() {
                        return Number(world.getDynamicProperty("andexdbSettings:maxHomesPerManageHomesPage") ?? 10);
                    },
                    set maxHomesPerManageHomesPage(maxHomesPerManageHomesPage) {
                        world.setDynamicProperty("andexdbSettings:maxHomesPerManageHomesPage", maxHomesPerManageHomesPage ?? 10);
                    },
                };
            },
            get other() {
                return {
                    get useStarWarsReference404Page() {
                        return Boolean(world.getDynamicProperty("andexdbUISettings:other.useStarWarsReference404Page") ?? false);
                    },
                    set useStarWarsReference404Page(useStarWarsReference404Page) {
                        world.setDynamicProperty("andexdbUISettings:other.useStarWarsReference404Page", useStarWarsReference404Page ?? false);
                    },
                };
            },
        };
    }
    static get system() {
        return {
            get artificialLagMS() {
                return Number(world.getDynamicProperty("andexdbSettings:artificialLagMS") ?? 0);
            },
            set artificialLagMS(artificialLagMS) {
                world.setDynamicProperty("andexdbSettings:artificialLagMS", artificialLagMS ?? 0);
            },
            get timeZone() {
                return isNaN(Number(world.getDynamicProperty("andexdbSettings:timeZone")))
                    ? 0
                    : Number(world.getDynamicProperty("andexdbSettings:timeZone") ?? 0);
            },
            set timeZone(timeZone) {
                world.setDynamicProperty("andexdbSettings:timeZone", timeZone ?? 0);
            },
            get playerDataRefreshRate() {
                return Number(world.getDynamicProperty("andexdbSettings:playerDataRefreshRate") ?? 20);
            },
            set playerDataRefreshRate(playerDataRefreshRate) {
                world.setDynamicProperty("andexdbSettings:playerDataRefreshRate", Number.isNaN(Number(playerDataRefreshRate)) ? 5 : Math.min(1000, Math.max(1, Number(playerDataRefreshRate ?? 20))));
            },
            /**
             * How often to refresh protected areas.
             *
             * Dynamic Property ID: `andexdbSettings:protectedAreasRefreshRate`
             *
             * @default 200
             */
            get protectedAreasRefreshRate() {
                return Number(world.getDynamicProperty("andexdbSettings:protectedAreasRefreshRate") ?? 200);
            },
            set protectedAreasRefreshRate(protectedAreasRefreshRate) {
                world.setDynamicProperty("andexdbSettings:protectedAreasRefreshRate", Number.isNaN(Number(protectedAreasRefreshRate)) ? 200 : Math.min(1000000, Math.max(1, Number(protectedAreasRefreshRate ?? 200))));
            },
            get protectedAreasZoneActionsEnabled() {
                return Boolean(world.getDynamicProperty("andexdbSettings:protectedAreasZoneActionsEnabled") ?? true);
            },
            set protectedAreasZoneActionsEnabled(protectedAreasZoneActionsEnabled) {
                world.setDynamicProperty("andexdbSettings:protectedAreasZoneActionsEnabled", protectedAreasZoneActionsEnabled ?? true);
            },
            get protectedAreasZoneActionsInterval() {
                return Number(world.getDynamicProperty("andexdbSettings:protectedAreasZoneActionsInterval") ?? 5);
            },
            set protectedAreasZoneActionsInterval(protectedAreasZoneActionsInterval) {
                world.setDynamicProperty("andexdbSettings:protectedAreasZoneActionsInterval", Number.isNaN(Number(protectedAreasZoneActionsInterval)) ? 5 : Math.min(1000000, Math.max(1, Number(protectedAreasZoneActionsInterval ?? 5))));
            },
            get protectedAreasZoneRefreshInterval() {
                return Number(world.getDynamicProperty("andexdbSettings:protectedAreasZoneRefreshInterval") ?? 200);
            },
            set protectedAreasZoneRefreshInterval(protectedAreasZoneRefreshInterval) {
                world.setDynamicProperty("andexdbSettings:protectedAreasZoneRefreshInterval", Number.isNaN(Number(protectedAreasZoneRefreshInterval)) ? 200 : Math.min(1000000, Math.max(1, Number(protectedAreasZoneRefreshInterval ?? 200))));
            },
            /**
             * How often to check for banned players.
             *
             * Dynamic Property ID: `andexdbSettings:bannedPlayersRefreshRate`
             *
             * @default 20
             */
            get bannedPlayersRefreshRate() {
                return Number(world.getDynamicProperty("andexdbSettings:bannedPlayersRefreshRate") ?? 20);
            },
            set bannedPlayersRefreshRate(bannedPlayersRefreshRate) {
                world.setDynamicProperty("andexdbSettings:bannedPlayersRefreshRate", Number.isNaN(Number(bannedPlayersRefreshRate)) ? 20 : Math.min(1000, Math.max(1, Number(bannedPlayersRefreshRate ?? 20))));
            },
            /**
             * How long it has to be since the last ban refresh before the bans list will be automatically refreshed, when getting the bans list or checking if a player is banned.
             *
             * Dynamic Property ID: `andexdbSettings:bansMinimumAutoRefresh`
             *
             * @default 1000
             */
            get bansMinimumAutoRefresh() {
                return Number(world.getDynamicProperty("andexdbSettings:bansMinimumAutoRefresh") ?? 1000);
            },
            set bansMinimumAutoRefresh(bansMinimumAutoRefresh) {
                world.setDynamicProperty("andexdbSettings:bansMinimumAutoRefresh", Number.isNaN(Number(bansMinimumAutoRefresh)) ? 1000 : Number(bansMinimumAutoRefresh ?? 1000));
            },
            get debugMode() {
                return Boolean(world.getDynamicProperty("andexdbSettings:debugMode") ?? false);
            },
            set debugMode(debugMode) {
                world.setDynamicProperty("andexdbSettings:debugMode", debugMode ?? false);
            },
            /**
             * It is recommended to leave this set to false.
             */
            get allowWatchdogTerminationCrash() {
                return Boolean(world.getDynamicProperty("andexdbSettings:allowWatchdogTerminationCrash") ?? false);
            },
            set allowWatchdogTerminationCrash(allowWatchdogTerminationCrash) {
                world.setDynamicProperty("andexdbSettings:allowWatchdogTerminationCrash", allowWatchdogTerminationCrash ?? false);
            },
            /**
             * It is recommended to leave this set to false.
             */
            get hideWatchdogTerminationCrashEnabledWarningsOnStartup() {
                return Boolean(world.getDynamicProperty("andexdbSettings:hideWatchdogTerminationCrashEnabledWarningsOnStartup") ?? false);
            },
            set hideWatchdogTerminationCrashEnabledWarningsOnStartup(hideWatchdogTerminationCrashEnabledWarningsOnStartup) {
                world.setDynamicProperty("andexdbSettings:hideWatchdogTerminationCrashEnabledWarningsOnStartup", hideWatchdogTerminationCrashEnabledWarningsOnStartup ?? false);
            },
            get autoSavePlayerData() {
                return Boolean(world.getDynamicProperty("andexdbSettings:autoSavePlayerData") ?? true);
            },
            set autoSavePlayerData(autoSavePlayerData) {
                world.setDynamicProperty("andexdbSettings:autoSavePlayerData", autoSavePlayerData ?? true);
            },
            /**
             * It is recommended to leave this set to false.
             * @default false
             * @decorator
             * also
             * false
             */
            get useLegacyPlayerInventoryDataSaveSystem() {
                return Boolean(world.getDynamicProperty("andexdbSettings:useLegacyPlayerInventoryDataSaveSystem") ?? false);
            },
            set useLegacyPlayerInventoryDataSaveSystem(useLegacyPlayerInventoryDataSaveSystem) {
                world.setDynamicProperty("andexdbSettings:useLegacyPlayerInventoryDataSaveSystem", useLegacyPlayerInventoryDataSaveSystem ?? false);
            },
            get playerInventoryDataSaveSystemEnabled() {
                return Boolean(world.getDynamicProperty("andexdbSettings:playerInventoryDataSaveSystemEnabled") ?? true);
            },
            set playerInventoryDataSaveSystemEnabled(playerInventoryDataSaveSystemEnabled) {
                world.setDynamicProperty("andexdbSettings:playerInventoryDataSaveSystemEnabled", playerInventoryDataSaveSystemEnabled ?? true);
            },
            get spreadPlayerInventoryDataSavesOverMultipleTicks() {
                return Boolean(world.getDynamicProperty("andexdbSettings:spreadPlayerInventoryDataSavesOverMultipleTicks") ?? true);
            },
            set spreadPlayerInventoryDataSavesOverMultipleTicks(spreadPlayerInventoryDataSavesOverMultipleTicks) {
                world.setDynamicProperty("andexdbSettings:spreadPlayerInventoryDataSavesOverMultipleTicks", spreadPlayerInventoryDataSavesOverMultipleTicks ?? true);
            },
            get playerDataSavePerformanceMode() {
                return String(world.getDynamicProperty("andexdbSettings:playerDataSavePerformanceMode") ?? "full");
            },
            set playerDataSavePerformanceMode(playerDataSavePerformanceMode) {
                world.setDynamicProperty("andexdbSettings:playerDataSavePerformanceMode", playerDataSavePerformanceMode ?? "full");
            },
            get showEntityScaleNotFoundConsoleLog() {
                return Boolean(world.getDynamicProperty("andexdbSettings:showEntityScaleNotFoundConsoleLog") ?? true);
            },
            set showEntityScaleNotFoundConsoleLog(showEntityScaleNotFoundConsoleLog) {
                world.setDynamicProperty("andexdbSettings:showEntityScaleNotFoundConsoleLog", showEntityScaleNotFoundConsoleLog ?? true);
            },
            get showEntityScaleFoundConsoleLog() {
                return Boolean(world.getDynamicProperty("andexdbSettings:showEntityScaleFoundConsoleLog") ?? true);
            },
            set showEntityScaleFoundConsoleLog(showEntityScaleFoundConsoleLog) {
                world.setDynamicProperty("andexdbSettings:showEntityScaleFoundConsoleLog", showEntityScaleFoundConsoleLog ?? true);
            },
            get showEntityScaleNotFoundChatLog() {
                return Boolean(world.getDynamicProperty("andexdbSettings:showEntityScaleNotFoundChatLog") ?? false);
            },
            set showEntityScaleNotFoundChatLog(showEntityScaleNotFoundChatLog) {
                world.setDynamicProperty("andexdbSettings:showEntityScaleNotFoundChatLog", showEntityScaleNotFoundChatLog ?? false);
            },
            get showEntityScaleFoundChatLog() {
                return Boolean(world.getDynamicProperty("andexdbSettings:showEntityScaleFoundChatLog") ?? false);
            },
            set showEntityScaleFoundChatLog(showEntityScaleFoundChatLog) {
                world.setDynamicProperty("andexdbSettings:showEntityScaleFoundChatLog", showEntityScaleFoundChatLog ?? false);
            },
            get showBlueModsAnticheatNotFoundConsoleLog() {
                return Boolean(world.getDynamicProperty("andexdbSettings:showBlueModsAnticheatNotFoundConsoleLog") ?? true);
            },
            set showBlueModsAnticheatNotFoundConsoleLog(showBlueModsAnticheatNotFoundConsoleLog) {
                world.setDynamicProperty("andexdbSettings:showBlueModsAnticheatNotFoundConsoleLog", showBlueModsAnticheatNotFoundConsoleLog ?? true);
            },
            get showBlueModsAnticheatFoundConsoleLog() {
                return Boolean(world.getDynamicProperty("andexdbSettings:showBlueModsAnticheatFoundConsoleLog") ?? true);
            },
            set showBlueModsAnticheatFoundConsoleLog(showBlueModsAnticheatFoundConsoleLog) {
                world.setDynamicProperty("andexdbSettings:showBlueModsAnticheatFoundConsoleLog", showBlueModsAnticheatFoundConsoleLog ?? true);
            },
            get showBlueModsAnticheatNotFoundChatLog() {
                return Boolean(world.getDynamicProperty("andexdbSettings:showBlueModsAnticheatNotFoundChatLog") ?? false);
            },
            set showBlueModsAnticheatNotFoundChatLog(showBlueModsAnticheatNotFoundChatLog) {
                world.setDynamicProperty("andexdbSettings:showBlueModsAnticheatNotFoundChatLog", showBlueModsAnticheatNotFoundChatLog ?? false);
            },
            get showBlueModsAnticheatFoundChatLog() {
                return Boolean(world.getDynamicProperty("andexdbSettings:showBlueModsAnticheatFoundChatLog") ?? false);
            },
            set showBlueModsAnticheatFoundChatLog(showBlueModsAnticheatFoundChatLog) {
                world.setDynamicProperty("andexdbSettings:showBlueModsAnticheatFoundChatLog", showBlueModsAnticheatFoundChatLog ?? false);
            },
            /**
             * Sets whether or not the add-on is allowed to connect to and communicate with the entity scale add-on.
             * @warning It is HIGHLY DISCOURAGED to disable this option.
             */
            get allowConnectingToEntityScale() {
                return Boolean(world.getDynamicProperty("andexdbSettings:allowConnectingToEntityScale") ?? true);
            },
            set allowConnectingToEntityScale(allowConnectingToEntityScale) {
                world.setDynamicProperty("andexdbSettings:allowConnectingToEntityScale", allowConnectingToEntityScale ?? true);
            },
            /**
             * Sets whether or not the add-on is allowed to connect to and communicate with the BlueMods Anticheat add-on.
             * @warning It is HIGHLY DISCOURAGED to disable this option.
             */
            get allowConnectingToBlueModsAnticheat() {
                return Boolean(world.getDynamicProperty("andexdbSettings:allowConnectingToBlueModsAnticheat") ?? true);
            },
            set allowConnectingToBlueModsAnticheat(allowConnectingToBlueModsAnticheat) {
                world.setDynamicProperty("andexdbSettings:allowConnectingToBlueModsAnticheat", allowConnectingToBlueModsAnticheat ?? true);
            },
        };
    }
    static reset(subsection) {
        function resetProperties(obj) {
            const descriptors = Object.getOwnPropertyDescriptors(obj);
            for (const [key, descriptor] of Object.entries(descriptors)) {
                if (descriptor?.get && descriptor.set) {
                    obj[key] = undefined;
                }
                else if (descriptor?.get && typeof descriptor.get() === "object" && descriptor.get() !== null) {
                    resetProperties(descriptor.get());
                }
            }
        }
        resetProperties(subsection ?? config);
    }
    static applySettings(settings) {
        function applySettingsRecursive(settings, target) {
            for (const key in settings) {
                if (settings.hasOwnProperty(key)) {
                    const descriptor = Object.getOwnPropertyDescriptor(target, key);
                    if (descriptor?.get && descriptor.set) {
                        if (typeof settings[key] === "object" && settings[key] !== null && !Array.isArray(settings[key])) {
                            applySettingsRecursive(settings[key], target[key]);
                        }
                        else {
                            target[key] = settings[key];
                        }
                    }
                }
            }
        }
        applySettingsRecursive(settings, config);
    }
    static toJSON() {
        // modules.utils.filterProperties(modules.utils.filterProperties(config, ["addCommaSeparators", "spawnCommandAllowCrossDimensionalTeleport", "allowWatchdogTerminationCrash", "spawnCommandLocation", "allowChatEscapeCodes"], {}), ["toJSON"], {}).antiSpamSystem.antispamEnabled;
        return Object.fromEntries(Object.getOwnPropertyNames(config)
            .filter((n) => ![
            "constructor",
            "toString",
            "toLocaleString",
            "valueOf",
            "hasOwnProperty",
            "name",
            "prototype",
            "reset",
            "applySettings",
            "length",
            "toJSON",
        ].includes(n))
            .map((n) => [n, config[n]]));
    }
}
Object.defineProperties(globalThis, {
    config: {
        value: config,
        configurable: true,
        enumerable: true,
        writable: false,
    },
});
//# sourceMappingURL=config.js.map