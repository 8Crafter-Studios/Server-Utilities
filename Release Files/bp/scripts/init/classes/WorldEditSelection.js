import { Dimension, Entity } from "@minecraft/server";
var exports;
(function (exports) {
    /**
     * A class that represents a WorldEdit selection for a player.
     */
    class WorldEditSelection {
        /**
         * The player that this selection is for.
         *
         * @type {Entity}
         */
        player;
        /**
         * Gets the WorldEdit selection for the given player.
         *
         * @param {Entity} player The player that this selection is for.
         */
        constructor(player) {
            this.player = player;
        }
        /**
         * The first corner of the current selection.
         *
         * It is stored in the player's `pos1` dynamic property.
         *
         * @type {Vector3 | undefined}
         */
        get pos1() {
            return this.player.getDynamicProperty("pos1");
        }
        set pos1(value) {
            this.player.setDynamicProperty("pos1", value);
        }
        /**
         * The second corner of the current selection.
         *
         * It is stored in the player's `pos2` dynamic property.
         *
         * @type {Vector3 | undefined}
         */
        get pos2() {
            return this.player.getDynamicProperty("pos2");
        }
        set pos2(value) {
            this.player.setDynamicProperty("pos2", value);
        }
        /**
         * The currently selected dimension.
         *
         * It is stored in the player's `posD` dynamic property.
         *
         * @type {Dimension | undefined}
         */
        get dimension() {
            let value = this.player.getDynamicProperty("posD");
            if (!!!value) {
                return undefined;
            }
            return tryget(() => world.getDimension(value)) ?? undefined;
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
                    outValue = ("minecraft:" + value);
                }
                else {
                    throw new TypeError("Invalid dimension: " + value);
                }
            }
            this.player.setDynamicProperty("posD", outValue);
        }
        /**
         * The smallest corner of the selection.
         *
         * It gets the minimum values of each of the vectors of the `pos1` and `pos2` properties.
         *
         * @type {Vector3 | undefined}
         */
        get minPos() {
            const p1 = this.pos1;
            const p2 = this.pos2;
            if (p1 === undefined || p2 === undefined)
                return undefined;
            return {
                x: Math.min(p1.x, p2.x),
                y: Math.min(p1.y, p2.y),
                z: Math.min(p1.z, p2.z),
            };
        }
        /**
         * The largest corner of the selection.
         *
         * It gets the maximum values of each of the vectors of the `pos1` and `pos2` properties.
         *
         * @type {Vector3 | undefined}
         */
        get maxPos() {
            const p1 = this.pos1;
            const p2 = this.pos2;
            if (p1 === undefined || p2 === undefined)
                return undefined;
            return {
                x: Math.max(p1.x, p2.x),
                y: Math.max(p1.y, p2.y),
                z: Math.max(p1.z, p2.z),
            };
        }
        /**
         * Gets the IDs of all saved selections for this player.
         *
         * @returns {string[]} The IDs of all saved selections.
         */
        getSavedSelectionIds() {
            return this.player
                .getDynamicPropertyIds()
                .filter((v) => v.startsWith("savedSelection:"))
                .map((v) => v.slice(15));
        }
        /**
         * Gets all saved selections for this player.
         *
         * @returns {{[selectionID: string]: SavedWorldEditSelection}} The saved selections.
         * @throws {SyntaxError} If any of the saved selections are not valid JSON.
         */
        getSavedSelections() {
            return Object.fromEntries(cullUndefined(this.getSavedSelectionIds().map((selectionID) => {
                if (!!!this.player.getDynamicProperty("savedSelection:" + selectionID)) {
                    return undefined;
                }
                return [selectionID, JSON.parse(String(this.player.getDynamicProperty("savedSelection:" + selectionID)))];
            })));
        }
        /**
         * Gets a saved selection from the player's saved selection list.
         *
         * @param {string} selectionID The ID of the selection to get.
         * @returns {SavedWorldEditSelection | undefined} The saved selection, or undefined if it doesn't exist.
         * @throws {SyntaxError} If the saved selection is not valid JSON.
         */
        getSavedSelection(selectionID) {
            if (!!!this.player.getDynamicProperty("savedSelection:" + selectionID)) {
                return undefined;
            }
            return JSON.parse(String(this.player.getDynamicProperty("savedSelection:" + selectionID)));
        }
        /**
         * Removes a saved selection from the player's saved selection list.
         *
         * @param {string} selectionID The ID of the selection to remove.
         * @returns {boolean} True if the selection was removed, false if it didn't exist.
         * @throws {TypeError} If the {@link selectionID} is not a string.
         */
        removeSavedSelection(selectionID) {
            if (!!!this.player.getDynamicProperty("savedSelection:" + selectionID)) {
                return false;
            }
            this.player.setDynamicProperty("savedSelection:" + selectionID);
            return true;
        }
        /**
         * Saves the current selection to the player's saved selection list.
         *
         * @param {string} selectionID The ID to save the selection under.
         * @param {SavedWorldEditSelection} value The selection to save.
         * @throws {TypeError} If the value is not a valid selection.
         */
        saveSelection(selectionID, value = {
            pos1: this.pos1 ? this.pos1 : (() => { throw new TypeError("[WorldEditSelection.prototype::saveSelection] this.pos1 must be defined to save a selection."); })(),
            pos2: this.pos2 ? this.pos2 : (() => { throw new TypeError("[WorldEditSelection.prototype::saveSelection] this.pos2 must be defined to save a selection."); })(),
            dimension: this.dimension ? this.dimension.id : (() => { throw new TypeError("[WorldEditSelection.prototype::saveSelection] this.dimension must be defined to save a selection."); })(),
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
                throw new TypeError(`Invalid value type, expected {pos1: Vector3, pos2: Vector3, dimension: ${dimensionsd.map((s) => JSON.stringify(s)).join(" | ")}}`);
            }
            this.player.setDynamicProperty("savedSelection:" + selectionID, JSON.stringify(value));
        }
        /**
         * Gets the JSON data of the linked player's world edit selection.
         *
         * @returns {WorldEditSelectionJSONData} The JSON data of the world edit selection.
         */
        toJSON() {
            return {
                pos1: this.pos1,
                pos2: this.pos2,
                minPos: this.minPos,
                maxPos: this.maxPos,
                dimension: this.dimension.id,
                savedSelections: this.getSavedSelections(),
            };
        }
    }
    exports.WorldEditSelection = WorldEditSelection;
})(exports || (exports = {}));
export var WorldEditSelection = exports.WorldEditSelection;
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
    let targetList = [players[0]!.nameTag]
    for (const index in players) {
        if (Number(index) != 0) {
        targetList = String([String(targetList), players[index]!.nameTag]).split(",");
        }
    }
    let formId = event.message ?? "test1234"
    let form = editCustomFormUI(formId)
    forceShow(form.form, (event.sourceEntity as Player)).then(to => {
        let t = (to as ModalFormResponse)
        if (t.canceled) return;
        world.setDynamicProperty(`customUI:${formId}`, `${t.formValues![0]}|${t.formValues![1]}`)
        let elementValues = t.formValues.slice(2, -2)
        console.warn(elementValues)
        elementValues.forEach((v, i)=>{switch(i % 5){
            case 0: world.setDynamicProperty(`customUIElement:${formId}|${form.indexList[Math.floor(i / 5)]}`, `${customElementTypeIds[Number(elementValues[i])]}|${elementValues.slice(i+1, i+4).join("|")}`); break;
            case 4: if(Boolean(v)==true){world.setDynamicProperty(`customUIElement:${formId}|${form.indexList[Math.floor(i / 5)]}`)}; break;
        }});
        if (t.formValues![t.formValues.length-2]){world.setDynamicProperty(`customUIElement:${formId}|${(Number(t.formValues![t.formValues.length-1]) ?? ((form.indexList[form.indexList.length-1] ?? -1)+1))}`, ""); }
}).catch(e => {
    console.error(e, e.stack);
});}*/
Object.defineProperty(globalThis, "WorldEditSelection", {
    value: exports.WorldEditSelection,
    enumerable: true,
    configurable: true,
    writable: false,
});
//# sourceMappingURL=WorldEditSelection.js.map