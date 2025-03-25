import { Player, system } from "@minecraft/server";
import { uiManager, ActionFormData } from "@minecraft/server-ui";
export function infiniteUIv2(player) {
    return system.runInterval(async () => {
        uiManager.closeAllForms(player);
        return await new ActionFormData()
            .title("Infinite Form")
            .body("You are now trapped in an infinite form.")
            .button("Okay")
            .forceShow(player, 5);
    }, 5);
}
//# sourceMappingURL=infiniteUIv2.js.map