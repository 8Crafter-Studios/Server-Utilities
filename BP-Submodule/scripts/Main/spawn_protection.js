import { BlockVolume, CompoundBlockVolume, Player, system, world, Entity } from "@minecraft/server";
import { ActionFormData, ModalFormData, ActionFormResponse, ModalFormResponse } from "@minecraft/server-ui";
import { config, dimensions, format_version } from "Main";
import { forceShow, mainMenu } from "./ui";
import { listoftransformrecipes } from "Assets/constants/transformrecipes";
import * as GameTest from "@minecraft/server-gametest";
import * as mcServer from "@minecraft/server";
import * as mcServerUi from "@minecraft/server-ui"; /*
import * as mcServerAdmin from "@minecraft/server-admin";*/ /*
import * as mcDebugUtilities from "@minecraft/debug-utilities";*/ /*
import * as mcCommon from "@minecraft/common";*/ /*
import * as mcVanillaData from "@minecraft/vanilla-data";*/
import * as main from "Main";
import * as transformrecipes from "Assets/constants/transformrecipes";
import * as coords from "Main/coordinates";
import * as cmds from "Main/commands";
import * as bans from "Main/ban";
import * as uis from "Main/ui";
import * as playersave from "Main/player_save";
import * as spawnprot from "Main/spawn_protection";
import * as chat from "./chat";
import * as cmdutils from "./command_utilities";
import * as utils from "./utilities";
import * as errors from "./errors";
import mcMath from "@minecraft/math.js";
mcServer;
mcServerUi; /*
mcServerAdmin*/ /*
mcDebugUtilities*/ /*
mcCommon*/
GameTest; /*
mcVanillaData*/
main;
coords;
cmds;
bans;
uis;
playersave;
spawnprot;
mcMath;
export const spawn_protection_format_version = "1.0.1";
export const spawnProtectionTypeList = [/*"noPistonExtensionArea:", */ "noExplosionArea:", "noInteractArea:", "noBlockInteractArea:", "noBlockBreakArea:", "protectedArea:", "noBlockPlaceArea:"];
export var noPistonExtensionAreas;
noPistonExtensionAreas = { positive: [], negative: [] };
export var noExplosionAreas;
noExplosionAreas = { positive: [], negative: [] };
export var noBlockInteractAreas;
noBlockInteractAreas = { positive: [], negative: [] };
export var noInteractAreas;
noInteractAreas = { positive: [], negative: [] };
export var protectedAreas;
protectedAreas = { positive: [], negative: [] };
export var noBlockBreakAreas;
noBlockBreakAreas = { positive: [], negative: [] };
export var noBlockPlaceAreas;
noBlockPlaceAreas = { positive: [], negative: [] };
/*
import("Main").then(v=>{try{system.runInterval( () => {
    try{noPistonExtensionAreas = getAreas("noPistonExtensionArea:")} catch(e){console.error(e, e.stack);};
    try{noExplosionAreas = getAreas("noExplosionArea:")} catch(e){console.error(e, e.stack);}
    try{noInteractAreas = getAreas("noInteractArea:")} catch(e){console.error(e, e.stack);}
    try{noBlockInteractAreas = getAreas("noBlockInteractArea:")} catch(e){console.error(e, e.stack);}
    try{noBlockBreakAreas = getAreas("noBlockBreakArea:")} catch(e){console.error(e, e.stack);}
    try{protectedAreas = getAreas("protectedArea:")} catch(e){console.error(e, e.stack);}
    try{noBlockPlaceAreas = getAreas("noBlockPlaceArea:")} catch(e){console.error(e, e.stack);}
}, v.config.system.protectedAreasRefreshRate??20)} catch(e){console.error(e, e.stack);}})*/
export async function startProtectedAreasRefresher() {
    (await import("Main")).config;
    repeatingIntervals.protectedAreasRefresher = system.runInterval(() => {
        try {
            noPistonExtensionAreas = getAreas("noPistonExtensionArea:");
        }
        catch (e) {
            console.error(e, e.stack);
        }
        ;
        try {
            noExplosionAreas = getAreas("noExplosionArea:");
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            noInteractAreas = getAreas("noInteractArea:");
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            noBlockInteractAreas = getAreas("noBlockInteractArea:");
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            noBlockBreakAreas = getAreas("noBlockBreakArea:");
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            protectedAreas = getAreas("protectedArea:");
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            noBlockPlaceAreas = getAreas("noBlockPlaceArea:");
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }, config.system.protectedAreasRefreshRate ?? 20);
}
;
export async function stopProtectedAreasRefresher() {
    try {
        system.clearRun(repeatingIntervals.protectedAreasRefresher);
        repeatingIntervals.protectedAreasRefresher = null;
        return 1;
    }
    catch {
        return 0;
    }
}
;
startProtectedAreasRefresher();
export function getType(areaGroup, type) { return areaGroup.split("|").filter((q) => (q.split(", ")[6] == String(type))).join("|"); }
;
export function getAreas(prefix) {
    let a = world.getDynamicPropertyIds().filter((dpi) => (dpi.startsWith(prefix)));
    a.forEach((aelement) => { tryrun(() => { String(world.setDynamicProperty("v2:" + aelement, ((v) => (JSON.stringify({ from: { x: Number(v[0]), y: Number(v[1]), z: Number(v[2]) }, to: { x: Number(v[3]), y: Number(v[4]), z: Number(v[5]) }, dimension: 0, mode: Number(v[6]) == 1 ? 1 : 0, icon_path: String(v[7] ?? "") })))(String(world.getDynamicProperty(aelement)).split(",")))); world.setDynamicProperty(aelement); }); });
    let c = world.getDynamicPropertyIds().filter((dpi) => (dpi.startsWith("v2:" + prefix)));
    let d = c.map(v => tryget(() => JSON.parse(String(world.getDynamicProperty(v)))));
    d.forEach(v => v.mode == 1 ? undefined : v.mode == 0 ? undefined : v.mode = 0);
    return { positive: d.filter(v => v.mode == 0), negative: d.filter(v => v.mode == 1) };
}
export function editAreas(player, prefix) {
    let a = world.getDynamicPropertyIds().filter((dpi) => (dpi.startsWith("v2:" + prefix)));
    let b = world.getDynamicPropertyIds().filter((dpi) => (dpi.startsWith("v2:" + prefix)));
    let form1234 = new ActionFormData();
    let form12345 = new ModalFormData();
    let form1234567 = new ActionFormData();
    let form123456 = new ModalFormData();
    a.forEach((aelement, i) => { /*console.warn(aelement.slice(22)); */ form1234.button(aelement.slice(prefix.length + 3), tryget(() => JSON.parse(String(world?.getDynamicProperty(aelement))).icon_path) ?? "textures/ui/area_xyz"); b[i] = String(world.getDynamicProperty(aelement)); });
    form1234.button("Add New", /*"textures/ui/check_mark"*/ "textures/ui/color_plus");
    form1234.button("Back", /*"textures/ui/chat_return_back_arrow"*/ "textures/ui/arrow_left");
    form1234.title(prefix);
    forceShow(form1234, player).then((t) => {
        if (t.canceled) {
            editAreasMainMenu(player);
            return;
        }
        ;
        switch (true) {
            case (t.selection == a.length):
                form12345.title("New Protected Area");
                form12345.textField("Identifier Name", "myArea");
                form12345.textField("From", "x1, y1, z1");
                form12345.textField("To", "x2, y2, z2");
                form12345.dropdown("Dimension", ["Overworld", "Nether", "The End"], dimensions.indexOf(player.dimension));
                form12345.dropdown("Mode", ["Protection", "Anti-Protection"]);
                form12345.textField("Icon Path (Optional)", "text");
                form12345.submitButton("Add");
                forceShow(form12345, player).then((q) => { if (q.canceled) {
                    editAreas(player, prefix);
                    return;
                } ; const [id, from, to, dimension, mode, icon_path] = q.formValues; world.setDynamicProperty("v2:" + prefix + id, JSON.stringify({ from: { x: Number(String(from).split(",")[0]), y: Number(String(from).split(",")[1]), z: Number(String(from).split(",")[2]) }, to: { x: Number(String(to).split(",")[0]), y: Number(String(to).split(",")[1]), z: Number(String(to).split(",")[2]) }, dimension: Number(dimension), mode: Number(mode), icon_path: ((icon_path ?? "") == "") ? undefined : icon_path })); });
                break;
            case (t.selection == a.length + 1): /*
            editPistonExtensionAreas(player)*/ /*
            screenForm123(); */
                editAreasMainMenu(player);
                break;
            default:
                form1234567.button("Edit", "textures/ui/book_edit_default");
                form1234567.button("Delete", /*"textures/ui/trash_can"*/ "textures/ui/trash_default");
                form1234567.button("Back", /*"textures/ui/chat_return_back_arrow"*/ /*"textures/ui/undoArrow"*/ "textures/ui/chevron_left");
                forceShow(form1234567, player).then((w) => {
                    if (w.canceled) {
                        editAreas(player, prefix);
                        return;
                    }
                    ;
                    switch (w.selection) {
                        case 0:
                            {
                                const defaults = JSON.parse(String(world.getDynamicProperty(String(a[Number(t.selection)]))));
                                form12345.title("Edit Protected Area");
                                form123456.textField("From", "x1, y1, z1", `${defaults.from.x}, ${defaults.from.y}, ${defaults.from.z}`);
                                form123456.textField("To", "x2, y2, z2", `${defaults.to.x}, ${defaults.to.y}, ${defaults.to.z}`);
                                form123456.dropdown("Dimension", ["Overworld", "Nether", "The End"], defaults.dimension);
                                form123456.dropdown("Mode", ["Protection", "Anti-Protection"], defaults.mode);
                                form123456.textField("Icon Path (Optional)", "text", defaults.icon_path ?? "");
                                form123456.submitButton("Save");
                                forceShow(form123456, player).then((q) => { if (q.canceled) {
                                    editAreas(player, prefix);
                                    return;
                                } ; const [from, to, dimension, mode, icon_path] = q.formValues; world.setDynamicProperty(a[t.selection], JSON.stringify({ from: { x: Number(String(from).split(",")[0]), y: Number(String(from).split(",")[1]), z: Number(String(from).split(",")[2]) }, to: { x: Number(String(to).split(",")[0]), y: Number(String(to).split(",")[1]), z: Number(String(to).split(",")[2]) }, dimension: Number(dimension), mode: Number(mode), icon_path: ((icon_path ?? "") == "") ? undefined : icon_path })); });
                            }
                            break;
                        case 1:
                            world.setDynamicProperty(a[t.selection], undefined);
                            break;
                        case 2:
                            editAreas(player, prefix);
                            break;
                    }
                });
                break;
        }
    });
}
export function editAreasMainMenu(sourceEntity) {
    let form = new ActionFormData();
    form.title("Area Selector");
    form.body("Choose area type to edit. ");
    spawnProtectionTypeList.forEach((s) => { form.button(s, "textures/ui/xyz_axis"); });
    form.button("Back", "textures/ui/arrow_left");
    forceShow(form, sourceEntity).then(la => {
        let l = la;
        try {
            editAreas(sourceEntity, spawnProtectionTypeList[l.selection]);
        }
        catch (e) {
            console.error(e, e.stack);
        }
        ;
    });
}
export function convertToCompoundBlockVolume(selection) { let compoundFullBlockVolumes = new CompoundBlockVolume({ x: 0, y: 0, z: 0 }); let blockVolumeAllLists; blockVolumeAllLists = []; selection.split("|").forEach((selectionSection) => { blockVolumeAllLists.push({ from: { x: Math.min(Number(selectionSection.split(",")[0]), Number(selectionSection.split(",")[3])), y: Math.min(Number(selectionSection.split(",")[1]), Number(selectionSection.split(",")[4])), z: Math.min(Number(selectionSection.split(",")[2]), Number(selectionSection.split(",")[5])) }, to: { x: Math.max(Number(selectionSection.split(",")[0]), Number(selectionSection.split(",")[3])), y: Math.max(Number(selectionSection.split(",")[1]), Number(selectionSection.split(",")[4])), z: Math.max(Number(selectionSection.split(",")[2]), Number(selectionSection.split(",")[5])) } }); }); return blockVolumeAllLists; }
export function testIsWithinRanges(blockvolumes, location) { let withinRange = false; blockvolumes.forEach((blockvolume) => { if ((((blockvolume.from.x >= location.x && location.x >= blockvolume.to.x) || (blockvolume.to.x >= location.x && location.x >= blockvolume.from.x)) && ((blockvolume.from.y >= location.y && location.y >= blockvolume.to.y) || (blockvolume.to.y >= location.y && location.y >= blockvolume.from.y)) && ((blockvolume.from.z >= location.z && location.z >= blockvolume.to.z) || (blockvolume.to.z >= location.z && location.z >= blockvolume.from.z)))) {
    withinRange = true;
} }); return withinRange; }
//# sourceMappingURL=spawn_protection.js.map