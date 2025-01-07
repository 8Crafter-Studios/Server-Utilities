import { Entity, Player, system, world } from "@minecraft/server";
import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { chatCommands } from "modules/commands/functions/chatCommands";
export function chatCommandRunner(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    system.run(() => {
        let form = new ModalFormData();
        let playerList = world.getAllPlayers();
        form.title("Chat Command Runner");
        form.textField("Chat Command", "Chat Command");
        form.dropdown("As Player", playerList.map((p) => p.name), playerList.indexOf(sourceEntity));
        form.submitButton("Run Chat Command");
        forceShow(form, sourceEntity)
            .then((ra) => {
            let r = ra;
            // This will stop the code when the player closes the form
            if (r.canceled)
                return;
            // This will assign every input their own variable
            let [message, asPlayer] = r.formValues; /*
    console.warn(r.formValues);*/
            chatCommands({
                returnBeforeChatSend: false,
                player: playerList[asPlayer] ??
                    sourceEntity,
                newMessage: message,
                event: {
                    cancel: false,
                    message: message,
                    sender: playerList[asPlayer] ??
                        sourceEntity,
                },
                eventData: {
                    cancel: false,
                    message: message,
                    sender: playerList[asPlayer] ??
                        sourceEntity,
                },
                fromExecute: true,
            });
            // Do something
        })
            .catch((e) => {
            console.error(e, e.stack);
        });
    }); /*
    try { (sourceEntity).runCommand(String("/scriptevent andexdb:commandRunner hisa")); }
    // Do something
catch(e) {
    console.error(e, e.stack);
};*/
}
//# sourceMappingURL=chatCommandRunner.js.map