import { Player, system } from "@minecraft/server";
import { uiManager, ActionFormData } from "@minecraft/server-ui";
export function infiniteUIv3(player, interval = 1, title = "Infinite Form", body = "You are now trapped in an infinite form.", button = "Okay") {
    return system.runInterval(async () => {
        uiManager.closeAllForms(player);
        return await new ActionFormData()
            .title(title)
            .body(body)
            .button(button)
            .forceShow(player, interval);
    }, interval);
}
//# sourceMappingURL=infiniteUIv3.js.map