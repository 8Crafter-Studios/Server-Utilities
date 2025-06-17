import { Vector3Utils } from "@minecraft/math.js";
import { world } from "@minecraft/server";
import { srun } from "init/functions/srun";
import { vTStr } from "modules/commands/functions/vTStr";
subscribedEvents.afterItemStartUseOn =
    world.afterEvents.itemStartUseOn.subscribe((event) => {
        try {
            eval(String(world.getDynamicProperty("evalAfterEvents:itemStartUseOn")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => {
                if (currentplayer.hasTag("itemStartUseOnAfterEventDebugErrors")) {
                    currentplayer.sendMessage(e + e.stack);
                }
            });
        }
        if (event.itemStack?.typeId === "andexdb:selection_tool") {
            try {
                const mode = Boolean(event.source.getDynamicProperty("posM") ?? false);
                const loc = event.source.getBlockFromViewDirection({
                    includeLiquidBlocks: !String(event.itemStack.getDynamicProperty("selectmode")).includes("noliquid"),
                    includePassableBlocks: !String(event.itemStack.getDynamicProperty("selectmode")).includes("nopassable"),
                })?.block?.location;
                if (!loc) {
                    event.source.sendMessage("§cError: You must be facing a block.");
                }
                else {
                    const posV = Vector3Utils.floor(loc);
                    event.source.setDynamicProperty(mode ? "pos2" : "pos1", posV);
                    event.source.setDynamicProperty("posD", event.source.dimension.id);
                    event.source.sendMessage(`Set ${mode ? "pos2" : "pos1"} to ${vTStr(posV)}.`);
                    event.source.setDynamicProperty("posM", !mode);
                    srun(() => {
                        event.source.spawnParticle(mode
                            ? "andexdb:xz_axis_particle_pos2"
                            : "andexdb:xz_axis_particle_pos1", Vector.add(loc, { x: 0.5, y: 1.005, z: 0.5 }));
                        event.source.spawnParticle(mode
                            ? "andexdb:xz_axis_particle_pos2_north"
                            : "andexdb:xz_axis_particle_pos1_north", Vector.add(loc, { x: 0.5, y: 0.5, z: 1.005 }));
                        event.source.spawnParticle(mode
                            ? "andexdb:xz_axis_particle_pos2_east"
                            : "andexdb:xz_axis_particle_pos1_east", Vector.add(loc, { x: -0.005, y: 0.5, z: 0.5 }));
                        event.source.spawnParticle(mode
                            ? "andexdb:xz_axis_particle_pos2_down"
                            : "andexdb:xz_axis_particle_pos1_down", Vector.add(loc, { x: 0.5, y: -0.005, z: 0.5 }));
                        event.source.spawnParticle(mode
                            ? "andexdb:xz_axis_particle_pos2_south"
                            : "andexdb:xz_axis_particle_pos1_south", Vector.add(loc, { x: 0.5, y: 0.5, z: -0.005 }));
                        event.source.spawnParticle(mode
                            ? "andexdb:xz_axis_particle_pos2_west"
                            : "andexdb:xz_axis_particle_pos1_west", Vector.add(loc, { x: 1.005, y: 0.5, z: 0.5 }));
                    });
                }
            }
            catch (e) {
                console.error(e, e.stack);
            }
        }
        // world.sendMessage("itemStartUseOn: "+JSON.stringify({ItemStack: event.itemStack.typeId, source: event.source.name, block: event.block, blockFace: event.blockFace}))
    });
//# sourceMappingURL=itemStartUseOn.js.map