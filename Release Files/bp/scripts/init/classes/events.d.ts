import { ChatSendAfterEvent, ChatSendBeforeEvent, Player, SystemAfterEvents, SystemBeforeEvents, WorldAfterEvents, WorldBeforeEvents, type System, type World } from "@minecraft/server";
import type { ReplaceTypeOfKey } from "modules/utilities/functions/filterProperties";
/**
 * An interface mapping the event types to their event signals.
 */
export interface SubscribableEvents {
    system: {
        beforeEvents: {
            [key in keyof System["beforeEvents"]]: System["beforeEvents"][key];
        };
        afterEvents: {
            [key in keyof System["afterEvents"]]: System["afterEvents"][key];
        };
    };
    world: {
        beforeEvents: {
            [key in keyof World["beforeEvents"]]: World["beforeEvents"][key];
        };
        afterEvents: {
            [key in keyof World["afterEvents"]]: World["afterEvents"][key];
        };
    };
    andexdb: {
        beforeEvents: {
            [key in keyof andexdbBeforeEvents]: SubscribedEvent<`andexdb.beforeEvents.${key}`>;
        };
        afterEvents: {
            [key in keyof andexdbAfterEvents]: SubscribedEvent<`andexdb.afterEvents.${key}`>;
        };
    };
}
/**
 * An interface mapping the event types to their event subscription data types.
 */
export interface EventsSavedData {
    system: {
        beforeEvents: {
            [key in keyof System["beforeEvents"]]: ReturnType<SubscribedEvent<`system.beforeEvents.${key}`>["toJSON"]>[];
        };
        afterEvents: {
            [key in keyof System["afterEvents"]]: ReturnType<SubscribedEvent<`system.afterEvents.${key}`>["toJSON"]>[];
        };
    };
    world: {
        beforeEvents: {
            [key in keyof World["beforeEvents"]]: ReturnType<SubscribedEvent<`world.beforeEvents.${key}`>["toJSON"]>[];
        };
        afterEvents: {
            [key in keyof World["afterEvents"]]: ReturnType<SubscribedEvent<`world.afterEvents.${key}`>["toJSON"]>[];
        };
    };
    andexdb: {
        beforeEvents: {
            [key in keyof andexdbBeforeEvents]: ReturnType<SubscribedEvent<`andexdb.beforeEvents.${key}`>["toJSON"]>[];
        };
        afterEvents: {
            [key in keyof andexdbAfterEvents]: ReturnType<SubscribedEvent<`andexdb.afterEvents.${key}`>["toJSON"]>[];
        };
    };
}
/**
 * A type mapping the event types to their event parameter types.
 *
 * @template {SubscribedEventSignalUnion} Event The event signal type.
 */
export type SubscribableEventParameterTypeMap<Event extends SubscribedEventSignalUnion> = Parameters<Event["subscribe"]>[0];
/**
 * The data for an event subscription.
 *
 * @template {SubscribedEventTypeID} EventTypeID The type ID of the event this event subscription data is for.
 */
export interface SubscribedEventSavedData<EventTypeID extends SubscribedEventTypeID> {
    /**
     * The JavaScript code of the event subscription's callback function.
     *
     * @type {string}
     */
    code: string;
    /**
     * The unique ID of the event subscription.
     *
     * Should be in the following format:
     *
     * ```typescript
     * const creationTime: number = Date.now(); // The time the event subscription was created.
     * const number1: number = Math.round(Math.random() * 100000); // Random integer between 0 and 100,000.
     * const number2: number = Math.round(Math.random() * 100000); // Random integer between 0 and 100,000.
     * const saveID: string = `EventSubscription:${creationTime}_${number1}_${number2}`
     * ```
     *
     * @type {string}
     *
     * @default
     * ```typescript
     * `EventSubscription:${Date.now()}_${Math.round(Math.random() * 100000)}_${Math.round(Math.random() * 100000)}`
     * ```
     */
    readonly saveID: string;
    /**
     * The type ID of the event this subscription is for.
     *
     * @type {EventTypeID}
     */
    readonly eventType: EventTypeID;
    /**
     * Whether or not the event subscription is enabled.
     *
     * @type {boolean}
     *
     * @default true
     */
    enabled?: boolean;
    /**
     * Optional metadata for the event subscription.
     */
    metadata?: {
        /**
         * The display name of the event subscription.
         *
         * @type {string}
         */
        displayName?: string;
        /**
         * The display icon of the event subscription.
         *
         * Should be a texture path.
         *
         * @type {string}
         */
        displayIcon?: string;
        /**
         * The last time the event subscription was modified.
         *
         * @type {number}
         */
        lastModified?: number;
        /**
         * Additional metadata for the event subscription.
         */
        [key: string]: string | number | boolean | undefined;
    };
}
/**
 * The type ID of an event subscription.
 *
 * This type is a union of all event type IDs.
 */
export type SubscribedEventTypeID = `system.beforeEvents.${keyof System["beforeEvents"]}` | `system.afterEvents.${keyof System["afterEvents"]}` | `world.beforeEvents.${keyof World["beforeEvents"]}` | `world.afterEvents.${keyof World["afterEvents"]}` | `andexdb.beforeEvents.${keyof andexdbBeforeEvents}` | `andexdb.afterEvents.${keyof andexdbAfterEvents}`;
/**
 * The event signal type of an event subscription.
 *
 * This type is a union of all event signal types.
 */
export type SubscribedEventSignalUnion = System["beforeEvents"][keyof System["beforeEvents"]] | System["afterEvents"][keyof System["afterEvents"]] | World["beforeEvents"][keyof World["beforeEvents"]] | World["afterEvents"][keyof World["afterEvents"]] | andexdbBeforeEvents[keyof andexdbBeforeEvents] | andexdbAfterEvents[keyof andexdbAfterEvents];
/**
 * A union of all event subscription keys on the world, server, and andexdb before and after event namespaces.
 */
export type SubscribedEventKeyUnion = keyof System["beforeEvents"] | keyof System["afterEvents"] | keyof World["beforeEvents"] | keyof World["afterEvents"] | keyof andexdbBeforeEvents | keyof andexdbAfterEvents;
/**
 * The system events.
 *
 * @hideconstructor
 */
export declare class Events_System {
    private constructor();
    /**
     * A set of events that fire before an actual action occurs. In
     * most cases, you can potentially cancel or modify the
     * impending event. Note that in before events any APIs that
     * modify gameplay state will not function and will throw an
     * error.
     *
     * @type {Events_SystemBeforeEvents}
     */
    static get beforeEvents(): Events_SystemBeforeEvents;
    /**
     * Provides a set of events that fire within the broader
     * scripting system within Minecraft.
     *
     * @type {Events_SystemAfterEvents}
     */
    static get afterEvents(): Events_SystemAfterEvents;
}
/**
 * A set of events that fire before an actual action occurs. In
 * most cases, you can potentially cancel or modify the
 * impending event. Note that in before events any APIs that
 * modify gameplay state will not function and will throw an
 * error.
 *
 * @implements {ReplaceTypeOfKey<SystemBeforeEvents, keyof SystemBeforeEvents, any>}
 */
