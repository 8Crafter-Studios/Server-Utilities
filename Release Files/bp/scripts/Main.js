// Copyright (c) Microsoft Corporation.  All rights reserved.
export const mainmetaimport = import.meta;
// const a = ((a: `${bigint}.${bigint}.${bigint}${`-${string}`|""}${`+${string}`|""}`)=>{})("1.1.1-preview.20+BUILD.1");
export function mainEval(x) {
    return eval(x);
}
export function indirectMainEval(x) {
    return eval?.(x);
}
export function mainRun(x, ...args) {
    return x(...args);
}
/*
world.beforeEvents.dataDrivenEntityTriggerEvent.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:dataDrivenEntityTriggerEvent")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("dataDrivenEntityTriggerEventBeforeEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    ;
    try {
        world.getAllPlayers().filter((player) => { player.hasTag("getEntityTriggerEventNotifications"); }).forEach((currentPlayer) => { currentPlayer.sendMessage("id: " + event.id + ", getComponentGroupsToAdd: " + event.getModifiers()[0]!.addedComponentGroups + ", getComponentGroupsToRemove: " + event.getModifiers()[0]!.removedComponentGroups + ", getTriggers: " + event.getModifiers()[0]!.triggers); });
        if (event.id == "andexsa:friction_modifier_0.9") {
            let componentGroups = event.getModifiers()[0]; */ /*
console.warn(event.id)
console.warn(componentGroups.getComponentGroupsToAdd())*/ /*
componentGroups.addedComponentGroups = ["andexsa:player_is_baby"]; */ /*
console.warn(componentGroups.getComponentGroupsToAdd())*/ /*
event.setModifiers([componentGroups]);
console.warn(event.getModifiers()[0]!.addedComponentGroups);
}
}
catch { }
}); ;*/ //removed in minecraft 1.20.80 >:(
/*
  world.beforeEvents.pistonActivate.subscribe(event => {
    try{eval(String(world.getDynamicProperty("evalBeforeEvents:pistonActivate")))}catch(e){console.error(e, e.stack); world.getAllPlayers().forEach((currentplayer)=>{if(currentplayer.hasTag("pistonActivateBeforeEventDebugErrors")){currentplayer.sendMessage(e + e.stack)}})}
      world.getAllPlayers().filter((player) => ( player.hasTag("getEntityTriggerEventNotifications"))).forEach((currentPlayer) => { currentPlayer.sendMessage("id: " + event.block.typeId + ", getComponentGroupsToAdd: " + event.piston.getAttachedBlocks()[0]!.x + ", getComponentGroupsToRemove: " + event.isExpanding) + ", getTriggers: " + event.dimension; });
      if (testIsWithinRanges(noPistonExtensionAreas, event.block.location) == true) {
        event.cancel = true*/ /*
  console.warn(event.isExpanding);
  console.warn(event.block.x, event.block.y, event.block.z);
  console.warn(event.piston.getAttachedBlocks());
  console.warn(event.dimension);*/ /*
}
});*/ //removed in minecraft 1.20.60 >:(
/*
world.beforeEvents.itemDefinitionEvent.subscribe(event => {
try{eval(String(world.getDynamicProperty("evalBeforeEvents:itemDefinitionEvent")))}catch(e){console.error(e, e.stack); world.getAllPlayers().forEach((currentplayer)=>{if(currentplayer.hasTag("itemDefinitionEventBeforeEventDebugErrors")){currentplayer.sendMessage(e + e.stack)}})}
});*/ //removed in 1.20.70.21
// ${se}srun(()=>{let p = player; let values = facingPoint(p.location, {x: 240.50, y: 75.00, z: 1269.50}); let rot = values.rot; let difference = values.difference; let dv = anglesToDirectionVectorDeg(rot.x, rot.y); bsend([values, dv]); p.applyKnockback(dv.x, dv.z, (1-Math.abs(dv.y))*Vector.magnitude(difference), dv.y*Vector.magnitude(difference)); })
/*
world.afterEvents.itemDefinitionEvent.subscribe(event => {
try{eval(String(world.getDynamicProperty("evalAfterEvents:itemDefinitionEvent")))}catch(e){console.error(e, e.stack); world.getAllPlayers().forEach((currentplayer)=>{if(currentplayer.hasTag("itemDefinitionEventAfterEventDebugErrors")){currentplayer.sendMessage(e + e.stack)}})}
});*/ /*
subscribedEvents.afterItemReleaseUse = world.afterEvents.itemReleaseUse.subscribe(event => {
try{eval(String(world.getDynamicProperty("evalAfterEvents:itemReleaseUse")))}catch(e){console.error(e, e.stack); world.getAllPlayers().forEach((currentplayer)=>{if(currentplayer.hasTag("itemReleaseUseAfterEventDebugErrors")){currentplayer.sendMessage(e + e.stack)}})}
// world.sendMessage("itemReleaseUse: "+JSON.stringify({ItemStack: event.itemStack.typeId, source: event.source.name, useDuration: event.useDuration}))
});*/
/*
/*${scripteval}world.getAllPlayers().filter((p)=>(p.getDynamicProperty("canBypassProtectedAreas") == undefined)).forEach((p)=>{p.setDynamicProperty("canBypassProtectedAreas", false)})*/
/*${scripteval}world.getAllPlayers().find((p)=>(p.name == "Andexter8")).setDynamicProperty("canBypassProtectedAreas", true)*/
/*

try{system.runInterval( () => {
    try{noPistonExtensionAreas = convertToCompoundBlockVolume(String(world.getDynamicProperty("noPistonExtensionAreas") ?? "0, 0, 0, 0, 0, 0"))} catch(e){console.error(e, e.stack);};
    try{protectedAreaVariables.noExplosionAreas = convertToCompoundBlockVolume(String(world.getDynamicProperty("protectedAreaVariables.noExplosionAreas") ?? "0, 0, 0, 0, 0, 0"))} catch(e){console.error(e, e.stack);}
    try{noInteractAreas = convertToCompoundBlockVolume(String(world.getDynamicProperty("noInteractAreas") ?? "0, 0, 0, 0, 0, 0"))} catch(e){console.error(e, e.stack);}
    try{noBlockInteractAreas = convertToCompoundBlockVolume(String(world.getDynamicProperty("noBlockInteractAreas") ?? "0, 0, 0, 0, 0, 0"))} catch(e){console.error(e, e.stack);}
    try{noBlockBreakAreas = convertToCompoundBlockVolume(String(world.getDynamicProperty("noBlockBreakAreas") ?? "0, 0, 0, 0, 0, 0"))} catch(e){console.error(e, e.stack);}
    try{protectedAreas = convertToCompoundBlockVolume(String(world.getDynamicProperty("protectedAreas") ?? "0, 0, 0, 0, 0, 0"))} catch(e){console.error(e, e.stack);}
    try{noBlockPlaceAreas = convertToCompoundBlockVolume(String(world.getDynamicProperty("noBlockPlaceAreas") ?? "0, 0, 0, 0, 0, 0"))} catch(e){console.error(e, e.stack);}
    }, 1)} catch(e){console.error(e, e.stack);}*/
//# sourceMappingURL=Main.js.map