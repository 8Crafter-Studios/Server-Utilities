import { ChatSendAfterEvent, ChatSendBeforeEvent, Player, SystemAfterEvents, SystemBeforeEvents, WorldAfterEvents, WorldBeforeEvents, } from "@minecraft/server";
import { getStringFromDynamicProperties } from "modules/utilities/functions/getStringFromDynamicProperties";
import { getSuperUniqueID } from "modules/utilities/functions/getSuperUniqueID";
import { saveStringToDynamicProperties } from "modules/utilities/functions/saveStringToDynamicProperties";
/**
 * The system events.
 *
 * @hideconstructor
 */
export class Events_System {
    constructor() { }
    /**
     * A set of events that fire before an actual action occurs. In
     * most cases, you can potentially cancel or modify the
     * impending event. Note that in before events any APIs that
     * modify gameplay state will not function and will throw an
     * error.
     *
     * @type {Events_SystemBeforeEvents}
     */
    static get beforeEvents() {
        return new Events_SystemBeforeEvents();
    }
    /**
     * Provides a set of events that fire within the broader
     * scripting system within Minecraft.
     *
     * @type {Events_SystemAfterEvents}
     */
    static get afterEvents() {
        return new Events_SystemAfterEvents();
    }
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
export class Events_SystemBeforeEvents {
    constructor() { }
    get shutdown() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "system.beforeEvents.shutdown",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "system.beforeEvents.shutdown")
                    throw new ReferenceError("Subscription must be for the system.beforeEvents.shutdown event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"system.beforeEvents.shutdown">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.system.beforeEvents.shutdown.filter(() => true);
            },
        };
    }
    get startup() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "system.beforeEvents.startup",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "system.beforeEvents.startup")
                    throw new ReferenceError("Subscription must be for the system.beforeEvents.startup event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"system.beforeEvents.startup">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.system.beforeEvents.startup.filter(() => true);
            },
        };
    }
    get watchdogTerminate() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "system.beforeEvents.watchdogTerminate",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "system.beforeEvents.watchdogTerminate")
                    throw new ReferenceError("Subscription must be for the system.beforeEvents.watchdogTerminate event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"system.beforeEvents.watchdogTerminate">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.system.beforeEvents.watchdogTerminate.filter(() => true);
            },
        };
    }
}
/**
 * Provides a set of events that fire within the broader
 * scripting system within Minecraft.
 *
 * @implements {ReplaceTypeOfKey<SystemAfterEvents, keyof SystemAfterEvents, any>}
 */
export class Events_SystemAfterEvents {
    constructor() { }
    get scriptEventReceive() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "system.afterEvents.scriptEventReceive",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "system.afterEvents.scriptEventReceive")
                    throw new ReferenceError("Subscription must be for the system.afterEvents.scriptEventReceive event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"system.afterEvents.scriptEventReceive">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.system.afterEvents.scriptEventReceive.filter(() => true);
            },
        };
    }
}
/**
 * The world events.
 *
 * @hideconstructor
 */
export class Events_World {
    constructor() { }
    /**
     * A set of events that fire before an actual action occurs. In
     * most cases, you can potentially cancel or modify the
     * impending event. Note that in before events any APIs that
     * modify gameplay state will not function and will throw an
     * error. (e.g., dimension.spawnEntity)
     */
    static get beforeEvents() {
        return new Events_WorldBeforeEvents();
    }
    /**
     * Contains a set of events that are available across the scope
     * of the World.
     */
    static get afterEvents() {
        return new Events_WorldAfterEvents();
    }
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
export class Events_WorldBeforeEvents {
    constructor() { }
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
    get chatSend() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.beforeEvents.chatSend",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.beforeEvents.chatSend")
                    throw new ReferenceError("Subscription must be for the world.beforeEvents.chatSend event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.beforeEvents.chatSend">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.beforeEvents.chatSend.filter(() => true);
            },
        };
    }
    get effectAdd() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.beforeEvents.effectAdd",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.beforeEvents.effectAdd")
                    throw new ReferenceError("Subscription must be for the world.beforeEvents.effectAdd event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.beforeEvents.effectAdd">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.beforeEvents.effectAdd.filter(() => true);
            },
        };
    }
    get entityRemove() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.beforeEvents.entityRemove",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.beforeEvents.entityRemove")
                    throw new ReferenceError("Subscription must be for the world.beforeEvents.entityRemove event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.beforeEvents.entityRemove">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.beforeEvents.entityRemove.filter(() => true);
            },
        };
    }
    get explosion() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.beforeEvents.explosion",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.beforeEvents.explosion")
                    throw new ReferenceError("Subscription must be for the world.beforeEvents.explosion event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.beforeEvents.explosion">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.beforeEvents.explosion.filter(() => true);
            },
        };
    }
    get itemUse() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.beforeEvents.itemUse",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.beforeEvents.itemUse")
                    throw new ReferenceError("Subscription must be for the world.beforeEvents.itemUse event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.beforeEvents.itemUse">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.beforeEvents.itemUse.filter(() => true);
            },
        };
    }
    get playerBreakBlock() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.beforeEvents.playerBreakBlock",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.beforeEvents.playerBreakBlock")
                    throw new ReferenceError("Subscription must be for the world.beforeEvents.playerBreakBlock event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.beforeEvents.playerBreakBlock">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.beforeEvents.playerBreakBlock.filter(() => true);
            },
        };
    }
    get playerGameModeChange() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.beforeEvents.playerGameModeChange",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.beforeEvents.playerGameModeChange")
                    throw new ReferenceError("Subscription must be for the world.beforeEvents.playerGameModeChange event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.beforeEvents.playerGameModeChange">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.beforeEvents.playerGameModeChange.filter(() => true);
            },
        };
    }
    get playerInteractWithBlock() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.beforeEvents.playerInteractWithBlock",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.beforeEvents.playerInteractWithBlock")
                    throw new ReferenceError("Subscription must be for the world.beforeEvents.playerInteractWithBlock event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.beforeEvents.playerInteractWithBlock">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.beforeEvents.playerInteractWithBlock.filter(() => true);
            },
        };
    }
    get playerInteractWithEntity() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.beforeEvents.playerInteractWithEntity",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.beforeEvents.playerInteractWithEntity")
                    throw new ReferenceError("Subscription must be for the world.beforeEvents.playerInteractWithEntity event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.beforeEvents.playerInteractWithEntity">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.beforeEvents.playerInteractWithEntity.filter(() => true);
            },
        };
    }
    get playerLeave() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.beforeEvents.playerLeave",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.beforeEvents.playerLeave")
                    throw new ReferenceError("Subscription must be for the world.beforeEvents.playerLeave event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.beforeEvents.playerLeave">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.beforeEvents.playerLeave.filter(() => true);
            },
        };
    }
    get playerPlaceBlock() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.beforeEvents.playerPlaceBlock",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.beforeEvents.playerPlaceBlock")
                    throw new ReferenceError("Subscription must be for the world.beforeEvents.playerPlaceBlock event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.beforeEvents.playerPlaceBlock">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.beforeEvents.playerPlaceBlock.filter(() => true);
            },
        };
    }
    get weatherChange() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.beforeEvents.weatherChange",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.beforeEvents.weatherChange")
                    throw new ReferenceError("Subscription must be for the world.beforeEvents.weatherChange event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.beforeEvents.weatherChange">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.beforeEvents.weatherChange.filter(() => true);
            },
        };
    }
}
/**
 * Contains a set of events that are available across the scope
 * of the World.
 *
 * @implements {ReplaceTypeOfKey<WorldAfterEvents, keyof WorldAfterEvents, any>}
 */
