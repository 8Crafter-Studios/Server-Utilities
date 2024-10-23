import { EquipmentSlot, type Enchantment, type Vector3, Dimension, type Vector2, type DimensionLocation, GameMode, world, Player, system, MemoryTier, PlatformType, StructureSaveMode } from "@minecraft/server";
import { format_version, config } from "Main";
import { ban } from "./ban";
import { listoftransformrecipes } from "transformrecipes";
import * as GameTest from "@minecraft/server-gametest";
import * as mcServer from "@minecraft/server";
import * as mcServerUi from "@minecraft/server-ui";/*
import * as mcServerAdmin from "@minecraft/server-admin";*//*
import * as mcDebugUtilities from "@minecraft/debug-utilities";*//*
import * as mcCommon from "@minecraft/common";*//*
import * as mcVanillaData from "@minecraft/vanilla-data";*/
import *  as main from "Main";
import *  as transformrecipes from "transformrecipes";
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

export const player_save_format_version = "1.4.0";
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
    id: string|number
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
}/*
new savedPlayer({items: {inventory: [{enchants: null, count: 1}]}})*/
export class savedPlayer {
    name: string;
    id: string | number;
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
    constructor(data: savedPlayerData) {
        if (
            !!data.format_version &&
            semver.gt(
                data.player_save_format_version,
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
        this.items = data.items;
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
                data.player_save_format_version,
                ">=1.4.0 <1.5.0",
                { includePrerelease: true }
            )
        ) {
            this.memoryTier = data.memoryTier;
            this.maxRenderDistance = data.maxRenderDistance;
            this.platformType = data.platformType;
        }
    }
    save() {
        world.setDynamicProperty(this.saveId, JSON.stringify(this));
    }
    remove() {
        world.setDynamicProperty(this.saveId);
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
            savedPlayerData.player_save_format_version ?? format_version;
        world.setDynamicProperty(
            savedPlayerData.saveId ?? `player:${savedPlayerData.id}`,
            JSON.stringify(savedPlayerData)
        );
        return savedPlayerData.saveId ?? `player:${savedPlayerData.id}`;
    }
    static saveInventory(player: Player) {
        const entity = player.dimension.spawnEntity(
            "andexdb:player_inventory_save_storage",
            Vector.add(Vector.floor(player.location), {
                x: 0.5,
                y: 10.5,
                z: 0.5,
            })
        );
        entity.setDynamicProperty(
            "andexdb:playerInventorySaveStoragePlayerID",
            player.id
        );
        try {
            const ei = entity.inventory.container
            const pi = player.inventory.container
            const pe = player.equippable
            for(let i = 0; i<player.inventory.inventorySize; i++){
                try{ei.setItem(i, pi.getItem(i))}catch(e){}
            }
            for(let i = 0; i<6; i++){
                try{ei.setItem(36+i, pe.getEquipment([EquipmentSlots][String(i)]))}catch(e){}
            }
            try{ei.setItem(42, player.cursorInventory.item)}catch(e){}
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
            try {
                player.sendMessage(e + " " + e?.stack);
            } catch {
                console.error(e, e?.stack);
            }
        } finally {
            try {
                otherEntities.forEach((v, i) =>
                    tryrun(() => v.teleport(locs[i], { keepVelocity: false }))
                );
            } catch {}
            try {
                entity.remove();
            } catch {}
        }
    }
    static savePlayer(player: Player) {
        let savedPlayerData: savedPlayerData;
        savedPlayerData = {
            name: player.name,
            nameTag: player.nameTag,
            id: player.id,
            isOp: player.isOp(),
            tags: player.getTags(),
            items: { inventory: [], equipment: [], ender_chest: [] },
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
        };
        savedPlayerData.saveId =
            savedPlayerData.saveId ?? "player:" + savedPlayerData.id;
        savedPlayerData.format_version =
            savedPlayerData.format_version ?? format_version;
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
        savedPlayer.getSavedPlayerIds().forEach((b) => {
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
import("Main").then(v=>system.runInterval(()=>{if(world.getDynamicProperty("andexdbSettings:autoSavePlayerData") ?? true == true){world.getAllPlayers().forEach((p)=>{savedPlayer.savePlayer(p)})}}, v.config.system.playerDataRefreshRate??5))