import { ActionFormData } from "@minecraft/server-ui";
import { forceShow } from "../../../modules/ui/functions/forceShow";
export async function showActions(player, title, body, ...buttons) {
    const form = new ActionFormData;
    if (!!title) {
        form.title(title);
    }
    if (!!body) {
        form.body(body);
    }
    buttons.forEach(b => { form.button(b[0], b[1]); });
    return forceShow(form, player);
}
//# sourceMappingURL=showActions.js.map