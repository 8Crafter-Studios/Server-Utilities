import { Entity, Player, world } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showMessage } from "modules/utilities/functions/showMessage";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import { defaultPlayerMenuLeaderboardStatistics } from "../constants/defaultPlayerMenuLeaderboardStatistics";
import { numberFormatter } from "modules/utilities/functions/numberFormatter";
import { customFormUICodes } from "../constants/customFormUICodes";
export async function playerMenu_leaderboard_player(sourceEntitya, leaderboard, player) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (!(sourceEntity instanceof Player)) {
        throw new TypeError("Invalid Player. Expected an instance of the Player class, or an instance of the executeCommandPlayerW class with a Player linked to it, but instead got " +
            (typeof sourceEntity == "object"
                ? sourceEntity === null
                    ? "object[null]"
                    : "object[" + (sourceEntity.constructor.name ?? "unknown") + "]"
                : typeof sourceEntity) +
            ".");
    }
    if (!config.ui.menus.playerMenu.enabled) {
        const r = await showMessage(sourceEntity, "Menu Disabled", "The player menu is disabled. It must be enabled in Main Menu > Settings > Player Menu.", "Back", "Cancel");
        if (r.canceled || r.selection == 0) {
            return 1;
        }
        else {
            return 0;
        }
    }
    const menuConfig = config.ui.menus.playerMenu_leaderboards;
    // menuConfig.buttons.map(k=>[k, menuButtonIds.mainMenu.buttons[k]])
    let form = new ActionFormData();
    form.title(customFormUICodes.action.titles.formStyles.medium + player.name);
    const stats = menuConfig.trackedStats.map((k) => [
        k,
        defaultPlayerMenuLeaderboardStatistics.find((s) => s.id === k && menuConfig.builtInStats[k].enabled) ??
            menuConfig.customStats.find((s) => s.id === k),
    ]);
    const statsDisplay = stats.map(([k, s]) => {
        let value = tryget(() => s.getterFunction != undefined
            ? s.getterFunction(player)
            : world.scoreboard
                .getObjective(s.scoreboardObjective)
                .getScore(world.scoreboard.getParticipants().find((v) => tryget(() => v.getEntity()?.id) == player.id) ??
                world.scoreboard.getParticipants().find((v) => v.id == player.scoreboardIdentity))
                ?.toString());
        if (value === undefined) {
            return `${s.statsListDisplayName}§r: §cError§r`;
        }
        if (s.valueType == "bigint" || s.valueType == "number") {
            value = numberFormatter(value, { addCommaSeparators: s.displayOptions.addCommaSeparators ?? true, currencyPrefix: s.displayOptions.currencyPrefix }, s.displayOptions.toFixed);
        }
        let out = `${s.statsListDisplayName}§r: ${(s.displayOptions.valueDisplayColor?.toLowerCase()?.split("") ?? []).filter(s => "0123456789abcdefghijklmnopqrstuvwxyz".includes(s)).map(s => "§" + s).join("")}${value}`;
        if (leaderboard.displayOptions.valueDisplayTransformer_statsList !== undefined) {
            out = leaderboard.displayOptions.valueDisplayTransformer_statsList(out);
        }
        return out;
    });
    form.body(`${player.name}\n${player.isOnline
        ? "Online"
        : player.isBanned
            ? "Banned"
            : menuConfig.showLastOnlineTimeInPlayerStatsList
                ? "Last Online: " + new Date(player.lastOnline).formatDateTime(sourceEntity.timeZone, false, true)
                : "Offline"}\n${statsDisplay.join("§r\n")}`);
    form.button(customFormUICodes.action.buttons.positions.main_only + "Done");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        if (r.canceled)
            return 1;
        switch (["done", "back", "close"][r.selection]) {
            case "done":
            case "back":
                return 1;
            case "close":
                return 0;
            default:
        }
    })
        .catch((e) => {
        console.error(e, e.stack);
        return 0;
    });
}
//# sourceMappingURL=playerMenu_leaderboard_player.js.map