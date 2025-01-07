import { Entity, EntityInventoryComponent, EntityEquippableComponent, PlayerCursorInventoryComponent, ItemStack, EquipmentSlot, ContainerSlot } from "@minecraft/server";
import { MoneySystem } from "ExtraFeatures/money";
import { anglesToDirectionVectorDeg } from "modules/coordinates/functions/anglesToDirectionVectorDeg";
import { getChunkIndexD } from "modules/coordinates/functions/getChunkIndexD";
Object.defineProperties(Entity.prototype, {
    inventory: {
        get: function inventory() {
            return this.getComponent("inventory");
        },
        configurable: true,
        enumerable: true,
    },
    equippable: {
        get: function equippable() {
            return this.getComponent("equippable");
        },
        configurable: true,
        enumerable: true,
    },
    cursorInventory: {
        get: function cursorInventory() {
            return this.getComponent("cursor_inventory");
        },
        configurable: true,
        enumerable: true,
    },
    heldItem: {
        get: function heldItem() {
            if (!!!this.getComponent("equippable")) {
                return undefined;
            }
            else {
                return this
                    .getComponent("equippable")
                    .getEquipment(EquipmentSlot.Mainhand);
            }
        },
        configurable: true,
        enumerable: true,
    },
    activeSlot: {
        get: function activeSlot() {
            if (!!!this.getComponent("equippable")) {
                return undefined;
            }
            else {
                return this
                    .getComponent("equippable")
                    .getEquipmentSlot(EquipmentSlot.Mainhand);
            }
        },
        configurable: true,
        enumerable: true,
    },
    moneySystem: {
        get: function moneySystem() {
            return MoneySystem.get(this);
        },
        configurable: true,
        enumerable: true,
    },
    dimensionLocation: {
        get: function dimensionLocation() {
            return {
                x: this.x,
                y: this.y,
                z: this.z,
                dimension: this.dimension,
            };
        },
        configurable: true,
        enumerable: true,
    },
    locationstring: {
        get: function locationstring() {
            return this.x + " " + this.y + " " + this.z;
        },
        configurable: true,
        enumerable: true,
    },
    rotationstring: {
        get: function rotationstring() {
            return this.rotx + " " + this.roty;
        },
        configurable: true,
        enumerable: true,
    },
    locationrotation: {
        get: function locationrotation() {
            return {
                x: this.x,
                y: this.y,
                z: this.z,
                rotX: this.rotx,
                rotY: this.roty,
            };
        },
        configurable: true,
        enumerable: true,
    },
    xy: {
        get: function xy() {
            return { x: this.x, y: this.y };
        },
        configurable: true,
        enumerable: true,
    },
    yz: {
        get: function yz() {
            return { y: this.y, z: this.z };
        },
        configurable: true,
        enumerable: true,
    },
    xz: {
        get: function xz() {
            return { x: this.x, z: this.z };
        },
        configurable: true,
        enumerable: true,
    },
    x: {
        get: function x() {
            return this.location.x;
        },
        configurable: true,
        enumerable: true,
    },
    y: {
        get: function y() {
            return this.location.y;
        },
        configurable: true,
        enumerable: true,
    },
    z: {
        get: function z() {
            return this.location.z;
        },
        configurable: true,
        enumerable: true,
    },
    rotx: {
        get: function rotx() {
            return this.getRotation().x;
        },
        configurable: true,
        enumerable: true,
    },
    roty: {
        get: function roty() {
            return this.getRotation().y;
        },
        configurable: true,
        enumerable: true,
    },
    timeZone: {
        get: function timeZone() {
            return (this.getDynamicProperty("andexdbPersonalSettings:timeZone") ??
                config.system.timeZone)
                .toString()
                .toNumber();
        },
        set: function timeZone(timezone) {
            this.setDynamicProperty("andexdbPersonalSettings:timeZone", !!timezone ? timezone.toString() : undefined);
        },
        configurable: true,
        enumerable: true,
    },
    directionvector: {
        get: function directionvector() {
            return anglesToDirectionVectorDeg(this.rotx, this.roty);
        },
        configurable: true,
        enumerable: true,
    },
    chunkIndex: {
        get: function chunkIndex() {
            return getChunkIndexD(this.xz);
        },
        configurable: true,
        enumerable: true,
    },
});
export const exports_5603749806156139082470132985463298047098135609812364098 = undefined;
//# sourceMappingURL=Entity.js.map