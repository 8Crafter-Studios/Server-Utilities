import { world, StructureSaveMode, Dimension } from "@minecraft/server";
import { gwdp } from "init/functions/gwdp";
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
    /**
     * How long in seconds after getting damaged by another player that the player has to wait before they can teleport with commands such as `\spawn`, `\home`, `\gohome`, `\tpa`, and `\rtp`.
     *
     * It defaults to 0.
     */
    static get pvpCooldownToTeleport() {
        return isNaN(Number(world.getDynamicProperty("andexdbSettings:pvpCooldownToTeleport")))
            ? 0
            : Number(world.getDynamicProperty("andexdbSettings:pvpCooldownToTeleport") ?? 0);
    }
    static set pvpCooldownToTeleport(invalidChatCommandAction) {
        world.setDynamicProperty("andexdbSettings:pvpCooldownToTeleport", invalidChatCommandAction ?? 0);
    }
    static get undoClipboardMode() {
        return String(world.getDynamicProperty("andexdbSettings:undoClipboardMode") ?? StructureSaveMode.Memory);
    }
    static set undoClipboardMode(undoClipboardMode) {
        world.setDynamicProperty("andexdbSettings:undoClipboardMode", undoClipboardMode ?? StructureSaveMode.Memory);
    }
    static get spawnCommandLocation() {
        const v = tryget(() => JSON.parse(String(world.getDynamicProperty("andexdbSettings:spawnCommandLocation") ?? '{x: null, y: null, z: null, dimension: "overworld"}'))) ?? { x: null, y: null, z: null, dimension: "overworld" };
        return (tryget(() => ({
            x: v.x,
            y: v.y,
            z: v.z,
            dimension: dimensionsb[String(v.dimension)] ?? overworld,
        })) ?? { x: null, y: null, z: null, dimension: overworld });
    }
    static set spawnCommandLocation(spawnCommandLocation) {
        world.setDynamicProperty("andexdbSettings:spawnCommandLocation", JSON.stringify({
            x: spawnCommandLocation.x,
            y: spawnCommandLocation.y,
            z: spawnCommandLocation.z,
            dimension: spawnCommandLocation.dimension ?? overworld,
        }));
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
                        return (world.getDynamicProperty("andexdbShopSystemSettings:player.maxShopsPerPlayer") ?? 5).toString().toNumber();
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
    static get homeSystem() {
        return {
            get homeSystemEnabled() {
                return Boolean(world.getDynamicProperty("homeSystemSettings:homeSystemEnabled") ?? false);
            },
            set homeSystemEnabled(enabled) {
                world.setDynamicProperty("homeSystemSettings:homeSystemEnabled", enabled ?? false);
            },
            get maxHomesPerPlayer() {
                return world.getDynamicProperty("homeSystemSettings:maxHomesPerPlayer") == -1
                    ? Infinity
                    : Number(world.getDynamicProperty("homeSystemSettings:maxHomesPerPlayer") ?? Infinity);
            },
            set maxHomesPerPlayer(maxHomes) {
                world.setDynamicProperty("homeSystemSettings:maxHomesPerPlayer", (maxHomes ?? Infinity) == Infinity ? -1 : maxHomes);
            },
        };
    }
    static get tpaSystem() {
        return {
            get tpaSystemEnabled() {
                return Boolean(world.getDynamicProperty("tpaSystemSettings:tpaSystemEnabled") ?? world.getDynamicProperty("rtpSystemSettings:rtpSystemEnabled") ?? false);
            },
            set tpaSystemEnabled(enabled) {
                world.setDynamicProperty("tpaSystemSettings:tpaSystemEnabled", enabled ?? false);
            },
            /**
             * The number of seconds after a teleport request is sent before it will time out.
             */
            get timeoutDuration() {
                return isNaN(Number(world.getDynamicProperty("tpaSystemSettings:timeoutDuration")))
                    ? 60
                    : Number(world.getDynamicProperty("tpaSystemSettings:timeoutDuration") ?? 60);
            },
            set timeoutDuration(timeoutDuration) {
                world.setDynamicProperty("tpaSystemSettings:timeoutDuration", timeoutDuration ?? 60);
            },
        };
    }
    static get chatRanks() {
        return {
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
            get rankMode() {
                return String(world.getDynamicProperty("andexdbSettings:rankMode") ?? "custom_simple");
            },
            set rankMode(rankMode) {
                world.setDynamicProperty("andexdbSettings:rankMode", rankMode ?? "custom_simple");
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
             * The template string for individual ranks.
             */
            get rankTemplateString() {
                return String(world.getDynamicProperty("andexdbSettings:rankTemplateString") ?? "[${rank}§r]");
            },
            set rankTemplateString(rankTemplateString) {
                world.setDynamicProperty("andexdbSettings:rankTemplateString", rankTemplateString ?? "[${rank}§r]");
            },
            get messageTemplateString() {
                return String(world.getDynamicProperty("andexdbSettings:messageTemplateString") ??
                    '§r${timestampenabled?`[${timestamp}]`:""}${ranks}§r${(ranks!="")?" ":""}<${name}§r> ${message}');
            },
            set messageTemplateString(messageTemplateString) {
                world.setDynamicProperty("andexdbSettings:messageTemplateString", messageTemplateString ?? '§r${timestampenabled?`[${timestamp}]`:""}${ranks}§r${(ranks!="")?" ":""}<${name}§r> ${message}');
            },
            get nameTagTemplateString() {
                return String(world.getDynamicProperty("andexdbSettings:messageTemplateString") ??
                    '${(showDimension ? `[${dimension}§r§f] ` : "")}${rank} ${nameb}${(showHealth ? `§r§f[${currentHealth}/${maxHealth}] ` : "")}');
            },
            set nameTagTemplateString(messageTemplateString) {
                world.setDynamicProperty("andexdbSettings:messageTemplateString", messageTemplateString ?? '${(showDimension ? `[${dimension}§r§f] ` : "")}${rank} ${nameb}${(showHealth ? `§r§f[${currentHealth}/${maxHealth}] ` : "")}');
            },
            get defaultRankTemplateString() {
                return String(world.getDynamicProperty("andexdbSettings:defaultRankTemplateString") ?? "");
            },
            set defaultRankTemplateString(defaultRankTemplateString) {
                world.setDynamicProperty("andexdbSettings:defaultRankTemplateString", defaultRankTemplateString ?? "");
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
             * Default: false.
             *
             * Dynamic Property ID: andexdbSettings:moneySystem.useScoreboardBasedMoneySystem
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
             * Default: "andexdb:money".
             *
             * Dynamic Property ID: andexdbSettings:moneySystem.scoreboardName
             */
            get scoreboardName() {
                return String(world.getDynamicProperty("andexdbSettings:moneySystem.scoreboardName") ?? "andexdb:money");
            },
            set scoreboardName(enabled) {
                world.setDynamicProperty("andexdbSettings:moneySystem.scoreboardName", enabled ?? "andexdb:money");
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
            get main() {
                return {};
            },
            get pages() {
                return {
                    /**
                     * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
                     */
                    get maxPlayersPerManagePlayersPage() {
                        return Number(world.getDynamicProperty("andexdbSettings:maxPlayersPerManagePlayersPage") ?? 10);
                    },
                    set maxPlayersPerManagePlayersPage(maxPlayersPerManagePlayersPage) {
                        world.setDynamicProperty("andexdbSettings:maxPlayersPerManagePlayersPage", Math.min(1000, Math.max(1, maxPlayersPerManagePlayersPage ?? 10)));
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
            get protectedAreasRefreshRate() {
                return Number(world.getDynamicProperty("andexdbSettings:protectedAreasRefreshRate") ?? 200);
            },
            set protectedAreasRefreshRate(protectedAreasRefreshRate) {
                world.setDynamicProperty("andexdbSettings:protectedAreasRefreshRate", Number.isNaN(Number(protectedAreasRefreshRate)) ? 200 : Math.min(1000000, Math.max(1, Number(protectedAreasRefreshRate ?? 200))));
            },
            get bannedPlayersRefreshRate() {
                return Number(world.getDynamicProperty("andexdbSettings:bannedPlayersRefreshRate") ?? 20);
            },
            set bannedPlayersRefreshRate(bannedPlayersRefreshRate) {
                world.setDynamicProperty("andexdbSettings:bannedPlayersRefreshRate", Number.isNaN(Number(bannedPlayersRefreshRate)) ? 20 : Math.min(1000, Math.max(1, Number(bannedPlayersRefreshRate ?? 20))));
            },
            get debugMode() {
                return Boolean(world.getDynamicProperty("andexdbSettings:debugMode") ?? false);
            },
            set debugMode(debugMode) {
                world.setDynamicProperty("andexdbSettings:debugMode", debugMode ?? false);
            },
            /**
             * It is reccommended to leave this set to false.
             */
            get allowWatchdogTerminationCrash() {
                return Boolean(world.getDynamicProperty("andexdbSettings:allowWatchdogTerminationCrash") ?? false);
            },
            set allowWatchdogTerminationCrash(allowWatchdogTerminationCrash) {
                world.setDynamicProperty("andexdbSettings:allowWatchdogTerminationCrash", allowWatchdogTerminationCrash ?? false);
            },
            /**
             * It is reccommended to leave this set to false.
             */
            get hideWatchdogTerminationCrashEnabledWarningsOnStartup() {
                return Boolean(world.getDynamicProperty("andexdbSettings:hideWatchdogTerminationCrashEnabledWarningsOnStartup") ?? false);
            },
            set hideWatchdogTerminationCrashEnabledWarningsOnStartup(hideWatchdogTerminationCrashEnabledWarningsOnStartup) {
                world.setDynamicProperty("andexdbSettings:hideWatchdogTerminationCrashEnabledWarningsOnStartup", hideWatchdogTerminationCrashEnabledWarningsOnStartup ?? false);
            },
            /**
             * It is reccommended to leave this set to false.
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
        };
    }
    static reset() {
        // Object.entries(Object.getOwnPropertyDescriptors(this)).filter(v=>v[1].hasOwnProperty("get")).flatMap(v=>v[1].hasOwnProperty("set")?v[1]:v[1]["get"]())
    }
    static toJSON() {
        return Object.fromEntries(Object.getOwnPropertyNames(config)
            .filter((n) => !["constructor", "toString", "toLocaleString", "valueOf", "hasOwnProperty", "name", "prototype", "reset", "length"].includes(n))
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