import { system } from "@minecraft/server";
import { config } from "init/classes/config";
import { protectedAreaVariables } from "../../../init/variables/protectedAreaVariables";
import { getAreas } from "./getAreas";
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
    }, config.system.protectedAreasRefreshRate ?? 20);
}
//# sourceMappingURL=startProtectedAreasRefresher.js.map