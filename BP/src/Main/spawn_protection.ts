import { BlockVolume, CompoundBlockVolume, Player, type Vector3, system, world, Entity } from "@minecraft/server";
import { ActionFormData, ModalFormData, ActionFormResponse, ModalFormResponse } from "@minecraft/server-ui";
import { forceShow, mainMenu } from "./ui";
import * as GameTest from "@minecraft/server-gametest";
import * as mcServer from "@minecraft/server";
import * as mcServerUi from "@minecraft/server-ui";/*
import * as mcServerAdmin from "@minecraft/server-admin";*//*
import * as mcDebugUtilities from "@minecraft/debug-utilities";*//*
import * as mcCommon from "@minecraft/common";*//*
import * as mcVanillaData from "@minecraft/vanilla-data";*/
import *  as main from "Main";
import *  as coords from "Main/coordinates";
import *  as cmds from "Main/commands";
import *  as bans from "Main/ban";
import *  as uis from "Main/ui";
import *  as playersave from "Main/player_save";
import *  as spawnprot from "Main/spawn_protection";
import mcMath from "@minecraft/math.js";
export const format_version = "1.12.3";
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

export const spawn_protection_format_version = "1.0.1";
export const spawnProtectionTypeList = [/*"noPistonExtensionArea:", */"noExplosionArea:", "noInteractArea:", "noBlockInteractArea:", "noBlockBreakArea:", "protectedArea:", "noBlockPlaceArea:"]
export let noPistonExtensionAreas: {positive: {from: {x: number, y: number, z: number}, to: {x: number, y: number, z: number}}[], negative: {from: {x: number, y: number, z: number}, to: {x: number, y: number, z: number}}[]}
noPistonExtensionAreas = undefined
export let noExplosionAreas: {positive: {from: {x: number, y: number, z: number}, to: {x: number, y: number, z: number}}[], negative: {from: {x: number, y: number, z: number}, to: {x: number, y: number, z: number}}[]}
noExplosionAreas = undefined
export let noBlockInteractAreas: {positive: {from: {x: number, y: number, z: number}, to: {x: number, y: number, z: number}}[], negative: {from: {x: number, y: number, z: number}, to: {x: number, y: number, z: number}}[]}
noBlockInteractAreas = undefined
export let noInteractAreas: {positive: {from: {x: number, y: number, z: number}, to: {x: number, y: number, z: number}}[], negative: {from: {x: number, y: number, z: number}, to: {x: number, y: number, z: number}}[]}
noInteractAreas = undefined
export let protectedAreas: {positive: {from: {x: number, y: number, z: number}, to: {x: number, y: number, z: number}}[], negative: {from: {x: number, y: number, z: number}, to: {x: number, y: number, z: number}}[]}
protectedAreas = undefined
export let noBlockBreakAreas: {positive: {from: {x: number, y: number, z: number}, to: {x: number, y: number, z: number}}[], negative: {from: {x: number, y: number, z: number}, to: {x: number, y: number, z: number}}[]}
noBlockBreakAreas = undefined
export let noBlockPlaceAreas: {positive: {from: {x: number, y: number, z: number}, to: {x: number, y: number, z: number}}[], negative: {from: {x: number, y: number, z: number}, to: {x: number, y: number, z: number}}[]}
noBlockPlaceAreas = undefined

