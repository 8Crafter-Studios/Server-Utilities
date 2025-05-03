import { ActionFormData, ActionFormResponse, ModalFormData, MessageFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { HomeSystem } from "modules/commands/classes/HomeSystem";
import { vTStr } from "modules/commands/functions/vTStr";
import { showMessage } from "modules/utilities/functions/showMessage";
import { securityVariables } from "security/ultraSecurityModeUtils";
export async function managePlayers_managePlayer_manageHomes(sourceEntity, player) {
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessMainMenu") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessExtraFeaturesSettings", "Go Back", "Close");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    let form6 = new ActionFormData();
    form6.title(player.name);
    const homes = HomeSystem.getHomesForPlayer(player.id);
    homes.forEach((h) => form6.button(`${h.name}\n${dimensionTypeDisplayFormatting[dimensionse[dimensions.indexOf(h.location.dimension)]]}§r ${vTStr(Vector.floor(h.location))}`));
    form6.button("Back", "textures/ui/arrow_left");
    form6.button("Close", "textures/ui/crossout");
    return (await forceShow(form6, sourceEntity)
        .then(async (ga) => {
        let g = ga;
        if (g.canceled) {
            return 1;
        }
        assertIsDefined(g.selection);
        switch (g.selection) {
            case homes.length:
                return 1;
                break;
            case homes.length + 1:
                return 0;
                break;
            default:
                return await new ActionFormData()
                    .body(`Home Name: ${homes[g.selection].name}\nLocation: ${dimensionTypeDisplayFormatting[dimensionse[dimensions.indexOf(homes[g.selection].location
                    .dimension)]]}§r ${vTStr(homes[g.selection].location)}\nFormat Version: ${homes[g.selection].format_version}\nHome Format Version: ${homes[g.selection].home_format_version}`)
                    .button("Teleport")
                    .button("§cEdit")
                    .button("Delete")
                    .button("Back", "textures/ui/arrow_left")
                    .button("Close", "textures/ui/crossout")
                    .forceShow(sourceEntity)
                    .then(async (h) => {
                    if (h.canceled) {
                        return 1;
                    }
                    if (h.selection == 0) {
                        assertIsDefined(g.selection);
                        sourceEntity.teleport(homes[g.selection].location, {
                            dimension: homes[g.selection].location
                                .dimension,
                        });
                        return 1;
                    }
                    if (h.selection == 1) {
                        new ModalFormData().textField;
                        return 1;
                    }
                    if (h.selection == 2) {
                        if ((await showMessage(sourceEntity, "Are You Sure?", "Are you sure you want to delete this home!?\nThis action cannot be undone!", "Cancel", "Confirm")).selection == 1) {
                            assertIsDefined(g.selection);
                            homes[g.selection].remove();
                        }
                        return 1;
                    }
                    if (h.selection == 3) {
                        return 1;
                    }
                    if (h.selection == 4) {
                        return 0;
                    }
                })
                    .catch(async (e) => {
                    let formError = new MessageFormData();
                    formError.body(e + e.stack);
                    formError.title("Error");
                    formError.button1("Done");
                    formError.button2("Close");
                    return await forceShow(formError, sourceEntity).then((r) => {
                        return +(r.selection == 0);
                    });
                });
        }
    })
        .catch(async (e) => {
        let formError = new MessageFormData();
        formError.body(e + e.stack);
        formError.title("Error");
        formError.button1("Done");
        formError.button2("Close");
        return await forceShow(formError, sourceEntity).then((r) => {
            return +(r.selection == 0);
        });
    }));
}
//# sourceMappingURL=managePlayers_managePlayer_manageHomes.js.map