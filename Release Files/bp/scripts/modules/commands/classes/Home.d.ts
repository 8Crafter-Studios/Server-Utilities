import { type DimensionLocation, Player, type Vector3 } from "@minecraft/server";
/**
 * Represents a home for the home system.
 */
export declare class Home {
    /**
     * The location and dimension of the home.
     *
     * @type {DimensionLocation}
     */
    location: DimensionLocation;
    /**
     * The name of the home.
     *
     * @type {string}
     */
    name: string;
    /**
     * The ID of the owner of the home.
     *
     * @type {string}
     */
    ownerId: string;
    /**
     * The name of the owner of the home.
     *
     * @type {string | undefined}
     */
    ownerName?: string;
    /**
     * The save ID of the home.
     *
     * @type {string}
     */
    saveId: string;
    /**
     * The version of the add-on that this home was saved with.
     *
     * @see {@link format_version}
     *
     * @type {string}
     *
     * @default format_version
     */
    format_version: string;
    /**
     * The format version the home system was on when this home was saved.
     *
     * @see {@link home_format_version}
     *
     * @type {string}
     *
     * @default home_format_version
     */
    home_format_version: string;
    /**
     * Creates an instance of the `Home` class.
     *
     * @param {object} home The home to create.
     * @param {DimensionLocation} home.location The location and dimension of the home.
     * @param {string} home.name The name of the home.
     * @param {Player} [home.owner] The owner of the home.
     * @param {string} [home.ownerId] The ID of the owner of the home.
     * @param {string} [home.ownerName] The name of the owner of the home.
     * @param {string} home.saveId The save ID of the home.
     * @param {string} [home.format_version] The version of the add-on that this home was saved with.
     * @param {string} [home.home_format_version] The format version the home system was on when this home was saved.
     * @returns The created home.
     */
    constructor(home: {
        location: DimensionLocation;
        name: string;
        owner?: Player;
        ownerId?: string;
        ownerName?: string;
        saveId: string;
        format_version?: string;
        home_format_version?: string;
    });
    /**
     * Returns the owner of the home if they are online, otherwise returns undefined.
     *
     * @returns {Player | undefined} The owner of the home if they are online, otherwise returns undefined.
     */
    get owner(): Player | undefined;
    /**
     * Checks if the owner of the home is online.
     *
     * @returns {boolean} True if the owner of the home is online, false otherwise.
     */
    get isOwnerOnline(): boolean;
    /**
     * Checks if the home is saved.
     *
     * @returns {boolean} True if the home is saved, false otherwise.
     */
    get isSaved(): boolean;
    /**
     * Converts the home to a JSON object.
     *
     * @returns {{ location: Vector3 & { dimension: string; }; name: string; ownerId: string; ownerName: string; format_version: string; home_format_version: string; }} The JSON object representing this home.
     */
    toJSON(): {
        location: Vector3 & {
            dimension: string;
        };
        name: string;
        ownerId: string;
        ownerName: string;
        format_version: string;
        home_format_version: string;
    };
    /**
     * Saves the home.
     *
     * @param {Partial<ReturnType<Home["toJSON"]>>} [otherDataToChange = {}] Additional data to add to the home.
     * @param {boolean} [keepOldFormatVersion = false] If set to true, the format version won't be set to the current version.
     */
    save(otherDataToChange?: Partial<ReturnType<Home["toJSON"]>>, keepOldFormatVersion?: boolean): void;
    /**
     * Removes the home.
     */
    remove(): void;
    /**
     * Gets the home with the given save ID.
     *
     * @param {string} homeId The save ID of the home.
     * @returns {Home} The home with the given save ID.
     */
    static get(homeId: string): Home | undefined;
    /**
     * Deletes the home with the given save ID.
     *
     * This function just deletes the world dynamic property with the given ID.
     *
     * @param {string} homeId The save ID of the home to delete.
     */
    static delete(homeId: string): void;
}
