import { Entity, Player, world } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, MessageFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { mainMenu } from "./mainMenu";
//1320
//2013
export async function onlinePlayerSelector(sourceEntitya, backFunction = mainMenu, ...functionargs) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    let form = new ActionFormData();
    form.title("Select Player");
    let playerslist = world.getAllPlayers();
    playerslist.forEach((p) => {
        form.button(`${p.name}\n${p.id}` /*, "textures/ui/online"*/);
    });
    form.button("Back");
    return await forceShow(form, sourceEntity)
        .then((ra) => {
        let r = ra;
        if (r.canceled) {
            return;
        }
        switch (r.selection) {
            case playerslist.length:
                return tryget(() => backFunction(...(functionargs.length == 0
                    ? [sourceEntity]
                    : functionargs ?? [sourceEntity])));
                break;
            default:
                return playerslist[r.selection];
        }
    })
        .catch((e) => {
        let formError = new MessageFormData();
        formError.body(e + e.stack);
        formError.title("Error");
        formError.button1("Done");
        forceShow(formError, sourceEntity).then(() => {
            return e;
        });
    });
}
//# sourceMappingURL=onlinePlayerSelector.js.map