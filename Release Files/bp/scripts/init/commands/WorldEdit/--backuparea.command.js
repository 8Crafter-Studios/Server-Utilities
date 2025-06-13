import { evaluateParameters } from "modules/commands/functions/evaluateParameters";
import { AreaBackups } from "modules/coordinates/classes/AreaBackups";
CommandRegistry.registerCommand({
    commandName: "\\backuparea",
    description: "Creates a new backup area convering the entire selected area.",
    type: "built-in",
    accessType: "named",
    callback(player, event) {
        event.cancel = true;
        try {
            system.run(() => {
                try {
                    const args = evaluateParameters(event.message.slice(config.chatCommandPrefix.length), ["presetText", "string"]).args;
                    const coordinatesa = player.getDynamicProperty("pos1");
                    const coordinatesb = player.getDynamicProperty("pos2");
                    const ca = {
                        x: Math.min(coordinatesa?.x, coordinatesb?.x),
                        y: Math.min(coordinatesa?.y, coordinatesb?.y),
                        z: Math.min(coordinatesa?.z, coordinatesb?.z),
                    };
                    const cb = {
                        x: Math.max(coordinatesa?.x, coordinatesb?.x),
                        y: Math.max(coordinatesa?.y, coordinatesb?.y),
                        z: Math.max(coordinatesa?.z, coordinatesb?.z),
                    };
                    const dimensiona = world.getDimension((player.getDynamicProperty("posD") ?? player.dimension.id));
                    if (!!!coordinatesa) {
                        player.sendMessageB("§cError: pos1 is not set.");
                    }
                    else if (!!!coordinatesb) {
                        player.sendMessageB("§cError: pos2 is not set.");
                    }
                    else {
                        AreaBackups.createAreaBackup(args[1], dimensiona, { from: ca, to: cb });
                        player.sendMessageB(`The backup area has been created with the id "${args[1]}".`);
                    }
                }
                catch (e) {
                    perror(player, e);
                }
            });
        }
        catch (e) {
            perror(player, e);
            return {
                status: 1,
            };
        }
        return {
            status: 0,
        };
    },
    formatting_code: "§r§f",
    requiredTags: ["canUseChatCommands"],
    command_version: "1.0.0",
    categories: ["system", "world", "server", "worldedit"],
    ultraSecurityModeSecurityLevel: "WorldEdit",
    syntax: "\\\\backuparea <id: string>",
    deprecated: false,
    functional: true,
    hidden: false,
    enabled: true,
});
//# sourceMappingURL=--backuparea.command.js.map