CommandRegistry.registerCommand({
    commandName: "debugcustomcommands",
    aliases: [
        { type: "nameAccessibleAlias", commandName: "debugcustomcommand" },
        { type: "nameAccessibleAlias", commandName: "dcc" },
        { type: "prefixAccessibleAlias", commandName: "dcc", prefix: "534473426" },
        {
            type: "regexpAccessibleAlias",
            commandName: "#debugcustomcommands",
            escregexp: {
                v: "^\\ddebugcustomcommands$",
                f: "i",
            },
            regexp: /^\ddebugcustomcommands$/i,
        },
    ],
    description: "Debugs the custom commands.",
    type: "built-in",
    accessType: "named",
    callback(player, event) {
        event.cancel = true;
        pdcsend(player, {
            message: "debug",
            event,
        });
        return {
            status: 0,
        };
    },
    formatting_code: "§d",
    requiredTags: ["debug"],
    command_version: "0.0.1",
    categories: ["system", "Entity Scale Add-On", "built-in"],
    ultraSecurityModeSecurityLevel: "admin",
    syntax: "\\debugcustomcommands",
});
export {};
// if(Math.random() < 0.5) {const locations = [{x: 47, y: 72, z: 17},{x: 46, y: 71, z: 17},{x: 45, y: 71, z: 16},{x: 45, y: 72, z: 15},{x: 43, y: 70, z: 15},{x: 44, y: 71, z: 15},{x: 43, y: 71, z: 14},{x: 44, y: 70, z: 16},{x: 46, y: 70, z: 14},]; overworld.runCommand(`/particle minecraft:water_drip_particle ${modules.cmds.vTStr(Vector.add(locations.randomElement(), {x: Math.random(), y: 0, z: Math.random()}))}`);}
// \\replace stone_stairs%2["weirdo_direction"=0],stone_stairs%2["weirdo_direction"=1],stone_stairs%2["weirdo_direction"=2],stone_stairs%2["weirdo_direction"=3],cobbstone_stairs%1["weirdo_direction"=0],cobbstone_stairs%1["weirdo_direction"=1],cobbstone_stairs%1["weirdo_direction"=2],cobbstone_stairs%1["weirdo_direction"=3],mossy_cobblestone_stairs%1["weirdo_direction"=0],mossy_cobblestone_stairs%1["weirdo_direction"=1],mossy_cobblestone_stairs%1["weirdo_direction"=2],mossy_cobblestone_stairs%1["weirdo_direction"=3],stone_slab%2,cobblestone_slab%1,mossy_cobblestone_slab%1,asdfasdf%144 stone,cobblestone,mossy_cobblestone
// ${ase}Object.defineProperties(config.worldBorder.overworld, Object.fromEntries(cullUndefined(Object.entries(Object.getOwnPropertyDescriptors(config.worldBorder.overworld)).map(v=>v[0] === "prototype" ? undefined : [v[0], {...v[1], enumerable: true}]))))
//# sourceMappingURL=-debugcustomcommands.command.js.map