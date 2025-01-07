import { Entity, Player, world, system } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { config } from "init/classes/config";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { forceShow } from "./forceShow";
import { showActions } from "modules/utilities/functions/showActions";
import { showMessage } from "modules/utilities/functions/showMessage";
import { startCheckingForBannedPlayers, stopCheckingForBannedPlayers } from "modules/ban/functions/checkingForBannedPlayers";
import { startProtectedAreasRefresher, stopProtectedAreasRefresher } from "modules/spawn_protection/functions/protectedAreasRefresher";
import { startPlayerDataAutoSave, stopPlayerDataAutoSave } from "modules/player_save/functions/playerDataAutoSave";
export async function addonDebugUI(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    let form = new ActionFormData();
    let players = world.getPlayers();
    form.title("Debug");
    form.button("Debug Info", "textures/ui/ui_debug_glyph_color");
    form.button("Raw Config", "textures/ui/debug_glyph_color");
    form.button("Start Plyer Data Auto Save", "textures/ui/recap_glyph_color_2x");
    form.button("Stop Plyer Data Auto Save", "textures/ui/close_button_default_light");
    form.button("Start Checking For Banned Players", "textures/ui/recap_glyph_color_2x");
    form.button("Stop Checking For Banned Players", "textures/ui/close_button_default_light");
    form.button("Start Protected Areas Refresher", "textures/ui/recap_glyph_color_2x");
    form.button("Stop Protected Areas Refresher", "textures/ui/close_button_default_light");
    form.button("Stop All Built-In Intervals", "textures/ui/close_button_default_light");
    form.button(entity_scale_format_version != null
        ? "Stop All Entity Scale Built-In Intervals"
        : "§cStop All Entity Scale Built-In Intervals\n§cNo compatible version of entity scale was detected.", "textures/ui/close_button_default_light"); /*
form.button("Start Plyer Data Auto Save", "textures/ui/icon_trailer");
form.button("Stop Plyer Data Auto Save", "textures/ui/realms_red_x");
form.button("Start Checking For Banned Players", "textures/ui/store_play_button");
form.button("Stop Checking For Banned Players", "textures/ui/minus");
form.button("Start Protected Areas Refresher", "textures/ui/recap_glyph_color_2x");
form.button("Stop Protected Areas Refresher", "textures/ui/close_button_default_light");
form.button("Stop All Built-In Intervals", "textures/ui/cancel");
form.button(entity_scale_format_version!=null?"Stop All Entity Scale Built-In Intervals":"§cStop All Entity Scale Built-In Intervals\n§cNo compatible version of entity scale was detected.", "textures/ui/recap_glyph_desaturated");*/
    form.button("Back", "textures/ui/arrow_left");
    form.button("Close", "textures/ui/crossout");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        // This will stop the code when the player closes the form
        if (r.canceled)
            return 1;
        let response = r.selection;
        switch (response) {
            case 0:
                const DPTBC = new (Decimal.clone({ precision: 50 }))(world.getDynamicPropertyTotalByteCount());
                await showActions(sourceEntity, "Debug Info", `Dynamic Property Total Byte Count: ${DPTBC} Bytes/${DPTBC.div(1000).toDecimalPlaces(2)} KB/${DPTBC.div(1024).toDecimalPlaces(2)} KiB/${DPTBC.div(1000000).toDecimalPlaces(2)} MB/${DPTBC.div(1048576).toDecimalPlaces(2)} MiB
Dynamic Property ID Count: ${world.getDynamicPropertyIds().length}
Structure ID Count: ${world.structureManager.getWorldStructureIds().length}
Server Memory Tier: ${system.serverSystemInfo.memoryTier}
Current Tick: ${system.currentTick}
Absolute Time: ${world.getAbsoluteTime()}
Time Of Day: ${world.getTimeOfDay()}
Day: ${world.getDay()}
Moon Phase: ${world.getMoonPhase()}
Default Spawn Location: ${JSONB.stringify(world.getDefaultSpawnLocation())}`, ["Done"]);
                return await addonDebugUI(sourceEntity);
                break;
            case 1:
                await showActions(sourceEntity, "Raw Config", colorizeJSONString(JSONB.stringify(Object.fromEntries(Object.getOwnPropertyNames(config)
                    .filter((n) => ![
                    "constructor",
                    "toString",
                    "toLocaleString",
                    "valueOf",
                    "hasOwnProperty",
                    "name",
                    "prototype",
                    "reset",
                    "length",
                ].includes(n))
                    .map((n) => [n, config[n]])) /*{
antiSpamSystem: config.antiSpamSystem,
chatCommandPrefix: config.chatCommandPrefix,
chatCommandsEnabled: config.chatCommandsEnabled,
chatRanks: config.chatRanks,
homeSystem: config.homeSystem,
invalidChatCommandAction: config.invalidChatCommandAction,
shopSystem: config.shopSystem,
spawnCommandLocation: config.spawnCommandLocation,
system: config.system,
tpaSystem: config.tpaSystem,
ui: config.ui,
undoClipboardMode: config.undoClipboardMode,
validChatCommandPrefixes: config.validChatCommandPrefixes,
worldBorder: config.worldBorder,
} as typeof config*/, undefined, 2).replaceAll("§", "\uF019")), ["Done"]);
                return await addonDebugUI(sourceEntity);
                break;
            case 2:
                startPlayerDataAutoSave();
                return await addonDebugUI(sourceEntity);
                break;
            case 3:
                stopPlayerDataAutoSave();
                return await addonDebugUI(sourceEntity);
                break;
            case 4:
                startCheckingForBannedPlayers();
                return await addonDebugUI(sourceEntity);
                break;
            case 5:
                stopCheckingForBannedPlayers();
                return await addonDebugUI(sourceEntity);
                break;
            case 6:
                startProtectedAreasRefresher();
                return await addonDebugUI(sourceEntity);
                break;
            case 7:
                stopProtectedAreasRefresher();
                return await addonDebugUI(sourceEntity);
                break;
            case 8:
                Object.values(repeatingIntervals).forEach((v) => tryrun(() => system.clearRun(v)));
                return await addonDebugUI(sourceEntity);
                break;
            case 9:
                if (entity_scale_format_version != null) {
                    overworld.runCommand("/scriptevent andexsa:clearRepeatingIntervals");
                }
                else {
                    if ((await showMessage(sourceEntity, "Entity Scale Not Detected", "No compatible version of entity scale was detected, as a result this may not do anything, you need entity scale version 1.14.0 or newer to do this.", "Proceed", "Back")).selection == 0) {
                        overworld.runCommand("/scriptevent andexsa:clearRepeatingIntervals");
                    }
                }
                return await addonDebugUI(sourceEntity);
                break;
            case 10:
                return 1;
                break;
            case 11:
                return 0;
                break;
            default:
                return 1;
        }
    })
        .catch((e) => {
        console.error(e, e.stack);
        return 0;
    });
}
//# sourceMappingURL=addonDebugUI.js.map