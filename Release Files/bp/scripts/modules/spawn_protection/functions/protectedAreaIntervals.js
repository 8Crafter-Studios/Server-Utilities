import { ProtectedAreaCategory, ProtectedAreas, ProtectedAreaTester } from "init/variables/protectedAreaVariables";
import { getAllEntities } from "modules/commands/functions/getAllEntities";
/**
 * Whether or not the zone actions interval is currently running.
 */
let zoneActionsIntervalActive = false;
/**
 * Whether or not the zone actions interval has been requested to stop.
 */
let zoneActionsIntervalStopRequested = false;
/**
 * The list of advanced area categories that have enabled zone actions.
 */
let zonesWithExecutableActions = ProtectedAreas.areas.advancedAreaCategories.filter((category) => category.enabled !== false &&
    ((category.noPVPZone !== false && category.noPVPZone !== undefined && category.noPVPZone.enabled !== false) ||
        (category.tagZone !== false && category.tagZone !== undefined && category.tagZone.enabled !== false)));
/**
 * The last time the zones in the `zonesWithExecutableActions` variable were refreshed.
 */
let lastZoneRefresh = Date.now();
/**
 * Whether or not any of the advanced area categories have a tag zone that has the `playersOnly` property set to `false`.
 */
let tagZoneWithEntitiesIncludedIsActive = false;
/**
 * Automatically refreshes the zones in the `zonesWithExecutableActions` variable if the
 * configured interval has passed since the last refresh.
 */
export function autoRefreshZones() {
    if (Date.now() - lastZoneRefresh > config.system.protectedAreasZoneRefreshInterval) {
        refreshZones();
    }
}
/**
 * Refreshes the list of advanced area categories that have enabled zone actions.
 * If any of the advanced area categories have a tag zone that has the `playersOnly` property set to `false`,
 * the `tagZoneWithEntitiesIncludedIsActive` variable is set to `true`, otherwise it is set to `false`.
 * The `lastZoneRefresh` variable is set to the current time.
 */
export function refreshZones() {
    zonesWithExecutableActions = ProtectedAreas.areas.advancedAreaCategories.filter((category) => category.enabled !== false &&
        ((category.noPVPZone !== false && category.noPVPZone !== undefined && category.noPVPZone.enabled !== false) ||
            (category.tagZone !== false && category.tagZone !== undefined && category.tagZone.enabled !== false)));
    if (!!zonesWithExecutableActions.find((category) => category.tagZone !== false && category.tagZone !== undefined && category.tagZone.enabled !== false && category.tagZone.playersOnly === false)) {
        tagZoneWithEntitiesIncludedIsActive = true;
    }
    else {
        tagZoneWithEntitiesIncludedIsActive = false;
    }
    lastZoneRefresh = Date.now();
}
/**
 * Manages the execution of zone actions at a regular interval.
 *
 * This function continuously executes actions for zones with enabled features such as
 * No PVP Zone or Tag Zone, refreshing zones and updating players' states with respect
 * to these zones. The interval continues to run until a stop request is made.
 *
 * @throws {Error} If the zone actions interval is already active.
 * @returns {Promise<void>} A promise that resolves when the zone actions interval is stopped.
 */
