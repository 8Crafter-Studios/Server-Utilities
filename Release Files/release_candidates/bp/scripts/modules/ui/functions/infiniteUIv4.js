import { Player, system } from "@minecraft/server";
import { uiManager, ActionFormData } from "@minecraft/server-ui";
export function infiniteUIv4(player, interval = 1, title = "Infinite Form", body = "You are now trapped in an infinite form.", button = "Okay") {
    return system.runInterval(async () => {
        uiManager.closeAllForms(player);
        await new ActionFormData()
            .title(title)
            .body(body)
            .button(button)
            .forceShow(player, interval);
        uiManager.closeAllForms(player);
        await new ActionFormData()
            .title(title)
            .body(body)
            .button(button)
            .forceShow(player, interval);
        uiManager.closeAllForms(player);
        await new ActionFormData()
            .title(title)
            .body(body)
            .button(button)
            .forceShow(player, interval);
        uiManager.closeAllForms(player);
        await new ActionFormData()
            .title(title)
            .body(body)
            .button(button)
            .forceShow(player, interval);
        uiManager.closeAllForms(player);
        return await new ActionFormData()
            .title(title)
            .body(body)
            .button(button)
            .forceShow(player, interval);
    }, interval);
}
//# sourceMappingURL=infiniteUIv4.js.map