/**
 * An error for when the storage of something is full.
 * An example use case for this is for the a player
 * is selling an item at another player's player shop,
 * but the owner of the shop is out of storage inside of their
 * recieved player shop items storage entity's inventory.
 * @since 1.23.0-preview.20+BUILD.1
 * @since 10/03/2024 1:48 PM
 */
export declare class StorageFullError extends Error {
    constructor(message?: string);
}
