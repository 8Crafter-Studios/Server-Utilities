/**
 * modules/ui/functions/manageEventSubscriptions.ts
 * @module
 * @description This file contains functions related the manage event subscriptions menu.
 */
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { customFormUICodes } from "../constants/customFormUICodes";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import { showMessage } from "modules/utilities/functions/showMessage";
import { showActions } from "modules/utilities/functions/showActions";
import moment from "moment";
import { securityVariables } from "security/ultraSecurityModeUtils";
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
export async function manageEventSubscriptions_event(sourceEntity, eventType, pagen = 0, maxentriesperpage = config.ui.pages.maxPlayersPerManagePlayersPage ?? 9, search, cachedEntries) {
    let loadedEventsOfTypeRef = Events.loadedEvents;
    eventType.split(".").forEach((key) => {
        loadedEventsOfTypeRef = loadedEventsOfTypeRef[key];
    });
    if (!loadedEventsOfTypeRef) {
        throw new TypeError(`Unsupported event type: ${JSON.stringify(eventType)}.`);
    }
    if (!(loadedEventsOfTypeRef instanceof Array)) {
        throw new TypeError(`Broken event type: ${JSON.stringify(eventType)}. The loaded events list for this event type is not an array.`);
    }
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    var currentParameters = {
        player,
        pagen: pagen,
        maxentriesperpage,
        search,
        cachedEntries,
    };
    while (true) {
        const { player, pagen, maxentriesperpage, search, cachedEntries } = currentParameters;
        const form = new ActionFormData();
        const page = Math.max(0, pagen ?? 0);
        let displayEntries = cachedEntries ?? [];
        if (cachedEntries === undefined) {
            displayEntries = loadedEventsOfTypeRef.filter((v) => !!search
                ? search.caseSensitive == true
                    ? (v.data.metadata.displayName ?? "Untitled Event Subscription").includes(search.value)
                    : (v.data.metadata.displayName ?? "Untitled Event Subscription").toLowerCase().includes(search.value.toLowerCase())
                : true) /*
                .sort((a: SubscribedEvent<EventTypeID>, b: SubscribedEvent<EventTypeID>) =>
                    (a.data.metadata.displayName ?? "Untitled Event Subscription") > (b.data.metadata.displayName ?? "Untitled Event Subscription")
                        ? 1
                        : (a.data.metadata.displayName ?? "Untitled Event Subscription") < (b.data.metadata.displayName ?? "Untitled Event Subscription")
                        ? -1
                        : (a.creationTime ?? 0) - (b.creationTime ?? 0)
                ) */;
        }
        const numentries = displayEntries.length;
        form.title(`${customFormUICodes.action.titles.formStyles.medium}${!!search ? "Search Results" : `Event Subscriptions`} ${Math.min(numentries, page * maxentriesperpage + 1)}-${Math.min(numentries, (page + 1) * maxentriesperpage)} of ${numentries}`);
        const numpages = Math.ceil(numentries / maxentriesperpage);
        if (!!search) {
            form.body(`\nSearching for: ${JSON.stringify(search.value)}\nCase Sensitive: ${JSON.stringify(search.caseSensitive ?? false)}\nEvent subscriptions for: ${eventType}`);
        }
        else {
            form.body(`Event Subscriptions for: ${eventType}`);
        }
        // Navigation and Filters
        form.button(customFormUICodes.action.buttons.positions.left_side_only + "Search", "textures/ui/spyglass_flat");
        form.button(customFormUICodes.action.buttons.positions.left_side_only +
            (page != 0 ? "" : customFormUICodes.action.buttons.options.disabled + "§8") +
            "Previous Page", "textures/ui/arrow_left");
        form.button(customFormUICodes.action.buttons.positions.left_side_only +
            (numpages > 1 ? "" : customFormUICodes.action.buttons.options.disabled + "§8") +
            "Go To Page", "textures/ui/page");
        form.button(customFormUICodes.action.buttons.positions.left_side_only +
            (page < numpages - 1 ? "" : customFormUICodes.action.buttons.options.disabled + "§8") +
            "Next Page", "textures/ui/arrow_right");
        form.button(customFormUICodes.action.buttons.positions.right_side_only + "New Subscription", "textures/ui/color_plus");
        // Padding
        form.button("");
        // Entries
        let displayEntriesB = displayEntries.slice(page * maxentriesperpage, (page + 1) * maxentriesperpage);
        displayEntriesB.forEach((v) => {
            form.button(customFormUICodes.action.buttons.positions.main_only + (v.data.metadata.displayName ?? "Untitled Event Subscription"), v.data.metadata.displayIcon);
        });
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh", "textures/ui/refresh");
        try {
            const r = await form.forceShow(player);
            if (r.canceled)
                return 1;
            switch (["search", "previous", "go", "next", "newSubscription", "", undefined][r.selection] ??
                (!!displayEntriesB[r.selection - 6] ? "entry" : undefined) ??
                ["back", "close", "refresh"][r.selection - displayEntriesB.length - 6]) {
                case "search":
                    {
                        const r = await tryget(async () => await new ModalFormData()
                            .title("Search")
                            .textField("", "Search", { defaultValue: search?.value ?? "" })
                            .toggle("Case Sensitive", { defaultValue: search?.caseSensitive ?? false })
                            .submitButton("Search")
                            .forceShow(player));
                        if (!!!r || r.canceled == true) {
                            continue;
                        }
                        currentParameters = {
                            player,
                            pagen: undefined,
                            maxentriesperpage,
                            search: {
                                value: r.formValues[0],
                                caseSensitive: r.formValues[1],
                            },
                            cachedEntries: undefined,
                        };
                    }
                    continue;
                case "previous":
                    currentParameters = { player, pagen: Math.max(0, page - 1), maxentriesperpage, search, cachedEntries };
                    continue;
                case "go": {
                    const r = await tryget(async () => await new ModalFormData()
                        .title("Go To Page")
                        .textField(`Current Page: ${page + 1}\nPage # (Between 1 and ${numpages})`, "Page #")
                        .submitButton("Go To Page")
                        .forceShow(player));
                    if (!r || r.canceled)
                        continue;
                    currentParameters = {
                        player,
                        pagen: Math.max(1, Math.min(numpages, r.formValues?.[0]?.toNumber() ?? page + 1)) - 1,
                        maxentriesperpage,
                        search,
                        cachedEntries: displayEntries,
                    };
                    continue;
                }
                case "next":
                    currentParameters = { player, pagen: Math.min(numpages - 1, page + 1), maxentriesperpage, search, cachedEntries: displayEntries };
                    continue;
                case "newSubscription":
                    if ((await manageEventSubscriptions_event_newSubscription(player, eventType)) === 1) {
                        currentParameters = { player, pagen: page, maxentriesperpage, search, cachedEntries: undefined };
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "entry":
                    if ((await manageEventSubscriptions_event_subscription(player, displayEntriesB[r.selection - 6])) === 1) {
                        currentParameters = { player, pagen: page, maxentriesperpage, search, cachedEntries: displayEntries };
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "refresh":
                    currentParameters = { player, pagen: page, maxentriesperpage, search, cachedEntries: undefined };
                    continue;
                case "back":
                    return 1;
                case "close":
                    return 0;
                default:
                    throw new Error(`Invalid selection: ${r.selection}`);
            }
        }
        catch (e) {
            console.error(e, e.stack);
            // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
            return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        }
    }
}
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
export async function manageEventSubscriptions_event_newSubscription(sourceEntity, eventType) {
    let eventRef = { system: Events.system, world: Events.world, andexdb: Events.andexdb };
    eventType.split(".").forEach((key) => {
        eventRef = eventRef[key];
    });
    if (!eventRef) {
        throw new TypeError(`Unsupported event type: ${JSON.stringify(eventType)}.`);
    }
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    const defaultOptions = {
        displayName: "",
        iconPath: "",
        code: "",
        enabled: true,
    };
    while (true) {
        const form = new ModalFormData();
        form.textField("Display Name", "string", { defaultValue: defaultOptions.displayName });
        form.textField("Icon Path", "texture path", { defaultValue: defaultOptions.iconPath });
        form.textField("Code\nex. (event)=>{event.cancel=true}", "JavaScript", { defaultValue: defaultOptions.code });
        form.toggle("Enabled", { defaultValue: defaultOptions.enabled });
        form.submitButton("Subscribe");
        const r = await form.forceShow(player);
        if (r.canceled)
            return 1;
        try {
            const subscription = eventRef.subscribe(r.formValues[2]);
            subscription.data.enabled = r.formValues[3];
            if (!subscription.data.enabled) {
                subscription.deinitialize();
            }
            subscription.data.metadata.displayName = r.formValues[0];
            subscription.data.metadata.displayIcon = r.formValues[1];
            Events.save();
            return 1;
        }
        catch (e) {
            if ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1) {
                defaultOptions.displayName = r.formValues[0];
                defaultOptions.iconPath = r.formValues[1];
                defaultOptions.code = r.formValues[2];
                defaultOptions.enabled = r.formValues[3];
                continue;
            }
            else {
                return 0;
            }
        }
    }
}
/**
 * Displays a menu to manage an event subscription.
 *
 * @template {SubscribedEventTypeID} EventTypeID The type ID of the event this event subscription is for.
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @param {SubscribedEvent<EventTypeID>} subscription - The event subscription to manage.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function manageEventSubscriptions_event_subscription(sourceEntity, subscription) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    const timeZone = player.timeZone;
    while (true) {
        try {
            const form = new ActionFormData();
            form.title(`${customFormUICodes.action.titles.formStyles.medium}Manage Event Subscription`);
            form.body(`Display Name: ${subscription.data.metadata.displayName ?? "Untitled Event Subscription"}\nEvent Type: ${subscription.data.eventType}\nExecution Order: ${subscription.eventTypeLoadedEventsReference.indexOf(subscription) === -1 ? "§c" : ""}${subscription.eventTypeLoadedEventsReference.indexOf(subscription)}§r\nCreation Date: ${subscription.creationTime
                ? `${formatDateTime(new Date(subscription.creationTime), timeZone) +
                    " UTC" +
                    (timeZone > 0 || Object.is(timeZone, 0) ? "+" : "") +
                    timeZone} (${moment(subscription.creationTime).fromNow(false)})`
                : "Unknown"}\nLast Modified: ${subscription.lastModified
                ? `${formatDateTime(new Date(subscription.lastModified), timeZone) +
                    " UTC" +
                    (timeZone > 0 || Object.is(timeZone, 0) ? "+" : "") +
                    timeZone} (${moment(subscription.lastModified).fromNow(false)})`
                : "Unknown"}`);
            form.button(customFormUICodes.action.buttons.positions.main_only + "Move", "textures/ui/move");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Settings", "textures/ui/icon_setting");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Edit Code", "textures/ui/pencil_edit_icon");
            form.button(customFormUICodes.action.buttons.positions.main_only + (subscription.data.enabled ? "§aEnabled" : "§cDisabled"), subscription.data.enabled ? "textures/ui/toggle_on" : "textures/ui/toggle_off");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Delete", "textures/ui/trash_default");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh", "textures/ui/refresh");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Raw Data", "textures/ui/debug_glyph_color");
            const r = await form.forceShow(player);
            if (r.canceled)
                return 1;
            switch (["move", "settings", "editCode", "toggle", "delete", "back", "close", "refresh", "rawData"][r.selection]) {
                case "move": {
                    const r = await showActions(player, customFormUICodes.action.titles.formStyles.medium + "Change Event Subscription Execution Order", "Would you like to move this event subscription above or below another event subscription?\nEvent Subscriptions will be executed from top to bottom.", [customFormUICodes.action.buttons.positions.main_only + "Move Above", "textures/ui/chevron_white_up"], [customFormUICodes.action.buttons.positions.main_only + "Move Below", "textures/ui/chevron_white_down"], [customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left"], [customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout"]);
                    if (r.canceled || r.selection === 2) {
                        continue;
                    }
                    if (r.selection === 3) {
                        return 0;
                    }
                    let form = new ActionFormData();
                    form.title(customFormUICodes.action.titles.formStyles.medium + "Change Event Subscription Execution Order");
                    form.body(`Select the event subscription you would like to move this event subscription ${r.selection === 0 ? "above" : "below"}.`);
                    subscription.eventTypeLoadedEventsReference.forEach((eventSubscription) => form.button(customFormUICodes.action.buttons.positions.main_only +
                        (eventSubscription.data.metadata.displayName ?? "Untitled Event Subscription"), eventSubscription.data.metadata.displayIcon));
                    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
                    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
                    const rb = await form.forceShow(player);
                    if (rb.canceled || rb.selection === subscription.eventTypeLoadedEventsReference.length) {
                        continue;
                    }
                    if (rb.selection === subscription.eventTypeLoadedEventsReference.length + 1) {
                        return 0;
                    }
                    const destinationIndex = rb.selection + r.selection;
                    subscription.eventTypeLoadedEventsReference.splice(subscription.eventTypeLoadedEventsReference.findIndex((eventSubscription) => eventSubscription === subscription), 1);
                    subscription.eventTypeLoadedEventsReference.splice(destinationIndex, 0, subscription);
                    Events.save();
                    if (subscription.data.enabled) {
                        let continueEnabled = true;
                        for (const eventSubscription of subscription.eventTypeLoadedEventsReference) {
                            if (!eventSubscription.data.enabled)
                                continue;
                            try {
                                eventSubscription.deinitialize();
                            }
                            catch (e) { }
                            try {
                                eventSubscription.initialize();
                            }
                            catch (e) {
                                console.error(e, e.stack);
                                if (eventSubscription === subscription) {
                                    if ((await showMessage(player, "An Error occurred", `An error occurred while initializing the event subscription: ${e}${e?.stack}`, "Back", "Close")).selection !== 1) {
                                        continueEnabled = true;
                                    }
                                    else {
                                        continueEnabled = false;
                                    }
                                }
                            }
                        }
                        if (!continueEnabled) {
                            return 0;
                        }
                    }
                    continue;
                }
                case "settings":
                    if ((await manageEventSubscriptions_event_subscription_settings(player, subscription)) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "editCode":
                    if ((await manageEventSubscriptions_event_subscription_editCode(player, subscription)) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "toggle":
                    subscription.data.enabled = !subscription.data.enabled;
                    Events.save();
                    if (subscription.data.enabled) {
                        let continueEnabled = true;
                        for (const eventSubscription of subscription.eventTypeLoadedEventsReference) {
                            if (!eventSubscription.data.enabled)
                                continue;
                            try {
                                eventSubscription.deinitialize();
                            }
                            catch (e) { }
                            try {
                                eventSubscription.initialize();
                            }
                            catch (e) {
                                console.error(e, e.stack);
                                if (eventSubscription === subscription) {
                                    if ((await showMessage(player, "An Error occurred", `An error occurred while initializing the event subscription: ${e}${e?.stack}`, "Back", "Close")).selection !== 1) {
                                        continueEnabled = true;
                                    }
                                    else {
                                        continueEnabled = false;
                                    }
                                }
                            }
                        }
                        if (!continueEnabled) {
                            return 0;
                        }
                    }
                    else {
                        subscription.deinitialize();
                    }
                    continue;
                case "delete":
                    if ((await showMessage(player, "Are you sure?", "Are you sure you want to delete this event subscription?\nThis action cannot be undone.", "Cancel", "Delete")).selection === 1) {
                        subscription.delete();
                        if ((await showMessage(player, "Event Subscription Deleted", "Successfully deleted the event subscription.", "Back", "Close"))
                            .selection !== 1) {
                            return 1;
                        }
                        else {
                            return 0;
                        }
                    }
                    else {
                        continue;
                    }
                case "back":
                    return 1;
                case "close":
                    return 0;
                case "refresh":
                    continue;
                case "rawData":
                    if ((await showActions(player, customFormUICodes.action.titles.formStyles.medium + "Raw Data", JSONB.stringify(subscription, undefined, 4), [customFormUICodes.action.buttons.positions.main_only + "Done"], [customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left"], [customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout"])).selection !== 2) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                default:
                    throw new Error("Invalid selection: " + r.selection);
            }
        }
        catch (e) {
            console.error(e, e.stack);
            // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
            return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        }
    }
}
/**
 * Displays a menu to manage an event subscription's settings.
 *
 * @template {SubscribedEventTypeID} EventTypeID The type ID of the event this event subscription is for.
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @param {SubscribedEvent<EventTypeID>} subscription - The event subscription to manage the settings for.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function manageEventSubscriptions_event_subscription_settings(sourceEntity, subscription) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    const form = new ModalFormData();
    form.textField("Display Name", "string", { defaultValue: subscription.data.metadata.displayName });
    form.textField("Icon Path", "texture path", { defaultValue: subscription.data.metadata.displayIcon });
    form.submitButton("Save");
    const r = await form.forceShow(player);
    if (r.canceled)
        return 1;
    let modified = false;
    if (r.formValues[0] !== "") {
        if (subscription.data.metadata.displayName !== r.formValues?.[0]) {
            subscription.data.metadata.displayName = r.formValues?.[0];
            modified = true;
        }
    }
    else {
        if ("displayName" in subscription.data.metadata) {
            delete subscription.data.metadata.displayName;
            modified = true;
        }
    }
    if (r.formValues[1] !== "") {
        if (subscription.data.metadata.displayIcon !== r.formValues?.[1]) {
            subscription.data.metadata.displayIcon = r.formValues?.[1];
            modified = true;
        }
    }
    else {
        if ("displayIcon" in subscription.data.metadata) {
            delete subscription.data.metadata.displayIcon;
            modified = true;
        }
    }
    if (modified) {
        subscription.data.metadata.lastModified = Date.now();
        Events.save();
    }
    return 1;
}
/**
 * Displays a menu to manage an event subscription's code.
 *
 * @template {SubscribedEventTypeID} EventTypeID The type ID of the event this event subscription is for.
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @param {SubscribedEvent<EventTypeID>} subscription - The event subscription to manage the code for.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function manageEventSubscriptions_event_subscription_editCode(sourceEntity, subscription) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    const form = new ModalFormData();
    form.textField("Code", "JavaScript", { defaultValue: subscription.data.code });
    form.submitButton("Save");
    const r = await form.forceShow(player);
    if (r.canceled)
        return 1;
    if (r.formValues?.[0] === subscription.data.code)
        return 1;
    subscription.data.code = r.formValues?.[0];
    subscription.data.metadata.lastModified = Date.now();
    Events.save();
    if (subscription.data.enabled) {
        let continueEnabled = true;
        for (const eventSubscription of subscription.eventTypeLoadedEventsReference) {
            if (!eventSubscription.data.enabled)
                continue;
            try {
                eventSubscription.deinitialize();
            }
            catch (e) { }
            try {
                eventSubscription.initialize();
            }
            catch (e) {
                console.error(e, e.stack);
                if (eventSubscription === subscription) {
                    if ((await showMessage(player, "An Error occurred", `An error occurred while initializing the event subscription: ${e}${e?.stack}`, "Back", "Close")).selection !== 1) {
                        continueEnabled = true;
                    }
                    else {
                        continueEnabled = false;
                    }
                }
            }
        }
        if (!continueEnabled) {
            return 0;
        }
    }
    return 1;
}
/**
 * Displays a menu to manage event subscriptions.
 *
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function manageEventSubscriptions(sourceEntity) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    while (true) {
        try {
            if (securityVariables.ultraSecurityModeEnabled) {
                if (securityVariables.testPlayerForPermission(player, "andexdb.accessAdvancedSettings") == false ||
                    securityVariables.testPlayerForPermission(player, "andexdb.useScriptEval") == false) {
                    const r = await showMessage(player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessAdvancedSettings, andexdb.useScriptEval.", "Back", "Cancel");
                    if (r.canceled || r.selection == 0) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
            }
            const form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.medium + "Manage Event Subscriptions");
            const eventCategories = Object.keys(Events.loadedEvents);
            eventCategories.forEach((e) => {
                const length = [
                    Object.keys(Events.loadedEvents[e]["beforeEvents"]).map((eB) => Events.loadedEvents[e]["beforeEvents"][eB].length),
                    Object.keys(Events.loadedEvents[e]["afterEvents"]).map((eB) => Events.loadedEvents[e]["afterEvents"][eB].length),
                ]
                    .flat()
                    .reduce((a, b) => a + b, 0);
                form.button(`${customFormUICodes.action.buttons.positions.main_only}${e}\n${length > 1 ? `${length} Subscriptions` : length === 1 ? "1 Subscription" : "No Subscriptions"}`);
            });
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh", "textures/ui/refresh");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only +
                "Reload Subscriptions\n§o§7Clears the list of currently loaded event subscriptions and loads the saved event subscriptions.§r", "textures/ui/reload_red");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Reinitialize Subscriptions\n§o§7Reloads the code of all event subscriptions.§r", "textures/ui/reload_black");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Statistics", "textures/ui/infobulb");
            const r = await form.forceShow(player);
            if (r.canceled)
                return 1;
            switch ((!!eventCategories[r.selection] ? "category" : undefined) ??
                ["back", "close", "refresh", "reloadSubscriptions", "reinitializeSubscriptions", "statistics"][r.selection - eventCategories.length]) {
                case "category":
                    if ((await manageEventSubscriptions_category_selectBeforeOrAfterEvents(player, eventCategories[r.selection])) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "back":
                    return 1;
                case "close":
                    return 0;
                case "refresh":
                    continue;
                case "reloadSubscriptions":
                    if ((await showMessage(player, "Are you sure?", "Are you sure you want to reload the list of currently loaded event subscriptions and load the saved event subscriptions?\nAny unsaved changes will be lost.\nThis action cannot be undone.", "Cancel", "Reload")).selection === 1) {
                        Events.load(true, true);
                        if ((await showMessage(player, "Subscriptions Reloaded", "Successfully reloaded the list of currently loaded event subscriptions and loaded the saved event subscriptions.", "Back", "Close")).selection !== 1) {
                            continue;
                        }
                        else {
                            return 0;
                        }
                    }
                    else {
                        continue;
                    }
                case "reinitializeSubscriptions":
                    Events.reinitialize();
                    continue;
                case "statistics":
                    if ((await manageEventSubscriptions_statistics(player)) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                default:
                    throw new Error("Invalid selection: " + r.selection);
            }
        }
        catch (e) {
            console.error(e, e.stack);
            // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
            return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        }
    }
}
export async function manageEventSubscriptions_statistics(sourceEntity) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    try {
        let form = new ActionFormData();
        form.title(`${customFormUICodes.action.titles.formStyles.fullscreen}Manage Event Subscriptions - Statistics`);
        const allEventSubscriptions = Object.values(Events.loadedEvents)
            .flatMap((v) => Object.values(v))
            .flatMap((v) => Object.values(v))
            .flat();
        form.body(`Total Event Subscriptions: ${allEventSubscriptions.length}
Total Event Subscriptions Enabled: ${allEventSubscriptions.filter((v) => v.data.enabled).length}
Total Event Subscriptions Disabled: ${allEventSubscriptions.filter((v) => !v.data.enabled).length}`);
        form.button(customFormUICodes.action.buttons.positions.main_only + "Done");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
        const r = await form.forceShow(player);
        if (r.selection === 2)
            return 0;
        return 1;
    }
    catch (e) {
        console.error(e, e.stack);
        // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
        return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    }
}
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
export async function manageEventSubscriptions_category_selectBeforeOrAfterEvents(sourceEntity, category) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    while (true) {
        try {
            const form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.medium + "Manage Event Subscriptions");
            form.body(`${category}`);
            const beforeEventsLength = Object.keys(Events.loadedEvents[category]["beforeEvents"])
                .map((e) => Events.loadedEvents[category]["beforeEvents"][e].length)
                .reduce((a, b) => a + b, 0);
            form.button(`${customFormUICodes.action.buttons.positions.main_only}Before Events\n${beforeEventsLength > 1 ? `${beforeEventsLength} Subscriptions` : beforeEventsLength === 1 ? "1 Subscription" : "No Subscriptions"}`);
            const afterEventsLength = Object.keys(Events.loadedEvents[category]["afterEvents"])
                .map((e) => Events.loadedEvents[category]["afterEvents"][e].length)
                .reduce((a, b) => a + b, 0);
            form.button(`${customFormUICodes.action.buttons.positions.main_only}After Events\n${afterEventsLength > 1 ? `${afterEventsLength} Subscriptions` : afterEventsLength === 1 ? "1 Subscription" : "No Subscriptions"}`);
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh", "textures/ui/refresh");
            const r = await form.forceShow(player);
            if (r.canceled)
                return 1;
            switch (["beforeEvents", "afterEvents", "back", "close", "refresh"][r.selection]) {
                case "beforeEvents":
                    if ((await manageEventSubscriptions_category(player, category, "beforeEvents")) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "afterEvents":
                    if ((await manageEventSubscriptions_category(player, category, "afterEvents")) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "refresh":
                    continue;
                case "back":
                    return 1;
                case "close":
                    return 0;
                default:
                    throw new Error("Invalid selection: " + r.selection);
            }
        }
        catch (e) {
            console.error(e, e.stack);
            // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
            return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        }
    }
}
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
export async function manageEventSubscriptions_category(sourceEntity, category, beforeOrAfter) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    while (true) {
        try {
            const form = new ActionFormData();
            form.title(`${customFormUICodes.action.titles.formStyles.medium}Manage Event Subscriptions`);
            form.body(`${category}.${beforeOrAfter}`);
            const events = Object.keys(Events.loadedEvents[category][beforeOrAfter]);
            events.forEach((e) => {
                const length = Events.loadedEvents[category][beforeOrAfter][e].length;
                form.button(`${customFormUICodes.action.buttons.positions.main_only}${e}\n${length > 1 ? `${length} Subscriptions` : length === 1 ? "1 Subscription" : "No Subscriptions"}`);
            });
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh", "textures/ui/refresh");
            const r = await form.forceShow(player);
            if (r.canceled)
                return 1;
            switch ((!!events[r.selection] ? "event" : undefined) ?? ["back", "close", "refresh"][r.selection - events.length]) {
                case "event":
                    if ((await manageEventSubscriptions_event(player, `${category}.${beforeOrAfter}.${events[r.selection]}`)) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "back":
                    return 1;
                case "close":
                    return 0;
                case "refresh":
                    continue;
                default:
                    throw new Error("Invalid selection: " + r.selection);
            }
        }
        catch (e) {
            console.error(e, e.stack);
            // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
            return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        }
    }
}
//# sourceMappingURL=manageEventSubscriptions.js.map