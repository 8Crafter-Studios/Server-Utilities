import { EquipmentSlot, Dimension, GameMode, MemoryTier, PlatformType, PlayerInputPermissions, world, Player, StructureSaveMode, ItemStack, InputPermissionCategory, PlayerCursorInventoryComponent, ContainerSlot, } from "@minecraft/server";
import "init/classes/config";
import { ban } from "modules/ban/classes/ban";
import { getSlotFromParsedSlot } from "modules/command_utilities/functions/getSlotFromParsedSlot";
import { EquipmentSlots } from "modules/command_utilities/constants/EquipmentSlots";
import { player_save_format_version } from "modules/player_save/constants/player_save_format_version";
import * as semver from "semver";
export class savedPlayer {
    name;
    id;
    nameTag;
    tags;
    items;
    properties;
    lastOnline;
    firstJoined;
    location;
    dimension;
    rotation;
    isOp;
    spawnPoint;
    gameMode;
    selectedSlotIndex;
    scoreboardIdentity;
    format_version = format_version;
    player_save_format_version = player_save_format_version;
    saveId;
    memoryTier;
    maxRenderDistance;
    platformType;
    inputPermissions;
    /**
     * @since format version 1.6.0
     * @since v1.28.0-preview.20+BUILD.1
     */
    inputInfo;
    /**
     * @since format version 1.6.0
     * @since v1.28.0-preview.20+BUILD.1
     */
    playerPermissions;
    /**
     * @since format version 1.6.0
     * @since v1.28.0-preview.20+BUILD.1
     */
    onJoinActions = [];
    saveMode = "full";
    constructor(data) {
        if (!!data.format_version && semver.gt(data.player_save_format_version ?? "0.0.0", player_save_format_version)) {
            throw new ParseError(`The saved player data could not be parsed because it was last saved in a newer format version. Data format version: ${JSON.stringify(data.player_save_format_version)}. Current format version: ${JSON.stringify(player_save_format_version)}.`);
        }
        this.format_version = data.format_version ?? format_version;
        this.player_save_format_version = data.player_save_format_version ?? player_save_format_version;
        this.name = data.name;
        this.id = data.id;
        this.nameTag = data.nameTag;
        this.tags = data.tags;
        this.isOp = data.isOp;
        this.spawnPoint = data.spawnPoint;
        this.gameMode = data.gameMode;
        this.properties = data.properties;
        this.lastOnline = data.lastOnline;
        this.firstJoined = data.firstJoined ?? data.lastOnline ?? Date.now();
        this.location = data.location;
        this.dimension = data.dimension;
        this.rotation = data.rotation;
        this.selectedSlotIndex = data.selectedSlotIndex;
        this.scoreboardIdentity = data.scoreboardIdentity;
        this.saveId = data.saveId ?? "player:" + this.id; /*
        if (
            semver.satisfies(
                data.player_save_format_version ?? "0.0.0",
                ">=1.4.0 <2.0.0",
                { includePrerelease: true }
            )
        ) { */
        this.memoryTier = data.memoryTier;
        this.maxRenderDistance = data.maxRenderDistance;
        this.platformType = data.platformType; /*
        } */ /*
        if (
            semver.satisfies(
                data.player_save_format_version ?? "0.0.0",
                ">=1.6.0 <2.0.0",
                { includePrerelease: true }
            )
        ) { */
        this.inputPermissions = data.inputPermissions;
        this.inputInfo = data.inputInfo;
        this.playerPermissions = data.playerPermissions;
        this.onJoinActions = data.onJoinActions ?? []; /*
        } */ /*
        if (
            semver.satisfies(
                data.player_save_format_version ?? "0.0.0",
                "<1.5.0",
                { includePrerelease: true }
            )
        ) { */
        this.items = data.items; /*
        } */
        this.saveMode = data.saveMode ?? "full";
    }
    save() {
        world.setDynamicProperty(this.saveId, JSON.stringify(this));
    }
    remove() {
        world.setDynamicProperty(this.saveId);
    }
    getItems(sourceLoc) {
        return savedPlayer.getSavedInventory(this.id, sourceLoc, {
            bypassParameterTypeChecks: true,
            rethrowErrorInFinally: false,
        });
    }
    addOnJoinAction(action) {
        this.onJoinActions.push(action);
        this.save();
        return this;
    }
    addOnJoinActions(actions) {
        this.onJoinActions.push(...actions);
        this.save();
        return this;
    }
    removeOnJoinActionsOfType(type) {
        this.onJoinActions = this.onJoinActions.filter((a) => a.type !== type);
        this.save();
        return this;
    }
    async executeOnJoinActions() {
        const player = getPlayerById(this.id);
        if (!!player) {
            this.onJoinActions.forEach((action) => {
                switch (action.type) {
                    case "add_tag":
                        getPlayer(this.id).addTag(action.tag);
                        break;
                    case "remove_tag":
                        getPlayer(this.id).removeTag(action.tag);
                        break;
                    case "add_tags":
                        action.tags.forEach((tag) => getPlayer(this.id).addTag(tag));
                        break;
                    case "remove_tags":
                        action.tags.forEach((tag) => getPlayer(this.id).removeTag(tag));
                        break;
                    case "remove_item_in_slot":
                        const slot = getSlotFromParsedSlot(action.slot, {
                            container: player.inventory.container,
                            equipment: player.equippable,
                            cursor: player.cursorInventory,
                            selectedSlotIndex: player.selectedSlotIndex,
                        });
                        if ("item" in slot) {
                            slot.clear();
                        }
                        else {
                            slot.setItem(null);
                        }
                        break;
                    case "clear_inventory":
                        player.inventory.container.clearAll();
                        break;
                    case "set_permission":
                        player.playerPermissions[action.permission] = action.value;
                        break;
                }
            });
            this.onJoinActions = [];
            this.save();
        }
        else
            throw new ReferenceError("Player not found");
    }
    get isOnline() {
        return world.getAllPlayers().find((_) => _.id === this.id) !== undefined;
    }
    get isBanned() {
        return ban.testForBannedPlayer(this);
    }
    get isNameBanned() {
        return ban.testForNameBannedPlayer(this);
    }
    get isIdBanned() {
        return ban.testForIdBannedPlayer(this);
    }
    get bans() {
        let bans = ban.getBans().allBans.filter((b) => b.playerId == this.id || b.playerName == this.name);
        return {
            all: bans,
            valid: bans.filter((b) => b.isValid),
            expired: bans.filter((b) => b.isExpired),
        };
    }
    get nameBans() {
        let bans = ban.getBansAutoRefresh().nameBans.filter((b) => b.playerName == this.name);
        return {
            all: bans,
            valid: bans.filter((b) => b.isValid),
            expired: bans.filter((b) => b.isExpired),
        };
    }
    get idBans() {
        let bans = ban.getBansAutoRefresh().idBans.filter((b) => b.playerId == this.id);
        return {
            all: bans,
            valid: bans.filter((b) => b.isValid),
            expired: bans.filter((b) => b.isExpired),
        };
    }
    /**
     * Returns true if the player's saved inventory data is using the legacy pre-1.5.0 format, this would be the case if the player's inventory was saved before the 1.5.0 player save format version, or the {@linkcode config.system.useLegacyPlayerInventoryDataSaveSystem} option was set to true when the player's inventory was saved.
     */
    get hasLegacyInventorySave() {
        return this.items !== undefined;
    }
    get hasModernInventorySave() {
        return world.structureManager.get("player_inventory_save_storage:" + this.id) !== undefined;
    }
    static getSavedPlayerIds() {
        return world.getDynamicPropertyIds().filter((s) => s.startsWith("player:"));
    } /*
saveBan(ban: ban){if(ban.type=="name"){world.setDynamicProperty(`ban:${ban.playerName}`, `${Number(ban.removeAfterBanExpires)}||${ban.unbanDate.valueOf()}||${ban.banDate.valueOf()}||${ban.originalPlayerId}||${ban.bannedById}||${ban.bannedByName.replaceAll("|", "\\|")}||${ban.reason}`)}else{if(ban.type=="id"){world.setDynamicProperty(`idBan:${ban.playerId}`, `${Number(ban.removeAfterBanExpires)}||${ban.unbanDate.valueOf()}||${ban.banDate.valueOf()}||${ban.originalPlayerName.replaceAll("|", "\\|")}||${ban.bannedById}||${ban.bannedByName.replaceAll("|", "\\|")}||${ban.reason}`)}else{}}}*/
    static savePlayerData(savedPlayerData) {
        savedPlayerData.saveId = savedPlayerData.saveId ?? "player:" + savedPlayerData.id;
        savedPlayerData.format_version = savedPlayerData.format_version ?? format_version;
        savedPlayerData.player_save_format_version = savedPlayerData.player_save_format_version ?? player_save_format_version;
        world.setDynamicProperty(savedPlayerData.saveId ?? `player:${savedPlayerData.id}`, JSON.stringify(savedPlayerData));
        return savedPlayerData.saveId ?? `player:${savedPlayerData.id}`;
    }
    static async saveInventoryAsync(player, options = { rethrowErrorInFinally: true, bypassParameterTypeChecks: false }) {
        if (!(options.bypassParameterTypeChecks ?? false)) {
            if (typeof options != "object") {
                throw new SyntaxError(`Invalid value passed to the options parameter (args[1]), expected type of "object" but got type of ${JSON.stringify(typeof options)} instead.`);
            }
            if (options === null) {
                throw new SyntaxError(`Invalid value passed to the options parameter (args[1]), value cannot be null.`);
            }
            if (player?.constructor?.name != "Player") {
                throw new SyntaxError(`Invalid value passed to the player parameter (args[0]), expected Player but got ${typeof player == "object" ? player?.constructor?.name ?? tryget(() => JSON.stringify(player)) ?? "?" : typeof player}} instead.`);
            }
        }
        let playerHasBecomeInvalid = false;
        if (!player.isValid) {
            console.warn(`Async player inventory save canceled for ${player.id} because the player is no longer valid, likely because they left during the save process.`);
            return;
        }
        const entity = player.dimension.spawnEntity("andexdb:player_inventory_save_storage", {
            x: player.x.floor() + 0.5,
            y: player.dimension.heightRange.max - 1.5,
            z: player.z.floor() + 0.5,
        });
        entity.setDynamicProperty("andexdb:playerInventorySaveStoragePlayerID", player.id);
        try {
            var t = Date.now();
            const ei = entity.inventory.container;
            const pi = player.inventory.container;
            const pe = player.equippable;
            for (let i = 0; i < player.inventory.inventorySize; i++) {
                if (Date.now() - t > 0) {
                    await waitTick();
                    if (!player.isValid) {
                        playerHasBecomeInvalid = true;
                        break;
                    }
                    t = Date.now();
                }
                try {
                    ei.setItem(i, pi.getItem(i));
                }
                catch (e) { }
            }
            if (!playerHasBecomeInvalid) {
                for (let i = 0; i < 6; i++) {
                    if (Date.now() - t > 0) {
                        await waitTick();
                        if (!player.isValid) {
                            playerHasBecomeInvalid = true;
                            break;
                        }
                        t = Date.now();
                    }
                    try {
                        ei.setItem(36 + i, pe.getEquipment(EquipmentSlots[i]));
                    }
                    catch (e) { }
                }
            }
            if (!playerHasBecomeInvalid) {
                try {
                    ei.setItem(42, player.cursorInventory.item);
                }
                catch (e) { }
            }
        }
        catch (e) { }
        try {
            if (!player.isValid) {
                playerHasBecomeInvalid = true;
            }
            if (!playerHasBecomeInvalid) {
                /**
                 * This makes the script temporarily teleport the other entities away so that when it saves the storage entity, it can't save and possibly duplicate other entities.
                 */
                var otherEntities = tryget(() => player.dimension
                    .getEntitiesAtBlockLocation({
                    x: player.x.floor() + 0.5,
                    y: player.dimension.heightRange.max - 1.5,
                    z: player.z.floor() + 0.5,
                })
                    .filter((v) => v.id != entity.id && !(v instanceof Player))) ?? [];
                var locs = otherEntities.map((v) => v.location);
                otherEntities.forEach((v) => tryrun(() => v.teleport(Vector.add(v.location, { x: 0, y: 50, z: 0 }))));
                try {
                    world.structureManager.delete("player_inventory_save_storage:" + player.id);
                }
                catch { }
                world.structureManager.createFromWorld("player_inventory_save_storage:" + player.id, player.dimension, {
                    x: player.x.floor(),
                    y: player.dimension.heightRange.max - 2,
                    z: player.z.floor(),
                }, {
                    x: player.x.floor(),
                    y: player.dimension.heightRange.max - 2,
                    z: player.z.floor(),
                }, {
                    includeBlocks: false,
                    includeEntities: true,
                    saveMode: StructureSaveMode.World,
                });
            }
        }
        catch (e) {
            var error = e;
        }
        finally {
            try {
                otherEntities.forEach((v, i) => tryrun(() => v.teleport(locs[i], { keepVelocity: false })));
            }
            catch { }
            try {
                entity.remove();
            }
            catch { }
            if (playerHasBecomeInvalid) {
                console.warn(`Async player inventory save canceled for ${player.id} because the player is no longer valid, likely because they left during the save process.`);
            }
            if ((options.rethrowErrorInFinally ?? true) && !!error) {
                throw error;
            }
        }
    }
    static saveInventory(player, options = { rethrowErrorInFinally: true, bypassParameterTypeChecks: false }) {
        if (!(options.bypassParameterTypeChecks ?? false)) {
            if (typeof options != "object") {
                throw new SyntaxError(`Invalid value passed to the options parameter (args[1]), expected type of "object" but got type of ${JSON.stringify(typeof options)} instead.`);
            }
            if (options === null) {
                throw new SyntaxError(`Invalid value passed to the options parameter (args[1]), value cannot be null.`);
            }
            if (player?.constructor?.name != "Player") {
                throw new SyntaxError(`Invalid value passed to the player parameter (args[0]), expected Player but got ${typeof player == "object" ? player?.constructor?.name ?? tryget(() => JSON.stringify(player)) ?? "?" : typeof player}} instead.`);
            }
        }
        if (!player.isValid) {
            console.warn(`Player inventory save canceled for ${player.id} because the player is no longer valid, likely because they left during the save process.`);
            return;
        }
        const entity = player.dimension.spawnEntity("andexdb:player_inventory_save_storage", {
            x: player.x.floor() + 0.5,
            y: player.dimension.heightRange.max - 1.5,
            z: player.z.floor() + 0.5,
        });
        entity.setDynamicProperty("andexdb:playerInventorySaveStoragePlayerID", player.id);
        try {
            const ei = entity.inventory.container;
            const pi = player.inventory.container;
            const pe = player.equippable;
            const inventorySize = player.inventory.inventorySize;
            for (let i = 0; i < inventorySize; i++) {
                try {
                    ei.setItem(i, pi.getItem(i));
                }
                catch (e) { }
            }
            for (let i = 0; i < 6; i++) {
                try {
                    ei.setItem(36 + i, pe.getEquipment(EquipmentSlots[i]));
                }
                catch (e) { }
            }
            try {
                ei.setItem(42, player.cursorInventory.item);
            }
            catch (e) { }
        }
        catch (e) { }
        try {
            const maxHeight = player.dimension.heightRange.max;
            /**
             * This makes the script temporarily teleport the other entities away so that when it saves the storage entity, it can't save and possibly duplicate other entities.
             */
            var otherEntities = tryget(() => player.dimension
                .getEntitiesAtBlockLocation({
                x: player.x.floor() + 0.5,
                y: maxHeight - 1.5,
                z: player.z.floor() + 0.5,
            })
                .filter((v) => v.id != entity.id && !(v instanceof Player))) ?? [];
            var locs = otherEntities.map((v) => v.location);
            otherEntities.forEach((v) => tryrun(() => v.teleport(Vector.add(v.location, { x: 0, y: 50, z: 0 }))));
            try {
                world.structureManager.delete("player_inventory_save_storage:" + player.id);
            }
            catch { }
            world.structureManager.createFromWorld("player_inventory_save_storage:" + player.id, player.dimension, {
                x: player.x.floor(),
                y: maxHeight - 2,
                z: player.z.floor(),
            }, {
                x: player.x.floor(),
                y: maxHeight - 2,
                z: player.z.floor(),
            }, {
                includeBlocks: false,
                includeEntities: true,
                saveMode: StructureSaveMode.World,
            });
        }
        catch (e) {
            var error = e;
        }
        finally {
            try {
                otherEntities.forEach((v, i) => tryrun(() => v.teleport(locs[i], { keepVelocity: false })));
            }
            catch { }
            try {
                entity.remove();
            }
            catch { }
            if ((options.rethrowErrorInFinally ?? true) && !!error) {
                throw error;
            }
        }
    }
    static getSavedInventory(playerId, sourceLoc, options = { rethrowErrorInFinally: true, bypassParameterTypeChecks: false }) {
        if (!(options.bypassParameterTypeChecks ?? false)) {
            if (typeof playerId != "string") {
                throw new SyntaxError(`Invalid value passed to the playerId parameter (args[0]), expected type of "string" but got type of ${JSON.stringify(typeof options)} instead.`);
            }
            if (playerId === null) {
                throw new SyntaxError(`Invalid value passed to the playerId parameter (args[0]), value cannot be null.`);
            }
            if (typeof options != "object") {
                throw new SyntaxError(`Invalid value passed to the options parameter (args[2]), expected type of "object" but got type of ${JSON.stringify(typeof options)} instead.`);
            }
            if (options === null) {
                throw new SyntaxError(`Invalid value passed to the options parameter (args[2]), value cannot be null.`);
            }
            if (typeof sourceLoc != "object") {
                throw new SyntaxError(`Invalid value passed to the sourceLoc parameter (args[1]), expected type of "object" but got type of ${JSON.stringify(typeof sourceLoc)} instead.`);
            }
            if (sourceLoc === null) {
                throw new SyntaxError(`Invalid value passed to the sourceLoc parameter (args[1]), value cannot be null.`);
            }
            if (!testForObjectTypeExtension(sourceLoc, {
                x: "number",
                y: "number",
                z: "number",
                dimension: "[object Dimension]",
            })) {
                throw new SyntaxError(`Invalid value passed to the sourceLoc parameter (args[1]), expected DimensionLocation ({x: number, y: number, z: number, dimension: Dimension}) but got {${JSON.stringify(Object.entries(sourceLoc)
                    .map((v) => `${v[0]}: ${typeof v[1] == "object" ? v[1]?.constructor?.name ?? tryget(() => JSON.stringify(v[1])) ?? "?" : typeof v[1]}`)
                    .join(", "))}} instead.`);
            }
        }
        const items = {};
        const maxHeight = sourceLoc.dimension.heightRange.max;
        if (world.structureManager.get("player_inventory_save_storage:" + playerId) === undefined) {
            return {};
        }
        world.structureManager.place("player_inventory_save_storage:" + playerId, sourceLoc.dimension, {
            x: sourceLoc.x.floor(),
            y: maxHeight - 2,
            z: sourceLoc.z.floor(),
        }, {
            includeBlocks: false,
            includeEntities: true,
        });
        const entity = sourceLoc.dimension
            .getEntitiesAtBlockLocation({
            x: sourceLoc.x.floor(),
            y: maxHeight - 2,
            z: sourceLoc.z.floor(),
        })
            .find((v) => tryget(() => String(v.getDynamicProperty("andexdb:playerInventorySaveStoragePlayerID"))) == playerId);
        try {
            const ei = entity.inventory.container;
            for (let i = 0; i < 36; i++) {
                try {
                    items[i] = ei.getItem(i);
                }
                catch (e) { }
            }
            for (let i = 0; i < 6; i++) {
                try {
                    items[EquipmentSlots[i]] = ei.getItem(36 + i);
                }
                catch (e) { }
            }
            try {
                items.Cursor = ei.getItem(42);
            }
            catch (e) { }
        }
        catch (e) { }
        try {
        }
        catch (e) {
            var error = e;
        }
        finally {
            try {
                entity.remove();
            }
            catch { }
            if ((options.rethrowErrorInFinally ?? true) && !!error) {
                throw error;
            }
        }
        return items;
    }
    static savePlayer(player) {
        if (!player.isValid) {
            console.warn(`Player data save canceled for ${player.id} because the player is no longer valid, likely because they left during the save process.`);
            return undefined;
        } /*
        // playerDataSaveDebug
        world.getAllPlayers().filter(p=>p.hasTag("playerDataSaveDebug")).forEach(p=>p.sendMessage(`§r[${formatTime(new Date(Date.now() + (Number(p.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbSettings:timeZone") ?? 0) * 3600000)))}] §r[§l§bplayerDataSaveDebug§r] savePlayer() for player ${tryget(()=>player?.name??"undefined")??"ERROR"}<${tryget(()=>player?.id??"undefined")??"ERROR"}>`)) */
        // Crash Test
        /*
        ${ase}const origData = {}; const player = players.Andexter8; while(true){await waitTick(); dcsend({
                // ms for 1000 runs: 1
                name: player.name,
                // ms for 1000 runs: 1-2
                nameTag: player.nameTag,
                // ms for 1000 runs: 0
                id: player.id,
                // ms for 1000 runs: 1
                isOp: player.isOp(),
                // ms for 1000 runs: 4
                tags: player.getTags(),
                // ms for 1000 runs: 1
                selectedSlotIndex: player.selectedSlotIndex,
                // ms for 1000 runs: 1
                scoreboardIdentity: player.scoreboardIdentity?.id,
                // ms for 1000 runs: 0
                format_version: format_version,
                // ms for 1000 runs: 0
                player_save_format_version: "23232.321.321",
                // ms for 1000 runs: 0
                lastOnline: Date.now(),
                // ms for 1000 runs: 0
                firstJoined: origData.firstJoined ?? Date.now(),
                // ms for 1000 runs: 2-3
                location: player.location,
                // ms for 1000 runs: 1
                dimension: player.dimension,
                // ms for 1000 runs: 2
                rotation: player.getRotation(),
                // ms for 1000 runs: 1-2
                gameMode: player.getGameMode(),
                // ms for 1000 runs: 1
                spawnPoint: player.getSpawnPoint(),
                // ms for 1000 runs: 1
                memoryTier: player.clientSystemInfo.memoryTier,
                // ms for 1000 runs: 1
                maxRenderDistance: player.clientSystemInfo.maxRenderDistance,
                // ms for 1000 runs: 1
                platformType: player.clientSystemInfo.platformType,
                // ms for 1000 runs: 22
                inputPermissions: {
                    // ms for 1000 runs: 2
                    Camera: player.inputPermissions.isPermissionCategoryEnabled(modules.mcServer.InputPermissionCategory.Camera),
                    // ms for 1000 runs: 2
                    Movement: player.inputPermissions.isPermissionCategoryEnabled(modules.mcServer.InputPermissionCategory.Movement),
                    // ms for 1000 runs: 2
                    LateralMovement: player.inputPermissions.isPermissionCategoryEnabled(modules.mcServer.InputPermissionCategory.LateralMovement),
                    // ms for 1000 runs: 2
                    Sneak: player.inputPermissions.isPermissionCategoryEnabled(modules.mcServer.InputPermissionCategory.Sneak),
                    // ms for 1000 runs: 2
                    Jump: player.inputPermissions.isPermissionCategoryEnabled(modules.mcServer.InputPermissionCategory.Jump),
                    // ms for 1000 runs: 2
                    Mount: player.inputPermissions.isPermissionCategoryEnabled(modules.mcServer.InputPermissionCategory.Mount),
                    // ms for 1000 runs: 2
                    Dismount: player.inputPermissions.isPermissionCategoryEnabled(modules.mcServer.InputPermissionCategory.Dismount),
                    // ms for 1000 runs: 2
                    MoveForward: player.inputPermissions.isPermissionCategoryEnabled(modules.mcServer.InputPermissionCategory.MoveForward),
                    // ms for 1000 runs: 2
                    MoveBackward: player.inputPermissions.isPermissionCategoryEnabled(modules.mcServer.InputPermissionCategory.MoveBackward),
                    // ms for 1000 runs: 2
                    MoveLeft: player.inputPermissions.isPermissionCategoryEnabled(modules.mcServer.InputPermissionCategory.MoveLeft),
                    // ms for 1000 runs: 2
                    MoveRight: player.inputPermissions.isPermissionCategoryEnabled(modules.mcServer.InputPermissionCategory.MoveRight),
                },
                // ms for 1000 runs: 2
                inputInfo: {
                    // ms for 1000 runs: 1
                    lastInputModeUsed: player.inputInfo.lastInputModeUsed,
                    // ms for 1000 runs: 1
                    touchOnlyAffectsHotbar: player.inputInfo.touchOnlyAffectsHotbar,
                },
                // ms for 1000 runs: 20
                playerPermissions: player.playerPermissions.toJSON(),
                // ms for 1000 runs: 0
                onJoinActions: origData.onJoinActions ?? [],
                // ms for 1000 runs: 0
                saveMode: "full",
            })}
                */
        const origData = this.getSavedPlayer("player:" + player.id);
        let savedPlayerData;
        if (config.system.playerDataSavePerformanceMode === "full") {
            savedPlayerData = {
                // ms for 1000 runs: 1
                name: player.name,
                // ms for 1000 runs: 1-2
                nameTag: player.nameTag,
                // ms for 1000 runs: 0
                id: player.id,
                // ms for 1000 runs: 1
                isOp: player.isOp(),
                // ms for 1000 runs: 4
                tags: player.getTags(),
                // ms for 1000 runs: 1
                selectedSlotIndex: player.selectedSlotIndex,
                // ms for 1000 runs: 1
                scoreboardIdentity: player.scoreboardIdentity?.id,
                // ms for 1000 runs: 0
                format_version: format_version,
                // ms for 1000 runs: 0
                player_save_format_version: player_save_format_version,
                // ms for 1000 runs: 0
                lastOnline: Date.now(),
                // ms for 1000 runs: 0
                firstJoined: origData.firstJoined ?? Date.now(),
                // ms for 1000 runs: 2-3
                location: player.location,
                // ms for 1000 runs: 1
                dimension: player.dimension,
                // ms for 1000 runs: 2
                rotation: player.getRotation(),
                // ms for 1000 runs: 1-2
                gameMode: player.getGameMode(),
                // ms for 1000 runs: 1
                spawnPoint: player.getSpawnPoint(),
                // ms for 1000 runs: 1
                memoryTier: player.clientSystemInfo.memoryTier,
                // ms for 1000 runs: 1
                maxRenderDistance: player.clientSystemInfo.maxRenderDistance,
                // ms for 1000 runs: 1
                platformType: player.clientSystemInfo.platformType,
                // ms for 1000 runs: 22
                inputPermissions: {
                    // ms for 1000 runs: 2
                    Camera: player.inputPermissions.isPermissionCategoryEnabled(InputPermissionCategory.Camera),
                    // ms for 1000 runs: 2
                    Movement: player.inputPermissions.isPermissionCategoryEnabled(InputPermissionCategory.Movement),
                    // ms for 1000 runs: 2
                    LateralMovement: player.inputPermissions.isPermissionCategoryEnabled(InputPermissionCategory.LateralMovement),
                    // ms for 1000 runs: 2
                    Sneak: player.inputPermissions.isPermissionCategoryEnabled(InputPermissionCategory.Sneak),
                    // ms for 1000 runs: 2
                    Jump: player.inputPermissions.isPermissionCategoryEnabled(InputPermissionCategory.Jump),
                    // ms for 1000 runs: 2
                    Mount: player.inputPermissions.isPermissionCategoryEnabled(InputPermissionCategory.Mount),
                    // ms for 1000 runs: 2
                    Dismount: player.inputPermissions.isPermissionCategoryEnabled(InputPermissionCategory.Dismount),
                    // ms for 1000 runs: 2
                    MoveForward: player.inputPermissions.isPermissionCategoryEnabled(InputPermissionCategory.MoveForward),
                    // ms for 1000 runs: 2
                    MoveBackward: player.inputPermissions.isPermissionCategoryEnabled(InputPermissionCategory.MoveBackward),
                    // ms for 1000 runs: 2
                    MoveLeft: player.inputPermissions.isPermissionCategoryEnabled(InputPermissionCategory.MoveLeft),
                    // ms for 1000 runs: 2
                    MoveRight: player.inputPermissions.isPermissionCategoryEnabled(InputPermissionCategory.MoveRight),
                },
                // ms for 1000 runs: 2
                inputInfo: {
                    // ms for 1000 runs: 1
                    lastInputModeUsed: player.inputInfo.lastInputModeUsed,
                    // ms for 1000 runs: 1
                    touchOnlyAffectsHotbar: player.inputInfo.touchOnlyAffectsHotbar,
                },
                // ms for 1000 runs: 20
                playerPermissions: player.playerPermissions.toJSON(),
                // ms for 1000 runs: 0
                onJoinActions: origData.onJoinActions ?? [],
                // ms for 1000 runs: 0
                saveMode: "full",
            };
        }
        else if (config.system.playerDataSavePerformanceMode === "medium") {
            savedPlayerData = {
                // ms for 1000 runs: 1
                name: player.name,
                // ms for 1000 runs: 1-2
                nameTag: player.nameTag,
                // ms for 1000 runs: 0
                id: player.id,
                // ms for 1000 runs: 1
                isOp: player.isOp(),
                // ms for 1000 runs: 4
                tags: player.getTags(),
                // ms for 1000 runs: 1
                selectedSlotIndex: player.selectedSlotIndex,
                // ms for 1000 runs: 1
                scoreboardIdentity: player.scoreboardIdentity?.id,
                // ms for 1000 runs: 0
                format_version: format_version,
                // ms for 1000 runs: 0
                player_save_format_version: player_save_format_version,
                // ms for 1000 runs: 0
                lastOnline: Date.now(),
                // ms for 1000 runs: 0
                firstJoined: origData.firstJoined ?? Date.now(),
                // ms for 1000 runs: 2-3
                location: player.location,
                // ms for 1000 runs: 1
                dimension: player.dimension,
                // ms for 1000 runs: 2
                rotation: player.getRotation(),
                // ms for 1000 runs: 1-2
                gameMode: player.getGameMode(),
                // ms for 1000 runs: 1
                spawnPoint: player.getSpawnPoint(),
                // ms for 1000 runs: 1
                memoryTier: player.clientSystemInfo.memoryTier,
                // ms for 1000 runs: 1
                maxRenderDistance: player.clientSystemInfo.maxRenderDistance,
                // ms for 1000 runs: 1
                platformType: player.clientSystemInfo.platformType,
                // ms for 1000 runs: 2
                inputInfo: {
                    // ms for 1000 runs: 1
                    lastInputModeUsed: player.inputInfo.lastInputModeUsed,
                    // ms for 1000 runs: 1
                    touchOnlyAffectsHotbar: player.inputInfo.touchOnlyAffectsHotbar,
                },
                // ms for 1000 runs: 0
                onJoinActions: origData.onJoinActions ?? [],
                // ms for 1000 runs: 0
                saveMode: "medium",
            };
        }
        else {
            savedPlayerData = {
                // ms for 1000 runs: 1
                name: player.name,
                // ms for 1000 runs: 1-2
                nameTag: player.nameTag,
                // ms for 1000 runs: 0
                id: player.id,
                // ms for 1000 runs: 1
                scoreboardIdentity: player.scoreboardIdentity?.id,
                // ms for 1000 runs: 0
                format_version: format_version,
                // ms for 1000 runs: 0
                player_save_format_version: player_save_format_version,
                // ms for 1000 runs: 0
                lastOnline: Date.now(),
                // ms for 1000 runs: 0
                firstJoined: origData.firstJoined ?? Date.now(),
                // ms for 1000 runs: 2-3
                location: player.location,
                // ms for 1000 runs: 1
                dimension: player.dimension,
                // ms for 1000 runs: 2
                rotation: player.getRotation(),
                // ms for 1000 runs: 1-2
                gameMode: player.getGameMode(),
                // ms for 1000 runs: 1
                spawnPoint: player.getSpawnPoint(),
                // ms for 1000 runs: 1
                memoryTier: player.clientSystemInfo.memoryTier,
                // ms for 1000 runs: 1
                maxRenderDistance: player.clientSystemInfo.maxRenderDistance,
                // ms for 1000 runs: 1
                platformType: player.clientSystemInfo.platformType,
                // ms for 1000 runs: 2
                inputInfo: {
                    // ms for 1000 runs: 1
                    lastInputModeUsed: player.inputInfo.lastInputModeUsed,
                    // ms for 1000 runs: 1
                    touchOnlyAffectsHotbar: player.inputInfo.touchOnlyAffectsHotbar,
                },
                // ms for 1000 runs: 0
                onJoinActions: origData.onJoinActions ?? [],
                // ms for 1000 runs: 0
                saveMode: "lite",
            };
        }
        savedPlayerData.saveId = savedPlayerData.saveId ?? "player:" + savedPlayerData.id;
        savedPlayerData.format_version = savedPlayerData.format_version ?? format_version;
        if (config.system.playerInventoryDataSaveSystemEnabled) {
            if (config.system.useLegacyPlayerInventoryDataSaveSystem ||
                semver.satisfies(savedPlayerData.player_save_format_version ?? "0.0.0", "<1.5.0-0", { includePrerelease: true })) {
                savedPlayerData.items = {
                    inventory: [],
                    equipment: [],
                    ender_chest: [],
                };
                for (let i = 0; i < player.getComponent("inventory").inventorySize; i++) {
                    if (player.getComponent("inventory").container.getItem(Number(i)) !== undefined) {
                        savedPlayerData.items.inventory.push({
                            id: player.getComponent("inventory").container.getItem(Number(i)).typeId,
                            slot: i,
                            enchants: player.getComponent("inventory").container.getItem(Number(i))?.getComponent("enchantable")?.getEnchantments().length != 0
                                ? player.getComponent("inventory").container.getItem(Number(i))?.getComponent("enchantable")?.getEnchantments()
                                : undefined,
                            name: player.getComponent("inventory").container.getItem(Number(i))?.nameTag,
                            count: player.getComponent("inventory").container.getItem(Number(i)).amount,
                        });
                    }
                    else {
                        savedPlayerData.items.inventory.push({
                            id: "",
                            slot: i,
                            count: 0,
                        });
                    }
                }
                savedPlayerData.items.inventory.push({
                    id: player.getComponent("equippable").getEquipment(EquipmentSlot.Head)?.typeId ?? "",
                    slot: "Head",
                    enchants: player.getComponent("equippable").getEquipment(EquipmentSlot.Head)?.getComponent("enchantable")?.getEnchantments().length != 0
                        ? player.getComponent("equippable").getEquipment(EquipmentSlot.Head)?.getComponent("enchantable")?.getEnchantments()
                        : undefined,
                    name: player.getComponent("equippable").getEquipment(EquipmentSlot.Head)?.nameTag,
                    count: player.getComponent("equippable").getEquipment(EquipmentSlot.Head)?.amount ?? 0,
                });
                savedPlayerData.items.inventory.push({
                    id: player.getComponent("equippable").getEquipment(EquipmentSlot.Chest)?.typeId ?? "",
                    slot: "Chest",
                    enchants: player.getComponent("equippable").getEquipment(EquipmentSlot.Chest)?.getComponent("enchantable")?.getEnchantments().length != 0
                        ? player.getComponent("equippable").getEquipment(EquipmentSlot.Chest)?.getComponent("enchantable")?.getEnchantments()
                        : undefined,
                    name: player.getComponent("equippable").getEquipment(EquipmentSlot.Chest)?.nameTag,
                    count: player.getComponent("equippable").getEquipment(EquipmentSlot.Chest)?.amount ?? 0,
                });
                savedPlayerData.items.inventory.push({
                    id: player.getComponent("equippable").getEquipment(EquipmentSlot.Legs)?.typeId ?? "",
                    slot: "Legs",
                    enchants: player.getComponent("equippable").getEquipment(EquipmentSlot.Legs)?.getComponent("enchantable")?.getEnchantments().length != 0
                        ? player.getComponent("equippable").getEquipment(EquipmentSlot.Legs)?.getComponent("enchantable")?.getEnchantments()
                        : undefined,
                    name: player.getComponent("equippable").getEquipment(EquipmentSlot.Legs)?.nameTag,
                    count: player.getComponent("equippable").getEquipment(EquipmentSlot.Legs)?.amount ?? 0,
                });
                savedPlayerData.items.inventory.push({
                    id: player.getComponent("equippable").getEquipment(EquipmentSlot.Feet)?.typeId ?? "",
                    slot: "Feet",
                    enchants: player.getComponent("equippable").getEquipment(EquipmentSlot.Feet)?.getComponent("enchantable")?.getEnchantments().length != 0
                        ? player.getComponent("equippable").getEquipment(EquipmentSlot.Feet)?.getComponent("enchantable")?.getEnchantments()
                        : undefined,
                    name: player.getComponent("equippable").getEquipment(EquipmentSlot.Feet)?.nameTag,
                    count: player.getComponent("equippable").getEquipment(EquipmentSlot.Feet)?.amount ?? 0,
                });
                savedPlayerData.items.inventory.push({
                    id: player.getComponent("equippable").getEquipment(EquipmentSlot.Offhand)?.typeId ?? "",
                    slot: "Offhand",
                    enchants: player.getComponent("equippable").getEquipment(EquipmentSlot.Offhand)?.getComponent("enchantable")?.getEnchantments().length != 0
                        ? player.getComponent("equippable").getEquipment(EquipmentSlot.Offhand)?.getComponent("enchantable")?.getEnchantments()
                        : undefined,
                    name: player.getComponent("equippable").getEquipment(EquipmentSlot.Offhand)?.nameTag,
                    count: player.getComponent("equippable").getEquipment(EquipmentSlot.Offhand)?.amount ?? 0,
                });
            }
            else if (!config.system.useLegacyPlayerInventoryDataSaveSystem &&
                semver.satisfies(savedPlayerData.player_save_format_version ?? "0.0.0", ">=1.5.0", { includePrerelease: true })) {
                this.saveInventory(player, {
                    rethrowErrorInFinally: false,
                    bypassParameterTypeChecks: true,
                });
            }
        }
        world.setDynamicProperty(savedPlayerData.saveId ?? `player:${savedPlayerData.id}`, JSON.stringify(savedPlayerData));
        return savedPlayerData.saveId ?? `player:${savedPlayerData.id}`;
    }
    static async savePlayerAsync(player) {
        // let t1 = Date.now();
        if (!player.isValid) {
            console.warn(`Player data save canceled for ${player.id} because the player is no longer valid, likely because they left during the save process.`);
            return undefined;
        } /*
        // playerDataSaveDebug
        world.getAllPlayers().filter(p=>p.hasTag("playerDataSaveDebug")).forEach(p=>p.sendMessage(`§r[${formatTime(new Date(Date.now() + (Number(p.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbSettings:timeZone") ?? 0) * 3600000)))}] §r[§l§bplayerDataSaveDebug§r] savePlayerAsync() for player ${tryget(()=>player?.name??"undefined")??"ERROR"}<${tryget(()=>player?.id??"undefined")??"ERROR"}>`)) */
        const origData = tryget(() => this.getSavedPlayer("player:" + player.id)) ?? {};
        let savedPlayerData;
        if (config.system.playerDataSavePerformanceMode === "full") {
            savedPlayerData = {
                // ms for 1000 runs: 1
                name: player.name,
                // ms for 1000 runs: 1-2
                nameTag: player.nameTag,
                // ms for 1000 runs: 0
                id: player.id,
                // ms for 1000 runs: 1
                isOp: player.isOp(),
                // ms for 1000 runs: 4
                tags: player.getTags(),
                // ms for 1000 runs: 1
                selectedSlotIndex: player.selectedSlotIndex,
                // ms for 1000 runs: 1
                scoreboardIdentity: player.scoreboardIdentity?.id,
                // ms for 1000 runs: 0
                format_version: format_version,
                // ms for 1000 runs: 0
                player_save_format_version: player_save_format_version,
                // ms for 1000 runs: 0
                lastOnline: Date.now(),
                // ms for 1000 runs: 0
                firstJoined: origData.firstJoined ?? Date.now(),
                // ms for 1000 runs: 2-3
                location: player.location,
                // ms for 1000 runs: 1
                dimension: player.dimension,
                // ms for 1000 runs: 2
                rotation: player.getRotation(),
                // ms for 1000 runs: 1-2
                gameMode: player.getGameMode(),
                // ms for 1000 runs: 1
                spawnPoint: player.getSpawnPoint(),
                // ms for 1000 runs: 1
                memoryTier: player.clientSystemInfo.memoryTier,
                // ms for 1000 runs: 1
                maxRenderDistance: player.clientSystemInfo.maxRenderDistance,
                // ms for 1000 runs: 1
                platformType: player.clientSystemInfo.platformType,
                // ms for 1000 runs: 22
                inputPermissions: {
                    // ms for 1000 runs: 2
                    Camera: player.inputPermissions.isPermissionCategoryEnabled(InputPermissionCategory.Camera),
                    // ms for 1000 runs: 2
                    Movement: player.inputPermissions.isPermissionCategoryEnabled(InputPermissionCategory.Movement),
                    // ms for 1000 runs: 2
                    LateralMovement: player.inputPermissions.isPermissionCategoryEnabled(InputPermissionCategory.LateralMovement),
                    // ms for 1000 runs: 2
                    Sneak: player.inputPermissions.isPermissionCategoryEnabled(InputPermissionCategory.Sneak),
                    // ms for 1000 runs: 2
                    Jump: player.inputPermissions.isPermissionCategoryEnabled(InputPermissionCategory.Jump),
                    // ms for 1000 runs: 2
                    Mount: player.inputPermissions.isPermissionCategoryEnabled(InputPermissionCategory.Mount),
                    // ms for 1000 runs: 2
                    Dismount: player.inputPermissions.isPermissionCategoryEnabled(InputPermissionCategory.Dismount),
                    // ms for 1000 runs: 2
                    MoveForward: player.inputPermissions.isPermissionCategoryEnabled(InputPermissionCategory.MoveForward),
                    // ms for 1000 runs: 2
                    MoveBackward: player.inputPermissions.isPermissionCategoryEnabled(InputPermissionCategory.MoveBackward),
                    // ms for 1000 runs: 2
                    MoveLeft: player.inputPermissions.isPermissionCategoryEnabled(InputPermissionCategory.MoveLeft),
                    // ms for 1000 runs: 2
                    MoveRight: player.inputPermissions.isPermissionCategoryEnabled(InputPermissionCategory.MoveRight),
                },
                // ms for 1000 runs: 2
                inputInfo: {
                    // ms for 1000 runs: 1
                    lastInputModeUsed: player.inputInfo.lastInputModeUsed,
                    // ms for 1000 runs: 1
                    touchOnlyAffectsHotbar: player.inputInfo.touchOnlyAffectsHotbar,
                },
                // ms for 1000 runs: 20
                playerPermissions: player.playerPermissions.toJSON(),
                // ms for 1000 runs: 0
                onJoinActions: origData.onJoinActions ?? [],
                // ms for 1000 runs: 0
                saveMode: "full",
            };
        }
        else if (config.system.playerDataSavePerformanceMode === "medium") {
            savedPlayerData = {
                // ms for 1000 runs: 1
                name: player.name,
                // ms for 1000 runs: 1-2
                nameTag: player.nameTag,
                // ms for 1000 runs: 0
                id: player.id,
                // ms for 1000 runs: 1
                isOp: player.isOp(),
                // ms for 1000 runs: 4
                tags: player.getTags(),
                // ms for 1000 runs: 1
                selectedSlotIndex: player.selectedSlotIndex,
                // ms for 1000 runs: 1
                scoreboardIdentity: player.scoreboardIdentity?.id,
                // ms for 1000 runs: 0
                format_version: format_version,
                // ms for 1000 runs: 0
                player_save_format_version: player_save_format_version,
                // ms for 1000 runs: 0
                lastOnline: Date.now(),
                // ms for 1000 runs: 0
                firstJoined: origData.firstJoined ?? Date.now(),
                // ms for 1000 runs: 2-3
                location: player.location,
                // ms for 1000 runs: 1
                dimension: player.dimension,
                // ms for 1000 runs: 2
                rotation: player.getRotation(),
                // ms for 1000 runs: 1-2
                gameMode: player.getGameMode(),
                // ms for 1000 runs: 1
                spawnPoint: player.getSpawnPoint(),
                // ms for 1000 runs: 1
                memoryTier: player.clientSystemInfo.memoryTier,
                // ms for 1000 runs: 1
                maxRenderDistance: player.clientSystemInfo.maxRenderDistance,
                // ms for 1000 runs: 1
                platformType: player.clientSystemInfo.platformType,
                // ms for 1000 runs: 2
                inputInfo: {
                    // ms for 1000 runs: 1
                    lastInputModeUsed: player.inputInfo.lastInputModeUsed,
                    // ms for 1000 runs: 1
                    touchOnlyAffectsHotbar: player.inputInfo.touchOnlyAffectsHotbar,
                },
                // ms for 1000 runs: 0
                onJoinActions: origData.onJoinActions ?? [],
                // ms for 1000 runs: 0
                saveMode: "medium",
            };
        }
        else {
            savedPlayerData = {
                // ms for 1000 runs: 1
                name: player.name,
                // ms for 1000 runs: 1-2
                nameTag: player.nameTag,
                // ms for 1000 runs: 0
                id: player.id,
                // ms for 1000 runs: 1
                scoreboardIdentity: player.scoreboardIdentity?.id,
                // ms for 1000 runs: 0
                format_version: format_version,
                // ms for 1000 runs: 0
                player_save_format_version: player_save_format_version,
                // ms for 1000 runs: 0
                lastOnline: Date.now(),
                // ms for 1000 runs: 0
                firstJoined: origData.firstJoined ?? Date.now(),
                // ms for 1000 runs: 2-3
                location: player.location,
                // ms for 1000 runs: 1
                dimension: player.dimension,
                // ms for 1000 runs: 2
                rotation: player.getRotation(),
                // ms for 1000 runs: 1-2
                gameMode: player.getGameMode(),
                // ms for 1000 runs: 1
                spawnPoint: player.getSpawnPoint(),
                // ms for 1000 runs: 1
                memoryTier: player.clientSystemInfo.memoryTier,
                // ms for 1000 runs: 1
                maxRenderDistance: player.clientSystemInfo.maxRenderDistance,
                // ms for 1000 runs: 1
                platformType: player.clientSystemInfo.platformType,
                // ms for 1000 runs: 2
                inputInfo: {
                    // ms for 1000 runs: 1
                    lastInputModeUsed: player.inputInfo.lastInputModeUsed,
                    // ms for 1000 runs: 1
                    touchOnlyAffectsHotbar: player.inputInfo.touchOnlyAffectsHotbar,
                },
                // ms for 1000 runs: 0
                onJoinActions: origData.onJoinActions ?? [],
                // ms for 1000 runs: 0
                saveMode: "lite",
            };
        }
        savedPlayerData.saveId = savedPlayerData.saveId ?? "player:" + savedPlayerData.id;
        savedPlayerData.format_version = savedPlayerData.format_version ?? format_version;
        if (config.system.playerInventoryDataSaveSystemEnabled) {
            if (config.system.useLegacyPlayerInventoryDataSaveSystem ||
                semver.satisfies(savedPlayerData.player_save_format_version ?? "0.0.0", "<1.5.0-0", { includePrerelease: true })) {
                savedPlayerData.items = {
                    inventory: [],
                    equipment: [],
                    ender_chest: [],
                };
                for (let i = 0; i < player.getComponent("inventory").inventorySize; i++) {
                    if (player.getComponent("inventory").container.getItem(Number(i)) !== undefined) {
                        savedPlayerData.items.inventory.push({
                            id: player.getComponent("inventory").container.getItem(Number(i)).typeId,
                            slot: i,
                            enchants: player.getComponent("inventory").container.getItem(Number(i))?.getComponent("enchantable")?.getEnchantments().length != 0
                                ? player.getComponent("inventory").container.getItem(Number(i))?.getComponent("enchantable")?.getEnchantments()
                                : undefined,
                            name: player.getComponent("inventory").container.getItem(Number(i))?.nameTag,
                            count: player.getComponent("inventory").container.getItem(Number(i)).amount,
                        });
                    }
                    else {
                        savedPlayerData.items.inventory.push({
                            id: "",
                            slot: i,
                            count: 0,
                        });
                    }
                }
                savedPlayerData.items.inventory.push({
                    id: player.getComponent("equippable").getEquipment(EquipmentSlot.Head)?.typeId ?? "",
                    slot: "Head",
                    enchants: player.getComponent("equippable").getEquipment(EquipmentSlot.Head)?.getComponent("enchantable")?.getEnchantments().length != 0
                        ? player.getComponent("equippable").getEquipment(EquipmentSlot.Head)?.getComponent("enchantable")?.getEnchantments()
                        : undefined,
                    name: player.getComponent("equippable").getEquipment(EquipmentSlot.Head)?.nameTag,
                    count: player.getComponent("equippable").getEquipment(EquipmentSlot.Head)?.amount ?? 0,
                });
                savedPlayerData.items.inventory.push({
                    id: player.getComponent("equippable").getEquipment(EquipmentSlot.Chest)?.typeId ?? "",
                    slot: "Chest",
                    enchants: player.getComponent("equippable").getEquipment(EquipmentSlot.Chest)?.getComponent("enchantable")?.getEnchantments().length != 0
                        ? player.getComponent("equippable").getEquipment(EquipmentSlot.Chest)?.getComponent("enchantable")?.getEnchantments()
                        : undefined,
                    name: player.getComponent("equippable").getEquipment(EquipmentSlot.Chest)?.nameTag,
                    count: player.getComponent("equippable").getEquipment(EquipmentSlot.Chest)?.amount ?? 0,
                });
                savedPlayerData.items.inventory.push({
                    id: player.getComponent("equippable").getEquipment(EquipmentSlot.Legs)?.typeId ?? "",
                    slot: "Legs",
                    enchants: player.getComponent("equippable").getEquipment(EquipmentSlot.Legs)?.getComponent("enchantable")?.getEnchantments().length != 0
                        ? player.getComponent("equippable").getEquipment(EquipmentSlot.Legs)?.getComponent("enchantable")?.getEnchantments()
                        : undefined,
                    name: player.getComponent("equippable").getEquipment(EquipmentSlot.Legs)?.nameTag,
                    count: player.getComponent("equippable").getEquipment(EquipmentSlot.Legs)?.amount ?? 0,
                });
                savedPlayerData.items.inventory.push({
                    id: player.getComponent("equippable").getEquipment(EquipmentSlot.Feet)?.typeId ?? "",
                    slot: "Feet",
                    enchants: player.getComponent("equippable").getEquipment(EquipmentSlot.Feet)?.getComponent("enchantable")?.getEnchantments().length != 0
                        ? player.getComponent("equippable").getEquipment(EquipmentSlot.Feet)?.getComponent("enchantable")?.getEnchantments()
                        : undefined,
                    name: player.getComponent("equippable").getEquipment(EquipmentSlot.Feet)?.nameTag,
                    count: player.getComponent("equippable").getEquipment(EquipmentSlot.Feet)?.amount ?? 0,
                });
                savedPlayerData.items.inventory.push({
                    id: player.getComponent("equippable").getEquipment(EquipmentSlot.Offhand)?.typeId ?? "",
                    slot: "Offhand",
                    enchants: player.getComponent("equippable").getEquipment(EquipmentSlot.Offhand)?.getComponent("enchantable")?.getEnchantments().length != 0
                        ? player.getComponent("equippable").getEquipment(EquipmentSlot.Offhand)?.getComponent("enchantable")?.getEnchantments()
                        : undefined,
                    name: player.getComponent("equippable").getEquipment(EquipmentSlot.Offhand)?.nameTag,
                    count: player.getComponent("equippable").getEquipment(EquipmentSlot.Offhand)?.amount ?? 0,
                });
            }
            else if (!config.system.useLegacyPlayerInventoryDataSaveSystem &&
                semver.satisfies(savedPlayerData.player_save_format_version ?? "0.0.0", ">=1.5.0", { includePrerelease: true })) {
                await waitTick();
                if (!player.isValid) {
                    console.warn(`Player data save canceled for ${player.id} because the player is no longer valid, likely because they left during the save process.`);
                    return undefined;
                }
                await this.saveInventoryAsync(player, {
                    rethrowErrorInFinally: false,
                    bypassParameterTypeChecks: true,
                });
            }
        }
        if (!player.isValid) {
            console.warn(`Player data save canceled for ${player.id} because the player is no longer valid, likely because they left during the save process.`);
            return undefined;
        }
        world.setDynamicProperty(savedPlayerData.saveId ?? `player:${savedPlayerData.id}`, JSON.stringify(savedPlayerData));
        // let t2 = Date.now();
        // console.log(`player_save: Saved player ${player.id} in ${t2 - t1}ms`);
        return savedPlayerData.saveId ?? `player:${savedPlayerData.id}`;
    } /*
getBan(banId: string){let banString = String(world.getDynamicProperty(banId)).split("||"); this.removeAfterBanExpires=Boolean(Number(banString[0])); this.unbanDate=new Date(Number(banString[1])); this.banDate=new Date(Number(banString[2])); if(banId.startsWith("ban")){this.originalPlayerId=Number(banString[3]); this.playerName=banId.split(":").slice(1).join(":"); }else{if(banId.startsWith("idBan")){this.originalPlayerName=Number(banString[3]); this.playerName=Number(playerId.split(":")[1]); }else{}}; this.bannedById=Number(banString[4]); this.bannedByName=banString[5].replaceAll("\\|", "|"); this.playerName=banString.slice(6).join("||"); return this as ban}*/
    static getSavedPlayer(savedPlayerId) {
        let playerString = String(world.getDynamicProperty(savedPlayerId));
        if (playerString === "undefined") {
            return undefined;
        }
        return new savedPlayer(JSON.parse(playerString));
    }
    static getSavedPlayers() {
        let players;
        players = [];
        savedPlayer.getSavedPlayerIds().forEachB((b) => {
            players.push(savedPlayer.getSavedPlayer(b));
        });
        return players;
    }
    static getSavedPlayersAlphabeticalOrder() {
        let players;
        players = [];
        savedPlayer.getSavedPlayerIds().forEach((b) => {
            players.push(savedPlayer.getSavedPlayer(b));
        });
        return players.sort((a, b) => 1 - 2 * Number([String(a.name.toLowerCase()), String(b.name.toLowerCase())].sort()[0] == String(a.name.toLowerCase())));
    }
}
//# sourceMappingURL=savedPlayer.js.map