import { EquipmentSlot, type Enchantment, type Vector3, Dimension, type Vector2, type DimensionLocation, GameMode, world, Player, system, MemoryTier, PlatformType, StructureSaveMode, ItemStack, PlayerInputPermissions } from "@minecraft/server";
import { format_version, config } from "Main";
import { ban } from "./ban";
import { listoftransformrecipes } from "Assets/constants/transformrecipes";
import * as GameTest from "@minecraft/server-gametest";
import * as mcServer from "@minecraft/server";
import * as mcServerUi from "@minecraft/server-ui";/*
import * as mcServerAdmin from "@minecraft/server-admin";*//*
import * as mcDebugUtilities from "@minecraft/debug-utilities";*//*
import * as mcCommon from "@minecraft/common";*//*
import * as mcVanillaData from "@minecraft/vanilla-data";*/
import *  as main from "Main";
import *  as transformrecipes from "Assets/constants/transformrecipes";
import *  as coords from "Main/coordinates";
import *  as cmds from "Main/commands";
import *  as bans from "Main/ban";
import *  as uis from "Main/ui";
import *  as playersave from "Main/player_save";
import *  as spawnprot from "Main/spawn_protection";
import *  as chat from "./chat";
import *  as cmdutils from "./command_utilities";
import *  as utils from "./utilities";
import *  as errors from "./errors";
import mcMath from "@minecraft/math.js";
import { Vector } from "Main/coordinates";
import { EquipmentSlots } from "./command_utilities";
mcServer
mcServerUi/*
mcServerAdmin*//*
mcDebugUtilities*//*
mcCommon*/
GameTest/*
mcVanillaData*/
main
coords
cmds
bans
uis
playersave
spawnprot
mcMath

