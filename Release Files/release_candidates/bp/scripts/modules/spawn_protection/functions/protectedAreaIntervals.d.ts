/**
 * Automatically refreshes the zones in the `zonesWithExecutableActions` variable if the
 * configured interval has passed since the last refresh.
 */
export declare function autoRefreshZones(): void;
/**
 * Refreshes the list of advanced area categories that have enabled zone actions.
 * If any of the advanced area categories have a tag zone that has the `playersOnly` property set to `false`,
 * the `tagZoneWithEntitiesIncludedIsActive` variable is set to `true`, otherwise it is set to `false`.
 * The `lastZoneRefresh` variable is set to the current time.
 */
export declare function refreshZones(): void;
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
export declare function startZoneActionsInterval(): Promise<void>;
/**
 * Stops the zone actions interval from running.
 * @returns {Promise<boolean>} Resolves to true if the interval was running and was stopped, and false if the interval was not running.
 */
export declare function stopZoneActionsInterval(): Promise<boolean>;
