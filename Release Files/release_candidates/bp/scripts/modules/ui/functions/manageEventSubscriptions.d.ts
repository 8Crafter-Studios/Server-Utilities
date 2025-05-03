import type { loosePlayerType } from "modules/utilities/types/loosePlayerType";
import type { SubscribedEventTypeID } from "init/classes/events";
/**
 *
 *
 * @param {loosePlayerType} sourceEntity - The player accessing the menu.
 * @param {number} [pagen] - The page of the menu to go to. Defaults to 0.
 * @param {number} [maxentriesperpage] - How many entries to show per page. Defaults to the value of {@linkcode config.ui.pages.maxPlayersPerManagePlayersPage}.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export declare function manageEventSubscriptions_event<EventTypeID extends SubscribedEventTypeID>(sourceEntity: loosePlayerType, eventType: EventTypeID, pagen?: number, maxentriesperpage?: number, search?: {
    value: string;
    caseSensitive?: boolean;
}, cachedEntries?: SubscribedEvent<EventTypeID>[]): Promise<0 | 1>;
/**
 * A menu to create a new event subscription.
 *
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 * @throws {TypeError} If the event type is unsupported.
 */
export declare function manageEventSubscriptions_event_newSubscription<EventTypeID extends SubscribedEventTypeID>(sourceEntity: loosePlayerType, eventType: EventTypeID): Promise<0 | 1>;
/**
 * Manages an event subscription.
 *
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export declare function manageEventSubscriptions_event_subscription<EventTypeID extends SubscribedEventTypeID>(sourceEntity: loosePlayerType, subscription: SubscribedEvent<EventTypeID>): Promise<0 | 1>;
/**
 * Manages an event subscription's settings.
 *
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export declare function manageEventSubscriptions_event_subscription_settings<EventTypeID extends SubscribedEventTypeID>(sourceEntity: loosePlayerType, subscription: SubscribedEvent<EventTypeID>): Promise<1>;
/**
 * Manages an event subscription's code.
 *
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export declare function manageEventSubscriptions_event_subscription_editCode<EventTypeID extends SubscribedEventTypeID>(sourceEntity: loosePlayerType, subscription: SubscribedEvent<EventTypeID>): Promise<1>;
/**
 * Manages event subscriptions.
 *
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export declare function manageEventSubscriptions(sourceEntity: loosePlayerType): Promise<0 | 1>;
/**
 * Prompts whether to manage event subscriptions for the before or after events of an event category.
 *
 * @template {keyof typeof Events.loadedEvents} Category The category of events to manage.
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export declare function manageEventSubscriptions_category_selectBeforeOrAfterEvents<Category extends keyof typeof Events.loadedEvents>(sourceEntity: loosePlayerType, category: Category): Promise<0 | 1>;
/**
 * Manages event subscriptions for an event category.
 *
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export declare function manageEventSubscriptions_category<Category extends keyof typeof Events.loadedEvents, BeforeOrAfter extends "beforeEvents" | "afterEvents" = "beforeEvents">(sourceEntity: loosePlayerType, category: Category, beforeOrAfter: BeforeOrAfter): Promise<0 | 1>;
