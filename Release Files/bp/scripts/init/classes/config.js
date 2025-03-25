import { world, StructureSaveMode, Dimension } from "@minecraft/server";
import { gwdp } from "init/functions/gwdp";
import { defaultPlayerMenuLeaderboardStatistics } from "modules/ui/constants/defaultPlayerMenuLeaderboardStatistics";
import { menuButtonIds } from "modules/ui/constants/menuButtonIds";
var exports;
(function (exports) {
    /**
     * A class containing the configuration information for the add-on.
     * @hideconstructor
     */
    class config {
        /*
    @log
    @loggedMethod
    greet() {
        console.log(`Hello, my name is 1.`);
    }*/
        /**
         * Whether or not chat commands are enabled.
         *
         * Dynamic Property ID: `andexdbSettings:chatCommandsEnabled`
         *
         * @default true
         *
         * @danger Disabling this setting is highly discouraged.
         */
        static get chatCommandsEnabled() {
            return Boolean(world.getDynamicProperty("andexdbSettings:chatCommandsEnabled") ?? true);
        }
        static set chatCommandsEnabled(enabled) {
            world.setDynamicProperty("andexdbSettings:chatCommandsEnabled", enabled ?? true);
        }
        /**
         * The prefix for all built-in chat commands.
         *
         * Dynamic Property ID: `andexdbSettings:chatCommandPrefix`
         *
         * @default "\\"
         */
        static get chatCommandPrefix() {
            return String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\");
        }
        static set chatCommandPrefix(prefix) {
            world.setDynamicProperty("andexdbSettings:chatCommandPrefix", prefix ?? "\\");
        }
        /**
         * The list of command prefixes that the add-on will recognize and leave chat messages starting with those alone to allow other chat command add-ons to use them.
         *
         * Dynamic Property ID: `andexdbSettings:validChatCommandPrefixes`
         *
         * @default ""
         */
        static get validChatCommandPrefixes() {
            return String(world.getDynamicProperty("andexdbSettings:validChatCommandPrefixes") ?? "");
        }
        static set validChatCommandPrefixes(prefixes) {
            world.setDynamicProperty("andexdbSettings:validChatCommandPrefixes", prefixes ?? "");
        }
        /**
         * The action to take when an invalid chat command is entered.
         *
         * 0 = Do Nothing\
         * 1 = Send Message\
         * 2 = Cancel Message\
         * 3 = Warn Player
         *
         * Dynamic Property ID: `andexdbSettings:invalidChatCommandAction`
         *
         * @default 3
         */
        static get invalidChatCommandAction() {
            return isNaN(Number(world.getDynamicProperty("andexdbSettings:invalidChatCommandAction")))
                ? 3
                : Number(world.getDynamicProperty("andexdbSettings:invalidChatCommandAction") ?? 3);
        }
        static set invalidChatCommandAction(invalidChatCommandAction) {
            world.setDynamicProperty("andexdbSettings:invalidChatCommandAction", invalidChatCommandAction ?? 3);
        }
        /**
         * The save mode for the undo clipboard.
         *
         * Dynamic Property ID: `andexdbSettings:undoClipboardMode`
         *
         * @default "Memory"
         */
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
            const v = (world.getDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation") ?? {
                x: 1000000000,
                y: 100,
                z: 1000000000,
            });
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
         * Dynamic Property ID: `andexdbSettings:spawnCommandAllowCrossDimensionalTeleport`
         *
         * @default true
         */
        static get spawnCommandAllowCrossDimensionalTeleport() {
            return Boolean(world.getDynamicProperty("andexdbSettings:spawnCommandAllowCrossDimensionalTeleport") ?? true);
        }
        static set spawnCommandAllowCrossDimensionalTeleport(enabled) {
            world.setDynamicProperty("andexdbSettings:spawnCommandAllowCrossDimensionalTeleport", enabled ?? true);
        }
        /**
         * The world border settings.
         * @group Subclasses
         */
        static get worldBorder() {
            /**
             * The world border settings.
             * @hideconstructor
             * @nameOverride worldBorder
             * @parentOverride Globals.config
             * @group Subclasses
             */
            class config_worldBorder {
                /**
                 * The world border settings for the overworld.
                 * @group Subclasses
                 */
                static get overworld() {
                    /**
                     * The world border settings for the overworld.
                     * @hideconstructor
                     * @nameOverride overworld
                     * @parentOverride Globals.config.worldBorder:class
                     * @group Subclasses
                     */
                    class config_worldBorder_overworld {
                        static get enabled() {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.enabled") ?? false);
                        }
                        static set enabled(enabled) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.enabled", enabled ?? false);
                        }
                        static get from() {
                            return (tryget(() => JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.from") ?? "{x: -29999984, z: -29999984}"))) ?? { x: -29999984, z: -29999984 });
                        }
                        static set from(from) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.from", JSON.stringify(from ?? { x: -29999984, z: -29999984 }));
                        }
                        static get to() {
                            return (tryget(() => JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.to") ?? "{x: 29999984, z: 29999984}"))) ?? { x: 29999984, z: 29999984 });
                        }
                        static set to(to) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.to", JSON.stringify(to ?? { x: 29999984, z: 29999984 }));
                        }
                        static get mode() {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.mode") ?? 1);
                        }
                        static set mode(mode) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.mode", mode ?? 1);
                        }
                        static get damage() {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.damageMode.damage") ?? 1);
                        }
                        static set damage(damage) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.damageMode.damage", damage ?? 1);
                        }
                        static get knockbackH() {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.knockbackMode.knockbackH") ?? 2.5);
                        }
                        static set knockbackH(horizontalKnockback) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.knockbackMode.knockbackH", horizontalKnockback ?? 2.5);
                        }
                        static get knockbackV() {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.knockbackMode.knockbackV") ?? 1.25);
                        }
                        static set knockbackV(verticalKnockback) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.knockbackMode.knockbackV", verticalKnockback ?? 1.25);
                        }
                        static get preventWorldInteractionOutsideBorder() {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.preventWorldInteractionOutsideBorder") ?? false);
                        }
                        static set preventWorldInteractionOutsideBorder(preventWorldInteractionOutsideBorder) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.preventWorldInteractionOutsideBorder", preventWorldInteractionOutsideBorder ?? false);
                        }
                        static get tintIntensity() {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.tintIntensity") ?? 1);
                        }
                        static set tintIntensity(tintIntensity) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.tintIntensity", tintIntensity ?? 1);
                        }
                        /**
                         * d
                         * @todo
                         */
                        static get warnPlayersInChat() {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.warnPlayersInChat") ?? false);
                        }
                        /**
                         * c
                         * @todo
                         */
                        static set warnPlayersInChat(warnPlayersInChat) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.warnPlayersInChat", warnPlayersInChat ?? false);
                        }
                        /**
                         * b
                         * @todo
                         */
                        static get showActionbarWarningWhenOutsideBorder() {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.showActionbarWarningWhenOutsideBorder") ?? false);
                        }
                        /**
                         * a
                         * @todo
                         */
                        static set showActionbarWarningWhenOutsideBorder(showActionbarWarningWhenOutsideBorder) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.showActionbarWarningWhenOutsideBorder", showActionbarWarningWhenOutsideBorder ?? false);
                        }
                        static get showRedScreenOutlineWhenOutsideBorder() {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.showRedScreenOutlineWhenOutsideBorder") ?? true);
                        }
                        static set showRedScreenOutlineWhenOutsideBorder(showRedScreenOutlineWhenOutsideBorder) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.showRedScreenOutlineWhenOutsideBorder", showRedScreenOutlineWhenOutsideBorder ?? true);
                        }
                        static get showBorderParticles() {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.showBorderParticles") ?? true);
                        }
                        static set showBorderParticles(showBorderParticles) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.showBorderParticles", showBorderParticles ?? true);
                        }
                        /**
                         * @deprecated
                         */
                        static get useShadersCompatibleBorderParticles() {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.useShadersCompatibleBorderParticles") ?? false);
                        }
                        /**
                         * @deprecated
                         */
                        static set useShadersCompatibleBorderParticles(useShadersCompatibleBorderParticles) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.useShadersCompatibleBorderParticles", useShadersCompatibleBorderParticles ?? false);
                        }
                        static get buffer() {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.buffer") ?? 5);
                        }
                        static set buffer(buffer) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.buffer", buffer ?? 5);
                        }
                    }
                    return config_worldBorder_overworld;
                }
                /**
                 * The world border settings for the nether.
                 * @group Subclasses
                 */
                static get nether() {
                    /**
                     * The world border settings for the nether.
                     * @hideconstructor
                     * @nameOverride nether
                     * @parentOverride Globals.config.worldBorder:class
                     * @group Subclasses
                     */
                    class config_worldBorder_nether {
                        static get enabled() {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.enabled") ?? false);
                        }
                        static set enabled(enabled) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.enabled", enabled ?? false);
                        }
                        static get from() {
                            return (tryget(() => JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:nether.from") ?? "{x: -29999984, z: -29999984}"))) ?? { x: -29999984, z: -29999984 });
                        }
                        static set from(from) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.from", JSON.stringify(from ?? { x: -29999984, z: -29999984 }));
                        }
                        static get to() {
                            return (tryget(() => JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:nether.to") ?? "{x: 29999984, z: 29999984}"))) ?? { x: 29999984, z: 29999984 });
                        }
                        static set to(to) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.to", JSON.stringify(to ?? { x: 29999984, z: 29999984 }));
                        }
                        static get mode() {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.mode") ?? 1);
                        }
                        static set mode(mode) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.mode", mode ?? 1);
                        }
                        static get damage() {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.damageMode.damage") ?? 1);
                        }
                        static set damage(damage) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.damageMode.damage", damage ?? 1);
                        }
                        static get knockbackH() {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.knockbackMode.knockbackH") ?? 2.5);
                        }
                        static set knockbackH(horizontalKnockback) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.knockbackMode.knockbackH", horizontalKnockback ?? 2.5);
                        }
                        static get knockbackV() {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.knockbackMode.knockbackV") ?? 1.25);
                        }
                        static set knockbackV(verticalKnockback) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.knockbackMode.knockbackV", verticalKnockback ?? 1.25);
                        }
                        static get preventWorldInteractionOutsideBorder() {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.preventWorldInteractionOutsideBorder") ?? false);
                        }
                        static set preventWorldInteractionOutsideBorder(preventWorldInteractionOutsideBorder) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.preventWorldInteractionOutsideBorder", preventWorldInteractionOutsideBorder ?? false);
                        }
                        static get tintIntensity() {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.tintIntensity") ?? 1);
                        }
                        static set tintIntensity(tintIntensity) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.tintIntensity", tintIntensity ?? 1);
                        }
                        /**
                         * @todo
                         */
                        static get warnPlayersInChat() {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.warnPlayersInChat") ?? false);
                        }
                        /**
                         * @todo
                         */
                        static set warnPlayersInChat(warnPlayersInChat) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.warnPlayersInChat", warnPlayersInChat ?? false);
                        }
                        /**
                         * @todo
                         */
                        static get showActionbarWarningWhenOutsideBorder() {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.showActionbarWarningWhenOutsideBorder") ?? false);
                        }
                        /**
                         * @todo
                         */
                        static set showActionbarWarningWhenOutsideBorder(showActionbarWarningWhenOutsideBorder) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.showActionbarWarningWhenOutsideBorder", showActionbarWarningWhenOutsideBorder ?? false);
                        }
                        static get showRedScreenOutlineWhenOutsideBorder() {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.showRedScreenOutlineWhenOutsideBorder") ?? true);
                        }
                        static set showRedScreenOutlineWhenOutsideBorder(showRedScreenOutlineWhenOutsideBorder) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.showRedScreenOutlineWhenOutsideBorder", showRedScreenOutlineWhenOutsideBorder ?? true);
                        }
                        static get showBorderParticles() {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.showBorderParticles") ?? true);
                        }
                        static set showBorderParticles(showBorderParticles) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.showBorderParticles", showBorderParticles ?? true);
                        }
                        /**
                         * @deprecated
                         */
                        static get useShadersCompatibleBorderParticles() {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.useShadersCompatibleBorderParticles") ?? false);
                        }
                        /**
                         * @deprecated
                         */
                        static set useShadersCompatibleBorderParticles(useShadersCompatibleBorderParticles) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.useShadersCompatibleBorderParticles", useShadersCompatibleBorderParticles ?? false);
                        }
                        static get buffer() {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.buffer") ?? 5);
                        }
                        static set buffer(buffer) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.buffer", buffer ?? 5);
                        }
                    }
                    return config_worldBorder_nether;
                }
                /**
                 * The world border settings for the end.
                 * @group Subclasses
                 */
                static get the_end() {
                    /**
                     * The world border settings for the end.
                     * @hideconstructor
                     * @nameOverride the_end
                     * @parentOverride Globals.config.worldBorder:class
                     * @group Subclasses
                     */
                    class config_worldBorder_the_end {
                        static get enabled() {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.enabled") ?? false);
                        }
                        static set enabled(enabled) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.enabled", enabled ?? false);
                        }
                        static get from() {
                            return (tryget(() => JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.from") ?? "{x: -29999984, z: -29999984}"))) ?? { x: -29999984, z: -29999984 });
                        }
                        static set from(from) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.from", JSON.stringify(from ?? { x: -29999984, z: -29999984 }));
                        }
                        static get to() {
                            return (tryget(() => JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.to") ?? "{x: 29999984, z: 29999984}"))) ?? { x: 29999984, z: 29999984 });
                        }
                        static set to(to) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.to", JSON.stringify(to ?? { x: 29999984, z: 29999984 }));
                        }
                        static get mode() {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.mode") ?? 1);
                        }
                        static set mode(mode) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.mode", mode ?? 1);
                        }
                        static get damage() {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.damageMode.damage") ?? 1);
                        }
                        static set damage(damage) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.damageMode.damage", damage ?? 1);
                        }
                        static get knockbackH() {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.knockbackMode.knockbackH") ?? 2.5);
                        }
                        static set knockbackH(horizontalKnockback) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.knockbackMode.knockbackH", horizontalKnockback ?? 2.5);
                        }
                        static get knockbackV() {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.knockbackMode.knockbackV") ?? 1.25);
                        }
                        static set knockbackV(verticalKnockback) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.knockbackMode.knockbackV", verticalKnockback ?? 1.25);
                        }
                        static get preventWorldInteractionOutsideBorder() {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.preventWorldInteractionOutsideBorder") ?? false);
                        }
                        static set preventWorldInteractionOutsideBorder(preventWorldInteractionOutsideBorder) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.preventWorldInteractionOutsideBorder", preventWorldInteractionOutsideBorder ?? false);
                        }
                        static get tintIntensity() {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.tintIntensity") ?? 1);
                        }
                        static set tintIntensity(tintIntensity) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.tintIntensity", tintIntensity ?? 1);
                        }
                        /**
                         * @todo
                         */
                        static get warnPlayersInChat() {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.warnPlayersInChat") ?? false);
                        }
                        /**
                         * @todo
                         */
                        static set warnPlayersInChat(warnPlayersInChat) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.warnPlayersInChat", warnPlayersInChat ?? false);
                        }
                        /**
                         * @todo
                         */
                        static get showActionbarWarningWhenOutsideBorder() {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.showActionbarWarningWhenOutsideBorder") ?? false);
                        }
                        /**
                         * @todo
                         */
                        static set showActionbarWarningWhenOutsideBorder(showActionbarWarningWhenOutsideBorder) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.showActionbarWarningWhenOutsideBorder", showActionbarWarningWhenOutsideBorder ?? false);
                        }
                        static get showRedScreenOutlineWhenOutsideBorder() {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.showRedScreenOutlineWhenOutsideBorder") ?? true);
                        }
                        static set showRedScreenOutlineWhenOutsideBorder(showRedScreenOutlineWhenOutsideBorder) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.showRedScreenOutlineWhenOutsideBorder", showRedScreenOutlineWhenOutsideBorder ?? true);
                        }
                        static get showBorderParticles() {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.showBorderParticles") ?? true);
                        }
                        static set showBorderParticles(showBorderParticles) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.showBorderParticles", showBorderParticles ?? true);
                        }
                        /**
                         * @deprecated
                         */
                        static get useShadersCompatibleBorderParticles() {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.useShadersCompatibleBorderParticles") ?? false);
                        }
                        /**
                         * @deprecated
                         */
                        static set useShadersCompatibleBorderParticles(useShadersCompatibleBorderParticles) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.useShadersCompatibleBorderParticles", useShadersCompatibleBorderParticles ?? false);
                        }
                        static get buffer() {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.buffer") ?? 5);
                        }
                        static set buffer(buffer) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.buffer", buffer ?? 5);
                        }
                    }
                    return config_worldBorder_the_end;
                }
            }
            return config_worldBorder;
        }
        /**
         * The shop system settings.
         * @group Subclasses
         */
        static get shopSystem() {
            /**
             * The shop system settings.
             * @hideconstructor
             * @nameOverride shopSystem
             * @parentOverride Globals.config
             * @group Subclasses
             */
            class config_shopSystem {
                /**
                 * The server shop system settings.
                 * @group Subclasses
                 */
                static get server() {
                    /**
                     * The server shop system settings.
                     * @hideconstructor
                     * @nameOverride server
                     * @parentOverride Globals.config.shopSystem:class
                     * @group Subclasses
                     */
                    class config_shopSystem_server {
                        /**
                         * Whether or not the server shop system is enabled.
                         *
                         * Dynamic Property ID: `andexdbShopSystemSettings:server.enabled`
                         *
                         * @default false
                         */
                        static get enabled() {
                            return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:server.enabled") ?? false);
                        }
                        static set enabled(enabled) {
                            world.setDynamicProperty("andexdbShopSystemSettings:server.enabled", enabled ?? false);
                        }
                    }
                    return config_shopSystem_server;
                }
                /**
                 * The player shop system settings.
                 * @group Subclasses
                 */
                static get player() {
                    /**
                     * The player shop system settings.
                     * @hideconstructor
                     * @nameOverride player
                     * @parentOverride Globals.config.shopSystem:class
                     * @group Subclasses
                     */
                    class config_shopSystem_player {
                        /**
                         * Whether or not the player shop system is enabled.
                         *
                         * Dynamic Property ID: `andexdbShopSystemSettings:player.enabled`
                         *
                         * @default false
                         */
                        static get enabled() {
                            return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:player.enabled") ?? false);
                        }
                        static set enabled(enabled) {
                            world.setDynamicProperty("andexdbShopSystemSettings:player.enabled", enabled ?? false);
                        }
                        /**
                         * The maximum amount of shops a player can have.
                         *
                         * Dynamic Property ID: `andexdbShopSystemSettings:player.maxShopsPerPlayer`
                         *
                         * @default 5
                         */
                        static get maxShopsPerPlayer() {
                            return (world.getDynamicProperty("andexdbShopSystemSettings:player.maxShopsPerPlayer") ?? 5).toString().toNumber() ?? 5;
                        }
                        static set maxShopsPerPlayer(maxShopsPerPlayer) {
                            world.setDynamicProperty("andexdbShopSystemSettings:player.maxShopsPerPlayer", maxShopsPerPlayer ?? 5);
                        }
                        /**
                         * Whether or not players can sell items that are locked to a specific slot in their inventory.
                         *
                         * Dynamic Property ID: `andexdbShopSystemSettings:player.allowSellingLockInSlotItems`
                         *
                         * @default false
                         */
                        static get allowSellingLockInSlotItems() {
                            return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:player.allowSellingLockInSlotItems") ?? false);
                        }
                        static set allowSellingLockInSlotItems(allowSellingLockInSlotItems) {
                            world.setDynamicProperty("andexdbShopSystemSettings:player.allowSellingLockInSlotItems", allowSellingLockInSlotItems ?? false);
                        }
                        /**
                         * Whether or not players can sell items that are locked to inventory.
                         *
                         * Dynamic Property ID: `andexdbShopSystemSettings:player.allowSellingLockInInventoryItems`
                         *
                         * @default false
                         */
                        static get allowSellingLockInInventoryItems() {
                            return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:player.allowSellingLockInInventoryItems") ?? false);
                        }
                        static set allowSellingLockInInventoryItems(allowSellingLockInInventoryItems) {
                            world.setDynamicProperty("andexdbShopSystemSettings:player.allowSellingLockInInventoryItems", allowSellingLockInInventoryItems ?? false);
                        }
                        /**
                         * Whether or not players can sell items that have the keepOnDeath component set to true.
                         *
                         * Dynamic Property ID: `andexdbShopSystemSettings:player.allowSellingKeepOnDeathItems`
                         *
                         * @default true
                         */
                        static get allowSellingKeepOnDeathItems() {
                            return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:player.allowSellingKeepOnDeathItems") ?? true);
                        }
                        static set allowSellingKeepOnDeathItems(allowSellingKeepOnDeathItems) {
                            world.setDynamicProperty("andexdbShopSystemSettings:player.allowSellingKeepOnDeathItems", allowSellingKeepOnDeathItems ?? true);
                        }
                    }
                    return config_shopSystem_player;
                }
                /**
                 * The sign shop system settings.
                 * @alpha
                 * @unused The sign shop system has not been implemented yet.
                 * @group Subclasses
                 */
                static get sign() {
                    /**
                     * The sign shop system settings.
                     * @hideconstructor
                     * @nameOverride sign
                     * @parentOverride Globals.config.shopSystem:class
                     * @alpha
                     * @unused
                     * @group Subclasses
                     */
                    class config_shopSystem_sign {
                        /**
                         * Whether or not the sign shop system is enabled.
                         *
                         * Dynamic Property ID: `andexdbShopSystemSettings:sign.enabled`
                         *
                         * @alpha
                         * @unused
                         *
                         * @default false
                         */
                        static get enabled() {
                            return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:sign.enabled") ?? false);
                        }
                        static set enabled(enabled) {
                            world.setDynamicProperty("andexdbShopSystemSettings:sign.enabled", enabled ?? false);
                        }
                    }
                    return config_shopSystem_sign;
                }
            }
            return config_shopSystem;
        }
        /**
         * The settings for all teleportation related systems, features, and commands of that add-on that are available to regular players.
         * @group Subclasses
         */
        static get teleportSystems() {
            /**
             * The settings for all teleportation related systems, features, and commands of that add-on that are available to regular players.
             * @hideconstructor
             * @nameOverride teleportSystems
             * @parentOverride Globals.config
             * @group Subclasses
             */
            class config_teleportSystems {
                /**
                 * Whether or not cross-dimensional teleports are allowed.
                 *
                 * Affects all types of teleports that regular players can use, including but not limited to the home system, TPA system, and the `\spawn` command.
                 *
                 * Overrides the `allowCrossDimensionalTeleport` options for the home system, TPA system, and `\spawn` command.
                 *
                 * Dynamic Property ID: `teleportSystemsSettings:allowCrossDimensionalTeleport`
                 *
                 * @default true
                 */
                static get allowCrossDimensionalTeleport() {
                    return Boolean(world.getDynamicProperty("teleportSystemsSettings:allowCrossDimensionalTeleport") ?? true);
                }
                static set allowCrossDimensionalTeleport(enabled) {
                    world.setDynamicProperty("teleportSystemsSettings:allowCrossDimensionalTeleport", enabled ?? true);
                }
                /**
                 * How long in seconds after teleporting that the player has to wait before they can teleport again.
                 *
                 * Set it to 0 to have no teleport cooldown.
                 *
                 * Dynamic Property ID: `homeSystemSettings:teleportCooldown`
                 *
                 * @default 30
                 */
                static get teleportCooldown() {
                    return Number(world.getDynamicProperty("homeSystemSettings:teleportCooldown") ?? 30);
                }
                static set teleportCooldown(maxHomes) {
                    world.setDynamicProperty("homeSystemSettings:teleportCooldown", maxHomes ?? 30);
                }
                /**
                 * How long in seconds that the player has to stand still before they can teleport, if they move during this time period, the teleportation is canceled.
                 *
                 * Set it to 0 to have players teleport instantly.
                 *
                 * Dynamic Property ID: `homeSystemSettings:standStillTimeToTeleport`
                 *
                 * @default 5
                 */
                static get standStillTimeToTeleport() {
                    return Number(world.getDynamicProperty("homeSystemSettings:standStillTimeToTeleport") ?? 5);
                }
                static set standStillTimeToTeleport(maxHomes) {
                    world.setDynamicProperty("homeSystemSettings:standStillTimeToTeleport", maxHomes ?? 5);
                }
                /**
                 * How long in seconds after getting damaged by another player that the player has to wait before they can teleport with the player menu or commands such as `\spawn`, `\home`, `\gohome`, `\tpa`, and `\rtp`.
                 *
                 * Set it to 0 to have no PVP cooldown.
                 *
                 * Dynamic Property ID: `andexdbSettings:pvpCooldownToTeleport`
                 *
                 * @default 15
                 */
                static get pvpCooldownToTeleport() {
                    return isNaN(Number(world.getDynamicProperty("andexdbSettings:pvpCooldownToTeleport")))
                        ? 15
                        : Number(world.getDynamicProperty("andexdbSettings:pvpCooldownToTeleport") ?? 15);
                }
                static set pvpCooldownToTeleport(invalidChatCommandAction) {
                    world.setDynamicProperty("andexdbSettings:pvpCooldownToTeleport", invalidChatCommandAction ?? 15);
                }
            }
            return config_teleportSystems;
        }
        /**
         * The home system settings.
         * @group Subclasses
         */
        static get homeSystem() {
            /**
             * The home system settings.
             * @hideconstructor
             * @nameOverride homeSystem
             * @parentOverride Globals.config
             * @group Subclasses
             */
            class config_homeSystem {
                /**
                 * Whether or not the home system is enabled.
                 *
                 * Dynamic Property ID: `homeSystemSettings:homeSystemEnabled`
                 *
                 * @default true
                 */
                static get homeSystemEnabled() {
                    return Boolean(world.getDynamicProperty("homeSystemSettings:homeSystemEnabled") ?? true);
                }
                static set homeSystemEnabled(enabled) {
                    world.setDynamicProperty("homeSystemSettings:homeSystemEnabled", enabled ?? true);
                }
                /**
                 * The maximum number of homes a player can have.
                 *
                 * Dynamic Property ID: `homeSystemSettings:maxHomesPerPlayer`
                 *
                 * @default Infinity
                 */
                static get maxHomesPerPlayer() {
                    return world.getDynamicProperty("homeSystemSettings:maxHomesPerPlayer") == -1
                        ? Infinity
                        : Number(world.getDynamicProperty("homeSystemSettings:maxHomesPerPlayer") ?? Infinity);
                }
                static set maxHomesPerPlayer(maxHomes) {
                    world.setDynamicProperty("homeSystemSettings:maxHomesPerPlayer", (maxHomes ?? Infinity) == Infinity ? -1 : maxHomes);
                }
                /**
                 * Whether or not you can teleport to a home that is in a different dimension than you.
                 *
                 * Dynamic Property ID: `homeSystemSettings:allowCrossDimensionalTeleport`
                 *
                 * @default true
                 */
                static get allowCrossDimensionalTeleport() {
                    return Boolean(world.getDynamicProperty("homeSystemSettings:allowCrossDimensionalTeleport") ?? true);
                }
                static set allowCrossDimensionalTeleport(enabled) {
                    world.setDynamicProperty("homeSystemSettings:allowCrossDimensionalTeleport", enabled ?? true);
                }
                /**
                 * Whether or not homes are allowed in dimensions other than the overworld.
                 *
                 * Dynamic Property ID: `homeSystemSettings:allowHomesInOtherDimensions`
                 *
                 * @default true
                 */
                static get allowHomesInOtherDimensions() {
                    return Boolean(world.getDynamicProperty("homeSystemSettings:allowHomesInOtherDimensions") ?? true);
                }
                static set allowHomesInOtherDimensions(enabled) {
                    world.setDynamicProperty("homeSystemSettings:allowHomesInOtherDimensions", enabled ?? true);
                }
            }
            return config_homeSystem;
        }
        /**
         * The teleport request system settings.
         * @group Subclasses
         */
        static get tpaSystem() {
            /**
             * The teleport request system settings.
             * @hideconstructor
             * @nameOverride tpaSystem
             * @parentOverride Globals.config
             * @group Subclasses
             */
            class config_tpaSystem {
                /**
                 * Whether or not the teleport request system is enabled.
                 *
                 * Dynamic Property ID: `tpaSystemSettings:tpaSystemEnabled`
                 *
                 * @default true
                 */
                static get tpaSystemEnabled() {
                    return Boolean(world.getDynamicProperty("tpaSystemSettings:tpaSystemEnabled") ?? world.getDynamicProperty("rtpSystemSettings:rtpSystemEnabled") ?? true);
                }
                static set tpaSystemEnabled(enabled) {
                    world.setDynamicProperty("tpaSystemSettings:tpaSystemEnabled", enabled ?? true);
                }
                /**
                 * The number of seconds after a teleport request is sent before it will time out.
                 *
                 * Dynamic Property ID: `tpaSystemSettings:timeoutDuration`
                 *
                 * @default 60
                 */
                static get timeoutDuration() {
                    return isNaN(Number(world.getDynamicProperty("tpaSystemSettings:timeoutDuration")))
                        ? 60
                        : Number(world.getDynamicProperty("tpaSystemSettings:timeoutDuration") ?? 60);
                }
                static set timeoutDuration(timeoutDuration) {
                    world.setDynamicProperty("tpaSystemSettings:timeoutDuration", timeoutDuration ?? 60);
                }
                /**
                 * Whether or not you can teleport to a player who is in a different dimension than you.
                 *
                 * Dynamic Property ID: `tpaSystemSettings:allowCrossDimensionalTeleport`
                 *
                 * @default true
                 */
                static get allowCrossDimensionalTeleport() {
                    return Boolean(world.getDynamicProperty("tpaSystemSettings:allowCrossDimensionalTeleport") ?? true);
                }
                static set allowCrossDimensionalTeleport(enabled) {
                    world.setDynamicProperty("tpaSystemSettings:allowCrossDimensionalTeleport", enabled ?? true);
                }
            }
            return config_tpaSystem;
        }
        /**
         * The chat and name tags settings.
         * @group Subclasses
         */
        static get chatRanks() {
            /**
             * The chat and name tags settings.
             * @hideconstructor
             * @nameOverride chatRanks
             * @parentOverride Globals.config
             * @group Subclasses
             */
            class config_chatRanks {
                static get chatRankPrefix() {
                    return String(world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:");
                }
                static set chatRankPrefix(chatRankPrefix) {
                    world.setDynamicProperty("andexdbSettings:chatRankPrefix", chatRankPrefix ?? "rank:");
                }
                static get chatSudoPrefix() {
                    return String(world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:");
                }
                static set chatSudoPrefix(chatSudoPrefix) {
                    world.setDynamicProperty("andexdbSettings:chatSudoPrefix", chatSudoPrefix ?? "sudo:");
                }
                static get chatDisplayTimeStamp() {
                    return Boolean(world.getDynamicProperty("andexdbSettings:chatDisplayTimeStamp") ?? false);
                }
                static set chatDisplayTimeStamp(chatDisplayTimeStampEnabled) {
                    world.setDynamicProperty("andexdbSettings:chatDisplayTimeStamp", chatDisplayTimeStampEnabled ?? false);
                }
                static get showRanksOnPlayerNameTags() {
                    return Boolean(world.getDynamicProperty("andexdbSettings:showRanksOnPlayerNameTags") ?? false);
                }
                static set showRanksOnPlayerNameTags(showRanksOnPlayerNameTags) {
                    world.setDynamicProperty("andexdbSettings:showRanksOnPlayerNameTags", showRanksOnPlayerNameTags ?? false);
                }
                static get showHealthOnPlayerNameTags() {
                    return Boolean(world.getDynamicProperty("andexdbSettings:showHealthOnPlayerNameTags") ?? false);
                }
                static set showHealthOnPlayerNameTags(showHealthOnPlayerNameTags) {
                    world.setDynamicProperty("andexdbSettings:showHealthOnPlayerNameTags", showHealthOnPlayerNameTags ?? false);
                }
                /**
                 * The maximum number of decimal places to display on the health display on player name tags.
                 *
                 * Must be between 0 and 20 (inclusive).
                 *
                 * Dynamic Property ID: `andexdbSettings:playerNameTagHealthPrecision`
                 *
                 * @default 1
                 */
                static get playerNameTagHealthPrecision() {
                    return Math.min(Math.max(0, String(world.getDynamicProperty("andexdbSettings:playerNameTagHealthPrecision") ?? 1).toNumber()), 20);
                }
                static set playerNameTagHealthPrecision(playerNameTagHealthPrecision) {
                    world.setDynamicProperty("andexdbSettings:playerNameTagHealthPrecision", Math.min(Math.max(0, typeof playerNameTagHealthPrecision === "number" ? playerNameTagHealthPrecision.isFinite() ? playerNameTagHealthPrecision : 1 : 1), 20));
                }
                static get rankMode() {
                    return String(world.getDynamicProperty("andexdbSettings:rankMode") ?? "custom_simple");
                }
                static set rankMode(rankMode) {
                    world.setDynamicProperty("andexdbSettings:rankMode", rankMode ?? "custom_simple");
                }
                static get rankEvaluatorMode_chat() {
                    return String(world.getDynamicProperty("andexdbSettings:rankEvaluatorMode_chat") ?? "default");
                }
                static set rankEvaluatorMode_chat(rankEvaluatorMode_chat) {
                    world.setDynamicProperty("andexdbSettings:rankEvaluatorMode_chat", rankEvaluatorMode_chat ?? "default");
                }
                static get rankEvaluatorMode_nameTags() {
                    return String(world.getDynamicProperty("andexdbSettings:rankEvaluatorMode_nameTags") ?? "default");
                }
                static set rankEvaluatorMode_nameTags(rankEvaluatorMode_nameTags) {
                    world.setDynamicProperty("andexdbSettings:rankEvaluatorMode_nameTags", rankEvaluatorMode_nameTags ?? "default");
                }
                static get rankDisplayPrefix() {
                    return String(world.getDynamicProperty("andexdbSettings:rankDisplayPrefix") ?? "[");
                }
                static set rankDisplayPrefix(rankDisplayPrefix) {
                    world.setDynamicProperty("andexdbSettings:rankDisplayPrefix", rankDisplayPrefix ?? "[");
                }
                static get rankDisplaySuffix() {
                    return String(world.getDynamicProperty("andexdbSettings:rankDisplaySuffix") ?? "§r]");
                }
                static set rankDisplaySuffix(rankDisplaySuffix) {
                    world.setDynamicProperty("andexdbSettings:rankDisplaySuffix", rankDisplaySuffix ?? "§r]");
                }
                static get nameDisplayPrefix() {
                    return String(world.getDynamicProperty("andexdbSettings:nameDisplayPrefix") ?? "[");
                }
                static set nameDisplayPrefix(nameDisplayPrefix) {
                    world.setDynamicProperty("andexdbSettings:nameDisplayPrefix", nameDisplayPrefix ?? "<");
                }
                static get nameDisplaySuffix() {
                    return String(world.getDynamicProperty("andexdbSettings:nameDisplaySuffix") ?? "§r]");
                }
                static set nameDisplaySuffix(nameDisplaySuffix) {
                    world.setDynamicProperty("andexdbSettings:nameDisplaySuffix", nameDisplaySuffix ?? "§r>");
                }
                static get chatNameAndMessageSeparator() {
                    return String(world.getDynamicProperty("andexdbSettings:chatNameAndMessageSeparator") ?? " ");
                }
                static set chatNameAndMessageSeparator(chatNameAndMessageSeparator) {
                    world.setDynamicProperty("andexdbSettings:chatNameAndMessageSeparator", chatNameAndMessageSeparator ?? " ");
                }
                static get rankDisplaySeparator() {
                    return String(world.getDynamicProperty("andexdbSettings:rankDisplaySeparator") ?? " ");
                }
                static set rankDisplaySeparator(rankDisplaySeparator) {
                    world.setDynamicProperty("andexdbSettings:rankDisplaySeparator", rankDisplaySeparator ?? " ");
                }
                /**
                 * The template string for displaying a player's dimension in the chat.
                 *
                 * Only applies in Custom(Advanced) mode.
                 *
                 * @todo
                 *
                 * @default "[${dimension}§r] "
                 */
                static get chatDimensionTemplateString() {
                    return String(world.getDynamicProperty("andexdbSettings:chatDimensionTemplateString") ?? "[${dimension}§r] ");
                }
                static set chatDimensionTemplateString(chatDimensionTemplateString) {
                    world.setDynamicProperty("andexdbSettings:chatDimensionTemplateString", chatDimensionTemplateString ?? "[${dimension}§r] ");
                }
                /**
                 * The template string for individual ranks.
                 *
                 * @default "[${rank}§r]"
                 */
                static get rankTemplateString() {
                    return String(world.getDynamicProperty("andexdbSettings:rankTemplateString") ?? "[${rank}§r]");
                }
                static set rankTemplateString(rankTemplateString) {
                    world.setDynamicProperty("andexdbSettings:rankTemplateString", rankTemplateString ?? "[${rank}§r]");
                }
                static get messageTemplateString() {
                    return String(world.getDynamicProperty("andexdbSettings:messageTemplateString") ??
                        '${(showDimension ? `[${dimension}§r] ` : "")}${timestampenabled?`[${timestamp}] `:""}${ranks}§r${(ranks!="")?" ":""}<${name}§r> ${message}');
                }
                static set messageTemplateString(messageTemplateString) {
                    world.setDynamicProperty("andexdbSettings:messageTemplateString", messageTemplateString ??
                        '${(showDimension ? `[${dimension}§r] ` : "")}${timestampenabled?`[${timestamp}] `:""}${ranks}§r${(ranks!="")?" ":""}<${name}§r> ${message}');
                }
                static get nameTagTemplateString() {
                    return String(world.getDynamicProperty("andexdbSettings:nameTagTemplateString") ??
                        '${rank} ${nameFormatting}${name}${(showHealth ? `§r§f [${currentHealth}/${maxHealth}]` : "")}');
                }
                static set nameTagTemplateString(nameTagTemplateString) {
                    world.setDynamicProperty("andexdbSettings:nameTagTemplateString", nameTagTemplateString ?? '${rank} ${nameFormatting}${name}${(showHealth ? `§r§f [${currentHealth}/${maxHealth}]` : "")}');
                }
                static get defaultRank() {
                    return String(world.getDynamicProperty("andexdbSettings:defaultRank") ?? "§bMember§r");
                }
                static set defaultRank(defaultRank) {
                    world.setDynamicProperty("andexdbSettings:defaultRank", defaultRank ?? "§bMember§r");
                }
                static get defaultMessageFormatting() {
                    return String(world.getDynamicProperty("andexdbSettings:defaultMessageFormatting") ?? "");
                }
                static set defaultMessageFormatting(defaultMessageFormatting) {
                    world.setDynamicProperty("andexdbSettings:defaultMessageFormatting", defaultMessageFormatting ?? "");
                }
                static get defaultNameFormatting() {
                    return String(world.getDynamicProperty("andexdbSettings:defaultNameFormatting") ?? "");
                }
                static set defaultNameFormatting(defaultNameFormatting) {
                    world.setDynamicProperty("andexdbSettings:defaultNameFormatting", defaultNameFormatting ?? "");
                }
                static get defaultSeparatorFormatting() {
                    return String(world.getDynamicProperty("andexdbSettings:defaultSeparatorFormatting") ?? "");
                }
                static set defaultSeparatorFormatting(defaultSeparatorFormatting) {
                    world.setDynamicProperty("andexdbSettings:defaultSeparatorFormatting", defaultSeparatorFormatting ?? "");
                }
                static get disableCustomChatMessages() {
                    return Boolean(world.getDynamicProperty("andexdbSettings:disableCustomChatMessages") ?? false);
                }
                static set disableCustomChatMessages(disableCustomChatMessages) {
                    world.setDynamicProperty("andexdbSettings:disableCustomChatMessages", disableCustomChatMessages ?? false);
                }
                static get allowCustomChatMessagesMuting() {
                    return Boolean(world.getDynamicProperty("andexdbSettings:allowCustomChatMessagesMuting") ?? false);
                }
                static set allowCustomChatMessagesMuting(allowCustomChatMessagesMuting) {
                    world.setDynamicProperty("andexdbSettings:showRanksOnPlayerNameTags", allowCustomChatMessagesMuting ?? false);
                }
                static get autoEscapeChatMessages() {
                    return Boolean(world.getDynamicProperty("andexdbSettings:autoEscapeChatMessages") ?? false);
                }
                static set autoEscapeChatMessages(autoEscapeChatMessages) {
                    world.setDynamicProperty("andexdbSettings:autoEscapeChatMessages", autoEscapeChatMessages ?? false);
                }
                static get autoURIEscapeChatMessages() {
                    return Boolean(world.getDynamicProperty("andexdbSettings:autoURIEscapeChatMessages") ?? false);
                }
                static set autoURIEscapeChatMessages(autoURIEscapeChatMessages) {
                    world.setDynamicProperty("andexdbSettings:autoURIEscapeChatMessages", autoURIEscapeChatMessages ?? false);
                }
                static get allowChatEscapeCodes() {
                    return Boolean(world.getDynamicProperty("andexdbSettings:allowChatEscapeCodes") ?? false);
                }
                static set allowChatEscapeCodes(allowChatEscapeCodes) {
                    world.setDynamicProperty("andexdbSettings:allowChatEscapeCodes", allowChatEscapeCodes ?? false);
                }
            }
            return config_chatRanks;
        }
        /**
         * The money system settings.
         * @group Subclasses
         */
        static get moneySystem() {
            /**
             * The money system settings.
             * @hideconstructor
             * @nameOverride moneySystem
             * @parentOverride Globals.config
             * @group Subclasses
             */
            class config_moneySystem {
                /**
                 * Whether or not to use a scoreboard-based money system instead of a dynamic property-based one.
                 *
                 * Enabling this option will cause the money system to max out at the 32-bit integer limit (approximately 2.1 billion), but will allow for modifying a player's money with the /scoreboard command instead of having to use the main menu or use script eval.
                 *
                 * When this option is disabled the limit is `10^32767`. So basically infinite.
                 *
                 * Dynamic Property ID: `andexdbSettings:moneySystem.useScoreboardBasedMoneySystem`
                 *
                 * @default false
                 */
                static get useScoreboardBasedMoneySystem() {
                    return Boolean(world.getDynamicProperty("andexdbSettings:moneySystem.useScoreboardBasedMoneySystem") ?? false);
                }
                static set useScoreboardBasedMoneySystem(enabled) {
                    world.setDynamicProperty("andexdbSettings:moneySystem.useScoreboardBasedMoneySystem", enabled ?? false);
                }
                /**
                 * The name of the scoreboard to use for the money system.
                 *
                 * Dynamic Property ID: `andexdbSettings:moneySystem.scoreboardName`
                 *
                 * @default "andexdb:money"
                 */
                static get scoreboardName() {
                    return String(world.getDynamicProperty("andexdbSettings:moneySystem.scoreboardName") ?? "andexdb:money");
                }
                static set scoreboardName(enabled) {
                    world.setDynamicProperty("andexdbSettings:moneySystem.scoreboardName", enabled ?? "andexdb:money");
                }
            }
            return config_moneySystem;
        }
        /**
         * The bounty system settings.
         * @group Subclasses
         */
        static get bountySystem() {
            /**
             * The bounty system settings.
             * @hideconstructor
             * @nameOverride bountySystem
             * @parentOverride Globals.config
             * @group Subclasses
             */
            class config_bountySystem {
                /**
                 * Whether or not the bounty system is enabled.
                 *
                 * Dynamic Property ID: `andexdbSettings:bountySystem.enabled`
                 *
                 * @default true
                 */
                static get enabled() {
                    return Boolean(world.getDynamicProperty("andexdbSettings:bountySystem.enabled") ?? true);
                }
                static set enabled(enabled) {
                    world.setDynamicProperty("andexdbSettings:bountySystem.enabled", enabled ?? true);
                }
                /**
                 * Whether to show the time that a player was last online in the stats list that is shown when a player clicks on the bounty for another player in the bounty list.
                 *
                 * Dynamic Property ID: `andexdbSettings:bountySystem.showLastOnlineTimeInPlayerStatsList`
                 *
                 * @default false
                 */
                static get showLastOnlineTimeInBountyDetailsList() {
                    return Boolean(world.getDynamicProperty("andexdbSettings:bountySystem.showLastOnlineTimeInPlayerStatsList") ?? false);
                }
                static set showLastOnlineTimeInBountyDetailsList(show) {
                    world.setDynamicProperty("andexdbSettings:bountySystem.showLastOnlineTimeInPlayerStatsList", show ?? false);
                }
            }
            return config_bountySystem;
        }
        /**
         * The warps system settings.
         * @group Subclasses
         */
        static get warpsSystem() {
            /**
             * The warps system settings.
             * @hideconstructor
             * @nameOverride warpsSystem
             * @parentOverride Globals.config
             * @group Subclasses
             */
            class config_warpsSystem {
                /**
                 * Whether or not the warps system is enabled.
                 *
                 * Dynamic Property ID: `andexdbSettings:warpsSystem.enabled`
                 *
                 * @default true
                 */
                static get enabled() {
                    return Boolean(world.getDynamicProperty("warpsSystem:bountySystem.enabled") ?? true);
                }
                static set enabled(enabled) {
                    world.setDynamicProperty("andexdbSettings:warpsSystem.enabled", enabled ?? true);
                }
                /**
                 * List of saved warps.
                 *
                 * Dynamic Property ID: `andexdbSettings:warpsSystem.warps`
                 *
                 * @default []
                 *
                 * @throws {TypeError} The setter throws if the input is not an array of warp interface objects or undefined.
                 */
                static get warps() {
                    return JSONB.parse(world.getStringFromDynamicProperties("warpsSystem:warpsSystem.warps", "[]"));
                }
                static set warps(warps) {
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
                }
            }
            return config_warpsSystem;
        }
        /**
         * The money transfer system settings.
         * @group Subclasses
         */
        static get moneyTransferSystem() {
            /**
             * The money transfer system settings.
             * @hideconstructor
             * @nameOverride moneyTransferSystem
             * @parentOverride Globals.config
             * @group Subclasses
             */
            class config_moneyTransferSystem {
                /**
                 * Whether or not the money transfer system is enabled.
                 *
                 * Dynamic Property ID: `andexdbSettings:moneyTransferSystem.enabled`
                 *
                 * @default true
                 */
                static get enabled() {
                    return Boolean(world.getDynamicProperty("andexdbSettings:moneyTransferSystem.enabled") ?? true);
                }
                static set enabled(enabled) {
                    world.setDynamicProperty("andexdbSettings:moneyTransferSystem.enabled", enabled ?? true);
                }
            }
            return config_moneyTransferSystem;
        }
        /**
         * The anti-spam system settings.
         * @group Subclasses
         */
        static get antiSpamSystem() {
            /**
             * The anti-spam system settings.
             * @hideconstructor
             * @nameOverride antiSpamSystem
             * @parentOverride Globals.config
             * @group Subclasses
             */
            class config_antiSpamSystem {
                /**
                 * Whether or not the anti-spam system is enabled.
                 *
                 * Dynamic Property ID: `antispamSettings:antispamEnabled`
                 *
                 * @default false
                 */
                static get antispamEnabled() {
                    return Boolean(world.getDynamicProperty("antispamSettings:antispamEnabled") ?? false);
                }
                static set antispamEnabled(enabled) {
                    world.setDynamicProperty("antispamSettings:antispamEnabled", enabled ?? false);
                }
                /**
                 * Whether or not to restart the anti-spam mute timer when a message is sent during a mute.
                 *
                 * Dynamic Property ID: `antispamSettings:restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute`
                 *
                 * @default false
                 */
                static get restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute() {
                    return Boolean(world.getDynamicProperty("antispamSettings:restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute") ?? false);
                }
                static set restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute(restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute) {
                    world.setDynamicProperty("antispamSettings:restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute", restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute ?? false);
                }
                /**
                 * The wait time in seconds before a player can send another chat message.
                 *
                 * Dynamic Property ID: `antispamSettings:waitTimeAfterAntispamActivation`
                 *
                 * @default 60
                 */
                static get waitTimeAfterAntispamActivation() {
                    return isNaN(Number(world.getDynamicProperty("antispamSettings:waitTimeAfterAntispamActivation")))
                        ? 60
                        : Number(world.getDynamicProperty("antispamSettings:waitTimeAfterAntispamActivation") ?? 60);
                }
                static set waitTimeAfterAntispamActivation(waitTimeInSeconds) {
                    world.setDynamicProperty("antispamSettings:waitTimeAfterAntispamActivation", waitTimeInSeconds ?? 60);
                }
                /**
                 * The maximum time in seconds between individual messages to trigger anti-spam.
                 *
                 * Dynamic Property ID: `antispamSettings:maxTimeBewteenMessagesToTriggerAntiSpam`
                 *
                 * @default 5
                 */
                static get maxTimeBewteenMessagesToTriggerAntiSpam() {
                    return isNaN(Number(world.getDynamicProperty("antispamSettings:maxTimeBewteenMessagesToTriggerAntiSpam")))
                        ? 5
                        : Number(world.getDynamicProperty("antispamSettings:maxTimeBewteenMessagesToTriggerAntiSpam") ?? 5);
                }
                static set maxTimeBewteenMessagesToTriggerAntiSpam(maxTimeInSeconds) {
                    world.setDynamicProperty("antispamSettings:maxTimeBewteenMessagesToTriggerAntiSpam", maxTimeInSeconds ?? 5);
                }
                /**
                 * The message count to trigger anti-spam.
                 *
                 * Dynamic Property ID: `antispamSettings:antispamTriggerMessageCount`
                 *
                 * @default 4
                 */
                static get antispamTriggerMessageCount() {
                    return isNaN(Number(world.getDynamicProperty("antispamSettings:antispamTriggerMessageCount")))
                        ? 4
                        : Number(gwdp("antispamSettings:antispamTriggerMessageCount") ?? 4);
                }
                static set antispamTriggerMessageCount(messageCount) {
                    world.setDynamicProperty("antispamSettings:antispamTriggerMessageCount", messageCount ?? 4);
                }
            }
            return config_antiSpamSystem;
        }
        /**
         * The moderation settings.
         * @group Subclasses
         */
        static get moderation() {
            /**
             * The moderation settings.
             * @hideconstructor
             * @nameOverride moderation
             * @parentOverride Globals.config
             * @group Subclasses
             */
            class config_moderation {
                /**
                 * The ban settings.
                 * @group Subclasses
                 */
                static get bans() {
                    /**
                     * The ban settings.
                     * @hideconstructor
                     * @nameOverride bans
                     * @parentOverride Globals.config.moderation:class
                     * @group Subclasses
                     */
                    class config_moderation_bans {
                        /**
                         * Whether or not the ban system is enabled.
                         *
                         * Dynamic Property ID: `andexdbSettings:banEnabled`
                         *
                         * @default true
                         */
                        static get enabled() {
                            return Boolean(world.getDynamicProperty("andexdbSettings:banEnabled") ?? true);
                        }
                        static set enabled(enabled) {
                            world.setDynamicProperty("andexdbSettings:banEnabled", enabled ?? true);
                        }
                        /**
                         * How long it has to be since the last ban refresh before the bans list will be automatically refreshed, when getting the bans list or checking if a player is banned.
                         *
                         * Dynamic Property ID: `andexdbSettings:moderation.bans.minimumAutoRefresh`
                         *
                         * @default 1000
                         */
                        static get minimumAutoRefresh() {
                            return Number(world.getDynamicProperty("andexdbSettings:moderation.bans.minimumAutoRefresh") ??
                                // Also check old ID for backwards compatibility.
                                world.getDynamicProperty("andexdbSettings:bansMinimumAutoRefresh") ??
                                1000);
                        }
                        static set minimumAutoRefresh(minimumAutoRefresh) {
                            world.setDynamicProperty("andexdbSettings:moderation.bans.minimumAutoRefresh", minimumAutoRefresh ?? 1000);
                        }
                    }
                    return config_moderation_bans;
                }
            }
            return config_moderation;
        }
        /**
         * The UI settings.
         * @group Subclasses
         */
        static get ui() {
            /**
             * The UI settings.
             * @hideconstructor
             * @nameOverride ui
             * @parentOverride Globals.config
             * @group Subclasses
             */
            class config_ui {
                /**
                 * The menu configurations.
                 * @group Subclasses
                 */
                static get menus() {
                    /**
                     * The menu configurations.
                     * @hideconstructor
                     * @nameOverride menus
                     * @parentOverride Globals.config.ui:class
                     * @group Subclasses
                     */
                    class config_ui_menus {
                        /**
                         * The main menu settings.
                         * @group Subclasses
                         */
                        static get mainMenu() {
                            /**
                             * The main menu settings.
                             * @hideconstructor
                             * @nameOverride mainMenu
                             * @parentOverride Globals.config.ui:class.menus:class
                             * @group Subclasses
                             */
                            class config_ui_menus_mainMenu {
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
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.mainMenu.showDeprecatedButtons`
                                 *
                                 * @default false
                                 */
                                static get showDeprecatedButtons() {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.mainMenu.showDeprecatedButtons") ?? false);
                                }
                                static set showDeprecatedButtons(show) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.mainMenu.showDeprecatedButtons", show ?? false);
                                }
                                /**
                                 * Whether to show the buttons marked as deprecated on the main menu.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.mainMenu.showExperimentalButtons`
                                 *
                                 * @default true
                                 */
                                static get showExperimentalButtons() {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.mainMenu.showExperimentalButtons") ?? true);
                                }
                                static set showExperimentalButtons(show) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.mainMenu.showExperimentalButtons", show ?? true);
                                }
                                /**
                                 * Whether to show the buttons marked as deprecated on the main menu.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.mainMenu.showUnusedButtons`
                                 *
                                 * @default false
                                 */
                                static get showUnusedButtons() {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.mainMenu.showUnusedButtons") ?? false);
                                }
                                static set showUnusedButtons(show) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.mainMenu.showUnusedButtons", show ?? false);
                                }
                                /**
                                 * Whether to show the buttons for features that are planned to be added in a future update on the main menu.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.mainMenu.showUpcomingButtons`
                                 *
                                 * @default false
                                 */
                                static get showUpcomingButtons() {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.mainMenu.showUpcomingButtons") ?? false);
                                }
                                static set showUpcomingButtons(show) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.mainMenu.showUpcomingButtons", show ?? false);
                                }
                                /**
                                 * Whether to show the buttons for features that are non-functional on the main menu.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.mainMenu.showNonFunctionalButtons`
                                 *
                                 * @default false
                                 */
                                static get showNonFunctionalButtons() {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.mainMenu.showNonFunctionalButtons") ?? false);
                                }
                                static set showNonFunctionalButtons(show) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.mainMenu.showNonFunctionalButtons", show ?? false);
                                }
                            }
                            return config_ui_menus_mainMenu;
                        }
                        /**
                         * The player menu settings.
                         * @group Subclasses
                         */
                        static get playerMenu() {
                            /**
                             * The player menu settings.
                             * @hideconstructor
                             * @nameOverride playerMenu
                             * @parentOverride Globals.config.ui:class.menus:class
                             * @group Subclasses
                             */
                            class config_ui_menus_playerMenu {
                                /**
                                 * Whether or not the player menu is enabled.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.enabled`
                                 *
                                 * @default true
                                 */
                                static get enabled() {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu.enabled") ?? true);
                                }
                                static set enabled(enabled) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu.enabled", enabled ?? true);
                                }
                                /**
                                 * The buttons to show on the player menu. They will appear in the order that they are specified in this option.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.buttons`
                                 *
                                 * @default JSON.stringify(
                                 *    (Object.keys(menuButtonIds.playerMenu.buttons) as (keyof typeof menuButtonIds.playerMenu.buttons)[]).sort(
                                 *        (a, b) =>
                                 *            menuButtonIds.playerMenu.buttons[a].defaultButtonIndex >
                                 *            menuButtonIds.playerMenu.buttons[b].defaultButtonIndex
                                 *                ? 1
                                 *                : menuButtonIds.playerMenu.buttons[a].defaultButtonIndex <
                                 *                  menuButtonIds.playerMenu.buttons[b].defaultButtonIndex
                                 *                ? -1
                                 *                : 0
                                 *    )
                                 *)
                                 */
                                static get buttons() {
                                    return JSON.parse(String(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu.buttons") ??
                                        JSON.stringify(Object.keys(menuButtonIds.playerMenu.buttons).sort((a, b) => menuButtonIds.playerMenu.buttons[a].defaultButtonIndex >
                                            menuButtonIds.playerMenu.buttons[b].defaultButtonIndex
                                            ? 1
                                            : menuButtonIds.playerMenu.buttons[a].defaultButtonIndex <
                                                menuButtonIds.playerMenu.buttons[b].defaultButtonIndex
                                                ? -1
                                                : 0))));
                                }
                                static set buttons(buttonList) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu.buttons", JSON.stringify(buttonList ??
                                        Object.keys(menuButtonIds.playerMenu.buttons).sort((a, b) => menuButtonIds.playerMenu.buttons[a].defaultButtonIndex >
                                            menuButtonIds.playerMenu.buttons[b].defaultButtonIndex
                                            ? 1
                                            : menuButtonIds.playerMenu.buttons[a].defaultButtonIndex <
                                                menuButtonIds.playerMenu.buttons[b].defaultButtonIndex
                                                ? -1
                                                : 0)));
                                }
                                /**
                                 * The item name for the item that opens the player menu.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.itemName`
                                 *
                                 * @default "Menu"
                                 */
                                static get itemName() {
                                    return String(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu.itemName") ?? "§r§fMenu");
                                }
                                static set itemName(itemName) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu.itemName", itemName ?? "§r§fMenu");
                                }
                                /**
                                 * Whether to show the buttons marked as deprecated on the player menu.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.showDeprecatedButtons`
                                 *
                                 * @default false
                                 */
                                static get showDeprecatedButtons() {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu.showDeprecatedButtons") ?? false);
                                }
                                static set showDeprecatedButtons(show) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu.showDeprecatedButtons", show ?? false);
                                }
                                /**
                                 * Whether to show the buttons marked as deprecated on the player menu.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.showExperimentalButtons`
                                 *
                                 * @default true
                                 */
                                static get showExperimentalButtons() {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu.showExperimentalButtons") ?? true);
                                }
                                static set showExperimentalButtons(show) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu.showExperimentalButtons", show ?? true);
                                }
                                /**
                                 * Whether to show the buttons marked as deprecated on the player menu.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.showUnusedButtons`
                                 *
                                 * @default false
                                 */
                                static get showUnusedButtons() {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu.showUnusedButtons") ?? false);
                                }
                                static set showUnusedButtons(show) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu.showUnusedButtons", show ?? false);
                                }
                                /**
                                 * Whether to show the buttons for features that are planned to be added in a future update on the player menu.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.showUpcomingButtons`
                                 *
                                 * @default false
                                 */
                                static get showUpcomingButtons() {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu.showUpcomingButtons") ?? false);
                                }
                                static set showUpcomingButtons(show) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu.showUpcomingButtons", show ?? false);
                                }
                                /**
                                 * Whether to show the buttons for features that are non-functional on the player menu.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.showNonFunctionalButtons`
                                 *
                                 * @default false
                                 */
                                static get showNonFunctionalButtons() {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu.showNonFunctionalButtons") ?? false);
                                }
                                static set showNonFunctionalButtons(show) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu.showNonFunctionalButtons", show ?? false);
                                }
                            }
                            return config_ui_menus_playerMenu;
                        }
                        /**
                         * The settings for the player menu leaderboards.
                         * @group Subclasses
                         */
                        static get playerMenu_leaderboards() {
                            /**
                             * The settings for the player menu leaderboards.
                             * @hideconstructor
                             * @nameOverride playerMenu_leaderboards
                             * @parentOverride Globals.config.ui:class.menus:class
                             * @group Subclasses
                             */
                            class config_ui_menus_playerMenu_leaderboards {
                                /**
                                 * The settings for the built-in leaderboard statistics.
                                 * @group Subclasses
                                 */
                                static get builtInStats() {
                                    /**
                                     * The settings for the built-in leaderboard statistics.
                                     * @hideconstructor
                                     * @nameOverride builtInStats
                                     * @parentOverride Globals.config.ui:class.menus:class.playerMenu_leaderboards:class
                                     * @group Subclasses
                                     */
                                    class config_ui_menus_playerMenu_leaderboards_builtInStats {
                                        /**
                                         * The settings for the built-in `money` leaderboard statistic.
                                         * @group Subclasses
                                         */
                                        static get money() {
                                            /**
                                             * The settings for the built-in `money` leaderboard statistic.
                                             * @hideconstructor
                                             * @nameOverride money
                                             * @parentOverride Globals.config.ui:class.menus:class.playerMenu_leaderboards:class.builtInStats:class
                                             * @group Subclasses
                                             */
                                            class config_ui_menus_playerMenu_leaderboards_builtInStats_money {
                                                /**
                                                 * Whether or not the built-in `money` leaderboard statictic is enabled.
                                                 *
                                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.enabled`
                                                 *
                                                 * @default true
                                                 */
                                                static get enabled() {
                                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.enabled") ?? true);
                                                }
                                                static set enabled(enabled) {
                                                    world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.enabled", enabled ?? true);
                                                }
                                                /**
                                                 * The display options for the built-in `money` leaderboard statistic.
                                                 * @group Subclasses
                                                 */
                                                static get displayOptions() {
                                                    /**
                                                     * The display options for the built-in `money` leaderboard statistic.
                                                     * @hideconstructor
                                                     * @nameOverride displayOptions
                                                     * @parentOverride Globals.config.ui:class.menus:class.playerMenu_leaderboards:class.builtInStats:class.money:class
                                                     * @group Subclasses
                                                     */
                                                    class config_ui_menus_playerMenu_leaderboards_builtInStats_money_displayOptions {
                                                        /**
                                                         * A currency symbol to prefix the displayed value with.
                                                         *
                                                         * For example, if this is set to "$", then 1327401 would become $1327401 and -1234781 would become -$1234781. (Can be combined with "Add Comma Separators" to make it display like -$1,234,781.).
                                                         *
                                                         * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.currencyPrefix`
                                                         *
                                                         * @default "$"
                                                         */
                                                        static get currencyPrefix() {
                                                            return String(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.currencyPrefix") ?? "$");
                                                        }
                                                        static set currencyPrefix(currencyPrefix) {
                                                            world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.currencyPrefix", currencyPrefix ?? "$");
                                                        }
                                                        /**
                                                         * Whether or not to add comma separators to the displayed value for this statistic.
                                                         *
                                                         * For example, if this is set to true, then 1327401 would become 1,327,401 and -1234781 would become -1,234,781.
                                                         *
                                                         * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.addCommaSeparators`
                                                         *
                                                         * @default true
                                                         */
                                                        static get addCommaSeparators() {
                                                            return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.addCommaSeparators") ?? true);
                                                        }
                                                        static set addCommaSeparators(addCommaSeparators) {
                                                            world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.addCommaSeparators", addCommaSeparators ?? true);
                                                        }
                                                    }
                                                    return config_ui_menus_playerMenu_leaderboards_builtInStats_money_displayOptions;
                                                }
                                            }
                                            return config_ui_menus_playerMenu_leaderboards_builtInStats_money;
                                        }
                                    }
                                    return config_ui_menus_playerMenu_leaderboards_builtInStats;
                                }
                                /**
                                 * The custom leaderboard statistics.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu_leaderboards.customStats`
                                 *
                                 * @default []
                                 */
                                static get customStats() {
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
                                }
                                static set customStats(buttonList) {
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
                                }
                                /**
                                 * The statistics that are displayed when a player clicks on another player inside of the player menu leaderboard, they will be displayed in the order they are in this array.
                                 *
                                 * It should be an array of ids of leaderboard statistics, including both custom and built-in ones.
                                 *
                                 * Defaults to the list of the built-in leaderboard statistics from the `defaultPlayerMenuLeaderboardStatistics` array, in the same order that they appear in the array.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu_leaderboards.trackedStats`
                                 *
                                 * @default defaultPlayerMenuLeaderboardStatistics.map((s) => s.id)
                                 */
                                static get trackedStats() {
                                    return JSON.parse(String(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.trackedStats") ??
                                        JSON.stringify(defaultPlayerMenuLeaderboardStatistics.map((s) => s.id))));
                                }
                                static set trackedStats(buttonList) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.trackedStats", JSON.stringify(buttonList ?? defaultPlayerMenuLeaderboardStatistics.map((s) => s.id)));
                                }
                                /**
                                 * The list of statistics that have their own leaderboards, they will be displayed in the order they are in this array.
                                 *
                                 * It should be an array of ids of leaderboard statistics, including both custom and built-in ones.
                                 *
                                 * Defaults to the list of the built-in leaderboard statistics from the `defaultPlayerMenuLeaderboardStatistics` array, in the same order that they appear in the array.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu_leaderboards.leaderboards`
                                 *
                                 * @default defaultPlayerMenuLeaderboardStatistics.map((s) => s.id)
                                 */
                                static get leaderboards() {
                                    return JSON.parse(String(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.leaderboards") ??
                                        JSON.stringify(defaultPlayerMenuLeaderboardStatistics.map((s) => s.id))));
                                }
                                static set leaderboards(buttonList) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.leaderboards", JSON.stringify(buttonList ?? defaultPlayerMenuLeaderboardStatistics.map((s) => s.id)));
                                }
                                /**
                                 * Whether to show the time that a player was last online in the stats list that is shown when a player click on another player in a leaderboard.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu_leaderboards.showLastOnlineTimeInPlayerStatsList`
                                 *
                                 * @default false
                                 */
                                static get showLastOnlineTimeInPlayerStatsList() {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.showLastOnlineTimeInPlayerStatsList") ??
                                        false);
                                }
                                static set showLastOnlineTimeInPlayerStatsList(show) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.showLastOnlineTimeInPlayerStatsList", show ?? false);
                                }
                                /**
                                 * Whether to show banned players inside of the leaderboards.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu_leaderboards.showBannedPlayersInLeaderboards`
                                 *
                                 * @default false
                                 */
                                static get showBannedPlayersInLeaderboards() {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.showBannedPlayersInLeaderboards") ?? false);
                                }
                                static set showBannedPlayersInLeaderboards(show) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.showBannedPlayersInLeaderboards", show ?? false);
                                }
                            }
                            return config_ui_menus_playerMenu_leaderboards;
                        }
                    }
                    return config_ui_menus;
                }
                /**
                 * The main UI settings.
                 * @group Subclasses
                 */
                static get main() {
                    /**
                     * The main UI settings.
                     * @hideconstructor
                     * @nameOverride main
                     * @parentOverride Globals.config.ui:class
                     * @group Subclasses
                     */
                    class config_ui_main {
                    }
                    return config_ui_main;
                }
                /**
                 * The settings for paged UI menus.
                 * @group Subclasses
                 */
                static get pages() {
                    /**
                     * The settings for paged UI menus.
                     * @hideconstructor
                     * @nameOverride pages
                     * @parentOverride Globals.config.ui:class
                     * @group Subclasses
                     */
                    class config_ui_pages {
                        /**
                         * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
                         */
                        static get maxPlayersPerManagePlayersPage() {
                            return Number(world.getDynamicProperty("andexdbSettings:maxPlayersPerManagePlayersPage") ?? 9);
                        }
                        static set maxPlayersPerManagePlayersPage(maxPlayersPerManagePlayersPage) {
                            world.setDynamicProperty("andexdbSettings:maxPlayersPerManagePlayersPage", Math.min(1000, Math.max(1, maxPlayersPerManagePlayersPage ?? 9)));
                        }
                        /**
                         * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
                         */
                        static get maxBansPerManageBansPage() {
                            return Number(world.getDynamicProperty("andexdbSettings:maxBansPerManageBansPage") ?? 10);
                        }
                        static set maxBansPerManageBansPage(maxBansPerManageBansPage) {
                            world.setDynamicProperty("andexdbSettings:maxBansPerManageBansPage", maxBansPerManageBansPage ?? 10);
                        }
                        /**
                         * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
                         */
                        static get maxHomesPerManageHomesPage() {
                            return Number(world.getDynamicProperty("andexdbSettings:maxHomesPerManageHomesPage") ?? 10);
                        }
                        static set maxHomesPerManageHomesPage(maxHomesPerManageHomesPage) {
                            world.setDynamicProperty("andexdbSettings:maxHomesPerManageHomesPage", maxHomesPerManageHomesPage ?? 10);
                        }
                    }
                    return config_ui_pages;
                }
                /**
                 * Other UI settings.
                 * @group Subclasses
                 */
                static get other() {
                    /**
                     * Other UI settings.
                     * @hideconstructor
                     * @nameOverride other
                     * @parentOverride Globals.config.ui:class
                     * @group Subclasses
                     */
                    class config_ui_other {
                        static get useStarWarsReference404Page() {
                            return Boolean(world.getDynamicProperty("andexdbUISettings:other.useStarWarsReference404Page") ?? false);
                        }
                        static set useStarWarsReference404Page(useStarWarsReference404Page) {
                            world.setDynamicProperty("andexdbUISettings:other.useStarWarsReference404Page", useStarWarsReference404Page ?? false);
                        }
                    }
                    return config_ui_other;
                }
            }
            return config_ui;
        }
        /**
         * System settings.
         * @group Subclasses
         */
        static get system() {
            /**
             * System settings.
             * @hideconstructor
             * @nameOverride system
             * @parentOverride Globals.config
             * @group Subclasses
             */
            class config_system {
                static get artificialLagMS() {
                    return Number(world.getDynamicProperty("andexdbSettings:artificialLagMS") ?? 0);
                }
                static set artificialLagMS(artificialLagMS) {
                    world.setDynamicProperty("andexdbSettings:artificialLagMS", artificialLagMS ?? 0);
                }
                static get timeZone() {
                    return isNaN(Number(world.getDynamicProperty("andexdbSettings:timeZone")))
                        ? 0
                        : Number(world.getDynamicProperty("andexdbSettings:timeZone") ?? 0);
                }
                static set timeZone(timeZone) {
                    world.setDynamicProperty("andexdbSettings:timeZone", timeZone ?? 0);
                }
                static get playerDataRefreshRate() {
                    return Number(world.getDynamicProperty("andexdbSettings:playerDataRefreshRate") ?? 20);
                }
                static set playerDataRefreshRate(playerDataRefreshRate) {
                    world.setDynamicProperty("andexdbSettings:playerDataRefreshRate", Number.isNaN(Number(playerDataRefreshRate)) ? 5 : Math.min(1000, Math.max(1, Number(playerDataRefreshRate ?? 20))));
                }
                /**
                 * How often to refresh protected areas.
                 *
                 * Dynamic Property ID: `andexdbSettings:protectedAreasRefreshRate`
                 *
                 * @default 200
                 */
                static get protectedAreasRefreshRate() {
                    return Number(world.getDynamicProperty("andexdbSettings:protectedAreasRefreshRate") ?? 200);
                }
                static set protectedAreasRefreshRate(protectedAreasRefreshRate) {
                    world.setDynamicProperty("andexdbSettings:protectedAreasRefreshRate", Number.isNaN(Number(protectedAreasRefreshRate)) ? 200 : Math.min(1000000, Math.max(1, Number(protectedAreasRefreshRate ?? 200))));
                }
                static get protectedAreasZoneActionsEnabled() {
                    return Boolean(world.getDynamicProperty("andexdbSettings:protectedAreasZoneActionsEnabled") ?? true);
                }
                static set protectedAreasZoneActionsEnabled(protectedAreasZoneActionsEnabled) {
                    world.setDynamicProperty("andexdbSettings:protectedAreasZoneActionsEnabled", protectedAreasZoneActionsEnabled ?? true);
                }
                static get protectedAreasZoneActionsInterval() {
                    return Number(world.getDynamicProperty("andexdbSettings:protectedAreasZoneActionsInterval") ?? 5);
                }
                static set protectedAreasZoneActionsInterval(protectedAreasZoneActionsInterval) {
                    world.setDynamicProperty("andexdbSettings:protectedAreasZoneActionsInterval", Number.isNaN(Number(protectedAreasZoneActionsInterval))
                        ? 5
                        : Math.min(1000000, Math.max(1, Number(protectedAreasZoneActionsInterval ?? 5))));
                }
                static get protectedAreasZoneRefreshInterval() {
                    return Number(world.getDynamicProperty("andexdbSettings:protectedAreasZoneRefreshInterval") ?? 200);
                }
                static set protectedAreasZoneRefreshInterval(protectedAreasZoneRefreshInterval) {
                    world.setDynamicProperty("andexdbSettings:protectedAreasZoneRefreshInterval", Number.isNaN(Number(protectedAreasZoneRefreshInterval))
                        ? 200
                        : Math.min(1000000, Math.max(1, Number(protectedAreasZoneRefreshInterval ?? 200))));
                }
                /**
                 * How often to check for banned players.
                 *
                 * Dynamic Property ID: `andexdbSettings:bannedPlayersRefreshRate`
                 *
                 * @default 20
                 */
                static get bannedPlayersRefreshRate() {
                    return Number(world.getDynamicProperty("andexdbSettings:bannedPlayersRefreshRate") ?? 20);
                }
                static set bannedPlayersRefreshRate(bannedPlayersRefreshRate) {
                    world.setDynamicProperty("andexdbSettings:bannedPlayersRefreshRate", Number.isNaN(Number(bannedPlayersRefreshRate)) ? 20 : Math.min(1000, Math.max(1, Number(bannedPlayersRefreshRate ?? 20))));
                }
                static get debugMode() {
                    return Boolean(world.getDynamicProperty("andexdbSettings:debugMode") ?? false);
                }
                static set debugMode(debugMode) {
                    world.setDynamicProperty("andexdbSettings:debugMode", debugMode ?? false);
                }
                /**
                 * It is recommended to leave this set to false.
                 *
                 * Dynamic Property ID: `andexdbSettings:allowWatchdogTerminationCrash`
                 *
                 * @default false
                 */
                static get allowWatchdogTerminationCrash() {
                    return Boolean(world.getDynamicProperty("andexdbSettings:allowWatchdogTerminationCrash") ?? false);
                }
                static set allowWatchdogTerminationCrash(allowWatchdogTerminationCrash) {
                    world.setDynamicProperty("andexdbSettings:allowWatchdogTerminationCrash", allowWatchdogTerminationCrash ?? false);
                }
                /**
                 * It is recommended to leave this set to false.
                 *
                 * Dynamic Property ID: `andexdbSettings:hideWatchdogTerminationCrashEnabledWarningsOnStartup`
                 *
                 * @default false
                 */
                static get hideWatchdogTerminationCrashEnabledWarningsOnStartup() {
                    return Boolean(world.getDynamicProperty("andexdbSettings:hideWatchdogTerminationCrashEnabledWarningsOnStartup") ?? false);
                }
                static set hideWatchdogTerminationCrashEnabledWarningsOnStartup(hideWatchdogTerminationCrashEnabledWarningsOnStartup) {
                    world.setDynamicProperty("andexdbSettings:hideWatchdogTerminationCrashEnabledWarningsOnStartup", hideWatchdogTerminationCrashEnabledWarningsOnStartup ?? false);
                }
                static get autoSavePlayerData() {
                    return Boolean(world.getDynamicProperty("andexdbSettings:autoSavePlayerData") ?? true);
                }
                static set autoSavePlayerData(autoSavePlayerData) {
                    world.setDynamicProperty("andexdbSettings:autoSavePlayerData", autoSavePlayerData ?? true);
                }
                /**
                 * It is recommended to leave this set to false.
                 *
                 * Dynamic Property ID: `andexdbSettings:useLegacyPlayerInventoryDataSaveSystem`
                 *
                 * @default false
                 */
                static get useLegacyPlayerInventoryDataSaveSystem() {
                    return Boolean(world.getDynamicProperty("andexdbSettings:useLegacyPlayerInventoryDataSaveSystem") ?? false);
                }
                static set useLegacyPlayerInventoryDataSaveSystem(useLegacyPlayerInventoryDataSaveSystem) {
                    world.setDynamicProperty("andexdbSettings:useLegacyPlayerInventoryDataSaveSystem", useLegacyPlayerInventoryDataSaveSystem ?? false);
                }
                static get playerInventoryDataSaveSystemEnabled() {
                    return Boolean(world.getDynamicProperty("andexdbSettings:playerInventoryDataSaveSystemEnabled") ?? true);
                }
                static set playerInventoryDataSaveSystemEnabled(playerInventoryDataSaveSystemEnabled) {
                    world.setDynamicProperty("andexdbSettings:playerInventoryDataSaveSystemEnabled", playerInventoryDataSaveSystemEnabled ?? true);
                }
                static get spreadPlayerInventoryDataSavesOverMultipleTicks() {
                    return Boolean(world.getDynamicProperty("andexdbSettings:spreadPlayerInventoryDataSavesOverMultipleTicks") ?? true);
                }
                static set spreadPlayerInventoryDataSavesOverMultipleTicks(spreadPlayerInventoryDataSavesOverMultipleTicks) {
                    world.setDynamicProperty("andexdbSettings:spreadPlayerInventoryDataSavesOverMultipleTicks", spreadPlayerInventoryDataSavesOverMultipleTicks ?? true);
                }
                static get playerDataSavePerformanceMode() {
                    return String(world.getDynamicProperty("andexdbSettings:playerDataSavePerformanceMode") ?? "full");
                }
                static set playerDataSavePerformanceMode(playerDataSavePerformanceMode) {
                    world.setDynamicProperty("andexdbSettings:playerDataSavePerformanceMode", playerDataSavePerformanceMode ?? "full");
                }
                static get showEntityScaleNotFoundConsoleLog() {
                    return Boolean(world.getDynamicProperty("andexdbSettings:showEntityScaleNotFoundConsoleLog") ?? true);
                }
                static set showEntityScaleNotFoundConsoleLog(showEntityScaleNotFoundConsoleLog) {
                    world.setDynamicProperty("andexdbSettings:showEntityScaleNotFoundConsoleLog", showEntityScaleNotFoundConsoleLog ?? true);
                }
                static get showEntityScaleFoundConsoleLog() {
                    return Boolean(world.getDynamicProperty("andexdbSettings:showEntityScaleFoundConsoleLog") ?? true);
                }
                static set showEntityScaleFoundConsoleLog(showEntityScaleFoundConsoleLog) {
                    world.setDynamicProperty("andexdbSettings:showEntityScaleFoundConsoleLog", showEntityScaleFoundConsoleLog ?? true);
                }
                static get showEntityScaleNotFoundChatLog() {
                    return Boolean(world.getDynamicProperty("andexdbSettings:showEntityScaleNotFoundChatLog") ?? false);
                }
                static set showEntityScaleNotFoundChatLog(showEntityScaleNotFoundChatLog) {
                    world.setDynamicProperty("andexdbSettings:showEntityScaleNotFoundChatLog", showEntityScaleNotFoundChatLog ?? false);
                }
                static get showEntityScaleFoundChatLog() {
                    return Boolean(world.getDynamicProperty("andexdbSettings:showEntityScaleFoundChatLog") ?? false);
                }
                static set showEntityScaleFoundChatLog(showEntityScaleFoundChatLog) {
                    world.setDynamicProperty("andexdbSettings:showEntityScaleFoundChatLog", showEntityScaleFoundChatLog ?? false);
                }
                static get showBlueModsAnticheatNotFoundConsoleLog() {
                    return Boolean(world.getDynamicProperty("andexdbSettings:showBlueModsAnticheatNotFoundConsoleLog") ?? true);
                }
                static set showBlueModsAnticheatNotFoundConsoleLog(showBlueModsAnticheatNotFoundConsoleLog) {
                    world.setDynamicProperty("andexdbSettings:showBlueModsAnticheatNotFoundConsoleLog", showBlueModsAnticheatNotFoundConsoleLog ?? true);
                }
                static get showBlueModsAnticheatFoundConsoleLog() {
                    return Boolean(world.getDynamicProperty("andexdbSettings:showBlueModsAnticheatFoundConsoleLog") ?? true);
                }
                static set showBlueModsAnticheatFoundConsoleLog(showBlueModsAnticheatFoundConsoleLog) {
                    world.setDynamicProperty("andexdbSettings:showBlueModsAnticheatFoundConsoleLog", showBlueModsAnticheatFoundConsoleLog ?? true);
                }
                static get showBlueModsAnticheatNotFoundChatLog() {
                    return Boolean(world.getDynamicProperty("andexdbSettings:showBlueModsAnticheatNotFoundChatLog") ?? false);
                }
                static set showBlueModsAnticheatNotFoundChatLog(showBlueModsAnticheatNotFoundChatLog) {
                    world.setDynamicProperty("andexdbSettings:showBlueModsAnticheatNotFoundChatLog", showBlueModsAnticheatNotFoundChatLog ?? false);
                }
                static get showBlueModsAnticheatFoundChatLog() {
                    return Boolean(world.getDynamicProperty("andexdbSettings:showBlueModsAnticheatFoundChatLog") ?? false);
                }
                static set showBlueModsAnticheatFoundChatLog(showBlueModsAnticheatFoundChatLog) {
                    world.setDynamicProperty("andexdbSettings:showBlueModsAnticheatFoundChatLog", showBlueModsAnticheatFoundChatLog ?? false);
                }
                /**
                 * Sets whether or not the add-on is allowed to connect to and communicate with the entity scale add-on.
                 * @warning It is HIGHLY DISCOURAGED to disable this option.
                 */
                static get allowConnectingToEntityScale() {
                    return Boolean(world.getDynamicProperty("andexdbSettings:allowConnectingToEntityScale") ?? true);
                }
                static set allowConnectingToEntityScale(allowConnectingToEntityScale) {
                    world.setDynamicProperty("andexdbSettings:allowConnectingToEntityScale", allowConnectingToEntityScale ?? true);
                }
                /**
                 * Sets whether or not the add-on is allowed to connect to and communicate with the BlueMods Anticheat add-on.
                 * @warning It is HIGHLY DISCOURAGED to disable this option.
                 */
                static get allowConnectingToBlueModsAnticheat() {
                    return Boolean(world.getDynamicProperty("andexdbSettings:allowConnectingToBlueModsAnticheat") ?? true);
                }
                static set allowConnectingToBlueModsAnticheat(allowConnectingToBlueModsAnticheat) {
                    world.setDynamicProperty("andexdbSettings:allowConnectingToBlueModsAnticheat", allowConnectingToBlueModsAnticheat ?? true);
                }
            }
            return config_system;
        }
        /**
         * Resets the specified subsection of the config, or the entire config if no subsection is specified.
         * @param subsection The subsection of the config to reset. If not specified, the entire config will be reset.
         *
         * @example Reset the `config.worldBorder.overworld` section of the config:
         * ```ts
         * config.reset(config.worldBorder.overworld);
         * ```
         *
         * @example Reset the entire config:
         * ```ts
         * config.reset();
         * ```
         */
        static reset(subsection) {
            function resetProperties(obj) {
                const descriptors = Object.getOwnPropertyDescriptors(obj);
                for (const [key, descriptor] of Object.entries(descriptors)) {
                    if (descriptor?.get && descriptor.set) {
                        obj[key] = undefined;
                    }
                    else if (descriptor?.get && typeof descriptor.get() === "function") {
                        resetProperties(descriptor.get());
                    }
                }
            }
            resetProperties(subsection ?? config);
        }
        /**
         * Applies the specified settings to the config.
         * @param {FilterKey<DeepPartial<typeof config>, ["prototype", "reset", "applySettings", "toJSON"]>} settings The settings to apply to the config, as a partial of the JSONified version of the config.
         *
         * @example Apply settings to the config:
         * ```ts
         * config.applySettings({
         *     worldBorder: {
         *         overworld: {
         *             enabled: true
         *         },
         *     },
         *     chatCommandPrefix: "!",
         * });
         * ```
         */
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
        /**
         * Converts the config object to a JSON-serializable object.
         * @returns {FilterKey<typeof config, ["prototype", "reset", "applySettings", "toJSON"]>} An object that can be serialized to JSON, containing all the properties of the config object except for the ones with the names "prototype", "reset", "applySettings", and "toJSON", and the ones that are not enumerable.
         */
        static toJSON() {
            // modules.utils.filterProperties(modules.utils.filterProperties(config, ["addCommaSeparators", "spawnCommandAllowCrossDimensionalTeleport", "allowWatchdogTerminationCrash", "spawnCommandLocation", "allowChatEscapeCodes"], {}), ["toJSON"], {}).antiSpamSystem.antispamEnabled;
            return Object.fromEntries(Object.getOwnPropertyNames(this).map((key) => {
                const descriptor = Object.getOwnPropertyDescriptor(this, key);
                if (descriptor?.get && descriptor.set) {
                    return [key, descriptor.get()];
                }
                else if (descriptor?.get) {
                    return [key, config.toJSON.call(descriptor.get())];
                }
                // return [key, this[key as keyof typeof config]];
                return undefined;
            })); /*
                Object.getOwnPropertyNames(config)
                    .filter(
                        (n) =>
                            ![
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
                            ].includes(n)
                    )
                    .map((n) => [n, config[n as keyof typeof config]])
            ); */
        }
    }
    exports.config = config;
})(exports || (exports = {}));
export var config = exports.config;
/**
 * {@inheritDoc exports.config.system}
 */
export const system = exports.config.system;
Object.defineProperties(globalThis, {
    config: {
        value: exports.config,
        configurable: false,
        enumerable: true,
        writable: false,
    },
});
//# sourceMappingURL=config.js.map