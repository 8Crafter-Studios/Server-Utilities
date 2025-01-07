import { Dimension, Entity } from "@minecraft/server";
export class WorldEditSelection {
    player;
    constructor(player) {
        this.player = player;
    }
    get pos1() {
        return this.player.getDynamicProperty("pos1");
    }
    set pos1(value) {
        this.player.setDynamicProperty("pos1", value);
    }
    get pos2() {
        return this.player.getDynamicProperty("pos2");
    }
    set pos2(value) {
        this.player.setDynamicProperty("pos2", value);
    }
    get dimension() {
        let value = this.player.getDynamicProperty("posD");
        if (!!!value) {
            return undefined;
        }
        return world.getDimension(value);
    }
    get minPos() {
        return {
            x: Math.min(this.pos1.x, this.pos2.x),
            y: Math.min(this.pos1.y, this.pos2.y),
            z: Math.min(this.pos1.z, this.pos2.z),
        };
    }
    get maxPos() {
        return {
            x: Math.max(this.pos1.x, this.pos2.x),
            y: Math.max(this.pos1.y, this.pos2.y),
            z: Math.max(this.pos1.z, this.pos2.z),
        };
    }
    set dimension(value) {
        let outValue = undefined;
        if (!!value) {
            if (value instanceof Dimension) {
                outValue = value.id;
            }
            else if (dimensionsd.includes(value)) {
                outValue = value;
            }
            else if (dimensionse.includes(value)) {
                outValue = ("minecraft:" +
                    value);
            }
            else {
                throw new TypeError("Invalid dimension: " + value);
            }
        }
        this.player.setDynamicProperty("posD", outValue);
    }
    getSavedSelectionIds() {
        return this.player
            .getDynamicPropertyIds()
            .filter((v) => v.startsWith("savedSelection:"))
            .map((v) => v.slice(15));
    }
    getSavedSelection(selectionID) {
        if (!!!this.player.getDynamicProperty("savedSelection:" + selectionID)) {
            return undefined;
        }
        return JSON.parse(String(this.player.getDynamicProperty("savedSelection:" + selectionID)));
    }
    removeSavedSelection(selectionID) {
        if (!!!this.player.getDynamicProperty("savedSelection:" + selectionID)) {
            return false;
        }
        this.player.setDynamicProperty("savedSelection:" + selectionID);
        return true;
    }
    saveSelection(selectionID, value = {
        pos1: this.pos1,
        pos2: this.pos2,
        dimension: this.dimension.id,
    }) {
        if (!testForObjectTypeExtension(value, {
            pos1: {
                x: "number",
                y: "number",
                z: "number",
            },
            pos2: {
                x: "number",
                y: "number",
                z: "number",
            },
            dimension: "string",
        })) {
            throw new TypeError(`Invalid value type, expected {pos1: Vector3, pos2: Vector3, dimension: ${dimensionsd
                .map((s) => JSON.stringify(s))
                .join(" | ")}}`);
        }
        this.player.setDynamicProperty("savedSelection:" + selectionID, JSON.stringify(value));
    }
    toJSON() {
        return {};
    }
}
Object.defineProperties(Entity.prototype, {
    worldEditSelection: {
        get: function worldEditSelection() {
            return new WorldEditSelection(this);
        },
        configurable: true,
        enumerable: true,
    },
}); /*
export function customFormUIEditor(sourceEntity: Entity|Player){
    let form2 = new ModalFormData();
    let players = world.getAllPlayers();
    let targetList = [players[0].nameTag]
    for (const index in players) {
        if (Number(index) != 0) {
        targetList = String([String(targetList), players[index].nameTag]).split(",");
        }
    }
    let formId = event.message ?? "test1234"
    let form = editCustomFormUI(formId)
    forceShow(form.form, (event.sourceEntity as Player)).then(to => {
        let t = (to as ModalFormResponse)
        if (t.canceled) return;
        world.setDynamicProperty(`customUI:${formId}`, `${t.formValues[0]}|${t.formValues[1]}`)
        let elementValues = t.formValues.slice(2, -2)
        console.warn(elementValues)
        elementValues.forEach((v, i)=>{switch(i % 5){
            case 0: world.setDynamicProperty(`customUIElement:${formId}|${form.indexList[Math.floor(i / 5)]}`, `${customElementTypeIds[Number(elementValues[i])]}|${elementValues.slice(i+1, i+4).join("|")}`); break;
            case 4: if(Boolean(v)==true){world.setDynamicProperty(`customUIElement:${formId}|${form.indexList[Math.floor(i / 5)]}`)}; break;
        }});
        if (t.formValues[t.formValues.length-2]){world.setDynamicProperty(`customUIElement:${formId}|${(Number(t.formValues[t.formValues.length-1]) ?? ((form.indexList[form.indexList.length-1] ?? -1)+1))}`, ""); }
}).catch(e => {
    console.error(e, e.stack);
});}*/
Object.defineProperty(globalThis, "PlayerPermissions", {
    value: PlayerPermissions,
    enumerable: true,
    configurable: true,
    writable: false,
});
//# sourceMappingURL=WorldEditSelection.js.map