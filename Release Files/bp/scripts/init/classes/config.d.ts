import type { Vector3 } from "@minecraft/server";
import { StructureSaveMode, type DimensionLocation, Dimension } from "@minecraft/server";
import type { Warp } from "modules/coordinates/interfaces/Warp";
import type { PlayerDataSaveMode } from "modules/player_save/classes/savedPlayer";
import { menuButtonIds } from "modules/ui/constants/menuButtonIds";
import type { rankModes } from "modules/chat/constants/rankModes";
import type { playerMenuLeaderboardStatistic } from "modules/ui/types/playerMenuLeaderboardStatistic";
import type { rankEvaluatorModes } from "modules/chat/constants/rankEvaluatorModes";
import type { FilterKey } from "modules/utilities/functions/filterProperties";
declare namespace exports {
    /**
     * A class containing the configuration information for the add-on.
     * @hideconstructor
     */
    class config {
        /**
         * Whether or not chat commands are enabled.
         *
         * Dynamic Property ID: `andexdbSettings:chatCommandsEnabled`
         *
         * @default true
         *
         * @danger Disabling this setting is highly discouraged.
         */
        static get chatCommandsEnabled(): boolean;
        static set chatCommandsEnabled(enabled: boolean | undefined);
        /**
         * The prefix for all built-in chat commands.
         *
         * Dynamic Property ID: `andexdbSettings:chatCommandPrefix`
         *
         * @default "\\"
         */
        static get chatCommandPrefix(): string;
        static set chatCommandPrefix(prefix: string | undefined);
        /**
         * The list of command prefixes that the add-on will recognize and leave chat messages starting with those alone to allow other chat command add-ons to use them.
         *
         * Dynamic Property ID: `andexdbSettings:validChatCommandPrefixes`
         *
         * @default ""
         */
        static get validChatCommandPrefixes(): string;
        static set validChatCommandPrefixes(prefixes: string | undefined);
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
        static get invalidChatCommandAction(): number;
        static set invalidChatCommandAction(invalidChatCommandAction: number | undefined);
        /**
         * The save mode for the undo clipboard.
         *
         * Dynamic Property ID: `andexdbSettings:undoClipboardMode`
         *
         * @default "Memory"
         */
        static get undoClipboardMode(): StructureSaveMode;
        static set undoClipboardMode(undoClipboardMode: StructureSaveMode | undefined);
        /**
         * The default spawn location for the gametest structures, this is used when spawning in no AI entities and simulated players.
         *
         * Dynamic Property ID: `andexdbSettings:gametestStructureDefaultSpawnLocation`
         *
         * @default
         * ```typescript
         * { x: 1000000000, y: 100, z: 1000000000 }
         * ```
         */
        static get gametestStructureDefaultSpawnLocation(): Vector3;
        static set gametestStructureDefaultSpawnLocation(gametestStructureDefaultSpawnLocation: Partial<Vector3> | undefined);
        /**
         * The location to teleport players when they use the \\spawn command.
         *
         * Dynamic Property ID: `andexdbSettings:spawnCommandLocation`
         *
         * @default
         * ```typescript
         * { x: null, y: null, z: null, dimension: overworld }
         * ```
         */
        static get spawnCommandLocation(): DimensionLocation | {
            x: null;
            y: null;
            z: null;
            dimension: Dimension;
        };
        static set spawnCommandLocation(spawnCommandLocation: DimensionLocation | {
            x: null;
            y: null;
            z: null;
            dimension: Dimension;
        } | undefined);
        /**
         * Whether or not players can teleport to spawn using the `\spawn` command when they are in a different dimension than the spawn.
         *
         * Dynamic Property ID: `andexdbSettings:spawnCommandAllowCrossDimensionalTeleport`
         *
         * @default true
         */
        static get spawnCommandAllowCrossDimensionalTeleport(): boolean;
        static set spawnCommandAllowCrossDimensionalTeleport(enabled: boolean | undefined);
        /**
         * The world border settings.
         * @group Subclasses
         */
        static get worldBorder(): {
            new (): {};
            /**
             * The world border settings for the overworld.
             * @group Subclasses
             */
            readonly overworld: {
                new (): {};
                /**
                 * Whether or not the world border is enabled for the overworld.
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:overworld.enabled`
                 *
                 * @default false
                 */
                get enabled(): boolean;
                set enabled(enabled: boolean | undefined);
                /**
                 * The minimum x and z coordinates of the world border for the overworld.
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:overworld.from`
                 *
                 * @default
                 * ```typescript
                 * { x: -29999984, z: -29999984 }
                 * ```
                 */
                get from(): {
                    x: number;
                    z: number;
                };
                set from(from: {
                    x: number;
                    z: number;
                } | {
                    x: null;
                    z: null;
                } | undefined);
                /**
                 * The maximum x and z coordinates of the world border for the overworld.
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:overworld.to`
                 *
                 * @default
                 * ```typescript
                 * { x: 29999984, z: 29999984 }
                 * ```
                 */
                get to(): {
                    x: number;
                    z: number;
                };
                set to(to: {
                    x: number;
                    z: number;
                } | {
                    x: null;
                    z: null;
                } | undefined);
                /**
                 * The mode of the world border for the overworld.
                 *
                 * `0` - Teleport Players\
                 * `1` - Yeet Players\
                 * `2` - Damage Players
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:overworld.mode`
                 *
                 * @default 1
                 */
                get mode(): number;
                set mode(mode: number | undefined);
                /**
                 * The amount of damage the overworld world border does to players when the {@link mode} is set to `2` (Damage Players).
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:overworld.damageMode.damage`
                 *
                 * @default 1
                 */
                get damage(): number;
                set damage(damage: number | undefined);
                /**
                 * The amount of horizontal knockback the overworld world border does to players when the {@link mode} is set to `1` (Yeet Players).
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:overworld.knockbackMode.knockbackH`
                 *
                 * @default 2.5
                 */
                get knockbackH(): number;
                set knockbackH(horizontalKnockback: number | undefined);
                /**
                 * The amount of vertical knockback the overworld world border does to players when the {@link mode} is set to `1` (Yeet Players).
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:overworld.knockbackMode.knockbackV`
                 *
                 * @default 1.25
                 */
                get knockbackV(): number;
                set knockbackV(verticalKnockback: number | undefined);
                /**
                 * Whether or not to prevent players from interacting with the world outside of the world border for the overworld.
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:overworld.preventWorldInteractionOutsideBorder`
                 *
                 * @default false
                 */
                get preventWorldInteractionOutsideBorder(): boolean;
                set preventWorldInteractionOutsideBorder(preventWorldInteractionOutsideBorder: boolean | undefined);
                /**
                 * The tint intensity of the world border for the overworld.
                 *
                 * This is how many tint particles will be spawned in front of the player when they are outside of the world border.
                 *
                 * Should be an integer of at least `0`.
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:overworld.tintIntensity`
                 *
                 * @default 1
                 */
                get tintIntensity(): number;
                set tintIntensity(tintIntensity: number | undefined);
                /**
                 * d
                 * @todo
                 */
                get warnPlayersInChat(): boolean;
                /**
                 * c
                 * @todo
                 */
                set warnPlayersInChat(warnPlayersInChat: boolean | undefined);
                /**
                 * b
                 * @todo
                 */
                get showActionbarWarningWhenOutsideBorder(): boolean;
                /**
                 * a
                 * @todo
                 */
                set showActionbarWarningWhenOutsideBorder(showActionbarWarningWhenOutsideBorder: boolean | undefined);
                /**
                 * Whether or not to show tint particles when the player is outside of the world border for the overworld.
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:overworld.showRedScreenOutlineWhenOutsideBorder`
                 *
                 * @default true
                 */
                get showRedScreenOutlineWhenOutsideBorder(): boolean;
                set showRedScreenOutlineWhenOutsideBorder(showRedScreenOutlineWhenOutsideBorder: boolean | undefined);
                /**
                 * Whether or not to show border particles at the edges of the world border for the overworld.
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:overworld.showBorderParticles`
                 *
                 * @default true
                 */
                get showBorderParticles(): boolean;
                set showBorderParticles(showBorderParticles: boolean | undefined);
                /**
                 * @deprecated
                 */
                get useShadersCompatibleBorderParticles(): boolean;
                set useShadersCompatibleBorderParticles(useShadersCompatibleBorderParticles: boolean | undefined);
                /**
                 * The minimum distance outside of the overworld world border that the player has to be before they start taking damage when the {@link mode} is set to `2` (Damage Players).
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:overworld.buffer`
                 *
                 * @default 5
                 */
                get buffer(): number;
                set buffer(buffer: number | undefined);
            };
            /**
             * The world border settings for the nether.
             * @group Subclasses
             */
            readonly nether: {
                new (): {};
                /**
                 * Whether or not the world border is enabled for the nether.
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:nether.enabled`
                 *
                 * @default false
                 */
                get enabled(): boolean;
                set enabled(enabled: boolean | undefined);
                /**
                 * The minimum x and z coordinates of the world border for the nether.
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:nether.from`
                 *
                 * @default
                 * ```typescript
                 * { x: -29999984, z: -29999984 }
                 * ```
                 */
                get from(): {
                    x: number;
                    z: number;
                };
                set from(from: {
                    x: number;
                    z: number;
                } | {
                    x: null;
                    z: null;
                } | undefined);
                /**
                 * The maximum x and z coordinates of the world border for the nether.
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:nether.to`
                 *
                 * @default
                 * ```typescript
                 * { x: 29999984, z: 29999984 }
                 * ```
                 */
                get to(): {
                    x: number;
                    z: number;
                };
                set to(to: {
                    x: number;
                    z: number;
                } | {
                    x: null;
                    z: null;
                } | undefined);
                /**
                 * The mode of the world border for the nether.
                 *
                 * `0` - Teleport Players\
                 * `1` - Yeet Players\
                 * `2` - Damage Players
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:nether.mode`
                 *
                 * @default 1
                 */
                get mode(): number;
                set mode(mode: number | undefined);
                /**
                 * The amount of damage the nether world border does to players when the {@link mode} is set to `2` (Damage Players).
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:nether.damageMode.damage`
                 *
                 * @default 1
                 */
                get damage(): number;
                set damage(damage: number | undefined);
                /**
                 * The amount of horizontal knockback the nether world border does to players when the {@link mode} is set to `1` (Yeet Players).
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:nether.knockbackMode.knockbackH`
                 *
                 * @default 2.5
                 */
                get knockbackH(): number;
                set knockbackH(horizontalKnockback: number | undefined);
                /**
                 * The amount of vertical knockback the nether world border does to players when the {@link mode} is set to `1` (Yeet Players).
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:nether.knockbackMode.knockbackV`
                 *
                 * @default 1.25
                 */
                get knockbackV(): number;
                set knockbackV(verticalKnockback: number | undefined);
                /**
                 * Whether or not to prevent players from interacting with the world outside of the world border for the nether.
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:nether.preventWorldInteractionOutsideBorder`
                 *
                 * @default false
                 */
                get preventWorldInteractionOutsideBorder(): boolean;
                set preventWorldInteractionOutsideBorder(preventWorldInteractionOutsideBorder: boolean | undefined);
                /**
                 * The tint intensity of the world border for the nether.
                 *
                 * This is how many tint particles will be spawned in front of the player when they are outside of the world border.
                 *
                 * Should be an integer of at least `0`.
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:nether.tintIntensity`
                 *
                 * @default 1
                 */
                get tintIntensity(): number;
                set tintIntensity(tintIntensity: number | undefined);
                /**
                 * d
                 * @todo
                 */
                get warnPlayersInChat(): boolean;
                /**
                 * c
                 * @todo
                 */
                set warnPlayersInChat(warnPlayersInChat: boolean | undefined);
                /**
                 * b
                 * @todo
                 */
                get showActionbarWarningWhenOutsideBorder(): boolean;
                /**
                 * a
                 * @todo
                 */
                set showActionbarWarningWhenOutsideBorder(showActionbarWarningWhenOutsideBorder: boolean | undefined);
                /**
                 * Whether or not to show tint particles when the player is outside of the world border for the nether.
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:nether.showRedScreenOutlineWhenOutsideBorder`
                 *
                 * @default true
                 */
                get showRedScreenOutlineWhenOutsideBorder(): boolean;
                set showRedScreenOutlineWhenOutsideBorder(showRedScreenOutlineWhenOutsideBorder: boolean | undefined);
                /**
                 * Whether or not to show border particles at the edges of the world border for the nether.
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:nether.showBorderParticles`
                 *
                 * @default true
                 */
                get showBorderParticles(): boolean;
                set showBorderParticles(showBorderParticles: boolean | undefined);
                /**
                 * @deprecated
                 */
                get useShadersCompatibleBorderParticles(): boolean;
                set useShadersCompatibleBorderParticles(useShadersCompatibleBorderParticles: boolean | undefined);
                /**
                 * The minimum distance outside of the nether world border that the player has to be before they start taking damage when the {@link mode} is set to `2` (Damage Players).
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:nether.buffer`
                 *
                 * @default 5
                 */
                get buffer(): number;
                set buffer(buffer: number | undefined);
            };
            /**
             * The world border settings for the end.
             * @group Subclasses
             */
            readonly the_end: {
                new (): {};
                /**
                 * Whether or not the world border is enabled for the end.
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:the_end.enabled`
                 *
                 * @default false
                 */
                get enabled(): boolean;
                set enabled(enabled: boolean | undefined);
                /**
                 * The minimum x and z coordinates of the world border for the end.
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:the_end.from`
                 *
                 * @default
                 * ```typescript
                 * { x: -29999984, z: -29999984 }
                 * ```
                 */
                get from(): {
                    x: number;
                    z: number;
                };
                set from(from: {
                    x: number;
                    z: number;
                } | {
                    x: null;
                    z: null;
                } | undefined);
                /**
                 * The maximum x and z coordinates of the world border for the end.
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:the_end.to`
                 *
                 * @default
                 * ```typescript
                 * { x: 29999984, z: 29999984 }
                 * ```
                 */
                get to(): {
                    x: number;
                    z: number;
                };
                set to(to: {
                    x: number;
                    z: number;
                } | {
                    x: null;
                    z: null;
                } | undefined);
                /**
                 * The mode of the world border for the end.
                 *
                 * `0` - Teleport Players\
                 * `1` - Yeet Players\
                 * `2` - Damage Players
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:the_end.mode`
                 *
                 * @default 1
                 */
                get mode(): number;
                set mode(mode: number | undefined);
                /**
                 * The amount of damage the end world border does to players when the {@link mode} is set to `2` (Damage Players).
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:the_end.damageMode.damage`
                 *
                 * @default 1
                 */
                get damage(): number;
                set damage(damage: number | undefined);
                /**
                 * The amount of horizontal knockback the end world border does to players when the {@link mode} is set to `1` (Yeet Players).
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:the_end.knockbackMode.knockbackH`
                 *
                 * @default 2.5
                 */
                get knockbackH(): number;
                set knockbackH(horizontalKnockback: number | undefined);
                /**
                 * The amount of vertical knockback the end world border does to players when the {@link mode} is set to `1` (Yeet Players).
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:the_end.knockbackMode.knockbackV`
                 *
                 * @default 1.25
                 */
                get knockbackV(): number;
                set knockbackV(verticalKnockback: number | undefined);
                /**
                 * Whether or not to prevent players from interacting with the world outside of the world border for the end.
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:the_end.preventWorldInteractionOutsideBorder`
                 *
                 * @default false
                 */
                get preventWorldInteractionOutsideBorder(): boolean;
                set preventWorldInteractionOutsideBorder(preventWorldInteractionOutsideBorder: boolean | undefined);
                /**
                 * The tint intensity of the world border for the end.
                 *
                 * This is how many tint particles will be spawned in front of the player when they are outside of the world border.
                 *
                 * Should be an integer of at least `0`.
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:the_end.tintIntensity`
                 *
                 * @default 1
                 */
                get tintIntensity(): number;
                set tintIntensity(tintIntensity: number | undefined);
                /**
                 * d
                 * @todo
                 */
                get warnPlayersInChat(): boolean;
                /**
                 * c
                 * @todo
                 */
                set warnPlayersInChat(warnPlayersInChat: boolean | undefined);
                /**
                 * b
                 * @todo
                 */
                get showActionbarWarningWhenOutsideBorder(): boolean;
                /**
                 * a
                 * @todo
                 */
                set showActionbarWarningWhenOutsideBorder(showActionbarWarningWhenOutsideBorder: boolean | undefined);
                /**
                 * Whether or not to show tint particles when the player is outside of the world border for the end.
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:the_end.showRedScreenOutlineWhenOutsideBorder`
                 *
                 * @default true
                 */
                get showRedScreenOutlineWhenOutsideBorder(): boolean;
                set showRedScreenOutlineWhenOutsideBorder(showRedScreenOutlineWhenOutsideBorder: boolean | undefined);
                /**
                 * Whether or not to show border particles at the edges of the world border for the end.
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:the_end.showBorderParticles`
                 *
                 * @default true
                 */
                get showBorderParticles(): boolean;
                set showBorderParticles(showBorderParticles: boolean | undefined);
                /**
                 * @deprecated
                 */
                get useShadersCompatibleBorderParticles(): boolean;
                set useShadersCompatibleBorderParticles(useShadersCompatibleBorderParticles: boolean | undefined);
                /**
                 * The minimum distance outside of the end world border that the player has to be before they start taking damage when the {@link mode} is set to `2` (Damage Players).
                 *
                 * Dynamic Property ID: `andexdbWorldBorderSettings:the_end.buffer`
                 *
                 * @default 5
                 */
                get buffer(): number;
                set buffer(buffer: number | undefined);
            };
        };
        /**
         * The shop system settings.
         * @group Subclasses
         */
        static get shopSystem(): {
            new (): {};
            /**
             * The server shop system settings.
             * @group Subclasses
             */
            readonly server: {
                new (): {};
                /**
                 * Whether or not the server shop system is enabled.
                 *
                 * Dynamic Property ID: `andexdbShopSystemSettings:server.enabled`
                 *
                 * @default false
                 */
                get enabled(): boolean;
                set enabled(enabled: boolean | undefined);
            };
            /**
             * The player shop system settings.
             * @group Subclasses
             */
            readonly player: {
                new (): {};
                /**
                 * Whether or not the player shop system is enabled.
                 *
                 * Dynamic Property ID: `andexdbShopSystemSettings:player.enabled`
                 *
                 * @default false
                 */
                get enabled(): boolean;
                set enabled(enabled: boolean | undefined);
                /**
                 * The maximum amount of shops a player can have.
                 *
                 * Dynamic Property ID: `andexdbShopSystemSettings:player.maxShopsPerPlayer`
                 *
                 * @default 5
                 */
                get maxShopsPerPlayer(): number;
                set maxShopsPerPlayer(maxShopsPerPlayer: number | undefined);
                /**
                 * Whether or not players can sell items that are locked to a specific slot in their inventory.
                 *
                 * Dynamic Property ID: `andexdbShopSystemSettings:player.allowSellingLockInSlotItems`
                 *
                 * @default false
                 */
                get allowSellingLockInSlotItems(): boolean;
                set allowSellingLockInSlotItems(allowSellingLockInSlotItems: boolean | undefined);
                /**
                 * Whether or not players can sell items that are locked to inventory.
                 *
                 * Dynamic Property ID: `andexdbShopSystemSettings:player.allowSellingLockInInventoryItems`
                 *
                 * @default false
                 */
                get allowSellingLockInInventoryItems(): boolean;
                set allowSellingLockInInventoryItems(allowSellingLockInInventoryItems: boolean | undefined);
                /**
                 * Whether or not players can sell items that have the keepOnDeath component set to true.
                 *
                 * Dynamic Property ID: `andexdbShopSystemSettings:player.allowSellingKeepOnDeathItems`
                 *
                 * @default true
                 */
                get allowSellingKeepOnDeathItems(): boolean;
                set allowSellingKeepOnDeathItems(allowSellingKeepOnDeathItems: boolean | undefined);
            };
            /**
             * The sign shop system settings.
             * @alpha
             * @unused The sign shop system has not been implemented yet.
             * @group Subclasses
             */
            readonly sign: {
                new (): {};
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
                get enabled(): boolean;
                set enabled(enabled: boolean | undefined);
            };
        };
        /**
         * The settings for all teleportation related systems, features, and commands of that add-on that are available to regular players.
         * @group Subclasses
         */
        static get teleportSystems(): {
            new (): {};
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
            get allowCrossDimensionalTeleport(): boolean;
            set allowCrossDimensionalTeleport(enabled: boolean | undefined);
            /**
             * How long in seconds after teleporting that the player has to wait before they can teleport again.
             *
             * Set it to 0 to have no teleport cooldown.
             *
             * Dynamic Property ID: `homeSystemSettings:teleportCooldown`
             *
             * @default 30
             */
            get teleportCooldown(): number;
            set teleportCooldown(maxHomes: number | undefined);
            /**
             * How long in seconds that the player has to stand still before they can teleport, if they move during this time period, the teleportation is canceled.
             *
             * Set it to 0 to have players teleport instantly.
             *
             * Dynamic Property ID: `homeSystemSettings:standStillTimeToTeleport`
             *
             * @default 5
             */
            get standStillTimeToTeleport(): number;
            set standStillTimeToTeleport(maxHomes: number | undefined);
            /**
             * How long in seconds after getting damaged by another player that the player has to wait before they can teleport with the player menu or commands such as `\spawn`, `\home`, `\gohome`, `\tpa`, and `\rtp`.
             *
             * Set it to 0 to have no PVP cooldown.
             *
             * Dynamic Property ID: `andexdbSettings:pvpCooldownToTeleport`
             *
             * @default 15
             */
            get pvpCooldownToTeleport(): number;
            set pvpCooldownToTeleport(invalidChatCommandAction: number | undefined);
        };
        /**
         * The home system settings.
         * @group Subclasses
         */
        static get homeSystem(): {
            new (): {};
            /**
             * Whether or not the home system is enabled.
             *
             * Dynamic Property ID: `homeSystemSettings:homeSystemEnabled`
             *
             * @default true
             */
            get homeSystemEnabled(): boolean;
            set homeSystemEnabled(enabled: boolean | undefined);
            /**
             * The maximum number of homes a player can have.
             *
             * Dynamic Property ID: `homeSystemSettings:maxHomesPerPlayer`
             *
             * @default Infinity
             */
            get maxHomesPerPlayer(): number;
            set maxHomesPerPlayer(maxHomes: number | undefined);
            /**
             * Whether or not you can teleport to a home that is in a different dimension than you.
             *
             * Dynamic Property ID: `homeSystemSettings:allowCrossDimensionalTeleport`
             *
             * @default true
             */
            get allowCrossDimensionalTeleport(): boolean;
            set allowCrossDimensionalTeleport(enabled: boolean | undefined);
            /**
             * Whether or not homes are allowed in dimensions other than the overworld.
             *
             * Dynamic Property ID: `homeSystemSettings:allowHomesInOtherDimensions`
             *
             * @default true
             */
            get allowHomesInOtherDimensions(): boolean;
            set allowHomesInOtherDimensions(enabled: boolean | undefined);
        };
        /**
         * The teleport request system settings.
         * @group Subclasses
         */
        static get tpaSystem(): {
            new (): {};
            /**
             * Whether or not the teleport request system is enabled.
             *
             * Dynamic Property ID: `tpaSystemSettings:tpaSystemEnabled`
             *
             * @default true
             */
            get tpaSystemEnabled(): boolean;
            set tpaSystemEnabled(enabled: boolean | undefined);
            /**
             * The number of seconds after a teleport request is sent before it will time out.
             *
             * Dynamic Property ID: `tpaSystemSettings:timeoutDuration`
             *
             * @default 60
             */
            get timeoutDuration(): number;
            set timeoutDuration(timeoutDuration: number | undefined);
            /**
             * Whether or not you can teleport to a player who is in a different dimension than you.
             *
             * Dynamic Property ID: `tpaSystemSettings:allowCrossDimensionalTeleport`
             *
             * @default true
             */
            get allowCrossDimensionalTeleport(): boolean;
            set allowCrossDimensionalTeleport(enabled: boolean | undefined);
        };
        /**
         * The chat and name tags settings.
         * @group Subclasses
         */
        static get chatRanks(): {
            new (): {};
            get chatRankPrefix(): string;
            set chatRankPrefix(chatRankPrefix: string | undefined);
            get chatSudoPrefix(): string;
            set chatSudoPrefix(chatSudoPrefix: string | undefined);
            get chatDisplayTimeStamp(): boolean;
            set chatDisplayTimeStamp(chatDisplayTimeStampEnabled: boolean | undefined);
            get showRanksOnPlayerNameTags(): boolean;
            set showRanksOnPlayerNameTags(showRanksOnPlayerNameTags: boolean | undefined);
            get showHealthOnPlayerNameTags(): boolean;
            set showHealthOnPlayerNameTags(showHealthOnPlayerNameTags: boolean | undefined);
            /**
             * The maximum number of decimal places to display on the health display on player name tags.
             *
             * Must be between 0 and 20 (inclusive).
             *
             * Dynamic Property ID: `andexdbSettings:playerNameTagHealthPrecision`
             *
             * @default 1
             */
            get playerNameTagHealthPrecision(): 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
            set playerNameTagHealthPrecision(playerNameTagHealthPrecision: number | undefined);
            get rankMode(): keyof typeof rankModes;
            set rankMode(rankMode: keyof typeof rankModes | undefined);
            get rankEvaluatorMode_chat(): (typeof rankEvaluatorModes)[number];
            set rankEvaluatorMode_chat(rankEvaluatorMode_chat: (typeof rankEvaluatorModes)[number] | undefined);
            get rankEvaluatorMode_nameTags(): (typeof rankEvaluatorModes)[number];
            set rankEvaluatorMode_nameTags(rankEvaluatorMode_nameTags: (typeof rankEvaluatorModes)[number] | undefined);
            get rankDisplayPrefix(): string;
            set rankDisplayPrefix(rankDisplayPrefix: string | undefined);
            get rankDisplaySuffix(): string;
            set rankDisplaySuffix(rankDisplaySuffix: string | undefined);
            get nameDisplayPrefix(): string;
            set nameDisplayPrefix(nameDisplayPrefix: string | undefined);
            get nameDisplaySuffix(): string;
            set nameDisplaySuffix(nameDisplaySuffix: string | undefined);
            get chatNameAndMessageSeparator(): string;
            set chatNameAndMessageSeparator(chatNameAndMessageSeparator: string | undefined);
            get rankDisplaySeparator(): string;
            set rankDisplaySeparator(rankDisplaySeparator: string | undefined);
            /**
             * The template string for displaying a player's dimension in the chat.
             *
             * Only applies in Custom(Advanced) mode.
             *
             * @todo
             *
             * @default "[${dimension}§r] "
             */
            get chatDimensionTemplateString(): string;
            set chatDimensionTemplateString(chatDimensionTemplateString: string | undefined);
            /**
             * The template string for individual ranks.
             *
             * @default "[${rank}§r]"
             */
            get rankTemplateString(): string;
            set rankTemplateString(rankTemplateString: string | undefined);
            get messageTemplateString(): string;
            set messageTemplateString(messageTemplateString: string | undefined);
            get nameTagTemplateString(): string;
            set nameTagTemplateString(nameTagTemplateString: string | undefined);
            get defaultRank(): string;
            set defaultRank(defaultRank: string | undefined);
            get defaultMessageFormatting(): string;
            set defaultMessageFormatting(defaultMessageFormatting: string | undefined);
            get defaultNameFormatting(): string;
            set defaultNameFormatting(defaultNameFormatting: string | undefined);
            get defaultSeparatorFormatting(): string;
            set defaultSeparatorFormatting(defaultSeparatorFormatting: string | undefined);
            get disableCustomChatMessages(): boolean;
            set disableCustomChatMessages(disableCustomChatMessages: boolean | undefined);
            get allowCustomChatMessagesMuting(): boolean;
            set allowCustomChatMessagesMuting(allowCustomChatMessagesMuting: boolean | undefined);
            get autoEscapeChatMessages(): boolean;
            set autoEscapeChatMessages(autoEscapeChatMessages: boolean | undefined);
            get autoURIEscapeChatMessages(): boolean;
            set autoURIEscapeChatMessages(autoURIEscapeChatMessages: boolean | undefined);
            get allowChatEscapeCodes(): boolean;
            set allowChatEscapeCodes(allowChatEscapeCodes: boolean | undefined);
        };
        /**
         * The money system settings.
         * @group Subclasses
         */
        static get moneySystem(): {
            new (): {};
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
            get useScoreboardBasedMoneySystem(): boolean;
            set useScoreboardBasedMoneySystem(enabled: boolean | undefined);
            /**
             * The name of the scoreboard to use for the money system.
             *
             * Dynamic Property ID: `andexdbSettings:moneySystem.scoreboardName`
             *
             * @default "andexdb:money"
             */
            get scoreboardName(): string;
            set scoreboardName(enabled: string | undefined);
        };
        /**
         * The bounty system settings.
         * @group Subclasses
         */
        static get bountySystem(): {
            new (): {};
            /**
             * Whether or not the bounty system is enabled.
             *
             * Dynamic Property ID: `andexdbSettings:bountySystem.enabled`
             *
             * @default true
             */
            get enabled(): boolean;
            set enabled(enabled: boolean | undefined);
            /**
             * Whether to show the time that a player was last online in the stats list that is shown when a player clicks on the bounty for another player in the bounty list.
             *
             * Dynamic Property ID: `andexdbSettings:bountySystem.showLastOnlineTimeInPlayerStatsList`
             *
             * @default false
             */
            get showLastOnlineTimeInBountyDetailsList(): boolean;
            set showLastOnlineTimeInBountyDetailsList(show: boolean | undefined);
        };
        /**
         * The warps system settings.
         * @group Subclasses
         */
        static get warpsSystem(): {
            new (): {};
            /**
             * Whether or not the warps system is enabled.
             *
             * Dynamic Property ID: `andexdbSettings:warpsSystem.enabled`
             *
             * @default true
             */
            get enabled(): boolean;
            set enabled(enabled: boolean | undefined);
            /**
             * List of saved warps.
             *
             * Dynamic Property ID: `andexdbSettings:warpsSystem.warps`
             *
             * @default []
             *
             * @throws {TypeError} The setter throws if the input is not an array of warp interface objects or undefined.
             */
            get warps(): Warp[];
            set warps(warps: Warp[] | undefined);
        };
        /**
         * The money transfer system settings.
         * @group Subclasses
         */
        static get moneyTransferSystem(): {
            new (): {};
            /**
             * Whether or not the money transfer system is enabled.
             *
             * Dynamic Property ID: `andexdbSettings:moneyTransferSystem.enabled`
             *
             * @default true
             */
            get enabled(): boolean;
            set enabled(enabled: boolean | undefined);
        };
        /**
         * The anti-spam system settings.
         * @group Subclasses
         */
        static get antiSpamSystem(): {
            new (): {};
            /**
             * Whether or not the anti-spam system is enabled.
             *
             * Dynamic Property ID: `antispamSettings:antispamEnabled`
             *
             * @default false
             */
            get antispamEnabled(): boolean;
            set antispamEnabled(enabled: boolean | undefined);
            /**
             * Whether or not to restart the anti-spam mute timer when a message is sent during a mute.
             *
             * Dynamic Property ID: `antispamSettings:restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute`
             *
             * @default false
             */
            get restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute(): boolean;
            set restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute(restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute: boolean | undefined);
            /**
             * The wait time in seconds before a player can send another chat message.
             *
             * Dynamic Property ID: `antispamSettings:waitTimeAfterAntispamActivation`
             *
             * @default 60
             */
            get waitTimeAfterAntispamActivation(): number;
            set waitTimeAfterAntispamActivation(waitTimeInSeconds: number | undefined);
            /**
             * The maximum time in seconds between individual messages to trigger anti-spam.
             *
             * Dynamic Property ID: `antispamSettings:maxTimeBewteenMessagesToTriggerAntiSpam`
             *
             * @default 5
             */
            get maxTimeBewteenMessagesToTriggerAntiSpam(): number;
            set maxTimeBewteenMessagesToTriggerAntiSpam(maxTimeInSeconds: number | undefined);
            /**
             * The message count to trigger anti-spam.
             *
             * Dynamic Property ID: `antispamSettings:antispamTriggerMessageCount`
             *
             * @default 4
             */
            get antispamTriggerMessageCount(): number;
            set antispamTriggerMessageCount(messageCount: number | undefined);
        };
        /**
         * The moderation settings.
         * @group Subclasses
         */
        static get moderation(): {
            new (): {};
            /**
             * The ban settings.
             * @group Subclasses
             */
            readonly bans: {
                new (): {};
                /**
                 * Whether or not the ban system is enabled.
                 *
                 * Dynamic Property ID: `andexdbSettings:banEnabled`
                 *
                 * @default true
                 */
                get enabled(): boolean;
                set enabled(enabled: boolean | undefined);
                /**
                 * How long it has to be since the last ban refresh before the bans list will be automatically refreshed, when getting the bans list or checking if a player is banned.
                 *
                 * Dynamic Property ID: `andexdbSettings:moderation.bans.minimumAutoRefresh`
                 *
                 * @default 1000
                 */
                get minimumAutoRefresh(): number;
                set minimumAutoRefresh(minimumAutoRefresh: number | undefined);
            };
        };
        /**
         * The UI settings.
         * @group Subclasses
         */
        static get ui(): {
            new (): {};
            /**
             * The menu configurations.
             * @group Subclasses
             */
            readonly menus: {
                new (): {};
                /**
                 * The main menu settings.
                 * @group Subclasses
                 */
                readonly mainMenu: {
                    new (): {};
                    /**
                     *
                     */ /**
                     * Whether to show the buttons marked as deprecated on the main menu.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.mainMenu.showDeprecatedButtons`
                     *
                     * @default false
                     */
                    get showDeprecatedButtons(): boolean;
                    set showDeprecatedButtons(show: boolean | undefined);
                    /**
                     * Whether to show the buttons marked as deprecated on the main menu.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.mainMenu.showExperimentalButtons`
                     *
                     * @default true
                     */
                    get showExperimentalButtons(): boolean;
                    set showExperimentalButtons(show: boolean | undefined);
                    /**
                     * Whether to show the buttons marked as deprecated on the main menu.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.mainMenu.showUnusedButtons`
                     *
                     * @default false
                     */
                    get showUnusedButtons(): boolean;
                    set showUnusedButtons(show: boolean | undefined);
                    /**
                     * Whether to show the buttons for features that are planned to be added in a future update on the main menu.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.mainMenu.showUpcomingButtons`
                     *
                     * @default false
                     */
                    get showUpcomingButtons(): boolean;
                    set showUpcomingButtons(show: boolean | undefined);
                    /**
                     * Whether to show the buttons for features that are non-functional on the main menu.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.mainMenu.showNonFunctionalButtons`
                     *
                     * @default false
                     */
                    get showNonFunctionalButtons(): boolean;
                    set showNonFunctionalButtons(show: boolean | undefined);
                };
                /**
                 * The player menu settings.
                 * @group Subclasses
                 */
                readonly playerMenu: {
                    new (): {};
                    /**
                     * Whether or not the player menu is enabled.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.enabled`
                     *
                     * @default true
                     */
                    get enabled(): boolean;
                    set enabled(enabled: boolean | undefined);
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
                    get buttons(): (keyof typeof menuButtonIds.playerMenu.buttons)[];
                    set buttons(buttonList: (keyof typeof menuButtonIds.playerMenu.buttons)[] | undefined);
                    /**
                     * The item name for the item that opens the player menu.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.itemName`
                     *
                     * @default "Menu"
                     */
                    get itemName(): string;
                    set itemName(itemName: string | undefined);
                    /**
                     * Whether to show the buttons marked as deprecated on the player menu.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.showDeprecatedButtons`
                     *
                     * @default false
                     */
                    get showDeprecatedButtons(): boolean;
                    set showDeprecatedButtons(show: boolean | undefined);
                    /**
                     * Whether to show the buttons marked as deprecated on the player menu.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.showExperimentalButtons`
                     *
                     * @default true
                     */
                    get showExperimentalButtons(): boolean;
                    set showExperimentalButtons(show: boolean | undefined);
                    /**
                     * Whether to show the buttons marked as deprecated on the player menu.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.showUnusedButtons`
                     *
                     * @default false
                     */
                    get showUnusedButtons(): boolean;
                    set showUnusedButtons(show: boolean | undefined);
                    /**
                     * Whether to show the buttons for features that are planned to be added in a future update on the player menu.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.showUpcomingButtons`
                     *
                     * @default false
                     */
                    get showUpcomingButtons(): boolean;
                    set showUpcomingButtons(show: boolean | undefined);
                    /**
                     * Whether to show the buttons for features that are non-functional on the player menu.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.showNonFunctionalButtons`
                     *
                     * @default false
                     */
                    get showNonFunctionalButtons(): boolean;
                    set showNonFunctionalButtons(show: boolean | undefined);
                };
                /**
                 * The settings for the player menu leaderboards.
                 * @group Subclasses
                 */
                readonly playerMenu_leaderboards: {
                    new (): {};
                    /**
                     * The settings for the built-in leaderboard statistics.
                     * @group Subclasses
                     */
                    readonly builtInStats: {
                        new (): {};
                        /**
                         * The settings for the built-in `money` leaderboard statistic.
                         * @group Subclasses
                         */
                        readonly money: {
                            new (): {};
                            /**
                             * Whether or not the built-in `money` leaderboard statictic is enabled.
                             *
                             * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.enabled`
                             *
                             * @default true
                             */
                            get enabled(): boolean;
                            set enabled(enabled: boolean | undefined);
                            /**
                             * The display options for the built-in `money` leaderboard statistic.
                             * @group Subclasses
                             */
                            readonly displayOptions: {
                                new (): {};
                                /**
                                 * A currency symbol to prefix the displayed value with.
                                 *
                                 * For example, if this is set to "$", then 1327401 would become $1327401 and -1234781 would become -$1234781. (Can be combined with "Add Comma Separators" to make it display like -$1,234,781.).
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.currencyPrefix`
                                 *
                                 * @default "$"
                                 */
                                get currencyPrefix(): string;
                                set currencyPrefix(currencyPrefix: string | undefined);
                                /**
                                 * Whether or not to add comma separators to the displayed value for this statistic.
                                 *
                                 * For example, if this is set to true, then 1327401 would become 1,327,401 and -1234781 would become -1,234,781.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.addCommaSeparators`
                                 *
                                 * @default true
                                 */
                                get addCommaSeparators(): boolean;
                                set addCommaSeparators(addCommaSeparators: boolean | undefined);
                            };
                        };
                    };
                    /**
                     * The custom leaderboard statistics.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu_leaderboards.customStats`
                     *
                     * @default []
                     */
                    get customStats(): playerMenuLeaderboardStatistic<"custom" | "customAdvanced">[];
                    set customStats(buttonList: playerMenuLeaderboardStatistic<"custom" | "customAdvanced">[] | undefined);
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
                    get trackedStats(): string[];
                    set trackedStats(buttonList: string[] | undefined);
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
                    get leaderboards(): string[];
                    set leaderboards(buttonList: string[] | undefined);
                    /**
                     * Whether to show the time that a player was last online in the stats list that is shown when a player click on another player in a leaderboard.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu_leaderboards.showLastOnlineTimeInPlayerStatsList`
                     *
                     * @default false
                     */
                    get showLastOnlineTimeInPlayerStatsList(): boolean;
                    set showLastOnlineTimeInPlayerStatsList(show: boolean | undefined);
                    /**
                     * Whether to show banned players inside of the leaderboards.
                     *
                     * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu_leaderboards.showBannedPlayersInLeaderboards`
                     *
                     * @default false
                     */
                    get showBannedPlayersInLeaderboards(): boolean;
                    set showBannedPlayersInLeaderboards(show: boolean | undefined);
                };
            };
            /**
             * The main UI settings.
             * @group Subclasses
             */
            readonly main: {
                new (): {};
            };
            /**
             * The settings for paged UI menus.
             * @group Subclasses
             */
            readonly pages: {
                new (): {};
                /**
                 * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
                 */
                get maxPlayersPerManagePlayersPage(): number;
                set maxPlayersPerManagePlayersPage(maxPlayersPerManagePlayersPage: number | undefined);
                /**
                 * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
                 */
                get maxBansPerManageBansPage(): number;
                set maxBansPerManageBansPage(maxBansPerManageBansPage: number | undefined);
                /**
                 * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
                 */
                get maxHomesPerManageHomesPage(): number;
                set maxHomesPerManageHomesPage(maxHomesPerManageHomesPage: number | undefined);
            };
            /**
             * Other UI settings.
             * @group Subclasses
             */
            readonly other: {
                new (): {};
                useStarWarsReference404Page: boolean | undefined;
            };
        };
        /**
         * System settings.
         * @group Subclasses
         */
        static get system(): {
            new (): {};
            get artificialLagMS(): number;
            set artificialLagMS(artificialLagMS: number | undefined);
            /**
             * The default minimum time between tick waits, in milliseconds.
             *
             * This will be the minimum amount of milliseconds that many generation functions will spend each tick, set this to a really low value to reduce lag while using them, but setting it really low will also cause the generation functions to take a really long time.
             *
             * Setting it close to or above 10000 may cause the generation functions to be interrupted with script hang errors.
             *
             * @default 2500
             */
            get defaultMinMSBetweenTickWaits(): number;
            set defaultMinMSBetweenTickWaits(defaultMinMSBetweenTickWaits: number | undefined);
            get timeZone(): number;
            set timeZone(timeZone: number | undefined);
            get playerDataRefreshRate(): number;
            set playerDataRefreshRate(playerDataRefreshRate: number | undefined);
            /**
             * How often to refresh protected areas.
             *
             * Dynamic Property ID: `andexdbSettings:protectedAreasRefreshRate`
             *
             * @default 200
             *
             * @deprecated
             */
            get protectedAreasRefreshRate(): number;
            set protectedAreasRefreshRate(protectedAreasRefreshRate: number | undefined);
            /**
             * Whether to enable zone actions for protected areas.
             *
             * Dynamic Property ID: `andexdbSettings:protectedAreasZoneActionsEnabled`
             *
             * @default true
             */
            get protectedAreasZoneActionsEnabled(): boolean;
            set protectedAreasZoneActionsEnabled(protectedAreasZoneActionsEnabled: boolean | undefined);
            /**
             * How often in ticks to execute the zone actions.
             *
             * Dynamic Property ID: `andexdbSettings:protectedAreasZoneActionsInterval`
             *
             * @default 5
             */
            get protectedAreasZoneActionsInterval(): number;
            set protectedAreasZoneActionsInterval(protectedAreasZoneActionsInterval: number | undefined);
            /**
             * How often in milliseconds to refresh the list of protected areas zones with zone actions.
             *
             * Dynamic Property ID: `andexdbSettings:protectedAreasZoneRefreshInterval`
             *
             * @default 200
             */
            get protectedAreasZoneRefreshInterval(): number;
            set protectedAreasZoneRefreshInterval(protectedAreasZoneRefreshInterval: number | undefined);
            /**
             * How often in ticks to check for banned players.
             *
             * Dynamic Property ID: `andexdbSettings:bannedPlayersRefreshRate`
             *
             * @default 20
             */
            get bannedPlayersRefreshRate(): number;
            set bannedPlayersRefreshRate(bannedPlayersRefreshRate: number | undefined);
            get debugMode(): boolean;
            set debugMode(debugMode: boolean | undefined);
            /**
             * It is recommended to leave this set to false.
             *
             * Dynamic Property ID: `andexdbSettings:allowWatchdogTerminationCrash`
             *
             * @default false
             */
            get allowWatchdogTerminationCrash(): boolean;
            set allowWatchdogTerminationCrash(allowWatchdogTerminationCrash: boolean | undefined);
            /**
             * It is recommended to leave this set to false.
             *
             * Dynamic Property ID: `andexdbSettings:hideWatchdogTerminationCrashEnabledWarningsOnStartup`
             *
             * @default false
             */
            get hideWatchdogTerminationCrashEnabledWarningsOnStartup(): boolean;
            set hideWatchdogTerminationCrashEnabledWarningsOnStartup(hideWatchdogTerminationCrashEnabledWarningsOnStartup: boolean | undefined);
            get autoSavePlayerData(): boolean;
            set autoSavePlayerData(autoSavePlayerData: boolean | undefined);
            /**
             * It is recommended to leave this set to false.
             *
             * Dynamic Property ID: `andexdbSettings:useLegacyPlayerInventoryDataSaveSystem`
             *
             * @default false
             */
            get useLegacyPlayerInventoryDataSaveSystem(): boolean;
            set useLegacyPlayerInventoryDataSaveSystem(useLegacyPlayerInventoryDataSaveSystem: boolean | undefined);
            get playerInventoryDataSaveSystemEnabled(): boolean;
            set playerInventoryDataSaveSystemEnabled(playerInventoryDataSaveSystemEnabled: boolean | undefined);
            get spreadPlayerInventoryDataSavesOverMultipleTicks(): boolean;
            set spreadPlayerInventoryDataSavesOverMultipleTicks(spreadPlayerInventoryDataSavesOverMultipleTicks: boolean | undefined);
            get playerDataSavePerformanceMode(): PlayerDataSaveMode;
            set playerDataSavePerformanceMode(playerDataSavePerformanceMode: PlayerDataSaveMode | undefined);
            get showEntityScaleNotFoundConsoleLog(): boolean;
            set showEntityScaleNotFoundConsoleLog(showEntityScaleNotFoundConsoleLog: boolean | undefined);
            get showEntityScaleFoundConsoleLog(): boolean;
            set showEntityScaleFoundConsoleLog(showEntityScaleFoundConsoleLog: boolean | undefined);
            get showEntityScaleNotFoundChatLog(): boolean;
            set showEntityScaleNotFoundChatLog(showEntityScaleNotFoundChatLog: boolean | undefined);
            get showEntityScaleFoundChatLog(): boolean;
            set showEntityScaleFoundChatLog(showEntityScaleFoundChatLog: boolean | undefined);
            get showBlueModsAnticheatNotFoundConsoleLog(): boolean;
            set showBlueModsAnticheatNotFoundConsoleLog(showBlueModsAnticheatNotFoundConsoleLog: boolean | undefined);
            get showBlueModsAnticheatFoundConsoleLog(): boolean;
            set showBlueModsAnticheatFoundConsoleLog(showBlueModsAnticheatFoundConsoleLog: boolean | undefined);
            get showBlueModsAnticheatNotFoundChatLog(): boolean;
            set showBlueModsAnticheatNotFoundChatLog(showBlueModsAnticheatNotFoundChatLog: boolean | undefined);
            get showBlueModsAnticheatFoundChatLog(): boolean;
            set showBlueModsAnticheatFoundChatLog(showBlueModsAnticheatFoundChatLog: boolean | undefined);
            /**
             * Sets whether or not the add-on is allowed to connect to and communicate with the entity scale add-on.
             * @warning It is HIGHLY DISCOURAGED to disable this option.
             */
            get allowConnectingToEntityScale(): boolean;
            set allowConnectingToEntityScale(allowConnectingToEntityScale: boolean | undefined);
            /**
             * Sets whether or not the add-on is allowed to connect to and communicate with the BlueMods Anticheat add-on.
             * @warning It is HIGHLY DISCOURAGED to disable this option.
             */
            get allowConnectingToBlueModsAnticheat(): boolean;
            set allowConnectingToBlueModsAnticheat(allowConnectingToBlueModsAnticheat: boolean | undefined);
        };
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
        static reset(subsection?: any): void;
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
        static applySettings<T extends FilterKey<typeof config, ["prototype", "reset", "applySettings", "toJSON"]>>(settings: DeepPartial<T>): void;
        /**
         * Converts the config object to a JSON-serializable object.
         *
         * @template {object} T The type of the settings category to convert to JSON.
         * @param {T} [subconfig=this] The subconfig to convert to JSON. If not specified, the entire config will be converted to JSON.
         * @returns {FilterKey<T, ["prototype", "reset", "applySettings", "toJSON"]>} An object that can be serialized to JSON, containing all the properties of the config object except for the ones with the names "prototype", "reset", "applySettings", and "toJSON", and the ones that are not enumerable.
         */
        static toJSON<T extends object = typeof config>(subconfig?: T): FilterKey<T, ["prototype", "reset", "applySettings", "toJSON"]>;
    }
}
export import config = exports.config;
/**
 * {@inheritDoc exports.config.system}
 */