export class Events_WorldAfterEvents {
    get blockExplode() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.blockExplode",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.blockExplode")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.blockExplode event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.blockExplode">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.blockExplode.filter(() => true);
            },
        };
    }
    get buttonPush() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.buttonPush",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.buttonPush")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.buttonPush event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.buttonPush">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.buttonPush.filter(() => true);
            },
        };
    }
    get chatSend() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.chatSend",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.chatSend")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.chatSend event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.chatSend">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.chatSend.filter(() => true);
            },
        };
    }
    get dataDrivenEntityTrigger() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.dataDrivenEntityTrigger",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.dataDrivenEntityTrigger")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.dataDrivenEntityTrigger event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.dataDrivenEntityTrigger">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.dataDrivenEntityTrigger.filter(() => true);
            },
        };
    }
    get effectAdd() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.effectAdd",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.effectAdd")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.effectAdd event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.effectAdd">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.effectAdd.filter(() => true);
            },
        };
    }
    get entityDie() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.entityDie",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.entityDie")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.entityDie event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.entityDie">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.entityDie.filter(() => true);
            },
        };
    }
    get entityHealthChanged() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.entityHealthChanged",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.entityHealthChanged")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.entityHealthChanged event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.entityHealthChanged">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.entityHealthChanged.filter(() => true);
            },
        };
    }
    get entityHitBlock() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.entityHitBlock",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.entityHitBlock")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.entityHitBlock event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.entityHitBlock">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.entityHitBlock.filter(() => true);
            },
        };
    }
    get entityHitEntity() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.entityHitEntity",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.entityHitEntity")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.entityHitEntity event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.entityHitEntity">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.entityHitEntity.filter(() => true);
            },
        };
    }
    get entityHurt() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.entityHurt",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.entityHurt")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.entityHurt event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.entityHurt">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.entityHurt.filter(() => true);
            },
        };
    }
    get entityLoad() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.entityLoad",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.entityLoad")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.entityLoad event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.entityLoad">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.entityLoad.filter(() => true);
            },
        };
    }
    get entityRemove() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.entityRemove",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.entityRemove")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.entityRemove event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.entityRemove">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.entityRemove.filter(() => true);
            },
        };
    }
    get entitySpawn() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.entitySpawn",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.entitySpawn")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.entitySpawn event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.entitySpawn">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.entitySpawn.filter(() => true);
            },
        };
    }
    get explosion() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.explosion",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.explosion")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.explosion event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.explosion">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.explosion.filter(() => true);
            },
        };
    }
    get gameRuleChange() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.gameRuleChange",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.gameRuleChange")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.gameRuleChange event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.gameRuleChange">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.gameRuleChange.filter(() => true);
            },
        };
    }
    get itemCompleteUse() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.itemCompleteUse",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.itemCompleteUse")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.itemCompleteUse event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.itemCompleteUse">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.itemCompleteUse.filter(() => true);
            },
        };
    }
    get itemReleaseUse() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.itemReleaseUse",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.itemReleaseUse")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.itemReleaseUse event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.itemReleaseUse">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.itemReleaseUse.filter(() => true);
            },
        };
    }
    get itemStartUse() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.itemStartUse",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.itemStartUse")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.itemStartUse event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.itemStartUse">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.itemStartUse.filter(() => true);
            },
        };
    }
    get itemStartUseOn() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.itemStartUseOn",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.itemStartUseOn")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.itemStartUseOn event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.itemStartUseOn">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.itemStartUseOn.filter(() => true);
            },
        };
    }
    get itemStopUse() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.itemStopUse",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.itemStopUse")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.itemStopUse event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.itemStopUse">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.itemStopUse.filter(() => true);
            },
        };
    }
    get itemStopUseOn() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.itemStopUseOn",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.itemStopUseOn")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.itemStopUseOn event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.itemStopUseOn">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.itemStopUseOn.filter(() => true);
            },
        };
    }
    get itemUse() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.itemUse",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.itemUse")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.itemUse event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.itemUse">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.itemUse.filter(() => true);
            },
        };
    }
    get leverAction() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.leverAction",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.leverAction")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.leverAction event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.leverAction">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.leverAction.filter(() => true);
            },
        };
    }
    get messageReceive() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.messageReceive",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.messageReceive")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.messageReceive event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.messageReceive">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.messageReceive.filter(() => true);
            },
        };
    }
    get packSettingChange() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.packSettingChange",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.packSettingChange")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.packSettingChange event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.packSettingChange">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.packSettingChange.filter(() => true);
            },
        };
    }
    get playerSwingStart() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.playerSwingStart",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.playerSwingStart")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.playerSwingStart event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.playerSwingStart">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.playerSwingStart.filter(() => true);
            },
        };
    }
    get pistonActivate() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.pistonActivate",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.pistonActivate")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.pistonActivate event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.pistonActivate">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.pistonActivate.filter(() => true);
            },
        };
    }
    get playerBreakBlock() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.playerBreakBlock",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.playerBreakBlock")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.playerBreakBlock event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.playerBreakBlock">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.playerBreakBlock.filter(() => true);
            },
        };
    }
    get playerButtonInput() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.playerButtonInput",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.playerButtonInput")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.playerButtonInput event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.playerButtonInput">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.playerButtonInput.filter(() => true);
            },
        };
    }
    get playerDimensionChange() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.playerDimensionChange",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.playerDimensionChange")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.playerDimensionChange event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.playerDimensionChange">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.playerDimensionChange.filter(() => true);
            },
        };
    }
    get playerEmote() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.playerEmote",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.playerEmote")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.playerEmote event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.playerEmote">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.playerEmote.filter(() => true);
            },
        };
    }
    get playerGameModeChange() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.playerGameModeChange",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.playerGameModeChange")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.playerGameModeChange event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.playerGameModeChange">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.playerGameModeChange.filter(() => true);
            },
        };
    }
    get playerHotbarSelectedSlotChange() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.playerHotbarSelectedSlotChange",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.playerHotbarSelectedSlotChange")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.playerHotbarSelectedSlotChange event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.playerHotbarSelectedSlotChange">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.playerHotbarSelectedSlotChange.filter(() => true);
            },
        };
    }
    get playerInputModeChange() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.playerInputModeChange",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.playerInputModeChange")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.playerInputModeChange event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.playerInputModeChange">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.playerInputModeChange.filter(() => true);
            },
        };
    }
    get playerInputPermissionCategoryChange() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.playerInputPermissionCategoryChange",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.playerInputPermissionCategoryChange")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.playerInputPermissionCategoryChange event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.playerInputPermissionCategoryChange">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.playerInputPermissionCategoryChange.filter(() => true);
            },
        };
    }
    get playerInteractWithBlock() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.playerInteractWithBlock",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.playerInteractWithBlock")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.playerInteractWithBlock event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.playerInteractWithBlock">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.playerInteractWithBlock.filter(() => true);
            },
        };
    }
    get playerInteractWithEntity() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.playerInteractWithEntity",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.playerInteractWithEntity")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.playerInteractWithEntity event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.playerInteractWithEntity">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.playerInteractWithEntity.filter(() => true);
            },
        };
    }
    get playerInventoryItemChange() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.playerInventoryItemChange",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.playerInventoryItemChange")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.playerInventoryItemChange event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.playerInventoryItemChange">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.playerInventoryItemChange.filter(() => true);
            },
        };
    }
    get playerJoin() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.playerJoin",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.playerJoin")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.playerJoin event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.playerJoin">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.playerJoin.filter(() => true);
            },
        };
    }
    get playerLeave() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.playerLeave",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.playerLeave")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.playerLeave event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.playerLeave">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.playerLeave.filter(() => true);
            },
        };
    }
    get playerPlaceBlock() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.playerPlaceBlock",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.playerPlaceBlock")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.playerPlaceBlock event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.playerPlaceBlock">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.playerPlaceBlock.filter(() => true);
            },
        };
    }
    get playerSpawn() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.playerSpawn",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.playerSpawn")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.playerSpawn event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.playerSpawn">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.playerSpawn.filter(() => true);
            },
        };
    }
    get pressurePlatePop() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.pressurePlatePop",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.pressurePlatePop")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.pressurePlatePop event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.pressurePlatePop">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.pressurePlatePop.filter(() => true);
            },
        };
    }
    get pressurePlatePush() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.pressurePlatePush",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.pressurePlatePush")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.pressurePlatePush event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.pressurePlatePush">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.pressurePlatePush.filter(() => true);
            },
        };
    }
    get projectileHitBlock() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.projectileHitBlock",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.projectileHitBlock")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.projectileHitBlock event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.projectileHitBlock">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.projectileHitBlock.filter(() => true);
            },
        };
    }
    get projectileHitEntity() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.projectileHitEntity",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.projectileHitEntity")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.projectileHitEntity event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.projectileHitEntity">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.projectileHitEntity.filter(() => true);
            },
        };
    }
    get targetBlockHit() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.targetBlockHit",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.targetBlockHit")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.targetBlockHit event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.targetBlockHit">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.targetBlockHit.filter(() => true);
            },
        };
    }
    get tripWireTrip() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.tripWireTrip",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.tripWireTrip")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.tripWireTrip event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.tripWireTrip">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.tripWireTrip.filter(() => true);
            },
        };
    }
    get weatherChange() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.beforeEvents.weatherChange",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.beforeEvents.weatherChange")
                    throw new ReferenceError("Subscription must be for the world.beforeEvents.weatherChange event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.beforeEvents.weatherChange">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.beforeEvents.weatherChange.filter(() => true);
            },
        };
    }
    get worldLoad() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "world.afterEvents.worldLoad",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "world.afterEvents.worldLoad")
                    throw new ReferenceError("Subscription must be for the world.afterEvents.worldLoad event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"world.afterEvents.worldLoad">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.world.afterEvents.worldLoad.filter(() => true);
            },
        };
    }
}
/**
 * The custom events from 8Crafter's Server Utilities & Debug Sticks
 * add-on.
 *
 * @hideconstructor
 */
