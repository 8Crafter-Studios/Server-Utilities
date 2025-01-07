import { system } from "@minecraft/server";
import { config } from "init/classes/config";
import { protectedAreaVariables } from "../../../init/variables/protectedAreaVariables";
import { getAreas } from "./getAreas";
/**
 * This is only editable by functions in this file.
 * @type {number|null}
 */
export let protectedAreasRefresherIntervalID = null;
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
    if (protectedAreasRefresherIntervalID != null) {
        stopProtectedAreasRefresher();
    } // this prevents multiple instances of the protected areas refresher running simultaneously.
    protectedAreasRefresherIntervalID = system.runInterval(() => {
        try {
            protectedAreaVariables.noPistonExtensionAreas = getAreas("noPistonExtensionArea:");
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            protectedAreaVariables.noExplosionAreas =
                getAreas("noExplosionArea:");
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            protectedAreaVariables.noInteractAreas =
                getAreas("noInteractArea:");
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            protectedAreaVariables.noBlockInteractAreas = getAreas("noBlockInteractArea:");
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            protectedAreaVariables.noBlockBreakAreas =
                getAreas("noBlockBreakArea:");
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            protectedAreaVariables.protectedAreas = getAreas("protectedArea:");
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            protectedAreaVariables.noBlockPlaceAreas =
                getAreas("noBlockPlaceArea:");
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }, config.system.protectedAreasRefreshRate ?? 200);
    repeatingIntervals.protectedAreasRefresher =
        protectedAreasRefresherIntervalID;
}
export async function stopProtectedAreasRefresher() {
    try {
        system.clearRun(repeatingIntervals.protectedAreasRefresher);
        protectedAreasRefresherIntervalID = null;
        repeatingIntervals.protectedAreasRefresher = null;
        repeatingIntervals.protectedAreasRefresher =
            protectedAreasRefresherIntervalID;
        return 1;
    }
    catch {
        return 0;
    }
}
//# sourceMappingURL=protectedAreasRefresher.js.map