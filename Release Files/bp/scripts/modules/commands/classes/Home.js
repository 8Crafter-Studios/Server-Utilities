import { Player, world } from "@minecraft/server";
import { getPlayerById } from "init/functions/getPlayerById";
import { HomeSystem } from "./HomeSystem";
export class Home {
    location;
    name;
    ownerId;
    ownerName;
    saveId;
    format_version;
    home_format_version;
    constructor(home) {
        this.location = home.location;
        this.name = home.name;
        this.ownerId = home.ownerId ?? home.owner?.id;
        this.ownerName = home.ownerName ?? home.owner?.name;
        this.saveId = home.saveId;
        this.format_version = home.format_version ?? format_version;
        this.home_format_version =
            home.home_format_version ?? HomeSystem.home_format_version;
    }
    get owner() {
        return getPlayerById(this.ownerId);
    }
    get isOwnerOnline() {
        return !!world.getAllPlayers().find((p) => p.id == this.ownerId);
    }
    get isSaved() {
        return !!world.getDynamicProperty(this.saveId);
    }
    toJSON() {
        return {
            location: Object.assign(this.location, {
                dimension: this.location.dimension.id,
            }),
            name: this.name,
            ownerId: this.ownerId,
            ownerName: this.ownerName,
            format_version: this.format_version ?? format_version,
            home_format_version: this.home_format_version ?? HomeSystem.home_format_version,
        };
    }
    save(otherDataToChange = {}, keepOldFormatVersion = false) {
        world.setDynamicProperty(this.saveId, JSONStringify(Object.assign(Object.assign(Object.assign(JSONParse(String(world.getDynamicProperty(this.saveId) ??
            "{}")) ?? {}, this.toJSON()), otherDataToChange), keepOldFormatVersion
            ? {}
            : {
                format_version,
                home_format_version: HomeSystem.home_format_version,
            })));
    }
    remove() {
        world.setDynamicProperty(this.saveId);
    }
    static get(homeId) {
        return !!world.getDynamicProperty(homeId)
            ? new Home(Object.assign(JSONParse(String(world.getDynamicProperty(homeId))), {
                saveId: homeId,
                location: Object.assign(JSONParse(String(world.getDynamicProperty(homeId))).location, {
                    dimension: world.getDimension(JSONParse(String(world.getDynamicProperty(homeId))).location.dimension),
                }),
            }))
            : undefined;
    }
    static delete(homeId) {
        world.setDynamicProperty(homeId);
    }
}
//# sourceMappingURL=Home.js.map