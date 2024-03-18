import { Player, system, world } from "@minecraft/server";
import { format_version } from "Main";
import { savedPlayer, savedPlayerData } from "./player_save";

export const ban_format_version = "1.0.0-rc.2";
export class ban{
    type: "name"|"id"
    playerName?: string
    originalPlayerId?: string|number
    playerId?: string|number
    originalPlayerName?: string
    removeAfterBanExpires: boolean
    unbanDate: Date|number
    banDate: Date|number
    bannedById: string|number
    bannedByName: string
    reason?: string
    format_version: string|number = format_version
    ban_format_version: string|number = ban_format_version
    banId: string
    constructor(ban: {type: "name"|"id", banId?: string, unbanDate: Date|number, banDate: Date|number, bannedById: string|number, bannedByName: string, reason?: string, removeAfterBanExpires?: boolean, playerName?: string, originalPlayerId?: string|number, playerId?: string|number, originalPlayerName?: string, format_version?: string|number, ban_format_version?: string|number}|ban) {
        this.type = ban.type??(ban.playerName!=undefined?"name":"id"); 
        this.unbanDate = ban.unbanDate; 
        this.banDate = ban.banDate; 
        this.bannedById = ban.bannedById; 
        this.bannedByName = ban.bannedByName; /*
        console.warn(performance.measure("testPerformance"))*/
        this.reason = ban.reason; 
        this.removeAfterBanExpires = ban.removeAfterBanExpires ?? false; 
        this.playerName = ban.playerName; 
        this.originalPlayerId = ban.originalPlayerId; 
        this.playerId = ban.playerId; 
        this.originalPlayerName = ban.originalPlayerName; 
        this.format_version = ban.format_version ?? format_version; 
        this.ban_format_version = ban.ban_format_version ?? ban_format_version; 
        this.banId = ban.banId ?? (ban.type=="name"?("ban:"+ban.banDate+":"+ban.playerName):("banId:"+ban.banDate+":"+ban.playerId)); 
    }
    get isExpired(){return Number(this.unbanDate)<=Date.now()}
    get isValid(){return Number(this.unbanDate)>Date.now()}
    get timeRemainingRaw(){return Number(this.unbanDate)-Date.now()}
    get timeRemaining(){let time = new Date(Math.abs((Number(this.unbanDate)-Date.now()))+(new Date().setUTCFullYear(0))); let timeList = {days: (-1*Number(this.isExpired)+1)*Math.floor((time.getTime()-(new Date().setUTCFullYear(0)))/86400000), hours: (-1*Number(this.isExpired)+1)*time.getHours(), minutes: (-1*Number(this.isExpired)+1)*time.getMinutes(), seconds: (-1*Number(this.isExpired)+1)*time.getSeconds(), milliseconds: (-1*Number(this.isExpired)+1)*time.getMilliseconds()}; return timeList}
    save(){world.setDynamicProperty(this.banId, JSON.stringify(this))}
    remove(){world.setDynamicProperty(this.banId)}
    static getBanIds(banType: string = "both"){return world.getDynamicPropertyIds().filter((s)=>(banType=="both"?(s.startsWith("ban:")||s.startsWith("banId:")):(banType=="name"?s.startsWith("ban:"):banType=="id"?s.startsWith("banId:"):undefined)))}
    static getValidBanIds(banType: string = "both"){return world.getDynamicPropertyIds().filter((s)=>(banType=="both"?((s.startsWith("ban:")?ban.getBan(s).isValid:false)||(s.startsWith("banId:")?ban.getBan(s).isValid:false)):(banType=="name"?(s.startsWith("ban:")?ban.getBan(s).isValid:false):banType=="id"?(s.startsWith("banId:")?ban.getBan(s).isValid:false):undefined)))}
    static getExpiredBanIds(banType: string = "both"){return world.getDynamicPropertyIds().filter((s)=>(banType=="both"?((s.startsWith("ban:")?ban.getBan(s).isExpired:false)||(s.startsWith("banId:")?ban.getBan(s).isExpired:false)):(banType=="name"?(s.startsWith("ban:")?ban.getBan(s).isExpired:false):banType=="id"?(s.startsWith("banId:")?ban.getBan(s).isExpired:false):undefined)))}/*
saveBan(ban: ban){if(ban.type=="name"){world.setDynamicProperty(`ban:${ban.playerName}`, `${Number(ban.removeAfterBanExpires)}||${ban.unbanDate.valueOf()}||${ban.banDate.valueOf()}||${ban.originalPlayerId}||${ban.bannedById}||${ban.bannedByName.replaceAll("|", "\\|")}||${ban.reason}`)}else{if(ban.type=="id"){world.setDynamicProperty(`idBan:${ban.playerId}`, `${Number(ban.removeAfterBanExpires)}||${ban.unbanDate.valueOf()}||${ban.banDate.valueOf()}||${ban.originalPlayerName.replaceAll("|", "\\|")}||${ban.bannedById}||${ban.bannedByName.replaceAll("|", "\\|")}||${ban.reason}`)}else{}}}*/
static saveBan(ban: {type: "name"|"id", unbanDate: Date|number, banDate: Date|number, bannedById: string|number, bannedByName: string, reason: string, removeAfterBanExpires?: boolean, playerName?: string, originalPlayerId?: string|number, playerId?: string|number, originalPlayerName?: string, format_version?: string|number, ban_format_version?: string|number, banId?: string}|ban){ban.removeAfterBanExpires = ban.removeAfterBanExpires ?? true; ban.format_version = ban.format_version ?? format_version; ban.ban_format_version = ban.ban_format_version ?? ban_format_version; if(ban.type=="name"){world.setDynamicProperty(ban.banId??`ban:${ban.banDate}:${ban.playerName}`, JSON.stringify(ban))}else{if(ban.type=="id"){world.setDynamicProperty(ban.banId??`idBan:${ban.banDate}:${ban.playerId}`, JSON.stringify(ban))}else{}}}/*
getBan(banId: string){let banString = String(world.getDynamicProperty(banId)).split("||"); this.removeAfterBanExpires=Boolean(Number(banString[0])); this.unbanDate=new Date(Number(banString[1])); this.banDate=new Date(Number(banString[2])); if(banId.startsWith("ban")){this.originalPlayerId=Number(banString[3]); this.playerName=banId.split(":").slice(1).join(":"); }else{if(banId.startsWith("idBan")){this.originalPlayerName=Number(banString[3]); this.playerName=Number(playerId.split(":")[1]); }else{}}; this.bannedById=Number(banString[4]); this.bannedByName=banString[5].replaceAll("\\|", "|"); this.playerName=banString.slice(6).join("||"); return this as ban}*/
static getBan(banId: string){try{let banString = String(world.getDynamicProperty(banId)); return new ban(JSON.parse(banString))}catch(e){console.error(e, e.stack)}}
static getBans(){let bans: ban[]; bans = []; ban.getBanIds().forEach((b)=>{try{bans.push(ban.getBan(b))}catch(e){console.error(e, e.stack)}}); return {idBans: bans.filter((b)=>(b.type=="id")), nameBans: bans.filter((b)=>(b.type=="name")), allBans: bans}}
static getValidBans(){let bans: ban[]; bans = []; ban.getValidBanIds().forEach((b)=>{try{bans.push(ban.getBan(b))}catch(e){console.error(e, e.stack)}}); return {idBans: bans.filter((b)=>(b.type=="id")), nameBans: bans.filter((b)=>(b.type=="name")), allBans: bans}}
static getExpiredBans(){let bans: ban[]; bans = []; ban.getExpiredBanIds().forEach((b)=>{try{bans.push(ban.getBan(b))}catch(e){console.error(e, e.stack)}}); return {idBans: bans.filter((b)=>(b.type=="id")), nameBans: bans.filter((b)=>(b.type=="name")), allBans: bans}}
static testForBannedPlayer(player: Player|savedPlayer|savedPlayerData){return ban.getBans().idBans.find(b=>b.isValid&&b.playerId==player.id)!=undefined?true:(ban.getBans().nameBans.find(b=>b.isValid&&b.playerName==player.name)!=undefined?true:false)}
static testForNameBannedPlayer(player: Player|savedPlayer|savedPlayerData){return ban.getBans().nameBans.find(b=>b.isValid&&b.playerName==player.name)!=undefined?true:false}
static testForIdBannedPlayer(player: Player|savedPlayer|savedPlayerData){return ban.getBans().idBans.find(b=>b.isValid&&b.playerId==player.id)!=undefined?true:false}
static executeOnBannedPlayers(callbackfn: (player: Player, index: Number, array: any[])=>unknown){let feedback: any[]; feedback = []; world.getAllPlayers().filter((p)=>ban.testForBannedPlayer(p)).forEach((p, i, a)=>{try{feedback.push(callbackfn(p, i, a))}catch(e){feedback.push(e)}}); return feedback}
}
system.runInterval(()=>{if(world.getDynamicProperty("andexdbSettings:banEnabled") ?? true == true){ban.executeOnBannedPlayers((p)=>{let success = false; let b = (savedPlayer?.getSavedPlayer("player:"+p.id)?.idBans?.valid?.sort((a: ban, b: ban)=>1-(2*Number(a?.banDate>b?.banDate)))[0]??savedPlayer?.getSavedPlayer("player:"+p.id)?.nameBans?.valid?.sort((a: ban, b: ban)=>1-(2*Number(a?.banDate>b?.banDate)))[0]??savedPlayer?.getSavedPlayer("player:"+p.id)?.bans?.valid?.sort((a: ban, b: ban)=>1-(2*Number(a?.banDate>b?.banDate)))[0]??savedPlayer?.getSavedPlayer("player:"+p.id)?.bans?.all?.sort((a: ban, b: ban)=>1-(2*Number(a?.banDate>b?.banDate)))[0]); let reason = b?.reason; try{reason = String(eval(b?.reason?.replaceAll("{timeRemaining}", `${b?.timeRemaining.days}d, ${b?.timeRemaining.hours}h ${b?.timeRemaining.minutes}m ${b?.timeRemaining.seconds}s ${b?.timeRemaining.milliseconds}ms`)?.replaceAll("{timeRemainingDays}", String(b?.timeRemaining.days))?.replaceAll("{timeRemainingHours}", String(b?.timeRemaining.hours))?.replaceAll("{timeRemainingMinutes}", String(b?.timeRemaining.minutes))?.replaceAll("{timeRemainingSeconds}", String(b?.timeRemaining.seconds))?.replaceAll("{timeRemainingMilliseconds}", String(b?.timeRemaining.milliseconds))?.replaceAll("{bannedBy}", String(b?.bannedByName))?.replaceAll("{bannedById}", String(b?.bannedById))?.replaceAll("{banDate}", String(new Date(Number(b?.banDate)).toLocaleString()+" GMT"))?.replaceAll("{unbanDate}", String(new Date(Number(b?.unbanDate)).toLocaleString()+" GMT"))?.replaceAll("{type}", String(b?.type))?.replaceAll("{timeRemainingRaw}", String(b?.timeRemainingRaw)))); }catch(e){reason = b?.reason?.replaceAll("{timeRemaining}", `${b?.timeRemaining.days}d, ${b?.timeRemaining.hours}h ${b?.timeRemaining.minutes}m ${b?.timeRemaining.seconds}s ${b?.timeRemaining.milliseconds}ms`)?.replaceAll("{timeRemainingDays}", String(b?.timeRemaining.days))?.replaceAll("{timeRemainingHours}", String(b?.timeRemaining.hours))?.replaceAll("{timeRemainingMinutes}", String(b?.timeRemaining.minutes))?.replaceAll("{timeRemainingSeconds}", String(b?.timeRemaining.seconds))?.replaceAll("{timeRemainingMilliseconds}", String(b?.timeRemaining.milliseconds))?.replaceAll("{bannedBy}", String(b?.bannedByName))?.replaceAll("{bannedByName}", String(b?.bannedByName))?.replaceAll("{bannedById}", String(b?.bannedById))?.replaceAll("{banDate}", String(new Date(Number(b?.banDate)).toLocaleString()+" GMT"))?.replaceAll("{unbanDate}", String(new Date(Number(b?.unbanDate)).toLocaleString()+" GMT"))?.replaceAll("{type}", String(b?.type))?.replaceAll("{timeRemainingRaw}", String(b?.timeRemainingRaw))?.escapeCharactersB(true)?.v; }; p.runCommand(`/kick ${p.name} ${reason}`); return success})}}, 5)