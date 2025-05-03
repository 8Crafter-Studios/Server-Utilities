import { world } from "@minecraft/server";
import { arrayToElementList } from "modules/main/functions/arrayToElementList";
export function getUICustomForm(optionsids, codeids) {
    let c = world
        .getDynamicPropertyIds()
        .filter((dpi) => dpi.startsWith(optionsids + "|"));
    let cb;
    cb = [];
    c.forEach((celement, i) => {
        cb[i] = String(world.getDynamicProperty(celement));
    });
    let d = arrayToElementList(c, cb);
    let e = world
        .getDynamicPropertyIds()
        .filter((dpi) => dpi.startsWith(codeids + "|"));
    e = e.sort((a, b) => Number(a.split("|")[1]) - Number(b.split("|")[1]));
    let eb;
    eb = [];
    e.forEach((eelement, i) => {
        eb[i] = i + "|" + String(world.getDynamicProperty(eelement));
    });
    eb = eb.sort((a, b) => Number(a.split("|")[0]) - Number(b.split("|")[0]));
    let f = eb;
    f.forEach((felement, i) => {
        f[i] = felement.split("|").slice(1).join("|");
        eb[i] = felement.split("|").slice(1).join("|");
    });
    let fb = f.join("");
    return {
        optionPropertyIds: c,
        optionPropertyValues: cb,
        optionElements: d,
        codeIds: e,
        codeValues: eb,
        code: fb,
    };
}
//# sourceMappingURL=getUICustomForm.js.map