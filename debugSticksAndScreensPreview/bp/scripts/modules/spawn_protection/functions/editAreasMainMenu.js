import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { spawnProtectionTypeList } from "./spawnProtectionTypeList";
import { editAreas } from "./editAreas";
export function editAreasMainMenu(sourceEntity) {
    let form = new ActionFormData();
    form.title("Area Selector");
    form.body("Choose area type to edit. ");
    spawnProtectionTypeList.forEach((s) => {
        form.button(s, "textures/ui/xyz_axis");
    });
    form.button("Back", "textures/ui/arrow_left");
    forceShow(form, sourceEntity).then((la) => {
        let l = la;
        try {
            editAreas(sourceEntity, spawnProtectionTypeList[l.selection]);
        }
        catch (e) {
            console.error(e, e.stack);
        }
    });
}
//# sourceMappingURL=editAreasMainMenu.js.map