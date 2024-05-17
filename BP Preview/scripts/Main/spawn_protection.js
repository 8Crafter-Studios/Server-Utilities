import { BlockVolume, CompoundBlockVolume, Player, system, world, Entity } from "@minecraft/server";
import { ActionFormData, ModalFormData, ActionFormResponse, ModalFormResponse } from "@minecraft/server-ui";
import { format_version } from "Main";
import { forceShow, mainMenu } from "./ui";
import * as GameTest from "@minecraft/server-gametest";
import * as mcServer from "@minecraft/server";
import * as mcServerUi from "@minecraft/server-ui"; /*
import * as mcServerAdmin from "@minecraft/server-admin";*/ /*
import * as mcDebugUtilities from "@minecraft/debug-utilities";*/ /*
import * as mcCommon from "@minecraft/common";*/ /*
import * as mcVanillaData from "@minecraft/vanilla-data";*/
import * as main from "Main";
import * as coords from "Main/coordinates";
import * as cmds from "Main/commands";
import * as bans from "Main/ban";
import * as uis from "Main/ui";
import * as playersave from "Main/player_save";
import * as spawnprot from "Main/spawn_protection";
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
export let noPistonExtensionAreas;
noPistonExtensionAreas = undefined;
export let noExplosionAreas;
noExplosionAreas = undefined;
export let noBlockInteractAreas;
noBlockInteractAreas = undefined;
export let noInteractAreas;
noInteractAreas = undefined;
export let protectedAreas;
protectedAreas = undefined;
export let noBlockBreakAreas;
noBlockBreakAreas = undefined;
export let noBlockPlaceAreas;
noBlockPlaceAreas = undefined;
try {
    system.runInterval(() => {
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
    }, 1);
}
catch (e) {
    console.error(e, e.stack);
}
export function getType(areaGroup, type) { return areaGroup.split("|").filter((q) => (q.split(", ")[6] == String(type))).join("|"); }
;
export function getAreas(prefix) {
    let a = world.getDynamicPropertyIds().filter((dpi) => (dpi.startsWith(prefix)));
    let b = world.getDynamicPropertyIds().filter((dpi) => (dpi.startsWith(prefix)));
    a.forEach((aelement, i) => { b[i] = String(world.getDynamicProperty(aelement)); });
    return { positive: convertToCompoundBlockVolume(getType(b.join("|"), 0) ?? "0, 0, 0, 0, 0, 0, 0"), negative: convertToCompoundBlockVolume(getType(b.join("|"), 1) ?? "0, 0, 0, 0, 0, 0, 1") };
}
export function editAreas(player, prefix) {
    let a = world.getDynamicPropertyIds().filter((dpi) => (dpi.startsWith(prefix)));
    let b = world.getDynamicPropertyIds().filter((dpi) => (dpi.startsWith(prefix)));
    let form1234 = new ActionFormData();
    let form12345 = new ModalFormData();
    let form1234567 = new ActionFormData();
    let form123456 = new ModalFormData();
    a.forEach((aelement, i) => { /*console.warn(aelement.slice(22)); */ form1234.button(aelement.slice(prefix.length), String(world?.getDynamicProperty(aelement))?.split(", ")?.slice(7)?.join(" ") ?? "textures/ui/area_xyz"); b[i] = String(world.getDynamicProperty(aelement)); });
    form1234.button("Add New", /*"textures/ui/check_mark"*/ "textures/ui/color_plus");
    form1234.button("Back", /*"textures/ui/chat_return_back_arrow"*/ "textures/ui/arrow_left");
    forceShow(form1234, player).then((t) => {
        if (t.canceled)
            return;
        switch (true) {
            case (t.selection == a.length):
                form12345.textField("Identifier Name", "myArea");
                form12345.textField("Area Value(type of 0 = normal, type of 1 = negative)", "x1, y1, z1, x2, y2, z2, type, icon_path?(optional)");
                form12345.submitButton("Add");
                forceShow(form12345, player).then((q) => { if (q.canceled)
                    return; const [id, value] = q.formValues; world.setDynamicProperty(prefix + id, String(value)); });
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
                    if (w.canceled)
                        return;
                    switch (w.selection) {
                        case 0:
                            form123456.textField("Area Value(type of 0 = normal, type of 1 = negative)", "x1, y1, z1, x2, y2, z2, type, icon_path?(optional)", String(world.getDynamicProperty(String(a[Number(t.selection)]))));
                            form123456.submitButton("Save");
                            forceShow(form123456, player).then((q) => { if (q.canceled)
                                return; const [value] = q.formValues; world.setDynamicProperty(a[t.selection], String(value)); });
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
    let players = world.getPlayers();
    form.title("Area Selector");
    form.body("Choose area type to edit. ");
    spawnProtectionTypeList.forEach((s) => { form.button(s, "textures/ui/xyz_axis"); });
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
export function convertToCompoundBlockVolume(selection) { let compoundFullBlockVolumes = new CompoundBlockVolume({ x: 0, y: 0, z: 0 }); let blockVolumeAllLists; blockVolumeAllLists = []; selection.split("|").forEach((selectionSection) => { blockVolumeAllLists.push({ from: { x: Number(selectionSection.split(", ")[0]), y: Number(selectionSection.split(", ")[1]), z: Number(selectionSection.split(", ")[2]) }, to: { x: Number(selectionSection.split(", ")[3]), y: Number(selectionSection.split(", ")[4]), z: Number(selectionSection.split(", ")[5]) } }); }); return blockVolumeAllLists; }
export function testIsWithinRanges(blockvolumes, location) { let withinRange = false; blockvolumes.forEach((blockvolume) => { if ((((blockvolume.from.x >= location.x && location.x >= blockvolume.to.x) || (blockvolume.to.x >= location.x && location.x >= blockvolume.from.x)) && ((blockvolume.from.y >= location.y && location.y >= blockvolume.to.y) || (blockvolume.to.y >= location.y && location.y >= blockvolume.from.y)) && ((blockvolume.from.z >= location.z && location.z >= blockvolume.to.z) || (blockvolume.to.z >= location.z && location.z >= blockvolume.from.z)))) {
    withinRange = true;
} }); return withinRange; }
//# sourceMappingURL=spawn_protection.js.map