try{system.runInterval( () => {
    try{noPistonExtensionAreas = getAreas("noPistonExtensionArea:")} catch(e){console.error(e, e.stack);}; 
    try{noExplosionAreas = getAreas("noExplosionArea:")} catch(e){console.error(e, e.stack);}
    try{noInteractAreas = getAreas("noInteractArea:")} catch(e){console.error(e, e.stack);}
    try{noBlockInteractAreas = getAreas("noBlockInteractArea:")} catch(e){console.error(e, e.stack);}
    try{noBlockBreakAreas = getAreas("noBlockBreakArea:")} catch(e){console.error(e, e.stack);}
    try{protectedAreas = getAreas("protectedArea:")} catch(e){console.error(e, e.stack);}
    try{noBlockPlaceAreas = getAreas("noBlockPlaceArea:")} catch(e){console.error(e, e.stack);}
}, 1)} catch(e){console.error(e, e.stack);}
export function getType(areaGroup: string, type: number){return areaGroup.split("|").filter((q)=>(q.split(", ")[6] == String(type))).join("|"); }; 
export function getAreas(prefix: string){
    let a = world.getDynamicPropertyIds().filter((dpi)=>(dpi.startsWith(prefix)))
    let b = world.getDynamicPropertyIds().filter((dpi)=>(dpi.startsWith(prefix)))
    a.forEach((aelement, i)=>{b[i] = String(world.getDynamicProperty(aelement)); })
    return {positive: convertToCompoundBlockVolume(getType(b.join("|"), 0) ?? "0, 0, 0, 0, 0, 0, 0"), negative: convertToCompoundBlockVolume(getType(b.join("|"), 1) ?? "0, 0, 0, 0, 0, 0, 1")}

}
export function editAreas(player: Player, prefix: string){
    let a = world.getDynamicPropertyIds().filter((dpi)=>(dpi.startsWith(prefix)))
    let b = world.getDynamicPropertyIds().filter((dpi)=>(dpi.startsWith(prefix)))
    let form1234 = new ActionFormData()
    let form12345 = new ModalFormData()
    let form1234567 = new ActionFormData()
    let form123456 = new ModalFormData()
    a.forEach((aelement, i)=>{/*console.warn(aelement.slice(22)); */form1234.button(aelement.slice(prefix.length), String(world?.getDynamicProperty(aelement))?.split(", ")?.slice(7)?.join(" ")??"textures/ui/area_xyz"); b[i] = String(world.getDynamicProperty(aelement)); })
    form1234.button("Add New", /*"textures/ui/check_mark"*/"textures/ui/color_plus")
    form1234.button("Back", /*"textures/ui/chat_return_back_arrow"*/"textures/ui/arrow_left")
    forceShow(form1234, player).then((t)=>{if (t.canceled) return; switch(true){
    case ((t as ActionFormResponse).selection == a.length): 
    form12345.textField("Identifier Name", "myArea"); 
    form12345.textField("Area Value(type of 0 = normal, type of 1 = negative)", "x1, y1, z1, x2, y2, z2, type, icon_path?(optional)"); 

    forceShow(form12345, player).then((q)=>{if (q.canceled) return; const [ id, value ] = (q as ModalFormResponse).formValues; world.setDynamicProperty(prefix + id, String(value)); })
    break; 
    case ((t as ActionFormResponse).selection == a.length + 1): /*
    editPistonExtensionAreas(player)*//*
    screenForm123(); */
    editAreasMainMenu(player)
    break; 
    default: 
    form1234567.button("Edit", "textures/ui/book_edit_default")
    form1234567.button("Delete", /*"textures/ui/trash_can"*/"textures/ui/trash_default")
    form1234567.button("Back", /*"textures/ui/chat_return_back_arrow"*//*"textures/ui/undoArrow"*/"textures/ui/chevron_left")
    forceShow(form1234567, player).then((w)=>{if (w.canceled) return; switch((w as ActionFormResponse).selection){
    case 0: 
    form123456.textField("Area Value(type of 0 = normal, type of 1 = negative)", "x1, y1, z1, x2, y2, z2, type, icon_path?(optional)", String(world.getDynamicProperty(String(a[Number((t as ActionFormResponse).selection)])))); 

    forceShow(form123456, player).then((q)=>{if (q.canceled) return; const [ value ] = (q as ModalFormResponse).formValues; world.setDynamicProperty(a[(t as ActionFormResponse).selection], String(value)); })
    break; 
    case 1: 
    world.setDynamicProperty(a[(t as ActionFormResponse).selection], undefined); 
    break; 
    case 2: 
    editAreas(player, prefix)
    break; 
    }})
    break; 
    }})
}
export function editAreasMainMenu(sourceEntity: Entity|Player){
    let form = new ActionFormData();
    let players = world.getPlayers();
form.title("Area Selector");
form.body("Choose area type to edit. ");
spawnProtectionTypeList.forEach((s)=>{form.button(s, "textures/ui/xyz_axis");})
forceShow(form, (sourceEntity as Player)).then(la => {let l = (la as ActionFormResponse); 
    try {editAreas((sourceEntity as Player), spawnProtectionTypeList[l.selection]); }catch(e){console.error(e, e.stack);};
})} 
export function convertToCompoundBlockVolume(selection: String){let compoundFullBlockVolumes = new CompoundBlockVolume({x: 0, y: 0, z: 0}); let blockVolumeAllLists: {from: {x: number, y: number, z: number}, to: {x: number, y: number, z: number}}[]; blockVolumeAllLists = []; selection.split("|").forEach((selectionSection)=>{blockVolumeAllLists.push({from: {x: Number(selectionSection.split(", ")[0]), y: Number(selectionSection.split(", ")[1]), z: Number(selectionSection.split(", ")[2])}, to: {x: Number(selectionSection.split(", ")[3]), y: Number(selectionSection.split(", ")[4]), z: Number(selectionSection.split(", ")[5])}})}); return blockVolumeAllLists}
export function testIsWithinRanges(blockvolumes: {from: {x: number, y: number, z: number}, to: {x: number, y: number, z: number}}[], location: Vector3){let withinRange = false; blockvolumes.forEach((blockvolume)=>{if((((blockvolume.from.x>=location.x&&location.x>=blockvolume.to.x)||(blockvolume.to.x>=location.x&&location.x>=blockvolume.from.x))&&((blockvolume.from.y>=location.y&&location.y>=blockvolume.to.y)||(blockvolume.to.y>=location.y&&location.y>=blockvolume.from.y))&&((blockvolume.from.z>=location.z&&location.z>=blockvolume.to.z)||(blockvolume.to.z>=location.z&&location.z>=blockvolume.from.z)))){withinRange = true}}); return withinRange}