export class Events_andexdb {
    constructor() { }
    /**
     * A set of events that fire before an actual action occurs. In
     * most cases, you can potentially cancel or modify the
     * impending event. Note that in before events any APIs that
     * modify gameplay state will not function and will throw an
     * error. (e.g., dimension.spawnEntity)
     */
    static get beforeEvents() {
        return new Events_andexdbBeforeEvents();
    }
    /**
     * Provides a set of events that fire within the broader
     * scripting system within 8Crafter's Server Utilities & Debug
     * Sticks add-on.
     */
    static get afterEvents() {
        return new Events_andexdbAfterEvents();
    }
}
/**
 * A set of events that fire before an actual action occurs. In
 * most cases, you can potentially cancel or modify the
 * impending event. Note that in before events any APIs that
 * modify gameplay state will not function and will throw an
 * error. (e.g., dimension.spawnEntity)
 */
export class Events_andexdbBeforeEvents {
    constructor() { }
    get modifiedChatMessageFormat() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "andexdb.beforeEvents.modifiedChatMessageFormat",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "andexdb.beforeEvents.modifiedChatMessageFormat")
                    throw new ReferenceError("Subscription must be for the andexdb.beforeEvents.modifiedChatMessageFormat event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"andexdb.beforeEvents.modifiedChatMessageFormat">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.andexdb.beforeEvents.modifiedChatMessageFormat.filter(() => true);
            },
        };
    }
    get modifiedChatMessageFormatFinalization() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "andexdb.beforeEvents.modifiedChatMessageFormatFinalization",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "andexdb.beforeEvents.modifiedChatMessageFormatFinalization")
                    throw new ReferenceError("Subscription must be for the andexdb.beforeEvents.modifiedChatMessageFormatFinalization event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"andexdb.beforeEvents.modifiedChatMessageFormatFinalization">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.andexdb.beforeEvents.modifiedChatMessageFormatFinalization.filter(() => true);
            },
        };
    }
    get modifiedChatMessageSend() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "andexdb.beforeEvents.modifiedChatMessageSend",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "andexdb.beforeEvents.modifiedChatMessageSend")
                    throw new ReferenceError("Subscription must be for the andexdb.beforeEvents.modifiedChatMessageSend event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"andexdb.beforeEvents.modifiedChatMessageSend">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.andexdb.beforeEvents.modifiedChatMessageSend.filter(() => true);
            },
        };
    }
}
/**
 * Provides a set of events that fire within the broader
 * scripting system within 8Crafter's Server Utilities & Debug
 * Sticks add-on.
 */