export const player_save_format_version = "1.5.0";
export interface savedItem { 
    id?: string
    count: number
    slot?: number|EquipmentSlot|string
    name?: string
    lore?: string[]
    enchants?: Enchantment[]
    properties?: [id: string, value: string|number|Boolean|Vector3|undefined][]
}
export interface savedPlayerData { 
    name: string
    id: string
    nameTag?: string
    tags?: string[]
    items?: {inventory: savedItem[]|undefined, equipment: savedItem[]|undefined, ender_chest: savedItem[]|undefined}
    properties?: [id: string|undefined, value: string|number|Boolean|Vector3|undefined][]
    lastOnline: number
    firstJoined?: number
    location?: Vector3
    dimension?: Dimension|string
    rotation?: Vector2
    isOp?: boolean
    spawnPoint?: DimensionLocation
    gameMode?: GameMode|string
    selectedSlotIndex?: number
    format_version?: string
    player_save_format_version?: string
    saveId?: string
    memoryTier?: MemoryTier
    maxRenderDistance?: number
    platformType?: PlatformType
    inputPermissions?: PlayerInputPermissions
}/*
new savedPlayer({items: {inventory: [{enchants: null, count: 1}]}})*/
export class savedPlayer {
    name: string;
    id: string;
    nameTag?: string;
    tags?: string[];
    items?: {
        inventory: savedItem[] | undefined;
        equipment: savedItem[] | undefined;
        ender_chest: savedItem[] | undefined;
    };
    properties?: [
        id: string | undefined,
        value: string | number | Boolean | Vector3 | undefined
    ][];
    lastOnline: number;
    firstJoined: number;
    location?: Vector3;
    dimension?: Dimension | string;
    rotation?: Vector2;
    isOp?: boolean;
    spawnPoint?: DimensionLocation;
    gameMode?: GameMode | string;
    selectedSlotIndex?: number;
    scoreboardIdentity?: number;
    format_version: string = format_version;
    player_save_format_version: string = player_save_format_version;
    saveId: string;
    memoryTier?: MemoryTier;
    maxRenderDistance?: number;
    platformType?: PlatformType;
    inputPermissions?: PlayerInputPermissions;
    constructor(data: savedPlayerData) {
        if (
            !!data.format_version &&
            semver.gt(
                data.player_save_format_version??"0.0.0",
                player_save_format_version
            )
        ) {
            throw new ParseError(
                `The saved player data could not be parsed because it was last saved in a newer format version. Data format version: ${JSON.stringify(
                    data.player_save_format_version
                )}. Current format version: ${JSON.stringify(
                    player_save_format_version
                )}.`
            );
        }
        this.format_version = data.format_version ?? format_version;
        this.player_save_format_version =
            data.player_save_format_version ?? player_save_format_version;
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
        this.saveId = data.saveId ?? "player:" + this.id;
        if (
            semver.satisfies(
                data.player_save_format_version??"0.0.0",
                ">=1.4.0 <2.0.0",
                { includePrerelease: true }
            )
        ) {
            this.memoryTier = data.memoryTier;
            this.maxRenderDistance = data.maxRenderDistance;
            this.platformType = data.platformType;
        }
        if (
            semver.satisfies(
                data.player_save_format_version??"0.0.0",
                "<1.5.0",
                { includePrerelease: true }
            )
        ) {
            this.items = data.items;
        }
    }
    save() {
        world.setDynamicProperty(this.saveId, JSON.stringify(this));
    }
    remove() {
        world.setDynamicProperty(this.saveId);
    }
    getItems(sourceLoc: DimensionLocation){
        return savedPlayer.getSavedInventory(this.id, sourceLoc, {bypassParameterTypeChecks: true, rethrowErrorInFinally: false})
    }
    get isOnline() {
        return world.getAllPlayers().find((_) => _.id == this.id) != undefined;
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
        let bans = ban
            .getBans()
            .allBans.filter(
                (b) => b.playerId == this.id || b.playerName == this.name
            );
        return {
            all: bans,
            valid: bans.filter((b) => b.isValid),
            expired: bans.filter((b) => b.isExpired),
        };
    }
    get nameBans() {
        let bans = ban
            .getBans()
            .nameBans.filter((b) => b.playerName == this.name);
        return {
            all: bans,
            valid: bans.filter((b) => b.isValid),
            expired: bans.filter((b) => b.isExpired),
        };
    }
    get idBans() {
        let bans = ban.getBans().idBans.filter((b) => b.playerId == this.id);
        return {
            all: bans,
            valid: bans.filter((b) => b.isValid),
            expired: bans.filter((b) => b.isExpired),
        };
    }
    static getSavedPlayerIds() {
        return world
            .getDynamicPropertyIds()
            .filter((s) => s.startsWith("player:"));
    } /*
saveBan(ban: ban){if(ban.type=="name"){world.setDynamicProperty(`ban:${ban.playerName}`, `${Number(ban.removeAfterBanExpires)}||${ban.unbanDate.valueOf()}||${ban.banDate.valueOf()}||${ban.originalPlayerId}||${ban.bannedById}||${ban.bannedByName.replaceAll("|", "\\|")}||${ban.reason}`)}else{if(ban.type=="id"){world.setDynamicProperty(`idBan:${ban.playerId}`, `${Number(ban.removeAfterBanExpires)}||${ban.unbanDate.valueOf()}||${ban.banDate.valueOf()}||${ban.originalPlayerName.replaceAll("|", "\\|")}||${ban.bannedById}||${ban.bannedByName.replaceAll("|", "\\|")}||${ban.reason}`)}else{}}}*/
    static savePlayerData(savedPlayerData: savedPlayerData) {
        savedPlayerData.saveId =
            savedPlayerData.saveId ?? "player:" + savedPlayerData.id;
        savedPlayerData.format_version =
            savedPlayerData.format_version ?? format_version;
        savedPlayerData.player_save_format_version =
            savedPlayerData.player_save_format_version ?? player_save_format_version;
        world.setDynamicProperty(
            savedPlayerData.saveId ?? `player:${savedPlayerData.id}`,
            JSON.stringify(savedPlayerData)
        );
        return savedPlayerData.saveId ?? `player:${savedPlayerData.id}`;
    }
    static async saveInventoryAsync(player: Player, options: {rethrowErrorInFinally?: boolean, bypassParameterTypeChecks?: boolean} = {rethrowErrorInFinally: true, bypassParameterTypeChecks: false}) {
        if(!(options.bypassParameterTypeChecks??false)){
            if(typeof options != "object"){
                throw new SyntaxError(`Invalid value passed to the options parameter (args[1]), expected type of "object" but got type of ${JSON.stringify(typeof options)} instead.`)
            }
            if(options===null){
                throw new SyntaxError(`Invalid value passed to the options parameter (args[1]), value cannot be null.`)
            }
            if(player?.constructor?.name!="Player"){
                throw new SyntaxError(`Invalid value passed to the player parameter (args[0]), expected Player but got ${typeof player == "object" ? player?.constructor?.name??tryget(()=>JSON.stringify(player))??"?" : typeof player}} instead.`)
            }
        }
        const entity = player.dimension.spawnEntity(
            "andexdb:player_inventory_save_storage",
            {
                x: player.x.floor()+0.5,
                y: player.dimension.heightRange.max - 1.5,
                z: player.z.floor()+0.5,
            }
        );
        entity.setDynamicProperty(
            "andexdb:playerInventorySaveStoragePlayerID",
            player.id
        );
        try {
            var t = Date.now()
            const ei = entity.inventory.container
            const pi = player.inventory.container
            const pe = player.equippable
            for(let i = 0; i<player.inventory.inventorySize; i++){
                if(Date.now()-t>0){
                    await waitTick()
                    t = Date.now()
                }
                try{
                    ei.setItem(i, pi.getItem(i))
                }catch(e){}
            }
            for(let i = 0; i<6; i++){
                if(Date.now()-t>0){
                    await waitTick()
                    t = Date.now()
                }
                try{
                    ei.setItem(36+i, pe.getEquipment(EquipmentSlots[i]))
                }catch(e){}
            }
            try{
                ei.setItem(42, player.cursorInventory.item)
            }catch(e){}
        } catch (e) {}
        try {
            /**
             * This makes the script temporarily teleport the other entities away so that when it saves the storage entity, it can't save and possibly duplicate other entities.
             */
            var otherEntities =
                tryget(() =>
                    player.dimension
                        .getEntitiesAtBlockLocation({
                            x: player.x.floor() + 0.5,
                            y: player.dimension.heightRange.max - 1.5,
                            z: player.z.floor() + 0.5,
                        })
                        .filter(
                            (v) => v.id != entity.id && !(v instanceof Player)
                        )
                ) ?? [];
            var locs = otherEntities.map((v) => v.location);
            otherEntities.forEach((v) =>
                tryrun(() =>
                    v.teleport(Vector.add(v.location, { x: 0, y: 50, z: 0 }))
                )
            );
            try {
                world.structureManager.delete(
                    "player_inventory_save_storage:" + player.id
                );
            } catch {}
            world.structureManager.createFromWorld(
                "player_inventory_save_storage:" + player.id,
                player.dimension,
                {
                    x: player.x.floor(),
                    y: player.dimension.heightRange.max - 2,
                    z: player.z.floor(),
                },
                {
                    x: player.x.floor(),
                    y: player.dimension.heightRange.max - 2,
                    z: player.z.floor(),
                },
                {
                    includeBlocks: false,
                    includeEntities: true,
                    saveMode: StructureSaveMode.World,
                }
            );
        } catch (e) {
            var error = e;
        } finally {
            try {
                otherEntities.forEach((v, i) =>
                    tryrun(() => v.teleport(locs[i], { keepVelocity: false }))
                );
            } catch {}
            try {
                entity.remove();
            } catch {}
            if((options.rethrowErrorInFinally??true)&&!!error){
                throw error;
            }
        }
    }
    static saveInventory(player: Player, options: {rethrowErrorInFinally?: boolean, bypassParameterTypeChecks?: boolean} = {rethrowErrorInFinally: true, bypassParameterTypeChecks: false}) {
        if(!(options.bypassParameterTypeChecks??false)){
            if(typeof options != "object"){
                throw new SyntaxError(`Invalid value passed to the options parameter (args[1]), expected type of "object" but got type of ${JSON.stringify(typeof options)} instead.`)
            }
            if(options===null){
                throw new SyntaxError(`Invalid value passed to the options parameter (args[1]), value cannot be null.`)
            }
            if(player?.constructor?.name!="Player"){
                throw new SyntaxError(`Invalid value passed to the player parameter (args[0]), expected Player but got ${typeof player == "object" ? player?.constructor?.name??tryget(()=>JSON.stringify(player))??"?" : typeof player}} instead.`)
            }
        }
        const entity = player.dimension.spawnEntity(
            "andexdb:player_inventory_save_storage",
            {
                x: player.x.floor()+0.5,
                y: player.dimension.heightRange.max - 1.5,
                z: player.z.floor()+0.5,
            }
        );
        entity.setDynamicProperty(
            "andexdb:playerInventorySaveStoragePlayerID",
            player.id
        );
        try {
            const ei = entity.inventory.container
            const pi = player.inventory.container
            const pe = player.equippable
            const inventorySize = player.inventory.inventorySize
            for(let i = 0; i<inventorySize; i++){
                try{ei.setItem(i, pi.getItem(i))}catch(e){}
            }
            for(let i = 0; i<6; i++){
                try{ei.setItem(36+i, pe.getEquipment(EquipmentSlots[i]))}catch(e){}
            }
            try{ei.setItem(42, player.cursorInventory.item)}catch(e){}
        } catch (e) {}
        try {
            const maxHeight = player.dimension.heightRange.max
            /**
             * This makes the script temporarily teleport the other entities away so that when it saves the storage entity, it can't save and possibly duplicate other entities.
             */
            var otherEntities =
                tryget(() =>
                    player.dimension
                        .getEntitiesAtBlockLocation({
                            x: player.x.floor() + 0.5,
                            y: maxHeight - 1.5,
                            z: player.z.floor() + 0.5,
                        })
                        .filter(
                            (v) => v.id != entity.id && !(v instanceof Player)
                        )
                ) ?? [];
            var locs = otherEntities.map((v) => v.location);
            otherEntities.forEach((v) =>
                tryrun(() =>
                    v.teleport(Vector.add(v.location, { x: 0, y: 50, z: 0 }))
                )
            );
            try {
                world.structureManager.delete(
                    "player_inventory_save_storage:" + player.id
                );
            } catch {}
            world.structureManager.createFromWorld(
                "player_inventory_save_storage:" + player.id,
                player.dimension,
                {
                    x: player.x.floor(),
                    y: maxHeight - 2,
                    z: player.z.floor(),
                },
                {
                    x: player.x.floor(),
                    y: maxHeight - 2,
                    z: player.z.floor(),
                },
                {
                    includeBlocks: false,
                    includeEntities: true,
                    saveMode: StructureSaveMode.World,
                }
            );
        } catch (e) {
            var error = e;
        } finally {
            try {
                otherEntities.forEach((v, i) =>
                    tryrun(() => v.teleport(locs[i], { keepVelocity: false }))
                );
            } catch {}
            try {
                entity.remove();
            } catch {}
            if((options.rethrowErrorInFinally??true)&&!!error){
                throw error;
            }
        }
    }
    static getSavedInventory(playerId: string, sourceLoc: DimensionLocation, options: {rethrowErrorInFinally?: boolean, bypassParameterTypeChecks?: boolean} = {rethrowErrorInFinally: true, bypassParameterTypeChecks: false}) {
        if(!(options.bypassParameterTypeChecks??false)){
            if(typeof playerId != "string"){
                throw new SyntaxError(`Invalid value passed to the playerId parameter (args[0]), expected type of "string" but got type of ${JSON.stringify(typeof options)} instead.`)
            }
            if(playerId===null){
                throw new SyntaxError(`Invalid value passed to the playerId parameter (args[0]), value cannot be null.`)
            }
            if(typeof options != "object"){
                throw new SyntaxError(`Invalid value passed to the options parameter (args[2]), expected type of "object" but got type of ${JSON.stringify(typeof options)} instead.`)
            }
            if(options===null){
                throw new SyntaxError(`Invalid value passed to the options parameter (args[2]), value cannot be null.`)
            }
            if(typeof sourceLoc != "object"){
                throw new SyntaxError(`Invalid value passed to the sourceLoc parameter (args[1]), expected type of "object" but got type of ${JSON.stringify(typeof sourceLoc)} instead.`)
            }
            if(sourceLoc===null){
                throw new SyntaxError(`Invalid value passed to the sourceLoc parameter (args[1]), value cannot be null.`)
            }
            if(!testForObjectTypeExtension(sourceLoc, {x: "number", y: "number", z: "number", dimension: "[object Dimension]"})){
                throw new SyntaxError(`Invalid value passed to the sourceLoc parameter (args[1]), expected DimensionLocation ({x: number, y: number, z: number, dimension: Dimension}) but got {${JSON.stringify(Object.entries(sourceLoc).map(v=>`${v[0]}: ${typeof v[1] == "object" ? v[1]?.constructor?.name??tryget(()=>JSON.stringify(v[1]))??"?" : typeof v[1]}`).join(", "))}} instead.`)
            }
        }
        const items: {
            Head?: ItemStack|undefined;
            Chest?: ItemStack|undefined;
            Legs?: ItemStack|undefined;
            Feet?: ItemStack|undefined;
            Mainhand?: ItemStack|undefined;
            Offhand?: ItemStack|undefined;
            Cursor?: ItemStack|undefined;
            0?: ItemStack|undefined;
            1?: ItemStack|undefined;
            2?: ItemStack|undefined;
            3?: ItemStack|undefined;
            4?: ItemStack|undefined;
            5?: ItemStack|undefined;
            6?: ItemStack|undefined;
            7?: ItemStack|undefined;
            8?: ItemStack|undefined;
            9?: ItemStack|undefined;
            10?: ItemStack|undefined;
            11?: ItemStack|undefined;
            12?: ItemStack|undefined;
            13?: ItemStack|undefined;
            14?: ItemStack|undefined;
            15?: ItemStack|undefined;
            16?: ItemStack|undefined;
            17?: ItemStack|undefined;
            18?: ItemStack|undefined;
            19?: ItemStack|undefined;
            20?: ItemStack|undefined;
            21?: ItemStack|undefined;
            22?: ItemStack|undefined;
            23?: ItemStack|undefined;
            24?: ItemStack|undefined;
            25?: ItemStack|undefined;
            26?: ItemStack|undefined;
            27?: ItemStack|undefined;
            28?: ItemStack|undefined;
            29?: ItemStack|undefined;
            30?: ItemStack|undefined;
            31?: ItemStack|undefined;
            32?: ItemStack|undefined;
            33?: ItemStack|undefined;
            34?: ItemStack|undefined;
            35?: ItemStack|undefined;
        } = {};
        const maxHeight = sourceLoc.dimension.heightRange.max
        world.structureManager.place(
            "player_inventory_save_storage:" + playerId,
            sourceLoc.dimension,
            {
                x: sourceLoc.x.floor(),
                y: maxHeight - 2,
                z: sourceLoc.z.floor(),
            },
            {
                includeBlocks: false,
                includeEntities: true,
            }
        );
        const entity = sourceLoc.dimension.getEntitiesAtBlockLocation(
            {
                x: sourceLoc.x.floor(),
                y: maxHeight - 2,
                z: sourceLoc.z.floor(),
            }
        ).find(v=>tryget(()=>String(v.getDynamicProperty("andexdb:playerInventorySaveStoragePlayerID")))==playerId)
        try {
            const ei = entity.inventory.container
            for(let i = 0; i<36; i++){
                try{
                    items[i]=ei.getItem(i)
                }catch(e){}
            }
            for(let i = 0; i<6; i++){
                try{
                    items[EquipmentSlots[i]]=ei.getItem(36+i)
                }catch(e){}
            }
            try{
                items.Cursor=ei.getItem(42)
            }catch(e){}
        } catch (e) {}
        try {
        } catch (e) {
            var error = e;
        } finally {
            try {
                entity.remove();
            } catch {}
            if((options.rethrowErrorInFinally??true)&&!!error){
                throw error;
            }
        }
        return items
    }
    static savePlayer(player: Player) {
        let savedPlayerData: savedPlayerData;
        savedPlayerData = {
            name: player.name,
            nameTag: player.nameTag,
            id: player.id,
            isOp: player.isOp(),
            tags: player.getTags(),
            selectedSlotIndex: player.selectedSlotIndex,
            format_version: format_version,
            player_save_format_version: player_save_format_version,
            lastOnline: Date.now(),
            firstJoined:
                tryget(
                    () => this.getSavedPlayer("player:" + player.id).firstJoined
                ) ?? Date.now(),
            location: player.location,
            dimension: player.dimension,
            rotation: player.getRotation(),
            gameMode: player.getGameMode(),
            spawnPoint: player.getSpawnPoint(),
            memoryTier: player.clientSystemInfo.memoryTier,
            maxRenderDistance: player.clientSystemInfo.maxRenderDistance,
            platformType: player.clientSystemInfo.platformType,
            inputPermissions: {cameraEnabled: player.inputPermissions.cameraEnabled, movementEnabled: player.inputPermissions.movementEnabled},
        };
        savedPlayerData.saveId =
            savedPlayerData.saveId ?? "player:" + savedPlayerData.id;
        savedPlayerData.format_version =
            savedPlayerData.format_version ?? format_version;
        if(config.system.playerInventoryDataSaveSystemEnabled){
            if(config.system.useLegacyPlayerInventoryDataSaveSystem||semver.satisfies(
                savedPlayerData.player_save_format_version??"0.0.0",
                "<1.5.0-0",
                { includePrerelease: true }
            )){
                savedPlayerData.items = { inventory: [], equipment: [], ender_chest: [] };
                for (
                    let i = 0;
                    i < player.getComponent("inventory").inventorySize;
                    i++
                ) {
                    if (
                        player
                            .getComponent("inventory")
                            .container.getItem(Number(i)) !== undefined
                    ) {
                        savedPlayerData.items.inventory.push({
                            id: player
                                .getComponent("inventory")
                                .container.getItem(Number(i)).typeId,
                            slot: i,
                            enchants:
                                player
                                    .getComponent("inventory")
                                    .container.getItem(Number(i))
                                    ?.getComponent("enchantable")
                                    ?.getEnchantments().length != 0
                                    ? player
                                        .getComponent("inventory")
                                        .container.getItem(Number(i))
                                        ?.getComponent("enchantable")
                                        ?.getEnchantments()
                                    : undefined,
                            name: player
                                .getComponent("inventory")
                                .container.getItem(Number(i))?.nameTag,
                            count: player
                                .getComponent("inventory")
                                .container.getItem(Number(i)).amount,
                        });
                    } else {
                        savedPlayerData.items.inventory.push({
                            id: "",
                            slot: i,
                            count: 0,
                        });
                    }
                }
                savedPlayerData.items.inventory.push({
                    id:
                        player
                            .getComponent("equippable")
                            .getEquipment(EquipmentSlot.Head)?.typeId ?? "",
                    slot: "Head",
                    enchants:
                        player
                            .getComponent("equippable")
                            .getEquipment(EquipmentSlot.Head)
                            ?.getComponent("enchantable")
                            ?.getEnchantments().length != 0
                            ? player
                                .getComponent("equippable")
                                .getEquipment(EquipmentSlot.Head)
                                ?.getComponent("enchantable")
                                ?.getEnchantments()
                            : undefined,
                    name: player
                        .getComponent("equippable")
                        .getEquipment(EquipmentSlot.Head)?.nameTag,
                    count:
                        player
                            .getComponent("equippable")
                            .getEquipment(EquipmentSlot.Head)?.amount ?? 0,
                });
                savedPlayerData.items.inventory.push({
                    id:
                        player
                            .getComponent("equippable")
                            .getEquipment(EquipmentSlot.Chest)?.typeId ?? "",
                    slot: "Chest",
                    enchants:
                        player
                            .getComponent("equippable")
                            .getEquipment(EquipmentSlot.Chest)
                            ?.getComponent("enchantable")
                            ?.getEnchantments().length != 0
                            ? player
                                .getComponent("equippable")
                                .getEquipment(EquipmentSlot.Chest)
                                ?.getComponent("enchantable")
                                ?.getEnchantments()
                            : undefined,
                    name: player
                        .getComponent("equippable")
                        .getEquipment(EquipmentSlot.Chest)?.nameTag,
                    count:
                        player
                            .getComponent("equippable")
                            .getEquipment(EquipmentSlot.Chest)?.amount ?? 0,
                });
                savedPlayerData.items.inventory.push({
                    id:
                        player
                            .getComponent("equippable")
                            .getEquipment(EquipmentSlot.Legs)?.typeId ?? "",
                    slot: "Legs",
                    enchants:
                        player
                            .getComponent("equippable")
                            .getEquipment(EquipmentSlot.Legs)
                            ?.getComponent("enchantable")
                            ?.getEnchantments().length != 0
                            ? player
                                .getComponent("equippable")
                                .getEquipment(EquipmentSlot.Legs)
                                ?.getComponent("enchantable")
                                ?.getEnchantments()
                            : undefined,
                    name: player
                        .getComponent("equippable")
                        .getEquipment(EquipmentSlot.Legs)?.nameTag,
                    count:
                        player
                            .getComponent("equippable")
                            .getEquipment(EquipmentSlot.Legs)?.amount ?? 0,
                });
                savedPlayerData.items.inventory.push({
                    id:
                        player
                            .getComponent("equippable")
                            .getEquipment(EquipmentSlot.Feet)?.typeId ?? "",
                    slot: "Feet",
                    enchants:
                        player
                            .getComponent("equippable")
                            .getEquipment(EquipmentSlot.Feet)
                            ?.getComponent("enchantable")
                            ?.getEnchantments().length != 0
                            ? player
                                .getComponent("equippable")
                                .getEquipment(EquipmentSlot.Feet)
                                ?.getComponent("enchantable")
                                ?.getEnchantments()
                            : undefined,
                    name: player
                        .getComponent("equippable")
                        .getEquipment(EquipmentSlot.Feet)?.nameTag,
                    count:
                        player
                            .getComponent("equippable")
                            .getEquipment(EquipmentSlot.Feet)?.amount ?? 0,
                });
                savedPlayerData.items.inventory.push({
                    id:
                        player
                            .getComponent("equippable")
                            .getEquipment(EquipmentSlot.Offhand)?.typeId ?? "",
                    slot: "Offhand",
                    enchants:
                        player
                            .getComponent("equippable")
                            .getEquipment(EquipmentSlot.Offhand)
                            ?.getComponent("enchantable")
                            ?.getEnchantments().length != 0
                            ? player
                                .getComponent("equippable")
                                .getEquipment(EquipmentSlot.Offhand)
                                ?.getComponent("enchantable")
                                ?.getEnchantments()
                            : undefined,
                    name: player
                        .getComponent("equippable")
                        .getEquipment(EquipmentSlot.Offhand)?.nameTag,
                    count:
                        player
                            .getComponent("equippable")
                            .getEquipment(EquipmentSlot.Offhand)?.amount ?? 0,
                });
            }else if(!config.system.useLegacyPlayerInventoryDataSaveSystem&&semver.satisfies(
                savedPlayerData.player_save_format_version??"0.0.0",
                ">=1.5.0",
                { includePrerelease: true }
            )){
                this.saveInventory(player, {rethrowErrorInFinally: false, bypassParameterTypeChecks: true})
            }
        }
        world.setDynamicProperty(
            savedPlayerData.saveId ?? `player:${savedPlayerData.id}`,
            JSON.stringify(savedPlayerData)
        );
        return savedPlayerData.saveId ?? `player:${savedPlayerData.id}`;
    }
    static async savePlayerAsync(player: Player) {
        let savedPlayerData: savedPlayerData;
        savedPlayerData = {
            name: player.name,
            nameTag: player.nameTag,
            id: player.id,
            isOp: player.isOp(),
            tags: player.getTags(),
            selectedSlotIndex: player.selectedSlotIndex,
            format_version: format_version,
            player_save_format_version: player_save_format_version,
            lastOnline: Date.now(),
            firstJoined:
                tryget(
                    () => this.getSavedPlayer("player:" + player.id).firstJoined
                ) ?? Date.now(),
            location: player.location,
            dimension: player.dimension,
            rotation: player.getRotation(),
            gameMode: player.getGameMode(),
            spawnPoint: player.getSpawnPoint(),
            memoryTier: player.clientSystemInfo.memoryTier,
            maxRenderDistance: player.clientSystemInfo.maxRenderDistance,
            platformType: player.clientSystemInfo.platformType,
            inputPermissions: {cameraEnabled: player.inputPermissions.cameraEnabled, movementEnabled: player.inputPermissions.movementEnabled},
        };
        savedPlayerData.saveId =
            savedPlayerData.saveId ?? "player:" + savedPlayerData.id;
        savedPlayerData.format_version =
            savedPlayerData.format_version ?? format_version;
        if(config.system.playerInventoryDataSaveSystemEnabled){
            if(config.system.useLegacyPlayerInventoryDataSaveSystem||semver.satisfies(
                savedPlayerData.player_save_format_version??"0.0.0",
                "<1.5.0-0",
                { includePrerelease: true }
            )){
                savedPlayerData.items = { inventory: [], equipment: [], ender_chest: [] };
                for (
                    let i = 0;
                    i < player.getComponent("inventory").inventorySize;
                    i++
                ) {
                    if (
                        player
                            .getComponent("inventory")
                            .container.getItem(Number(i)) !== undefined
                    ) {
                        savedPlayerData.items.inventory.push({
                            id: player
                                .getComponent("inventory")
                                .container.getItem(Number(i)).typeId,
                            slot: i,
                            enchants:
                                player
                                    .getComponent("inventory")
                                    .container.getItem(Number(i))
                                    ?.getComponent("enchantable")
                                    ?.getEnchantments().length != 0
                                    ? player
                                        .getComponent("inventory")
                                        .container.getItem(Number(i))
                                        ?.getComponent("enchantable")
                                        ?.getEnchantments()
                                    : undefined,
                            name: player
                                .getComponent("inventory")
                                .container.getItem(Number(i))?.nameTag,
                            count: player
                                .getComponent("inventory")
                                .container.getItem(Number(i)).amount,
                        });
                    } else {
                        savedPlayerData.items.inventory.push({
                            id: "",
                            slot: i,
                            count: 0,
                        });
                    }
                }
                savedPlayerData.items.inventory.push({
                    id:
                        player
                            .getComponent("equippable")
                            .getEquipment(EquipmentSlot.Head)?.typeId ?? "",
                    slot: "Head",
                    enchants:
                        player
                            .getComponent("equippable")
                            .getEquipment(EquipmentSlot.Head)
                            ?.getComponent("enchantable")
                            ?.getEnchantments().length != 0
                            ? player
                                .getComponent("equippable")
                                .getEquipment(EquipmentSlot.Head)
                                ?.getComponent("enchantable")
                                ?.getEnchantments()
                            : undefined,
                    name: player
                        .getComponent("equippable")
                        .getEquipment(EquipmentSlot.Head)?.nameTag,
                    count:
                        player
                            .getComponent("equippable")
                            .getEquipment(EquipmentSlot.Head)?.amount ?? 0,
                });
                savedPlayerData.items.inventory.push({
                    id:
                        player
                            .getComponent("equippable")
                            .getEquipment(EquipmentSlot.Chest)?.typeId ?? "",
                    slot: "Chest",
                    enchants:
                        player
                            .getComponent("equippable")
                            .getEquipment(EquipmentSlot.Chest)
                            ?.getComponent("enchantable")
                            ?.getEnchantments().length != 0
                            ? player
                                .getComponent("equippable")
                                .getEquipment(EquipmentSlot.Chest)
                                ?.getComponent("enchantable")
                                ?.getEnchantments()
                            : undefined,
                    name: player
                        .getComponent("equippable")
                        .getEquipment(EquipmentSlot.Chest)?.nameTag,
                    count:
                        player
                            .getComponent("equippable")
                            .getEquipment(EquipmentSlot.Chest)?.amount ?? 0,
                });
                savedPlayerData.items.inventory.push({
                    id:
                        player
                            .getComponent("equippable")
                            .getEquipment(EquipmentSlot.Legs)?.typeId ?? "",
                    slot: "Legs",
                    enchants:
                        player
                            .getComponent("equippable")
                            .getEquipment(EquipmentSlot.Legs)
                            ?.getComponent("enchantable")
                            ?.getEnchantments().length != 0
                            ? player
                                .getComponent("equippable")
                                .getEquipment(EquipmentSlot.Legs)
                                ?.getComponent("enchantable")
                                ?.getEnchantments()
                            : undefined,
                    name: player
                        .getComponent("equippable")
                        .getEquipment(EquipmentSlot.Legs)?.nameTag,
                    count:
                        player
                            .getComponent("equippable")
                            .getEquipment(EquipmentSlot.Legs)?.amount ?? 0,
                });
                savedPlayerData.items.inventory.push({
                    id:
                        player
                            .getComponent("equippable")
                            .getEquipment(EquipmentSlot.Feet)?.typeId ?? "",
                    slot: "Feet",
                    enchants:
                        player
                            .getComponent("equippable")
                            .getEquipment(EquipmentSlot.Feet)
                            ?.getComponent("enchantable")
                            ?.getEnchantments().length != 0
                            ? player
                                .getComponent("equippable")
                                .getEquipment(EquipmentSlot.Feet)
                                ?.getComponent("enchantable")
                                ?.getEnchantments()
                            : undefined,
                    name: player
                        .getComponent("equippable")
                        .getEquipment(EquipmentSlot.Feet)?.nameTag,
                    count:
                        player
                            .getComponent("equippable")
                            .getEquipment(EquipmentSlot.Feet)?.amount ?? 0,
                });
                savedPlayerData.items.inventory.push({
                    id:
                        player
                            .getComponent("equippable")
                            .getEquipment(EquipmentSlot.Offhand)?.typeId ?? "",
                    slot: "Offhand",
                    enchants:
                        player
                            .getComponent("equippable")
                            .getEquipment(EquipmentSlot.Offhand)
                            ?.getComponent("enchantable")
                            ?.getEnchantments().length != 0
                            ? player
                                .getComponent("equippable")
                                .getEquipment(EquipmentSlot.Offhand)
                                ?.getComponent("enchantable")
                                ?.getEnchantments()
                            : undefined,
                    name: player
                        .getComponent("equippable")
                        .getEquipment(EquipmentSlot.Offhand)?.nameTag,
                    count:
                        player
                            .getComponent("equippable")
                            .getEquipment(EquipmentSlot.Offhand)?.amount ?? 0,
                });
            }else if(!config.system.useLegacyPlayerInventoryDataSaveSystem&&semver.satisfies(
                savedPlayerData.player_save_format_version??"0.0.0",
                ">=1.5.0",
                { includePrerelease: true }
            )){
                await waitTick()
                await this.saveInventoryAsync(player, {rethrowErrorInFinally: false, bypassParameterTypeChecks: true})
            }
        }
        world.setDynamicProperty(
            savedPlayerData.saveId ?? `player:${savedPlayerData.id}`,
            JSON.stringify(savedPlayerData)
        );
        return savedPlayerData.saveId ?? `player:${savedPlayerData.id}`;
    } /*
getBan(banId: string){let banString = String(world.getDynamicProperty(banId)).split("||"); this.removeAfterBanExpires=Boolean(Number(banString[0])); this.unbanDate=new Date(Number(banString[1])); this.banDate=new Date(Number(banString[2])); if(banId.startsWith("ban")){this.originalPlayerId=Number(banString[3]); this.playerName=banId.split(":").slice(1).join(":"); }else{if(banId.startsWith("idBan")){this.originalPlayerName=Number(banString[3]); this.playerName=Number(playerId.split(":")[1]); }else{}}; this.bannedById=Number(banString[4]); this.bannedByName=banString[5].replaceAll("\\|", "|"); this.playerName=banString.slice(6).join("||"); return this as ban}*/
    static getSavedPlayer(savedPlayerId: string) {
        let playerString = String(world.getDynamicProperty(savedPlayerId));
        return new savedPlayer(JSON.parse(playerString));
    }
    static getSavedPlayers() {
        let players: savedPlayer[];
        players = [];
        savedPlayer.getSavedPlayerIds().forEachB((b) => {
            players.push(savedPlayer.getSavedPlayer(b));
        });
        return players;
    }
    static getSavedPlayersAlphabeticalOrder() {
        let players: savedPlayer[];
        players = [];
        savedPlayer.getSavedPlayerIds().forEach((b) => {
            players.push(savedPlayer.getSavedPlayer(b));
        });
        return players.sort(
            (a, b) =>
                1 -
                2 *
                    Number(
                        [
                            String(a.name.toLowerCase()),
                            String(b.name.toLowerCase()),
                        ].sort()[0] == String(a.name.toLowerCase())
                    )
        );
    }
}
export async function startPlayerDataAutoSave(){
    (await import("Main")).config;
    if(config.system.spreadPlayerInventoryDataSavesOverMultipleTicks){
        stopPlayerDataAutoSave()
        await waitTicks(20)
        globalThis.stopPlayerDataAutoSaveAsync=false;
        playerDataAutoSaveAsync()
    }else{
        repeatingIntervals.playerDataAutoSave=system.runInterval(()=>{if(world.getDynamicProperty("andexdbSettings:autoSavePlayerData") ?? true == true){world.getAllPlayers().forEach((p)=>{savedPlayer.savePlayer(p)})}}, config.system.playerDataRefreshRate??5);
    };
};
export async function playerDataAutoSaveAsync(){
    const players = world.getAllPlayers()
    for await(const p of players){
        if(globalThis.stopPlayerDataAutoSaveAsync){
            globalThis.stopPlayerDataAutoSaveAsync=false;
            return;
        }
        await savedPlayer.savePlayerAsync(p)
        await waitTick()
    }
    if(globalThis.stopPlayerDataAutoSaveAsync==true){
        globalThis.stopPlayerDataAutoSaveAsync=false;
        return;
    }
    await system.waitTicks(config.system.playerDataRefreshRate??20)
    playerDataAutoSaveAsync()
}
export function stopPlayerDataAutoSave(){
    try{
        try{system.clearRun(repeatingIntervals.playerDataAutoSave)}catch{};
        repeatingIntervals.playerDataAutoSave=null;
        globalThis.stopPlayerDataAutoSaveAsync=true;
        return 1;
    }catch{
        return 0;
    }
};
startPlayerDataAutoSave();