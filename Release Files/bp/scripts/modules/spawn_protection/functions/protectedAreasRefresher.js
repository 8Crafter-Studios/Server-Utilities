import { system } from "@minecraft/server";
import "init/classes/config";
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
/**
 * Starts the protected areas refresher. This function will be called automatically
 * when the world loads. It is not necessary to call this function manually.
 *
 * The protected areas refresher is responsible for updating the protected areas
 * variables every few seconds. This is necessary because the protected areas
 * variables are only updated when the world loads, and the protected areas
 * refresher ensures that the protected areas variables are updated in real-time.
 *
 * The protected areas refresher will not run if another instance of the protected
 * areas refresher is already running. This is to prevent multiple instances of
 * the protected areas refresher from running simultaneously, which could cause
 * performance issues.
 *
 * The protected areas refresher runs every few seconds, as specified in the
 * config. The default value is 10 seconds (200 ticks).
 *
 * @deprecated This function is deprecated and will be removed in a future version. This is due to the protected areas system being redesigned to not need constant refreshing, and this function just updates the old variables, which are no longer used.
 */
export function startProtectedAreasRefresher() {
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
    }, config.system.protectedAreasRefreshRate);
    repeatingIntervals.protectedAreasRefresher =
        protectedAreasRefresherIntervalID;
}
/**
 * Stops the protected areas refresher if it is currently running.
 *
 * This function clears the interval responsible for refreshing the
 * protected areas, sets the interval ID to null, and updates the
 * repeating intervals tracker to reflect that the refresher has stopped.
 *
 * @returns {0 | 1} A promise that resolves to 1 if the
 * refresher was successfully stopped, or 0 if an error occurred.
 *
 * @deprecated This function is deprecated and will be removed in a future version. This is due to the protected areas system being redesigned to not need constant refreshing, and this function just updates the old variables, which are no longer used.
 */
export function stopProtectedAreasRefresher() {
    try {
        system.clearRun(repeatingIntervals.protectedAreasRefresher);
        protectedAreasRefresherIntervalID = null;
        repeatingIntervals.protectedAreasRefresher =
            protectedAreasRefresherIntervalID ?? undefined;
        return 1;
    }
    catch {
        return 0;
    }
}
//# sourceMappingURL=protectedAreasRefresher.js.map