import { Entity, Player, system } from "@minecraft/server";
import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
export function terminal(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    system.run(() => {
        let form = new ModalFormData();
        form.title("Command Runner / Terminal");
        form.textField("Run Command", "Run Command");
        form.textField("Run Delay", "Run Delay");
        form.toggle("Debug", false);
        form.submitButton("Run");
        forceShow(form, sourceEntity)
            .then((ra) => {
            let r = ra;
            // This will stop the code when the player closes the form
            if (r.canceled)
                return;
            // This will assign every input their own variable
            let [commandId, commandDelay, debug] = r.formValues; /*
    console.warn(r.formValues);*/
            system.runTimeout(() => {
                sourceEntity.sendMessage(String(sourceEntity.runCommand(String(commandId))
                    .successCount));
            }, Number(commandDelay));
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
//# sourceMappingURL=terminal.js.map