async function zoneActionsInterval() {
    if (zoneActionsIntervalActive)
        throw new Error("Zone actions interval is already active!");
    zoneActionsIntervalActive = true;
    while (!zoneActionsIntervalStopRequested) {
        autoRefreshZones();
        const players = world.getAllPlayers();
        clearZoneTagsFromInactiveAreas(players);
        executeZoneActions(players);
        await waitTicks(config.system.protectedAreasZoneActionsInterval);
    }
    zoneActionsIntervalStopRequested = false;
    zoneActionsIntervalActive = false;
    return;
}
async function executeZoneActions(players) {
    const entities = tagZoneWithEntitiesIncludedIsActive ? getAllEntities() : [];
    if (zonesWithExecutableActions.length > 0) {
        zonesWithExecutableActions.forEach((category) => {
            const tester = new ProtectedAreaCategory("advancedArea", category.id);
            if (category.noPVPZone !== false && category.noPVPZone !== undefined && category.noPVPZone.enabled !== false) {
                players.forEach((player) => {
                    if (!player.getDynamicProperty("noPVPZoneActiveFromCustomAreaCategory:" + category.id) &&
                        tester.testIsInArea(player.location, player.dimension)) {
                        player.setDynamicProperty("noPVPZoneActiveFromCustomAreaCategory:" + category.id, true);
                        player.addTag("is_in_no_pvp_zone");
                    }
                    else if (player.getDynamicProperty("noPVPZoneActiveFromCustomAreaCategory:" + category.id) &&
                        !tester.testIsInArea(player.location, player.dimension)) {
                        player.setDynamicProperty("noPVPZoneActiveFromCustomAreaCategory:" + category.id);
                        if (player.hasTag("is_in_no_pvp_zone") &&
                            !player
                                .getDynamicPropertyIds()
                                .filter((id) => id.startsWith("noPVPZoneActiveFromCustomAreaCategory:"))
                                .some((id) => {
                                const category = ProtectedAreas.areas.advancedAreaCategories.find((category) => category.id === id.split(":")[1]);
                                if (!category)
                                    return;
                                if (new ProtectedAreaCategory("advancedArea", category.id).testIsInArea(player.location, player.dimension)) {
                                    return true;
                                }
                                else {
                                    return true;
                                }
                            })) {
                            player.removeTag("is_in_no_pvp_zone");
                        }
                    }
                });
            }
            if (category.tagZone !== false && category.tagZone !== undefined && category.tagZone.enabled !== false) {
                const prop = category.tagZone;
                if (prop.playersOnly !== false) {
                    players.forEach((player) => {
                        if (player.getDynamicProperty("tagZoneActiveFromCustomAreaCategory:" + category.id) === undefined &&
                            tester.testIsInArea(player.location, player.dimension)) {
                            player.setDynamicProperty("tagZoneActiveFromCustomAreaCategory:" + category.id, JSON.stringify(prop.tags)); // Mark that this player has had these tags added by this category.
                            prop.tags.forEach((tag) => player.addTag(tag));
                        }
                        else if ((prop.removeOnExit ?? false) &&
                            player.getDynamicProperty("tagZoneActiveFromCustomAreaCategory:" + category.id) !== undefined &&
                            !tester.testIsInArea(player.location, player.dimension)) {
                            player.setDynamicProperty("tagZoneActiveFromCustomAreaCategory:" + category.id); // Delete the property that was used to mark this player as having these tags added by this category.
                            try {
                                JSON.parse(player.getDynamicProperty("tagZoneActiveFromCustomAreaCategory:" + category.id)).forEach((tag) => {
                                    if (player.hasTag(tag) &&
                                        !player
                                            .getDynamicPropertyIds()
                                            .filter((id) => id.startsWith("tagZoneActiveFromCustomAreaCategory:"))
                                            .some((id) => {
                                            const category = ProtectedAreas.areas.advancedAreaCategories.find((category) => category.id === id.split(":")[1]);
                                            if (!category)
                                                return;
                                            if (category.tagZone !== false &&
                                                category.tagZone !== undefined &&
                                                category.tagZone.enabled !== false &&
                                                category.tagZone.tags.includes(tag) &&
                                                new ProtectedAreaCategory("advancedArea", category.id).testIsInArea(player.location, player.dimension)) {
                                                return true;
                                            }
                                            else {
                                                return true;
                                            }
                                        })) {
                                        player.removeTag(tag);
                                    }
                                });
                            }
                            finally {
                                player.setDynamicProperty("tagZoneActiveFromCustomAreaCategory:" + category.id);
                            }
                        }
                    });
                }
                else if (tagZoneWithEntitiesIncludedIsActive) {
                    // Make sure that the entities are included before attempting to tag them, so check this variable that is updated when the zones are refreshed, because the entities are only loaded if it is true.
                    entities.forEach((entity) => {
                        if (entity.getDynamicProperty("tagZoneActiveFromCustomAreaCategory:" + category.id) === undefined &&
                            tester.testIsInArea(entity.location, entity.dimension)) {
                            entity.setDynamicProperty("tagZoneActiveFromCustomAreaCategory:" + category.id, JSON.stringify(prop.tags)); // Mark that this player has had these tags added by this category.
                            prop.tags.forEach((tag) => entity.addTag(tag));
                        }
                        else if ((prop.removeOnExit ?? false) &&
                            entity.getDynamicProperty("tagZoneActiveFromCustomAreaCategory:" + category.id) !== undefined &&
                            !tester.testIsInArea(entity.location, entity.dimension)) {
                            entity.setDynamicProperty("tagZoneActiveFromCustomAreaCategory:" + category.id); // Delete the property that was used to mark this player as having these tags added by this category.
                            try {
                                JSON.parse(entity.getDynamicProperty("tagZoneActiveFromCustomAreaCategory:" + category.id)).forEach((tag) => {
                                    if (entity.hasTag(tag) &&
                                        !entity
                                            .getDynamicPropertyIds()
                                            .filter((id) => id.startsWith("tagZoneActiveFromCustomAreaCategory:"))
                                            .some((id) => {
                                            const category = ProtectedAreas.areas.advancedAreaCategories.find((category) => category.id === id.split(":")[1]);
                                            if (!category)
                                                return;
                                            if (category.tagZone !== false &&
                                                category.tagZone !== undefined &&
                                                category.tagZone.enabled !== false &&
                                                category.tagZone.tags.includes(tag) &&
                                                new ProtectedAreaCategory("advancedArea", category.id).testIsInArea(entity.location, entity.dimension)) {
                                                return true;
                                            }
                                            else {
                                                return true;
                                            }
                                        })) {
                                        entity.removeTag(tag);
                                    }
                                });
                            }
                            finally {
                                entity.setDynamicProperty("tagZoneActiveFromCustomAreaCategory:" + category.id);
                            }
                        }
                    });
                }
            }
        });
    }
}
/**
 * Goes through all players and removes any tags that were added by a category that is now disabled or deleted.
 * @param players The players to remove tags from.
 */
