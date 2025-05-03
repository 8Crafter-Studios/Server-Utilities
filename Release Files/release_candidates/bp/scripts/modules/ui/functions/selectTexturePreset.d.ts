import { type Entity, Player } from "@minecraft/server";
import { texturePresets } from "Assets/constants/texturePresets";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
export declare function selectTexturePreset(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<0 | 1 | string>;
export declare function selectTexturePresetInCategory<C extends keyof typeof texturePresets>(sourceEntitya: Entity | executeCommandPlayerW | Player, category: C, pagen?: number, search?: {
    value: string;
    caseSensitive?: boolean;
}, cachedTextures?: [displayName: string, icon: string][]): Promise<0 | 1 | string>;
