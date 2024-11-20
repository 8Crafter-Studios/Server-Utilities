// Copyright (c) Microsoft Corporation.  All rights reserved.

import * as mcServer from "@minecraft/server";
import * as mcServerUi from "@minecraft/server-ui";
import * as mcServerGametest from "@minecraft/server-gametest";

function targetSelector(selector, filters, UUID) { let scoreboardUUID = Math.round((Math.random() * 100 + 50)); world.getAllPlayers().find((currentlySelectedPlayerEntity) => (Number(currentlySelectedPlayerEntity.id) == UUID)).runCommand("/execute as " + selector + filters + " at @s run /scoreboard players set @s andexdbDebug " + scoreboardUUID); let selectedEntityUUIDValue = (world.scoreboard.getObjective("andexdbDebug").getScores().find((score) => (score.score == scoreboardUUID))).participant.getEntity().id; world.getAllPlayers().find((currentlySelectedPlayerEntity) => (Number(currentlySelectedPlayerEntity.id) == UUID)).runCommand("/execute as " + selector + filters + " at @s run /scoreboard players set @s andexdbDebug 0"); return Number((selectedEntityUUIDValue)); }
function targetSelectorB(selector, filters, UUID) { let scoreboardUUID = Math.round((Math.random() * 100 + 50)); world.getAllPlayers().find((currentlySelectedPlayerEntity) => (Number(currentlySelectedPlayerEntity.id) == UUID)).runCommand("/execute as " + selector + filters + " at @s run /scoreboard players set @s andexdbDebug " + scoreboardUUID); let selectedEntityUUIDValue = (world.scoreboard.getObjective("andexdbDebug").getScores().find((score) => (score.score == scoreboardUUID))).participant.getEntity().id; world.getAllPlayers().find((currentlySelectedPlayerEntity) => (Number(currentlySelectedPlayerEntity.id) == UUID)).runCommand("/execute as " + selector + filters + " at @s run /scoreboard players set @s andexdbDebug 0"); return world.getDimension(DimensionTypes.getAll().find((dimension) => (world.getDimension(dimension.typeId).getEntities().find((entity) => (entity.id == selectedEntityUUIDValue)))).typeId).getEntities().find((entity) => (entity.id == selectedEntityUUIDValue)); } 
function targetSelectorAllListB(selector, filters, UUID) { let scoreboardUUID = Math.round((Math.random() * 1000 + 500)); world.getAllPlayers().find((currentlySelectedPlayerEntity) => (Number(currentlySelectedPlayerEntity.id) == UUID)).runCommand("/execute as " + selector + filters + " at @s run /scoreboard players set @s andexdbDebug " + scoreboardUUID); let selectedEntity; for (let i in world.scoreboard.getObjective("andexdbDebug").getScores()) {
    selectedEntity.push((world.scoreboard.getObjective("andexdbDebug").getScores().filter((score) => (score.score == scoreboardUUID)))[i].participant.getEntity());
} world.getAllPlayers().find((currentlySelectedPlayerEntity) => (Number(currentlySelectedPlayerEntity.id) == UUID)).runCommand("/execute as " + selector + filters + " at @s run /scoreboard players set @s andexdbDebug 0"); return selectedEntity; }
function targetSelectorAllListC(selector, filters, position, sourceEntityCommandExecution) { let scoreboardUUID = Math.round((Math.random() * 1000 + 500)); if (sourceEntityCommandExecution == undefined) {
    world.getAllPlayers()[0].runCommand("/execute positioned " + position + " as " + selector + filters + " at @s run /scoreboard players set @s andexdbDebug " + scoreboardUUID);
}
else {
    sourceEntityCommandExecution.runCommand("/execute positioned " + position + " as " + selector + filters + " at @s run /scoreboard players set @s andexdbDebug " + scoreboardUUID);
} let selectedEntity; selectedEntity = []; for (let i in world.scoreboard.getObjective("andexdbDebug").getScores()) {
    try {
        selectedEntity.push((world.scoreboard.getObjective("andexdbDebug").getScores().filter((score) => (score.score == scoreboardUUID)))[i].participant.getEntity());
    }
    catch (e) { }
} if (sourceEntityCommandExecution == undefined) {
    world.getAllPlayers()[0].runCommand("/execute positioned " + position + " as " + selector + filters + " at @s run /scoreboard players set @s andexdbDebug 0");
}
else {
    sourceEntityCommandExecution.runCommand("/execute as " + selector + filters + " at @s run /scoreboard players set @s andexdbDebug 0");
} return selectedEntity; }
function debugAction(block, player, mode) { if (player.getDynamicProperty("debugStickSelectedBlock") != block.typeId) {
    player.setDynamicProperty("debugStickSelectedBlock", block.typeId), player.setDynamicProperty("debugStickPropertyIndex", 0), player.setDynamicProperty("debugStickPropertyIndexIndex", 0);
}
else {
    if (mode == 1) {
        player.setDynamicProperty("debugStickPropertyIndex", Number((Number(player.getDynamicProperty("debugStickPropertyIndex")) + 1) % Object.entries(block.permutation.getAllStates()).length));
    }
    else {
        if (mode == 0) {
            player.setDynamicProperty("debugStickPropertyIndexIndex", Number((Number(player.getDynamicProperty("debugStickPropertyIndexIndex")) + 1) % BlockStates.getAll().find((state) => (state.id == Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))])).validValues.length));
        }
    }
} ; /*BlockStates.getAll().forEach((stateb)=>{player.sendMessage(stateb.id + ": " + stateb.validValues)}); */ /*let test = Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))]; console.warn(Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))] + "\n" + String(Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))]) + "\n" + test + "\n" + BlockStates.getAll()[BlockStates.getAll().length-2].id + BlockStates.getAll().findIndex((statec)=>{console.warn("\"" + String(statec.id) + "\", \"" + String(Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))]) + "\""); statec.id == test})); */ /*BlockStates.getAll().forEach((stateb)=>{player.sendMessage(stateb.id + ": " + stateb.validValues)}); */ /*let test = Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))]; console.warn(Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))] + "\n" + String(Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))]) + "\n" + test + "\n" + BlockStates.getAll()[BlockStates.getAll().length-2].id + BlockStates.getAll().findIndex((statec)=>{console.warn("\"" + String(statec.id) + "\", \"" + String(Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))]) + "\""); statec.id == test})); */ if (mode == 0) {
    let permutation = Object.entries(block.permutation.getAllStates());
    permutation[Number(player.getDynamicProperty("debugStickPropertyIndex"))][1] = BlockStates.getAll().find((state) => (state.id == Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))])).validValues[Number(player.getDynamicProperty("debugStickPropertyIndexIndex"))];
    mcServer.system.run(() => { player.onScreenDisplay.setActionBar(`set ${Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))]} to ${permutation[Number(player.getDynamicProperty("debugStickPropertyIndex"))][1]}`); block.setPermutation(BlockPermutation.resolve(block.typeId, Object.fromEntries(permutation))); });
} ; console.warn(Object.entries(block.permutation.getAllStates())); }
function convertToCompoundBlockVolume(selection) { let blockVolumeAllLists; blockVolumeAllLists = []; selection.split("|").forEach((selectionSection) => { blockVolumeAllLists.push({ from: { x: Number(selectionSection.split(", ")[0]), y: Number(selectionSection.split(", ")[1]), z: Number(selectionSection.split(", ")[2]) }, to: { x: Number(selectionSection.split(", ")[3]), y: Number(selectionSection.split(", ")[4]), z: Number(selectionSection.split(", ")[5]) } }); }); let compoundFullBlockVolumes = new CompoundBlockVolume({ x: 0, y: 0, z: 0 }); blockVolumeAllLists.forEach((volume) => { compoundFullBlockVolumes.pushVolume({ action: 0, locationRelativity: 1, volume: volume }); }); return blockVolumeAllLists; }
function testIsWithinRanges(blockvolumes, location) { let withinRange = false; blockvolumes.forEach((blockvolume) => { if ((((blockvolume.from.x >= location.x && location.x >= blockvolume.to.x) || (blockvolume.to.x >= location.x && location.x >= blockvolume.from.x)) && ((blockvolume.from.y >= location.y && location.y >= blockvolume.to.y) || (blockvolume.to.y >= location.y && location.y >= blockvolume.from.y)) && ((blockvolume.from.z >= location.z && location.z >= blockvolume.to.z) || (blockvolume.to.z >= location.z && location.z >= blockvolume.from.z)))) {
    withinRange = true;
} }); return withinRange; }
Object.defineProperty(String.prototype, 'escapeCharacters', {value: function (js, unicode, nullchar, uri, quotes, general, colon, x, s){

    //:Get primitive copy of string:
    var str = this.valueOf();/*
    console.warn(unescape(str))*/

    //:Append Characters To End:
    if(js == true){
    try{str = eval("`" + str.replaceAll("`", "\\`") + "`"); }catch(e){console.error(e, e.stack)}
    }
    if(general == true){
    str = str.replaceAll("\\n", "\n");
    str = str.replaceAll("\\f", "\f");
    str = str.replaceAll("\\r", "\r");
    str = str.replaceAll("\\t", "\t");
    str = str.replaceAll("\\v", "\v");
    str = str.replaceAll("\\b", "\b");
    str = str.replaceAll("\\l", "\u2028");
    str = str.replaceAll("\\p", "\u2029");
    }
    if(quotes == true){
    str = str.replaceAll("\\qd", "\"");
    str = str.replaceAll("\\qs", "\'");
    }
    if(colon == true){
    str = str.replaceAll("\\cs", "\;");
    str = str.replaceAll("\\cf", "\:");
    }
    if(x == true){
    str = str.replaceAll("\\x", "");
    }
    if(s == true){
    str = str.replaceAll("\\s", "");
    }
    if(nullchar == 1){str = str.replaceAll("\\0", "\0");}
    if(nullchar == 2){str = str.replaceAll("\\0", "");}
    if(unicode == true){
    let strarray = ("t" + str).split("\\u")
    strarray.forEach((values, index)=>{/*console.warn(/[0-9A-F]{2}/i.test(values.slice(0, 6))); */
    if((/[01][0-9x][0-9A-F]{4}/i.test(values.slice(0, 6))) && (index !== 0)){/*
        console.warn((values.slice(0, 6))); */
        strarray[index] = String.fromCodePoint(Number(values.slice(0, 6))) + values.slice(6)
    }else{
        if((/[+][0-9]{7}/i.test(values.slice(0, 8))) && (index !== 0)){
            strarray[index] = String.fromCodePoint(Number(values.slice(1, 8))) + values.slice(8)
        }else{
            if((/[+][0-9]{6}/i.test(values.slice(0, 7))) && (index !== 0)){
                strarray[index] = String.fromCodePoint(Number(values.slice(1, 7))) + values.slice(7)
            }else{
                if((/[+][0-9]{5}/i.test(values.slice(0, 6))) && (index !== 0)){
                    strarray[index] = String.fromCodePoint(Number(values.slice(1, 6))) + values.slice(6)
                }else{
                    if((/[+][0-9]{4}/i.test(values.slice(0, 5))) && (index !== 0)){
                        strarray[index] = String.fromCodePoint(Number(values.slice(1, 5))) + values.slice(5)
                    }else{
                        if((/[+][0-9]{3}/i.test(values.slice(0, 4))) && (index !== 0)){
                            strarray[index] = String.fromCodePoint(Number(values.slice(1, 4))) + values.slice(4)
                        }else{
                            if((/[+][0-9]{2}/i.test(values.slice(0, 3))) && (index !== 0)){
                                strarray[index] = String.fromCodePoint(Number(values.slice(1, 3))) + values.slice(3)
                            }else{
                                if((/[+][0-9]{1}/i.test(values.slice(0, 2))) && (index !== 0)){
                                    strarray[index] = String.fromCodePoint(Number(values.slice(1, 2))) + values.slice(2)
                                }else{
        if(index !== 0){
            strarray[index] = "\\u" + values.slice(0)
        }}}}}}}}
    }})
    str = strarray.join("").slice(1)
    }
    if(uri == true){str = unescape(str);}

    //:Return modified copy:
    return( str );
}});
Object.defineProperty(String.prototype, 'escapeCharactersB', {value: function (js, unicode, nullchar, uri, quotes, general, colon, x, s){

    //:Get primitive copy of string:
    var str = this.valueOf();/*
    console.warn(unescape(str))*/
    var eb
    eb = undefined

    //:Append Characters To End:
    if(js == true){
    try{str = eval("`" + str.replaceAll("`", "\\`") + "`"); }catch(e){eb.push(e); console.error(e, e.stack)}
    }
    if(general == true){
    str = str.replaceAll("\\n", "\n");
    str = str.replaceAll("\\f", "\f");
    str = str.replaceAll("\\r", "\r");
    str = str.replaceAll("\\t", "\t");
    str = str.replaceAll("\\v", "\v");
    str = str.replaceAll("\\b", "\b");
    str = str.replaceAll("\\l", "\u2028");
    str = str.replaceAll("\\p", "\u2029");
    }
    if(quotes == true){
    str = str.replaceAll("\\qd", "\"");
    str = str.replaceAll("\\qs", "\'");
    }
    if(colon == true){
    str = str.replaceAll("\\cs", "\;");
    str = str.replaceAll("\\cf", "\:");
    }
    if(x == true){
    str = str.replaceAll("\\x", "");
    }
    if(s == true){
    str = str.replaceAll("\\s", "");
    }
    if(nullchar == 1){str = str.replaceAll("\\0", "\0");}
    if(nullchar == 2){str = str.replaceAll("\\0", "");}
    if(unicode == true){
    let strarray = ("t" + str).split("\\u")
    strarray.forEach((values, index)=>{/*console.warn(/[0-9A-F]{2}/i.test(values.slice(0, 6))); */
    if((/[01][0-9x][0-9A-F]{4}/i.test(values.slice(0, 6))) && (index !== 0)){/*
        console.warn((values.slice(0, 6))); */
        strarray[index] = String.fromCodePoint(Number(values.slice(0, 6))) + values.slice(6)
    }else{
        if((/[+][0-9]{7}/i.test(values.slice(0, 8))) && (index !== 0)){
            strarray[index] = String.fromCodePoint(Number(values.slice(1, 8))) + values.slice(8)
        }else{
            if((/[+][0-9]{6}/i.test(values.slice(0, 7))) && (index !== 0)){
                strarray[index] = String.fromCodePoint(Number(values.slice(1, 7))) + values.slice(7)
            }else{
                if((/[+][0-9]{5}/i.test(values.slice(0, 6))) && (index !== 0)){
                    strarray[index] = String.fromCodePoint(Number(values.slice(1, 6))) + values.slice(6)
                }else{
                    if((/[+][0-9]{4}/i.test(values.slice(0, 5))) && (index !== 0)){
                        strarray[index] = String.fromCodePoint(Number(values.slice(1, 5))) + values.slice(5)
                    }else{
                        if((/[+][0-9]{3}/i.test(values.slice(0, 4))) && (index !== 0)){
                            strarray[index] = String.fromCodePoint(Number(values.slice(1, 4))) + values.slice(4)
                        }else{
                            if((/[+][0-9]{2}/i.test(values.slice(0, 3))) && (index !== 0)){
                                strarray[index] = String.fromCodePoint(Number(values.slice(1, 3))) + values.slice(3)
                            }else{
                                if((/[+][0-9]{1}/i.test(values.slice(0, 2))) && (index !== 0)){
                                    strarray[index] = String.fromCodePoint(Number(values.slice(1, 2))) + values.slice(2)
                                }else{
        if(index !== 0){
            strarray[index] = "\\u" + values.slice(0)
        }}}}}}}}
    }})
    str = strarray.join("").slice(1)
    }
    if(uri == true){str = unescape(str);}

    //:Return modified copy:
    return( {v: str, e: eb} );
}});
mcServer.system.afterEvents.scriptEventReceive.subscribe((event) => {
    const { id, // returns string (wiki:test)
    initiator, // returns Entity
    message, // returns string (Hello World)
    sourceBlock, // returns Block
    sourceEntity, // returns Entity
    sourceType, // returns MessageSourceType
     } = event;
    if (id == "andexdb:scriptEvalImportAll") {
        let dynamicProperty = message;
        try {
            eval(dynamicProperty);
        }
        catch (e) {
            console.error(e, e.stack);
        }
        console.log(eval('2 + 2'));
    }
});
