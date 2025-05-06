import type { loosePlayerType } from "modules/utilities/types/loosePlayerType";
import type { SubscribedEventTypeID } from "init/classes/events";
/**
 * Displays a menu to manage event subscriptions for a specific event.
 *
 * @template {SubscribedEventTypeID} EventTypeID The type ID of the event to manage subscriptions for.
 * @param {loosePlayerType} sourceEntity - The player accessing the menu.
 * @param {EventTypeID} eventType - The event type to manage subscriptions for.
 * @param {number} [pagen=0] - The page of the menu to go to. Defaults to `0`.
 * @param {number} [maxentriesperpage] - How many entries to show per page. Defaults to the value of {@linkcode config.ui.pages.maxPlayersPerManagePlayersPage}.
 * @param {object} [search] - An object containing the current search query, if any, and search options.
 * @param {string} search.value - The current search query.
 * @param {boolean} [search.caseSensitive=false] - Whether to perform a case-sensitive search. Defaults to `false`.
 * @param {SubscribedEvent<EventTypeID>[]} [cachedEntries] - The cached entries to show in the menu.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 * @throws {TypeError} If the event type is unsupported.
 * @throws {TypeError} If the loaded event subscriptions list for the event type is not an array.
 */
export declare function manageEventSubscriptions_event<EventTypeID extends SubscribedEventTypeID>(sourceEntity: loosePlayerType, eventType: EventTypeID, pagen?: number, maxentriesperpage?: number, search?: {
    value: string;
    caseSensitive?: boolean;
}, cachedEntries?: SubscribedEvent<EventTypeID>[]): Promise<0 | 1>;
/**
 * Displays a menu to create a new event subscription.
 *
 * @template {SubscribedEventTypeID} EventTypeID The type ID of the event this event subscription is for.
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @param {EventTypeID} eventType - The type ID of the event this event subscription is for.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 * @throws {TypeError} If the event type is unsupported.
 */
export declare function manageEventSubscriptions_event_newSubscription<EventTypeID extends SubscribedEventTypeID>(sourceEntity: loosePlayerType, eventType: EventTypeID): Promise<0 | 1>;
/**
 * Displays a menu to manage an event subscription.
 *
 * @template {SubscribedEventTypeID} EventTypeID The type ID of the event this event subscription is for.
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @param {SubscribedEvent<EventTypeID>} subscription - The event subscription to manage.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export declare function manageEventSubscriptions_event_subscription<EventTypeID extends SubscribedEventTypeID>(sourceEntity: loosePlayerType, subscription: SubscribedEvent<EventTypeID>): Promise<0 | 1>;
/**
 * Displays a menu to manage an event subscription's settings.
 *
 * @template {SubscribedEventTypeID} EventTypeID The type ID of the event this event subscription is for.
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @param {SubscribedEvent<EventTypeID>} subscription - The event subscription to manage the settings for.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export declare function manageEventSubscriptions_event_subscription_settings<EventTypeID extends SubscribedEventTypeID>(sourceEntity: loosePlayerType, subscription: SubscribedEvent<EventTypeID>): Promise<1>;
/**
 * Displays a menu to manage an event subscription's code.
 *
 * @template {SubscribedEventTypeID} EventTypeID The type ID of the event this event subscription is for.
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @param {SubscribedEvent<EventTypeID>} subscription - The event subscription to manage the code for.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export declare function manageEventSubscriptions_event_subscription_editCode<EventTypeID extends SubscribedEventTypeID>(sourceEntity: loosePlayerType, subscription: SubscribedEvent<EventTypeID>): Promise<0 | 1>;
/**
 * Displays a menu to manage event subscriptions.
 *
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export declare function manageEventSubscriptions(sourceEntity: loosePlayerType): Promise<0 | 1>;
export declare function manageEventSubscriptions_statistics(sourceEntity: loosePlayerType): Promise<0 | 1>;
/**
 * Prompts whether to manage event subscriptions for the before or after events of an event category.
 *
 * It then runs the {@link manageEventSubscriptions_category} function.
 *
 * @template {keyof typeof Events.loadedEvents} Category The category of events to manage.
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @param {Category} category - The category of events to manage.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export declare function manageEventSubscriptions_category_selectBeforeOrAfterEvents<Category extends keyof typeof Events.loadedEvents>(sourceEntity: loosePlayerType, category: Category): Promise<0 | 1>;
/**
 * Displays a menu to manage event subscriptions for an event category.
 *
 * @template {keyof typeof Events.loadedEvents} Category The category of events to manage.
 * @template {("beforeEvents" | "afterEvents")} BeforeOrAfter Whether to manage the before or after events of the event category.
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @param {Category} category - The category of events to manage.
 * @param {BeforeOrAfter} beforeOrAfter - Whether to manage the before or after events of the event category.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export declare function manageEventSubscriptions_category<Category extends keyof typeof Events.loadedEvents, BeforeOrAfter extends "beforeEvents" | "afterEvents" = "beforeEvents">(sourceEntity: loosePlayerType, category: Category, beforeOrAfter: BeforeOrAfter): Promise<0 | 1>;