function clearZoneTagsFromInactiveAreas(players) {
    players.map((player) => player.getDynamicPropertyIds().forEach((id) => {
        if (id.startsWith("noPVPZoneActiveFromCustomAreaCategory:")) {
            const category = ProtectedAreas.areas.advancedAreaCategories.find((category) => category.id === id.split(":")[1]);
            if (category === undefined) {
                player.setDynamicProperty(id);
                player.removeTag("is_in_no_pvp_zone");
                return;
            }
            if (category.noPVPZone !== false && category.noPVPZone !== undefined && category.noPVPZone.enabled !== false)
                return;
            player.setDynamicProperty(id);
            player.removeTag("is_in_no_pvp_zone");
        }
        else if (id.startsWith("tagZoneActiveFromCustomAreaCategory:")) {
            const category = ProtectedAreas.areas.advancedAreaCategories.find((category) => category.id === id.split(":")[1]);
            if (category === undefined) {
                player.setDynamicProperty(id);
                player.removeTag("is_in_no_pvp_zone");
                return;
            }
            if (category.tagZone !== false && category.tagZone !== undefined && category.tagZone.enabled === false) {
                category.tagZone.tags.forEach((tag) => player.removeTag(tag));
            }
            else if (category.tagZone !== false && category.tagZone !== undefined && category.tagZone.enabled !== false)
                return;
            player.setDynamicProperty(id);
        }
    }));
}
/**
 * @todo
 * @param players
 */
function testForRequiredZoneTagRemovals(players) {
    players.map((player) => {
        let removeNoPVPZoneTag = false;
        let tagZoneTagsToRemove = [];
        let keepTagZoneTags = [];
        player.getDynamicPropertyIds().forEach((id) => {
            if (id.startsWith("noPVPZoneActiveFromCustomAreaCategory:")) {
                const category = ProtectedAreas.areas.advancedAreaCategories.find((category) => category.id === id.split(":")[1]);
                if (category === undefined) {
                    player.setDynamicProperty(id);
                    player.removeTag("is_in_no_pvp_zone");
                    return;
                }
                if (category.noPVPZone !== false && category.noPVPZone !== undefined && category.noPVPZone.enabled !== false) {
                    // if()
                    return;
                }
                else {
                    player.setDynamicProperty(id);
                    player.removeTag("is_in_no_pvp_zone");
                    return;
                }
            }
            else if (id.startsWith("tagZoneActiveFromCustomAreaCategory:")) {
                const category = ProtectedAreas.areas.advancedAreaCategories.find((category) => category.id === id.split(":")[1]);
                if (category === undefined) {
                    player.setDynamicProperty(id);
                    player.removeTag("is_in_no_pvp_zone");
                    return;
                }
                if (category.tagZone !== false && category.tagZone !== undefined && category.tagZone.enabled !== false) {
                    return;
                }
                else {
                    player.setDynamicProperty(id);
                    player.removeTag("is_in_no_pvp_zone");
                    return;
                }
            }
        });
    });
}
/**
 * Starts the zone actions interval.
 *
 * This is for the following features of the custom protected area categories:
 * - No PVP Zone
 * - Tag Zone
 * - Effect Zone
 *
 * @returns {Promise<void>} A promise that resolves when the zone actions interval is stopped.
 */
export async function startZoneActionsInterval() {
    return await zoneActionsInterval();
}
/**
 * Stops the zone actions interval from running.
 * @returns {Promise<boolean>} Resolves to true if the interval was running and was stopped, and false if the interval was not running.
 */
export async function stopZoneActionsInterval() {
    if (zoneActionsIntervalActive) {
        zoneActionsIntervalStopRequested = true;
        while (zoneActionsIntervalActive) {
            await waitTick();
        }
        return true;
    }
    else {
        return false;
    }
}
//# sourceMappingURL=protectedAreaIntervals.js.map