export declare const system: {
    new (): {};
    get artificialLagMS(): number;
    set artificialLagMS(artificialLagMS: number | undefined);
    /**
     * The default minimum time between tick waits, in milliseconds.
     *
     * This will be the minimum amount of milliseconds that many generation functions will spend each tick, set this to a really low value to reduce lag while using them, but setting it really low will also cause the generation functions to take a really long time.
     *
     * Setting it close to or above 10000 may cause the generation functions to be interrupted with script hang errors.
     *
     * @default 2500
     */
    get defaultMinMSBetweenTickWaits(): number;
    set defaultMinMSBetweenTickWaits(defaultMinMSBetweenTickWaits: number | undefined);
    get timeZone(): number;
    set timeZone(timeZone: number | undefined);
    get playerDataRefreshRate(): number;
    set playerDataRefreshRate(playerDataRefreshRate: number | undefined);
    /**
     * How often to refresh protected areas.
     *
     * Dynamic Property ID: `andexdbSettings:protectedAreasRefreshRate`
     *
     * @default 200
     *
     * @deprecated
     */
    get protectedAreasRefreshRate(): number;
    set protectedAreasRefreshRate(protectedAreasRefreshRate: number | undefined);
    /**
     * Whether to enable zone actions for protected areas.
     *
     * Dynamic Property ID: `andexdbSettings:protectedAreasZoneActionsEnabled`
     *
     * @default true
     */
    get protectedAreasZoneActionsEnabled(): boolean;
    set protectedAreasZoneActionsEnabled(protectedAreasZoneActionsEnabled: boolean | undefined);
    /**
     * How often in ticks to execute the zone actions.
     *
     * Dynamic Property ID: `andexdbSettings:protectedAreasZoneActionsInterval`
     *
     * @default 5
     */
    get protectedAreasZoneActionsInterval(): number;
    set protectedAreasZoneActionsInterval(protectedAreasZoneActionsInterval: number | undefined);
    /**
     * How often in milliseconds to refresh the list of protected areas zones with zone actions.
     *
     * Dynamic Property ID: `andexdbSettings:protectedAreasZoneRefreshInterval`
     *
     * @default 200
     */
    get protectedAreasZoneRefreshInterval(): number;
    set protectedAreasZoneRefreshInterval(protectedAreasZoneRefreshInterval: number | undefined);
    /**
     * How often in ticks to check for banned players.
     *
     * Dynamic Property ID: `andexdbSettings:bannedPlayersRefreshRate`
     *
     * @default 20
     */
    get bannedPlayersRefreshRate(): number;
    set bannedPlayersRefreshRate(bannedPlayersRefreshRate: number | undefined);
    get debugMode(): boolean;
    set debugMode(debugMode: boolean | undefined);
    /**
     * It is recommended to leave this set to false.
     *
     * Dynamic Property ID: `andexdbSettings:allowWatchdogTerminationCrash`
     *
     * @default false
     */
    get allowWatchdogTerminationCrash(): boolean;
    set allowWatchdogTerminationCrash(allowWatchdogTerminationCrash: boolean | undefined);
    /**
     * It is recommended to leave this set to false.
     *
     * Dynamic Property ID: `andexdbSettings:hideWatchdogTerminationCrashEnabledWarningsOnStartup`
     *
     * @default false
     */
    get hideWatchdogTerminationCrashEnabledWarningsOnStartup(): boolean;
    set hideWatchdogTerminationCrashEnabledWarningsOnStartup(hideWatchdogTerminationCrashEnabledWarningsOnStartup: boolean | undefined);
    get autoSavePlayerData(): boolean;
    set autoSavePlayerData(autoSavePlayerData: boolean | undefined);
    /**
     * It is recommended to leave this set to false.
     *
     * Dynamic Property ID: `andexdbSettings:useLegacyPlayerInventoryDataSaveSystem`
     *
     * @default false
     */
    get useLegacyPlayerInventoryDataSaveSystem(): boolean;
    set useLegacyPlayerInventoryDataSaveSystem(useLegacyPlayerInventoryDataSaveSystem: boolean | undefined);
    get playerInventoryDataSaveSystemEnabled(): boolean;
    set playerInventoryDataSaveSystemEnabled(playerInventoryDataSaveSystemEnabled: boolean | undefined);
    get spreadPlayerInventoryDataSavesOverMultipleTicks(): boolean;
    set spreadPlayerInventoryDataSavesOverMultipleTicks(spreadPlayerInventoryDataSavesOverMultipleTicks: boolean | undefined);
    get playerDataSavePerformanceMode(): PlayerDataSaveMode;
    set playerDataSavePerformanceMode(playerDataSavePerformanceMode: PlayerDataSaveMode | undefined);
    get showEntityScaleNotFoundConsoleLog(): boolean;
    set showEntityScaleNotFoundConsoleLog(showEntityScaleNotFoundConsoleLog: boolean | undefined);
    get showEntityScaleFoundConsoleLog(): boolean;
    set showEntityScaleFoundConsoleLog(showEntityScaleFoundConsoleLog: boolean | undefined);
    get showEntityScaleNotFoundChatLog(): boolean;
    set showEntityScaleNotFoundChatLog(showEntityScaleNotFoundChatLog: boolean | undefined);
    get showEntityScaleFoundChatLog(): boolean;
    set showEntityScaleFoundChatLog(showEntityScaleFoundChatLog: boolean | undefined);
    get showBlueModsAnticheatNotFoundConsoleLog(): boolean;
    set showBlueModsAnticheatNotFoundConsoleLog(showBlueModsAnticheatNotFoundConsoleLog: boolean | undefined);
    get showBlueModsAnticheatFoundConsoleLog(): boolean;
    set showBlueModsAnticheatFoundConsoleLog(showBlueModsAnticheatFoundConsoleLog: boolean | undefined);
    get showBlueModsAnticheatNotFoundChatLog(): boolean;
    set showBlueModsAnticheatNotFoundChatLog(showBlueModsAnticheatNotFoundChatLog: boolean | undefined);
    get showBlueModsAnticheatFoundChatLog(): boolean;
    set showBlueModsAnticheatFoundChatLog(showBlueModsAnticheatFoundChatLog: boolean | undefined);
    /**
     * Sets whether or not the add-on is allowed to connect to and communicate with the entity scale add-on.
     * @warning It is HIGHLY DISCOURAGED to disable this option.
     */
    get allowConnectingToEntityScale(): boolean;
    set allowConnectingToEntityScale(allowConnectingToEntityScale: boolean | undefined);
    /**
     * Sets whether or not the add-on is allowed to connect to and communicate with the BlueMods Anticheat add-on.
     * @warning It is HIGHLY DISCOURAGED to disable this option.
     */
    get allowConnectingToBlueModsAnticheat(): boolean;
    set allowConnectingToBlueModsAnticheat(allowConnectingToBlueModsAnticheat: boolean | undefined);
};
declare global {
    namespace globalThis {
        export import config = exports.config;
    }
}
export {};
