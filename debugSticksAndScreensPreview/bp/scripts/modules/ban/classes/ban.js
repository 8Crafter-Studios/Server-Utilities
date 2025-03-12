import { world, Player } from "@minecraft/server";
import { ban_format_version } from "../constants/ban_format_version";
import moment from "moment";
export class ban {
    type;
    playerName;
    originalPlayerId;
    playerId;
    originalPlayerName;
    removeAfterBanExpires;
    unbanDate;
    banDate;
    bannedById;
    bannedByName;
    reason;
    format_version = format_version;
    ban_format_version = ban_format_version;
    banId;
    hasAdvancedReason = false;
    constructor(ban) {
        this.type = ban.type ?? (ban.playerName != undefined ? "name" : "id");
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
        this.banId = ban.banId ?? (ban.type == "name" ? "ban:" + ban.banDate + ":" + ban.playerName : "banId:" + ban.banDate + ":" + ban.playerId);
        this.hasAdvancedReason = ban.hasAdvancedReason ?? false;
    }
    get isExpired() {
        return this.unbanDate !== Infinity && Number(this.unbanDate) <= Date.now();
    }
    get isValid() {
        return this.unbanDate === Infinity || Number(this.unbanDate) > Date.now();
    }
    get timeRemainingRaw() {
        return this.unbanDate === Infinity ? Infinity : Number(this.unbanDate) - Date.now();
    }
    get timeRemaining() {
        if (this.unbanDate === Infinity) {
            return {
                days: Infinity,
                hours: Infinity,
                minutes: Infinity,
                seconds: Infinity,
                milliseconds: Infinity,
            };
        }
        let time = new Date(Math.abs(Number(this.unbanDate) - Date.now()) + new Date().setUTCFullYear(0));
        let timeList = {
            days: (-1 * Number(this.isExpired) + 1) * Math.floor((time.getTime() - new Date().setUTCFullYear(0)) / 86400000),
            hours: (-1 * Number(this.isExpired) + 1) * time.getHours(),
            minutes: (-1 * Number(this.isExpired) + 1) * time.getMinutes(),
            seconds: (-1 * Number(this.isExpired) + 1) * time.getSeconds(),
            milliseconds: (-1 * Number(this.isExpired) + 1) * time.getMilliseconds(),
        };
        return timeList;
    }
    get timeRemainingString() {
        return this.isPermanent
            ? "Forever"
            : Date.now() > this.unbanDate
                ? "-" + moment().preciseDiff(moment(this.unbanDate))
                : moment().preciseDiff(moment(this.unbanDate));
    }
    get duration() {
        if (this.unbanDate === Infinity) {
            return {
                days: Infinity,
                hours: Infinity,
                minutes: Infinity,
                seconds: Infinity,
                milliseconds: Infinity,
            };
        }
        let time = new Date(this.unbanDate - this.banDate + new Date().setUTCFullYear(0));
        let timeList = {
            days: Math.floor((time.getTime() - new Date().setUTCFullYear(0)) / 86400000),
            hours: time.getHours(),
            minutes: time.getMinutes(),
            seconds: time.getSeconds(),
            milliseconds: time.getMilliseconds(),
        };
        return timeList;
    }
    get durationString() {
        return this.isPermanent
            ? "Permanent"
            : this.banDate > this.unbanDate
                ? "-" + moment().preciseDiff(moment(this.unbanDate))
                : moment().preciseDiff(moment(this.unbanDate));
    }
    get isTemporary() {
        return this.unbanDate !== Infinity;
    }
    get isPermanent() {
        return this.unbanDate === Infinity;
    }
    get kickMessage() {
        if (this.hasAdvancedReason || semver.lt(this.ban_format_version, "1.3.0")) {
            return this.reason;
        }
        else {
            const timeZone = config.system.timeZone;
            return (JSON.stringify(this.reason).slice(0, -1) +
                (this.isPermanent
                    ? `\\n§r§cBanned By: ${this.bannedByName}\\nBan Duration: Permanent\\nBanned On: ${formatDateTime(new Date(this.banDate), timeZone)} UTC${(timeZone > 0 || Object.is(timeZone, 0) ? "+" : "") + timeZone}"`
                    : `\\n§r§cBanned By: ${this.bannedByName}\\nBanned Until: ${formatDateTime(new Date(this.unbanDate), timeZone)} UTC${(timeZone > 0 || Object.is(timeZone, 0) ? "+" : "") + timeZone}\\nBanned On: ${formatDateTime(new Date(this.banDate), timeZone)} UTC${(timeZone > 0 || Object.is(timeZone, 0) ? "+" : "") + timeZone}\\nBan Duration: ${this.banDate > this.unbanDate
                        ? "-" + moment(this.banDate).preciseDiff(moment(this.unbanDate))
                        : moment(this.banDate).preciseDiff(moment(this.unbanDate))}\\nTime Remaining: ${Date.now() > this.unbanDate ? "-" + moment().preciseDiff(moment(this.unbanDate)) : moment().preciseDiff(moment(this.unbanDate))}"`));
        }
    }
    save() {
        world.setDynamicProperty(this.banId, JSONB.stringify(this));
    }
    remove() {
        world.setDynamicProperty(this.banId);
    }
    static getBanIds(banType = "both") {
        return world
            .getDynamicPropertyIds()
            .filter((s) => banType == "both"
            ? s.startsWith("ban:") || s.startsWith("banId:")
            : banType == "name"
                ? s.startsWith("ban:")
                : banType == "id"
                    ? s.startsWith("banId:")
                    : undefined);
    }
    static getValidBanIds(banType = "both") {
        return world
            .getDynamicPropertyIds()
            .filter((s) => banType == "both"
            ? (s.startsWith("ban:") ? ban.getBan(s).isValid : false) || (s.startsWith("banId:") ? ban.getBan(s).isValid : false)
            : banType == "name"
                ? s.startsWith("ban:")
                    ? ban.getBan(s).isValid
                    : false
                : banType == "id"
                    ? s.startsWith("banId:")
                        ? ban.getBan(s).isValid
                        : false
                    : undefined);
    }
    static getExpiredBanIds(banType = "both") {
        return world
            .getDynamicPropertyIds()
            .filter((s) => banType == "both"
            ? (s.startsWith("ban:") ? ban.getBan(s).isExpired : false) || (s.startsWith("banId:") ? ban.getBan(s).isExpired : false)
            : banType == "name"
                ? s.startsWith("ban:")
                    ? ban.getBan(s).isExpired
                    : false
                : banType == "id"
                    ? s.startsWith("banId:")
                        ? ban.getBan(s).isExpired
                        : false
                    : undefined);
    } /*
saveBan(ban: ban){if(ban.type=="name"){world.setDynamicProperty(`ban:${ban.playerName}`, `${Number(ban.removeAfterBanExpires)}||${ban.unbanDate.valueOf()}||${ban.banDate.valueOf()}||${ban.originalPlayerId}||${ban.bannedById}||${ban.bannedByName.replaceAll("|", "\\|")}||${ban.reason}`)}else{if(ban.type=="id"){world.setDynamicProperty(`idBan:${ban.playerId}`, `${Number(ban.removeAfterBanExpires)}||${ban.unbanDate.valueOf()}||${ban.banDate.valueOf()}||${ban.originalPlayerName.replaceAll("|", "\\|")}||${ban.bannedById}||${ban.bannedByName.replaceAll("|", "\\|")}||${ban.reason}`)}else{}}}*/
    static saveBan(ban) {
        ban.removeAfterBanExpires = ban.removeAfterBanExpires ?? true;
        ban.format_version = ban.format_version ?? format_version;
        ban.ban_format_version = ban.ban_format_version ?? ban_format_version;
        if (ban.type == "name") {
            world.setDynamicProperty(ban.banId ?? `ban:${ban.banDate}:${ban.playerName}`, JSONB.stringify(ban));
        }
        else {
            if (ban.type == "id") {
                world.setDynamicProperty(ban.banId ?? `idBan:${ban.banDate}:${ban.playerId}`, JSONB.stringify(ban));
            }
            else {
            }
        }
    } /*
getBan(banId: string){let banString = String(world.getDynamicProperty(banId)).split("||"); this.removeAfterBanExpires=Boolean(Number(banString[0])); this.unbanDate=new Date(Number(banString[1])); this.banDate=new Date(Number(banString[2])); if(banId.startsWith("ban")){this.originalPlayerId=Number(banString[3]); this.playerName=banId.split(":").slice(1).join(":"); }else{if(banId.startsWith("idBan")){this.originalPlayerName=Number(banString[3]); this.playerName=Number(playerId.split(":")[1]); }else{}}; this.bannedById=Number(banString[4]); this.bannedByName=banString[5].replaceAll("\\|", "|"); this.playerName=banString.slice(6).join("||"); return this as ban}*/
    static getBan(banId) {
        try {
            let banString = String(world.getDynamicProperty(banId));
            return new ban(JSONB.parse(banString));
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    static getBans() {
        let bans;
        bans = [];
        ban.getBanIds().forEach((b) => {
            try {
                bans.push(ban.getBan(b));
            }
            catch (e) {
                console.error(e, e.stack);
            }
        });
        return {
            idBans: bans.filter((b) => b?.type == "id"),
            nameBans: bans.filter((b) => b?.type == "name"),
            allBans: bans,
        };
    }
    static getValidBans() {
        let bans;
        bans = [];
        ban.getValidBanIds().forEach((b) => {
            try {
                bans.push(ban.getBan(b));
            }
            catch (e) {
                console.error(e, e.stack);
            }
        });
        return {
            idBans: bans.filter((b) => b.type == "id"),
            nameBans: bans.filter((b) => b.type == "name"),
            allBans: bans,
        };
    }
    static getExpiredBans() {
        let bans;
        bans = [];
        ban.getExpiredBanIds().forEach((b) => {
            try {
                bans.push(ban.getBan(b));
            }
            catch (e) {
                console.error(e, e.stack);
            }
        });
        return {
            idBans: bans.filter((b) => b.type == "id"),
            nameBans: bans.filter((b) => b.type == "name"),
            allBans: bans,
        };
    }
    static getBansAutoRefresh() {
        if (lastBanRefresh < Date.now() - config.system.bansMinimumAutoRefresh) {
            ban.refreshBans();
        }
        return { ...bans };
    }
    static getValidBansAutoRefresh() {
        if (lastBanRefresh < Date.now() - config.system.bansMinimumAutoRefresh) {
            ban.refreshBans();
        }
        return {
            idBans: bans.idBans.filter((b) => b.isValid),
            nameBans: bans.nameBans.filter((b) => b.isValid),
            allBans: bans.allBans.filter((b) => b.isValid),
        };
    }
    static getExpiredBansAutoRefresh() {
        if (lastBanRefresh < Date.now() - config.system.bansMinimumAutoRefresh) {
            ban.refreshBans();
        }
        return {
            idBans: bans.idBans.filter((b) => b.isExpired),
            nameBans: bans.nameBans.filter((b) => b.isExpired),
            allBans: bans.allBans.filter((b) => b.isExpired),
        };
    }
    static getBansNoRefresh() {
        return { ...bans };
    }
    static getValidBansNoRefresh() {
        return {
            idBans: bans.idBans.filter((b) => b.isValid),
            nameBans: bans.nameBans.filter((b) => b.isValid),
            allBans: bans.allBans.filter((b) => b.isValid),
        };
    }
    static getExpiredBansNoRefresh() {
        return {
            idBans: bans.idBans.filter((b) => b.isExpired),
            nameBans: bans.nameBans.filter((b) => b.isExpired),
            allBans: bans.allBans.filter((b) => b.isExpired),
        };
    }
    static testForBannedPlayer(player) {
        if (lastBanRefresh < Date.now() - config.system.bansMinimumAutoRefresh) {
            ban.refreshBans();
        }
        return bans.idBans.find((b) => b.isValid && b.playerId == player.id) !== undefined
            ? true
            : bans.nameBans.find((b) => b.isValid && b.playerName == player.name) != undefined
                ? true
                : false;
    }
    static testForNameBannedPlayer(player) {
        if (lastBanRefresh < Date.now() - config.system.bansMinimumAutoRefresh) {
            ban.refreshBans();
        }
        return bans.nameBans.find((b) => b.isValid && b.playerName == player.name) !== undefined ? true : false;
    }
    static testForIdBannedPlayer(player) {
        if (lastBanRefresh < Date.now() - config.system.bansMinimumAutoRefresh) {
            ban.refreshBans();
        }
        return bans.idBans.find((b) => b.isValid && b.playerId == player.id) !== undefined;
    }
    static executeOnBannedPlayers(callbackfn) {
        let feedback;
        feedback = [];
        world
            .getAllPlayers()
            .filter((p) => ban.testForBannedPlayer(p))
            .forEach((p, i, a) => {
            try {
                feedback.push(callbackfn(p, i, a));
            }
            catch (e) {
                feedback.push(e);
            }
        });
        return feedback;
    }
    static refreshBans() {
        lastBanRefresh = Date.now();
        bans = ban.getBans();
    }
}
let lastBanRefresh = Date.now();
let bans = ban.getBans();
//# sourceMappingURL=ban.js.map