export declare class Events_SystemBeforeEvents implements ReplaceTypeOfKey<SystemBeforeEvents, keyof SystemBeforeEvents, any> {
    constructor();
    get shutdown(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"system.beforeEvents.shutdown">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `system.beforeEvents.shutdown` event.
         */
        unsubscribe(subscription: SubscribedEvent<"system.beforeEvents.shutdown">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"system.beforeEvents.shutdown">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"system.beforeEvents.shutdown">[];
    };
    get startup(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"system.beforeEvents.startup">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `system.beforeEvents.startup` event.
         */
        unsubscribe(subscription: SubscribedEvent<"system.beforeEvents.startup">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"system.beforeEvents.startup">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"system.beforeEvents.startup">[];
    };
    get watchdogTerminate(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"system.beforeEvents.watchdogTerminate">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `system.beforeEvents.watchdogTerminate` event.
         */
        unsubscribe(subscription: SubscribedEvent<"system.beforeEvents.watchdogTerminate">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"system.beforeEvents.watchdogTerminate">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"system.beforeEvents.watchdogTerminate">[];
    };
}
/**
 * Provides a set of events that fire within the broader
 * scripting system within Minecraft.
 *
 * @implements {ReplaceTypeOfKey<SystemAfterEvents, keyof SystemAfterEvents, any>}
 */
export declare class Events_SystemAfterEvents implements ReplaceTypeOfKey<SystemAfterEvents, keyof SystemAfterEvents, any> {
    constructor();
    get scriptEventReceive(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"system.afterEvents.scriptEventReceive">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `system.afterEvents.scriptEventReceive` event.
         */
        unsubscribe(subscription: SubscribedEvent<"system.afterEvents.scriptEventReceive">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"system.afterEvents.scriptEventReceive">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"system.afterEvents.scriptEventReceive">[];
    };
}
/**
 * The world events.
 *
 * @hideconstructor
 */
export declare abstract class Events_World {
    private constructor();
    /**
     * A set of events that fire before an actual action occurs. In
     * most cases, you can potentially cancel or modify the
     * impending event. Note that in before events any APIs that
     * modify gameplay state will not function and will throw an
     * error. (e.g., dimension.spawnEntity)
     */
    static get beforeEvents(): Events_WorldBeforeEvents;
    /**
     * Contains a set of events that are available across the scope
     * of the World.
     */
    static get afterEvents(): Events_WorldAfterEvents;
}
/**
 * A set of events that fire before an actual action occurs. In
 * most cases, you can potentially cancel or modify the
 * impending event. Note that in before events any APIs that
 * modify gameplay state will not function and will throw an
 * error. (e.g., dimension.spawnEntity)
 *
 * @implements {ReplaceTypeOfKey<WorldBeforeEvents, keyof WorldBeforeEvents, any>}
 */
export declare class Events_WorldBeforeEvents implements ReplaceTypeOfKey<WorldBeforeEvents, keyof WorldBeforeEvents, any> {
    constructor();
    /**
     * @beta
     * @remarks
     * This event is triggered after a chat message has been
     * broadcast or sent to players.
     *
     * This property can be read in early-execution mode.
     *
     * @example customCommand.ts
     * ```typescript
     * import { world, DimensionLocation } from "@minecraft/server";
     *
     * function customCommand(targetLocation: DimensionLocation) {
     *   const chatCallback = Events.world.beforeEvents.chatSend.subscribe(`(eventData) => {
     *     if (eventData.message.includes("cancel")) {
     *       // Cancel event if the message contains "cancel"
     *       eventData.cancel = true;
     *     } else {
     *       const args = eventData.message.split(" ");
     *
     *       if (args.length > 0) {
     *         switch (args[0].toLowerCase()) {
     *           case "echo":
     *             // Send a modified version of chat message
     *             world.sendMessage(`Echo '${eventData.message.substring(4).trim()}'`);
     *             break;
     *           case "help":
     *             world.sendMessage(`Available commands: echo <message>`);
     *             break;
     *         }
     *       }
     *     }
     *   }`);
     * }
     * ```
     */
    get chatSend(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.beforeEvents.chatSend">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.beforeEvents.chatSend` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.beforeEvents.chatSend">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.beforeEvents.chatSend">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.beforeEvents.chatSend">[];
    };
    get effectAdd(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.beforeEvents.effectAdd">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.beforeEvents.effectAdd` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.beforeEvents.effectAdd">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.beforeEvents.effectAdd">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.beforeEvents.effectAdd">[];
    };
    get entityRemove(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.beforeEvents.entityRemove">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.beforeEvents.entityRemove` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.beforeEvents.entityRemove">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.beforeEvents.entityRemove">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.beforeEvents.entityRemove">[];
    };
    get explosion(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.beforeEvents.explosion">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.beforeEvents.explosion` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.beforeEvents.explosion">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.beforeEvents.explosion">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.beforeEvents.explosion">[];
    };
    get itemUse(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.beforeEvents.itemUse">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.beforeEvents.itemUse` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.beforeEvents.itemUse">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.beforeEvents.itemUse">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.beforeEvents.itemUse">[];
    };
    get playerBreakBlock(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.beforeEvents.playerBreakBlock">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.beforeEvents.playerBreakBlock` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.beforeEvents.playerBreakBlock">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.beforeEvents.playerBreakBlock">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.beforeEvents.playerBreakBlock">[];
    };
    get playerGameModeChange(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.beforeEvents.playerGameModeChange">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.beforeEvents.playerGameModeChange` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.beforeEvents.playerGameModeChange">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.beforeEvents.playerGameModeChange">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.beforeEvents.playerGameModeChange">[];
    };
    get playerInteractWithBlock(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.beforeEvents.playerInteractWithBlock">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.beforeEvents.playerInteractWithBlock` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.beforeEvents.playerInteractWithBlock">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.beforeEvents.playerInteractWithBlock">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.beforeEvents.playerInteractWithBlock">[];
    };
    get playerInteractWithEntity(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.beforeEvents.playerInteractWithEntity">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.beforeEvents.playerInteractWithEntity` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.beforeEvents.playerInteractWithEntity">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.beforeEvents.playerInteractWithEntity">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.beforeEvents.playerInteractWithEntity">[];
    };
    get playerLeave(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.beforeEvents.playerLeave">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.beforeEvents.playerLeave` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.beforeEvents.playerLeave">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.beforeEvents.playerLeave">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.beforeEvents.playerLeave">[];
    };
    get playerPlaceBlock(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.beforeEvents.playerPlaceBlock">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.beforeEvents.playerPlaceBlock` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.beforeEvents.playerPlaceBlock">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.beforeEvents.playerPlaceBlock">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.beforeEvents.playerPlaceBlock">[];
    };
    get weatherChange(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.beforeEvents.weatherChange">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.beforeEvents.weatherChange` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.beforeEvents.weatherChange">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.beforeEvents.weatherChange">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.beforeEvents.weatherChange">[];
    };
}
/**
 * Contains a set of events that are available across the scope
 * of the World.
 *
 * @implements {ReplaceTypeOfKey<WorldAfterEvents, keyof WorldAfterEvents, any>}
 */
export declare class Events_WorldAfterEvents implements ReplaceTypeOfKey<WorldAfterEvents, keyof WorldAfterEvents, any> {
    get blockExplode(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.blockExplode">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.blockExplode` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.blockExplode">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.blockExplode">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.blockExplode">[];
    };
    get buttonPush(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.buttonPush">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.buttonPush` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.buttonPush">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.buttonPush">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.buttonPush">[];
    };
    get chatSend(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.chatSend">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.chatSend` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.chatSend">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.chatSend">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.chatSend">[];
    };
    get dataDrivenEntityTrigger(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.dataDrivenEntityTrigger">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.dataDrivenEntityTrigger` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.dataDrivenEntityTrigger">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.dataDrivenEntityTrigger">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.dataDrivenEntityTrigger">[];
    };
    get effectAdd(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.effectAdd">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.effectAdd` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.effectAdd">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.effectAdd">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.effectAdd">[];
    };
    get entityDie(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.entityDie">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.entityDie` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.entityDie">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.entityDie">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.entityDie">[];
    };
    get entityHealthChanged(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.entityHealthChanged">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.entityHealthChanged` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.entityHealthChanged">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.entityHealthChanged">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.entityHealthChanged">[];
    };
    get entityHitBlock(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.entityHitBlock">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.entityHitBlock` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.entityHitBlock">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.entityHitBlock">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.entityHitBlock">[];
    };
    get entityHitEntity(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.entityHitEntity">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.entityHitEntity` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.entityHitEntity">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.entityHitEntity">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.entityHitEntity">[];
    };
    get entityHurt(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.entityHurt">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.entityHurt` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.entityHurt">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.entityHurt">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.entityHurt">[];
    };
    get entityLoad(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.entityLoad">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.entityLoad` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.entityLoad">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.entityLoad">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.entityLoad">[];
    };
    get entityRemove(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.entityRemove">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.entityRemove` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.entityRemove">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.entityRemove">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.entityRemove">[];
    };
    get entitySpawn(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.entitySpawn">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.entitySpawn` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.entitySpawn">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.entitySpawn">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.entitySpawn">[];
    };
    get explosion(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.explosion">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.explosion` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.explosion">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.explosion">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.explosion">[];
    };
    get gameRuleChange(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.gameRuleChange">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.gameRuleChange` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.gameRuleChange">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.gameRuleChange">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.gameRuleChange">[];
    };
    get itemCompleteUse(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.itemCompleteUse">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.itemCompleteUse` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.itemCompleteUse">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.itemCompleteUse">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.itemCompleteUse">[];
    };
    get itemReleaseUse(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.itemReleaseUse">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.itemReleaseUse` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.itemReleaseUse">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.itemReleaseUse">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.itemReleaseUse">[];
    };
    get itemStartUse(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.itemStartUse">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.itemStartUse` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.itemStartUse">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.itemStartUse">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.itemStartUse">[];
    };
    get itemStartUseOn(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.itemStartUseOn">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.itemStartUseOn` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.itemStartUseOn">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.itemStartUseOn">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.itemStartUseOn">[];
    };
    get itemStopUse(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.itemStopUse">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.itemStopUse` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.itemStopUse">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.itemStopUse">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.itemStopUse">[];
    };
    get itemStopUseOn(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.itemStopUseOn">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.itemStopUseOn` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.itemStopUseOn">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.itemStopUseOn">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.itemStopUseOn">[];
    };
    get itemUse(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.itemUse">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.itemUse` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.itemUse">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.itemUse">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.itemUse">[];
    };
    get leverAction(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.leverAction">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.leverAction` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.leverAction">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.leverAction">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.leverAction">[];
    };
    get messageReceive(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.messageReceive">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.messageReceive` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.messageReceive">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.messageReceive">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.messageReceive">[];
    };
    get packSettingChange(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.packSettingChange">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.packSettingChange` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.packSettingChange">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.packSettingChange">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.packSettingChange">[];
    };
    get playerSwingStart(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.playerSwingStart">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.playerSwingStart` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.playerSwingStart">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.playerSwingStart">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.playerSwingStart">[];
    };
    get pistonActivate(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.pistonActivate">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.pistonActivate` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.pistonActivate">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.pistonActivate">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.pistonActivate">[];
    };
    get playerBreakBlock(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.playerBreakBlock">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.playerBreakBlock` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.playerBreakBlock">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.playerBreakBlock">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.playerBreakBlock">[];
    };
    get playerButtonInput(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.playerButtonInput">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.playerButtonInput` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.playerButtonInput">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.playerButtonInput">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.playerButtonInput">[];
    };
    get playerDimensionChange(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.playerDimensionChange">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.playerDimensionChange` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.playerDimensionChange">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.playerDimensionChange">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.playerDimensionChange">[];
    };
    get playerEmote(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.playerEmote">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.playerEmote` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.playerEmote">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.playerEmote">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.playerEmote">[];
    };
    get playerGameModeChange(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.playerGameModeChange">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.playerGameModeChange` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.playerGameModeChange">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.playerGameModeChange">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.playerGameModeChange">[];
    };
    get playerHotbarSelectedSlotChange(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.playerHotbarSelectedSlotChange">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.playerHotbarSelectedSlotChange` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.playerHotbarSelectedSlotChange">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.playerHotbarSelectedSlotChange">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.playerHotbarSelectedSlotChange">[];
    };
    get playerInputModeChange(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.playerInputModeChange">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.playerInputModeChange` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.playerInputModeChange">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.playerInputModeChange">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.playerInputModeChange">[];
    };
    get playerInputPermissionCategoryChange(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.playerInputPermissionCategoryChange">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.playerInputPermissionCategoryChange` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.playerInputPermissionCategoryChange">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.playerInputPermissionCategoryChange">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.playerInputPermissionCategoryChange">[];
    };
    get playerInteractWithBlock(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.playerInteractWithBlock">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.playerInteractWithBlock` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.playerInteractWithBlock">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.playerInteractWithBlock">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.playerInteractWithBlock">[];
    };
    get playerInteractWithEntity(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.playerInteractWithEntity">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.playerInteractWithEntity` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.playerInteractWithEntity">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.playerInteractWithEntity">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.playerInteractWithEntity">[];
    };
    get playerInventoryItemChange(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.playerInventoryItemChange">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.playerInventoryItemChange` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.playerInventoryItemChange">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.playerInventoryItemChange">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.playerInventoryItemChange">[];
    };
    get playerJoin(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.playerJoin">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.playerJoin` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.playerJoin">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.playerJoin">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.playerJoin">[];
    };
    get playerLeave(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.playerLeave">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.playerLeave` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.playerLeave">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.playerLeave">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.playerLeave">[];
    };
    get playerPlaceBlock(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.playerPlaceBlock">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.playerPlaceBlock` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.playerPlaceBlock">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.playerPlaceBlock">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.playerPlaceBlock">[];
    };
    get playerSpawn(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.playerSpawn">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.playerSpawn` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.playerSpawn">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.playerSpawn">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.playerSpawn">[];
    };
    get pressurePlatePop(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.pressurePlatePop">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.pressurePlatePop` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.pressurePlatePop">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.pressurePlatePop">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.pressurePlatePop">[];
    };
    get pressurePlatePush(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.pressurePlatePush">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.pressurePlatePush` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.pressurePlatePush">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.pressurePlatePush">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.pressurePlatePush">[];
    };
    get projectileHitBlock(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.projectileHitBlock">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.projectileHitBlock` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.projectileHitBlock">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.projectileHitBlock">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.projectileHitBlock">[];
    };
    get projectileHitEntity(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.projectileHitEntity">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.projectileHitEntity` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.projectileHitEntity">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.projectileHitEntity">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.projectileHitEntity">[];
    };
    get targetBlockHit(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.targetBlockHit">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.targetBlockHit` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.targetBlockHit">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.targetBlockHit">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.targetBlockHit">[];
    };
    get tripWireTrip(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.tripWireTrip">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.tripWireTrip` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.tripWireTrip">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.tripWireTrip">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.tripWireTrip">[];
    };
    get weatherChange(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.beforeEvents.weatherChange">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.beforeEvents.weatherChange` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.beforeEvents.weatherChange">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.beforeEvents.weatherChange">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.beforeEvents.weatherChange">[];
    };
    get worldLoad(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"world.afterEvents.worldLoad">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `world.afterEvents.worldLoad` event.
         */
        unsubscribe(subscription: SubscribedEvent<"world.afterEvents.worldLoad">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"world.afterEvents.worldLoad">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"world.afterEvents.worldLoad">[];
    };
}
/**
 * The custom events from 8Crafter's Server Utilities & Debug Sticks
 * add-on.
 *
 * @hideconstructor
 */
export declare abstract class Events_andexdb {
    private constructor();
    /**
     * A set of events that fire before an actual action occurs. In
     * most cases, you can potentially cancel or modify the
     * impending event. Note that in before events any APIs that
     * modify gameplay state will not function and will throw an
     * error. (e.g., dimension.spawnEntity)
     */
    static get beforeEvents(): Events_andexdbBeforeEvents;
    /**
     * Provides a set of events that fire within the broader
     * scripting system within 8Crafter's Server Utilities & Debug
     * Sticks add-on.
     */
    static get afterEvents(): Events_andexdbAfterEvents;
}
/**
 * A set of events that fire before an actual action occurs. In
 * most cases, you can potentially cancel or modify the
 * impending event. Note that in before events any APIs that
 * modify gameplay state will not function and will throw an
 * error. (e.g., dimension.spawnEntity)
 */
export declare class Events_andexdbBeforeEvents implements ReplaceTypeOfKey<andexdbBeforeEvents, keyof andexdbBeforeEvents, any> {
    constructor();
    get modifiedChatMessageFormat(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"andexdb.beforeEvents.modifiedChatMessageFormat">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `andexdb.beforeEvents.modifiedChatMessageFormat` event.
         */
        unsubscribe(subscription: SubscribedEvent<"andexdb.beforeEvents.modifiedChatMessageFormat">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"andexdb.beforeEvents.modifiedChatMessageFormat">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"andexdb.beforeEvents.modifiedChatMessageFormat">[];
    };
    get modifiedChatMessageFormatFinalization(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"andexdb.beforeEvents.modifiedChatMessageFormatFinalization">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `andexdb.beforeEvents.modifiedChatMessageFormatFinalization` event.
         */
        unsubscribe(subscription: SubscribedEvent<"andexdb.beforeEvents.modifiedChatMessageFormatFinalization">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"andexdb.beforeEvents.modifiedChatMessageFormatFinalization">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"andexdb.beforeEvents.modifiedChatMessageFormatFinalization">[];
    };
    get modifiedChatMessageSend(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"andexdb.beforeEvents.modifiedChatMessageSend">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `andexdb.beforeEvents.modifiedChatMessageSend` event.
         */
        unsubscribe(subscription: SubscribedEvent<"andexdb.beforeEvents.modifiedChatMessageSend">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"andexdb.beforeEvents.modifiedChatMessageSend">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"andexdb.beforeEvents.modifiedChatMessageSend">[];
    };
}
/**
 * Provides a set of events that fire within the broader
 * scripting system within 8Crafter's Server Utilities & Debug
 * Sticks add-on.
 */
export declare class Events_andexdbAfterEvents implements ReplaceTypeOfKey<andexdbAfterEvents, keyof andexdbAfterEvents, any> {
    constructor();
    get modifiedChatMessageSend(): {
        /**
         * Creates a new event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the event callback is an empty string.
         * @throws {TypeError} If the event callback is not a string.
         * @throws {TypeError} If the event callback is not a valid stringified JavaScript function.
         */
        subscribe(callback: string): SubscribedEvent<"andexdb.afterEvents.modifiedChatMessageSend">;
        /**
         * Deletes the provided event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @throws {TypeError} If the subscription is not an instance of SubscribedEvent.
         * @throws {ReferenceError} If the subscription is not for the `andexdb.afterEvents.modifiedChatMessageSend` event.
         */
        unsubscribe(subscription: SubscribedEvent<"andexdb.afterEvents.modifiedChatMessageSend">): void;
        /**
         * Gets all event subscriptions to this event type.
         *
         * @returns {SubscribedEvent<"andexdb.afterEvents.modifiedChatMessageSend">[]} The event subscriptions.
         */
        getAll(): SubscribedEvent<"andexdb.afterEvents.modifiedChatMessageSend">[];
    };
}
/**
 * Manages callbacks that are connected to an event that fires
 * before modified chat messages are formatted.
 *
 * These callbacks are triggered by the chat ranks system of the add-on, if the chat ranks system is disabled these callbacks will never fire.
 *
 * @example preventMessagesContainingHerobrine.ts
 * ```typescript
 * function preventMessagesContainingHerobrine() {
 *   const chatCallback = Events.andexdb.beforeEvents.modifiedChatMessageFormat.subscribe(`(eventData) => {
 *      if (eventData.message.includes("Herobrine")) {
 *         eventData.cancel = true;
 *      }
 *   }`);
 * }
 * ```
 *
 * @example replaceEveryAInMessagesWithB.ts
 * ```typescript
 * function replaceEveryAInMessagesWithB() {
 *   const chatCallback = Events.andexdb.beforeEvents.modifiedChatMessageFormat.subscribe(`(eventData) => {
 *      eventData.message = eventData.message.replaceAll("a", "b");
 *   }`);
 * }
 * ```
 */
export declare class andexdb_ModifiedChatMessageFormatBeforeEventSignal {
    constructor();
    /**
     * The callbacks that will be called before new modified chat
     * messages are formatted.
     *
     * @type {((arg0: andexdb_ModifiedChatMessageFormatBeforeEvent) => void)[]}
     */
    static callbacks: ((arg0: andexdb_ModifiedChatMessageFormatBeforeEvent) => void)[];
    /**
     * @remarks
     * Adds a callback that will be called before new modified chat
     * messages are formatted.
     *
     * This function can be called in read-only mode.
     *
     * This function can be called in early-execution mode.
     *
     */
    subscribe(callback: (arg0: andexdb_ModifiedChatMessageFormatBeforeEvent) => void): (arg0: andexdb_ModifiedChatMessageFormatBeforeEvent) => void;
    /**
     * @remarks
     * Removes a callback from being called before new modified chat
     * messages are formatted.
     *
     * This function can't be called in read-only mode.
     *
     * This function can be called in early-execution mode.
     *
     */
    unsubscribe(callback: (arg0: andexdb_ModifiedChatMessageFormatBeforeEvent) => void): void;
}
/**
 * An event that fires before a modified chat message is formatted.
 *
 * This is fired before the message is formatted, the formatted message is then passed to the {@link andexdb_ModifiedChatMessageFormatFinalizationBeforeEvent} event.
 *
 * This is triggered by the chat ranks system of the add-on, if the chat ranks system is disabled this event will never fire.
 */
export declare class andexdb_ModifiedChatMessageFormatBeforeEvent implements ChatSendBeforeEvent {
    /**
     * Creates a new andexdb_ModifiedChatMessageFormatBeforeEvent instance.
     *
     * @param {andexdb_ModifiedChatMessageFormatBeforeEvent} data The data for the event.
     * @param {boolean} [strict=true] Whether to enable strict mode. In strict mode, the event will throw an error if invalid data is provided. Defaults to true.
     *
     * @throws {TypeError} If the number of arguments passed to this constructor is not `1`.
     * @throws {TypeError} If the {@link data} parameter is `null`.
     * @throws {TypeError} If the {@link data} parameter is not an object.
     * @throws {TypeError} If the {@link cancel} property in {@link data} is not a boolean.
     * @throws {TypeError} If the {@link message} property in {@link data} is not a string.
     * @throws {TypeError} If the {@link sender} property in {@link data} is not an instance of {@link Player}.
     * @throws {TypeError} If the {@link message} property in {@link data} is not a string.
     * @throws {TypeError} If the {@link cancel} property in {@link data} is not a boolean.
     * @throws {TypeError} If the {@link message} property in {@link data} is not a string.
     * @throws {TypeError} If the {@link sender} property in {@link data} is not an instance of {@link Player}.
     * @throws {TypeError} If the {@link message} property in {@link data} is not a string.
     * @throws {TypeError} If the {@link targets} property in {@link data} is not undefined or an array.
     *
     * @implements {ChatSendBeforeEvent}
     */
    constructor(data: andexdb_ModifiedChatMessageFormatBeforeEvent, strict?: boolean);
    /**
     * @remarks
     * If set to true, the message will not be sent.
     *
     * @default false
     */
    cancel: boolean;
    /**
     * @remarks
     * The original chat message.
     */
    readonly originalMessage: string;
    readonly sender: Player;
    readonly targets?: Player[];
    /**
     * @remarks
     * The message that will be formatted.
     */
    message: string;
    /**
     * @remarks
     * The options for the formatting, see {@link TagChatMessageFormat}.
     */
    formatOptions: TagChatMessageFormat & {
        /**
         * @remarks
         * Whether the sender is a placeholder player.
         */
        isPlaceholderPlayer?: boolean;
        /**
         * @remarks
         * The sender.
         */
        player?: Player;
        /**
         * @remarks
         * Whether to allow eval.
         *
         * @default true
         */
        allowEval: boolean;
        /**
         * The type ID of the dimension that the player is in.
         */
        dimension: "minecraft:overworld" | "overworld" | "minecraft:nether" | "nether" | "minecraft:the_end" | "the_end";
        /**
         * The personal settings for the player.
         */
        playerPersonalSettings: {
            /**
             * The default message formatting for the player.
             *
             * This will be used if no other message formatting is found.
             *
             * @type {string}
             *
             * @default undefined
             */
            defaultMessageFormatting?: string;
            /**
             * The default name formatting for the player.
             *
             * This will be used if no other message formatting is found.
             *
             * @type {string}
             *
             * @default undefined
             */
            defaultNameFormatting?: string;
            /**
             * The default separator formatting for the player.
             *
             * This will be used if no other message formatting is found.
             *
             * @type {string}
             *
             * @default undefined
             */
            defaultSeparatorFormatting?: string;
            /**
             * The players default chat rank prefix.
             *
             * If specified it will be used instead of the global chat rank prefix.
             *
             * @see {@link config.chatRanks.chatRankPrefix}
             *
             * @type {string}
             *
             * @default undefined
             */
            chatRankPrefix?: string;
            /**
             * The players default rank display prefix.
             *
             * If specified it will be used instead of the global chat rank display prefix.
             *
             * @see {@link config.chatRanks.rankDisplayPrefix}
             *
             * @type {string}
             *
             * @default undefined
             */
            rankDisplayPrefix?: string;
            /**
             * The players default rank display suffix.
             *
             * If specified it will be used instead of the global chat rank display suffix.
             *
             * @see {@link config.chatRanks.rankDisplaySuffix}
             *
             * @type {string}
             *
             * @default undefined
             */
            rankDisplaySuffix?: string;
            /**
             * The players default rank display separator.
             *
             * If specified it will be used instead of the global chat rank display separator.
             *
             * @see {@link config.chatRanks.rankDisplaySeparator}
             *
             * @type {string}
             *
             * @default undefined
             */
            rankDisplaySeparator?: string;
            /**
             * The players default name display prefix.
             *
             * If specified it will be used instead of the global chat name display prefix.
             *
             * @see {@link config.chatRanks.nameDisplayPrefix}
             *
             * @type {string}
             *
             * @default undefined
             */
            nameDisplayPrefix?: string;
            /**
             * The players default name display suffix.
             *
             * If specified it will be used instead of the global chat name display suffix.
             *
             * @see {@link config.chatRanks.nameDisplaySuffix}
             *
             * @type {string}
             *
             * @default undefined
             */
            nameDisplaySuffix?: string;
            /**
             * The players default name and message separator.
             *
             * If specified it will be used instead of the global chat name and message separator.
             *
             * @see {@link config.chatRanks.chatNameAndMessageSeparator}
             *
             * @type {string}
             *
             * @default undefined
             */
            chatNameAndMessageSeparator?: string;
            /**
             * If set to true, the player's message time stamp will be hidden.
             */
            hideChatDisplayTimeStamp?: boolean;
        };
        /**
         * The ranks that the player has.
         *
         * @type {string[]}
         */
        ranks?: string[];
        /**
         * The tags that the player has.
         *
         * @type {string[]}
         */
        tags?: string[];
        /**
         * The time that the message was sent.
         *
         * This is used for the message time stamp.
         *
         * @type {number}
         */
        time?: number;
    };
    /**
     * @remarks
     * The sender's evaluated name tag.
     */
    nameTag: {
        /**
         * The player's evaluated name tag string.
         *
         * @type {string}
         */
        value?: string;
        /**
         * Whether the name tag is hidden.
         *
         * @type {boolean}
         */
        hidden: boolean;
        /**
         * The type of the name tag.
         *
         * `hidden` - The name tag is hidden.
         *
         * `sudo` - The name tag is from the player's sudo tag.
         *
         * `nameTag` - The name tag is the player's name tag.
         *
         * `name` - The name tag is the player's name.
         *
         * @type {"hidden" | "sudo" | "nameTag" | "name"}
         */
        sourceType: "hidden" | "sudo" | "nameTag" | "name";
    };
}
/**
 * Manages callbacks that are connected to an event that fires
 * before formatted chat messages are finalized.
 *
 * This event allows you do do things like change the evaluated ranks, name tag, and more.
 *
 * These callbacks are triggered by the chat ranks system of the add-on, if the chat ranks system is disabled these callbacks will never fire.
 *
 * @example changeDisplayNamesOfPlayersSendingMessagesContainingHerobrine.ts
 * ```typescript
 * function changeDisplayNamesOfPlayersSendingMessagesContainingHerobrine() {
 *   const chatCallback = Events.andexdb.beforeEvents.modifiedChatMessageFormatFinalization.subscribe(`(eventData) => {
 *     if (eventData.tokenData.message.includes("Herobrine")) {
 *       eventData.tokenData.name = "<Herobrine>";
 *       eventData.tokenData.nameb = "Herobrine";
 *     }
 *   }`);
 * }
 * ```
 *
 * @example addAAAARankToAllMessages.ts
 * ```typescript
 * function addAAAARankToAllMessages() {
 *   const chatCallback = Events.andexdb.beforeEvents.modifiedChatMessageFormatFinalization.subscribe(`(eventData) => {
 *     eventData.tokenData.ranksListWithDefault.push("AAAA");
 *   }`);
 * }
 * ```
 *
 * @example messUpPlayersMessagesIfTheySetMessUpMyMessages.ts
 * ```typescript
 * function messUpPlayersMessagesIfTheySetMessUpMyMessages() {
 *   Events.andexdb.beforeEvents.modifiedChatMessageFormat.subscribe(`(event) => {
 *     if (event.message.includes("mess up my message")) {
 *       event.message = event.message
 *         .replaceAll(/([a-z])([a-z])([a-z])([a-z])([a-z])/g, "$5$3$4$2$1")
 *         .replaceAll(/([a-z])([a-z])([a-z])/g, "$3$1$2")
 *         .replaceAll(/([a-z])([a-z])/g, "$2$1");
 *     }
 *   };`);
 * }
 */
export declare class andexdb_ModifiedChatMessageFormatFinalizationBeforeEventSignal {
    constructor();
    /**
     * The callbacks that will be called before new formatted chat
     * messages are finalized.
     *
     * @type {((arg0: andexdb_ModifiedChatMessageFormatFinalizationBeforeEvent) => void)[]}
     */
    static callbacks: ((arg0: andexdb_ModifiedChatMessageFormatFinalizationBeforeEvent) => void)[];
    /**
     * @remarks
     * Adds a callback that will be called before new formatted chat
     * messages are finalized.
     *
     * This function can be called in read-only mode.
     *
     * This function can be called in early-execution mode.
     *
     */
    subscribe(callback: (arg0: andexdb_ModifiedChatMessageFormatFinalizationBeforeEvent) => void): (arg0: andexdb_ModifiedChatMessageFormatFinalizationBeforeEvent) => void;
    /**
     * @remarks
     * Removes a callback from being called before new formatted chat
     * messages are finalized.
     *
     * This function can't be called in read-only mode.
     *
     * This function can be called in early-execution mode.
     *
     */
    unsubscribe(callback: (arg0: andexdb_ModifiedChatMessageFormatFinalizationBeforeEvent) => void): void;
}
/**
 * An event that fires before a formatted chat message is finalized.
 *
 * This event allows you do do things like change the evaluated ranks, name tag, and more.
 *
 * This is fired before the format evalutation of a chat message is finalized, the finalized formatted message data is then
 * passed to the {@link chatSendMessageEvaluator_players} function, and compiled formatted message string is then passed to
 * the {@link andexdb_ModifiedChatMessageSendBeforeEvent} event.
 *
 * This is triggered by the chat ranks system of the add-on, if the chat ranks system is disabled this event will never fire.
 */
export declare class andexdb_ModifiedChatMessageFormatFinalizationBeforeEvent implements ChatSendBeforeEvent {
    /**
     * Creates a new andexdb_ModifiedChatMessageFormatFinalizationBeforeEvent instance.
     *
     * @param {andexdb_ModifiedChatMessageFormatFinalizationBeforeEvent} data The data for the event.
     * @param {boolean} [strict=true] Whether to enable strict mode. In strict mode, the event will throw an error if invalid data is provided. Defaults to true.
     *
     * @throws {TypeError} If the number of arguments passed to this constructor is not `1`.
     * @throws {TypeError} If the {@link data} parameter is `null`.
     * @throws {TypeError} If the {@link data} parameter is not an object.
     * @throws {TypeError} If the {@link cancel} property in {@link data} is not a boolean.
     * @throws {TypeError} If the {@link message} property in {@link data} is not a string.
     * @throws {TypeError} If the {@link sender} property in {@link data} is not an instance of {@link Player}.
     * @throws {TypeError} If the {@link newMessage} property in {@link data} is not a string.
     * @throws {TypeError} If the {@link cancel} property in {@link data} is not a boolean.
     * @throws {TypeError} If the {@link message} property in {@link data} is not a string.
     * @throws {TypeError} If the {@link sender} property in {@link data} is not an instance of {@link Player}.
     * @throws {TypeError} If the {@link newMessage} property in {@link data} is not a string.
     * @throws {TypeError} If the {@link targets} property in {@link data} is not undefined or an array.
     *
     * @implements {ChatSendBeforeEvent}
     */
    constructor(data: andexdb_ModifiedChatMessageFormatFinalizationBeforeEvent, strict?: boolean);
    /**
     * @remarks
     * If set to true, the message will not be sent.
     *
     * @default false
     */
    cancel: boolean;
    /**
     * @remarks
     * The original chat message.
     */
    readonly originalMessage: string;
    readonly sender: Player;
    readonly targets?: Player[];
    /**
     * @remarks
     * The message that was formatted.
     */
    readonly message: string;
    /**
     * @remarks
     * The evaluated message format token data.
     *
     * Modifications to this will affect the final message.
     *
     * With this you can modify many things about the message, including but not limited to:
     * -    Ranks
     * -    Names
     * -    Time Stamps
     * -    Message Formatting and Colors
     * -    Name Formatting and Colors
     * -    Separator Formatting and Colors
     * -    Whether the player's dimension is shown
     */
    tokenData: chatSendMessageEvaluator_prePlayersOutput;
}
/**
 * Manages callbacks that are connected to an event that fires
 * before modified chat messages are sent.
 *
 * These callbacks are triggered by the chat ranks system of the add-on, if the chat ranks system is disabled these callbacks will never fire.
 *
 * @example preventMessagesContainingHerobrine.ts
 * ```typescript
 * function preventMessagesContainingHerobrine() {
 *   const chatCallback = Events.andexdb.beforeEvents.modifiedChatMessageSend.subscribe(`(eventData) => {
 *      if (eventData.message.includes("Herobrine")) {
 *         eventData.cancel = true;
 *      }
 *   }`);
 * }
 * ```
 *
 * @example replaceEveryAInMessagesIncludingNameTagsAndRanksWithB.ts
 * ```typescript
 * function replaceEveryAInMessagesIncludingNameTagsAndRanksWithB() {
 *   const chatCallback = Events.andexdb.beforeEvents.modifiedChatMessageSend.subscribe(`(eventData) => {
 *      eventData.message = eventData.message.replaceAll("a", "b");
 *   }`);
 * }
 * ```
 */
export declare class andexdb_ModifiedChatMessageSendBeforeEventSignal {
    constructor();
    /**
     * The callbacks that will be called before new modified chat
     * messages are sent.
     *
     * @type {((arg0: andexdb_ModifiedChatMessageSendBeforeEvent) => void)[]}
     */
    static callbacks: ((arg0: andexdb_ModifiedChatMessageSendBeforeEvent) => void)[];
    /**
     * @remarks
     * Adds a callback that will be called before new modified chat
     * messages are sent.
     *
     * This function can be called in read-only mode.
     *
     * This function can be called in early-execution mode.
     *
     */
    subscribe(callback: (arg0: andexdb_ModifiedChatMessageSendBeforeEvent) => void): (arg0: andexdb_ModifiedChatMessageSendBeforeEvent) => void;
    /**
     * @remarks
     * Removes a callback from being called before new modified chat
     * messages are sent.
     *
     * This function can't be called in read-only mode.
     *
     * This function can be called in early-execution mode.
     *
     */
    unsubscribe(callback: (arg0: andexdb_ModifiedChatMessageSendBeforeEvent) => void): void;
}
/**
 * An event that fires before a modified chat message is sent.
 *
 * This is triggered by the chat ranks system of the add-on, if the chat ranks system is disabled this event will never fire.
 */
export declare class andexdb_ModifiedChatMessageSendBeforeEvent implements ChatSendBeforeEvent {
    /**
     * Creates a new andexdb_ModifiedChatMessageSendBeforeEvent instance.
     *
     * @param {andexdb_ModifiedChatMessageSendBeforeEvent} data The data for the event.
     * @param {boolean} [strict=true] Whether to enable strict mode. In strict mode, the event will throw an error if invalid data is provided. Defaults to true.
     *
     * @throws {TypeError} If the number of arguments passed to this constructor is not `1`.
     * @throws {TypeError} If the {@link data} parameter is `null`.
     * @throws {TypeError} If the {@link data} parameter is not an object.
     * @throws {TypeError} If the {@link cancel} property in {@link data} is not a boolean.
     * @throws {TypeError} If the {@link message} property in {@link data} is not a string.
     * @throws {TypeError} If the {@link sender} property in {@link data} is not an instance of {@link Player}.
     * @throws {TypeError} If the {@link newMessage} property in {@link data} is not a string.
     * @throws {TypeError} If the {@link cancel} property in {@link data} is not a boolean.
     * @throws {TypeError} If the {@link message} property in {@link data} is not a string.
     * @throws {TypeError} If the {@link sender} property in {@link data} is not an instance of {@link Player}.
     * @throws {TypeError} If the {@link newMessage} property in {@link data} is not a string.
     * @throws {TypeError} If the {@link targets} property in {@link data} is not undefined or an array.
     *
     * @implements {ChatSendBeforeEvent}
     */
    constructor(data: andexdb_ModifiedChatMessageSendBeforeEvent, strict?: boolean);
    /**
     * @remarks
     * If set to true, the message will not be sent.
     *
     * @default false
     */
    cancel: boolean;
    /**
     * @remarks
     * The original chat message.
     */
    readonly originalMessage: string;
    readonly sender: Player;
    readonly targets?: Player[];
    /**
     * @remarks
     * The fully modified chat message, including ranks, prefixes, etc.
     *
     * Modifications to this property will change what is sent.
     *
     * The final message printed to the chat will be exactly what this string is set to.
     */
    message: string;
    /**
     * @remarks
     * The evaluated message format token data that was used.
     */
    readonly tokenData: chatSendMessageEvaluator_prePlayersOutput;
    /**
     * @remarks
     * The options that were used to format the message, see {@link TagChatMessageFormat}.
     */
    readonly formatOptions: TagChatMessageFormat & {
        /**
         * @remarks
         * Whether the sender was a placeholder player.
         */
        readonly isPlaceholderPlayer?: boolean;
        /**
         * @remarks
         * The sender.
         */
        readonly player?: Player;
        /**
         * @remarks
         * Whether eval was allowed.
         *
         * @default true
         */
        readonly allowEval: boolean;
        /**
         * The type ID of the dimension that the player was in.
         */
        readonly dimension: "minecraft:overworld" | "overworld" | "minecraft:nether" | "nether" | "minecraft:the_end" | "the_end";
        /**
         * The personal settings for the player that were used.
         */
        readonly playerPersonalSettings: {
            /**
             * The default message formatting for the player that was used.
             *
             * This was be used if no other message formatting was found.
             *
             * @type {string}
             *
             * @default undefined
             */
            readonly defaultMessageFormatting?: string;
            /**
             * The default name formatting for the player that was used.
             *
             * This was be used if no other message formatting was found.
             *
             * @type {string}
             *
             * @default undefined
             */
            readonly defaultNameFormatting?: string;
            /**
             * The default separator formatting for the player that was used.
             *
             * This was be used if no other message formatting was found.
             *
             * @type {string}
             *
             * @default undefined
             */
            readonly defaultSeparatorFormatting?: string;
            /**
             * The players default chat rank prefix that was used.
             *
             * If it was specified it was used instead of the global chat rank prefix.
             *
             * @see {@link config.chatRanks.chatRankPrefix}
             *
             * @type {string}
             *
             * @default undefined
             */
            readonly chatRankPrefix?: string;
            /**
             * The players default rank display prefix that was used.
             *
             * If it was specified it was used instead of the global chat rank display prefix.
             *
             * @see {@link config.chatRanks.rankDisplayPrefix}
             *
             * @type {string}
             *
             * @default undefined
             */
            readonly rankDisplayPrefix?: string;
            /**
             * The players default rank display suffix that was used.
             *
             * If it was specified it was used instead of the global chat rank display suffix.
             *
             * @see {@link config.chatRanks.rankDisplaySuffix}
             *
             * @type {string}
             *
             * @default undefined
             */
            readonly rankDisplaySuffix?: string;
            /**
             * The players default rank display separator that was used.
             *
             * If it was specified it was used instead of the global chat rank display separator.
             *
             * @see {@link config.chatRanks.rankDisplaySeparator}
             *
             * @type {string}
             *
             * @default undefined
             */
            readonly rankDisplaySeparator?: string;
            /**
             * The players default name display prefix that was used.
             *
             * If it was specified it was used instead of the global chat name display prefix.
             *
             * @see {@link config.chatRanks.nameDisplayPrefix}
             *
             * @type {string}
             *
             * @default undefined
             */
            readonly nameDisplayPrefix?: string;
            /**
             * The players default name display suffix that was used.
             *
             * If it was specified it was used instead of the global chat name display suffix.
             *
             * @see {@link config.chatRanks.nameDisplaySuffix}
             *
             * @type {string}
             *
             * @default undefined
             */
            readonly nameDisplaySuffix?: string;
            /**
             * The players default name and message separator that was used.
             *
             * If it was specified it was used instead of the global chat name and message separator.
             *
             * @see {@link config.chatRanks.chatNameAndMessageSeparator}
             *
             * @type {string}
             *
             * @default undefined
             */
            readonly chatNameAndMessageSeparator?: string;
            /**
             * If it was set to true, the player's message time stamp was hidden.
             */
            readonly hideChatDisplayTimeStamp?: boolean;
        };
        /**
         * The ranks that the player had.
         *
         * @type {string[]}
         */
        readonly ranks?: string[];
        /**
         * The tags that the player had.
         *
         * @type {string[]}
         */
        readonly tags?: string[];
        /**
         * The time that the message was sent.
         *
         * This was used for the message time stamp.
         *
         * @type {number}
         */
        readonly time?: number;
    };
    /**
     * @remarks
     * The sender's evaluated name tag that was used.
     */
    readonly nameTag: {
        /**
         * The player's evaluated name tag string that was used.
         *
         * @type {string}
         */
        readonly value?: string;
        /**
         * Whether the name tag was hidden.
         *
         * @type {boolean}
         */
        readonly hidden: boolean;
        /**
         * The type of the name tag that was used.
         *
         * `hidden` - The name tag was hidden.
         *
         * `sudo` - The name tag was from the player's sudo tag.
         *
         * `nameTag` - The name tag was the player's name tag.
         *
         * `name` - The name tag was the player's name.
         *
         * @type {"hidden" | "sudo" | "nameTag" | "name"}
         */
        readonly sourceType: "hidden" | "sudo" | "nameTag" | "name";
    };
}
/**
 * Manages callbacks that are connected to modified chat messages being
 * sent.
 *
 * These callbacks are triggered by the chat ranks system of the add-on, if the chat ranks system is disabled these callbacks will never fire.
 *
 * Note: If the modified chat message send event is cancelled from a subscription to {@link Events.andexdb.afterEvents.modifiedChatMessageSend}, this event will not fire.
 */
export declare class andexdb_ModifiedChatMessageSendAfterEventSignal {
    constructor();
    /**
     * The callbacks that will be called when new modified
     * chat messages are sent.
     *
     * @type {((arg0: andexdb_ModifiedChatMessageSendAfterEvent) => void)[]}
     */
    static callbacks: ((arg0: andexdb_ModifiedChatMessageSendAfterEvent) => void)[];
    /**
     * @remarks
     * Adds a callback that will be called when new modified chat
     * messages are sent.
     *
     * This function can be called in read-only mode.
     *
     * This function can be called in early-execution mode.
     *
     * @param {((arg0: andexdb_ModifiedChatMessageSendAfterEvent) => void)} callback The callback to add.
     * @returns {((arg0: andexdb_ModifiedChatMessageSendAfterEvent) => void)} The callback that was added.
     */
    subscribe(callback: (arg0: andexdb_ModifiedChatMessageSendAfterEvent) => void): (arg0: andexdb_ModifiedChatMessageSendAfterEvent) => void;
    /**
     * @remarks
     * Removes a callback from being called when new modified chat
     * messages are sent.
     *
     * This function can't be called in read-only mode.
     *
     * This function can be called in early-execution mode.
     *
     * @param {((arg0: andexdb_ModifiedChatMessageSendAfterEvent) => void)} callback The callback to remove.
     */
    unsubscribe(callback: (arg0: andexdb_ModifiedChatMessageSendAfterEvent) => void): void;
}
/**
 * An event that fires after a modified chat message is sent.
 *
 * This is triggered by the chat ranks system of the add-on, if the chat ranks system is disabled this event will never fire.
 */
export declare class andexdb_ModifiedChatMessageSendAfterEvent implements ChatSendAfterEvent {
    /**
     * Creates a new andexdb_ModifiedChatMessageSendAfterEvent instance.
     *
     * @param {andexdb_ModifiedChatMessageSendAfterEvent} data The data for the event.
     * @param {boolean} [strict=true] Whether to enable strict mode. In strict mode, the event will throw an error if invalid data is provided. Defaults to true.
     *
     * @throws {TypeError} If the number of arguments passed to this constructor is not `1`.
     * @throws {TypeError} If the {@link data} parameter is `null`.
     * @throws {TypeError} If the {@link data} parameter is not an object.
     * @throws {TypeError} If the {@link message} property in {@link data} is not a string.
     * @throws {TypeError} If the {@link sender} property in {@link data} is not an instance of {@link Player}.
     * @throws {TypeError} If the {@link newMessage} property in {@link data} is not a string.
     * @throws {TypeError} If the {@link message} property in {@link data} is not a string.
     * @throws {TypeError} If the {@link sender} property in {@link data} is not an instance of {@link Player}.
     * @throws {TypeError} If the {@link newMessage} property in {@link data} is not a string.
     * @throws {TypeError} If the {@link targets} property in {@link data} is not undefined or an array.
     *
     * @implements {ChatSendAfterEvent}
     */
    constructor(data: andexdb_ModifiedChatMessageSendAfterEvent, strict?: boolean);
    /**
     * @remarks
     * The original chat message.
     */
    readonly originalMessage: string;
    readonly sender: Player;
    readonly targets?: Player[];
    /**
     * @remarks
     * The fully modified chat message that was sent, including ranks, prefixes, etc.
     *
     * The final message that was printed to the chat was exactly what this string was set to.
     */
    readonly message: string;
    /**
     * @remarks
     * The evaluated message format token data that was used.
     */
    readonly tokenData: chatSendMessageEvaluator_prePlayersOutput;
    /**
     * @remarks
     * The options that were used to format the message, see {@link TagChatMessageFormat}.
     */
    readonly formatOptions: TagChatMessageFormat & {
        /**
         * @remarks
         * Whether the sender was a placeholder player.
         */
        readonly isPlaceholderPlayer?: boolean;
        /**
         * @remarks
         * The sender.
         */
        readonly player?: Player;
        /**
         * @remarks
         * Whether eval was allowed.
         *
         * @default true
         */
        readonly allowEval: boolean;
        /**
         * The type ID of the dimension that the player was in.
         */
        readonly dimension: "minecraft:overworld" | "overworld" | "minecraft:nether" | "nether" | "minecraft:the_end" | "the_end";
        /**
         * The personal settings for the player that were used.
         */
        readonly playerPersonalSettings: {
            /**
             * The default message formatting for the player that was used.
             *
             * This was be used if no other message formatting was found.
             *
             * @type {string}
             *
             * @default undefined
             */
            readonly defaultMessageFormatting?: string;
            /**
             * The default name formatting for the player that was used.
             *
             * This was be used if no other message formatting was found.
             *
             * @type {string}
             *
             * @default undefined
             */
            readonly defaultNameFormatting?: string;
            /**
             * The default separator formatting for the player that was used.
             *
             * This was be used if no other message formatting was found.
             *
             * @type {string}
             *
             * @default undefined
             */
            readonly defaultSeparatorFormatting?: string;
            /**
             * The players default chat rank prefix that was used.
             *
             * If it was specified it was used instead of the global chat rank prefix.
             *
             * @see {@link config.chatRanks.chatRankPrefix}
             *
             * @type {string}
             *
             * @default undefined
             */
            readonly chatRankPrefix?: string;
            /**
             * The players default rank display prefix that was used.
             *
             * If it was specified it was used instead of the global chat rank display prefix.
             *
             * @see {@link config.chatRanks.rankDisplayPrefix}
             *
             * @type {string}
             *
             * @default undefined
             */
            readonly rankDisplayPrefix?: string;
            /**
             * The players default rank display suffix that was used.
             *
             * If it was specified it was used instead of the global chat rank display suffix.
             *
             * @see {@link config.chatRanks.rankDisplaySuffix}
             *
             * @type {string}
             *
             * @default undefined
             */
            readonly rankDisplaySuffix?: string;
            /**
             * The players default rank display separator that was used.
             *
             * If it was specified it was used instead of the global chat rank display separator.
             *
             * @see {@link config.chatRanks.rankDisplaySeparator}
             *
             * @type {string}
             *
             * @default undefined
             */
            readonly rankDisplaySeparator?: string;
            /**
             * The players default name display prefix that was used.
             *
             * If it was specified it was used instead of the global chat name display prefix.
             *
             * @see {@link config.chatRanks.nameDisplayPrefix}
             *
             * @type {string}
             *
             * @default undefined
             */
            readonly nameDisplayPrefix?: string;
            /**
             * The players default name display suffix that was used.
             *
             * If it was specified it was used instead of the global chat name display suffix.
             *
             * @see {@link config.chatRanks.nameDisplaySuffix}
             *
             * @type {string}
             *
             * @default undefined
             */
            readonly nameDisplaySuffix?: string;
            /**
             * The players default name and message separator that was used.
             *
             * If it was specified it was used instead of the global chat name and message separator.
             *
             * @see {@link config.chatRanks.chatNameAndMessageSeparator}
             *
             * @type {string}
             *
             * @default undefined
             */
            readonly chatNameAndMessageSeparator?: string;
            /**
             * If it was set to true, the player's message time stamp was hidden.
             */
            readonly hideChatDisplayTimeStamp?: boolean;
        };
        /**
         * The ranks that the player had.
         *
         * @type {string[]}
         */
        readonly ranks?: string[];
        /**
         * The tags that the player had.
         *
         * @type {string[]}
         */
        readonly tags?: string[];
        /**
         * The time that the message was sent.
         *
         * This was used for the message time stamp.
         *
         * @type {number}
         */
        readonly time?: number;
    };
    /**
     * @remarks
     * The sender's evaluated name tag that was used.
     */
    readonly nameTag: {
        /**
         * The player's evaluated name tag string that was used.
         *
         * @type {string}
         */
        readonly value?: string;
        /**
         * Whether the name tag was hidden.
         *
         * @type {boolean}
         */
        readonly hidden: boolean;
        /**
         * The type of the name tag that was used.
         *
         * `hidden` - The name tag was hidden.
         *
         * `sudo` - The name tag was from the player's sudo tag.
         *
         * `nameTag` - The name tag was the player's name tag.
         *
         * `name` - The name tag was the player's name.
         *
         * @type {"hidden" | "sudo" | "nameTag" | "name"}
         */
        readonly sourceType: "hidden" | "sudo" | "nameTag" | "name";
    };
}
/**
 * A set of events that fire before an actual action occurs. In
 * most cases, you can potentially cancel or modify the
 * impending event. Note that in before events any APIs that
 * modify gameplay state will not function and will throw an
 * error. (e.g., dimension.spawnEntity)
 *
 * @hideconstructor
 */
export declare class andexdbBeforeEvents {
    private constructor();
    /**
     * The instance of the `andexdbBeforeEvents` class.
     *
     * @type {andexdbBeforeEvents}
     */
    static readonly instance: andexdbBeforeEvents;
    /**
     * This event is triggered before a modified chat message is formatted.
     *
     * This is triggered by the chat ranks system of the add-on, if the chat ranks system is disabled this event will never fire.
     *
     * This property can be read in early-execution mode.
     *
     * @example preventMessagesContainingHerobrine.ts
     * ```typescript
     * function preventMessagesContainingHerobrine() {
     *   const chatCallback = Events.andexdb.beforeEvents.modifiedChatMessageFormat.subscribe(`(eventData) => {
     *      if (eventData.message.includes("Herobrine")) {
     *         eventData.cancel = true;
     *      }
     *   }`);
     * }
     * ```
     *
     * @example replaceEveryAInMessagesWithB.ts
     * ```typescript
     * function replaceEveryAInMessagesWithB() {
     *   const chatCallback = Events.andexdb.beforeEvents.modifiedChatMessageFormat.subscribe(`(eventData) => {
     *      eventData.message = eventData.message.replaceAll("a", "b");
     *   }`);
     * }
     * ```
     */
    readonly modifiedChatMessageFormat: andexdb_ModifiedChatMessageFormatBeforeEventSignal;
    /**
     * This event is triggered before a formatted chat message is finalized.
     *
     * This event allows you do do things like change the evaluated ranks, name tag, and more.
     *
     * This is triggered by the chat ranks system of the add-on, if the chat ranks system is disabled this event will never fire.
     *
     * This property can be read in early-execution mode.
     *
     * @example changeDisplayNamesOfPlayersSendingMessagesContainingHerobrine.ts
     * ```typescript
     * function changeDisplayNamesOfPlayersSendingMessagesContainingHerobrine() {
     *   const chatCallback = Events.andexdb.beforeEvents.modifiedChatMessageFormatFinalization.subscribe(`(eventData) => {
     *     if (eventData.tokenData.message.includes("Herobrine")) {
     *       eventData.tokenData.name = "<Herobrine>";
     *       eventData.tokenData.nameb = "Herobrine";
     *     }
     *   }`);
     * }
     * ```
     *
     * @example addAAAARankToAllMessages.ts
     * ```typescript
     * function addAAAARankToAllMessages() {
     *   const chatCallback = Events.andexdb.beforeEvents.modifiedChatMessageFormatFinalization.subscribe(`(eventData) => {
     *     eventData.tokenData.ranks.push("AAAA");
     *   }`);
     * }
     * ```
     *
     * @example messUpPlayersMessagesIfTheySetMessUpMyMessages.ts
     * ```typescript
     * function messUpPlayersMessagesIfTheySetMessUpMyMessages() {
     *   Events.andexdb.beforeEvents.modifiedChatMessageFormat.subscribe(`(event) => {
     *     if (event.message.includes("mess up my message")) {
     *       event.message = event.message
     *         .replaceAll(/([a-z])([a-z])([a-z])([a-z])([a-z])/g, "$5$3$4$2$1")
     *         .replaceAll(/([a-z])([a-z])([a-z])/g, "$3$1$2")
     *         .replaceAll(/([a-z])([a-z])/g, "$2$1");
     *     }
     *   };`);
     * }
     */
    readonly modifiedChatMessageFormatFinalization: andexdb_ModifiedChatMessageFormatFinalizationBeforeEventSignal;
    /**
     * This event is triggered before a modified chat message is sent.
     *
     * This is triggered by the chat ranks system of the add-on, if the chat ranks system is disabled this event will never fire.
     *
     * This property can be read in early-execution mode.
     *
     * @example preventMessagesContainingHerobrine.ts
     * ```typescript
     * function preventMessagesContainingHerobrine() {
     *   const chatCallback = Events.andexdb.beforeEvents.modifiedChatMessageSend.subscribe(`(eventData) => {
     *      if (eventData.message.includes("Herobrine")) {
     *         eventData.cancel = true;
     *      }
     *   }`);
     * }
     * ```
     *
     * @example replaceEveryAInMessagesIncludingNameTagsAndRanksWithB.ts
     * ```typescript
     * function replaceEveryAInMessagesIncludingNameTagsAndRanksWithB() {
     *   const chatCallback = Events.andexdb.beforeEvents.modifiedChatMessageSend.subscribe(`(eventData) => {
     *      eventData.message = eventData.message.replaceAll("a", "b");
     *   }`);
     * }
     * ```
     */
    readonly modifiedChatMessageSend: andexdb_ModifiedChatMessageSendBeforeEventSignal;
}
/**
 * Provides a set of events that fire within the broader
 * scripting system within 8Crafter's Server Utilities & Debug
 * Sticks add-on.
 *
 * @hideconstructor
 */
export declare class andexdbAfterEvents {
    private constructor();
    /**
     * The instance of the `andexdbAfterEvents` class.
     *
     * @type {andexdbAfterEvents}
     */
    static readonly instance: andexdbAfterEvents;
    /**
     * @remarks
     * Fires after a modified chat message is sent.
     *
     * This is triggered by the chat ranks system of the add-on, if the chat ranks system is disabled this event will never fire.
     *
     * Note: If the modified chat message send event is cancelled from a subscription to {@link Events.andexdb.afterEvents.modifiedChatMessageSend}, this event will not fire.
     *
     * This property can be read in early-execution mode.
     *
     */
    readonly modifiedChatMessageSend: andexdb_ModifiedChatMessageSendAfterEventSignal;
}
/**
 * An object that maps event types to their corresponding event signals.
 */
export declare const signalMap: {
    readonly world: {
        readonly beforeEvents: WorldBeforeEvents;
        readonly afterEvents: WorldAfterEvents;
    };
    readonly system: {
        readonly beforeEvents: SystemBeforeEvents;
        readonly afterEvents: SystemAfterEvents;
    };
    readonly andexdb: {
        readonly beforeEvents: andexdbBeforeEvents;
        readonly afterEvents: andexdbAfterEvents;
    };
};
declare namespace exports {
    /**
     * A class for managing event subscriptions.
     *
     * This allows you to run code when an event occurs.
     *
     * These event subscriptions will be saved when restarting the world/realm/server.
     *
     * @hideconstructor
     */
    class Events {
        /**
         * This is a list of all event subscriptions that have been loaded.
         */
        static readonly loadedEvents: {
            system: {
                beforeEvents: {
                    [key in keyof System["beforeEvents"]]: SubscribedEvent<`system.beforeEvents.${key}`>[];
                };
                afterEvents: {
                    [key in keyof System["afterEvents"]]: SubscribedEvent<`system.afterEvents.${key}`>[];
                };
            };
            world: {
                beforeEvents: {
                    [key in keyof World["beforeEvents"]]: SubscribedEvent<`world.beforeEvents.${key}`>[];
                };
                afterEvents: {
                    [key in keyof World["afterEvents"]]: SubscribedEvent<`world.afterEvents.${key}`>[];
                };
            };
            andexdb: {
                beforeEvents: {
                    [key in keyof andexdbBeforeEvents]: SubscribedEvent<`andexdb.beforeEvents.${key}`>[];
                };
                afterEvents: {
                    [key in keyof andexdbAfterEvents]: SubscribedEvent<`andexdb.afterEvents.${key}`>[];
                };
            };
        };
        private constructor();
        /**
         * Unloads all event subscriptions.
         */
        static unload(): void;
        /**
         * Loads all event subscriptions that have been saved.
         *
         * @param {boolean} [initialize=true] Whether to initialize all loaded event subscriptions. Defaults to `true`.
         * @param {boolean} [clear=true] Whether to clear all existing loaded event subscriptions before loading the saved ones. Defaults to `true`.
         * @returns {{ key: `${SubscribedEventTypeID}[${number}].${"initialize" | "deinitialize"}`; error: Error; }[]} A list of errors that occurred while loading event subscriptions.
         */
        static load(initialize?: boolean, clear?: boolean): {
            key: `${SubscribedEventTypeID}[${number}].${"initialize" | "deinitialize"}`;
            error: Error;
        }[];
        /**
         * Saves all event subscriptions that have been loaded.
         *
         * Note: If the event subscriptions have not been loaded, this will delete all saved event subscriptions.
         */
        static save(): void;
        /**
         * Registers an event subscription.
         *
         * @template {SubscribedEventTypeID} EventTypeID The event type ID.
         * @param {SubscribedEventSavedData<EventTypeID>} data The event subscription data.
         * @param {boolean} [save=true] Whether to save the loaded event subscriptions after registering the event subscription. Defaults to `true`.
         * @param {boolean} [initialize=true] Whether to initialize the event subscription after registering it. Defaults to `true`.
         * @returns {SubscribedEvent<EventTypeID>} The registered event subscription.
         *
         * @throws {TypeError} If the event type is unsupported.
         * @throws {TypeError} If the loaded events list for the event type is not an array.
         * @throws {TypeError} If the event callback is a string but is not a valid stringified JavaScript function.
         */
        static registerSubscription<EventTypeID extends SubscribedEventTypeID>(data: SubscribedEventSavedData<EventTypeID>, save?: boolean, initialize?: boolean): SubscribedEvent<EventTypeID>;
        /**
         * Deinitializes all event subscriptions.
         *
         * @returns {{ key: `${SubscribedEventTypeID}[${number}].${"initialize" | "deinitialize"}`; error: Error; }[]} A list of errors that occurred while deinitializing event subscriptions.
         */
        static deinitialize(): {
            key: `${SubscribedEventTypeID}[${number}].${"initialize" | "deinitialize"}`;
            error: Error;
        }[];
        /**
         * Initializes all event subscriptions.
         *
         * @returns {{ key: `${SubscribedEventTypeID}[${number}].${"initialize" | "deinitialize"}`; error: Error; }[]} A list of errors that occurred while initializing event subscriptions.
         */
        static initialize(): {
            key: `${SubscribedEventTypeID}[${number}].${"initialize" | "deinitialize"}`;
            error: Error;
        }[];
        /**
         * Reinitializes all event subscriptions.
         *
         * This just runs {@link deinitialize} followed by {@link initialize}.
         *
         * @returns {{ key: `${SubscribedEventTypeID}[${number}].${"initialize" | "deinitialize"}`; error: Error; }[]} A list of errors that occurred while reinitializing event subscriptions.
         */
        static reinitialize(): {
            key: `${SubscribedEventTypeID}[${number}].${"initialize" | "deinitialize"}`;
            error: Error;
        }[];
        /**
         * The system events.
         *
         * @type {typeof Events_System}
         */
        static get system(): typeof Events_System;
        /**
         * The world events.
         *
         * @type {typeof Events_World}
         */
        static get world(): typeof Events_World;
        /**
         * The custom events from 8Crafter's Server Utilities & Debug Sticks add-on.
         *
         * @type {typeof Events_andexdb}
         */
        static get andexdb(): typeof Events_andexdb;
        /**
         * An object containing references to the classes that contain the event signal classes.
         *
         * @type {typeof signalMap}
         */
        static get signals(): {
            readonly world: {
                readonly beforeEvents: WorldBeforeEvents;
                readonly afterEvents: WorldAfterEvents;
            };
            readonly system: {
                readonly beforeEvents: SystemBeforeEvents;
                readonly afterEvents: SystemAfterEvents;
            };
            readonly andexdb: {
                readonly beforeEvents: andexdbBeforeEvents;
                readonly afterEvents: andexdbAfterEvents;
            };
        };
    }
    /**
     * An event subscription.
     *
     * @template {SubscribedEventTypeID} EventTypeID The type ID of the event this subscription is for.
     * @template {SubscribableEventParameterTypeMap<EventSignal>} EventSignal The type of the event data for the event this subscription is for.
     */
    class SubscribedEvent<EventTypeID extends SubscribedEventTypeID, EventSignal extends SubscribedEventSignalUnion = EventTypeID extends `${infer TA extends "system" | "world"}.${infer TB extends "beforeEvents" | "afterEvents"}.${infer TC extends SubscribedEventKeyUnion}` ? TC extends keyof (TA extends "system" ? System : World)[TB] ? (TA extends "system" ? System : World)[TB][TC] : never : never> {
        #private;
        /**
         * Whether or not the event subscription has been saved.
         *
         * @type {boolean}
         *
         * @default false
         */
        isSaved: boolean;
        /**
         * Whether or not the event subscription has been initialized.
         *
         * @type {boolean}
         *
         * @default false
         */
        get initialized(): boolean;
        /**
         * The data for the event subscription.
         *
         * @type {Full<SubscribedEventSavedData<EventTypeID>>}
         */
        data: Full<SubscribedEventSavedData<EventTypeID>>;
        /**
         * The type ID of the event this subscription is for.
         *
         * @type {EventTypeID}
         */
        get eventType(): EventTypeID;
        /**
         * A reference to the event signal for the event this subscription is for.
         *
         * @type {EventSignal}
         */
        get eventTypeSignalReference(): EventSignal;
        /**
         * A reference to the array of loaded event subscriptions for the event this subscription is for.
         *
         * @type {SubscribedEvent<EventTypeID, EventSignal>[]}
         */
        get eventTypeLoadedEventsReference(): SubscribedEvent<EventTypeID, EventSignal>[];
        /**
         * Whether or not the event subscription is valid.
         *
         * True if the event is loaded, false otherwise.
         *
         * @type {boolean}
         */
        get isValid(): boolean;
        /**
         * The creation time of the event subscription.
         *
         * Undefined if the format of the save ID is not recognized.
         *
         * @type {number | undefined}
         *
         * @default undefined
         */
        get creationTime(): number | undefined;
        /**
         * The last time the event subscription was modified.
         *
         * @type {number | undefined}
         *
         * @default this.creationTime
         */
        get lastModified(): number | undefined;
        /**
         * Creates a new event subscription.
         *
         * @param {SubscribedEventSavedData<EventTypeID>} data The data for the event subscription.
         * @param {boolean} [isSaved=false] Whether or not the event subscription has already been saved.
         *
         * @throws {TypeError} If the event type is unsupported.
         * @throws {TypeError} If the loaded event subscriptions list for the event type is not an array.
         */
        constructor(data: SubscribedEventSavedData<EventTypeID>, isSaved?: boolean);
        /**
         * Initializes the event subscription.
         *
         * This method subscribes the subscription to the actual event.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @returns {true} A boolean representing whether or not the subscription was successfully initialized, currently it always returns true, as when it is not successful, an error is thrown.
         *
         * @throws {Error} If the event subscription is disabled.
         * @throws {Error} If the event subscription callback has already been initialized.
         * @throws {Error} If the event subscription has already been initialized.
         * @throws {TypeError} If the event subscription callback is an empty string.
         * @throws {TypeError} If the event subscription callback is not a string.
         * @throws {TypeError} If the event subscription callback is not a valid stringified JavaScript function.
         */
        initialize(): true;
        /**
         * Deinitializes the event subscription.
         *
         * This method unsubscribes the subscription from the actual event.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @returns {boolean} A boolean representing whether or not the subscription was successfully deinitialized, currently it always returns true, as when it is not successful, an error is thrown.
         *
         * @throws {Error} If the event subscription callback is not initialized.
         * @throws {Error} If the event subscription is not initialized.
         */
        deinitialize(): boolean;
        /**
         * Disables the event subscription.
         *
         * @returns {boolean} A boolean representing whether or not the subscription was successfully disabled, if the event is already disabled, false is returned, otherwise true.
         */
        disable(): boolean;
        /**
         * Enables the event subscription.
         *
         * @returns {boolean} A boolean representing whether or not the subscription was successfully enabled, if the event is already enabled, false is returned, otherwise true.
         */
        enable(): boolean;
        /**
         * Deletes the event subscription.
         *
         * @remarks
         * This function can't be called in read-only mode.
         *
         * This function can be called in early-execution mode.
         *
         * @description
         * If the event subscription is initialized, it will be deinitialized.
         *
         * If the event subscription is loaded, it will be removed from the loaded event subscriptions list.
         *
         * If the event subscription is loaded and is saved, it will be removed from the loaded event subscriptions list, then the list of loaded event subscriptions will be saved, causing the event subscription to be deleted.
         *
         * If the event subscription is not loaded but is saved, the list of loaded event subscriptions will be saved, causing the event subscription to be deleted.
         */
        delete(): void;
        /**
         * Returns the data for the event subscription.
         *
         * @returns {Full<SubscribedEventSavedData<EventTypeID>>}
         */
        toJSON(): Full<SubscribedEventSavedData<EventTypeID>>;
    }
}
export import SubscribedEvent = exports.SubscribedEvent;
export import Events = exports.Events;
import type { chatSendMessageEvaluator_prePlayersOutput, TagChatMessageFormat } from "modules/chat/functions/chatSendMessageEvaluator";
declare global {
    namespace globalThis {
        export import Events = exports.Events;
        export import SubscribedEvent = exports.SubscribedEvent;
    }
}
export {};
