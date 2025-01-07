/**
 * This is only editable by functions in this file.
 * @type {number|null}
 */
export declare let protectedAreasRefresherIntervalID: number | null;
export declare function startProtectedAreasRefresher(): Promise<void>;
export declare function stopProtectedAreasRefresher(): Promise<0 | 1>;
