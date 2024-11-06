import { Player, world, Entity, ItemLockMode, ItemStack, ItemEnchantableComponent, ItemDurabilityComponent, ItemCooldownComponent, PotionEffectType } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { executeCommandPlayerW } from "Main/commands";
import { forceShow, worldBorderSettingsDimensionSelector, settings, extraFeaturesSettings } from "Main/ui";
import { config } from "Main";
import { showMessage } from "Main/utilities";
import { ServerShopManager } from "./server_shop";
import { PlayerShopManager } from "./player_shop";
export function mainShopSystemSettings(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    let form = new ActionFormData();
    form.title("Shop Sytem Settings");
    form.button("Server Shop\n" + (config.shopSystem.server.enabled ? "§aEnabled" : "§cDisabled"), "textures/ui/servers");
    form.button("Player Shop\n" + (config.shopSystem.player.enabled ? "§aEnabled" : "§cDisabled"), "textures/ui/icon_multiplayer");
    form.button("§cSign Shop\n" + (config.shopSystem.sign.enabled ? "§aEnabled" : "§cDisabled"), "textures/ui/icon_sign");
    form.button("Back", "textures/ui/arrow_left");
    forceShow(form, sourceEntity).then(async (r) => {
        if (r.canceled)
            return;
        let response = r.selection;
        switch (response) {
            case 0:
                if ((await ServerShopManager.serverShopSystemSettings(sourceEntity)) == 1) {
                    mainShopSystemSettings(sourceEntity);
                }
                break;
            case 1:
                if ((await PlayerShopManager.playerShopSystemSettings(sourceEntity)) == 1) {
                    mainShopSystemSettings(sourceEntity);
                }
                break;
            case 2:
                showMessage(sourceEntity, undefined, "§cSorry, the sign shop system does not exist yet.", "Back", "Close").then(r => {
                    if (r.selection == 0) {
                        mainShopSystemSettings(sourceEntity);
                    }
                });
                // signShopSystemSettings(sourceEntity)
                break;
            case 3:
                extraFeaturesSettings(sourceEntity);
                break;
            default:
        }
    }).catch(e => {
        console.error(e, e.stack);
    });
}
//# sourceMappingURL=shop_main.js.map