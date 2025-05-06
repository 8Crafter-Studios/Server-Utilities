import { Entity, Player, ContainerSlot, ItemLockMode } from "@minecraft/server";
import { ModalFormData, ModalFormResponse, MessageFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
export async function itemEditor(sourceEntitya, targetPlayer, item) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    let form = new ModalFormData();
    form.title("Edit Item");
    form.textField("Item Name (escape characters such as \\n are allowed)", "string", { defaultValue: !!!item.nameTag ? undefined : item.nameTag });
    form.textField("Item Lore (escape characters such as \\n are allowed)(set to [] to clear)", '["Line 1", "Line 2"...]', {
        defaultValue: JSONStringify(item.getLore()),
    });
    form.slider("Amount", 0, 255, { valueStep: 1, defaultValue: item.amount });
    form.textField("Can Destroy (escape characters such as \\n are allowed)", '["Line 1", "Line 2"...]', { defaultValue: JSONStringify(item.getCanDestroy()) });
    form.textField("Can Place On (escape characters such as \\n are allowed)", '["Line 1", "Line 2"...]', {
        defaultValue: JSONStringify(item.getCanPlaceOn()),
    });
    form.dropdown("Item Lock Mode", [ItemLockMode.none, ItemLockMode.slot, ItemLockMode.inventory], {
        defaultValueIndex: [ItemLockMode.none, ItemLockMode.slot, ItemLockMode.inventory].indexOf(item.lockMode),
    });
    form.toggle("Keep On Death", { defaultValue: item.keepOnDeath });
    form.textField((!!!item.getItem().getComponent("cooldown") ? "§c(UNAVAILABLE)§f " : "") + "Set Cooldown (In Ticks)", "ticks");
    form.textField((!!!item.getItem().getComponent("durability") ? "§c(UNAVAILABLE)§f " : "") + "Set Damage", "int", {
        defaultValue: String(item.getItem().getComponent("durability")?.damage),
    });
    form.submitButton("Done");
    let result;
    result = undefined;
    return forceShow(form, sourceEntity)
        .then((ra) => {
        let r = ra;
        if (r.canceled) {
            return;
        }
        let [name, lore, count, canDestroy, canPlaceOn, lockMode, keepOnDeath, cooldown, durability] = r.formValues;
        try {
            if (String(name) != item.nameTag) {
                item.nameTag = String(name);
            }
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            if (JSONParse(String(lore) == "" ? "[]" : String(lore)) != item.getLore()) {
                item.setLore(JSONParse(String(lore)));
            }
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            if (Number(count) != item.amount) {
                item.amount = Number(count);
            }
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            if (JSONParse(String(canDestroy) == "" ? "[]" : String(canDestroy)) != item.getCanDestroy()) {
                item.setCanDestroy(JSONParse(String(canDestroy)));
            }
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            if (JSONParse(String(canPlaceOn) == "" ? "[]" : String(canPlaceOn)) != item.getCanPlaceOn()) {
                item.setCanPlaceOn(JSONParse(String(canPlaceOn)));
            }
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            if ([ItemLockMode.none, ItemLockMode.slot, ItemLockMode.inventory][Number(lockMode)] != item.lockMode) {
                item.lockMode = [ItemLockMode.none, ItemLockMode.slot, ItemLockMode.inventory][Number(lockMode)];
            }
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            if (Boolean(keepOnDeath) != item.keepOnDeath) {
                item.keepOnDeath = Boolean(keepOnDeath);
            }
        }
        catch (e) {
            console.error(e, e.stack);
        }
        if (!!item.getItem().getComponent("cooldown")) {
            try {
                if (String(cooldown) != "") {
                    targetPlayer.startItemCooldown(item.getItem().getComponent("cooldown").cooldownCategory, Number(cooldown));
                }
            }
            catch (e) {
                console.error(e, e.stack);
            }
        }
        if (!!item.getItem().getComponent("durability")) {
            try {
                if (Number(durability) != item.getItem().getComponent("durability").damage) {
                    const a = item.getItem();
                    a.getComponent("durability").damage = Number(durability);
                    item.setItem(a);
                }
            }
            catch (e) {
                console.error(e, e.stack);
            }
        }
        return result;
    })
        .catch((e) => {
        let formError = new MessageFormData();
        formError.body(e + e.stack);
        formError.title("Error");
        formError.button1("Done");
        forceShow(formError, sourceEntity).then(() => {
            return e;
        });
    });
}
//# sourceMappingURL=itemEditor.js.map