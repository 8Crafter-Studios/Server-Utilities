import { Player, world } from "@minecraft/server";
import { ActionFormData, ModalFormData, ActionFormResponse, ModalFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { editAreasMainMenu } from "./editAreasMainMenu";
export function editAreas(player, prefix) {
    let a = world
        .getDynamicPropertyIds()
        .filter((dpi) => dpi.startsWith("v2:" + prefix));
    let b = world
        .getDynamicPropertyIds()
        .filter((dpi) => dpi.startsWith("v2:" + prefix));
    let form1234 = new ActionFormData();
    let form12345 = new ModalFormData();
    let form1234567 = new ActionFormData();
    let form123456 = new ModalFormData();
    a.forEach((aelement, i) => {
        /*console.warn(aelement.slice(22)); */ form1234.button(aelement.slice(prefix.length + 3), tryget(() => JSON.parse(String(world?.getDynamicProperty(aelement)))
            .icon_path) ?? "textures/ui/area_xyz");
        b[i] = String(world.getDynamicProperty(aelement));
    });
    form1234.button("Add New", 
    /*"textures/ui/check_mark"*/ "textures/ui/color_plus");
    form1234.button("Back", 
    /*"textures/ui/chat_return_back_arrow"*/ "textures/ui/arrow_left");
    form1234.title(prefix);
    forceShow(form1234, player).then((t) => {
        if (t.canceled) {
            editAreasMainMenu(player);
            return;
        }
        switch (true) {
            case t.selection == a.length:
                form12345.title("New Protected Area");
                form12345.textField("Identifier Name", "myArea");
                form12345.textField("From", "x1, y1, z1");
                form12345.textField("To", "x2, y2, z2");
                form12345.dropdown("Dimension", ["Overworld", "Nether", "The End"], dimensions.indexOf(player.dimension));
                form12345.dropdown("Mode", ["Protection", "Anti-Protection"]);
                form12345.textField("Icon Path (Optional)", "text");
                form12345.submitButton("Add");
                forceShow(form12345, player).then((q) => {
                    if (q.canceled) {
                        editAreas(player, prefix);
                        return;
                    }
                    const [id, from, to, dimension, mode, icon_path] = q.formValues;
                    world.setDynamicProperty("v2:" + prefix + id, JSON.stringify({
                        from: {
                            x: Number(String(from).split(",")[0]),
                            y: Number(String(from).split(",")[1]),
                            z: Number(String(from).split(",")[2]),
                        },
                        to: {
                            x: Number(String(to).split(",")[0]),
                            y: Number(String(to).split(",")[1]),
                            z: Number(String(to).split(",")[2]),
                        },
                        dimension: Number(dimension),
                        mode: Number(mode),
                        icon_path: (icon_path ?? "") == "" ? undefined : icon_path,
                    }));
                });
                break;
            case t.selection == a.length + 1 /*
    editPistonExtensionAreas(player)*/ /*
                    screenForm123(); */:
                editAreasMainMenu(player);
                break;
            default:
                form1234567.button("Edit", "textures/ui/book_edit_default");
                form1234567.button("Delete", 
                /*"textures/ui/trash_can"*/ "textures/ui/trash_default");
                form1234567.button("Back", 
                /*"textures/ui/chat_return_back_arrow"*/ /*"textures/ui/undoArrow"*/ "textures/ui/chevron_left");
                forceShow(form1234567, player).then((w) => {
                    if (w.canceled) {
                        editAreas(player, prefix);
                        return;
                    }
                    switch (w.selection) {
                        case 0:
                            {
                                const defaults = JSON.parse(String(world.getDynamicProperty(String(a[Number(t.selection)]))));
                                form12345.title("Edit Protected Area");
                                form123456.textField("From", "x1, y1, z1", `${defaults.from.x}, ${defaults.from.y}, ${defaults.from.z}`);
                                form123456.textField("To", "x2, y2, z2", `${defaults.to.x}, ${defaults.to.y}, ${defaults.to.z}`);
                                form123456.dropdown("Dimension", ["Overworld", "Nether", "The End"], defaults.dimension);
                                form123456.dropdown("Mode", ["Protection", "Anti-Protection"], defaults.mode);
                                form123456.textField("Icon Path (Optional)", "text", defaults.icon_path ?? "");
                                form123456.submitButton("Save");
                                forceShow(form123456, player).then((q) => {
                                    if (q.canceled) {
                                        editAreas(player, prefix);
                                        return;
                                    }
                                    const [from, to, dimension, mode, icon_path,] = q.formValues;
                                    world.setDynamicProperty(a[t.selection], JSON.stringify({
                                        from: {
                                            x: Number(String(from).split(",")[0]),
                                            y: Number(String(from).split(",")[1]),
                                            z: Number(String(from).split(",")[2]),
                                        },
                                        to: {
                                            x: Number(String(to).split(",")[0]),
                                            y: Number(String(to).split(",")[1]),
                                            z: Number(String(to).split(",")[2]),
                                        },
                                        dimension: Number(dimension),
                                        mode: Number(mode),
                                        icon_path: (icon_path ?? "") == ""
                                            ? undefined
                                            : icon_path,
                                    }));
                                });
                            }
                            break;
                        case 1:
                            world.setDynamicProperty(a[t.selection], undefined);
                            break;
                        case 2:
                            editAreas(player, prefix);
                            break;
                    }
                });
                break;
        }
    });
}
//# sourceMappingURL=editAreas.js.map