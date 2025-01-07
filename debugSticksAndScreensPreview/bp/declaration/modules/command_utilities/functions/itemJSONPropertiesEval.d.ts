import { ItemStack, ContainerSlot, Player } from "@minecraft/server";
import type { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import type { ItemJSONParseInput } from "../enums/ItemJSONParseInput";
export declare function itemJSONPropertiesEval(itemJSON: ItemJSONParseInput, StartingItem?: ItemStack | ContainerSlot, player?: Player | executeCommandPlayerW): ItemStack;