export class Events_andexdbAfterEvents {
    constructor() { }
    get modifiedChatMessageSend() {
        return {
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
            subscribe(callback) {
                if (callback === "")
                    throw new TypeError("Event subscription callback cannot be empty.");
                if (typeof callback !== "string")
                    throw new TypeError("Event subscription callback must be a string.");
                if (eval("typeof (" + callback + ")") !== "function") {
                    throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
                }
                const subscription = Events.registerSubscription({
                    code: callback,
                    eventType: "andexdb.afterEvents.modifiedChatMessageSend",
                    saveID: `EventSubscription:${getSuperUniqueID()}`,
                });
                return subscription;
            },
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
            unsubscribe(subscription) {
                if (!(subscription instanceof SubscribedEvent))
                    throw new TypeError("Subscription must be an instance of SubscribedEvent.");
                if (subscription.eventType !== "andexdb.afterEvents.modifiedChatMessageSend")
                    throw new ReferenceError("Subscription must be for the andexdb.afterEvents.modifiedChatMessageSend event.");
                subscription.delete();
            },
            /**
             * Gets all event subscriptions to this event type.
             *
             * @returns {SubscribedEvent<"andexdb.afterEvents.modifiedChatMessageSend">[]} The event subscriptions.
             */
            getAll() {
                return Events.loadedEvents.andexdb.afterEvents.modifiedChatMessageSend.filter(() => true);
            },
        };
    }
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
export class andexdb_ModifiedChatMessageFormatBeforeEventSignal {
    constructor() { }
    /**
     * The callbacks that will be called before new modified chat
     * messages are formatted.
     *
     * @type {((arg0: andexdb_ModifiedChatMessageFormatBeforeEvent) => void)[]}
     */
    static callbacks = [];
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
    subscribe(callback) {
        andexdb_ModifiedChatMessageFormatBeforeEventSignal.callbacks.push(callback);
        return callback;
    }
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
    unsubscribe(callback) {
        const index = andexdb_ModifiedChatMessageFormatBeforeEventSignal.callbacks.indexOf(callback);
        if (index !== -1)
            andexdb_ModifiedChatMessageFormatBeforeEventSignal.callbacks.splice(index, 1);
    }
}
/**
 * An event that fires before a modified chat message is formatted.
 *
 * This is fired before the message is formatted, the formatted message is then passed to the {@link andexdb_ModifiedChatMessageFormatFinalizationBeforeEvent} event.
 *
 * This is triggered by the chat ranks system of the add-on, if the chat ranks system is disabled this event will never fire.
 */
export class andexdb_ModifiedChatMessageFormatBeforeEvent {
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
    constructor(data, strict = true) {
        if (strict) {
            if (arguments.length !== 1)
                throw new TypeError(`Incorrect number of arguments to function. Expected 1, received ${arguments.length}.`);
            if (data === null)
                throw new TypeError(`Null data passed to andexdb_ModifiedChatMessageFormatBeforeEvent constructor.`);
            if (typeof data !== "object")
                throw new TypeError(`Data passed to andexdb_ModifiedChatMessageFormatBeforeEvent constructor must be an object.`);
            if (data.cancel === undefined)
                throw new TypeError(`Missing "cancel" property in data passed to andexdb_ModifiedChatMessageFormatBeforeEvent constructor.`);
            if (data.message === undefined)
                throw new TypeError(`Missing "message" property in data passed to andexdb_ModifiedChatMessageFormatBeforeEvent constructor.`);
            if (data.sender === undefined)
                throw new TypeError(`Missing "sender" property in data passed to andexdb_ModifiedChatMessageFormatBeforeEvent constructor.`);
            if (data.originalMessage === undefined)
                throw new TypeError(`Missing "originalMessage" property in data passed to andexdb_ModifiedChatMessageFormatBeforeEvent constructor.`);
            if (typeof data.cancel !== "boolean")
                throw new TypeError(`"cancel" property in data passed to andexdb_ModifiedChatMessageFormatBeforeEvent constructor must be a boolean.`);
            if (typeof data.message !== "string")
                throw new TypeError(`"message" property in data passed to andexdb_ModifiedChatMessageFormatBeforeEvent constructor must be a string.`);
            if (!(data.sender instanceof Player))
                throw new TypeError(`"sender" property in data passed to andexdb_ModifiedChatMessageFormatBeforeEvent constructor must be a Player.`);
            if (typeof data.originalMessage !== "string")
                throw new TypeError(`"originalMessage" property in data passed to andexdb_ModifiedChatMessageFormatBeforeEvent constructor must be a string.`);
            if (data.targets !== undefined && !Array.isArray(data.targets))
                throw new TypeError(`"targets" property in data passed to andexdb_ModifiedChatMessageFormatBeforeEvent constructor must be either undefined or an array of Players.`);
        }
        this.cancel = data?.cancel;
        this.message = data?.message;
        this.sender = data?.sender;
        this.targets = data?.targets;
        this.originalMessage = data?.originalMessage;
        this.formatOptions = data?.formatOptions;
        this.nameTag = data?.nameTag;
    }
    /**
     * @remarks
     * If set to true, the message will not be sent.
     *
     * @default false
     */
    cancel;
    /**
     * @remarks
     * The original chat message.
     */
    originalMessage;
    sender;
    targets;
    /**
     * @remarks
     * The message that will be formatted.
     */
    message;
    /**
     * @remarks
     * The options for the formatting, see {@link TagChatMessageFormat}.
     */
    formatOptions;
    /**
     * @remarks
     * The sender's evaluated name tag.
     */
    nameTag;
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
export class andexdb_ModifiedChatMessageFormatFinalizationBeforeEventSignal {
    constructor() { }
    /**
     * The callbacks that will be called before new formatted chat
     * messages are finalized.
     *
     * @type {((arg0: andexdb_ModifiedChatMessageFormatFinalizationBeforeEvent) => void)[]}
     */
    static callbacks = [];
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
    subscribe(callback) {
        andexdb_ModifiedChatMessageFormatFinalizationBeforeEventSignal.callbacks.push(callback);
        return callback;
    }
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
    unsubscribe(callback) {
        const index = andexdb_ModifiedChatMessageFormatFinalizationBeforeEventSignal.callbacks.indexOf(callback);
        if (index !== -1)
            andexdb_ModifiedChatMessageFormatFinalizationBeforeEventSignal.callbacks.splice(index, 1);
    }
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
export class andexdb_ModifiedChatMessageFormatFinalizationBeforeEvent {
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
    constructor(data, strict = true) {
        if (strict) {
            if (arguments.length !== 1)
                throw new TypeError(`Incorrect number of arguments to function. Expected 1, received ${arguments.length}.`);
            if (data === null)
                throw new TypeError(`Null data passed to andexdb_ModifiedChatMessageFormatFinalizationBeforeEvent constructor.`);
            if (typeof data !== "object")
                throw new TypeError(`Data passed to andexdb_ModifiedChatMessageFormatFinalizationBeforeEvent constructor must be an object.`);
            if (data.cancel === undefined)
                throw new TypeError(`Missing "cancel" property in data passed to andexdb_ModifiedChatMessageFormatFinalizationBeforeEvent constructor.`);
            if (data.message === undefined)
                throw new TypeError(`Missing "message" property in data passed to andexdb_ModifiedChatMessageFormatFinalizationBeforeEvent constructor.`);
            if (data.sender === undefined)
                throw new TypeError(`Missing "sender" property in data passed to andexdb_ModifiedChatMessageFormatFinalizationBeforeEvent constructor.`);
            if (typeof data.cancel !== "boolean")
                throw new TypeError(`"cancel" property in data passed to andexdb_ModifiedChatMessageFormatFinalizationBeforeEvent constructor must be a boolean.`);
            if (typeof data.message !== "string")
                throw new TypeError(`"message" property in data passed to andexdb_ModifiedChatMessageFormatFinalizationBeforeEvent constructor must be a string.`);
            if (!(data.sender instanceof Player))
                throw new TypeError(`"sender" property in data passed to andexdb_ModifiedChatMessageFormatFinalizationBeforeEvent constructor must be a Player.`);
            if (data.targets !== undefined && !Array.isArray(data.targets))
                throw new TypeError(`"targets" property in data passed to andexdb_ModifiedChatMessageFormatFinalizationBeforeEvent constructor must be either undefined or an array of Players.`);
        }
        this.cancel = data?.cancel;
        this.message = data?.message;
        this.sender = data?.sender;
        this.targets = data?.targets;
        this.originalMessage = data?.originalMessage;
        this.tokenData = data?.tokenData;
    }
    /**
     * @remarks
     * If set to true, the message will not be sent.
     *
     * @default false
     */
    cancel;
    /**
     * @remarks
     * The original chat message.
     */
    originalMessage;
    sender;
    targets;
    /**
     * @remarks
     * The message that was formatted.
     */
    message;
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
    tokenData;
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
export class andexdb_ModifiedChatMessageSendBeforeEventSignal {
    constructor() { }
    /**
     * The callbacks that will be called before new modified chat
     * messages are sent.
     *
     * @type {((arg0: andexdb_ModifiedChatMessageSendBeforeEvent) => void)[]}
     */
    static callbacks = [];
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
    subscribe(callback) {
        andexdb_ModifiedChatMessageSendBeforeEventSignal.callbacks.push(callback);
        return callback;
    }
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
    unsubscribe(callback) {
        const index = andexdb_ModifiedChatMessageSendBeforeEventSignal.callbacks.indexOf(callback);
        if (index !== -1)
            andexdb_ModifiedChatMessageSendBeforeEventSignal.callbacks.splice(index, 1);
    }
}
/**
 * An event that fires before a modified chat message is sent.
 *
 * This is triggered by the chat ranks system of the add-on, if the chat ranks system is disabled this event will never fire.
 */
export class andexdb_ModifiedChatMessageSendBeforeEvent {
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
    constructor(data, strict = true) {
        if (strict) {
            if (arguments.length !== 1)
                throw new TypeError(`Incorrect number of arguments to function. Expected 1, received ${arguments.length}.`);
            if (data === null)
                throw new TypeError(`Null data passed to andexdb_ModifiedChatMessageSendBeforeEvent constructor.`);
            if (typeof data !== "object")
                throw new TypeError(`Data passed to andexdb_ModifiedChatMessageSendBeforeEvent constructor must be an object.`);
            if (data.cancel === undefined)
                throw new TypeError(`Missing "cancel" property in data passed to andexdb_ModifiedChatMessageSendBeforeEvent constructor.`);
            if (data.message === undefined)
                throw new TypeError(`Missing "message" property in data passed to andexdb_ModifiedChatMessageSendBeforeEvent constructor.`);
            if (data.sender === undefined)
                throw new TypeError(`Missing "sender" property in data passed to andexdb_ModifiedChatMessageSendBeforeEvent constructor.`);
            if (data.originalMessage === undefined)
                throw new TypeError(`Missing "newMessage" property in data passed to andexdb_ModifiedChatMessageSendBeforeEvent constructor.`);
            if (typeof data.cancel !== "boolean")
                throw new TypeError(`"cancel" property in data passed to andexdb_ModifiedChatMessageSendBeforeEvent constructor must be a boolean.`);
            if (typeof data.message !== "string")
                throw new TypeError(`"message" property in data passed to andexdb_ModifiedChatMessageSendBeforeEvent constructor must be a string.`);
            if (!(data.sender instanceof Player))
                throw new TypeError(`"sender" property in data passed to andexdb_ModifiedChatMessageSendBeforeEvent constructor must be a Player.`);
            if (typeof data.originalMessage !== "string")
                throw new TypeError(`"originalMessage" property in data passed to andexdb_ModifiedChatMessageSendBeforeEvent constructor must be a string.`);
            if (data.targets !== undefined && !Array.isArray(data.targets))
                throw new TypeError(`"targets" property in data passed to andexdb_ModifiedChatMessageSendBeforeEvent constructor must be either undefined or an array of Players.`);
        }
        this.cancel = data?.cancel;
        this.message = data?.message;
        this.sender = data?.sender;
        this.targets = data?.targets;
        this.originalMessage = data?.originalMessage;
        this.tokenData = data?.tokenData;
        this.formatOptions = data?.formatOptions;
        this.nameTag = data?.nameTag;
    }
    /**
     * @remarks
     * If set to true, the message will not be sent.
     *
     * @default false
     */
    cancel;
    /**
     * @remarks
     * The original chat message.
     */
    originalMessage;
    sender;
    targets;
    /**
     * @remarks
     * The fully modified chat message, including ranks, prefixes, etc.
     *
     * Modifications to this property will change what is sent.
     *
     * The final message printed to the chat will be exactly what this string is set to.
     */
    message;
    /**
     * @remarks
     * The evaluated message format token data that was used.
     */
    tokenData;
    /**
     * @remarks
     * The options that were used to format the message, see {@link TagChatMessageFormat}.
     */
    formatOptions;
    /**
     * @remarks
     * The sender's evaluated name tag that was used.
     */
    nameTag;
}
/**
 * Manages callbacks that are connected to modified chat messages being
 * sent.
 *
 * These callbacks are triggered by the chat ranks system of the add-on, if the chat ranks system is disabled these callbacks will never fire.
 *
 * Note: If the modified chat message send event is cancelled from a subscription to {@link Events.andexdb.afterEvents.modifiedChatMessageSend}, this event will not fire.
 */
export class andexdb_ModifiedChatMessageSendAfterEventSignal {
    constructor() { }
    /**
     * The callbacks that will be called when new modified
     * chat messages are sent.
     *
     * @type {((arg0: andexdb_ModifiedChatMessageSendAfterEvent) => void)[]}
     */
    static callbacks = [];
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
    subscribe(callback) {
        andexdb_ModifiedChatMessageSendAfterEventSignal.callbacks.push(callback);
        return callback;
    }
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
    unsubscribe(callback) {
        const index = andexdb_ModifiedChatMessageSendAfterEventSignal.callbacks.indexOf(callback);
        if (index !== -1)
            andexdb_ModifiedChatMessageSendAfterEventSignal.callbacks.splice(index, 1);
    }
}
/**
 * An event that fires after a modified chat message is sent.
 *
 * This is triggered by the chat ranks system of the add-on, if the chat ranks system is disabled this event will never fire.
 */
export class andexdb_ModifiedChatMessageSendAfterEvent {
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
    constructor(data, strict = true) {
        if (strict) {
            if (arguments.length !== 1)
                throw new TypeError(`Incorrect number of arguments to function. Expected 1, received ${arguments.length}.`);
            if (data === null)
                throw new TypeError(`Null data passed to andexdb_ModifiedChatMessageSendAfterEvent constructor.`);
            if (typeof data !== "object")
                throw new TypeError(`Data passed to andexdb_ModifiedChatMessageSendAfterEvent constructor must be an object.`);
            if (data.message === undefined)
                throw new TypeError(`Missing "message" property in data passed to andexdb_ModifiedChatMessageSendAfterEvent constructor.`);
            if (data.sender === undefined)
                throw new TypeError(`Missing "sender" property in data passed to andexdb_ModifiedChatMessageSendAfterEvent constructor.`);
            if (data.originalMessage === undefined)
                throw new TypeError(`Missing "originalMessage" property in data passed to andexdb_ModifiedChatMessageSendAfterEvent constructor.`);
            if (typeof data.message !== "string")
                throw new TypeError(`"message" property in data passed to andexdb_ModifiedChatMessageSendAfterEvent constructor must be a string.`);
            if (!(data.sender instanceof Player))
                throw new TypeError(`"sender" property in data passed to andexdb_ModifiedChatMessageSendAfterEvent constructor must be a Player.`);
            if (typeof data.originalMessage !== "string")
                throw new TypeError(`"originalMessage" property in data passed to andexdb_ModifiedChatMessageSendAfterEvent constructor must be a string.`);
            if (data.targets !== undefined && !Array.isArray(data.targets))
                throw new TypeError(`"targets" property in data passed to andexdb_ModifiedChatMessageSendAfterEvent constructor must be either undefined or an array of Players.`);
        }
        this.message = data?.message;
        this.sender = data?.sender;
        this.targets = data?.targets;
        this.originalMessage = data?.originalMessage;
        this.formatOptions = data?.formatOptions;
        this.nameTag = data?.nameTag;
        this.tokenData = data?.tokenData;
    }
    /**
     * @remarks
     * The original chat message.
     */
    originalMessage;
    sender;
    targets;
    /**
     * @remarks
     * The fully modified chat message that was sent, including ranks, prefixes, etc.
     *
     * The final message that was printed to the chat was exactly what this string was set to.
     */
    message;
    /**
     * @remarks
     * The evaluated message format token data that was used.
     */
    tokenData;
    /**
     * @remarks
     * The options that were used to format the message, see {@link TagChatMessageFormat}.
     */
    formatOptions;
    /**
     * @remarks
     * The sender's evaluated name tag that was used.
     */
    nameTag;
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
export class andexdbBeforeEvents {
    constructor() { }
    /**
     * The instance of the `andexdbBeforeEvents` class.
     *
     * @type {andexdbBeforeEvents}
     */
    static instance = new andexdbBeforeEvents();
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
    modifiedChatMessageFormat = new andexdb_ModifiedChatMessageFormatBeforeEventSignal();
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
    modifiedChatMessageFormatFinalization = new andexdb_ModifiedChatMessageFormatFinalizationBeforeEventSignal();
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
    modifiedChatMessageSend = new andexdb_ModifiedChatMessageSendBeforeEventSignal();
}
/**
 * Provides a set of events that fire within the broader
 * scripting system within 8Crafter's Server Utilities & Debug
 * Sticks add-on.
 *
 * @hideconstructor
 */
export class andexdbAfterEvents {
    constructor() { }
    /**
     * The instance of the `andexdbAfterEvents` class.
     *
     * @type {andexdbAfterEvents}
     */
    static instance = new andexdbAfterEvents();
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
    modifiedChatMessageSend = new andexdb_ModifiedChatMessageSendAfterEventSignal();
}
const deepFreeze = (obj, changeTypes) => {
    if (obj && typeof obj === "object" && !Object.isFrozen(obj)) {
        Object.freeze(obj);
        Object.getOwnPropertyNames(obj).forEach((prop) => deepFreeze(obj[prop]));
    }
    return obj;
};
/**
 * An object that maps event types to their corresponding event signals.
 */
export const signalMap = deepFreeze({
    world: {
        beforeEvents: world.beforeEvents,
        afterEvents: world.afterEvents,
    },
    system: {
        beforeEvents: system.beforeEvents,
        afterEvents: system.afterEvents,
    },
    andexdb: {
        beforeEvents: andexdbBeforeEvents.instance,
        afterEvents: andexdbAfterEvents.instance,
    },
}, false);
// type SwitchesData = [buttonname: string, toggleevent: string, toggleTexture?: string];
// type Switches = SwitchesData[];
// type PluginData = [buttontext: string, texturepath: string, switches: Switches];
// const plugins: PluginData[] = [];
// const plugin: PluginData = ["test 1", "textures/ui/toggle_off", [["toggle 1", "/say hi", "textures/ui/toggle_on"]]]
// ${ase}const plugin = ["test 1", "textures/ui/toggle_off", [["toggle 1", "/say hi", "textures/ui/toggle_on"]]]; overworld.runCommand(`/scriptevent mcbepm:load_plugin ${JSON.stringify(plugin)}`)
var exports;
(function (exports) {
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
        static loadedEvents = {
            system: {
                beforeEvents: Object.fromEntries(Object.keys(system.beforeEvents.__proto__).map((key) => [key, []])),
                afterEvents: Object.fromEntries(Object.keys(system.afterEvents.__proto__).map((key) => [key, []])),
            },
            world: {
                beforeEvents: Object.fromEntries(Object.keys(world.beforeEvents.__proto__).map((key) => [key, []])),
                afterEvents: Object.fromEntries(Object.keys(world.afterEvents.__proto__).map((key) => [key, []])),
            },
            andexdb: {
                beforeEvents: Object.fromEntries(Object.keys(andexdbBeforeEvents.instance).map((key) => [key, []])),
                afterEvents: Object.fromEntries(Object.keys(andexdbAfterEvents.instance).map((key) => [key, []])),
            },
        };
        constructor() { }
        /**
         * Unloads all event subscriptions.
         */
        static unload() {
            this.deinitialize();
            this.loadedEvents.system = {
                beforeEvents: Object.fromEntries(Object.keys(system.beforeEvents.__proto__).map((key) => [key, []])),
                afterEvents: Object.fromEntries(Object.keys(system.afterEvents.__proto__).map((key) => [key, []])),
            };
            this.loadedEvents.world = {
                beforeEvents: Object.fromEntries(Object.keys(world.beforeEvents.__proto__).map((key) => [key, []])),
                afterEvents: Object.fromEntries(Object.keys(world.afterEvents.__proto__).map((key) => [key, []])),
            };
            this.loadedEvents.andexdb = {
                beforeEvents: Object.fromEntries(Object.keys(andexdbBeforeEvents.instance).map((key) => [key, []])),
                afterEvents: Object.fromEntries(Object.keys(andexdbAfterEvents.instance).map((key) => [key, []])),
            };
        }
        /**
         * Loads all event subscriptions that have been saved.
         *
         * @param {boolean} [initialize=true] Whether to initialize all loaded event subscriptions. Defaults to `true`.
         * @param {boolean} [clear=true] Whether to clear all existing loaded event subscriptions before loading the saved ones. Defaults to `true`.
         * @returns {{ key: `${SubscribedEventTypeID}[${number}].${"initialize" | "deinitialize"}`; error: Error; }[]} A list of errors that occurred while loading event subscriptions.
         */
        static load(initialize = true, clear = true) {
            const errors = [];
            const data = JSON.parse(getStringFromDynamicProperties("EventSubscriptions", `{"system": {"beforeEvents": {}, "afterEvents": {}}, "world": {"beforeEvents": {}, "afterEvents": {}}, "andexdb": {"beforeEvents": {}, "afterEvents": {}}}`));
            if (clear) {
                this.unload();
            }
            Object.keys(data.system.beforeEvents).forEach((key) => {
                data.system.beforeEvents[key].forEach((event) => {
                    try {
                        this.registerSubscription(event, undefined, initialize);
                    }
                    catch (e) {
                        errors.push(e);
                    }
                });
            });
            Object.keys(data.system.afterEvents).forEach((key) => {
                data.system.afterEvents[key].forEach((event) => {
                    try {
                        this.registerSubscription(event, undefined, initialize);
                    }
                    catch (e) {
                        errors.push(e);
                    }
                });
            });
            Object.keys(data.world.beforeEvents).forEach((key) => {
                data.world.beforeEvents[key].forEach((event) => {
                    try {
                        this.registerSubscription(event, undefined, initialize);
                    }
                    catch (e) {
                        errors.push(e);
                    }
                });
            });
            Object.keys(data.world.afterEvents).forEach((key) => {
                data.world.afterEvents[key].forEach((event) => {
                    try {
                        this.registerSubscription(event, undefined, initialize);
                    }
                    catch (e) {
                        errors.push(e);
                    }
                });
            });
            Object.keys(data.andexdb.beforeEvents).forEach((key) => {
                data.andexdb.beforeEvents[key].forEach((event) => {
                    try {
                        this.registerSubscription(event, undefined, initialize);
                    }
                    catch (e) {
                        errors.push(e);
                    }
                });
            });
            Object.keys(data.andexdb.afterEvents).forEach((key) => {
                data.andexdb.afterEvents[key].forEach((event) => {
                    try {
                        this.registerSubscription(event, undefined, initialize);
                    }
                    catch (e) {
                        errors.push(e);
                    }
                });
            });
            return errors;
        }
        /**
         * Saves all event subscriptions that have been loaded.
         *
         * Note: If the event subscriptions have not been loaded, this will delete all saved event subscriptions.
         */
        static save() {
            const data = JSON.parse(JSON.stringify(this.loadedEvents));
            saveStringToDynamicProperties(JSON.stringify(data), "EventSubscriptions", true, 20000);
            [
                Object.values(this.loadedEvents.system.beforeEvents),
                Object.values(this.loadedEvents.system.afterEvents),
                Object.values(this.loadedEvents.world.beforeEvents),
                Object.values(this.loadedEvents.world.afterEvents),
                Object.values(this.loadedEvents.andexdb.beforeEvents),
                Object.values(this.loadedEvents.andexdb.afterEvents),
            ]
                .flat(2)
                .forEach((event) => {
                event.isSaved = true;
            });
        }
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
        static registerSubscription(data, save = true, initialize = true) {
            const subscription = new SubscribedEvent(data);
            let loadedEventsOfTypeRef = this.loadedEvents;
            data.eventType.split(".").forEach((key) => {
                loadedEventsOfTypeRef = loadedEventsOfTypeRef[key];
            });
            loadedEventsOfTypeRef.push(subscription);
            if (initialize && data.enabled !== false) {
                system.run(() => {
                    try {
                        subscription.initialize();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                });
            }
            if (save)
                Events.save();
            return subscription;
        }
        /**
         * Deinitializes all event subscriptions.
         *
         * @returns {{ key: `${SubscribedEventTypeID}[${number}].${"initialize" | "deinitialize"}`; error: Error; }[]} A list of errors that occurred while deinitializing event subscriptions.
         */
        static deinitialize() {
            const errors = [];
            Object.keys(this.loadedEvents).forEach((key) => {
                Object.keys(this.loadedEvents[key]).forEach((key2) => {
                    Object.keys(this.loadedEvents[key][key2]).forEach((key3) => {
                        this.loadedEvents[key][key2][key3].forEach((eventSubscription, i) => {
                            try {
                                eventSubscription.deinitialize();
                            }
                            catch (error) {
                                errors.push({ key: `${key}.${key2}.${key3}[${i}].deinitialize`, error });
                            }
                        });
                    });
                });
            });
            return errors;
        }
        /**
         * Initializes all event subscriptions.
         *
         * @returns {{ key: `${SubscribedEventTypeID}[${number}].${"initialize" | "deinitialize"}`; error: Error; }[]} A list of errors that occurred while initializing event subscriptions.
         */
        static initialize() {
            const errors = [];
            Object.keys(this.loadedEvents).forEach((key) => {
                Object.keys(this.loadedEvents[key]).forEach((key2) => {
                    Object.keys(this.loadedEvents[key][key2]).forEach((key3) => {
                        this.loadedEvents[key][key2][key3].forEach((eventSubscription, i) => {
                            try {
                                eventSubscription.initialize();
                            }
                            catch (error) {
                                errors.push({ key: `${key}.${key2}.${key3}[${i}].initialize`, error });
                            }
                        });
                    });
                });
            });
            return errors;
        }
        /**
         * Reinitializes all event subscriptions.
         *
         * This just runs {@link deinitialize} followed by {@link initialize}.
         *
         * @returns {{ key: `${SubscribedEventTypeID}[${number}].${"initialize" | "deinitialize"}`; error: Error; }[]} A list of errors that occurred while reinitializing event subscriptions.
         */
        static reinitialize() {
            const errors = [];
            errors.push(...this.deinitialize());
            errors.push(...this.initialize());
            return errors;
        }
        /**
         * The system events.
         *
         * @type {typeof Events_System}
         */
        static get system() {
            return Events_System;
        }
        /**
         * The world events.
         *
         * @type {typeof Events_World}
         */
        static get world() {
            return Events_World;
        }
        /**
         * The custom events from 8Crafter's Server Utilities & Debug Sticks add-on.
         *
         * @type {typeof Events_andexdb}
         */
        static get andexdb() {
            return Events_andexdb;
        }
        /**
         * An object containing references to the classes that contain the event signal classes.
         *
         * @type {typeof signalMap}
         */
        static get signals() {
            return signalMap;
        }
    }
    exports.Events = Events;
    /**
     * An event subscription.
     *
     * @template {SubscribedEventTypeID} EventTypeID The type ID of the event this subscription is for.
     * @template {SubscribableEventParameterTypeMap<EventSignal>} EventSignal The type of the event data for the event this subscription is for.
     */
    class SubscribedEvent {
        /**
         * Whether or not the event subscription has been initialized.
         *
         * @type {boolean}
         *
         * @default false
         */
        #initialized = false;
        /**
         * The initialized callback function for the event subscription.
         *
         * @type {((arg0: SubscribableEventParameterTypeMap<EventSignal>) => void) | undefined}
         *
         * @default undefined
         */
        #initializedCallback = undefined;
        /**
         * The type ID of the event this subscription is for.
         *
         * @type {EventTypeID}
         */
        #eventType;
        /**
         * A reference to the event signal for the event this subscription is for.
         *
         * @type {EventSignal}
         */
        #eventTypeSignalReference;
        /**
         * A reference to the array of loaded event subscriptions for the event this subscription is for.
         *
         * @type {SubscribedEvent<EventTypeID, EventSignal>[]}
         */
        #eventTypeLoadedEventsReference;
        /**
         * Whether or not the event subscription has been saved.
         *
         * @type {boolean}
         *
         * @default false
         */
        isSaved = false;
        /**
         * Whether or not the event subscription has been initialized.
         *
         * @type {boolean}
         *
         * @default false
         */
        get initialized() {
            return this.#initialized;
        }
        /**
         * The data for the event subscription.
         *
         * @type {Full<SubscribedEventSavedData<EventTypeID>>}
         */
        data;
        /**
         * The type ID of the event this subscription is for.
         *
         * @type {EventTypeID}
         */
        get eventType() {
            return this.#eventType;
        }
        /**
         * A reference to the event signal for the event this subscription is for.
         *
         * @type {EventSignal}
         */
        get eventTypeSignalReference() {
            return this.#eventTypeSignalReference;
        }
        /**
         * A reference to the array of loaded event subscriptions for the event this subscription is for.
         *
         * @type {SubscribedEvent<EventTypeID, EventSignal>[]}
         */
        get eventTypeLoadedEventsReference() {
            return this.#eventTypeLoadedEventsReference;
        }
        /**
         * Whether or not the event subscription is valid.
         *
         * True if the event is loaded, false otherwise.
         *
         * @type {boolean}
         */
        get isValid() {
            return this.#eventTypeLoadedEventsReference.includes(this);
        }
        /**
         * The creation time of the event subscription.
         *
         * Undefined if the format of the save ID is not recognized.
         *
         * @type {number | undefined}
         *
         * @default undefined
         */
        get creationTime() {
            const creationTime = this.data.saveID.match(/^EventSubscription:([0-9]+)\_/)?.[1];
            return creationTime ? Number(creationTime) : undefined;
        }
        /**
         * The last time the event subscription was modified.
         *
         * @type {number | undefined}
         *
         * @default this.creationTime
         */
        get lastModified() {
            return this.data.metadata.lastModified ?? this.creationTime;
        }
        /**
         * Creates a new event subscription.
         *
         * @param {SubscribedEventSavedData<EventTypeID>} data The data for the event subscription.
         * @param {boolean} [isSaved=false] Whether or not the event subscription has already been saved.
         *
         * @throws {TypeError} If the event type is unsupported.
         * @throws {TypeError} If the loaded event subscriptions list for the event type is not an array.
         */
        constructor(data, isSaved = false) {
            this.data = { enabled: true, metadata: {}, ...data };
            this.isSaved = isSaved;
            this.#eventType = data.eventType;
            let signalRef = {
                world: {
                    beforeEvents: world.beforeEvents,
                    afterEvents: world.afterEvents,
                },
                system: {
                    beforeEvents: system.beforeEvents,
                    afterEvents: system.afterEvents,
                },
                andexdb: {
                    beforeEvents: andexdbBeforeEvents.instance,
                    afterEvents: andexdbAfterEvents.instance,
                },
            };
            let loadedEventsOfTypeRef = Events.loadedEvents;
            data.eventType.split(".").forEach((key) => {
                signalRef = signalRef[key];
                loadedEventsOfTypeRef = loadedEventsOfTypeRef[key];
            });
            this.#eventTypeSignalReference = signalRef;
            if (!loadedEventsOfTypeRef) {
                throw new TypeError(`Unsupported event type: ${JSON.stringify(data.eventType)}.`);
            }
            if (!(loadedEventsOfTypeRef instanceof Array)) {
                throw new TypeError(`Broken event type: ${JSON.stringify(data.eventType)}. The loaded events list for this event type is not an array.`);
            }
            this.#eventTypeLoadedEventsReference = loadedEventsOfTypeRef;
        }
        /**
         * The initialized callback function for the event subscription.
         *
         * @type {((arg0: SubscribableEventParameterTypeMap<EventSignal>) => void) | undefined}
         */
        get initializedCallback() {
            return this.#initializedCallback;
        }
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
        initialize() {
            if (!this.data.enabled) {
                throw new Error("Event subscription cannot be initialized, as it is disabled. Please set data.enabled to true to initialize this event.");
            }
            if (this.#initializedCallback) {
                throw new Error("Event subscription callback already initialized.");
            }
            if (this.#initialized) {
                throw new Error("Event subscription already initialized.");
            }
            if (this.data.code === "")
                throw new TypeError("Event subscription callback cannot be empty.");
            if (typeof this.data.code !== "string")
                throw new TypeError("Event subscription callback must be a string.");
            const callback = eval("(" + this.data.code + ")");
            if (typeof callback !== "function") {
                throw new TypeError("Event subscription callback is a string but is not a valid stringified JavaScript function.");
            }
            this.#initializedCallback = callback;
            try {
                this.#eventTypeSignalReference.subscribe(this.#initializedCallback);
            }
            catch (e) {
                this.#initializedCallback = undefined;
                throw e;
            }
            return (this.#initialized = true);
        }
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
        deinitialize() {
            if (!this.#initializedCallback) {
                throw new Error("Event subscription callback not initialized.");
            }
            if (!this.#initialized) {
                throw new Error("Event subscription not initialized.");
            }
            try {
                this.#eventTypeSignalReference.unsubscribe(this.#initializedCallback);
            }
            catch (e) {
                throw e;
            }
            this.#initializedCallback = undefined;
            return (this.#initialized = false);
        }
        /**
         * Disables the event subscription.
         *
         * @returns {boolean} A boolean representing whether or not the subscription was successfully disabled, if the event is already disabled, false is returned, otherwise true.
         */
        disable() {
            if (!this.data.enabled) {
                return false;
            }
            else {
                return !(this.data.enabled = false);
            }
        }
        /**
         * Enables the event subscription.
         *
         * @returns {boolean} A boolean representing whether or not the subscription was successfully enabled, if the event is already enabled, false is returned, otherwise true.
         */
        enable() {
            if (this.data.enabled) {
                return false;
            }
            else {
                return (this.data.enabled = true);
            }
        }
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
        delete() {
            const saved = this.isSaved;
            const loaded = this.isValid;
            const initialized = this.#initialized;
            if (initialized)
                this.deinitialize();
            if (loaded) {
                this.#eventTypeLoadedEventsReference.splice(this.#eventTypeLoadedEventsReference.indexOf(this), 1);
                if (saved) {
                    this.isSaved = false;
                    Events.save();
                }
            }
            else if (saved) {
                this.isSaved = false;
                Events.save();
            }
        }
        /**
         * Returns the data for the event subscription.
         *
         * @returns {Full<SubscribedEventSavedData<EventTypeID>>}
         */
        toJSON() {
            return this.data;
        }
    }
    exports.SubscribedEvent = SubscribedEvent;
})(exports || (exports = {}));
export var SubscribedEvent = exports.SubscribedEvent;
export var Events = exports.Events;
Object.defineProperties(globalThis, {
    Events: {
        enumerable: true,
        configurable: false,
        writable: false,
        value: exports.Events,
    },
    SubscribedEvent: {
        enumerable: true,
        configurable: false,
        writable: false,
        value: exports.SubscribedEvent,
    },
});
// Load and initialize the saved events.
exports.Events.load(true, false);
// Trigger the worldLoad after even if it was registered too late.
if (globalThis.initializeTick !== -1 &&
    exports.Events?.loadedEvents?.world?.afterEvents?.worldLoad &&
    exports.Events.loadedEvents.world.afterEvents.worldLoad.length > 0) {
    exports.Events.loadedEvents.world.afterEvents.worldLoad.forEach((event) => {
        event.initializedCallback?.({});
    });
}
// world.setDynamicProperty(
//     "evalAfterEvents:worldLoad",
//     `system.runTimeout(() => {
//     if (globalThis.modules.semver.gt(globalThis.format_version, "1.40.2")) return world.setDynamicProperty("evalAfterEvents:worldLoad");
//     globalThis.Events.loadedEvents.world.afterEvents.worldLoad.forEach((event) => {
//         event.initializedCallback?.({});
//     });
// }, 5);`
// );
//# sourceMappingURL=events.js.map