import { Player, Entity, type DimensionLocation, Dimension, EquipmentSlot, ContainerSlot, type ExplosionOptions, type RawMessage } from "@minecraft/server";
import { ModalFormData, ActionFormData, MessageFormData, ModalFormResponse, ActionFormResponse, MessageFormResponse } from "@minecraft/server-ui";
import { savedPlayer } from "./player_save";
import * as main from "Main";
import { executeCommandPlayerW } from "Main/commands";
export declare const ui_format_version = "1.17.0";
export declare const customFormDataTypes: (typeof ActionFormData | typeof MessageFormData | typeof ModalFormData)[];
export declare const customFormDataTypeIds: string[];
export declare const customElementTypes: (((label: RawMessage | string, placeholderText: RawMessage | string, defaultValue?: RawMessage | string) => ModalFormData) | ((label: RawMessage | string, options: (RawMessage | string)[], defaultValueIndex?: number) => ModalFormData) | ((label: RawMessage | string, defaultValue?: boolean) => ModalFormData) | ((label: RawMessage | string, minimumValue: number, maximumValue: number, valueStep: number, defaultValue?: number) => ModalFormData) | ((text: RawMessage | string, iconPath?: string) => ActionFormData) | ((text: RawMessage | string) => MessageFormData))[];
export declare const customElementTypeIds: string[];
export type ModalFormElements = ({
    type: "title";
    title: RawMessage | string;
} | {
    type: "textField";
    label: RawMessage | string;
    placeholderText: RawMessage | string;
    defaultValue?: RawMessage | string;
} | {
    type: "dropdown";
    label: RawMessage | string;
    options: (RawMessage | string)[];
    defaultValueIndex?: number;
} | {
    type: "toggle";
    label: RawMessage | string;
    defaultValue?: boolean;
} | {
    type: "slider";
    label: RawMessage | string;
    minimumValue: number;
    maximumValue: number;
    valueStep: number;
    defaultValue?: number;
} | {
    type: "submitButton";
    submitButtonText: RawMessage | string;
})[];
export declare function editCustomFormUI(UIId: String | string): {
    form: ModalFormData;
    variableList: string;
    indexList: number[];
    formB: ModalFormData;
    indexListB: number[];
};
export declare function showCustomFormUI(UIId: String, player: Player): {
    form: ActionFormData | MessageFormData | ModalFormData;
    customUI: {
        optionPropertyIds: string[];
        optionPropertyValues: string[];
        optionElements: main.customFormUIElement[];
        codeIds: string[];
        codeValues: string[];
        code: string;
    };
    optionElements: main.customFormUIElement[];
    formResponse: ActionFormResponse | MessageFormResponse | ModalFormResponse;
};
export declare function customFormUIEditor(UIId: string, player: Player, goBackToMenu?: boolean): void;
export declare function customFormUIEditorCode(UIId: string, player: Player, goBackToMenu?: boolean): void;
export declare function addNewCustomFormUI(player: Player, goBackToMenu?: boolean): void;
export declare function customFormListSelectionMenu(player: Player): void;
export declare function infiniteUI(player: Player): Promise<any | Error>;
export declare function infiniteUIv2(player: Player): number;
export declare function infiniteUIv3(player: Player, interval?: number, title?: string, body?: string, button?: string): number;
export declare function infiniteUIv4(player: Player, interval?: number, title?: string, body?: string, button?: string): number;
export declare function mainMenu(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<0 | 1>;
export declare function addonDebugUI(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<0 | 1>;
export declare function settings(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<0 | 1>;
export declare function advancedSettings(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<0 | 1>;
export declare function moderationSettings(sourceEntitya: Entity | executeCommandPlayerW | Player): void;
export declare function manageBans(sourceEntitya: Entity | executeCommandPlayerW | Player, backMenuFunction?: (sourceEntity: Entity | Player) => any): void;
export declare function globalSettings(sourceEntitya: Entity | executeCommandPlayerW | Player): void;
export declare const rankModes: {
    custom_simple: string;
    custom_advanced: string;
    style_1: string;
    style_2: string;
    style_3: string;
    style_4: string;
    style_5: string;
};
export declare const rankModesArray: string[];
export declare const rankModesArrayB: string[];
export declare function chatRanksSettings(sourceEntitya: Entity | executeCommandPlayerW | Player): void;
export declare function scriptSettings(sourceEntitya: Entity | executeCommandPlayerW | Player): void;
export declare function uiSettings(sourceEntitya: Entity | executeCommandPlayerW | Player): void;
export declare function homeSystemSettings(sourceEntitya: Entity | executeCommandPlayerW | Player): void;
export declare function tpaSettings(sourceEntitya: Entity | executeCommandPlayerW | Player): void;
export declare class PlayerNotifications {
    readonly player: Entity;
    constructor(player: Entity);
    get getAllChatCommands(): boolean;
    set getAllChatCommands(value: boolean);
    get getAllChatCommandsNotificationSound(): {
        soundId: string;
        pitch?: number;
        volume?: number;
    };
    set getAllChatCommandsNotificationSound(value: {
        soundId: string;
        pitch?: number;
        volume?: number;
    });
    get getAllChatMessages(): boolean;
    set getAllChatMessages(value: boolean);
    get getAllChatMessagesNotificationSound(): {
        soundId: string;
        pitch?: number;
        volume?: number;
    };
    set getAllChatMessagesNotificationSound(value: {
        soundId: string;
        pitch?: number;
        volume?: number;
    });
    get getGameRuleChangeNotifications(): boolean;
    set getGameRuleChangeNotifications(value: boolean);
    get getGameRuleChangeNotificationsNotificationSound(): {
        soundId: string;
        pitch?: number;
        volume?: number;
    };
    set getGameRuleChangeNotificationsNotificationSound(value: {
        soundId: string;
        pitch?: number;
        volume?: number;
    });
    get getBlockExplodeNotifications(): boolean;
    set getBlockExplodeNotifications(value: boolean);
    get getBlockExplodeNotificationsNotificationSound(): {
        soundId: string;
        pitch?: number;
        volume?: number;
    };
    set getBlockExplodeNotificationsNotificationSound(value: {
        soundId: string;
        pitch?: number;
        volume?: number;
    });
    get getButtonPushNotifications(): boolean;
    set getButtonPushNotifications(value: boolean);
    get getButtonPushNotificationsNotificationSound(): {
        soundId: string;
        pitch?: number;
        volume?: number;
    };
    set getButtonPushNotificationsNotificationSound(value: {
        soundId: string;
        pitch?: number;
        volume?: number;
    });
    get getEffectAddNotifications(): boolean;
    set getEffectAddNotifications(value: boolean);
    get getEffectAddNotificationsNotificationSound(): {
        soundId: string;
        pitch?: number;
        volume?: number;
    };
    set getEffectAddNotificationsNotificationSound(value: {
        soundId: string;
        pitch?: number;
        volume?: number;
    });
    get getEntityHurtNotifications(): boolean;
    set getEntityHurtNotifications(value: boolean);
    get getEntityHurtNotificationsNotificationSound(): {
        soundId: string;
        pitch?: number;
        volume?: number;
    };
    set getEntityHurtNotificationsNotificationSound(value: {
        soundId: string;
        pitch?: number;
        volume?: number;
    });
    get getEntityLoadNotifications(): boolean;
    set getEntityLoadNotifications(value: boolean);
    get getEntityLoadNotificationsNotificationSound(): {
        soundId: string;
        pitch?: number;
        volume?: number;
    };
    set getEntityLoadNotificationsNotificationSound(value: {
        soundId: string;
        pitch?: number;
        volume?: number;
    });
    get getEntityRemoveNotifications(): boolean;
    set getEntityRemoveNotifications(value: boolean);
    get getEntityRemoveNotificationsNotificationSound(): {
        soundId: string;
        pitch?: number;
        volume?: number;
    };
    set getEntityRemoveNotificationsNotificationSound(value: {
        soundId: string;
        pitch?: number;
        volume?: number;
    });
    get getEntitySpawnNotifications(): boolean;
    set getEntitySpawnNotifications(value: boolean);
    get getEntitySpawnNotificationsNotificationSound(): {
        soundId: string;
        pitch?: number;
        volume?: number;
    };
    set getEntitySpawnNotificationsNotificationSound(value: {
        soundId: string;
        pitch?: number;
        volume?: number;
    });
    get getExplosionNotifications(): boolean;
    set getExplosionNotifications(value: boolean);
    get getExplosionNotificationsNotificationSound(): {
        soundId: string;
        pitch?: number;
        volume?: number;
    };
    set getExplosionNotificationsNotificationSound(value: {
        soundId: string;
        pitch?: number;
        volume?: number;
    });
    get getPlayerDimensionChangeNotifications(): boolean;
    set getPlayerDimensionChangeNotifications(value: boolean);
    get getPlayerDimensionChangeNotificationsNotificationSound(): {
        soundId: string;
        pitch?: number;
        volume?: number;
    };
    set getPlayerDimensionChangeNotificationsNotificationSound(value: {
        soundId: string;
        pitch?: number;
        volume?: number;
    });
    get getBeforeExplosionNotifications(): boolean;
    set getBeforeExplosionNotifications(value: boolean);
    get getBeforeExplosionNotificationsNotificationSound(): {
        soundId: string;
        pitch?: number;
        volume?: number;
    };
    set getBeforeExplosionNotificationsNotificationSound(value: {
        soundId: string;
        pitch?: number;
        volume?: number;
    });
    get getBeforeChatSendNotifications(): boolean;
    set getBeforeChatSendNotifications(value: boolean);
    get getBeforeChatSendNotificationsNotificationSound(): {
        soundId: string;
        pitch?: number;
        volume?: number;
    };
    set getBeforeChatSendNotificationsNotificationSound(value: {
        soundId: string;
        pitch?: number;
        volume?: number;
    });
    get getPlayerGameModeChangeNotifications(): boolean;
    set getPlayerGameModeChangeNotifications(value: boolean);
    get getPlayerGameModeChangeNotificationsNotificationSound(): {
        soundId: string;
        pitch?: number;
        volume?: number;
    };
    set getPlayerGameModeChangeNotificationsNotificationSound(value: {
        soundId: string;
        pitch?: number;
        volume?: number;
    });
    get getWeatherChangeNotifications(): boolean;
    set getWeatherChangeNotifications(value: boolean);
    get getWeatherChangeNotificationsNotificationSound(): {
        soundId: string;
        pitch?: number;
        volume?: number;
    };
    set getWeatherChangeNotificationsNotificationSound(value: {
        soundId: string;
        pitch?: number;
        volume?: number;
    });
    get getLeverActionNotifications(): boolean;
    set getLeverActionNotifications(value: boolean);
    get getLeverActionNotificationsNotificationSound(): {
        soundId: string;
        pitch?: number;
        volume?: number;
    };
    set getLeverActionNotificationsNotificationSound(value: {
        soundId: string;
        pitch?: number;
        volume?: number;
    });
    get getMessageRecieveNotifications(): boolean;
    set getMessageRecieveNotifications(value: boolean);
    get getMessageRecieveNotificationsNotificationSound(): {
        soundId: string;
        pitch?: number;
        volume?: number;
    };
    set getMessageRecieveNotificationsNotificationSound(value: {
        soundId: string;
        pitch?: number;
        volume?: number;
    });
    get getBlockInteractTriggerExplosionNotifications(): boolean;
    set getBlockInteractTriggerExplosionNotifications(value: boolean);
    get getBlockInteractTriggerExplosionNotificationsNotificationSound(): {
        soundId: string;
        pitch?: number;
        volume?: number;
    };
    set getBlockInteractTriggerExplosionNotificationsNotificationSound(value: {
        soundId: string;
        pitch?: number;
        volume?: number;
    });
    get getEntityInteractTriggerExplosionNotifications(): boolean;
    set getEntityInteractTriggerExplosionNotifications(value: boolean);
    get getEntityInteractTriggerExplosionNotificationsNotificationSound(): {
        soundId: string;
        pitch?: number;
        volume?: number;
    };
    set getEntityInteractTriggerExplosionNotificationsNotificationSound(value: {
        soundId: string;
        pitch?: number;
        volume?: number;
    });
}
export declare function notificationsSettings(sourceEntitya: Entity | executeCommandPlayerW | Player): void;
export declare function antispamSettings(sourceEntitya: Entity | executeCommandPlayerW | Player): void;
export declare function personalSettings(sourceEntitya: Entity | executeCommandPlayerW | Player): void;
export declare function extraFeaturesSettings(sourceEntitya: Entity | executeCommandPlayerW | Player): void;
export declare function worldBorderSettingsDimensionSelector(sourceEntitya: Entity | executeCommandPlayerW | Player): void;
export declare function worldBorderSettings(sourceEntitya: Entity | executeCommandPlayerW | Player, dimension?: number): void;
export declare function evalAutoScriptSettings(sourceEntitya: Entity | executeCommandPlayerW | Player): void;
export declare function manageGameRulesUI(sourceEntitya: Entity | executeCommandPlayerW | Player): void;
export declare function scriptEvalRunWindow(sourceEntitya: Entity | executeCommandPlayerW | Player): void;
export declare function terminal(sourceEntitya: Entity | executeCommandPlayerW | Player): void;
export declare function chatMessageNoCensor(sourceEntitya: Entity | executeCommandPlayerW | Player, bypassChatInputRequests?: boolean): void;
export declare function chatSendNoCensor(sourceEntitya: Entity | executeCommandPlayerW | Player): void;
export declare function chatCommandRunner(sourceEntitya: Entity | executeCommandPlayerW | Player): void;
export declare function mapArtGenerator(sourceEntitya: Entity | executeCommandPlayerW | Player): void;
export declare function mapArtGeneratorB(sourceEntitya: Entity | executeCommandPlayerW | Player): void;
export declare function nbtStructureLoader(sourceEntitya: Entity | executeCommandPlayerW | Player): void;
export declare function playerController(sourceEntitya: Entity | executeCommandPlayerW | Player, message?: string): void;
export declare function inventoryController(sourceEntitya: Entity | executeCommandPlayerW | Player): void;
export declare function entityController(sourceEntitya: Entity | executeCommandPlayerW | Player): void;
export declare function editorStick(sourceEntitya: Entity | executeCommandPlayerW | Player, message?: string): void;
export declare function editorStickMenuB(sourceEntitya: Entity | executeCommandPlayerW | Player): void;
export declare function editorStickMenuC(sourceEntitya: Entity | executeCommandPlayerW | Player): void;
export declare function editorStickB(sourceEntitya: Entity | executeCommandPlayerW | Player, dimensionLocation?: DimensionLocation): void;
export declare function editorStickC(sourceEntitya: Entity | executeCommandPlayerW | Player, includeLiquidBlocks?: boolean, includePassableBlocks?: boolean, maxDistance?: any): void;
export declare function managePlayers(sourceEntitya: Entity | executeCommandPlayerW | Player, pagen?: number, maxplayersperpage?: number, search?: {
    value: string;
    caseSensitive?: boolean;
    searchLastOnlineDates?: boolean;
    searchLastOnlineTimes?: boolean;
    searchNames?: boolean;
    searchIds?: boolean;
}): Promise<0 | 1>;
/**
 *
 * @todo Split each of the cases in the switch function into separate functions.
 * @param sourceEntity
 * @param player
 * @returns
 */
export declare function managePlayers_managePlayer(sourceEntity: Entity, player: savedPlayer): Promise<0 | 1>;
export declare function managePlayers_managePlayer_manageBans(sourceEntity: Entity, player: savedPlayer): Promise<0 | 1>;
export declare function managePlayers_managePlayer_manageHomes(sourceEntity: Entity, player: savedPlayer): Promise<0 | 1>;
export declare function getAllBuiltInCommandsCategories(): string[];
export declare const commandCategories: string[];
export declare const commandCategoriesDisplay: ({
    name: string;
    icon: string;
} | {
    name: string;
    icon?: undefined;
})[];
export declare function manageCommands(sourceEntitya: Entity | executeCommandPlayerW | Player): void;
export declare function onlinePlayerSelector(sourceEntitya: Entity | executeCommandPlayerW | Player, backFunction?: Function, ...functionargs: any): Promise<Player | undefined>;
export declare function itemSelector<FuncType extends (...args: any) => FuncReturnType, FuncReturnType extends any>(sourceEntitya: Entity | executeCommandPlayerW | Player, targetPlayer: Entity | Player, backFunction?: FuncType, ...functionargs: any): Promise<{
    slot: number | EquipmentSlot;
    item: ContainerSlot;
}>;
export declare function itemEditorTypeSelection(sourceEntitya: Entity | executeCommandPlayerW | Player, targetPlayer: Entity | Player, item: {
    slot: number | EquipmentSlot;
    item: ContainerSlot;
}, selectionItems?: {
    edit?: {
        f: Function;
        a?: any[];
    };
    editCode?: {
        f: Function;
        a?: any[];
    };
    editDynamicProperties?: {
        f: Function;
        a?: any[];
    };
    editEnchantments?: {
        f: Function;
        a?: any[];
    };
    newItem?: {
        f: Function;
        a?: any[];
    };
    transfer?: {
        f: Function;
        a?: any[];
    };
    clone?: {
        f: Function;
        a?: any[];
    };
    delete?: {
        f: Function;
        a?: any[];
    };
}, backFunction?: Function, ...functionargs: any): Promise<any>;
export declare function itemEditor(sourceEntitya: Entity | executeCommandPlayerW | Player, targetPlayer: Entity | Player, item: ContainerSlot): Promise<any>;
export declare function itemDynamicPropertyEditor(sourceEntitya: Entity | executeCommandPlayerW | Player, item: ContainerSlot): void;
export declare function itemCodePropertyEditor(sourceEntitya: Entity | executeCommandPlayerW | Player, item: ContainerSlot): void;
export declare function newItemInSlot(sourceEntitya: Entity | executeCommandPlayerW | Player, item: ContainerSlot): void;
export declare function createExplosion(sourceEntitya: Entity | executeCommandPlayerW | Player, parameterDefaults?: {
    x?: number;
    y?: number;
    z?: number;
    dimension?: Dimension;
    radius?: number;
    explosionOptions?: ExplosionOptions;
    source?: string;
}): void;
