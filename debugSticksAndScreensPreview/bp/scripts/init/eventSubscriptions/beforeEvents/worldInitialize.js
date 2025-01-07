import { world, system } from "@minecraft/server";
/*
let a = world.getDimension("the_end").getBlock({x: 0, y: 0, z: 0}).permutation
let c = a as BlockStates
c*/
/*convertToCompoundBlockVolume(String(world.getDynamicProperty("noPistonExtensionAreas")))*/ /*
let b = a[Number(world.getAllPlayers()[0].getDynamicProperty("debugStickPropertyIndex"))]*/
/*
world.getAllPlayers().forEach((pi, ia)=>{console.warn(pi.getComponent("inventory").inventorySize); for(let i = 0; i<pi.getComponent("inventory").inventorySize; i++){let item = pi.getComponent("inventory").container.getSlot(i); console.warn(i); if(item.typeId == "minecraft:skull"){world.getAllPlayers().forEach((pn)=>{if(item.nameTag == `§r§f${pn.name}'s Head§§`){item.setLore([`§r§aLocation: ${JSON.stringify(pn.location)}`, `Velocity: ${JSON.stringify(pn.getVelocity())}`, `Rotation: ${JSON.stringify(pn.getRotation())}`, `View Direction: ${JSON.stringify(pn.getViewDirection())}`, `Sleeping: ${pn.isSleeping}`, `Sneaking: ${pn.isSneaking}`, `Sprinting: ${pn.isSprinting}`, `Swimming: ${pn.isSwimming}`])}})}}})
world.getAllPlayers().forEach((pi, ia)=>{console.warn(pi.getComponent("inventory").inventorySize); for(let i = 0; i<pi.getComponent("inventory").inventorySize; i++){let item = pi.getComponent("inventory").container.getSlot(i); console.warn(i); }})
 */
subscribedEvents.beforeWorldInitialize =
    world.beforeEvents.worldInitialize.subscribe((event) => {
        try {
            eval(String(world.getDynamicProperty("evalBeforeEvents:worldInitialize")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => {
                if (currentplayer.hasTag("worldInitializeAfterEventDebugErrors")) {
                    currentplayer.sendMessage(e + e.stack);
                }
            });
        }
        globalThis.beforeInitiallizeTick = system.currentTick;
        event.itemComponentRegistry.registerCustomComponent("andexdbcomponents:animate_use_on", {
            onUseOn: (event) => { },
        });
        event.itemComponentRegistry.registerCustomComponent("andexdbcomponents:animate_use", {
            onUse: (event) => { },
        });
        event.itemComponentRegistry.registerCustomComponent("andexdbcomponents:selection_tool", {
            onUseOn: (event) => {
                console.log(3);
            },
            onUse: (event) => {
                console.log(4);
            },
        });
    });
//# sourceMappingURL=worldInitialize.js.map